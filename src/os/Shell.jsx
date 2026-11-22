import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PixelIcon } from './icons'
import { ACCENT } from './Window'
import { APPS, CV_URL, DESKTOP } from './apps'

function useClock() {
  const fmt = () => new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return t
}

/* Barre de menus : le h1 du site, toujours visible. */
export function MenuBar({ open }) {
  const time = useClock()
  return (
    <header className="relative z-[60] flex h-9 shrink-0 items-center justify-between gap-3 border-b-2 border-line bg-win px-3">
      <div className="flex min-w-0 items-center gap-2">
        <img src="/logo-noir.png" alt="" className="size-5 object-contain" />
        <span className="font-pixel text-base font-bold">AdamOS 26</span>
        <span className="hidden text-line/30 sm:inline" aria-hidden="true">|</span>
        <h1 className="sr-only truncate font-pixel text-base sm:not-sr-only">Adam Bettayeb, développeur full stack</h1>
      </div>
      <div className="flex shrink-0 items-center gap-3 font-pixel text-base">
        <button type="button" onClick={() => open('quick')} className="hidden min-h-8 border-2 border-line bg-sun px-2 text-sm font-semibold hover:bg-white lg:block">
          Version rapide
        </button>
        <span className="hidden items-center gap-1.5 md:flex">
          <span className="size-2.5 bg-mint ring-2 ring-line" aria-hidden="true" />
          Disponible · alternance 2026
        </span>
        <time aria-label={`Heure : ${time}`}>{time}</time>
      </div>
    </header>
  )
}

/* Fond d'écran animé : 15 pixels qui montent lentement (CSS seulement). */
const PIXELS = [
  ['5%', 4, 'mint', 0.55, 46, -3, 18],
  ['12%', 3, 'white', 0.4, 62, -20, -10],
  ['19%', 5, 'sun', 0.45, 54, -38, 12],
  ['27%', 3, 'sky', 0.5, 70, -8, -16],
  ['34%', 4, 'pink', 0.4, 58, -44, 10],
  ['42%', 3, 'white', 0.35, 66, -27, 14],
  ['49%', 5, 'mint', 0.4, 50, -12, -12],
  ['56%', 3, 'sun', 0.5, 74, -52, 8],
  ['63%', 4, 'sky', 0.45, 56, -31, -14],
  ['70%', 3, 'white', 0.4, 68, -6, 16],
  ['77%', 5, 'pink', 0.35, 60, -40, -8],
  ['84%', 3, 'mint', 0.5, 72, -18, 12],
  ['90%', 4, 'sun', 0.4, 52, -48, -18],
  ['95%', 3, 'sky', 0.45, 64, -24, 10],
  ['38%', 2, 'white', 0.5, 80, -60, 6],
]

export function Wallpaper() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PIXELS.map(([x, s, c, o, d, delay, dx], i) => (
        <span
          key={i}
          className="wall-pixel"
          style={{
            left: x,
            '--s': `${s}px`,
            '--c': c === 'white' ? '#FFFFFF' : `var(--color-${c})`,
            '--o': o,
            '--d': `${d}s`,
            '--delay': `${delay}s`,
            '--dx': `${dx}px`,
          }}
        />
      ))}
      <img
        src="/logo-blanc.png"
        alt=""
        className="wall-logo absolute left-1/2 top-1/2 size-40 object-contain"
        style={{ opacity: 0.07, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  )
}

