# Preisser Solutions

Canonical source for `preissersolutions.com`.

Work only from:

```text
/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current
```

Cloudflare Pages is not Git-connected. GitHub push alone does not deploy
production. Build locally, validate, then deploy the local `out/` directory with
Wrangler.

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
npx wrangler pages deploy out --project-name preisser-solutions
```

See `WORKSPACE_SOURCE_OF_TRUTH.md` before changing source, committing, or
deploying.

Agent workflow lives in `docs/agent-operating-system.md`. It explains the
current Preisser Solutions PM/orchestration model, mobile/debug/theme principles,
documentation update loop, and Cloudflare deploy guardrails.
