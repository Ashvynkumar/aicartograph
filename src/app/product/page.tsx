import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { USPIcon } from "@/components/graphics/USPIcons";
import CTABanner from "@/components/sections/CTABanner";
import { USPS, CAPABILITIES, COMPETITORS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Discover how Cartograph resolves documentation — from feedback loops to cross-doc synthesis and in-product delivery.",
};

function ProductHero() {
  return (
    <section className="pt-32 pb-20 relative">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
      <Container className="relative">
        <AnimateOnScroll className="max-w-3xl space-y-6">
          <Badge variant="highlight">Product</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            What Cartograph does
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            Ten capability clusters. Four genuine USPs. One platform that makes your
            existing documentation actually resolve problems.
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

function CapabilityClusters() {
  return (
    <section className="py-24 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            10 Capability Clusters
          </h2>
          <p className="text-white/50 text-lg max-w-2xl">
            A comprehensive platform covering the full documentation lifecycle — from
            creation signals to consumption analytics.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap, i) => (
            <AnimateOnScroll key={cap.id} delay={i * 0.05}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <span className="text-brand-500 font-mono text-sm font-bold mt-0.5">
                    {cap.id}
                  </span>
                  <div>
                    <h3 className="text-white font-medium mb-1">{cap.name}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
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
            Four things nobody else does
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            These aren&apos;t incremental features. They&apos;re fundamental capabilities
            that define Knowledge Resolution as a category.
          </p>
        </AnimateOnScroll>

        <div className="space-y-20">
          {USPS.map((usp, i) => (
            <AnimateOnScroll key={usp.id} direction={i % 2 === 0 ? "left" : "right"}>
              <div
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
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
            Not docs. Not search. Not support AI.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Cartograph creates an entirely new category between existing tools.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {COMPETITORS.map((c, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <Card className="text-center space-y-4">
                <p className="text-white/70 font-semibold">{c.name}</p>
                <p className="text-white/40 text-sm">{c.role}</p>
                <div className="h-px bg-white/10" />
                <p className="text-red-400/70 text-sm">{c.gap}</p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="mt-12 text-center">
          <div className="inline-block rounded-2xl border border-brand-500/30 bg-brand-500/5 p-8 sm:p-10">
            <p className="text-brand-400 font-semibold text-lg mb-2">Cartograph</p>
            <p className="text-white/60">
              Resolves knowledge. Closes the feedback loop. Improves the source.
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
      <CapabilityClusters />
      <USPDeepDive />
      <CompetitivePositioning />
      <CTABanner
        headline="See Cartograph in action"
        subheadline="Book a demo to see how knowledge resolution works for your team."
      />
    </>
  );
}
