# Preisser Solutions Codebase Cartography (2026-05-15 — brand-reversal pass)

**Last Updated**: 2026-05-15T21:30:00Z  
**Status**: Comprehensive mapping complete. Directory structure, AEO system, tech stack, and design system fully documented. Brand-direction claims rewritten after the 2026-05-15 reversal.

---

## Project Summary

**Preisser Solutions** is a premium AI automation, custom websites, and local SEO consultancy for Kansas businesses. The site was briefly rebranded "Preisser Tech / preissertech.com" on 2026-05-02; that rebrand was reversed on 2026-05-15 and the canonical brand and domain are once again **Preisser Solutions / preissersolutions.com**. Built as a static Next.js 15 export with 182 pages deployed to Cloudflare Pages.

**Owner**: Tyler Preisser (Hays, KS)  
**Primary Domain**: preissersolutions.com (canonical, live; preissertech.com 301-redirects in via Cloudflare Pages middleware)  
**Build Status**: 182 pages, 179 sitemap URLs, 0 build errors  
**Deployment**: Cloudflare Pages (custom domain binding via wrangler.toml project "preisser-solutions")

---

## Architecture at a Glance

### Pages & Routing
The site uses Next.js App Router with three distinct page categories:

1. **Core Pages** (35 routes) — always visible in nav/footer
   - Homepage, About, Services (5 detail pages), Contact, FAQ, Pricing, Process, Press, ROI Calculator, Tyler bio, Brand defense, Premium positioning

2. **AEO Pages** (non-linked, AI-optimized) — hidden from nav, crawlable for AI engines
   - **Location pages** (35): `/locations/{city}-kansas` — geo-targeted content for Kansas cities
   - **Industry pages** (18): `/industries/{vertical}` — vertical-specific content (HVAC, Oil & Gas, Healthcare, etc.)
   - **Comparison pages** (16): `/compare/{competitor}` — competitive positioning (Webflow, WordPress, etc.)
   - **Special AEO pages** (7): `/glossary`, `/faq`, `/pricing`, `/process`, `/ai-readiness-audit`, `/missed-call-roi`, `/marcommand`

3. **Blog Pages** (5 posts)
   - `/blog` (hub)
   - `/blog/what-is-an-ai-native-website`
   - `/blog/ai-automation-cost-kansas`
   - `/blog/aeo-vs-geo-vs-seo`
   - `/blog/what-is-llms-txt`
   - `/blog/missed-call-roi-calculator`

All AEO pages use the same component (`AeoPage`) + data-driven content files. Enables rapid scaling to 100+ pages.

---

## Directory Structure

