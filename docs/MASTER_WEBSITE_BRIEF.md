# aiCartograph — Master Website Brief
## The ONLY document Claude Code needs. Read ENTIRELY before touching any code.

**Date:** March 15, 2026
**From:** Atlas (Founder) + Compass (AI Co-founder)
**Priority:** CRITICAL — the site is live and needs to look like a million-dollar company

---

# PART 1: BRAND IDENTITY

## Name
- **aiCartograph** (lowercase ai, capital C)
- **Never:** AICARTOGRAPH, Aicartograph, AI CARTOGRAPH, AiCartograph

## Category
- Website (customer-facing): **"Knowledge Resolution Platform for SaaS Companies"**
- The tagline below the category: **Connect → Resolve → Detect → Close the Loop**

## Vision
**Every answer. Everywhere. The moment it matters.**

## Mission
**Make knowledge work, not just exist — so what organizations know becomes what gets resolved, for everyone who depends on it.**

## Brand Origin
**"A cartographer maps territory so others can navigate. We map organizational knowledge so everyone can resolve."**

## Logo Files
- `/assets/aiCartograph_logo_final_dark.svg` — dark backgrounds (hero, dark sections)
- `/assets/aiCartograph_logo_final_light.svg` — light backgrounds
- `/assets/aiCartograph_icon_final.svg` — **USE AS FAVICON** (set in `<head>`)

## Color Palette (ALL 8 MUST BE VISIBLE on the site)
```
#080604  — True black (text only, sparingly)
#0c2329  — Deep (primary dark bg — use this, NOT pure black)
#223e49  — Dark (cards on dark bg, secondary dark)
#44696a  — Mid (body text on light bg, borders)
#49818d  — Teal (secondary accent, "ai" in logo)
#4597b0  — Bright (PRIMARY accent — CTAs, links, highlights, i-dot)
#62acbb  — Accent (hover states, gradients, secondary highlights)
#97c1cc  — Light (subtext on dark bg, light accents)
#FDFFFF  — White (headlines on dark bg)
```

### Color Usage Rules
- Dark sections: bg #0c2329, cards #223e49, headlines #FDFFFF, subtext #97c1cc, accent #4597b0
- Light sections: bg #F0F7FA or #E8F4F7, cards white with #44696a border, headlines #0c2329, body #44696a
- ALTERNATE dark and light sections throughout every page for visual rhythm
- GRADIENTS: Use `linear-gradient(135deg, #4597b0, #62acbb, #97c1cc)` for dividers, card borders on hover, button backgrounds
- Each of the 4 pricing tiers should use a DIFFERENT palette color for its header
- The 18 Problems tiles should alternate between 2-3 palette background colors, not all identical

## Typography
- **H1 (page titles):** Georgia, 48-56px, bold
- **H2 (section titles):** Georgia, 32-36px, bold
- **H3 (card titles):** System font / Helvetica, 20-24px, semibold
- **Body:** System font / Helvetica, 16px, regular
- **Section labels** (like "THE KNOWLEDGE DIAGNOSTIC"): 12-14px, uppercase, letter-spacing: 4px, color #4597b0
- **CRITICAL:** Headers must be CLEARLY larger than body text. If they look similar, the hierarchy is broken.

---

# PART 2: CRITICAL BUGS — FIX BEFORE ANYTHING ELSE

### Bug 1: "By the Numbers" shows ZEROS
The counter section displays 0/0/0. Fix the intersection observer or hardcode:
- **18** — Knowledge problems we diagnose
- **6** — Organizational verticals served
- **4** — Framework pillars

### Bug 2: Dead footer links
**Remove** the entire "Resources" column from the footer. "Knowledge Base" and "Blog" link to `#` which is unacceptable. Replace with nothing — just Product and Company columns.

### Bug 3: Favicon
Set `/assets/aiCartograph_icon_final.svg` as the favicon in `<head>`. Verify it renders.

### Bug 4: Email capture
Every "Request Early Access" button MUST trigger Buttondown email capture. Test every instance on every page. If Buttondown isn't wired up, wire it up. API key is configured.

