# Preisser Solutions — Complete Codebase Cartography

**Last Updated**: 2026-05-11  
**Author**: Codebase Cartographer Agent  
**Status**: Phase 1 Foundation Complete, 106 pages deployed

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Tech Stack & Dependencies](#tech-stack--dependencies)
3. [Architecture Overview](#architecture-overview)
4. [Directory Structure](#directory-structure)
5. [Complete Route Map (106 Pages)](#complete-route-map-106-pages)
6. [Component Inventory](#component-inventory)
7. [Data Layer & Content Architecture](#data-layer--content-architecture)
8. [Design System & Styling](#design-system--styling)
9. [Build, Deploy & CI/CD](#build-deploy--cicd)
10. [Code Conventions & Patterns](#code-conventions--patterns)
11. [Critical Gotchas & Known Issues](#critical-gotchas--known-issues)
12. [Brand Implementation](#brand-implementation)
13. [SEO & AEO (Answer Engine Optimization)](#seo--aeo-answer-engine-optimization)
14. [Key Files Reference](#key-files-reference)

---

## Executive Summary

**What This Is**: Premium B2B consultancy website for Preisser Solutions (preissersolutions.com), a Kansas-based custom software, AI automation, and web development firm founded by Tyler Preisser. This is both a marketing site AND a proof-of-concept demonstrating the AI-domination SEO playbook Tyler sells to clients.

**Core Stats**:
- **106 pages** deployed and pre-rendered (up from initial 35 core pages)
- **Tech**: Next.js 15 + React 19 + TypeScript 5.7 + Tailwind v4 + GSAP 3.12.7
- **Deploy**: Cloudflare Pages (static export from `/out` directory)
- **Build**: `npm run build` → 106 static HTML files in `/out/`
- **Development**: `npm run dev` (Next.js dev server on `localhost:3000`)
- **CI/CD**: GitHub Actions → Cloudflare Pages on push to `main`

**Strategic Purpose**: Rank #1 on every AI search engine (ChatGPT, Perplexity, Claude, Google Gemini) + Google Search for business automation, custom software, and AI-agent queries across Kansas and Great Plains region. Uses sophisticated Answer Engine Optimization (AEO) with 70+ geo/vertical/comparison pages to dominate specific niches and comparisons.

**Site Structure**:
- **19 Core Pages**: Marketing pages (home, about, services, contact, process, pricing, FAQ, press)
- **27 Location Pages**: Kansas cities and towns for local SEO (Hays HQ + 26 regional variations)
- **20 Industry Pages**: Verticals (HVAC, Oil & Gas, Healthcare, Agriculture, Dental, etc.) with case studies
- **16 Comparison Pages**: vs. Competitors (Adams Brown, Lost Highway, Pluto Sites, Akeratos) + Platform comparisons (WordPress, Webflow, Zapier, Salesforce, HubSpot, etc.)
- **11 Service Detail Pages**: Deep dives on specific offerings (AI Agents, Custom Websites, Dashboards, etc.)
- **4 Case Study Pages**: Detailed project breakdowns
- **9 Additional Pages**: FAQ, Pricing, Process, Press, Brand Defense pages

---

## Tech Stack & Dependencies

### Core Framework
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 15.3.0 | App Router, static export, SSG |
| `react` | 19.1.0 | UI framework (React 19 concurrent features) |
| `react-dom` | 19.1.0 | DOM rendering |
| `typescript` | 5.7.0 | Type-safe development |

### Animation & Interaction
| Package | Version | Purpose |
|---------|---------|---------|
| `gsap` | 3.12.7 | Scroll-triggered animations, timelines |
| `framer-motion` | 12.0.0 | Page transitions, micro-interactions |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | 4.0.0 | Utility-first CSS (primary styling approach) |
| `@tailwindcss/postcss` | 4.0.0 | Tailwind v4 PostCSS plugin |
| `postcss` | 8.5.0 | CSS transformation pipeline |

### Development Tools
| Package | Version | Purpose |
|---------|---------|---------|
| `eslint` | 9.0.0 | Linting (Next.js config) |
| `eslint-config-next` | 15.3.0 | Next.js recommended rules |
| `@types/node` | 22.0.0 | Node.js types |
| `@types/react` | 19.0.0 | React type definitions |
| `@types/react-dom` | 19.0.0 | React DOM types |

### Key Constraints
- **No external API dependencies** (no Prisma, tRPC, Axios, etc.) — fully static
- **No database connection** — all content in TypeScript data files
- **No SSR or server-side computation** — static export only
- **No image optimization** — next/image disabled, using `<img>` tags with static assets
- **Minimal external services** — Zapier webhook for contact form, Google Analytics if env var set

---

## Architecture Overview

### Execution Model
```
src/data/*.ts (TypeScript data objects)
    ↓
src/components/*.tsx (imports & renders data)
    ↓
src/app/[route]/page.tsx (route handler, exports metadata)
    ↓
Next.js Static Generation
    ↓
/out/*.html (static files)
    ↓
Cloudflare Pages deployment
    ↓
HTML served at preissersolutions.com
```

### Key Architectural Decisions (See `docs/decisions.md`)

1. **Static Export Only** — `output: 'export'` in next.config.ts. No API routes, no middleware, no server-side rendering. All 106 pages are pre-built at build time.

2. **Content in Data Files** — All copy, structure, metadata lives in `src/data/*.ts`. Components are thin wrappers that import and render data. This separates content (what to say) from presentation (how to say it).

3. **Centralized GSAP Registration** — All GSAP plugins imported through `src/lib/gsap.ts` once. Components import from there, not directly from gsap packages. Prevents duplicate plugin registration and memory leaks.

4. **JSON-LD Structured Data Strategy** — Homepage (layout.tsx) emits global Organization/Person/WebSite/LocalBusiness/WebPage schemas. Per-page AEO routes emit their own Service/Article/WebPage + FAQPage blocks via AeoPage component. No duplicate FAQPage blocks to avoid GSC validation errors.

5. **AEO via Dynamic Templates** — Locations, Industries, and Comparison pages use `[slug]` dynamic routes. All slugs pre-defined in `src/data/aeo/*/` files. Build-time generates 70+ pages from 3 reusable page templates + data files.

6. **Design Tokens via CSS Custom Properties** — All colors, spacing, shadows in `src/styles/globals.css` as CSS variables (--hds-color-*, --hds-space-*, etc.). Tailwind config empty (v4 style). Enables theme switching (light/dark) without re-rendering.

7. **Dark/Light Mode with Theme Attribute** — HTML `data-theme` attribute set by synchronous script in `<head>`. Prevents flash of wrong theme. Uses `prefers-color-scheme` as fallback.

---

## Directory Structure

```
Preisser Solutions/                         Root project directory
├── .context/                               CONTROL SYSTEM (Phase 1 foundation docs)
│   ├── STATE.md                            Master state, brand audit, blockers
│   ├── CARTOGRAPHY.md                      Deep codebase cartography (previous version)
│   ├── CODEBASE_MAP.md                     THIS FILE (complete cartography)
│   ├── CHANGELOG.md                        Dated change log (all updates)
│   ├── AGENTS_CHARTER.md                   Subagent operating protocol
│   ├── MIGRATION_PLAN.md                   Domain/brand migration roadmap (7 phases)
│   ├── PLAYBOOK_DIGEST.md                  AI Domination Playbook summary
│   ├── AI_AGENT_BEHAVIOR_REFERENCE.md      AI Engine ranking factors
│   ├── CANONICAL_REQUIREMENTS.md           SEO/metadata/schema requirements
│   ├── AEO_AUDIT_2026-05-04.md            Technical AEO audit
│   ├── COMPANION_SYSTEMS.md                Monitoring/outreach/query-dominance
│   ├── plans/                              Execution plans (checked off weekly)
│   └── souls/                              Agent learnings & decisions
│
├── .github/workflows/
│   └── deploy.yml                          CI/CD: build → Cloudflare Pages
│
├── .claude/                                Claude Code session config
│
├── archive/                                Old Preisser Solutions site (reference)
│
├── docs/                                   Session documentation
│   ├── status.md                           Project status log (updated every session)
│   ├── design-system.md                    Visual bible (colors, tokens, typography)
│   ├── decisions.md                        Architectural decisions with rationale
│   ├── plans/current-plan.md               Current sprint checklist
│   ├── superpowers/specs/                  Original design spec (reference)
│   └── content-mapping.md                  Content audit
│
├── node_modules/                           Dependencies (git-ignored)
├── out/                                    Static build output (git-ignored, deployed)
├── .next/                                  Next.js build cache (git-ignored)
│
├── public/                                 Static assets (served as-is)
│   ├── images/
│   │   ├── stripe/                         Stripe placeholder images
│   │   ├── cases/                          Case study images
│   │   ├── why-us/                         Visual assets
│   │   └── og-image-v2.jpg                 Social share preview
│   ├── fonts/                              Self-hosted web fonts
│   ├── favicon.ico, favicon-*.png          Favicon variants
│   ├── android-chrome-*.png                PWA app icons
│   ├── apple-touch-icon.png                iOS home screen icon
│   ├── safari-pinned-tab.svg               Safari pinned tab
│   ├── robots.txt                          Search bot rules
│   ├── sitemap.xml                         XML sitemap
│   ├── site.webmanifest                    PWA manifest
│   ├── .well-known/tdmrep.json             TDM crawlers (Anthropic, OpenAI)
│   └── agent-tools.js                      Custom agent detection/hints
│
├── scripts/
│   └── indexnow-ping.mjs                   Node script: IndexNow pinging (Bing)
│
├── src/
│   ├── app/                                Next.js App Router (all routes)
│   │   ├── layout.tsx                      ROOT LAYOUT — metadata, JSON-LD, header, footer
│   │   ├── page.tsx                        / (homepage)
│   │   ├── not-found.tsx                   404 page
│   │   │
│   │   ├── [CORE PAGES - 19 files]
│   │   ├── about/page.tsx                  /about
│   │   ├── contact/{layout,page}.tsx       /contact (form page)
│   │   ├── custom-websites/page.tsx        /custom-websites
│   │   ├── web-applications/page.tsx       /web-applications
│   │   ├── business-automation/page.tsx    /business-automation
│   │   ├── ai-agents/page.tsx              /ai-agents
│   │   ├── dashboards-and-analytics/page.tsx /dashboards-and-analytics
│   │   ├── why-automation/page.tsx         /why-automation
│   │   ├── roi-calculator/{layout,page}.tsx /roi-calculator
│   │   ├── premium-web-development-kansas/page.tsx /premium-web-dev-kansas
│   │   ├── preisser-solutionsnology/page.tsx    /preisser-solutionsnology (brand defense)
│   │   ├── tyler-preisser/page.tsx         /tyler-preisser (founder branding)
│   │   ├── faq/page.tsx                    /faq
│   │   ├── pricing/page.tsx                /pricing
│   │   ├── process/page.tsx                /process
│   │   ├── press/page.tsx                  /press
│   │   │
│   │   ├── [GEO PAGES - 27 files]
│   │   ├── locations/
│   │   │   ├── page.tsx                    /locations (hub)
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx                /locations/[city]-kansas (27 cities)
│   │   │   │   └── layout.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── [INDUSTRY PAGES - 20 files]
│   │   ├── industries/
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx                /industries/[vertical] (20 verticals)
│   │   │   │   └── layout.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── [COMPARISON PAGES - 16 files]
│   │   ├── compare/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx                /compare/[competitor] (16 comparisons)
│   │   │   └── layout.tsx
│   │   │
│   │   ├── [SERVICE DETAIL PAGES - 11 files]
│   │   ├── services/
│   │   │   ├── page.tsx                    /services (hub)
│   │   │   ├── [slug]/page.tsx             /services/[service] (11 services)
│   │   │
│   │   └── [CASE STUDY PAGES - 5 files]
│   │       ├── case-studies/
│   │       │   ├── page.tsx                /case-studies (hub)
│   │       │   ├── cassidy-hvac/page.tsx
│   │       │   ├── hg-oil-holdings/page.tsx
│   │       │   ├── iron-and-oak-podcast/page.tsx
│   │       │   └── wife-supply-co/page.tsx
│   │
│   ├── components/                        Reusable components
│   │   ├── layout/
│   │   │   ├── header.tsx                  Site navigation (scroll-aware)
│   │   │   ├── footer.tsx                  Dark Stripe-style footer
│   │   │   └── section.tsx                 Section wrapper (padding/bg)
│   │   │
│   │   ├── ui/
│   │   │   ├── button.tsx                  Button (primary/secondary/ghost)
│   │   │   ├── card.tsx                    Card (light/dark variants)
│   │   │   ├── badge.tsx                   Badge/tag component
│   │   │   └── input.tsx                   Form input
│   │   │
│   │   ├── home/
│   │   │   ├── hero.tsx                    Home hero (GSAP mesh gradient)
│   │   │   ├── value-strip.tsx             Logo bar + stats (GSAP reveal)
│   │   │   ├── service-pillars.tsx         6-service expandable accordion
│   │   │   ├── why-us.tsx                  3-column value props grid
│   │   │   ├── problem-section.tsx         Problem/solution narrative
│   │   │   ├── results.tsx                 Results/ROI section
│   │   │   ├── case-studies.tsx            Case study cards
│   │   │   ├── tech-partners.tsx           Partner logos
│   │   │   └── cta-section.tsx             Final CTA (gradient bg)
│   │   │
│   │   ├── services/
│   │   │   └── service-detail.tsx          Service expandable section
│   │   │
│   │   ├── about/
│   │   │   └── bio-section.tsx             Tyler bio grid
│   │   │
│   │   ├── contact/
│   │   │   ├── contact-form.tsx            Contact form (Zapier webhook)
│   │   │   └── ContactPageClient.tsx       Client wrapper
│   │   │
│   │   ├── aeo/
│   │   │   └── AeoPage.tsx                 Shared AEO page template
│   │   │
│   │   ├── ai-pages/
│   │   │   ├── AIPageLayout.tsx            AI-optimized page layout
│   │   │   └── StructuredData.tsx          AI schema generation
│   │   │
│   │   └── roi/
│   │       └── RoiCalculatorPageClient.tsx ROI calculator interaction
│   │
│   ├── data/                               CONTENT (TypeScript data files)
│   │   ├── site-config.ts                  Metadata, brand, contact info
│   │   ├── navigation.ts                   Nav links + structure
│   │   ├── services.ts                     Service definitions + benefits
│   │   ├── case-studies.ts                 Case study/testimonial data
│   │   │
│   │   └── aeo/                            AEO (Answer Engine Optimization) data
│   │       ├── types.ts                    TypeScript interfaces for AEO pages
│   │       ├── faq.ts                      FAQ entries (dynamic)
│   │       ├── pricing.ts                  Pricing tiers + features
│   │       ├── press.ts                    Press kit entries
│   │       ├── process.ts                  Process/methodology steps
│   │       ├── preisser-solutionsnology.ts      Brand defense page data
│   │       ├── premium-web-development-kansas.ts Premium positioning
│   │       ├── tyler-preisser.ts           Founder branding page
│   │       ├── ai-agents.ts                AI Agents service deep-dive
│   │       ├── business-automation.ts      Automation service deep-dive
│   │       ├── custom-websites.ts          Websites service deep-dive
│   │       ├── dashboards-and-analytics.ts Dashboards service deep-dive
│   │       ├── web-applications.ts         Web Apps service deep-dive
│   │       │
│   │       ├── case-studies/
│   │       │   ├── index.ts                Case study data index
│   │       │   ├── cassidy-hvac.ts
│   │       │   ├── hg-oil-holdings.ts
│   │       │   ├── iron-and-oak-podcast.ts
│   │       │   └── wife-supply-co.ts
│   │       │
│   │       ├── compare/                    Competitor comparison data (16 files)
│   │       │   ├── adams-brown.ts
│   │       │   ├── akeratos.ts
│   │       │   ├── lost-highway-media.ts
│   │       │   ├── pluto-sites.ts
│   │       │   ├── [Platform comparisons]
│   │       │   └── wordpress-vs-custom.ts
│   │       │
│   │       ├── industries/                 Vertical-specific data (20 files)
│   │       │   ├── hvac.ts
│   │       │   ├── oil-gas.ts
│   │       │   ├── agriculture.ts
│   │       │   ├── automotive.ts
│   │       │   ├── construction.ts
│   │       │   ├── dental.ts
│   │       │   ├── healthcare.ts
│   │       │   ├── insurance-financial.ts
│   │       │   ├── manufacturing.ts
│   │       │   ├── plumbing.ts
│   │       │   └── [15 more verticals]
│   │       │
│   │       ├── locations/                  Geographic data (27 files)
│   │       │   ├── hays-kansas.ts          HQ
│   │       │   ├── wichita-kansas.ts       Major metro
│   │       │   ├── kansas-city.ts          Regional hub
│   │       │   └── [24 more Kansas cities]
│   │       │
│   │       ├── services/                   Service detail deep-dives (11 files)
│   │       │   ├── ai-agents.ts
│   │       │   ├── ai-customer-service.ts
│   │       │   ├── ai-invoicing.ts
│   │       │   ├── ai-search-optimization.ts
│   │       │   ├── api-integration.ts
│   │       │   ├── client-portal.ts
│   │       │   ├── conversion-optimization.ts
│   │       │   ├── custom-crm.ts
│   │       │   ├── local-seo.ts
│   │       │   ├── website-migration.ts
│   │       │   └── website-redesign.ts
│   │       │
│   │       └── ai-pages/
│   │           └── types.ts                AI page type definitions
│   │
│   ├── lib/
│   │   ├── gsap.ts                         GSAP plugin registration (ONE place)
│   │   ├── animations.ts                   Shared animation presets
│   │   ├── breadcrumbs.ts                  Breadcrumb generation helper
│   │   └── utils.ts                        Utility functions (cn, etc.)
│   │
│   ├── hooks/
│   │   ├── use-scroll-position.ts          Scroll position tracking
│   │   ├── use-media-query.ts              Responsive breakpoint detection
│   │   └── use-reduced-motion.ts           Reduced motion preference
│   │
│   └── styles/
│       └── globals.css                     Tailwind imports + design tokens (~6500 lines)
│
├── CLAUDE.md                               Master system prompt (231 lines)
├── package.json                            Dependencies + build scripts
├── package-lock.json                       Locked dependency versions
├── tsconfig.json                           TypeScript config
├── next.config.ts                          Next.js config (static export)
├── postcss.config.mjs                      Tailwind v4 PostCSS pipeline
├── wrangler.toml                           Cloudflare Pages config
├── tailwind.config.ts                      Tailwind config (empty, uses CSS tokens)
├── .gitignore                              Git exclusions
└── README.md                               Project readme (if present)
```

---

## Complete Route Map (106 Pages)

Total pages: **106** (19 core + 27 geo + 20 industries + 16 comparisons + 11 service details + 5 case studies + 8 other)

### Core Pages (19 pages)

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/` | `app/page.tsx` | Homepage — hero, services, testimonials, CTA | ✓ Complete |
| `/about` | `app/about/page.tsx` | Tyler's bio, mission, values | ✓ Complete |
| `/contact` | `app/contact/page.tsx` | Contact form (Zapier webhook) | ✓ Complete |
| `/custom-websites` | `app/custom-websites/page.tsx` | Service: custom websites | ✓ Complete |
| `/web-applications` | `app/web-applications/page.tsx` | Service: web applications | ✓ Complete |
| `/business-automation` | `app/business-automation/page.tsx` | Service: automation | ✓ Complete |
| `/ai-agents` | `app/ai-agents/page.tsx` | Service: AI agents | ✓ Complete |
| `/dashboards-and-analytics` | `app/dashboards-and-analytics/page.tsx` | Service: dashboards | ✓ Complete |
| `/why-automation` | `app/why-automation/page.tsx` | Business case for automation | ✓ Complete |
| `/roi-calculator` | `app/roi-calculator/page.tsx` | Interactive ROI tool | ✓ Complete |
| `/premium-web-development-kansas` | `app/premium-web-development-kansas/page.tsx` | Premium positioning | ✓ Complete |
| `/preisser-solutionsnology` | `app/preisser-solutionsnology/page.tsx` | Brand defense (vs. Helios-Preisser) | ✓ Complete |
| `/tyler-preisser` | `app/tyler-preisser/page.tsx` | Personal brand | ✓ Complete |
| `/faq` | `app/faq/page.tsx` | FAQ (dynamic from data) | ✓ Complete |
| `/pricing` | `app/pricing/page.tsx` | Pricing + packages | ✓ Complete |
| `/process` | `app/process/page.tsx` | Methodology | ✓ Complete |
| `/press` | `app/press/page.tsx` | Press kit + news | ✓ Complete |
| `/case-studies` | `app/case-studies/page.tsx` | Case studies hub | ✓ Complete |

### Geographic Pages (27 pages)

**Hub**: `/locations`

**Cities** (27):
- **Major Metros**: Wichita, Kansas City (Olathe, Overland Park), Topeka, Lawrence, Manhattan
- **Tier 2**: Salina, Emporia, Hutchinson, McPherson, Abilene, Junction City
- **Tier 3**: Colby, Dodge City, Garden City, Great Bend, Liberal, Goodland
- **Tier 4**: Atchison, Beloit, Coffeyville, Concordia, Hill City, Norton, Ottawa, Parsons, Phillipsburg, Pittsburg, Plainville, Pratt, Russell, Smith Center

**Pattern**: `/locations/[city]-kansas`

### Industry/Vertical Pages (20 pages)

**Hub**: `/industries`

**Verticals** (20):
- HVAC (Cassidy case study)
- Oil & Gas (HG Oil case study)
- Healthcare
- Insurance & Financial
- Manufacturing
- Construction
- Plumbing
- Roofing
- Electrical
- HVAC
- Dental
- Veterinary
- Agriculture
- Automotive/Auto Service
- Restaurant
- Retail
- Real Estate
- Garage Door
- Landscaping
- Pest Control
- Trucking & Logistics

**Pattern**: `/industries/[vertical-slug]`

### Comparison Pages (16 pages)

**Competitors** (4):
- Adams Brown Tech
- Lost Highway Media
- Pluto Sites
- Akeratos

**Platform/Tool Comparisons** (12):
- WordPress vs. Custom
- Webflow vs. Custom Coded
- Bubble vs. Custom Coded
- Wix vs. Custom
- Squarespace vs. Custom
- Shopify vs. Custom E-commerce
- Zapier vs. Custom Automation
- Make.com vs. Custom Automation
- HubSpot vs. Custom CRM
- Salesforce vs. Custom CRM
- FlutterFlow vs. Custom Coded
- CSG Media, Toucan Design, Conceptualized Design, Imagemakers, KC Web Designer

**Pattern**: `/compare/[competitor-slug]`

### Service Detail Pages (11 pages)

**Hub**: `/services`

**Services** (11):
- AI Agents
- AI Customer Service
- AI Invoicing
- AI Search Optimization
- API Integration
- Client Portal
- Conversion Optimization
- Custom CRM
- Local SEO
- Website Migration
- Website Redesign

**Pattern**: `/services/[service-slug]`

### Case Study Pages (5 pages)

**Hub**: `/case-studies`

1. Cassidy HVAC — HVAC automation
2. HG Oil Holdings — Oil & Gas operations
3. Iron and Oak Podcast — Media infrastructure
4. Wife Supply Co. — E-commerce/logistics
5. [Unnamed 5th case study]

**Pattern**: `/case-studies/[slug]`

---

## Component Inventory

### Layout Components

| Component | File | Purpose | Status |
|-----------|------|---------|--------|
| `Header` | `components/layout/header.tsx` | Site-wide nav (scroll-aware, logo animation, CTAs) | ✓ |
| `Footer` | `components/layout/footer.tsx` | Dark Stripe-style footer (4-column grid) | ✓ |
| `Section` | `components/layout/section.tsx` | Reusable section wrapper (padding, bg color, full-width) | ✓ |

### UI Components

| Component | File | Purpose | Status |
|-----------|------|---------|--------|
| `Button` | `components/ui/button.tsx` | Variants: primary (pill, blue), secondary (outlined), ghost (text) | ✓ |
| `Card` | `components/ui/card.tsx` | Light/dark variants with borders, shadows, hover lift | ✓ |
| `Badge` | `components/ui/badge.tsx` | Inline tag/pill for labels, categories | ✓ |
| `Input` | `components/ui/input.tsx` | Form input with focus states, label, error support | ✓ |

### Home Page Components

| Component | File | Lines | Purpose |
|-----------|------|-------|---------|
| `Hero` | `components/home/hero.tsx` | 300 | Full-viewport dark section with animated radial gradient mesh |
| `ValueStrip` | `components/home/value-strip.tsx` | 89 | Logo bar + stats bar (GSAP stagger reveal) |
| `ServicePillars` | `components/home/service-pillars.tsx` | 1717 | 6-service expandable accordion grid with icons |
| `WhyUs` | `components/home/why-us.tsx` | 313 | 3-column value props grid (Boost Productivity, Reduce Costs, etc.) |
| `ProblemSection` | `components/home/problem-section.tsx` | 122 | Problem/solution narrative section |
| `Results` | `components/home/results.tsx` | 127 | ROI/results section with metrics |
| `CaseStudies` | `components/home/case-studies.tsx` | 413 | Case study cards carousel |
| `TechPartners` | `components/home/tech-partners.tsx` | 88 | Partner logos section |
| `CTA` | `components/home/cta-section.tsx` | 101 | Final CTA (gradient bg, GSAP entrance) |

### Page-Specific Components

| Component | File | Purpose |
|-----------|------|---------|
| `BioSection` | `components/about/bio-section.tsx` | Tyler bio grid |
| `ServiceDetail` | `components/services/service-detail.tsx` | Service expandable section |
| `ContactForm` | `components/contact/contact-form.tsx` | Contact form (POST to Zapier) |
| `ContactPageClient` | `components/contact/ContactPageClient.tsx` | Contact page client wrapper |
| `AeoPage` | `components/aeo/AeoPage.tsx` | Shared template for AEO pages (locations, industries, comparisons) |
| `AIPageLayout` | `components/ai-pages/AIPageLayout.tsx` | AI-optimized page layout |
| `StructuredData` | `components/ai-pages/StructuredData.tsx` | AI schema generation |
| `RoiCalculatorPageClient` | `components/roi/RoiCalculatorPageClient.tsx` | ROI calculator interaction |

---

## Data Layer & Content Architecture

### Data Files Overview

All content lives in `src/data/` as TypeScript objects. **Rule: Never hardcode text in JSX — always import from data files.**

### Core Data Files

| File | Records | Purpose |
|------|---------|---------|
| `site-config.ts` | 1 | Site metadata, branding, contact info, social links |
| `navigation.ts` | 15+ | Nav link structure |
| `services.ts` | 5 services + 6 value props + 8 automation benefits | Service definitions, benefits, value propositions |
| `case-studies.ts` | 4-5 | Case study/testimonial data |

### AEO Data Files

| Directory | Files | Purpose |
|-----------|-------|---------|
| `aeo/` | **100+ files** | Complete AEO (Answer Engine Optimization) payload |
| `aeo/types.ts` | 1 | TypeScript interfaces for AEO pages |
| `aeo/faq.ts` | 15+ FAQs | FAQ entries (used on /faq page + per-page FAQPage schema) |
| `aeo/pricing.ts` | 3-4 tiers | Pricing data |
| `aeo/press.ts` | 3-4 entries | Press kit data |
| `aeo/process.ts` | Process steps | Methodology/process steps |

### Service Detail Deep-Dives (11 files)

Each file in `aeo/services/` contains:
- Title, description, benefits, use cases
- FAQ entries specific to that service
- Related services, internal links
- Call-to-action copy

**Files**:
- `ai-agents.ts`
- `ai-customer-service.ts`
- `ai-invoicing.ts`
- `ai-search-optimization.ts`
- `api-integration.ts`
- `client-portal.ts`
- `conversion-optimization.ts`
- `custom-crm.ts`
- `local-seo.ts`
- `website-migration.ts`
- `website-redesign.ts`

### Case Studies (5 files)

**Files**: `aeo/case-studies/{cassidy-hvac, hg-oil-holdings, iron-and-oak-podcast, wife-supply-co, [5th].ts}`

Each contains:
- Client name, industry, challenge
- Solution description
- Results (metrics, ROI)
- Testimonial
- Images/assets

### Competitor Comparison Data (16 files)

**Direct Competitors** (4):
- `compare/adams-brown.ts`
- `compare/lost-highway-media.ts`
- `compare/pluto-sites.ts`
- `compare/akeratos.ts`

**Platform Comparisons** (12):
- `compare/wordpress-vs-custom.ts`
- `compare/webflow-vs-custom-coded.ts`
- `compare/bubble-vs-custom-coded.ts`
- `compare/wix-vs-custom.ts`
- `compare/squarespace-vs-custom.ts`
- `compare/shopify-vs-custom-ecommerce.ts`
- `compare/zapier-vs-custom-automation.ts`
- `compare/make-com-vs-custom-automation.ts`
- `compare/hubspot-vs-custom-crm.ts`
- `compare/salesforce-vs-custom-crm.ts`
- `compare/flutterflow-vs-custom-coded.ts`
- `compare/{csg-media, toucan-design, conceptualized-design, imagemakers, kc-web-designer}.ts`

Each contains:
- Competitor/platform name
- Feature comparison table
- Preisser Solutions advantages
- Price comparison
- Use case analysis

### Geographic Data (27 files)

**Files**: `aeo/locations/{hays-kansas, wichita-kansas, ...[all 27 Kansas cities]}.ts`

Each contains:
- City name, region, population
- Local market info
- Localized service description
- Local case study (if relevant)
- CTAs

### Industry Data (20 files)

**Files**: `aeo/industries/{hvac, oil-gas, healthcare, agriculture, ...[all 20 verticals]}.ts`

Each contains:
- Industry name, pain points
- Preisser Solutions solutions for vertical
- Industry-specific case study
- ROI metrics for vertical
- FAQ entries specific to vertical

### Data Structure Pattern (AeoPageData Interface)

All AEO pages follow this interface (from `aeo/types.ts`):

```typescript
interface AeoPageData {
  slug: string;                // Route path (e.g., "locations/hays-kansas")
  h1: string;                  // Main heading
  metaDescription: string;     // Meta description (160 chars)
  metaKeywords: string[];      // Keywords array
  excerpt: string;             // Meta excerpt
  schemaType: "Service" | "Article" | "WebPage" | "FAQPage";
  content: {
    intro: string;
    sections: Section[];        // Multiple content sections
    callToAction: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  relatedPages: {
    title: string;
    path: string;
  }[];
  image?: string;
  author?: string;
}
```

---

## Design System & Styling

### Colors (CSS Custom Properties)

**Core Brand Colors**:
```css
--hds-color-primary: #0D95E8;           /* Brand blue (CTAs, links) */
--hds-color-primary-hover: #0B7BC0;     /* Hover state */
--hds-color-dark: #0A1628;              /* Hero/nav (Stripe navy) */
--hds-color-dark-surface: #0F1D30;      /* Cards on dark */
--hds-color-light: #FAFAFA;             /* Content sections */
--hds-color-light-alt: #F5F5F5;         /* Alt sections */
```

**Text Colors**:
```css
--hds-color-text-primary: #1A1A1A;      /* Body text on light */
--hds-color-text-secondary: #4A5568;    /* Secondary text */
--hds-color-text-on-dark: #F0F0F0;      /* Text on dark */
--hds-color-text-muted: #9CA3AF;        /* Subtle/placeholder */
```

**Semantic Theme Variables** (switched by `data-theme` attribute):
```css
/* Light mode */
[data-theme="light"] {
  --theme-bg-primary: #FFFFFF;
  --theme-bg-secondary: #F6F9FC;
  --theme-text-primary: #0A1628;
  --theme-nav-bg: rgba(255, 255, 255, 0.95);
}

/* Dark mode (default) */
[data-theme="dark"] {
  --theme-bg-primary: #0A1628;
  --theme-bg-secondary: #0F1D30;
  --theme-text-primary: #F0F0F0;
  --theme-nav-bg: rgba(10, 22, 40, 0.95);
}
```

### Typography

**Font Stack**:
- **Display/Headlines**: Inter (bold, fluid `clamp()` sizing for responsive scaling)
- **Body**: Inter / system sans-serif (`system-ui, -apple-system, sans-serif` fallback)
- **Mono**: Fira Code (technical elements, code blocks)

**Type Scale** (CSS utility classes):
```css
.ps-eyebrow       /* Small caps, muted color */
.ps-h1            /* Largest headline (clamp(2.5rem, 8vw, 4rem)) */
.ps-h2            /* Large headline */
.ps-h3            /* Medium headline */
.ps-body          /* Body text (18px) */
.ps-body-sm       /* Small body */
.ps-label         /* Label text */
```

### Spacing & Layout

**Container**:
```css
--container-max: 1320px;
--container-padding: 24px (mobile), 40px (desktop);
--container-gutter: 16px (mobile), 24px (desktop);
```

**Sections**:
```css
--section-py-mobile: 48px;
--section-py-desktop: 80px;
```

**Border Radius**:
```css
--hds-space-core-radius-sm: 4px;
--hds-space-core-radius-md: 8px;
--hds-space-core-radius-pill: 50px;
--hds-space-core-radius-full: 9999px;
```

**Shadows**:
```css
--hds-shadow-xs: 0 1px 2px 0 rgba(50, 50, 93, 0.15);
--hds-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--hds-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--hds-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

### Tailwind v4 Integration

- **Output**: `src/styles/globals.css` (all base CSS, utilities, custom components)
- **Config**: Empty (no custom config needed for v4 with tokens)
- **Approach**: 95%+ utility-first (Tailwind classes), CSS variables for design tokens only
- **PostCSS**: `postcss.config.mjs` imports Tailwind v4 plugin

### Animation System

**GSAP + ScrollTrigger**:
- All plugins imported via `src/lib/gsap.ts` (one-time registration)
- Animations trigger on scroll via ScrollTrigger
- All animations respect `prefers-reduced-motion: reduce` preference

**Shared Animation Presets** (`src/lib/animations.ts`):
```typescript
fadeInUp(element, { delay?: number, duration?: number })       // Fade + Y translate up
staggerFadeInUp(elements[], staggerAmount?)                    // Stagger fade up
```

**Framer Motion**:
- Page transitions (AnimatePresence)
- Micro-interactions
- NO dynamic imports in static export (precompile all animations)

**CSS Animations**:
- Hero gradient mesh (pure CSS, no JS)
- Scroll indicator (CSS @keyframes)

### Hero Gradient Mesh

**Pure CSS Animated Radial Gradient**:
```css
background: 
  radial-gradient(circle at 20% 50%, rgba(13, 149, 232, 0.8) 0%, transparent 50%),
  radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.8) 0%, transparent 50%),
  radial-gradient(circle at 40% 0%, rgba(34, 197, 94, 0.8) 0%, transparent 50%),
  #0A1628;
animation: meshGradientShift 8s ease-in-out infinite;
```

Continuously cycles through color combinations (blue → purple → teal → green → repeat).

---

## Build, Deploy & CI/CD

### Build Process

**Command**: `npm run build`

1. TypeScript type-check
2. Next.js build (`next build`)
3. Static export to `/out/` directory
4. Generates 106 `.html` files (one per route)
5. Copies public assets (`/public/` → `/out/`)
6. Outputs sitemap.xml, robots.txt

**Build Time**: < 1 minute (clean)

**Output Structure**:
```
out/
├── index.html                   / (homepage)
├── about/index.html             /about
├── contact/index.html           /contact
├── services/index.html          /services
├── locations/index.html         /locations
├── locations/hays-kansas/index.html  /locations/hays-kansas
├── industries/index.html        /industries
├── industries/hvac/index.html    /industries/hvac
├── compare/index.html           /compare
├── compare/adams-brown/index.html /compare/adams-brown
├── [96 more pages]
├── images/                      (static assets)
├── fonts/                       (web fonts)
├── sitemap.xml                  (all URLs)
├── robots.txt                   (crawler rules)
└── _next/
    ├── static/                  (compiled CSS, JS)
    └── chunks/                  (compiled chunks)
```

### Next.js Configuration

**File**: `next.config.ts`

```typescript
{
  output: "export",                   // Static-only export
  basePath: prefix,                   // GitHub Pages prefix (if needed)
  assetPrefix: prefix,
  images: { unoptimized: true },      // Disable Image optimization (static export)
  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false
  }
}
```

### Tailwind v4 Configuration

**File**: `postcss.config.mjs`

```javascript
{
  plugins: {
    "@tailwindcss/postcss": {}
  }
}
```

**tailwind.config.ts**: Empty (v4 uses CSS token system, no custom config needed)

### Deployment: Cloudflare Pages

**Hosting**: Cloudflare Pages (static CDN)

**Configuration**: `wrangler.toml`
```toml
name = "preisser-solutions"              # Cosmetic only (old name)
compatibility_date = "2024-01-01"
pages_build_output_dir = "./out"         # Points to static build output
```

**Domain**: `preissersolutions.com` (primary), `preissersolutions.com` (301 redirect)

**Subdomain URL** (git-based): `preisser-solutions.pages.dev` (has `x-robots-tag: noindex`)

**Build Trigger**: GitHub Actions push to `main`

### CI/CD Pipeline

**File**: `.github/workflows/deploy.yml`

1. **Trigger**: Push to `main` branch
2. **Steps**:
   - Checkout code
   - Setup Node.js 20
   - Install dependencies (`npm ci`)
   - Build (`npm run build`)
   - Deploy to Cloudflare Pages (automatic via GitHub integration)

**Output**: `/out/` deployed as static site

### Scripts

**npm scripts** (from `package.json`):
```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Production build (next build → /out/)
npm run start        # Start Next.js server (unused, static only)
npm run lint         # ESLint check
npm run preview      # Serve /out/ locally (npx serve out)
npm run indexnow     # Ping Bing IndexNow (daily script)
```

**IndexNow Script** (`scripts/indexnow-ping.mjs`):
- Runs daily at 08:00 local time (launchd scheduled)
- Pings Bing IndexNow API with new/modified URLs
- Helps Bing discover recent content changes quickly

---

## Code Conventions & Patterns

### Naming Conventions

| Category | Pattern | Examples |
|----------|---------|----------|
| Component files | kebab-case | `hero-section.tsx`, `contact-form.tsx` |
| Component exports | PascalCase | `HeroSection`, `ContactForm` |
| Data files | kebab-case | `site-config.ts`, `case-studies.ts` |
| Hook files | kebab-case | `use-scroll-position.ts`, `use-reduced-motion.ts` |
| Style files | kebab-case | `globals.css` |
| Route directories | kebab-case | `/locations`, `/industries`, `/compare` |
| Slug values | kebab-case | `hays-kansas`, `hvac`, `adams-brown` |

### Import Patterns

**Always use path aliases**, never relative paths:
```typescript
// ✓ GOOD
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { gsap } from "@/lib/gsap";

// ✗ BAD
import { Button } from "../../../components/ui/button";
import { services } from "../../data/services";
```

**Path alias config** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Content Separation Rule

**CRITICAL**: All content lives in `src/data/` TypeScript files. Components import and render data — never hardcode text.

**Pattern**:
```typescript
// ✓ GOOD: Component imports from data
import { services } from "@/data/services";

export function ServiceGrid() {
  return (
    <div>
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  );
}

// ✗ BAD: Hardcoded text in component
export function ServiceGrid() {
  return (
    <div>
      <h2>Websites & Applications</h2>
      <p>Professional sites, custom apps...</p>
    </div>
  );
}
```

### Component Structure Pattern

**Client components** for interactions (forms, carousels, GSAP animations):
```typescript
"use client";  // Top of file

import { useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function InteractiveComponent() {
  useEffect(() => {
    // GSAP animation setup
  }, []);
  
  return (/* JSX */);
}
```

**Server components** for static content (default):
```typescript
// No "use client" — renders on build

import { services } from "@/data/services";

export default function ServicePage() {
  return (
    <div>
      {services.map((s) => <ServiceCard {...s} />)}
    </div>
  );
}
```

### GSAP Usage

**All GSAP imports through one file** (`src/lib/gsap.ts`):
```typescript
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function AnimatedComponent() {
  useEffect(() => {
    gsap.fromTo(/* ... */);
  }, []);
}
```

**Never**:
```typescript
import gsap from "gsap";  // ✗ Direct import
import ScrollTrigger from "gsap/ScrollTrigger";  // ✗ Direct plugin import
```

### GSAP ScrollTrigger Cleanup

Always cleanup on unmount to prevent memory leaks:
```typescript
useEffect(() => {
  const triggers = ScrollTrigger.getAll();
  return () => {
    triggers.forEach(t => t.kill());
  };
}, []);
```

### Metadata Pattern

Every `.tsx` page file must export metadata:
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | Preisser Solutions",
  description: "Page description (160 chars).",
  openGraph: {
    url: "https://preissersolutions.com/page-slug",
    title: "Page Title",
    description: "...",
    images: [{ url: "/og-image.jpg" }],
  },
  alternates: {
    canonical: "https://preissersolutions.com/page-slug",
  },
};

export default function Page() {
  return (/* JSX */);
}
```

### Reduced Motion Compliance

All animations must check `prefers-reduced-motion`:
```typescript
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AnimatedSection() {
  const prefersReduced = useReducedMotion();
  
  useEffect(() => {
    if (prefersReduced) {
      gsap.set(element, { opacity: 1 });  // No animation
      return;
    }
    
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1 });
  }, [prefersReduced]);
}
```

### Responsive Design

**Mobile-first approach**: Default styles for mobile, enhance with `md:` and `lg:` utilities.
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Single column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### TypeScript

- **Strict mode enabled** (tsconfig.json)
- **Colocate types** with data files or component files
- **No separate `types/` directory** unless shared across 3+ files
- **Interface over type** for object shapes

---

## Critical Gotchas & Known Issues

### 1. Static Export Limitations

**Gotcha**: No API routes, no server-side rendering, no middleware.

**Impact**:
- Cannot fetch data at runtime
- Cannot use Next.js 15+ Server Components with dynamic data
- All pages pre-built at deploy time
- Contact form must POST to external webhook (Zapier)

**Solution**: Keep all data in TypeScript files, use Zapier/Typeform/external service for form handling.

---

### 2. GSAP + ScrollTrigger Memory Leaks

**Gotcha**: ScrollTrigger animations that don't cleanup will leak timelines on component unmount.

**Impact**: Rapid navigation or re-renders can create hundreds of orphaned timelines.

**Solution**: Always cleanup in `useEffect` return:
```typescript
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(/* ... */);
  
  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);
```

---

### 3. Framer Motion + Static Export

**Gotcha**: Dynamic imports don't work with Framer Motion in static export.

**Impact**: `'use client'` + `dynamic()` import combo breaks in production.

**Solution**: Precompile all animation definitions at build time, no dynamic imports.

---

### 4. Image Optimization Disabled

**Gotcha**: `next/image` doesn't work in static export (`output: 'export'`).

**Impact**: Must use plain `<img>` tags or import static assets.

**Solution**: Use `<img src="/images/file.jpg" />` or import:
```typescript
import myImage from "@/public/images/file.jpg";
<img src={myImage.src} alt="..." />
```

---

### 5. Incremental Static Regeneration (ISR) Not Available

**Gotcha**: ISR (`revalidate` option) doesn't work in static export.

**Impact**: All 106 pages rebuild on every deploy — no partial rebuilds.

**Solution**: Full rebuild is fast (< 1 min), so acceptable.

---

### 6. Font Loading with clamp()

**Gotcha**: `next/font/google` loads fonts correctly, but fluid `clamp()` sizing can race with font load.

**Impact**: Hero text may flash with fallback font before Inter loads, causing layout shift.

**Solution**: `display: "swap"` in Inter config (already done) + use `font-display: swap` in CSS.

---

### 7. Dynamic Route Slugs Must Be Pre-Defined

**Gotcha**: AEO pages use `[slug]` dynamic routes, but Next.js static export requires all slugs known at build time.

**Impact**: Cannot generate pages for user-submitted slugs.

**Solution**: All slug values (locations, industries, comparisons) hard-coded in `src/data/aeo/*/` files before build.

---

### 8. Theme Flash Prevention

**Gotcha**: Dark theme as default, but light mode preference should load instantly without flash.

**Impact**: Synchronous script in `<head>` must run before First Paint to prevent theme flip.

**Solution**: Inline script in layout.tsx `<head>` reads `sessionStorage` or `prefers-color-scheme`:
```typescript
const themeInitScript = `(function(){
  var stored = sessionStorage.getItem('ps-theme');
  var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
})();`;
```

---

### 9. Duplicate FAQPage Structured Data Error

**Gotcha**: Global FAQPage schema in layout.tsx + per-page FAQPage in AeoPage component = duplicate FAQPage blocks.

**Impact**: Google Search Console flags as critical structured-data error, disqualifies pages from FAQ rich results.

**Solution** (2026-05-04 fix): Removed global FAQPage from layout.tsx. Only per-page AeoPage emits FAQPage if `schemaType === "FAQPage"`.

---

### 10. Robots.txt Cloudflare Override

**Gotcha**: Cloudflare dashboard setting "Instruct AI bot traffic with robots.txt" prepends its own Disallow rules, overriding explicit Allow rules.

**Impact**: Even with `Allow: /about` in robots.txt, Cloudflare blocks ClaudeBot, GPTBot, Amazonbot, etc.

**Solution** (NEEDS TYLER): Disable in Cloudflare dashboard → Security → Settings → "Instruct AI bot traffic with robots.txt" for both preissersolutions.com and preissersolutions.com.

---

### 11. Package.json Name vs. Domain Mismatch

**Gotcha**: `package.json` says `"name": "preisser-solutions"` but folder is "Preisser Solutions" and old `wrangler.toml` says `name = "preisser-solutions"`.

**Impact**: Cosmetic only. Git repo, npm scripts, and builds all work fine. No production effect.

**Status**: Brand audit residual. Not a blocker.

---

### 12. Social Links Point to Non-Existent Pages

**Gotcha**: `site-config.ts` social links point to LinkedIn `/company/preissersolutions` and Facebook `/preissersolutions`, but these pages don't exist yet.

**Impact**: JSON-LD `sameAs` links point to 404s. LinkedIn/Facebook pages must be created separately.

**Status** (NEEDS TYLER): Create LinkedIn company page, rename/create Facebook page, claim Twitter @preissersolutions handle.

---

### 13. No IV Rank or Options Flow Data

**Gotcha**: Not applicable to this site, but if AEO strategy expands into financial content, will need real-time IV data (not cached).

**Solution**: Consider serverless function on Cloudflare Workers if needed.

---

## Brand Implementation

### Brand Name & Legal Entity

**Official Name**: Preisser Solutions (formerly Preisser Solutions)  
**Rebrand Date**: May 2, 2026  
**Domain**: preissersolutions.com (primary), preissersolutions.com (301 redirect)  
**Legal Name** (JSON-LD): "Preisser Solutions"  
**Alternate Names** (JSON-LD): ["Preisser Solutionsnology", "Preisser Solutions"]

### Brand Files to Update

**Residual Brand Audit Items** (May 2026):
| Item | Current | Should Be | Status | Blocker |
|------|---------|-----------|--------|---------|
| `package.json` name | "preisser-solutions" | Keep as-is (npm pkg) | ✓ Fine | None |
| `wrangler.toml` name | "preisser-solutions" | Rename to "preisser-solutions" (Cloudflare Pages rename) | ⚠️ Cosmetic | NEEDS TYLER (account-gated) |
| `site-config.ts` social LinkedIn | `/company/preissersolutions` | `/company/preissersolutions` | ✓ Planned | CREATE PAGE (NEEDS TYLER) |
| `site-config.ts` social Facebook | `/preissersolutions` | `/preissersolutions` | ✓ Link correct | RENAME/CREATE PAGE (NEEDS TYLER) |
| `site-config.ts` social Twitter | `/preissersolutions` | `/preissersolutions` | ✓ Link correct | CLAIM HANDLE (NEEDS TYLER) |
| layout.tsx `alternateName` | "Preisser Solutions" (if present) | Removed 2026-05-04 | ✓ DONE | None |
| Public pages metadata | All say "Preisser Solutions" | ✓ Consistent | ✓ DONE | None |

### Logo & Favicon

**Logo File**: `/public/images/ps-logo.png` (1024x1024)

**Favicon Variants**:
- `/public/favicon.ico`
- `/public/favicon-16x16.png`
- `/public/favicon-32x32.png`
- `/public/favicon-96x96.png`
- `/public/apple-touch-icon.png` (180x180)
- `/public/android-chrome-192x192.png`
- `/public/android-chrome-512x512.png`
- `/public/safari-pinned-tab.svg`

**Manifest**: `/public/site.webmanifest` (PWA manifest)

### Brand Voice & Tone

**Tone**: Professional, confident, direct, results-oriented. No fluff.

**Value Prop**: "You show us the problem. We see the solution."

**Differentiator**: Custom software, AI automation, and web development for small/mid-sized Kansas businesses — NOT templates, NOT no-code platforms.

**Key Messaging**:
- Personalized service from Tyler Preisser
- Measurable ROI and automation benefits
- Local Hays, Kansas-based
- 22+ client projects delivered
- E-E-A-T: Expertise (FHSU alum, 10+ years coding), Experience (22+ projects), Authority (published case studies, testimonials), Trustworthiness (contact info, transparent pricing)

---

## SEO & AEO (Answer Engine Optimization)

### Overall SEO Strategy

**Goal**: Dominate both Google Search and AI Answer Engines (ChatGPT, Perplexity, Claude, Google Gemini, Bing AI) for:
- Primary: "Custom software Kansas", "AI automation consultant", "web development Hays"
- Geo: "Web developer [city]" for 27 Kansas cities
- Vertical: "HVAC automation", "Oil & gas software", etc. for 20 industries
- Comparison: "[Platform] vs. custom" for 16 platform/competitor comparisons

### JSON-LD Schema Strategy

**Global Schemas** (emitted on every page from layout.tsx):
1. **Organization** (with `@id`)
   - Name: "Preisser Solutions"
   - Logo, contact, address, geo
   - `sameAs`: LinkedIn, Facebook, X, GitHub
   - `knowsAbout`: 15 service categories
   - `hasOfferCatalog`: 5 service offerings with prices

2. **Person** (Tyler Preisser)
   - Disambiguating description (vs. other Tyler Preissers)
   - Works for Organization
   - Alumni of Fort Hays State University

3. **WebSite**
   - Potential SearchAction
   - Publisher reference

4. **WebPage** (homepage)
   - BreadcrumbList
   - About/Author/Publisher references

5. **LocalBusiness**
   - Service area (Kansas, Great Plains)
   - Opening hours
   - Same as Organization

**Per-Page Schemas** (emitted via AeoPage component):
- **Service pages** (`/ai-agents`, `/custom-websites`, etc.)
  - `@type: "Service"`
  - `provider` → Organization
  - `serviceType`, `areaServed`, `audience`

- **Article pages** (`/press`, `/case-studies`)
  - `@type: "Article"`
  - `headline`, `author`, `publisher`, `datePublished`

- **FAQ pages** (`/faq`, per-vertical FAQs)
  - `@type: "FAQPage"`
  - `mainEntity`: array of Question/Answer pairs

### Metadata Strategy

**Title Template**: `%s | Preisser Solutions` (Next.js metadata config)

**Meta Description**: 155–160 characters, keyword-rich, includes primary service or geo.

**Open Graph**: 
- `og:title`, `og:description`, `og:image` (1200x630)
- `og:url`: Canonical URL for each page
- `og:type`: "website" (default) or "article" (case studies)

**Twitter Card**: `summary_large_image` with image and description

**Canonical**: Set explicitly on every page to `https://preissersolutions.com/[path]`

**Robots**: 
- Index: true
- Follow: true
- Google: `max-image-preview: large`, `max-snippet: -1` (unlimited)

### AEO Content Strategy

**107 Answer-Optimized Pages**:
1. **Service Detail Pages** (11) — "How to [service]?", "Best [service] for [industry]"
2. **Geo Pages** (27) — "[Service] in [city]", "[Industry] in [city]"
3. **Industry Pages** (20) — "[Service] for [industry]", "Why [industry] needs [service]"
4. **Comparison Pages** (16) — "[Platform] vs. custom", "[Competitor] vs. Preisser Solutions"
5. **Case Studies** (5) — Real-world ROI, testimonials, before/after
6. **Core Pages** (19) — Brand, process, FAQ, pricing
7. **FAQ Page** (1) — General Q&A
8. **Press Kit** (1) — Authority signals, media coverage

**Content Principles for AEO**:
- **Answer the question first** — Put the direct answer in the first 50 words
- **Answer depth** — 2,000–4,000 words per page (AEO engines favor comprehensive content)
- **Structured data** — FAQPage schema with Q&A pairs for every page
- **Clear expertise** — Author/provider clearly identified (Tyler Preisser, Preisser Solutions)
- **No clickbait** — Titles match content, no hidden info
- **E-E-A-T signals** — Case studies, testimonials, credentials, recent updates
- **Internal linking** — Every page links to related pages (creates knowledge graph)
- **Unique angle** — Comparison pages show Preisser Solutions advantage; geo pages localize content

### Sitemap & Indexing

**Sitemap Location**: `/public/sitemap.xml` (auto-generated, includes all 106 URLs)

**Robots.txt Rules** (from `/public/robots.txt`):
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /.next

Sitemap: https://preissersolutions.com/sitemap.xml
```

**Note**: Cloudflare may override with bot-specific rules (see Gotcha #10).

### Backlink Strategy

Currently: **Zero external backlinks** (brand new domain, no press coverage yet).

**Phase 2 Plan**:
1. Press releases to Kansas media (Hays Post, KCBJ, Kansas Reflector)
2. Podcast guesting (Sweaty Startup, Home Service Expert, etc.)
3. Reddit/community participation (r/Kansas, r/smallbusiness, r/webdev)
4. LinkedIn authority posts
5. Industry directory submissions (Clutch, GoodFirms for B2B software)

### Mention Tracking

**Monitoring System** (live since 2026-05-03):
- Tracks mentions of "Preisser Solutions", "Tyler Preisser", client names, vertical keywords
- Checks 10+ search engines (Google, Bing, DuckDuckGo, etc.)
- Flags new citations, monitors competitor movement
- Baseline: 47 mentions on day 1 (mostly internal/GitHub)
- Target: 500+ mentions by day 90

---

## Key Files Reference

### Critical Files (Read These First)

| File | Purpose | Lines | Update Frequency |
|------|---------|-------|------------------|
| `CLAUDE.md` | Master system prompt | 231 | Every session |
| `.context/STATE.md` | Master state, blockers, phase status | 500+ | Weekly |
| `.context/CHANGELOG.md` | Dated log of all changes | 1000+ | After every change |
| `docs/design-system.md` | Visual bible (colors, tokens, typography) | 445 | When design changes |
| `docs/status.md` | Session log, current state | 168 | Every session |
| `docs/decisions.md` | Architectural decisions | 125 | When decisions made |

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, build scripts |
| `next.config.ts` | Next.js config (output: 'export') |
| `tsconfig.json` | TypeScript config |
| `tailwind.config.ts` | Tailwind config (empty for v4) |
| `postcss.config.mjs` | PostCSS pipeline |
| `wrangler.toml` | Cloudflare Pages config |
| `.github/workflows/deploy.yml` | CI/CD pipeline |

### Core Source Files

| File | Purpose | Lines |
|------|---------|-------|
| `src/app/layout.tsx` | Root layout, metadata, JSON-LD | 580 |
| `src/app/page.tsx` | Homepage route handler | 58 |
| `src/styles/globals.css` | All styling (tokens, utilities) | 6496 |
| `src/data/site-config.ts` | Brand metadata | 26 |
| `src/lib/gsap.ts` | GSAP plugin registry | 11 |
| `src/lib/animations.ts` | Shared animation presets | 58 |
| `src/components/layout/header.tsx` | Site navigation | TBD |
| `src/components/layout/footer.tsx` | Site footer | TBD |
| `src/components/aeo/AeoPage.tsx` | AEO page template | 200+ |

### Page Files (Examples)

| Route | File | Type | Lines |
|-------|------|------|-------|
| `/` | `src/app/page.tsx` | Core | 58 |
| `/services` | `src/app/services/page.tsx` | Core | 104 |
| `/locations/hays-kansas` | `src/app/locations/[slug]/page.tsx` | Dynamic | ~50 |
| `/industries/hvac` | `src/app/industries/[slug]/page.tsx` | Dynamic | ~50 |
| `/compare/adams-brown` | `src/app/compare/[slug]/page.tsx` | Dynamic | ~50 |

### Data Files (Examples)

| File | Records | Lines | Purpose |
|------|---------|-------|---------|
| `src/data/site-config.ts` | 1 | 26 | Brand metadata |
| `src/data/services.ts` | 5 services + benefits | 211 | Service definitions |
| `src/data/aeo/locations/hays-kansas.ts` | 1 | ~80 | Hays location data |
| `src/data/aeo/industries/hvac.ts` | 1 | ~100 | HVAC industry data |
| `src/data/aeo/compare/adams-brown.ts` | 1 | ~120 | Competitor comparison |

---

## Appendix: Architecture Decisions

See `docs/decisions.md` for the complete decision log. Key decisions:

1. **Static Export** (Next.js 15 `output: 'export'`) — Enables fast, cheap Cloudflare Pages deployment with zero server costs
2. **Centralized Data** (all content in `/src/data/`) — Enables non-engineers to edit copy without touching code
3. **One GSAP Registry** (`src/lib/gsap.ts`) — Prevents duplicate plugin registration, memory leaks
4. **Design Tokens via CSS Variables** — Enables theme switching without re-rendering
5. **AEO via Templates** — 70+ pages generated from 3 reusable templates + data files = minimal code duplication

---

## Quick Reference Commands

```bash
# Local development
npm run dev              # Start dev server (localhost:3000)

# Production
npm run build            # Build static export to /out/
npm run preview          # Preview build locally

# Maintenance
npm run lint             # ESLint check
npm run indexnow         # Ping Bing IndexNow

# Deployment (automatic via GitHub Actions)
git push origin main     # Triggers CI/CD → Cloudflare Pages
```

---

**End of Codebase Map. Total: 106 pages, ~31,000 LOC (source), ~6500 LOC (CSS), deployed to preissersolutions.com.**
