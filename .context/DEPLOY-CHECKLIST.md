# Preisser Solutions — Deploy Checklist

**Audience**: Tyler (or a future agent) executing the production deploy after the 2026-05-15 brand-reversal rebuild.
**Status of rebuild**: Phases 1–7 complete. Build verified Phase 6 (153 pages emitted, 151 sitemap URLs, canonical correct, no brand contamination in HTML). Tyler executes deploy + post-deploy verification.
**Working dir**: `/Users/tylerpreisser/Desktop/Preisser-Solutions-Clean/`

---

## 1. Pre-Deploy Checklist

- [ ] **Build is clean** — `npm run build` exits 0.
  - Verified during Phase 6 of the rebuild: clean exit, 153 pages emitted, sitemap regenerated with 151 URLs.
  - Re-run before deploying to confirm nothing has drifted since Phase 6.
  ```bash
  cd /Users/tylerpreisser/Desktop/Preisser-Solutions-Clean
  npm run build
  ```
- [ ] **No brand contamination in `out/`.**
  - Verified Phase 6. Only known intentional remnant: 1 legacy-portfolio reference in `out/llms-full.txt` (historic project context, acceptable).
  - Re-verify:
  ```bash
  cd /Users/tylerpreisser/Desktop/Preisser-Solutions-Clean
  grep -rIn "preissertech\|Preisser Tech" out/ --include="*.html" | grep -v "301\|legacy" || echo "CLEAN"
  ```
- [ ] **Sitemap shape correct** — 151 URLs, zero `preissertech` hits.
  ```bash
  grep -c "<loc>" out/sitemap.xml          # Expected: 151
  grep -c "preissertech" out/sitemap.xml   # Expected: 0
  ```
