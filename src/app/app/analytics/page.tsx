"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  BarChart3, TrendingUp, Clock, DollarSign, Target,
  HeartPulse, Download, Eye, Mail, FileText, Calendar,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import ClientOnly from "@/components/app/ClientOnly";

const REPORTS = [
  { id: "weekly-health", name: "Weekly Health Report", type: "weekly", description: "Score changes, issues, source updates", lastGenerated: "2026-03-10T09:00:00Z", icon: HeartPulse, color: "#36c08e",
    highlights: ["Health score: 65 (-9 from last week)", "2 new critical issues", "1 issue resolved", "Onboarding Guide staleness at 181 days"] },
  { id: "monthly-resolution", name: "Monthly Resolution Summary", type: "monthly", description: "Total resolutions, top topics, coverage", lastGenerated: "2026-03-01T09:00:00Z", icon: BarChart3, color: "#4597b0",
    highlights: ["847 resolutions in February", "Top topic: SSO & Auth (34%)", "3 new sources added", "Resolution rate: 73% (+5%)"] },
  { id: "quarterly-impact", name: "Quarterly Business Impact", type: "quarterly", description: "ROI calculations, time saved, ticket deflection", lastGenerated: "2026-01-01T09:00:00Z", icon: DollarSign, color: "#f0b429",
    highlights: ["Estimated 312 hours saved", "~$20,280 in cost savings", "42% ticket deflection rate", "NPS from knowledge users: 78"] },
];

