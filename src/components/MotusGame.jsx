import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const LEN = 9
const ROWS = 6
const FIRST_ANSWER = 'ALTERNANT'
// La démo raconte une petite histoire : animateur → apprenant → alternant.
const DEMO = ['ANIMATEUR', 'APPRENANT', 'ALTERNANT']
// Mots de 9 lettres pour rejouer : du vocabulaire full stack, côté front comme côté back.
const REPLAY = ['INTERFACE', 'COMPOSANT', 'MIGRATION', 'FRAMEWORK', 'REQUETAGE', 'ALTERNANT']

/** Règles Motus : rouge = bien placée, jaune = présente ailleurs (dans la limite des occurrences). */
export function score(guess, answer) {
  const res = Array(LEN).fill('absent')
  const left = {}
  for (let i = 0; i < LEN; i++) {
    if (guess[i] === answer[i]) res[i] = 'correct'
    else left[answer[i]] = (left[answer[i]] || 0) + 1
  }
  for (let i = 0; i < LEN; i++) {
    if (res[i] !== 'correct' && left[guess[i]] > 0) {
      res[i] = 'present'
      left[guess[i]]--
    }
  }
  return res
}

function clean(value) {
  return value
    .toUpperCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Z]/g, '')
    .slice(0, LEN)
}

function Tile({ letter, state, index, reveal, hint }) {
  const d = index * 0.09
  const final = state === 'present' ? 'var(--color-ink)' : 'var(--color-cream)'
  return (
    <motion.div
      initial={reveal ? { rotateX: 0 } : false}
      animate={reveal ? { rotateX: [0, 90, 0] } : undefined}
      transition={{ duration: 0.5, delay: d, times: [0, 0.5, 1] }}
      className="relative grid aspect-square place-items-center bg-cell"
    >
      {state === 'correct' && (
        <motion.span
          initial={reveal ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: d + 0.25, duration: 0 }}
          className="absolute inset-0 bg-red"
        />
      )}
      {state === 'present' && (
        <motion.span
          initial={reveal ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: d + 0.25, duration: 0 }}
          className="absolute inset-[8%] rounded-full bg-yellow"
        />
      )}
      <motion.span
        initial={reveal ? { color: 'var(--color-cream)' } : false}
        animate={{ color: final }}
        transition={{ delay: d + 0.25, duration: 0 }}
        className={`relative font-display text-[clamp(1.1rem,4.4vw,2.4rem)] font-extrabold leading-none ${hint ? 'opacity-45' : ''}`}
        style={reveal ? undefined : { color: final }}
      >
        {letter}
      </motion.span>
    </motion.div>
  )
}

