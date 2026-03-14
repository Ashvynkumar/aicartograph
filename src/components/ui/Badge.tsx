import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "highlight";
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase ${
        variant === "highlight"
          ? "bg-brand-500/15 text-brand-400 border border-brand-500/20"
          : "bg-white/10 text-white/70 border border-white/10"
      }`}
    >
      {children}
    </span>
  );
}
