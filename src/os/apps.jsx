import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { EMAIL, JOURNAL, PROJECTS, PROOFS, SPECS, TIERS } from '../data/content'
import { LEGAL_NOTICE, LEGAL_UPDATED, PRIVACY } from '../data/legal'
import MotusGame from '../components/MotusGame'
import { PixelIcon } from './icons'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqpdala'
export const CV_URL = '/CV_Adam_Bettayeb.pdf'

/* ---------- Petits éléments partagés ---------- */

function Btn({ as = 'button', variant = 'win', className = '', ...props }) {
  const Comp = as
  const v = {
    win: 'bg-win',
    sun: 'bg-sun',
    mint: 'bg-mint',
    pink: 'bg-pink',
    tomato: 'bg-tomato',
    sky: 'bg-sky',
  }
  return (
    <Comp
      {...(Comp === 'button' ? { type: 'button' } : {})}
      className={`btn inline-flex min-h-11 items-center justify-center gap-2 px-4 font-pixel text-base font-medium ${v[variant]} ${className}`}
      {...props}
    />
  )
}

function LayerChips({ layers, size = 'sm' }) {
  const label = TIERS.map((t) => `${t.label} : ${layers[t.id] ? 'oui' : 'non'}`).join(', ')
  return (
    <span className="flex gap-1" role="img" aria-label={`Couches codées — ${label}`}>
      {TIERS.map((t) => (
        <span
          key={t.id}
          className={`grid place-items-center border-2 font-pixel font-semibold ${size === 'sm' ? 'size-6 text-xs' : 'size-8 text-sm'} ${
            layers[t.id] ? 'border-line bg-tomato text-line' : 'border-line/40 text-muted'
          }`}
        >
          {t.short}
        </span>
      ))}
    </span>
  )
}

/* ---------- Bienvenue.txt (le "hero") ---------- */

