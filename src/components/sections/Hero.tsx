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
    <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-16 section-dark">
      <AbstractPattern className="opacity-50" />

      {/* Multi-color gradient orbs — full palette */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-400/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-accent-amber/[0.04] rounded-full blur-3xl animate-glow-breathe" />
      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-accent-lavender/[0.03] rounded-full blur-3xl animate-glow-breathe" style={{ animationDelay: "2s" }} />
      <div className="absolute top-2/3 right-1/4 w-40 h-40 bg-accent-emerald/[0.03] rounded-full blur-3xl animate-glow-breathe" style={{ animationDelay: "4s" }} />

      <Container className="relative z-10 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          {/* Logo + compass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Image
              src="/aiCartograph_logo_final_dark.svg"
              alt="aiCartograph"
              width={310}
              height={55}
              className="h-12 sm:h-14 w-auto"
              priority
            />
            <motion.div className="animate-float">
              <CompassIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
          </motion.div>

          <p className="text-brand-300 text-sm tracking-wide">
            {SITE.tagline}
          </p>

          <h1 className="heading-h1 text-[#FDFFFF]">
            Every answer. Everywhere.
            <br />
            <span className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
              The moment it matters.
            </span>
          </h1>

          <p className="text-lg text-brand-300 max-w-2xl mx-auto leading-relaxed">
            {SITE.mission}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center pt-2">
            <div className="w-full sm:w-auto sm:min-w-[360px]">
              <EmailCapture
                variant="inline"
                placeholder="Your work email"
                buttonText="Request Early Access"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
