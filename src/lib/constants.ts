export const SITE = {
  name: "aiCartograph",
  domain: "aicartograph.com",
  tagline: "Knowledge Resolution Platform for SaaS Companies",
  vision: "Every answer. Everywhere. The moment it matters.",
  mission:
    "Make knowledge work, not just exist — so what organizations know becomes what gets resolved, for everyone who depends on it.",
  brandOrigin:
    "A cartographer maps territory so others can navigate. We map organizational knowledge so every question finds its answer.",
  description:
    "Your organization's knowledge already has the answers. aiCartograph makes sure people actually find them.",
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

export const FRAMEWORK_PILLARS = [
  {
    id: "connect",
    verb: "Connect",
    title: "Connect your knowledge",
    description:
      "Integrate every source across your organization — wikis, help centers, knowledge bases, shared drives, project tools, communication platforms, code repositories, CRM systems, and more. No migration. No disruption.",
  },
  {
    id: "resolve",
    verb: "Resolve",
    title: "Resolve with intelligence",
    description:
      "When someone has a question, aiCartograph doesn't just search — it resolves. Cross-source contextual synthesis assembles the precise answer for each person's specific context, role, and situation.",
  },
  {
    id: "detect",
    verb: "Detect",
    title: "Detect knowledge health issues",
    description:
      "Continuously monitor your knowledge corpus for staleness, semantic contradiction analysis, coverage gaps, knowledge drift, and quality erosion — before your people hit a dead end.",
  },
  {
    id: "close",
    verb: "Close the Loop",
    title: "Close the feedback loop",
    description:
      "Every unresolved question becomes a consumption signal. aiCartograph routes feedback to the right knowledge owners with priority scores, turning resolution failures into creation priorities.",
  },
];

export const USPS = [
  {
    id: "feedback-loop",
    title: "Feedback-to-Creation Loop",
    shortDescription:
      "Connect consumption failures back to creation priorities.",
    longDescription:
      "Every time someone can't find what they need, aiCartograph captures that consumption signal and routes it to the right knowledge owner. Your knowledge corpus improves based on real resolution data — not guesswork.",
    icon: "feedback" as const,
  },
  {
    id: "health-intelligence",
    title: "Knowledge Health Intelligence",
    shortDescription:
      "Staleness detection, semantic contradiction analysis, gap analysis.",
    longDescription:
      "aiCartograph continuously monitors your knowledge corpus for staleness, contradictions between sources, knowledge drift, and coverage gaps. Know exactly what needs updating before your people hit a dead end.",
    icon: "health" as const,
  },
  {
    id: "cross-source",
    title: "Cross-Source Contextual Synthesis",
    shortDescription:
      "Assemble answers from multiple sources for each person's specific context.",
    longDescription:
      "Real questions rarely have answers in a single source. aiCartograph synthesizes information across your entire knowledge corpus, assembling contextually relevant answers tailored to each person's role and situation.",
    icon: "synthesis" as const,
  },
  {
    id: "embedded-delivery",
    title: "Embedded Knowledge Delivery",
    shortDescription:
      "Push the right knowledge at the right moment inside your SaaS product.",
    longDescription:
      "Don't wait for people to search. aiCartograph's intelligent widget delivers relevant knowledge proactively — right where and when people need it, directly inside your product.",
    icon: "delivery" as const,
  },
];

export const EIGHTEEN_PROBLEMS = [
  { id: 1, name: "Unavailability" },
  { id: 2, name: "Coverage Gaps" },
  { id: 3, name: "Onboarding Drag" },
  { id: 4, name: "Awareness Blindness" },
  { id: 5, name: "Scaling Cascade" },
  { id: 6, name: "Iteration Flood" },
  { id: 7, name: "Updation Burden" },
  { id: 8, name: "Access Chaos" },
  { id: 9, name: "Effectiveness Theater" },
  { id: 10, name: "Distribution Friction" },
  { id: 11, name: "Quality Erosion" },
  { id: 12, name: "Discoverability" },
  { id: 13, name: "Context Decay" },
  { id: 14, name: "Lifecycle Silos" },
  { id: 15, name: "Terminology Drift" },
  { id: 16, name: "Knowledge Liability" },
  { id: 17, name: "Creator Burnout" },
  { id: 18, name: "No Feedback Loop" },
];

export const PRICING_TIERS = [
  {
    name: "Free",
    basePrice: 0,
    perUser: 0,
    unit: "",
    description: "Explore knowledge resolution at no cost.",
    features: [
      "Up to 50 knowledge sources",
      "Basic search + chat resolution",
      "100 queries per month",
      "Community support",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Starter",
    basePrice: 200,
    perUser: 10,
    unit: "/mo",
    description: "Connect, resolve, and start closing the loop.",
    features: [
      "Connect + Resolve + Feedback Loop",
      "Unlimited knowledge sources",
      "Unlimited queries",
      "Basic analytics",
      "Email support",
    ],
    cta: "Request Early Access",
    highlighted: false,
  },
  {
    name: "Professional",
    basePrice: 500,
    perUser: 20,
    unit: "/mo",
    description: "Full resolution intelligence for growing teams.",
    features: [
      "Everything in Starter",
      "Detect: Knowledge Health Intelligence",
      "Full analytics dashboard",
      "Governance & source of truth",
      "Priority support",
    ],
    cta: "Request Early Access",
    highlighted: true,
  },
  {
    name: "Enterprise",
    basePrice: null,
    perUser: 35,
    unit: "/mo",
    description: "Full infrastructure with embedded delivery.",
    features: [
      "Everything in Professional",
      "Cross-Source Contextual Synthesis",
      "Embedded Knowledge Widget",
      "Custom API & integrations",
      "Dedicated success manager",
      "SLA & SSO/SAML",
    ],
    cta: "Schedule a Conversation",
    highlighted: false,
  },
];

export const SIX_VERTICALS = [
  { name: "Product & Engineering", description: "Ship faster with resolved technical knowledge." },
  { name: "Customer Support & Customer Success", description: "Resolve tickets with knowledge, not guesswork." },
  { name: "Sales & Marketing", description: "Arm every conversation with the right knowledge." },
  { name: "HR & Operations", description: "Onboard and enable with knowledge that resolves." },
  { name: "Legal & Compliance", description: "Ensure regulatory and policy knowledge is always accessible and current." },
  { name: "Information Security", description: "Ensure compliance knowledge is always current." },
];

export const COMPETITOR_APPROACHES = [
  {
    approach: "Enterprise search platforms",
    does: "Find knowledge",
    gap: "Don't resolve it",
  },
  {
    approach: "Internal knowledge bases",
    does: "Store knowledge",
    gap: "Can't synthesize across sources",
  },
  {
    approach: "Support chatbots & AI agents",
    does: "Deflect FAQs",
    gap: "Break on complexity",
  },
];
