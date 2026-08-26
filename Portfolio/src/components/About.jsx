import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../lib/motion'

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:py-40">
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
            Développeur web, à l'aise avec le{' '}
            <span className="text-accent">code</span> comme avec les{' '}
            <span className="text-accent">données</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            Je suis en 3<sup>e</sup> année de BUT MMI. Je conçois des sites et
            des applications web, et je travaille aussi la visualisation de
            données. Lors de mon stage chez{' '}
            <span className="font-medium text-ink">Air Liquide</span>, j'ai
            appris à analyser des indicateurs (KPI). Je recherche une alternance
            pour continuer à progresser en équipe.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
