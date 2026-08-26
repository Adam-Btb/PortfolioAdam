import { EASE } from '../lib/motion'

export default function MagneticButton({
  as = 'a',
  href,
  children,
  variant = 'primary',
  className = '',
  icon,
  ...props
}) {
  const Comp = as

  const base =
    'group relative inline-flex items-center gap-3 rounded-full font-medium select-none transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 active:scale-[0.97]'
  const variants = {
    primary: 'bg-ink text-canvas pl-6 pr-2 py-2.5 text-[15px]',
    ghost:
      'border border-line bg-surface text-ink pl-6 pr-2 py-2.5 text-[15px] backdrop-blur-sm hover:border-ink/25',
  }

  return (
    <Comp
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${
          variant === 'primary' ? 'bg-canvas/20' : 'bg-ink/5'
        }`}
        style={{ transitionTimingFunction: `cubic-bezier(${EASE.join(',')})` }}
      >
        {icon ?? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </Comp>
  )
}
