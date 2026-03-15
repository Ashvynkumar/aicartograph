"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PAGE_CONTEXT: Record<string, string> = {
  "/app/dashboard": "You're on the Dashboard — the command center showing key metrics, recent activity, and agent status.",
  "/app/sources": "You're on the Sources page — where knowledge sources are uploaded, managed, and monitored.",
  "/app/resolve": "You're on the Resolve page — the chat interface for asking questions and getting AI-powered answers from your knowledge base.",
  "/app/foundry": "You're on the Foundry page — where you can create, edit, and publish knowledge documents.",
  "/app/health": "You're on the Health dashboard — showing the overall quality of your knowledge corpus, including staleness, contradictions, and gaps.",
  "/app/feedback": "You're on the Feedback page — tracking unresolved questions, user feedback, and creation priorities.",
  "/app/workflows": "You're on the Workflows page — where you build automated flows triggered by knowledge events.",
  "/app/analytics": "You're on the Analytics page — showing resolution metrics, source utilization, and engagement data.",
  "/app/integrations": "You're on the Integrations page — connecting aiCartograph with your existing tools.",
  "/app/widget": "You're on the Widget Preview page — design and customize your embeddable resolution widget.",
  "/app/reports": "You're on the Reports page — automated health, resolution, and impact reports.",
  "/app/audit": "You're on the Audit Trail page — compliance logging for every resolution and source change.",
  "/app/settings": "You're on the Settings page — configure your organization, API keys, and preferences.",
};

const SUGGESTIONS = [
  "What does the health score mean?",
  "How do I upload a source?",
  "What are contradictions?",
  "How does resolution work?",
];

export default function CompassAgent() {
  const pathname = usePathname();
  const { compassOpen, setCompassOpen, sources, healthIssues } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const generateResponse = (q: string): string => {
    const query = q.toLowerCase();
    const ctx = PAGE_CONTEXT[pathname] || "You're exploring the aiCartograph platform.";

    if (query.includes("health score")) {
      const avg = Math.round(sources.reduce((a, s) => a + s.healthScore, 0) / (sources.length || 1));
      return `${ctx}\n\nThe **Health Score** (currently **${avg}/100**) measures the overall quality of your knowledge corpus. It factors in:\n\n- **Staleness** — how up-to-date your sources are\n- **Contradictions** — conflicting information across sources\n- **Gaps** — topics users ask about that lack coverage\n- **Quality** — resolution success rate per source\n\nYou currently have **${healthIssues.filter(h => !h.resolved).length} open issues**. Check the Health dashboard for details.`;
    }
    if (query.includes("upload") || query.includes("source")) {
      return `${ctx}\n\nTo upload a knowledge source:\n\n1. Go to **Sources** (or click "Upload Source" in the top bar)\n2. Drag & drop files or click to browse\n3. Supported formats: PDF, URL, text, CSV, Markdown\n4. The **Connect Agent** will automatically chunk, embed, and index your content\n\nYou currently have **${sources.length} sources** indexed.`;
    }
    if (query.includes("contradict")) {
      return `${ctx}\n\n**Contradictions** are semantically conflicting statements found across different sources. The Detect Agent scans your entire knowledge corpus and flags when two sources disagree on the same topic.\n\nFor example: One source says "API rate limit is 10,000/min" while another says "50,000/min." Both can't be right.\n\nView contradictions in the **Health** dashboard to decide which is correct.`;
    }
    if (query.includes("resolution") || query.includes("resolve")) {
      return `${ctx}\n\n**Resolution** is our core feature. It's not just search — it's synthesis:\n\n1. You ask a natural language question\n2. The **Resolve Agent** retrieves relevant chunks from your knowledge base\n3. It synthesizes a comprehensive answer citing multiple sources\n4. Each answer includes **confidence scoring** and **source citations**\n\nTry **Quick Answer** for speed or **Deep Resolution** for thorough cross-source analysis.`;
    }
    if (query.includes("workflow")) {
      return `${ctx}\n\nWorkflows let you automate knowledge operations:\n\n- **Trigger**: What starts the flow (staleness detected, question asked X times, etc.)\n- **Condition**: Filters to narrow scope\n- **Action**: What happens (send notification, create task, etc.)\n\nUse pre-built templates like "Staleness Alert" or build custom flows.`;
    }
    return `${ctx}\n\nI'm **Compass**, your in-app guide. I can help you understand any feature, interpret metrics, or guide you through workflows. Try asking about:\n\n- Health scores and what they mean\n- How to upload and manage sources\n- How resolution works\n- Setting up workflows\n- Understanding contradictions and gaps`;
  };

  const handleSend = (text?: string) => {
    const q = text || input;
    if (!q.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: generateResponse(q) }]);
      setIsTyping(false);
    }, 800);
  };

  if (!compassOpen) {
    return (
      <button
        onClick={() => setCompassOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#4597b0] to-[#62acbb] text-white shadow-lg shadow-[#4597b0]/20 hover:shadow-[#4597b0]/40 hover:scale-105 transition-all flex items-center justify-center"
        title="Ask Compass"
      >
        <Sparkles size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-[#0c2329] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#080604]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4597b0] to-[#62acbb] flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <p className="text-white/90 text-sm font-medium">Compass</p>
            <p className="text-white/40 text-[10px]">In-app AI Guide</p>
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
            <p className="text-white/60 text-sm">Hi! I&apos;m Compass. Ask me anything about aiCartograph.</p>
            <div className="space-y-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 hover:text-white/80 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-[#4597b0] text-white"
                  : "bg-white/5 text-white/80 border border-white/10"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#4597b0] animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-[#4597b0] animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-[#4597b0] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Compass anything..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#4597b0]/50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2 rounded-lg bg-[#4597b0] text-white hover:bg-[#62acbb] disabled:opacity-30 transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
