# Deploy

Production deploys use Cloudflare Pages through Wrangler, and only from the
canonical local workspace:

```text
/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current
```

Cloudflare Pages is not Git-connected. GitHub push alone does not deploy
production. Wrangler uploads the local `out/` directory.

Read `WORKSPACE_SOURCE_OF_TRUTH.md` and `docs/agent-operating-system.md` before
deploying. Do not use any other deploy checklist.

## Required Working Directory

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
pwd
```

Do not deploy unless `pwd` prints exactly:

```text
/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current
```

## Validate

```bash
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
```

## Deploy

```bash
npx wrangler pages deploy out --project-name preisser-solutions
```

## Post-Deploy Verify

```bash
npx wrangler pages deployment list --project-name preisser-solutions
curl -I https://preissersolutions.com
curl -I https://www.preissersolutions.com
curl -I https://preisser-solutions.pages.dev
```

After a successful replacement deployment, delete any superseded production or
preview deployments and leave only the current production deployment listed.

## Important Files

- `wrangler.toml` - Cloudflare Pages output directory.
- `public/_redirects` - legacy URL consolidation.
- `public/_headers` - cache, crawler, discovery, and content-type headers.
- `functions/_middleware.ts` - host canonicalization and AI-agent response handling.
- `functions/mcp.ts` - MCP JSON-RPC endpoint.
- `public/.well-known/*` - agent discovery and metadata files.

## GitHub

The GitHub workflow validates the Cloudflare build. It does not deploy to GitHub
Pages, does not deploy to Cloudflare, and does not set a GitHub Pages `basePath`.

## Cloudflare Deployment Cleanup

As of 2026-05-22, old Cloudflare Pages deployments for `preisser-solutions` were
deleted. The expected state is one production deployment and zero preview
deployments.

Current live deployment:

```text
The single production deployment returned by:
npx wrangler@latest pages deployment list --project-name preisser-solutions --json
```

If stale deployments appear again, delete only non-current deployments:

```bash
npx wrangler@latest pages deployment delete DEPLOYMENT_ID --project-name preisser-solutions --force
```

Do not delete the current live deployment. Do not delete or recreate the
`preisser-solutions` Pages project unless Tyler explicitly asks for full project
deletion.