### Bug 5: Meta tags
Ensure these are set:
- `<title>aiCartograph — Knowledge Resolution Platform for SaaS Companies</title>`
- `<meta name="description" content="Every answer. Everywhere. The moment it matters. aiCartograph makes organizational knowledge resolve problems for everyone who depends on it.">`
- `<meta property="og:image" content="/assets/aiCartograph_icon_final.svg">`

---

# PART 3: CONTENT ARCHITECTURE — ZERO DUPLICATION

**THE #1 PROBLEM:** The same content blocks appear on multiple pages. A visitor clicking through sees the same four pillars 3 times, the same 18 problems grid twice, the same competitor positioning twice. This makes the site feel lazy and repetitive.

**RULE: Every section lives on ONE page only. No exceptions.**

Here is the definitive content map:

| Content Block | Lives On | NOT On |
|---|---|---|
| Four pillars (full descriptions) | /product | NOT homepage, NOT how-it-works |
| Four pillars (one-liner teaser strip) | / (homepage) | This is a DIFFERENT, shorter version |
| 18 Problems Diagnostic (full grid) | /product | NOT homepage |
| 18 Problems (teaser — 2 lines + CTA) | / (homepage) | Just a teaser, not the grid |
| Four USPs (full descriptions) | /product | NOT homepage |
| Four USPs (one-liner cards) | / (homepage) | DIFFERENT, shorter version |
| Competitor positioning | /product | NOT homepage |
| Sarah's before/after story | /how-it-works | NOT product |
| Second persona story | /how-it-works | New content |
| Behind the scenes flow | /how-it-works | New content |
| Knowledge sources (100+) | /product | Nowhere else |
| Vision + Mission | /about | Homepage hero has vision only |
| Team bios | /about | Nowhere else |
| Brand origin (cartographer) | /about | Nowhere else |
| Foundational Layer (6 verticals) | /about | Nowhere else |
| Pricing tiers | /pricing | Nowhere else |
| Pricing FAQ | /pricing | Nowhere else |

---

# PART 4: PAGE-BY-PAGE SPECIFICATIONS

---

## Homepage (/) — "THE HOOK"
**Purpose:** Make someone say "I need to learn more" in 15 seconds. SHORT. 4-5 sections. 8-10 second scroll.

### Section 1: Hero [dark bg #0c2329]
- Logo (dark SVG)
- "Knowledge Resolution Platform for SaaS Companies" — small, #97c1cc
- **"Every answer. Everywhere. The moment it matters."** — H1, Georgia, 48-56px, #FDFFFF
- Mission text below — 16px, #97c1cc
- Two CTAs side by side:
  - "Request Early Access" → solid gradient button (Buttondown capture)
  - "Schedule a Conversation →" → outline button (Calendly link)
- Background: Animated topographic lines or subtle gradient animation

### Section 2: Framework Strip [light bg #F0F7FA]
- **"Connect → Resolve → Detect → Close the Loop"** — H2
- Four items in a HORIZONTAL row (not stacked vertically)
- Each: Icon + bold label + ONE sentence (max 15 words). NOT full paragraphs.
- Example: "**Connect** — Ingest from 100+ sources. Zero migration."
- Link at bottom: "See the full product →" → /product

### Section 3: Problem Teaser [dark bg #0c2329]
- **"We mapped 18 ways knowledge fails in organizations."** — H2
- **"How many is yours living with?"** — subtext
- Show ONLY 6 problem names in a single row as preview tiles (not all 18)
- Button: "Take the Full Diagnostic →" → /product#diagnostic

### Section 4: By the Numbers [light bg]
- Three stat cards in a row:
  - **18** — Knowledge problems we diagnose
  - **6** — Organizational verticals served
  - **4** — Framework pillars
- Animated counter (count up on scroll into view)
- **FIX THE ZEROS**

### Section 5: CTA Banner [dark bg, compact]
- "Ready to make your knowledge actually work?"
- Vision line
- Two CTAs
- Keep compact — py-10 max

**REMOVE from homepage:** Full pillar descriptions, full 18 problems grid, full USP section, competitor positioning section. All of these move to /product.

---

## Product Page (/product) — "THE CONVINCE"
**Purpose:** Deep dive for someone already interested. The "sell me" page. This is the LONGEST page on the site.

### Section 1: Hero [dark]
- "Knowledge Resolution, not knowledge management"
- Sub: "aiCartograph doesn't replace your knowledge tools. It makes all of them actually work."

