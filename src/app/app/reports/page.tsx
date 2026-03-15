"use client";

import { useState } from "react";
import {
  FileText, Download, Calendar, Clock, TrendingUp,
  HeartPulse, BarChart3, DollarSign, Eye, Mail, ChevronDown,
} from "lucide-react";

const REPORTS = [
  {
    id: "weekly-health",
    name: "Weekly Knowledge Health Report",
    type: "weekly",
    description: "Score changes, new issues, resolved issues, source updates",
    lastGenerated: "2026-03-10T09:00:00Z",
    icon: HeartPulse,
    color: "#4ba88e",
    preview: {
      highlights: ["Health score: 65 (↓9 from last week)", "2 new critical issues", "1 issue resolved", "Onboarding Guide staleness at 181 days"],
    },
  },
  {
    id: "monthly-resolution",
    name: "Monthly Resolution Summary",
    type: "monthly",
    description: "Total resolutions, top topics, source coverage changes",
    lastGenerated: "2026-03-01T09:00:00Z",
    icon: BarChart3,
    color: "#4597b0",
    preview: {
      highlights: ["847 resolutions in February", "Top topic: SSO & Auth (34%)", "3 new sources added", "Resolution rate: 73% (↑5%)"],
    },
  },
  {
    id: "quarterly-impact",
    name: "Quarterly Business Impact",
    type: "quarterly",
    description: "ROI calculations, time saved, ticket deflection estimates",
    lastGenerated: "2026-01-01T09:00:00Z",
    icon: DollarSign,
    color: "#d4a853",
    preview: {
      highlights: ["Estimated 312 hours saved", "~$20,280 in cost savings", "42% ticket deflection rate", "NPS from knowledge users: 78"],
    },
  },
];

export default function ReportsPage() {
  const [previewReport, setPreviewReport] = useState<string | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const selectedReport = REPORTS.find((r) => r.id === previewReport);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-white text-xl font-bold font-serif">Automated Reports</h1>
        <p className="text-white/40 text-sm mt-1">Generate, preview, and schedule knowledge reports</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {REPORTS.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5 hover:border-[#4597b0]/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${report.color}20` }}>
                  <Icon size={20} style={{ color: report.color }} />
                </div>
                <span className="text-white/30 text-xs capitalize px-2 py-0.5 rounded bg-white/5">{report.type}</span>
              </div>
              <h3 className="text-white/90 font-medium text-sm mb-1">{report.name}</h3>
              <p className="text-white/40 text-xs mb-4">{report.description}</p>
              <div className="flex items-center gap-2 text-white/20 text-xs mb-4">
                <Clock size={10} />
                Last: {new Date(report.lastGenerated).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewReport(report.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs hover:bg-white/10 transition-all"
                >
                  <Eye size={12} /> Preview
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4597b0]/10 text-[#4597b0] text-xs hover:bg-[#4597b0]/20 transition-all">
                  <Download size={12} /> PDF
                </button>
                <button
                  onClick={() => setScheduleOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs hover:bg-white/10 transition-all"
                >
                  <Mail size={12} /> Schedule
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Customization */}
      <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
        <h3 className="text-white/80 text-sm font-semibold mb-4">Custom Report Builder</h3>
        <p className="text-white/40 text-xs mb-4">Select which metrics to include in your reports</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Health Score Trend", "Resolution Volume", "Source Utilization", "Staleness Report", "Contradiction Summary", "Gap Analysis", "ROI Metrics", "Feedback Summary"].map((metric) => (
            <label key={metric} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] hover:bg-white/5 cursor-pointer transition-all">
              <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5 text-[#4597b0] focus:ring-[#4597b0]" />
              <span className="text-white/60 text-xs">{metric}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Report Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-6 max-w-lg w-full mx-4 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold font-serif">{selectedReport.name}</h2>
              <button onClick={() => setPreviewReport(null)} className="text-white/40 hover:text-white/80 text-sm">Close</button>
            </div>

            <div className="bg-white/5 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/30 text-xs">Generated: {new Date().toLocaleDateString()}</span>
                <span className="text-white/30 text-xs capitalize">{selectedReport.type} Report</span>
              </div>
              <h3 className="text-white/80 text-sm font-semibold">Key Highlights</h3>
              <div className="space-y-2">
                {selectedReport.preview.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedReport.color }} />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium flex items-center justify-center gap-2">
                <Download size={14} /> Download PDF
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm flex items-center justify-center gap-2">
                <FileText size={14} /> Download CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 space-y-4">
            <h2 className="text-white font-bold font-serif">Schedule Report</h2>
            <div>
              <label className="text-white/40 text-xs block mb-1.5">Frequency</label>
              <select className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm outline-none">
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1.5">Send to</label>
              <input placeholder="email@company.com" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/30" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setScheduleOpen(false)} className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm">Cancel</button>
              <button onClick={() => setScheduleOpen(false)} className="flex-1 py-2 rounded-lg bg-[#4597b0] text-white text-sm font-medium">Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
