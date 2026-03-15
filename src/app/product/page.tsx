import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { USPIcon } from "@/components/graphics/USPIcons";
import { PillarIcon, SourceIcon } from "@/components/graphics/FancyIcons";
import CTABanner from "@/components/sections/CTABanner";
import MockupDashboard from "@/components/graphics/MockupDashboard";
import MockupResolve from "@/components/graphics/MockupResolve";
import MockupHealth from "@/components/graphics/MockupHealth";
import MockupAgents from "@/components/graphics/MockupAgents";
import { FRAMEWORK_PILLARS, DIFFERENTIATORS, EIGHTEEN_PROBLEMS, COMPETITOR_APPROACHES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Discover how aiCartograph resolves organizational knowledge — Connect, Resolve, Detect, Close the Loop.",
};

const pillarAccents = [
  { accent: "text-accent-amber", border: "border-l-4 border-accent-amber" },
  { accent: "text-accent-sky", border: "border-l-4 border-accent-sky" },
  { accent: "text-accent-coral", border: "border-l-4 border-accent-coral" },
  { accent: "text-accent-emerald", border: "border-l-4 border-accent-emerald" },
];

/* ─── Section 1: Hero ─── */
function ProductHero() {
  return (
    <section className="pt-28 pb-16 relative" style={{ background: "#071319" }}>
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl" />
      <Container className="relative">
        <AnimateOnScroll className="max-w-3xl space-y-5">
          <h1 className="heading-h1 text-[#FDFFFF]">
            Knowledge Resolution,
            <br />
            <span className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
              not knowledge management
            </span>
          </h1>
          <p className="text-xl text-brand-300 max-w-2xl leading-relaxed">
            aiCartograph doesn&apos;t replace your knowledge tools. It makes all of them
            actually work — resolving questions, detecting health issues, and closing
            the loop back to knowledge owners.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Section 2: Four Pillars Full ─── */
function FourPillars() {
  return (
    <section className="py-12 lg:py-16" style={{ background: "#091e26" }}>
      <Container>
        <AnimateOnScroll className="mb-8">
          <p className="section-label mb-4">The Framework</p>
          <h2 className="heading-h2 text-[#FDFFFF]">
            Connect &rarr; Resolve &rarr; Detect &rarr; Close the Loop
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mt-3">
            Four pillars that form a continuous cycle of knowledge resolution.
          </p>
        </AnimateOnScroll>

        <div className="space-y-8 min-h-[200px]">
          {FRAMEWORK_PILLARS.map((pillar, i) => {
            const mockups = [
              <MockupDashboard key="d" className="w-full" />,
              <MockupResolve key="r" className="w-full" />,
              <MockupHealth key="h" className="w-full" />,
              <MockupAgents key="a" className="w-full" />,
            ];
            const isEven = i % 2 === 0;
            return (
              <AnimateOnScroll key={pillar.id} delay={i * 0.1}>
                <div className={`grid lg:grid-cols-2 gap-6 items-center ${isEven ? "" : "lg:direction-rtl"}`}>
                  <div className={`dark-card p-8 ${pillarAccents[i].border} ${isEven ? "" : "lg:order-2"}`}>
                    <div className="flex items-start gap-5">
                      <PillarIcon id={pillar.id} className="w-10 h-10 shrink-0 mt-1" />
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`font-mono text-sm font-bold ${pillarAccents[i].accent}`}>
                            Pillar {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="heading-h3 text-[#FDFFFF] mb-2">{pillar.verb}</h3>
                        <p className="text-white/60 leading-relaxed break-words">{pillar.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className={isEven ? "" : "lg:order-1"}>
                    {mockups[i]}
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ─── Section 3: Knowledge Sources ─── */
const sourceTypes = [
  "Wikis", "Help Centers", "Knowledge Bases", "Shared Drives", "Project Tools",
  "Communication Platforms", "Code Repositories", "CRM Systems", "Support Platforms",
  "Cloud Storage", "Email Archives", "Design Tools", "HR Systems", "ERP Platforms",
  "API Documentation", "Video Libraries", "Learning Management", "Analytics Dashboards",
  "Ticketing Systems", "Product Roadmaps",
];

function KnowledgeSources() {
  return (
    <section className="py-12 lg:py-16" style={{ background: "#071319" }}>
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <p className="section-label mb-4">Integrations</p>
          <h2 className="heading-h2 text-[#FDFFFF] mb-3">
            100+ sources. Zero migration.
          </h2>
          <p className="text-brand-300 text-lg">
            Your knowledge stays where it is. We make it work.
          </p>
        </AnimateOnScroll>

        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          {sourceTypes.map((name, i) => (
            <AnimateOnScroll key={name} delay={i * 0.05}>
              <div className="group rounded-full border border-brand-700/40 bg-brand-800/60 px-5 py-3 flex items-center gap-2.5 hover:border-brand-500/50 hover:bg-brand-800 transition-all cursor-default">
                <SourceIcon name={name} className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="text-brand-300 text-sm group-hover:text-[#FDFFFF] transition-colors">{name}</span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Section 4: 18 Problems Diagnostic ─── */
function EighteenProblems() {
  const diagnosticColors = ["#f06565", "#e07c4f", "#f0b429", "#ffd644", "#4caf7d", "#36c08e", "#56b3f5", "#4597b0", "#9b8ce8", "#f06565", "#e07c4f", "#f0b429", "#4caf7d", "#36c08e", "#56b3f5", "#4597b0", "#9b8ce8", "#f06565"];

  return (
    <section id="diagnostic" className="py-12 lg:py-16 relative" style={{ background: "#050d12" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(240,101,101,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 70%, rgba(69,151,176,0.04) 0%, transparent 50%)" }} />
      <Container className="relative">
        <AnimateOnScroll className="text-center mb-10">
          <p className="section-label mb-4" style={{ color: "#f06565" }}>The Knowledge Diagnostic</p>
          <h2 className="heading-h2 text-[#FDFFFF] mb-3">
            How many of these is your organization living with?
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto min-h-[200px]">
          {EIGHTEEN_PROBLEMS.map((problem, i) => {
            const color = diagnosticColors[i];
            return (
              <AnimateOnScroll key={problem.id} delay={i * 0.03}>
                <div className="relative rounded-lg px-4 py-3 min-h-[72px] flex flex-col items-center justify-center text-center group transition-all duration-300 hover:scale-105 cursor-default overflow-hidden whitespace-nowrap" style={{ background: `linear-gradient(145deg, ${color}0C, transparent)`, border: `1px solid ${color}18` }}>
                  <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />
                  <span className="font-mono text-xs font-bold mb-1" style={{ color }}>
                    {String(problem.id).padStart(2, "0")}
                  </span>
                  <span className="text-[#FDFFFF] text-sm font-semibold leading-tight">
                    {problem.name}
                  </span>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll className="text-center mt-10">
          <p className="text-base font-medium" style={{ background: "linear-gradient(90deg, #f06565, #f0b429, #4597b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            If you recognize five or more, your organization has a knowledge resolution problem.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Section 5: Differentiators ─── */
const diffAccents = ["#36c08e", "#f06565", "#56b3f5", "#9b8ce8", "#f0b429", "#4597b0"];

function DifferentiatorsSection() {
  return (
    <section className="py-12 lg:py-16" style={{ background: "#091e26" }}>
      <Container>
        <AnimateOnScroll className="mb-10 text-center">
          <p className="section-label mb-4">What Sets Us Apart</p>
          <h2 className="heading-h2 text-[#FDFFFF] mb-3">
            Built different. Not incrementally better.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            These aren&apos;t incremental features. They&apos;re fundamental capabilities
            that define Knowledge Resolution as a category.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[200px]">
          {DIFFERENTIATORS.map((diff, i) => {
            const accent = diffAccents[i % diffAccents.length];
            return (
              <AnimateOnScroll key={diff.id} delay={i * 0.08}>
                <div className="glass-card p-6 h-full relative overflow-hidden" style={{ borderLeft: `3px solid ${accent}` }}>
                  <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <USPIcon icon={diff.icon} className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-[#FDFFFF] font-semibold text-base mb-2">{diff.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{diff.description}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ─── Section 6: Competitor Positioning ─── */
function CompetitivePositioning() {
  return (
    <section className="py-12 lg:py-16" style={{ background: "#071319" }}>
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <p className="section-label mb-4">Category Creation</p>
          <h2 className="heading-h2 text-[#FDFFFF] mb-3">
            Three approaches exist. All optimize for retrieval.
          </h2>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {COMPETITOR_APPROACHES.map((c, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <div className="dark-card p-6 text-center space-y-3 h-full">
                <p className="text-[#FDFFFF] font-semibold text-sm">{c.approach}</p>
                <p className="text-accent-emerald text-sm">{c.does}</p>
                <div className="h-px bg-white/10" />
                <p className="text-accent-coral text-sm font-medium">{c.gap}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="mt-10 text-center">
          <div className="inline-block rounded-xl border border-brand-500/30 bg-brand-500/10 p-6 sm:p-8">
            <p className="text-brand-400 font-semibold text-lg mb-1">aiCartograph</p>
            <p className="text-brand-300 text-sm">
              Resolves knowledge. Detects health issues. Closes the feedback loop.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Section 7: Agent Marketplace Preview ─── */
const marketplaceAgents = [
  { name: "User Manual Agent", desc: "Turn any product manual into an interactive AI agent.", available: true },
  { name: "Knowledge Search Agent", desc: "Semantic search across all connected knowledge sources.", available: true },
  { name: "FAQ Bot", desc: "Auto-generate FAQ bots from your knowledge base.", available: true },
  { name: "Onboarding Guide", desc: "Guide new employees through onboarding with AI.", available: false },
  { name: "Sales Playbook Agent", desc: "Equip reps with real-time competitive intel.", available: false },
  { name: "Support Triage Agent", desc: "Classify and route support tickets to the right knowledge.", available: false },
  { name: "Compliance Checker", desc: "Verify policy adherence across all documentation.", available: false },
  { name: "Release Notes Agent", desc: "Auto-generate release notes from engineering artifacts.", available: false },
];

function AgentMarketplacePreview() {
  return (
    <section className="py-12 lg:py-16" style={{ background: "#050d12" }}>
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <p className="section-label mb-4">Agent Marketplace</p>
          <h2 className="heading-h2 text-[#FDFFFF] mb-3">
            Pre-built agents for every use case
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Deploy customer-facing resolution agents in minutes, not months.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {marketplaceAgents.map((agent) => (
            <AnimateOnScroll key={agent.name}>
              <div className={`dark-card p-5 h-full ${agent.available ? "" : "opacity-50"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${agent.available ? "bg-accent-emerald/10 text-accent-emerald" : "bg-accent-amber/10 text-accent-amber"}`}>
                    {agent.available ? "Available" : "Coming Soon"}
                  </span>
                </div>
                <h4 className="text-[#FDFFFF] font-semibold text-sm mb-1">{agent.name}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{agent.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-10">
          <Button href="/contact" variant="primary" size="lg" className="text-base font-semibold">
            Explore the Full Marketplace &rarr;
          </Button>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      <div className="glow-divider" />
      <FourPillars />
      <div className="glow-divider" />
      <KnowledgeSources />
      <div className="glow-divider" />
      <EighteenProblems />
      <div className="glow-divider" />
      <DifferentiatorsSection />
      <div className="glow-divider" />
      <CompetitivePositioning />
      <div className="glow-divider" />
      <AgentMarketplacePreview />
      <div className="glow-divider" />
      <CTABanner
        headline="See aiCartograph in action"
        subheadline="Schedule a conversation to see how knowledge resolution works for your team."
      />
    </>
  );
}