### Section 2: Four Pillars [alternating cards or sections]
- Full descriptions with custom SVG icons for each pillar
- Each pillar gets generous space — either stacked full-width sections with alternating dark/light bg, or large cards
- This is the ONLY place full pillar descriptions appear

### Section 3: Knowledge Sources [dark bg]
- **"100+ sources. Zero migration."** — H2
- Grid of source type icons with labels: Wikis, Help Centers, Code Repos, Communication, Project/CRM, Storage
- Each icon has a distinct accent color
- Sub: "Your knowledge stays where it is. We make it work."

### Section 4: 18 Problems Diagnostic [dark bg] — id="diagnostic"
- **"The Knowledge Diagnostic"** — section label
- **"How many of these is your organization living with?"** — H2
- 6×3 grid of tiles
- **FIX:** All tiles must be UNIFORM size — same width, same height, same padding. Use CSS Grid with `grid-template-columns: repeat(3, 1fr)` and equal row heights
- Tiles should alternate between 2-3 palette bg colors (not all identical)
- Numbers in #4597b0, names in white, bold
- Bottom line: "If you recognize five or more, your organization has a knowledge resolution problem."

### Section 5: Four USPs [light bg, 2×2 grid]
- Full descriptions with USP label ("USP 1", "USP 2" etc.)
- Cards must be UNIFORM height (use align-stretch or min-height)
- Each card gets a distinct left-border accent color from the palette

### Section 6: Competitor Positioning [dark bg]
- **"Three approaches exist. All optimize for retrieval."** — H2
- Three columns: Enterprise Search / Knowledge Bases / Support Chatbots
- Each: What they do (green/positive) + What they don't (red/negative)
- Bottom row: aiCartograph = "Resolves. Detects. Closes the loop." — highlighted, different from the three above
- This section appears ONLY here

### Section 7: CTA Banner

---

## How It Works (/how-it-works) — "THE DEMO"
**Purpose:** Show, don't tell. Feel like watching a product walkthrough.

### Section 1: Hero [dark]
- **"From question to resolution in seconds"** — H1
- Sub: "See how aiCartograph works in practice — step by step."

### Section 2: Sarah's Story [split layout]
- **Left column:** "Without aiCartograph" — muted tones, shows the pain
  - Step 1: Sarah gets a question about SSO config for Enterprise v3.2
  - Step 2: Searches help center, finds 4 articles, none specific to v3.2
  - Step 3: Slacks an engineer, waits 2 hours
  - Step 4: Customer waits, gets a half-right answer a day late
  - Step 5: Nobody knows this happened. Nobody fixes the knowledge.
- **Right column:** "With aiCartograph" — bright tones, shows the resolution
  - Step 1: Sarah asks aiCartograph the same question
  - Step 2: System pulls from SSO guide, v3.2 release notes, Enterprise config spec
  - Step 3: Assembles precise, step-by-step answer in seconds
  - Step 4: Sarah resolves the ticket in 3 minutes
  - Step 5: aiCartograph detects this was asked 12 times. Signals the knowledge team.
- **Bottom line:** "This is the difference between retrieval and resolution."
- This story appears ONLY on this page — NOT on product page

### Section 3: Second Persona [similar split]
- Different role — suggest: "Dev gets interrupted" or "New hire can't onboard"
- Same before/after format
- Shows aiCartograph works beyond support — breadth signal

### Section 4: Behind the Scenes [dark bg]
- Visual flow diagram (SVG or animated):
  - User asks question → Connect (ingest from sources) → Resolve (synthesize) → Deliver answer
  - Simultaneously: Detect (flag stale content) → Close Loop (signal to creators)
- More technical but still accessible
- Shows the infrastructure at work

### Section 5: CTA Banner

---

## Pricing (/pricing) — MOSTLY GOOD, MINOR FIXES

### Fix: Tier card headers
Use 4 distinct palette colors for the tier headers:
- Free: #97c1cc (light)
- Starter: #49818d (teal)
- Professional: #223e49 (dark)
- Enterprise: #0c2329 (deep)

### Fix: Pricing model
Ensure the hybrid model is clear:
- Free: $0 / $0
- Starter: $200/mo base + $10/active user
- Professional: $500/mo base + $20/active user
- Enterprise: Custom base + $35/active user

