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

## The deploy command

`--branch main` is **REQUIRED**. The canonical command is:

```bash
npx wrangler pages deploy out --project-name preisser-solutions --branch main
```

Without the flag, Wrangler stamps the deployment with the *current git branch*,
and Cloudflare files any branch that is not `main` as a **Preview** deployment.
The upload succeeds, Wrangler exits 0, prints a deployment id and a working
`*.pages.dev` URL — and `preissersolutions.com` keeps serving the previous
production build. There is no error to notice.

This bit the project on **2026-09-04**: deployment `9c173db9`, Environment
`Preview`, branch `feature/mobile-and-marcommand-overhaul`, and it was caught
only by diffing the live apex HTML against local `out/index.html`. It is still
visible in `wrangler pages deployment list` today. See
`WORKSPACE_SOURCE_OF_TRUTH.md:113-120`.

**Exit code 0 is not proof of a production release.**

## Build from a clean git export, not from the working tree

Build the upload directory from a clean `git archive` export of the commit you
intend to ship, not from the live working tree:

```bash
mkdir -p /tmp/ps-deploy && git archive <commit> | tar -x -C /tmp/ps-deploy
cd /tmp/ps-deploy && npm ci && npm run build
```

Two reasons, both observed:

- The repo's `out/` has been **poisoned** before — serving new CSS and new SSR
  HTML alongside a *stale client JS chunk*, so the page hydrated back to a
  rejected design while every check passed. A stale `out/` is not obviously
  stale; it is partially fresh, which is worse.
- Other sessions leave uncommitted work in this tree, so a working-tree build
  can ship source that was never committed or reviewed.

Tradeoff, and it is the reason the flag above matters twice over: a non-git
export has no branch for Wrangler to infer, so `--branch main` becomes
**doubly necessary** rather than optional. Deployments made this way show an
empty `Source` column in `wrangler pages deployment list`; that is expected,
not a fault.

> **Note:** `WORKSPACE_SOURCE_OF_TRUTH.md:106` and this rule's older text both
> said to deploy from the canonical workspace folder. That still governs *where
> you run Wrangler and Git from*. The clean-export step changes only where the
> `out/` you upload is **built**.

## Verify the deploy — the command proves nothing

A deploy is proven only by fetching the live page and confirming the served
asset hash changed and matches the build you made. Exit code 0 and a returned
deployment id prove nothing.

```bash
# 1. Cloudflare must list it as Production | main, NOT Preview
npx wrangler pages deployment list --project-name preisser-solutions | head -5

# 2. The chunk the apex actually serves
curl -s https://preissersolutions.com/ \
  | grep -o '_next/static/chunks/app/page-[a-f0-9]*\.js' | sort -u

# 3. Its hash must equal the local build's
curl -s https://preissersolutions.com/_next/static/chunks/app/<chunk>.js | md5
md5 -q <build-dir>/out/_next/static/chunks/app/<chunk>.js

# 4. Apex 200; www and pages.dev 301 to the apex
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://preissersolutions.com
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://www.preissersolutions.com
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://preisser-solutions.pages.dev
```

If step 1 says `Preview`, the deploy did not go to production no matter what
Wrangler printed. If step 3's hashes differ, the apex is serving something you
did not build.

Never deploy from GitHub Actions — that workflow validates only, it does not
push to Pages.

`CONTACT_FROM` / `CONTACT_TO` in `wrangler.toml` `[vars]` are intentionally
version-controlled; `RESEND_API_KEY` is an encrypted Pages secret and must
never be added to that file.
