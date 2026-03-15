"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  Shield, Search, Download, Filter, Eye, Clock,
  MessageSquare, Database, AlertTriangle, User, ChevronDown,
  FileText, Lock, Flag,
} from "lucide-react";

export default function AuditPage() {
  const { conversations, sources } = useAppStore();
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allResolutions = conversations.flatMap((c) => c.resolutions);

  const auditLog = [
    ...allResolutions.map((r) => ({
      id: r.id,
      type: "resolution" as const,
      action: "Question resolved",
      detail: r.query,
      user: "Atlas",
      sources: r.sources.map((s) => s.sourceTitle).join(", "),
      timestamp: r.timestamp,
      confidence: r.confidence,
    })),
    ...sources.map((s) => ({
      id: `upload-${s.id}`,
      type: "source" as const,
      action: "Source indexed",
      detail: s.title,
      user: s.metadata.author || "System",
      sources: "",
      timestamp: s.metadata.uploadedAt,
      confidence: undefined,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filtered = auditLog.filter((log) => {
    if (filterType !== "all" && log.type !== filterType) return false;
    if (searchQuery && !log.detail.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const complianceSources = sources.filter((s) => s.type === "pdf" || s.title.toLowerCase().includes("security") || s.title.toLowerCase().includes("policy"));

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-bold font-serif">Audit Trail</h1>
          <p className="text-white/40 text-sm mt-1">Compliance logging for every resolution and source change</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10">
          <Download size={16} /> Export Audit Log
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: auditLog.length, icon: Shield, color: "#4597b0" },
          { label: "Resolutions Logged", value: allResolutions.length, icon: MessageSquare, color: "#62acbb" },
          { label: "Sources Tracked", value: sources.length, icon: Database, color: "#49818d" },
          { label: "Compliance Sources", value: complianceSources.length, icon: Lock, color: "#4ba88e" },
        ].map((m) => (
          <div key={m.label} className="bg-[#223e49]/60 border border-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <m.icon size={14} style={{ color: m.color }} />
              <span className="text-white/40 text-xs">{m.label}</span>
            </div>
            <p className="text-xl font-bold text-white">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Compliance Flags */}
      <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
        <h3 className="text-white/80 text-sm font-semibold mb-4 flex items-center gap-2">
          <Flag size={16} className="text-amber-400" />
          Compliance-Critical Sources
        </h3>
        <div className="space-y-2">
          {complianceSources.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Lock size={14} className="text-[#4597b0]" />
                <div>
                  <p className="text-white/80 text-sm">{s.title}</p>
                  <p className="text-white/30 text-xs">Last updated: {new Date(s.metadata.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-xs">{s.chunks.length} chunks</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  s.stalenessScore < 30 ? "bg-emerald-400/10 text-emerald-400" : s.stalenessScore < 60 ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"
                }`}>
                  {s.stalenessScore}d
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + Audit Log */}
      <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <h3 className="text-white/80 text-sm font-semibold">Event Log</h3>
          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none placeholder:text-white/30 w-48"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs outline-none"
            >
              <option value="all">All Events</option>
              <option value="resolution">Resolutions</option>
              <option value="source">Sources</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-3 py-2 text-white/30 text-xs font-medium">Timestamp</th>
                <th className="text-left px-3 py-2 text-white/30 text-xs font-medium">Type</th>
                <th className="text-left px-3 py-2 text-white/30 text-xs font-medium">Action</th>
                <th className="text-left px-3 py-2 text-white/30 text-xs font-medium">Detail</th>
                <th className="text-left px-3 py-2 text-white/30 text-xs font-medium">User</th>
                <th className="text-left px-3 py-2 text-white/30 text-xs font-medium">Sources Cited</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-all">
                  <td className="px-3 py-2.5 text-white/30 text-xs whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      log.type === "resolution" ? "bg-[#4597b0]/10 text-[#4597b0]" : "bg-emerald-400/10 text-emerald-400"
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-white/60 text-xs">{log.action}</td>
                  <td className="px-3 py-2.5 text-white/70 text-xs max-w-[200px] truncate">{log.detail}</td>
                  <td className="px-3 py-2.5 text-white/40 text-xs">{log.user}</td>
                  <td className="px-3 py-2.5 text-white/30 text-xs max-w-[200px] truncate">{log.sources || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Retention Policy */}
      <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
        <h3 className="text-white/80 text-sm font-semibold mb-4">Data Retention Policy</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Audit Log Retention", value: "365 days", editable: true },
            { label: "Resolution History", value: "90 days", editable: true },
            { label: "Source Versions", value: "All versions", editable: false },
          ].map((p) => (
            <div key={p.label} className="p-3 rounded-lg bg-white/[0.02]">
              <p className="text-white/40 text-xs mb-1">{p.label}</p>
              <p className="text-white/80 text-sm font-medium">{p.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
