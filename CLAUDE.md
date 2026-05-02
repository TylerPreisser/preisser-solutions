# Preisser Technology — Master System Prompt

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

Premium business automation consultancy website for **preissertech.com**. Stripe-inspired design with cinematic personality. Built for static export to Cloudflare Pages.

**Owner**: Tyler Preisser (Hays, KS)
**Contact**: sales@preissertech.com | +1-620-352-3296
**Domain**: preissertech.com
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
| CI/CD | GitHub Actions | `.github/workflows/deploy.yml` |

---

## Architecture

### Pages
| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Home — hero, value props, how it works, services overview, social proof, personal commitment, CTA | Scaffolded |
| `/services` | Detailed service breakdowns | Scaffolded |
| `/about` | Tyler's story, mission, values | Scaffolded |
| `/contact` | Contact form, booking | Scaffolded |

### File Map

```
Preisser Technology/
├── CLAUDE.md                              ← THIS FILE — master system prompt
├── docs/
│   ├── status.md                          ← Current state, session log, blockers
│   ├── decisions.md                       ← Architectural decisions with rationale
│   ├── plans/
│   │   └── current-plan.md               ← Active implementation plan (checked off as completed)
│   └── superpowers/specs/
│       └── 2026-04-02-...design.md       ← Original design spec (reference, don't modify)
├── archive/                               ← Old site snapshot (reference only, don't modify)
├── public/
│   ├── images/                            ← Optimized images
│   └── fonts/                             ← Self-hosted fonts (if any)
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
│   │   │   └── section.tsx                ← Reusable section wrapper
│   │   ├── ui/
│   │   │   ├── button.tsx                 ← Button variants (primary/secondary/ghost)
│   │   │   ├── card.tsx                   ← Elevated card
│   │   │   ├── badge.tsx                  ← Tags/labels
│   │   │   └── input.tsx                  ← Form input
│   │   ├── home/
│   │   │   ├── hero.tsx                   ← Home hero (GSAP SplitText, gradient mesh)
│   │   │   ├── value-props.tsx            ← Value proposition cards
│   │   │   ├── how-it-works.tsx           ← Process visualization
│   │   │   ├── services-overview.tsx      ← Services card grid
│   │   │   ├── social-proof.tsx           ← Testimonials/metrics
│   │   │   ├── personal-commitment.tsx    ← Tyler's personal section
│   │   │   └── cta-section.tsx            ← Call-to-action
│   │   ├── services/
│   │   │   └── service-detail.tsx         ← Individual service section
│   │   ├── about/
│   │   │   └── bio-section.tsx            ← Tyler bio component
│   │   └── contact/
│   │       └── contact-form.tsx           ← Contact form
│   ├── data/
│   │   ├── site-config.ts                 ← Site metadata, URLs, branding
│   │   ├── navigation.ts                  ← Nav links
│   │   ├── services.ts                    ← Service + value prop definitions
│   │   └── case-studies.ts                ← Case study/testimonial data
│   ├── lib/
│   │   ├── gsap.ts                        ← GSAP plugin registration (ONE place)
│   │   ├── animations.ts                  ← Shared animation presets
│   │   └── utils.ts                       ← Utility functions (cn, etc.)
│   ├── hooks/
│   │   ├── use-scroll-position.ts         ← Scroll tracking for nav
│   │   ├── use-media-query.ts             ← Responsive hooks
│   │   └── use-reduced-motion.ts          ← Motion preference detection
│   └── styles/
│       └── globals.css                    ← Tailwind imports, CSS tokens, base styles
├── next.config.ts                         ← Static export config
├── tsconfig.json                          ← TypeScript config
├── postcss.config.mjs                     ← Tailwind v4 PostCSS
├── package.json                           ← Dependencies
├── wrangler.toml                          ← Cloudflare Pages config
├── .gitignore
└── .github/workflows/deploy.yml           ← CI/CD pipeline
```

> **If you add, remove, or rename a file — update this map.**

### Content Separation
All content lives in `src/data/` files. Components import data — **never hardcode strings in JSX**. This makes content editable without touching component logic.

### Static Export
- `output: 'export'` in next.config.ts
- No API routes, no middleware, no server-side features
- Build outputs to `/out` → deploy to Cloudflare Pages

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
