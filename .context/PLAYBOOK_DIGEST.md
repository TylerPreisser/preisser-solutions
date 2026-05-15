# AI Domination Playbook — Executive Digest

**Source**: `/Users/tylerpreisser/Desktop/Preisser-Tech-AI-Domination-Playbook.pdf`  
**Generated**: 2026-05-03 (Query Dominance Agent System)  
**Author**: Preisser Solutions  
**Scope**: How to rank #1 on every AI engine and search platform for business automation services

---

## Executive Summary

There is no separate "AI ranking algorithm." Every major AI engine (ChatGPT, Perplexity, Google Gemini, Claude) sits on top of one of three classical search indexes (Bing, Google, Brave) and re-ranks results with its own LLM. The playbook is therefore: **win the underlying search index, then layer in structured data and entity signals so the LLM extracts and cites you.**

The strategy has 7 tiers of leverage, from highest (Knowledge Graph) to broadest (earned community signals). Success criteria: by Day 90, Preisser Solutions appears in top 3 Google/Bing for priority queries; by Day 180, dominant across all engines.

---

## Strategic Pillars

### Pillar 1: How Each AI Engine Works

**ChatGPT (OpenAI)**
- Retrieval: Bing Search API + OpenAI's own crawler (GPTBot, 0AI-SearchBot)
- Re-ranking: Semantic re-rank on top 5-10 results. Heavy weight on schema.org markup, first 100-200 words, named entities, last-modified dates.
- To win: Be in top 5 Bing organic + include clean answer paragraph + FAQPage schema

**Perplexity**
- Retrieval: Google index + own crawler (PerplexityBot) + high-trust partner indexes (Wikipedia, Crunchbase, LinkedIn, GitHub)
- Re-ranking: Citation-heavy. Heavy weight on domain authority, recent content, named statistics, aggregator sources (Clutch in top-cited B2B sources)
- To win: Wikipedia entry → Crunchbase → Clutch with named-client reviews → recent blog posts

**Google Gemini + AI Overviews**
- Retrieval: Google's full index + Knowledge Graph + Gemini LLM
- Re-ranking: Top organic + entities from Knowledge Graph. Heavy weight on verified Google Business Profile, Knowledge Panel data, FAQPage schema
- To win: Get into Google Knowledge Graph via Wikidata + consistent NAP across LinkedIn/Facebook/GBP

**Claude (Anthropic)**
- Retrieval: Brave Search API
- Re-ranking: Top 10-15 Brave results, semantic emphasis on clean backlink profiles + established brand signals
- To win: Same as Bing (Brave is easier than Google to rank in due to lower competitive density)

**Microsoft Copilot / Bing Chat**
- Retrieval: Bing + GPT-4
- Re-ranking: Anything that wins Bing wins Copilot
- To win: Win Bing first

### Pillar 2: The 7-Tier Leverage Stack

**Tier 0: Indexing Foundation**
- Submit 35 URLs to Bing via URL submission tool
- Verify site with Bing Webmaster Tools (Site Move feature for 301 migration)
- Allow all crawlers in robots.txt: GPTBot, PerplexityBot, ClaudeBot, GoogleBot, BingBot, BraveBot

**Tier 1: Knowledge Graph (Highest Leverage)**
These are the single biggest entity-graph signals AI engines reference:
1. **Wikidata** — Create entries for "Preisser Solutions" + "Tyler Preisser". Link as Founder. Every AI engine pulls from Wikidata.
2. **Google Business Profile** — Unlocks Google Knowledge Panel + AI Overviews + local pack. Business categories, reviews, attributes.
3. **Bing Places** — Same as GBP for Bing/Copilot.
4. **Apple Business Connect** — Apple Maps + Siri spotlighting.
5. **LinkedIn Company Page** — Rename from `/company/preissersolutions` → `/company/preissersolutions`. Authority signal pulled by every LLM.
6. **Crunchbase** — Tech-company credibility. List Tyler as Founder, case-study clients as customers.
7. **F6S** — Founder/startup graph. Tech credibility signal.
8. **Built In** — Tech-company directory cited by AI (rare for business automation, but signals tech credibility).
9. **GitHub Organization** — Create `github.com/preissersolutions`. Push open-source tooling if available.
10. **Schema Validation** — Validate all 35 pages' structured data at validator.schema.org. Clean schema = LLM extraction.

