---
paths:
  - wrangler.toml
  - next.config.ts
  - package.json
  - functions/**
  - public/_headers
  - public/_redirects
  - scripts/**
---

# Cloudflare Pages deploy gate

Cloudflare Pages (`preisser-solutions`) is **not Git-connected** — a GitHub
push alone never deploys production. Wrangler uploads the static-export `out/`
directory directly (`wrangler.toml`: `pages_build_output_dir = "./out"`).

Before any production deploy, the full gate must pass, in order:

```bash
npm ci
npm run build          # next build && strip-404-noindex.mjs && generate-sitemap.mjs
npm run lint           # eslint . --max-warnings=0
npx tsc --noEmit
npm run validate:seo   # scripts/validate-seo.mjs
```

Then, from the canonical workspace path only:

```bash
npx wrangler pages deploy out --project-name preisser-solutions
```

Post-deploy, verify with `wrangler pages deployment list --project-name
preisser-solutions` and `curl -I` against `preissersolutions.com`,
`www.preissersolutions.com`, and `preisser-solutions.pages.dev`.

Never deploy from GitHub Actions — that workflow validates only, it does not
push to Pages.

`CONTACT_FROM` / `CONTACT_TO` in `wrangler.toml` `[vars]` are intentionally
version-controlled; `RESEND_API_KEY` is an encrypted Pages secret and must
never be added to that file.
