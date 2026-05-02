# Preisser Technology — Design System (Stripe x Tyler Fusion)

> **This is the single source of truth for all visual design decisions.**
> Every agent building UI reads this file. If you change a design pattern, update this file.

---

## Design DNA

**Stripe** provides: Clean precision, generous whitespace, dark navy hero, pill buttons, card hover lifts, blue-tinted shadows, subtle scroll reveals, professional typography, alternating dark/light sections.

**tylerpreisser.com** provides: Cinematic personality, warm accent colors, GSAP scroll animations with stagger, bold display fonts, gradient blends, glowing hover states, spark/particle energy, dark-mode-first aesthetic.

**Preisser Technology blend**: Stripe's structural precision and enterprise trust, infused with Tyler's warm personality and animated energy. Professional but not sterile. Polished but not generic.

---

## 1. Color Palette

### Core Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#0D95E8` | Brand blue — CTAs, links, accents |
| `--color-primary-hover` | `#0B7BC0` | Button/link hover |
| `--color-primary-glow` | `rgba(13, 149, 232, 0.4)` | Button hover shadow |
| `--color-dark` | `#0A1628` | Hero/nav/dark sections (Stripe's navy influence) |
| `--color-dark-surface` | `#0F1D30` | Cards on dark backgrounds |
| `--color-dark-subtle` | `#132840` | Subtle dark section variation |
| `--color-light` | `#F6F9FC` | Light section backgrounds (Stripe's off-white) |
| `--color-white` | `#FFFFFF` | Card backgrounds, light sections |

### Text Colors

| Token | Hex | Context |
|-------|-----|---------|
| `--color-text-dark` | `#0A1628` | Headings on light backgrounds |
| `--color-text-body` | `#425466` | Body text on light (Stripe's slate gray) |
| `--color-text-muted` | `#697386` | Secondary/caption text on light |
| `--color-text-on-dark` | `#FFFFFF` | Headings on dark backgrounds |
| `--color-text-on-dark-body` | `#ADBDCC` | Body text on dark backgrounds |
| `--color-text-on-dark-muted` | `#8898AA` | Caption text on dark |

### Accent & State Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-cyan` | `#80E9FF` | Eyebrow labels on dark, gradient accent |
| `--color-accent-green` | `#00D4AA` | Success states, highlights |
| `--color-danger` | `#DF1B41` | Error states |
| `--color-border-light` | `#E6EBF1` | Borders on light backgrounds |
| `--color-border-dark` | `rgba(255, 255, 255, 0.08)` | Borders on dark backgrounds |
| `--color-border-dark-hover` | `rgba(255, 255, 255, 0.15)` | Border hover on dark |

### Gradient Patterns

```css
/* Hero gradient mesh — Stripe-inspired but with PS blue palette */
--gradient-color-1: #0D95E8;  /* PS primary blue */
--gradient-color-2: #0048E5;  /* Deep blue */
--gradient-color-3: #635BFF;  /* Purple accent */
--gradient-color-4: #80E9FF;  /* Cyan accent */

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

### Current Brand Assets (in archive/ and public/images/)
- `LOGO.png` — Company logo
- `Tyler Portait.jpeg` — Tyler Preisser photo
- `Boost Productivity.png` — Value prop icon
- `Reduce Operational.png` — Value prop icon
- `Scalable & Reliable.png` — Value prop icon
- `Personalized.png` — Value prop icon
- `Truly Tailored.png` — Value prop icon
- `Enhance Accuracy.png` — Value prop icon

### Image Style Rules
- Icons: 65px height, auto width, consistent style
- Portrait: Rounded or circular crop, professional
- All images: Lazy load below fold, optimized WebP where possible
