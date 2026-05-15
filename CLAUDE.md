# Preisser Solutions — Master System Prompt

> **This file is the single source of truth for every agent that touches this project.**
> Read it FIRST. Update it LAST. Every session.

---

## Agent Protocol

### On Session Start (MANDATORY)
1. Read this entire file
2. Read `docs/design-system.md` for ALL visual design decisions (colors, typography, spacing, components, animations)
3. Read `docs/status.md` for current project state
4. Read `docs/plans/current-plan.md` if one exists
5. Read `docs/decisions.md` for past architectural decisions
6. Understand where the project is before touching anything

### On Session End (MANDATORY)
1. Update `docs/status.md` with what you did, what changed, what broke, what's next
2. Update `docs/plans/current-plan.md` — check off completed items, add new ones discovered
3. If you made an architectural decision, append it to `docs/decisions.md` with rationale
4. If you added/removed/renamed files, update the File Map section below
5. If anything in this file is now wrong, fix it

### Rules for Updating These Docs
- **Be specific** — "fixed hero" is useless. "Fixed hero GSAP timeline — SplitText was firing before fonts loaded, added font-ready check" is useful.
- **Include dates** — every entry in status.md and decisions.md gets a date
- **Never delete history** — append to logs, don't overwrite. Archive old entries if they get long.
- **Flag blockers** — if something is blocked, say what it's waiting on and who/what can unblock it

---

## What This Is

Premium business automation consultancy website for **preissersolutions.com**. Stripe-inspired design with cinematic personality. Built for static export to Cloudflare Pages.

**Owner**: Tyler Preisser (Hays, KS)
**Contact**: sales@preissersolutions.com | +1-620-352-3296
**Domain**: preissersolutions.com
**Repo**: GitHub → Cloudflare Pages

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 15+ (App Router) | Static export only |
| Language | TypeScript + React 19 | Strict mode |
| Styling | Tailwind v4 | Utility-first, CSS custom properties for tokens |
| Animation (scroll) | GSAP + ScrollTrigger | All imports through `src/lib/gsap.ts` |
| Animation (transitions) | Framer Motion | Page transitions, micro-interactions |
| Deploy | Cloudflare Pages | Static `/out` directory |
| CI | GitHub Actions | `.github/workflows/build.yml` runs build checks only |

---

## Architecture

### Pages
| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Home — Hays visibility audit, services, proof standards, CTA | Live |
| `/services` | Local marketing service breakdowns | Live |
| `/about` | Preisser Solutions company page | Live |
| `/contact` | Hays Visibility Audit contact form | Live |

### File Map

```
Preisser Solutions/
├── CLAUDE.md                              ← THIS FILE — master system prompt
├── docs/
│   ├── status.md                          ← Current state, session log, blockers
│   ├── decisions.md                       ← Architectural decisions with rationale
│   ├── plans/
│   │   └── current-plan.md               ← Active implementation plan (checked off as completed)
│   ├── proposal-system/                   ← Proposal generation instructions/reference
│   └── superpowers/specs/
│       └── 2026-04-02-...design.md       ← Original design spec (reference, don't modify)
├── .context/                              ← Strategic/AEO/rebrand operating notes
├── archive/                               ← Old site snapshot and raw/reference assets
├── public/
│   ├── images/                            ← Optimized images
│   ├── .well-known/                       ← Agent discovery, MCP, OAuth, and policy files
│   ├── docs/                              ← Public agent API docs
│   ├── llms.txt                           ← AI-agent summary context
│   └── llms-full.txt                      ← Full AI-agent content corpus
├── src/
│   ├── app/
│   │   ├── layout.tsx                     ← Root layout (nav, footer, fonts, metadata)
│   │   ├── page.tsx                       ← Home page
│   │   ├── services/page.tsx              ← Services page
│   │   ├── about/page.tsx                 ← About page
│   │   └── contact/page.tsx               ← Contact page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx                 ← Fixed nav (scroll detection)
│   │   │   ├── footer.tsx                 ← Site footer
│   │   ├── home/
│   │   │   ├── hero.tsx                   ← Canvas wave hero + primary CTA
│   │   │   ├── value-strip.tsx            ← Four-part value strip
│   │   │   ├── service-pillars.tsx        ← Main bento services/modal system
│   │   │   ├── tech-partners.tsx          ← Tool/stack ticker
│   │   │   ├── marcommand-callout.tsx     ← MarCommand feature section
│   │   │   ├── marcommand-dashboard.tsx   ← MarCommand dashboard mockup
│   │   │   ├── why-us.tsx                 ← Differentiator cards
│   │   │   ├── case-studies.tsx           ← Project/case-study cards
│   │   │   └── cta-section.tsx            ← Call-to-action
│   │   ├── aeo/
│   │   │   └── AeoPage.tsx                ← Shared AEO page renderer/schema
│   │   ├── roi/
│   │   │   └── RoiCalculatorPageClient.tsx ← Interactive ROI calculator
│   │   └── contact/
│   │       └── ContactPageClient.tsx      ← Contact page and Zapier-backed form
│   ├── data/
│   │   ├── site-config.ts                 ← Site metadata, URLs, branding
│   │   ├── navigation.ts                  ← Nav links
│   │   ├── services.ts                    ← Service definitions and legacy automation-support data
│   │   └── aeo/                           ← Page data for services, locations, industries, comparisons
│   ├── lib/
│   │   ├── gsap.ts                        ← GSAP plugin registration (ONE place)
│   │   ├── breadcrumbs.ts                 ← Breadcrumb JSON-LD helpers
│   │   └── utils.ts                       ← Utility functions (cn, etc.)
│   └── styles/
│       └── globals.css                    ← Tailwind imports, CSS tokens, base styles
├── functions/                             ← Cloudflare Pages Functions/middleware
├── workers/                               ← Standalone legacy redirect worker
├── scripts/                               ← Postbuild sitemap/indexing/404 scripts
├── next.config.ts                         ← Static export config
├── tsconfig.json                          ← TypeScript config
├── postcss.config.mjs                     ← Tailwind v4 PostCSS
├── package.json                           ← Dependencies
├── wrangler.toml                          ← Cloudflare Pages config
├── .gitignore
└── .github/workflows/build.yml            ← Build-only CI
```

