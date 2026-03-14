import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";
import CTABanner from "@/components/sections/CTABanner";
import { PRICING_TIERS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for knowledge resolution. Start free. Scale with value.",
};

const tierHeaderColors = [
  "bg-brand-300 text-brand-900",     /* Free: #97c1cc */
  "bg-brand-600 text-white",         /* Starter: #49818d */
  "bg-brand-800 text-white",         /* Professional: #223e49 */
  "bg-brand-900 text-white",         /* Enterprise: #0c2329 */
];

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

export default function PricingPage() {
  return (
    <>
      {/* Hero (DARK) */}
      <section className="pt-28 pb-16 section-dark relative">
        <div className="absolute top-0 left-1/2 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl -translate-x-1/2" />
        <Container className="relative text-center">
          <AnimateOnScroll className="space-y-5 max-w-3xl mx-auto">
            <Badge variant="highlight">Pricing</Badge>
            <h1 className="heading-h1 text-[#FDFFFF]">
              Start free. Scale with value.
            </h1>
            <p className="text-xl text-brand-300 leading-relaxed">
              Base organization subscription + per-user for active resolution.
              Transparent at every scale.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      <SectionDivider variant="rich" />

      {/* Pricing Cards (LIGHT) */}
      <section className="section-light py-16 lg:py-20">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {PRICING_TIERS.map((tier, i) => (
              <AnimateOnScroll key={tier.name} delay={i * 0.1}>
                <div className={`card-surface rounded-xl overflow-hidden h-full flex flex-col hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ${tier.highlighted ? "ring-2 ring-brand-500 shadow-lg shadow-brand-500/10" : ""}`}>
                  {/* Colored tier header */}
                  <div className={`px-6 py-3 ${tierHeaderColors[i]}`}>
                    <h3 className="font-semibold text-lg">{tier.name}</h3>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-brand-700 text-sm mb-4">{tier.description}</p>

                    <div className="mb-1">
                      {tier.basePrice === null ? (
                        <span className="text-3xl font-bold text-brand-900">Custom</span>
                      ) : tier.basePrice === 0 ? (
                        <span className="text-3xl font-bold text-brand-900">$0</span>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-brand-900">${tier.basePrice}</span>
                          <span className="text-brand-700 ml-1">{tier.unit}</span>
                        </>
                      )}
                    </div>
                    {tier.perUser > 0 && (
                      <p className="text-brand-500 text-sm mb-4">
                        + ${tier.perUser}/active user{tier.unit}
                      </p>
                    )}
                    {tier.perUser === 0 && <div className="mb-4" />}

                    <ul className="space-y-2.5 mb-6 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 20 20">
                            <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-brand-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      href={tier.name === "Enterprise" ? SITE.calendlyUrl : "#"}
                      variant={tier.highlighted ? "primary" : "secondary"}
                      size="md"
                      className="w-full"
                      external={tier.name === "Enterprise"}
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider variant="gradient" />

      {/* Usage-based Pricing (DARK) */}
      <section className="section-dark py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll className="text-center mb-10">
              <p className="section-label mb-4">Customer-Facing</p>
              <h2 className="heading-h2 text-[#FDFFFF] mb-3">
                Customer-facing resolution pricing
              </h2>
              <p className="text-brand-300 text-lg">
                For deployments where your end users interact with aiCartograph directly.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="rounded-xl bg-brand-800 border border-brand-700/30 p-8 text-center space-y-4">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-[#FDFFFF]">$0.30</span>
                  <span className="text-brand-300">–</span>
                  <span className="text-3xl font-bold text-[#FDFFFF]">$0.75</span>
                  <span className="text-brand-300 ml-1">per resolution</span>
                </div>
                <p className="text-brand-300 max-w-md mx-auto text-sm">
                  Price varies by resolution complexity — simple lookups cost less,
                  cross-source synthesis costs more. Volume discounts available.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <SectionDivider variant="rich" />

      {/* FAQ (LIGHT) */}
      <section className="section-light py-16 lg:py-20">
        <Container className="relative">
          <AnimateOnScroll className="text-center mb-12">
            <Badge variant="highlight">FAQ</Badge>
            <h2 className="heading-h2 text-brand-900 mt-4 mb-3">
              Frequently asked questions
            </h2>
            <p className="text-brand-700 text-lg max-w-xl mx-auto">
              Everything you need to know about pricing and plans.
            </p>
          </AnimateOnScroll>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <div className="card-surface rounded-xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  <h3 className="text-brand-900 font-medium mb-2 text-sm">{faq.q}</h3>
                  <p className="text-brand-700 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider variant="gradient" />

      <CTABanner
        headline="Ready to get started?"
        subheadline="Start free or schedule a conversation to see the full platform."
      />
    </>
  );
}
