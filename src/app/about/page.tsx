import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cartograph is building the Knowledge Resolution category. Founded to make documentation work at the point of consumption.",
};

const values = [
  {
    title: "Resolution over retrieval",
    description:
      "Finding a document isn't the same as resolving a question. We measure success by outcomes, not search results.",
  },
  {
    title: "Consumption-first thinking",
    description:
      "Every feature we build starts with the person trying to get an answer — not the person who wrote the doc.",
  },
  {
    title: "Feedback is fuel",
    description:
      "Every unresolved question is a signal. We turn consumption failures into creation priorities.",
  },
  {
    title: "Integrate, don't replace",
    description:
      "Your documentation stack exists for good reasons. We make it work better, not replace it.",
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

      {/* Mission */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            <AnimateOnScroll>
              <blockquote className="text-2xl sm:text-3xl font-medium text-white leading-relaxed border-l-2 border-brand-500 pl-8">
                &ldquo;The value of documentation should be measured at the point of consumption,
                not at the point of creation.&rdquo;
              </blockquote>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="space-y-6 text-white/60 leading-relaxed text-lg">
                <p>
                  Every SaaS company has documentation. Help articles, internal wikis,
                  product guides, API references, onboarding flows. The content exists.
                </p>
                <p>
                  But documentation is broken. Not because it isn&apos;t written — because it
                  doesn&apos;t <span className="text-white font-medium">resolve</span>. Users
                  can&apos;t find what they need. Support tickets pile up. Engineers get interrupted.
                  New hires hit walls. The same questions get asked again and again.
                </p>
                <p>
                  The industry has tools for creating docs. Tools for searching them. Tools for
                  deflecting support tickets. But nobody has built the layer that makes
                  documentation actually work at the point of need.
                </p>
                <p className="text-white font-medium">
                  That&apos;s what Cartograph does. We&apos;re building the Knowledge Resolution
                  Platform.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* The Gap */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <AnimateOnScroll className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              The gap nobody owns
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Documentation platforms create. Knowledge management tools search.
              Support AI deflects. But nobody{" "}
              <span className="text-brand-400">resolves</span>. Nobody closes the loop
              from consumption back to creation. Nobody measures whether documentation
              actually works.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Cartograph sits in this gap. We connect consumption to creation, detect
              documentation health issues before users hit them, synthesize answers across
              sources, and deliver knowledge proactively — right inside your product.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Founder */}
      <section className="py-24 border-t border-white/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Founded by Ashvyn Kumar
              </h2>
              <div className="space-y-6 text-white/60 leading-relaxed text-lg">
                <p>
                  Ashvyn (Atlas) founded Cartograph after years of watching the same
                  pattern play out across SaaS companies: teams invest heavily in creating
                  documentation, but the people who need it most still can&apos;t find answers.
                </p>
                <p>
                  The problem isn&apos;t content creation — it&apos;s knowledge resolution.
                  Cartograph was built to fix that fundamental disconnect.
                </p>
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
        subheadline="We're just getting started. Let's talk about what knowledge resolution can do for your team."
      />
    </>
  );
}
