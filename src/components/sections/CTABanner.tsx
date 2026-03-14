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
    <section className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.03] to-transparent" />
      <Container className="relative">
        <AnimateOnScroll>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-brand-500/[0.03] px-8 py-10 sm:px-12 sm:py-12 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {headline}
            </h2>
            <p className="text-white/50 text-base max-w-lg mx-auto">
              {subheadline}
            </p>
            <div className="max-w-sm mx-auto">
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
