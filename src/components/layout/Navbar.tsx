"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../graphics/Logo";
import Button from "../ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-6xl transition-all duration-500 ${
            scrolled
              ? "mt-3 navbar-float px-6"
              : "mt-0 bg-transparent px-4"
          }`}
        >
          <div className="flex h-14 items-center justify-between">
            <Link href="/" onClick={() => setMobileOpen(false)} className="shrink-0">
              <Logo variant="dark" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-white font-medium"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/15 transition-all"
              >
                Sign Up
              </Link>
              <Button href={SITE.calendlyUrl} variant="primary" size="sm" external>
                Schedule a Conversation
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden relative w-8 h-8 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-brand-950 pt-20"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col items-center gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-white/60 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg px-6 py-2 rounded-lg bg-white/10 border border-white/10 text-white"
                >
                  Sign Up
                </Link>
                <Button href={SITE.calendlyUrl} variant="primary" external>
                  Schedule a Conversation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
