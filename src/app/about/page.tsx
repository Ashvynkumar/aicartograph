import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import CTABanner from "@/components/sections/CTABanner";
import { SITE, SIX_VERTICALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "aiCartograph is building the Knowledge Resolution category. Every answer. Everywhere. The moment it matters.",
};

const values = [
  {
    title: "Resolution over retrieval",
    description:
      "Finding knowledge isn't the same as resolving a question. We measure success by outcomes, not search results.",
  },
  {
    title: "Consumption-first thinking",
    description:
      "Every feature starts with the person trying to get an answer — not the person who created the knowledge.",
  },
  {
    title: "Feedback is fuel",
    description:
      "Every unresolved question is a consumption signal. We turn resolution failures into creation priorities.",
  },
  {
    title: "Integrate, don't replace",
    description:
      "Your knowledge stack exists for good reasons. We make it work better, not replace it.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <Container className="relative">
          <AnimateOnScroll className="max-w-3xl space-y-6">
            <Badge variant="highlight">About</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
              Building the Knowledge
              <br />
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                Resolution category
              </span>
            </h1>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Vision + Mission */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto space-y-16">
            <AnimateOnScroll>
              <div className="space-y-4">
                <p className="text-brand-400 font-medium text-sm tracking-wide uppercase">Vision</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  {SITE.vision}
                </h2>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="space-y-4">
                <p className="text-brand-400 font-medium text-sm tracking-wide uppercase">Mission</p>
                <blockquote className="text-xl sm:text-2xl text-white/80 leading-relaxed border-l-2 border-brand-500 pl-8">
                  {SITE.mission}
                </blockquote>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Brand Origin */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            <AnimateOnScroll>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Why &ldquo;aiCartograph&rdquo;?
              </h2>
              <blockquote className="text-xl text-white/60 leading-relaxed border-l-2 border-brand-400 pl-8">
                {SITE.brandOrigin}
              </blockquote>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="space-y-6 text-white/60 leading-relaxed text-lg">
                <p>
                  Every organization has knowledge. Help articles, internal wikis,
                  product guides, runbooks, training materials, tribal expertise captured
                  in communication threads. The knowledge exists.
                </p>
                <p>
                  But knowledge is broken. Not because it isn&apos;t created — because it
                  doesn&apos;t <span className="text-white font-medium">resolve</span>. People
                  can&apos;t find what they need. Support load keeps climbing. Engineers get interrupted.
                  New hires hit walls. The same questions get asked again and again.
                </p>
                <p>
                  The industry has tools for creating knowledge. Tools for storing it. Tools for
                  searching it. But nobody has built the layer that makes
                  knowledge actually work at the point of need.
                </p>
                <p className="text-white font-medium">
                  That&apos;s what aiCartograph does. We&apos;re building the Knowledge Resolution
                  Platform.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Six Verticals */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <AnimateOnScroll className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Wherever knowledge flows
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Wherever teams create knowledge and others consume it, aiCartograph
              ensures it resolves.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {SIX_VERTICALS.map((vertical, i) => (
              <AnimateOnScroll key={vertical.name} delay={i * 0.08}>
                <Card className="h-full">
                  <h3 className="text-white font-semibold mb-2">{vertical.name}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {vertical.description}
                  </p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                The team
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <Card>
                  <h3 className="text-white font-semibold text-lg mb-1">Atlas</h3>
                  <p className="text-brand-400 text-sm mb-4">Ashvyn Kumar &middot; Founder & CEO</p>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Founded aiCartograph after seeing the same pattern across SaaS companies:
                    organizations invest in creating knowledge, but the people who need it
                    most still can&apos;t get answers.
                  </p>
                </Card>
                <Card>
                  <h3 className="text-white font-semibold text-lg mb-1">Compass</h3>
                  <p className="text-brand-400 text-sm mb-4">AI Co-founder</p>
                  <p className="text-white/40 text-sm leading-relaxed">
                    AI partner in strategy, architecture, and execution — helping build
                    aiCartograph from founding blueprint to production platform.
                  </p>
                </Card>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <AnimateOnScroll className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What we believe
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <AnimateOnScroll key={value.title} delay={i * 0.1}>
                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-lg">{value.title}</h3>
                  <p className="text-white/40 leading-relaxed">{value.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Join us in building this category"
        subheadline="We're just getting started. Let's talk about what knowledge resolution can do for your organization."
      />
    </>
  );
}
