# Preisser Solutions — Operating Guide

**What:** Marketing/lead-gen website for `preissersolutions.com` — Next.js 15 App
Router, React 19, TypeScript, Tailwind v4, static export deployed to Cloudflare
Pages. Repo `TylerPreisser/preisser-solutions`
(`https://github.com/TylerPreisser/preisser-solutions.git`), branch `main`,
Pages project `preisser-solutions`. Production domains: `preissersolutions.com`,
`www.preissersolutions.com`, `preisser-solutions.pages.dev`.

**Why it's built this way:** static export (`out/`) because Cloudflare Pages
serves it; Wrangler uploads that directory directly since Pages is **not
Git-connected** — a GitHub push alone never deploys production.

GitHub MCP and Context7 are connected globally; no per-repo MCP wiring is
needed for those. This is a UI repo — Playwright MCP is wired in `.mcp.json`.

## Canonical workspace

Only this path is active:
`/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current`

Do not work from, commit from, or deploy from any other local copy. Before any
deploy, `pwd` must print exactly that path. Do not use external memories, copied
project docs, cached prompts, or old local state as operating instructions —
active instructions must point at the canonical workspace above.

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
  `page.tsx` files as of last cleanup, and 232 canonical URLs in the sitemap —
  the two counts must stay in step).
- `src/data/locations/` — one file per city, feeds the location-page generator
  (`scripts/regenerate-location-routes.mjs`); mirror this shape for new cities.
- `src/lib/seo/` — `metadata.ts`, `schema.ts`, `site.ts`: canonical SEO/schema
  helpers; use them instead of hand-rolling `<head>` metadata per page.
- `functions/` — Cloudflare Pages Functions (`api/contact.ts`,
  `_middleware.ts`, `mcp.ts`); `wrangler.toml` `[vars]` and `public/_headers`
  / `public/_redirects` are the other Cloudflare-read files.
- `docs/` — `agent-operating-system.md`, `deploy.md`, `status.md`,
  `design-system.md`, `site-map.md` are load-bearing; read before non-trivial
  work. Also `docs/plans/current-plan.md`; for content work
  `docs/WRITER-AGENT-PROMPT.md` + `docs/CANONICAL-PROJECTS.md`; for UI work
  `docs/performance-audit.md`.
- `WORKSPACE_SOURCE_OF_TRUTH.md` (repo root) — read it before starting any task.

## Agent workflow

- Confirm `pwd` is the canonical path, then read `WORKSPACE_SOURCE_OF_TRUTH.md`
  and `docs/agent-operating-system.md`.
- Define the task's Definition of Done before editing.
- **Cartography first:** locate the owning routes, shared data, components, and
  Cloudflare files with `rg` before changing any source.
- **PM discipline:** break non-trivial work into atomic tasks, name the
  conflicts, keep the critical path visible.
- **Debug discipline:** prove root cause with evidence, then fix the smallest
  owning surface.
- **Memory discipline:** when a workflow fact changes, update the active docs and
  delete stale active instruction names. Do not keep active agent files whose
  names imply an old website identity.
- Verify with the smallest responsible validation gate for the change; run the
  full gate before deploy.

## Conventions and anti-patterns

- Legacy `/agents/*` URLs are redirect-only (`public/_redirects`) — do not
  restore old `/agents` route source, `basePath`, `assetPrefix`, or GitHub
  Pages settings.
- `CONTACT_FROM` / `CONTACT_TO` in `wrangler.toml` are intentionally
  version-controlled (reviewable sender identity); `RESEND_API_KEY` is an
  encrypted Pages secret and must never appear in that file.
- Keep `out/`, `.next/`, `node_modules/`, `.wrangler/`, `.context/`,
  `.claude/`, `.cursor/`, `next-env.d.ts`, `*.tsbuildinfo` out of git. Do not
  re-add non-canonical local workspaces, `.context` state files, copied build
  output, or unused placeholder assets.
- Use existing design tokens/CSS variables (`docs/design-system.md`) instead
  of a parallel styling system.
- Favor CSS media queries over hydration-sensitive mobile branching; tap
  targets ≥44px; verify iOS Safari viewport/backdrop/touch behavior for
  mobile-affecting changes.
- Update the relevant `docs/*.md` when source, deploy, route, or agent
  behavior changes — stale active docs are worse than none.

## Decisions