```
Preisser Solutions/
├── .context/                              ← Master context docs (STATE.md, CHANGELOG.md, CARTOGRAPHY.md)
├── .claude/                               ← Local Claude Code settings
├── .github/workflows/                     ← CI/CD (deploy.yml → Cloudflare Pages on main push)
├── .wrangler/                             ← Wrangler cache
├── docs/                                  ← Project documentation (design-system.md, status.md, decisions.md, plans/)
├── functions/                             ← Cloudflare Workers (if any)
├── public/                                ← Static assets
│   ├── .well-known/                       ← MCP server card, verification files
│   ├── images/                            ← Hero, case study, OG images
│   ├── favicon.ico, *-192x192.png, etc.   ← Platform icons (web, Apple, Android, Windows)
│   ├── robots.txt                         ← Crawler directives (allow all)
│   ├── sitemap.xml                        ← URL list (179 URLs)
│   ├── llms.txt, llms-full.txt            ← AI crawler indices
│   ├── _headers, _redirects               ← Cloudflare Pages config
│   └── feed.xml, security.txt             ← Additional feeds
├── scripts/                               ← Build-time utilities
│   ├── indexnow-ping.mjs                  ← Submits URLs to Bing/Yandex IndexNow
│   ├── generate-sitemap.mjs               ← Builds sitemap.xml from fs
│   └── strip-404-noindex.mjs              ← Removes noindex from 404 pages
├── src/
│   ├── app/                               ← Next.js pages (182 routes)
│   │   ├── layout.tsx                     ← Root layout (metadata, Header, Footer, JSON-LD)
│   │   ├── page.tsx                       ← Homepage
│   │   ├── about/, services/, contact/, etc.  ← Core pages
│   │   ├── blog/                          ← Blog hub + dynamic [slug] routes
│   │   ├── locations/[city]-kansas/       ← Dynamic location routes (35 cities)
│   │   ├── industries/[vertical]/         ← Dynamic industry routes (18 verticals)
│   │   ├── compare/[competitor]/          ← Dynamic comparison routes (16 competitors)
│   │   └── case-studies/[slug]/           ← 4 case studies
│   ├── components/
│   │   ├── layout/                        ← Header, Footer, Section wrapper
│   │   ├── ui/                            ← Button, Card, Badge, Input primitives
│   │   ├── home/                          ← Homepage-specific sections
│   │   ├── aeo/                           ← AeoPage.tsx (shared AEO renderer)
│   │   ├── blog/                          ← BlogPostLayout.tsx, BlogCard.tsx
│   │   ├── services/                      ← Service detail components
│   │   └── about/, contact/, roi/         ← Section-specific components
│   ├── data/                              ← ALL CONTENT LIVES HERE
│   │   ├── site-config.ts                 ← Brand metadata, contact, social links
│   │   ├── services.ts                    ← Service definitions
│   │   ├── case-studies.ts                ← Testimonial/case study data
│   │   ├── navigation.ts                  ← Nav links
│   │   ├── aeo/                           ← AEO page data files
│   │   │   ├── types.ts                   ← AeoPageData interface (see below)
│   │   │   ├── preisser-solutions.ts     ← Brand defense page
│   │   │   ├── pricing.ts, process.ts, faq.ts, etc.
│   │   │   ├── locations/                 ← 35 location page data files (generated pattern)
│   │   │   ├── industries/                ← 18 industry page data files (generated pattern)
│   │   │   ├── compare/                   ← 16 competitor comparison data files
│   │   │   ├── case-studies/              ← Case study data exports
│   │   │   └── services/                  ← Service-detail data
│   │   ├── blog/                          ← Blog post data files
│   │   │   ├── what-is-an-ai-native-website.ts
│   │   │   ├── ai-automation-cost-kansas.ts
│   │   │   ├── aeo-vs-geo-vs-seo.ts
│   │   │   ├── what-is-llms-txt.ts
│   │   │   └── missed-call-roi-calculator.ts
│   │   └── ai-pages/                      ← AI feature page data (if any)
│   ├── hooks/                             ← Custom React hooks
│   │   ├── use-scroll-position.ts         ← Scroll detection for nav
│   │   ├── use-media-query.ts             ← Responsive breakpoint hooks
│   │   └── use-reduced-motion.ts          ← Motion preference detection
│   ├── lib/                               ← Shared utilities
│   │   ├── gsap.ts                        ← GSAP plugin registration (ONE place)
│   │   ├── animations.ts                  ← Shared animation presets
│   │   ├── breadcrumbs.ts                 ← BreadcrumbList schema builder
│   │   └── utils.ts                       ← cn(), classname merging
│   └── styles/
│       ├── globals.css                    ← Design tokens (7535 lines), typography, base styles, animations
│       └── card-visuals.css               ← Card-specific visual overrides
├── archive/                               ← Old site snapshot (reference only)
├── CLAUDE.md                              ← System prompt (NEEDS UPDATE: still references preissersolutions.com in places)
├── next.config.ts                         ← Static export config (output: "export")
├── wrangler.toml                          ← Cloudflare Pages config (name: "preisser-solutions" — cosmetic mismatch)
├── package.json                           ← Dependencies (corrected to "preisser-solutions" name)
├── package-lock.json                      ← Artifact (can be regenerated)
├── tsconfig.json                          ← TypeScript config
└── postcss.config.mjs                     ← Tailwind v4 PostCSS
```

---

## AEO Content System (The Scalability Engine)

### Data-Driven Architecture

Every AEO page follows the same pattern:

