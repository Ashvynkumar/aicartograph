"use client";

import { useAppStore } from "@/lib/store";
import {
  Database, MessageSquare, HeartPulse, MessageCircle, ArrowUp,
  ArrowDown, Upload, HelpCircle, FileText, AlertTriangle, ThumbsDown,
  GitBranch, TrendingUp,
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import ClientOnly from "@/components/app/ClientOnly";
import WelcomePrompt from "@/components/app/WelcomePrompt";

function MetricCard({ label, value, change, changeDir, icon: Icon, href, color }: {
  label: string; value: string | number; change: string; changeDir: "up" | "down";
  icon: React.ElementType; href: string; color: string;
}) {
  return (
    <Link href={href} className="group app-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div className={`flex items-center gap-1 text-xs ${changeDir === "up" ? "text-emerald-400" : "text-red-400"}`}>
          {changeDir === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{value}</p>
      <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{label}</p>
    </Link>
  );
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "resolution": return <MessageSquare size={14} className="text-[#4597b0]" />;
    case "source_upload": return <Upload size={14} className="text-emerald-400" />;
    case "health_alert": return <AlertTriangle size={14} className="text-amber-400" />;
    case "feedback": return <ThumbsDown size={14} className="text-red-400" />;
    case "workflow": return <GitBranch size={14} className="text-purple-400" />;
    default: return <FileText size={14} className="text-white/40" />;
  }
}

export default function DashboardPage() {
  const { sources, conversations, metrics, activity, healthIssues, feedbackItems, user, welcomePromptDismissed } = useAppStore();

  const totalSources = sources.length;
  const resolutionRate = 73;
  const healthScore = Math.round(sources.reduce((a, s) => a + s.healthScore, 0) / (totalSources || 1));
  const openFeedback = feedbackItems.filter((f) => f.status === "unresolved").length;

  const agents = [
    { name: "Connect", status: "idle" as const, desc: "Awaiting sources" },
    { name: "Resolve", status: "active" as const, desc: "Ready for queries" },
    { name: "Detect", status: "active" as const, desc: `${healthIssues.filter(h => !h.resolved).length} issues found` },
    { name: "Close Loop", status: "alert" as const, desc: `${openFeedback} items pending` },
  ];

  const statusColor = { active: "bg-emerald-400", idle: "bg-white/20", alert: "bg-amber-400" };

  if (!welcomePromptDismissed) {
    return (
      <div className="h-[calc(100vh-5rem)] -mt-2">
        <WelcomePrompt />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="rounded-xl p-6" style={{ background: "linear-gradient(135deg, rgba(69,151,176,0.12), rgba(86,179,245,0.06))", border: "1px solid rgba(69,151,176,0.2)" }}>
        <h1 className="text-xl font-bold font-serif" style={{ color: "var(--text-primary)" }}>
          Welcome back, {user.name}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
          {user.company} &middot; Command Center
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Sources" value={totalSources} change="1 this week" changeDir="up" icon={Database} href="/app/sources" color="#4597b0" />
        <MetricCard label="Resolution Rate" value={`${resolutionRate}%`} change="5% from last week" changeDir="up" icon={MessageSquare} href="/app/resolve" color="#62acbb" />
        <MetricCard label="Health Score" value={healthScore} change="9 pts from last week" changeDir="down" icon={HeartPulse} href="/app/health" color={healthScore >= 70 ? "#4ba88e" : "#d4726a"} />
        <MetricCard label="Open Feedback" value={openFeedback} change="2 new this week" changeDir="up" icon={MessageCircle} href="/app/feedback" color="#d4a853" />
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 app-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Resolution Volume — Last 7 Days</h3>
            <div className="flex items-center gap-1 text-emerald-400 text-xs">
              <TrendingUp size={12} />
              <span>215 total</span>
            </div>
          </div>
          <div className="h-48">
            <ClientOnly fallback={<div className="h-48 bg-white/5 rounded-lg animate-pulse" />}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4597b0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4597b0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} tickFormatter={(v: string) => v.slice(5)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#223e49", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="resolutions" stroke="#4597b0" fill="url(#colorRes)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            </ClientOnly>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="app-card rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>Recent Activity</h3>
          <div className="space-y-3">
            {activity.slice(0, 8).map((a) => (
              <div key={a.id} className="flex items-start gap-3 group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 shrink-0" style={{ background: "var(--bg-input)" }}>
                  <ActivityIcon type={a.type} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "var(--text-secondary)" }}>{a.title}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{new Date(a.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions + Agent Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="app-card rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Upload Source", icon: Upload, href: "/app/sources", color: "#4597b0" },
              { label: "Ask a Question", icon: HelpCircle, href: "/app/resolve", color: "#62acbb" },
              { label: "View Health", icon: HeartPulse, href: "/app/health", color: "#36c08e" },
            ].map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:scale-[1.02]"
                style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}
              >
                <a.icon size={20} style={{ color: a.color }} />
                <span className="text-xs text-center" style={{ color: "var(--text-tertiary)" }}>{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Agent Status */}
        <div className="app-card rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>Agent Status</h3>
          <div className="grid grid-cols-2 gap-3">
            {agents.map((agent) => (
              <div key={agent.name} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--bg-input)" }}>
                <div className={`w-2.5 h-2.5 rounded-full ${statusColor[agent.status]} ${agent.status === "active" ? "animate-pulse" : ""}`} />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{agent.name}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{agent.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