export default function AnalyticsPage() {
  const { metrics } = useAppStore();
  const [activeTab, setActiveTab] = useState<"metrics" | "reports">("metrics");
  const [previewReport, setPreviewReport] = useState<string | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const totalResolutions = metrics.reduce((a, m) => a + m.resolutions, 0);
  const avgTime = 2.3;
  const hoursSaved = Math.round(totalResolutions * 0.35);
  const moneySaved = hoursSaved * 65;

  const topTopics = [
    { name: "SSO & Auth", value: 34 }, { name: "API Usage", value: 28 },
    { name: "Deployment", value: 21 }, { name: "Policies", value: 18 }, { name: "Onboarding", value: 15 },
  ];
  const COLORS = ["#4597b0", "#56b3f5", "#36c08e", "#f0b429", "#9b8ce8"];

  const engagementData = [
    { name: "Mon", resolutions: 42, unique: 12 }, { name: "Tue", resolutions: 37, unique: 10 },
    { name: "Wed", resolutions: 29, unique: 8 }, { name: "Thu", resolutions: 35, unique: 11 },
    { name: "Fri", resolutions: 31, unique: 9 },
  ];

  const selectedReport = REPORTS.find((r) => r.id === previewReport);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-serif" style={{ color: "var(--text-primary)" }}>Analytics & Reports</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Metrics, trends, impact analysis, and automated reports</p>
        </div>
        <div className="flex rounded-lg p-1" style={{ background: "var(--bg-input)" }}>
          <button onClick={() => setActiveTab("metrics")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === "metrics" ? "bg-[#4597b0] text-white" : ""}`}
            style={activeTab !== "metrics" ? { color: "var(--text-muted)" } : {}}>
            Metrics
          </button>
          <button onClick={() => setActiveTab("reports")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === "reports" ? "bg-[#4597b0] text-white" : ""}`}
            style={activeTab !== "reports" ? { color: "var(--text-muted)" } : {}}>
            Reports
          </button>
        </div>
      </div>

      {activeTab === "metrics" && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Resolutions (7d)", value: totalResolutions, icon: Target, color: "#4597b0", sub: `${Math.round(totalResolutions / 7)}/day avg` },
              { label: "Avg Resolution Time", value: `${avgTime}s`, icon: Clock, color: "#56b3f5", sub: "0.4s faster than last week" },
              { label: "Hours Saved", value: hoursSaved, icon: TrendingUp, color: "#36c08e", sub: "Based on avg search time" },
              { label: "Estimated Savings", value: `$${moneySaved.toLocaleString()}`, icon: DollarSign, color: "#f0b429", sub: "At $65/hr average" },
            ].map((m) => (
              <div key={m.label} className="app-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <m.icon size={16} style={{ color: m.color }} />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{m.label}</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{m.value}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{m.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resolution Volume */}
            <div className="app-card rounded-xl p-5">
              <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>Daily Resolution Volume</h3>
              <div className="h-56">
                <ClientOnly fallback={<div className="h-full rounded-lg animate-pulse" style={{ background: "var(--bg-input)" }} />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metrics}>
                      <defs><linearGradient id="colorResA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4597b0" stopOpacity={0.3} /><stop offset="95%" stopColor="#4597b0" stopOpacity={0} />
                      </linearGradient></defs>
                      <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} tickFormatter={(v: string) => v.slice(5)} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#223e49", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                      <Area type="monotone" dataKey="resolutions" stroke="#4597b0" fill="url(#colorResA)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
            </div>

            {/* Topic Distribution */}
            <div className="app-card rounded-xl p-5">
              <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>Topic Distribution</h3>
              <div className="h-56 flex items-center">
                <ClientOnly fallback={<div className="h-full rounded-lg animate-pulse" style={{ background: "var(--bg-input)" }} />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={topTopics} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                        {topTopics.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#223e49", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                      <Legend wrapperStyle={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
            </div>

            {/* Engagement */}
            <div className="app-card rounded-xl p-5">
              <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>User Engagement</h3>
              <div className="h-56">
                <ClientOnly fallback={<div className="h-full rounded-lg animate-pulse" style={{ background: "var(--bg-input)" }} />}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#223e49", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                      <Bar dataKey="resolutions" fill="#4597b0" radius={[4, 4, 0, 0]} name="Resolutions" />
                      <Bar dataKey="unique" fill="#56b3f5" radius={[4, 4, 0, 0]} name="Unique Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </ClientOnly>
              </div>
            </div>

            {/* ROI */}
            <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, rgba(69,151,176,0.1), rgba(240,180,41,0.05))", border: "1px solid rgba(69,151,176,0.2)" }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <DollarSign size={16} className="text-[#f0b429]" /> ROI Calculator
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg p-4 text-center" style={{ background: "var(--bg-input)" }}>
                    <p className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{totalResolutions}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Resolutions this week</p>
                  </div>
                  <div className="rounded-lg p-4 text-center" style={{ background: "var(--bg-input)" }}>
                    <p className="text-3xl font-bold text-[#36c08e]">{hoursSaved}h</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Time saved</p>
                  </div>
                </div>
                <div className="rounded-lg p-4 text-center" style={{ background: "var(--bg-input)" }}>
                  <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Estimated cost savings this week</p>
                  <p className="text-4xl font-bold text-[#f0b429]">${moneySaved.toLocaleString()}</p>
                  <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Based on {totalResolutions} resolutions x 21 min avg x $65/hr</p>
                </div>
                <p className="text-[10px] text-center" style={{ color: "var(--text-muted)" }}>
                  Projected annual savings: <span className="text-[#f0b429] font-medium">${(moneySaved * 52).toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "reports" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {REPORTS.map((report) => {
              const Icon = report.icon;
              return (
                <div key={report.id} className="app-card rounded-xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${report.color}20` }}>
                      <Icon size={20} style={{ color: report.color }} />
                    </div>
                    <span className="text-xs capitalize px-2 py-0.5 rounded" style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}>{report.type}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1" style={{ color: "var(--text-secondary)" }}>{report.name}</h3>
                  <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{report.description}</p>
                  <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                    <Clock size={10} /> Last: {new Date(report.lastGenerated).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setPreviewReport(report.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all" style={{ background: "var(--bg-input)", color: "var(--text-tertiary)" }}>
                      <Eye size={12} /> Preview
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4597b0]/10 text-[#4597b0] text-xs">
                      <Download size={12} /> PDF
                    </button>
                    <button onClick={() => setScheduleOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all" style={{ background: "var(--bg-input)", color: "var(--text-tertiary)" }}>
                      <Mail size={12} /> Schedule
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Report Builder */}
          <div className="app-card rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>Custom Report Builder</h3>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Select metrics to include</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Health Score Trend", "Resolution Volume", "Source Utilization", "Staleness Report", "Contradiction Summary", "Gap Analysis", "ROI Metrics", "Feedback Summary"].map((metric) => (
                <label key={metric} className="flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all" style={{ background: "var(--bg-input)" }}>
                  <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5 text-[#4597b0]" />
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{metric}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Report Preview Modal */}
          {selectedReport && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="rounded-2xl p-6 max-w-lg w-full mx-4 space-y-5" style={{ background: "var(--bg-primary)", border: "1px solid var(--border-primary)" }}>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold font-serif" style={{ color: "var(--text-primary)" }}>{selectedReport.name}</h2>
                  <button onClick={() => setPreviewReport(null)} className="text-sm" style={{ color: "var(--text-muted)" }}>Close</button>
                </div>
                <div className="rounded-xl p-5 space-y-3" style={{ background: "var(--bg-input)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>Generated: {new Date().toLocaleDateString()}</span>
                    <span className="text-xs capitalize" style={{ color: "var(--text-muted)" }}>{selectedReport.type} Report</span>
                  </div>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Key Highlights</h3>
                  {selectedReport.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-tertiary)" }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedReport.color }} />{h}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #4597b0, #56b3f5)" }}>
                    <Download size={14} /> Download PDF
                  </button>
                  <button className="flex-1 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>
                    <FileText size={14} /> Download CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Modal */}
          {scheduleOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="rounded-2xl p-6 max-w-sm w-full mx-4 space-y-4" style={{ background: "var(--bg-primary)", border: "1px solid var(--border-primary)" }}>
                <h2 className="font-bold font-serif" style={{ color: "var(--text-primary)" }}>Schedule Report</h2>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Frequency</label>
                  <select className="w-full px-3 py-2 rounded-lg text-sm app-input"><option>Weekly</option><option>Bi-weekly</option><option>Monthly</option></select>
                </div>
                <div>
                  <label className="text-xs block mb-1.5" style={{ color: "var(--text-muted)" }}>Send to</label>
                  <input placeholder="email@company.com" className="w-full px-3 py-2 rounded-lg text-sm app-input" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setScheduleOpen(false)} className="flex-1 py-2 rounded-lg text-sm" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}>Cancel</button>
                  <button onClick={() => setScheduleOpen(false)} className="flex-1 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">Schedule</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
