# Preisser Tech Rebrand & SEO Domination — Master State Document

**Last updated**: 2026-05-04 (afternoon, second pass) — FAQPage dedup + Googlebot _next/static/ allow rule deployed via wrangler. GSC critical errors on /ai-agents and /custom-websites resolved.
**Status**: Phase 1 (Foundation) COMPLETE. Ready for Phase 2 execution.

---

## Investigation Findings (2026-05-04)

External-state forensic audit by `internet-investigator`. Evidence is publicly observable HTTP/DNS/search-engine state. Items requiring Cloudflare/GSC/social account access are flagged `NEEDS TYLER`.

### Confirmed Working
- **301 redirects from `preissersolutions.com` → `preissertech.com` are LIVE and PATH-PRESERVING**: apex, www, and 5/5 deep paths tested (`/services`, `/about`, `/contact`, `/roi-calculator`, `/why-automation`) all return `HTTP/2 301` with `Location: https://preissertech.com/<same-path>`. Both domains served via Cloudflare (NS: `dexter`/`elly.ns.cloudflare.com`; A records under 104.21/172.67 Cloudflare ranges).
- **`preissertech.com` apex + www both serve the same 200 OK content** (137,854-byte HTML, identical preload manifest). Canonical, OG, Twitter, JSON-LD all consistently say "Preisser Tech".
- **JSON-LD `legalName` is `"Preisser Tech"`**; address, geo, contactPoint all reference Hays, KS / sales@preissertech.com / +1-620-352-3296.
- **`x.com/preissertech` and `twitter.com/preissertech` return HTTP 404** — handle is unclaimed (could be squatted later).
- **`linkedin.com/company/preissertech` AND `linkedin.com/company/preissersolutions` both return HTTP 404** — neither company page has ever existed on LinkedIn. The `site-config.ts` social link to `/company/preissersolutions` points to a 404 today.
- **No Wikidata entry exists** for "Preisser Tech" or "Preisser Solutions" (search returns "no results matching the query").
- **DNS is unified**: both domains use Cloudflare nameservers and Cloudflare-fronted A records; redirect is implemented at the edge (Cloudflare Bulk Redirect / Page Rule, inferred from `cf-ray` headers and absence of any backend response on 301s).

### Active Leaks (high priority)
1. **`preisser-solutions.pages.dev` is LIVE (HTTP 200)** serving the FULL current Preisser Tech site. It has `x-robots-tag: noindex, nofollow` — so search engines should not index it — but the URL is publicly reachable, the canonical correctly points to `https://preissertech.com`, and Google has not yet indexed it (`site:preisser-solutions.pages.dev` returns nothing). Root cause: `wrangler.toml` line 1 still has `name = "preisser-solutions"`, which is what mints this hostname. Renaming requires Cloudflare dashboard project rename. NEEDS TYLER (account-gated).
2. **`facebook.com/preissersolutions` IS LIVE** (og:title "Preisser Solutions", description "Preisser Solutions. 30 likes. Ai Efficiency Consultants", recent 2025 profile photo). This is a real, Tyler-controlled Facebook page that has NOT been renamed. Customers landing here see old branding. NEEDS TYLER (rename Facebook page handle/name to Preisser Tech via Page settings).
3. **`instagram.com/preissersolutions` IS LIVE** (page title `Preisser Solutions (@preissersolutions) | Instagram photos and videos`). Real account, not renamed. NEEDS TYLER (change IG username + display name).
4. **`preissertech.com` JSON-LD `alternateName` leak** — **CLOSED 2026-05-04 evening** (wrangler deploy `7025ed47`). Live HTML now returns `["Preisser Technology","Preisser Tech"]`. Zero instances of "Preisser Solutions" in live HTML confirmed via curl.
5. **`robots.txt` deep-path Disallows** — **FIXED 2026-05-04 evening** (commit `97a91ea`, included in wrangler deploy `7025ed47`). Googlebot and Bingbot Disallows for `/about`, `/services`, `/contact`, `/roi-calculator`, `/why-automation` removed. Live CDN cache will propagate within 4 hours of ~2:30pm CDT deploy (by ~6:30pm CDT). Verify with `curl https://preissertech.com/robots.txt | grep "Disallow.*about"` — should return empty after cache clears.

### Search Index State (rough, observable)
- **Google `site:preissersolutions.com`**: returns ONE result — `https://www.preissersolutions.com/` with the OLD title "Preisser Solutions - Your Partner in Custom Business Automation" and the OLD description still cached. Google has not yet recrawled the 301, so the SERP snippet is stale. Will resolve naturally once Google revisits (typically 2–6 weeks after first 301). Will resolve faster if GSC "Change of Address" tool is used. NEEDS TYLER (GSC submit).
- **Google `site:preissertech.com`**: returns the homepage as a single primary result. Sitelinks/expanded entries not visible. Consistent with `robots.txt` deep-path Disallow behavior.
- **Bing `site:` queries**: blocked by Cloudflare-style challenge page during automated fetch — could not enumerate. NEEDS TYLER (Bing Webmaster Tools "Site Move" submission).
- **DuckDuckGo**: search UI is JS-rendered and could not be parsed by automated fetch. NEEDS TYLER (verify via browser).
- **No Wikidata entry, no Google Knowledge Panel evidence, no organic external mentions found in `"preissertech.com"` or `"preissersolutions.com"` queries** filtered to exclude both domains. Top-10 backlink lists came back populated only with unrelated Kansas businesses + accidental string matches (Helios-Preisser, Pretech Corp, Preiser Scientific) — i.e., **the brand has effectively zero external backlinks at this moment**.

