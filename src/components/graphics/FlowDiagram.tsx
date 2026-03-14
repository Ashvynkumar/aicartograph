"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pillars = [
  {
    label: "Connect",
    sub: "Your knowledge sources",
    color: "#d4a853",
    techs: ["100+ Integrations", "Zero Migration", "Real-time Sync"],
  },
  {
    label: "Resolve",
    sub: "With intelligence",
    color: "#4597b0",
    techs: ["Semantic Search", "RAG Pipeline", "Context Assembly"],
  },
  {
    label: "Detect",
    sub: "Health issues",
    color: "#d4726a",
    techs: ["Staleness Detection", "Contradiction Analysis", "Gap Detection"],
  },
  {
    label: "Close the Loop",
    sub: "Feedback to owners",
    color: "#4ba88e",
    techs: ["Consumption Signals", "Priority Scoring", "Owner Routing"],
  },
];

function DataParticle({ from, to, delay, color }: { from: number; to: number; delay: number; color: string }) {
  return (
    <motion.circle
      r="3"
      fill={color}
      opacity="0.8"
      initial={{ cx: from, cy: 60 }}
      animate={{ cx: to, cy: 60 }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 2.5,
        ease: "easeInOut",
      }}
    >
      <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
    </motion.circle>
  );
}

export default function FlowDiagram({ className = "" }: { className?: string }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {/* SVG flow with animated particles */}
      <svg viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto mb-6">
        {/* Connection lines */}
        {[0, 1, 2].map((i) => (
          <line
            key={`line-${i}`}
            x1={120 + i * 200}
            y1="60"
            x2={180 + i * 200}
            y2="60"
            stroke="#4597b0"
            strokeWidth="2"
            strokeDasharray="6 3"
            opacity="0.3"
          />
        ))}

        {/* Feedback loop */}
        <path
          d="M760 90 C 760 110, 40 110, 40 90"
          stroke="#4ba88e"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          fill="none"
          opacity="0.25"
        />
        <polygon points="40,86 36,94 44,94" fill="#4ba88e" opacity="0.25" />

        {/* Animated data particles between nodes */}
        {isInView && (
          <>
            <DataParticle from={120} to={180} delay={0} color="#d4a853" />
            <DataParticle from={320} to={380} delay={0.6} color="#4597b0" />
            <DataParticle from={520} to={580} delay={1.2} color="#d4726a" />
            {/* Feedback particle */}
            <motion.circle
              r="2.5"
              fill="#4ba88e"
              opacity="0.6"
              initial={{ cx: 760, cy: 100 }}
              animate={{ cx: 40, cy: 100 }}
              transition={{
                duration: 3,
                delay: 2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />
          </>
        )}

        {/* Nodes */}
        {pillars.map((pillar, i) => {
          const cx = 60 + i * 200;
          const isExpanded = expanded === i;
          return (
            <g key={pillar.label}>
              {/* Glow effect */}
              <circle
                cx={cx}
                cy="60"
                r="48"
                fill={pillar.color}
                fillOpacity={isExpanded ? 0.12 : 0.04}
                className="transition-all duration-300"
              />
              {/* Node circle */}
              <circle
                cx={cx}
                cy="60"
                r="40"
                fill="#0c2329"
                stroke={pillar.color}
                strokeWidth={isExpanded ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setExpanded(isExpanded ? null : i)}
                onMouseEnter={() => setExpanded(i)}
              />
              {/* Step number */}
              <circle cx={cx} cy="38" r="8" fill={pillar.color} fillOpacity="0.2" />
              <text x={cx} y="42" textAnchor="middle" fill={pillar.color} fontSize="9" fontWeight="700">
                {i + 1}
              </text>
              {/* Label */}
              <text x={cx} y="65" textAnchor="middle" fill="#FDFFFF" fontSize="11" fontWeight="600">
                {pillar.label}
              </text>
              {/* Sub label */}
              <text x={cx} y="80" textAnchor="middle" fill="#97c1cc" fontSize="8" opacity="0.6">
                {pillar.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Expandable tech details below */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.label}
            layout
            className="rounded-xl border p-4 cursor-pointer transition-all duration-300"
            style={{
              borderColor: expanded === i ? pillar.color : "rgba(68,105,106,0.3)",
              backgroundColor: expanded === i ? `${pillar.color}08` : "transparent",
            }}
            onClick={() => setExpanded(expanded === i ? null : i)}
            onMouseEnter={() => setExpanded(i)}
            onMouseLeave={() => setExpanded(null)}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: pillar.color }}
              />
              <h4 className="text-sm font-semibold text-brand-900">{pillar.label}</h4>
            </div>

            <AnimatePresence>
              {expanded === i ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-1.5 mt-1">
                    {pillar.techs.map((tech) => (
                      <li key={tech} className="flex items-center gap-2 text-xs text-brand-700">
                        <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="2" fill={pillar.color} opacity="0.6" />
                        </svg>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-brand-700"
                >
                  {pillar.sub}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
