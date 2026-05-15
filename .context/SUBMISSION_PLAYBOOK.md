# Search Engine & Directory Submission Playbook

**Generated**: 2026-05-04
**Site**: https://preissersolutions.com
**Sitemap**: https://preissersolutions.com/sitemap.xml
**Source**: Live `sitemap.xml` parse + per-platform docs (May 2026)

> Sitemap snapshot: **106 URLs in `<url>` elements**. The "109" figure used elsewhere in `.context/CHANGELOG.md` includes 3 non-page resources (`sitemap.xml`, `llms.txt`, `feed.xml`) submitted via IndexNow but intentionally excluded from the XML sitemap. Use **106** for sitemap-based submissions, **109** for IndexNow.

---

## STAGE 1 — URL INVENTORY (106 from sitemap)

### Categorized counts

| Category | Count | URL pattern |
|---|---|---|
| Core pages | 12 | /, /about, /services, /contact, /why-automation, /roi-calculator, /preisser-solutionsnology, /tyler-preisser, /faq, /pricing, /process, /press |
| AEO service detail pages | 5 | /custom-websites, /web-applications, /business-automation, /ai-agents, /dashboards-and-analytics |
| Sub-services | 10 | /services/local-seo, /services/ai-search-optimization, /services/website-redesign, /services/website-migration, /services/custom-crm, /services/client-portal, /services/ai-invoicing, /services/ai-customer-service, /services/conversion-optimization, /services/api-integration |
| Geo landing | 1 | /premium-web-development-kansas |
| Case studies | 5 | /case-studies + 4 children (cassidy-hvac, hg-oil-holdings, iron-and-oak-podcast, wife-supply-co) |
| Locations (Kansas cities) | 32 | /locations/{hays,wichita,salina,topeka,manhattan,garden-city,great-bend,dodge-city,russell,plainville,phillipsburg,norton,hill-city,smith-center,concordia,beloit,pratt,emporia,pittsburg,newton,atchison,ottawa,coffeyville,parsons,hutchinson,liberal,goodland,colby,mcpherson,junction-city,lawrence,olathe,overland-park}-kansas |
| Industries | 20 | /industries/{hvac,oil-gas,healthcare,insurance-financial,manufacturing,plumbing,electrical,roofing,landscaping,pest-control,garage-door,auto-service,veterinary,dental,real-estate,construction,trucking-logistics,restaurants,retail,agriculture} |
| Comparison pages | 21 | /compare/{adams-brown, lost-highway-media, pluto-sites, akeratos, wix-vs-custom, squarespace-vs-custom, webflow-vs-custom-coded, shopify-vs-custom-ecommerce, wordpress-vs-custom, hubspot-vs-custom-crm, salesforce-vs-custom-crm, bubble-vs-custom-coded, flutterflow-vs-custom-coded, zapier-vs-custom-automation, make-com-vs-custom-automation, conceptualized-design, toucan-design, csg-media, imagemakers, kc-web-designer} |
| **TOTAL** | **106** | |

---

## STAGE 2 — TOP 10 PRIORITY URLs (manual Request Indexing)

These are the URLs Tyler should manually paste into Google Search Console URL Inspection (and Bing URL Submission) one-by-one. Ranked by likely conversion impact and AI-citation value:

```
https://preissersolutions.com/
https://preissersolutions.com/pricing
https://preissersolutions.com/services
https://preissersolutions.com/contact
https://preissersolutions.com/about
https://preissersolutions.com/press
https://preissersolutions.com/roi-calculator
https://preissersolutions.com/business-automation
https://preissersolutions.com/ai-agents
https://preissersolutions.com/custom-websites
```

**Rationale**: Homepage + offer page + lead-capture (contact, ROI calc) + trust signals (press, about) + 3 highest-ticket service pages. These produce 80%+ of likely revenue impact if rank-indexed quickly.

---

## STAGE 3 — PER-PLATFORM SUBMISSION GUIDE

### 1. Google Search Console — `https://search.google.com/search-console`
- **Auth**: Google account, property must be verified (DNS TXT or HTML tag — already set up per CHANGELOG).
- **Sitemap submission**: Property → left nav **Sitemaps** → enter `sitemap.xml` (relative to root) → **Submit**.
- **Manual**: URL Inspection tool (top search bar) → paste full URL → wait for live result → click **Request Indexing**.
- **Rate limit**: Google does not publish exact number. Community-verified ~10–15 manual indexing requests per property per day. Sitemap submissions do not count against this.
- **Covers**: Google Search, Google News, Google Discover, AI Overviews/Gemini grounding.

