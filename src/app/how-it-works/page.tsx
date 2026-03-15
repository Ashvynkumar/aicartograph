"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ArchitectureDiagram from "@/components/graphics/ArchitectureDiagram";
import CTABanner from "@/components/sections/CTABanner";

const SCENARIOS = [
  {
    tab: "Customer Support",
    role: "A Customer Success Manager at a Global CPG Company",
    scenario: "The SSO configuration question",
    before: {
      time: "~2 hours wasted",
      steps: [
        "Gets asked about SSO config for Enterprise v3.2.",
        "Searches the help center \u2014 finds 4 articles, none specific to v3.2.",
        "Messages an engineer on Slack. Waits 2 hours for a reply.",
        "Customer waits. Gets a half-right answer a day late.",
        "Nobody knows this happened. Nobody fixes the knowledge.",
      ],
    },
    after: {
      time: "3 minutes to resolve",
      steps: [
        "Asks aiCartograph the same SSO configuration question.",
        "Cross-source synthesis pulls from the SSO guide, v3.2 release notes, and Enterprise config spec.",
        "Assembles a precise, step-by-step answer in seconds.",
        "Resolves the ticket in 3 minutes instead of 2 hours.",
        "aiCartograph detects this was asked 12 times \u2014 signals the team to create a dedicated article.",
      ],
    },
  },
  {
    tab: "Engineering Onboarding",
    role: "A New Engineer at an Enterprise SaaS Platform",
    scenario: "First day at a new company",
    before: {
      time: "~4 hours lost across the team",
      steps: [
        "Needs to set up the local dev environment on day one.",
        "The internal wiki has a 2-year-old setup guide for a different stack.",
        "Asks in #engineering \u2014 gets 3 partial answers and 2 broken links.",
        "Two senior engineers spend 45 minutes helping debug config.",
        "The team loses half a day. The wiki never gets updated.",
      ],
    },
    after: {
      time: "30 seconds to a working setup guide",
      steps: [
        "Asks aiCartograph how to set up the local dev environment.",
        "Synthesizes from the current README, recent Slack threads, and CI config.",
        "Gets a step-by-step guide for the actual current stack \u2014 in 30 seconds.",
        "Productive by lunch. No engineers interrupted.",
        "aiCartograph flags the outdated wiki page and routes it to the DevEx team.",
      ],
    },
  },
  {
    tab: "Sales Enablement",
    role: "An Account Executive at a B2B Software Company",
    scenario: "Pre-call competitive research",
    before: {
      time: "~45 minutes of manual searching",
      steps: [
        "Has a discovery call in 30 minutes with a prospect evaluating competitors.",
        "Searches Confluence for battle cards \u2014 finds one from 8 months ago.",
        "Slacks the product marketing team. No response before the call.",
        "Goes in under-prepared, misses key differentiators.",
        "Loses the deal to a competitor with better-prepared reps.",
      ],
    },
    after: {
      time: "2 minutes to full prep",
      steps: [
        "Asks aiCartograph for the latest competitive positioning against the specific competitor.",
        "Pulls from the latest battle card, recent win/loss notes, and product changelog.",
        "Gets a structured brief: key differentiators, objection handlers, and pricing comparison.",
        "Goes into the call fully prepared with current intel.",
        "aiCartograph flags the stale battle card for product marketing to update.",
      ],
    },
  },
  {
    tab: "HR/Policy",
    role: "A People Operations Lead at a Remote-First Company",
    scenario: "Benefits eligibility question",
    before: {
      time: "~3 hours to get an answer",
      steps: [
        "An employee in a new state asks about health benefits eligibility.",
        "The HR wiki has general info but nothing state-specific.",
        "Emails the benefits broker. Waits half a day for a response.",
        "Meanwhile, 3 more employees ask the same question.",
        "Each gets a slightly different answer from different HR team members.",
      ],
    },
    after: {
      time: "1 minute to accurate answer",
      steps: [
        "The employee asks aiCartograph about state-specific benefits eligibility.",
        "Synthesizes from the benefits guide, broker correspondence, and state requirements.",
        "Provides a precise, consistent answer with source citations.",
        "All employees get the same accurate information instantly.",
        "aiCartograph detects the knowledge gap and recommends creating a state-by-state guide.",
      ],
    },
  },
  {
    tab: "Compliance",
    role: "A Compliance Officer at a Financial Services Firm",
    scenario: "Audit preparation",
    before: {
      time: "~2 days of manual gathering",
      steps: [
        "Regulators announce an audit with 2 weeks notice.",
        "Compliance policies are spread across SharePoint, email threads, and outdated PDFs.",
        "Spends 2 days collecting and cross-referencing policy documents.",
        "Discovers 3 policies contradict each other.",
        "Scrambles to reconcile before the audit deadline.",
      ],
    },
    after: {
      time: "15 minutes to complete overview",
      steps: [
        "Asks aiCartograph to compile all relevant compliance policies for the audit scope.",
        "Instantly surfaces all policies, detects contradictions, and flags outdated documents.",
        "Gets a structured compliance package with gap analysis in minutes.",
        "Contradictions are flagged before auditors arrive.",
        "aiCartograph creates an automated alert for future policy drift.",
      ],
    },
  },
  {
    tab: "Product Teams",
    role: "A Product Manager at a Growth-Stage Startup",
    scenario: "Feature specification lookup",
    before: {
      time: "~1 hour of context-switching",
      steps: [
        "Needs to understand how a feature works before planning an enhancement.",
        "The original spec is in Notion, implementation details in Jira, and edge cases in Slack.",
        "Spends an hour hunting across 3 tools and interrupting 2 engineers.",
        "Still isn\u2019t sure about edge cases from the last release.",
        "Writes the enhancement spec with incomplete context.",
      ],
    },
    after: {
      time: "5 minutes to full context",
      steps: [
        "Asks aiCartograph about the current feature implementation and known edge cases.",
        "Synthesizes from the Notion spec, Jira tickets, Slack discussions, and release notes.",
        "Gets a comprehensive feature overview with edge cases and recent changes.",
        "Writes the enhancement spec with full context, no interruptions.",
        "aiCartograph suggests related features that might be affected by the change.",
      ],
    },
  },
];

function ScenarioTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const scenario = SCENARIOS[activeTab];

  return (
    <section className="py-12 lg:py-16" style={{ background: "#091e26" }}>
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <p className="section-label mb-4">Real Scenarios</p>
          <h2 className="heading-h2 text-[#FDFFFF] mb-3">
            Before &amp; after knowledge resolution
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            See the difference across every team that depends on knowledge.
          </p>
        </AnimateOnScroll>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === i
                  ? "bg-brand-500 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
              }`}
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* Scenario content */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-white/40 text-sm">{scenario.role}</p>
            <h3 className="heading-h3 text-[#FDFFFF] mt-1">{scenario.scenario}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before — Without aiCartograph */}
            <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(240,101,101,0.08) 0%, rgba(15,10,10,0.9) 40%, #0a0808 100%)", border: "1px solid rgba(240,101,101,0.15)" }}>
              <div className="relative p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#f06565]" />
                    <span className="text-[#f06565] text-xs font-bold uppercase tracking-widest">The Old Way</span>
                  </div>
                  <span className="text-[#f06565]/80 text-sm font-mono font-bold">{scenario.before.time}</span>
                </div>
                <div className="space-y-4">
                  {scenario.before.steps.map((step, i) => {
                    const isLast = i === scenario.before.steps.length - 1;
                    return (
                      <div key={`${activeTab}-before-${i}`} className="flex items-start gap-3.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold" style={{ background: isLast ? "rgba(240,101,101,0.2)" : "rgba(255,255,255,0.04)", color: isLast ? "#f06565" : "rgba(255,255,255,0.35)", border: isLast ? "1px solid rgba(240,101,101,0.3)" : "1px solid rgba(255,255,255,0.06)" }}>
                          {i + 1}
                        </div>
                        <p className={`text-sm leading-relaxed ${isLast ? "font-semibold text-[#f06565]" : "text-white/60"}`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="h-1 rounded-b-2xl" style={{ background: "linear-gradient(90deg, #f06565 0%, #e07c4f 50%, transparent 100%)" }} />
            </div>

            {/* After — With aiCartograph */}
            <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(54,192,142,0.1) 0%, rgba(5,20,15,0.9) 40%, #050f0a 100%)", border: "1px solid rgba(54,192,142,0.2)" }}>
              <div className="relative p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#36c08e] animate-pulse" />
                    <span className="text-[#36c08e] text-xs font-bold uppercase tracking-widest">With aiCartograph</span>
                  </div>
                  <span className="text-[#36c08e]/80 text-sm font-mono font-bold">{scenario.after.time}</span>
                </div>
                <div className="space-y-4">
                  {scenario.after.steps.map((step, i) => {
                    const isLast = i === scenario.after.steps.length - 1;
                    return (
                      <div key={`${activeTab}-after-${i}`} className="flex items-start gap-3.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold" style={{ background: isLast ? "rgba(54,192,142,0.2)" : "rgba(54,192,142,0.06)", color: isLast ? "#36c08e" : "#36c08e", border: isLast ? "1px solid rgba(54,192,142,0.3)" : "1px solid rgba(54,192,142,0.1)" }}>
                          {i + 1}
                        </div>
                        <p className={`text-sm leading-relaxed ${isLast ? "font-semibold text-[#36c08e]" : "text-white/70"}`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="h-1 rounded-b-2xl" style={{ background: "linear-gradient(90deg, #36c08e 0%, #4597b0 50%, transparent 100%)" }} />
            </div>
          </div>

          <AnimateOnScroll className="text-center mt-10">
            <p className="text-xl font-bold tracking-tight" style={{ background: "linear-gradient(90deg, #f06565 0%, #f0b429 30%, #36c08e 60%, #4597b0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              This is the difference between retrieval and resolution.
            </p>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}

/* ─── Behind the Scenes ─── */
function BehindTheScenes() {
  return (
    <section className="py-12 lg:py-16" style={{ background: "#071319" }}>
      <Container>
        <AnimateOnScroll className="text-center mb-8">
          <p className="section-label mb-4">Under the Hood</p>
          <h2 className="heading-h2 text-[#FDFFFF]">
            What happens behind the scenes
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mt-3">
            When someone asks a question, here&apos;s what aiCartograph does — in real time. Hover each node to explore the technology.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <ArchitectureDiagram className="max-w-5xl mx-auto" />
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 relative" style={{ background: "#071319" }}>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl" />
        <Container className="relative">
          <AnimateOnScroll className="max-w-3xl space-y-5">
            <h1 className="heading-h1 text-[#FDFFFF]">
              From question to resolution
              <br />
              <span className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
                in seconds.
              </span>
            </h1>
            <p className="text-xl text-brand-300 max-w-2xl leading-relaxed">
              See how aiCartograph works in practice — step by step.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      <div className="glow-divider" />
      <ScenarioTabs />
      <div className="glow-divider" />
      <BehindTheScenes />
      <div className="glow-divider" />
      <CTABanner
        headline="See resolution in action"
        subheadline="We&apos;ll show you what knowledge resolution looks like for your team."
      />
    </>
  );
}
