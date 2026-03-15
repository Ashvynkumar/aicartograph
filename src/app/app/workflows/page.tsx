"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  GitBranch, Plus, Play, Pause, Clock, Zap, CheckCircle,
  ArrowRight, Bell, FileText, AlertTriangle, X, Mail,
  Settings,
} from "lucide-react";

const TEMPLATES = [
  { name: "Staleness Alert Flow", trigger: "Source staleness > 60 days", action: "Email notification to owner", icon: Clock },
  { name: "Gap-to-Task Flow", trigger: "Question asked 5+ times unresolved", action: "Create knowledge backlog task", icon: AlertTriangle },
  { name: "Weekly Health Digest", trigger: "Every Monday 9:00 AM", action: "Email health report to admins", icon: Mail },
  { name: "New Source Quality Check", trigger: "New source uploaded", action: "Run quality check & flag issues", icon: CheckCircle },
];

export default function WorkflowsPage() {
  const { workflows, toggleWorkflow } = useAppStore();
  const [builderOpen, setBuilderOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-bold font-serif">Workflows</h1>
          <p className="text-white/40 text-sm mt-1">Automate knowledge operations with custom flows</p>
        </div>
        <button
          onClick={() => setBuilderOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium"
        >
          <Plus size={16} /> New Workflow
        </button>
      </div>

      {/* Active Workflows */}
      <div className="space-y-3">
        {workflows.map((wf) => (
          <div key={wf.id} className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5 hover:border-[#4597b0]/20 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${wf.enabled ? "bg-[#4597b0]/20" : "bg-white/5"}`}>
                  <GitBranch size={20} className={wf.enabled ? "text-[#4597b0]" : "text-white/20"} />
                </div>
                <div>
                  <h3 className="text-white/90 font-medium">{wf.name}</h3>
                  <p className="text-white/40 text-sm mt-0.5">{wf.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-white/50 text-xs">
                        <Zap size={10} /> {wf.trigger}
                      </div>
                      <ArrowRight size={12} className="text-white/20" />
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-white/50 text-xs">
                        <Bell size={10} /> {wf.action}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {wf.lastRun && (
                  <span className="text-white/20 text-xs">
                    Last: {new Date(wf.lastRun).toLocaleDateString()}
                  </span>
                )}
                <span className="text-white/30 text-xs">{wf.runCount} runs</span>
                <button
                  onClick={() => toggleWorkflow(wf.id)}
                  className={`relative w-10 h-5 rounded-full transition-all ${wf.enabled ? "bg-[#4597b0]" : "bg-white/10"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${wf.enabled ? "left-5.5 left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Templates */}
      <div>
        <h2 className="text-white/60 text-sm font-semibold mb-3">Workflow Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.name}
              onClick={() => { setSelectedTemplate(t.name); setBuilderOpen(true); }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#223e49]/40 border border-white/5 hover:border-[#4597b0]/20 hover:bg-[#223e49]/60 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-[#4597b0]/10 flex items-center justify-center shrink-0">
                <t.icon size={18} className="text-[#4597b0]" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">{t.name}</p>
                <p className="text-white/30 text-xs mt-0.5">
                  {t.trigger} → {t.action}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Execution Log */}
      <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
        <h3 className="text-white/80 text-sm font-semibold mb-4">Execution Log</h3>
        <div className="space-y-2">
          {[
            { workflow: "Staleness Alert", time: "2026-03-13 06:00", result: "success", details: "Notified 2 source owners" },
            { workflow: "Gap-to-Task Flow", time: "2026-03-12 06:00", result: "success", details: "Created 1 backlog task" },
            { workflow: "Staleness Alert", time: "2026-03-12 06:00", result: "success", details: "Notified 2 source owners" },
            { workflow: "Gap-to-Task Flow", time: "2026-03-10 06:00", result: "success", details: "No new gaps detected" },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
              <CheckCircle size={14} className="text-emerald-400 shrink-0" />
              <span className="text-white/60 text-sm flex-1">{log.workflow}</span>
              <span className="text-white/30 text-xs">{log.details}</span>
              <span className="text-white/20 text-xs">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Builder Modal */}
      {builderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-6 max-w-xl w-full mx-4 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold font-serif text-lg">
                {selectedTemplate ? `Create: ${selectedTemplate}` : "New Workflow"}
              </h2>
              <button onClick={() => { setBuilderOpen(false); setSelectedTemplate(null); }} className="text-white/40 hover:text-white/80">
                <X size={20} />
              </button>
            </div>

            {/* Visual Flow Builder */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-white/40 text-xs uppercase tracking-wider">Trigger</label>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#4597b0]/10 border border-[#4597b0]/20">
                  <Zap size={16} className="text-[#4597b0]" />
                  <span className="text-white/80 text-sm">
                    {selectedTemplate === "Staleness Alert Flow" ? "Source staleness > 60 days" :
                     selectedTemplate === "Gap-to-Task Flow" ? "Question asked 5+ times" :
                     selectedTemplate === "Weekly Health Digest" ? "Every Monday 9:00 AM" :
                     selectedTemplate === "New Source Quality Check" ? "New source uploaded" :
                     "Select trigger..."}
                  </span>
                </div>
              </div>

              <div className="flex justify-center"><ArrowRight size={16} className="text-white/20 rotate-90" /></div>

              <div className="space-y-2">
                <label className="text-white/40 text-xs uppercase tracking-wider">Condition (Optional)</label>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                  <Settings size={16} className="text-white/30" />
                  <span className="text-white/40 text-sm">Add condition...</span>
                </div>
              </div>

              <div className="flex justify-center"><ArrowRight size={16} className="text-white/20 rotate-90" /></div>

              <div className="space-y-2">
                <label className="text-white/40 text-xs uppercase tracking-wider">Action</label>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                  <Bell size={16} className="text-emerald-400" />
                  <span className="text-white/80 text-sm">
                    {selectedTemplate === "Staleness Alert Flow" ? "Send email notification to owner" :
                     selectedTemplate === "Gap-to-Task Flow" ? "Create knowledge backlog task" :
                     selectedTemplate === "Weekly Health Digest" ? "Email health report to admins" :
                     selectedTemplate === "New Source Quality Check" ? "Run quality check & flag issues" :
                     "Select action..."}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => { setBuilderOpen(false); setSelectedTemplate(null); }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium"
            >
              Create Workflow
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
