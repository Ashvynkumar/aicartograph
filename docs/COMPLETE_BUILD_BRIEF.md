# aiCartograph — COMPLETE BUILD BRIEF
## Every Point. Nothing Lost. Ready for Claude Code.

**Date:** March 15, 2026
**From:** Atlas (Founder) + Compass (AI Co-founder)
**Purpose:** Single source of truth for ALL pending work across platform + website

---

# STREAM 1: PLATFORM BUILD

## 1A. DELTA FIXES (From FINAL_ISSUE_LIST.md audit — items NOT yet confirmed fixed)

### G1: Container size consistency
Every card/tile/button within the same row MUST be identical dimensions. Enforce with CSS Grid `grid-template-columns: repeat(N, 1fr)`, `align-items: stretch`, explicit `min-height`. Audit EVERY section on EVERY page.

### G2: Text wrapping
Short phrases breaking across 2-3 lines. Increase container widths, reduce font sizes, or `white-space: nowrap` for short labels.

### G3: Excessive vertical spacing
Section padding: py-12 to py-16 MAX. Card gaps: gap-4 to gap-6. CTA banners: py-8 max.

### G4: Email capture frequency
"Request Early Access" email input appears max 2x per page (hero + bottom CTA). Footer should have a BUTTON that scrolls to hero, NOT a full email input.

### G5: "30-minute call" mentioned too many times
Calendly/30-min CTA mentioned TWICE per page max.

### Buttondown API
Verify Buttondown email capture is actually working with API key in env vars. Test every instance.

---

## 1B. DESIGN SYSTEM OVERHAUL (Applies to BOTH platform AND website)

