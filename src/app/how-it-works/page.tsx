import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import FlowDiagram from "@/components/graphics/FlowDiagram";
import CTABanner from "@/components/sections/CTABanner";
import { FRAMEWORK_PILLARS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Connect your knowledge sources, resolve questions with intelligence, detect health issues, and close the feedback loop — continuously.",
};

const stepDetails = [
  {
    details: [
      "Integrate wikis, help centers, knowledge bases, shared drives, and more",
      "Automatic content indexing and semantic embedding",
      "Real-time sync as knowledge is updated",
      "Respects existing access controls and permissions",
    ],
  },
  {
    details: [
      "Semantic understanding of intent, not just keywords",
      "Cross-source contextual synthesis",
      "Role and context awareness for personalized answers",
      "Confidence scoring and source attribution",
    ],
  },
  {
    details: [
      "Proactive staleness scoring tied to product changes",
      "Semantic contradiction analysis across sources",
      "Coverage gap identification",
      "Knowledge drift monitoring over time",
    ],
  },
  {
    details: [
      "Consumption failure tracking and routing",
      "Priority scoring for knowledge owners",
      "Content creation recommendations based on resolution data",
      "Continuous improvement of resolution rates",
    ],
  },
];

const sourceTypes = [
  "Wikis",
  "Help Centers",
  "Knowledge Bases",
  "Shared Drives",
  "Project Tools",
  "Communication Platforms",
  "Code Repositories",
  "CRM Systems",
  "Support Platforms",
];

const techHighlights = [
  {
    title: "Semantic Search",
    description: "Vector embeddings for meaning-based retrieval across your entire knowledge corpus.",
  },
  {
    title: "RAG Pipeline",
    description: "Retrieval-augmented generation for accurate, grounded answers with source attribution.",
  },
  {
    title: "Consumption Signals",
    description: "ML-driven signal processing to turn resolution patterns into actionable knowledge priorities.",
  },
  {
    title: "Real-time Sync",
    description: "Event-driven knowledge updates so your resolution layer is always current.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <Container className="relative">
          <AnimateOnScroll className="max-w-3xl space-y-6">
            <Badge variant="highlight">How It Works</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
              Four pillars.
              <br />
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                One continuous cycle.
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              Connect &rarr; Resolve &rarr; Detect &rarr; Close the Loop.
              Knowledge that improves every day.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Flow Diagram */}
      <section className="py-12 border-t border-white/5">
        <Container>
          <AnimateOnScroll>
            <FlowDiagram className="max-w-4xl mx-auto" />
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Detailed Steps */}
      <section className="py-24">
        <Container>
          <div className="space-y-24">
            {FRAMEWORK_PILLARS.map((pillar, i) => (
              <AnimateOnScroll key={pillar.id} delay={i * 0.1}>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                    <span className="text-brand-500 font-mono text-sm font-bold">
                      Pillar {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-lg">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {stepDetails[i].details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                      >
                        <svg
                          className="w-5 h-5 text-brand-500 mt-0.5 shrink-0"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M6 10l3 3 5-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-white/70">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Source Types */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <AnimateOnScroll className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Connects to your entire knowledge stack
            </h2>
            <p className="text-white/50 text-lg">
              No migration. No lock-in. Your knowledge stays where it is.
            </p>
          </AnimateOnScroll>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {sourceTypes.map((name, i) => (
              <AnimateOnScroll key={name} delay={i * 0.05}>
                <div className="rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-white/60 text-sm hover:border-brand-500/30 hover:text-white/80 transition-all">
                  {name}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Technical Credibility */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <AnimateOnScroll className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built on serious technology
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Modern AI infrastructure designed for accuracy, speed, and scale.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {techHighlights.map((tech, i) => (
              <AnimateOnScroll key={tech.title} delay={i * 0.1}>
                <Card>
                  <h3 className="text-white font-semibold mb-2">{tech.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="See resolution in action"
        subheadline="Schedule a 30-minute conversation and we'll show you what knowledge resolution looks like for your team."
      />
    </>
  );
}
