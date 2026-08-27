# ADR-0001: Adopt the MIP infra baseline (CLAUDE.md, path-scoped rules, REVIEW.md, plans/) in this repo
Status: Accepted — 2026-08-26 (MIP phase-5 rollout, GLOBAL ADR-0007) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- GLOBAL ADR-0007 (Master Infrastructure Prompt, `~/.claude-shared/DECISIONS/`) governs every
  Claude Code session on this machine as of 2026-08-26.
- Tyler chose "All repos incl. client" as the rollout scope for the MIP build on 2026-08-26 —
  this repo is a client-facing production site (`preissersolutions.com`) and is in scope under
  that choice, not carved out as an exception.
- This repo already had a partial agent-kit setup (`.claude/`, `DECISIONS/README.md`,
  `DECISIONS/0000-template.md`, hooks for live-deploy blocking and ADR/secret protection) but no
  numbered ADR yet, and no `.claude/rules/`, `REVIEW.md`, or `plans/` directory.

## Decision
1. This repo adopts the standard MIP baseline: root `CLAUDE.md` rewritten to the WHAT/WHY/HOW
   spec (preserving every existing deploy/contact/ADR/cleanup fact), path-scoped
   `.claude/rules/*.md` for SEO/content, Cloudflare Functions, and frontend conventions,
   `REVIEW.md` as the review evidence bar, and `plans/ACTIVE.md` + `thoughts/` stubs.
2. Because this is a UI repo, `.mcp.json` gains a pinned Playwright MCP server entry
   (`/Users/tylerpreisser/.npm-global/bin/playwright-mcp`) merged non-destructively.
3. Nothing about the site's deploy process, ADR immutability rule, or hook enforcement changes —
   this ADR records adoption of the surrounding scaffolding only.

## Consequences
- Future sessions read `CLAUDE.md` + `.claude/rules/` for repo conventions instead of
  re-deriving them; review agents read `REVIEW.md` for this repo's evidence bar.
- Review agents must not flag the new files themselves (structure, presence) as defects.

## Open / not yet decided
- Whether this repo's existing `docs/decisions.md` (separate from `DECISIONS/`) should be
  merged or retired is not addressed here.

## Revisit criteria
- A change to GLOBAL ADR-0007's rollout scope, or a maintainer request to opt this repo out.

## Sources
- GLOBAL ADR-0007, `~/.claude-shared/DECISIONS/` (MIP build 2026-08-26)
- Rollout brief dispatched to this worker, MIP phase 5, 2026-08-26
