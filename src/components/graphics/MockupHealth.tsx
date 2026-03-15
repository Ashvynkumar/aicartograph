export default function MockupHealth({ className = "" }: { className?: string }) {
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
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-[#4597b0] text-[10px]">aiCartograph</span>
            <span className="text-white/30 text-[10px]">&gt;</span>
            <span className="text-white/60 text-[10px]">Knowledge Health</span>
          </div>

          <div className="flex gap-3">
            {/* Left: Score ring */}
            <div className="w-[35%] flex flex-col items-center justify-center bg-white/[0.03] rounded-lg border border-white/[0.06] p-3">
              <div className="text-white/40 text-[9px] mb-2">Overall Health</div>
              {/* Circular score ring */}
              <div className="relative w-20 h-20 mb-2">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  {/* Background ring */}
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="6"
                  />
                  {/* Score arc — 82% of circumference */}
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#36c08e"
                    strokeWidth="6"
                    strokeDasharray={`${0.82 * 2 * Math.PI * 32} ${2 * Math.PI * 32}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
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
              {/* Issue cards */}
              <div className="text-white/50 text-[9px] font-medium mb-0.5">
                Active Issues
              </div>
              {[
                {
                  title: "Staleness Alert",
                  desc: "12 sources not updated in 90+ days",
                  severity: "critical",
                  color: "#ff5f57",
                  bgColor: "rgba(255,95,87,0.08)",
                  borderColor: "rgba(255,95,87,0.15)",
                },
                {
                  title: "Contradiction Found",
                  desc: "Pricing page conflicts with API docs",
                  severity: "warning",
                  color: "#febc2e",
                  bgColor: "rgba(254,188,46,0.06)",
                  borderColor: "rgba(254,188,46,0.12)",
                },
                {
                  title: "Gap Detected",
                  desc: "No docs for SSO SCIM provisioning",
                  severity: "info",
                  color: "#4597b0",
                  bgColor: "rgba(69,151,176,0.06)",
                  borderColor: "rgba(69,151,176,0.12)",
                },
              ].map((issue, i) => (
                <div
                  key={i}
                  className="rounded-lg px-2.5 py-2 border flex items-start gap-2"
                  style={{
                    backgroundColor: issue.bgColor,
                    borderColor: issue.borderColor,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: issue.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white/75 text-[9px] font-medium">
                        {issue.title}
                      </span>
                      <span
                        className="text-[7px] px-1 py-0.5 rounded uppercase font-medium tracking-wide"
                        style={{
                          color: issue.color,
                          backgroundColor: issue.bgColor,
                        }}
                      >
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-white/40 text-[8px] mt-0.5">{issue.desc}</p>
                  </div>
                </div>
              ))}

              {/* Action items */}
              <div className="mt-1">
                <div className="text-white/50 text-[9px] font-medium mb-1.5">
                  Action Items
                </div>
                <div className="space-y-1">
                  {[
                    { text: "Review & update stale deployment guides", priority: "High" },
                    { text: "Reconcile pricing discrepancies", priority: "Med" },
                  ].map((todo, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/[0.03] rounded px-2 py-1.5 border border-white/[0.05]"
                    >
                      <div className="w-2.5 h-2.5 rounded-sm border border-white/20 flex-shrink-0" />
                      <span className="text-white/60 text-[9px] flex-1">{todo.text}</span>
                      <span
                        className="text-[7px] px-1 py-0.5 rounded font-medium"
                        style={{
                          color: todo.priority === "High" ? "#ff5f57" : "#febc2e",
                          backgroundColor:
                            todo.priority === "High"
                              ? "rgba(255,95,87,0.1)"
                              : "rgba(254,188,46,0.08)",
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
