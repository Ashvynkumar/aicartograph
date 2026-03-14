"use client";

import { motion } from "framer-motion";

export default function AbstractPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Animated topographic contour lines */}
      <motion.path
        d="M-100 300 Q200 250 400 280 Q600 310 800 270 Q1000 230 1300 280"
        stroke="url(#topo1)"
        strokeWidth="0.8"
        opacity="0.12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.path
        d="M-100 350 Q200 300 400 330 Q600 360 800 320 Q1000 280 1300 330"
        stroke="url(#topo2)"
        strokeWidth="0.6"
        opacity="0.08"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 0.3, ease: "easeInOut" }}
      />
      <motion.path
        d="M-100 250 Q200 200 400 230 Q600 260 800 220 Q1000 180 1300 230"
        stroke="url(#topo3)"
        strokeWidth="0.6"
        opacity="0.08"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 0.6, ease: "easeInOut" }}
      />
      <motion.path
        d="M-100 400 Q200 350 400 380 Q600 410 800 370 Q1000 330 1300 380"
        stroke="#4597b0"
        strokeWidth="0.5"
        opacity="0.05"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 0.9 }}
      />
      <motion.path
        d="M-100 200 Q200 150 400 180 Q600 210 800 170 Q1000 130 1300 180"
        stroke="#62acbb"
        strokeWidth="0.5"
        opacity="0.05"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1.2 }}
      />

      {/* Additional cartography contour lines for richness */}
      <motion.path
        d="M-50 150 Q300 120 500 170 Q700 200 900 150 Q1100 100 1250 160"
        stroke="#d4a853"
        strokeWidth="0.4"
        opacity="0.04"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, delay: 1.5 }}
      />
      <motion.path
        d="M-50 450 Q300 420 500 460 Q700 490 900 440 Q1100 400 1250 450"
        stroke="#8b7ec8"
        strokeWidth="0.4"
        opacity="0.03"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, delay: 1.8 }}
      />

      {/* Subtle grid dots with varied colors */}
      {Array.from({ length: 20 }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => {
          const colors = ["#4597b0", "#62acbb", "#d4a853", "#8b7ec8", "#6a9a7b"];
          return (
            <circle
              key={`${i}-${j}`}
              cx={60 * i + 30}
              cy={60 * j + 30}
              r="0.5"
              fill={colors[(i + j) % colors.length]}
              opacity="0.08"
            />
          );
        })
      )}

      {/* Compass rose hint at center */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        <circle cx="600" cy="300" r="40" stroke="#4597b0" strokeWidth="0.5" opacity="0.06" />
        <circle cx="600" cy="300" r="60" stroke="#62acbb" strokeWidth="0.3" opacity="0.04" />
        <line x1="600" y1="260" x2="600" y2="340" stroke="#4597b0" strokeWidth="0.5" opacity="0.05" />
        <line x1="560" y1="300" x2="640" y2="300" stroke="#4597b0" strokeWidth="0.5" opacity="0.05" />
      </motion.g>

      {/* Gradients */}
      <defs>
        <linearGradient id="topo1" x1="0" y1="0" x2="1200" y2="0">
          <stop offset="0%" stopColor="#d4a853" />
          <stop offset="50%" stopColor="#4597b0" />
          <stop offset="100%" stopColor="#8b7ec8" />
        </linearGradient>
        <linearGradient id="topo2" x1="0" y1="0" x2="1200" y2="0">
          <stop offset="0%" stopColor="#4597b0" />
          <stop offset="50%" stopColor="#6a9a7b" />
          <stop offset="100%" stopColor="#4597b0" />
        </linearGradient>
        <linearGradient id="topo3" x1="0" y1="0" x2="1200" y2="0">
          <stop offset="0%" stopColor="#62acbb" />
          <stop offset="50%" stopColor="#d4726a" />
          <stop offset="100%" stopColor="#62acbb" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4597b0" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#4597b0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#glow)" />
    </svg>
  );
}
