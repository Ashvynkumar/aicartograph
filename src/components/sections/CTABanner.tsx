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
    <section className="py-10 lg:py-12 relative" style={{ background: "#071319" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(69,151,176,0.06) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(155,140,232,0.03) 0%, transparent 40%), radial-gradient(ellipse at 70% 20%, rgba(240,180,41,0.02) 0%, transparent 40%)" }} />
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
