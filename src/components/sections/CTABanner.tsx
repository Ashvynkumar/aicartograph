"use client";

import AnimateOnScroll from "../AnimateOnScroll";
import Container from "../ui/Container";
import EmailCapture from "../EmailCapture";
import Button from "../ui/Button";
import { SITE } from "@/lib/constants";

interface CTABannerProps {
  headline?: string;
  subheadline?: string;
}

export default function CTABanner({
  headline = "Ready to make your knowledge actually work?",
  subheadline = "Every answer. Everywhere. The moment it matters.",
}: CTABannerProps) {
  return (
    <section className="section-dark py-10 lg:py-12 relative">
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="w-full sm:w-auto max-w-xs">
                <EmailCapture variant="inline" buttonText="Request Early Access" />
              </div>
              <Button href={SITE.calendlyUrl} variant="secondary" size="md" external>
                Schedule a Conversation &rarr;
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
