"use client";

import { motion } from "framer-motion";

interface IconProps {
  className?: string;
}

export function ConnectIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="18" stroke="url(#connect-grad)" strokeWidth="1.5" opacity="0.3" />
      <circle cx="12" cy="14" r="3" fill="#d4a853" opacity="0.8" />
      <circle cx="28" cy="14" r="3" fill="#4597b0" opacity="0.8" />
      <circle cx="12" cy="26" r="3" fill="#6a9a7b" opacity="0.8" />
      <circle cx="28" cy="26" r="3" fill="#8b7ec8" opacity="0.8" />
      <circle cx="20" cy="20" r="2.5" fill="#62acbb" />
      <line x1="14.5" y1="15.5" x2="17.5" y2="18.5" stroke="#d4a853" strokeWidth="1" opacity="0.5" />
      <line x1="25.5" y1="15.5" x2="22.5" y2="18.5" stroke="#4597b0" strokeWidth="1" opacity="0.5" />
      <line x1="14.5" y1="24.5" x2="17.5" y2="21.5" stroke="#6a9a7b" strokeWidth="1" opacity="0.5" />
      <line x1="25.5" y1="24.5" x2="22.5" y2="21.5" stroke="#8b7ec8" strokeWidth="1" opacity="0.5" />
      <defs>
        <linearGradient id="connect-grad" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#d4a853" />
          <stop offset="1" stopColor="#4597b0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ResolveIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="18" stroke="url(#resolve-grad)" strokeWidth="1.5" opacity="0.3" />
      <path d="M12 20 L17 20 L19 14 L21 26 L23 18 L25 20 L28 20" stroke="#5ba4d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="10" stroke="#4597b0" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
      <path d="M20 10 L20 12" stroke="#e8c547" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M20 28 L20 30" stroke="#e8c547" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <defs>
        <linearGradient id="resolve-grad" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#5ba4d9" />
          <stop offset="1" stopColor="#4597b0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DetectIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="18" stroke="url(#detect-grad)" strokeWidth="1.5" opacity="0.3" />
      <circle cx="18" cy="18" r="8" stroke="#d4726a" strokeWidth="1.5" opacity="0.8" />
      <line x1="24" y1="24" x2="30" y2="30" stroke="#d4726a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="18" r="4" stroke="#c27849" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <circle cx="18" cy="18" r="1.5" fill="#d4726a" opacity="0.7" />
      <defs>
        <linearGradient id="detect-grad" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#d4726a" />
          <stop offset="1" stopColor="#c27849" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CloseLoopIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="18" stroke="url(#close-grad)" strokeWidth="1.5" opacity="0.3" />
      <path d="M14 20 a6 6 0 0 1 10.39-4.5" stroke="#4ba88e" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 16 L26 20 L22 20" fill="#4ba88e" opacity="0.8" />
      <path d="M26 20 a6 6 0 0 1-10.39 4.5" stroke="#6a9a7b" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 24 L14 20 L18 20" fill="#6a9a7b" opacity="0.8" />
      <circle cx="20" cy="20" r="2" fill="#4ba88e" />
      <defs>
        <linearGradient id="close-grad" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#4ba88e" />
          <stop offset="1" stopColor="#6a9a7b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CompassIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="20" cy="20" r="18" stroke="#4597b0" strokeWidth="1" opacity="0.3" />
      <circle cx="20" cy="20" r="14" stroke="#62acbb" strokeWidth="0.5" opacity="0.2" />
      <polygon points="20,6 22,18 20,20 18,18" fill="#d4726a" opacity="0.9" />
      <polygon points="20,34 18,22 20,20 22,22" fill="#e6f0f3" opacity="0.7" />
      <circle cx="20" cy="20" r="2" fill="#4597b0" />
      <circle cx="20" cy="20" r="1" fill="#62acbb" />
    </motion.svg>
  );
}

export function WikiIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="#d4a853" strokeWidth="1.5" />
      <path d="M7 6h6M7 9h4M7 12h5" stroke="#d4a853" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function HelpCenterIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="7.5" stroke="#5ba4d9" strokeWidth="1.5" />
      <path d="M8 8a2 2 0 0 1 3.87.7c0 1.3-2 1.3-2 2.6" stroke="#5ba4d9" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.8" fill="#5ba4d9" />
    </svg>
  );
}

export function KnowledgeBaseIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="3" y="4" width="14" height="4" rx="1" stroke="#8b7ec8" strokeWidth="1.5" />
      <rect x="3" y="10" width="14" height="4" rx="1" stroke="#8b7ec8" strokeWidth="1.5" opacity="0.7" />
      <circle cx="6" cy="6" r="1" fill="#8b7ec8" />
      <circle cx="6" cy="12" r="1" fill="#8b7ec8" opacity="0.7" />
    </svg>
  );
}

export function SharedDriveIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 8l7-5 7 5v7a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="#6a9a7b" strokeWidth="1.5" />
      <path d="M8 16v-4h4v4" stroke="#6a9a7b" strokeWidth="1.5" />
    </svg>
  );
}

export function ProjectToolIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="#c27849" strokeWidth="1.5" />
      <path d="M3 7h14" stroke="#c27849" strokeWidth="1.5" />
      <rect x="6" y="10" width="3" height="2" rx="0.5" fill="#c27849" opacity="0.6" />
      <rect x="11" y="10" width="3" height="2" rx="0.5" fill="#c27849" opacity="0.4" />
    </svg>
  );
}

export function CommPlatformIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 4h12a1 1 0 011 1v8a1 1 0 01-1 1H8l-3 3v-3H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="#d4726a" strokeWidth="1.5" />
      <path d="M7 8h6M7 11h3" stroke="#d4726a" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function CodeRepoIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M7 5L3 10l4 5" stroke="#4ba88e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5l4 5-4 5" stroke="#4ba88e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 3l-2 14" stroke="#4ba88e" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function CRMIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="7" r="3.5" stroke="#e8c547" strokeWidth="1.5" />
      <path d="M4 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#e8c547" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SupportPlatformIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="7.5" stroke="#d4a853" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3" stroke="#d4a853" strokeWidth="1.5" />
      <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2" stroke="#d4a853" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const sourceIcons: Record<string, React.FC<IconProps>> = {
  "Wikis": WikiIcon,
  "Help Centers": HelpCenterIcon,
  "Knowledge Bases": KnowledgeBaseIcon,
  "Shared Drives": SharedDriveIcon,
  "Project Tools": ProjectToolIcon,
  "Communication Platforms": CommPlatformIcon,
  "Code Repositories": CodeRepoIcon,
  "CRM Systems": CRMIcon,
  "Support Platforms": SupportPlatformIcon,
};

export function SourceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = sourceIcons[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

const pillarIcons: Record<string, React.FC<IconProps>> = {
  "connect": ConnectIcon,
  "resolve": ResolveIcon,
  "detect": DetectIcon,
  "close": CloseLoopIcon,
};

export function PillarIcon({ id, className }: { id: string; className?: string }) {
  const Icon = pillarIcons[id];
  if (!Icon) return null;
  return <Icon className={className} />;
}
