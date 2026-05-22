# Preisser Solutions Agent Operating System

Last updated: 2026-05-22.

This is the operating guide for future agents working on the Preisser Solutions
website. It is the active instruction surface for the current canonical
workspace only.

## Non-Negotiable Identity

This is the Preisser Solutions website.

The only active local workspace is:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
```

Do not work from any other local folder, copied clean room, memory cache, or
agent cache path.

Before reading, editing, committing, validating, or deploying:

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
pwd
```

`pwd` must print exactly:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
```

## Session Start Protocol

At the start of any meaningful task, read these files in order:

1. `WORKSPACE_SOURCE_OF_TRUTH.md`
2. `CLAUDE.md`
3. `AGENTS.md`
4. `docs/status.md`
5. `docs/plans/current-plan.md`
6. `docs/deploy.md`
7. `docs/design-system.md` when UI, styling, animation, or layout is involved
8. `docs/CANONICAL-PROJECTS.md` before any content claim about past work

If a file outside that list contradicts the canonical path, Cloudflare deploy
model, route count, or brand identity, treat the outside file as stale until it
is deliberately rewritten.

## PM And Orchestration Principles

For non-trivial tasks, operate as a Preisser Solutions PM before editing:

- Define the actual requested outcome and the Definition of Done.
- Identify affected routes, components, data files, Cloudflare files, and docs.
- Map dependencies and the critical path before parallelizing work.
- Split work into small tasks only when parallel work will not create conflicting
  edits.
- Keep Tyler's current instruction as the source of truth when old memory files
  disagree.
- Ask questions only when the answer cannot be discovered locally and a wrong
  assumption would create real risk.

Useful specialist roles to emulate:

- Codebase cartographer: locate the owning files and existing patterns.
- Web code executor: implement tightly scoped code changes.
- UI mobile reviewer: verify iOS, Android, touch targets, viewport units, and
  no desktop regression.
- Web code debugger: prove the root cause with evidence before changing code.
- Documentation keeper: update status, plan, deploy notes, and source-of-truth
  docs whenever the workflow changes.

## Implementation Principles

- Inspect before editing. Use `rg` and existing local patterns first.
- Keep static export constraints in mind. `npm run build` writes production
  assets to `out/`.
- Keep content in typed data files when that is the established pattern.
- Keep components presentational where the repo already does that.
- Use `@/*` imports and the current TypeScript/Tailwind conventions.
- Do not restore non-canonical `.context`, `.claude`, `.cursor`, copied output, old
  placeholder assets, GitHub Pages settings, `basePath`, or `assetPrefix`.
- Do not revive old route source that exists only to be redirected by
  Cloudflare.
- Preserve user changes. Do not reset or revert unrelated work.

## Mobile And Frontend Principles

- Prefer CSS media queries for responsive layout. Avoid rendering different DOM
  trees solely from JavaScript mobile detection.
- Keep mobile breakpoints consistent with the repo's existing CSS and components.
- Use `dvh`, `svh`, or safe-area handling for full-height mobile surfaces where
  browser chrome matters.
- Touch targets should be at least 44px on mobile.
- Use `touch-action: manipulation` and transparent tap highlights where useful
  for tappable controls.
- Be careful with `position: fixed`, `backdrop-filter`, and nested
  `overflow: hidden` on iOS Safari.
- Avoid eager route prefetch on mobile links when it causes navigation work to
  stack up.
- Above-the-fold mobile content should be visible before hydration.
- If animation is involved, respect `prefers-reduced-motion` and avoid heavy
  transforms on small screens unless verified.

## Debug And QA Principles

- Diagnose root cause, not just symptoms.
- Compare before and after with concrete evidence: build output, console output,
  route sizes, screenshots, browser checks, curl headers, or generated files.
- Check for orphaned imports, unused components, stale data paths, and accidental
  dead code after refactors.
- When UI changes are meaningful, verify at desktop and mobile viewports.
- When Cloudflare behavior changes, verify headers, redirects, middleware, and
  public discovery files.

## Theme And Design Principles

- Use the repo's design tokens and CSS variables. Do not invent a parallel theme
  system.
- Prefer existing token families and utility patterns over hardcoded colors.
- Hardcoded brand accents are acceptable only when they are intentionally part of
  the brand surface.
- Do not add decorative systems that fight the site's restrained consultancy
  tone.
- Keep copy specific, company-first, and free of fabricated claims.

## Cloudflare And Deploy Principles

Cloudflare Pages project:

```text
preisser-solutions
```

Production domains:

```text
preissersolutions.com
www.preissersolutions.com
preisser-solutions.pages.dev
```

Cloudflare Pages is not Git-connected. GitHub push alone does not deploy
production. Production deploys happen only when Wrangler uploads the local
`out/` directory from the canonical workspace.

Required validation before any production deploy:

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
```

Deploy command:

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

Do not delete or recreate the Cloudflare Pages project without Tyler explicitly
confirming project deletion after domains, settings, redirects, headers,
functions, environment variables, and the replacement deployment plan are
recorded.

## Documentation And Memory Rules

Update docs when the agent-facing reality changes:

- `WORKSPACE_SOURCE_OF_TRUTH.md` for source, deploy, route count, and
  Cloudflare facts.
- `CLAUDE.md` and `AGENTS.md` for operating instructions.
- `docs/status.md` for what changed and what remains.
- `docs/plans/current-plan.md` for current work and follow-ups.
- `docs/deploy.md` for deployment behavior.
- `docs/decisions.md` for significant architectural or workflow decisions.

Do not keep active instruction files with stale names or non-canonical paths.
If a useful principle is discovered, rewrite it under the current Preisser
Solutions identity and canonical workspace.

## Definition Of Done

A task is done when:

- Changes were made only in the canonical workspace or deliberately updated
  active agent memory.
- No non-canonical path was used as source.
- Validation appropriate to the change passed.
- Docs and memory were updated if workflow, deploy, source, or agent behavior
  changed.
- Git status is understood.
- Any production deploy, if requested, used Wrangler from the canonical folder
  and was verified afterward.
