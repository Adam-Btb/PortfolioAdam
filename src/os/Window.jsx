import { useEffect, useRef } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { Minus, X } from '@phosphor-icons/react'
import { PixelIcon } from './icons'

export const ACCENT = {
  tomato: 'bg-tomato',
  sun: 'bg-sun',
  mint: 'bg-mint',
  sky: 'bg-sky',
  pink: 'bg-pink',
}

/**
 * Fenêtre d'AdamOS. Bureau : déplaçable par la barre de titre (dans les limites
 * du bureau), réductible, au premier plan au clic. Mobile : plein écran.
 * Reste montée quand elle est réduite (la partie de Motus ne se perd pas).
 */
export default function Window({ win, app, title, active, mobile, z, constraintsRef, onFocus, onClose, onMinimize, children }) {
  const controls = useDragControls()
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  const startDrag = (e) => {
    if (mobile || e.target.closest('button')) return
    controls.start(e)
  }

  return (
    <motion.section
      ref={ref}
      id={`win-${win.id}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`win-${win.id}-title`}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onPointerDown={onFocus}
      onFocusCapture={onFocus}
      drag={!mobile}
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.12 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      style={mobile ? { zIndex: z } : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: z }}
      className={`flex flex-col bg-win outline-none ${win.min ? 'hidden' : ''} ${
        mobile
          ? 'fixed inset-x-0 bottom-16 top-9 border-y-2 border-line'
          : 'absolute border-2 border-line shadow-[6px_6px_0_rgba(6,12,36,0.85)]'
      }`}
    >
      <header
        onPointerDown={startDrag}
        style={{ touchAction: mobile ? 'auto' : 'none' }}
        className={`flex shrink-0 select-none items-center gap-2 border-b-2 border-line px-2 ${mobile ? 'h-12' : 'h-10 cursor-grab active:cursor-grabbing'} ${
          active ? ACCENT[app.accent] : 'stripes'
        }`}
      >
        <PixelIcon name={app.icon} size={20} />
        <h2 id={`win-${win.id}-title`} className="min-w-0 flex-1 truncate font-pixel text-base font-medium">
          {title}
        </h2>
        {!mobile && (
          <button
            type="button"
            onClick={onMinimize}
            aria-label={`Réduire ${title}`}
            className="grid size-8 place-items-center border-2 border-line bg-win hover:bg-white active:translate-y-px"
          >
            <Minus size={14} weight="bold" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={`Fermer ${title}`}
          className={`grid place-items-center border-2 border-line bg-win hover:bg-white active:translate-y-px ${mobile ? 'size-11' : 'size-8'}`}
        >
          <X size={mobile ? 18 : 14} weight="bold" />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-auto overscroll-contain">{children}</div>
    </motion.section>
  )
}
