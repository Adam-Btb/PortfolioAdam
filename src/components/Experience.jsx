import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../lib/motion'

const EXPERIENCES = [
  {
    period: 'Avr. - Juil. 2026',
    role: 'Support digital & analyse de données',
    place: 'Air Liquide · Stage',
    text: "Analyse de KPI, développement de dashboards, support de la roadmap digitale et reporting.",
  },
  {
    period: '2024',
    role: 'Technicien logistique',
    place: 'Intérim',
    text: "Diverses missions d'intérim en logistique.",
  },
  {
    period: 'Déc. 2023 - Janv. 2024',
    role: 'Éducateur spécialisé',
    place: 'Les enfants inadaptés de Noisy-le-Sec',
    text: "Accompagnement éducatif et social au quotidien, en lien avec les familles.",
  },
  {
    period: '2022 - 2023',
    role: 'Conseiller de vente',
    place: 'Bouygues Telecom · Alternance',
    text: "Analyse des besoins clients, argumentation et vente de solutions numériques.",
  },
]

const FORMATION = [
  {
    period: '2024 - 2027',
    role: "BUT MMI, Métiers du Multimédia et de l'Internet",
    place: 'IUT de Bobigny · Sorbonne Paris Nord',
    text: 'Parcours Développement web et dispositifs interactifs.',
  },
  {
    period: '2022 - 2023',
    role: 'BTS MCO, Management Commercial Opérationnel',
    place: 'En alternance · Bouygues Telecom',
    text: '',
  },
  {
    period: '2019 - 2021',
    role: "Bac STI2D, option Systèmes d'Information et Numérique",
    place: 'Mention Bien',
    text: '',
  },
]

function Timeline({ items }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="border-t border-line"
    >
      {items.map((it) => (
        <motion.div
          key={it.period + it.role}
          variants={fadeUp}
          className="grid gap-1 border-b border-line py-6 md:grid-cols-[170px_1fr] md:gap-8 md:py-7"
        >
          <span className="text-sm font-medium text-muted">{it.period}</span>
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {it.role}
            </h3>
            <p className="mt-0.5 text-sm text-ink-soft">{it.place}</p>
            {it.text && (
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                {it.text}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-14"
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
            Expériences & formation.
          </motion.h2>
        </motion.div>

        <div className="space-y-16">
          <div>
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-muted"
            >
              Expériences
            </motion.h3>
            <Timeline items={EXPERIENCES} />
          </div>

          <div>
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-muted"
            >
              Formation
            </motion.h3>
            <Timeline items={FORMATION} />
          </div>
        </div>
      </div>
    </section>
  )
}
