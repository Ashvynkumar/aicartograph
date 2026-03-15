export default function MockupAgents({ className = "" }: { className?: string }) {
  const agents = [
    {
      name: "Web Widget Agent",
      channel: "Web",
      channelIcon: "🌐",
      status: "Deployed",
      statusColor: "#36c08e",
      queries: "12.8k",
      description: "Handles customer queries via embedded widget",
    },
    {
      name: "Slack Bot",
      channel: "Slack",
      channelIcon: "#",
      status: "Deployed",
      statusColor: "#36c08e",
      queries: "8.4k",
      description: "Internal team support and knowledge lookup",
    },
    {
      name: "Email Agent",
      channel: "Email",
      channelIcon: "✉",
      status: "Draft",
      statusColor: "#febc2e",
      queries: "0",
      description: "Auto-respond to support inbox inquiries",
    },
  ];

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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <span className="text-[#4597b0] text-[10px]">aiCartograph</span>
              <span className="text-white/30 text-[10px]">&gt;</span>
              <span className="text-white/60 text-[10px]">Agent Studio</span>
            </div>
            <div className="bg-[#4597b0]/20 text-[#4597b0] text-[8px] px-2 py-0.5 rounded font-medium">
              + New Agent
            </div>
          </div>

          {/* Agent cards grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {agents.map((agent, i) => (
              <div
                key={i}
                className="bg-white/[0.04] rounded-lg border border-white/[0.06] p-3 flex flex-col"
              >
                {/* Header with channel icon and status */}
                <div className="flex items-start justify-between mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px]"
                    style={{
                      backgroundColor:
                        agent.channel === "Web"
                          ? "rgba(69,151,176,0.15)"
                          : agent.channel === "Slack"
                            ? "rgba(98,172,187,0.15)"
                            : "rgba(254,188,46,0.1)",
                    }}
                  >
                    <span
                      style={{
                        color:
                          agent.channel === "Web"
                            ? "#4597b0"
                            : agent.channel === "Slack"
                              ? "#62acbb"
                              : "#febc2e",
                        fontSize: agent.channel === "Slack" ? "14px" : "12px",
                        fontWeight: agent.channel === "Slack" ? "bold" : "normal",
                      }}
                    >
                      {agent.channelIcon}
                    </span>
                  </div>
                  <span
                    className="text-[8px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{
                      color: agent.statusColor,
                      backgroundColor:
                        agent.status === "Deployed"
                          ? "rgba(54,192,142,0.1)"
                          : "rgba(254,188,46,0.08)",
                      border: `1px solid ${agent.status === "Deployed" ? "rgba(54,192,142,0.15)" : "rgba(254,188,46,0.12)"}`,
                    }}
                  >
                    {agent.status}
                  </span>
                </div>

                {/* Agent name */}
                <div className="text-white/80 text-[10px] font-medium mb-0.5">
                  {agent.name}
                </div>
                <div className="text-white/35 text-[8px] mb-3 leading-relaxed">
                  {agent.description}
                </div>

                {/* Stats bar */}
                <div className="mt-auto pt-2 border-t border-white/[0.05] flex items-center justify-between">
                  <div>
                    <div className="text-white/30 text-[7px] uppercase tracking-wide">
                      Queries
                    </div>
                    <div
                      className="text-[12px] font-semibold"
                      style={{
                        color:
                          agent.queries === "0"
                            ? "rgba(255,255,255,0.2)"
                            : "#4597b0",
                      }}
                    >
                      {agent.queries}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/30 text-[7px] uppercase tracking-wide">
                      Channel
                    </div>
                    <div className="text-white/50 text-[9px]">{agent.channel}</div>
                  </div>
                  {/* Mini activity sparkline */}
                  <div className="flex items-end gap-px h-3">
                    {(agent.status === "Deployed"
                      ? [3, 5, 4, 7, 6, 8, 5, 9, 7]
                      : [0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ).map((h, j) => (
                      <div
                        key={j}
                        className="w-[3px] rounded-sm"
                        style={{
                          height: `${h * 1.2}px`,
                          backgroundColor:
                            h > 0
                              ? i === 0
                                ? "rgba(69,151,176,0.4)"
                                : "rgba(98,172,187,0.4)"
                              : "rgba(255,255,255,0.05)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
