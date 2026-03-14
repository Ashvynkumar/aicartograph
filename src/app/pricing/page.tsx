import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";
import CTABanner from "@/components/sections/CTABanner";
import { PRICING_TIERS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for knowledge resolution. Start free. Scale with value. Base org subscription plus per-user for active resolution.",
};

const faqs = [
  {
    q: "Can I try aiCartograph for free?",
    a: "Yes. The Free tier gives you access to basic search and chat resolution with up to 50 knowledge sources and 100 queries per month. No credit card required.",
  },
  {
    q: "How does the hybrid pricing work?",
    a: "Each paid tier has a base organization subscription (for infrastructure and platform access) plus a per-user fee for active resolution users. This keeps costs predictable while scaling with your team.",
  },
  {
    q: "What counts as an active user?",
    a: "Any team member who uses aiCartograph to resolve a question in a given billing period. Read-only dashboard viewers don't count.",
  },
  {
    q: "What about customer-facing deployments?",
    a: "For customer-facing use cases where your end users interact with aiCartograph, we offer usage-based pricing at $0.30–$0.75 per resolution. Volume discounts available.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes. Annual plans are available at a 20% discount on the base subscription. Contact us for details.",
  },
];

const tierAccents = [
  "border-accent-emerald/20 hover:border-accent-emerald/30",
  "border-accent-sky/20 hover:border-accent-sky/30",
  "",
  "border-accent-amber/20 hover:border-accent-amber/30",
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 relative">
        <div className="absolute top-0 left-1/2 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl -translate-x-1/2" />
        <Container className="relative text-center">
          <AnimateOnScroll className="space-y-5 max-w-3xl mx-auto">
            <Badge variant="highlight">Pricing</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] whitespace-nowrap">
              Start free. Scale with value.
            </h1>
            <p className="text-xl text-white/55 leading-relaxed">
              Base organization subscription + per-user for active resolution.
              Transparent at every scale.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      <SectionDivider variant="rich" />

      {/* Pricing Cards */}
      <section className="py-10">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {PRICING_TIERS.map((tier, i) => (
              <AnimateOnScroll key={tier.name} delay={i * 0.1}>
                <Card highlighted={tier.highlighted} className={`h-full flex flex-col ${!tier.highlighted ? tierAccents[i] : ""}`}>
                  {tier.highlighted && (
                    <Badge variant="highlight">Most Popular</Badge>
                  )}
                  <div className={tier.highlighted ? "mt-3" : ""}>
                    <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                    <p className="text-white/40 text-sm mt-1">{tier.description}</p>
                  </div>

                  <div className="mt-5 mb-2">
                    {tier.basePrice === null ? (
                      <span className="text-3xl font-bold text-white">Custom</span>
                    ) : tier.basePrice === 0 ? (
                      <span className="text-3xl font-bold text-white">$0</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-white">
                          ${tier.basePrice}
                        </span>
                        <span className="text-white/40 ml-1">{tier.unit}</span>
                      </>
                    )}
                  </div>
                  {tier.perUser > 0 && (
                    <p className="text-brand-400 text-sm mb-5">
                      + ${tier.perUser}/active user{tier.unit}
                    </p>
                  )}
                  {tier.perUser === 0 && <div className="mb-5" />}

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <svg
                          className="w-4 h-4 text-brand-500 mt-0.5 shrink-0"
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
                        <span className="text-white/55 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={
                      tier.name === "Enterprise"
                        ? SITE.calendlyUrl
                        : "#"
                    }
                    variant={tier.highlighted ? "primary" : "secondary"}
                    size="md"
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

      <SectionDivider variant="gradient" />

      {/* Usage-based pricing */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">
                Customer-facing resolution pricing
              </h2>
              <p className="text-white/45 text-lg">
                For deployments where your end users interact with aiCartograph directly.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <Card className="text-center space-y-4 border-accent-amber/20">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-white">$0.30</span>
                  <span className="text-white/40">–</span>
                  <span className="text-3xl font-bold text-white">$0.75</span>
                  <span className="text-white/40 ml-1">per resolution</span>
                </div>
                <p className="text-white/45 max-w-md mx-auto text-sm">
                  Price varies by resolution complexity — simple lookups cost less,
                  cross-source synthesis costs more. Volume discounts available.
                </p>
              </Card>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <SectionDivider variant="rich" />

      {/* FAQ */}
      <section className="py-16 lg:py-20 relative">
        <Container className="relative">
          <AnimateOnScroll className="text-center mb-12">
            <Badge variant="highlight">FAQ</Badge>
            <h2 className="text-3xl font-bold text-white mt-4 mb-3">
              Frequently asked questions
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              Everything you need to know about pricing and plans.
            </p>
          </AnimateOnScroll>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5 hover:border-white/15 transition-colors">
                  <h3 className="text-white font-medium mb-2 text-sm">{faq.q}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Ready to get started?"
        subheadline="Start free or schedule a conversation to see the full platform."
      />
    </>
  );
}
