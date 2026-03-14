"use client";

import AnimateOnScroll from "../AnimateOnScroll";
import Card from "../ui/Card";
import Container from "../ui/Container";
import { USPIcon } from "../graphics/USPIcons";
import { USPS } from "@/lib/constants";

export default function USPGrid() {
  return (
    <section className="py-24 lg:py-32 relative">
      <Container>
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Four things nobody else does
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            aiCartograph isn&apos;t another search tool or knowledge base. We built four
            capabilities that don&apos;t exist anywhere else.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 gap-6">
          {USPS.map((usp, i) => (
            <AnimateOnScroll key={usp.id} delay={i * 0.1}>
              <Card className="h-full space-y-4">
                <USPIcon icon={usp.icon} className="w-12 h-12" />
                <h3 className="text-xl font-semibold text-white">{usp.title}</h3>
                <p className="text-white/50 leading-relaxed">
                  {usp.shortDescription}
                </p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
