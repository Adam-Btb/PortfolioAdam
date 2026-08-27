import { useEffect, useState } from 'react'
import { EASE } from '../lib/motion'

export default function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Remonter en haut de la page"
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink text-canvas shadow-[0_12px_30px_-10px_rgba(0,0,0,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{ transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
