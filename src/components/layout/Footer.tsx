"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "../graphics/Logo";
import Button from "../ui/Button";
import { CompassIcon } from "../graphics/FancyIcons";
import { SITE } from "@/lib/constants";

const footerLinks = {
  Product: [
    { label: "Features", href: "/product" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#040a0d] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-brand-500/[0.02] rounded-full blur-3xl animate-glow-breathe" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent-amber/[0.02] rounded-full blur-3xl animate-glow-breathe" style={{ animationDelay: "2s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + email */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <Logo variant="dark" />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <CompassIcon className="w-5 h-5 opacity-50" />
              </motion.div>
            </div>
            <p className="text-brand-300 text-sm max-w-xs leading-relaxed">
              Knowledge Resolution Platform for SaaS Companies. Making knowledge work, not just exist.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Request Early Access
            </Button>
          </div>

          {/* Link columns — Product and Company only */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/80 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-white/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/5">
          <div className="section-divider-rich mb-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} aiCartograph. All rights reserved.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
