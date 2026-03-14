"use client";

import { motion } from "framer-motion";
import HeroGraphic from "../graphics/HeroGraphic";
import EmailCapture from "../EmailCapture";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <Badge variant="highlight">Knowledge Resolution Platform</Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <span className="text-white">Make documentation </span>
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                actually work
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/60 max-w-lg leading-relaxed">
              {SITE.description} The resolution layer that sits between your docs
              and your people.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <EmailCapture
                variant="inline"
                placeholder="Your work email"
                buttonText="Get Early Access"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <Button href={SITE.calendlyUrl} variant="ghost" size="sm" external>
                Book a demo &rarr;
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <HeroGraphic />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
