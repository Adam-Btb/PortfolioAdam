const PATHS = Array.from({ length: 22 }, (_, i) => {
  const y = 4 + i * 4
  return `M -10 ${y} Q 40 ${y - 7} 80 ${y} T 170 ${y}`
})

export default function BackgroundPaths() {
  return (
    <div className="paths-bg" aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.25"
            className="path-line"
            style={{
              animationDuration: `${9 + (i % 6)}s`,
              animationDelay: `${-i * 0.5}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
