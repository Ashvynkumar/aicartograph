"use client";

import { useEffect, useState, useRef } from "react";
import AnimateOnScroll from "../AnimateOnScroll";
import Container from "../ui/Container";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold tabular-nums bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

const statColors = ["border-accent-coral/15", "border-accent-amber/15", "border-accent-emerald/15"];

export default function SocialProof() {
  const stats = [
    { value: 18, suffix: "", label: "Knowledge problems we diagnose" },
    { value: 6, suffix: "", label: "Organizational verticals served" },
    { value: 4, suffix: "", label: "Framework pillars" },
  ];

  return (
    <section className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />
      <Container className="relative">
        <AnimateOnScroll className="text-center mb-12">
          <p className="text-brand-400 font-medium mb-3 text-sm tracking-wide uppercase">By the numbers</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            The full knowledge lifecycle, resolved
          </h2>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={i} delay={i * 0.15}>
              <div className={`rounded-2xl border bg-white/[0.02] p-6 ${statColors[i]}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-white/40 mt-2 text-sm">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
