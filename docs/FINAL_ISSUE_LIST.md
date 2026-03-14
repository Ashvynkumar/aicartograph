# aiCartograph Website — FINAL Issue List & Fix Instructions
## Read ENTIRELY. Execute top to bottom. No skipping.

---

## GLOBAL ISSUES (Apply across ALL pages)

### G1: Container size inconsistency
Every card/tile/button within the same row or grid MUST be identical dimensions. Currently cards and buttons are different heights and widths within the same section. Fix with:
- CSS Grid `grid-template-columns: repeat(N, 1fr)` for equal widths
- `align-items: stretch` or explicit `min-height` for equal heights
- Identical padding on all cards in a group (p-6 everywhere)
- Audit EVERY section on EVERY page for this

### G2: Text wrapping creating unnecessary lines
Short phrases are breaking across 2-3 lines when they should fit on 1. Examples:
- "Knowledge Resolution Platform for SaaS Companies. Making knowledge work, not just exist." — showing as 3 lines in the footer. Should be 1-2 lines max.
- "Request Early Access" button text wrapping to 3 lines in hero
- This happens across the entire site. Increase container widths, reduce font sizes where needed, or use `white-space: nowrap` for short labels

### G3: Excessive vertical spacing / wasted real estate
Too much empty space between sections and within sections. Rules:
- Section padding: py-12 to py-16 MAX (not py-20, py-24, py-32)
- Card gaps: gap-4 to gap-6 (not gap-8+)
- CTA banners: py-8 max
- FAQ section: reduce spacing between items
- If content can fit in one viewport, DON'T make it scroll

### G4: "Request Early Access" email input appears too many times
The email capture + "Request Early Access" button combo appears in:
- Hero section
- CTA banner at bottom
- Footer
That's 3 times on one page. Remove from footer — keep ONLY in hero and bottom CTA. The footer should have a simple "Request Early Access" button that scrolls to the hero or opens a modal, NOT a full email input field.

### G5: "30-minute call" mentioned too many times
The Calendly/30-min-call CTA is repeated excessively across pages. Mention it TWICE per page max: once in the hero area, once in the closing CTA. Remove all other instances.

### G6: Duplicate content across pages (STILL not fixed)
- Four pillars: word-for-word on homepage AND product page. Homepage should have ONE-LINER teasers only. Full descriptions ONLY on product.
- 18 Problems: full grid on homepage AND product. Homepage should show 6 tiles as teaser. Full 18 ONLY on product.
- Competitor positioning: on homepage AND product. Keep ONLY on product.
- Remove Sarah's story from product page — it belongs ONLY on How It Works.

### G7: Dead footer links
Some pages still have "Knowledge Base" and "Blog" linking to #. Remove the Resources column from the footer on ALL pages. Only keep Product and Company columns.

### G8: "By the numbers" counter still shows zeros on homepage
Fix to show: 18 / 6 / 4. If intersection observer isn't firing, hardcode the values.

---

## PAGE-SPECIFIC ISSUES

---

### HOMEPAGE

#### H1: Hero CTA containers are 3 different sizes (Screenshot 1)
The email input, "Request Early Access" button, and "Schedule a Conversation" button are all different heights and widths. They should be:
- Same height (48px or 52px)
- "Request Early Access" should NOT wrap to 3 lines — make the button wider or reduce font size
- All three elements aligned on the same baseline in a single row
- Email input and button should look like one connected unit (input-group style)

#### H2: Homepage diagnostic teaser tiles uneven (Screenshot 2)
The 6 preview tiles should be IDENTICAL size. Currently they look slightly different. Use `grid-template-columns: repeat(6, 1fr)` with fixed height.

#### H3: Homepage still too long
Strip to 5 sections max: Hero → Framework strip (one-liners) → Problem teaser (6 tiles) → By the numbers → CTA. Everything else lives on other pages.

---

### PRODUCT PAGE

#### P1: 18 Problems grid — too much wasted space (Screenshot 4)
The 3×6 grid has excessive padding around and between tiles. The tiles are appropriately sized but the section takes up too much vertical space. Reduce:
- Section padding above and below the grid
- Gap between tiles (gap-3 or gap-4, not gap-6)
- Consider making tiles more compact — less internal padding
- The grid should feel dense and impactful, not floaty

---

### HOW IT WORKS PAGE

#### W1: Case studies lack impact (Screenshot 5)
The before/after stories (Sarah, Priya) are just text lists. They need:
- **Anonymize the names** — don't use "Sarah" and "Priya". Use role descriptions: "A Customer Success Manager at a Global CPG Company" / "A New Engineer at an Enterprise SaaS Platform"
- The "Without" column should have a label badge. Currently Sarah's "without" panel has no label — only the "with" panel has a green badge.
- Add visual differentiation: "Without" cards should have a subtle red/warning left border. "With" cards should have a green/success left border.
- Consider adding small metrics: "2 hours wasted" vs "3 minutes to resolve" — make the contrast quantifiable
- Mention platform capability, not just narrative: "aiCartograph's cross-source synthesis pulled from 3 sources simultaneously"
- Ideally show a mock screenshot or GIF of the platform resolving the query — even if it's a designed mockup, not a real product screenshot. This makes it tangible.

#### W2: "Under the Hood" section is wasted potential (Screenshot 6)
This is the most technically impressive section on the entire site and it's displayed in the most basic way possible. The 4-step flow (Connect → Resolve → Detect → Close the Loop) with arrows is fine but boring.

