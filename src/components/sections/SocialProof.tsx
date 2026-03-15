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
    <div ref={ref} className="text-4xl sm:text-5xl font-bold tabular-nums text-brand-500">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function SocialProof() {
  const stats = [
    { value: 18, suffix: "", label: "Knowledge Gaps", color: "#f06565" },
    { value: 100, suffix: "+", label: "Integrations supported", color: "#f0b429" },
    { value: 6, suffix: "", label: "Differentiators", color: "#4597b0" },
    { value: 8, suffix: "", label: "Pre-built agents", color: "#9b8ce8" },
    { value: 6, suffix: "", label: "Verticals served", color: "#36c08e" },
    { value: 4, suffix: "", label: "Framework pillars", color: "#e07c4f" },
  ];

  return (
    <section className="py-12 lg:py-16 relative" style={{ background: "#091e26" }}>
      <Container className="relative">
        <AnimateOnScroll className="text-center mb-10">
          <p className="section-label mb-4">By the numbers</p>
          <h2 className="heading-h2 text-[#FDFFFF]">
            The full knowledge lifecycle, resolved
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center max-w-6xl mx-auto min-h-[160px]">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <div
                className="glass-card rounded-xl px-5 py-6 relative overflow-hidden transition-all duration-300 cursor-default"
                style={{ border: `1px solid rgba(255,255,255,0.06)` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${stat.color}40`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${stat.color}15, 0 4px 16px rgba(0,0,0,0.3)`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.background = `linear-gradient(160deg, ${stat.color}08, transparent)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "";
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}50, transparent)` }} />
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-white/50 mt-2 text-sm whitespace-nowrap">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