export default function MotusGame() {
  const reduce = useReducedMotion()
  const [answer, setAnswer] = useState(FIRST_ANSWER)
  const [rows, setRows] = useState([])
  const [current, setCurrent] = useState('')
  const [mode, setMode] = useState('demo') // demo | playing | won | lost
  const [error, setError] = useState('')
  const [announce, setAnnounce] = useState('')
  const inputRef = useRef(null)
  const gridRef = useRef(null)
  // La démo ne démarre que quand la grille est à l'écran (elle est sous le pli sur mobile).
  const inView = useInView(gridRef, { once: true, amount: 0.5 })
  const demoWon = mode === 'won' && answer === FIRST_ANSWER && rows.length === DEMO.length && rows.every((r, i) => r.word === DEMO[i])

  // Démo automatique (une seule fois). Sous reduced-motion : état final directement.
  useEffect(() => {
    if (mode !== 'demo') return
    if (!reduce && !inView) return
    if (reduce) {
      setRows(DEMO.map((w) => ({ word: w, result: score(w, FIRST_ANSWER) })))
      setMode('won')
      return
    }
    let cancelled = false
    const timers = []
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)))
    ;(async () => {
      await wait(700)
      for (const w of DEMO) {
        for (let i = 1; i <= LEN; i++) {
          if (cancelled) return
          setCurrent(w.slice(0, i))
          await wait(75)
        }
        await wait(260)
        if (cancelled) return
        setRows((r) => [...r, { word: w, result: score(w, FIRST_ANSWER) }])
        setCurrent('')
        await wait(LEN * 90 + 650)
      }
      if (!cancelled) setMode('won')
    })()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [mode, reduce, inView])

  const start = () => {
    const pool = REPLAY.filter((w) => w !== answer)
    const next = mode === 'demo' ? FIRST_ANSWER : pool[Math.floor(Math.random() * pool.length)]
    setAnswer(next)
    setRows([])
    setCurrent(next[0])
    setError('')
    setAnnounce(`Nouvelle partie : mot de ${LEN} lettres qui commence par ${next[0]}.`)
    setMode('playing')
    setTimeout(() => inputRef.current?.focus(), 30)
  }

  const onChange = (e) => {
    let v = clean(e.target.value)
    if (v[0] !== answer[0]) v = (answer[0] + v).slice(0, LEN)
    setCurrent(v)
    setError('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (current.length < LEN) {
      setError(`Il faut ${LEN} lettres (vous en avez ${current.length}).`)
      return
    }
    const result = score(current, answer)
    const next = [...rows, { word: current, result }]
    setRows(next)
    const good = result.filter((r) => r === 'correct').length
    const near = result.filter((r) => r === 'present').length
    if (good === LEN) {
      setMode('won')
      setAnnounce(`Trouvé : ${answer}, en ${next.length} essai${next.length > 1 ? 's' : ''}.`)
    } else if (next.length === ROWS) {
      setMode('lost')
      setAnnounce(`Perdu. Le mot était ${answer}.`)
    } else {
      setAnnounce(`Essai ${next.length} : ${current}. ${good} bien placée${good > 1 ? 's' : ''}, ${near} mal placée${near > 1 ? 's' : ''}.`)
    }
    setCurrent(answer[0])
  }

  const grid = Array.from({ length: ROWS }, (_, r) => {
    if (r < rows.length) return { kind: 'done', ...rows[r] }
    if (r === rows.length && (mode === 'demo' || mode === 'playing')) return { kind: 'current' }
    return { kind: 'empty' }
  })

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-display text-xl font-bold uppercase tracking-wide">Le mot du jour</p>
        <p className="text-sm text-cream/75">
          {LEN} lettres · commence par <span className="font-semibold text-cream">{answer[0]}</span>
        </p>
      </div>

      <div ref={gridRef} className="mt-4 grid gap-1.5 bg-plateau-deep p-1.5 sm:gap-2 sm:p-2" aria-hidden="true" style={{ perspective: 800 }}>
        {grid.map((row, r) => (
          <div key={`${answer}-${r}`} className="grid grid-cols-9 gap-1.5 sm:gap-2">
            {Array.from({ length: LEN }, (_, i) => {
              if (row.kind === 'done') return <Tile key={i} index={i} letter={row.word[i]} state={row.result[i]} reveal={!reduce} />
              if (row.kind === 'current') {
                const typed = current[i]
                const hint = !typed && i === 0 && mode === 'playing'
                return <Tile key={i} index={i} letter={typed || (hint ? answer[0] : '')} state="typed" hint={hint} />
              }
              return <Tile key={i} index={i} letter="" state="empty" />
            })}
          </div>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <div className="mt-5 min-h-[7.5rem]">
        {mode === 'demo' && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-cream/75">Démonstration en cours…</p>
            <button type="button" onClick={start} className="key min-h-11 rounded-lg bg-cream px-5 text-sm font-semibold text-ink">
              Passer et jouer
            </button>
          </div>
        )}

        {mode === 'playing' && (
          <form onSubmit={onSubmit} noValidate>
            <label htmlFor="guess" className="text-sm font-medium">
              Votre proposition ({LEN} lettres, commence par {answer[0]})
            </label>
            <div className="mt-2 flex gap-2">
              <input
                ref={inputRef}
                id="guess"
                value={current}
                onChange={onChange}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck="false"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'guess-error' : undefined}
                className="min-h-12 w-full min-w-0 rounded-lg border-2 border-cream/40 bg-plateau-deep px-4 font-display text-2xl font-bold uppercase tracking-[0.2em] text-cream transition-colors focus:border-yellow"
              />
              <button type="submit" className="key min-h-12 shrink-0 rounded-lg bg-yellow px-5 text-sm font-semibold text-ink [--key-shadow:#B88A10]">
                Valider
              </button>
            </div>
            {error && (
              <p id="guess-error" className="mt-2 text-sm font-medium text-yellow">
                {error}
              </p>
            )}
            <p className="mt-2 text-sm text-cream/75">
              <span className="mr-1 inline-block size-3 bg-red align-[-1px]" /> bien placée
              <span className="ml-4 mr-1 inline-block size-3 rounded-full bg-yellow align-[-1px]" /> mal placée
            </p>
          </form>
        )}

        {(mode === 'won' || mode === 'lost') && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-[34ch] text-lg leading-snug">
              {demoWon ? (
                <>
                  <span className="font-semibold">Alternant.</span> C'est ce que je veux devenir à la rentrée 2026, dans votre équipe.
                </>
              ) : mode === 'won' ? (
                <>
                  Bravo, <span className="font-semibold">{answer}</span> en {rows.length} essai{rows.length > 1 ? 's' : ''}.
                </>
              ) : (
                <>
                  Perdu : c'était <span className="font-semibold">{answer}</span>.
                </>
              )}
            </p>
            <button type="button" onClick={start} className="key min-h-11 rounded-lg bg-cream px-5 text-sm font-semibold text-ink">
              {demoWon ? 'À vous de jouer' : 'Rejouer'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
