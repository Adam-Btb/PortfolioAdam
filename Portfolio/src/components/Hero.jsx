import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import MagneticButton from './MagneticButton'

const word = {
  hidden: { opacity: 0, y: '110%' },
  visible: (i) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 1, ease: EASE, delay: 0.35 + i * 0.05 },
  }),
}

const LINE_1 = ['Bonjour,', 'je', 'suis', 'Adam', 'Bettayeb.']
const LINE_2 = ['Développeur', 'web', 'en', 'recherche', "d'alternance."]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 top-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.14),transparent_65%)] blur-2xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-20 top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_65%)] blur-2xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--color-canvas))]" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mb-6"
        >
          <span className="text-base font-medium uppercase tracking-[0.22em] text-accent md:text-lg">
            Disponible pour une Alternance à la rentrée 2026
          </span>
        </motion.div>

        <h1 className="max-w-none font-display text-[12vw] font-semibold leading-[0.96] tracking-tight sm:text-[8.5vw] md:text-[5.75vw] lg:text-[4.25rem]">
          <span className="block">
            {LINE_1.map((w, i) => (
              <span
                key={i}
                className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span custom={i} variants={word} initial="hidden" animate="visible" className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block text-accent">
            {LINE_2.map((w, i) => (
              <span
                key={i}
                className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span custom={i + LINE_1.length} variants={word} initial="hidden" animate="visible" className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft"
        >
          Étudiant préparant ma 3<sup>e</sup> année de BUT MMI, je conçois des
          sites et applications web, du back-end à l'interface. Je recherche une{' '}
          <span className="font-medium text-ink">
            alternance d'un an (1 sem. école / 1 sem. entreprise) pour 2026-2027.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="#projects" variant="primary">
            Voir mes projets
          </MagneticButton>
          <MagneticButton
            href="/CV_Adam_Bettayeb.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M14 3v4a1 1 0 0 0 1 1h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 3h8l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            }
          >
            Voir mon CV
          </MagneticButton>
          <MagneticButton
            href="/calendrier-alternance.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            }
          >
            Voir le rythme d'alternance
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="mx-auto mt-12 flex w-full max-w-6xl items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted"
      >
        <span className="h-px w-10 bg-line" />
        Défiler pour explorer
      </motion.div>
    </section>
  )
}
