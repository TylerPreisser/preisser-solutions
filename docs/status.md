# Project Status

Last updated: 2026-05-22.

## Source Of Truth

- Only active workspace: `/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean`.
- No other local folder is active for this site.
- Production target: Cloudflare Pages project `preisser-solutions`.
- Production deployment model: Wrangler uploads local `out/`.
- Cloudflare Pages is not Git-connected. GitHub push alone does not deploy
  production.
- Never deploy unless `pwd` is exactly
  `/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean`.

## Current Snapshot

- Build status: `npm run build` passed on 2026-05-22.
- Lint status: `npm run lint` passed on 2026-05-22.
- Type status: `npx tsc --noEmit` passed on 2026-05-22.
- SEO validation: `npm run validate:seo` passed on 2026-05-22 with 144
  checks passed and 0 failed.
- Source routes: 231 `page.tsx` files.
- Route handlers: 0 `route.ts` / `route.tsx` files.
- Sitemap URLs: 231 canonical URLs.
- Generated pages: 234 static pages including framework support output.
- Public image payload: about 2.9 MB after removing unused Stripe and placeholder
  assets.

## What Changed On 2026-05-22

- Established `/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean` as
  the sole active source.
- Removed non-canonical local workspaces from active use.
- Removed old `.context` cartography/state/deploy-checklist files from the repo.
- Rewrote agent-facing operating docs so future agents use one source, one
  deployment path, and one current Preisser Solutions identity.
- Added `docs/agent-operating-system.md` so every future agent sees the current
  Preisser Solutions operating model, canonical path, and deploy guardrails.
- Removed unrelated separate-company references from active site content,
  active repo docs, generated output, and active Claude/Codex/Cursor instruction
  state.
- Archived and deleted the stale `seo-local-growth-system` local/GitHub branch
  after confirming it carried obsolete source and instruction state.
- Deleted old Cloudflare Pages deployments for `preisser-solutions`; Cloudflare
  now lists one production deployment and zero preview deployments.
- Fixed mobile hero CTA stalls:
  - Hero canvas now draws once on mobile/coarse-pointer devices.
  - Hero GSAP entrance animation is skipped on mobile.
  - Hero CTAs are normal anchors so `/products` and `/case-studies` no longer
    prefetch heavy route bundles while the hero is active.
- Fixed the deeper mobile route-load failure:
  - Disabled eager prefetch on header, product, service, case-study, and SEO links
    where it caused route work to stack up during mobile taps.
  - Replaced full case-study detail payloads on `/case-studies` with compact
    summaries.
  - Removed Framer Motion from the case-study hub and made mobile hero text/CTAs
    visible before hydration.
- Aligned cloud-facing files:
  - `/mcp` tool name is `preisser_solutions_start_inquiry`.
  - MCP handoff email matches `tyler@preissersolutions.com`.
  - GitHub workflow validates the Cloudflare build instead of deploying to GitHub
    Pages.
  - `next.config.ts` no longer supports the old GitHub Pages base path.
- Removed copied bloat:
  - `/agents` source pages, old agent components, and old agent data. Redirects
    remain.
  - Top-level legacy route source for paths already handled by Cloudflare
    redirects.
  - Obsolete Stripe placeholder assets and old placeholder image files.
  - Unused stub components and old unused data files.
  - Homepage `// stack` horizontal marquee and its old component/CSS path.

## Required Gate

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
```

Deploy only after the gate passes:

```bash
npx wrangler pages deploy out --project-name preisser-solutions
```

## Remaining Watch Items

- Run a deeper JS bundle pass on `LocationPage` and `CaseStudyPage` detail views.
- Decide whether to keep all 78 location routes or consolidate another wave.
- Do not delete/recreate the active Cloudflare Pages project without Tyler's
  explicit confirmation.
- Keep Cloudflare Pages deployment history pruned to the current production
  deployment after each intentional Wrangler upload.
- Keep active Claude/Codex/Cursor instruction files aligned with
  `docs/agent-operating-system.md` whenever agent workflows change.
