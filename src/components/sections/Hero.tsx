"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import EmailCapture from "../EmailCapture";
import Button from "../ui/Button";
import Container from "../ui/Container";
import AbstractPattern from "../graphics/AbstractPattern";
import { CompassIcon } from "../graphics/FancyIcons";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      <AbstractPattern className="opacity-50" />

      {/* Multi-color gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-400/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-accent-amber/[0.04] rounded-full blur-3xl animate-glow-breathe" />
      <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-accent-lavender/[0.03] rounded-full blur-3xl animate-glow-breathe" style={{ animationDelay: "2s" }} />

      <Container className="relative z-10 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          {/* Animated logo with compass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Image
              src="/aiCartograph_logo_final_dark.svg"
              alt="aiCartograph"
              width={310}
              height={55}
              className="h-12 sm:h-14 w-auto"
              priority
            />
            <motion.div
              className="animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <CompassIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
          </motion.div>

          <motion.p
            className="text-brand-400 font-medium text-base tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {SITE.tagline}
          </motion.p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            <span className="text-white">Every answer. Everywhere.</span>
            <br />
            <span className="bg-gradient-to-r from-brand-400 via-accent-sky to-brand-300 bg-clip-text text-transparent">
              The moment it matters.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">
            {SITE.mission}
          </p>

          <div className="max-w-md mx-auto pt-2">
            <EmailCapture
              variant="inline"
              placeholder="Your work email"
              buttonText="Request Early Access"
            />
          </div>

          <div className="flex items-center justify-center gap-6">
            <Button href={SITE.calendlyUrl} variant="ghost" size="sm" external>
              Schedule a conversation &rarr;
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