- [ ] **Environment variables set in Cloudflare Pages** (Project → Settings → Environment variables, Production scope):
  - `NEXT_PUBLIC_BASE_URL` = `https://preissersolutions.com`
  - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = (Tyler's GSC verification token)
  - `NEXT_PUBLIC_BING_SITE_VERIFICATION` = (Tyler's BWT verification token)

---

## 2. Cloudflare Pages Deployment

**Primary deploy target.**

| Setting | Value |
|---|---|
| Project name | `preisser-solutions` (matches `wrangler.toml` `name`) |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | (repo root) |
| Node version | 20.x (or whatever `package.json` engines specifies — currently unpinned, default Pages Node is 20.x) |
| Domain bindings | `preissersolutions.com` (canonical) + `preissertech.com` (legacy 301 source) |

**Environment variables**: see §1 Pre-Deploy Checklist.

**CLI deploy alternative (wrangler):**

```bash
cd /Users/tylerpreisser/Desktop/Preisser-Solutions-Clean
npm run build
npx wrangler pages deploy out --project-name=preisser-solutions --branch=main
```

After CLI deploy, wrangler prints a deployment hash (`<SHA>`). Record it for the §10 sign-off entry.

---

## 3. DNS Verification

Both `preissersolutions.com` and `preissertech.com` zones are already on Cloudflare nameservers (per `.context/STATE.md`). **No DNS changes needed.**

Post-deploy verification:

```bash
# Legacy domain should 301 to canonical:
curl -I https://preissertech.com/services
# Expected: HTTP/2 301
# Expected: location: https://preissersolutions.com/services

# Canonical should serve 200:
curl -I https://preissersolutions.com/
# Expected: HTTP/2 200
# Expected: content-type: text/html; charset=utf-8
```

---

## 4. Cloudflare Edge Redirect Rule

A bulk redirect rule is already configured at the Cloudflare edge: `preissertech.com/* → https://preissersolutions.com/$1` (301, preserve query string).

**Do NOT touch this rule in the Cloudflare dashboard.** It is the canonical legacy-domain redirect path now that the brand reversal is complete.

`functions/_middleware.ts` provides a defense-in-depth backup that canonicalizes host headers and handles the 301 at the Pages worker level — keep both.

---

## 5. GitHub Pages (Alternate / Fallback)

`.github/workflows/pages.yml` deploys to GitHub Pages when `GITHUB_PAGES=true` is set as a build-time env var. Keep this workflow as a fallback target only — **Cloudflare Pages is the primary deploy target**.

If Cloudflare is unavailable, push to `main` with `GITHUB_PAGES=true` in the workflow env and GH Pages will publish.

---

## 6. Post-Deploy Verification

### 6.1 Crawler sanity (AI + search bots)

```bash
curl -A "GPTBot/1.0"     https://preissersolutions.com/ | grep -c "Preisser Solutions"   # Expected: >0
curl -A "ClaudeBot"      https://preissersolutions.com/ | grep -c "Preisser Solutions"   # Expected: >0
curl -A "PerplexityBot"  https://preissersolutions.com/ | grep -c "Preisser Solutions"   # Expected: >0
curl -A "Googlebot/2.1"  https://preissersolutions.com/ | grep -c "Preisser Solutions"   # Expected: >0
```

### 6.2 Crawler artifacts served correctly

```bash
curl -I https://preissersolutions.com/sitemap.xml      # Expected: 200, content-type: application/xml
curl -I https://preissersolutions.com/llms.txt         # Expected: 200, content-type: text/markdown or text/plain
curl -I https://preissersolutions.com/llms-full.txt    # Expected: 200
curl -I https://preissersolutions.com/ai.txt           # Expected: 200
curl -I https://preissersolutions.com/robots.txt       # Expected: 200
```

### 6.3 Lighthouse (run on `https://preissersolutions.com/` and one inner page)

Targets:
- **LCP** < 2.5s
- **INP** < 200ms
- **CLS** < 0.1
- **SEO**: 100
- **A11y**: ≥ 90
- **Best Practices**: 100

### 6.4 JSON-LD validation

Open `out/index.html` locally, copy the JSON-LD `<script type="application/ld+json">` blocks, paste each into https://validator.schema.org/ and confirm zero errors. Repeat for one Service page and one Location page.

---

## 7. Search Console Submission

After §6 passes:

- [ ] Submit `https://preissersolutions.com/sitemap.xml` to **Google Search Console** (Property → Sitemaps).
- [ ] Submit `https://preissersolutions.com/sitemap.xml` to **Bing Webmaster Tools** (Sitemaps).
- [ ] Fire IndexNow ping to surface the new URLs to participating engines:

```bash
cd /Users/tylerpreisser/Desktop/Preisser-Solutions-Clean
npm run indexnow
```

(Source: `scripts/indexnow-ping.mjs`. URL list was updated during brand reversal.)

---

## 8. Rollback Procedure

### 8.1 Source-level rollback (revert the rebuild itself)

Phase 1 created backups:

- **Git tag**: `pre-brand-reversal-20260515-211952` in the source repo at `~/Desktop/Preisser Solutions/`
- **Zip backup**: `/tmp/preisser-solutions-backup-20260515-211952.zip` (~50 MB)

Restore via git tag:

```bash
cd "/Users/tylerpreisser/Desktop/Preisser Solutions"
git checkout pre-brand-reversal-20260515-211952
```

Or restore from zip:

```bash
mkdir -p /Users/tylerpreisser/Desktop/recovery
unzip /tmp/preisser-solutions-backup-20260515-211952.zip -d /Users/tylerpreisser/Desktop/recovery/
```

### 8.2 Production rollback (Cloudflare Pages)

Cloudflare Pages keeps prior deployments. To roll back production:

1. Open Cloudflare dashboard → Pages → `preisser-solutions` → Deployments.
2. Find the last-known-good deployment.
3. Click the three-dot menu → "Rollback to this deployment".

This is instant and does not require a rebuild.

---

## 9. Tyler Action Items Summary

Operational follow-ups not handled by code agents. Track in `.context/CHANGELOG.md` under "Tyler Action Items" and in `.context/OPEN-QUESTIONS-FOR-TYLER.md`:

- **R-028** — Sitemap submission to GSC + BWT (covered above in §7).
- **R-061** — Decision on Preisser Media (consumer / political channels) positioning vs. consultancy brand.
- **R-063** — Google Business Profile claim + 3-category selection (primary: Website designer; secondary: Software company, Marketing consultant).
- **R-065** — Local citations execution (40 directories across 6 tiers — see `docs/local-citations.md`).
- **R-066** — Review request cadence (templates in `docs/review-request-template.md`).
- **R-107/108/109/110** — Weekly SEO + AEO/GEO + GBP performance + conversion tracking. Companion folder renames:
  - `~/Desktop/preisser-tech-monitoring/` → `preisser-solutions-monitoring/`
  - `~/Desktop/preisser-tech-outreach/` → `preisser-solutions-outreach/`
  - `~/Desktop/query-dominance/` (no rename required; tool-named)
- **Wikidata + Crunchbase + BBB + Clutch** — third-party entity / authority listings (see OPEN-QUESTIONS-FOR-TYLER.md).
- **`eslint.config.mjs`** — follow-up for the deprecated `next lint` in Next 16. Not blocking deploy. Add a flat-config `eslint.config.mjs` post-deploy so `npm run lint` works again.

---

## 10. Sign-Off

After a successful production deploy, append a final entry to `.context/CHANGELOG.md`:

```markdown
## 2026-MM-DD — Brand reversal + research integration COMPLETE + DEPLOYED
- All 178 research-doc points integrated or deferred with note.
- Build verified per master plan §7 (151 pages, 0 brand contamination, sitemap clean, type-check clean, lint skipped due to deprecated `next lint` — eslint.config.mjs follow-up).
- Deployed to Cloudflare Pages: wrangler hash <SHA>.
- Verified: preissertech.com → preissersolutions.com 301 live; AI crawler UAs (GPTBot, ClaudeBot, PerplexityBot) receive 200 + canonical brand string; sitemap.xml, llms.txt, llms-full.txt, ai.txt, robots.txt all 200.
- Lighthouse: LCP <2.5s, INP <200ms, CLS <0.1, SEO 100, A11y ≥90, Best Practices 100.
- Sitemap submitted: GSC + BWT. IndexNow pinged.
```

Replace `<SHA>` with the wrangler deployment hash from §2 and `MM-DD` with the actual deploy date.

---

**End of deploy runbook.** For full context on the rebuild itself, see `/Users/tylerpreisser/Desktop/PREISSER-SOLUTIONS-MASTER-REBUILD-PROMPT.md` and `.context/CHANGELOG.md`.
