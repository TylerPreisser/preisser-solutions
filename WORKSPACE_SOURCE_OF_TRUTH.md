# Workspace Source Of Truth

Last updated: 2026-09-06.

## Canonical Workspace

The only active local workspace for Preisser Solutions is:

```text
/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current
```

Future agents must not work from any other local copy. Before changing files,
committing, validating, or deploying, run:

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
pwd
```

`pwd` must print exactly:

```text
/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current
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
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
npm ci
npm run build
npm run lint
npx tsc --noEmit
npm run validate:seo
```

## Deploy Command

Deploy only from the canonical folder:

```bash
cd "/Users/tylerpreisser/Projects/Preisser Solutions/Website - Current"
npx wrangler pages deploy out --project-name preisser-solutions --branch main
```

`--branch main` is REQUIRED for a production deploy. Wrangler otherwise stamps
the deployment with the current git branch, and Cloudflare files any branch that
is not `main` as a **Preview** deployment: the upload succeeds, wrangler exits 0,
and `preissersolutions.com` keeps serving the previous production build. This
happened on 2026-09-04 (deployment `9c173db9`, Preview, branch
`feature/mobile-and-marcommand-overhaul`) and was caught only by diffing the
live apex HTML against local `out/index.html`. Exit code 0 is not proof of a
production release.

Build the `out/` you upload from a clean `git archive` export of the commit you
intend to ship, not from the working tree. The tree's `out/` has been poisoned
before (new CSS and SSR HTML alongside a stale client JS chunk, so the page
hydrated back to a rejected design while every check passed), and other sessions
leave uncommitted work here. Run Wrangler and Git from the canonical workspace
above; only the build directory moves. A non-git export gives Wrangler no branch
to infer, which makes `--branch main` doubly necessary. Full procedure and
verification steps: `.claude/rules/cloudflare-deploy-gate.md`.

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

Current expected deployment state (verified live 2026-09-06):

- Project: `preisser-solutions`
- Current live production deployment: `5a342e45-1328-41a2-ad5d-eaf335a7b21f`,
  listed by `wrangler pages deployment list` as **`Production | main`** (not
  Preview).
- Source commit: `5aa93bc0e0556ba2b5e92bdb1259dedc9d014a18` on `main`
  ("feat(home): redraw bento cards 1-3 as the visitor's own artifact").
- Built from a clean `git archive` export of that commit in `/tmp`, NOT from the
  working tree. Because that export is not a git repo, Wrangler could infer no
  branch and the `Source` column for this deployment is **empty** — expected for
  a clean-export deploy, and the reason `--branch main` was mandatory. See
  `.claude/rules/cloudflare-deploy-gate.md`.
- Served homepage JS chunk: `_next/static/chunks/app/page-ca3f61cbe0d59f37.js`,
  md5 `c563a5e859517a5c130308d1a3880289` (164,894 B).
- Served CSS: `_next/static/css/74405730033a259d.css` and
  `_next/static/css/41ced62a3916091e.css`.
- Verified live and re-verified stable 86 minutes later. `preissersolutions.com`
  returns HTTP 200; `www.preissersolutions.com` and
  `preisser-solutions.pages.dev` both 301 to the apex.
  `https://5a342e45.preisser-solutions.pages.dev/` serves the same chunk as the
  apex, tying the apex to this deployment id.
- Supersedes `ebc9213b` (2026-09-04, source `6fcfd65`, BUILD_ID
  `Qw5SIlrjZuQVgzEeP5psE`, chunk `page-62aede1f99531b3d.js`), which this entry
  replaced. Also supersedes `f2ea80a5`, `60387210`, `e94d5d78`, `bad98893`,
  `618f82f8`.

> **Unverified:** the Next.js `BUILD_ID` of the current deployment. No
> `"buildId"` string is present in the served homepage HTML, so it could not be
> read the way earlier entries recorded it. Confirming it would need
> `out/BUILD_ID` from the exact build directory, or a `_buildManifest` path from
> the served asset graph.

