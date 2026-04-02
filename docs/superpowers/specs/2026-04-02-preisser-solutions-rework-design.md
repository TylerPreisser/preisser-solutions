# Preisser Solutions Website Rework — Design Spec

**Date**: 2026-04-02
**Status**: Approved
**Domain**: preissersolutions.com
**Repo**: GitHub → Cloudflare Pages

---

## 1. Vision

Rebuild preissersolutions.com from the ground up as a premium, Stripe-inspired business automation consultancy website. The design marries Stripe's clean precision and enterprise polish with the cinematic personality of tylerpreisser.com. Content-first with standout animated moments.

---

## 2. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15+ (App Router) | Same as personal site, Stripe uses it, static export support |
| Language | TypeScript | Type safety, IDE support |
| UI | React 19 | Latest stable, pairs with Next.js |
| Styling | Tailwind v4 | Utility-first, design token support, rapid iteration |
| Animation (scroll) | GSAP + ScrollTrigger | Proven scroll-triggered reveals, SplitText for hero |
| Animation (transitions) | Framer Motion | Page transitions, micro-interactions, layout animations |
| Deployment | Cloudflare Pages | Static export, edge-fast, already in use |
| Version Control | GitHub | Standard workflow |

---

## 3. Pages & Routes

### 3.1 Home (`/`)
The flagship page. Single long-scroll with distinct sections:

1. **Hero** — Bold animated headline (GSAP SplitText), subtitle, primary CTA. Gradient mesh or subtle particle background. Dark theme section.
2. **Value Props** — 3-4 cards (Boost Productivity, Enhance Accuracy, Reduce Operational Cost, Scalable & Reliable). Stripe-style icon + headline + description. Scroll-reveal entrance.
3. **How It Works** — 3-step process visualization. Animated on scroll. Could be a horizontal timeline or vertical stepped layout.
4. **Services Overview** — Card grid linking to `/services`. Each card has icon, title, brief description, arrow link.
5. **Case Studies / Social Proof** — Testimonials or results metrics. Could be a carousel or staggered grid.
6. **Personal Commitment** — Tyler's personal touch (carried from current site). Photo + statement. This differentiates from generic agency sites.
7. **CTA Section** — Full-width dark section with headline + contact button.
8. **Footer** — Links, social, copyright.

### 3.2 Services (`/services`)
Dedicated breakdown of each automation service:

- Hero with page title
- Service detail sections (alternating layout: text-left/image-right, then flip)
- Each service: title, description, key benefits, relevant icon/illustration
- Bottom CTA to contact

### 3.3 About (`/about`)
Tyler's story and the company mission:

- Hero with page title
- Tyler's bio section with portrait photo
- Mission / values
- What makes Preisser Solutions different
- CTA to contact

### 3.4 Contact (`/contact`)
Clean conversion page:

- Hero with page title
- Contact form (name, email, company, message)
- Optional: Calendly embed for booking calls
- Business info (email, location)

---

## 4. Design System

### 4.1 Typography
- **Display / Headlines**: Bold sans-serif display font (e.g., Inter Display, or a premium option like Satoshi/General Sans)
- **Body**: Clean sans-serif (Inter or system font stack)
- **Monospace**: Fira Code (for any code/technical elements)
- **Scale**: Fluid type scale using clamp() — responsive without breakpoint jumps