> **If you add, remove, or rename a file — update this map.**

### Content Separation
All content lives in `src/data/` files. Components import data — **never hardcode strings in JSX**. This makes content editable without touching component logic.

### Static Export
- `output: 'export'` in next.config.ts
- Build outputs to `/out` → deploy to Cloudflare Pages
- Cloudflare Pages Functions handle middleware, redirects, MCP, and `/api/lead`
- GitHub Actions is build-only CI; production deploy is Cloudflare Pages / Wrangler

---

## Design System

> **Full design system lives in `docs/design-system.md`** — colors, typography, spacing, shadows, components, animations, everything.
> That file is the visual bible. Below is the quick reference.

### Colors (Quick Ref)
| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #0D95E8 | Brand blue, CTAs, links |
| `primary-hover` | #0B7BC0 | Hover states |
| `dark` | #0A1628 | Hero/nav/dark sections (Stripe navy) |
| `dark-surface` | #0F1D30 | Cards on dark backgrounds |
| `light` | #FAFAFA | Content section backgrounds |
| `light-alt` | #F5F5F5 | Alternating sections |
| `text-primary` | #1A1A1A | Body text on light |
| `text-secondary` | #4A5568 | Secondary text |
| `text-on-dark` | #F0F0F0 | Text on dark backgrounds |
| `text-muted` | #9CA3AF | Subtle/placeholder text |

**Pattern**: Dark nav/hero + light content sections (Stripe style). Gradient accents (blue → purple/teal) for standout elements.

### Typography
- **Display/Headlines**: Inter (bold, fluid clamp() sizing)
- **Body**: Inter / system sans-serif
- **Mono**: Fira Code (technical elements)

### Animation Rules
1. All GSAP imports through `src/lib/gsap.ts` (one-time plugin registration)
2. Always check `prefers-reduced-motion: reduce` before animating
3. No animation transforms on mobile < 768px (fade-in only)
4. Scroll reveals: fade-up + translateY via ScrollTrigger
5. Page transitions: Framer Motion AnimatePresence
6. **NO**: custom cursor, particle effects, 3D/WebGL, parallax

---

## Code Conventions

- **Files**: kebab-case (`hero-section.tsx`)
- **Components**: PascalCase (`HeroSection`)
- **Imports**: `@/*` path aliases (never relative)
- **Styling**: 95%+ Tailwind utilities, CSS variables for design tokens only
- **Types**: Colocate with data files or component files. No separate `types/` dir unless shared across 3+ files.
- **Content**: Always in `src/data/`, never hardcoded in JSX

---

## Commands

```bash
npm run dev          # Local dev server
npm run build        # Production build (static export to /out)
npm run lint         # ESLint
npm run preview      # Preview static build locally
```

---

## Critical Rules

1. **Content in data files** — never hardcode text in components
2. **Static export only** — no API routes, no server components that fetch
3. **GSAP through lib/** — never import GSAP plugins directly in components
4. **Accessibility first** — semantic HTML, ARIA, reduced-motion checks
5. **Mobile-first** — design for mobile, enhance for desktop
6. **Deploy `/out`** — not `/.next`
7. **Update docs every session** — status.md, current-plan.md, decisions.md, this file

---

## Reference Documents

| Doc | Purpose | Update Frequency |
|-----|---------|-----------------|
| `docs/design-system.md` | **Visual bible** — all colors, typography, spacing, shadows, components, animations | When design changes |
| `docs/status.md` | Current state, session log, blockers, next steps | Every session |
| `docs/plans/current-plan.md` | Active implementation plan with checkboxes | Every session |
| `docs/decisions.md` | Architectural decisions with rationale | When decisions are made |
| `docs/superpowers/specs/2026-04-02-*-design.md` | Original design spec | Never (reference only) |
| `archive/` | Old site snapshot | Never (reference only) |
| `~/Desktop/site-research/` | Raw Stripe + Tyler site analysis (research source files) | Never (reference only) |
