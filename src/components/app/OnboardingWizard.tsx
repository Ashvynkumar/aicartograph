"use client";

import { useState } from "react";
import { Upload, MessageSquare, HeartPulse, Check, Sparkles, ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function OnboardingWizard() {
  const { onboardingComplete, onboardingStep, setOnboardingStep, completeOnboarding } = useAppStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  if (onboardingComplete) return null;

  const steps = [
    {
      icon: Upload,
      title: "Connect",
      subtitle: "Upload your first knowledge source",
      description: "Drag-and-drop a PDF, paste a URL, or try our sample data to see aiCartograph in action.",
    },
    {
      icon: MessageSquare,
      title: "Resolve",
      subtitle: "Ask your first question",
      description: "See how aiCartograph synthesizes answers from multiple sources with citations.",
    },
    {
      icon: HeartPulse,
      title: "Discover",
      subtitle: "See what aiCartograph found",
      description: "Your knowledge health report is ready — we detected issues you'll want to fix.",
    },
  ];

  const handleNext = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowConfetti(true);
      setTimeout(() => {
        completeOnboarding();
      }, 2000);
    }
  };

  const handleTrySample = () => {
    handleNext();
  };

  if (showConfetti) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-8 max-w-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-[#4597b0] flex items-center justify-center">
            <Check size={32} className="text-white" />
          </div>
          <h2 className="text-white text-xl font-bold font-serif">You just experienced knowledge resolution.</h2>
          <p className="text-white/60 text-sm">Explore the full platform — every feature is designed to make your knowledge work harder.</p>
          <div className="flex gap-2 justify-center text-2xl">
            {["🎉", "✨", "🚀", "⭐", "🎊"].map((e, i) => (
              <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0c2329] border border-white/10 rounded-2xl p-8 max-w-lg w-full mx-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#4597b0] to-[#62acbb] flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
          </div>
          <h2 className="text-white text-xl font-bold font-serif">
            Welcome to aiCartograph
          </h2>
          <p className="text-white/50 text-sm">
            Let&apos;s get your knowledge working in 3 minutes.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i <= onboardingStep ? "bg-[#4597b0]" : "bg-white/10"
              }`}
            />
          ))}
        </div>
        <p className="text-white/30 text-xs text-center">Step {onboardingStep + 1} of 3</p>

        {/* Current Step */}
        {(() => {
          const step = steps[onboardingStep];
          const Icon = step.icon;
          return (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4597b0]/20 flex items-center justify-center">
                  <Icon size={20} className="text-[#4597b0]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.subtitle}</p>
                </div>
              </div>
              <p className="text-white/60 text-sm">{step.description}</p>

              {onboardingStep === 0 && (
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center space-y-3 hover:border-[#4597b0]/30 transition-all cursor-pointer">
                  <Upload size={24} className="mx-auto text-white/30" />
                  <p className="text-white/40 text-sm">Drag & drop files here</p>
                  <button
                    onClick={handleTrySample}
                    className="text-[#4597b0] text-sm font-medium hover:underline"
                  >
                    Try with our sample data →
                  </button>
                </div>
              )}

              {onboardingStep === 1 && (
                <div className="space-y-2">
                  {["How do I configure SSO?", "What is our remote work policy?", "How do I deploy to production?"].map((q) => (
                    <button
                      key={q}
                      onClick={handleNext}
                      className="w-full text-left px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-[#4597b0]/10 hover:border-[#4597b0]/30 transition-all"
                    >
                      &ldquo;{q}&rdquo;
                    </button>
                  ))}
                </div>
              )}

              {onboardingStep === 2 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-red-300 text-sm">2 critically stale sources detected</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-amber-300 text-sm">3 contradictions found</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-blue-300 text-sm">1 knowledge gap identified</span>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={completeOnboarding}
            className="text-white/30 text-sm hover:text-white/60 transition-colors"
          >
            Skip tour
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#4597b0]/20 transition-all"
          >
            {onboardingStep === 2 ? "Explore Platform" : "Continue"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
