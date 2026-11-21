import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Window from './os/Window'
import { APPS, HASH_APPS } from './os/apps'
import { BootScreen, DesktopIcons, MenuBar, MobileHome, OffScreen, Taskbar } from './os/Shell'

/* ---------- Gestionnaire de fenêtres ---------- */

const initial = { wins: {}, ids: [], order: [] }

function reducer(s, a) {
  switch (a.type) {
    case 'open': {
      if (s.wins[a.id]) {
        return { ...s, wins: { ...s.wins, [a.id]: { ...s.wins[a.id], min: false } }, order: [...s.order.filter((x) => x !== a.id), a.id] }
      }
      return { wins: { ...s.wins, [a.id]: a.win }, ids: [...s.ids, a.id], order: [...s.order, a.id] }
    }
    case 'close': {
      const wins = { ...s.wins }
      delete wins[a.id]
      return { wins, ids: s.ids.filter((x) => x !== a.id), order: s.order.filter((x) => x !== a.id) }
    }
    case 'focus': {
      const w = s.wins[a.id]
      if (!w || (s.order[s.order.length - 1] === a.id && !w.min)) return s
      return { ...s, wins: { ...s.wins, [a.id]: { ...w, min: false } }, order: [...s.order.filter((x) => x !== a.id), a.id] }
    }
    case 'min':
      return { ...s, wins: { ...s.wins, [a.id]: { ...s.wins[a.id], min: true } }, order: [a.id, ...s.order.filter((x) => x !== a.id)] }
    default:
      return s
  }
}

function topVisible(s, exclude) {
  for (let i = s.order.length - 1; i >= 0; i--) {
    const id = s.order[i]
    if (id !== exclude && !s.wins[id]?.min) return id
  }
  return null
}

function place(app, count, area, at) {
  const w = Math.min(app.w, area.w - 24)
  const h = Math.min(app.h, area.h - 16)
  let x = at?.x ?? (area.w >= 900 ? 132 : 12) + (count % 6) * 36
  let y = at?.y ?? 12 + (count % 6) * 30
  if (x + w > area.w - 8) x = Math.max(8, area.w - w - 8)
  if (y + h > area.h - 8) y = Math.max(8, area.h - h - 8)
  return { x, y, w, h }
}

function useMedia(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [m, setM] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}

/* ---------- AdamOS ---------- */

export default function App() {
  const mobile = useMedia('(max-width: 767px)')
  const [state, dispatch] = useReducer(reducer, initial)
  const stateRef = useRef(state)
  stateRef.current = state
  const deskRef = useRef(null)
  const [off, setOff] = useState(false)
  const [booted, setBooted] = useState(() => {
    try {
      return sessionStorage.getItem('adamos-booted') === '1' || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return true
    }
  })

  const area = () => {
    const r = deskRef.current?.getBoundingClientRect()
    return { w: r?.width || window.innerWidth, h: r?.height || window.innerHeight - 84 }
  }

  const open = useCallback((appId, payload, at) => {
    const app = APPS[appId]
    const id = payload?.id ? `${appId}:${payload.id}` : appId
    const s = stateRef.current
    const win = s.wins[id] ? null : { id, app: appId, payload, min: false, ...place(app, s.ids.length, area(), at) }
    dispatch({ type: 'open', id, win })
  }, [])

  const close = useCallback((id) => {
    const next = topVisible(stateRef.current, id)
    dispatch({ type: 'close', id })
    if (next) setTimeout(() => document.getElementById(`win-${next}`)?.focus({ preventScroll: true }), 0)
  }, [])

  const os = {
    open,
    close,
    shutdown: () => setOff(true),
    taskbarClick: (id) => {
      const s = stateRef.current
      if (s.wins[id]?.min) dispatch({ type: 'focus', id })
      else if (topVisible(s) === id) dispatch({ type: 'min', id })
      else dispatch({ type: 'focus', id })
    },
  }

  // Bureau : Bienvenue.txt ouvert au démarrage (+ Projets si l'écran est large).
  useLayoutEffect(() => {
    if (mobile || stateRef.current.ids.length) return
    const a = area()
    if (a.w >= 1320) open('projects', undefined, { x: a.w - Math.min(760, a.w - 24) - 24, y: 56 })
    open('welcome', undefined, { x: a.w >= 900 ? 132 : 12, y: 12 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile])

  // Ancres partageables (#mentions-legales, #confidentialite) : ouvrent la fenêtre correspondante.
  useEffect(() => {
    const fromHash = () => {
      const appId = HASH_APPS[window.location.hash]
      if (appId) open(appId)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [open])

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem('adamos-booted', '1')
    } catch {
      // stockage indisponible : l'écran de démarrage réapparaîtra, sans gravité
    }
    setBooted(true)
  }, [])

  const activeId = topVisible(state)

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-[100dvh] flex-col">
        <MenuBar />

        <main ref={deskRef} className="desk relative min-h-0 flex-1 overflow-hidden">
          <img src="/logo-blanc.png" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.07]" />

          {mobile ? <MobileHome open={open} /> : <DesktopIcons open={open} />}

          <AnimatePresence>
            {state.ids.map((id) => {
              const w = state.wins[id]
              const app = APPS[w.app]
              const title = typeof app.title === 'function' ? app.title(w.payload) : app.title
              const Comp = app.Comp
              return (
                <Window
                  key={id}
                  win={w}
                  app={app}
                  title={title}
                  active={id === activeId}
                  mobile={mobile}
                  z={20 + state.order.indexOf(id)}
                  constraintsRef={deskRef}
                  onFocus={() => dispatch({ type: 'focus', id })}
                  onClose={() => close(id)}
                  onMinimize={() => dispatch({ type: 'min', id })}
                >
                  <Comp payload={w.payload} os={os} close={() => close(id)} />
                </Window>
              )
            })}
          </AnimatePresence>
        </main>

        <Taskbar state={state} activeId={activeId} os={os} mobile={mobile} />
      </div>

      <AnimatePresence>{!booted && <BootScreen onDone={finishBoot} />}</AnimatePresence>
      {off && <OffScreen onReboot={() => setOff(false)} />}
    </MotionConfig>
  )
}
