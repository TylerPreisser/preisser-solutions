# Preisser Solutions — Operating Guide

**What:** Marketing/lead-gen website for `preissersolutions.com` — Next.js 15 App
Router, React 19, TypeScript, Tailwind v4, static export deployed to Cloudflare
Pages. Repo `TylerPreisser/preisser-solutions`, branch `main`.

**Why it's built this way:** static export (`out/`) because Cloudflare Pages
serves it; Wrangler uploads that directory directly since Pages is **not
Git-connected** — a GitHub push alone never deploys production.

GitHub MCP and Context7 are connected globally; no per-repo MCP wiring is
needed for those. This is a UI repo — Playwright MCP is wired in `.mcp.json`.

## Canonical workspace

Only this path is active:
`/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current`

Do not work from, commit from, or deploy from any other local copy. Before any
deploy, `pwd` must print exactly that path.

## Build / test / lint / deploy

```bash
npm ci
npm run build          # next build && strip-404-noindex.mjs && generate-sitemap.mjs
npm run lint           # eslint . --max-warnings=0 (next/core-web-vitals)
npx tsc --noEmit
npm run validate:seo   # scripts/validate-seo.mjs
```

Full gate above must pass before any production deploy:

```bash
npx wrangler pages deploy out --project-name preisser-solutions
```

Post-deploy verification:

```bash
npx wrangler pages deployment list --project-name preisser-solutions
curl -I https://preissersolutions.com
curl -I https://www.preissersolutions.com
curl -I https://preisser-solutions.pages.dev
```

Never deploy from GitHub Actions — that workflow validates only.

## Key directories

- `src/app/` — one directory per route; static-export App Router pages (232
  `page.tsx` files as of last cleanup).
- `src/data/locations/` — one file per city, feeds the location-page generator
  (`scripts/regenerate-location-routes.mjs`); mirror this shape for new cities.
- `src/lib/seo/` — `metadata.ts`, `schema.ts`, `site.ts`: canonical SEO/schema
  helpers; use them instead of hand-rolling `<head>` metadata per page.
- `functions/` — Cloudflare Pages Functions (`api/contact.ts`,
  `_middleware.ts`, `mcp.ts`); `wrangler.toml` `[vars]` and `public/_headers`
  / `public/_redirects` are the other Cloudflare-read files.
- `docs/` — `agent-operating-system.md`, `deploy.md`, `status.md`,
  `design-system.md`, `site-map.md` are load-bearing; read before non-trivial
  work.

## Conventions and anti-patterns

- Legacy `/agents/*` URLs are redirect-only (`public/_redirects`) — do not
  restore old `/agents` route source, `basePath`, `assetPrefix`, or GitHub
  Pages settings.
- `CONTACT_FROM` / `CONTACT_TO` in `wrangler.toml` are intentionally
  version-controlled (reviewable sender identity); `RESEND_API_KEY` is an
  encrypted Pages secret and must never appear in that file.
- Keep `out/`, `.next/`, `node_modules/`, `.wrangler/`, `.context/`,
  `.claude/`, `.cursor/`, `next-env.d.ts`, `*.tsbuildinfo` out of git.
- Use existing design tokens/CSS variables (`docs/design-system.md`) instead
  of a parallel styling system.
- Favor CSS media queries over hydration-sensitive mobile branching; tap
  targets ≥44px; verify iOS Safari viewport/backdrop/touch behavior for
  mobile-affecting changes.
- Update the relevant `docs/*.md` when source, deploy, route, or agent
  behavior changes — stale active docs are worse than none.

## Decisions

`DECISIONS/` is the source of truth for settled intent; walk up to
`~/.claude-shared/DECISIONS/` for GLOBAL ADRs, which win on conflict. Accepted
ADRs are immutable — supersede with the next number, never edit. Conformance
to an Accepted ADR is never a defect; objections go in a non-blocking
"Decision Concerns" note citing the ADR.

## graphify

Knowledge graph at `graphify-out/`. For codebase questions, run
`graphify query "<question>"` first (or `graphify path`/`graphify explain`);
fall back to `graphify-out/GRAPH_REPORT.md` only for broad architecture
review. Run `graphify update .` after changing code.
