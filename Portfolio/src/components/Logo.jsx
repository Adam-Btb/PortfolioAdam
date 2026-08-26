export default function Logo({ className = '' }) {
  return (
    <span className={`inline-block ${className}`}>
      <img
        src="/logo-blanc.png"
        alt="Logo Adam Bettayeb"
        className="logo-dark h-full w-full object-contain"
      />
      <img
        src="/logo-noir.png"
        alt=""
        aria-hidden="true"
        className="logo-light h-full w-full object-contain"
      />
    </span>
  )
}
