"use client";

import { motion } from "framer-motion";

export default function FlowDiagram({ className = "" }: { className?: string }) {
  const pillars = [
    { label: "Connect", sub: "Your knowledge sources", x: 0 },
    { label: "Resolve", sub: "With intelligence", x: 200 },
    { label: "Detect", sub: "Health issues", x: 400 },
    { label: "Close the Loop", sub: "Feedback to owners", x: 600 },
  ];

  return (
    <svg
      viewBox="0 0 800 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${className}`}
    >
      {pillars.map((pillar, i) => (
        <motion.g
          key={pillar.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
        >
          <rect
            x={pillar.x + 10}
            y="30"
            width="160"
            height="110"
            rx="12"
            fill={i === 1 ? "#0c2329" : "#0c2329"}
            stroke={i === 1 ? "#4597b0" : "#4597b0"}
            strokeWidth={i === 1 ? "2" : "1.5"}
            opacity={i === 1 ? 1 : 0.8}
          />
          {i === 1 && (
            <rect
              x={pillar.x + 10}
              y="30"
              width="160"
              height="110"
              rx="12"
              fill="#4597b0"
              fillOpacity="0.05"
            />
          )}
          <text
            x={pillar.x + 90}
            y="75"
            textAnchor="middle"
            fill={i === 1 ? "#62acbb" : "#4597b0"}
            fontSize="14"
            fontWeight="600"
          >
            {pillar.label}
          </text>
          <text
            x={pillar.x + 90}
            y="115"
            textAnchor="middle"
            fill="#97c1cc"
            fontSize="10"
            opacity="0.6"
          >
            {pillar.sub}
          </text>

          {/* Step number */}
          <circle cx={pillar.x + 90} cy="95" r="8" fill="#223e49" stroke="#4597b0" strokeWidth="1" />
          <text x={pillar.x + 90} y="99" textAnchor="middle" fill="#62acbb" fontSize="10" fontWeight="bold">
            {i + 1}
          </text>
        </motion.g>
      ))}

      {/* Arrows between pillars */}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={`arrow-${i}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
        >
          <line
            x1={175 + i * 200}
            y1="85"
            x2={205 + i * 200}
            y2="85"
            stroke="#4597b0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polygon
            points={`${210 + i * 200},85 ${203 + i * 200},81 ${203 + i * 200},89`}
            fill="#4597b0"
          />
        </motion.g>
      ))}

      {/* Feedback loop arrow (from Close the Loop back to Connect) */}
      <motion.path
        d="M770 150 C 770 170, 30 170, 30 150 L 30 145"
        stroke="#62acbb"
        strokeWidth="1.5"
        strokeDasharray="6 3"
        fill="none"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      <motion.polygon
        points="30,140 26,148 34,148"
        fill="#62acbb"
        opacity="0.4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ delay: 2.2 }}
      />
    </svg>
  );
}
