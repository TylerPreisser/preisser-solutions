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

# 5. Served text surfaces must carry zero em dashes (ADR-0009 decision 5).
#    /robots.txt MUST be cache-busted or read after the TTL -- see below.
curl -s -H 'Cache-Control: no-cache' "https://preissersolutions.com/robots.txt?cb=$RANDOM" \
  | grep -c $'\u2014'
for f in llms.txt llms-full.txt feed.xml ai.txt; do
  printf '%s ' "$f"; curl -s "https://preissersolutions.com/$f" | grep -c $'\u2014'
done
# Two traps in that one line. `grep -c` prints the LINE count, not the
# occurrence count -- zero is zero either way, which is all this step asserts,
# but use `grep -o ... | wc -l` if you need the real total. And `grep -c` EXITS
# 1 when the count is zero, i.e. on success here, so never chain this with
# `&&` or read its exit status as the verdict. Read the printed number.
```

If step 1 says `Preview`, the deploy did not go to production no matter what
Wrangler printed. If step 3's hashes differ, the apex is serving something you
did not build.

## /robots.txt lies for five minutes after a deploy — cache-bust it or wait

**A stale `/robots.txt` inside ~5 minutes of a successful deploy is expected, not
a failure.** Verify it with a cache-busted request, or re-read it after the TTL
drains. Do not conclude the deploy failed, and above all **do not re-deploy to
"fix" something that already shipped** — that is how you end up racing another
session over a change that was already live.

Why: `/robots.txt` is not a static file. `functions/_middleware.ts` intercepts
the path and answers from a template literal with
`cache-control: public, max-age=300`, so the edge keeps serving the previous
body for up to five minutes. The four genuinely static text surfaces
(`llms.txt`, `llms-full.txt`, `feed.xml`, `ai.txt`) carry no such TTL from the
middleware and flip immediately.

| Surface | Source | Flips |
|---|---|---|
| `/robots.txt` | `functions/_middleware.ts` (`OPEN_ROBOTS_TXT`, and `LEGACY_ROBOTS_TXT` on legacy hosts) | after `max-age=300` |
| `/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/ai.txt` | static `public/`, byte-copied into `out/` | immediately |
| HTML pages and `_next` chunks | static `out/` | immediately |

Observed 2026-09-07 on deployment `2e63cc6c`, which changed the robots header
line. A plain `curl` returned the OLD body at t+1m while a cache-busted request
returned the NEW one; the plain read flipped between **t+1m and t+2m** and was
correct at every check thereafter. So: cache-bust, or wait two minutes and
re-read.

This is the same class of false signal as "exit code 0 proves nothing", pointed
the other way — a **true-looking failure that is really just stale cache.**

Note also that `public/robots.txt` is **never served**; the middleware overrides
it. Editing that file changes nothing on the apex. Its own header says so.

Never deploy from GitHub Actions — that workflow validates only, it does not
push to Pages.

`CONTACT_FROM` / `CONTACT_TO` in `wrangler.toml` `[vars]` are intentionally
version-controlled; `RESEND_API_KEY` is an encrypted Pages secret and must
never be added to that file.