`DECISIONS/` is the source of truth for settled intent; review agents read it before reviewing.
Walk up from the working directory to find it (a parent workspace may own it); `~/.claude-shared/DECISIONS/` holds GLOBAL ADRs, which win on conflict.

- **Conformance to an Accepted ADR is NEVER a defect.** Do not "fix", re-add, or recommend re-adding what an ADR removed.
- **If you believe a settled decision is wrong, DO NOT change code or file a bug** — put a note under "Decision Concerns" in your review output citing the ADR number. Nothing more.
- **Accepted ADRs are immutable — supersede, never edit.** New decision = next number; the old file gets one line: `Status: Superseded by ADR-000N`.
- Deterministic gates live in `.claude/hooks/` (live-deploy block, ADR/secret protection); this file is advisory, the hooks are not.

### Record decisions as they happen — do not wait to be asked
When the owner settles a question, WRITE THE ADR IMMEDIATELY as `Status: Accepted`, then say in
one line what you recorded and its number. Do not ask permission first.
- **Settled** = he picks between real alternatives, reverses something previously settled, or
  rules a course of action in or out. Architecture, libraries, schemas, boundaries, security
  posture, scope, workflow and tooling all count.
- **Not settled** = task direction ("fix this bug"), questions, thinking aloud, an option still
  being weighed. If he has not landed on it, there is nothing to record.
- Next free `NNNN`, never reused; start from `DECISIONS/0000-template.md`. Quote what he actually
  said and cite where. Say under "Open / not yet decided" what the ADR does NOT settle.
- A wrong capture is fixed by SUPERSEDING, not editing (that write needs `ADR_SUPERSEDE=1`).
- `/decide` forces a capture on demand; the rule above is automatic and does not need it.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Browser + viewport matrix — binding on every viewer/audit agent

Any agent that screenshots, visually reviews, or QAs a rendered page sweeps **all four engines and
all fourteen viewports**, and reports every finding with its engine and viewport named. A pass that
covers one engine at three widths is not a pass. Four consecutive single-engine passes on the sister
project reported a page clean that the owner called "horrible".

**Engines.** `chromium`, `webkit`, `firefox` via Playwright — import by ABSOLUTE path from this
repo's `node_modules/playwright`. **Python Playwright is NOT installed on this machine.** Plus
**real Safari**, via `scratchpad/safari-harness/safari-shots.mjs` (selenium-webdriver + safaridriver;
Safari > Settings > Developer > "Allow remote automation" must stay ticked).

**Playwright's WebKit is not Safari.** No dynamic toolbar, no real safe-area insets, different
`vh`/`svh`/`lvh`/`dvh` behaviour, no rubber-banding, and **it does not composite `backdrop-filter`
at all** — so it both misses and overstates defects. Where the two disagree, real Safari wins.

**Viewports.** 320×568 · 360×640 · 375×667 · 390×844 · 393×659 · 393×852 · 414×896 · 430×932 ·
768×1024 · 820×1180 · 1024×768 · 1280×800 · 1440×900 · 1920×1080. `deviceScaleFactor: 3` and
`hasTouch`/`isMobile` on phones. Both themes at every size. Sweep both sides of breakpoint
boundaries — **639/640/641 and 939/940/941** change the bento grid's column count.
**393×659 and 393×852 are the same phone with Safari's toolbar collapsed vs expanded** — include
both or viewport-unit bugs stay hidden.

**Traps that have produced falsely-green passes here. All of these actually happened:**
- Measuring instead of looking. **Read every screenshot with the Read tool and say what you saw.**
  A contrast probe scored a corner 14.32:1 while the glyph was invisible navy-on-navy; a fill probe
  reported 106% for every card while one had a dead bottom third; a sprite probe read 0.0px while
  the artwork floated, because it sampled the bounding box.
- `data-theme` set via `addInitScript` is **overwritten by `layout.tsx`** — set it post-load and
  assert the background actually changed before trusting a "dark" run.
- `scroll-behavior: smooth` on `<html>` means probing scroll right after a click or Tab samples
  mid-animation and makes working navigation look broken.
- Programmatic `.focus()` does not match `:focus-visible` — walk with real Tab.
- `grep -c` on `out/index.html` returns 1 because the file is 14 lines. Use `grep -o … | wc -l`.
- **Fingerprint the served build by asset hash before measuring.** Port 8912 is squatted by a server
  that fails to bind *silently*, and orphaned `next start` processes from deleted worktrees have
  answered 200 on 9004/9005/9006 with foreign builds.
