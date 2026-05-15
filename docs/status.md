# Project Status

> **Updated every session.** Most recent entry at the top.
> Format: Date — What happened, what changed, what's blocked, what's next.

---

## 2026-05-14 — Cloudflare Production Path Tightening

### What Happened
- Converted the GitHub Pages workflow into build-only CI so the repo no longer publishes a second `/preisser-solutions` base-path version of the site.
- Removed the GitHub Pages base-path branch from `next.config.ts`; static exports now build for the canonical Cloudflare host.
- Added a `deploy:cloudflare` npm script for the known production deployment path.
- Checked Cloudflare Pages production secrets with Wrangler; no production secrets were listed.
- Deployed the fixed static export to Cloudflare Pages and removed two stale Worker routes on the `preissersolutions.com` zone that were intercepting the canonical host before Pages middleware could run.
- Reworked `/about` into the indexed Preisser Solutions company page, added footer/internal links to it, and redirected stale `/preisser-technology` to `/about`.
- Added the social media service to the canonical services grid and footer links.
- Submitted the refreshed 25-URL canonical set to IndexNow after deploy.

### Current State
- **Production target**: Cloudflare Pages project `preisser-solutions`.
- **Manual deploy command**: `npm run deploy:cloudflare`.
- **Lead forwarding**: blocked until `ZAPIER_LEAD_WEBHOOK_URL` is added to Cloudflare Pages.
- **Custom domain redirect loop**: fixed; `preissersolutions.com` now serves 200, `www`, `preissertech.com`, and `preisser-solutions.pages.dev` redirect to it.
- **Sitemap**: 23 canonical HTML URLs; `/preisser-technology` is no longer listed and now 301s to `/about`.

### Next Steps
- Add `ZAPIER_LEAD_WEBHOOK_URL` to Cloudflare Pages production secrets.
- Add verified Google Business Profile URL, CID, Place ID, and direct review link after GBP verification.

## 2026-05-14 — Edge Safety, Agent Discovery, and Conversion Cleanup

### What Happened
- Fixed a critical Cloudflare Pages middleware self-redirect risk by removing the canonical host from the legacy host set and adding `preissertech.com`, `www`, and Pages duplicate host handling.
- Moved important canonical path redirects into middleware so legacy aliases and removed proof pages do not depend only on `_redirects` while Pages Functions are active.
- Fixed Cloudflare Pages Function `OPTIONS` responses for `/api/lead` and `/mcp` so they return empty 204 responses instead of JSON bodies.
- Removed a silent contact-form fast-submit success state; real users now see a short wait state instead of a fake success.
- Aligned service-dialog, 404, proof, and agent-discovery copy with the Hays Visibility Audit/local-growth positioning.
- Replaced internal links from indexed pages to excluded/noindexed pages where found.

### Current State
- **Primary CTA** remains `Get a Free Hays Visibility Audit`.
- **Indexing strategy** remains narrow: canonical Hays/local-growth pages in sitemap; legacy long-tail pages excluded/noindexed or redirected.
- **Verification** pending for this pass.

### Next Steps
- Run TypeScript/build verification and inspect middleware redirect behavior.
- Confirm the Cloudflare deployment after the build-only workflow change.

## 2026-05-14 — Hays Local Growth SEO Pass

### What Happened
- Repositioned the site around Preisser Solutions as a Hays, Kansas marketing, websites, local SEO, Google Ads, review systems, social media, lead tracking, and AI automation company.
- Added compliant local-growth pages for Hays marketing, GBP optimization, Google Ads, web design, social media, AI automation, contractors, restaurants, professional services, review requests, resources, privacy, and service areas.
- Consolidated risky legacy proof: removed unsupported child case-study pages, redirected old case-study URLs to the proof hub, and deleted unused legacy case-study data.
- Repaired global schema, robots, sitemap generation, Cloudflare middleware noindex handling, and lead form flow.

### Current State
- **Primary CTA**: Get a Free Hays Visibility Audit.
- **Builds**: Pending final verification for this pass.
- **Indexing**: Canonical Hays/local-growth pages stay in sitemap; legacy compare, non-Hays city, non-core industry, and old service pages are noindexed/excluded.

### Next Steps
- Add real GBP/review/profile URLs, booking URL if desired, and verified proof only when available and permitted.
- Editorially rewrite or remove remaining noindexed legacy long-tail pages before reindexing any of them.

## 2026-05-14 — Directory cleanup and source pruning