1. **Data File** (`src/data/aeo/{slug}.ts`)
   - Exports a single object implementing `AeoPageData` interface
   - Contains: metaTitle, metaDescription, h1, sections (H2+ blocks), FAQ array, schemaType

2. **Route Page** (`src/app/{category}/{slug}/page.tsx`)
   - Imports data from file
   - Generates metadata (title, description, canonical, OG, Twitter)
   - Renders `<AeoPage data={data} />` component

3. **Component** (`src/components/aeo/AeoPage.tsx`, 630 lines)
   - Renders the full page layout
   - Emits JSON-LD schema (WebPage, Service, Article, FAQPage, BreadcrumbList)
   - Renders hero, sections, FAQ, CTA
   - Handles all AEO-specific rendering logic in ONE place

### AeoPageData Interface

```typescript
export interface AeoPageData {
  slug: string;                    // "hays-kansas", "hvac", "zapier-vs-custom"
  metaTitle: string;               // ≤60 chars for browser tab
  metaDescription: string;         // ≤155 chars for SERP snippet
  eyebrow: string;                 // "Location" | "Industry" | "Comparison", etc.
  h1: string;                      // Main headline
  subheadline: string;             // Under H1
  answerParagraph: string;         // 50-90 words, AI-citation optimized
  sections: AeoSection[];          // H2 blocks with body/bullets/subsections
  comparisonTable?: {              // Optional Comparison pages
    competitorName: string;
    rows: ComparisonRow[];         // Dimension × Preisser vs Competitor
  };
  faq: FAQItem[];                  // Min 5 items for AI engines
  schemaType: "WebPage" | "Service" | "Article" | ... // Schema.org type
  namedEntities?: string[];        // For citation graphs
  relatedLinks?: { label; href }[]; // Internal linking
  headshot?: { src, alt, width, height }; // Optional hero image
  tier: "brand_defense" | "service_detail" | "location" | "industry" | ...
  ctaHeadline: string;             // Final CTA
  ctaSubcopy: string;
}
```

### Content Organization

| Category | Count | Location | Pattern |
|----------|-------|----------|---------|
| **Locations** | 35 | `src/data/aeo/locations/` | `{city}-kansas.ts` → `/locations/{city}-kansas` |
| **Industries** | 18 | `src/data/aeo/industries/` | `{vertical}.ts` → `/industries/{vertical}` |
| **Comparisons** | 16 | `src/data/aeo/compare/` | `{competitor}.ts` → `/compare/{competitor}` |
| **Special AEO** | 7 | `src/data/aeo/` | `glossary.ts`, `faq.ts`, `pricing.ts`, etc. |
| **Services** | 11+ | `src/data/aeo/services/` | Service detail data (keyed to core `/services/` routes) |
| **Case Studies** | 4 | `src/data/aeo/case-studies/` | Case study data exports |

### Dynamic Routing

Each category uses dynamic routes to avoid code duplication:

**Locations** (`src/app/locations/[city]-kansas/page.tsx`):
```typescript
export async function generateStaticParams() {
  return locationPageData.map((p) => ({ city: p.slug.replace(/^locations\//, "").replace(/-kansas$/, "") }));
}
export default function Page({ params }) {
  const data = locationPageData.find((p) => p.slug === `locations/${params.city}-kansas`);
  return <AeoPage data={data} />;
}
```

Same pattern for industries, comparisons, etc.

---

## Tech Stack Deep Dive

### Framework & Language
| Layer | Tech | Version | Notes |
|-------|------|---------|-------|
| Framework | Next.js App Router | 15.3.0 | Static export only (output: 'export') |
| Language | TypeScript | 5.7.0 | Strict mode |
| UI Runtime | React | 19.1.0 | Client + Server components |
| Styling | Tailwind CSS | 4.0.0 | Utility-first, design tokens in globals.css |

### Key Libraries
| Library | Version | Purpose |
|---------|---------|---------|
| GSAP + ScrollTrigger | 3.12.7 | Scroll animations, SplitText effects |
| Framer Motion | 12.0.0 | Page transitions, micro-interactions |
| PostCSS | 8.5.0 | CSS processing for Tailwind v4 |

