# Current Implementation Plan

> **Living document.** Check off items as completed. Add new items as discovered.
> Updated every session by the working agent.

---

## Phase 1: Foundation (CURRENT)

- [x] Initialize Next.js project structure
- [x] Set up TypeScript, Tailwind v4, PostCSS
- [x] Create all page routes (home, services, about, contact)
- [x] Scaffold all component files with proper imports
- [x] Create data files with typed interfaces
- [x] Set up GSAP + Framer Motion lib files
- [x] Create custom hooks (scroll, media query, reduced motion)
- [x] Define design tokens in globals.css
- [x] Write design spec
- [x] Set up CI/CD pipeline
- [x] Set up self-updating documentation system
- [x] Run `npm install` and validate build compiles
- [x] Initialize GitHub repo and push
- [ ] Verify Cloudflare Pages deployment

## Phase 2: Content

- [ ] Receive Tyler's content prompt
- [ ] Populate `src/data/site-config.ts` with final branding
- [ ] Populate `src/data/services.ts` with all service descriptions
- [ ] Populate `src/data/case-studies.ts` with client results
- [ ] Populate `src/data/navigation.ts` with final nav structure
- [ ] Add Tyler's portrait to `public/images/`
- [ ] Add logo and brand assets to `public/images/`
- [ ] Add service illustrations/icons to `public/images/`

## Phase 3: Visual Design

- [ ] Design and build Header (fixed, scroll detection, mobile menu)
- [ ] Design and build Footer (links, social, contact info)
- [ ] Design and build Hero section (gradient mesh, headline animation)
- [ ] Design and build Value Props section (card grid, icons)
- [ ] Design and build How It Works section (process visualization)
- [ ] Design and build Services Overview section (card grid)
- [ ] Design and build Social Proof section (testimonials/metrics)
- [ ] Design and build Personal Commitment section (portrait + text)
- [ ] Design and build CTA section
- [ ] Design and build Services page
- [ ] Design and build About page
- [ ] Design and build Contact page (form + optional Calendly)
- [ ] Style all UI components (button variants, card hover, input focus)
- [ ] Implement responsive design for all sections

## Phase 4: Animation & Polish

- [ ] Implement GSAP SplitText hero headline animation
- [ ] Implement hero background (gradient mesh or subtle particles)
- [ ] Add ScrollTrigger fade-up reveals to all sections
- [ ] Add staggered card entrance animations
- [ ] Add Framer Motion page transitions (AnimatePresence)
- [ ] Add hover micro-interactions (card lift, button glow)
- [ ] Build standout element (animated automation workflow diagram)
- [ ] Implement header scroll state transition
- [ ] Verify all animations respect prefers-reduced-motion
- [ ] Verify no animation transforms on mobile < 768px

## Phase 5: Quality & Launch

- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile testing (iPhone Safari, Android Chrome)
- [ ] Accessibility audit (semantic HTML, ARIA, contrast, keyboard nav)
- [ ] Performance audit (Lighthouse, Core Web Vitals)
- [ ] SEO verification (meta tags, Open Graph, schema.org)
- [ ] Image optimization (WebP, proper sizes/srcset)
- [ ] Final content review with Tyler
- [ ] Production deploy to preissersolutions.com

---

## Discovered During Work

> Items added during implementation that weren't in the original plan.
> (Append here as things come up)

- [x] 2026-05-14: Remove ignored generated artifacts and root-level duplicate/loose assets.
- [x] 2026-05-14: Prune unused scaffold components, hooks, AI-page prototype files, and animation presets.
- [x] 2026-05-14: Remove unreferenced public Stripe placeholders, old standalone hero files, and legacy value-prop assets.
- [x] 2026-05-14: Rework canonical Hays local SEO/conversion pages around the Hays Visibility Audit.
- [x] 2026-05-14: Remove unsupported proof pages and redirect old case-study URLs to the proof hub.
- [x] 2026-05-14: Exclude/noindex legacy doorway-prone or duplicate-intent pages from sitemap/indexing.
- [x] 2026-05-14: Add GBP, measurement, content roadmap, offsite authority, and Google Ads operating docs.
- [x] 2026-05-14: Fix Cloudflare middleware canonical-host self-redirect risk and move critical path redirects into middleware.
- [x] 2026-05-14: Fix Cloudflare Function 204 OPTIONS responses for lead and MCP endpoints.
- [x] 2026-05-14: Align agent-discovery surfaces with Hays/local-growth positioning.
- [x] 2026-05-14: Tighten contact-form fast-submit behavior and homepage conversion CTAs.
- [x] 2026-05-14: Convert GitHub Pages workflow into build-only CI so Cloudflare Pages is the single production target.
- [x] 2026-05-14: Check Cloudflare Pages production secrets with Wrangler; no secrets were listed.
- [x] 2026-05-14: Deploy fixed Cloudflare Pages export and remove stale Worker routes intercepting `preissersolutions.com`.
- [x] 2026-05-14: Rework `/about` for the current Hays local-growth positioning and redirect stale `/preisser-technology`.
- [x] 2026-05-14: Add social media marketing to canonical services grid and footer links.
- [ ] 2026-05-14: Optional CSS cleanup pass for retired `.ps-problem*`, `.ps-results*`, and old AI-page classes.
- [ ] 2026-05-14: Editorially rewrite or remove remaining noindexed legacy long-tail pages before reindexing any of them.
- [ ] 2026-05-14: Add `ZAPIER_LEAD_WEBHOOK_URL` in Cloudflare Pages production secrets.
- [ ] 2026-05-14: Add verified Google Business Profile review URL, CID, and Place ID after GBP verification.

---

## Blocked Items

> Items that can't proceed until something else happens.

| Item | Blocked By | Date Logged |
|------|-----------|-------------|
| Lead forwarding | Add `ZAPIER_LEAD_WEBHOOK_URL` to Cloudflare Pages production secrets | 2026-05-14 |
| Google review CTA | Verify Google Business Profile and add real review URL/CID/Place ID | 2026-05-14 |
