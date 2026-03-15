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
    <section className="py-12 lg:py-16" style={{ background: "#0e2830" }}>
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

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="dark-card p-6 border-l-4 border-l-accent-coral">
              <Badge>Without aiCartograph</Badge>
              <p className="text-accent-coral text-xs font-medium mt-2 mb-3">{scenario.before.time}</p>
              <div className="space-y-3">
                {scenario.before.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent-coral font-mono text-xs font-bold mt-1 shrink-0">{i + 1}.</span>
                    <p className={`text-sm leading-relaxed break-words ${i === scenario.before.steps.length - 1 ? "text-accent-coral font-medium" : "text-white/60"}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="dark-card p-6 border-l-4 border-l-brand-500 shadow-lg shadow-brand-500/10">
              <Badge variant="highlight">With aiCartograph</Badge>
              <p className="text-brand-400 text-xs font-medium mt-2 mb-3">{scenario.after.time}</p>
              <div className="space-y-3">
                {scenario.after.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-brand-500 font-mono text-xs font-bold mt-1 shrink-0">{i + 1}.</span>
                    <p className={`text-sm leading-relaxed break-words ${i === scenario.after.steps.length - 1 ? "text-brand-400 font-medium" : "text-white/60"}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AnimateOnScroll className="text-center mt-8">
            <p className="text-brand-400 font-medium text-base">
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
    <section className="py-12 lg:py-16" style={{ background: "#0c2329" }}>
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
      <section className="pt-28 pb-16 relative" style={{ background: "#0c2329" }}>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl" />
        <Container className="relative">
          <AnimateOnScroll className="max-w-3xl space-y-5">
            <Badge variant="highlight">How It Works</Badge>
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
