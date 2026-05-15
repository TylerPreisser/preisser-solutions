# Preisser Solutions Website — Deep Codebase Cartography

---

## Directory Tree (Annotated)

```
Preisser Solutions/
├── .context/                                    ← CONTROL SYSTEM (new, this session)
│   ├── STATE.md                                 Master state document
│   ├── CARTOGRAPHY.md                           This file
│   ├── COMPANION_SYSTEMS.md                     Monitoring/outreach/query-dominance
│   ├── PLAYBOOK_DIGEST.md                       AI Domination Playbook summary
│   ├── MIGRATION_PLAN.md                        Domain/brand migration roadmap
│   ├── AGENTS_CHARTER.md                        Subagent operating protocol
│   ├── CHANGELOG.md                             Dated log of all changes
│   ├── plans/                                   Execution plans (checked off weekly)
│   └── souls/                                   Agent learnings & decisions
├── .claude/                                     Claude Code configuration
├── .github/workflows/
│   └── deploy.yml                               CI/CD: build → Cloudflare Pages
├── .next/                                       Next.js build cache (git-ignored)
├── archive/                                     Old Preisser Solutions site (reference only)
├── docs/                                        Session documentation
│   ├── status.md                                Project status log (updated every session)
│   ├── design-system.md                         Visual bible (colors, tokens, spacing, shadows)
│   ├── decisions.md                             Architectural decisions with rationale
│   ├── plans/
│   │   └── current-plan.md                      Current sprint checklist
│   ├── superpowers/specs/
│   │   └── 2026-04-02-preisser-solutions-rework-design.md  Original design spec
│   ├── content-mapping.md                       Content audit (27KB reference)
│   ├── content-rewrite.md                       Content narrative
│   └── pricing-research-2026-05-03.md           Pricing strategy research
├── node_modules/                                Dependencies (git-ignored)
├── out/                                         Static build output (git-ignored, deployed to Cloudflare)
│   ├── _next/                                   Next.js compiled assets
│   ├── images/                                  Public image assets (Stripe-sourced)
│   ├── fonts/                                   Web fonts
│   ├── .well-known/
│   │   ├── tdmrep.json                          Text and Data Mining report metadata
│   │   └── robots.txt                           Search bot rules
│   └── sitemap.xml                              Sitemap for crawlers
├── public/                                      Static assets served as-is
│   ├── images/
│   │   ├── stripe/                              40 Stripe placeholder images (logos, testimonials, bento)
│   │   ├── cases/                               Case study images
│   │   ├── why-us/                              Visual assets for why-us section
│   │   └── og-image.jpg                         Social share preview image
│   ├── fonts/                                   Self-hosted fonts (if any)
│   ├── robots.txt                               Search bot rules
│   ├── sitemap.xml                              Generated sitemap
│   └── .well-known/
│       └── tdmrep.json                          TDM metadata (Anthropic, OpenAI, etc. crawlers)
├── scripts/
│   └── indexnow-ping.mjs                        Node script: pings Bing IndexNow daily for new URLs
├── src/
│   ├── app/                                     Next.js App Router pages
│   │   ├── layout.tsx                           ROOT LAYOUT (metadata, JSON-LD schema, nav, footer)
│   │   ├── page.tsx                             Homepage
│   │   ├── not-found.tsx                        404 page
│   │   ├── about/page.tsx                       /about — Tyler's bio
│   │   ├── services/page.tsx                    /services — Service portfolio
│   │   ├── contact/
│   │   │   ├── layout.tsx                       Contact page layout (metadata)
│   │   │   └── page.tsx                         /contact — Contact form
│   │   ├── why-automation/page.tsx              /why-automation — Business case
│   │   ├── roi-calculator/page.tsx              /roi-calculator — Interactive ROI tool
│   │   ├── preisser-solutionsnology/page.tsx         /preisser-solutionsnology — Brand defense (vs. Helios-Preisser)
│   │   ├── tyler-preisser/page.tsx              /tyler-preisser — Founder brand (self-defense)
│   │   ├── custom-websites/page.tsx             /custom-websites — Service detail
│   │   ├── web-applications/page.tsx            /web-applications — Service detail
│   │   ├── business-automation/page.tsx         /business-automation — Service detail
│   │   ├── ai-agents/page.tsx                   /ai-agents — Service detail
│   │   ├── dashboards-and-analytics/page.tsx    /dashboards-and-analytics — Service detail
│   │   ├── premium-web-development-kansas/page.tsx  /premium-web-dev-kansas — Premium positioning
│   │   ├── faq/page.tsx                         /faq — FAQ (dynamic from data)
│   │   ├── pricing/page.tsx                     /pricing — Pricing page
│   │   ├── process/page.tsx                     /process — Methodology
│   │   ├── press/page.tsx                       /press — Press kit + news
│   │   ├── locations/
│   │   │   ├── page.tsx                         /locations — Hub page
│   │   │   ├── [slug]/page.tsx                  /locations/[city]-kansas (8 cities)
│   │   │   └── layout.tsx                       Location page layout
│   │   ├── industries/
│   │   │   ├── [slug]/page.tsx                  /industries/[vertical] (HVAC, Oil & Gas, Healthcare, Insurance, Manufacturing)
│   │   │   └── layout.tsx                       Industry page layout
│   │   └── compare/
│   │       ├── [slug]/page.tsx                  /compare/[competitor] (Adams Brown, Lost Highway, Pluto Sites, Akeratos)
│   │       └── layout.tsx                       Compare page layout
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx                       Site header/nav (scroll detection, logo animation)
│   │   │   ├── footer.tsx                       Site footer (dark Stripe style)
│   │   │   └── section.tsx                      Reusable section wrapper
│   │   ├── ui/
│   │   │   ├── button.tsx                       Button component (primary/secondary/ghost variants)
│   │   │   ├── card.tsx                         Card wrapper (light/dark variants)
│   │   │   ├── badge.tsx                        Badge/tag component
│   │   │   └── input.tsx                        Form input component
│   │   ├── home/
│   │   │   ├── hero.tsx                         Hero section (animated mesh gradient)
│   │   │   ├── personal-commitment.tsx          Logo bar + stats bar (GSAP reveal)
│   │   │   ├── value-props.tsx                  3×2 service card grid (GSAP stagger)
│   │   │   ├── how-it-works.tsx                 Feature split: dark section (GSAP slide)
│   │   │   ├── services-overview.tsx            Feature split: light section (GSAP slide)
│   │   │   ├── social-proof.tsx                 Testimonials section (dark cards)
│   │   │   ├── enterprise-section.tsx           Enterprise 2×2 accordion grid
│   │   │   ├── happenings.tsx                   Horizontal scroll carousel
│   │   │   └── cta-section.tsx                  Final CTA (gradient bg, GSAP entrance)
│   │   ├── services/
│   │   │   └── service-detail.tsx               Individual service expandable section
│   │   ├── about/
│   │   │   └── bio-section.tsx                  Tyler bio grid component
│   │   └── contact/
│   │       └── contact-form.tsx                 Contact form (POST to Zapier webhook)
│   ├── data/                                    CONTENT (TypeScript data files, not hardcoded in JSX)
│   │   ├── site-config.ts                       Metadata, URLs, contact info, branding
│   │   ├── navigation.ts                        Nav links + structure
│   │   ├── services.ts                          Service definitions + descriptions
│   │   ├── case-studies.ts                      Case study / testimonial data
│   │   ├── faqs.ts                              FAQ entries (dynamic)
│   │   ├── aeo/
│   │   │   ├── locations.ts                     Kansas city data (8 locations)
│   │   │   ├── industries.ts                    Vertical data (5 industries)
│   │   │   ├── competitors.ts                   Comparison data (4 competitors)
│   │   │   ├── pricing.ts                       Pricing tiers + features
│   │   │   └── press.ts                         Press kit entries
│   │   └── schema.ts                            JSON-LD schema definitions
│   ├── lib/
│   │   ├── gsap.ts                              GSAP plugin registration (ONE place)
│   │   ├── animations.ts                        Shared animation presets
│   │   └── utils.ts                             Utility functions (cn(), etc.)
│   ├── hooks/
│   │   ├── use-scroll-position.ts               Scroll position tracking for nav
│   │   ├── use-media-query.ts                   Responsive breakpoint detection
│   │   └── use-reduced-motion.ts                prefers-reduced-motion detection
│   └── styles/
│       └── globals.css                          Tailwind + design tokens (~1900 lines)
├── CLAUDE.md                                    MASTER SYSTEM PROMPT (231 lines)
├── package.json                                 Dependencies + build scripts
├── package-lock.json                            Locked dependency versions
├── tsconfig.json                                TypeScript configuration
├── next.config.ts                               Next.js configuration (output: 'export')
├── postcss.config.mjs                           Tailwind v4 PostCSS pipeline
├── wrangler.toml                                Cloudflare Pages config (old name, cosmetic)
├── .gitignore                                   Git exclusions
├── .DS_Store                                    macOS file (git-ignored)
└── README.md                                    (if present)
```