export function Welcome({ os }) {
  return (
    <div className="p-6 md:p-8">
      <p className="font-pixel text-sm uppercase tracking-wider text-muted">README · AdamOS 26</p>
      <p className="mt-3 font-pixel text-5xl font-bold leading-none md:text-6xl">Adam Bettayeb</p>
      <p className="mt-3 font-pixel text-2xl font-semibold md:text-3xl">
        <span className="bg-sun px-1.5 box-decoration-clone">Développeur full stack</span>
      </p>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed">
        Je code l'interface, le serveur et la base de données. En 3<sup>e</sup> année de BUT MMI, je cherche une{' '}
        <strong>alternance d'un an pour la rentrée 2026</strong> : une semaine à l'école, une semaine en entreprise.
      </p>

      <dl className="mt-5 grid gap-1.5 border-2 border-line bg-white p-4 font-mono text-sm">
        {[
          ['FRONT', 'React · JavaScript · HTML/CSS'],
          ['BACK', 'PHP (POO/MVC) · Node.js'],
          ['BDD', 'MySQL · requêtes préparées'],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-3">
            <dt className="w-14 shrink-0 font-medium">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Btn variant="tomato" onClick={() => os.open('projects')}>
          <PixelIcon name="folder" size={20} /> Ouvrir mes projets
        </Btn>
        <Btn variant="mint" onClick={() => os.open('system')}>
          <PixelIcon name="computer" size={20} /> À propos de cet Adam
        </Btn>
        <Btn variant="pink" onClick={() => os.open('mail')}>
          <PixelIcon name="mail" size={20} /> M'écrire
        </Btn>
        <Btn as="a" href={CV_URL} target="_blank" rel="noopener noreferrer">
          <PixelIcon name="pdf" size={20} /> CV (PDF)
        </Btn>
      </div>

      <p className="mt-6 text-sm text-muted">
        Astuce : les fenêtres se déplacent par leur barre de titre, <kbd className="border border-line/40 bg-white px-1 font-mono text-xs">Échap</kbd> ferme
        la fenêtre active.
      </p>
    </div>
  )
}

/* ---------- Projets (explorateur) ---------- */

export function Explorer({ os }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b-2 border-line bg-white px-4 py-2 font-mono text-sm">
        <span className="truncate">C:\Adam\Projets</span>
        <span className="shrink-0 text-muted">{PROJECTS.length} éléments</span>
      </div>
      <p className="px-4 pt-4 text-sm text-muted">
        F · B · D = couches codées sur le projet : interface, serveur, base de données. Cliquez sur un fichier pour l'ouvrir.
      </p>
      <ul className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => os.open('project', p)}
              className="group block w-full p-2 text-left hover:bg-sky/40 focus-visible:bg-sky/40"
            >
              <span className="block aspect-[16/10] overflow-hidden border-2 border-line bg-line">
                <img src={p.images[0]} alt="" loading="lazy" width="320" height="200" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
              </span>
              <span className="mt-2 flex items-start justify-between gap-2">
                <span className="min-w-0">
                  <span className="block truncate font-pixel text-base font-semibold">{p.file}</span>
                  <span className="block truncate text-xs text-muted">{p.category}</span>
                </span>
                <LayerChips layers={p.layers} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Fenêtre d'un projet ---------- */

export function ProjectApp({ payload: p }) {
  const [current, setCurrent] = useState(0)
  return (
    <div className="p-4 md:p-6">
      <div className="relative aspect-[16/9] overflow-hidden border-2 border-line bg-line">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={p.images[current]}
            src={p.images[current]}
            alt={`${p.title} — aperçu ${current + 1} sur ${p.images.length}`}
            width="1280"
            height="720"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label={`Aperçus de ${p.title}`}>
        {p.images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Afficher l'aperçu ${i + 1}`}
            aria-pressed={current === i}
            className={`aspect-[16/9] overflow-hidden border-2 ${current === i ? 'border-tomato' : 'border-line opacity-70 hover:opacity-100'}`}
          >
            <img src={src} alt="" loading="lazy" width="320" height="180" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="font-pixel text-3xl font-bold leading-tight">{p.title}</h3>
          <p className="mt-1 font-medium">{p.subtitle}</p>
          <p className="mt-3 leading-relaxed">{p.description}</p>
          <Btn as="a" href={p.link.href} target="_blank" rel="noopener noreferrer" variant="sun" className="mt-5">
            {p.link.label} <ArrowUpRight size={16} weight="bold" />
          </Btn>
        </div>
        <div>
          <p className="font-pixel text-sm uppercase tracking-wider text-muted">Couches codées</p>
          <ol className="mt-2 grid gap-1">
            {TIERS.map((t) => {
              const on = Boolean(p.layers[t.id])
              return (
                <li key={t.id} className={`flex min-h-10 items-center justify-between gap-3 border-2 px-3 text-sm ${on ? 'border-line bg-line text-win' : 'border-dashed border-line/40 text-muted'}`}>
                  <span className="font-pixel text-base">{t.label}</span>
                  <span>{on ? p.layers[t.id] : 'non concerné'}</span>
                </li>
              )
            })}
          </ol>
          <p className="mt-5 font-pixel text-sm uppercase tracking-wider text-muted">Technologies</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li key={s} className="border-2 border-line bg-white px-2 py-0.5 font-mono text-xs">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ---------- À propos de cet Adam (compétences) ---------- */

export function SystemApp({ os }) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <span className="grid size-24 shrink-0 place-items-center border-2 border-line bg-line p-4 shadow-[4px_4px_0_var(--color-mint)]">
          <img src="/logo-blanc.png" alt="" className="h-full w-full object-contain" />
        </span>
        <div>
          <p className="font-pixel text-4xl font-bold leading-none">AdamOS 26</p>
          <p className="mt-2 font-pixel text-xl">Développeur full stack</p>
          <p className="mt-1 text-sm text-muted">Version : BUT MMI 3ᵉ année · Disponible pour une alternance à la rentrée 2026</p>
        </div>
      </div>

      <table className="mt-7 w-full border-2 border-line bg-white text-left text-sm">
        <caption className="sr-only">Caractéristiques techniques</caption>
        <tbody>
          {SPECS.map((s) => (
            <tr key={s.k} className="border-b border-line/20 last:border-b-0">
              <th scope="row" className="w-36 bg-win-2 px-3 py-2.5 align-top font-pixel text-base font-medium sm:w-44">
                {s.k}
              </th>
              <td className="px-3 py-2.5">{s.v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-7 font-pixel text-xl font-semibold">Où je les utilise</h3>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        {PROOFS.map((p) => (
          <div key={p.k} className="border-2 border-line bg-white p-3">
            <dt className="font-pixel text-base font-semibold">{p.k}</dt>
            <dd className="mt-0.5 text-sm">{p.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <Btn variant="sun" onClick={() => os.open('journal')}>
          <PixelIcon name="log" size={20} /> Rapport système (parcours)
        </Btn>
        <Btn variant="tomato" onClick={() => os.open('projects')}>
          <PixelIcon name="folder" size={20} /> Voir les projets
        </Btn>
      </div>
    </div>
  )
}

/* ---------- journal_systeme.log (parcours) ---------- */

const STATUS = {
  OK: 'text-mint',
  'EN COURS': 'text-sun',
  'EN ATTENTE': 'text-pink',
}

export function JournalApp({ os }) {
  return (
    <div className="min-h-full bg-term p-5 font-mono text-sm leading-relaxed text-win md:p-6">
      <p className="text-win/70">$ tail -n 7 /var/log/adam/parcours.log</p>
      <ol className="mt-4 grid gap-3">
        {JOURNAL.map((l) => (
          <li key={l.date + l.text} className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[6.5rem_7.5rem_1fr]">
            <span className="text-win/70">{l.date}</span>
            <span className={`font-medium ${STATUS[l.status]}`}>[{l.status}]</span>
            <span>
              {l.text}
              {l.status === 'EN ATTENTE' && (
                <>
                  <span aria-hidden="true">…</span>
                  <span className="caret ml-1 inline-block h-[1.1em] w-[0.6ch] translate-y-[0.2em] bg-win" aria-hidden="true" />
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-win/70">
        $ <button type="button" onClick={() => os.open('mail')} className="text-pink underline underline-offset-4 hover:text-win">./contacter-adam.sh</button>
      </p>
    </div>
  )
}

/* ---------- Messagerie (contact) ---------- */

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Indiquez votre nom.'
  if (!v.email.trim()) e.email = 'Indiquez votre adresse email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Adresse non valide (exemple : nom@entreprise.fr).'
  if (v.message.trim().length < 10) e.message = 'Écrivez au moins quelques mots (10 caractères minimum).'
  return e
}

function Row({ id, label, error, children }) {
  return (
    <div className="grid gap-1 border-b-2 border-line/15 px-4 py-2.5 sm:grid-cols-[7rem_1fr] sm:items-start sm:gap-3">
      <label htmlFor={id} className="pt-2 font-pixel text-base">
        {label}
      </label>
      <div>
        {children}
        {error && (
          <p id={`${id}-error`} className="mt-1 flex items-start gap-1.5 text-sm font-medium text-red-deep">
            <WarningCircle size={16} weight="bold" className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export function MailApp({ os }) {
  const [v, setV] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState('idle')
  const ref = useRef(null)

  const onChange = (e) => {
    const next = { ...v, [e.target.name]: e.target.value }
    setV(next)
    if (tried) setErrors(validate(next))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setTried(true)
    const found = validate(v)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      ref.current?.querySelector(`#mail-${first}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      setV({ name: '', email: '', message: '' })
      setTried(false)
    } catch {
      setStatus('error')
    }
  }

  const field = (err) =>
    `w-full border-2 bg-white px-3 py-2 text-base ${err ? 'border-red-deep' : 'border-line'}`

  if (status === 'success') {
    return (
      <div role="status" className="p-8">
        <CheckCircle size={40} weight="fill" className="text-mint" />
        <p className="mt-3 font-pixel text-3xl font-bold">Message envoyé.</p>
        <p className="mt-2">Merci, je vous réponds vite.</p>
        <Btn className="mt-6" onClick={() => setStatus('idle')}>
          Nouveau message
        </Btn>
      </div>
    )
  }

  return (
    <div>
      <form ref={ref} noValidate onSubmit={onSubmit}>
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-line bg-white px-4 py-2.5">
          <span className="font-pixel text-base">À :</span>
          <span className="border-2 border-line bg-sun px-2 py-0.5 font-mono text-sm">{EMAIL}</span>
        </div>
        <Row id="mail-name" label="Nom" error={errors.name}>
          <input id="mail-name" name="name" autoComplete="name" placeholder="Camille Laurent" value={v.name} onChange={onChange} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'mail-name-error' : undefined} className={field(errors.name)} />
        </Row>
        <Row id="mail-email" label="Email" error={errors.email}>
          <input id="mail-email" name="email" type="email" autoComplete="email" placeholder="nom@entreprise.fr" value={v.email} onChange={onChange} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'mail-email-error' : undefined} className={field(errors.email)} />
        </Row>
        <Row id="mail-message" label="Message" error={errors.message}>
          <textarea id="mail-message" name="message" rows={6} placeholder="Bonjour Adam, nous recrutons un alternant développeur full stack…" value={v.message} onChange={onChange} aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? 'mail-message-error' : undefined} className={`${field(errors.message)} min-h-36 resize-y`} />
        </Row>
        {status === 'error' && (
          <p role="alert" className="mx-4 mt-3 border-2 border-line bg-pink p-3 text-sm">
            L'envoi a échoué. Réessayez, ou écrivez directement à <a href={`mailto:${EMAIL}`} className="font-semibold underline">{EMAIL}</a>.
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 px-4 py-4">
          <Btn as="button" type="submit" variant="pink" disabled={status === 'sending'} aria-busy={status === 'sending'}>
            {status === 'sending' ? 'Envoi en cours…' : 'Envoyer'}
          </Btn>
        </div>
        <p className="px-4 pb-4 text-sm leading-relaxed text-muted">
          Vos données (nom, email, message) servent uniquement à vous répondre. Elles transitent par le service Formspree
          (États-Unis) et sont conservées au plus 12 mois après notre dernier échange. Vous pouvez y accéder, les rectifier ou
          les faire supprimer en m'écrivant.{' '}
          <button type="button" onClick={() => os.open('privacy')} className="font-medium text-line underline underline-offset-2">
            Politique de confidentialité
          </button>
        </p>
      </form>
      <div className="border-t-2 border-line bg-win-2 px-4 py-4">
        <p className="font-pixel text-sm uppercase tracking-wider text-muted">Autres canaux</p>
        <ul className="mt-2 grid gap-1 sm:grid-cols-2">
          {[
            ['Téléphone', '06 64 50 25 68', 'tel:+33664502568'],
            ['LinkedIn', 'in/adambettayeb', 'https://www.linkedin.com/in/adambettayeb/'],
            ['GitHub', 'Adam-Btb', 'https://github.com/Adam-Btb'],
            ["Rythme d'alternance", 'PDF', '/calendrier-alternance.pdf'],
          ].map(([k, val, href]) => (
            <li key={k}>
              <a
                href={href}
                target={href.startsWith('tel:') ? undefined : '_blank'}
                rel={href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                className="flex min-h-11 items-center justify-between gap-3 px-2 hover:bg-white"
              >
                <span className="font-pixel text-base">{k}</span>
                <span className="flex items-center gap-1 text-sm underline underline-offset-2">
                  {val} <ArrowUpRight size={14} weight="bold" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ---------- Motus.exe ---------- */

export function MotusApp() {
  return (
    <div className="min-h-full bg-plateau p-5 text-cream md:p-6">
      <MotusGame />
      <p className="mt-2 text-sm text-cream/75">
        Une version de démonstration de mon projet Motus (l'original est en PHP, côté serveur).
      </p>
    </div>
  )
}

/* ---------- Corbeille ---------- */

export function TrashApp() {
  return (
    <div className="p-6">
      <p className="font-pixel text-2xl font-semibold">La corbeille est vide.</p>
      <p className="mt-2">Les bugs, je les corrige plutôt que de les jeter ici.</p>
    </div>
  )
}

/* ---------- Éteindre ---------- */

export function ShutdownApp({ os, close }) {
  return (
    <div className="p-6">
      <p className="font-pixel text-2xl font-semibold">Éteindre AdamOS ?</p>
      <p className="mt-2">Avant de partir : je cherche une alternance full stack pour la rentrée 2026.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Btn
          variant="pink"
          onClick={() => {
            close()
            os.open('mail')
          }}
        >
          M'écrire d'abord
        </Btn>
        <Btn onClick={() => os.shutdown()}>Éteindre quand même</Btn>
      </div>
    </div>
  )
}

/* ---------- Mentions légales & confidentialité ---------- */

function LegalDoc({ title, sections, os, other }) {
  return (
    <article className="p-6 md:p-8">
      <p className="font-pixel text-sm uppercase tracking-wider text-muted">Dernière mise à jour : {LEGAL_UPDATED}</p>
      <h3 className="mt-2 font-pixel text-3xl font-bold">{title}</h3>
      {sections.map((s) => (
        <section key={s.h} className="mt-6">
          <h4 className="font-pixel text-xl font-semibold">{s.h}</h4>
          {s.p.map((t, i) => (
            <p key={i} className="mt-2 max-w-[70ch] leading-relaxed">
              {t}
            </p>
          ))}
        </section>
      ))}
      <div className="mt-8 border-t-2 border-line/20 pt-5">
        <Btn onClick={() => os.open(other.app)}>
          <PixelIcon name="doc" size={20} /> {other.label}
        </Btn>
      </div>
    </article>
  )
}

export function LegalApp({ os }) {
  return <LegalDoc title="Mentions légales" sections={LEGAL_NOTICE} os={os} other={{ app: 'privacy', label: 'Politique de confidentialité' }} />
}

export function PrivacyApp({ os }) {
  return <LegalDoc title="Politique de confidentialité" sections={PRIVACY} os={os} other={{ app: 'legal', label: 'Mentions légales' }} />
}

/* ---------- Registre des applications ---------- */

export const APPS = {
  welcome: { title: 'Bienvenue.txt', icon: 'doc', accent: 'sky', w: 600, h: 740, Comp: Welcome },
  projects: { title: 'Projets', icon: 'folder', accent: 'tomato', w: 760, h: 560, Comp: Explorer },
  project: { title: (p) => p.file, icon: 'doc', accent: 'tomato', w: 820, h: 640, Comp: ProjectApp },
  system: { title: 'À propos de cet Adam', icon: 'computer', accent: 'mint', w: 700, h: 640, Comp: SystemApp },
  journal: { title: 'journal_systeme.log', icon: 'log', accent: 'sun', w: 760, h: 480, Comp: JournalApp },
  mail: { title: 'Messagerie — Nouveau message', icon: 'mail', accent: 'pink', w: 640, h: 640, Comp: MailApp },
  motus: { title: 'Motus.exe', icon: 'motus', accent: 'sun', w: 620, h: 700, Comp: MotusApp },
  trash: { title: 'Corbeille', icon: 'trash', accent: 'sky', w: 400, h: 220, Comp: TrashApp },
  shutdown: { title: 'Éteindre', icon: 'computer', accent: 'tomato', w: 440, h: 260, Comp: ShutdownApp },
  legal: { title: 'Mentions_legales.txt', icon: 'doc', accent: 'sky', w: 680, h: 680, Comp: LegalApp },
  privacy: { title: 'Confidentialite.txt', icon: 'doc', accent: 'mint', w: 700, h: 700, Comp: PrivacyApp },
}

// Ancres partageables : /#mentions-legales et /#confidentialite ouvrent la fenêtre correspondante.
export const HASH_APPS = { '#mentions-legales': 'legal', '#confidentialite': 'privacy' }

// Icônes du bureau, dans l'ordre.
export const DESKTOP = [
  { app: 'welcome', label: 'Bienvenue.txt', icon: 'doc' },
  { app: 'projects', label: 'Projets', icon: 'folder' },
  { app: 'system', label: 'À propos de cet Adam', icon: 'computer' },
  { app: 'journal', label: 'Parcours.log', icon: 'log' },
  { app: 'mail', label: 'Messagerie', icon: 'mail' },
  { app: 'motus', label: 'Motus.exe', icon: 'motus' },
  { href: CV_URL, label: 'CV.pdf', icon: 'pdf' },
  { app: 'trash', label: 'Corbeille', icon: 'trash' },
]