### Kill alternating dark/light sections
**EVERYWHERE.** Both the marketing website AND the platform app. Use ONE consistent dark background (#0c2329 base) with the 8-band palette for:
- Card backgrounds (subtle variations using `rgba(255,255,255,0.03)` to `rgba(255,255,255,0.08)`)
- Text hierarchy (white → 80% → 60% → 40% → 25%)
- Accent highlights, borders, gradients using #4597b0, #62acbb, #97c1cc, #f0b429, #9b8ce8, #36c08e
- Glow effects and subtle color bleeds for section separation instead of hard bg switches
- This is the Linear/Vercel/Raycast approach — consistent canvas, rich accents

### Platform-specific design fixes
- Sidebar collapse button (Image 2): Replace the chevron + "Collapse" text with a hamburger icon/component. Cleaner, universally understood.
- User profile appears in BOTH the TopBar dropdown (Image 1) AND the sidebar bottom (Image 2). That's redundant. Keep it in ONE place — the TopBar avatar dropdown. Sidebar bottom should only have: Theme toggle, Collapse button. Remove the user avatar and Sign Out from sidebar.
- Pricing display in platform (if shown anywhere): No repeated elements. Each tier distinct.

---

## 1C. NEW FEATURES

### 1. First-Time Login Intent Capture
When ANY user logs in for the first time:
- Show a full-screen intent prompt BEFORE showing the dashboard
- "What brings you to aiCartograph today?" with options:
  - "I want to see how my knowledge holds up" → routes to Sources upload → Health
  - "I'm evaluating this for my team" → routes to a guided product tour
  - "I want to build something" → routes to Agent Studio / Foundry
  - "I want to resolve a question" → routes to Resolve
  - Free-text: user types their own reason, the system/agent interprets and guides
- This IS the pitch. The system responds intelligently, establishes the hook, and navigates them to value in 60 seconds.
- Replace current OnboardingWizard with this. The WelcomePrompt on dashboard can stay but only appears AFTER intent capture.

### 2. Expand Document Templates
Already built. Add more templates:
- Legal Agreement Template
- Marketing Brief Template
- Compliance Policy Template
- Product Requirements Template
- Meeting Notes Template
- Knowledge Base Article Template

### 3. Agent Marketplace (inside Agent Studio)
Add a "Marketplace" tab to the existing Agent Studio (`/app/agents`). Shows a grid of pre-built specialized agent templates:

**AVAILABLE NOW (build these):**
- **User Manual Agent** — The flagship. Users can:
  - Port an existing manual and chat to improve it
  - Upload product audio/video/GIF files to generate user manuals
  - Provide a platform URL + login credentials (masked) or login token/API key, and the agent automatically scouts the platform and generates a complete user manual
  - Uses browser automation concept (Playwright/Puppeteer) to crawl, screenshot, map workflows, read DOM
  - AI generates step-by-step manuals with annotated screenshots
  - For MVP: build full UI + mock the crawl with sample output

**COMING SOON (show cards, not functional):**
- **Context Agent** — Departed employee knowledge recovery. Scans Drive/SharePoint/Git/Postgres/local files of a departing team member. Produces structured knowledge handover document. Manager/HR/admin grants access, agent extracts and organizes everything relevant. (Enterprise tier feature)
- **Digital Transformation Agent** — M&A document harmonization. Merge docs from acquired company, implement integration strategies, harmonize across verticals to current company's theme/guidance/practice. (Year 2 roadmap, Enterprise)
- **Tech Doc Agent** — Auto-generates technical documentation from code repos, API endpoints, database schemas
- **Marketing Content Agent** — Generates marketing copy, blog posts, case studies from product knowledge
- **Campaign Agent** — Creates email campaigns, social posts, ad copy aligned with brand knowledge
- **Compliance Agent** — Monitors documents against regulatory requirements, flags non-compliance
- **Training Agent** — Generates training materials, quizzes, onboarding content from knowledge base
- **Translation Agent** — Localizes knowledge content across languages while maintaining technical accuracy

Each "Coming Soon" card should have: name, icon, one-line description, "Notify me when available" button (captures email via Buttondown).

### 4. Module Organization
The platform does NOT have "13 modules." It has FOUR PILLARS, each containing sub-modules:

**CONNECT**
- Sources & Docs (upload, manage, Foundry editor)
- Integrations (100+ connectors)

**RESOLVE**
- Resolve (chat interface, quick/deep modes)
- Agent Studio + Marketplace (build, deploy, export agents)
- API & Docs (developer documentation, SDK, export to git)

**DETECT**
- Health & Gaps (score ring, staleness, contradictions, gap analysis)
- Analytics & Reports (metrics, ROI, automated reports)
- Audit Trail (compliance logging)

**CLOSE THE LOOP**
- Feedback Loop (unresolved questions, creation priorities)
- Automations (workflow builder)

**ADMIN**
- Admin Control (white-label, i18n, team, API keys, platform settings)

The sidebar already groups these under pillar headers. This organization should be reflected on the website too.

---

# STREAM 2: WEBSITE REVAMP

## 2A. GLOBAL DESIGN DIRECTION

### Single dark canvas
- Kill ALL alternating light/dark sections across every page
- Base background: #0c2329
- Use the 8-band palette for visual rhythm:
  - Card backgrounds: subtle glass effects (`rgba(255,255,255,0.03)` with `backdrop-blur`)
  - Section separation: gradient glow bleeds, not hard color switches
  - Accent colors for highlights, borders, illustrations, animations
  - Text hierarchy through opacity and weight, not background contrast
- Reference: Linear.app, Vercel.com, Raycast.com, Arc.net

### Product visuals — THIS IS CRITICAL
The website currently has ZERO product screenshots, ZERO GIFs, ZERO video. This must change:
- Take screenshots from the CURRENT platform (dark theme). Key screens:
  - Dashboard with metrics and charts
  - Resolve chat with streaming answer and citations panel
  - Health dashboard with score ring and contradictions
  - Agent Studio with agent cards and builder modal
  - Sources page with grid view and health badges
  - Foundry editor with markdown preview
- Create 3-4 short GIF/animation mockups:
  - Someone asking a question → streaming answer with source citations
  - Health score detecting a contradiction
  - Agent Studio deploying a WhatsApp agent
  - Sources upload → auto-chunking → indexed
- Embed these throughout Homepage, Product, and How It Works pages
- If real screenshots aren't possible in the build environment, create HIGH-FIDELITY SVG/HTML mockups that look like real product screens

### n8n-style architecture visualization
The current FlowDiagram component is decent but NOT what was asked for. Build a proper interactive architecture diagram:
- Full-width, n8n/Figma-style node graph
- Nodes for each pillar (Connect, Resolve, Detect, Close Loop) with sub-nodes
- Animated data particles flowing between nodes
- Hover/click to expand nodes and reveal sub-components (e.g., hovering "Resolve" reveals: Semantic Search, RAG Pipeline, Context Assembly, Confidence Scoring)
- The feedback loop visually flows from Close Loop back to Connect
- Tech cards (Semantic Search, RAG Pipeline, etc.) are PART of the flow, not separate static cards underneath
- Use our palette colors for different node types
- This replaces the current "Under the Hood" section on How It Works

---

## 2B. PAGE-BY-PAGE SPECIFICATIONS

### HOMEPAGE (/) — "THE HOOK"

**Purpose:** Make someone say "I need to talk to these people" in 15 seconds.

**Section 1: Hero**
- Dark canvas, no light section
- Logo + animated compass
- "Knowledge Resolution Platform for SaaS Companies" — section label
- "Every answer. Everywhere. The moment it matters." — H1
- Mission text below
- Two CTAs: Email capture (inline) + "Schedule a Conversation"
- Animated topographic background (keep current AbstractPattern)

**Section 2: Framework Strip**
- "Connect → Resolve → Detect → Close the Loop"
- Four items horizontal with icons + ONE sentence each
- Link: "See the full product →"
- NO light background — use subtle card surfaces on dark canvas

**Section 3: Platform Preview (NEW)**
- "See the platform" or "Built for depth"
- 2-3 product screenshots/mockups in a carousel or stacked showcase
- Each screenshot has a caption explaining what the user is looking at
- This is the "proof it's real" section — most important addition to homepage

**Section 4: Problem Teaser**
- "We mapped 18 ways knowledge fails."
- Show 6 problem names as preview tiles
- "Take the Full Diagnostic →" button
- Dark canvas, accent-colored tiles

**Section 5: By the Numbers**
- Three stat cards: 18 / 6 / 4
- Animated counters
- NO light background — use card surfaces with subtle glow

**Section 6: CTA Banner (compact)**
- Two CTAs, compact padding

**REMOVED from homepage:** Full pillar descriptions, full 18 problems grid, full USP section, competitor positioning, anything duplicated on other pages.

---

### PRODUCT PAGE (/product) — "THE DEPTH"

**Section 1: Hero**
- "Knowledge Resolution, not knowledge management"

**Section 2: Four Pillars**
- Full descriptions with custom SVG icons
- Each pillar shows its sub-modules (Sources, Resolve, Health, Feedback, etc.)
- This is where visitors understand the platform DEPTH
- Product screenshots embedded next to each pillar description

**Section 3: Knowledge Sources**
- "100+ sources. Zero migration."
- Source type icons in a flowing grid

**Section 4: Agent Marketplace Preview (NEW)**
- "Build AI agents for YOUR users"
- Show 4-6 agent type cards (User Manual, Context, Tech Doc, etc.)
- Signal the platform play — this isn't just a tool, it's infrastructure

**Section 5: 18 Problems Diagnostic**
- Full 3×6 grid
- Uniform tile sizes, accent-colored backgrounds
- "If you recognize five or more..."

**Section 6: Four USPs**
- Full descriptions, 2×2 grid
- Distinct left-border accent colors

**Section 7: Competitor Positioning**
- Three columns: Enterprise Search / Knowledge Bases / Support Chatbots
- aiCartograph highlighted as the fourth option

**Section 8: CTA**

---

### HOW IT WORKS (/how-it-works) — "THE DEMO"

**Section 1: Hero**
- "From question to resolution in seconds"

**Section 2: Use Cases — TABBED INTERFACE (CRITICAL CHANGE)**
- NOT stacked stories. Use TABS or a DROPDOWN to switch between use cases in the SAME viewport.
- Tabs: Customer Support | Engineering Onboarding | Sales Enablement | HR/Policy | Compliance | Product Teams
- Each tab shows a before/after split:
  - Left: "Without aiCartograph" (pain points, time wasted)
  - Right: "With aiCartograph" (resolution, time saved)
- DO NOT USE PEOPLE NAMES. Use role descriptions:
  - "A Customer Success Manager at a Global CPG Company"
  - "A New Engineer at an Enterprise SaaS Platform"
  - "A Sales Rep preparing for an Enterprise deal"
  - "An HR Manager handling a policy question"
  - "A Compliance Officer auditing documentation"
  - "A Product Manager researching feature requirements"
- Each tab includes quantified contrast: "2 hours wasted" vs "3 minutes to resolve"
- Mention platform capabilities: "aiCartograph's cross-source synthesis pulled from 3 sources simultaneously"

**Section 3: Behind the Scenes — n8n-style Architecture**
- The interactive architecture visualization described in 2A
- Full-width, animated, expandable nodes
- This is the technical credibility section

**Section 4: CTA**

---

### PRICING (/pricing) — REVISITED

**Section 1: Hero**
- "Start free. Scale with value."
- Remove the "PRICING" pill label (already noted)

**Section 2: Pricing Cards**
- Four tiers with DISTINCT header colors (already built)
- ALL tiers have CTAs (already built)
- FIX: No repeated elements between cards. Currently the feature lists may overlap. Each tier should show ONLY what's NEW at that level, with a "Everything in [Previous Tier]" line at top.
- Founding member banner below cards (already built)

**Pricing model (verify these are current):**
| Tier | Base | Per User | Key Features |
|------|------|----------|-------------|
| Free | $0 | $0 | 50 sources, basic search, 100 queries/mo |
| Starter | $200/mo | +$10/user | Connect + Resolve + Feedback, unlimited |
| Professional | $500/mo | +$20/user | + Detect + Analytics + Governance |
| Enterprise | Custom | +$35/user | + Agent Marketplace + Embedded + Custom API |

**Section 3: Usage-based pricing**
- Customer-facing: $0.30–$0.75 per resolution

**Section 4: FAQ**
- 2-column grid, compact cards (already improved)
- Verify no redundant questions

---

### ABOUT (/about) — MAJOR REVAMP

**Section 1: Hero**
- "Building the Knowledge Resolution category"

**Section 2: Vision + Mission**
- Large typography, prominent placement

**Section 3: Brand Origin**
- "Why aiCartograph?" — cartographer metaphor
- Updated line: "so every question finds its answer"

**Section 4: Team — COMPLETELY REWORKED**
- **REMOVE "AI Co-Founder" entirely.** No mention of Compass as a team member. Enterprise customers will not take this seriously.
- Show:
  - **Atlas** — Founder & CEO. Real bio focused on the problem he saw and why he's building this.
  - **The Team We're Building** — Show 7-8 roles as cards with descriptions of what each person brings. This signals ambition, investment-readiness, and organizational maturity.
    - CTO / Technical Co-founder — "Owns the resolution engine architecture, vector infrastructure, and AI pipeline"
    - Head of AI/ML — "Leads the RAG pipeline, semantic analysis, and knowledge health algorithms"
    - Head of Product — "Translates customer pain into platform capabilities"
    - Head of Engineering — "Scales the platform from MVP to enterprise-grade"
    - Senior Full-Stack Engineers (2-3) — "Build the modules, integrations, and agent framework"
    - Head of Customer Success — "Ensures every customer achieves resolution"
    - Head of Growth — "Builds the go-to-market engine"
  - Each role card: title, one-line description, optional "We're hiring" badge

**Section 5: Operating Principles ("How We Think")**
- Five principles with exact wording (already built and correct)

**Section 6: Foundational Layer (Six Verticals)**
- Already correct with Legal & Compliance replacing Developer Relations

**Section 7: CTA**

---

### CONTACT (/contact) — MINOR FIXES

- Form + Calendly side by side in ONE viewport (already improved)
- Reduce spacing
- Verify "Based in the UK, serving globally" is accurate

---

## 2C. FOOTER

- Logo + tagline + "Request Early Access" BUTTON (not email input)
- Product column: Features, How It Works, Pricing
- Company column: About, Contact
- NO Resources column (Knowledge Base and Blog don't exist)
- © 2026 aiCartograph + email
- Dark canvas, consistent with rest of site

---

## 2D. NAVBAR

- Keep floating glassmorphism navbar
- Add "Log In" and "Sign Up" buttons (already built)
- Active page indicator on current nav item
- Mobile hamburger menu (already built)

---

# STREAM 3: PRIORITIES AND SEQUENCING

## Phase 1 — Do First (Critical)
1. Design system overhaul — kill alternating sections on BOTH website AND platform
2. Website product visuals — screenshots/mockups of current platform
3. Homepage revamp with platform preview section
4. How It Works — tabbed use cases (no names, role descriptions, 6+ tabs)
5. About page — remove AI Co-Founder, add team-we're-building section
6. First-time intent capture for platform
7. Sidebar: hamburger collapse, remove redundant user profile
8. All delta fixes from G1-G5, G8

## Phase 2 — Do Second (High Value)
9. n8n-style architecture visualization
10. Agent Marketplace shell with Coming Soon cards
11. User Manual Agent MVP (full UI + mock crawl)
12. Product page revamp with agent marketplace preview
13. Pricing page cleanup (no repeats between tiers)
14. Expand document templates

## Phase 3 — Do Third (Polish)
15. Contact page condensed
16. Additional use case tabs content
17. More agent templates becoming functional
18. Platform-wide spacing and container audit

---

# APPENDIX: POINTS ATLAS RAISED THAT I INITIALLY MISSED

1. ❌ Website has no images/videos/GIFs of the platform — I acknowledged this in text but didn't include it as a build item initially. NOW INCLUDED as Stream 2 critical item.

2. ❌ n8n animation architecture didn't happen — I said "the FlowDiagram is decent" when Atlas explicitly said it wasn't what he asked for. NOW INCLUDED as a proper build spec.

3. ❌ Design system should apply to PLATFORM too, not just website — Atlas said "WHY CANT THIS BE APPLIED FOR THE PLATFORM AS WELL" and he's right. The alternating light/dark issue exists in the platform too (light mode has similar problems). NOW INCLUDED as platform-wide design system overhaul.

4. ❌ Modules aren't "13 separate things" — they're organized under 4 pillars. Each pillar is a product in itself. I was listing them flat when Atlas thinks in pillars. NOW INCLUDED with correct hierarchy.

5. ❌ Pricing has repeated elements — Atlas sent screenshots showing redundancy. NOW INCLUDED as pricing cleanup.

6. ❌ Sidebar collapse should be hamburger icon — Atlas sent a screenshot showing the current chevron + "Collapse" text. NOW INCLUDED.

7. ❌ Redundant user profile in sidebar AND topbar — Atlas sent screenshots showing both. NOW INCLUDED as fix.

8. ❌ Use case tabs should NOT use people names — Atlas explicitly said "DONT USE PEOPLE NAME, HAVE USECASES AS TABS." NOW INCLUDED with role descriptions only.

---

*"If our own website wouldn't pass aiCartograph's quality checks, it's not ready to ship."*
*— Atlas & Compass, March 2026*
