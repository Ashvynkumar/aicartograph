interface SectionDividerProps {
  variant?: "subtle" | "rich" | "gradient";
  className?: string;
}

export default function SectionDivider({ variant = "subtle", className = "" }: SectionDividerProps) {
  if (variant === "rich") {
    return <div className={`section-divider-rich ${className}`} />;
  }

  if (variant === "gradient") {
    return (
      <div className={`relative h-px ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-amber/10 to-transparent translate-x-1/4" />
      </div>
    );
  }

  return <div className={`section-divider ${className}`} />;
}
