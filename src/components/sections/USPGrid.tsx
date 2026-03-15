"use client";

import AnimateOnScroll from "../AnimateOnScroll";
import Card from "../ui/Card";
import Container from "../ui/Container";
import { USPIcon } from "../graphics/USPIcons";
import { DIFFERENTIATORS } from "@/lib/constants";

const uspAccents = [
  "border-accent-emerald/20 hover:border-accent-emerald/40",
  "border-accent-coral/20 hover:border-accent-coral/40",
  "border-accent-sky/20 hover:border-accent-sky/40",
  "border-accent-lavender/20 hover:border-accent-lavender/40",
  "border-accent-amber/20 hover:border-accent-amber/40",
  "border-accent-sky/20 hover:border-accent-sky/40",
];

const uspGlows = [
  "bg-accent-emerald/5",
  "bg-accent-coral/5",
  "bg-accent-sky/5",
  "bg-accent-lavender/5",
  "bg-accent-amber/5",
  "bg-accent-sky/5",
];

export default function USPGrid() {
  return (
    <section className="py-16 lg:py-20 relative">
      <Container>
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Four things nobody else does
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">
            aiCartograph isn&apos;t another search tool or knowledge base. We built four
            capabilities that don&apos;t exist anywhere else.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 gap-5">
          {DIFFERENTIATORS.map((diff, i) => (
            <AnimateOnScroll key={diff.id} delay={i * 0.1}>
              <Card className={`h-full space-y-4 group transition-all duration-300 hover:scale-[1.01] ${uspAccents[i % uspAccents.length]}`}>
                <div className={`w-14 h-14 rounded-2xl ${uspGlows[i % uspGlows.length]} flex items-center justify-center`}>
                  <USPIcon icon={diff.icon} className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-white">{diff.title}</h3>
                <p className="text-white/45 leading-relaxed">
                  {diff.description}
                </p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
