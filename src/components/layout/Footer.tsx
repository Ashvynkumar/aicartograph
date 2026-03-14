import Link from "next/link";
import Logo from "../graphics/Logo";
import EmailCapture from "../EmailCapture";
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
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand + email */}
          <div className="lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-white/50 text-sm max-w-xs leading-relaxed">
              The Knowledge Resolution Platform for SaaS Companies. Making documentation actually work.
            </p>
            <EmailCapture
              variant="stacked"
              placeholder="Your email"
              buttonText="Stay Updated"
            />
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Cartograph. All rights reserved.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="text-xs text-white/30 hover:text-white/50 transition-colors"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
