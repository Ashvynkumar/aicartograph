"use client";

import { motion } from "framer-motion";

export default function HeroGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Connection lines */}
        <motion.path
          d="M80 200 L200 120 L350 160 L480 100"
          stroke="#4597b0"
          strokeWidth="1"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.path
          d="M80 200 L200 280 L350 240 L480 300"
          stroke="#62acbb"
          strokeWidth="1"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
        />
        <motion.path
          d="M200 120 L350 240"
          stroke="#4597b0"
          strokeWidth="1"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        <motion.path
          d="M200 280 L350 160"
          stroke="#62acbb"
          strokeWidth="1"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
        <motion.path
          d="M350 160 L480 300"
          stroke="#4597b0"
          strokeWidth="1"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
        />
        <motion.path
          d="M350 240 L480 100"
          stroke="#62acbb"
          strokeWidth="1"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.6 }}
        />

        {/* Left: Document nodes */}
        {[
          { x: 60, y: 120, delay: 0 },
          { x: 40, y: 200, delay: 0.1 },
          { x: 60, y: 280, delay: 0.2 },
        ].map((node, i) => (
          <motion.g
            key={`doc-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: node.delay }}
          >
            <rect
              x={node.x}
              y={node.y - 16}
              width="40"
              height="32"
              rx="4"
              fill="#223e49"
              stroke="#4597b0"
              strokeWidth="1"
            />
            <line
              x1={node.x + 8}
              y1={node.y - 6}
              x2={node.x + 32}
              y2={node.y - 6}
              stroke="#4597b0"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1={node.x + 8}
              y1={node.y}
              x2={node.x + 28}
              y2={node.y}
              stroke="#4597b0"
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1={node.x + 8}
              y1={node.y + 6}
              x2={node.x + 24}
              y2={node.y + 6}
              stroke="#4597b0"
              strokeWidth="1"
              opacity="0.3"
            />
          </motion.g>
        ))}

        {/* Middle: Processing nodes */}
        {[
          { x: 200, y: 120, delay: 0.4 },
          { x: 200, y: 280, delay: 0.5 },
          { x: 350, y: 160, delay: 0.6 },
          { x: 350, y: 240, delay: 0.7 },
        ].map((node, i) => (
          <motion.circle
            key={`proc-${i}`}
            cx={node.x}
            cy={node.y}
            r="12"
            fill="#0c2329"
            stroke="#4597b0"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: node.delay }}
          />
        ))}

        {/* Center: Cartograph core */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <circle
            cx="280"
            cy="200"
            r="40"
            fill="#0c2329"
            stroke="#4597b0"
            strokeWidth="2"
          />
          <circle cx="280" cy="200" r="24" fill="#223e49" stroke="#62acbb" strokeWidth="1" />
          <circle cx="280" cy="200" r="8" fill="#4597b0" />
          <motion.circle
            cx="280"
            cy="200"
            r="40"
            fill="none"
            stroke="#4597b0"
            strokeWidth="1"
            opacity="0.3"
            initial={{ r: 40 }}
            animate={{ r: 60 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.g>

        {/* Right: Resolution outputs */}
        {[
          { x: 480, y: 100, delay: 1 },
          { x: 520, y: 200, delay: 1.1 },
          { x: 480, y: 300, delay: 1.2 },
        ].map((node, i) => (
          <motion.g
            key={`out-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: node.delay }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="16"
              fill="#223e49"
              stroke="#62acbb"
              strokeWidth="1.5"
            />
            <path
              d={`M${node.x - 6} ${node.y} L${node.x - 1} ${node.y + 5} L${node.x + 7} ${node.y - 4}`}
              stroke="#62acbb"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        ))}

        {/* Labels */}
        <text x="60" y="340" fill="#97c1cc" fontSize="11" textAnchor="middle" opacity="0.6">
          Docs
        </text>
        <text x="280" y="270" fill="#97c1cc" fontSize="11" textAnchor="middle" opacity="0.6">
          Resolution
        </text>
        <text x="500" y="340" fill="#97c1cc" fontSize="11" textAnchor="middle" opacity="0.6">
          Answers
        </text>
      </svg>
    </div>
  );
}
