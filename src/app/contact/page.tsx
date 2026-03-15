"use client";

import { useState, FormEvent } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.buttondown.email/v1/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_address: formState.email,
          metadata: {
            name: formState.name,
            company: formState.company,
            message: formState.message,
            source: "contact-form",
          },
          tags: ["contact-form"],
        }),
      });

      if (res.ok || res.status === 201) {
        setStatus("success");
        setFormState({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-[#FDFFFF] placeholder:text-white/30 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/25 transition-all";

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-8 relative" style={{ background: "#071319" }}>
        <div className="absolute top-0 left-1/2 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl -translate-x-1/2" />
        <Container className="relative text-center">
          <AnimateOnScroll className="space-y-5 max-w-3xl mx-auto">
            <h1 className="heading-h1 text-[#FDFFFF]">
              Let&apos;s talk
            </h1>
            <p className="text-xl text-brand-300 leading-relaxed">
              Whether you&apos;re curious about knowledge resolution, ready for a conversation,
              or just want to connect — we&apos;d love to hear from you.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      <div className="glow-divider" />

      {/* Form + Calendly */}
      <section className="py-8 lg:py-10" style={{ background: "#091e26" }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Form */}
            <AnimateOnScroll>
              <div className="space-y-6">
                <h2 className="heading-h2 text-[#FDFFFF]">Send us a message</h2>

                {status === "success" ? (
                  <div className="dark-card border-l-4 border-brand-500 p-8 text-center space-y-3">
                    <p className="text-brand-400 text-lg font-medium">
                      Thanks for reaching out!
                    </p>
                    <p className="text-white/50">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-sm text-white/50 mb-1.5">Name</label>
                      <input
                        id="name" type="text" required
                        className={inputClasses}
                        placeholder="Your name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-white/50 mb-1.5">Email</label>
                      <input
                        id="email" type="email" required
                        className={inputClasses}
                        placeholder="you@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm text-white/50 mb-1.5">Company</label>
                      <input
                        id="company" type="text"
                        className={inputClasses}
                        placeholder="Your company"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm text-white/50 mb-1.5">Message</label>
                      <textarea
                        id="message" rows={2}
                        className={`${inputClasses} resize-none`}
                        placeholder="Tell us about your knowledge challenges..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                      {status === "loading" ? "Sending..." : "Send Message"}
                    </Button>
                    {status === "error" && (
                      <p className="text-accent-coral text-sm">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </AnimateOnScroll>

            {/* Calendly + Info */}
            <AnimateOnScroll delay={0.2}>
              <div className="space-y-6">
                <h2 className="heading-h2 text-[#FDFFFF]">Schedule a conversation</h2>
                <p className="text-white/50 leading-relaxed text-sm">
                  Prefer a conversation? We&apos;ll walk you through how aiCartograph can work for your organization.
                </p>

                <div className="dark-card p-5 space-y-4">
                  <Button href={SITE.calendlyUrl} variant="primary" className="w-full" external>
                    Schedule a Conversation
                  </Button>

                  <div className="space-y-2.5 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${SITE.email}`} className="text-white/60 hover:text-brand-400 transition-colors text-sm">
                        {SITE.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white/60 text-sm">Response within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white/60 text-sm">Based in the UK, serving globally</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </>
  );
}
