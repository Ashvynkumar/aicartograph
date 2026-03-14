"use client";

import { useState, FormEvent } from "react";
import Button from "./ui/Button";

interface EmailCaptureProps {
  variant?: "inline" | "stacked";
  className?: string;
  placeholder?: string;
  buttonText?: string;
}

export default function EmailCapture({
  variant = "inline",
  className = "",
  placeholder = "Enter your email",
  buttonText = "Get Early Access",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("https://api.buttondown.email/v1/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_address: email, tags: ["website"] }),
      });

      if (res.ok || res.status === 201) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`text-brand-400 font-medium ${className}`}>
        Thanks! We&apos;ll be in touch soon.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        variant === "inline"
          ? "flex items-stretch gap-0"
          : "flex flex-col gap-3"
      } ${className}`}
    >
      <input
        type="email"
        required
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 bg-white/5 border border-white/10 px-5 text-white placeholder:text-white/40 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/25 transition-all ${
          variant === "inline"
            ? "rounded-l-full rounded-r-none border-r-0 h-12 min-w-0"
            : "rounded-full py-3"
        }`}
      />
      <Button
        type="submit"
        variant="primary"
        className={variant === "inline" ? "rounded-l-none rounded-r-full h-12 whitespace-nowrap px-5 text-sm shrink-0" : ""}
      >
        {status === "loading" ? "Sending..." : buttonText}
      </Button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-1">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