### Cloudflare Pages Subdomain Map
| Hostname | Status | Notes |
|----------|--------|-------|
| `preisser-solutions.pages.dev` | **HTTP 200 LIVE** | Serves current site. Has `x-robots-tag: noindex, nofollow`. Canonical points to preissertech.com. NOT yet indexed in Google. Stems from `wrangler.toml` project name. |
| `preisser-tech.pages.dev` | NXDOMAIN | Does not exist. |
| `preissertech.pages.dev` | NXDOMAIN | Does not exist. |

If/when the Wrangler project is renamed `preisser-tech`, the `pages.dev` URL will switch to `preisser-tech.pages.dev` (also `noindex` by default), and the old `preisser-solutions.pages.dev` URL is reclaimable by anyone in the Cloudflare account universe — typically not a security risk because pages.dev hostnames are scoped per-account, but worth confirming.

### Social Pages Summary
| Platform | preissertech | preissersolutions | Action |
|----------|--------------|-------------------|--------|
| LinkedIn `/company/` | 404 (does not exist) | 404 (does not exist) | CREATE `/company/preisser-tech` from scratch |
| Facebook `/` | 404 (page title = "Facebook" only, no OG match) | **200 LIVE — "Preisser Solutions", 30 likes** | RENAME existing `/preissersolutions` to preissertech (FB allows username change) |
| Instagram `/` | Generic 200 (page title = "Instagram", profile does not exist) | **200 LIVE — "Preisser Solutions (@preissersolutions)"** | RENAME existing IG username preissersolutions to preissertech |
| X / Twitter `/` | 404 on x.com AND twitter.com | not tested for old name | CLAIM `@preissertech` handle before squatters do |

---

## Mission Summary

Preisser Tech (formerly Preisser Solutions) is executing a complete brand migration from `preissersolutions.com` → `preissertech.com` with an aggressive SEO dominance strategy. The strategic goal: rank #1 on every relevant search query across Google, Bing, ChatGPT, Perplexity, and Claude for business automation, custom software, and AI-agent services. The website itself is the proof-of-concept that demonstrates the SEO/AI-domination playbook Tyler sells to clients.

The rebrand launched May 2, 2026. The website is fully built, deployed, and traffic is flowing to preissertech.com. Three companion systems are operational: a daily mention/backlink monitor, a press/outreach kit, and a query-dominance research system.

---

## Current Phase & Blockers

### Migration Status (2026-05-04 afternoon update)
**GSC Change of Address: ABANDONED.** Validator returns inconsistent failures despite externally-verified perfect redirects. Not worth further debugging. Pivoting to natural migration path.

**Active migration strategy**:
1. 301 redirects transferring equity (already live, verified)
2. IndexNow blast complete — 109 URLs submitted to Bing/Yandex network (2026-05-04, HTTP 200)
3. Sitemap submission to GSC pending (Tyler action)
4. URL Inspection / Request Indexing on top 10 URLs (Tyler action)

**Critical blocker — STILL OPEN (2026-05-04 late afternoon)**: Cloudflare-managed robots.txt is prepending Disallow rules for ClaudeBot, GPTBot, Google-Extended, Amazonbot, CCBot, Applebot-Extended, Bytespider, meta-externalagent — overriding Tyler's explicit Allow rules. API fix attempted and blocked by token scope (`zone:read` only). Tyler must toggle OFF in Cloudflare dashboard: dash.cloudflare.com → each zone → Security → Settings → "Instruct AI bot traffic with robots.txt". Do this for BOTH `preissertech.com` and `preissersolutions.com`.

### Phase 1: Foundation (COMPLETE)
- Website built and deployed to Cloudflare Pages ✓
- Domain switched to preissertech.com ✓
- 35 core URLs in production + 70 AEO expansion pages (105 total URLs) ✓
- Monitoring system live (daily runs since 2026-05-03) ✓
- Outreach kit assembled (press releases, journalist pitches, Reddit posts, LinkedIn drafts) ✓
- Query dominance playbook generated (10 tiers, 7 strategic pillars, realistic timeline) ✓

