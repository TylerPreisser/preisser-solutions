# Agent Instructions

Read `WORKSPACE_SOURCE_OF_TRUTH.md` and `docs/agent-operating-system.md` first.

The only active workspace is:

```text
/Users/tylerpreisser/Desktop/Preisser-Solutions-Current-Clean
```

Never work from the archived duplicate folders. Never deploy unless `pwd` is
exactly the canonical path above.

This is the Preisser Solutions website. Do not use stale prompt names, stale
workspace paths, or old website identities as active operating instructions.
Archived files may be read for principles only; rewrite those principles into
current Preisser Solutions docs before relying on them.

For non-trivial work, operate as the Preisser Solutions PM:

- Define the outcome and Definition of Done.
- Cartograph the owning files before editing.
- Identify mobile, SEO, Cloudflare, data, and documentation impact.
- Implement in the smallest responsible surface.
- Verify with evidence.
- Update active docs when source, deploy, route, or agent behavior changes.

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

Post-deploy verification:

```bash
npx wrangler pages deployment list --project-name preisser-solutions
curl -I https://preissersolutions.com
curl -I https://www.preissersolutions.com
curl -I https://preisser-solutions.pages.dev
```
