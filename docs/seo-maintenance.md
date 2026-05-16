# SEO Maintenance Schedule

Cadence for keeping the site competitive **after** the AI-native SEO rebuild ships. The build is
once; maintenance is forever. Without this cadence, rankings decay 6-12 months after launch.

> Companion docs:
> - `docs/seo-validation-checklist.md` — one-time post-deploy QA
> - `docs/local-seo-checklist.md` — GBP + citation setup (one-time)
> - `docs/local-citations.md` — full directory portfolio status
> - `docs/site-map.md` — full route index
> - `docs/priority-scorecard.md` — backlog with impact/effort scoring

---

## Weekly (~30 min)

Light-touch maintenance. Most weeks this is "skim and confirm nothing is broken."

- [ ] **GSC coverage:** open Google Search Console → Coverage → verify no new "Excluded" or "Error"
      pages have appeared. Investigate if count grew by >5 since last week.
- [ ] **Bing indexing:** Bing Webmaster Tools → Site Explorer → confirm indexed count is stable or
      growing.
- [ ] **Root files live:** `curl -sI` against `/llms.txt`, `/llms-full.txt`, `/robots.txt`,
      `/sitemap.xml` — all return `200`.
- [ ] **One helpful page** — publish or refresh one page. Either:
  - A new blog post (working from the R-067..R-087 queue), or
  - A meaningful refresh of an existing service / location / case-study page (add a fact, a quote,
    a new screenshot — not just date-bumping).
- [ ] **One internal link** — add an internal link from an existing page to a newer, less-linked
      page. Build "link equity" inward to the long tail.
- [ ] **Form submissions:** review contact-form submissions from the past week. Reply within 24h
      to anything that looks like a real lead. Audit lead quality: are we attracting the right
      buyers? (Wrong buyers = positioning copy is off.)
- [ ] **GBP posts:** confirm this week's GBP post is up (one per week minimum). See
      `docs/local-seo-checklist.md` §1.

---

## Monthly (~3-4 hours)

Substantive content + measurement work. Block a half-day.

### Content refreshes

- [ ] **Refresh one service page.** Add: a recent case-study link, a fresh stat or quote, an
      updated FAQ entry, a new schema property. Avoid pure date-bumping (Google ignores that).
- [ ] **Refresh one location page.** Add a local proof point — a Hays-area client mention (with
      permission), a stat about the local market, a regional FAQ ("Do you serve Great Bend?").
- [ ] **Add one case-study update.** Either a new case study from a finished project, OR a
      quarterly results update on an existing case study ("18 months in, here's where they are now").

### Technical health