### Phase 2: Execution (READY TO START)
**What needs to happen next:**
1. **LinkedIn Social Proof** — Execute 15 curated posts from `preisser-tech-outreach/linkedin-posts.md`
2. **Press Outreach** — Send press releases + journalist pitches (Hays Post, KCBJ, Kansas Reflector first)
3. **Tier 1 Knowledge Graph Submissions** — Wikidata, Google Business Profile, Bing Places, LinkedIn rename (priority DO FIRST)
4. **Clutch Profile Setup** — Critical for B2B AI/automation queries (Tier 2 leverage)
5. **Reddit/Community** — Weekly posts on r/Kansas, r/HVAC, r/sweatystartup, etc.
6. **Podcast Pitches** — Sweaty Startup, Home Service Expert (highest leverage first)
7. **Content Loops** — Activate endless-loop optimizers (A–J from playbook)

### Current Blockers
- **NONE** — all required infrastructure is in place. This is a pure execution phase. The orchestrator (Claude Code main thread) needs to delegate Phase 2 tasks to subagents.

---

## Asset Inventory

### Main Website
**Path**: `/Users/tylerpreisser/Desktop/Preisser Solutions/`  
**Tech Stack**: Next.js 15 + React 19 + TypeScript + Tailwind v4 + GSAP 3.12.7 + Framer Motion 12.0.0  
**Build**: `npm run build` → `/out/` directory (static export)  
**Deploy**: Cloudflare Pages (via GitHub Actions on push to main)  
**Git Remote**: GitHub (tyler-preisser-website repo implied from CLAUDE.md)  
**Status**: Production live. 109 pages deployed. Builds clean. (Updated 2026-05-04 — build emits 109, not 105.)

**Key files**:
- `CLAUDE.md` (231 lines) — Master system prompt
- `docs/status.md` (168 lines) — Session log, current state
- `docs/design-system.md` (445 lines) — Visual bible (colors, typography, spacing, shadows, components)
- `docs/decisions.md` (125 lines) — Architectural decisions
- `src/data/site-config.ts` — Brand metadata, contact info, social links
- `src/styles/globals.css` (~1900 lines) — Stripe HDS token system
- `src/app/layout.tsx` — Root layout, metadata, JSON-LD schema
- `package.json` — Dependencies, build scripts

**Current Size**: 69 files in src/ + public/, ~3000 lines of TypeScript/CSS code

### Monitoring System
**Path**: `/Users/tylerpreisser/Desktop/preisser-tech-monitoring/`  
**Type**: Daily mention/backlink/SERP position tracker  
**Tech**: Node.js 22 (no dependencies), Bing + DuckDuckGo HTML scraping  
**Runs**: Daily at 08:00 local time (launchd scheduled)  
**Status**: Live. Last run 2026-05-03.  
**Outputs**:
- `baseline-2026-05-03.md` — Day-zero mention landscape snapshot
- `mentions-YYYY-MM-DD.md` — Daily delta reports
- `citation-tracker.csv` — Cumulative citation tracking
- `competitor-snapshot-*.md` — Competitor movement tracking (Adams Brown Tech, Lost Highway Media, Pluto Sites)
- `seen.json` — Ledger of every URL flagged (prevents re-reporting)

**Key features**:
- 50+ priority queries (Preisser Tech, Tyler Preisser, case-study clients, vertical keywords)
- 10+ search categories (press, social, directory, competitor, aggregator, owned, ranking)
- Noise filtering (surname collisions suppressed)
- Ranking self-check for 5 critical queries
- Manual execution: `node scan.mjs` (takes ~50 seconds)

### Outreach Kit
**Path**: `/Users/tylerpreisser/Desktop/preisser-tech-outreach/`  
**Type**: Press releases, journalist pitches, podcast pitches, social drafts  
**Status**: Complete. Ready to execute.  
**Contents**:
- `press-release-master.md` — AP-style release for paid distribution (~$400 via PRWeb/PRNewswire)
- `press-release-*.md` — 5 regional variants (Hays Post, KCBJ, Kansas Reflector, FHSU, Kansas Living)
- `pitches/journalist-*.md` — 10 personalized journalist pitches (Hays Post, KAKE-TV, KWCH-TV, KSAL, KCBJ, Kansas Reflector, Wichita Eagle, Topeka Capital-Journal, ICT Magazine, Hays Daily News)
- `podcast-pitches.md` — 15 podcast pitches with custom hooks (Sweaty Startup, Home Service Expert, etc.)
- `linkedin-posts.md` — 15 ready-to-publish LinkedIn drafts
- `reddit/` — 8 subreddit posts (r/sweatystartup, r/HVAC, r/Kansas, r/smallbusiness, r/PowerBI, r/Wichita, r/Webflow, r/PrivateEquity)
- `CITATION-TRACKER-README.md` — Instructions for tracking citation lift from outreach
- `COMPETITOR-TRACKER-README.md` — Instructions for monitoring competitor responses

**Recommended cadence**:
- LinkedIn: 3/week
- Reddit: 1/week
- Press: 1/month (with 5-10 journalist pitches that week)
- Podcast: 5/month
- Journalist: 3-5/month