**Priority DO FIRST (Week 1)**:
- Wikidata entry
- Google Business Profile verification
- Bing Places listing
- LinkedIn rename
- Crunchbase update

**Tier 2: B2B Services Aggregators (Second-Highest Leverage)**
AI engines cite these heavily for "best [X] in [Y]" queries:
1. **Clutch** — THE B2B aggregator AI engines cite most. Get 5 named-client reviews (Cassidy HVAC, HG Oil, Iron & Oak, Wife Supply, +1). Ranked by verified reviews.
2. **GoodFirms** — Second-most-cited B2B aggregator
3. **DesignRush** — Heavy citations for "best web design firm in [city]"
4. **The Manifest** — Clutch's sister site
5. **Sortlist** — EU + US, some AI citation traction
6. **UpCity** — Local SMB-focused
7. **G2** — If productizing any vertical tools
8. **Capterra** — Same as G2

**Priority Week 1-2**:
- Clutch: get 5 client reviews (CRITICAL)
- GoodFirms: basic listing + 2 reviews

**Tier 3: Local Citations (Hays Parity)**
Match what local competitors (Adams Brown, Lost Highway, Pluto Sites) appear in:
1. **BBB** — Better Business Bureau. Week 1.
2. **Yelp Business** — Week 1.
3. **YellowPages** — Week 2.
4. **Manta** — Week 2.
5. **Hays Chamber of Commerce** — Week 1 (direct inquiry).
6. **Ellis County Economic Development** — Week 1.
7. **FHSU Alumni / Foundation directory** — Week 1 (Tyler qualifies).
8. **Wichita Tech Council** — Week 2.
9. **KC Tech Council** — Week 2.
10. **Kansas Chamber** — Week 2.
11. **Kansas Department of Commerce** — Week 2.

**Tier 4: Industry-Specific Directories (Per Case Study)**
Anchor each case study to credibility:
- **Cassidy HVAC**: ServiceTitan Marketplace, Housecall Pro Partner Directory, AHRA/ACCA member directories
- **HG Oil**: AAPL (American Association of Professional Landmen), API Wells database, Texas RRC/Kansas Corporation Commission
- **Verticals**: Webflow Expert Directory (web dev), HubSpot Solutions Partner (if partnership formalized)

**Tier 5: Earned Community Signals (Citation Graph)**
Independent third-party mentions = credibility:
- **Reddit** — Answer questions weekly in r/Kansas, r/HVAC, r/sweatystartup, r/smallbusiness, r/PowerBI. Named identity. 1 post/week minimum.
- **Quora** — Same (3/week questions answered with link).
- **Hacker News** — Submit technical posts under Tyler's name (1/month minimum, non-promotional).
- **IndieHackers** — Founder community. Cross-post tech content.
- **Dev.to** — Technical writing platform. Cross-publish deep-dives (2/week).
- **Medium** — Same (2/week technical posts).
- **LinkedIn long-form** — 3 posts/week, cite clients by name, named outcomes.
- **Substack / Beehiiv** — Own newsletter (future, not immediate priority).

**Tier 6: Press & PR (High Authority)**
Press outlets carry high domain authority. AI engines weight citations from press heavily:
1. **Paid distribution** (PRWeb/PRNewswire) — $400 single-release distribution reaches 500+ outlets simultaneously. All carry disambiguation ("Not affiliated with Helios-Preisser").
2. **Direct journalist pitches** (Hays Post, KCBJ, Kansas Reflector) — Local + regional authority. Highest conversion likelihood.
3. **Industry media** (Kansas Living, FHSU Alumni News, ICT Magazine) — Vertical credibility.
4. **TV/Radio** (KAKE, KWCH, KSAL) — Broadcast authority (harder to get, but highest single lift).

