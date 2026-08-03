# Reposition: Business Software. Business Automation. AI Integration.

Date: 2026-08-02
Status: **in build**
Owner: Tyler Preisser (Preisser Solutions)

This is the single source of truth for the repositioning. Every build agent works from
this file. If something here disagrees with an older doc, this file wins.

---

## 1. Why this is happening

The site currently sells **AI agents, marketing, growth, and local SEO**. That is not
what the business does anymore. Over the last several months the actual work has been
building **internal business platforms** — admin dashboards, operational databases,
document-processing pipelines, and the automations between them — for specific
businesses, delivered fast because they are built with AI.

Three shipped systems prove it, and they are the receipts this rewrite is built on:

| System | What it is | Live |
|---|---|---|
| **FarmBooks** | Photograph a farm bill; get Schedule-F-ready books. Vision + OCR extraction, field/entity allocation, review queue, `.xlsx` output with live SharePoint sync. | farm-books.com (CF Worker) + `farmbooks-api` (Azure Container Apps, Cosmos) |
| **C3 Studio** | One admin login that runs a church's website, native iOS app, scheduling, comms, care, giving, and kids check-in. | `c3-studio.tylerpreisser.workers.dev` |
| **NWKS Encounter** | Registration → confirmation → reminder → roster for two annual retreat events, with an admin CRM, campaign scheduler, and testimony intake. | `nwks-encounter-site.pages.dev` |

## 2. The three pillars

These are the spine of the site. Order is fixed. Punctuation is fixed — each ends with
a period.

1. **Business Software.** — the platform itself. Admin dashboards, customer and member
   databases, portals, internal tools. The thing your team logs into.
2. **Business Automation.** — the work that happens without anyone doing it. Registration
   → confirmation → reminder. Bill → categorized ledger. Form → CRM → follow-up.
3. **AI Integration.** — AI put exactly where it earns its place: reading documents,
   classifying, drafting. Always with a human gate on anything that matters.

**Visual rule (non-negotiable):** pillars 1 and 2 render in the primary text color.
**"AI Integration." renders in `var(--color-primary)` (`#0D95E8`)** — the bright blue —
so it visually separates from the other two. This is the brand device. It appears in the
hero and anywhere the three are listed together.

## 3. The positioning argument

The buyer is a business owner who has outgrown spreadsheets and shared inboxes but
cannot justify Salesforce or Workday.

- Everything lands in **one place** instead of six tools that don't talk.
- It is **built for how they actually work** — not configured around someone else's
  assumptions about their industry.
- It is **better** *because* it isn't a generic platform. There is nothing to turn off,
  no unused modules, no consultant needed to change a field.
- It ships in **weeks, not quarters**, because it is built with AI — and it is
  **founder-led**, so the person who scopes it is the person who builds it.
- No six-figure platform bill.

**Not everyone needs all of it.** Some businesses needed a whole admin panel. Some needed
one document pipeline. Say that plainly — it is more credible than claiming everyone needs
the full platform.

## 4. Voice and copy rules

- Keep the existing **"we"** voice. 231 pages use it; switching to "I" is a separate,
  site-wide change and is out of scope.
- **Every claim needs a receipt.** If §9 doesn't verify it, don't write it.
- **Banned words:** leverage, seamless, cutting-edge, revolutionize, unlock, supercharge,
  game-changer, empower, "solutions that scale", "in today's fast-paced world", 10x.
- Specific beats superlative. "Reads a co-op grain bill and produces Schedule-F-ready
  books" beats "AI-powered document intelligence."
- No unverifiable competitive claims. Delete **"Nobody else in Kansas is doing this."**
  (`service-pillars.tsx:132`) and **"Almost nobody locally does this yet."**
  (`service-pillars.tsx:116`).

## 5. What changes — the bounded blast radius

Only these files carry the homepage narrative. **Nothing else is in scope tonight.**

