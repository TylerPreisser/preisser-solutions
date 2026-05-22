# Agent Instructions

Read `WORKSPACE_SOURCE_OF_TRUTH.md` first.

The only active workspace is:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
```

Never work from the archived duplicate folders. Never deploy unless `pwd` is
exactly the canonical path above.

Cloudflare Pages is not Git-connected. Pushing to GitHub validates the site but
does not deploy production. Production deploys use Wrangler to upload the local
`out/` directory:

```bash
cd "/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
npx wrangler pages deploy out --project-name preisser-solutions
```