### 2. Bing Webmaster Tools — `https://www.bing.com/webmasters`
- **Auth**: Microsoft account, site must be verified (XML file, meta tag, or DNS).
- **Sitemap submission**: Site → left nav **Sitemaps** → **Submit sitemap** → enter full URL `https://preissersolutions.com/sitemap.xml`.
- **Manual**: Left nav **URL Submission** → paste up to 10 URLs at a time, newline-separated.
- **Rate limit**: Default **10 URLs/day, 100/month** for new sites. Trusted/older sites can earn up to **10,000/day**. Quota visible in dashboard.
- **Covers**: Bing, Yahoo, DuckDuckGo, Ecosia, AOL, Qwant (all syndicate from Bing index), ChatGPT search/Copilot.

### 3. IndexNow — `https://api.indexnow.org/indexnow`
- **Auth**: Static key file at site root (already deployed: `public/cd9d2166e08f09a44331c911b5dace2d.txt`).
- **Bulk**: POST JSON array (up to 10,000 URLs per request) to `https://api.indexnow.org/indexnow`.
- **Already automated**: `scripts/indexnow-ping.mjs` — re-run anytime URLs change.
- **Rate limit**: HTTP 429 if "too frequent" (undocumented threshold; once per content change is safe).
- **Covers**: Bing, Yandex, Seznam, Naver, Yep.com (Ahrefs), DuckDuckGo (via Bing). **Does NOT cover Google.**

### 4. Yandex Webmaster — `https://webmaster.yandex.com`
- **Auth**: Yandex account; verify via HTML file, meta tag, DNS TXT, or Yandex.Metrica connection.
- **Sitemap**: Indexing → Sitemap files → Add → enter sitemap URL.
- **Manual**: Indexing → Reindex pages → paste URLs (up to 30/day for new sites, more later).
- **Note**: IndexNow already pushes to Yandex automatically. Adding a verified property gives you Yandex's diagnostic tools on top.
- **Priority**: LOW for US B2B (negligible Russian traffic for Kansas consultancy). Skip unless time permits.

### 5. Brave Search Webmaster — Currently no public submission tool
- **Status (May 2026)**: Brave Search has no webmaster dashboard or sitemap submission portal. They crawl independently and partially syndicate from Google. No submission action available.
- **Action**: `[verify in dashboard — no portal exists]`. Skip.

### 6. DuckDuckGo
- **No separate submission**. DDG uses Bing's index + their own crawler. Bing submission covers it.

### 7. Mojeek — `https://www.mojeek.com/services/search/website-owners/`
- **Auth**: None. Public submission form.
- **Submission URL**: `https://www.mojeek.com/submit` — enter site URL one at a time.
- **Bulk**: No public bulk API. Submit homepage and let crawler discover via sitemap.
- **Priority**: LOW. Negligible US B2B traffic. Submit homepage only (5 minutes).

### 8. Yep.com (Ahrefs)
- **No webmaster portal**. Yep.com is in the IndexNow consortium, so the IndexNow ping (already done) covers it.

### 9. Kagi
- **No submission portal**. Kagi crawls independently and uses third-party indexes (Bing, Mojeek, Marginalia). Bing submission covers most of this.

### 10. Baidu Webmaster — `https://ziyuan.baidu.com`
- **Auth requires Chinese phone + government ID**. Not viable without Chinese entity.
- **Priority**: SKIP for US-focused Kansas B2B.

### 11. You.com / Perplexity / ChatGPT Search
- No public webmaster submission. They crawl from Bing/Google indexes + Common Crawl. Quality content + GSC + Bing coverage = covered.
- **Action**: None directly. The AEO work in `.context/AEO_AUDIT_2026-05-04.md` is the right vector here.

---

### Knowledge graph & local (CRITICAL for AI citation lift)

### 12. Google Business Profile — `https://business.google.com`
- Claim "Preisser Solutionsnology" listing for Hays, KS. Add: photos, services list (matches site sub-services), service area (all 32 Kansas locations), website link, hours. Verify via postcard or video.
- **Priority**: HIGHEST among directories. Drives Google Maps + AI Overviews local citations.

