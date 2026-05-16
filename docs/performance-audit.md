# Performance Audit — Core Web Vitals 2026 + MCP Server

> R-092, R-093, R-094, R-128 (Phase 4.9). Owner: Tyler Preisser. Last touched: 2026-05-15.
>
> This doc is the **plan**, not the audit. The audit is to be performed
> separately, with Lighthouse runs against staging, after Phase 4.8 (blog)
> ships and the asset payload is final.

---

## 1. Core Web Vitals 2026 Targets

| Metric | Target (75th-percentile RUM) | Notes |
|--------|------------------------------|-------|
| **LCP** — Largest Contentful Paint | **< 2.5 s** | Driven by hero image, hero font, hero copy block |
| **INP** — Interaction to Next Paint | **< 200 ms** | **Replaced FID in March 2024** (R-128). INP measures the slowest interaction over the page lifetime, not just the first. JS hydration / scroll handlers / GSAP listeners are the usual offenders. |
| **CLS** — Cumulative Layout Shift | **< 0.1** | Driven by font-swap, late-loading images without explicit dimensions, and reserved space for above-the-fold dynamic content |

### Baseline (as of 2026-05-03, per master plan §4.5)
- Lighthouse Performance: **68/100**
- Asset payload: ~2.1 MB compressed home page
- Largest single asset: hero image / video poster

This baseline was measured before Phase 4.6 / 4.7 / 4.10 / 4.11 shipped. Re-baseline before action items below.

---

## 2. Action Items (deferred until staging is final)

### A. Image audit — `next/image` + static export

`next.config.ts` has `images.unoptimized: true` (required for static export to Cloudflare Pages). That means:
- `next/image` does NOT generate responsive variants at build time
- The `sizes` prop is still respected for the browser's `srcset` calc, but the underlying file is one image at one resolution
- Manual image optimization is required upstream of `/public`

**Action:**
1. Audit every `<Image>` usage. Confirm each one has `sizes` set correctly.
2. Audit `/public/images/`. Convert remaining PNG/JPG to WebP where the original is >50 KB.
3. Generate retina (`@2x`) variants for hero images only; serve them via CSS `image-set()` or the `srcSet` prop manually.
4. Confirm no image >300 KB is rendered above the fold without an explicit `priority` + `loading="eager"`.
5. Verify hero images have `width` + `height` set to prevent CLS.

### B. GSAP — global vs per-page registration

Currently `src/lib/gsap.ts` registers all plugins globally on first import. Every page that pulls a GSAP-using component pulls the full plugin bundle.

**Action:**
1. Identify which pages actually use GSAP animations (likely: homepage, about, case-study pages only).
2. For pages that do NOT use GSAP, confirm they don't pull GSAP via transitive imports.
3. If lazy-loading is viable without breaking the page-transition setup, gate plugin imports behind a dynamic `import()` triggered on user gesture or scroll.
4. Verify that `prefers-reduced-motion: reduce` skips GSAP entirely (already enforced in `lib/animations.ts` per the rule in CLAUDE.md).

### C. CSS — `src/styles/globals.css` (7535 lines)

The globals file accumulated through several phases (HDS clone, Stripe clone, AEO scaffolds, MarCommand dashboard). High likelihood of dead selectors.

**Action:**
1. Run PurgeCSS / Tailwind v4's built-in JIT against the final built `out/` to identify selectors not referenced by any HTML or component.
2. Manual sweep for `.ps-marcommand-footer-copy`, `.ps-events-section--*`, and other class names that were removed in the homepage punch list passes (per CHANGELOG 2026-05-11).
3. Target: cut globals.css to <4000 lines without visual regression.

### D. Inter font — weight audit

Currently loading weights `400, 500, 600, 700, 800` per `src/app/layout.tsx`.

**Action:**
1. Grep the component tree for `font-weight: 800` and `font-bold` (700) usage.
2. If 800 is used only on the hero H1, confirm the visual savings (~30 KB) of dropping 800 are worth it.
3. Consider self-hosting Inter via `next/font/local` for tighter cache control vs Google Fonts.

### E. JS bundle audit

