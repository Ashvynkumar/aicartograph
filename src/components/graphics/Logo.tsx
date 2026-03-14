interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M16 2L4 9v14l12 7 12-7V9L16 2z"
          stroke="#4597b0"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M16 2v28M4 9l12 7 12-7M4 23l12-7 12 7"
          stroke="#4597b0"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle cx="16" cy="16" r="3" fill="#4597b0" />
        <circle cx="16" cy="2" r="2" fill="#62acbb" />
        <circle cx="28" cy="9" r="2" fill="#62acbb" />
        <circle cx="28" cy="23" r="2" fill="#62acbb" />
        <circle cx="16" cy="30" r="2" fill="#62acbb" />
        <circle cx="4" cy="23" r="2" fill="#62acbb" />
        <circle cx="4" cy="9" r="2" fill="#62acbb" />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <path
          d="M16 2L4 9v14l12 7 12-7V9L16 2z"
          stroke="#4597b0"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M16 2v28M4 9l12 7 12-7M4 23l12-7 12 7"
          stroke="#4597b0"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle cx="16" cy="16" r="3" fill="#4597b0" />
        <circle cx="16" cy="2" r="2" fill="#62acbb" />
        <circle cx="28" cy="9" r="2" fill="#62acbb" />
        <circle cx="28" cy="23" r="2" fill="#62acbb" />
        <circle cx="16" cy="30" r="2" fill="#62acbb" />
        <circle cx="4" cy="23" r="2" fill="#62acbb" />
        <circle cx="4" cy="9" r="2" fill="#62acbb" />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-white">
        Cartograph
      </span>
    </div>
  );
}