### 13. Bing Places for Business — `https://www.bingplaces.com`
- Microsoft-owned local listing. Same data as GBP. Often imports directly from GBP if you sign in with same business name.
- **Priority**: HIGH. Drives Bing Maps + Copilot local results.

### 14. Apple Maps Connect — `https://mapsconnect.apple.com`
- Required for Apple Maps + Siri + iPhone "near me" queries. Verify via phone callback.
- **Priority**: MEDIUM. ~25% of US mobile search.

### 15. Wikidata — `https://www.wikidata.org`
- Create entity for "Preisser Solutionsnology" (company). Add: instance of (business), founded by (Tyler Preisser), located in (Hays, Kansas), official website, industry (software development). Wikidata feeds Google Knowledge Panel, ChatGPT, Perplexity.
- **Priority**: HIGH for AI citations. ~30 min to create entity.

---

### B2B directories (AI citation lift per AEO playbook)

### 16. Clutch.co — `https://clutch.co/get-listed`
- Free basic listing. Paid tiers for premium placement. Get 1 verified client review for instant credibility boost.
- **Priority**: HIGH. Frequently cited by ChatGPT/Perplexity for "best [service] companies."

### 17. G2 — `https://www.g2.com/contributor`
- Self-serve company page creation. Best if you have a SaaS/product. For services, lower priority.
- **Priority**: MEDIUM (better fit when productized offering ships).

### 18. Capterra / GetApp / Software Advice — Gartner Digital Markets
- Single Gartner profile feeds all three. For consultancy without product: lower priority.
- **Priority**: LOW until productized offering.

### 19. GoodFirms — `https://www.goodfirms.co/get-listed`
- Free basic listing. Similar to Clutch but lower domain authority.
- **Priority**: MEDIUM.

### 20. UpCity — `https://upcity.com/marketplace`
- US-focused B2B marketplace. Free listing + verification.
- **Priority**: MEDIUM.

---

## STAGE 4 — FORMATTED URL LISTS

### 4A. Newline-separated, ALL 106 URLs (paste into Bing URL Submission in batches of 10, or any "URLs per line" textbox)

