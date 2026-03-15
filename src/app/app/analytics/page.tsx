"use client";

import { useAppStore } from "@/lib/store";
import {
  BarChart3, TrendingUp, Clock, Users, DollarSign, Target,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import ClientOnly from "@/components/app/ClientOnly";

export default function AnalyticsPage() {
  const { metrics, sources, conversations } = useAppStore();

  const totalResolutions = metrics.reduce((a, m) => a + m.resolutions, 0);
  const avgTime = 2.3;
  const topTopics = [
    { name: "SSO & Auth", value: 34 },
    { name: "API Usage", value: 28 },
    { name: "Deployment", value: 21 },
    { name: "Policies", value: 18 },
    { name: "Onboarding", value: 15 },
  ];
  const COLORS = ["#4597b0", "#62acbb", "#97c1cc", "#49818d", "#44696a"];

  const engagementData = [
    { name: "Mon", resolutions: 42, unique: 12 },
    { name: "Tue", resolutions: 37, unique: 10 },
    { name: "Wed", resolutions: 29, unique: 8 },
    { name: "Thu", resolutions: 35, unique: 11 },
    { name: "Fri", resolutions: 31, unique: 9 },
  ];

  const hoursSaved = Math.round(totalResolutions * 0.35);
  const moneySaved = hoursSaved * 65;

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-white text-xl font-bold font-serif">Resolution Intelligence</h1>
        <p className="text-white/40 text-sm mt-1">Metrics, trends, and impact analysis</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Resolutions (7d)", value: totalResolutions, icon: Target, color: "#4597b0", sub: `${Math.round(totalResolutions / 7)}/day avg` },
          { label: "Avg Resolution Time", value: `${avgTime}s`, icon: Clock, color: "#62acbb", sub: "0.4s faster than last week" },
          { label: "Hours Saved", value: hoursSaved, icon: TrendingUp, color: "#4ba88e", sub: "Based on avg search time" },
          { label: "Estimated Savings", value: `$${moneySaved.toLocaleString()}`, icon: DollarSign, color: "#d4a853", sub: "At $65/hr average" },
        ].map((m) => (
          <div key={m.label} className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <m.icon size={16} style={{ color: m.color }} />
              <span className="text-white/40 text-xs">{m.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{m.value}</p>
            <p className="text-white/30 text-xs mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resolution Volume */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4">Daily Resolution Volume</h3>
          <div className="h-56">
            <ClientOnly fallback={<div className="h-full bg-white/5 rounded-lg animate-pulse" />}><ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="colorResA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4597b0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4597b0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} tickFormatter={(v: string) => v.slice(5)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#223e49", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                <Area type="monotone" dataKey="resolutions" stroke="#4597b0" fill="url(#colorResA)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer></ClientOnly>
          </div>
        </div>

        {/* Topic Distribution */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4">Topic Distribution</h3>
          <div className="h-56 flex items-center">
            <ClientOnly fallback={<div className="h-full bg-white/5 rounded-lg animate-pulse" />}><ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={topTopics} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {topTopics.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#223e49", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }} />
              </PieChart>
            </ResponsiveContainer></ClientOnly>
          </div>
        </div>

        {/* Engagement */}
        <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4">User Engagement</h3>
          <div className="h-56">
            <ClientOnly fallback={<div className="h-full bg-white/5 rounded-lg animate-pulse" />}><ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#223e49", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                <Bar dataKey="resolutions" fill="#4597b0" radius={[4, 4, 0, 0]} name="Resolutions" />
                <Bar dataKey="unique" fill="#62acbb" radius={[4, 4, 0, 0]} name="Unique Users" />
              </BarChart>
            </ResponsiveContainer></ClientOnly>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-br from-[#4597b0]/10 to-[#62acbb]/5 border border-[#4597b0]/20 rounded-xl p-5">
          <h3 className="text-white/80 text-sm font-semibold mb-4 flex items-center gap-2">
            <DollarSign size={16} className="text-[#d4a853]" />
            ROI Calculator
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-white">{totalResolutions}</p>
                <p className="text-white/40 text-xs mt-1">Resolutions this week</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-[#4ba88e]">{hoursSaved}h</p>
                <p className="text-white/40 text-xs mt-1">Time saved</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-white/40 text-xs mb-1">Estimated cost savings this week</p>
              <p className="text-4xl font-bold text-[#d4a853]">${moneySaved.toLocaleString()}</p>
              <p className="text-white/30 text-xs mt-2">Based on {totalResolutions} resolutions × 21 min avg search time × $65/hr</p>
            </div>
            <p className="text-white/30 text-[10px] text-center">
              Projected annual savings: <span className="text-[#d4a853] font-medium">${(moneySaved * 52).toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
