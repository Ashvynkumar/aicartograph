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
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.03] to-transparent" />
      <Container className="relative">
        <AnimateOnScroll>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 sm:p-16 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {headline}
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {subheadline}
            </p>
            <div className="max-w-md mx-auto">
              <EmailCapture variant="inline" buttonText="Request Early Access" />
            </div>
            <div>
              <Button href={SITE.calendlyUrl} variant="ghost" size="sm" external>
                Or schedule a conversation &rarr;
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
