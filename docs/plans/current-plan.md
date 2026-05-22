# Current Plan

Last updated: 2026-05-22.

## Active Rule

All future work must happen only in:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
```

Cloudflare Pages is not Git-connected. GitHub push alone does not deploy
production. Production deploys use Wrangler from the canonical folder to upload
local `out/`.

## Completed Cleanup

- [x] Confirm the canonical clean source directory.
- [x] Inventory local Preisser Solutions folders.
- [x] Create the archive root before moving duplicates.
- [x] Rewrite canonical agent-facing operating docs.
- [x] Add a current Preisser Solutions agent operating system that integrates
  useful archived memory principles without stale identity or deploy references.
- [x] Preserve and quarantine stale local workspaces.
- [x] Align GitHub workflow to validation-only behavior.
- [x] Document that Cloudflare deployments cannot be individually deleted with a
  simple Wrangler command.

## Completed Site Work In Clean Source

- [x] Remove old route source, stale assets, local caches, and build output from
  git.
- [x] Remove `/agents` source pages while keeping Cloudflare redirects.
- [x] Remove the homepage `// stack` horizontal marquee.
- [x] Fix mobile hero animation and CTA navigation behavior.
- [x] Fix mobile route-load stack-up on `/products` and `/case-studies`.
- [x] Replace `next lint` with an ESLint CLI script.
- [x] Run a deeper JS bundle pass on the `/case-studies` hub.

## Active Follow-Ups

- [ ] Run a deeper JS bundle pass on `LocationPage` and `CaseStudyPage` detail
  views.
- [ ] Decide whether to keep all 78 location routes or consolidate another wave.
- [ ] Deploy from the canonical folder with Wrangler only after validation passes.
- [ ] Keep active agent memory filenames and prompts aligned with Preisser
  Solutions source-of-truth docs.

## Validation Gate

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
```

Deploy only from the same folder:

```bash
npx wrangler pages deploy out --project-name preisser-solutions
```
