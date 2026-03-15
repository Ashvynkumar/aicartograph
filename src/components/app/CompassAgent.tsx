"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare, X, Send, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface Message {
  role: "user" | "assistant";
  content: string;
  links?: { label: string; href: string }[];
}

const PAGE_CONTEXT: Record<string, { desc: string; tips: string[]; nextSteps: { label: string; href: string }[] }> = {
  "/app/dashboard": {
    desc: "You're on the **Dashboard** — your command center showing key metrics, activity, and agent status.",
    tips: [
      "Click any metric card to dive into that module",
      "Use Quick Actions for common tasks",
      "The agent status shows which AI agents are actively working",
    ],
    nextSteps: [
      { label: "Upload a Source", href: "/app/sources" },
      { label: "Ask a Question", href: "/app/resolve" },
      { label: "Check Health", href: "/app/health" },
    ],
  },
  "/app/sources": {
    desc: "You're on **Sources** — where you upload and manage your knowledge corpus.",
    tips: [
      "Upload PDFs, URLs, text, CSV, or Markdown files",
      "Click any source card to see its chunks and metadata",
      "Watch health scores — low scores mean content needs updating",
      "Use the grid/list toggle for different views",
    ],
    nextSteps: [
      { label: "Ask a Question", href: "/app/resolve" },
      { label: "Check Source Health", href: "/app/health" },
      { label: "Connect Integrations", href: "/app/integrations" },
    ],
  },
  "/app/resolve": {
    desc: "You're on **Resolve** — the AI-powered chat that synthesizes answers from your knowledge base.",
    tips: [
      "Use **Quick Answer** for speed or **Deep Resolution** for thorough analysis",
      "Check the citations panel (right side) to verify source accuracy",
      "Use thumbs up/down to improve resolution quality over time",
      "Unresolved questions automatically flow to the Feedback module",
    ],
    nextSteps: [
      { label: "Upload More Sources", href: "/app/sources" },
      { label: "View Resolution Analytics", href: "/app/analytics" },
      { label: "Check Feedback", href: "/app/feedback" },
    ],
  },
  "/app/foundry": {
    desc: "You're on the **Foundry** — create and edit knowledge documents to fill gaps.",
    tips: [
      "Use templates for common document types (FAQ, runbook, policy)",
      "Published docs automatically become searchable sources",
      "Draft → Review → Published is the recommended workflow",
    ],
    nextSteps: [
      { label: "Check Gaps", href: "/app/health" },
      { label: "View Feedback", href: "/app/feedback" },
      { label: "Manage Sources", href: "/app/sources" },
    ],
  },
  "/app/health": {
    desc: "You're on the **Health Dashboard** — monitoring the quality of your entire knowledge corpus.",
    tips: [
      "The score ring shows overall corpus quality (aim for 80+)",
      "Check **Staleness** to find outdated content",
      "Review **Contradictions** to fix conflicting information",
      "**Gap Analysis** shows what topics need coverage",
      "Follow **Action Items** for the fastest score improvement",
    ],
    nextSteps: [
      { label: "Fix Stale Sources", href: "/app/sources" },
      { label: "Create Missing Docs", href: "/app/foundry" },
      { label: "Setup Auto-Alerts", href: "/app/workflows" },
    ],
  },
  "/app/feedback": {
    desc: "You're on **Feedback** — tracking unresolved questions and closing the knowledge loop.",
    tips: [
      "High-frequency unresolved questions indicate critical gaps",
      "Assign items to team members for accountability",
      "Resolved items improve your health score automatically",
    ],
    nextSteps: [
      { label: "Create Content", href: "/app/foundry" },
      { label: "Check Health", href: "/app/health" },
      { label: "Automate with Workflows", href: "/app/workflows" },
    ],
  },
  "/app/workflows": {
    desc: "You're on **Workflows** — automate knowledge operations with trigger-condition-action flows.",
    tips: [
      "Start with templates like 'Staleness Alert' for quick wins",
      "Combine with integrations (Slack, Jira) for powerful automation",
      "Toggle workflows on/off without deleting them",
      "Check the execution log to verify workflows are running",
    ],
    nextSteps: [
      { label: "Connect Integrations", href: "/app/integrations" },
      { label: "View Reports", href: "/app/reports" },
      { label: "Check Analytics", href: "/app/analytics" },
    ],
  },
  "/app/analytics": {
    desc: "You're on **Analytics** — resolution metrics, engagement data, and ROI analysis.",
    tips: [
      "The ROI calculator shows estimated time and cost savings",
      "Topic distribution reveals what your team asks about most",
      "Track daily resolution volume to measure adoption",
    ],
    nextSteps: [
      { label: "Generate Reports", href: "/app/reports" },
      { label: "Ask Questions", href: "/app/resolve" },
      { label: "View Dashboard", href: "/app/dashboard" },
    ],
  },
  "/app/integrations": {
    desc: "You're on **Integrations** — connect aiCartograph with your existing tools.",
    tips: [
      "Connected tools can auto-sync data as knowledge sources",
      "Set up bi-directional sync for real-time updates",
      "Each integration has specific capabilities listed",
    ],
    nextSteps: [
      { label: "Upload Sources", href: "/app/sources" },
      { label: "Setup Workflows", href: "/app/workflows" },
      { label: "View Dashboard", href: "/app/dashboard" },
    ],
  },
  "/app/widget": {
    desc: "You're on the **Widget Preview** — design and customize your embeddable resolution widget.",
    tips: [
      "Preview how the widget looks in your product",
      "Customize colors, position, and greeting messages",
      "The widget uses the same resolution engine as the Resolve page",
    ],
    nextSteps: [
      { label: "Try Resolve", href: "/app/resolve" },
      { label: "Check Analytics", href: "/app/analytics" },
      { label: "Manage Settings", href: "/app/settings" },
    ],
  },
  "/app/reports": {
    desc: "You're on **Reports** — automated health, resolution, and impact reports.",
    tips: [
      "Schedule weekly or monthly reports for your team",
      "Export reports as PDF for stakeholder presentations",
      "Reports auto-generate based on your analytics data",
    ],
    nextSteps: [
      { label: "View Analytics", href: "/app/analytics" },
      { label: "Check Health", href: "/app/health" },
      { label: "View Dashboard", href: "/app/dashboard" },
    ],
  },
  "/app/audit": {
    desc: "You're on the **Audit Trail** — compliance logging for every action.",
    tips: [
      "Every resolution, source change, and workflow execution is logged",
      "Filter by date, user, or action type",
      "Export logs for compliance requirements",
    ],
    nextSteps: [
      { label: "View Settings", href: "/app/settings" },
      { label: "View Reports", href: "/app/reports" },
      { label: "View Dashboard", href: "/app/dashboard" },
    ],
  },
  "/app/settings": {
    desc: "You're on **Settings** — configure your workspace, API keys, and preferences.",
    tips: [
      "Set up your Anthropic API key for live resolution",
      "Configure alert thresholds for health monitoring",
      "Invite team members and manage roles",
      "Toggle between light and dark themes in Appearance",
    ],
    nextSteps: [
      { label: "View Dashboard", href: "/app/dashboard" },
      { label: "Manage Sources", href: "/app/sources" },
      { label: "Connect Integrations", href: "/app/integrations" },
    ],
  },
};

