"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import EmailCapture from "../EmailCapture";
import Button from "../ui/Button";
import Container from "../ui/Container";
import AbstractPattern from "../graphics/AbstractPattern";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <AbstractPattern className="opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl" />

      <Container className="relative z-10 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <Image
              src="/aiCartograph_logo_final_dark.svg"
              alt="aiCartograph"
              width={310}
              height={55}
              className="h-12 sm:h-14 w-auto"
              priority
            />
          </motion.div>

          <p className="text-brand-400 font-medium text-lg tracking-wide">
            {SITE.tagline}
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            <span className="text-white">Every answer. Everywhere.</span>
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              The moment it matters.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            {SITE.mission}
          </p>

          <div className="max-w-md mx-auto">
            <EmailCapture
              variant="inline"
              placeholder="Your work email"
              buttonText="Request Early Access"
            />
          </div>

          <div className="flex items-center justify-center gap-6 pt-2">
            <Button href={SITE.calendlyUrl} variant="ghost" size="sm" external>
              Schedule a conversation &rarr;
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
