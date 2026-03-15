import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
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

const hiringRoles = [
  { title: "CTO", description: "Technical vision and architecture leadership for a knowledge-first platform." },
  { title: "Head of AI/ML", description: "Build the resolution engine \u2014 retrieval, synthesis, and continuous learning." },
  { title: "Head of Product", description: "Shape the product roadmap and translate customer needs into platform features." },
  { title: "Head of Engineering", description: "Scale the engineering team and ship reliable, performant infrastructure." },
  { title: "Senior Engineer (Backend)", description: "Design and build the core resolution pipeline and data layer." },
  { title: "Senior Engineer (Frontend)", description: "Craft the platform experience \u2014 dashboards, editors, and resolution interfaces." },
  { title: "Head of Customer Success", description: "Ensure every customer gets measurable value from knowledge resolution." },
  { title: "Head of Growth", description: "Drive adoption, positioning, and category awareness for Knowledge Resolution." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 relative" style={{ background: "#0c2329" }}>
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

      <div className="glow-divider" />

      {/* Vision + Mission */}
      <section className="py-12 lg:py-16" style={{ background: "#0e2830" }}>
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            <AnimateOnScroll>
              <div className="space-y-3">
                <p className="section-label">Vision</p>
                <h2 className="heading-h2 text-[#FDFFFF]" style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}>
                  {SITE.vision}
                </h2>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="space-y-3">
                <p className="section-label">Mission</p>
                <blockquote className="text-xl sm:text-2xl text-brand-300 leading-relaxed border-l-4 border-brand-500 pl-6" style={{ fontFamily: "var(--font-serif)" }}>
                  {SITE.mission}
                </blockquote>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <div className="glow-divider" />

      {/* Brand Origin */}
      <section className="py-12 lg:py-16" style={{ background: "#0c2329" }}>
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

      <div className="glow-divider" />

      {/* Foundational Layer — Six Verticals */}
      <section className="py-12 lg:py-16" style={{ background: "#0e2830" }}>
        <Container>
          <AnimateOnScroll className="text-center mb-8">
            <p className="section-label mb-4">Foundational Layer</p>
            <h2 className="heading-h2 text-[#FDFFFF] mb-3">
              Wherever knowledge flows
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Wherever teams create knowledge and others consume it, aiCartograph
              ensures it resolves.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto min-h-[200px]">
            {SIX_VERTICALS.map((vertical, i) => (
              <AnimateOnScroll key={vertical.name} delay={i * 0.08}>
                <div className={`dark-card p-6 h-full ${verticalColors[i]}`}>
                  <h3 className="heading-h3 text-[#FDFFFF] mb-2 text-base">{vertical.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed break-words">
                    {vertical.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <div className="glow-divider" />

      {/* Team */}
      <section className="py-12 lg:py-16" style={{ background: "#0c2329" }}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll className="space-y-8">
              <h2 className="heading-h2 text-[#FDFFFF]">The team</h2>

              {/* Founder */}
              <div className="dark-card p-6 border-l-4 border-l-accent-amber max-w-2xl">
                <h3 className="text-[#FDFFFF] font-semibold text-lg mb-1">Atlas</h3>
                <p className="text-accent-amber text-sm mb-3">Founder &amp; CEO</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Founded aiCartograph after seeing the same pattern across SaaS companies:
                  organizations invest in creating knowledge, but the people who need it
                  most still can&apos;t get answers.
                </p>
              </div>

              {/* Hiring roles */}
              <div className="space-y-4">
                <h3 className="text-[#FDFFFF] font-semibold text-lg">The Team We&apos;re Building</h3>
                <p className="text-white/40 text-sm">We&apos;re assembling a world-class team to build the Knowledge Resolution category.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {hiringRoles.map((role) => (
                    <div key={role.title} className="dark-card p-4 relative">
                      <div className="absolute top-3 right-3">
                        <span className="text-[9px] font-medium text-accent-emerald bg-accent-emerald/10 px-1.5 py-0.5 rounded-full">
                          Hiring
                        </span>
                      </div>
                      <h4 className="text-[#FDFFFF] font-semibold text-sm mb-1">{role.title}</h4>
                      <p className="text-white/40 text-xs leading-relaxed break-words">{role.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <div className="glow-divider" />

      {/* Operating Principles */}
      <section className="py-12 lg:py-16" style={{ background: "#0e2830" }}>
        <Container>
          <AnimateOnScroll className="text-center mb-8">
            <p className="section-label mb-4">How We Think</p>
            <h2 className="heading-h2 text-[#FDFFFF]">
              Operating principles
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto min-h-[200px]">
            {principles.map((p, i) => (
              <AnimateOnScroll key={p.title} delay={i * 0.1} className={i === principles.length - 1 ? "sm:col-span-2 sm:max-w-md sm:mx-auto" : ""}>
                <div className={`dark-card p-6 ${p.border}`}>
                  <h3 className="heading-h3 text-[#FDFFFF] mb-2 text-base">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed break-words">{p.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <div className="glow-divider" />

      <CTABanner
        headline="Join us in building this category"
        subheadline="We&apos;re just getting started. Let&apos;s talk about what knowledge resolution can do for your organization."
      />
    </>
  );
}