const SUGGESTIONS = [
  "What can I do on this page?",
  "How does this connect to other modules?",
  "Show me the recommended workflow",
  "What should I do next?",
];

export default function CompassAgent() {
  const pathname = usePathname();
  const router = useRouter();
  const { compassOpen, setCompassOpen, sources, healthIssues } = useAppStore();

  // Hide on dashboard — the WelcomePrompt already acts as the agent there
  const isDashboard = pathname === "/app/dashboard" || pathname === "/app";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Reset messages when page changes
  useEffect(() => {
    setMessages([]);
  }, [pathname]);

  // Must be after all hooks
  if (isDashboard) return null;

  const getPageContext = () => {
    return PAGE_CONTEXT[pathname] || {
      desc: "You're exploring the aiCartograph platform.",
      tips: ["Use the sidebar to navigate between modules", "Try the command palette (⌘K) for quick navigation"],
      nextSteps: [{ label: "Dashboard", href: "/app/dashboard" }],
    };
  };

  const generateResponse = (q: string): Message => {
    const query = q.toLowerCase();
    const ctx = getPageContext();

    if (query.includes("what can i do") || query.includes("this page") || query.includes("where am i")) {
      return {
        role: "assistant",
        content: `${ctx.desc}\n\n**Tips:**\n${ctx.tips.map((t) => `- ${t}`).join("\n")}`,
        links: ctx.nextSteps,
      };
    }

    if (query.includes("connect") || query.includes("other module") || query.includes("handshake") || query.includes("relate")) {
      const nextLabels = ctx.nextSteps.map((s) => `**${s.label}**`).join(", ");
      return {
        role: "assistant",
        content: `From this page, here's how modules connect:\n\n${ctx.desc}\n\n**Natural next steps:** ${nextLabels}\n\nThe platform follows a core loop: **Connect → Resolve → Detect → Close Loop**. Each module feeds into the next for continuous knowledge improvement.`,
        links: ctx.nextSteps,
      };
    }

    if (query.includes("workflow") || query.includes("recommended") || query.includes("best practice")) {
      return {
        role: "assistant",
        content: `**Recommended workflow for getting value:**\n\n1. **Upload sources** — Connect your docs, URLs, and knowledge bases\n2. **Ask questions** in Resolve — See how well your knowledge answers them\n3. **Review Health** — Identify stale, contradictory, or missing content\n4. **Close gaps** — Use Foundry to create missing docs, address feedback\n5. **Automate** — Set up Workflows for alerts and task creation\n6. **Measure** — Use Analytics to track ROI and adoption\n\nThis creates a continuous improvement loop!`,
        links: [
          { label: "Start with Sources", href: "/app/sources" },
          { label: "Try Resolve", href: "/app/resolve" },
        ],
      };
    }

    if (query.includes("next") || query.includes("should i")) {
      const healthScore = Math.round(sources.reduce((a, s) => a + s.healthScore, 0) / (sources.length || 1));
      const openIssues = healthIssues.filter((h) => !h.resolved).length;
      let recommendation = "";

      if (sources.length === 0) {
        recommendation = "You haven't uploaded any sources yet. **Start by uploading your first knowledge source** to unlock the platform's full potential.";
      } else if (healthScore < 60) {
        recommendation = `Your health score is **${healthScore}/100** — let's fix that. Head to **Health** to see which sources need updating, then fix contradictions and gaps.`;
      } else if (openIssues > 3) {
        recommendation = `You have **${openIssues} open health issues**. Addressing these will improve your resolution accuracy. Check the Health dashboard for prioritized action items.`;
      } else {
        recommendation = "Your knowledge base looks solid! Try asking questions in **Resolve** to test coverage, or explore **Analytics** to see your impact metrics.";
      }

      return {
        role: "assistant",
        content: recommendation,
        links: ctx.nextSteps,
      };
    }

    if (query.includes("health score")) {
      const avg = Math.round(sources.reduce((a, s) => a + s.healthScore, 0) / (sources.length || 1));
      return {
        role: "assistant",
        content: `${ctx.desc}\n\nThe **Health Score** (currently **${avg}/100**) measures overall corpus quality:\n\n- **Staleness** — how up-to-date sources are\n- **Contradictions** — conflicting information\n- **Gaps** — missing topic coverage\n- **Quality** — resolution success rate\n\nYou have **${healthIssues.filter((h) => !h.resolved).length} open issues**. ${avg >= 80 ? "Great job!" : "Check the action items for quick wins."}`,
        links: [{ label: "View Health", href: "/app/health" }],
      };
    }

    if (query.includes("upload") || query.includes("source") || query.includes("add")) {
      return {
        role: "assistant",
        content: `To upload a knowledge source:\n\n1. Go to **Sources** (or click "Upload Source" in the top bar)\n2. Drag & drop files or click to browse\n3. Supported: PDF, URL, text, CSV, Markdown\n4. We auto-chunk, embed, and index everything\n\nYou currently have **${sources.length} sources** indexed. ${sources.length < 3 ? "More sources = better resolution quality!" : ""}`,
        links: [
          { label: "Go to Sources", href: "/app/sources" },
          { label: "Connect Integrations", href: "/app/integrations" },
        ],
      };
    }

    // Default
    return {
      role: "assistant",
      content: `${ctx.desc}\n\nI'm **Compass**, your in-app guide. I can help you:\n- Understand what each page does\n- Navigate between modules\n- Follow recommended workflows\n- Learn best practices\n\nTry asking "What should I do next?" for personalized recommendations.`,
      links: ctx.nextSteps,
    };
  };

  const handleSend = (text?: string) => {
    const q = text || input;
    if (!q.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, generateResponse(q)]);
      setIsTyping(false);
    }, 600);
  };

  if (!compassOpen) {
    return (
      <button
        onClick={() => setCompassOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center animate-gradient-flow"
        style={{ background: "linear-gradient(135deg, #4597b0, #56b3f5, #36c08e)" }}
        title="Ask Compass"
      >
        <Sparkles size={20} />
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-96 h-[520px] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      style={{ background: "var(--bg-primary)", border: "1px solid var(--border-primary)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "var(--sidebar-bg)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center animate-gradient-flow" style={{ background: "linear-gradient(135deg, #4597b0, #56b3f5, #36c08e)" }}>
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <p className="text-white/90 text-sm font-medium">Compass</p>
            <p className="text-white/40 text-[10px]">AI Platform Guide</p>
          </div>
        </div>
        <button onClick={() => setCompassOpen(false)} className="text-white/40 hover:text-white/80 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              Hi! I&apos;m Compass. I know what page you&apos;re on and can guide you through the platform.
            </p>
            <div className="space-y-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-all"
                  style={{
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-primary)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${m.role === "user" ? "" : "space-y-2"}`}>
              <div
                className="rounded-xl px-3 py-2 text-sm whitespace-pre-wrap"
                style={
                  m.role === "user"
                    ? { background: "linear-gradient(135deg, #4597b0, #56b3f5)", color: "white" }
                    : { background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-secondary)" }
                }
              >
                {m.content.split(/(\*\*.*?\*\*)/).map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} style={{ color: m.role === "user" ? "white" : "var(--text-primary)" }}>
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </div>
              {m.links && m.links.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-1">
                  {m.links.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => { router.push(link.href); setCompassOpen(false); }}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-[#4597b0] hover:bg-[#4597b0]/10 transition-all"
                    >
                      <ArrowRight size={10} />
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-xl px-4 py-3" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#4597b0] animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-[#56b3f5] animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-[#36c08e] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3" style={{ borderTop: "1px solid var(--border-primary)" }}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Compass anything..."
            className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2 rounded-lg text-white disabled:opacity-30 transition-all"
            style={{ background: "#4597b0" }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
