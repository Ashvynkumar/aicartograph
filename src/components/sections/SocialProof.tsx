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
            setCount(progress >= 1 ? target : Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-5xl sm:text-6xl font-bold tabular-nums text-brand-500">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function SocialProof() {
  const stats = [
    { value: 18, suffix: "", label: "Knowledge problems we diagnose" },
    { value: 6, suffix: "", label: "Organizational verticals served" },
    { value: 4, suffix: "", label: "Framework pillars" },
  ];

  return (
    <section className="py-12 lg:py-16 relative" style={{ background: "#0e2830" }}>
      <Container className="relative">
        <AnimateOnScroll className="text-center mb-8">
          <p className="section-label mb-4">By the numbers</p>
          <h2 className="heading-h2 text-[#FDFFFF]">
            The full knowledge lifecycle, resolved
          </h2>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto min-h-[200px]">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={i} delay={i * 0.15}>
              <div className="dark-card rounded-xl p-8">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-white/50 mt-2 text-sm">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
