"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
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

            {/* Desktop auth — compass-anchored group */}
            <div className="hidden md:flex items-center gap-2">
              {/* Compass + Auth pill */}
              <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-full p-0.5 gap-0.5">
                {/* Compass icon — the key to the platform */}
                <Link
                  href="/auth/login"
                  className="group flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full text-white/60 hover:text-white transition-all"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Image
                      src="/aiCartograph_icon_final.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <span className="text-sm">Log In</span>
                </Link>

                {/* Sign Up — primary CTA */}
                <Link
                  href="/auth/signup"
                  className="text-sm px-4 py-1.5 rounded-full bg-gradient-to-r from-[#4597b0] to-[#62acbb] text-white font-medium hover:shadow-lg hover:shadow-[#4597b0]/25 transition-all"
                >
                  Sign Up
                </Link>
              </div>

              <Button href={SITE.calendlyUrl} variant="secondary" size="sm" external>
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
              <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-xs">
                {/* Mobile compass auth group */}
                <div className="flex items-center justify-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src="/aiCartograph_icon_final.svg"
                      alt=""
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg text-white/70 hover:text-white transition-colors"
                    >
                      Log In
                    </Link>
                    <span className="text-white/20">|</span>
                    <Link
                      href="/auth/signup"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium text-[#62acbb] hover:text-white transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
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
