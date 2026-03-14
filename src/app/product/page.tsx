import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { USPIcon } from "@/components/graphics/USPIcons";
import CTABanner from "@/components/sections/CTABanner";
import { FRAMEWORK_PILLARS, USPS, EIGHTEEN_PROBLEMS, COMPETITOR_APPROACHES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Discover how aiCartograph resolves organizational knowledge — Connect, Resolve, Detect, Close the Loop.",
};

function ProductHero() {
  return (
    <section className="pt-32 pb-20 relative">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
      <Container className="relative">
        <AnimateOnScroll className="max-w-3xl space-y-6">
          <Badge variant="highlight">Product</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Knowledge Resolution,
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              not knowledge management
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            aiCartograph doesn&apos;t replace your knowledge tools. It makes all of them
            actually work — resolving questions, detecting health issues, and closing
            the loop back to knowledge owners.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

function FourPillars() {
  return (
    <section className="py-24 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Connect &rarr; Resolve &rarr; Detect &rarr; Close the Loop
          </h2>
          <p className="text-white/50 text-lg max-w-2xl">
            Four pillars that form a continuous cycle of knowledge resolution.
          </p>
        </AnimateOnScroll>

        <div className="space-y-16">
          {FRAMEWORK_PILLARS.map((pillar, i) => (
            <AnimateOnScroll key={pillar.id} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="space-y-4">
                  <span className="text-brand-500 font-mono text-sm font-bold">
                    Pillar {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{pillar.verb}</h3>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-white/60 leading-relaxed text-lg">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SarahStory() {
  return (
    <section className="py-24 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            How It Works in Practice
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="space-y-4">
              <Badge>Without aiCartograph</Badge>
              <div className="space-y-3 text-white/50 text-sm leading-relaxed mt-4">
                <p>Sarah, a customer success manager, gets asked about a feature change.</p>
                <p>She searches the wiki — finds three articles, two outdated, one contradicting the other.</p>
                <p>She messages the product team. Waits 4 hours. Gets a partial answer.</p>
                <p>She stitches together a response. The customer gets a half-right answer, a day late.</p>
                <p className="text-red-400/70 font-medium">Nobody knows this happened. Nobody fixes the knowledge.</p>
              </div>
            </Card>

            <Card highlighted className="space-y-4">
              <Badge variant="highlight">With aiCartograph</Badge>
              <div className="space-y-3 text-white/60 text-sm leading-relaxed mt-4">
                <p>Sarah asks aiCartograph. It synthesizes across the wiki, release notes, and support history.</p>
                <p>She gets a contextual, role-relevant answer in seconds — with sources cited.</p>
                <p>aiCartograph has already flagged the contradicting articles to the knowledge owner.</p>
                <p>The staleness score triggered an update request last week.</p>
                <p className="text-brand-400 font-medium">The loop is closed. Knowledge improves. Everyone benefits.</p>
              </div>
            </Card>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

function EighteenProblems() {
  return (
    <section className="py-24 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The 18 Problems Diagnostic
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            We mapped every way knowledge fails in organizations. How many do you recognize?
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
          {EIGHTEEN_PROBLEMS.map((problem, i) => (
            <AnimateOnScroll key={problem.id} delay={i * 0.03}>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center hover:border-brand-500/30 hover:bg-brand-500/5 transition-all cursor-default">
                <span className="text-brand-500 font-mono text-xs block mb-1">
                  {String(problem.id).padStart(2, "0")}
                </span>
                <span className="text-white/70 text-sm font-medium">
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

function USPDeepDive() {
  return (
    <section className="py-24 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Four genuine differentiators
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            These aren&apos;t incremental features. They&apos;re fundamental capabilities
            that define Knowledge Resolution as a category.
          </p>
        </AnimateOnScroll>

        <div className="space-y-20">
          {USPS.map((usp, i) => (
            <AnimateOnScroll key={usp.id} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={`space-y-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Badge variant="highlight">USP {i + 1}</Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {usp.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-lg">
                    {usp.longDescription}
                  </p>
                </div>
                <div
                  className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="w-64 h-64 rounded-3xl border border-white/10 bg-white/[0.02] flex items-center justify-center">
                    <USPIcon icon={usp.icon} className="w-32 h-32" />
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

function CompetitivePositioning() {
  return (
    <section className="py-24 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Three approaches exist. All optimize for retrieval.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            aiCartograph creates an entirely new category: resolution.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {COMPETITOR_APPROACHES.map((c, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <Card className="text-center space-y-4">
                <p className="text-white/70 font-semibold">{c.approach}</p>
                <p className="text-white/40 text-sm">{c.does}</p>
                <div className="h-px bg-white/10" />
                <p className="text-red-400/70 text-sm">{c.gap}</p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="mt-12 text-center">
          <div className="inline-block rounded-2xl border border-brand-500/30 bg-brand-500/5 p-8 sm:p-10">
            <p className="text-brand-400 font-semibold text-lg mb-2">aiCartograph</p>
            <p className="text-white/60">
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
      <FourPillars />
      <SarahStory />
      <EighteenProblems />
      <USPDeepDive />
      <CompetitivePositioning />
      <CTABanner
        headline="See aiCartograph in action"
        subheadline="Schedule a conversation to see how knowledge resolution works for your team."
      />
    </>
  );
}
