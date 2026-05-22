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
- GitHub Actions: validation only. GitHub push does not deploy production.

## Route Count

- Source routes: 232 `page.tsx` files.
- Route handlers: 0 `route.ts` / `route.tsx` files.
- Canonical sitemap URLs: 232.
- Generated static pages: 235 including framework support output.

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

`npx wrangler pages deployment list --project-name preisser-solutions` confirms
multiple production deployments exist. Wrangler can list deployments but does not
provide a simple individual deployment delete command. The destructive way to
wipe deployment history is deleting and recreating the Pages project. That was
not performed because Tyler must explicitly confirm project deletion first.

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
