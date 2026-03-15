"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Send, Sparkles, Database, MessageSquare, HeartPulse,
  GitBranch, BarChart3, Plug, ArrowRight, Compass, Layout,
  Lightbulb, Zap, ChevronRight,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

interface WelcomeMessage {
  role: "assistant" | "user";
  content: string;
  actions?: { label: string; href: string; icon: React.ElementType; color: string }[];
}

const EXPLORE_PROMPTS = [
  { label: "Show me around the platform", icon: Compass },
  { label: "What can I do here?", icon: Lightbulb },
  { label: "I have a knowledge problem to solve", icon: Zap },
  { label: "How do I get started?", icon: ArrowRight },
];

function generateResponse(query: string, userName: string, sourcesCount: number, healthScore: number, openFeedback: number): WelcomeMessage {
  const q = query.toLowerCase();

  // Platform tour / exploration
  if (q.includes("show me around") || q.includes("tour") || q.includes("explore") || q.includes("what can")) {
    return {
      role: "assistant",
      content: `Great question! Here's a quick map of what you can do on aiCartograph:\n\n**Core Workflow:**\n1. **Sources** — Upload your knowledge (docs, URLs, CSVs)\n2. **Resolve** — Ask questions and get AI-synthesized answers with citations\n3. **Health** — Monitor your knowledge quality (staleness, contradictions, gaps)\n4. **Feedback** — Track unresolved questions and close the loop\n\n**Power Features:**\n- **Foundry** — Author new knowledge articles\n- **Workflows** — Automate alerts and tasks\n- **Analytics** — See ROI and resolution metrics\n- **Widget** — Embed resolution in your product\n\nWant me to walk you through any specific module?`,
      actions: [
        { label: "Upload Sources", href: "/app/sources", icon: Database, color: "#4597b0" },
        { label: "Try Resolve", href: "/app/resolve", icon: MessageSquare, color: "#62acbb" },
        { label: "Check Health", href: "/app/health", icon: HeartPulse, color: "#36c08e" },
        { label: "View Analytics", href: "/app/analytics", icon: BarChart3, color: "#f0b429" },
      ],
    };
  }

  // Getting started
  if (q.includes("get started") || q.includes("how do i") || q.includes("begin") || q.includes("first step")) {
    return {
      role: "assistant",
      content: `Here's the fastest path to value:\n\n**Step 1: Connect your knowledge** (2 min)\nUpload PDFs, paste URLs, or connect integrations. We'll chunk, embed, and index everything.\n\n**Step 2: Ask a question** (instant)\nGo to Resolve and ask anything — we'll synthesize answers from all your sources with citations.\n\n**Step 3: Review health** (1 min)\nCheck the Health dashboard to spot stale docs, contradictions, and coverage gaps.\n\n**Step 4: Close the loop**\nUse Feedback to track what questions your team can't answer yet, then create content in the Foundry.\n\nYou currently have **${sourcesCount} sources** with a health score of **${healthScore}/100**. ${sourcesCount === 0 ? "Let's start by uploading your first source!" : "Looking good! Try asking a question next."}`,
      actions: [
        { label: sourcesCount === 0 ? "Upload First Source" : "Manage Sources", href: "/app/sources", icon: Database, color: "#4597b0" },
        { label: "Ask a Question", href: "/app/resolve", icon: MessageSquare, color: "#62acbb" },
      ],
    };
  }

  // Knowledge problem
  if (q.includes("knowledge problem") || q.includes("problem") || q.includes("solve") || q.includes("issue") || q.includes("help me")) {
    return {
      role: "assistant",
      content: `I can help! Let me understand what you're facing. Common knowledge challenges we solve:\n\n**Scattered Knowledge** — Info lives in 20 different tools\n→ Use **Sources** to centralize, then **Resolve** to search across all of them\n\n**Stale Documentation** — Docs get outdated, nobody knows\n→ **Health** dashboard monitors staleness and alerts you automatically\n\n**Conflicting Information** — Two docs disagree, which is right?\n→ **Health > Contradictions** detects and highlights conflicts\n\n**Repeat Questions** — Same questions asked over and over\n→ **Feedback** tracks unresolved queries; **Workflows** automates responses\n\n**Onboarding Chaos** — New hires can't find what they need\n→ **Widget** lets you embed AI resolution right in your product\n\nTell me more about your specific challenge, or jump into a module to explore!`,
      actions: [
        { label: "Upload Sources", href: "/app/sources", icon: Database, color: "#4597b0" },
        { label: "Check Health", href: "/app/health", icon: HeartPulse, color: "#36c08e" },
        { label: "Setup Workflows", href: "/app/workflows", icon: GitBranch, color: "#9b8ce8" },
      ],
    };
  }

  // Sources related
  if (q.includes("source") || q.includes("upload") || q.includes("document") || q.includes("import")) {
    return {
      role: "assistant",
      content: `**Knowledge Sources** are the foundation of aiCartograph.\n\nYou can upload:\n- **PDFs** — Product docs, runbooks, policies\n- **URLs** — Crawl webpages and wikis\n- **Text/Markdown** — Raw content or structured docs\n- **CSV** — Structured data like FAQs\n\nWe automatically:\n1. **Chunk** content into semantic segments\n2. **Embed** each chunk for vector search\n3. **Index** and monitor for staleness\n\nYou have **${sourcesCount} sources** indexed. ${sourcesCount < 3 ? "Upload more to improve resolution quality!" : "Great corpus! Your resolution will be more accurate with diverse sources."}`,
      actions: [
        { label: "Go to Sources", href: "/app/sources", icon: Database, color: "#4597b0" },
        { label: "Connect Integrations", href: "/app/integrations", icon: Plug, color: "#e07c4f" },
      ],
    };
  }

  // Resolution / asking questions
  if (q.includes("resolve") || q.includes("question") || q.includes("ask") || q.includes("answer") || q.includes("search")) {
    return {
      role: "assistant",
      content: `**Resolve** is our core feature — it's not just search, it's knowledge synthesis.\n\n**How it works:**\n1. Ask any natural language question\n2. We retrieve relevant chunks from ALL your sources\n3. AI synthesizes a comprehensive answer with citations\n4. Each answer has a **confidence score** and **source references**\n\n**Two modes:**\n- **Quick Answer** — Fast, top-source response\n- **Deep Resolution** — Thorough cross-source analysis\n\n**Pro tips:**\n- Use thumbs up/down to train resolution quality\n- Check the citations panel to verify sources\n- Unresolved questions automatically flow to Feedback`,
      actions: [
        { label: "Try Resolve Now", href: "/app/resolve", icon: MessageSquare, color: "#62acbb" },
        { label: "View Analytics", href: "/app/analytics", icon: BarChart3, color: "#f0b429" },
      ],
    };
  }

  // Health
  if (q.includes("health") || q.includes("stale") || q.includes("contradict") || q.includes("quality") || q.includes("gap")) {
    return {
      role: "assistant",
      content: `**Health Dashboard** monitors the quality of your entire knowledge corpus.\n\nYour current score: **${healthScore}/100**\n\n**Four dimensions we track:**\n- **Staleness** — How recently sources were updated\n- **Contradictions** — Conflicting info across sources\n- **Gaps** — Topics users ask about with no coverage\n- **Quality** — Resolution success rate per source\n\n**Automated actions:**\nSet up workflows to auto-notify source owners when content goes stale, or create tasks when gaps are detected.\n\n${healthScore >= 80 ? "Your corpus is in great shape!" : healthScore >= 60 ? "Some areas need attention — check the action items." : "Several critical issues need fixing. Let's look at the action items."}`,
      actions: [
        { label: "View Health", href: "/app/health", icon: HeartPulse, color: "#36c08e" },
        { label: "Setup Alerts", href: "/app/workflows", icon: GitBranch, color: "#9b8ce8" },
      ],
    };
  }

  // Workflows / automation
  if (q.includes("workflow") || q.includes("automat") || q.includes("alert") || q.includes("trigger")) {
    return {
      role: "assistant",
      content: `**Workflows** let you automate knowledge operations.\n\nEach workflow has three parts:\n- **Trigger** — What starts it (staleness detected, question asked X times, etc.)\n- **Condition** — Optional filter to narrow scope\n- **Action** — What happens (email, create task, sync data)\n\n**Templates to get started:**\n- Staleness Alert Flow\n- Gap-to-Task Flow\n- Weekly Health Digest\n- New Source Quality Check\n\nCombine with integrations (Slack, Jira, etc.) for powerful automations.`,
      actions: [
        { label: "Build Workflows", href: "/app/workflows", icon: GitBranch, color: "#9b8ce8" },
        { label: "Connect Tools", href: "/app/integrations", icon: Plug, color: "#e07c4f" },
      ],
    };
  }

  // Analytics / metrics
  if (q.includes("analytic") || q.includes("metric") || q.includes("roi") || q.includes("report") || q.includes("data")) {
    return {
      role: "assistant",
      content: `**Analytics** shows the real impact of your knowledge platform.\n\n**Key metrics we track:**\n- Resolution volume and trends\n- Average resolution time\n- Topic distribution\n- User engagement patterns\n\n**ROI Calculator:**\nSee estimated hours saved and cost savings based on resolution count and average manual search time.\n\n**Reports** generates automated weekly/monthly summaries covering health, resolution, and impact.`,
      actions: [
        { label: "View Analytics", href: "/app/analytics", icon: BarChart3, color: "#f0b429" },
        { label: "Check Reports", href: "/app/reports", icon: Layout, color: "#56b3f5" },
      ],
    };
  }

  // Default / general
  return {
    role: "assistant",
    content: `I'm here to help you get the most out of aiCartograph!\n\nBased on your current setup (${sourcesCount} sources, health score ${healthScore}/100${openFeedback > 0 ? `, ${openFeedback} unresolved questions` : ""}), here are some suggested next steps:\n\n${sourcesCount < 3 ? "- **Upload more sources** to improve resolution quality\n" : ""}${healthScore < 70 ? "- **Review health issues** — your score could be improved\n" : ""}${openFeedback > 0 ? `- **Address ${openFeedback} open feedback items** to close knowledge gaps\n` : ""}- **Try Resolve** to ask a question and see AI synthesis in action\n- **Explore workflows** to automate repetitive knowledge tasks\n\nFeel free to ask about any feature, describe a problem you're trying to solve, or just explore!`,
    actions: [
      { label: "Try Resolve", href: "/app/resolve", icon: MessageSquare, color: "#62acbb" },
      { label: "Upload Sources", href: "/app/sources", icon: Database, color: "#4597b0" },
      { label: "View Health", href: "/app/health", icon: HeartPulse, color: "#36c08e" },
    ],
  };
}

