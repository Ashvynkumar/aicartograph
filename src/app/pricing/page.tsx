import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/sections/CTABanner";
import { PRICING_TIERS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for knowledge resolution. Start free, scale with credits, grow into a subscription.",
};

const faqs = [
  {
    q: "Can I try Cartograph for free?",
    a: "Yes. Our freemium tier gives you access to core search and chat resolution with limited monthly resolutions. No credit card required.",
  },
  {
    q: "What counts as a resolution?",
    a: "A resolution is a successful answer to a user question, sourced from your connected documentation. Simple searches don't count — only synthesized answers.",
  },
  {
    q: "Can I mix subscription and usage-based pricing?",
    a: "Absolutely. All subscription tiers include a resolution allowance. Additional resolutions are billed at $0.30–$0.75 each depending on complexity.",
  },
  {
    q: "What's the minimum commitment?",
    a: "Monthly plans with no minimum commitment. Annual plans available at a 20% discount.",
  },
  {
    q: "Do you offer discounts for startups?",
    a: "Yes. Qualified startups (under $5M ARR) get 50% off for the first year. Contact us for details.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -translate-x-1/2" />
        <Container className="relative text-center">
          <AnimateOnScroll className="space-y-6 max-w-3xl mx-auto">
            <Badge variant="highlight">Pricing</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Start free. Scale with usage. Grow into full platform access.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier, i) => (
              <AnimateOnScroll key={tier.name} delay={i * 0.1}>
                <Card highlighted={tier.highlighted} className="h-full flex flex-col">
                  {tier.highlighted && (
                    <Badge variant="highlight" >Most Popular</Badge>
                  )}
                  <div className={tier.highlighted ? "mt-4" : ""}>
                    <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                    <p className="text-white/40 text-sm mt-1">{tier.description}</p>
                  </div>

                  <div className="mt-6 mb-8">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-white/40 ml-1">{tier.unit}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
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
                        <span className="text-white/60 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={tier.name === "Enterprise" ? SITE.calendlyUrl : "#"}
                    variant={tier.highlighted ? "primary" : "secondary"}
                    className="w-full"
                    external={tier.name === "Enterprise"}
                  >
                    {tier.cta}
                  </Button>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Usage-based pricing */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Usage-based resolution pricing
              </h2>
              <p className="text-white/50 text-lg">
                Pay per resolution for additional usage beyond your plan&apos;s allowance.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <Card className="text-center space-y-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-white">$0.30</span>
                  <span className="text-white/40">–</span>
                  <span className="text-3xl font-bold text-white">$0.75</span>
                  <span className="text-white/40 ml-1">per resolution</span>
                </div>
                <p className="text-white/50 max-w-md mx-auto">
                  Price varies by resolution complexity — simple lookups cost less,
                  multi-document synthesis costs more. Full transparency in your dashboard.
                </p>
              </Card>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Three-gear model */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <AnimateOnScroll className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              The three-gear model
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Start where you are. Scale when you&apos;re ready.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                gear: "Gear 1",
                title: "Freemium",
                purpose: "Adoption",
                description: "Try core features with limited resolutions. No credit card.",
              },
              {
                gear: "Gear 2",
                title: "Credits",
                purpose: "Conversion",
                description: "Buy resolution credits. Pay for what you use.",
              },
              {
                gear: "Gear 3",
                title: "Subscription",
                purpose: "Revenue",
                description: "Predictable pricing. Full platform. Maximum value.",
              },
            ].map((gear, i) => (
              <AnimateOnScroll key={gear.gear} delay={i * 0.1}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full border border-brand-500/30 bg-brand-500/5 flex items-center justify-center">
                    <span className="text-brand-400 font-mono text-sm font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold">{gear.title}</h3>
                  <p className="text-brand-400 text-sm font-medium">{gear.purpose}</p>
                  <p className="text-white/40 text-sm">{gear.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <AnimateOnScroll className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently asked questions
            </h2>
          </AnimateOnScroll>

          <div className="max-w-2xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <div className="border-b border-white/5 pb-6">
                  <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Ready to get started?"
        subheadline="Start free or book a call to see the full platform."
      />
    </>
  );
}
