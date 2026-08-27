import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, fadeUp, stagger, viewport } from '../lib/motion'

const PROJECTS = [
  {
    id: 'motus',
    category: 'Développement back-end',
    title: 'Motus',
    subtitle: 'Jeu web en PHP orienté objet & MVC, sans framework',
    description:
      "Un jeu web complet, sécurisé et jouable, développé sans framework en PHP orienté objet et architecture MVC stricte. La grille est générée côté serveur avec la librairie GD pour empêcher toute triche, avec sessions sécurisées et requêtes préparées via PDO.",
    images: ['/projets/motus-1.webp', '/projets/motus-2.webp', '/projets/motus-3.webp'],
    stack: ['PHP OOP', 'MVC', 'MySQL', 'GD Library', 'HTML/CSS'],
    links: [
      { label: 'Jouer en ligne', href: 'https://motusdragonballz.gamer.gd/' },
    ],
  },
  {
    id: 'bravery-quest',
    category: 'Développement web',
    title: 'Bravery Quest',
    subtitle: 'Jeu web multijoueur, réalisé en équipe',
    description:
      "Un jeu web réalisé en équipe, jouable directement dans le navigateur : rendu HTML5 Canvas en JavaScript et parties en temps réel (solo ou duo) via Socket.IO, avec un serveur Node.js hébergé sur Render.",
    images: ['/projets/bravery-1.webp', '/projets/bravery-2.webp', '/projets/bravery-3.webp'],
    stack: ['JavaScript', 'Canvas', 'Node.js', 'Socket.IO'],
    links: [{ label: 'Jouer en ligne', href: 'https://sae402.onrender.com/' }],
  },
  {
    id: 'dataviz',
    category: 'Data Visualisation',
    title: 'La donnée mise en image',
    subtitle: 'Dashboard interactif avec D3.js · SAE 303',
    description:
      "Application interactive pour explorer l'opinion des Français sur le changement climatique, à partir du Baromètre ADEME. Graphiques dynamiques et carte SVG sur-mesure construits avec D3.js : barres, camembert, courbes, histogramme et nuages de points.",
    images: ['/projets/303-1.webp', '/projets/303-2.webp', '/projets/303-3.webp'],
    stack: ['JavaScript', 'D3.js', 'SVG', 'HTML/CSS', 'Data'],
    links: [{ label: 'Voir le projet', href: '/SAE303/index.html' }],
  },
  {
    id: 'devfront',
    category: 'Front-end',
    title: 'DevFront',
    subtitle: 'Une série de mini-projets HTML, CSS & JS',
    description:
      "Un ensemble de mini-projets réalisés en cours de développement front-end, en HTML, CSS et JavaScript : autant d'exercices pour travailler l'intégration, la mise en page et les interactions.",
    images: ['/projets/devfront1.webp', '/projets/devfront2.webp', '/projets/devfront3.webp'],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    links: [{ label: 'Voir le projet', href: '/devfront/index.html' }],
  },
  {
    id: 'portfolio',
    category: 'Portfolio professionnel',
    title: 'Portfolio',
    subtitle: 'React, Tailwind CSS & Framer Motion',
    description:
      "Le portfolio que vous parcourez, conçu et développé sur-mesure en React : design personnalisé, thème clair et sombre, animations Framer Motion, et projets consultables directement en ligne.",
    images: ['/projets/portfolio-1.webp', '/projets/portfolio-2.webp', '/projets/portfolio-3.webp'],
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    links: [],
  },
]

function ArrowLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

