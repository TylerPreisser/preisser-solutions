---
paths:
  - src/app/**
  - src/lib/seo/**
  - src/data/locations/**
  - public/llms.txt
  - public/llms-full.txt
  - public/robots.txt
  - public/ai.txt
  - scripts/validate-seo.mjs
  - scripts/generate-sitemap.mjs
---

# SEO / AI-discoverability validation

`scripts/validate-seo.mjs` (run via `npm run validate:seo`) enforces the
Phase 4 AI-native SEO upgrade directive and exits non-zero on any failure.
It checks, against the built `out/`:

- AI-discoverability root files exist in `public/` and are non-trivial:
  `llms.txt`, `llms-full.txt`, `robots.txt`, `ai.txt` (each must be >100
  chars).
- The sitemap contains every required route (e.g. `/`, `/about`, `/contact`,
  `/case-studies`, …).
- Every page has title, meta description length, canonical URL, an `h1`,
  JSON-LD, and an internal `/contact` link.

Use `src/lib/seo/metadata.ts`, `schema.ts`, and `site.ts` for page metadata
and structured data instead of hand-rolling `<head>` tags per page — that is
what keeps pages passing the validator without per-page bespoke logic.

New routes under `src/app/` and new entries in `src/data/locations/` must
satisfy the validator before merge; run `npm run build && npm run
validate:seo` locally rather than discovering a failure at deploy time.