### What Happened
- Removed ignored local build/output artifacts: `.DS_Store`, `.next/`, `out/`, `.wrangler/tmp/`, and generated `next-env.d.ts`.
- Removed the duplicate root logo file `A0427592-A370-4409-B1F0-4EB5D9B9F46B.png`; it was byte-identical to `public/images/ps-logo.png`.
- Moved unused root-level Gemini image files into `archive/raw-assets/` so source/reference images are organized out of the project root.
- Deleted unused scaffold components/hooks/lib files that had no live imports: old section/ui wrappers, unused contact/about/service components, retired AIPage layout, unused hooks, and unused animation presets.
- Removed old unreferenced public assets: standalone `ps-hero-*` files, Stripe placeholder image directory, and unused legacy value-prop/public logo assets.
- Removed the unused `valueProps` export from `src/data/services.ts`.
- Updated `CLAUDE.md` file map to reflect the current app structure.
- Updated `docs/design-system.md` image asset notes to match the current live assets.

### Current State
- **Builds**: Clean — `npm run build` passes, Next generated 109 static routes, and `scripts/generate-sitemap.mjs` wrote 106 canonical URLs.
- **Repo hygiene**: Root directory is clearer; generated artifacts were removed again after verification and will be recreated by `npm run build` when needed.

### Next Steps
- Review whether the remaining historical CSS classes for retired sections should be removed in a focused CSS pass.

## 2026-05-12 — Homepage/services CTA copy cleanup

### What Happened
- Removed the homepage services intro paragraph under `Services` / `What We Build`.
- Removed the bottom CTA subheader paragraph from the homepage CTA.
- Removed the duplicate `Hire Preisser Solutions...` CTA paragraph from the `/services` page.

### Current State
- **Builds**: Clean — `npm run build` passes and generated 109 static pages.

### Next Steps
- Review homepage and `/services` visually if additional spacing tweaks are desired now that the subcopy is gone.

## 2026-04-02 — Stripe Exact Clone (Session 4 — HDS Token System + Real Images)

### What Happened
- **Complete rebuild to match Stripe.com exactly** — not "inspired by", a visual clone with PS content
- **`src/styles/globals.css`** — Fully rewritten with Stripe's actual HDS CSS tokens (`--hds-color-*`, `--hds-space-core-*`, `--hds-font-weight-*`, `--hds-space-core-radius-*`). Stripe's actual shadow values (`rgba(50,50,93,...)`, `rgba(0,0,0,...)`). Stripe's actual section padding system (96px desktop, 60px mobile). Stripe's service card grid (1px-gap grid = border effect). Stripe's footer dark layout.
- **`public/images/stripe/`** — All 40 Stripe images copied from saved site (testimonial headshots, enterprise accordion, bento terminal, data viz, happenings cards, customer logos)
- **`src/components/home/hero.tsx`** — Stripe's actual hero: animated radial gradient mesh cycling through purple/blue/teal/green, wave texture overlay, 67px desktop H1, gradient-clipped highlight text, dark fill + ghost CTAs matching Stripe exactly
- **`src/components/home/personal-commitment.tsx`** — Uses actual Stripe customer logos (Supabase, Linear, Runway, etc.) from `public/images/stripe/`
- **`src/components/home/value-props.tsx`** — Stripe's "Fully Integrated Suite" 1px-gap bordered card grid with SVG icons, per-card colors, hover highlight
- **`src/components/home/how-it-works.tsx`** — Dark feature split using `bento-terminal.png` as the visual
- **`src/components/home/services-overview.tsx`** — Light feature split using `DatavizStatic3x.png` as the visual
- **`src/components/home/social-proof.tsx`** — Real testimonial headshots from Stripe's `testimonial-headshot-*.png` files
- **`src/components/home/enterprise-section.tsx`** — NEW: Stripe's enterprise dark section + 2x2 accordion image grid using `enterprise-accordion-*.png`
- **`src/components/home/happenings.tsx`** — NEW: Stripe's "The Happenings" horizontal scroll carousel using `the-happenings-*.png` images
- **`src/components/home/cta-section.tsx`** — Stripe's final CTA: white button on dark bg, ghost secondary
- **`src/components/layout/header.tsx`** — Stripe's exact nav: white CTA on dark bg, text links at 0.72 opacity
- **`src/components/layout/footer.tsx`** — Stripe's exact footer: dark `#091e35`, 4-column grid, grayscale logo
- **`src/app/page.tsx`** — Updated section order: Hero → LogoBar+Stats → ServiceGrid → Enterprise → Feature1 → Feature2 → Happenings → Testimonials → CTA

### Current State
- **Builds**: Clean ✓ — `npm run build` passes, 9 static pages, 0 errors
- **Visual target**: "Wait, is this Stripe?" reaction before reading the text
- **Images**: 40 Stripe images in `public/images/stripe/` serving as placeholders