```
https://preissersolutions.com/
https://preissersolutions.com/about
https://preissersolutions.com/services
https://preissersolutions.com/contact
https://preissersolutions.com/why-automation
https://preissersolutions.com/roi-calculator
https://preissersolutions.com/preisser-solutionsnology
https://preissersolutions.com/tyler-preisser
https://preissersolutions.com/custom-websites
https://preissersolutions.com/web-applications
https://preissersolutions.com/business-automation
https://preissersolutions.com/ai-agents
https://preissersolutions.com/dashboards-and-analytics
https://preissersolutions.com/premium-web-development-kansas
https://preissersolutions.com/services/local-seo
https://preissersolutions.com/services/ai-search-optimization
https://preissersolutions.com/services/website-redesign
https://preissersolutions.com/services/website-migration
https://preissersolutions.com/services/custom-crm
https://preissersolutions.com/services/client-portal
https://preissersolutions.com/services/ai-invoicing
https://preissersolutions.com/services/ai-customer-service
https://preissersolutions.com/services/conversion-optimization
https://preissersolutions.com/services/api-integration
https://preissersolutions.com/faq
https://preissersolutions.com/pricing
https://preissersolutions.com/process
https://preissersolutions.com/press
https://preissersolutions.com/case-studies
https://preissersolutions.com/case-studies/cassidy-hvac
https://preissersolutions.com/case-studies/hg-oil-holdings
https://preissersolutions.com/case-studies/iron-and-oak-podcast
https://preissersolutions.com/case-studies/wife-supply-co
https://preissersolutions.com/locations/hays-kansas
https://preissersolutions.com/locations/wichita-kansas
https://preissersolutions.com/locations/salina-kansas
https://preissersolutions.com/locations/topeka-kansas
https://preissersolutions.com/locations/manhattan-kansas
https://preissersolutions.com/locations/garden-city-kansas
https://preissersolutions.com/locations/great-bend-kansas
https://preissersolutions.com/locations/dodge-city-kansas
https://preissersolutions.com/locations/russell-kansas
https://preissersolutions.com/locations/plainville-kansas
https://preissersolutions.com/locations/phillipsburg-kansas
https://preissersolutions.com/locations/norton-kansas
https://preissersolutions.com/locations/hill-city-kansas
https://preissersolutions.com/locations/smith-center-kansas
https://preissersolutions.com/locations/concordia-kansas
https://preissersolutions.com/locations/beloit-kansas
https://preissersolutions.com/locations/pratt-kansas
https://preissersolutions.com/locations/emporia-kansas
https://preissersolutions.com/locations/pittsburg-kansas
https://preissersolutions.com/locations/newton-kansas
https://preissersolutions.com/locations/atchison-kansas
https://preissersolutions.com/locations/ottawa-kansas
https://preissersolutions.com/locations/coffeyville-kansas
https://preissersolutions.com/locations/parsons-kansas
https://preissersolutions.com/locations/hutchinson-kansas
https://preissersolutions.com/locations/liberal-kansas
https://preissersolutions.com/locations/goodland-kansas
https://preissersolutions.com/locations/colby-kansas
https://preissersolutions.com/locations/mcpherson-kansas
https://preissersolutions.com/locations/junction-city-kansas
https://preissersolutions.com/locations/lawrence-kansas
https://preissersolutions.com/locations/olathe-kansas
https://preissersolutions.com/locations/overland-park-kansas
https://preissersolutions.com/industries/hvac
https://preissersolutions.com/industries/oil-gas
https://preissersolutions.com/industries/healthcare
https://preissersolutions.com/industries/insurance-financial
https://preissersolutions.com/industries/manufacturing
https://preissersolutions.com/industries/plumbing
https://preissersolutions.com/industries/electrical
https://preissersolutions.com/industries/roofing
https://preissersolutions.com/industries/landscaping
https://preissersolutions.com/industries/pest-control
https://preissersolutions.com/industries/garage-door
https://preissersolutions.com/industries/auto-service
https://preissersolutions.com/industries/veterinary
https://preissersolutions.com/industries/dental
https://preissersolutions.com/industries/real-estate
https://preissersolutions.com/industries/construction
https://preissersolutions.com/industries/trucking-logistics
https://preissersolutions.com/industries/restaurants
https://preissersolutions.com/industries/retail
https://preissersolutions.com/industries/agriculture
https://preissersolutions.com/compare/adams-brown
https://preissersolutions.com/compare/lost-highway-media
https://preissersolutions.com/compare/pluto-sites
https://preissersolutions.com/compare/akeratos
https://preissersolutions.com/compare/wix-vs-custom
https://preissersolutions.com/compare/squarespace-vs-custom
https://preissersolutions.com/compare/webflow-vs-custom-coded
https://preissersolutions.com/compare/shopify-vs-custom-ecommerce
https://preissersolutions.com/compare/wordpress-vs-custom
https://preissersolutions.com/compare/hubspot-vs-custom-crm
https://preissersolutions.com/compare/salesforce-vs-custom-crm
https://preissersolutions.com/compare/bubble-vs-custom-coded
https://preissersolutions.com/compare/flutterflow-vs-custom-coded
https://preissersolutions.com/compare/zapier-vs-custom-automation
https://preissersolutions.com/compare/make-com-vs-custom-automation
https://preissersolutions.com/compare/conceptualized-design
https://preissersolutions.com/compare/toucan-design
https://preissersolutions.com/compare/csg-media
https://preissersolutions.com/compare/imagemakers
https://preissersolutions.com/compare/kc-web-designer
```

### 4B. Top-10 priority list (newline, for GSC manual Request Indexing — paste one at a time)

```
https://preissersolutions.com/
https://preissersolutions.com/pricing
https://preissersolutions.com/services
https://preissersolutions.com/contact
https://preissersolutions.com/about
https://preissersolutions.com/press
https://preissersolutions.com/roi-calculator
https://preissersolutions.com/business-automation
https://preissersolutions.com/ai-agents
https://preissersolutions.com/custom-websites
```

### 4C. Comma-separated (for any CSV-style API)

