import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import SectionDivider from "@/components/ui/SectionDivider";
import { USPIcon } from "@/components/graphics/USPIcons";
import { PillarIcon, SourceIcon } from "@/components/graphics/FancyIcons";
import CTABanner from "@/components/sections/CTABanner";
import { FRAMEWORK_PILLARS, USPS, EIGHTEEN_PROBLEMS, COMPETITOR_APPROACHES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Discover how aiCartograph resolves organizational knowledge — Connect, Resolve, Detect, Close the Loop.",
};

const pillarColors = [
  { accent: "text-accent-amber", border: "border-l-4 border-accent-amber" },
  { accent: "text-accent-sky", border: "border-l-4 border-accent-sky" },
  { accent: "text-accent-coral", border: "border-l-4 border-accent-coral" },
  { accent: "text-accent-emerald", border: "border-l-4 border-accent-emerald" },
];

/* ─── Section 1: Hero (DARK) ─── */
function ProductHero() {
  return (
    <section className="pt-28 pb-16 section-dark relative">
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl" />
      <Container className="relative">
        <AnimateOnScroll className="max-w-3xl space-y-5">
          <Badge variant="highlight">Product</Badge>
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

/* ─── Section 2: Four Pillars Full (LIGHT) ─── */
function FourPillars() {
  return (
    <section className="section-light py-12 lg:py-16">
      <Container>
        <AnimateOnScroll className="mb-8">
          <p className="section-label mb-4">The Framework</p>
          <h2 className="heading-h2 text-brand-900">
            Connect &rarr; Resolve &rarr; Detect &rarr; Close the Loop
          </h2>
          <p className="text-brand-700 text-lg max-w-2xl mt-3">
            Four pillars that form a continuous cycle of knowledge resolution.
          </p>
        </AnimateOnScroll>

        <div className="space-y-6">
          {FRAMEWORK_PILLARS.map((pillar, i) => (
            <AnimateOnScroll key={pillar.id} delay={i * 0.1}>
              <div className={`card-surface rounded-xl p-8 ${pillarColors[i].border} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-start gap-5">
                  <PillarIcon id={pillar.id} className="w-10 h-10 shrink-0 mt-1" />
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-mono text-sm font-bold ${pillarColors[i].accent}`}>
                        Pillar {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="heading-h3 text-brand-900 mb-2">{pillar.verb}</h3>
                    <p className="text-brand-700 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Section 3: Knowledge Sources (DARK) ─── */
const sourceTypes = [
  "Wikis", "Help Centers", "Knowledge Bases", "Shared Drives", "Project Tools",
  "Communication Platforms", "Code Repositories", "CRM Systems", "Support Platforms",
];

function KnowledgeSources() {
  return (
    <section className="section-dark py-12 lg:py-16">
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

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
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

/* ─── Section 4: 18 Problems Diagnostic (DARK) ─── */
const tileBgs = ["bg-brand-800", "bg-[#223e49]", "bg-[#1a3540]"];

function EighteenProblems() {
  return (
    <section id="diagnostic" className="section-dark py-12 lg:py-16">
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <p className="section-label mb-4">The Knowledge Diagnostic</p>
          <h2 className="heading-h2 text-[#FDFFFF] mb-3">
            How many of these is your organization living with?
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 max-w-4xl mx-auto">
          {EIGHTEEN_PROBLEMS.map((problem, i) => (
            <AnimateOnScroll key={problem.id} delay={i * 0.03}>
              <div className={`${tileBgs[i % 3]} rounded-lg border border-brand-700/30 p-3 h-[70px] flex flex-col items-center justify-center text-center hover:border-brand-500/40 transition-all`}>
                <span className="text-brand-500 font-mono text-xs font-bold mb-1">
                  {String(problem.id).padStart(2, "0")}
                </span>
                <span className="text-[#FDFFFF] text-sm font-semibold leading-tight">
                  {problem.name}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-10">
          <p className="text-brand-400 font-medium text-base">
            If you recognize five or more, your organization has a knowledge resolution problem.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Section 5: Four USPs (LIGHT) ─── */
const uspBorders = [
  "border-l-4 border-accent-emerald",
  "border-l-4 border-accent-coral",
  "border-l-4 border-accent-sky",
  "border-l-4 border-accent-lavender",
];

function USPDeepDive() {
  return (
    <section className="section-light py-12 lg:py-16">
      <Container>
        <AnimateOnScroll className="mb-8 text-center">
          <p className="section-label mb-4">Differentiators</p>
          <h2 className="heading-h2 text-brand-900 mb-3">
            Four genuine differentiators
          </h2>
          <p className="text-brand-700 text-lg max-w-2xl mx-auto">
            These aren&apos;t incremental features. They&apos;re fundamental capabilities
            that define Knowledge Resolution as a category.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 gap-6">
          {USPS.map((usp, i) => (
            <AnimateOnScroll key={usp.id} delay={i * 0.1}>
              <div className={`card-surface rounded-xl p-6 h-full ${uspBorders[i]} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <USPIcon icon={usp.icon} className="w-12 h-12" />
                  </div>
                  <div>
                    <Badge variant="highlight">USP {i + 1}</Badge>
                    <h3 className="heading-h3 text-brand-900 mt-2 mb-2">{usp.title}</h3>
                    <p className="text-brand-700 text-sm leading-relaxed">{usp.longDescription}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Section 6: Competitor Positioning (DARK) ─── */
function CompetitivePositioning() {
  return (
    <section className="section-dark py-12 lg:py-16">
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
              <div className="rounded-xl border border-brand-700/30 bg-brand-800 p-6 text-center space-y-3 h-full">
                <p className="text-[#FDFFFF] font-semibold text-sm">{c.approach}</p>
                <p className="text-accent-emerald text-sm">{c.does}</p>
                <div className="h-px bg-brand-700/30" />
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

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      <SectionDivider variant="rich" />
      <FourPillars />
      <SectionDivider variant="gradient" />
      <KnowledgeSources />
      <SectionDivider variant="rich" />
      <EighteenProblems />
      <SectionDivider variant="gradient" />
      <USPDeepDive />
      <SectionDivider variant="rich" />
      <CompetitivePositioning />
      <SectionDivider variant="gradient" />
      <CTABanner
        headline="See aiCartograph in action"
        subheadline="Schedule a conversation to see how knowledge resolution works for your team."
      />
    </>
  );
}
