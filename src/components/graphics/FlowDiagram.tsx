"use client";

import { motion } from "framer-motion";

export default function FlowDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${className}`}
    >
      {/* Step 1: Connect */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <rect x="20" y="40" width="200" height="120" rx="12" fill="#0c2329" stroke="#4597b0" strokeWidth="1.5" />
        <text x="120" y="80" textAnchor="middle" fill="#4597b0" fontSize="14" fontWeight="600">
          Connect
        </text>
        {/* Doc icons */}
        <rect x="50" y="95" width="30" height="24" rx="3" fill="#223e49" stroke="#4597b0" strokeWidth="1" />
        <rect x="90" y="95" width="30" height="24" rx="3" fill="#223e49" stroke="#4597b0" strokeWidth="1" />
        <rect x="130" y="95" width="30" height="24" rx="3" fill="#223e49" stroke="#4597b0" strokeWidth="1" />
        <text x="120" y="145" textAnchor="middle" fill="#97c1cc" fontSize="10" opacity="0.7">
          Your documentation sources
        </text>
      </motion.g>

      {/* Arrow 1 */}
      <motion.path
        d="M230 100 L290 100"
        stroke="#4597b0"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Step 2: Resolve */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <rect x="300" y="40" width="200" height="120" rx="12" fill="#0c2329" stroke="#4597b0" strokeWidth="2" />
        <rect x="300" y="40" width="200" height="120" rx="12" fill="#4597b0" fillOpacity="0.05" />
        <text x="400" y="80" textAnchor="middle" fill="#62acbb" fontSize="14" fontWeight="600">
          Resolve
        </text>
        <circle cx="400" cy="110" r="18" fill="#223e49" stroke="#4597b0" strokeWidth="1.5" />
        <circle cx="400" cy="110" r="6" fill="#4597b0" />
        <text x="400" y="145" textAnchor="middle" fill="#97c1cc" fontSize="10" opacity="0.7">
          AI-powered resolution
        </text>
      </motion.g>

      {/* Arrow 2 */}
      <motion.path
        d="M510 100 L570 100"
        stroke="#4597b0"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />

      {/* Step 3: Improve */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <rect x="580" y="40" width="200" height="120" rx="12" fill="#0c2329" stroke="#62acbb" strokeWidth="1.5" />
        <text x="680" y="80" textAnchor="middle" fill="#62acbb" fontSize="14" fontWeight="600">
          Improve
        </text>
        {/* Feedback loop arrow */}
        <path
          d="M660 105 a15 15 0 1 1 0 15"
          stroke="#62acbb"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M658 118l2 2 3-2" stroke="#62acbb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="690" cy="110" r="4" fill="#62acbb" />
        <text x="680" y="145" textAnchor="middle" fill="#97c1cc" fontSize="10" opacity="0.7">
          Continuous feedback loop
        </text>
      </motion.g>

      {/* Arrow marker */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#4597b0" />
        </marker>
      </defs>
    </svg>
  );
}