```
https://preissersolutions.com/,https://preissersolutions.com/about,https://preissersolutions.com/services,https://preissersolutions.com/contact,https://preissersolutions.com/why-automation,https://preissersolutions.com/roi-calculator,https://preissersolutions.com/preisser-solutionsnology,https://preissersolutions.com/tyler-preisser,https://preissersolutions.com/custom-websites,https://preissersolutions.com/web-applications,https://preissersolutions.com/business-automation,https://preissersolutions.com/ai-agents,https://preissersolutions.com/dashboards-and-analytics,https://preissersolutions.com/premium-web-development-kansas,https://preissersolutions.com/services/local-seo,https://preissersolutions.com/services/ai-search-optimization,https://preissersolutions.com/services/website-redesign,https://preissersolutions.com/services/website-migration,https://preissersolutions.com/services/custom-crm,https://preissersolutions.com/services/client-portal,https://preissersolutions.com/services/ai-invoicing,https://preissersolutions.com/services/ai-customer-service,https://preissersolutions.com/services/conversion-optimization,https://preissersolutions.com/services/api-integration,https://preissersolutions.com/faq,https://preissersolutions.com/pricing,https://preissersolutions.com/process,https://preissersolutions.com/press,https://preissersolutions.com/case-studies,https://preissersolutions.com/case-studies/cassidy-hvac,https://preissersolutions.com/case-studies/hg-oil-holdings,https://preissersolutions.com/case-studies/iron-and-oak-podcast,https://preissersolutions.com/case-studies/wife-supply-co,https://preissersolutions.com/locations/hays-kansas,https://preissersolutions.com/locations/wichita-kansas,https://preissersolutions.com/locations/salina-kansas,https://preissersolutions.com/locations/topeka-kansas,https://preissersolutions.com/locations/manhattan-kansas,https://preissersolutions.com/locations/garden-city-kansas,https://preissersolutions.com/locations/great-bend-kansas,https://preissersolutions.com/locations/dodge-city-kansas,https://preissersolutions.com/locations/russell-kansas,https://preissersolutions.com/locations/plainville-kansas,https://preissersolutions.com/locations/phillipsburg-kansas,https://preissersolutions.com/locations/norton-kansas,https://preissersolutions.com/locations/hill-city-kansas,https://preissersolutions.com/locations/smith-center-kansas,https://preissersolutions.com/locations/concordia-kansas,https://preissersolutions.com/locations/beloit-kansas,https://preissersolutions.com/locations/pratt-kansas,https://preissersolutions.com/locations/emporia-kansas,https://preissersolutions.com/locations/pittsburg-kansas,https://preissersolutions.com/locations/newton-kansas,https://preissersolutions.com/locations/atchison-kansas,https://preissersolutions.com/locations/ottawa-kansas,https://preissersolutions.com/locations/coffeyville-kansas,https://preissersolutions.com/locations/parsons-kansas,https://preissersolutions.com/locations/hutchinson-kansas,https://preissersolutions.com/locations/liberal-kansas,https://preissersolutions.com/locations/goodland-kansas,https://preissersolutions.com/locations/colby-kansas,https://preissersolutions.com/locations/mcpherson-kansas,https://preissersolutions.com/locations/junction-city-kansas,https://preissersolutions.com/locations/lawrence-kansas,https://preissersolutions.com/locations/olathe-kansas,https://preissersolutions.com/locations/overland-park-kansas,https://preissersolutions.com/industries/hvac,https://preissersolutions.com/industries/oil-gas,https://preissersolutions.com/industries/healthcare,https://preissersolutions.com/industries/insurance-financial,https://preissersolutions.com/industries/manufacturing,https://preissersolutions.com/industries/plumbing,https://preissersolutions.com/industries/electrical,https://preissersolutions.com/industries/roofing,https://preissersolutions.com/industries/landscaping,https://preissersolutions.com/industries/pest-control,https://preissersolutions.com/industries/garage-door,https://preissersolutions.com/industries/auto-service,https://preissersolutions.com/industries/veterinary,https://preissersolutions.com/industries/dental,https://preissersolutions.com/industries/real-estate,https://preissersolutions.com/industries/construction,https://preissersolutions.com/industries/trucking-logistics,https://preissersolutions.com/industries/restaurants,https://preissersolutions.com/industries/retail,https://preissersolutions.com/industries/agriculture,https://preissersolutions.com/compare/adams-brown,https://preissersolutions.com/compare/lost-highway-media,https://preissersolutions.com/compare/pluto-sites,https://preissersolutions.com/compare/akeratos,https://preissersolutions.com/compare/wix-vs-custom,https://preissersolutions.com/compare/squarespace-vs-custom,https://preissersolutions.com/compare/webflow-vs-custom-coded,https://preissersolutions.com/compare/shopify-vs-custom-ecommerce,https://preissersolutions.com/compare/wordpress-vs-custom,https://preissersolutions.com/compare/hubspot-vs-custom-crm,https://preissersolutions.com/compare/salesforce-vs-custom-crm,https://preissersolutions.com/compare/bubble-vs-custom-coded,https://preissersolutions.com/compare/flutterflow-vs-custom-coded,https://preissersolutions.com/compare/zapier-vs-custom-automation,https://preissersolutions.com/compare/make-com-vs-custom-automation,https://preissersolutions.com/compare/conceptualized-design,https://preissersolutions.com/compare/toucan-design,https://preissersolutions.com/compare/csg-media,https://preissersolutions.com/compare/imagemakers,https://preissersolutions.com/compare/kc-web-designer
```

