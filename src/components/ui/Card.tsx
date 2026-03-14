import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  highlighted?: boolean;
}

export default function Card({ children, className = "", highlighted }: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-8 transition-all duration-300 ${
        highlighted
          ? "border-brand-500/50 bg-brand-500/5 shadow-lg shadow-brand-500/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
