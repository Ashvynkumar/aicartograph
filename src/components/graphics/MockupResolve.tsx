"use client";

import { useEffect, useRef, useState } from "react";

export default function MockupResolve({ className = "" }: { className?: string }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <style>{`
        @keyframes resolve-typing {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes resolve-slide-in {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes resolve-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(69,151,176,0.15); }
          50% { box-shadow: 0 0 12px 2px rgba(69,151,176,0.1); }
        }
        @keyframes resolve-confidence-fill {
          0% { width: 0%; }
          100% { width: 94%; }
        }
      `}</style>
      <div className="rounded-xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40">
        {/* Chrome bar */}
        <div className="h-8 bg-[#080604] flex items-center px-3 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <div className="flex-1 mx-8">
            <div className="bg-white/5 rounded-md h-4 max-w-[200px] mx-auto" />
          </div>
        </div>
        {/* Content */}
        <div className="bg-[#071319] p-5 text-[11px] flex gap-3">
          {/* Chat panel */}
          <div className="flex-1 flex flex-col gap-2.5">
            {/* Header */}
            <div className="flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#4597b0]/30 flex items-center justify-center">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-[#4597b0]"
                  style={{ animation: isInView ? "resolve-typing 2s ease-in-out infinite" : "none" }}
                />
              </div>
              <span className="text-white/70 text-[11px] font-medium">Resolve</span>
            </div>

            {/* User message */}
            <div
              className="flex gap-2"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.5s 0.2s ease-out",
              }}
            >
              <div className="w-4 h-4 rounded-full bg-[#62acbb]/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-[7px] text-[#62acbb] font-bold">U</span>
              </div>
              <div className="bg-white/[0.06] rounded-lg rounded-tl-sm px-2.5 py-2 flex-1">
                <p className="text-white/80 text-[11px] leading-relaxed">
                  How do I configure SSO for Enterprise v3.2?
                </p>
              </div>
            </div>

            {/* AI response */}
            <div
              className="flex gap-2"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.5s 0.6s ease-out",
              }}
            >
              <div className="w-4 h-4 rounded-full bg-[#36c08e]/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-[7px] text-[#36c08e] font-bold">AI</span>
              </div>
              <div
                className="bg-[#4597b0]/[0.08] rounded-lg rounded-tl-sm px-2.5 py-2 flex-1 border border-[#4597b0]/10"
                style={{ animation: isInView ? "resolve-pulse 4s ease-in-out infinite" : "none" }}
              >
                <p className="text-white/80 text-[11px] leading-relaxed mb-2">
                  To configure SSO for Enterprise v3.2, follow these steps:
                </p>
                <ul className="space-y-1 ml-2">
                  {[
                    { text: <>Navigate to <span className="text-[#62acbb]">Settings → Authentication</span></>, delay: 0.8 },
                    { text: "Enable SAML 2.0 under identity providers", delay: 1.0 },
                    { text: "Upload your IdP metadata XML file", delay: 1.2 },
                    { text: <><span>Map attributes: </span><span className="text-[#36c08e] font-mono text-[9px]">email</span>, <span className="text-[#36c08e] font-mono text-[9px]">displayName</span></>, delay: 1.4 },
                  ].map((step, i) => (
                    <li
                      key={i}
                      className="text-white/65 flex gap-1"
                      style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateX(0)" : "translateX(6px)",
                        transition: `all 0.3s ${step.delay}s ease-out`,
                      }}
                    >
                      <span className="text-[#4597b0]">{i + 1}.</span>
                      <span>{step.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center gap-1.5">
                  <span className="text-white/30 text-[9px]">Cited 3 sources</span>
                  <span className="text-[#36c08e] text-[9px] font-medium">· 94% confidence</span>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div className="mt-auto bg-white/[0.04] rounded-lg border border-white/[0.06] px-2.5 py-2 flex items-center gap-2">
              <span className="text-white/30 text-[10px] flex-1">
                Ask a follow-up question...
                {isInView && <span style={{ animation: "resolve-typing 1s step-end infinite", color: "#4597b0" }}>▊</span>}
              </span>
              <div className="w-4 h-4 rounded bg-[#4597b0]/30 flex items-center justify-center">
                <span className="text-[#4597b0] text-[8px]">↑</span>
              </div>
            </div>
          </div>

          {/* Citations sidebar */}
          <div className="w-[38%] flex flex-col gap-2">
            <div className="text-white/50 text-[10px] font-medium pb-2 border-b border-white/[0.06]">
              Sources & Citations
            </div>
            {[
              { title: "SSO Setup Guide", relevance: 97, snippet: "Enterprise v3.2 supports SAML 2.0 and OIDC protocols for single sign-on...", type: "Guide", delay: 0.4 },
              { title: "Authentication API Ref", relevance: 89, snippet: "POST /api/auth/sso/configure accepts IdP metadata and attribute mappings...", type: "API Docs", delay: 0.7 },
              { title: "v3.2 Release Notes", relevance: 72, snippet: "Added support for SCIM provisioning alongside SSO configuration...", type: "Changelog", delay: 1.0 },
            ].map((source, i) => (
              <div
                key={i}
                className="bg-white/[0.04] rounded-lg border border-white/[0.06] p-2"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateX(0)" : "translateX(8px)",
                  transition: `all 0.4s ${source.delay}s ease-out`,
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/70 text-[9px] font-medium truncate">
                    {source.title}
                  </span>
                  <span
                    className="text-[8px] font-mono px-1 py-0.5 rounded"
                    style={{
                      color: source.relevance > 90 ? "#36c08e" : "#4597b0",
                      backgroundColor: source.relevance > 90 ? "rgba(54,192,142,0.1)" : "rgba(69,151,176,0.1)",
                    }}
                  >
                    {source.relevance}%
                  </span>
                </div>
                <div className="text-[8px] text-[#4597b0]/60 mb-1">{source.type}</div>
                <p className="text-white/40 text-[8px] leading-relaxed line-clamp-2">
                  {source.snippet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