function Row({ p, index, isOpen, onToggle }) {
  const reveal = (delay) => ({
    className: `transition-all duration-[600ms] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`,
    style: {
      transitionDelay: isOpen ? `${delay}ms` : '0ms',
      transitionTimingFunction: `cubic-bezier(${EASE.join(',')})`,
    },
  })

  return (
    <motion.div variants={fadeUp} className="group relative overflow-hidden border-b border-line">
      <span
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 45%)', opacity: isOpen ? 1 : undefined }}
      />
      <span className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span
          className="row-sheen absolute inset-y-0 left-0 w-1/4"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)', transform: 'translateX(-260%) skewX(-12deg)' }}
        />
      </span>
      <span
        className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-center scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
        style={{ background: 'var(--color-accent)', transform: isOpen ? 'scaleY(1)' : undefined, transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
      />
      <span
        className="pointer-events-none absolute bottom-1 right-3 z-0 font-display text-[6rem] font-bold leading-none tracking-tight text-ink opacity-[0.035] transition-all duration-700 group-hover:-translate-y-1 group-hover:translate-x-1.5 md:right-6 md:text-[9rem]"
        style={{ opacity: isOpen ? 0.07 : undefined, color: isOpen ? 'var(--color-accent)' : undefined }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative flex w-full items-center gap-5 py-6 pl-5 pr-2 text-left md:gap-8 md:py-8 md:pl-8"
      >
        <span
          className="font-display text-sm font-medium tabular-nums text-muted transition-colors duration-500 md:text-base"
          style={{ color: isOpen ? 'var(--color-accent)' : undefined }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="flex-1">
          <span
            className="relative inline-block font-display text-2xl font-medium leading-tight tracking-tight transition-[transform,color] duration-500 group-hover:translate-x-2 sm:text-3xl md:text-[2.75rem]"
            style={{ color: isOpen ? 'var(--color-accent)' : undefined, transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
          >
            {p.title}
            <span
              className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-[600ms] group-hover:scale-x-100"
              style={{ background: 'var(--color-accent)', transform: isOpen ? 'scaleX(1)' : undefined, transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
            />
          </span>
        </span>

        <span className="hidden text-xs uppercase tracking-[0.18em] text-muted transition-colors duration-500 group-hover:text-ink-soft sm:block">
          {p.category}
        </span>

        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:scale-105 md:h-12 md:w-12"
          style={{ borderColor: isOpen ? 'var(--color-accent)' : undefined, background: isOpen ? 'var(--color-accent)' : 'transparent' }}
        >
          <span
            className="relative block h-4 w-4 transition-colors"
            style={{ color: isOpen ? '#fff' : 'var(--color-ink)' }}
          >
            <span className="absolute left-1/2 top-1/2 h-[1.6px] w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
            <span
              className="absolute left-1/2 top-1/2 h-4 w-[1.6px] -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-500"
              style={{ transform: isOpen ? 'translate(-50%,-50%) rotate(90deg) scaleY(0)' : undefined, transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
            />
          </span>
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-[600ms]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
      >
        <div className="overflow-hidden">
          <div className="pb-8 pl-[3.25rem] pr-4 md:pl-[5.5rem]">
            {p.images.length > 0 && (
              <div
                className={`mb-7 grid gap-3 sm:grid-cols-3 ${reveal(40).className}`}
                style={reveal(40).style}
              >
                {p.images.map((src, i) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/img block overflow-hidden rounded-xl border border-line bg-surface"
                  >
                    <img
                      src={src}
                      alt={`${p.title}, aperçu ${i + 1}`}
                      loading="lazy"
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                  </a>
                ))}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p
                  className={`mb-3 text-sm font-medium text-accent ${reveal(80).className}`}
                  style={reveal(80).style}
                >
                  {p.subtitle}
                </p>
                <p
                  className={`max-w-xl text-[15px] leading-relaxed text-ink-soft ${reveal(140).className}`}
                  style={reveal(140).style}
                >
                  {p.description}
                </p>
                {p.links.length > 0 && (
                  <div
                    className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 ${reveal(240).className}`}
                    style={reveal(240).style}
                  >
                    {p.links.map((l) => (
                      <ArrowLink key={l.label} href={l.href}>
                        {l.label}
                      </ArrowLink>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap content-start gap-2 md:justify-end">
                {p.stack.map((s, i) => {
                  const r = reveal(200 + i * 70)
                  return (
                    <span
                      key={s}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${r.className}`}
                      style={{ ...r.style, borderColor: 'color-mix(in srgb, var(--color-accent) 34%, transparent)', color: 'var(--color-ink-soft)' }}
                    >
                      {s}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(-1)

  return (
    <section id="projects" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-flex text-sm font-medium uppercase tracking-[0.25em] text-accent md:text-base"
            >
              Projets
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl"
            >
              Une sélection de mes réalisations.
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-xs text-ink-soft">
            Cliquez sur un projet pour déplier son détail.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="border-t border-line"
        >
          {PROJECTS.map((p, i) => (
            <Row
              key={p.id}
              p={p}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