**Action:**
1. Run `next build` with bundle analyzer (`@next/bundle-analyzer`).
2. Identify largest non-vendor chunks. Common offenders: GSAP plugins, framer-motion features not actually used, full lucide-react instead of tree-shaken icon imports.
3. Verify `lucide-react` icons are imported individually (`import { ArrowRight } from "lucide-react"` — not `import * as Icons`).

### F. Cloudflare Pages — edge cache headers

**Action:**
1. Verify `public/_headers` sets `cache-control: public, max-age=31536000, immutable` for hashed asset paths.
2. Verify HTML routes have `cache-control: public, max-age=0, must-revalidate` so the markdown-alternate middleware (`functions/_middleware.ts`) stays in control of staleness.
3. Re-confirm `Content-Signal: ai-train=yes, search=yes, ai-input=yes` is still set on `/*` (per CHANGELOG 2026-05-11).

---

## 3. MCP Server Audit — `functions/mcp.ts`

> R-094. The MCP (Model Context Protocol) endpoint at `/mcp` is what AI
> agents call to discover capabilities of this site. Documenting the
> current shape and recommending additions.

### Current shape (as of 2026-05-15)

**Server info:**
- `name`: "Preisser Solutions Agent Discovery"
- `version`: "1.0.0"
- `protocolVersion`: "2025-06-18"

**Capabilities advertised:**
- `tools.listChanged`: false
- `resources.subscribe`: false
- `resources.listChanged`: false

**Tools (1):**
- `preisser_tech_start_inquiry` — accepts `{ name?, email?, company?, projectType?, message }`. **Note**: name still has the old `preisser_tech_` prefix despite the May 2026 brand reversal. Tracked as a follow-up rename.

**Resources (2):**
- `https://preissersolutions.com/llms.txt` (markdown)
- `https://preissersolutions.com/llms-full.txt` (markdown)

**Prompts:** none currently exposed.

### Recommended additions (not yet implemented)

#### Tools to add
- `calculate_roi(industry, monthly_hours_saved, hourly_value, automation_cost)` — wraps the `/roi-calculator` logic so an agent can compute ROI without the user visiting the page. Returns `{ payback_months, annual_savings, three_year_npv }`.
- `find_case_study(industry?, outcome?)` — returns `{ slug, summary, headline_metric }` from the case-study catalog. Lets an agent surface the most-relevant proof without scraping.
- `book_business_systems_audit({ name, email, intent })` — currently the generic inquiry tool covers this. Could be split into a dedicated tool for the audit-specific CTA so agents have a clearer surface.

#### Resources to add
- `preisser-solutions://case-studies/{slug}` — one resource per case study. URI scheme is informational; the underlying URLs resolve to the public `/case-studies/<slug>` markdown alternates.
- `preisser-solutions://services/{slug}` — one resource per service page.
- `preisser-solutions://compare/{competitor-slug}` — one resource per comparison page.
- `preisser-solutions://about/tyler-preisser` — Tyler's biography as a resource.

#### Prompts to expose
- `marcommand_intro` — returns the canonical 2-paragraph MarCommand description (proprietary multi-agent marketing intelligence engine, real working system, what it does for clients).
- `preisser_solutions_intro` — returns the canonical Preisser Solutions positioning sentence + 1-paragraph elaboration.
- `case_study_template` — a templated prompt that asks the agent to summarize a case study using this site's standard problem → approach → system → outcome → numbers structure.

### Implementation notes

Edits to `functions/mcp.ts` should be made carefully:

- The current file is intentionally minimal and works as-is. Adding tools is straightforward — define the schema, branch in `tools/call`.
- Adding resources requires extending the `resources/list` response AND adding `resources/read` if AI agents want to fetch resource contents directly (vs just discovering URIs).
- The `preisser_tech_start_inquiry` tool name should be renamed to `preisser_solutions_start_inquiry` in a single coordinated change with `agent-tools.js` (which probably references the same name client-side).

---

## 4. Cross-references

- `docs/perplexity-strategy.md` — adjacent off-site work
- `docs/measurement-plan.md` — how perf affects conversion attribution
- `functions/mcp.ts` — the MCP server file itself
- `next.config.ts` — image / output settings
- `public/_headers` — edge cache + AI-crawler signals
