"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CompassIcon } from "../graphics/FancyIcons";

interface Message {
  role: "user" | "agent";
  content: string;
}

const VALUE_PROPS = [
  {
    keywords: ["knowledge", "find", "search", "discover"],
    answer: "aiCartograph goes beyond search — it resolves. Our cross-source contextual synthesis assembles precise answers from your wikis, help centers, shared drives, code repos, and CRM — tailored to each person's role and context. No more stitching answers from 5 different tools.",
  },
  {
    keywords: ["stale", "outdated", "old", "update", "contradiction", "wrong"],
    answer: "Our Knowledge Health Intelligence continuously monitors for staleness, semantic contradictions, coverage gaps, and knowledge drift. You get proactive alerts before your team hits dead ends — and we route update priorities directly to knowledge owners.",
  },
  {
    keywords: ["support", "ticket", "customer", "help"],
    answer: "Customer-facing teams waste hours searching fragmented knowledge. aiCartograph gives support reps instant, contextual answers synthesized across all sources — with confidence scoring and source attribution. Resolution time drops dramatically.",
  },
  {
    keywords: ["onboarding", "new hire", "ramp", "training"],
    answer: "New hires shouldn't need tribal knowledge to be productive. aiCartograph resolves questions in context — the same way a tenured teammate would — drawing from every source across your organization. Onboarding drag becomes onboarding flow.",
  },
  {
    keywords: ["integration", "connect", "source", "tool", "wiki", "confluence", "notion"],
    answer: "We connect to your entire knowledge stack — wikis, help centers, shared drives, project tools, communication platforms, code repositories, CRM systems, and more. No migration required. Your knowledge stays where it is. We just make it resolve.",
  },
  {
    keywords: ["price", "cost", "pricing", "plan", "free"],
    answer: "We offer a Free tier (50 sources, 100 queries/mo), Starter at $200/mo + $10/user, Professional at $500/mo + $20/user with full health intelligence, and Enterprise with custom pricing including embedded delivery and API access. Start free, scale with value.",
  },
  {
    keywords: ["different", "competitor", "compare", "glean", "guru", "alternative"],
    answer: "Three approaches exist today: enterprise search (finds but doesn't resolve), knowledge bases (stores but can't synthesize), and support chatbots (deflect FAQs but break on complexity). aiCartograph creates a new category — Knowledge Resolution — with a feedback-to-creation loop that makes your knowledge improve every day.",
  },
  {
    keywords: ["feedback", "loop", "improve", "signal"],
    answer: "Every unresolved question becomes a consumption signal. aiCartograph routes feedback to the right knowledge owners with priority scores — turning resolution failures into creation priorities. Your knowledge corpus improves based on real resolution data, not guesswork.",
  },
  {
    keywords: ["security", "compliance", "permission", "access"],
    answer: "aiCartograph respects your existing access controls and permissions. We integrate without disrupting your security posture. Enterprise plans include SSO/SAML, dedicated success managers, and SLA guarantees.",
  },
  {
    keywords: ["api", "embed", "widget", "product"],
    answer: "Our Embedded Knowledge Delivery pushes the right knowledge at the right moment directly inside your SaaS product. Don't wait for users to search — aiCartograph's intelligent widget delivers relevant knowledge proactively, right where and when people need it.",
  },
];

const SUGGESTED_QUESTIONS = [
  "What makes aiCartograph different?",
  "How does knowledge resolution work?",
  "What integrations do you support?",
  "How do you handle stale knowledge?",
];

function findAnswer(query: string): string {
  const lower = query.toLowerCase();
  for (const vp of VALUE_PROPS) {
    if (vp.keywords.some((kw) => lower.includes(kw))) {
      return vp.answer;
    }
  }
  return "Great question! aiCartograph is the Knowledge Resolution Platform — we don't just help you find knowledge, we resolve it. We connect to your entire knowledge stack, synthesize contextual answers, detect health issues proactively, and close the feedback loop to knowledge owners. Want to see it in action? Schedule a conversation with us!";
}

export default function QueryAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGated, setIsGated] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleGateSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    // Basic official email validation (no gmail/yahoo/hotmail)
    const freeProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "mail.com", "protonmail.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    if (freeProviders.includes(domain)) {
      return;
    }
    setIsGated(false);
    setMessages([{
      role: "agent",
      content: `Hi ${name.split(" ")[0]}! I'm Compass, aiCartograph's AI assistant. Ask me anything about how we can resolve your organization's knowledge challenges.`,
    }]);
  }

  function handleQuerySubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setQuery("");
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(userMsg);
      setMessages((prev) => [...prev, { role: "agent", content: answer }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  }

  function handleSuggestion(q: string) {
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(q);
      setMessages((prev) => [...prev, { role: "agent", content: answer }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  }

  const emailDomain = email.split("@")[1]?.toLowerCase() || "";
  const freeProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "mail.com", "protonmail.com"];
  const isFreeEmail = freeProviders.includes(emailDomain);

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/30 flex items-center justify-center hover:shadow-brand-400/40 transition-shadow cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.div
              key="compass"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <CompassIcon className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] agent-widget rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-brand-800/80 to-brand-900/80 border-b border-brand-500/20">
              <div className="flex items-center gap-3">
                <div className="animate-compass-pulse">
                  <CompassIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Compass</h3>
                  <p className="text-brand-300 text-xs">aiCartograph AI Assistant</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                  <span className="text-accent-emerald text-xs">Online</span>
                </div>
              </div>
            </div>

            {isGated ? (
              /* Gate form */
              <div className="p-5">
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  Tell us a bit about yourself and ask Compass anything about how aiCartograph can help your organization.
                </p>
                <form onSubmit={handleGateSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg agent-widget-input px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all"
                  />
                  <div>
                    <input
                      type="email"
                      placeholder="Official email (e.g. you@company.com)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg agent-widget-input px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all"
                    />
                    {isFreeEmail && email.includes("@") && (
                      <p className="text-accent-coral text-xs mt-1.5">Please use your official work email</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={!name.trim() || !email.trim() || isFreeEmail}
                    className="w-full rounded-lg bg-gradient-to-r from-brand-500 to-brand-400 text-white font-medium text-sm py-2.5 hover:from-brand-400 hover:to-brand-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Start Chatting
                  </button>
                </form>
              </div>
            ) : (
              /* Chat interface */
              <>
                <div className="h-72 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-brand-500/20 text-white/90 rounded-br-sm"
                            : "bg-white/[0.06] text-white/80 rounded-bl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />

                  {/* Suggested questions */}
                  {messages.length <= 1 && !isTyping && (
                    <div className="pt-2 space-y-2">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSuggestion(q)}
                          className="block w-full text-left text-xs text-brand-300/80 hover:text-brand-200 bg-brand-500/[0.06] hover:bg-brand-500/10 border border-brand-500/10 rounded-lg px-3 py-2 transition-all cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input */}
                <form onSubmit={handleQuerySubmit} className="p-3 border-t border-white/5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask about knowledge resolution..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 rounded-lg agent-widget-input px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!query.trim()}
                      className="rounded-lg bg-brand-500 hover:bg-brand-400 text-white px-3 py-2.5 transition-colors disabled:opacity-30 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