| Stream | Files | Change |
|---|---|---|
| **A — data + SEO core** | `src/data/site-config.ts`, `src/data/services.ts`, `src/lib/seo/site.ts`, `src/lib/seo/schema.ts`, `src/app/layout.tsx` | tagline, meta, hero strings, proofBar, valueStrip, service taxonomy, JSON-LD slogan + `makesOffer` + `knowsAbout` |
| **B — hero** | `src/components/home/hero.tsx`, hero block in `src/styles/globals.css` | three-pillar wordmark headline, 2 CTAs (was 3) |
| **C — pillars** | `src/components/home/service-pillars.tsx` | 5 pillars → 3, matching §2 |
| **D — showcase** | new `src/components/home/showcase.tsx`, `src/components/home/case-studies.tsx`, `src/app/page.tsx` | replace the MarCommand section with a FarmBooks-led "what we've built" showcase; reorder case studies |
| **E — case study data** | new `src/data/case-studies/{farmbooks,c3-studio,nwks-encounter}.ts` + `index.ts` + 3 route dirs | three new real case studies |

### Explicitly OUT of scope tonight

- **The ~130 AEO data files** (`src/data/aeo/**`), **77 location pages**, **24 compare
  pages**, **21 blog posts.** These are a working programmatic-SEO asset that uses
  marketing vocabulary as generic topical content. Rewriting them wholesale in one pass,
  without an SEO review, would risk real ranking for no narrative gain. They are the
  next work stream, not this one.
- **`src/data/products/*.ts` (16 products).** These describe *real delivered client
  capabilities* (e.g. the reactivation product is the real Cassidy HVAC engagement).
  They are **not** the same thing as the 16 stub demo folders on the Desktop under
  `Preisser Solutions/agent-demos/`, which are UI shells with fabricated KPI numbers.
  Do not tear down the product pages on the strength of the demo folders being stubs.
  Only the **"AI Agent Catalog" naming** changes tonight.
- **`marcommand-dashboard.tsx`** — marked FROZEN in-code. We remove the *section* from
  the homepage; we do not modify the frozen component.

## 6. The hero

Replace the current H1 (`"AI Automation, Custom Websites, and Local SEO in Hays, Kansas"`)
with the three-pillar wordmark, stacked on three lines:

```
Business Software.
Business Automation.
AI Integration.          <- var(--color-primary)
```

- Eyebrow above it: `Custom software · Hays, Kansas`
- Subhead: *"We build the internal software a business actually runs on — admin
  dashboards, customer databases, document pipelines, and the automations that connect
  them. Purpose-built for how you work, shipped in weeks, without the six-figure
  platform bill."*
- CTAs: **two**, not three. `Start a project` → `/contact`, `See what we've built` →
  `/case-studies`. **Delete the hardcoded `"AI Agent Catalog →"` button**
  (`hero.tsx:285`).
- Keep the canvas wave-mesh background exactly as is — it is perf-tuned, theme-aware,
  and pauses off-screen.
- Each of the three lines animates in on its own with the existing GSAP stagger.

### SEO note on dropping "Hays, Kansas" from the H1

This is a deliberate trade. Local relevance is preserved by keeping Hays/Kansas in the
**eyebrow**, the **subhead**, the **`<title>`**, the **meta description**, the geo meta
tags, and the `LocalBusiness` JSON-LD — all of which are stronger local signals than H1
text. The H1 now carries the brand. Flagging it here so the decision is visible and
reversible.

## 7. Section order on the homepage

| # | Section | Change |
|---|---|---|
| 1 | Hero | rebuilt (§6) |
| 2 | ProofBar | new proof points (§9) |
| 3 | ValueStrip | new pills |
| 4 | ServicePillars | 5 → 3 |
| 5 | ~~MarCommandCallout~~ → **Showcase** | replaced — FarmBooks, C3 Studio, NWKS Encounter |
| 6 | WhyUs | keep; it already works (see §8) |
| 7 | CaseStudies | reorder, drop marketing-only cards |
| 8 | Link cluster | keep as is |
| 9 | CtaSection | reword away from "customers find and choose your business" |

## 8. What we keep

Do not throw away working assets.

- The **founder bio** (`site-config.ts:35-93`) — Hays origin, FHSU engineering, "no
  subcontractors", founder-led. Real, specific, well-written. Keep. Only trim the
  unverifiable *"300,000 followers / 30 million views"* media stat.
