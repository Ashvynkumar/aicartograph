"use client";

import { useAppStore } from "@/lib/store";
import {
  HeartPulse, Clock, AlertTriangle, Search, BarChart3,
  ArrowDown, ArrowUp, ChevronRight, CheckCircle, Lightbulb,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import ClientOnly from "@/components/app/ClientOnly";

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? "#4ba88e" : score >= 60 ? "#d4a853" : score >= 40 ? "#e8964b" : "#d4726a";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-white/30 text-xs">/ 100</span>
      </div>
    </div>
  );
}

export default function HealthPage() {
  const { sources, healthIssues, contradictions, metrics, feedbackItems } = useAppStore();

  const healthScore = Math.round(sources.reduce((a, s) => a + s.healthScore, 0) / (sources.length || 1));
  const prevScore = metrics.length > 1 ? metrics[0].healthScore : healthScore;
  const scoreDelta = healthScore - prevScore;

  const staleSources = [...sources].sort((a, b) => b.stalenessScore - a.stalenessScore);
  const gaps = healthIssues.filter((h) => h.type === "gap" && !h.resolved);
  const openIssues = healthIssues.filter((h) => !h.resolved);

  const categoryScores = [
    { name: "Staleness", score: 100 - Math.round(sources.reduce((a, s) => a + Math.min(s.stalenessScore, 100), 0) / (sources.length || 1)), icon: Clock },
    { name: "Contradictions", score: Math.max(0, 100 - contradictions.length * 15), icon: AlertTriangle },
    { name: "Gaps", score: Math.max(0, 100 - gaps.length * 20), icon: Search },
    { name: "Quality", score: Math.round(sources.reduce((a, s) => a + s.healthScore, 0) / (sources.length || 1)), icon: BarChart3 },
  ];

  const actionItems = [
    { action: "Update Engineering Runbook", impact: "+8 points", priority: "critical" },
    { action: "Update Onboarding Guide", impact: "+6 points", priority: "critical" },
    { action: "Resolve deployment contradictions", impact: "+5 points", priority: "warning" },
    { action: "Create GraphQL documentation", impact: "+3 points", priority: "info" },
    { action: "Review HR Policy recency", impact: "+2 points", priority: "warning" },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-white text-xl font-bold font-serif">Knowledge Health</h1>
        <p className="text-white/40 text-sm mt-1">Overall quality assessment of your knowledge corpus</p>
      </div>

      {/* Score + Trend + Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-6 flex flex-col items-center space-y-4">
          <h3 className="text-white/60 text-sm font-medium">Overall Health Score</h3>
          <ScoreRing score={healthScore} />
          <div className={`flex items-center gap-1 text-sm ${scoreDelta >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {scoreDelta >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {Math.abs(scoreDelta)} pts from last week
          </div>
        </div>

        {/* Trend */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-6">
          <h3 className="text-white/60 text-sm font-medium mb-4">Health Trend — 7 Days</h3>
          <div className="h-40">
            <ClientOnly fallback={<div className="h-40 bg-white/5 rounded-lg animate-pulse" />}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} tickFormatter={(v: string) => v.slice(8)} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#223e49", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                <Line type="monotone" dataKey="healthScore" stroke="#4597b0" strokeWidth={2} dot={{ fill: "#4597b0", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
            </ClientOnly>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-6 space-y-4">
          <h3 className="text-white/60 text-sm font-medium">Breakdown by Category</h3>
          {categoryScores.map((cat) => {
            const Icon = cat.icon;
            const color = cat.score >= 80 ? "#4ba88e" : cat.score >= 60 ? "#d4a853" : "#d4726a";
            return (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={14} style={{ color }} />
                    <span className="text-white/70 text-sm">{cat.name}</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color }}>{cat.score}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${cat.score}%`, backgroundColor: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Staleness Table + Contradictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staleness */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4 flex items-center gap-2">
            <Clock size={16} className="text-white/40" />
            Staleness Report
          </h3>
          <div className="space-y-2">
            {staleSources.map((s) => {
              const color = s.stalenessScore < 30 ? "text-emerald-400 bg-emerald-400/10" : s.stalenessScore < 60 ? "text-amber-400 bg-amber-400/10" : s.stalenessScore < 90 ? "text-orange-400 bg-orange-400/10" : "text-red-400 bg-red-400/10";
              return (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/5 transition-all">
                  <span className="text-white/70 text-sm truncate flex-1">{s.title}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${color}`}>
                    {s.stalenessScore}d
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contradictions */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" />
            Contradictions ({contradictions.length})
          </h3>
          <div className="space-y-4">
            {contradictions.map((c) => (
              <div key={c.id} className="space-y-2 p-3 rounded-lg bg-white/[0.02]">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-full rounded-full bg-red-400/50 shrink-0 self-stretch" />
                  <div>
                    <p className="text-white/70 text-sm">&ldquo;{c.statement1.text}&rdquo;</p>
                    <p className="text-white/30 text-xs mt-1">— {c.statement1.sourceTitle}</p>
                  </div>
                </div>
                <div className="text-center text-white/20 text-xs">vs</div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-full rounded-full bg-amber-400/50 shrink-0 self-stretch" />
                  <div>
                    <p className="text-white/70 text-sm">&ldquo;{c.statement2.text}&rdquo;</p>
                    <p className="text-white/30 text-xs mt-1">— {c.statement2.sourceTitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gap Analysis + Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gaps */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4 flex items-center gap-2">
            <Search size={16} className="text-blue-400" />
            Gap Analysis
          </h3>
          {gaps.length > 0 ? gaps.map((g) => (
            <div key={g.id} className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 mb-2">
              <Search size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-white/80 text-sm">{g.title}</p>
                <p className="text-white/40 text-xs mt-1">{g.description}</p>
              </div>
            </div>
          )) : (
            <div className="text-center py-6">
              <CheckCircle size={24} className="mx-auto text-emerald-400/30 mb-2" />
              <p className="text-white/30 text-sm">No gaps detected</p>
            </div>
          )}
        </div>

        {/* Action Items */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4 flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-400" />
            Action Items
          </h3>
          <p className="text-white/40 text-xs mb-3">Fix these to improve your health score</p>
          <div className="space-y-2">
            {actionItems.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/5 transition-all">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.priority === "critical" ? "bg-red-400" : item.priority === "warning" ? "bg-amber-400" : "bg-blue-400"
                  }`} />
                  <span className="text-white/70 text-sm">{item.action}</span>
                </div>
                <span className="text-emerald-400 text-xs font-medium">{item.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module Handshake */}
      <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, rgba(54,192,142,0.08), rgba(69,151,176,0.04))", border: "1px solid rgba(54,192,142,0.15)" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Improve your health score</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Update stale sources, create missing docs, or automate alerts</p>
        </div>
        <div className="flex gap-2">
          <a href="/app/sources" className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#4597b0] hover:bg-[#3a87a0] transition-all">
            Update Sources
          </a>
          <a href="/app/foundry" className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
            Create in Foundry
          </a>
          <a href="/app/workflows" className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
            Setup Alerts
          </a>
        </div>
      </div>
    </div>
  );
}