- [ ] **Core Web Vitals.** Run [PageSpeed Insights](https://pagespeed.web.dev/) on:
  - Home page
  - The page receiving the most traffic this month (per GSC)
  - The page with the lowest CTR in GSC (probably needs work)
  - Verify LCP < 2.5s, CLS < 0.1, INP < 200ms. Log regressions in `docs/performance-audit.md`.
- [ ] **Sitemap health.** Verify `/sitemap.xml` reflects every published page; no 404s; no draft
      pages leaked.
- [ ] **Schema validation.** Re-run the 10 representative pages from
      `docs/seo-validation-checklist.md` §3 through Schema Markup Validator. Zero errors.

### Local rankings

- [ ] **Manual local-rank check.** Use an incognito window, set location to Hays via VPN or use a
      tool like GMB Crush. Check:
  - "ai automation hays ks"
  - "web design hays kansas"
  - "ai consulting hays"
  - "custom software great bend kansas"
  - "local seo salina kansas"
  - "ai agency western kansas"
  - "premium web development kansas"
  - "ai search optimization kansas"

  Record top 3 positions in `docs/ai-citation-log.md` (or a sibling `docs/local-rank-log.md`).

### AI citation prompt battery

- [ ] Run the full 20-prompt battery from `docs/seo-validation-checklist.md` §8 across all four
      platforms (Perplexity, ChatGPT, Gemini, Claude). Log results. Identify the 1-2 prompts where
      we're farthest from being cited; create a corresponding "improve page X" item in
      `docs/priority-scorecard.md`.

---

## Quarterly (~1 day)

Heavy audit + plan adjustment. Block a full day.

### Site audit

- [ ] **Full crawl** — run [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) (free for
      < 500 URLs) or Sitebulb against `https://preissersolutions.com`. Verify:
  - Zero 4xx errors (any broken internal link gets fixed)
  - Zero 5xx errors
  - No infinite redirect loops
  - Every page has unique title, unique meta description, single H1, canonical pointing to self
  - No mixed-content warnings
- [ ] **Rebuild query map.** Pull GSC's Performance → Queries report for the last 90 days. Identify:
  - **New impressions, no clicks:** queries we're showing up for but losing — improve the page's
    title/meta to win the click.
  - **High CTR, low position:** queries we're winning the click on but ranking poorly — add depth
    to the page to climb.
  - **Disappeared queries:** queries we used to rank for that we don't anymore — rescue the page.

  Save the analysis to `docs/query-map-YYYY-QN.md` (one per quarter; never overwrite).

### Competitive snapshot

- [ ] **Top 5 Hays-area competitors** (CSG Media, Imagemakers, etc. — list in `docs/decisions.md`).
      For each:
  - Note new pages they've added.
  - Note positioning shifts in their hero copy.
  - Note new services they've launched.
  - Run them through the 20-prompt AI battery; compare citation rate to ours.

  If a competitor leapfrogs us on a prompt, file a remediation item.

### AI-platform content

- [ ] **Update `public/llms-full.txt`** to reflect every new page added in the quarter. The file
      is regenerated by build automation, but verify the build script's page list includes the
      new routes from `docs/site-map.md`.
- [ ] **Re-validate `public/llms.txt`** structure — ensure new top-categories aren't being missed.
- [ ] **Cross-platform Q&A** — pick the 3 weakest AI citation prompts from the monthly batteries
      this quarter and write a dedicated page or section targeting them. Add to the AEO data files
      where the architecture supports it; otherwise, a new `/insights/...` page.

### GBP + citations

- [ ] **GBP audit.** Per `docs/local-seo-checklist.md` §1:
  - Categories still match service mix?
  - Services list reflects current site services?
  - Photos refreshed (rotate 1-2 per quarter)?
  - Posts on cadence (≥1/week)?
  - Reviews responded to within 48h, 100% of the time?
- [ ] **Citation consistency.** Pick 5 directories from `docs/local-citations.md` Tier 1-3 at
      random. Verify NAP exactly matches the canonical NAP. Fix drift on the spot. Aggregators
      (Yext, Foursquare, etc.) can auto-mutate listings — quarterly catches this before it
      compounds.

### Priorities reset

- [ ] **Re-score** `docs/priority-scorecard.md`. Per the doc's own rules: re-score items where
      evidence has shifted (e.g., GBP is driving 60% of leads → all GBP-adjacent items move to
      Impact=5). Move completed items to a "Done this quarter" archive section.
- [ ] **30/60/90 refresh.** Update `.context/plans/30-60-90.md` (or the equivalent file) with the
      next 90 days of priorities.

---

## Annual

- [ ] **Full citation sweep.** Every directory in `docs/local-citations.md` — Tier 1-6. Verify
      still live, still consistent. Re-claim anything that's drifted.
- [ ] **Information-architecture review.** Are categories on the site still the right cuts? Should
      any URLs be retired or merged? (Plan redirects carefully; never just delete.)
- [ ] **Tech stack audit.** Are Next.js / React versions current? Tailwind v4 still the right
      choice? GSAP license still valid? Cloudflare Pages still the right host?
- [ ] **Brand audit.** Verify no "Preisser Tech" or other-brand drift has crept in. Grep
      everywhere:
  ```bash
  grep -ri "preisser tech\|preissertech" --exclude-dir=node_modules --exclude-dir=.next .
  ```

---

## Triggers (event-driven, not scheduled)

Some maintenance is triggered by events, not the calendar:

- **New page added** → request indexing in GSC + BWT; run `npm run indexnow`; add to `docs/site-map.md`.
- **Page deleted** → set up 301 in `public/_redirects`; update `docs/site-map.md`; verify in GSC.
- **NAP change** → update `src/data/site-config.ts`, sweep every directory in
  `docs/local-citations.md`, update `docs/local-seo-checklist.md` "Canonical NAP" section.
- **Algorithm update (Google announces)** → check rankings 30 days later; document any volatility
  in `docs/decisions.md`.
- **AI platform launches / shifts** (new ChatGPT search, new Claude search, etc.) → add a battery
  for the new platform; update `docs/perplexity-strategy.md` and `public/llms.txt` accordingly.

---

_Last updated: 2026-05-16._