- **`WhyUs` card 2 — "AI, Harnessed and Under Control."** — "guardrails, safety
  protocols, code review steps… Three weeks instead of three months." This is already
  the AI Integration pillar argument. Keep it verbatim.
- **`WhyUs` card 3 — "We Stay With It."** Keep.
- The **real client numbers**: HG Oil (95% logistics time, 75%+ inventory accuracy), the
  anonymized MGU (zero missed renewals in 6 months), the anonymized Chicago bus operator
  (full day → 15-minute exception queue). These are automation and internal-tooling wins,
  not marketing wins. Keep and re-label.
- All **NAP / geo / LocalBusiness JSON-LD plumbing**. It's infrastructure, not a claim.

## 9. Verified proof points — the only numbers anyone may use

Every number below was read out of a real repo. Anything not on this list does not go on
the site.

**FarmBooks**
- 1,069 Python engine tests collected; 505 web tests passing across 59 files
- 23 photographed real bills in the test corpus
- Vision recovered a **$92.57** line that OCR alone dropped
- Output: formula-driven `.xlsx` (Month Summary + Ledger, live SUMIF rollups) with
  two-way SharePoint sync where human edits win
- Handwritten bills are **always** routed to human review, never auto-posted

**C3 Studio**
- 18 typed content block types, rendered identically by a Next.js website and a native
  SwiftUI iOS app from one API contract
- ~170 test files
- PBKDF2-SHA256, 210,000 iterations — real auth, no test bypass
- Draft → Publish flips website and app live simultaneously

**NWKS Encounter**
- Two separate ministries on one codebase, partitioned per-program
- Registration → dedup/match → roster → automated confirmation
- A dedicated always-on cron Worker drains scheduled campaigns in bounded chunks,
  because a synchronous send to 2,402 recipients took 67s and would blow the
  per-request CPU budget
- 756 API tests + a separate admin suite
- WebAuthn/passkey 2FA with a recovery ladder

**Existing client work (already on the site, still true)**
- HG Oil Holdings — 95% reduction in back-office logistics time; 75%+ inventory accuracy
- MGU in the Alliant Insurance ecosystem (anonymized) — zero missed renewals in 6 months
- Chicago-area bus operator (anonymized) — reconciliation from a full day to a
  15-minute exception queue
- Iron and Oak Podcast — 134 pre-rendered pages
- Cassidy HVAC — 60%+ dormant-customer reactivation in 6 weeks. (Added 2026-08-03:
  a real, already-published engagement. It was missing from this list only because
  §9 was assembled from a scan of the FarmBooks/C3/NWKS repos, which do not cover
  the earlier client work.)
- 22+ Kansas SMB projects delivered; founder-led

### Claims that are now BANNED

- ❌ "integrates MailChimp" for NWKS Encounter — **it is Resend.** There is zero
  MailChimp code in that repo.
- ❌ Any statement that NWKS Encounter production email is currently sending —
  `EMAIL_ENABLED = "false"` right now.
- ❌ `nwksencounter.com` as a live custom domain — only the `.pages.dev` URL is confirmed.
- ❌ Any FarmBooks *extraction accuracy percentage* — none is recorded anywhere.
- ❌ C3's AI assist as "live AI" without noting it is opt-in and mock-by-default.
- ❌ Any KPI from the 16 `agent-demos/` folders — those numbers are fabricated UI
  placeholder data.
- ❌ "300,000 followers / 30 million views."
- ❌ "Nobody else in Kansas is doing this." / "Almost nobody locally does this yet."

## 10. Hard technical constraints

Violating any of these breaks the build, the deploy gate, or mobile performance.

1. **`npm run validate:seo` requires the homepage meta description be 80–170 characters.**
   The current one is **178 — already failing.** The new one must be in range.
2. The homepage must keep: a `<title>`, a `<meta name="description">`, a
   `<link rel="canonical">`, exactly one `<h1>`, at least one `application/ld+json`
   block, and at least one internal `href="/contact"` link.
