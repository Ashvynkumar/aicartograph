interface IconProps {
  className?: string;
}

export function FeedbackLoopIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" stroke="#4597b0" strokeWidth="1.5" opacity="0.2" />
      <path
        d="M14 24a10 10 0 0 1 17.07-7.07"
        stroke="#4597b0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M31 13l1 5-5-1" stroke="#4597b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M34 24a10 10 0 0 1-17.07 7.07"
        stroke="#62acbb"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M17 35l-1-5 5 1" stroke="#62acbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3" fill="#4597b0" />
    </svg>
  );
}

export function HealthIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" stroke="#4597b0" strokeWidth="1.5" opacity="0.2" />
      <path
        d="M8 24h8l3-8 5 16 5-12 3 4h8"
        stroke="#4597b0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="10" r="3" fill="#62acbb" opacity="0.5" />
      <circle cx="24" cy="38" r="3" fill="#62acbb" opacity="0.5" />
    </svg>
  );
}

export function SynthesisIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" stroke="#4597b0" strokeWidth="1.5" opacity="0.2" />
      <rect x="8" y="12" width="14" height="10" rx="2" stroke="#4597b0" strokeWidth="1.5" fill="#223e49" />
      <rect x="26" y="12" width="14" height="10" rx="2" stroke="#4597b0" strokeWidth="1.5" fill="#223e49" />
      <rect x="8" y="26" width="14" height="10" rx="2" stroke="#62acbb" strokeWidth="1.5" fill="#223e49" />
      <path d="M24 22v4" stroke="#4597b0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 26h4" stroke="#4597b0" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="26" y="26" width="14" height="10" rx="2" stroke="#4597b0" strokeWidth="2" fill="#4597b0" fillOpacity="0.15" />
      <path d="M30 31h6" stroke="#62acbb" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 28.5h4" stroke="#62acbb" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function DeliveryIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" stroke="#4597b0" strokeWidth="1.5" opacity="0.2" />
      <rect x="10" y="10" width="28" height="20" rx="3" stroke="#4597b0" strokeWidth="1.5" fill="#0c2329" />
      <rect x="14" y="14" width="8" height="3" rx="1" fill="#223e49" stroke="#4597b0" strokeWidth="0.5" />
      <rect x="14" y="19" width="12" height="2" rx="1" fill="#223e49" />
      <rect x="14" y="23" width="10" height="2" rx="1" fill="#223e49" />
      <rect x="28" y="22" width="8" height="12" rx="2" stroke="#62acbb" strokeWidth="1.5" fill="#223e49" />
      <circle cx="32" cy="28" r="2" fill="#4597b0" />
      <path d="M31 32h2" stroke="#62acbb" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function GovernanceIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" stroke="#f0b429" strokeWidth="1.5" opacity="0.2" />
      <path d="M14 20l10-8 10 8" stroke="#f0b429" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 20v12h16V20" stroke="#f0b429" strokeWidth="1.5" />
      <rect x="20" y="24" width="8" height="8" rx="1" stroke="#f0b429" strokeWidth="1.5" fill="#f0b42915" />
      <path d="M24 26v4M22 28h4" stroke="#f0b429" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function RoleAwareIcon({ className = "w-12 h-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="20" stroke="#4597b0" strokeWidth="1.5" opacity="0.2" />
      <circle cx="18" cy="16" r="4" stroke="#4597b0" strokeWidth="1.5" />
      <circle cx="30" cy="16" r="4" stroke="#62acbb" strokeWidth="1.5" />
      <path d="M10 32c0-4.4 3.6-8 8-8" stroke="#4597b0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 32c0-4.4-3.6-8-8-8" stroke="#62acbb" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 28v8M20 32h8" stroke="#4597b0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function USPIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "feedback":
      return <FeedbackLoopIcon className={className} />;
    case "health":
      return <HealthIcon className={className} />;
    case "synthesis":
      return <SynthesisIcon className={className} />;
    case "delivery":
      return <DeliveryIcon className={className} />;
    case "governance":
      return <GovernanceIcon className={className} />;
    case "role":
      return <RoleAwareIcon className={className} />;
    default:
      return null;
  }
}