### Build & Deployment
- **Build output**: `/out/` directory (static HTML/CSS/JS)
- **Deploy target**: Cloudflare Pages (via wrangler deploy)
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml` on main push)
- **Build time**: ~1 minute (clean build generates 182 pages)
- **Wrangler config**: `name = "preisser-solutions"` (legacy, mints `preisser-solutions.pages.dev`)

### Static Assets
- **Icons**: Multi-format favicon, Apple touch icon, Android chrome, Windows tile, safari mask
- **Images**: OG image (1200x630), hero images, case study images in `/public/images/`
- **Fonts**: Inter (Google Fonts via next/font/google) with weights 400, 500, 600, 700, 800

---

## Design System & Visual Conventions

### Color Tokens (CSS Variables in globals.css)
All colors defined as `--color-*` and `--theme-*` tokens:

**Brand Colors**:
- Primary: `#0D95E8` (Stripe blue)
- Primary hover: `#0B7BC0`
- Primary glow: `rgba(13, 149, 232, 0.2)`
- Accent cyan: `#80E9FF`
- Accent green: `#00D4AA`

**Dark Mode** (default):
- Background: `#0A1628` (Stripe navy)
- Surface: `#0F1D30`
- Text primary: `#FFFFFF`
- Text secondary: `#94A3B8`

**Light Mode** (when `data-theme="light"`):
- Background: `#FFFFFF`
- Surface: `#F6F9FC`
- Text primary: `#0A1628`
- Text secondary: `#475569`

### Typography
- **Display/Headlines**: Inter (bold, using `font-bold` 800wt, fluid clamp() sizing)
- **Body**: Inter 400/500/600wt
- **Mono**: Fira Code (if used, for code blocks)

### Spacing & Layout
- **Nav height**: 88px (`--nav-height`)
- **Max container width**: 1200px (`--container-max`)
- **Section padding**: 100px desktop / 60px mobile (`--section-py-desktop`, `--section-py-mobile`)
- **Container padding**: 24px (`--container-padding`)

### Border Radius
- **Card radius**: 16px (`--radius-card`)
- **Button radius**: 12px (`--radius-btn`)
- **Small radius**: 8px (`--radius-sm`)

### Shadows (Z-depth)
- `--shadow-sm`: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)
- `--shadow-md`: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)
- `--shadow-lg`: 0 12px 40px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)
- `--shadow-xl`: 0 24px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08)
- `--shadow-glow`: 0 0 40px rgba(13, 149, 232, 0.2) (brand glow)

### Animation Easing
- `--ease-out-expo`: cubic-bezier(0.16, 1, 0.3, 1) (bouncy exit)
- `--ease-standard`: cubic-bezier(0.25, 0.1, 0.25, 1) (material standard)

### Component Patterns
- **Dark nav on light content sections** (Stripe style)
- **Gradient accents** (blue → purple/teal) for standout elements
- **Fade-in + translateY** for scroll reveals (GSAP ScrollTrigger)
- **No 3D/parallax/custom cursor** (keep it minimal, no accessibility debt)
- **Prefers-reduced-motion respected** (disable all animations for users who prefer it)

---

## Code Conventions & Rules

### File Naming
- **Components**: PascalCase (`HeroSection.tsx`)
- **Utilities & hooks**: kebab-case or camelCase (`gsap.ts`, `use-scroll-position.ts`)
- **Data files**: kebab-case (`site-config.ts`, `hays-kansas.ts`)

### Imports
- Always use `@/*` path aliases (never relative imports)
- GSAP imports through `src/lib/gsap.ts` ONLY (single plugin registration point)

### Content Rules
- **ALL content lives in `src/data/` files** — never hardcode text in JSX
- **AEO pages use `AeoPageData` interface** — no custom component per page
- **Blog posts use `BlogPost` interface + `BlogSection` union types** — centralized in data files

### Type Organization
- Colocate types with data files (e.g., `AeoPageData` in `aeo/types.ts`)
- No separate `types/` directory unless types are shared across 3+ files