export default function WelcomePrompt() {
  const router = useRouter();
  const { user, sources, healthIssues, feedbackItems, setWelcomePromptDismissed } = useAppStore();
  const [messages, setMessages] = useState<WelcomeMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [streamActions, setStreamActions] = useState<WelcomeMessage["actions"]>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const healthScore = Math.round(sources.reduce((a, s) => a + s.healthScore, 0) / (sources.length || 1));
  const openFeedback = feedbackItems.filter((f) => f.status === "unresolved").length;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streamText]);

  const handleSend = (text?: string) => {
    const q = text || input;
    if (!q.trim() || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setInput("");
    setIsTyping(true);

    const response = generateResponse(q, user.name, sources.length, healthScore, openFeedback);
    const fullText = response.content;

    // Simulate streaming
    let idx = 0;
    setStreamText("");
    setStreamActions(undefined);
    const interval = setInterval(() => {
      idx += 4;
      if (idx >= fullText.length) {
        clearInterval(interval);
        setStreamText("");
        setStreamActions(undefined);
        setIsTyping(false);
        setMessages((prev) => [...prev, response]);
      } else {
        setStreamText(fullText.slice(0, idx));
        if (idx > fullText.length * 0.8) {
          setStreamActions(response.actions);
        }
      }
    }, 12);
  };

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="text-center pt-8 pb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4597b0] via-[#56b3f5] to-[#36c08e] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#4597b0]/20 animate-gradient-flow">
          <Sparkles size={26} className="text-white" />
        </div>
        <h1 className="text-xl font-bold font-serif" style={{ color: "var(--text-primary)" }}>
          Welcome back, {user.name}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
          How can I help you navigate aiCartograph today?
        </p>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 space-y-4 min-h-0">
        {messages.length === 0 && !isTyping && (
          <div className="space-y-3 pt-2">
            <p className="text-xs uppercase tracking-wider font-medium" style={{ color: "var(--text-muted)" }}>
              Try asking...
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXPLORE_PROMPTS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleSend(p.label)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all group"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-primary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-hover)";
                    e.currentTarget.style.background = "var(--bg-card-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-primary)";
                    e.currentTarget.style.background = "var(--bg-card)";
                  }}
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4597b0]/20 to-[#62acbb]/10 flex items-center justify-center shrink-0">
                    <p.icon size={16} className="text-[#4597b0]" />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    {p.label}
                  </span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#4597b0]" />
                </button>
              ))}
            </div>

            {/* Quick status cards */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="rounded-xl p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                <p className="text-2xl font-bold text-[#4597b0]">{sources.length}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Sources</p>
              </div>
              <div className="rounded-xl p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                <p className="text-2xl font-bold" style={{ color: healthScore >= 70 ? "#36c08e" : "#f0b429" }}>{healthScore}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Health Score</p>
              </div>
              <div className="rounded-xl p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                <p className="text-2xl font-bold" style={{ color: openFeedback > 0 ? "#f0b429" : "#36c08e" }}>{openFeedback}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Open Feedback</p>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[90%] ${m.role === "user" ? "" : "w-full"}`}>
              {m.role === "user" ? (
                <div className="bg-gradient-to-r from-[#4597b0] to-[#56b3f5] text-white rounded-2xl rounded-br-md px-4 py-3 text-sm shadow-md">
                  {m.content}
                </div>
              ) : (
                <div className="rounded-xl p-5 space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {m.content.split(/(\*\*.*?\*\*)/).map((part, j) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={j} style={{ color: "var(--text-primary)" }}>
                          {part.slice(2, -2)}
                        </strong>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </div>
                  {m.actions && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: "var(--border-primary)" }}>
                      {m.actions.map((a) => (
                        <button
                          key={a.label}
                          onClick={() => { setWelcomePromptDismissed(true); router.push(a.href); }}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white transition-all hover:shadow-lg hover:scale-[1.02]"
                          style={{ backgroundColor: a.color }}
                        >
                          <a.icon size={14} />
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Streaming */}
        {isTyping && streamText && (
          <div className="rounded-xl p-5 space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            <div className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {streamText.split(/(\*\*.*?\*\*)/).map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={j} style={{ color: "var(--text-primary)" }}>
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
              <span className="typing-cursor" />
            </div>
            {streamActions && (
              <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: "var(--border-primary)" }}>
                {streamActions.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => { setWelcomePromptDismissed(true); router.push(a.href); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white transition-all hover:shadow-lg hover:scale-[1.02]"
                    style={{ backgroundColor: a.color }}
                  >
                    <a.icon size={14} />
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {isTyping && !streamText && (
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <div className="w-4 h-4 rounded-full border-2 border-[#4597b0] border-t-transparent animate-spin" />
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="pt-4 pb-2">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about the platform, or describe a problem..."
            disabled={isTyping}
            className="flex-1 rounded-xl px-4 py-3.5 text-sm outline-none transition-all disabled:opacity-50"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent-primary)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-primary)"; }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-3.5 rounded-xl text-white disabled:opacity-30 transition-all hover:shadow-lg hover:shadow-[#4597b0]/20"
            style={{ background: "linear-gradient(135deg, #4597b0, #56b3f5)" }}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            Powered by aiCartograph Compass Agent
          </p>
          <button
            onClick={() => setWelcomePromptDismissed(true)}
            className="text-xs font-medium hover:underline"
            style={{ color: "var(--accent-primary)" }}
          >
            Skip to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