### 4D. JSON array (for IndexNow / REST APIs — already handled by `scripts/indexnow-ping.mjs`)

```json
{
  "host": "preissersolutions.com",
  "key": "cd9d2166e08f09a44331c911b5dace2d",
  "keyLocation": "https://preissersolutions.com/cd9d2166e08f09a44331c911b5dace2d.txt",
  "urlList": [
    "https://preissersolutions.com/",
    "https://preissersolutions.com/about",
    "https://preissersolutions.com/services",
    "https://preissersolutions.com/contact",
    "https://preissersolutions.com/why-automation",
    "https://preissersolutions.com/roi-calculator",
    "https://preissersolutions.com/preisser-solutionsnology",
    "https://preissersolutions.com/tyler-preisser",
    "https://preissersolutions.com/custom-websites",
    "https://preissersolutions.com/web-applications",
    "https://preissersolutions.com/business-automation",
    "https://preissersolutions.com/ai-agents",
    "https://preissersolutions.com/dashboards-and-analytics",
    "https://preissersolutions.com/premium-web-development-kansas",
    "https://preissersolutions.com/services/local-seo",
    "https://preissersolutions.com/services/ai-search-optimization",
    "https://preissersolutions.com/services/website-redesign",
    "https://preissersolutions.com/services/website-migration",
    "https://preissersolutions.com/services/custom-crm",
    "https://preissersolutions.com/services/client-portal",
    "https://preissersolutions.com/services/ai-invoicing",
    "https://preissersolutions.com/services/ai-customer-service",
    "https://preissersolutions.com/services/conversion-optimization",
    "https://preissersolutions.com/services/api-integration",
    "https://preissersolutions.com/faq",
    "https://preissersolutions.com/pricing",
    "https://preissersolutions.com/process",
    "https://preissersolutions.com/press",
    "https://preissersolutions.com/case-studies",
    "https://preissersolutions.com/case-studies/cassidy-hvac",
    "https://preissersolutions.com/case-studies/hg-oil-holdings",
    "https://preissersolutions.com/case-studies/iron-and-oak-podcast",
    "https://preissersolutions.com/case-studies/wife-supply-co",
    "https://preissersolutions.com/locations/hays-kansas",
    "https://preissersolutions.com/locations/wichita-kansas",
    "https://preissersolutions.com/locations/salina-kansas",
    "https://preissersolutions.com/locations/topeka-kansas",
    "https://preissersolutions.com/locations/manhattan-kansas",
    "https://preissersolutions.com/locations/garden-city-kansas",
    "https://preissersolutions.com/locations/great-bend-kansas",
    "https://preissersolutions.com/locations/dodge-city-kansas",
    "https://preissersolutions.com/locations/russell-kansas",
    "https://preissersolutions.com/locations/plainville-kansas",
    "https://preissersolutions.com/locations/phillipsburg-kansas",
    "https://preissersolutions.com/locations/norton-kansas",
    "https://preissersolutions.com/locations/hill-city-kansas",
    "https://preissersolutions.com/locations/smith-center-kansas",
    "https://preissersolutions.com/locations/concordia-kansas",
    "https://preissersolutions.com/locations/beloit-kansas",
    "https://preissersolutions.com/locations/pratt-kansas",
    "https://preissersolutions.com/locations/emporia-kansas",
    "https://preissersolutions.com/locations/pittsburg-kansas",
    "https://preissersolutions.com/locations/newton-kansas",
    "https://preissersolutions.com/locations/atchison-kansas",
    "https://preissersolutions.com/locations/ottawa-kansas",
    "https://preissersolutions.com/locations/coffeyville-kansas",
    "https://preissersolutions.com/locations/parsons-kansas",
    "https://preissersolutions.com/locations/hutchinson-kansas",
    "https://preissersolutions.com/locations/liberal-kansas",
    "https://preissersolutions.com/locations/goodland-kansas",
    "https://preissersolutions.com/locations/colby-kansas",
    "https://preissersolutions.com/locations/mcpherson-kansas",
    "https://preissersolutions.com/locations/junction-city-kansas",
    "https://preissersolutions.com/locations/lawrence-kansas",
    "https://preissersolutions.com/locations/olathe-kansas",
    "https://preissersolutions.com/locations/overland-park-kansas",
    "https://preissersolutions.com/industries/hvac",
    "https://preissersolutions.com/industries/oil-gas",
    "https://preissersolutions.com/industries/healthcare",
    "https://preissersolutions.com/industries/insurance-financial",
    "https://preissersolutions.com/industries/manufacturing",
    "https://preissersolutions.com/industries/plumbing",
    "https://preissersolutions.com/industries/electrical",
    "https://preissersolutions.com/industries/roofing",
    "https://preissersolutions.com/industries/landscaping",
    "https://preissersolutions.com/industries/pest-control",
    "https://preissersolutions.com/industries/garage-door",
    "https://preissersolutions.com/industries/auto-service",
    "https://preissersolutions.com/industries/veterinary",
    "https://preissersolutions.com/industries/dental",
    "https://preissersolutions.com/industries/real-estate",
    "https://preissersolutions.com/industries/construction",
    "https://preissersolutions.com/industries/trucking-logistics",
    "https://preissersolutions.com/industries/restaurants",
    "https://preissersolutions.com/industries/retail",
    "https://preissersolutions.com/industries/agriculture",
    "https://preissersolutions.com/compare/adams-brown",
    "https://preissersolutions.com/compare/lost-highway-media",
    "https://preissersolutions.com/compare/pluto-sites",
    "https://preissersolutions.com/compare/akeratos",
    "https://preissersolutions.com/compare/wix-vs-custom",
    "https://preissersolutions.com/compare/squarespace-vs-custom",
    "https://preissersolutions.com/compare/webflow-vs-custom-coded",
    "https://preissersolutions.com/compare/shopify-vs-custom-ecommerce",
    "https://preissersolutions.com/compare/wordpress-vs-custom",
    "https://preissersolutions.com/compare/hubspot-vs-custom-crm",
    "https://preissersolutions.com/compare/salesforce-vs-custom-crm",
    "https://preissersolutions.com/compare/bubble-vs-custom-coded",
    "https://preissersolutions.com/compare/flutterflow-vs-custom-coded",
    "https://preissersolutions.com/compare/zapier-vs-custom-automation",
    "https://preissersolutions.com/compare/make-com-vs-custom-automation",
    "https://preissersolutions.com/compare/conceptualized-design",
    "https://preissersolutions.com/compare/toucan-design",
    "https://preissersolutions.com/compare/csg-media",
    "https://preissersolutions.com/compare/imagemakers",
    "https://preissersolutions.com/compare/kc-web-designer"
  ]
}
```

