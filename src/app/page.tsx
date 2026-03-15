"use client";

import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import CTABanner from "@/components/sections/CTABanner";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PillarIcon } from "@/components/graphics/FancyIcons";
import { FRAMEWORK_PILLARS, EIGHTEEN_PROBLEMS } from "@/lib/constants";
import MockupDashboard from "@/components/graphics/MockupDashboard";
import MockupResolve from "@/components/graphics/MockupResolve";
import MockupHealth from "@/components/graphics/MockupHealth";
import MockupAgents from "@/components/graphics/MockupAgents";

/* ─── Section 2: Framework Strip ─── */
function FrameworkStrip() {
  const oneLiners = [
    "Ingest from 100+ sources. Zero migration.",
    "Synthesize precise answers for each person\u2019s context.",
    "Flag staleness, contradictions, and gaps proactively.",
    "Route feedback to the right knowledge owners.",
  ];

  return (
    <section className="py-12 lg:py-16" style={{ background: "#071319" }}>
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <h2 className="heading-h2 text-[#FDFFFF]">
            Connect &rarr; Resolve &rarr; Detect &rarr; Close the Loop
          </h2>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[200px]">
          {FRAMEWORK_PILLARS.map((pillar, i) => {
            const colors = ["#f0b429", "#4597b0", "#f06565", "#36c08e"];
            const color = colors[i];
            return (
              <AnimateOnScroll key={pillar.id} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-6 h-full flex flex-col items-start gap-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
                  <PillarIcon id={pillar.id} className="w-8 h-8" />
                  <h3 className="heading-h3 text-[#FDFFFF]">{pillar.verb}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{oneLiners[i]}</p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll className="text-center mt-8">
          <Button href="/product" variant="ghost" size="sm" className="text-brand-400 hover:text-brand-300 hover:bg-brand-500/10">
            See the full product &rarr;
          </Button>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Section 3: Platform Preview (Infinite Scroll) ─── */
function PlatformPreview() {
  const mockups = [
    { label: "Dashboard", Component: MockupDashboard },
    { label: "Resolution Engine", Component: MockupResolve },
    { label: "Health Intelligence", Component: MockupHealth },
    { label: "Agent Marketplace", Component: MockupAgents },
  ];

  return (
    <section className="py-12 lg:py-16" style={{ background: "#050d12" }}>
      <AnimateOnScroll className="text-center mb-10 px-4">
        <p className="section-label mb-4">Platform Preview</p>
        <h2 className="heading-h2 text-[#FDFFFF]">
          See it in action
        </h2>
        <p className="text-white/50 text-lg mt-3 max-w-2xl mx-auto">
          A unified platform for knowledge resolution — from ingestion to insight.
        </p>
      </AnimateOnScroll>

      <div className="marquee-container">
        <div className="marquee-track">
          {[...mockups, ...mockups].map((m, i) => (
            <div key={i} className="marquee-item">
              <m.Component className="w-full" />
              <p className="text-center text-white/40 text-sm mt-2 font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: Problem Teaser ─── */
function ProblemTeaser() {
  const previewProblems = EIGHTEEN_PROBLEMS.slice(0, 6);
  const diagnosticColors = ["#f06565", "#e07c4f", "#f0b429", "#4597b0", "#9b8ce8", "#36c08e"];

  return (
    <section className="py-12 lg:py-16 relative" style={{ background: "#0a1a22" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 100%, rgba(240,101,101,0.04) 0%, transparent 40%)" }} />
      <Container className="relative">
        <AnimateOnScroll className="text-center mb-10">
          <p className="section-label mb-4" style={{ color: "#f06565" }}>The Knowledge Diagnostic</p>
          <h2 className="heading-h2 text-[#FDFFFF] mb-3">
            We mapped 18 ways knowledge fails in organizations.
          </h2>
          <p className="text-brand-300 text-lg">How many is yours living with?</p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto min-h-[200px]">
          {previewProblems.map((problem, i) => {
            const color = diagnosticColors[i];
            return (
              <AnimateOnScroll key={problem.id} delay={i * 0.05}>
                <div className="relative rounded-xl px-5 py-4 h-[80px] flex flex-col items-center justify-center text-center group transition-all duration-300 hover:scale-105 cursor-default overflow-hidden whitespace-nowrap" style={{ background: `linear-gradient(145deg, ${color}10, transparent)`, border: `1px solid ${color}20` }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }} />
                  <span className="font-mono text-xs block mb-1 font-bold" style={{ color }}>
                    {String(problem.id).padStart(2, "0")}
                  </span>
                  <span className="text-[#FDFFFF] text-sm font-medium leading-tight">
                    {problem.name}
                  </span>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll className="text-center mt-8">
          <Button href="/product#diagnostic" variant="secondary" size="md">
            Take the Full Diagnostic &rarr;
          </Button>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Homepage ─── */
export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero */}
      <Hero />
      <div className="glow-divider" />

      {/* Section 2: Framework Strip */}
      <FrameworkStrip />
      <div className="glow-divider" />

      {/* Section 3: Platform Preview */}
      <PlatformPreview />
      <div className="glow-divider" />

      {/* Section 4: Problem Teaser */}
      <ProblemTeaser />
      <div className="glow-divider" />

      {/* Section 5: By the Numbers */}
      <SocialProof />
      <div className="glow-divider" />

      {/* Section 6: CTA Banner */}
      <CTABanner />
    </>
  );
}
