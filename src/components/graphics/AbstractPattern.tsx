export default function AbstractPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Topographic contour lines */}
      <path
        d="M-100 300 Q200 250 400 280 Q600 310 800 270 Q1000 230 1300 280"
        stroke="#4597b0"
        strokeWidth="0.5"
        opacity="0.08"
      />
      <path
        d="M-100 350 Q200 300 400 330 Q600 360 800 320 Q1000 280 1300 330"
        stroke="#4597b0"
        strokeWidth="0.5"
        opacity="0.06"
      />
      <path
        d="M-100 250 Q200 200 400 230 Q600 260 800 220 Q1000 180 1300 230"
        stroke="#62acbb"
        strokeWidth="0.5"
        opacity="0.06"
      />
      <path
        d="M-100 400 Q200 350 400 380 Q600 410 800 370 Q1000 330 1300 380"
        stroke="#4597b0"
        strokeWidth="0.5"
        opacity="0.04"
      />
      <path
        d="M-100 200 Q200 150 400 180 Q600 210 800 170 Q1000 130 1300 180"
        stroke="#62acbb"
        strokeWidth="0.5"
        opacity="0.04"
      />

      {/* Subtle grid dots */}
      {Array.from({ length: 20 }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => (
          <circle
            key={`${i}-${j}`}
            cx={60 * i + 30}
            cy={60 * j + 30}
            r="0.5"
            fill="#4597b0"
            opacity="0.1"
          />
        ))
      )}

      {/* Radial gradient overlay */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4597b0" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#4597b0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#glow)" />
    </svg>
  );
}
