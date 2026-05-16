# SEO Validation Checklist (Manual, Post-Build)

Run through this after every deploy that touches routes, schema, sitemaps, or root files. Automated
validation lives in `scripts/validate-seo.mjs` (`npm run validate:seo`); this file covers the manual
QA that scripts can't do — Schema validator, Search Console submission, Lighthouse, AI prompt battery.

> Companion docs:
> - `docs/local-seo-checklist.md` — GBP + citation work
> - `docs/seo-maintenance.md` — weekly/monthly/quarterly cadence
> - `docs/site-map.md` — full route index
> - `scripts/validate-seo.mjs` — automated pre-deploy validator

---

## 1. Build + automated validation

```bash
npm install
npm run lint
npm run build
npm run validate:seo
```

- [ ] `npm install` clean (no peer-dep warnings that matter).
- [ ] `npm run lint` exits 0.
- [ ] `npm run build` completes; `/out` populated.
- [ ] `npm run validate:seo` exits 0 with `✅ SEO validation completed`.

If `validate:seo` fails, fix the offending pages before continuing — every later section assumes the
automated checks have already passed.

---

## 2. Root files served correctly (after deploy)

Replace `https://preissersolutions.com` if checking a preview deploy.

```bash
curl -sI https://preissersolutions.com/robots.txt        | head -1
curl -sI https://preissersolutions.com/sitemap.xml       | head -1
curl -sI https://preissersolutions.com/llms.txt          | head -1
curl -sI https://preissersolutions.com/llms-full.txt     | head -1
curl -sI https://preissersolutions.com/ai.txt            | head -1
```

- [ ] Each returns `200 OK`.
- [ ] `Content-Type` for `.txt` files is `text/plain; charset=utf-8`.
- [ ] `Content-Type` for `sitemap.xml` is `application/xml` (or `text/xml`).

```bash
curl -s https://preissersolutions.com/llms.txt | head -20
curl -s https://preissersolutions.com/llms-full.txt | wc -c
```

- [ ] `llms.txt` opens with `# Preisser Solutions` or similar entity statement.
- [ ] `llms-full.txt` is >50KB (full-content dump).

---

## 3. Schema validation

