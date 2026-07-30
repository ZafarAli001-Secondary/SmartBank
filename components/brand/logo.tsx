export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="46"
        height="46"
        viewBox="0 0 64 64"
        fill="none"
        role="img"
        aria-label="FinCore logo"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="fincore-grad" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59f0a" />
            <stop offset="0.5" stopColor="#ef6a1a" />
            <stop offset="1" stopColor="#d81f26" />
          </linearGradient>
        </defs>
        {/* Rounded core badge */}
        <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#fincore-grad)" />
        {/* Abstract "F" / core mark */}
        <path
          d="M24 18h18a2 2 0 0 1 0 8H30v6h10a2 2 0 0 1 0 8H30v8a2 2 0 0 1-8 0V22a4 4 0 0 1 2-4z"
          fill="#ffffff"
        />
        {/* Core dot */}
        <circle cx="45" cy="43" r="4.5" fill="#ffffff" />
      </svg>
      <span className="text-[26px] font-bold leading-none tracking-tight text-[#1b3a6b]">
        Fin<span className="text-[#d81f26]">Core</span>
      </span>
    </div>
  )
}