---

## STAGE 5 — WHAT'S ALREADY DONE (per `.context/CHANGELOG.md`)

| Item | Status | Date | Source line |
|---|---|---|---|
| IndexNow ping (109 URLs incl. sitemap.xml/llms.txt/feed.xml) | DONE — HTTP 200 | 2026-05-04 evening | CHANGELOG line 66 |
| IndexNow key file deployed (`cd9d2166e08f09a44331c911b5dace2d.txt`) | DONE | prior | CHANGELOG line 66 |
| Sitemap exists at `/sitemap.xml` (106 URLs, HTTP 200) | DONE | 2026-05-04 | CHANGELOG line 262 |
| Cloudflare IndexNow integration (Cloudflare auto-pings on cache purge) | NOT EXPLICITLY CONFIRMED in CHANGELOG — `[verify in Cloudflare dashboard]` | — | — |
| GSC sitemap submission (`sitemap.xml`) | **NOT CONFIRMED — Tyler likely needs to do this** | — | CHANGELOG line 316 implies fallback path exists |
| GSC URL Inspection Request Indexing on top 10 | **NOT DONE** | — | CHANGELOG line 247 only mentions Bing Inspection on `/` |
| Bing Webmaster sitemap submission | **NOT CONFIRMED** | — | CHANGELOG line 65 confirms NO Bing API auth set up |
| Bing Webmaster URL Submission for top 10 | **NOT DONE** | — | CHANGELOG line 247 mentions only Live URL Test on homepage |
| GSC Change of Address | ATTEMPTED, blocked by robots.txt 301 issue | 2026-05-04 | CHANGELOG lines 281-318 |
| Yandex / Mojeek / others | NOT DONE | — | — |
| Google Business Profile / Bing Places / Apple Maps | NOT DONE | — | — |