Validate 10 representative pages in [Schema Markup Validator](https://validator.schema.org/) and
[Google Rich Results Test](https://search.google.com/test/rich-results). Pick one of each type:

- [ ] `/` — `Organization`, `WebSite`, `LocalBusiness`, `Person` (Tyler)
- [ ] `/about` — `Person`, `Organization`
- [ ] `/contact` — `LocalBusiness`, `ContactPage`
- [ ] `/case-studies` — `CollectionPage`, `BreadcrumbList`
- [ ] `/case-studies/cassidy-hvac` — `Article`, `CreativeWork`, `BreadcrumbList`
- [ ] `/services/custom-websites` — `Service`, `Offer`, `BreadcrumbList`
- [ ] `/services/ai-search-optimization` — `Service`, `FAQPage`, `BreadcrumbList`
- [ ] `/locations/hays-kansas` — `LocalBusiness`, `Place`, `BreadcrumbList`
- [ ] `/use-cases/ai-invoice-processing-small-business` — `HowTo` or `Article`, `BreadcrumbList`
- [ ] `/industries/hvac-ai-receptionist` — `Service`, `FAQPage`, `BreadcrumbList`

For each:

- [ ] Zero errors in Schema validator.
- [ ] At most "informational" warnings in Rich Results Test (no real warnings).
- [ ] All `@id` references resolve (no dangling `@id` pointers).
- [ ] `LocalBusiness` entries include `address`, `geo`, `telephone`, `url`, `priceRange`, and
      `areaServed`.

---

## 4. Indexing — Google Search Console

- [ ] **Sitemap submitted:** `https://preissersolutions.com/sitemap.xml` shows "Success" in GSC.
- [ ] **Coverage report:** at least 90% of submitted URLs indexed (the other 10% is OK if it's
      paginated archives, etc.).
- [ ] **URL Inspection** — run on 5 representative pages: home, /about, /contact, one service,
      one location. All show:
  - [ ] "URL is on Google"
  - [ ] Canonical = the URL itself (not a different page)
  - [ ] No "page with redirect" or "duplicate without user-selected canonical" warnings
- [ ] **Request indexing** for any new page (Phase 3a-3g) that's not yet indexed.
- [ ] **Noindex check:** verify no production page has `<meta name="robots" content="noindex">` —
      `scripts/strip-404-noindex.mjs` should have handled this; spot-check `/about` and `/contact`.

---

## 5. Indexing — Bing Webmaster Tools

- [ ] Sitemap submitted to Bing Webmaster Tools.
- [ ] IndexNow ping verified (`npm run indexnow`) — most-recent URL appears in BWT within 24 hours.
- [ ] No "Sitemap errors" in BWT.

---

## 6. Internal linking

Spot-check 5 pages from each category. Every page should:

- [ ] Link to `/contact` (CTA — usually in hero + footer + a mid-page CTA block).
- [ ] Link to at least 2 service pages.
- [ ] Link to at least 1 case study (where relevant).
- [ ] Service pages link to at least 1 location page (e.g., `/services/custom-websites` links
      to `/locations/hays-kansas`).
- [ ] Location pages link to at least 2 service pages.
- [ ] Comparison pages link to the corresponding service page.
- [ ] Blog posts link to the most relevant service + 1 case study.
- [ ] No orphan pages (every page has at least 2 internal inbound links from the rebuilt site).

---

## 7. Core Web Vitals

Run [PageSpeed Insights](https://pagespeed.web.dev/) on 5 representative pages (home, about,
contact, one service, one location). Mobile + Desktop.

### Performance targets

- [ ] **Performance:** 90+ (target 95+)
- [ ] **SEO:** 100
- [ ] **Accessibility:** 95+
- [ ] **Best Practices:** 95+

### Vitals targets

- [ ] **LCP** < 2.5s (target < 1.8s)
- [ ] **CLS** < 0.1 (target < 0.05)
- [ ] **INP** < 200ms (target < 150ms)
- [ ] **TBT** < 200ms
- [ ] **TTFB** < 800ms (Cloudflare edge should be < 400ms)

If any vitals miss target, log it in `docs/performance-audit.md` and create a remediation item in
`docs/priority-scorecard.md`.

---

## 8. AI discoverability prompt battery

The point of the AI-native SEO upgrade is: when a Hays-area buyer asks Perplexity / ChatGPT /
Gemini / Claude "who do I hire for X?", **the site is cited**. Run this prompt battery monthly
across all four platforms; record outcomes.

### The 20 prompts

1. "Who does AI automation for small businesses in Hays, Kansas?"
2. "Best web design agency in Hays, Kansas."
3. "Who is Tyler Preisser?"
4. "Custom AI agents for HVAC companies in Kansas."
5. "Local SEO consultant in western Kansas."
6. "AI search optimization (AEO) services Kansas."
7. "Business automation consultant Hays KS."
8. "Who builds custom websites in Great Bend, Kansas?"
9. "AI invoice processing for small businesses."
10. "AI receptionist for HVAC companies."
11. "Custom CRM for trucking and logistics companies."
12. "Who does AI consulting in Hays, Kansas?"
13. "Best AI agency for Kansas businesses."
14. "Web application development Salina Kansas."
15. "Premium web development in Kansas."
16. "AI automation case studies for service businesses."
17. "Who can help my Hays business with AI?"
18. "Top automation consultants in western Kansas."
19. "AI agents for plumbing and HVAC dispatch."
20. "Custom software development Hays Kansas."

### Recording format (one row per prompt × platform)

| Date | Platform | Prompt # | Cited? | Mentioned? | Competitor cited | Page cited | Confusion wording | Next page to improve |
|---|---|---|---|---|---|---|---|---|
| 2026-05-16 | Perplexity | 1 | Yes | Yes | None | /services/ai-automation-hays-ks | — | — |
| 2026-05-16 | ChatGPT | 1 | No | No | csgmedia.com | — | "AI automation Hays KS" returned national results | /services/ai-automation-hays-ks (add more local proof) |

- **Cited?** Did the response include `preissersolutions.com` as a link or citation?
- **Mentioned?** Did the response mention "Preisser Solutions" or "Tyler Preisser" by name even
  without a link?
- **Competitor cited:** which competitor URL/name showed up instead.
- **Page cited:** if cited, which page (URL) the platform pointed to.
- **Confusion wording:** anything the AI got wrong (e.g., wrong location, wrong service).
- **Next page to improve:** which page on the site needs work to win this query next month.

Store the running log at `docs/ai-citation-log.md` (create on first run; append monthly).

### Targets by month 3

- [ ] **Cited or mentioned on 60%+ of prompts** across all 4 platforms.
- [ ] **Cited (linked) on 30%+ of prompts.**
- [ ] **No false attributions** (e.g., AI claiming Preisser Solutions does dental software).
- [ ] **Tyler personally surfaces** on the "Who is Tyler Preisser?" prompt on all 4 platforms.

---

## 9. Sign-off

- [ ] Build clean, automated validator passes.
- [ ] Root files served at `200 OK`.
- [ ] Schema validates on 10 representative pages.
- [ ] GSC + BWT show successful sitemap + indexed coverage.
- [ ] Internal linking spot-check passes.
- [ ] Lighthouse hits targets.
- [ ] AI prompt battery run + logged.

Date: _____________
Signed off by: _____________

---

_Last updated: 2026-05-16._