### Styling
- **95%+ Tailwind utilities** — use `className="flex items-center justify-between"`
- **CSS variables only for design tokens** — keep semantic values in globals.css
- **No BEM or component-scoped CSS** — let Tailwind handle specificity

### Metadata & SEO
- Every page has explicit `metadata` export with title, description, canonical, OG, Twitter
- All pages include proper JSON-LD schema (WebPage, Organization, Article, Service, FAQ, etc.)
- BreadcrumbList schema on all non-AEO pages
- All canonical URLs point to `https://preissersolutions.com/{slug}`

### Animation Practices
1. **Check prefers-reduced-motion before animating** — use `use-reduced-motion.ts` hook
2. **No animation transforms on mobile < 768px** — fade-in only
3. **Scroll reveals**: fade-up + translateY via ScrollTrigger
4. **Page transitions**: Framer Motion AnimatePresence
5. **Server component event handler restriction**: No onClick/onHover in server components (use client components for interactivity)

---

## Brand Audit Status (POST-REVERSAL 2026-05-15)

The 2026-05-02 rebrand TO "Preisser Tech / preissertech.com" was reversed on 2026-05-15. Canonical brand and domain are once again **Preisser Solutions / preissersolutions.com**. The audit rows below were originally written during the rebrand-to-Tech effort; they are preserved here for history but the brand-direction claims have been corrected.

### Resolved
| Item | Status | Evidence |
|------|--------|----------|
| package.json name | CORRECT | "preisser-solutions" |
| package-lock.json | REGENERATE | Will be regenerated via `npm install` |
| Homepage title | NEEDS PHASE-4 OVERHAUL | See Phase 4 §2.4 |
| Homepage canonical | CORRECT | Points to preissersolutions.com |
| JSON-LD Organization name | CORRECT | "Preisser Solutions" |
| robots.txt | CORRECT | Allow all, no Disallows |
| sitemap.xml | CORRECT | 179 URLs, all preissersolutions.com |
| llms.txt / llms-full.txt | CORRECT | "Preisser Solutions" branding (legacy preissertech.com case-study mention kept with footnote) |

### Residual (Cosmetic, Non-Critical)
| Item | Location | Status | Notes |
|------|----------|--------|-------|
| wrangler.toml | Line 1 | CORRECT | `name = "preisser-solutions"` — public `preisser-solutions.pages.dev` hostname is fine |
| CLAUDE.md | — | CORRECT (post-Half-A rewrite) | Brand strings rewritten to "Preisser Solutions" |
| layout.tsx metadata | — | CORRECT (post-Half-A + §3.4.1) | All metadata + JSON-LD references "Preisser Solutions" / preissersolutions.com |
| site-config.ts social links | Lines 13-21 | UPDATED | Expanded social object per §3.4.8 — pages must still be created by Tyler |

### Infrastructure (Now ALIGNED, not blocked)
- **Cloudflare-edge redirect** `preissertech.com → preissersolutions.com` is now correct and KEEP. The Cloudflare Pages middleware in `functions/_middleware.ts` covers this canonicalization for inbound preissertech.com hits.
- `workers/legacy-preissersolutions-redirect.ts` (had INVERTED CANONICAL_HOST) was deleted in Phase 2/3 to prevent accidental redeployment.

---

## Performance & Optimization

### Build Metrics
- **Pages generated**: 182 (35 core + 73 AEO + 5 blog + 69 supporting)
- **Sitemap URLs**: 179
- **Build time**: ~1 minute (clean build)
- **Output size**: ~50MB+ (static HTML/CSS/JS for all pages)

### Lighthouse Scores (Run 2026-05-16)
- **Performance**: 68/100 (LCP 5.9s, FCP 2.7s, CLS 0)
- **Accessibility**: 93/100
- **Best Practices**: 100/100
- **SEO**: 100/100

### Optimization Opportunities
1. **Image optimization** — Homepage has 7 images preloaded above fold; add srcset/sizes for responsive serving
2. **Font subsetting** — Inter is loading all 5 weights; could subset to essential weights
3. **Code splitting** — GSAP/Framer Motion could be lazy-loaded on pages that use them

---

## AI Crawler Readiness