**What it should be:** An animated, n8n-style or Figma-style workflow visualization:
- Show data flowing through nodes
- Each node (Connect, Resolve, Detect, Close) expands on hover or click to show sub-components
- Animated lines/particles flowing between nodes
- The 4 tech cards below (Semantic Search, RAG Pipeline, Consumption Signals, Real-time Sync) should be PART of the flow diagram, not separate static cards underneath
- Think: interactive architecture diagram that reveals complexity progressively — show enough to signal "this is serious technology" without disclosing everything
- Even if not interactive, at minimum use an animated SVG flow diagram with moving elements, not static boxes with arrows

---

### PRICING PAGE

#### PR1: Remove "PRICING" label above the hero (Screenshot 7)
The section label "PRICING" pill above "Start free. Scale with value." is redundant — the user clicked the Pricing nav link, they know where they are. Remove it. Instead, make the Pricing tab in the navbar highlighted/active when on this page.

#### PR2: "Request Early Access" only on Professional tier (Screenshot 7)
Currently only the Professional card has a CTA button. ALL tiers should have CTAs:
- Free: "Get Started Free"
- Starter: "Request Early Access"
- Professional: "Request Early Access" (highlighted as "Most Popular")
- Enterprise: "Schedule a Conversation"

PLUS add a banner below all 4 tier cards:
**"Request Early Access and unlock founding member privileges"** — single CTA, spans full width. Makes the value prop of early access clear.

#### PR3: FAQ section wastes space (Screenshot 8)
Too much vertical padding between FAQ items. Condense:
- Use accordion style with tighter spacing
- Each Q/A pair should have py-3, not py-6+
- The entire FAQ section should fit in one viewport without scrolling
- Consider 2-column layout for FAQs if they're short enough

---

### ABOUT PAGE

#### A1: Brand origin line needs refinement (Screenshot 9)
"A cartographer maps territory so others can navigate. We map organizational knowledge so everyone can resolve."

"Can resolve" is vague — resolve WHAT? Fix to:
**"A cartographer maps territory so others can navigate. We map organizational knowledge so everyone finds the answers they need."**
OR: **"...so every question finds its answer."**

#### A2: Foundational Layer verticals need updating (Screenshot 9)
- "Customer Support & CS" — what is "CS"? Spell out: "Customer Support & Customer Success"
- "Developer Relations" — too niche for a founding company page. Replace with **"Legal & Compliance"** — this is more universal and signals enterprise readiness
- Add a 7th or replace: consider adding **"Finance & Procurement"** — knowledge about budgets, vendors, contracts is a huge pain point

#### A3: "How We Think" / Operating Principles (Screenshot 9)
The "What we believe" section should be renamed **"How we think"** and should include these EXACT five principles:

1. **Resolution over retrieval.** We don't celebrate finding information. We celebrate solving problems.
2. **Consumption defines quality.** Knowledge isn't good because it was written well. It's good because it resolved something.
3. **The loop must close.** Every unanswered question is a signal. Every signal must reach someone who can act on it.
4. **Knowledge neglected is knowledge lost.** We treat organizational knowledge as a living asset — monitored, maintained, and accountable.
5. **Built for the one who needs the answer.** Every decision prioritizes the consumer of knowledge, not the creator.

Replace whatever is currently there with these five. Exact wording.

---

### CONTACT PAGE

#### C1: Condensed layout (Screenshot 10)
The contact form + Calendly embed should fit in ONE viewport without scrolling. Currently there's too much space:
- Reduce form field spacing
- Make the Calendly embed smaller or show just the "Schedule" button that opens in a new tab/modal
- Remove duplicate "30 minute call" references
- The left form and right Calendly should be equal height, side by side, no scrolling needed

#### C2: "Based in the UK, serving globally"
Is this accurate, Atlas? Verify. If not, change to wherever you're actually based.

---

## VISUAL DESIGN ENHANCEMENTS

### V1: Under the Hood — Interactive Architecture Diagram
Replace the static Connect→Resolve→Detect→Close boxes with an animated workflow:
- n8n-style or Lucidchart-style node graph
- Animated data particles flowing between nodes
- Sub-components visible on hover (e.g., hovering "Resolve" reveals: Semantic Search, RAG Pipeline, Context Assembly)
- Use our palette colors for different node types
- Even a well-designed animated SVG would be 10x better than current static boxes

### V2: Case Study Enhancement
Add mockup screenshots or GIF animations showing:
- The aiCartograph resolution interface
- A before/after visual (messy search results vs clean resolution)
- Even a designed mockup (not real product) adds tangibility

### V3: Pricing Cards — Distinct Colors
Each tier header should use a different palette color:
- Free: #97c1cc
- Starter: #49818d  
- Professional: #4597b0 (most prominent — "Most Popular")
- Enterprise: #0c2329

---

## PRIORITY ORDER

**Do first (breaks credibility):**
1. G1 — Container sizes
2. G8 — Fix zeros
3. H1 — Hero CTA sizing
4. G4 — Remove duplicate email captures
5. G6 — De-duplicate content across pages
6. G7 — Dead footer links

**Do second (improves polish):**
7. G2 — Text wrapping
8. G3 — Spacing reduction
9. PR2 — CTA on all pricing tiers + banner
10. A3 — Operating principles (exact wording provided)
11. A1 — Brand origin line fix
12. A2 — Verticals update
13. W1 — Case study anonymization + enhancement
14. C1 — Contact page condensed

**Do third (creates wow factor):**
15. W2 — Interactive architecture diagram
16. V2 — Case study mockups
17. V3 — Pricing card colors
18. PR3 — FAQ condensed

---

*"If our own website wouldn't pass aiCartograph's quality checks, it's not ready to ship."*

*— Atlas & Compass, March 2026*