3. `validate-seo.mjs` hardcodes **19 required routes**. Do not rename or delete any
   existing route.
4. Static export (`output: "export"`). No route handlers, no server actions, no ISR.
5. **Only animate `transform` and `opacity`.** Never width/height/top/left/margin/padding.
6. **No `backdrop-filter` on mobile.** The convention is blur on desktop, solid color
   under `@media (max-width: 768px)`.
7. **No `content-visibility: auto`** — it was tried and reverted for iOS Safari < 17.
8. **`prefetch={false}`** on above-the-fold CTA `Link`s. Eager prefetch was the root
   cause of a 4.1s → 0.8s mobile navigation regression.
9. **Do not add Framer Motion** to any homepage section. GSAP is the established library.
10. Respect `prefers-reduced-motion` at every new animation. The convention is a manual
    check that short-circuits to `opacity:1; transform:none`.
11. `940px` is this codebase's bespoke breakpoint for bento/carousel/hover-gating. Match
    it rather than introducing a new one.
12. Reuse existing tokens. **Do not invent a parallel styling system.** Primary blue is
    `var(--color-primary)`.

### The animation pattern to reuse verbatim

Proven in `cta-section.tsx:26-47` and `marcommand-callout.tsx:27-48`. This is the
"cards pop up and slide up" behavior:

```ts
import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
  gsap.fromTo(children,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: contentRef.current, start: "top 85%", once: true } }
  );
  return () => ScrollTrigger.getAll().forEach((t) => t.kill());
});
```

## 10b. Found but deliberately NOT fixed tonight

### Doubled brand suffix in `<title>` on 112 built pages

`src/app/layout.tsx` sets `title.template = "%s | Preisser Solutions"`. **160 source
files** already end their own `title` / `metaTitle` with `| Preisser Solutions` or
`— Preisser Solutions`, so the template appends a second copy:

```
Products | Preisser Solutions | Preisser Solutions
Case Studies — Preisser Solutions | Preisser Solutions
```

Google truncates titles near 60 characters, so this burns ~20 characters on every
affected page and reads as spam.

**Why it is not fixed here:** it is pre-existing, unrelated to the reposition, and
spread across the programmatic-SEO corpus that §5 puts explicitly out of scope —
77 location pages, 16 products, 13 services, 13 compare, 11 case studies, and the
rest. Retitling 160 ranking-critical pages in the same unreviewed pass as a
positioning change would make it impossible to attribute any ranking movement to
either one.

**The fix, when it is picked up:** strip the trailing ` | Preisser Solutions` /
` — Preisser Solutions` from the source `title` / `metaTitle` values and let the
layout template supply it. Verify with:

```bash
grep -l "Preisser Solutions | Preisser Solutions" out/**/*.html | wc -l   # must be 0
```

Distribution by directory:

| Directory | Files |
|---|---|
| `src/data/locations` | 77 |
| `src/data/products` | 16 |
| `src/data/aeo/services` | 13 |
| `src/data/aeo/compare` | 13 |
| `src/data/aeo` (root) | 12 |
| `src/data/case-studies` | 11 |
| `src/data/aeo/industries` | 5 |
| `src/data/aeo/case-studies` | 5 |
| `src/app/*` (why-automation, site-map, services, roi-calculator) | 4 |

The three case studies added tonight (`farmbooks`, `c3-studio`, `nwks-encounter`)
are **already correct** — they set a bare `metaTitle` and let the template add the
brand once.

## 11. Definition of Done

- `npm run build` passes, `npx tsc --noEmit` passes, `npm run lint` passes with
  `--max-warnings=0`, `npm run validate:seo` passes.
- `node scripts/ui-audit.mjs` reports **zero blockers** across 9 device widths on both
  Chromium and WebKit.
- The rendered homepage has been looked at as a screenshot on phone and desktop, in both
  light and dark theme, by something other than the agent that wrote it.
- Deployed via `npx wrangler pages deploy out --project-name preisser-solutions`, and
  the live HTML at `https://preissersolutions.com` greps positive for a string that only
  exists in the new build.