### Keep: FAQ section, usage-based pricing section — both are good

---

## About (/about) — MOSTLY GOOD, MINOR FIXES

### Fix: Vision/Mission typography
These should be LARGE — Georgia, 32-36px for vision, 24px for mission. They should dominate the top of the page. Not buried in small text.

### Fix: "What we believe" section
We decided to defer formal values. Rename this section to **"How we think"** or **"Operating principles"** — not "values." Keep the content if it's good, just reframe.

### Keep: Brand origin, team bios, foundational layer verticals — all good

---

## Contact (/contact) — KEEP SIMPLE
- Calendly embed (prominent)
- Buttondown email capture
- hello@aicartograph.com
- No fluff

---

# PART 5: VISUAL DESIGN RULES

## Container Uniformity (CRITICAL)
- All cards within a grid MUST be the same height. Use `align-items: stretch` or `min-height`
- All cards must have identical padding (p-6 or p-8)
- All cards must have identical border-radius (rounded-xl)
- All grid gaps must be consistent (gap-6)
- The 18 Problems grid MUST use `grid-template-columns: repeat(3, 1fr)` with equal row heights — NO variable sizing
- Test at 1440px, 1280px, 1024px, 768px, 375px widths

## Section Rhythm
- ALTERNATE dark (#0c2329) and light (#F0F7FA) sections on every page
- Each section transition should have a gradient divider (already built — ensure deployed)
- No two adjacent sections with the same background color

## Animations
- Scroll reveal: Sections fade-in-up on scroll (intersection observer, staggered 100ms per child)
- Counter: Numbers count up when entering viewport (for the 18/6/4 stats)
- Cards: Lift on hover (translateY -2px, shadow increase)
- CTAs: Gradient shift on hover
- Hero: Subtle background animation (topographic lines)
- Do NOT over-animate — subtle and purposeful only

## Real Estate
- Section padding: py-16 to py-20 MAX. Not py-24 or py-32 — that wastes vertical space
- CTA banners: compact — py-8 to py-10
- Hero: Should be ~80vh, not 100vh with empty space
- If a section has 3 cards, use a 3-column grid. If 4 cards, use a 2×2 grid. Fill the horizontal space.
- No section should have content that only occupies 40% of the viewport width while the rest is empty

## Mobile
- All grids collapse to single column on mobile
- Navigation becomes hamburger menu
- Pricing cards stack vertically
- Test thoroughly on 375px width

---

# PART 6: FOOTER

```
[Logo (dark SVG)]
"Knowledge Resolution Platform for SaaS Companies"
"Making knowledge work, not just exist."

[Email capture — Buttondown]

[Column: Product]
  Features → /product
  How It Works → /how-it-works  
  Pricing → /pricing

[Column: Company]
  About → /about
  Contact → /contact

[NO Resources column — remove Knowledge Base and Blog links]

© 2026 aiCartograph. All rights reserved.
hello@aicartograph.com
```

---

# PART 7: AI QUERY AGENT (COMPASS WIDGET)

Floating bottom-right chat widget with:
- Business email gate (blocks gmail/yahoo/hotmail)
- Contextual answers from our value props and documentation
- Suggested quick questions: "What does aiCartograph do?", "How does pricing work?", "What problems do you solve?"
- Branded with palette colors
- Typing indicator animation
- Compass icon

---

# PART 8: DEPLOY CHECKLIST

- [ ] No zeros on homepage counters (must show 18, 6, 4)
- [ ] No dead links anywhere (especially footer)
- [ ] Every "Request Early Access" captures email via Buttondown
- [ ] Favicon set to aiCartograph icon SVG
- [ ] ZERO content duplicated across pages
- [ ] All 8 palette colors visibly used across the site
- [ ] Cards within grids are uniform height
- [ ] 18 Problems grid tiles are uniform size
- [ ] Scroll animations working
- [ ] Dark/light sections alternate on every page
- [ ] Mobile responsive at 375px
- [ ] Calendly links work (calendly.com/ai-cartograph/30min)
- [ ] Meta tags set (title, description, og:image)
- [ ] Lighthouse performance > 90

---

*"If our own website wouldn't pass aiCartograph's quality checks, it's not ready to ship."*

*— Atlas & Compass, March 2026*
