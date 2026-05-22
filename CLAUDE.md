# Preisser Solutions Operating Guide

This repository is the only active source for `preissersolutions.com`.

Read `WORKSPACE_SOURCE_OF_TRUTH.md` and `docs/agent-operating-system.md` before
doing meaningful work.

## Source Of Truth

- Canonical local path: `/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean`
- GitHub remote: `https://github.com/TylerPreisser/preisser-solutions.git`
- Main branch: `main`
- Cloudflare Pages project: `preisser-solutions`
- Production domains: `preissersolutions.com`, `www.preissersolutions.com`, `preisser-solutions.pages.dev`

Do not work from, commit from, or deploy from any other local Preisser Solutions folder.
Old folders were archived under:

`/Users/tylerpreisser/Desktop/preisser-site-archive-DO-NOT-USE-2026-05-22`

Archived memories, cartography, old prompt files, and copied project docs are
reference material only. Extract useful principles from them, but rewrite those
principles under this current Preisser Solutions identity and canonical path.

## Non-Negotiable Deploy Rule

Production deploys only happen from:

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
pwd
```

`pwd` must print exactly:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
```

Cloudflare Pages is not Git-connected. GitHub push alone does not deploy
production. Wrangler uploads the local `out/` directory.

## Validate

Run the full gate before any production deploy:

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
```

## Deploy

Deploy only after validation passes and only from the canonical folder:

```bash
npx wrangler pages deploy out --project-name preisser-solutions
```

Then verify:

```bash
npx wrangler pages deployment list --project-name preisser-solutions
curl -I https://preissersolutions.com
curl -I https://www.preissersolutions.com
curl -I https://preisser-solutions.pages.dev
```

## Project Shape

- Framework: Next.js 15 App Router, React 19, TypeScript, Tailwind v4.
- Output mode: static export. `npm run build` writes deployable files to `out/`.
- Source route count after cleanup: 232 `page.tsx` files.
- Sitemap URL count after cleanup: 232 canonical URLs.
- Legacy `/agents/*` URLs are redirect-only and live in `public/_redirects`.
- Cloudflare reads `wrangler.toml`, `public/_headers`, `public/_redirects`, and
  `functions/*`.

## Agent Workflow

- Start by confirming `pwd` is the canonical path.
- Read `WORKSPACE_SOURCE_OF_TRUTH.md`, `docs/agent-operating-system.md`,
  `docs/status.md`, `docs/deploy.md`, and `docs/plans/current-plan.md`.
- For content work, also read `docs/WRITER-AGENT-PROMPT.md` and
  `docs/CANONICAL-PROJECTS.md`.
- For UI work, also read `docs/design-system.md` and
  `docs/performance-audit.md`.
- Define the task's Definition of Done before editing.
- Inspect owning files with `rg` before changing source.
- Use existing repo patterns instead of reviving old prompt or workspace
  patterns blindly.
- Verify with the smallest responsible validation gate for the change, and run
  the full gate before deploy.

## Preserved Principles From Archived Memories

- Cartography first: locate routes, shared data, components, and Cloudflare files
  before changing them.
- PM discipline: break non-trivial work into atomic tasks, identify conflicts,
  and keep the critical path visible.
- Mobile discipline: favor CSS media queries, avoid hydration-sensitive mobile
  branching, keep tap targets at least 44px, and verify iOS Safari-sensitive
  viewport, backdrop, and touch behavior.
- Debug discipline: prove root cause with evidence, then fix the smallest owning
  surface.
- Theme discipline: use existing tokens and CSS variables instead of hardcoded
  parallel styling systems.
- Memory discipline: when a workflow fact changes, update the active docs and
  remove stale active instruction names.

## Cleanup Rules

- Do not re-add stale local workspaces, `.context` state files, copied output,
  unused placeholder assets, or old `/agents` route source.
- Do not restore GitHub Pages settings, `basePath`, or `assetPrefix`.
- Do not deploy from GitHub Actions. The workflow validates only.
- Keep `out/`, `.next/`, `node_modules/`, `.wrangler/`, `.context/`,
  `.claude/`, `.cursor/`, `next-env.d.ts`, and `*.tsbuildinfo` out of git.
- Read `WORKSPACE_SOURCE_OF_TRUTH.md` before starting any future task.
- Do not keep active agent files whose names imply an old website identity.
