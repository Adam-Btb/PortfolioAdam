import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Logo className="h-7 w-7 text-ink" />
          <span>Adam Bettayeb · Portfolio {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:+33664502568" className="transition-colors hover:text-ink">
            06 64 50 25 68
          </a>
          <a
            href="https://www.linkedin.com/in/adambettayeb/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Adam-Btb"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a href="#top" className="transition-colors hover:text-ink">
            Haut de page ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
