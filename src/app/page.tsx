"use client";

import Hero from "@/components/sections/Hero";
import USPGrid from "@/components/sections/USPGrid";
import SocialProof from "@/components/sections/SocialProof";
import CTABanner from "@/components/sections/CTABanner";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import SectionDivider from "@/components/ui/SectionDivider";
import { PillarIcon } from "@/components/graphics/FancyIcons";
import { FRAMEWORK_PILLARS, EIGHTEEN_PROBLEMS, COMPETITOR_APPROACHES } from "@/lib/constants";

function FrameworkPillars() {
  const pillarColors = ["text-accent-amber", "text-accent-sky", "text-accent-coral", "text-accent-emerald"];
  const pillarBgs = [
    "bg-accent-amber/10 border-accent-amber/20",
    "bg-accent-sky/10 border-accent-sky/20",
    "bg-accent-coral/10 border-accent-coral/20",
    "bg-accent-emerald/10 border-accent-emerald/20",
  ];

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Four pillars.{" "}
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              One continuous cycle.
            </span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">
            Knowledge that improves every day.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FRAMEWORK_PILLARS.map((pillar, i) => (
            <AnimateOnScroll key={pillar.id} delay={i * 0.1}>
              <Card className="h-full space-y-4 group hover:scale-[1.02] transition-transform duration-300">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${pillarBgs[i]}`}>
                  <PillarIcon id={pillar.id} className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs font-bold ${pillarColors[i]}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{pillar.verb}</h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProblemsDiagnostic() {
  const problemColors = [
    "hover:border-accent-coral/40 hover:bg-accent-coral/5",
    "hover:border-accent-amber/40 hover:bg-accent-amber/5",
    "hover:border-accent-sky/40 hover:bg-accent-sky/5",
    "hover:border-accent-lavender/40 hover:bg-accent-lavender/5",
    "hover:border-accent-emerald/40 hover:bg-accent-emerald/5",
    "hover:border-brand-500/40 hover:bg-brand-500/5",
  ];

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            The 18 Problems Diagnostic
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">
            How many of these is your organization living with?
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
          {EIGHTEEN_PROBLEMS.map((problem, i) => (
            <AnimateOnScroll key={problem.id} delay={i * 0.03}>
              <div className={`rounded-xl border border-white/10 bg-white/[0.02] p-3 flex flex-col items-center justify-center text-center transition-all cursor-default ${problemColors[i % 6]}`}>
                <span className="text-brand-400 font-mono text-xs mb-1">
                  {String(problem.id).padStart(2, "0")}
                </span>
                <span className="text-white/65 text-sm font-medium leading-tight">
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

function CategoryCreation() {
  const approachColors = ["border-accent-coral/20", "border-accent-amber/20", "border-accent-sky/20"];
  const gapColors = ["text-accent-coral", "text-accent-amber", "text-accent-sky"];

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <AnimateOnScroll className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Three approaches exist today.
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              All optimize for retrieval, not resolution.
            </span>
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {COMPETITOR_APPROACHES.map((c, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className={`rounded-2xl border bg-white/[0.02] p-5 space-y-3 ${approachColors[i]}`}>
                  <p className="text-white/65 font-medium text-sm">{c.approach}</p>
                  <p className="text-white/35 text-sm">{c.does}</p>
                  <div className="h-px bg-white/10" />
                  <p className={`text-sm font-medium ${gapColors[i]}`}>{c.gap}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <p className="text-base text-white/45 max-w-2xl mx-auto">
              aiCartograph is the resolution layer. We don&apos;t replace your knowledge
              tools — we make all of them actually work.
            </p>
          </AnimateOnScroll>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider variant="rich" />
      <FrameworkPillars />
      <SectionDivider variant="gradient" />
      <ProblemsDiagnostic />
      <SectionDivider variant="subtle" />
      <USPGrid />
      <SectionDivider variant="gradient" />
      <SocialProof />
      <SectionDivider variant="rich" />
      <CategoryCreation />
      <CTABanner />
    </>
  );
}
