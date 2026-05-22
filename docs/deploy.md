# Deploy

Production deploys use Cloudflare Pages through Wrangler, and only from the
canonical local workspace:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
```

Cloudflare Pages is not Git-connected. GitHub push alone does not deploy
production. Wrangler uploads the local `out/` directory.

Read `WORKSPACE_SOURCE_OF_TRUTH.md` and `docs/agent-operating-system.md` before
deploying. Do not use archived deploy checklists except as historical reference.

## Required Working Directory

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
pwd
```

Do not deploy unless `pwd` prints exactly:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
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

## Cloudflare Project Deletion

Wrangler can list deployments but does not provide a simple individual deployment
delete command. Wiping Cloudflare deployment history requires deleting and
recreating the Pages project. Do not delete the `preisser-solutions` Pages
project unless Tyler explicitly confirms project deletion after domains,
settings, redirects, headers, functions, and the replacement deployment plan are
recorded.
