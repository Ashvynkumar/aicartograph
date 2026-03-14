import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import SectionDivider from "@/components/ui/SectionDivider";
import FlowDiagram from "@/components/graphics/FlowDiagram";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how aiCartograph resolves knowledge in practice — from question to resolution in seconds.",
};

/* ─── Section 1: Hero (DARK) ─── */
function HIWHero() {
  return (
    <section className="pt-28 pb-16 section-dark relative">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl" />
      <Container className="relative">
        <AnimateOnScroll className="max-w-3xl space-y-5">
          <Badge variant="highlight">How It Works</Badge>
          <h1 className="heading-h1 text-[#FDFFFF]">
            From question to resolution
            <br />
            <span className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
              in seconds.
            </span>
          </h1>
          <p className="text-xl text-brand-300 max-w-2xl leading-relaxed">
            See how aiCartograph works in practice — step by step.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Section 2: Sarah's Story (LIGHT) ─── */
function SarahStory() {
  const without = [
    "Sarah, a CS manager, gets asked about SSO config for Enterprise v3.2.",
    "She searches the help center — finds 4 articles, none specific to v3.2.",
    "She Slacks an engineer. Waits 2 hours.",
    "Customer waits. Gets a half-right answer a day late.",
    "Nobody knows this happened. Nobody fixes the knowledge.",
  ];

  const withAC = [
    "Sarah asks aiCartograph the same question.",
    "System pulls from SSO guide, v3.2 release notes, Enterprise config spec.",
    "Assembles precise, step-by-step answer in seconds.",
    "Sarah resolves the ticket in 3 minutes.",
    "aiCartograph detects this was asked 12 times. Signals the knowledge team.",
  ];

  return (
    <section className="section-light py-16 lg:py-20">
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <p className="section-label mb-4">Scenario 1: Customer Success</p>
          <h2 className="heading-h2 text-brand-900">
            Sarah&apos;s SSO question
          </h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Without */}
          <AnimateOnScroll>
            <div className="card-surface rounded-xl p-6 h-full border-l-4 border-accent-coral">
              <Badge>Without aiCartograph</Badge>
              <div className="mt-4 space-y-3">
                {without.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent-coral font-mono text-xs font-bold mt-1 shrink-0">{i + 1}.</span>
                    <p className={`text-sm leading-relaxed ${i === without.length - 1 ? "text-accent-coral font-medium" : "text-brand-700"}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* With */}
          <AnimateOnScroll delay={0.15}>
            <div className="card-surface rounded-xl p-6 h-full border-l-4 border-brand-500 shadow-lg shadow-brand-500/5">
              <Badge variant="highlight">With aiCartograph</Badge>
              <div className="mt-4 space-y-3">
                {withAC.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-brand-500 font-mono text-xs font-bold mt-1 shrink-0">{i + 1}.</span>
                    <p className={`text-sm leading-relaxed ${i === withAC.length - 1 ? "text-brand-500 font-medium" : "text-brand-700"}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll className="text-center mt-10">
          <p className="text-brand-600 font-medium text-lg">
            This is the difference between retrieval and resolution.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Section 3: Second Persona (DARK) ─── */
function DevStory() {
  const without = [
    "Priya, a new engineer, needs to set up the local dev environment.",
    "The internal wiki has a 2-year-old setup guide for a different stack.",
    "She asks in #engineering — gets 3 partial answers and 2 broken links.",
    "Two senior engineers spend 45 minutes helping her debug config.",
    "The team loses half a day. The wiki never gets updated.",
  ];

  const withAC = [
    "Priya asks aiCartograph how to set up the local dev environment.",
    "It synthesizes from the current README, recent Slack threads, and CI config.",
    "She gets a step-by-step guide for the actual current stack — in 30 seconds.",
    "Priya is productive by lunch. No engineers interrupted.",
    "aiCartograph flags the outdated wiki page and routes it to the DevEx team.",
  ];

  return (
    <section className="section-dark py-16 lg:py-20">
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <p className="section-label mb-4">Scenario 2: Engineering Onboarding</p>
          <h2 className="heading-h2 text-[#FDFFFF]">
            Priya&apos;s first day
          </h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="rounded-xl bg-brand-800 border border-brand-700/30 p-6 h-full border-l-4 border-l-accent-coral">
              <Badge>Without aiCartograph</Badge>
              <div className="mt-4 space-y-3">
                {without.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent-coral font-mono text-xs font-bold mt-1 shrink-0">{i + 1}.</span>
                    <p className={`text-sm leading-relaxed ${i === without.length - 1 ? "text-accent-coral font-medium" : "text-brand-300"}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15}>
            <div className="rounded-xl bg-brand-800 border border-brand-500/30 p-6 h-full border-l-4 border-l-brand-500 shadow-lg shadow-brand-500/10">
              <Badge variant="highlight">With aiCartograph</Badge>
              <div className="mt-4 space-y-3">
                {withAC.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-brand-500 font-mono text-xs font-bold mt-1 shrink-0">{i + 1}.</span>
                    <p className={`text-sm leading-relaxed ${i === withAC.length - 1 ? "text-brand-400 font-medium" : "text-brand-300"}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll className="text-center mt-10">
          <p className="text-brand-400 font-medium text-lg">
            Knowledge resolution isn&apos;t just for support — it&apos;s for every team.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

/* ─── Section 4: Behind the Scenes (LIGHT) ─── */
function BehindTheScenes() {
  return (
    <section className="section-light py-16 lg:py-20">
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <p className="section-label mb-4">Under the Hood</p>
          <h2 className="heading-h2 text-brand-900">
            What happens behind the scenes
          </h2>
          <p className="text-brand-700 text-lg max-w-2xl mx-auto mt-3">
            When someone asks a question, here&apos;s what aiCartograph does — in real time.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <FlowDiagram className="max-w-4xl mx-auto" />
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
          {[
            { title: "Semantic Search", desc: "Vector embeddings for meaning-based retrieval across your entire corpus." },
            { title: "RAG Pipeline", desc: "Retrieval-augmented generation for grounded answers with source attribution." },
            { title: "Consumption Signals", desc: "ML-driven signal processing to turn patterns into actionable priorities." },
            { title: "Real-time Sync", desc: "Event-driven updates so your resolution layer is always current." },
          ].map((tech, i) => (
            <AnimateOnScroll key={tech.title} delay={i * 0.1}>
              <div className="card-surface rounded-xl p-5 h-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                <h3 className="heading-h3 text-brand-900 mb-2 text-base">{tech.title}</h3>
                <p className="text-brand-700 text-sm leading-relaxed">{tech.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <HIWHero />
      <SectionDivider variant="rich" />
      <SarahStory />
      <SectionDivider variant="gradient" />
      <DevStory />
      <SectionDivider variant="rich" />
      <BehindTheScenes />
      <SectionDivider variant="gradient" />
      <CTABanner
        headline="See resolution in action"
        subheadline="Schedule a 30-minute conversation and we'll show you what knowledge resolution looks like for your team."
      />
    </>
  );
}