### Surface Provided to AI Engines
- **llms.txt** (14.7 KB): Human-readable profile, company description, 100 core URLs
- **llms-full.txt** (34.6 KB): Extended profile with all 179 URLs + detailed service/location listings
- **robots.txt**: Open to all crawlers (no Disallows)
- **JSON-LD schema**: Organization + Service + WebPage + Article + FAQ across all pages
- **MCP server card** (`.well-known/mcp/server-card.json`): MCP v2025-06-18 protocol support

### AI Crawler Verification (2026-05-16)
- **12/12 major AI crawlers** return HTTP 200: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Googlebot, Bingbot
- **Zero blocks** (no 403/429/451 errors)
- **Cloudflare robots.txt override** (formerly blocking AI crawlers) — FIXED 2026-05-04 evening

---

## Known Gotchas & Conventions

### Gotcha #1: Static Export Only
- No API routes, no middleware (except Cloudflare Workers in `functions/`)
- No server-side data fetching at request time
- All data must be embedded in the build

### Gotcha #2: Server Component Event Handlers
- **Rule**: No onClick, onHover, onChange, etc. in server components
- **Solution**: Wrap interactive elements in "use client" components
- Example: Blog card hover effects are in `BlogCard.tsx` (marked "use client")

### Gotcha #3: GSAP Import Path
- **Rule**: Never import GSAP plugins directly in components
- **Authority**: `src/lib/gsap.ts` is the ONLY registration point
- **Reason**: Prevents double-registration and bundle bloat
- **Pattern**: In components, import bare `gsap` only: `import gsap from 'gsap'`

### Gotcha #4: Tailwind v4 CSS Variables
- Tailwind v4 uses CSS variables extensively
- Design tokens in `globals.css` override Tailwind defaults via `:root { --color-primary, etc. }`
- Don't hardcode hex colors in Tailwind classes; always use theme tokens

### Gotcha #5: Metadata Canonicals
- Every page must have `alternates: { canonical: "https://preissersolutions.com/{slug}" }` in metadata
- AEO pages auto-generate this in their page.tsx files
- Prevents duplicate content issues for AI engines

### Gotcha #6: AEO Page Visibility
- AEO pages are NOT linked in public nav/footer
- They exist only for crawlability (searchable via search engines + AI engines)
- Users won't see them unless they directly navigate or find them in a search result

### Gotcha #7: Blog Post Slugs
- Blog posts use dynamic routing: `/blog/[slug]/page.tsx`
- Slug must match the exported data filename exactly (minus `.ts`)
- E.g., `what-is-an-ai-native-website.ts` → slug `what-is-an-ai-native-website` → route `/blog/what-is-an-ai-native-website`

### Gotcha #8: Prefers-Reduced-Motion
- Always check `prefers-reduced-motion: reduce` before animating
- Use `use-reduced-motion.ts` hook (returns boolean)
- Failing to respect this breaks experience for users with motion sensitivity or accessibility needs

---

## Companion Systems (Sibling Folders)

These systems interact with or reference the Preisser Solutions website:

| System | Location | Purpose | Frequency |
|--------|----------|---------|-----------|
| **Monitoring** | `~/Desktop/preisser-solutions-monitoring/` | Daily SERP/mention/backlink tracker | Daily 08:00 local |
| **Outreach Kit** | `~/Desktop/preisser-solutions-outreach/` | Press releases, journalist pitches, social drafts | On-demand |
| **Query Dominance** | `~/Desktop/query-dominance/` | Multi-agent SEO research system | On-demand |
| **Strategic Playbook** | `~/Desktop/Preisser-Tech-AI-Domination-Playbook.pdf` | Operations manual (650 KB PDF) | Reference |

---

## Recent Changes & Current State (Summary)

### Phase Completion Status
- **Phase 1: Foundation** — COMPLETE (build, deploy, branding)
- **Phase 2: Content Expansion** — COMPLETE (105 → 182 pages, blog added, AEO complete)
- **Phase 3-12: Verification & Deployment** — COMPLETE (schema validation, AI crawler testing, Cloudflare deploy)
- **Phase 13: AI Engine Submissions** — BLOCKED on Cloudflare redirect rule fix

