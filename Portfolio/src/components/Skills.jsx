import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../lib/motion'

const MARQUEE = [
  'HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'SQL / MySQL',
  'C#', 'Unity', 'D3.js', 'Figma', 'GitHub', 'POO / MVC',
]

const GROUPS = [
  { title: 'Front-end', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Back-end & Données', items: ['PHP (POO/MVC)', 'SQL / MySQL', 'C#'] },
  { title: 'Data & Dataviz', items: ['D3.js', 'Analyse de KPI'] },
  { title: 'Outils & Design', items: ['Figma', 'GitHub', 'Unity'] },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="marquee-mask relative flex overflow-hidden border-y border-line py-6">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-2xl font-medium text-ink-soft md:text-3xl"
            >
              {s}
              <span className="h-6 w-px shrink-0 bg-line md:h-7" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {GROUPS.map((g) => (
            <motion.div key={g.title} variants={fadeUp}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-muted">
                {g.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-[17px] text-ink"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