### Query Dominance System
**Path**: `/Users/tylerpreisser/Desktop/query-dominance/`  
**Type**: Multi-agent system for SEO keyword research and content strategy  
**Tech**: Claude Code agents + YAML shared context  
**Status**: Phase 1 complete. 10-agent framework + run artifacts from 2026-05-02.  
**Structure**:
- `context/shared_context.yaml` — Shared variables, targets, personas, query map
- `context/agents/` — 14 agent prompt files (00_orchestrator through 10_synthesis_reporter)
- `runs/2026-05-02_run01/` — Complete run artifacts (query analysis, gap analysis, content strategy, competitor findings)

**Key outputs from latest run**:
- Query classification: 115 priority queries across 8 categories
- 17 personas identified (C-suite, operators, integrators, engineers, agencies, investors)
- Competitor gap analysis (Adams Brown, Lost Highway, Pluto Sites)
- Content gaps (25+ missing pages, 15+ comparison pages needed)
- Landing page strategy (47 pages, geo-targeted + vertical-specific)
- Distribution strategy (8 channels, 24 monthly touchpoints)

### Strategic Playbook
**Path**: `/Users/tylerpreisser/Desktop/Preisser-Tech-AI-Domination-Playbook.pdf` (650KB)  
**Generated**: 2026-05-03 (Query Dominance Agent System, run 01)  
**Content**: Operations manual for AI ranking domination across 4 LLMs + 3 search indexes  
**Key sections**:
- How 4 major LLMs rank (ChatGPT, Perplexity, Google Gemini, Claude)
- 35-URL paste-ready list for Bing submission
- 10 Google Search Console priority indexing actions
- 7 tiers of SEO leverage (Knowledge Graph → B2B aggregators → local citations → industry directories → community signals → press/PR → AI submissions)
- Realistic timeline: Day 0 → Day 90 → Day 180 with success metrics per engine
- 10 endless-loop optimizers (Loops A–J: citation monitor, page generator, schema validator, searcher simulator, backlink monitor, competitor tracker, A/B testing, press generator, GSC scraper, content refresh)

---

## Tech Stack & Deployment

### Website Stack
| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js | 15.3.0 (App Router) |
| Language | TypeScript | 5.7.0 |
| UI Framework | React | 19.1.0 |
| Styling | Tailwind CSS | 4.0.0 |
| Animation (scroll) | GSAP + ScrollTrigger | 3.12.7 |
| Animation (transitions) | Framer Motion | 12.0.0 |
| Deployment | Cloudflare Pages | Static export only |
| Build Trigger | GitHub Actions | `.github/workflows/deploy.yml` |
| Package Manager | npm | (lock file present) |

### Build & Deployment
- **Build command**: `npm run build` → outputs `/out/` (static HTML/CSS/JS)
- **Local preview**: `npm run preview` (serves `/out/` locally)
- **Deploy**: GitHub Actions on `main` branch push → Cloudflare Pages
- **Current production URL**: https://preissertech.com
- **DNS**: Cloudflare managed (no native Google Cloud setup currently detected)
- **Status**: All 105 pages building clean, no errors or warnings

### Monitoring & Tracking Stack
- **Language**: Node.js 22 (Bing + DuckDuckGo scraping, no dependencies)
- **Scheduler**: macOS launchd (08:00 daily)
- **Data storage**: Markdown files + JSON ledger (seen.json)
- **Outputs**: CSV + Markdown reports

---

## Domain & Hosting State

### Current Domain Status
**Primary domain**: `preissertech.com` (HTTP 200, served via Cloudflare; `cf-ray` confirmed; canonical=self)
**Previous domain**: `preissersolutions.com` — **registered, active, 301-redirecting to preissertech.com path-preservingly** (verified 2026-05-04)
**DNS**: Cloudflare confirmed for BOTH domains (NS: `dexter`/`elly.ns.cloudflare.com`; A records in 104.21/172.67 ranges)
**Wrangler config**: `wrangler.toml` references `name = "preisser-solutions"` — this DOES affect the public surface area: it is what mints the live `preisser-solutions.pages.dev` hostname (HTTP 200, currently `x-robots-tag: noindex, nofollow`).

### Unknown (Needs Tyler Input)
1. ~~Is `preissersolutions.com` still registered and active?~~ **RESOLVED** — yes, registered, on Cloudflare.
2. ~~Are old `preissersolutions.com` URLs 301-redirected to `preissertech.com` equivalents?~~ **RESOLVED** — yes, all sampled paths return path-preserving 301.
3. Is Google Search Console set up for preissertech.com? (Playbook says "Settings → Change of Address") — Still unknown externally; SERP evidence suggests Change of Address has NOT yet been submitted (old domain SERP snippet still cached).
4. What is the actual GitHub repo URL? — Still unknown externally.
5. Is there a native Google Cloud setup, or purely Cloudflare Pages? — DNS evidence says purely Cloudflare. No GCP A records observed.
6. ~~What backlinks/citations currently point to `preissersolutions.com` vs `preissertech.com`?~~ **PARTIAL** — automated public-search inventory found effectively zero external backlinks for either domain. Brand has minimal external citation footprint at this moment, which is actually convenient for the migration (less debt to migrate).

