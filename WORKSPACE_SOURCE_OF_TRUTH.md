# Workspace Source Of Truth

Last updated: 2026-05-22.

## Canonical Workspace

The only active local workspace for Preisser Solutions is:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
```

Future agents must not work from any other local copy. Before changing files,
committing, validating, or deploying, run:

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
pwd
```

`pwd` must print exactly:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
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
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
```

## Deploy Command

Deploy only from the canonical folder:

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
npx wrangler pages deploy out --project-name preisser-solutions
```

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
- Production deployments listed: 1
- Preview deployments listed: 0
- Current live deployment: the single production deployment returned by
  `npx wrangler@latest pages deployment list --project-name preisser-solutions --json`
- Current live source: the latest pushed `main` commit deployed from this
  canonical workspace

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