### Next Steps
1. Replace Stripe customer logos with actual PS client logos
2. Replace bento/dataviz placeholder screenshots with PS product screenshots
3. Populate all placeholder text with real copy
4. Test on mobile devices for carousel scroll behavior

---

## 2026-04-02 — Complete Visual Rebuild (Session 3 — Stripe × Tyler Fusion)

### What Happened
- **Complete ground-up visual rebuild** of all home page components. Old design discarded. New design matches the "Stripe homepage built for a business automation company" brief.
- **`src/styles/globals.css`** — Completely rewritten (~1900 lines). Full Stripe design DNA: CSS custom properties, blue-tinted shadow system, pill buttons, dark/light card variants, animated gradient mesh hero, scroll indicator, responsive at 3 breakpoints, reduced-motion compliance, eyebrow labels, all section patterns.
- **`src/components/home/hero.tsx`** — Full-viewport dark hero with CSS animated radial gradient mesh, glowing orb, pulsing dot eyebrow badge, gradient-clipped headline highlight, dual CTAs, GSAP entrance timeline (eyebrow → headline → subtitle → CTAs → scroll indicator), scroll indicator with CSS animation.
- **`src/components/home/personal-commitment.tsx`** — Repurposed to Logo Bar + Stats Bar pair. Placeholder company logos (gray rectangles), 4-stat grid with GSAP stagger reveal.
- **`src/components/home/value-props.tsx`** — Complete rebuild. 3×2 service card grid, per-card colored icon placeholder, hover lift shadows, GSAP stagger reveal from data array.
- **`src/components/home/how-it-works.tsx`** — New two-column feature showcase (dark section), text left / visual right, gradient-fill visual placeholder, feature checklist, GSAP slide-in left/right.
- **`src/components/home/services-overview.tsx`** — New two-column feature showcase (light section, reversed layout), visual left / text right, GSAP slide-in, "Measurable Outcomes" framing.
- **`src/components/home/social-proof.tsx`** — New testimonial section (dark), 3-column card grid with dark-card styling, client badge pills, quote formatting, GSAP stagger.
- **`src/components/home/cta-section.tsx`** — Restored as standalone section. Dark gradient bg with radial glow, staggered GSAP entrance, dual CTAs.
- **`src/components/layout/header.tsx`** — Kept functional, updated CSS class alignment.
- **`src/components/layout/footer.tsx`** — Complete rebuild. Dark bg, 4-column grid (brand + 3 link cols), contact links, responsive collapse. Removed CTA block (moved to CtaSection component).
- **`src/app/page.tsx`** — New section order: Hero → LogoBar+Stats → ServiceCards → Feature1(dark) → Feature2(light) → Testimonials → CTA.
- **`src/app/why-automation/page.tsx`** — Rebuilt with page hero + benefit cards using new design system.
- **`src/app/services/page.tsx`** — Built out from TODO stub. Page hero + service card grid + CTA.
- **`src/app/about/page.tsx`** — Built out from TODO stub. Page hero + responsive bio grid + values placeholder.

### What Changed
- Home page component roles completely reassigned — old `PersonalCommitment` → Logo/Stats bar; old `ServicesOverview`/`HowItWorks` → Feature Showcase sections
- All content is placeholder text as requested (no old preissersolutions.com copy)
- Footer no longer contains the big CTA block (moved to `CtaSection` component in page.tsx)
- Hero no longer has floating pain-point quotes system (removed per rebuild brief)
- `globals.css` grew from ~1100 to ~1900 lines to cover all new patterns

### Current State
- **Phase**: Complete visual rebuild done — all placeholder, zero old content
- **Builds**: `npm run build` passes clean ✓ (9 static pages, 0 errors, 0 warnings)
- **Content**: 100% placeholder text ready for real copy
- **Styling**: Full Stripe × Tyler fusion applied — animated hero, card system, feature splits, testimonials, stats bar, logo bar
- **Animations**: GSAP ScrollTrigger on all sections, hero entrance timeline, stagger patterns
- **Responsive**: 3 breakpoints (1024px tablet, 768px mobile), reduced-motion compliant

### Blockers
- None — ready for content population

### Next Steps
1. Review visually in browser (`npm run dev`)
2. Populate placeholder text with real copy
3. Replace placeholder logo rectangles with actual company logos
4. Replace visual placeholders with actual screenshots/illustrations
5. Add real form submission backend (Formspree or similar)
6. Push to GitHub → verify Cloudflare Pages deployment

---

## 2026-04-02 — First Draft Visual Implementation (Session 2)