---

## Brand Disambiguation State (2026-05-04 evening, post-automotive-collision fix)

**Trigger**: ChatGPT was returning an automotive tuning site for "preissertech" instead of the B2B consultancy.

**Status**: STRENGTHENED. Organization JSON-LD `disambiguatingDescription` now explicitly names automotive tuning as collision item (1). `description` opens with B2B software framing and "not automotive tuning, not hardware." `slogan` reinforces non-automotive. `knowsAbout` expanded to 15 domain signals. 109 URLs re-submitted to Bing via IndexNow (200 OK). Deployed `e72b04d`.

**Entity collision map** (documented in JSON-LD):
1. Automotive tuning / vehicle performance company using "Preisser Tech" name — PRIMARY COLLISION (ChatGPT conflict)
2. Helios-Preisser GmbH — German precision-measuring instruments (helios-preisser.de)
3. PresserTech / pressertech.us — automotive aftermarket
4. Preiser Inc — model railroad accessories
5. Preiser Scientific — laboratory supplies
6. Any other Preisser-named business (catch-all)

**Residual risk**: AI knowledge graphs (ChatGPT/Perplexity) typically take 2-8 weeks to re-crawl and re-weight entity disambiguation signals after a schema update. Until then, the automotive result may still surface for some users. Natural resolution as Bing and Google re-index the updated schema.

---

## AEO Posture (2026-05-04 evening, post-gap-execution)

**Status**: ALL ENGINEERING GAPS CLOSED. Schema is now AI-agent-optimal. One critical Tyler action remains blocking full AI crawler access.

All 7 code-level gaps from AEO_AUDIT_2026-05-04.md have been executed and shipped (commits `6d2c1a6`, `334d385`, `7d4120a`, `a3d9fe8`, `114c8d1`). The site now emits correct Service/Article/WebPage schema with full field enrichment, has homepage metadata + AI citation summary paragraph, has per-page BreadcrumbList on all non-AEO pages, has metadata on all 109 pages, and social sameAs links point to canonical preissertech handles.

**What's now CLOSED**:
1. ✓ Homepage metadata + summary paragraph (commit `6d2c1a6`)
2. ✓ Contact + ROI Calculator missing metadata (commit `334d385`)
3. ✓ AEO pages Service/Article/WebPage conditional schema (commit `7d4120a`)
4. ✓ BreadcrumbList per page (commit `a3d9fe8`)
5. ✓ Per-page FAQPage schema — already working, verified (1 per AEO page)
6. ✓ Social links updated to preissertech handles (commit `114c8d1`)
7. ✓ All title lengths 50-60 chars (homepage 55, contact 59, roi 57)

**Remaining Tyler blockers** (engineering cannot resolve these):
- **CRITICAL**: Cloudflare managed robots.txt override still prepending AI bot Disallows — kills ALL AI crawler access. Toggle off in CF dashboard → Bots → "Managed Robots.txt".
- LinkedIn company page `/company/preissertech` must be created from scratch (neither preissertech nor preissersolutions exists on LinkedIn)
- Facebook page must be renamed: existing `/preissersolutions` → `preissertech` via Page Settings (page is live, 30 likes, Tyler-controlled)
- Twitter/X `@preissertech` must be claimed ASAP — currently unclaimed 404, squattable

See `.context/AEO_AUDIT_2026-05-04.md` for full gap analysis, schema coverage table, and per-dimension findings.

---

## Favicon / Icon / Manifest State (2026-05-04 late evening — COMPLETE)

All platform icon infrastructure is now in place and verified live on preissertech.com:

| Asset | Status |
|-------|--------|
| favicon.ico (16/32/48/64/128/256 multi-size) | LIVE 200 |
| favicon-16x16.png, favicon-32x32.png, favicon-96x96.png | LIVE 200 |
| apple-touch-icon.png (180x180) | LIVE 200 |
| android-chrome-192x192.png | LIVE 200 (NEW) |
| android-chrome-512x512.png | LIVE 200 (NEW) |
| icon-192.png (maskable), icon-512.png (maskable) | LIVE 200 |
| mstile-150x150.png | LIVE 200 (NEW) |
| safari-pinned-tab.svg | LIVE 200 (NEW) |
| site.webmanifest | LIVE 200 (UPDATED) |
| browserconfig.xml | LIVE 200 (NEW) |
| theme-color meta (#0D95E8) | LIVE in HTML |
| msapplication-TileColor/TileImage/config meta | LIVE in HTML |
| mask-icon rel link | LIVE in HTML |
| JSON-LD logo ImageObject (@id, contentUrl, 1024x1024, caption) | LIVE in JSON-LD |

GSC globe icon is a normal crawl-delay artifact for a 2-day-old domain. All technical prerequisites are now met.

---

## Brand State Audit

### "Preisser Solutions" References (REMAINING)
These should be systematically removed or updated:

| Location | Context | Status |
|----------|---------|--------|
| `package.json` | `"name": "preisser-solutions"` | RESOLVED 2026-05-04 — changed to `"preisser-tech"` |
| `package-lock.json` | Multiple internal references | Artifact, will auto-resolve on next `npm install` |
| `wrangler.toml` | `name = "preisser-solutions"` | PENDING — see CHANGELOG 2026-05-04 for reasoning (Cloudflare dashboard coordination required) |
| `next.config.ts` | GitHub Pages path prefix `"/preisser-solutions"` | RESOLVED 2026-05-04 — changed to `"/preisser-tech"` |
| `public/ps-hero-animation.js` | Comment `"Preisser Solutions — Hero Canvas Animation"` | RESOLVED 2026-05-04 — updated to `"Preisser Tech"` |
| `docs/superpowers/specs/2026-04-02-preisser-solutions-rework-design.md` | Filename and headings | Historical reference doc, OK to leave as-is |
| `docs/content-mapping.md` | Path reference to old downloaded content | Historical reference, OK to leave |
| `src/app/layout.tsx` | `alternateName: ["Preisser Technology", "Preisser Solutions"]` | COMMITTED + PUSHED 2026-05-04 (commit `9bb846b`) — changed to `["Preisser Technology", "Preisser Tech"]`. **CAVEAT**: Cloudflare Pages redeploy must be confirmed by Tyler (see NEEDS_TYLER.md items #0 + #9). GitHub Pages deploy auto-triggered. |
| `src/app/layout.tsx` | `sameAs` array — LinkedIn/Facebook/GitHub social URLs contain `preissersolutions` | PENDING — see CHANGELOG 2026-05-04 for reasoning (internet-investigator must confirm `/preissertech` pages exist) |
| `src/data/site-config.ts` | Social links point to `.../company/preissersolutions` | PENDING — see CHANGELOG 2026-05-04 for reasoning (internet-investigator must confirm `/preissertech` pages exist) |

### "Preisser Tech" References (CORRECT)
- CLAUDE.md — correctly references preissertech.com ✓
- All 35+ canonical URLs in src/app/ pages ✓
- Site config, metadata, JSON-LD schema ✓
- robots.txt, sitemap.xml, tdmrep.json ✓
- indexnow ping script targeting preissertech.com ✓

### Brand Consolidation Status
- **Company name**: "Preisser Tech" (LIVE) ✓
- **Primary domain**: preissertech.com (LIVE) ✓
- **Email**: sales@preissertech.com ✓
- **Phone**: +1-620-352-3296 ✓
- **Location**: Hays, Kansas ✓
- **Founder**: Tyler Preisser ✓
- **LinkedIn company page**: UNKNOWN — social link in site-config points to `/company/preissersolutions` (needs rename to `/company/preissertech`)
- **Facebook**: UNKNOWN — social link in site-config points to `/preissersolutions` (needs update)

---

## SEO Equity & Migration Status

### Current URL Structure (35 core + 70 AEO = 105 total pages)

**Core pages** (always-visible):
- `/` (homepage)
- `/about` — Tyler's story
- `/services` — Service portfolio
- `/contact` — Contact form
- `/why-automation` — Business case
- `/roi-calculator` — Interactive ROI tool
- `/preisser-technology` — Brand defense
- `/tyler-preisser` — Founder brand
- `/custom-websites` — Service detail
- `/web-applications` — Service detail
- `/business-automation` — Service detail
- `/ai-agents` — Service detail
- `/dashboards-and-analytics` — Service detail
- `/premium-web-development-kansas` — Premium positioning
- `/faq` — FAQ
- `/pricing` — Pricing info
- `/process` — Methodology
- `/press` — Press/news

**Geographic expansion** (70 AEO pages, crawlable):
- `/locations/hays-kansas` (anchor page)
- `/locations/{city}-kansas` — 8 Kansas cities (Wichita, Salina, Topeka, Manhattan, Garden City, Great Bend, Dodge City, and implied others)
- `/industries/{vertical}` — 5 verticals (HVAC, Oil & Gas, Healthcare, Insurance/Financial, Manufacturing)
- `/compare/{competitor}` — 4 comparison pages (Adams Brown, Lost Highway Media, Pluto Sites, Akeratos)

### Redirect Map Status
**RESOLVED (2026-05-04)** — `preissersolutions.com` redirects to `preissertech.com` correctly.
- Apex `https://preissersolutions.com/` → `HTTP 301 Location: https://preissertech.com/`
- `https://www.preissersolutions.com/` → `HTTP 301 Location: https://preissertech.com/`
- 5/5 sampled deep paths (`/services`, `/about`, `/contact`, `/roi-calculator`, `/why-automation`) → path-preserving `HTTP 301`
- Implementation: Cloudflare edge-level (Bulk Redirect) — path-preserving, no backend handler.
- robots.txt deep-path Disallows: REMOVED (commit `97a91ea`, 2026-05-04 evening).

**Legacy `.html` URL coverage** (added 2026-05-04 late evening, commit `0e9006d`):
- `preissertech.com/contact.html` → `301 → https://preissertech.com/contact` ✓
- `preissertech.com/services.html` → `301 → https://preissertech.com/services` ✓
- `preissertech.com/about.html` → `301 → https://preissertech.com/about` ✓
- `preissertech.com/why-automation.html` → `301 → https://preissertech.com/why-automation` ✓
- `preissertech.com/roi-calculator.html` → `301 → https://preissertech.com/roi-calculator` ✓
- `preissertech.com/index.html` → `301 → https://preissertech.com/` ✓
- `preissertech.com/pricing.html`, `/process.html`, `/faq.html` → respective clean URLs ✓
- Full chain for GSC sample pages: `preissersolutions.com/contact.html` → 301 (Bulk Redirect) → `preissertech.com/contact.html` → 301 (Pages _redirects) → `preissertech.com/contact`

### Schema & Metadata
- **JSON-LD**: Organization schema present in `src/app/layout.tsx` ✓
- **alternateName**: Lists both "Preisser Technology" and "Preisser Solutions" (should remove Solutions)
- **Meta tags**: All pages have canonical URLs ✓
- **Open Graph**: og:image, og:title, og:description in place ✓
- **Schema validation**: UNKNOWN — playbook says "validate via validator.schema.org daily" (Loop C)

### Sitemap & Robots
- `public/sitemap.xml` — Generated and up-to-date ✓
- `public/robots.txt` — UNKNOWN if present (critical for Bing/Google crawling)
- **IndexNow**: Script at `scripts/indexnow-ping.mjs` pings Bing for Preisser Tech updates ✓

---

## Current State Assessment

### What's Complete (STABLE)
1. **Website design & build** — Stripe-exact visual clone, 105 pages, all building clean
2. **Branding** — "Preisser Tech" established, site-config correct, metadata updated
3. **Hosting & deployment** — Cloudflare Pages live, GitHub Actions CI/CD working
4. **Content** — All pages have real copy (not placeholders), case studies present
5. **Monitoring system** — Daily mention/backlink tracker live since 2026-05-03
6. **Outreach kit** — 50+ press/social/podcast assets ready to deploy
7. **Strategic playbook** — 12-section operations manual generated with timeline

### What's In Progress
1. **SEO execution** — All Phase 2 tactics not yet deployed (LinkedIn, press, tier 1 submissions, etc.)
2. **Competitor monitoring** — System built but needs baseline establishment
3. **Content loops** — Endless-loop optimizers (A–J) defined but not yet running

### What Needs Attention
1. **Brand cleanup** — package.json/wrangler.toml still reference "preisser-solutions" (cosmetic, not critical)
2. **Social link updates** — site-config LinkedIn/Facebook URLs need to point to preissertech accounts
3. **301 redirects** — Verify preissersolutions.com → preissertech.com migration is complete
4. **Google Search Console** — Need to confirm setup and "Change of Address" submission
5. **LinkedIn company page rename** — From /company/preissersolutions → /company/preissertech
6. **Robots.txt verification** — Confirm file exists and allows all crawlers

### Performance & Traffic
- **Build time**: < 1 minute (clean build)
- **Page count**: 105 (35 core + 70 AEO)
- **Performance**: UNKNOWN — no Lighthouse or Core Web Vitals data captured yet
- **Current traffic**: UNKNOWN — no analytics setup mentioned
- **Conversion rate**: UNKNOWN — form goes to Zapier webhook (fire-and-forget)

---

## Open Questions for Tyler

1. **GSC Change of Address**: ABANDONED. Pivoting to sitemap path. See Migration Status above.

2. **Cloudflare-managed robots.txt**: ACTIVE BLOCKER. Cloudflare is prepending Disallow rules for all major AI crawlers. Must be disabled in CF dashboard for BOTH zones. See NEEDS_TYLER.md item #1.

3. **Domain migration**: ~~Is `preissersolutions.com` still registered? Are old URLs 301'd to new equivalents?~~ **RESOLVED (2026-05-04 investigation)** — Both domains are registered and on Cloudflare. Apex, www, and 5/5 sampled deep paths return `HTTP 301` with path-preserving Location to preissertech.com. Migration redirect layer is healthy.
2. **Google Search Console**: Tyler confirmed both sc-domain properties are verified. Change of Address validation FAILED (2026-05-04) on `http://preissersolutions.com/` ("Couldn't fetch") and legacy `.html` sample pages. Code fix deployed (commit `0e9006d`). Remaining blocker: Cloudflare "Always Use HTTPS" and Security Level must be toggled by Tyler before retrying. See NEEDS_TYLER.md top section for exact steps.
3. **GitHub repo**: Still UNKNOWN externally (no public README or footer link found). NEEDS TYLER.
4. **Analytics**: Externally observable: NO GA4 / Plausible / Fathom / Cloudflare Web Analytics tag detected in the homepage HTML. Confirms STATE.md prior assumption. NEEDS TYLER (decide on analytics provider; recommend Cloudflare Web Analytics — free, no cookies, already on CF).
5. **LinkedIn company page**: **RESOLVED — neither `/company/preissertech` nor `/company/preissersolutions` exists** (both 404). The `site-config.ts` link to `/company/preissersolutions` is currently a dead link. ACTION: create LinkedIn company page from scratch, then update `site-config.ts`.
6. **Facebook page**: **RESOLVED — `/preissertech` does NOT exist; `/preissersolutions` IS LIVE** (30 likes, "Ai Efficiency Consultants", recent 2025 photo). ACTION: rename existing FB page (Settings → Page Info → Username + Name) rather than creating a new one — preserves the small follower base and any internal page-ID-based bookmarks.
7. **Deployment secrets**: Not externally observable. NEEDS TYLER.
8. **Phase 2 ownership**: Not externally observable. NEEDS TYLER.

### New questions surfaced by investigation
14. **Bing "DNS could not connect" failure**: **RESOLVED (2026-05-04 ~16:00 UTC investigation)** — Exhaustive multi-resolver / multi-layer probe found NO live misconfiguration. All 5 public DNS resolvers + 2 DoH endpoints + parent gtld + zone NS agree. TLS/HTTP/Cloudflare edge clean to 4 different Bingbot UAs (no `cf-mitigated`, no challenge). robots.txt allows Bingbot. **Most likely root cause = Bing-side stale cache from initial propagation window** (domain is 2 days old, created 2026-05-02T16:15:27Z, still in ICANN `addperiod` grace). **Action**: Bing Webmaster Tools → URL Inspection → Live URL Test → Submit URL on `preissertech.com/` to force Bing to flush its cached failure. Full forensic in `.context/DNS_DIAGNOSTIC_2026-05-04.md`.

9. **Build redeploy**: **RESOLVED 2026-05-04 evening** — Cloudflare Pages auto-deploy was silently failing (commit `9bb846b` on GitHub never triggered a deploy). Wrangler force-deploy `7025ed47` executed. JSON-LD leak confirmed closed. Root cause of auto-deploy failure unknown — Tyler should check Cloudflare dashboard → Pages → preisser-solutions → Settings → Builds & deployments → Git integration. For future deploys: `wrangler pages deploy out --project-name=preisser-solutions --branch=main` is the reliable path.
10. **robots.txt strategy confirmation**: **RESOLVED 2026-05-04 evening** — Deep-path Disallows removed (commit `97a91ea`). Decision: removing Disallows is consistent with the overall migration goal (full equity transfer) and with the sitemap including those pages at 0.8-0.9 priority. Cache propagation within 4 hours of deploy.
11. **Wrangler project rename**: `wrangler.toml` `name = "preisser-solutions"` is what mints the live `preisser-solutions.pages.dev` hostname (currently `noindex` but publicly reachable). Rename the Cloudflare Pages project + wrangler.toml in lockstep, or accept the cosmetic mismatch?
12. **Twitter/X handle**: `@preissertech` is currently unclaimed (404). Claim it now to prevent squatting?
13. **Instagram username change**: Existing `@preissersolutions` IG handle is live and Tyler-controlled. Change username to `preissertech` (Instagram allows this; keeps followers and post history)?

---

## Recommended Phase 2 Execution Order

Based on the playbook's "Day 0 → Day 30 → Day 90 → Day 180" timeline, here's the priority order:

**Week 1 (CRITICAL — Knowledge Graph foundation)**:
1. Wikidata entry for Preisser Tech + Tyler Preisser (Tier 1)
2. Google Business Profile verification (Tier 1)
3. Bing Places listing (Tier 1)
4. LinkedIn company page rename + 5-client social proof reviews (Tier 1)
5. Clutch profile creation + 5 client reviews (Tier 2)
6. Submit 35-URL list to Bing (Tier 0)

**Week 2 (Press & Authority)**:
1. Press release distribution via PRWeb/PRNewswire (Tier 6)
2. Hays Post + KCBJ direct pitches (Tier 6)
3. FHSU Alumni News submission (Tier 6)
4. 5 podcast pitches (Sweaty Startup, Home Service Expert priority) (Tier 5)

**Weeks 3-4 (Community & Content)**:
1. 12 LinkedIn posts (3/week minimum) (Tier 5)
2. 4 Reddit posts (Tier 5)
3. Schema validation + fixes via Loop C (Tier 0)
4. GSC URL indexing (10 priority pages) (Tier 0)

**Month 2 (Compounding)**:
1. Activate Loops A–J (citation monitor, page generator, schema validator, etc.)
2. Monitor competitor movement (Loop F)
3. Monthly press release refresh
4. Quarterly backlink analysis

---

## Agents Charter & Operating Model

**TBD** — See `.context/AGENTS_CHARTER.md` for the full subagent operating protocol.

Quick version:
- Orchestrator (Claude Code main thread) delegates, never executes
- Subagents execute discrete tasks (web-code-executor, internet-investigator, etc.)
- Every subagent updates `.context/CHANGELOG.md` with dated entries
- Plans live in `.context/plans/`
- Agent learnings live in `.context/souls/`

---