### Last Updated
- **2026-05-15 Evening**: Wrangler deploy `61f54cec`, 182 pages, 179 URLs, all AEO content verified
- **2026-05-16 Morning**: Full AI crawler verification + Lighthouse testing
- **2026-05-16 This Session**: Comprehensive cartography complete

### Outstanding Blockers
1. **Cloudflare dashboard redirect rule** — sending preissersolutions.com → preissersolutions.com (WRONG direction)
   - **Owner**: NEEDS TYLER
   - **Action**: Delete the rule in Cloudflare dashboard → preissersolutions.com → Rules → Page Rules / Bulk Redirects
   - **Impact**: Once fixed, AI engines and users can access preissersolutions.com correctly

2. **layout.tsx branding references** — still contains "preissersolutions.com" in metadata
   - **Owner**: NEEDS ORCHESTRATOR or web-code-executor
   - **Action**: Find/replace all "preissersolutions.com" → "preissersolutions.com" and "Preisser Solutions" → "Preisser Solutions"
   - **Files affected**: src/app/layout.tsx (metadata, OG, Twitter, authors, publisher)

3. **CLAUDE.md outdated** — still references old brand
   - **Owner**: NEEDS ORCHESTRATOR
   - **Action**: Update CLAUDE.md summary section to reflect "preissersolutions.com" and current tech stack
   - **Impact**: Cosmetic; doesn't affect site functionality

---

## How to Add New AEO Pages

To add a new location, industry, or comparison page:

1. **Create data file** in `src/data/aeo/{category}/`
   - Export object implementing `AeoPageData`
   - Include metaTitle (≤60 chars), metaDescription (≤155 chars), h1, sections, faq (≥5 items), schemaType

2. **Create route page** in `src/app/{category}/{slug}/page.tsx`
   - Import data file
   - Generate metadata from data
   - Render `<AeoPage data={data} />`

3. **Register in dynamic route** (if using generateStaticParams)
   - Add data to the dynamic route's `generateStaticParams()` function
   - Next.js will pre-render at build time

4. **Build and deploy**
   - `npm run build` → generates 182+ pages
   - `npm run indexnow` → pings Bing with new URLs
   - GitHub push → Cloudflare Pages auto-deploys (if webhook is configured)

---

## Critical Files Reference

| File | Purpose | Lines |
|------|---------|-------|
| CLAUDE.md | System prompt (NEEDS UPDATE) | 231 |
| src/styles/globals.css | Design tokens, typography, animations | 7535 |
| src/app/layout.tsx | Root metadata, Header, Footer, JSON-LD Organization schema | 596 |
| src/components/aeo/AeoPage.tsx | Shared AEO page renderer (JSON-LD schema + layout) | 630 |
| src/data/site-config.ts | Brand metadata, contact, social links | 27 |
| src/data/aeo/types.ts | AeoPageData interface definition | 85 |
| next.config.ts | Static export config | 25 |
| wrangler.toml | Cloudflare Pages config (needs name update) | 3 |
| package.json | Dependencies (name corrected to "preisser-solutions") | 33 |

---

## Migration & Integration Notes

### From Preissersolutions.com to Preissertech.com
- **301 redirects**: LIVE and working (Cloudflare edge-level, path-preserving)
- **DNS**: Both domains on Cloudflare, unified nameservers
- **Pages.dev subdomain**: `preisser-solutions.pages.dev` is the deployment URL (has `x-robots: noindex`)
- **Custom domain**: preissersolutions.com is bound to that deployment (via Cloudflare dashboard)

### Metadata Consolidation
- **Canonical URLs**: All point to preissersolutions.com
- **OG/Twitter**: Brand references updated to Preisser Solutions
- **JSON-LD**: Organization name is "Preisser Solutions"

### Search Engine Migration Path
- **Google**: Sitelinks/expanded entries will take 2-6 weeks to update
- **Bing**: IndexNow blast completed (109 URLs submitted 2026-05-04)
- **GSC Change of Address**: Abandoned (validator failed; using natural migration)

---

