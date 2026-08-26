import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../lib/motion'

const XP = [
  {
    role: 'Analyste Data & KPI',
    type: 'Stage',
    company: 'Air Liquide',
    text: "Collecte, analyse et interprétation d'indicateurs de performance. J'ai appris à transformer des données brutes en insights exploitables, une compétence que je réinvestis directement dans mes projets de Data Visualisation.",
    tags: ['Analyse de données', 'KPI', 'Reporting'],
  },
  {
    role: 'Conseiller commercial',
    type: 'Alternance',
    company: 'Bouygues Telecom',
    text: "Analyse des besoins clients et proposition de solutions adaptées. Une expérience du terrain qui m'a appris à écouter, reformuler et convaincre. Des réflexes précieux pour concevoir des produits réellement centrés utilisateur.",
    tags: ['Relation client', 'Analyse de besoins', 'Communication'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex text-sm font-medium uppercase tracking-[0.25em] text-accent md:text-base"
          >
            Parcours
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl"
          >
            Une expérience terrain qui nourrit ma vision produit.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative"
        >
          <div className="absolute left-0 top-2 hidden h-full w-px bg-line md:block" />

          <div className="space-y-4">
            {XP.map((x) => (
              <motion.div
                key={x.company}
                variants={fadeUp}
                className="group relative rounded-[1.6rem] border border-line bg-surface p-1.5 backdrop-blur-sm md:ml-8"
              >
                <span className="absolute -left-[2.6rem] top-9 hidden h-3 w-3 rounded-full border-2 border-canvas bg-accent md:block" />

                <div className="rounded-[calc(1.6rem-0.375rem)] bg-surface-2 p-7 shadow-[inset_0_1px_1px_var(--color-highlight)] md:p-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {x.role}
                    </h3>
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                      {x.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink-soft">
                    {x.company}
                  </p>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                    {x.text}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {x.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-ink-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
