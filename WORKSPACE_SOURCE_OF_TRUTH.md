# Workspace Source Of Truth

Last updated: 2026-05-22.

## Canonical Workspace

The only active local workspace for Preisser Solutions is:

```text
/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current
```

Future agents must not work from any other local copy. Before changing files,
committing, validating, or deploying, run:

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
pwd
```

`pwd` must print exactly:

```text
/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current
```

Agent operating guide:

```text
docs/agent-operating-system.md
```

Future agents must treat any instruction that points somewhere else as
non-authoritative. Active work, validation, commits, and deploys happen only from
the canonical workspace above.

## GitHub

- Remote: `https://github.com/TylerPreisser/preisser-solutions.git`
- Active branch: `main`
- Branch policy: use `main` for the canonical clean source. Do not revive stale
  local branches or old workspaces as source-of-truth branches unless Tyler
  explicitly asks.
- Branch cleanup: stale branch `seo-local-growth-system` was bundled to the
  archive and removed from local Git and GitHub on 2026-05-22.
- GitHub Actions: validation only. GitHub push does not deploy production.

## Route Count

- Source routes: 231 `page.tsx` files.
- Route handlers: 0 `route.ts` / `route.tsx` files.
- Canonical sitemap URLs: 231.
- Generated static pages: 234 including framework support output.

## Archived Local Workspaces

Archive root:

```text
/Users/tylerpreisser/Desktop/preisser-site-archive-DO-NOT-USE-2026-05-22
```

Archived duplicate website workspaces:

- `/Users/tylerpreisser/Documents/New project/preisser-solutions`
- `/Users/tylerpreisser/Desktop/Preisser Solutions`
- `/Users/tylerpreisser/Desktop/Preisser-Solutions-Clean`
- `/Users/tylerpreisser/Desktop/preisser-solutions-clean-room`

Archived Git branch bundle:

- `/Users/tylerpreisser/Desktop/preisser-site-archive-DO-NOT-USE-2026-05-22/git-branch-archives/seo-local-growth-system-2026-05-22.bundle`

Inventory reports are in:

- `/Users/tylerpreisser/Desktop/preisser-site-archive-DO-NOT-USE-2026-05-22/reports/local-folder-inventory.md`
- `/Users/tylerpreisser/Desktop/preisser-site-archive-DO-NOT-USE-2026-05-22/reports/agent-facing-cleanup.md`
- `/Users/tylerpreisser/Desktop/preisser-site-archive-DO-NOT-USE-2026-05-22/reports/cloudflare-pages-inventory.md`

## Cloudflare Pages

- Project: `preisser-solutions`
- Domains: `preissersolutions.com`, `www.preissersolutions.com`,
  `preisser-solutions.pages.dev`
- Cloudflare Pages is not Git-connected for production deploys.
- Wrangler uploads the local `out/` directory.
- Do not delete/recreate the Cloudflare Pages project without Tyler explicitly
  confirming project deletion after settings, domains, redirects, headers,
  functions, and replacement deployment steps are recorded.

## Validation Command

Run the full gate before any production deploy:

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
```

## Deploy Command

Deploy only from the canonical folder:

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
npx wrangler pages deploy out --project-name preisser-solutions --branch main
```

`--branch main` is REQUIRED for a production deploy. Wrangler otherwise stamps
the deployment with the current git branch, and Cloudflare files any branch that
is not `main` as a **Preview** deployment: the upload succeeds, wrangler exits 0,
and `preissersolutions.com` keeps serving the previous production build. This
happened on 2026-09-04 (deployment `9c173db9`, Preview, branch
`feature/mobile-and-marcommand-overhaul`) and was caught only by diffing the
live apex HTML against local `out/index.html`. Exit code 0 is not proof of a
production release.

Then verify:

```bash
npx wrangler pages deployment list --project-name preisser-solutions
curl -I https://preissersolutions.com
curl -I https://www.preissersolutions.com
curl -I https://preisser-solutions.pages.dev
```

## Cloudflare Cleanup Result

`npx wrangler pages project list` confirms `preisser-solutions` has Git Provider
`No` and the domains `preisser-solutions.pages.dev`, `preissersolutions.com`,
and `www.preissersolutions.com`.

On 2026-05-22, old Cloudflare Pages deployments for this project were deleted
with current Wrangler deployment deletion support. The Cloudflare Pages project
itself was preserved.

Current expected deployment state:

- Project: `preisser-solutions`
- Current live production deployment: `618f82f8` (deployed 2026-09-04), which
  serves Next.js `BUILD_ID = mx-0H1WmgLJlecK060PZR`
- Verified live on 2026-09-04: `https://preissersolutions.com` returns HTTP/2 200
  and its homepage HTML contains that BUILD_ID, zero `ps-caps`, zero em dashes,
  and `.ps-hero{min-height:100svh}` with zero `100dvh`. `www.` and
  `preisser-solutions.pages.dev` both 301 to the apex.
- Current live source: uncommitted working tree on branch
  `feature/mobile-and-marcommand-overhaul`, uploaded from local `out/` with
  `--branch main`. NOTE: production is therefore ahead of any committed `main`
  commit; the shipped source exists only in this workspace until it is committed.
- Deployment list now contains both Production and Preview entries (the earlier
  "Production 1 / Preview 0" expectation no longer holds).

Do not delete the current live deployment. Do not delete or recreate the Pages
project unless Tyler explicitly asks for full project deletion.

Cloudflare source files confirmed in this workspace:

- `wrangler.toml`
- `public/_redirects`
- `public/_headers`
- `functions/_middleware.ts`
- `functions/mcp.ts`

## Warnings

- No local folder except the canonical workspace may be used for this site.
- GitHub push alone does not deploy production.
- Cloudflare deploys only come from Wrangler uploading local `out/`.
- Never deploy unless `pwd` is exactly the canonical workspace path.
- Active agent files must not carry stale website-PM names or stale deploy
  commands.
