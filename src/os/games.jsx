import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from '@phosphor-icons/react'
import { PixelIcon } from './icons'

/* ============================================================
   Mini-jeux d'AdamOS : Snake, Démineur, Glouton (façon Pac-Man).
   Chaque jeu se met en pause quand sa fenêtre n'est plus active
   (prop "active") : rien ne tourne en arrière-plan.
   Les meilleurs scores restent en mémoire (aucun stockage).
   ============================================================ */

const rnd = (n) => Math.floor(Math.random() * n)

// Flèches, ZQSD (AZERTY) et WASD (QWERTY).
const KEY_DIRS = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  z: [0, -1],
  w: [0, -1],
  s: [0, 1],
  q: [-1, 0],
  a: [-1, 0],
  d: [1, 0],
}

function keyDir(e) {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
  return KEY_DIRS[k]
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const on = () => setCoarse(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return coarse
}

function setupCanvas(canvas, w, h) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.imageSmoothingEnabled = false
  return ctx
}

function Lcd({ label, value }) {
  return (
    <span className="flex items-center gap-2">
      <span className="font-pixel text-sm text-muted">{label}</span>
      <span className="min-w-[3.5ch] border-2 border-line bg-line px-1.5 text-right font-mono text-base font-medium text-sun">{value}</span>
    </span>
  )
}

function DPad({ onDir }) {
  const b = 'grid size-12 place-items-center border-2 border-line bg-win active:translate-y-px active:bg-sun'
  const press = (d) => (e) => {
    e.preventDefault()
    onDir(d)
  }
  return (
    <div className="mx-auto mt-4 grid w-fit grid-cols-3 gap-1" aria-label="Croix directionnelle">
      <span />
      <button type="button" className={b} onPointerDown={press([0, -1])} aria-label="Haut">
        <ArrowUp size={20} weight="bold" />
      </button>
      <span />
      <button type="button" className={b} onPointerDown={press([-1, 0])} aria-label="Gauche">
        <ArrowLeft size={20} weight="bold" />
      </button>
      <span />
      <button type="button" className={b} onPointerDown={press([1, 0])} aria-label="Droite">
        <ArrowRight size={20} weight="bold" />
      </button>
      <span />
      <button type="button" className={b} onPointerDown={press([0, 1])} aria-label="Bas">
        <ArrowDown size={20} weight="bold" />
      </button>
      <span />
    </div>
  )
}

