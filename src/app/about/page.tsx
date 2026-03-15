import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import SectionDivider from "@/components/ui/SectionDivider";
import CTABanner from "@/components/sections/CTABanner";
import { SITE, SIX_VERTICALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "aiCartograph is building the Knowledge Resolution category. Every answer. Everywhere. The moment it matters.",
};

const principles = [
  {
    title: "Resolution over retrieval.",
    description:
      "We don\u2019t celebrate finding information. We celebrate solving problems.",
    border: "border-l-4 border-accent-sky",
  },
  {
    title: "Consumption defines quality.",
    description:
      "Knowledge isn\u2019t good because it was written well. It\u2019s good because it resolved something.",
    border: "border-l-4 border-accent-amber",
  },
  {
    title: "The loop must close.",
    description:
      "Every unanswered question is a signal. Every signal must reach someone who can act on it.",
    border: "border-l-4 border-accent-emerald",
  },
  {
    title: "Knowledge neglected is knowledge lost.",
    description:
      "We treat organizational knowledge as a living asset \u2014 monitored, maintained, and accountable.",
    border: "border-l-4 border-accent-lavender",
  },
  {
    title: "Built for the one who needs the answer.",
    description:
      "Every decision prioritizes the consumer of knowledge, not the creator.",
    border: "border-l-4 border-accent-coral",
  },
];

const verticalColors = [
  "border-l-4 border-accent-sky",
  "border-l-4 border-accent-coral",
  "border-l-4 border-accent-amber",
  "border-l-4 border-accent-emerald",
  "border-l-4 border-accent-lavender",
  "border-l-4 border-accent-copper",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero (DARK) */}
      <section className="pt-28 pb-16 section-dark relative">
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl" />
        <Container className="relative">
          <AnimateOnScroll className="max-w-3xl space-y-5">
            <Badge variant="highlight">About</Badge>
            <h1 className="heading-h1 text-[#FDFFFF]">
              Building the Knowledge
              <br />
              <span className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
                Resolution category
              </span>
            </h1>
          </AnimateOnScroll>
        </Container>
      </section>

      <SectionDivider variant="rich" />

      {/* Vision + Mission (LIGHT) — LARGE typography */}
      <section className="section-light py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            <AnimateOnScroll>
              <div className="space-y-3">
                <p className="section-label">Vision</p>
                <h2 className="heading-h2 text-brand-900" style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}>
                  {SITE.vision}
                </h2>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="space-y-3">
                <p className="section-label">Mission</p>
                <blockquote className="text-xl sm:text-2xl text-brand-700 leading-relaxed border-l-4 border-brand-500 pl-6" style={{ fontFamily: "var(--font-serif)" }}>
                  {SITE.mission}
                </blockquote>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <SectionDivider variant="gradient" />

      {/* Brand Origin (DARK) */}
      <section className="section-dark py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10">
            <AnimateOnScroll>
              <h2 className="heading-h2 text-[#FDFFFF] mb-5">
                Why &ldquo;aiCartograph&rdquo;?
              </h2>
              <blockquote className="text-xl text-brand-300 leading-relaxed border-l-4 border-accent-amber pl-6" style={{ fontFamily: "var(--font-serif)" }}>
                {SITE.brandOrigin}
              </blockquote>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="space-y-5 text-brand-300 leading-relaxed text-lg">
                <p>
                  Every organization has knowledge. Help articles, internal wikis,
                  product guides, runbooks, training materials, tribal expertise captured
                  in communication threads. The knowledge exists.
                </p>
                <p>
                  But knowledge is broken. Not because it isn&apos;t created — because it
                  doesn&apos;t <span className="text-[#FDFFFF] font-medium">resolve</span>. People
                  can&apos;t find what they need. Support load keeps climbing. Engineers get interrupted.
                  New hires hit walls. The same questions get asked again and again.
                </p>
                <p>
                  The industry has tools for creating knowledge. Tools for storing it. Tools for
                  searching it. But nobody has built the layer that makes
                  knowledge actually work at the point of need.
                </p>
                <p className="text-[#FDFFFF] font-medium">
                  That&apos;s what aiCartograph does. We&apos;re building the Knowledge Resolution
                  Platform.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <SectionDivider variant="rich" />

      {/* Foundational Layer — Six Verticals (LIGHT) */}
      <section className="section-light py-12 lg:py-16">
        <Container>
          <AnimateOnScroll className="text-center mb-8">
            <p className="section-label mb-4">Foundational Layer</p>
            <h2 className="heading-h2 text-brand-900 mb-3">
              Wherever knowledge flows
            </h2>
            <p className="text-brand-700 text-lg max-w-2xl mx-auto">
              Wherever teams create knowledge and others consume it, aiCartograph
              ensures it resolves.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {SIX_VERTICALS.map((vertical, i) => (
              <AnimateOnScroll key={vertical.name} delay={i * 0.08}>
                <div className={`card-surface rounded-xl p-6 h-full ${verticalColors[i]} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}>
                  <h3 className="heading-h3 text-brand-900 mb-2 text-base">{vertical.name}</h3>
                  <p className="text-brand-700 text-sm leading-relaxed">
                    {vertical.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider variant="gradient" />

      {/* Team (DARK) */}
      <section className="section-dark py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll className="space-y-6">
              <h2 className="heading-h2 text-[#FDFFFF]">The team</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="rounded-xl bg-brand-800 border border-brand-700/30 p-6 border-l-4 border-l-accent-amber">
                  <h3 className="text-[#FDFFFF] font-semibold text-lg mb-1">Atlas</h3>
                  <p className="text-accent-amber text-sm mb-3">Founder & CEO</p>
                  <p className="text-brand-300 text-sm leading-relaxed">
                    Founded aiCartograph after seeing the same pattern across SaaS companies:
                    organizations invest in creating knowledge, but the people who need it
                    most still can&apos;t get answers.
                  </p>
                </div>
                <div className="rounded-xl bg-brand-800 border border-brand-700/30 p-6 border-l-4 border-l-accent-sky">
                  <h3 className="text-[#FDFFFF] font-semibold text-lg mb-1">Compass</h3>
                  <p className="text-accent-sky text-sm mb-3">AI Co-founder</p>
                  <p className="text-brand-300 text-sm leading-relaxed">
                    AI partner in strategy, architecture, and execution — helping build
                    aiCartograph from founding blueprint to production platform.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <SectionDivider variant="rich" />

      {/* Operating Principles (LIGHT) — renamed from "What we believe" */}
      <section className="section-light py-12 lg:py-16">
        <Container>
          <AnimateOnScroll className="text-center mb-8">
            <p className="section-label mb-4">How We Think</p>
            <h2 className="heading-h2 text-brand-900">
              Operating principles
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {principles.map((p, i) => (
              <AnimateOnScroll key={p.title} delay={i * 0.1} className={i === principles.length - 1 ? "sm:col-span-2 sm:max-w-md sm:mx-auto" : ""}>
                <div className={`card-surface rounded-xl p-6 ${p.border} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}>
                  <h3 className="heading-h3 text-brand-900 mb-2 text-base">{p.title}</h3>
                  <p className="text-brand-700 text-sm leading-relaxed">{p.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider variant="gradient" />

      <CTABanner
        headline="Join us in building this category"
        subheadline="We're just getting started. Let's talk about what knowledge resolution can do for your organization."
      />
    </>
  );
}
