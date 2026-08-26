import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

const LINKS = [
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Parcours', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      >
        <nav
          className={`mt-4 flex w-full max-w-4xl items-center justify-between rounded-full px-3 py-2 transition-all duration-700 ${
            scrolled
              ? 'border border-line bg-canvas/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl'
              : 'border border-transparent bg-transparent'
          }`}
          style={{ transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 pl-2 font-display text-[15px] font-semibold tracking-tight"
          >
            <Logo className="h-8 w-8 text-ink" />
            <span className="hidden sm:inline">Adam Bettayeb</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <a
              href="#contact"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-transform duration-300 hover:scale-[0.97]"
            >
              Me contacter
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 bg-ink transition-all duration-500 ${open ? 'top-1.5 rotate-45' : ''}`}
                  style={{ transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-ink transition-all duration-500 ${open ? 'bottom-1.5 -rotate-45' : ''}`}
                  style={{ transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-canvas/85 px-8 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 * i }}
                  className="font-display text-4xl font-medium tracking-tight"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
