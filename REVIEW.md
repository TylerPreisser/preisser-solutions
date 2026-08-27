# Review evidence bar — Preisser Solutions

A finding survives only with a concrete failing scenario and `file:line`
citations. Confidence 0–100; discard below 80. Read the implementation, not
just the diff — trace callers before claiming something is unreachable or
unused. Discard a finding if the behavior is guarded, intentional, or you
cannot demonstrate the failure concretely.

**Excluded:** style nits, speculative risk without a scenario, feature
requests, generated/build output (`out/`, `.next/`), lockfiles, anything
`eslint`/`tsc` already catches. Conformance to an Accepted ADR in
`DECISIONS/` (or `~/.claude-shared/DECISIONS/`) is **never** a defect — file
disagreement as a non-blocking "Decision Concerns" note citing the ADR
number instead.

## Repo-specific must-checks

1. **Static export reality check.** This site ships as a static export
   (`out/`) served by Cloudflare Pages — no server runtime handles requests.
   A finding that assumes request-time server logic (dynamic route params,
   server-side data fetching, middleware auth) outside `functions/*` is
   invalid; verify against `next.config.ts`'s export mode first.
2. **Cloudflare surface is exactly four files.** Cloudflare only reads
   `wrangler.toml`, `public/_headers`, `public/_redirects`, and
   `functions/*`. A finding about deploy/runtime behavior citing any other
   file is unverifiable — trace it to one of these four or discard it.
3. **Secrets vs. public config in `wrangler.toml`.** `CONTACT_FROM` /
   `CONTACT_TO` under `[vars]` are intentionally committed public identity,
   not a leak. Only flag `wrangler.toml` if it contains `RESEND_API_KEY` or
   another actual credential.
4. **SEO pipeline order.** `npm run build` chains
   `next build && strip-404-noindex.mjs && generate-sitemap.mjs`, and
   `npm run validate:seo` is a separate gate. A finding that a route is
   "missing from the sitemap" must be checked against a fresh build's
   `out/sitemap.xml`, not a stale one — `out/` is often present locally from
   a prior build.

## Reviewer setup

- GitHub MCP and Context7 are connected globally — no per-repo wiring
  required to use them in review.
- This is a UI repo: Playwright MCP (`.mcp.json`) is available for
  browser-verifiable frontend findings.
