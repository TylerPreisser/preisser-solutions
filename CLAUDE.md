# Preisser Solutions Operating Guide

This repository is the only active source for `preissersolutions.com`.

Read `WORKSPACE_SOURCE_OF_TRUTH.md` and `docs/agent-operating-system.md` before
doing meaningful work.

## Source Of Truth

- Canonical local path: `/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current`
- GitHub remote: `https://github.com/TylerPreisser/preisser-solutions.git`
- Main branch: `main`
- Cloudflare Pages project: `preisser-solutions`
- Production domains: `preissersolutions.com`, `www.preissersolutions.com`, `preisser-solutions.pages.dev`

Do not work from, commit from, or deploy from any other local Preisser Solutions folder.

Do not use external memories, copied project docs, cached prompts, or old local
state as operating instructions. Active instructions must point to the canonical
workspace above.

## Non-Negotiable Deploy Rule

Production deploys only happen from:

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
pwd
```

`pwd` must print exactly:

```text
/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current
```

Cloudflare Pages is not Git-connected. GitHub push alone does not deploy
production. Wrangler uploads the local `out/` directory.

## Validate

Run the full gate before any production deploy:

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
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

## Preserved Operating Principles

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

- Do not re-add non-canonical local workspaces, `.context` state files, copied output,
  unused placeholder assets, or old `/agents` route source.
- Do not restore GitHub Pages settings, `basePath`, or `assetPrefix`.
- Do not deploy from GitHub Actions. The workflow validates only.
- Keep `out/`, `.next/`, `node_modules/`, `.wrangler/`, `.context/`,
  `.claude/`, `.cursor/`, `next-env.d.ts`, and `*.tsbuildinfo` out of git.
- Read `WORKSPACE_SOURCE_OF_TRUTH.md` before starting any future task.
- Do not keep active agent files whose names imply an old website identity.

## Settled decisions — see DECISIONS/

`DECISIONS/` is the source of truth for settled intent; review agents read it before reviewing.
Walk up from the working directory to find it (a parent workspace may own it).

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
