"use client";

import { useEffect, useRef, useState } from "react";

export default function MockupDashboard({ className = "" }: { className?: string }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <style>{`
        @keyframes mockup-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes mockup-pulse-dot {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes mockup-counter-glow {
          0%, 100% { text-shadow: 0 0 4px transparent; }
          50% { text-shadow: 0 0 8px rgba(69,151,176,0.3); }
        }
      `}</style>
      <div className="rounded-xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40">
        {/* Chrome bar */}
        <div className="h-9 bg-[#080604] flex items-center px-4 gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div className="flex-1 mx-8">
            <div className="bg-white/5 rounded-md h-4.5 max-w-[240px] mx-auto" />
          </div>
        </div>
        {/* Content */}
        <div className="bg-[#071319] p-6">
          {/* Breadcrumb bar */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[#4597b0] text-[13px] font-medium">aiCartograph</span>
            <span className="text-white/30 text-[13px]">&gt;</span>
            <span className="text-white/70 text-[13px]">Command Center</span>
          </div>

          {/* Metric cards row */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: "Total Sources", value: "47", color: "#4597b0", delay: 0 },
              { label: "Resolution Rate", value: "73%", color: "#36c08e", delay: 0.15 },
              { label: "Health Score", value: "82", color: "#f0b429", delay: 0.3 },
              { label: "Open Feedback", value: "12", color: "#9b8ce8", delay: 0.45 },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white/[0.04] rounded-lg p-3.5 border border-white/[0.06] relative overflow-hidden"
              >
                <div className="text-white/50 text-[11px] mb-1.5">{card.label}</div>
                <div
                  className="text-[22px] font-bold"
                  style={{
                    color: card.color,
                    animation: isInView ? `mockup-counter-glow 3s ${card.delay}s ease-in-out infinite` : "none",
                  }}
                >
                  {card.value}
                </div>
                {isInView && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                      className="absolute inset-0 -skew-x-12"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${card.color}08 50%, transparent 100%)`,
                        animation: `mockup-shimmer 3s ${card.delay + 0.5}s ease-in-out infinite`,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chart + Activity feed */}
          <div className="flex gap-3">
            {/* Area chart */}
            <div className="flex-1 bg-white/[0.03] rounded-lg border border-white/[0.06] p-4">
              <div className="text-white/50 text-[12px] mb-3">Query Volume (7d)</div>
              <div className="relative h-24">
                <div className="absolute left-0 top-0 text-white/20 text-[10px]">200</div>
                <div className="absolute left-0 bottom-0 text-white/20 text-[10px]">0</div>
                <div className="absolute inset-x-5 bottom-0 h-full flex items-end">
                  <div
                    className="w-full h-full rounded-sm"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(69,151,176,0.05) 0%, rgba(69,151,176,0.25) 40%, rgba(69,151,176,0.08) 70%, rgba(69,151,176,0.02) 100%)",
                      clipPath:
                        "polygon(0% 80%, 10% 65%, 20% 70%, 35% 45%, 50% 50%, 65% 30%, 75% 25%, 85% 35%, 100% 20%, 100% 100%, 0% 100%)",
                    }}
                  />
                </div>
                <div className="absolute inset-x-5 bottom-0 h-full">
                  <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
                    <polyline
                      points="0,48 20,39 40,42 70,27 100,30 130,18 150,15 170,21 200,12"
                      fill="none"
                      stroke="#4597b0"
                      strokeWidth="1.5"
                      style={{
                        strokeDasharray: 400,
                        strokeDashoffset: isInView ? 0 : 400,
                        transition: "stroke-dashoffset 2s ease-out",
                      }}
                    />
                    {isInView && (
                      <circle cx="200" cy="12" r="3" fill="#4597b0" style={{ animation: "mockup-pulse-dot 2s ease-in-out infinite" }} />
                    )}
                  </svg>
                </div>
              </div>
            </div>

            {/* Activity feed */}
            <div className="w-[40%] bg-white/[0.03] rounded-lg border border-white/[0.06] p-4">
              <div className="text-white/50 text-[12px] mb-3">Recent Activity</div>
              <div className="space-y-2.5">
                {[
                  { text: "Source sync completed", time: "2m ago", dot: "#36c08e", delay: 0.2 },
                  { text: "3 contradictions resolved", time: "14m ago", dot: "#4597b0", delay: 0.4 },
                  { text: "New feedback submitted", time: "1h ago", dot: "#febc2e", delay: 0.6 },
                  { text: "Health scan finished", time: "3h ago", dot: "#62acbb", delay: 0.8 },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-1.5 border-b border-white/[0.04] last:border-0"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? "translateX(0)" : "translateX(8px)",
                      transition: `all 0.4s ${item.delay}s ease-out`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: item.dot,
                        animation: isInView ? `mockup-pulse-dot 2.5s ${item.delay}s ease-in-out infinite` : "none",
                      }}
                    />
                    <span className="text-white/60 text-[12px] flex-1 truncate">{item.text}</span>
                    <span className="text-white/30 text-[10px] flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
