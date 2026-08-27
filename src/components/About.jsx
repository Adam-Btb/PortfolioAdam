import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../lib/motion'

const FACTS = [
  {
    label: 'Formation',
    value: 'BUT MMI · 3ᵉ année',
    sub: 'Parcours Développement web & dispositifs interactifs',
  },
  { label: 'Recherche', value: 'Alternance 2026-2027' },
  { label: 'Domaines', value: 'Web · Data · IA' },
]

const SOFT = ["Travail d'équipe", 'Adaptabilité', 'Persévérance', 'Communication']

export default function About() {
  return (
    <section id="about" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex text-sm font-medium uppercase tracking-[0.25em] text-accent md:text-base"
          >
            À propos
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-8 max-w-4xl font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
          >
            Développeur web &amp; <span className="text-accent">data</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            Étudiant en 3<sup>e</sup> année de BUT MMI, je conçois des sites et
            des applications web, du back-end à l'interface.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            Lors de mon stage chez{' '}
            <span className="font-medium text-ink">Air Liquide</span>, j'ai
            contribué à la transition vers l'
            <span className="font-medium text-ink">intelligence artificielle</span>. Cette expérience m'a appris à
            m'adapter vite aux nouveaux outils. Curieux et persévérant, je cherche
            une alternance pour continuer à apprendre et à progresser en équipe.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-3"
        >
          {FACTS.map((f) => (
            <motion.div key={f.label} variants={fadeUp}>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {f.label}
              </span>
              <p className="mt-2 font-display text-lg font-medium text-ink">
                {f.value}
              </p>
              {f.sub && (
                <p className="mt-1 text-sm leading-snug text-ink-soft">{f.sub}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Savoir-être
          </span>
          {SOFT.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink-soft"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
