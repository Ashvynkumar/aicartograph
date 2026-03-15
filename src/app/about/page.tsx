import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
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
      {/* Hero */}
      <section className="pt-28 pb-16 relative" style={{ background: "#071319" }}>
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl" />
        <Container className="relative">
          <AnimateOnScroll className="max-w-3xl space-y-5">
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
      <section className="py-12 lg:py-16" style={{ background: "#091e26" }}>
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
      <section className="py-12 lg:py-16" style={{ background: "#071319" }}>
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
      <section className="py-12 lg:py-16 relative" style={{ background: "#091e26" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(69,151,176,0.06) 0%, transparent 50%)" }} />
        <Container className="relative">
          <AnimateOnScroll className="text-center mb-10">
            <p className="section-label mb-4" style={{ color: "#56b3f5" }}>Foundational Layer</p>
            <h2 className="heading-h2 text-[#FDFFFF] mb-3">
              Wherever knowledge flows
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Wherever teams create knowledge and others consume it, aiCartograph
              ensures it resolves.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto min-h-[200px]">
            {SIX_VERTICALS.map((vertical, i) => {
              const colors = ["#56b3f5", "#f06565", "#f0b429", "#36c08e", "#9b8ce8", "#e07c4f"];
              const color = colors[i];
              const icons = ["⚡", "🎯", "📈", "👥", "⚖️", "🔒"];
              return (
                <AnimateOnScroll key={vertical.name} delay={i * 0.08}>
                  <div className="relative rounded-xl p-5 h-full group transition-all duration-300 hover:scale-[1.02]" style={{ background: `linear-gradient(145deg, ${color}0A, transparent 70%)`, border: `1px solid ${color}18` }}>
                    <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-xl" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">{icons[i]}</span>
                      <div>
                        <h3 className="font-semibold text-[#FDFFFF] mb-1.5 text-base" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}>{vertical.name}</h3>
                        <p className="text-white/55 text-sm leading-relaxed break-words">
                          {vertical.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      <div className="glow-divider" />

      {/* Team */}
      <section className="py-12 lg:py-16" style={{ background: "#071319" }}>
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

            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <div className="glow-divider" />

      {/* Operating Principles */}
      <section className="py-12 lg:py-16 relative" style={{ background: "#091e26" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(240,180,41,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(155,140,232,0.03) 0%, transparent 50%)" }} />
        <Container className="relative">
          <AnimateOnScroll className="text-center mb-10">
            <p className="section-label mb-4" style={{ color: "#f0b429" }}>How We Think</p>
            <h2 className="heading-h2 text-[#FDFFFF]">
              Operating principles
            </h2>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto space-y-4 min-h-[200px]">
            {principles.map((p, i) => {
              const colors = ["#56b3f5", "#f0b429", "#36c08e", "#9b8ce8", "#f06565"];
              const color = colors[i];
              const numbers = ["01", "02", "03", "04", "05"];
              return (
                <AnimateOnScroll key={p.title} delay={i * 0.08}>
                  <div className="flex items-start gap-5 group">
                    <div className="shrink-0 mt-1">
                      <span className="block w-10 h-10 rounded-xl text-sm font-bold flex items-center justify-center" style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
                        {numbers[i]}
                      </span>
                    </div>
                    <div className="flex-1 pb-4" style={{ borderBottom: `1px solid ${color}12` }}>
                      <h3 className="font-semibold text-[#FDFFFF] mb-1.5 text-base">{p.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed break-words">{p.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
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