function Overlay({ title, text, action, onAction }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-line/70 p-4 text-center text-win">
      <div>
        <p className="font-pixel text-3xl font-bold">{title}</p>
        {text && <p className="mx-auto mt-2 max-w-[32ch] text-sm leading-relaxed">{text}</p>}
        {action && (
          <button type="button" onClick={onAction} className="btn mt-4 min-h-11 bg-sun px-5 font-pixel text-base font-semibold text-line">
            {action}
          </button>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------
   SNAKE
   --------------------------------------------------------------- */

let snakeBest = 0
const SN = 18 // cases par côté
const SC = 20 // taille d'une case (px)

export function SnakeGame({ active }) {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const wrapRef = useRef(null)
  const st = useRef(null)
  const [phase, setPhase] = useState('idle') // idle | play | over
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(snakeBest)
  const coarse = useCoarsePointer()

  const placeFood = (snake) => {
    let f
    do f = { x: rnd(SN), y: rnd(SN) }
    while (snake.some((p) => p.x === f.x && p.y === f.y))
    return f
  }

  const reset = () => {
    const snake = [
      { x: 6, y: 9 },
      { x: 5, y: 9 },
      { x: 4, y: 9 },
    ]
    st.current = { snake, dir: { x: 1, y: 0 }, next: { x: 1, y: 0 }, food: placeFood(snake), score: 0 }
    setScore(0)
  }

  const draw = () => {
    const ctx = ctxRef.current
    const s = st.current
    if (!ctx || !s) return
    ctx.fillStyle = '#0B1230'
    ctx.fillRect(0, 0, SN * SC, SN * SC)
    ctx.fillStyle = '#1B2A57'
    for (let y = 0; y < SN; y++) for (let x = 0; x < SN; x++) ctx.fillRect(x * SC + SC / 2 - 1, y * SC + SC / 2 - 1, 2, 2)
    ctx.fillStyle = '#FF5E3A'
    ctx.fillRect(s.food.x * SC + 3, s.food.y * SC + 3, SC - 6, SC - 6)
    s.snake.forEach((p, i) => {
      ctx.fillStyle = i === 0 ? '#9BF0C9' : '#3DDC97'
      ctx.fillRect(p.x * SC + 1, p.y * SC + 1, SC - 2, SC - 2)
    })
    const h = s.snake[0]
    ctx.fillStyle = '#0B1230'
    const ex = s.dir.y !== 0 ? [5, 13] : [s.dir.x > 0 ? 12 : 6, s.dir.x > 0 ? 12 : 6]
    const ey = s.dir.x !== 0 ? [5, 13] : [s.dir.y > 0 ? 12 : 6, s.dir.y > 0 ? 12 : 6]
    ctx.fillRect(h.x * SC + ex[0] - 1, h.y * SC + ey[0] - 1, 3, 3)
    ctx.fillRect(h.x * SC + ex[1] - 1, h.y * SC + ey[1] - 1, 3, 3)
  }

  useEffect(() => {
    ctxRef.current = setupCanvas(canvasRef.current, SN * SC, SN * SC)
    reset()
    draw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const start = () => {
    reset()
    setPhase('play')
    wrapRef.current?.focus({ preventScroll: true })
  }

  const turn = ([dx, dy]) => {
    const s = st.current
    if (!s || (dx === -s.dir.x && dy === -s.dir.y)) return
    s.next = { x: dx, y: dy }
  }

  useEffect(() => {
    if (phase !== 'play' || !active) return
    const id = setInterval(() => {
      const s = st.current
      s.dir = s.next
      const h = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y }
      const ate = h.x === s.food.x && h.y === s.food.y
      const body = ate ? s.snake : s.snake.slice(0, -1)
      const dead = h.x < 0 || h.y < 0 || h.x >= SN || h.y >= SN || body.some((p) => p.x === h.x && p.y === h.y)
      if (dead) {
        snakeBest = Math.max(snakeBest, s.score)
        setBest(snakeBest)
        setPhase('over')
        return
      }
      s.snake = [h, ...body]
      if (ate) {
        s.score += 1
        setScore(s.score)
        s.food = placeFood(s.snake)
      }
      draw()
    }, 115)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, active])

  const onKeyDown = (e) => {
    const d = keyDir(e)
    if (d) {
      e.preventDefault()
      if (phase === 'play') turn(d)
    } else if ((e.key === 'Enter' || e.key === ' ') && phase !== 'play') {
      e.preventDefault()
      start()
    }
  }

  return (
    <div className="p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Lcd label="Score" value={score} />
        <Lcd label="Record" value={best} />
      </div>
      <div
        ref={wrapRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Plateau de Snake. Flèches ou ZQSD pour diriger le serpent, Entrée pour commencer."
        className="relative mx-auto mt-3 w-full max-w-[360px] border-2 border-line"
      >
        <canvas ref={canvasRef} className="block aspect-square w-full" style={{ imageRendering: 'pixelated' }} />
        {phase === 'idle' && <Overlay title="Snake" text="Mangez les carrés rouges pour grandir. Évitez les murs et votre propre queue." action="Jouer (Entrée)" onAction={start} />}
        {phase === 'over' && <Overlay title="Perdu !" text={`Score : ${score}`} action="Rejouer" onAction={start} />}
        {phase === 'play' && !active && <Overlay title="Pause" text="Cliquez sur la fenêtre pour reprendre." />}
      </div>
      {coarse ? <DPad onDir={turn} /> : <p className="mt-3 text-center text-sm text-muted">Flèches, ZQSD ou WASD pour diriger.</p>}
    </div>
  )
}

/* ---------------------------------------------------------------
   DÉMINEUR
   --------------------------------------------------------------- */

const MR = 9
const MC = 9
const MM = 10
const NUM_COLORS = ['', '#1D4ED8', '#15803D', '#DC2626', '#1E3A8A', '#9F1239', '#0F766E', '#141414', '#4A4A4A']

function neighbors(i) {
  const r = Math.floor(i / MC)
  const c = i % MC
  const out = []
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue
      const rr = r + dr
      const cc = c + dc
      if (rr >= 0 && rr < MR && cc >= 0 && cc < MC) out.push(rr * MC + cc)
    }
  return out
}

const blankBoard = () => Array.from({ length: MR * MC }, () => ({ mine: false, n: 0, open: false, flag: false, boom: false }))

function FlagGlyph() {
  return (
    <svg viewBox="0 0 8 8" width="16" height="16" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="1" width="1" height="6" fill="#141414" />
      <rect x="3" y="1" width="3" height="1" fill="#FF5E3A" />
      <rect x="3" y="2" width="4" height="1" fill="#FF5E3A" />
      <rect x="3" y="3" width="3" height="1" fill="#FF5E3A" />
      <rect x="1" y="7" width="4" height="1" fill="#141414" />
    </svg>
  )
}

function MineGlyph() {
  return (
    <svg viewBox="0 0 8 8" width="16" height="16" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="1" width="4" height="6" fill="#141414" />
      <rect x="1" y="2" width="6" height="4" fill="#141414" />
      <rect x="2" y="2" width="1" height="1" fill="#FFFFFF" />
    </svg>
  )
}

export function MinesGame({ active }) {
  const [cells, setCells] = useState(blankBoard)
  const [status, setStatus] = useState('ready') // ready | play | won | lost
  const [flagMode, setFlagMode] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (status !== 'play' || !active) return
    const id = setInterval(() => setTime((t) => Math.min(999, t + 1)), 1000)
    return () => clearInterval(id)
  }, [status, active])

  const reset = () => {
    setCells(blankBoard())
    setStatus('ready')
    setTime(0)
  }

  const reveal = (i) => {
    if (status === 'won' || status === 'lost') return
    const g = cells.map((c) => ({ ...c }))
    let s = status
    if (s === 'ready') {
      // Premier clic toujours sûr : aucune mine sur la case ni autour.
      const forbid = new Set([i, ...neighbors(i)])
      let placed = 0
      while (placed < MM) {
        const k = rnd(MR * MC)
        if (!forbid.has(k) && !g[k].mine) {
          g[k].mine = true
          placed++
        }
      }
      g.forEach((c, k) => {
        c.n = neighbors(k).filter((j) => g[j].mine).length
      })
      s = 'play'
    }
    const c = g[i]
    if (c.open || c.flag) return
    if (c.mine) {
      g.forEach((x) => {
        if (x.mine) x.open = true
      })
      c.boom = true
      setCells(g)
      setStatus('lost')
      return
    }
    const stack = [i]
    while (stack.length) {
      const k = stack.pop()
      const x = g[k]
      if (x.open || x.flag) continue
      x.open = true
      if (x.n === 0) neighbors(k).forEach((j) => !g[j].open && !g[j].mine && stack.push(j))
    }
    if (g.every((x) => x.mine || x.open)) {
      g.forEach((x) => {
        if (x.mine) x.flag = true
      })
      s = 'won'
    }
    setCells(g)
    setStatus(s)
  }

  const toggleFlag = (i) => {
    if (status === 'won' || status === 'lost' || cells[i].open) return
    setCells(cells.map((x, k) => (k === i ? { ...x, flag: !x.flag } : x)))
  }

  const flags = cells.filter((c) => c.flag).length
  const over = status === 'won' || status === 'lost'

  const label = (c, i) => {
    const pos = `Ligne ${Math.floor(i / MC) + 1}, colonne ${(i % MC) + 1}`
    if (c.flag && !c.open) return `${pos} : drapeau`
    if (!c.open) return `${pos} : fermée`
    if (c.mine) return `${pos} : mine`
    return c.n ? `${pos} : ${c.n} mine${c.n > 1 ? 's' : ''} autour` : `${pos} : vide`
  }

  return (
    <div className="p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Lcd label="Mines" value={MM - flags} />
        <button type="button" onClick={reset} className="btn min-h-11 bg-sun px-4 font-pixel text-base font-semibold">
          Nouvelle partie
        </button>
        <Lcd label="Temps" value={time} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          aria-pressed={flagMode}
          onClick={() => setFlagMode((v) => !v)}
          className={`btn flex min-h-11 items-center gap-2 px-3 font-pixel text-sm ${flagMode ? 'bg-tomato' : 'bg-win'}`}
        >
          <FlagGlyph /> Mode drapeau {flagMode ? 'activé' : 'désactivé'}
        </button>
        <p className="text-right text-sm text-muted" aria-live="polite">
          {status === 'won' ? `Bravo, déminé en ${time} s !` : status === 'lost' ? 'Boum ! Réessayez.' : 'Clic droit ou touche F : drapeau.'}
        </p>
      </div>

      <div
        role="group"
        aria-label={`Grille de démineur, ${MR} par ${MC}, ${MM} mines`}
        className="mx-auto mt-3 grid w-fit gap-0.5 border-2 border-line bg-line p-0.5"
        style={{ gridTemplateColumns: `repeat(${MC}, minmax(0, 1fr))` }}
      >
        {cells.map((c, i) => (
          <button
            key={i}
            type="button"
            aria-label={label(c, i)}
            disabled={over}
            onClick={() => (flagMode ? toggleFlag(i) : reveal(i))}
            onContextMenu={(e) => {
              e.preventDefault()
              toggleFlag(i)
            }}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'f') {
                e.preventDefault()
                toggleFlag(i)
              }
            }}
            className={`grid size-9 place-items-center font-mono text-base font-semibold ${
              c.open
                ? c.boom
                  ? 'bg-tomato'
                  : 'bg-white'
                : 'border-2 border-b-[#9A9486] border-l-white border-r-[#9A9486] border-t-white bg-win-2 hover:bg-win'
            }`}
            style={c.open && !c.mine && c.n ? { color: NUM_COLORS[c.n] } : undefined}
          >
            {c.open ? c.mine ? <MineGlyph /> : c.n || '' : c.flag ? <FlagGlyph /> : ''}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------
   GLOUTON (inspiré de Pac-Man, réimplémentation originale)
   --------------------------------------------------------------- */

const MAZE = [
  '###################',
  '#o.......#.......o#',
  '#.##.###.#.###.##.#',
  '#.................#',
  '#.##.#.#####.#.##.#',
  '#....#...#...#....#',
  '####.### # ###.####',
  '####.#  GGG  #.####',
  '####.# ##### #.####',
  '#........P........#',
  '#.##.###.#.###.##.#',
  '#o.#...........#.o#',
  '##.#.#.#####.#.#.##',
  '#....#...#...#....#',
  '###################',
]
const GR = MAZE.length
const GC = MAZE[0].length
const TS = 24
const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]
const PSTEP = 150
const GSTEP = 195
const FSTEP = 290
const FRIGHT = 6000
const GHOST_COLORS = ['#FF5E3A', '#FF8FC7', '#3DDC97']
let gloutonBest = 0

function parseMaze() {
  const walls = []
  const pellets = []
  let player = null
  const homes = []
  MAZE.forEach((row, y) => {
    walls.push([])
    pellets.push([])
    for (let x = 0; x < GC; x++) {
      const ch = row[x]
      walls[y].push(ch === '#')
      pellets[y].push(ch === '.' ? 1 : ch === 'o' ? 2 : 0)
      if (ch === 'P') player = { x, y }
      if (ch === 'G') homes.push({ x, y })
    }
  })
  return { walls, pellets, player, homes }
}

export function GloutonGame({ active }) {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const wrapRef = useRef(null)
  const g = useRef(null)
  const shown = useRef(-1)
  const [phase, setPhase] = useState('idle') // idle | ready | play | over | won
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [best, setBest] = useState(gloutonBest)
  const coarse = useCoarsePointer()

  const wall = (x, y) => x < 0 || y < 0 || x >= GC || y >= GR || g.current.walls[y][x]

  const placeActors = () => {
    const s = g.current
    s.player = { x: s.start.x, y: s.start.y, px: s.start.x, py: s.start.y, dir: [0, 0], next: [-1, 0], t: 0 }
    s.ghosts = s.homes.map((h, i) => ({ x: h.x, y: h.y, px: h.x, py: h.y, dir: [0, -1], t: 0, release: 800 + i * 2200, color: GHOST_COLORS[i], home: h }))
    s.clock = 0
    s.fright = 0
  }

  const newGame = () => {
    const m = parseMaze()
    let left = 0
    m.pellets.forEach((r) => r.forEach((v) => v && left++))
    g.current = { walls: m.walls, pellets: m.pellets, left, start: m.player, homes: m.homes, score: 0, lives: 3 }
    placeActors()
    setScore(0)
    setLives(3)
  }

  const draw = () => {
    const ctx = ctxRef.current
    const s = g.current
    if (!ctx || !s) return
    ctx.fillStyle = '#0B1230'
    ctx.fillRect(0, 0, GC * TS, GR * TS)

    for (let y = 0; y < GR; y++)
      for (let x = 0; x < GC; x++) {
        if (s.walls[y][x]) {
          ctx.fillStyle = '#1C2A5B'
          ctx.fillRect(x * TS, y * TS, TS, TS)
          ctx.fillStyle = '#6FB7FF'
          if (!wall(x, y - 1)) ctx.fillRect(x * TS, y * TS, TS, 2)
          if (!wall(x, y + 1)) ctx.fillRect(x * TS, y * TS + TS - 2, TS, 2)
          if (!wall(x - 1, y)) ctx.fillRect(x * TS, y * TS, 2, TS)
          if (!wall(x + 1, y)) ctx.fillRect(x * TS + TS - 2, y * TS, 2, TS)
        } else if (s.pellets[y][x] === 1) {
          ctx.fillStyle = '#FFF6E5'
          ctx.fillRect(x * TS + TS / 2 - 2, y * TS + TS / 2 - 2, 4, 4)
        } else if (s.pellets[y][x] === 2 && Math.floor(s.clock / 250) % 2 === 0) {
          ctx.fillStyle = '#FFC53D'
          ctx.fillRect(x * TS + TS / 2 - 5, y * TS + TS / 2 - 5, 10, 10)
        }
      }

    // Glouton (interpolé entre deux cases pour un mouvement fluide)
    const p = s.player
    const k = Math.min(1, p.t / PSTEP)
    const cx = (p.px + (p.x - p.px) * k) * TS + TS / 2
    const cy = (p.py + (p.y - p.py) * k) * TS + TS / 2
    const base = Math.atan2(p.dir[1], p.dir[0] || (p.dir[1] ? 0 : 1))
    const mouth = 0.08 + 0.22 * Math.abs(Math.sin(s.clock / 90)) * Math.PI
    ctx.fillStyle = '#FFC53D'
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, TS / 2 - 2, base + mouth, base + Math.PI * 2 - mouth)
    ctx.closePath()
    ctx.fill()

    // Fantômes
    s.ghosts.forEach((gh) => {
      const step = s.fright > 0 ? FSTEP : GSTEP
      const q = Math.min(1, gh.t / step)
      const gx = (gh.px + (gh.x - gh.px) * q) * TS + TS / 2
      const gy = (gh.py + (gh.y - gh.py) * q) * TS + TS / 2
      const r = TS / 2 - 2
      const blink = s.fright > 0 && s.fright < 1500 && Math.floor(s.clock / 150) % 2 === 0
      ctx.fillStyle = s.fright > 0 ? (blink ? '#FFFFFF' : '#6FB7FF') : gh.color
      ctx.beginPath()
      ctx.arc(gx, gy - 1, r, Math.PI, 0)
      ctx.lineTo(gx + r, gy + r)
      for (let i = 0; i < 3; i++) {
        const w = (2 * r) / 3
        ctx.lineTo(gx + r - w * i - w / 2, gy + r - 4)
        ctx.lineTo(gx + r - w * (i + 1), gy + r)
      }
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(gx - 6, gy - 5, 5, 5)
      ctx.fillRect(gx + 1, gy - 5, 5, 5)
      ctx.fillStyle = '#0B1230'
      ctx.fillRect(gx - 5 + gh.dir[0] * 1.5 + 1, gy - 4 + gh.dir[1] * 1.5 + 1, 2, 2)
      ctx.fillRect(gx + 2 + gh.dir[0] * 1.5 + 1, gy - 4 + gh.dir[1] * 1.5 + 1, 2, 2)
    })
  }

  useEffect(() => {
    ctxRef.current = setupCanvas(canvasRef.current, GC * TS, GR * TS)
    newGame()
    draw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // "Prêt ?" pendant une seconde après un départ ou une vie perdue.
  useEffect(() => {
    if (phase !== 'ready' || !active) return
    draw()
    const t = setTimeout(() => setPhase('play'), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, active])

  useEffect(() => {
    if (phase !== 'play' || !active) return
    const s = g.current
    let last = performance.now()
    let raf = 0

    const stepPlayer = () => {
      const p = s.player
      p.px = p.x
      p.py = p.y
      if (!wall(p.x + p.next[0], p.y + p.next[1])) p.dir = p.next
      if (!wall(p.x + p.dir[0], p.y + p.dir[1])) {
        p.x += p.dir[0]
        p.y += p.dir[1]
      }
      const v = s.pellets[p.y][p.x]
      if (v) {
        s.pellets[p.y][p.x] = 0
        s.left--
        s.score += v === 2 ? 50 : 10
        if (v === 2) {
          s.fright = FRIGHT
          s.ghosts.forEach((gh) => (gh.dir = [-gh.dir[0], -gh.dir[1]]))
        }
      }
    }

    const stepGhost = (gh) => {
      gh.px = gh.x
      gh.py = gh.y
      if (s.clock < gh.release) return
      const open = DIRS.filter(([dx, dy]) => !wall(gh.x + dx, gh.y + dy))
      const forward = open.filter(([dx, dy]) => !(dx === -gh.dir[0] && dy === -gh.dir[1]))
      const choices = forward.length ? forward : open
      let d
      if (s.fright > 0 || Math.random() < 0.25) d = choices[rnd(choices.length)]
      else {
        let bestDist = Infinity
        choices.forEach((c) => {
          const dist = Math.abs(gh.x + c[0] - s.player.x) + Math.abs(gh.y + c[1] - s.player.y)
          if (dist < bestDist) {
            bestDist = dist
            d = c
          }
        })
      }
      gh.dir = d
      gh.x += d[0]
      gh.y += d[1]
    }

    const collide = () => {
      const p = s.player
      for (const gh of s.ghosts) {
        const same = gh.x === p.x && gh.y === p.y
        const swapped = gh.x === p.px && gh.y === p.py && gh.px === p.x && gh.py === p.y
        if (!same && !swapped) continue
        if (s.fright > 0) {
          s.score += 200
          gh.x = gh.px = gh.home.x
          gh.y = gh.py = gh.home.y
          gh.release = s.clock + 2000
          gh.t = 0
        } else return true
      }
      return false
    }

    const hit = () => {
      s.lives -= 1
      setLives(s.lives)
      if (s.lives <= 0) {
        gloutonBest = Math.max(gloutonBest, s.score)
        setBest(gloutonBest)
        setPhase('over')
      } else {
        placeActors()
        setPhase('ready')
      }
      draw()
    }

    const loop = (now) => {
      const dt = Math.min(now - last, 50)
      last = now
      s.clock += dt
      if (s.fright > 0) s.fright = Math.max(0, s.fright - dt)

      const p = s.player
      p.t += dt
      while (p.t >= PSTEP) {
        p.t -= PSTEP
        stepPlayer()
        if (collide()) return hit()
      }
      const gstep = s.fright > 0 ? FSTEP : GSTEP
      for (const gh of s.ghosts) {
        gh.t += dt
        while (gh.t >= gstep) {
          gh.t -= gstep
          stepGhost(gh)
          if (collide()) return hit()
        }
      }

      if (shown.current !== s.score) {
        shown.current = s.score
        setScore(s.score)
      }
      if (s.left === 0) {
        gloutonBest = Math.max(gloutonBest, s.score)
        setBest(gloutonBest)
        setPhase('won')
        draw()
        return
      }
      draw()
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, active])

  const start = () => {
    newGame()
    setPhase('ready')
    wrapRef.current?.focus({ preventScroll: true })
  }

  const turn = (d) => {
    if (g.current?.player) g.current.player.next = d
  }

  const onKeyDown = (e) => {
    const d = keyDir(e)
    if (d) {
      e.preventDefault()
      turn(d)
    } else if ((e.key === 'Enter' || e.key === ' ') && (phase === 'idle' || phase === 'over' || phase === 'won')) {
      e.preventDefault()
      start()
    }
  }

  return (
    <div className="p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Lcd label="Score" value={score} />
        <span className="flex items-center gap-1" aria-label={`${lives} vie${lives > 1 ? 's' : ''}`}>
          {Array.from({ length: 3 }, (_, i) => (
            <PixelIcon key={i} name="glouton" size={20} className={i < lives ? '' : 'opacity-20'} />
          ))}
        </span>
        <Lcd label="Record" value={best} />
      </div>
      <div
        ref={wrapRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Labyrinthe de Glouton. Flèches ou ZQSD pour se déplacer, Entrée pour commencer."
        className="relative mx-auto mt-3 w-full max-w-[456px] border-2 border-line"
      >
        <canvas ref={canvasRef} className="block w-full" style={{ aspectRatio: `${GC} / ${GR}`, imageRendering: 'pixelated' }} />
        {phase === 'idle' && (
          <Overlay
            title="Glouton"
            text="Mangez toutes les pastilles et évitez les trois fantômes. Les grosses pastilles jaunes les rendent vulnérables pendant 6 secondes."
            action="Jouer (Entrée)"
            onAction={start}
          />
        )}
        {phase === 'ready' && <Overlay title="Prêt ?" />}
        {phase === 'over' && <Overlay title="Partie terminée" text={`Score : ${score}`} action="Rejouer" onAction={start} />}
        {phase === 'won' && <Overlay title="Bravo !" text={`Labyrinthe vidé. Score : ${score}`} action="Rejouer" onAction={start} />}
        {(phase === 'play' || phase === 'ready') && !active && <Overlay title="Pause" text="Cliquez sur la fenêtre pour reprendre." />}
      </div>
      {coarse ? <DPad onDir={turn} /> : <p className="mt-3 text-center text-sm text-muted">Flèches, ZQSD ou WASD pour se déplacer.</p>}
    </div>
  )
}