### 4.2 Color Palette
- **Primary Blue**: #0D95E8 (carried from current brand) or refined variant
- **Dark**: Rich navy/near-black for hero sections and nav (#0A0A0F or similar)
- **Light**: Clean whites and light grays for content sections (#FAFAFA, #F5F5F5)
- **Accent**: Gradient from primary blue to a secondary (purple or teal) for standout elements
- **Text**: Near-black on light (#1A1A1A), near-white on dark (#F0F0F0)
- **Mode**: Dark nav/hero + light content sections (Stripe pattern). No full dark mode toggle needed.

### 4.3 Layout
- **Max-width**: 1280px container, centered
- **Grid**: 12-column grid system via Tailwind
- **Spacing**: 8px base unit, generous whitespace (Stripe uses lots of breathing room)
- **Sections**: Full-width backgrounds, contained content
- **Responsive**: Mobile-first, breakpoints at sm(640), md(768), lg(1024), xl(1280)

### 4.4 Components
- **Button**: Primary (filled blue), Secondary (outlined), Ghost (text only)
- **Card**: Elevated with subtle border, hover lift + shadow transition
- **Section**: Wrapper with consistent vertical padding, optional dark/light variant
- **Nav**: Fixed top, transparent on hero → solid on scroll (Stripe pattern)
- **Badge**: Small label for service categories or tags
- **Form Input**: Clean bordered inputs with focus ring animation

---

## 5. Animation Strategy (Balanced)

### What animates:
- **Hero headline**: GSAP SplitText character/word reveal on load
- **Hero background**: Subtle gradient mesh animation or slow-moving particles (much subtler than tylerpreisser.com)
- **Section entrances**: Fade-up + slight translate on scroll (GSAP ScrollTrigger, staggered for card groups)
- **Page transitions**: Smooth cross-fade between routes (Framer Motion AnimatePresence)
- **Hover states**: Card lift (translateY + shadow), button glow/scale, link underline slide
- **One standout**: Animated process/workflow diagram on home page — shows automation flow coming to life on scroll
- **Nav**: Background opacity transition on scroll

### What does NOT animate:
- No custom cursor
- No spark/particle bursts on interaction
- No 3D elements or WebGL
- No parallax scrolling (subtle transforms only)
- No animation on text content (only containers/cards)

### Performance:
- All animations respect `prefers-reduced-motion: reduce`
- GSAP plugins registered once via shared module
- No animation on mobile below 768px (fade-in only, no transforms)
- Lazy load images below the fold

---

## 6. Architecture

### 6.1 Directory Structure
```
preisser-solutions/
├── CLAUDE.md                          # Master project doc
├── docs/
│   ├── superpowers/
│   │   └── specs/                     # Design specs
│   └── plans/                         # Implementation plans
├── public/
│   ├── images/                        # Optimized images
│   ├── fonts/                         # Self-hosted fonts (if any)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (nav, footer, fonts, metadata)
│   │   ├── page.tsx                   # Home page
│   │   ├── services/
│   │   │   └── page.tsx               # Services page
│   │   ├── about/
│   │   │   └── page.tsx               # About page
│   │   └── contact/
│   │       └── page.tsx               # Contact page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx             # Fixed nav
│   │   │   ├── footer.tsx             # Site footer
│   │   │   └── section.tsx            # Reusable section wrapper
│   │   ├── ui/
│   │   │   ├── button.tsx             # Button variants
│   │   │   ├── card.tsx               # Card component
│   │   │   ├── badge.tsx              # Badge/tag
│   │   │   └── input.tsx              # Form input
│   │   ├── home/
│   │   │   ├── hero.tsx               # Home hero section
│   │   │   ├── value-props.tsx        # Value proposition cards
│   │   │   ├── how-it-works.tsx       # Process visualization
│   │   │   ├── services-overview.tsx  # Services card grid
│   │   │   ├── social-proof.tsx       # Testimonials/metrics
│   │   │   ├── personal-commitment.tsx# Tyler's personal section
│   │   │   └── cta-section.tsx        # Call-to-action block
│   │   ├── services/
│   │   │   └── service-detail.tsx     # Individual service section
│   │   ├── about/
│   │   │   └── bio-section.tsx        # Tyler bio component
│   │   └── contact/
│   │       └── contact-form.tsx       # Contact form
│   ├── data/
│   │   ├── services.ts                # Service definitions
│   │   ├── case-studies.ts            # Case study/testimonial data
│   │   ├── navigation.ts              # Nav links
│   │   └── site-config.ts             # Site metadata, URLs, branding
│   ├── lib/
│   │   ├── gsap.ts                    # GSAP plugin registration
│   │   ├── animations.ts             # Shared animation presets
│   │   └── utils.ts                   # Utility functions (cn, etc.)
│   ├── hooks/
│   │   ├── use-scroll-position.ts     # Scroll tracking for nav
│   │   ├── use-media-query.ts         # Responsive hooks
│   │   └── use-reduced-motion.ts      # Motion preference detection
│   └── styles/
│       └── globals.css                # Tailwind imports, CSS custom properties, base styles
├── next.config.ts                     # Static export config
├── tailwind.config.ts                 # Tailwind customization
├── tsconfig.json                      # TypeScript config
├── package.json                       # Dependencies
├── wrangler.toml                      # Cloudflare Pages config
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml                 # CI/CD to Cloudflare Pages (optional)
```

### 6.2 Content Separation
All content lives in `src/data/` as typed TypeScript objects. Components import data — never hardcode content in JSX. This makes future CMS migration trivial.

### 6.3 Static Export
- `output: 'export'` in next.config.ts
- No API routes, no middleware, no dynamic routes
- Build outputs to `/out`, deployed to Cloudflare Pages

---

## 7. SEO & Performance

- Semantic HTML throughout (proper heading hierarchy, landmarks)
- Open Graph + Twitter Card meta tags per page
- Structured data (schema.org LocalBusiness)
- Image optimization: Next.js Image component with proper sizes/srcset
- Font loading: `next/font` for zero layout shift
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms

---

## 8. Content Requirements (Pending)

Tyler will provide a detailed content prompt covering:
- Service descriptions and details
- Case studies / client results
- About / bio copy
- Specific imagery and brand assets

The architecture is designed to receive this content into `src/data/` files without structural changes.

---

## 9. Out of Scope (for now)

- Blog / CMS
- User authentication
- Dashboard or client portal
- E-commerce / payments
- Full dark mode toggle
- Custom cursor or particle effects
- 3D / WebGL elements
