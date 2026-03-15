"use client";

import { useAppStore } from "@/lib/store";
import {
  MessageCircle, TrendingUp, ThumbsUp, ThumbsDown, AlertCircle,
  ArrowUpRight, User, Clock, BarChart3,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import ClientOnly from "@/components/app/ClientOnly";

export default function FeedbackPage() {
  const { feedbackItems, conversations, sources } = useAppStore();

  const allResolutions = conversations.flatMap((c) => c.resolutions);
  const thumbsUp = allResolutions.filter((r) => r.feedback === "up").length;
  const thumbsDown = allResolutions.filter((r) => r.feedback === "down").length;
  const total = thumbsUp + thumbsDown;
  const satRate = total > 0 ? Math.round((thumbsUp / total) * 100) : 0;

  const sourceUtilization = sources.map((s) => ({
    name: s.title.slice(0, 20),
    citations: s.citationCount,
  })).sort((a, b) => b.citations - a.citations);

  const creationPriorities = [
    { topic: "GraphQL API Documentation", reason: "Asked 12 times, no source exists", effort: "Medium", priority: "high" },
    { topic: "Budget Request Process", reason: "Asked 8 times, no clear answer", effort: "Low", priority: "high" },
    { topic: "EU Data Residency Options", reason: "Asked 5 times, no coverage", effort: "High", priority: "medium" },
    { topic: "Webhook Configuration Guide", reason: "Asked 6 times, partial coverage", effort: "Medium", priority: "medium" },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-white text-xl font-bold font-serif">Feedback & Loop</h1>
        <p className="text-white/40 text-sm mt-1">Track unresolved questions, feedback, and creation priorities</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Satisfaction Rate", value: `${satRate}%`, icon: ThumbsUp, color: "#4ba88e" },
          { label: "Thumbs Up", value: thumbsUp, icon: ThumbsUp, color: "#4ba88e" },
          { label: "Thumbs Down", value: thumbsDown, icon: ThumbsDown, color: "#d4726a" },
          { label: "Unresolved", value: feedbackItems.filter((f) => f.status === "unresolved").length, icon: AlertCircle, color: "#d4a853" },
        ].map((m) => (
          <div key={m.label} className="bg-[#223e49]/60 border border-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <m.icon size={16} style={{ color: m.color }} />
              <span className="text-white/40 text-xs">{m.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unresolved Questions */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4">Unresolved Questions — by Frequency</h3>
          <div className="space-y-3">
            {feedbackItems.sort((a, b) => b.frequency - a.frequency).map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/5 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-white/80 text-sm font-medium flex-1">&ldquo;{item.query}&rdquo;</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ml-2 shrink-0 ${
                    item.status === "unresolved" ? "bg-red-400/10 text-red-400" : item.status === "in-progress" ? "bg-amber-400/10 text-amber-400" : "bg-emerald-400/10 text-emerald-400"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <span className="flex items-center gap-1"><TrendingUp size={10} /> Asked {item.frequency} times</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> Last: {new Date(item.lastAsked).toLocaleDateString()}</span>
                  {item.assignedTo && <span className="flex items-center gap-1"><User size={10} /> {item.assignedTo}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Utilization */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4">Source Utilization — Citations</h3>
          <div className="h-64">
            <ClientOnly fallback={<div className="h-full bg-white/5 rounded-lg animate-pulse" />}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceUtilization} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} width={100} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#223e49", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                <Bar dataKey="citations" fill="#4597b0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            </ClientOnly>
          </div>
        </div>
      </div>

      {/* Creation Priorities */}
      <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
        <h3 className="text-white/80 text-sm font-semibold mb-1">Creation Priorities</h3>
        <p className="text-white/30 text-xs mb-4">AI-generated list of knowledge that should exist but doesn&apos;t</p>
        <div className="space-y-2">
          {creationPriorities.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] hover:bg-white/5 transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${p.priority === "high" ? "bg-red-400" : "bg-amber-400"}`} />
                <div>
                  <p className="text-white/80 text-sm font-medium">{p.topic}</p>
                  <p className="text-white/30 text-xs mt-0.5">{p.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-xs">{p.effort} effort</span>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#4597b0]/10 text-[#4597b0] text-xs hover:bg-[#4597b0]/20 transition-all">
                  <ArrowUpRight size={12} />
                  Create
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Log */}
      <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
        <h3 className="text-white/80 text-sm font-semibold mb-4">Recent Feedback Log</h3>
        <div className="space-y-2">
          {allResolutions.filter((r) => r.feedback).map((res) => (
            <div key={res.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
              <div className={`p-1 rounded ${res.feedback === "up" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}>
                {res.feedback === "up" ? <ThumbsUp size={12} /> : <ThumbsDown size={12} />}
              </div>
              <p className="text-white/60 text-sm flex-1 truncate">{res.query}</p>
              {res.feedbackComment && (
                <span className="text-white/30 text-xs italic truncate max-w-[200px]">&ldquo;{res.feedbackComment}&rdquo;</span>
              )}
              <span className="text-white/20 text-xs shrink-0">{new Date(res.timestamp).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