/* Icônes du bureau (desktop). Un clic suffit pour ouvrir. */
export function DesktopIcons({ open }) {
  return (
    <nav aria-label="Bureau" className="absolute left-3 top-3 bottom-3 z-0">
      <ul className="flex h-full flex-col flex-wrap content-start gap-1">
        {DESKTOP.map((d) => {
          const inner = (
            <>
              <PixelIcon name={d.icon} size={48} />
              <span className="mt-1 line-clamp-2 px-1 text-center font-pixel text-sm leading-tight text-white [text-shadow:1px_1px_0_#141414] group-hover:bg-sky group-hover:text-line group-hover:[text-shadow:none] group-focus-visible:bg-sky group-focus-visible:text-line group-focus-visible:[text-shadow:none]">
                {d.label}
              </span>
            </>
          )
          const cls = 'group flex w-24 flex-col items-center p-2 outline-none focus-visible:outline-2 focus-visible:outline-sky'
          return (
            <li key={d.label}>
              {d.href ? (
                <a href={d.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <button type="button" onClick={() => open(d.app)} className={cls}>
                  {inner}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* Menu Démarrer */
function StartMenu({ open, onClose, os }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const first = ref.current?.querySelector('[role="menuitem"]')
    first?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    const onDown = (e) => {
      if (!ref.current?.contains(e.target) && !e.target.closest('#start-button')) onClose()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open, onClose])

  const items = DESKTOP.filter((d) => d.app !== 'trash')
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="start-menu"
          role="menu"
          aria-label="Menu Démarrer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12, transition: { duration: 0.1 } }}
          className="absolute bottom-14 left-2 z-[70] flex w-72 border-2 border-line bg-win shadow-[6px_6px_0_rgba(6,12,36,0.85)]"
        >
          <div className="flex w-9 items-end justify-center bg-line pb-3">
            <span className="font-pixel text-lg font-bold text-win [writing-mode:vertical-rl] rotate-180">AdamOS 26</span>
          </div>
          <ul className="max-h-[calc(100dvh-8rem)] flex-1 overflow-y-auto py-1">
            {items.map((d) => (
              <li key={d.label} role="none">
                {d.href ? (
                  <a role="menuitem" href={d.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className="flex min-h-11 items-center gap-3 px-3 font-pixel text-base hover:bg-sky focus-visible:bg-sky focus-visible:outline-none">
                    <PixelIcon name={d.icon} size={24} /> {d.label}
                  </a>
                ) : (
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onClose()
                      os.open(d.app)
                    }}
                    className="flex min-h-11 w-full items-center gap-3 px-3 text-left font-pixel text-base hover:bg-sky focus-visible:bg-sky focus-visible:outline-none"
                  >
                    <PixelIcon name={d.icon} size={24} /> {d.label}
                  </button>
                )}
              </li>
            ))}
            <li role="separator" className="mx-2 my-1 border-t-2 border-line/20" />
            {[
              ['legal', 'Mentions légales'],
              ['privacy', 'Confidentialité'],
            ].map(([id, label]) => (
              <li key={id} role="none">
                <button
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    onClose()
                    os.open(id)
                  }}
                  className="flex min-h-11 w-full items-center gap-3 px-3 text-left font-pixel text-base hover:bg-sky focus-visible:bg-sky focus-visible:outline-none"
                >
                  <PixelIcon name="doc" size={24} /> {label}
                </button>
              </li>
            ))}
            <li role="separator" className="mx-2 my-1 border-t-2 border-line/20" />
            <li role="none">
              <button
                role="menuitem"
                type="button"
                onClick={() => {
                  onClose()
                  os.open('shutdown')
                }}
                className="flex min-h-11 w-full items-center gap-3 px-3 text-left font-pixel text-base hover:bg-tomato focus-visible:bg-tomato focus-visible:outline-none"
              >
                <PixelIcon name="computer" size={24} /> Éteindre…
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* Barre des tâches */
export function Taskbar({ state, activeId, os, mobile }) {
  const [startOpen, setStartOpen] = useState(false)
  const time = useClock()

  if (mobile) {
    const dock = ['projects', 'system', 'journal', 'mail']
    return (
      <nav aria-label="Dock" className="fixed inset-x-0 bottom-0 z-[60] flex h-16 items-center justify-around border-t-2 border-line bg-win px-2">
        {dock.map((id) => (
          <button key={id} type="button" onClick={() => os.open(id)} aria-label={APPS[id].title} className="grid size-12 place-items-center active:translate-y-px">
            <PixelIcon name={APPS[id].icon} size={34} />
          </button>
        ))}
      </nav>
    )
  }

  return (
    <div className="relative z-[60] flex h-12 shrink-0 items-center gap-2 border-t-2 border-line bg-win px-2">
      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} os={os} />
      <button
        id="start-button"
        type="button"
        aria-haspopup="menu"
        aria-expanded={startOpen}
        aria-controls="start-menu"
        aria-pressed={startOpen}
        onClick={() => setStartOpen((v) => !v)}
        className="btn flex min-h-9 shrink-0 items-center gap-2 bg-sun px-3 font-pixel text-base font-bold"
      >
        <img src="/logo-noir.png" alt="" className="size-5 object-contain" />
        Démarrer
      </button>
      <ul className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1" aria-label="Fenêtres ouvertes">
        {state.ids.map((id) => {
          const w = state.wins[id]
          const app = APPS[w.app]
          const title = typeof app.title === 'function' ? app.title(w.payload) : app.title
          const isActive = id === activeId
          return (
            <li key={id} className="min-w-0">
              <button
                type="button"
                onClick={() => os.taskbarClick(id)}
                aria-pressed={isActive}
                className={`flex h-9 w-44 max-w-full items-center gap-2 border-2 border-line px-2 font-pixel text-sm ${
                  isActive ? `${ACCENT[app.accent]} shadow-[inset_2px_2px_0_rgba(0,0,0,0.25)]` : w.min ? 'stripes' : 'bg-win hover:bg-white'
                }`}
              >
                <PixelIcon name={app.icon} size={18} />
                <span className="truncate">{title}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <nav aria-label="Informations légales" className="hidden shrink-0 items-center gap-1 lg:flex">
        <button type="button" onClick={() => os.open('legal')} className="min-h-9 px-2 font-pixel text-sm underline-offset-2 hover:underline">
          Mentions légales
        </button>
        <button type="button" onClick={() => os.open('privacy')} className="min-h-9 px-2 font-pixel text-sm underline-offset-2 hover:underline">
          Confidentialité
        </button>
      </nav>
      <div className="flex h-9 shrink-0 items-center gap-2 border-2 border-line/40 bg-win-2 px-3 font-pixel text-sm">
        <span>FR</span>
        <span aria-hidden="true">·</span>
        <span>{time}</span>
      </div>
    </div>
  )
}

/* Accueil mobile : le "hero" + les applications en grille */
export function MobileHome({ open }) {
  return (
    <div className="h-full overflow-auto px-4 pb-24 pt-5">
      <section className="border-2 border-line bg-win p-5 shadow-[5px_5px_0_rgba(6,12,36,0.85)]">
        <p className="font-pixel text-sm uppercase tracking-wider text-muted">AdamOS 26</p>
        <p className="mt-2 font-pixel text-4xl font-bold leading-none">Adam Bettayeb</p>
        <p className="mt-2 font-pixel text-xl font-semibold">
          <span className="bg-sun px-1">Développeur full stack</span>
        </p>
        <p className="mt-3 leading-relaxed">
          Interface, serveur et base de données. Je cherche une alternance d'un an pour la rentrée 2026.
        </p>
        <div className="mt-4 grid gap-2">
          <button type="button" onClick={() => open('quick')} className="btn min-h-11 bg-sun font-pixel text-base font-medium">
            Tout voir en 30 secondes
          </button>
          <button type="button" onClick={() => open('projects')} className="btn min-h-11 bg-tomato font-pixel text-base font-medium">
            Ouvrir mes projets
          </button>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn flex min-h-11 items-center justify-center bg-win font-pixel text-base font-medium">
            CV (PDF)
          </a>
        </div>
      </section>

      <ul className="mt-6 grid grid-cols-4 gap-y-4">
        {DESKTOP.map((d) => {
          const inner = (
            <>
              <PixelIcon name={d.icon} size={44} />
              <span className="mt-1 line-clamp-2 text-center font-pixel text-xs leading-tight text-white [text-shadow:1px_1px_0_#141414]">{d.label}</span>
            </>
          )
          const cls = 'flex w-full flex-col items-center p-1'
          return (
            <li key={d.label}>
              {d.href ? (
                <a href={d.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <button type="button" onClick={() => open(d.app)} className={cls}>
                  {inner}
                </button>
              )}
            </li>
          )
        })}
      </ul>

      <nav aria-label="Informations légales" className="mt-8 flex justify-center gap-2">
        <button type="button" onClick={() => open('legal')} className="min-h-11 px-3 font-pixel text-sm text-white underline underline-offset-4">
          Mentions légales
        </button>
        <button type="button" onClick={() => open('privacy')} className="min-h-11 px-3 font-pixel text-sm text-white underline underline-offset-4">
          Confidentialité
        </button>
      </nav>
    </div>
  )
}

/* Écran de démarrage (court, passable, une fois par session) */
export function BootScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1500)
    const skip = () => onDone()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [onDone])

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="fixed inset-0 z-[100] grid place-items-center bg-desk text-white"
      role="status"
      aria-label="Démarrage d'AdamOS"
    >
      <div className="flex flex-col items-center">
        <img src="/logo-blanc.png" alt="" className="size-16 object-contain" />
        <p className="mt-4 font-pixel text-3xl font-bold">AdamOS 26</p>
        <div className="mt-6 h-4 w-56 border-2 border-white p-0.5">
          <motion.div className="h-full bg-sun" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.3, ease: 'easeInOut' }} />
        </div>
        <p className="mt-4 font-pixel text-sm text-white/80">Cliquez ou appuyez sur une touche pour passer</p>
      </div>
    </motion.div>
  )
}

/* Écran "vous pouvez éteindre" (clin d'œil) */
export function OffScreen({ onReboot }) {
  return (
    <button
      type="button"
      onClick={onReboot}
      className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-black px-6 text-center"
    >
      <span>
        <span className="block font-pixel text-2xl text-[#FF9F43] md:text-4xl">Vous pouvez maintenant éteindre votre ordinateur.</span>
        <span className="mt-6 block font-pixel text-base text-white/70">(Ou cliquer pour redémarrer AdamOS.)</span>
      </span>
    </button>
  )
}
