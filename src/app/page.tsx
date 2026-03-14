"use client";

import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import CTABanner from "@/components/sections/CTABanner";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";
import { PillarIcon } from "@/components/graphics/FancyIcons";
import { FRAMEWORK_PILLARS, EIGHTEEN_PROBLEMS } from "@/lib/constants";

/* ─── Section 2: Framework Strip (LIGHT) ─── */
function FrameworkStrip() {
  const oneLiners = [
    "Ingest from 100+ sources. Zero migration.",
    "Synthesize precise answers for each person's context.",
    "Flag staleness, contradictions, and gaps proactively.",
    "Route feedback to the right knowledge owners.",
  ];

  return (
    <section className="section-light py-12 lg:py-16">
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <h2 className="heading-h2 text-brand-900">
            Connect &rarr; Resolve &rarr; Detect &rarr; Close the Loop
          </h2>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FRAMEWORK_PILLARS.map((pillar, i) => (
            <AnimateOnScroll key={pillar.id} delay={i * 0.1}>
              <div className="card-surface rounded-xl p-6 h-full flex flex-col items-start gap-3 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                <PillarIcon id={pillar.id} className="w-8 h-8" />
                <h3 className="heading-h3 text-brand-900">{pillar.verb}</h3>
                <p className="text-brand-700 text-sm leading-relaxed">{oneLiners[i]}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-8">
          <Button href="/product" variant="ghost" size="sm" className="text-brand-500 hover:text-brand-600 hover:bg-brand-500/10">
            See the full product &rarr;
          </Button>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Section 3: Problem Teaser (DARK) ─── */
function ProblemTeaser() {
  const previewProblems = EIGHTEEN_PROBLEMS.slice(0, 6);

  return (
    <section className="section-dark py-12 lg:py-16">
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <p className="section-label mb-4">The Knowledge Diagnostic</p>
          <h2 className="heading-h2 text-[#FDFFFF] mb-3">
            We mapped 18 ways knowledge fails in organizations.
          </h2>
          <p className="text-brand-300 text-lg">How many is yours living with?</p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {previewProblems.map((problem, i) => (
            <AnimateOnScroll key={problem.id} delay={i * 0.05}>
              <div className="rounded-xl bg-brand-800 border border-brand-700/30 p-4 h-[72px] flex flex-col items-center justify-center text-center hover:border-brand-500/40 hover:bg-brand-800/80 transition-all">
                <span className="text-brand-500 font-mono text-xs block mb-1">
                  {String(problem.id).padStart(2, "0")}
                </span>
                <span className="text-[#FDFFFF] text-sm font-medium leading-tight">
                  {problem.name}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
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
      {/* Section 1: Hero (DARK) */}
      <Hero />
      <SectionDivider variant="rich" />

      {/* Section 2: Framework Strip (LIGHT) */}
      <FrameworkStrip />
      <SectionDivider variant="gradient" />

      {/* Section 3: Problem Teaser (DARK) */}
      <ProblemTeaser />
      <SectionDivider variant="rich" />

      {/* Section 4: By the Numbers (LIGHT) */}
      <SocialProof />
      <SectionDivider variant="gradient" />

      {/* Section 5: CTA Banner (DARK, compact) */}
      <CTABanner />
    </>
  );
}