---

## STAGE 6 — RECOMMENDED ORDER OF OPERATIONS (tonight)

Designed for ~90 minutes total. Skip any step that's blocked.

| # | Step | Time | Notes |
|---|---|---|---|
| 1 | **GSC → Sitemaps** → submit `sitemap.xml` | 2 min | If property already verified. If not, verify first (DNS TXT or HTML tag in `<head>`). |
| 2 | **GSC → URL Inspection** → Request Indexing × 10 (Top-10 list above) | 15 min | ~1 min per URL (fetch live + click). Stop if "quota exhausted" message appears. |
| 3 | **Bing Webmaster** → register property → verify | 5 min | Use BingSiteAuth.xml or meta tag. Can also import directly from GSC. |
| 4 | **Bing Webmaster → Sitemaps** → submit `https://preissersolutions.com/sitemap.xml` | 2 min | |
| 5 | **Bing Webmaster → URL Submission** → paste Top 10 (or first 10 of full list) | 3 min | New sites get 10/day quota. |
| 6 | **Google Business Profile** → claim/create "Preisser Solutionsnology" Hays KS | 15 min | Add 5+ photos, full service list, 32 service-area cities, hours, website link. Verification arrives later by mail/video. |
| 7 | **Bing Places for Business** → import from GBP (one click if signed in same browser) | 5 min | |
| 8 | **Wikidata** → create entity for Preisser Solutionsnology | 20 min | Sign up, click Create New Item, add labels: company, founder, location, official site, industry. Cite preissersolutions.com/about as reference. |
| 9 | **Apple Maps Connect** → add business listing | 10 min | Verification by phone callback (instant). |
| 10 | **Clutch.co** → submit "Get Listed" form | 10 min | Free tier. Optional but high-value for AI citations. |
| 11 | **Mojeek** → submit homepage at `mojeek.com/submit` | 2 min | Fire and forget. |
| 12 | **Yandex Webmaster** (optional) | 5 min | Skip if time-pressed; IndexNow already covers it. |

**Estimated total: 60–90 minutes**, with steps 1–5 being the critical path (~30 min) for English-search dominance.

---

## STAGE 7 — VERIFICATION CHECKLIST (next 7 days)

After submission, verify uptake:

- **Day +1**: GSC Coverage report — check "Discovered, currently not indexed" count starts dropping.
- **Day +3**: `site:preissersolutions.com` Google query — should return >20 indexed pages.
- **Day +3**: `site:preissersolutions.com` Bing query — should return >20 indexed pages.
- **Day +7**: GSC Performance report — first impressions should appear for branded queries ("preisser technology", "preisser tech kansas").
- **Day +14**: Long-tail comparison page queries (e.g., "wix vs custom website kansas") should start showing impressions.

If indexing stalls past day 14 on the Top 10, Tyler should re-Request Indexing on stuck URLs (quota refreshes daily).

---

## NOTES / VERIFY-IN-DASHBOARD ITEMS

- Brave Search Webmaster portal: docs URL `https://search.brave.com/help/webmaster-tools` returned 404 in May 2026. **No public submission tool exists**. Brave crawls independently.
- Yep.com webmaster portal: `https://yep.com/help` returned 403. IndexNow consortium membership covers their crawl.
- GSC daily Request Indexing quota: Google does not publish a number. Community estimates 10–15/property/day.
- Bing daily URL Submission quota: 10 URLs/day for new sites; grows with site age and trust.
- Cloudflare IndexNow auto-integration: not explicitly logged in CHANGELOG. **`[verify in Cloudflare dashboard → Security → IndexNow]`** before assuming it's running.
