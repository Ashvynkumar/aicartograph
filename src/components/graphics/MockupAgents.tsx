"use client";

import { useEffect, useRef, useState } from "react";

export default function MockupAgents({ className = "" }: { className?: string }) {
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

  const agents = [
    { name: "Web Widget Agent", channel: "Web", channelIcon: "🌐", status: "Deployed", statusColor: "#36c08e", queries: "12.8k", delay: 0.2 },
    { name: "Slack Bot", channel: "Slack", channelIcon: "#", status: "Deployed", statusColor: "#36c08e", queries: "8.4k", delay: 0.3 },
    { name: "Email Agent", channel: "Email", channelIcon: "✉", status: "Draft", statusColor: "#febc2e", queries: "—", delay: 0.4 },
    { name: "Voice Support", channel: "Voice", channelIcon: "🎙", status: "Deployed", statusColor: "#36c08e", queries: "5.2k", delay: 0.5 },
    { name: "FAQ Bot", channel: "Web", channelIcon: "💬", status: "Deployed", statusColor: "#36c08e", queries: "9.1k", delay: 0.6 },
    { name: "Onboarding Guide", channel: "Internal", channelIcon: "🎓", status: "Draft", statusColor: "#febc2e", queries: "—", delay: 0.7 },
  ];

  return (
    <div ref={ref} className={className}>
      <style>{`
        @keyframes agent-sparkle {
          0% { transform: scaleY(0.3); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0.3); opacity: 0.3; }
        }
        @keyframes agent-status-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(54,192,142,0.2); }
          50% { box-shadow: 0 0 6px 2px rgba(54,192,142,0.15); }
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
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-[#4597b0] text-[13px] font-medium">aiCartograph</span>
              <span className="text-white/30 text-[13px]">&gt;</span>
              <span className="text-white/70 text-[13px]">Agent Studio</span>
            </div>
            <div className="bg-[#4597b0]/20 text-[#4597b0] text-[11px] px-3 py-1.5 rounded font-medium">
              + New Agent
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {agents.map((agent, i) => {
              const channelColors: Record<string, { bg: string; fg: string }> = {
                Web: { bg: "rgba(69,151,176,0.15)", fg: "#4597b0" },
                Slack: { bg: "rgba(98,172,187,0.15)", fg: "#62acbb" },
                Email: { bg: "rgba(254,188,46,0.1)", fg: "#febc2e" },
                Voice: { bg: "rgba(240,101,101,0.1)", fg: "#f06565" },
                Internal: { bg: "rgba(240,180,41,0.1)", fg: "#f0b429" },
              };
              const cc = channelColors[agent.channel] || channelColors.Web;
              return (
                <div
                  key={i}
                  className="bg-white/[0.04] rounded-lg border border-white/[0.06] p-3 flex flex-col"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(8px)",
                    transition: `all 0.4s ${agent.delay}s ease-out`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center text-[12px]"
                      style={{ backgroundColor: cc.bg }}
                    >
                      <span style={{ color: cc.fg }}>{agent.channelIcon}</span>
                    </div>
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{
                        color: agent.statusColor,
                        backgroundColor: agent.status === "Deployed" ? "rgba(54,192,142,0.1)" : "rgba(254,188,46,0.08)",
                        border: `1px solid ${agent.status === "Deployed" ? "rgba(54,192,142,0.15)" : "rgba(254,188,46,0.12)"}`,
                        animation: isInView && agent.status === "Deployed" ? "agent-status-pulse 3s ease-in-out infinite" : "none",
                      }}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-white/85 text-[12px] font-semibold mb-1">{agent.name}</div>
                  <div className="mt-auto pt-1.5 border-t border-white/[0.05] flex items-center justify-between">
                    <div className="text-[12px] font-semibold" style={{ color: agent.queries === "—" ? "rgba(255,255,255,0.2)" : "#4597b0" }}>
                      {agent.queries}
                    </div>
                    <div className="flex items-end gap-[2px] h-3">
                      {(agent.status === "Deployed"
                        ? [3, 5, 4, 7, 6, 8, 5]
                        : [0, 0, 0, 0, 0, 0, 0]
                      ).map((h, j) => (
                        <div
                          key={j}
                          className="w-[3px] rounded-sm origin-bottom"
                          style={{
                            height: `${h * 1.2}px`,
                            backgroundColor: h > 0 ? `${cc.fg}66` : "rgba(255,255,255,0.05)",
                            animation: isInView && h > 0
                              ? `agent-sparkle ${1.5 + j * 0.1}s ${agent.delay + j * 0.08}s ease-in-out infinite`
                              : "none",
                            transformOrigin: "bottom",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
