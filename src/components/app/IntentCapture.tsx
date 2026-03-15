"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Upload, MessageSquare, HeartPulse, Bot, Send, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

const options = [
  {
    icon: Upload,
    title: "Upload & organize knowledge",
    description: "Connect your docs, URLs, and knowledge bases",
    route: "/app/sources",
  },
  {
    icon: MessageSquare,
    title: "Get answers from my docs",
    description: "Ask questions and get AI-powered resolutions",
    route: "/app/resolve",
  },
  {
    icon: HeartPulse,
    title: "Check my knowledge health",
    description: "Find stale, contradictory, or missing content",
    route: "/app/health",
  },
  {
    icon: Bot,
    title: "Build an AI agent",
    description: "Create customer-facing resolution agents",
    route: "/app/agents",
  },
];

export default function IntentCapture() {
  const { onboardingComplete, completeOnboarding } = useAppStore();
  const router = useRouter();
  const [freeText, setFreeText] = useState("");

  if (onboardingComplete) return null;

  const handleCardClick = (route: string) => {
    completeOnboarding();
    router.push(route);
  };

  const handleSkip = () => {
    completeOnboarding();
    router.push("/app/dashboard");
  };

  const handleSend = () => {
    if (!freeText.trim()) return;
    completeOnboarding();
    router.push("/app/dashboard");
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-8 max-w-2xl w-full mx-4">
        {/* Sparkles icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4597b0] to-[#36c08e] flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-white text-2xl font-bold text-center mb-2">
          What brings you to aiCartograph today?
        </h2>
        <p className="text-white/50 text-sm text-center mb-8">
          Choose where you&apos;d like to start, or tell us what you need.
        </p>

        {/* 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.route}
                onClick={() => handleCardClick(option.route)}
                className="bg-white/5 border border-white/10 rounded-xl p-5 cursor-pointer hover:bg-[#4597b0]/10 hover:border-[#4597b0]/30 transition-all text-left group"
              >
                <Icon size={24} className="text-[#4597b0] mb-3" />
                <h3 className="text-white text-sm font-semibold mb-1">{option.title}</h3>
                <p className="text-white/40 text-xs">{option.description}</p>
              </button>
            );
          })}
        </div>

        {/* Free-text input */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-6">
          <input
            type="text"
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Or tell us what you need..."
            className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 outline-none"
          />
          <button
            onClick={handleSend}
            className="text-white/40 hover:text-[#4597b0] transition-colors"
          >
            <Send size={18} />
          </button>
        </div>

        {/* Skip link */}
        <div className="text-center">
          <button
            onClick={handleSkip}
            className="text-white/30 text-sm hover:text-white/60 transition-colors inline-flex items-center gap-1"
          >
            Skip
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
