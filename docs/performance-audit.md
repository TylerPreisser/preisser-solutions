# Performance And Cleanup Notes

Last updated: 2026-05-22.

## Source Of Truth

All performance work and cleanup must happen only in:

```text
/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current
```

Do not use any folder outside the canonical workspace as a performance baseline
unless Tyler explicitly asks for forensic comparison. Cloudflare Pages is not
Git-connected; GitHub push alone does not deploy production.

## Mobile Hero

Before the first fix, the mobile hero was doing three expensive things at once:

- Running a full-viewport canvas animation.
- Importing the hero GSAP timeline on touch devices.
- Letting visible Next `Link` CTAs prefetch `/contact`, `/products`, and
  `/case-studies` route data/scripts while the hero was active.

Current behavior:

- Mobile/coarse-pointer hero canvas draws once.
- Mobile hero text is shown immediately without GSAP.
- Hero CTAs are normal anchors.
- Local mobile preview dropped `/case-studies` CTA navigation from about 4.1s to
  about 0.8s.

## Mobile Navigation Root Cause

The deeper mobile failure was not just the hero canvas. The real stall came from
route work stacking up immediately after a tap:

- Next `Link` prefetches were still warming `/contact`, product detail routes,
  and case-study routes while the mobile browser was trying to navigate.
- The `/case-studies` hub passed every full case-study record into a client
  component, so the static HTML/RSC payload carried detail-page content that the
  hub did not need.
- The case-study hub imported Framer Motion only for entrance fades.
- Mobile hero text and CTAs defaulted to `opacity: 0` until client JS ran, which
  made a slow hydration path look like the site had failed to load.

Fixes now in place:

- Header, product-card, product-detail, service, case-study, and internal SEO
  links use `prefetch={false}` where eager route warming hurts mobile
  responsiveness.
- `/case-studies` now receives compact `CaseStudySummary` data instead of full
  detail data.
- The case-study hub no longer imports Framer Motion.
- Mobile hero headline, subtitle, and CTAs are visible in CSS before hydration.

Measured local results after the fix:

- `out/case-studies.html`: 238,385 bytes down to 121,786 bytes.
- `/case-studies` first-load JS: about 148 kB down to about 109 kB.
- Mobile browser taps to `/products` and `/case-studies`: about 1.34s each in
  local preview.
- No console errors, no horizontal overflow, and no homepage `// stack` nodes in
  a 390px check.

The live domain needs a Wrangler deploy from the canonical folder before any
local-only changes are visible in production.

## Bundle Notes

- Homepage first-load JS is still about 143 kB.
- Products hub is about 112 kB first-load JS.
- Case-study hub is about 109 kB first-load JS after the summary-data pass.
- Case-study detail pages are about 195 kB first-load JS.
- Location detail pages are about 202 kB first-load JS.

The next meaningful reduction is splitting animation-heavy client renderers for
locations and case studies.

## Cleanup Completed

- Removed non-canonical local workspaces from active use.
- Removed `/agents` source tree and kept redirects.
- Removed old top-level redirect-only route source.
- Removed the homepage `// stack` horizontal marquee and its animation CSS.
- Removed obsolete Stripe placeholder images.
- Removed unused UI/contact/service/about/AI layout stubs.
- Removed local cache/build artifacts from the copied clean source.

## Required Validation

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
```
