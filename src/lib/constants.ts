export const SITE = {
  name: "Cartograph",
  domain: "aicartograph.com",
  tagline: "The Knowledge Resolution Platform for SaaS Companies",
  description:
    "Your documentation already has the answers. Cartograph makes sure people actually find them.",
  calendlyUrl: "https://calendly.com/ai-cartograph/30min",
  buttondownUrl: "https://api.buttondown.email/v1/subscribers",
  email: "hello@aicartograph.com",
};

export const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const USPS = [
  {
    id: "feedback-loop",
    title: "Feedback-to-Creation Loop",
    shortDescription:
      "Connect consumption failures back to creation priorities.",
    longDescription:
      "Every time a user can't find what they need, Cartograph captures that signal and routes it to the right content owner. Your documentation improves based on real consumption data — not guesswork.",
    icon: "feedback" as const,
  },
  {
    id: "doc-health",
    title: "Doc Health Intelligence",
    shortDescription:
      "Staleness detection, contradiction detection, gap analysis.",
    longDescription:
      "Cartograph continuously monitors your documentation for staleness, contradictions between sources, and coverage gaps. Know exactly what needs updating before your users hit a dead end.",
    icon: "health" as const,
  },
  {
    id: "cross-doc",
    title: "Cross-doc Contextual Synthesis",
    shortDescription:
      "Assemble answers from multiple docs for your user's specific context.",
    longDescription:
      "Real questions rarely have answers in a single document. Cartograph synthesizes information across your entire knowledge base, assembling contextually relevant answers tailored to each user's role and situation.",
    icon: "synthesis" as const,
  },
  {
    id: "in-product",
    title: "Contextual In-Product Delivery",
    shortDescription:
      "Push the right knowledge at the right moment inside your SaaS product.",
    longDescription:
      "Don't wait for users to search. Cartograph's intelligent widget delivers relevant documentation proactively — right where and when users need it, directly inside your product.",
    icon: "delivery" as const,
  },
];

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: 29,
    unit: "per user/mo",
    description: "Get started with knowledge resolution basics.",
    features: [
      "Knowledge Discovery & Search",
      "Conversational Resolution",
      "Basic Feedback Signals",
      "Up to 500 resolutions/mo",
      "2 documentation source connectors",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: 49,
    unit: "per user/mo",
    description: "Full resolution intelligence for growing teams.",
    features: [
      "Everything in Starter",
      "Doc Health Intelligence",
      "Knowledge Analytics Dashboard",
      "Governance & Source of Truth",
      "Unlimited resolutions",
      "10 documentation source connectors",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 79,
    unit: "per user/mo",
    description: "Full platform with in-product delivery and synthesis.",
    features: [
      "Everything in Professional",
      "Cross-doc Contextual Synthesis",
      "In-Product Knowledge Widget",
      "Content Quality & Standards",
      "Onboarding & Enablement Flows",
      "Unlimited connectors",
      "Custom integrations",
      "Dedicated success manager",
    ],
    cta: "Talk to Sales",
    highlighted: false,
  },
];

export const CAPABILITIES = [
  {
    id: "C1",
    name: "Knowledge Discovery & Search",
    description: "Semantic search across all connected documentation sources.",
  },
  {
    id: "C2",
    name: "Doc Health & Maintenance Intel",
    description:
      "Proactive staleness scoring, contradiction detection, and gap analysis.",
  },
  {
    id: "C3",
    name: "Conversational Resolution",
    description:
      "AI-powered chat that resolves questions using your documentation.",
  },
  {
    id: "C4",
    name: "Feedback & Signals Loop",
    description:
      "Capture consumption failures and route them to content owners.",
  },
  {
    id: "C5",
    name: "Knowledge Analytics",
    description:
      "Understand how documentation is consumed, what resolves, and what doesn't.",
  },
  {
    id: "C6",
    name: "Contextual Knowledge Delivery",
    description:
      "Push relevant docs to users based on their role, context, and product state.",
  },
  {
    id: "C7",
    name: "Cross-doc Synthesis",
    description:
      "Assemble answers from multiple sources into coherent, personalized responses.",
  },
  {
    id: "C8",
    name: "Governance & Source of Truth",
    description:
      "Define authoritative sources and enforce documentation hierarchy.",
  },
  {
    id: "C9",
    name: "Onboarding & Enablement",
    description:
      "Progressive knowledge delivery for new users and role transitions.",
  },
  {
    id: "C10",
    name: "Content Quality & Standards",
    description:
      "Automated style, readability, and completeness checks for documentation.",
  },
];

export const COMPETITORS = [
  { name: "Confluence / GitBook", role: "Create docs", gap: "Don't resolve" },
  { name: "Glean / Guru", role: "Search docs", gap: "Don't close the loop" },
  {
    name: "Intercom Fin",
    role: "Deflect tickets",
    gap: "Don't improve the source",
  },
];
