# Proposal Quality Bar

Every generated proposal page must pass this checklist before it is sent.

## Privacy

- URL is hard to guess: `/proposals/[company-slug]-[4-char-suffix]`.
- No proposal index page exists.
- Metadata has `noindex, nofollow`.
- `robots.txt` contains `Disallow: /proposals/`.
- Page is not added to `sitemap.xml`.

## Design

- Looks native to `preissersolutions.com`.
- Uses existing spacing, typography, button, card, tile, and section patterns.
- Does not introduce a separate visual language.
- Mobile layout is clean.
- Text does not overflow buttons/cards.
- No oversized marketing landing page fluff.

## Copy

- Problem recap proves the sales call was heard.
- Pricing is locked and explicit.
- Recommended package is clearly highlighted.
- Add-ons match only what was quoted.
- ROI math uses defaults when intake is incomplete.
- Founder voice sounds like Tyler, not an agency.

## Technical

- `npm run build` passes.
- Static export still works.
- New route is reachable locally.
- No unrelated files are changed.
- Generated page has the full URL in the final report.

## Final Agent Report

The coding agent must report:

1. Files created or changed.
2. Full proposal URL.
3. Pricing summary.
4. Any ambiguity Tyler should check before sending.
5. Whether deployment is needed.
