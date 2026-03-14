import Hero from "@/components/sections/Hero";
import USPGrid from "@/components/sections/USPGrid";
import SocialProof from "@/components/sections/SocialProof";
import CTABanner from "@/components/sections/CTABanner";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import { COMPETITORS } from "@/lib/constants";

function ProblemStatement() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <Container>
        <AnimateOnScroll className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Documentation is broken
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            Not because it doesn&apos;t exist — because it doesn&apos;t{" "}
            <span className="text-brand-400 font-medium">resolve</span>.
            Teams create more docs every day, but users still can&apos;t find answers.
            Support tickets keep climbing. Knowledge stays locked in silos.
          </p>
          <p className="text-lg text-white/40">
            The value of documentation should be measured at the point of consumption,
            not at the point of creation.
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
            We&apos;re not a docs platform. We&apos;re not a search tool.
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              We&apos;re the resolution layer.
            </span>
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {COMPETITORS.map((c, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
                  <p className="text-white/70 font-medium">{c.name}</p>
                  <p className="text-white/40 text-sm">{c.role}</p>
                  <div className="h-px bg-white/10" />
                  <p className="text-brand-400 text-sm font-medium">{c.gap}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Cartograph sits in the gap between documentation platforms, knowledge management
              tools, and support AI. Nobody owns Knowledge Resolution as a category — until now.
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
      <ProblemStatement />
      <USPGrid />
      <SocialProof />
      <CategoryCreation />
      <CTABanner />
    </>
  );
}
