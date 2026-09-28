# Preisser Solutions — Design System (Stripe x Tyler Fusion)

> **This is the single source of truth for all visual design decisions.**
> Every agent building UI reads this file. If you change a design pattern, update this file.

---

## Design DNA

**Stripe** provides: Clean precision, generous whitespace, dark navy hero, pill buttons, card hover lifts, blue-tinted shadows, subtle scroll reveals, professional typography, alternating dark/light sections.

**tylerpreisser.com** provides: Cinematic personality, warm accent colors, GSAP scroll animations with stagger, bold display fonts, gradient blends, glowing hover states, spark/particle energy, dark-mode-first aesthetic.

**Preisser Solutions blend**: Stripe's structural precision and enterprise trust, infused with Tyler's warm personality and animated energy. Professional but not sterile. Polished but not generic.

---

## 1. Color Palette

### Core Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1590FF` | Brand blue — CTAs, links, accents. Sampled from the logo; was `#0D95E8`. Do not "correct" it back |
| `--color-primary-hover` | `#0D76D6` | Button/link hover. Was documented here as `#0B7BC0`, which has never been the token's value |
| `--color-primary-strong` | `#0C6FC9` | 5.08:1 with white — small text / surfaces under white text |
| `--color-primary-strong-hover` | `#0B68BE` | 5.62:1 with white — the darkest declared blue; small text on tinted light surfaces |
| `--color-primary-glow` | `rgba(21, 144, 255, 0.2)` | Button hover shadow |
| `--color-dark` | `#0A1628` | Hero/nav/dark sections (Stripe's navy influence) |
| `--color-dark-surface` | `#0F1D30` | Cards on dark backgrounds |
| `--color-light` | `#F6F9FC` | Light section backgrounds (Stripe's off-white) |
| `--color-white` | `#FFFFFF` | Card backgrounds, light sections |

### Text Colors

| Token | Hex | Context |
|-------|-----|---------|
| `--color-text-dark` | `#0A1628` | Headings on light backgrounds |
| `--color-text-body` | `#425466` | Body text on light (Stripe's slate gray) |

### Accent & State Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-danger` | `#DF1B41` | Error states |
| `--color-border-light` | `#E6EBF1` | Borders on light backgrounds |
| `--color-border-dark` | `rgba(255, 255, 255, 0.08)` | Borders on dark backgrounds |

### Gradient Patterns

```css
/* CTA button gradient */
background: linear-gradient(135deg, #0D95E8, #0B7BC0);

/* Card accent strip (top border) */
background: linear-gradient(135deg, #0D95E8 0%, #80E9FF 100%);
height: 4px;

/* Radial glow behind hero content */
background: radial-gradient(ellipse at center, rgba(13, 149, 232, 0.15) 0%, transparent 70%);

/* Section transition fade */
background: linear-gradient(180deg, transparent 0%, #F6F9FC 100%);

/* Dark section subtle gradient */
background: linear-gradient(180deg, #0A1628 0%, #0F1D30 50%, #0A1628 100%);
```

### Background Treatment Pattern

```
Hero:           Dark (#0A1628) with animated gradient mesh canvas
Section 1:      Light (#F6F9FC) — value props
Section 2:      White (#FFFFFF) — differentiator
Section 3:      Light (#F6F9FC) — services
Section 4:      Dark (#0A1628) — case studies
Section 5:      White (#FFFFFF) — personal commitment
Footer:         Dark (#0A1628) — CTA + footer
```

---

## 2. Typography

### Font Stack

```css
/* Display/Headlines — Tyler's personality */
font-family: "Inter", system-ui, -apple-system, sans-serif;
/* NOTE: Consider upgrading to a bolder display font for h1 only */

/* Body */
font-family: "Inter", system-ui, -apple-system, sans-serif;

/* Monospace (technical elements, labels) */
font-family: "Fira Code", ui-monospace, Consolas, monospace;
```

### Typography Scale

#### Headings (Dark Background)

| Element | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------|--------|-------------|----------------|-------|
| Hero H1 | clamp(2.5rem, 5vw, 4.5rem) | 700 | 1.06 | -0.04em | `#FFFFFF` |
| Section H2 | clamp(2rem, 4vw, 3rem) | 700 | 1.15 | -0.02em | `#FFFFFF` |
| Card H3 | clamp(1.25rem, 2.5vw, 1.5rem) | 600 | 1.3 | 0 | `#FFFFFF` |
| Eyebrow | 14px | 600 | 1.43 | 0.05em | `#80E9FF` |

#### Headings (Light Background)

| Element | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------|--------|-------------|----------------|-------|
| Section H2 | clamp(2rem, 4vw, 3rem) | 700 | 1.15 | -0.02em | `#0A1628` |
| Card H3 | clamp(1.25rem, 2.5vw, 1.5rem) | 600 | 1.3 | 0 | `#0A1628` |
| Eyebrow | 14px | 600 | 1.43 | 0.05em | `#0D95E8` |

#### Body Text

| Element | Size | Weight | Line Height | Color (Light BG) | Color (Dark BG) |
|---------|------|--------|-------------|-------------------|-----------------|
| Body Large | 21px | 400 | 1.52 | `#425466` | `#ADBDCC` |
| Body Default | 18px | 400 | 1.56 | `#425466` | `#ADBDCC` |
| Body Small | 16px | 400 | 1.5 | `#697386` | `#8898AA` |
| Caption | 14px | 400 | 1.43 | `#697386` | `#8898AA` |

### Key Typography Patterns
- Hero headlines: Negative letter-spacing (-0.04em) for tight, impactful display
- Eyebrow/label text: Uppercase or title-case, wider spacing, accent color
- Body on dark: Same weight as light (400), but muted color for softer appearance
- No decorative fonts in body — personality comes from animation and color, not font variety

---

## 3. Spacing Scale (8px base)

| Token | Value | Usage |
|-------|-------|-------|
| `xxs` | 4px | Tight gaps, icon spacing |
| `xs` | 8px | Inline spacing, small gaps |
| `sm` | 12px | Input padding, compact lists |
| `md` | 16px | Standard element spacing |
| `lg` | 24px | Component padding, list gaps |
| `xl` | 32px | Grid gaps, sub-section spacing |
| `2xl` | 48px | Major component separation |
| `3xl` | 64px | Section padding (mobile) |
| `4xl` | 80px | Section padding (tablet) |
| `5xl` | 120px | Section padding (desktop) |

### Section Padding

```css
/* Standard section */
padding: 120px 0;        /* Desktop */
padding: 80px 0;         /* Tablet (< 1024px) */
padding: 64px 0;         /* Mobile (< 768px) */

/* Hero (extra breathing room) */
padding: 160px 0 120px;  /* Desktop */
padding: 100px 0 80px;   /* Tablet */
padding: 80px 0 64px;    /* Mobile */
```

---

## 4. Layout

### Container

```css
max-width: 1080px;   /* Primary content */
padding: 0 24px;     /* Horizontal padding */
margin: 0 auto;      /* Centered */

/* Wide (full-bleed sections) */
max-width: 1200px;

/* Narrow (text-focused) */
max-width: 720px;
```

### Grid

```css
/* Primary 12-column grid */
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 32px;

/* Common layouts */
repeat(2, 1fr)        /* 50/50 split */
repeat(3, 1fr)        /* Three-column cards */
5fr 7fr               /* ~42/58 text/visual split */
repeat(auto-fit, minmax(280px, 1fr))  /* Responsive card grid */
```

### Responsive Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| `sm` | 640px | Small phones |
| `md` | 768px | Tablets, large phones |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |

---

## 5. Shadows (Stripe's Blue-Tinted System)

```css
/* Level 1 — Subtle (resting cards on light bg) */
box-shadow: 0 2px 5px rgba(50, 50, 93, 0.09),
            0 1px 2px rgba(0, 0, 0, 0.07);

/* Level 2 — Card hover */
box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
            0 5px 15px rgba(0, 0, 0, 0.07);

/* Level 3 — Elevated (dropdowns, modals) */
box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
            0 15px 35px rgba(50, 50, 93, 0.15),
            0 5px 15px rgba(0, 0, 0, 0.1);

/* Dark background card hover */
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

/* CTA button glow (PS blue) */
box-shadow: 0 4px 12px rgba(13, 149, 232, 0.4);
```

---

## 6. Component Patterns

### Buttons

#### Primary CTA (Pill Shape)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  background-color: #0D95E8;
  border: none;
  border-radius: 24px;       /* Pill shape — Stripe signature */
  cursor: pointer;
  transition: background-color 200ms ease,
              transform 150ms ease,
              box-shadow 200ms ease;
}

.btn-primary:hover {
  background-color: #0B7BC0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(13, 149, 232, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Arrow icon shifts right on hover */
.btn-primary .arrow {
  transition: transform 200ms ease;
}
.btn-primary:hover .arrow {
  transform: translateX(4px);
}
```

#### Secondary Button (Ghost/Outline)

```css
.btn-secondary {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: transparent;
  border-radius: 24px;
  transition: border-color 200ms ease, background-color 200ms ease;
}

/* On dark backgrounds */
color: #FFFFFF;
border: 1px solid rgba(255, 255, 255, 0.2);

/* On light backgrounds */
color: #0A1628;
border: 1px solid rgba(10, 37, 64, 0.15);
```

#### Text Link (with Arrow)

```css
.btn-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 500;
  color: #0D95E8;
  transition: color 200ms ease;
}
.btn-link:hover { color: #0B7BC0; }
.btn-link:hover .arrow { transform: translateX(4px); }
```

### Cards

#### Light Background Card

```css
.card {
  background: #FFFFFF;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 5px rgba(50, 50, 93, 0.09),
              0 1px 2px rgba(0, 0, 0, 0.07);
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 250ms ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
              0 5px 15px rgba(0, 0, 0, 0.07);
}
```

#### Dark Background Card

```css
.card-dark {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 32px;
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1),
              border-color 250ms ease,
              box-shadow 250ms ease;
}

.card-dark:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

### Navigation

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  padding: 0 24px;
  transition: background-color 300ms ease, backdrop-filter 300ms ease;
}

/* Over hero — transparent */
.header--transparent {
  background: transparent;
}

/* Scrolled — solid with blur */
.header--scrolled {
  background: rgba(10, 22, 40, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08);
}
```

---

## 7. Animation Patterns

### Scroll Reveals (GSAP ScrollTrigger)

```css
/* Base state — before entering viewport */
opacity: 0;
transform: translateY(30px);

/* Revealed state */
opacity: 1;
transform: translateY(0);
```

```javascript
// GSAP implementation
gsap.fromTo(element,
  { opacity: 0, y: 30 },
  {
    opacity: 1, y: 0,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: { trigger: element, start: "top 85%", once: true }
  }
);
```

Not inside a Proof Stage. A stage's base CSS is its end frame (ADR-0016 §3); use
`data-stage-step` and `useStageTimeline`, never an `opacity: 0` base.

### Staggered Reveals (Card Grids)

```javascript
gsap.fromTo(cards,
  { opacity: 0, y: 30 },
  {
    opacity: 1, y: 0,
    duration: 0.6,
    stagger: 0.1,       // 100ms between each card
    ease: "power2.out",
    scrollTrigger: { trigger: cards[0], start: "top 85%", once: true }
  }
);
```

### Timing Functions

```css
/* Primary easing (Stripe's deceleration curve) */
cubic-bezier(0.16, 1, 0.3, 1)      /* Scroll reveals */

/* Standard transitions */
cubic-bezier(0.25, 0.1, 0.25, 1)   /* Buttons, links */

/* Subtle spring */
cubic-bezier(0.34, 1.56, 0.64, 1)  /* Slight overshoot */
```

### Duration Guide

| Context | Duration |
|---------|----------|
| Button hover | 150-200ms |
| Link underline | 200ms |
| Card hover lift | 250ms |
| Scroll reveal | 600ms |
| Hero entrance | 800-1000ms |
| Stagger per item | 100ms |

### Hero Animation Sequence (Tyler influence)

```javascript
// Hero timeline — staggered entrance
const tl = gsap.timeline({ delay: 0.3 });
tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.5 })
  .from(".hero-headline", { opacity: 0, y: 30, duration: 0.6 }, "-=0.2")
  .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
  .from(".hero-ctas", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");
```

### Performance Rules

- ONLY animate `transform` and `opacity` (compositor-friendly)
- Use `will-change: transform, opacity` on animated elements
- NEVER animate `width`, `height`, `top`, `left`, `margin`, `padding`
- All animations respect `prefers-reduced-motion: reduce`
- Reduce to simple fade on mobile < 768px (no translateY)

---

## 8. Page Structure (Home Page)

### Section Order with Visual Treatment

| # | Section | Background | Key Visual |
|---|---------|-----------|------------|
| 1 | **Header/Nav** | Transparent → solid on scroll | Fixed, 64px height |
| 2 | **Hero** | Dark (#0A1628) + gradient mesh canvas | Animated headline, dual CTAs |
| 3 | **Value Props** | Light (#F6F9FC) | 6-card grid with icons, staggered reveal |
| 4 | **Differentiator** | White (#FFF) | Tyler quote + portrait, 2-column |
| 5 | **Services** | Light (#F6F9FC) | 6-card grid, hover expand on mobile |
| 6 | **Case Studies** | Dark (#0A1628) | 4 cards + "Your Company" CTA card |
| 7 | **Your Company CTA** | Integrated in case studies | Standout accent card |
| 8 | **Footer CTA** | Dark (#0A1628) | "Ready to Stop Juggling?" headline |
| 9 | **Footer** | Dark (#0A1628) | Links, copyright, tagline |

---

## 9. Interaction Patterns

### Hover States
- **Cards**: translateY(-4px) + enhanced shadow (250ms)
- **Primary buttons**: translateY(-1px) + blue glow shadow (150ms)
- **Secondary buttons**: Border brightens + subtle background fill (200ms)
- **Text links**: Color shift + arrow translateX(4px) (200ms)
- **Nav items**: Color brightens to full white (200ms)

### Focus States
- Visible focus ring: `box-shadow: 0 0 0 3px rgba(13, 149, 232, 0.3)`
- Applied to all interactive elements for keyboard accessibility

### Mobile Interactions
- Service cards: Tap to expand description (toggle active state)
- No hover transforms on touch devices
- Mobile hamburger menu with body scroll lock

---

## 10. Image Treatments

### Current Brand Assets
- `public/images/ps-logo.webp` - Header/footer logo.
- `public/images/ps-logo.png` - JSON-LD logo fallback.
- `public/images/og-image-v2.jpg` - Open Graph image.
- `public/images/og-image-square-v2.jpg` - Square social image.
- `public/images/tyler-preisser-headshot.jpg` - Founder profile image.
- `public/images/cases/tyler-headshot.webp` - Press/profile asset referenced by the press page.
- `public/images/why-us/ai-harnessed.webp` - Homepage why-us visual.
- `public/images/why-us/we-stay-with-it-new.webp` - Homepage why-us visual.

### Image Style Rules
- Icons: prefer SVG or lucide icons unless a bitmap asset is already required.
- Portrait: rounded or circular crop, professional.
- All images: lazy load below fold, optimized WebP where possible.

---

## 11. Proof Stage (ADR-0016, 0017, 0018)

A case study may carry a Proof Stage: a recreation of the built system working
on invented data, rendered between "What we built" and the specifications
(`src/components/case-study/CaseStudyPage.tsx`, `DemoSection`/`DemoStage`,
`src/data/demos/`).

### 1. Anatomy
- **Section** (`.demo-section`) — the page section, eyebrow "See it work", h2.
- **Mat** (`.demo-stage`) — the Preisser frame around every stage: a `<figure>`
  that follows `--theme-*` in both themes, with its own measured `--demo-mat-*`
  border. The product ground never touches the page ground.
- **Label** — the visible "Demonstration data" (or "Recreation · demonstration
  data") badge, `data-demo-label`.
- **Narration** — a visually hidden paragraph, `data-demo-narration`, whose last
  sentence says the data is invented or a demonstration.
- **Beats** — an ordered list: Before, The read, What it caught, The screen
  (Screen and the narration are required; the rest are optional).
- **Screen** — the product's own screen recreated in its skin, `ProductScreen`.
- **Controls** — Back, Next, Replay and a tappable step list, `StepControls`.

### 2. Mat tokens (measured 2026-09-28, WCAG relative luminance)
| Theme | Mat on page | Mat edge vs page | Screen edge vs mat |
|---|---|---|---|
| Dark | `#101E33` on `#0A1628` | `#5B6B82`, 3.34:1 | `#6B7A90`, 3.83:1 |
| Light | `#F1F4F8` on `#FFFFFF` | `#7C8BA1`, 3.46:1 | `#6B7A90`, 3.96:1 |

Mat text uses `--theme-text-primary` or `--theme-text-secondary` only;
`--theme-text-muted` falls under 4.5:1 on the light mat.

### 3. Skin rules
- The mat follows `--theme-*`; the **skin** class sits on `.demo-stage__beats`,
  inside the mat's padding, so a product ground is always separated from the
  page ground by the mat and a `--demo-screen-edge` border.
- Skin values are `--skin-*` custom properties on `.demo-skin--<name>`. Never a
  product's own variable name (e.g. never reuse ps-admin's `--color-primary`
  for the site's `--color-primary`, which is a different colour).
- Base set every skin defines: `--skin-ground --skin-surface --skin-ink
  --skin-ink-2 --skin-rule --skin-accent --skin-action --skin-on-action
  --skin-good --skin-good-bg --skin-attention --skin-attention-bg
  --skin-chrome --skin-on-chrome --skin-radius [--skin-font]`.
- No `@theme` in any stage file. Declaring `--color-*`, `--theme-*`, `--font-*`,
  `--shadow-*`, `--radius-*`, `--tw-*`, `--container-*`, `--nav-*`, `--ease-*`,
  `--section-*`, `--spacing-*`, `--text-*` or `--breakpoint-*` anywhere under
  `DemoStage/` fails the privacy probe (rule `css-namespace`).

### 4. Data-attribute vocabulary
Engine-only (never authored by a scene): `data-demo-section`,
`data-demo-expected`, `data-demo-stage`, `data-demo-label`, `data-demo-narration`,
`data-beat`, `data-beat-kind`, `data-track`, `data-track-n`, `data-track-js`,
`data-track-state`, `data-track-step`, `data-track-armed`, `data-track-instant`,
`data-pending`, `data-live`, `data-tabs-js`.

Authored by scenes: `data-stage-step` (with optional `data-fx`),
`data-stage-until`, `data-count-to` / `data-count-from` / `data-count-format`,
`data-stage-scroller`.

### 5. Phone rules
Design at 390px first, then 320px, then the rest of the repo's phone matrix.
Content width available inside the mat: **342px at 390px**, **280px at
320px**. A product screen wider than that needs a phone variant
(`ProductScreen phone={...}`, shown below 768px) or an internal scroller
(`ProductScreen scroll={{label}}`) — never both, never neither. No page-level
horizontal scroll; tap targets stay 44x44.

### 6. Motion
Time-based, plays once on entry, with visible Next, Back and Replay controls
that step the same timeline (`useStageTimeline`). No scroll scrubbing, no
pinning. A tabbed screen (ADR-0017) adds "Take the tour", which auto-plays
each tab in sequence and is also its own Stop. Lines and progress bars use
`clip-path`, never `stroke-dasharray` (a measured Firefox bug).

### 7. Voice inside a stage
Invented amounts from the stage's own fixture may appear inside a labeled
Proof Stage element only — never in body copy, metadata, JSON-LD, the hub
card, the results row, or `llms.txt` (ADR-0016 §4). Every person, business,
town and domain comes from the invented-name registry
(`src/data/demos/_invented.ts`). No `h1` or `h2` inside a stage. Every string a
stage can ever show is present in the server HTML — nothing is written by JS
except number counters, which always end on the server's exact text.

### 8. The gate
```bash
npm run test:privacy:self   # the Proof Stage privacy guard must go red on planted strings
npm run test:privacy        # scans out/ ; reads ~/.config/preisser/demo-denylist.txt, fails closed
npm run test:stage          # Playwright: chromium, webkit, firefox x 14 viewports x both themes
```
Screenshots land in `test-results/demo-stage-shots/<slug>/<engine>/<WxH>-<dark|light>-<nojs|rest>.png`;
read them with the Read tool, per the repo's browser-matrix rule.
