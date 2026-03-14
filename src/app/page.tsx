import Hero from "@/components/sections/Hero";
import USPGrid from "@/components/sections/USPGrid";
import SocialProof from "@/components/sections/SocialProof";
import CTABanner from "@/components/sections/CTABanner";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { FRAMEWORK_PILLARS, EIGHTEEN_PROBLEMS, COMPETITOR_APPROACHES } from "@/lib/constants";

function FrameworkPillars() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Four pillars.{" "}
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              One continuous cycle.
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Knowledge that improves every day.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FRAMEWORK_PILLARS.map((pillar, i) => (
            <AnimateOnScroll key={pillar.id} delay={i * 0.1}>
              <Card className="h-full space-y-4">
                <div className="w-10 h-10 rounded-full border border-brand-500/30 bg-brand-500/5 flex items-center justify-center">
                  <span className="text-brand-400 font-mono text-sm font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{pillar.verb}</h3>
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
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The 18 Problems Diagnostic
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            How many of these is your organization living with?
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
          {EIGHTEEN_PROBLEMS.map((problem, i) => (
            <AnimateOnScroll key={problem.id} delay={i * 0.03}>
              <div className="aspect-square rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col items-center justify-center text-center hover:border-brand-500/30 hover:bg-brand-500/5 transition-all cursor-default">
                <span className="text-brand-500 font-mono text-xs mb-2">
                  {String(problem.id).padStart(2, "0")}
                </span>
                <span className="text-white/70 text-sm font-medium leading-tight">
                  {problem.name}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-12">
          <p className="text-brand-400 font-medium text-lg">
            If you recognize five or more, your organization has a knowledge resolution problem.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

function CategoryCreation() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Three approaches exist today.
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              All optimize for retrieval, not resolution.
            </span>
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {COMPETITOR_APPROACHES.map((c, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
                  <p className="text-white/70 font-medium">{c.approach}</p>
                  <p className="text-white/40 text-sm">{c.does}</p>
                  <div className="h-px bg-white/10" />
                  <p className="text-brand-400 text-sm font-medium">{c.gap}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
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
      <FrameworkPillars />
      <ProblemsDiagnostic />
      <USPGrid />
      <SocialProof />
      <CategoryCreation />
      <CTABanner />
    </>
  );
}
