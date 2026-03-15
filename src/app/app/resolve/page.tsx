"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import {
  Send, Zap, Layers, ThumbsUp, ThumbsDown, Copy, ExternalLink,
  MessageSquare, Plus, ChevronRight, Sparkles, PanelRightOpen, PanelRightClose,
} from "lucide-react";

const SUGGESTED = [
  "How do I configure SSO for Enterprise?",
  "What is our remote work policy?",
  "How do I authenticate API requests?",
  "What's the deployment process?",
  "How do I set up my development environment?",
];

const MOCK_RESPONSES: Record<string, { answer: string; sources: { title: string; excerpt: string; score: number }[]; confidence: "high" | "medium" | "low" }> = {
  default: {
    answer: "Based on your knowledge base, here's what I found:\n\nThis query relates to multiple sources in your corpus. The **Product Documentation v3.2** and **API Reference Guide** both contain relevant information.\n\nFor the most accurate and up-to-date answer, I'd recommend checking the specific source documents listed in the citations panel.\n\n**Key takeaways:**\n- Your knowledge base covers this topic across 2-3 sources\n- Some sources may be slightly outdated — check the staleness indicators\n- For deeper analysis, try **Deep Resolution** mode",
    sources: [
      { title: "Product Documentation v3.2", excerpt: "Comprehensive guide covering configuration and setup procedures...", score: 0.82 },
      { title: "API Reference Guide", excerpt: "Technical documentation for API endpoints and authentication...", score: 0.71 },
    ],
    confidence: "medium",
  },
};

