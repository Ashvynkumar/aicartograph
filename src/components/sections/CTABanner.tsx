"use client";

import AnimateOnScroll from "../AnimateOnScroll";
import Container from "../ui/Container";
import EmailCapture from "../EmailCapture";

interface CTABannerProps {
  headline?: string;
  subheadline?: string;
}

export default function CTABanner({
  headline = "Ready to make your knowledge actually work?",
  subheadline = "Every answer. Everywhere. The moment it matters.",
}: CTABannerProps) {
  return (
    <section className="py-10 lg:py-12 relative" style={{ background: "#0c2329" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.03] to-transparent" />
      <Container className="relative">
        <AnimateOnScroll>
          <div className="text-center space-y-5 max-w-xl mx-auto">
            <h2 className="heading-h2 text-[#FDFFFF]">
              {headline}
            </h2>
            <p className="text-brand-300 text-base">
              {subheadline}
            </p>
            <div className="flex items-center justify-center">
              <div className="w-full sm:w-auto sm:min-w-[360px]">
                <EmailCapture variant="inline" buttonText="Request Early Access" />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
