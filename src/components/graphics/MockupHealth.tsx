"use client";

import { useEffect, useRef, useState } from "react";

export default function MockupHealth({ className = "" }: { className?: string }) {
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

  const circumference = 2 * Math.PI * 32;
  const scoreOffset = circumference * (1 - 0.82);

  return (
    <div ref={ref} className={className}>
      <style>{`
        @keyframes health-ring-fill {
          0% { stroke-dashoffset: ${circumference}; }
          100% { stroke-dashoffset: ${scoreOffset}; }
        }
        @keyframes health-issue-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes health-score-count {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div className="rounded-xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40">
        {/* Chrome bar */}
        <div className="h-8 bg-[#080604] flex items-center px-3 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <div className="flex-1 mx-8">
            <div className="bg-white/5 rounded-md h-4 max-w-[200px] mx-auto" />
          </div>
        </div>
        {/* Content */}
        <div className="bg-[#071319] p-5 text-[11px]">
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[#4597b0] text-[11px] font-medium">aiCartograph</span>
            <span className="text-white/30 text-[11px]">&gt;</span>
            <span className="text-white/70 text-[11px]">Knowledge Health</span>
          </div>

          <div className="flex gap-3">
            {/* Left: Score ring */}
            <div className="w-[35%] flex flex-col items-center justify-center bg-white/[0.03] rounded-lg border border-white/[0.06] p-3">
              <div className="text-white/50 text-[10px] mb-2">Overall Health</div>
              <div className="relative w-20 h-20 mb-2">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle
                    cx="40" cy="40" r="32" fill="none" stroke="#36c08e" strokeWidth="6"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset: isInView ? scoreOffset : circumference,
                      transition: "stroke-dashoffset 1.5s ease-out",
                    }}
                  />
                </svg>
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "scale(1)" : "scale(0.8)",
                    transition: "all 0.5s 0.8s ease-out",
                  }}
                >
                  <span className="text-[18px] font-bold text-white/90">82</span>
                  <span className="text-[8px] text-white/30">/100</span>
                </div>
              </div>
              <div className="flex gap-3 text-[8px]">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#36c08e]" />
                  <span className="text-white/40">Coverage</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4597b0]" />
                  <span className="text-white/40">Freshness</span>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-white/50 text-[10px] font-medium mb-1">Active Issues</div>
              {[
                { title: "Staleness Alert", desc: "12 sources not updated in 90+ days", severity: "critical", color: "#ff5f57", bgColor: "rgba(255,95,87,0.08)", borderColor: "rgba(255,95,87,0.15)", delay: 0.3 },
                { title: "Contradiction Found", desc: "Pricing page conflicts with API docs", severity: "warning", color: "#febc2e", bgColor: "rgba(254,188,46,0.06)", borderColor: "rgba(254,188,46,0.12)", delay: 0.5 },
                { title: "Gap Detected", desc: "No docs for SSO SCIM provisioning", severity: "info", color: "#4597b0", bgColor: "rgba(69,151,176,0.06)", borderColor: "rgba(69,151,176,0.12)", delay: 0.7 },
              ].map((issue, i) => (
                <div
                  key={i}
                  className="rounded-lg px-2.5 py-2 border flex items-start gap-2"
                  style={{
                    backgroundColor: issue.bgColor,
                    borderColor: issue.borderColor,
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateX(0)" : "translateX(10px)",
                    transition: `all 0.4s ${issue.delay}s ease-out`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1"
                    style={{
                      backgroundColor: issue.color,
                      animation: isInView ? `health-issue-pulse 2s ${issue.delay}s ease-in-out infinite` : "none",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white/80 text-[10px] font-medium">{issue.title}</span>
                      <span
                        className="text-[7px] px-1 py-0.5 rounded uppercase font-medium tracking-wide"
                        style={{ color: issue.color, backgroundColor: issue.bgColor }}
                      >
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-white/45 text-[9px] mt-0.5">{issue.desc}</p>
                  </div>
                </div>
              ))}

              <div className="mt-1">
                <div className="text-white/50 text-[10px] font-medium mb-1.5">Action Items</div>
                <div className="space-y-1">
                  {[
                    { text: "Review & update stale deployment guides", priority: "High", delay: 0.9 },
                    { text: "Reconcile pricing discrepancies", priority: "Med", delay: 1.1 },
                  ].map((todo, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/[0.03] rounded px-2 py-1.5 border border-white/[0.05]"
                      style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateY(0)" : "translateY(6px)",
                        transition: `all 0.3s ${todo.delay}s ease-out`,
                      }}
                    >
                      <div className="w-2.5 h-2.5 rounded-sm border border-white/20 flex-shrink-0" />
                      <span className="text-white/60 text-[10px] flex-1">{todo.text}</span>
                      <span
                        className="text-[7px] px-1 py-0.5 rounded font-medium"
                        style={{
                          color: todo.priority === "High" ? "#ff5f57" : "#febc2e",
                          backgroundColor: todo.priority === "High" ? "rgba(255,95,87,0.1)" : "rgba(254,188,46,0.08)",
                        }}
                      >
                        {todo.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
