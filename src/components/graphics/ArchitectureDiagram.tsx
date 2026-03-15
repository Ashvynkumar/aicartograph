"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    id: "connect",
    label: "Connect",
    description: "Ingest & unify your knowledge sources",
    color: "#d4a853",
    icon: (
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
        fill="currentColor"
      />
    ),
    subs: [
      "Source Ingestion",
      "Chunking Engine",
      "Embedding Pipeline",
      "Multi-Format Parser",
    ],
  },
  {
    id: "resolve",
    label: "Resolve",
    description: "Answer questions with full context",
    color: "#4597b0",
    icon: (
      <path
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        fill="currentColor"
      />
    ),
    subs: [
      "Query Router",
      "Cross-Source Synthesis",
      "Citation Engine",
      "Context Window",
    ],
  },
  {
    id: "detect",
    label: "Detect",
    description: "Surface health issues automatically",
    color: "#d4726a",
    icon: (
      <path
        d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"
        fill="currentColor"
      />
    ),
    subs: [
      "Staleness Scanner",
      "Contradiction Detector",
      "Gap Analyzer",
      "Health Scorer",
    ],
  },
  {
    id: "close",
    label: "Close Loop",
    description: "Route feedback to knowledge owners",
    color: "#4ba88e",
    icon: (
      <path
        d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
        fill="currentColor"
      />
    ),
    subs: [
      "Feedback Router",
      "Knowledge Owner Alerts",
      "Auto-Issue Creator",
      "Loop Analytics",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  CSS-keyframe particle animation (injected once)                    */
/* ------------------------------------------------------------------ */

const particleCSS = `
@keyframes arch-particle-lr {
  0%   { offset-distance: 0%;   opacity: 0; }
  10%  { opacity: 0.9; }
  90%  { opacity: 0.9; }
  100% { offset-distance: 100%; opacity: 0; }
}
@keyframes arch-pulse {
  0%, 100% { transform: scale(1);   opacity: 0.35; }
  50%      { transform: scale(1.6); opacity: 0; }
}
@keyframes arch-grid-fade {
  0%   { opacity: 0.03; }
  50%  { opacity: 0.06; }
  100% { opacity: 0.03; }
}
`;

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PulseRing({ color }: { color: string }) {
  return (
    <span
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        border: `2px solid ${color}`,
        animation: "arch-pulse 2.8s ease-in-out infinite",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ArchitectureDiagram({
  className = "",
}: {
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Intersection observer */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Inject keyframe CSS once */}
      <style>{particleCSS}</style>

      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden rounded-2xl ${className}`}
        style={{ backgroundColor: "#050d12" }}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "arch-grid-fade 8s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 px-4 py-10 md:px-8 md:py-16">
          {/* -------- Desktop layout (horizontal) -------- */}
          <div className="hidden md:block">
            {/* SVG connection lines + particles */}
            <svg
              viewBox="0 0 1000 60"
              fill="none"
              className="w-full h-auto mb-2 pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Horizontal connection lines between nodes */}
              {[0, 1, 2].map((i) => {
                const x1 = 155 + i * 260;
                const x2 = x1 + 150;
                return (
                  <line
                    key={`conn-${i}`}
                    x1={x1}
                    y1={30}
                    x2={x2}
                    y2={30}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                );
              })}

              {/* Animated data particles on connection lines */}
              {isInView &&
                [0, 1, 2].map((i) => {
                  const x1 = 155 + i * 260;
                  const x2 = x1 + 150;
                  const color = pillars[i].color;
                  return [0, 1].map((p) => (
                    <circle
                      key={`p-${i}-${p}`}
                      r="3"
                      fill={color}
                      style={{
                        offsetPath: `path('M ${x1} 30 L ${x2} 30')`,
                        animation: `arch-particle-lr 2.2s ${i * 0.7 + p * 1.1}s ease-in-out infinite`,
                      }}
                    />
                  ));
                })}
            </svg>

            {/* Node cards */}
            <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.id}
                  className="flex flex-col items-center"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <NodeCard
                    pillar={pillar}
                    index={i}
                    isHovered={hovered === i}
                    isInView={isInView}
                  />
                </div>
              ))}
            </div>

            {/* Feedback loop SVG below the cards */}
            <svg
              viewBox="0 0 1000 50"
              fill="none"
              className="w-full h-auto mt-2 pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M 895 5 C 895 42, 105 42, 105 5"
                stroke="rgba(75,168,142,0.25)"
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
              />
              {/* Arrow head pointing back to Connect */}
              <polygon
                points="105,1 100,9 110,9"
                fill="rgba(75,168,142,0.35)"
              />
              {/* Feedback label */}
              <text
                x="500"
                y="44"
                textAnchor="middle"
                fill="rgba(75,168,142,0.5)"
                fontSize="11"
                fontFamily="sans-serif"
              >
                feedback loop
              </text>

              {/* Feedback particle */}
              {isInView && (
                <circle
                  r="3"
                  fill="#4ba88e"
                  style={{
                    offsetPath: `path('M 895 5 C 895 42, 105 42, 105 5')`,
                    animation:
                      "arch-particle-lr 3.5s 2s ease-in-out infinite",
                  }}
                />
              )}
            </svg>
          </div>

          {/* -------- Mobile layout (vertical) -------- */}
          <div className="md:hidden space-y-4">
            {pillars.map((pillar, i) => (
              <div key={pillar.id}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() =>
                    setHovered(hovered === i ? null : i)
                  }
                >
                  <NodeCard
                    pillar={pillar}
                    index={i}
                    isHovered={hovered === i}
                    isInView={isInView}
                  />
                </div>

                {/* Vertical connector */}
                {i < pillars.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg width="2" height="28" className="overflow-visible">
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="28"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />
                      {isInView && (
                        <circle
                          r="3"
                          fill={pillar.color}
                          style={{
                            offsetPath: "path('M 1 0 L 1 28')",
                            animation: `arch-particle-lr 1.5s ${i * 0.5}s ease-in-out infinite`,
                          }}
                        />
                      )}
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile feedback loop indicator */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
                  fill="rgba(75,168,142,0.5)"
                />
              </svg>
              <span
                className="text-xs"
                style={{ color: "rgba(75,168,142,0.5)" }}
              >
                feedback loop back to Connect
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  NodeCard                                                           */
/* ------------------------------------------------------------------ */

function NodeCard({
  pillar,
  index,
  isHovered,
  isInView,
}: {
  pillar: (typeof pillars)[number];
  index: number;
  isHovered: boolean;
  isInView: boolean;
}) {
  return (
    <motion.div
      layout
      className="relative w-full rounded-xl border backdrop-blur-sm cursor-pointer select-none"
      style={{
        borderColor: isHovered ? pillar.color : "rgba(68,105,106,0.3)",
        backgroundColor: isHovered
          ? `${pillar.color}10`
          : "rgba(10,30,36,0.8)",
        boxShadow: isHovered
          ? `0 0 24px ${pillar.color}18, 0 0 48px ${pillar.color}08`
          : "none",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div className="p-4 pb-3 flex flex-col items-center text-center">
        {/* Icon circle with pulse */}
        <div className="relative mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${pillar.color}20` }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              style={{ color: pillar.color }}
            >
              {pillar.icon}
            </svg>
          </div>
          {!isHovered && <PulseRing color={pillar.color} />}
        </div>

        {/* Step badge */}
        <span
          className="text-[10px] font-bold uppercase tracking-widest mb-1"
          style={{ color: pillar.color }}
        >
          Step {index + 1}
        </span>

        {/* Name */}
        <h3 className="text-sm font-semibold text-[#FDFFFF] mb-1">
          {pillar.label}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#97c1cc] leading-relaxed opacity-70">
          {pillar.description}
        </p>
      </div>

      {/* Expanded sub-components */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-1.5 px-3 pb-3">
              {pillar.subs.map((sub, si) => (
                <motion.div
                  key={sub}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: si * 0.05 }}
                  className="rounded-lg px-2 py-1.5 text-center"
                  style={{
                    backgroundColor: `${pillar.color}12`,
                    border: `1px solid ${pillar.color}25`,
                  }}
                >
                  <span
                    className="text-[10px] font-medium leading-tight block"
                    style={{ color: `${pillar.color}dd` }}
                  >
                    {sub}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