### What Happened
- Complete visual overhaul of `src/styles/globals.css` — full design system token replacement using exact values from `docs/design-system.md`. All `ps-` component classes rebuilt from scratch with Stripe shadow system, pill buttons, dark/light card variants.
- **src/app/layout.tsx** — Added Inter font via `next/font/google`, CSS variable wiring.
- **src/components/layout/header.tsx** — Restyled: transparent hero / solid scrolled dark navy, logo filter for dark bg, nav links as ghost, "Inquiry" as pill CTA. Mobile hamburger X animation.
- **src/components/layout/footer.tsx** — Dark footer with CTA block, divider, bottom row with copyright/tagline.
- **src/components/home/hero.tsx** — Full viewport dark hero with gradient mesh, eyebrow pill badge, subtitle, dual CTAs (primary + ghost). GSAP entrance timeline. Preserved floating quotes system.
- **src/components/home/value-props.tsx** — Light section, card grid with icon, top accent strip on hover, GSAP stagger reveal.
- **src/components/home/personal-commitment.tsx** — 2-column grid, left-border quote, circular Tyler portrait with glow, GSAP reveal.
- **src/components/home/services-overview.tsx** — Light section grid, accordion collapse on mobile, GSAP stagger, proper ARIA attributes.
- **src/components/home/social-proof.tsx** — Dark section, card-dark styling, client badge pill, results with checkmarks, "Your Company!" accent card. GSAP stagger.
- **src/app/why-automation/page.tsx** — NEW. Dark page with numbered benefit cards, GSAP reveal, dual CTA footer.
- **src/app/roi-calculator/page.tsx** — NEW. Working calculator with checkbox role selection, live inputs, results panel with formatted currency.
- **src/app/contact/page.tsx** — Full contact form with grid layout, success state, mailto fallback.

### What Changed
- `globals.css` completely rewritten (~1100 lines) — all design tokens updated to match design-system.md exactly
- Removed old stale color tokens (#1A202C dark, #FAFAFA light) replaced with correct #0A1628 and #F6F9FC
- Button shape changed from `border-radius: 8px` to `border-radius: 50px` (pill — Stripe signature)
- Case studies section switched from horizontal scrolling white cards to dark section with card-dark
- Header now properly separates nav links from CTA pill (Inquiry)

### Current State
- **Phase**: First draft complete — fully styled, production-ready components
- **Builds**: `npm run build` passes clean ✓ (9 static pages generated)
- **Content**: All data files populated
- **Styling**: Full design system applied, responsive, hover states, animations
- **Animations**: GSAP scroll reveals on all sections, hero entrance, staggered cards
- **Remaining**: Services/About pages still have TODO placeholders (scaffolds only)

### Blockers
- None for current deliverable

### Next Steps
1. Review first draft visually in browser (`npm run dev`)
2. Build out `/services` page with full service detail sections
3. Build out `/about` page with Tyler bio, mission, values
4. Add real form submission (Formspree or similar)
5. Push to GitHub → verify Cloudflare Pages deployment

---

## 2026-04-02 — Project Scaffolding

### What Happened
- Initialized project from scratch (old site archived to `archive/`)
- Created full Next.js 15 project structure with TypeScript, Tailwind v4, GSAP, Framer Motion
- Scaffolded all 4 pages: Home, Services, About, Contact
- Created 16 component files (layout, ui, home, services, about, contact)
- Created 4 data files (site-config, navigation, services, case-studies)
- Created lib files (gsap registration, animation presets, utils)
- Created 3 custom hooks (scroll-position, media-query, reduced-motion)
- Set up design tokens in globals.css
- Created CI/CD pipeline (.github/workflows/deploy.yml)
- Wrote design spec (`docs/superpowers/specs/2026-04-02-...-design.md`)
- Established self-updating doc system (this file, decisions.md, current-plan.md)

### What Changed
- Everything — this is a from-scratch build
- Old site HTML/CSS/images moved to `archive/`

### Current State
- **Phase**: Scaffolding complete, awaiting content + implementation
- **Builds**: Not yet (need `npm install` first)
- **Content**: All `src/data/` files have structure but empty descriptions (waiting for Tyler's content prompt)
- **Styling**: Minimal — components have Tailwind classes but no visual polish yet
- **Animations**: GSAP/Framer Motion wired up but no actual animations implemented

### Blockers
- [ ] Tyler's content prompt needed to populate `src/data/` files
- [ ] Need to run `npm install` to validate build
- [ ] No images yet in `public/images/` (need brand assets, Tyler portrait, service illustrations)

### Next Steps
1. Run `npm install && npm run build` to validate scaffold compiles
2. Receive Tyler's content prompt → populate `src/data/` files
3. Build out visual design starting with home page hero
4. Implement GSAP scroll animations
5. Style all components to Stripe-level polish
6. Push to GitHub → verify Cloudflare Pages deployment