export default function ResolvePage() {
  const {
    conversations, activeConversationId, setActiveConversation,
    addConversation, addResolution, setResolutionFeedback, activeResolutionMode, setResolutionMode,
  } = useAppStore();

  const [input, setInput] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [rightPanel, setRightPanel] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.resolutions.length, streamText]);

  const handleResolve = (text?: string) => {
    const query = text || input;
    if (!query.trim() || isResolving) return;

    setInput("");
    setIsResolving(true);

    let convId = activeConversationId;
    if (!convId) {
      convId = `conv-${Date.now()}`;
      addConversation({
        id: convId,
        title: query.slice(0, 50),
        resolutions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    const response = MOCK_RESPONSES.default;
    const fullText = response.answer;

    // Simulate streaming
    let idx = 0;
    setStreamText("");
    const interval = setInterval(() => {
      idx += 3;
      if (idx >= fullText.length) {
        clearInterval(interval);
        setStreamText("");
        setIsResolving(false);

        addResolution(convId!, {
          id: `res-${Date.now()}`,
          query,
          answer: fullText,
          sources: response.sources.map((s, i) => ({
            sourceId: `src-${i + 1}`,
            sourceTitle: s.title,
            chunkId: `ch-${i + 1}-1`,
            relevanceScore: s.score,
            excerpt: s.excerpt,
          })),
          confidence: response.confidence,
          mode: activeResolutionMode,
          timestamp: new Date().toISOString(),
          sessionId: convId!,
        });
      } else {
        setStreamText(fullText.slice(0, idx));
      }
    }, 15);
  };

  const latestSources = activeConv?.resolutions[activeConv.resolutions.length - 1]?.sources;

  return (
    <div className="flex h-[calc(100vh-5rem)] -m-6">
      {/* Left: Conversation History */}
      <div className="w-64 border-r border-white/5 flex flex-col shrink-0 bg-[#0c2329]/50">
        <div className="p-3 border-b border-white/5">
          <button
            onClick={() => setActiveConversation(null)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#4597b0]/10 border border-[#4597b0]/20 text-[#4597b0] text-sm font-medium hover:bg-[#4597b0]/20 transition-all"
          >
            <Plus size={16} />
            New Conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConversation(conv.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeConversationId === conv.id
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              <p className="truncate font-medium">{conv.title}</p>
              <p className="text-[10px] text-white/30 mt-0.5">
                {conv.resolutions.length} resolution{conv.resolutions.length !== 1 ? "s" : ""}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Center: Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mode Toggle */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setResolutionMode("quick")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeResolutionMode === "quick" ? "bg-[#4597b0] text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              <Zap size={12} /> Quick Answer
            </button>
            <button
              onClick={() => setResolutionMode("deep")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeResolutionMode === "deep" ? "bg-[#4597b0] text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              <Layers size={12} /> Deep Resolution
            </button>
          </div>
          <button onClick={() => setRightPanel(!rightPanel)} className="text-white/40 hover:text-white/60 transition-colors">
            {rightPanel ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!activeConv && !isResolving ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4597b0] to-[#62acbb] flex items-center justify-center">
                <Sparkles size={28} className="text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold font-serif" style={{ color: "var(--text-primary)" }}>Ask your knowledge base</h2>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                  Get synthesized answers from all your sources with citations
                </p>
              </div>
              <div className="w-full space-y-2">
                <p className="text-white/30 text-xs uppercase tracking-wider">Try asking...</p>
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleResolve(q)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-[#4597b0]/10 hover:border-[#4597b0]/30 hover:text-white/80 transition-all"
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {activeConv?.resolutions.map((res) => (
                <div key={res.id} className="space-y-4">
                  {/* User Query */}
                  <div className="flex justify-end">
                    <div className="bg-[#4597b0] text-white rounded-2xl rounded-br-md px-4 py-3 max-w-[80%] text-sm">
                      {res.query}
                    </div>
                  </div>
                  {/* Resolution */}
                  <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`text-xs px-2 py-0.5 rounded-full ${
                        res.confidence === "high" ? "bg-emerald-400/10 text-emerald-400" :
                        res.confidence === "medium" ? "bg-amber-400/10 text-amber-400" :
                        "bg-red-400/10 text-red-400"
                      }`}>
                        {res.confidence} confidence
                      </div>
                      <span className="text-white/20 text-xs">&middot;</span>
                      <span className="text-white/30 text-xs">{res.mode === "deep" ? "Deep Resolution" : "Quick Answer"}</span>
                    </div>
                    <div className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">
                      {res.answer}
                    </div>
                    {/* Source pills */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      {res.sources.map((s, i) => (
                        <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4597b0]/10 text-[#4597b0] text-xs">
                          <ExternalLink size={10} />
                          {s.sourceTitle}
                          <span className="text-white/30">{Math.round(s.relevanceScore * 100)}%</span>
                        </span>
                      ))}
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setResolutionFeedback(res.id, "up")}
                        className={`p-1.5 rounded-lg transition-all ${res.feedback === "up" ? "bg-emerald-400/20 text-emerald-400" : "text-white/20 hover:text-white/50 hover:bg-white/5"}`}
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        onClick={() => setResolutionFeedback(res.id, "down")}
                        className={`p-1.5 rounded-lg transition-all ${res.feedback === "down" ? "bg-red-400/20 text-red-400" : "text-white/20 hover:text-white/50 hover:bg-white/5"}`}
                      >
                        <ThumbsDown size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-white/20 hover:text-white/50 hover:bg-white/5 transition-all">
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Streaming */}
              {isResolving && streamText && (
                <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
                  <div className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">{streamText}<span className="animate-pulse">▊</span></div>
                </div>
              )}
              {isResolving && !streamText && (
                <div className="bg-[#223e49]/60 border border-white/5 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <div className="w-4 h-4 rounded-full border-2 border-[#4597b0] border-t-transparent animate-spin" />
                    Resolving across {activeResolutionMode === "deep" ? "all sources" : "top sources"}...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/5 px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleResolve()}
              placeholder="Ask your knowledge base anything..."
              disabled={isResolving}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder:text-white/30 focus:border-[#4597b0]/50 disabled:opacity-50"
            />
            <button
              onClick={() => handleResolve()}
              disabled={!input.trim() || isResolving}
              className="p-3 rounded-xl bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white hover:shadow-lg hover:shadow-[#4597b0]/20 disabled:opacity-30 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Citations Panel */}
      {rightPanel && (
        <div className="w-72 border-l border-white/5 flex flex-col shrink-0 bg-[#0c2329]/50">
          <div className="p-4 border-b border-white/5">
            <h3 className="text-white/80 text-sm font-semibold">Source Citations</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {latestSources ? latestSources.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#4597b0] text-xs font-medium">{s.sourceTitle}</span>
                  <span className="text-white/30 text-[10px]">{Math.round(s.relevanceScore * 100)}%</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{s.excerpt}</p>
              </div>
            )) : (
              <div className="text-center py-8">
                <MessageSquare size={24} className="mx-auto text-white/10 mb-2" />
                <p className="text-white/30 text-xs">Citations appear here after each resolution</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
