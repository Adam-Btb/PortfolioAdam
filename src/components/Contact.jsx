import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../lib/motion'
import MagneticButton from './MagneticButton'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_16%,transparent),transparent_65%)] blur-2xl" />
        <div className="absolute -right-10 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_65%)] blur-2xl" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-6xl"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex text-sm font-medium uppercase tracking-[0.25em] text-accent md:text-base"
        >
          Construisons quelque chose ensemble
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="mt-8 max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl"
        >
          Vous cherchez un alternant capable de coder, d'analyser et de
          comprendre vos utilisateurs&nbsp;?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
        >
          Je suis disponible pour une alternance d'un an dès la rentrée 2026.
          Discutons-en directement, je réponds vite.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="tel:+33664502568" variant="primary">
            06 64 50 25 68
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
            href="https://www.linkedin.com/in/adambettayeb/"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            LinkedIn
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted"
        >
          <a
            href="mailto:adam.bettayeb26@gmail.com"
            className="transition-colors hover:text-ink"
          >
            adam.bettayeb26@gmail.com
          </a>
          <span className="hidden h-1 w-1 rounded-full bg-muted sm:block" />
          <span>Alternance · 1 sem. école / 1 sem. entreprise · 2026-2027</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
