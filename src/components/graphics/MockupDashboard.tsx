export default function MockupDashboard({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
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
        <div className="bg-[#0c2329] p-4 text-[10px]">
          {/* Breadcrumb bar */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-[#4597b0] text-[10px]">aiCartograph</span>
            <span className="text-white/30 text-[10px]">&gt;</span>
            <span className="text-white/60 text-[10px]">Command Center</span>
          </div>

          {/* Metric cards row */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { label: "Total Sources", value: "47", color: "#4597b0" },
              { label: "Resolution Rate", value: "73%", color: "#36c08e" },
              { label: "Health Score", value: "82", color: "#62acbb" },
              { label: "Open Feedback", value: "12", color: "#febc2e" },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white/[0.04] rounded-lg p-2.5 border border-white/[0.06]"
              >
                <div className="text-white/40 text-[9px] mb-1">{card.label}</div>
                <div
                  className="text-[16px] font-semibold"
                  style={{ color: card.color }}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          {/* Chart + Activity feed */}
          <div className="flex gap-2">
            {/* Area chart placeholder */}
            <div className="flex-1 bg-white/[0.03] rounded-lg border border-white/[0.06] p-2.5">
              <div className="text-white/50 text-[9px] mb-2">Query Volume (7d)</div>
              <div className="relative h-16">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 text-white/20 text-[8px]">200</div>
                <div className="absolute left-0 bottom-0 text-white/20 text-[8px]">0</div>
                {/* Chart area gradient */}
                <div className="absolute inset-x-4 bottom-0 h-full flex items-end">
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
                {/* Chart line */}
                <div
                  className="absolute inset-x-4 bottom-0 h-full"
                  style={{
                    background: "transparent",
                    borderTop: "none",
                  }}
                >
                  <svg
                    viewBox="0 0 200 60"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      points="0,48 20,39 40,42 70,27 100,30 130,18 150,15 170,21 200,12"
                      fill="none"
                      stroke="#4597b0"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Activity feed */}
            <div className="w-[38%] bg-white/[0.03] rounded-lg border border-white/[0.06] p-2.5">
              <div className="text-white/50 text-[9px] mb-2">Recent Activity</div>
              <div className="space-y-1.5">
                {[
                  { text: "Source sync completed", time: "2m ago", dot: "#36c08e" },
                  { text: "3 contradictions resolved", time: "14m ago", dot: "#4597b0" },
                  { text: "New feedback submitted", time: "1h ago", dot: "#febc2e" },
                  { text: "Health scan finished", time: "3h ago", dot: "#62acbb" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 py-1 border-b border-white/[0.04] last:border-0"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.dot }}
                    />
                    <span className="text-white/60 text-[9px] flex-1 truncate">
                      {item.text}
                    </span>
                    <span className="text-white/25 text-[8px] flex-shrink-0">
                      {item.time}
                    </span>
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