---

## Routing Structure (105 Pages)

### Core Pages (19 always-visible)
| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/` | `app/page.tsx` | Homepage — hero, services, testimonials, CTA | Complete |
| `/about` | `app/about/page.tsx` | Tyler's bio, mission, values | Complete |
| `/services` | `app/services/page.tsx` | Service portfolio | Complete |
| `/contact` | `app/contact/page.tsx` | Contact form (Zapier webhook) | Complete |
| `/why-automation` | `app/why-automation/page.tsx` | Business case for automation | Complete |
| `/roi-calculator` | `app/roi-calculator/page.tsx` | Interactive ROI calculator | Complete |
| `/preisser-solutionsnology` | `app/preisser-solutionsnology/page.tsx` | Brand defense (vs. Helios-Preisser) | Complete |
| `/tyler-preisser` | `app/tyler-preisser/page.tsx` | Personal brand (Tyler Preisser founder) | Complete |
| `/custom-websites` | `app/custom-websites/page.tsx` | Service detail: websites | Complete |
| `/web-applications` | `app/web-applications/page.tsx` | Service detail: web apps | Complete |
| `/business-automation` | `app/business-automation/page.tsx` | Service detail: automation | Complete |
| `/ai-agents` | `app/ai-agents/page.tsx` | Service detail: AI agents | Complete |
| `/dashboards-and-analytics` | `app/dashboards-and-analytics/page.tsx` | Service detail: analytics | Complete |
| `/premium-web-development-kansas` | `app/premium-web-development-kansas/page.tsx` | Premium positioning | Complete |
| `/faq` | `app/faq/page.tsx` | FAQ (dynamic from `data/faqs.ts`) | Complete |
| `/pricing` | `app/pricing/page.tsx` | Pricing + packages | Complete |
| `/process` | `app/process/page.tsx` | Methodology / process | Complete |
| `/press` | `app/press/page.tsx` | Press kit + news | Complete |

### Geographic Pages (9 pages + hub)
| Route | File | Anchor | Status |
|-------|------|--------|--------|
| `/locations` | `app/locations/page.tsx` | Hub page | Complete |
| `/locations/hays-kansas` | `app/locations/[slug]/page.tsx` | HQ location | Complete |
| `/locations/wichita-kansas` | `app/locations/[slug]/page.tsx` | Major metro | Complete |
| `/locations/salina-kansas` | `app/locations/[slug]/page.tsx` | Regional | Complete |
| `/locations/topeka-kansas` | `app/locations/[slug]/page.tsx` | State capital | Complete |
| `/locations/manhattan-kansas` | `app/locations/[slug]/page.tsx` | College town | Complete |
| `/locations/garden-city-kansas` | `app/locations/[slug]/page.tsx` | Western region | Complete |
| `/locations/great-bend-kansas` | `app/locations/[slug]/page.tsx` | Central region | Complete |
| `/locations/dodge-city-kansas` | `app/locations/[slug]/page.tsx` | Panhandle | Complete |

### Industry/Vertical Pages (5 + hub)
| Route | File | Vertical | Status |
|-------|------|----------|--------|
| `/industries` | `app/industries/page.tsx` | Hub | Complete |
| `/industries/hvac` | `app/industries/[slug]/page.tsx` | HVAC (Cassidy case study) | Complete |
| `/industries/oil-gas` | `app/industries/[slug]/page.tsx` | Oil & Gas (HG Oil case study) | Complete |
| `/industries/healthcare` | `app/industries/[slug]/page.tsx` | Healthcare | Complete |
| `/industries/insurance-financial` | `app/industries/[slug]/page.tsx` | Insurance/Financial | Complete |
| `/industries/manufacturing` | `app/industries/[slug]/page.tsx` | Manufacturing | Complete |

### Comparison Pages (4)
| Route | File | Competitor | Status |
|-------|------|-----------|--------|
| `/compare/adams-brown` | `app/compare/[slug]/page.tsx` | Adams Brown Tech | Complete |
| `/compare/lost-highway-media` | `app/compare/[slug]/page.tsx` | Lost Highway Media | Complete |
| `/compare/pluto-sites` | `app/compare/[slug]/page.tsx` | Pluto Sites | Complete |
| `/compare/akeratos` | `app/compare/[slug]/page.tsx` | Akeratos | Complete |

---

## Component Hierarchy & Patterns

### Layout Components
- **`Header`** — Site-wide navigation (scroll-aware, logo animation, CTA button). Transparent hero, solid dark on scroll.
- **`Footer`** — Dark Stripe-style (4-column grid: brand + 3 link columns). Responsive collapse on mobile.
- **`Section`** — Reusable wrapper (section padding, background color variant, full-width support).

### UI Components
- **`Button`** — Variants: `primary` (pill, blue), `secondary` (outlined), `ghost` (text-only). Size: `sm/md/lg`.
- **`Card`** — Variants: `light` (white bg), `dark` (navy bg). With borders, shadows, hover lift.
- **`Badge`** — Inline tag/pill for labels, categories, social proof.
- **`Input`** — Form input with focus states, label, error message support.

### Home Page Sections (9 sections, 1 hero)
1. **Hero** — Full-viewport dark section. Animated radial gradient mesh (purple→blue→teal→green cycle). Eyebrow badge (pulsing), headline (gradient-clipped), subtitle, dual CTAs, scroll indicator.
2. **LogoBar + StatsBar** — Light section. Placeholder company logos (gray rectangles). 4-stat grid with GSAP stagger reveal.
3. **ValueProps** — Light section. 3×2 service card grid. Per-card colored icon, hover lift, GSAP stagger.
4. **HowItWorks** — Dark section. Two-column feature split (text left, visual right). Feature checklist, GSAP slide-in.
5. **ServicesOverview** — Light section. Two-column feature split (visual left, text right). "Measurable Outcomes" framing, GSAP slide-in.
6. **EnterpriseSection** — Dark section. 2×2 accordion image grid. Stripe's "enterprise" positioning.
7. **Happenings** — Light section. Horizontal scroll carousel ("The Happenings" style).
8. **SocialProof** — Dark section. 3-column testimonial card grid. Dark cards, client badges, quote formatting, GSAP stagger.
9. **CTA** — Dark gradient bg with radial glow. Staggered GSAP entrance, dual CTAs.

---

## Data Layer & Content Structure

### Data Files (TypeScript)
All content lives in `src/data/` — **never hardcoded in JSX**. Components import and map over data.

| File | Purpose | Lines | Records |
|------|---------|-------|---------|
| `site-config.ts` | Metadata, URLs, contact, branding | 24 | 1 |
| `navigation.ts` | Nav links + structure | ~50 | 15+ links |
| `services.ts` | Service definitions | ~150 | 5 services |
| `case-studies.ts` | Testimonials / case studies | ~100 | 4-5 cases |
| `faqs.ts` | FAQ entries (dynamic) | ~200 | 15+ FAQs |
| `aeo/locations.ts` | Kansas city metadata | ~80 | 8 cities |
| `aeo/industries.ts` | Vertical metadata | ~100 | 5 industries |
| `aeo/competitors.ts` | Competitor comparison data | ~120 | 4 competitors |
| `aeo/pricing.ts` | Pricing tiers | ~150 | 3-4 tiers |
| `aeo/press.ts` | Press kit entries | ~80 | 3-4 items |
| `schema.ts` | JSON-LD schema generators | ~100 | Organization, LocalBusiness, Service, etc. |

### Data Flow Pattern
```
src/data/*.ts (TypeScript object)
    ↓
src/components/*.tsx (imports & maps)
    ↓
JSX (renders with Tailwind + GSAP)
    ↓
Static HTML (built to /out/)
```

**Key rule**: If content changes, update the `.ts` file, never the `.tsx` component.

---

## Styling System

### Design Tokens (Stripe HDS)
All in `src/styles/globals.css` (~1900 lines). CSS custom properties for design tokens:

```css
--hds-color-primary: #0D95E8;
--hds-color-primary-hover: #0B7BC0;
--hds-color-dark: #0A1628;
--hds-color-dark-surface: #0F1D30;
--hds-color-light: #FAFAFA;
--hds-color-light-alt: #F5F5F5;
--hds-color-text-primary: #1A1A1A;
--hds-color-text-secondary: #4A5568;
--hds-color-text-on-dark: #F0F0F0;
--hds-color-text-muted: #9CA3AF;

--hds-space-core-radius-sm: 4px;
--hds-space-core-radius-md: 8px;
--hds-space-core-radius-pill: 50px;
--hds-space-core-radius-full: 9999px;

--hds-shadow-xs: 0 1px 2px 0 rgba(50, 50, 93, 0.15);
--hds-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--hds-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--hds-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

### Tailwind v4
- Utility-first styling (95%+ of CSS)
- No custom component classes (except global `.ps-*` classes)
- Responsive utilities: `sm:`, `md:`, `lg:`, `xl:`
- All token colors use CSS variables for consistency

### Animation System
- **GSAP ScrollTrigger**: All scroll-triggered animations (reveal, fade-up, slide-in)
- **Framer Motion**: Page transitions (AnimatePresence)
- **CSS animations**: Hero gradient mesh (pure CSS, no JS), scroll indicator
- **Reduced motion**: All animations check `prefers-reduced-motion: reduce` before executing

### Typography
- **Headings**: Inter (bold, fluid `clamp()` sizing for responsive scaling)
- **Body**: Inter / system sans-serif
- **Mono**: Fira Code (code blocks, technical elements)

---

## Build Pipeline & Scripts

### NPM Scripts
```bash
npm run dev          # Local dev server (next dev)
npm run build        # Production build (next build → /out/)
npm run start        # Start Next.js server (unused, static export only)
npm run lint         # ESLint check
npm run preview      # Serve /out/ locally via npx serve
npm run indexnow     # Ping Bing IndexNow (node scripts/indexnow-ping.mjs)
```

### Build Config
- **next.config.ts**: `output: 'export'` (static-only, no API routes)
- **postcss.config.mjs**: Tailwind v4 PostCSS pipeline
- **tsconfig.json**: Strict TypeScript mode, path aliases `@/*`

### CI/CD
- **GitHub Actions**: `.github/workflows/deploy.yml`
- **Trigger**: Push to `main` branch
- **Steps**: build → test (optional) → deploy to Cloudflare Pages
- **Output**: `/out/` directory deployed as static site

### Performance
- Build time: < 1 minute (clean)
- No server-side rendering or dynamic APIs
- 105 static HTML files pre-rendered at build time
- Sitemap auto-generated (all URLs crawlable)

---

## Critical Conventions & Gotchas

### Must Follow
1. **Content in data files** — Never hardcode text strings in JSX. Always import from `src/data/`.
2. **GSAP through lib/** — Never import GSAP plugins directly in components. All plugins registered in `src/lib/gsap.ts` once.
3. **Static export only** — No API routes, no server-side features, no middleware.
4. **Path aliases** — Always use `@/` imports, never relative paths.
5. **Metadata on every page** — Every `.tsx` page file must export metadata (canonical, og:, schema).
6. **Reduced-motion compliance** — Check `useReducedMotion()` hook before animating.
7. **Mobile-first design** — Default styles for mobile, enhance with `md:` and `lg:` utilities.

### Known Gotchas
1. **GSAP + ScrollTrigger cleanup** — If using ScrollTrigger, must cleanup on unmount or it will leak timelines.
2. **Framer Motion + Next.js exports** — Can't use dynamic imports with Framer Motion in static export (precompile all animations).
3. **Image optimization** — `next/image` doesn't work in static export; use `<img>` tag or import as static asset.
4. **Incremental Static Regeneration** — ISR not available in static export; all pages rebuilt on every deployment.
5. **Dynamic routes** — AEO pages (locations, industries, comparisons) use `[slug]` pattern; all slugs must be pre-defined in `getStaticParams()` or paths must be pre-rendered.

---

## File Naming Conventions

- **Component files**: kebab-case (`hero-section.tsx`, `value-props.tsx`)
- **Component exports**: PascalCase (`HeroSection`, `ValueProps`)
- **Data files**: kebab-case (`site-config.ts`, `case-studies.ts`)
- **Hook files**: kebab-case (`use-scroll-position.ts`)
- **Style files**: kebab-case (`globals.css`)
- **Route directories**: kebab-case (`/locations`, `/industries`, `/compare`)

---

## Recent Commits & Activity

Latest session (2026-05-03):
- Added `/press` page with press kit data
- Expanded AEO network from 35 → 105 pages (70 new location/industry/comparison pages)
- Updated site-config and metadata
- Fixed sitemap generation
- Integrated IndexNow pinging script

---

## Performance Metrics (TBD)

- **Lighthouse score**: UNKNOWN
- **Core Web Vitals**: UNKNOWN
- **First Contentful Paint**: UNKNOWN
- **Time to Interactive**: UNKNOWN
- **Build size**: UNKNOWN (likely < 2MB gzipped for 105 static pages)

---
