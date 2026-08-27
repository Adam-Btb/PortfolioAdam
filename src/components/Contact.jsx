import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../lib/motion'
import MagneticButton from './MagneticButton'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqpdala'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const field =
    'w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none'

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-20 md:py-28">
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

        <motion.p
          variants={fadeUp}
          className="mt-16 text-xs font-medium uppercase tracking-[0.2em] text-muted"
        >
          Ou envoyez-moi un message
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="mt-5 max-w-xl space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" type="text" required placeholder="Votre nom" className={field} />
            <input name="email" type="email" required placeholder="Votre email" className={field} />
          </div>
          <textarea name="message" rows={4} required placeholder="Votre message" className={`${field} resize-none`} />
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-transform hover:scale-[0.98] disabled:opacity-60"
            >
              {status === 'sending' ? 'Envoi…' : 'Envoyer le message'}
            </button>
            {status === 'success' && (
              <span className="text-sm font-medium text-accent">
                Message envoyé, merci&nbsp;! Je vous réponds vite.
              </span>
            )}
            {status === 'error' && (
              <span className="text-sm font-medium text-rose-400">
                Une erreur est survenue. Réessayez ou écrivez-moi par email.
              </span>
            )}
          </div>
        </motion.form>
      </motion.div>
    </section>
  )
}