> **Caution:** the working tree's `out/` does NOT match production. At the time
> of writing it contains `page-c816620a4ded6a29.js`, while the apex serves
> `page-ca3f61cbe0d59f37.js`. Do not treat local `out/` as a record of what is
> live, and do not diff against it to "verify" a deploy.

### OPEN DISAGREEMENT — em dashes (do not silently resolve)

ADR-0009 states the invariant plainly
(`DECISIONS/0009-the-owners-supplied-copy-ships-verbatim-superseding-adr-0008s-agent-authored-tagline.md:25`):

> **No em dashes** anywhere in the restored copy; commas and colons only. The
> site is at zero site-wide and stays there.

The previous state entry likewise recorded "zero em dashes" verified live on
2026-09-04. **The current live homepage contains 62 em dashes in visible body
copy** (for example: "The five or six numbers that actually decide your week —
jobs, invoices, payments, who owes you — pulled from the system"). This was
measured against the served apex HTML on 2026-09-06.

This is recorded, not resolved. It is either a copy regression introduced with
the bento redesign or a deliberate reversal of ADR-0009 that was never written
down. Tyler rules on which. `npm run validate:seo`
(`scripts/validate-seo.mjs`) does **not** check for em dashes, so nothing
mechanical catches this either way.

### Notes carried forward from the `ebc9213b` entry

Re-verified against the current live apex HTML on 2026-09-06:

- Bento/work-card cues are `Click for more` / `Tap for more` in the DOM
  (sentence case, 23 occurrences each), rendered uppercase by
  `text-transform:uppercase` on `.ps-bento-card__cue`, toggled by
  `@media (hover:none)`. Grep the DOM in sentence case; the all-caps form
  exists only on screen.
- The owner's Why Us tagline ("Your success is / our success.", ADR-0009) is
  present; `In it for the` is 0, `<canvas` is 0, `ps-caps` is 0.
- The hero mark is created at RUNTIME (`document.createElement("canvas")`,
  `src/components/home/hero-mark-light.ts:204,209`) and appears in NO JSX.
  Therefore `grep '<canvas' out/index.html` is 0 whether the mark is present or
  absent, and is not evidence either way. To check the mark ships, grep the
  built JS for `ps-hero-canvas` / `ps-hero-beam` / `createElement("canvas")`.

> **Unverified against the current deployment.** The following were recorded for
> `ebc9213b` and were NOT re-checked for `5a342e45`. They are kept because the
> grep guidance stays useful, but do not cite them as current fact without
> re-running the check named in each.
>
> - `22+ Kansas SMB projects delivered` intentionally absent from the homepage.
> - Crawler mirror `<section class="ps-visually-hidden ps-pillar-crawler-content">`
>   carrying 13 anchors and 30 pain-point items in five `<h4>The pain we hear</h4>`
>   blocks of six; a raw `grep -c 'tabindex="-1"'` reads 16/17, not 13, because
>   three such anchors sit outside the mirror.
> - Frozen-claim counts `Schedule-F-ready` 1 / `tax season` 3 / `134 pre-rendered` 1.
> - The `.mc-elara` sprite knockout halo (three zero-offset `drop-shadow(...
>   var(--theme-bg-primary))` filters); the token must be opaque in BOTH themes.
> - The animated MarCommand sprite shipping as a single
>   `/images/marcommand/elara-sheet.39d2c92d.webp` referenced from CSS
>   (`src/styles/marcommand-live.css:445`), not from JS.
> - `100svh` with zero `100dvh` across both CSS bundles.

- Known, accepted: `public/contact-critical-v20260522.css:66` contains one em
  dash inside a CSS COMMENT. It is not rendered copy, predates this work
  (committed in `28b9c09`), and is already live. ADR-0009's rule is about
  HTML/JS output; do not treat this one as a regression. (It is also not the
  source of the 62 count above, which are in served HTML body copy.)
- Deployment list contains both Production and Preview entries (the earlier
  "Production 1 / Preview 0" expectation no longer holds). The Preview entries
  `9c173db9` and `678148b7` on branch `feature/mobile-and-marcommand-overhaul`
  are the failed-deploy artifacts described under Deploy Command; leave them.

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