**Shortcut (from playbook)**:
> If you only do three things — Bing Webmaster Tools verification with Site Move, Wikidata entry, and Clutch profile with 5 named-client reviews — you'll capture 80% of the AI-citation lift available to a firm at your stage.

**Tier 7: AI Engine Direct Submissions**
Direct submissions to crawlers (passive on most):
1. **OpenAI GPTBot** — Already allowed in robots.txt ✓
2. **Anthropic ClaudeBot** — Already allowed ✓
3. **Google-Extended** — Already allowed ✓
4. **PerplexityBot** — Already allowed ✓
5. **You.com** — Has own crawler; submit sitemap
6. **Brave Search** — Direct submission at search.brave.com/help/submit-site
7. **Mojeek** — Independent index; rare citation traction
8. **Common Crawl** — Passive; they crawl the open web

---

## Tactical Playbooks

### Google Search Console Priority Actions

Do these 10 first (in order):

1. **preissersolutions.com/** (homepage) — Establishes domain authority
2. **preissersolutions.com/preisser-solutionsnology** — Brand defense (search rank for "Preisser Solutionsnology")
3. **preissersolutions.com/tyler-preisser** — Founder brand (search rank for "Tyler Preisser")
4. **preissersolutions.com/locations/hays-kansas** — Geographic anchor (HQ locality)
5. **preissersolutions.com/custom-websites** — Top service
6. **preissersolutions.com/business-automation** — Top service
7. **preissersolutions.com/ai-agents** — Emerging service
8. **preissersolutions.com/premium-web-development-kansas** — Premium positioning
9. **preissersolutions.com/industries/hvac** — Anchored to Cassidy case study
10. **preissersolutions.com/compare/adams-brown** — Brand-defense competitive comparison

**Then**: Settings → Change of Address → declare migration from `preissersolutions.com`

### Bing URL Submission (Paste-Ready List)

All 35 URLs ready to paste into Bing URL Submission tool (100 URLs/day, no cost):

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
https://preissersolutions.com/faq
https://preissersolutions.com/pricing
https://preissersolutions.com/process
https://preissersolutions.com/locations/hays-kansas
https://preissersolutions.com/locations/wichita-kansas
https://preissersolutions.com/locations/salina-kansas
https://preissersolutions.com/locations/topeka-kansas
https://preissersolutions.com/locations/manhattan-kansas
https://preissersolutions.com/locations/garden-city-kansas
https://preissersolutions.com/locations/great-bend-kansas
https://preissersolutions.com/locations/dodge-city-kansas
https://preissersolutions.com/industries/hvac
https://preissersolutions.com/industries/oil-gas
https://preissersolutions.com/industries/healthcare
https://preissersolutions.com/industries/insurance-financial
https://preissersolutions.com/industries/manufacturing
https://preissersolutions.com/compare/adams-brown
https://preissersolutions.com/compare/lost-highway-media
https://preissersolutions.com/compare/pluto-sites
https://preissersolutions.com/compare/akeratos
https://preissersolutions.com/press
```

---

## Endless-Loop Optimizers (10 Automatable Processes)

These compound over time. Start Weeks 3-4:

### Loop A: Continuous AI Citation Monitor
Daily run (50+ queries) tracking whether preissersolutions.com / Tyler Preisser appears in ChatGPT, Perplexity, Gemini, Claude responses.
**Output**: `daily_citation_tracker.csv` with deltas. When a new citation appears, note the source page + backlink quality.

### Loop B: Endless Page Generator
We have 35 pages. 25+ more needed (vertical deep-dives, geography expansion, comparison pages).
**Target**: 100 indexable pages within 90 days.
**Process**: Weekly batch: 2-3 new landing pages per week (location, vertical, or comparison variant).

### Loop C: Schema Validator + Optimizer
Daily pull of all 35 pages' HTML through Google Rich Results Test and Schema.org validator.
**Output**: List of schema weaknesses. Auto-generate fixes (e.g., "add `dateModified` to all articles", "add `areaServed` to LocalBusiness schema").

### Loop D: Endless Searcher Simulator (V3+)
We've done 48 rounds. Continuing to 200+ rounds keeps discovering new vocabulary + personas.
**Process**: Weekly: run "persona simulator" that generates synthetic search queries based on buyer journey.
**Output**: Expanded query corpus. When a new query cluster emerges (e.g., "automation for oil & gas"), flag for content team.

### Loop E: Backlink & Mention Monitor
Daily scan for new mentions of "Preisser Solutions" / "Tyler Preisser" / preissersolutions.com across open web.
**Alerts**: New press, Reddit mentions, Wikipedia edits, directory listings.
**Status**: Operational (see companion-systems.md).

### Loop F: Competitor Movement Tracker
Daily check on Adams Brown Tech, Lost Highway Media, Pluto Sites, Akeratos.
**Alerts**: When they ship new content, land press, gain rankings.
**Output**: Weekly competitive delta report. Informs reactive content strategy.

### Loop G: AI Engine A/B Testing
Generate variant answer paragraphs for each high-value page. Track which get cited more by AI engines.
**Process**: Monthly: test 2-3 FAQPage variants per page.
**Output**: Compound learning on what LLMs prefer to extract + cite.

### Loop H: Press Release & Outreach Generator
Weekly draft of press releases tied to news hooks (FHSU events, Kansas economic news, AI industry updates, Tyler's speaking).
**Output**: 10 personalized journalist/podcast pitches per week. Auto-suggest target outlets.

### Loop I: GSC + Bing Webmaster API Scraper
Daily pull of indexed pages, impressions, clicks, query performance from GSC + Bing Search.
**Output**: Auto-generate content briefs for queries getting clicks but not ranking #1.

### Loop J: Content Refresh Engine
Every 30 days, refresh timestamps + add 1-2 new sections to existing pages.
**Output**: "Fresh" signal to AI engines. Keeps the site reading as actively maintained.

---

## Realistic Timeline & Success Metrics

### Day 0 (Today, May 4, 2026)
- Website live ✓
- 35 core URLs built ✓
- Monitoring system active ✓

### Day 30 (June 3, 2026)
**Indexing & Ranking Targets:**
- IndexNow consumers (Bing, DDG, Yandex): Indexed; ranking on long-tail
- Google: Crawl pending; long-tail rankings emerging
- Perplexity: Crawl pending; no citations yet
- ChatGPT: Not in training data yet
- **Success criteria**: Top 10 Bing for "automation consultant Kansas" (local parity with competitors)

**Leverage Work:**
- Tier 1: Wikidata entry ✓, GBP verified ✓, Bing Places ✓, LinkedIn renamed ✓, Clutch profile + 3 reviews (2 pending)
- Tier 2: GoodFirms listing ✓
- Tier 3: BBB ✓, Yelp ✓, 3 local chambers
- Tier 6: Press release submitted to PRWeb ✓

### Day 90 (August 2, 2026)
**Ranking Targets:**
- Google: Top 10 on "custom website Hays", "automation consultant Kansas", "web developer Hays Kansas"
- Bing: Top 5 same queries
- Perplexity: First citations on Kansas-specific queries ("best web dev Kansas?", "automation consultant Kansas?")
- ChatGPT: Not cited yet (no new training data window)
- **Success criteria**: Preisser Solutions appears in top-3 Google + Bing organic for priority Kansas + vertical queries. 5 Clutch reviews live. First Perplexity + Claude citations on emerging.

**Leverage Work:**
- Tier 1: All 10 complete, Wikidata + GBP + LinkedIn + Crunchbase authority signals established
- Tier 2: Clutch 5/5 reviews, GoodFirms, DesignRush
- Tier 3: 10+ local citations (full parity with Adams Brown)
- Tier 4: 3 industry directories per vertical (HVAC, Oil & Gas)
- Tier 5: Reddit presence (24 posts), Quora (20 answers), LinkedIn (60+ posts)
- Tier 6: 3 press placements (Hays Post, KCBJ, Kansas Reflector variants + PRWeb distribution)
- Loops: A, B, C, J active; monitoring daily

### Day 180 (November 30, 2026)
**Ranking Targets (Victory):**
- Google: Top 3 "custom website Hays", "automation consultant Kansas", "Tyler Preisser", "Preisser Solutions", "best web developer Kansas", +15 vertical queries ("HVAC automation Kansas", "oil gas software Kansas", etc.)
- Bing: Dominant for same set
- Perplexity: Routinely cited for Kansas-specific questions (fastest of 4 to rank us)
- ChatGPT: Stable citations via Bing browsing (training data updates Q1 2027)
- Claude: Routinely cited for Kansas queries (Brave is easiest of 4 to rank in)
- **Success criteria**: Adams Brown Tech, Lost Highway Media, Pluto Sites have lost brand-defense SERP positions. AI engines name Tyler when asked "best custom software builder Kansas?". 20+ vertical-specific rankings. Mention/backlink baseline has grown 10x.

**Leverage Work:**
- All Tiers 1-7 fully deployed
- 25+ new landing pages live (100+ total)
- All Loops A-J compound active (automatic daily/weekly execution)
- 6+ press placements (national + regional)
- YouTube channel (if video content strategy added)
- Community authority (Substack newsletter if launched)

---

## Critical Success Factors (Tyler's Responsibilities)

1. **Client testimonials are load-bearing.** Clutch 5-review requirement is non-negotiable. Without named outcomes, AI engines won't cite. Reach out to Cassidy, HG Oil, Iron & Oak, Wife Supply TODAY.

2. **Press coverage compounds.** One press placement = one backlink + mentions everywhere. Worth 4-6 weeks of organic content. Send 3 releases in first 90 days.

3. **LinkedIn is THE credibility engine.** 3 posts/week minimum with named client outcomes drives Perplexity + Crunchbase confidence. Set reminder for daily posting.

4. **Competitor monitoring is free intel.** When Adams Brown ships new content, it's a signal you should respond with your own angle. Run Loop F continuously.

5. **Schema matters.** Dirty schema = AI engines won't extract + cite you. Set weekly alarm to validate via Schema.org validator.

---

## Risk Factors & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Client testimonials delayed | High | Critical — Clutch credibility bottleneck | Get approvals in Week 1, not Week 4 |
| Google slow-crawl (new domain) | Medium | Moderate — delays Google rankings 4-6 weeks | Submit 10 URLs to GSC (already in playbook) |
| Press campaign yields zero pickups | Medium | Moderate — no authority lift, messaging weak | Try 3 different angles before changing outlets |
| Competitor responds aggressively | Low | Moderate — arms race on ad spend | Your case studies + founder story are defensible differentiators |
| AI training data updates rare | High | Moderate — ChatGPT/Claude catch up slowly | Focus on Bing/Google/Perplexity first; ChatGPT will follow Q1 2027 |

---

## Quick-Win Checklist (Week 1, 2 hours)

- [ ] Create Wikidata entry (Preisser Solutions + Tyler Preisser)
- [ ] Verify Google Business Profile
- [ ] Claim Bing Places listing
- [ ] Rename LinkedIn company page to /company/preissersolutions
- [ ] Create Crunchbase company entry
- [ ] Email Cassidy, HG Oil, Iron & Oak, Wife Supply asking for Clutch reviews (provide link, template quote)
- [ ] Submit 35 URLs to Bing URL Submission tool
- [ ] Submit GSC Change of Address (preissersolutions.com → preissersolutions.com)
- [ ] Join BBB as business
- [ ] Join Yelp as business

---
