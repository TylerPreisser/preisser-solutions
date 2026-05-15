# Companion Systems — Monitoring, Outreach, Query Dominance

The Preisser Solutions rebrand ecosystem consists of three operational sister systems running in parallel with the main website.

---

## 1. PREISSER-TECH-MONITORING — Daily Mention & Backlink Tracker

**Path**: `/Users/tylerpreisser/Desktop/preisser-solutions-monitoring/`  
**Type**: Continuous public-web monitoring system  
**Status**: LIVE (operational since 2026-05-03)  
**Schedule**: Daily 08:00 local time (macOS launchd)

### Purpose
Tracks every public-web mention of Preisser Solutions, Tyler Preisser, case-study clients (Cassidy HVAC, HG Oil, Iron & Oak, Wife Supply Co), and SERP ranking positions for 50+ priority queries across Bing, DuckDuckGo, and organic search.

### Files & Structure
```
preisser-solutions-monitoring/
├── scan.mjs                              Main monitoring script (Node 22)
├── seen.json                             Ledger: every URL ever flagged (prevents re-reporting)
├── baseline-2026-05-03.md                Day-zero mention landscape snapshot
├── mentions-2026-05-03.md                Delta report: new mentions flagged today
├── citation-tracker.mjs                  Helper: tracks citation lift over time
├── citation-tracker.csv                  Citation data in tabular form
├── CITATION-TRACKER-README.md            Citation tracking protocol
├── competitor-tracker.mjs                Monitors competitors (Adams Brown, Lost Highway, Pluto Sites)
├── competitor-snapshot-2026-05-03.md     Baseline competitor positions
├── competitor-deltas-2026-05-03.md       Weekly competitor movement deltas
├── COMPETITOR-TRACKER-README.md          Competitor tracking protocol
└── competitor-baselines/                 Individual competitor baseline snapshots
```

### How It Works

**Query list** (50+ priority queries, 10+ categories):
- **Rank queries** (5): "custom website Hays", "automation consultant Kansas", "Tyler Preisser", "Preisser Solutions", "best web developer Kansas"
- **Press queries** (8): "Preisser Solutions launch", "Tyler Preisser founder", "Cassidy HVAC", "HG Oil", case-study brand names
- **Social queries** (5): Reddit mentions, LinkedIn mentions, Twitter mentions
- **Directory queries** (8): Clutch, GoodFirms, DesignRush, Manifest, industry directories
- **Aggregator queries** (5): B2B aggregators
- **Owned queries** (5): LinkedIn company page, Facebook, GitHub
- **Other** (10): Misc. branded/vertical searches

**Output reports**:
- `mentions-YYYY-MM-DD.md` — Daily delta. NEW URLs only (since last run). Categorized: press, social, directory, aggregator, owned, other.
- `baseline-*.md` — Day-zero snapshot. Ground-truth for measuring progress.
- `citation-tracker.csv` — All citations + domain authority + date discovered.
- `competitor-snapshot-*.md` — Top-10 SERP positions for competitors per query.

### Integration with Website
- **Loop A trigger** (from playbook): runs this daily, outputs `daily_citation_tracker.csv` with deltas
- **Data input**: 50+ priority queries (hardcoded in scan.mjs)
- **Output**: CSV for analysis + Markdown for human reading

### Operational Commands
```bash
# Run on-demand
node /Users/tylerpreisser/Desktop/preisser-solutions-monitoring/scan.mjs

# View today's report
cat /Users/tylerpreisser/Desktop/preisser-solutions-monitoring/mentions-2026-05-04.md

# Check launchd schedule
launchctl list | grep preissersolutions

# Disable daily job
launchctl unload ~/Library/LaunchAgents/com.preissersolutions.monitor.plist

# Enable daily job
launchctl load ~/Library/LaunchAgents/com.preissersolutions.monitor.plist
```

### Key Metrics to Watch
- **Citation count**: Starting baseline = 47 mentions (across press, social, directory)
- **New mentions/day**: Target 2-3/day during press campaign, 1/week baseline
- **Competitor tracking**: Are Adams Brown / Lost Highway losing SERP positions?
- **Ranking progression**: preissersolutions.com position in top 10 for priority queries

### Constraints & Honest Limitations
- **Search backend**: Bing HTML scraping (no API key needed, free, ~1.5s polite spacing per query). Index drifts; bot detection can drop quote operators and return generic results.
- **Rank accuracy**: Top 10 only. Mentions buried past page 1 won't surface unless pagination added.
- **Real-time AI probes**: Cannot script ChatGPT / Perplexity / Gemini / Claude rankings from launchd (interactive only). "Engine self-check rankings" block uses organic ranking as proxy.
- **Gated platforms**: LinkedIn / X / gated content returns public snippets only. Full thread content requires manual click-through.

### Uptime & Reliability
- **Last run**: 2026-05-03 (successful)
- **Failure mode**: If launchd crashes, job won't run until restarted. No retry logic (manual intervention needed).
- **Output validation**: Reports generated even if partial results. No error emails configured.

---

## 2. PREISSER-TECH-OUTREACH — Press & Social Amplification Kit

**Path**: `/Users/tylerpreisser/Desktop/preisser-solutions-outreach/`  
**Type**: Ready-to-deploy outreach collateral  
**Status**: COMPLETE. Awaiting Phase 2 execution.  
**Ownership**: Tyler (manual execution or delegation to subagents)

### Purpose
Assembled outreach library: press releases (6 variants), journalist pitches (10), podcast pitches (15), LinkedIn posts (15), Reddit posts (8), plus tracking protocols.

### Files & Structure
```
preisser-solutions-outreach/
├── README.md                             Master guide + recommended cadence
├── press-release-master.md               AP-style release (for paid distribution)
├── press-release-hayspost.md             Hays Post local variant
├── press-release-kcbj.md                 Kansas City Business Journal variant
├── press-release-kansasreflector.md      Kansas Reflector variant
├── press-release-fhsu.md                 FHSU Alumni News variant
├── press-release-kansas-living.md        Kansas Living / Farm Bureau variant
├── pitches/
│   ├── journalist-hays-post.md           Hays Post business reporter pitch
│   ├── journalist-hays-daily-news.md     Hays Daily News features pitch
│   ├── journalist-kake-tv.md             KAKE-TV (Wichita) pitch
│   ├── journalist-kwch-tv.md             KWCH-TV (Wichita) pitch
│   ├── journalist-ksal-radio.md          KSAL Radio (Salina) pitch
│   ├── journalist-kcbj.md                Kansas City Business Journal pitch
│   ├── journalist-kansas-reflector.md    Kansas Reflector pitch
│   ├── journalist-wichita-eagle.md       Wichita Eagle pitch
│   ├── journalist-topeka-capital-journal.md  Topeka Capital-Journal pitch
│   └── journalist-ict-magazine.md        ICT Magazine pitch
├── podcast-pitches.md                    15 podcast pitches (custom hooks per show)
├── linkedin-posts.md                     15 LinkedIn post drafts
├── reddit/
│   ├── sweatystartup-post.md            r/sweatystartup post
│   ├── HVAC-post.md                     r/HVAC post
│   ├── Kansas-post.md                   r/Kansas post
│   ├── smallbusiness-post.md            r/smallbusiness post
│   ├── PowerBI-post.md                  r/PowerBI post
│   ├── Wichita-post.md                  r/Wichita post
│   ├── Webflow-post.md                  r/Webflow post
│   └── PrivateEquity-post.md            r/PrivateEquity post
├── CITATION-TRACKER-README.md            Protocol for measuring lift
└── COMPETITOR-TRACKER-README.md          Protocol for competitor response tracking
```

### Content Themes
- **Primary narrative**: "FHSU grad's tech company helping Hays businesses win the AI era"
- **Authority angle**: FHSU alumni network, Kansas business roots, founder-led
- **Proof**: 4 named case studies (Cassidy HVAC, HG Oil Holdings, Iron & Oak Podcast, Wife Supply Co)
- **Differentiation**: Founder personally involved, founder writes code, vs. "just consulting"

### Pre-Send Checklist (Critical)
Every outreach piece must pass these before sending:

1. **Replace RESEARCH NEEDED placeholders** — Current journalist/host names, email addresses from official outlet websites
2. **Verify press release URL** — If going to different path than `/press/launch-2026`, update all URLs
3. **Client approval** — Cassidy, HG Oil, Iron & Oak, Wife Supply all must approve public naming
4. **Spell-check recipient name** — Most pitch deletions happen on misspelled first name
5. **Custom subject line per outlet** — Tweak for each reporter/producer
6. **Press distribution method** — Master release via PRWeb/PRNewswire; variants via direct send

### Recommended Cadence
| Channel | Frequency | Notes |
|---------|-----------|-------|
| LinkedIn | 3/week | Mix case-study, thought-leadership, founder-story |
| Reddit | 1/week | Rotate subreddits, engage replies for 48hrs |
| Press release | 1/month | Pair with 5-10 journalist pitches that week |
| Podcast pitch | 5/month | Send Mondays, follow-up after 7 business days |
| Journalist pitch | 3-5/month | Send Tue-Thu morning, follow-up after 5 business days |

### High-Leverage Starting Points
1. **Tommy Mello / Home Service Expert podcast** — Perfect fit for Cassidy HVAC story. Highest single-piece leverage.
2. **Sweaty Startup / Nick Huber podcast** — Operator-to-operator reactivation story. Strong conversion likelihood.
3. **Hays Post + KCBJ press variants** — Local + regional stack in same week. Reinforces story for local prospects.

### Tracking & Measurement
- **Citation lift**: Compare baseline mentions (47 total) to delta reports after each press push
- **Competitor response**: Did Adams Brown / Lost Highway shift content after press coverage?
- **Podcast tracking**: When episodes air, check Perplexity/ChatGPT for citations (may take 2-3 weeks)
- **Social engagement**: LinkedIn post metrics (shares, comments, reach)

---

## 3. QUERY-DOMINANCE — Multi-Agent SEO Research System

**Path**: `/Users/tylerpreisser/Desktop/query-dominance/`  
**Type**: AI-driven keyword research + content strategy system  
**Status**: Phase 1 complete. Awaiting deployment of generated outputs.  
**Last run**: 2026-05-02 (Run #1)

### Purpose
Multi-agent system (10 agents) that discovers all relevant search queries, personas, gaps, and content strategy for Preisser Solutions to dominate AI engines and search indexes.

### Architecture
```
query-dominance/
├── context/
│   ├── shared_context.yaml               Shared variables (targets, personas, queries)
│   └── agents/
│       ├── 00_orchestrator.md            Master agent (delegates to 01-10)
│       ├── 01_geo_cartographer.md        Geographic persona mapping
│       ├── 01b_searcher_loop.md          Continuous query discovery loop
│       ├── 02_persona_architect.md       Define all buyer personas
│       ├── 04_serp_investigator.md       Analyze current SERP landscape
│       ├── 06_competitor_scout.md        Analyze competitor positioning
│       ├── 07_gap_analyst.md             Content gaps + opportunities
│       ├── 08_content_strategist.md      Content plan per query cluster
│       ├── 09_distribution_strategist.md Distribution channels + cadence
│       └── 10_synthesis_reporter.md      Compile final strategy report
├── runs/
│   └── 2026-05-02_run01/                 Complete run outputs
│       ├── query-clusters.md             115 queries grouped by intent
│       ├── personas.md                   17 personas identified
│       ├── gap-analysis.md               25+ missing pages, 15+ comparisons needed
│       ├── competitor-analysis.md        Adams Brown, Lost Highway, Pluto Sites positioning
│       ├── content-strategy.md           47 landing pages + 100+ supporting pages
│       ├── distribution-plan.md          8 channels, 24 monthly touchpoints
│       └── timeline.md                   Week-by-week execution roadmap
```

### Key Outputs from Run #1 (2026-05-02)

#### Query Classification (115 priority queries)
- **Brand defense** (8): "preisser tech", "tyler preisser", "preissersolutions" (old), "preisser technology", "preissersolutions.com"
- **Vertical keywords** (35): "custom website kansas", "automation consultant kansas", "HVAC software", "oil gas automation", "healthcare software kansas", etc.
- **Comparison queries** (12): "vs adams brown tech", "vs lost highway media", "vs pluto sites", "best web developer kansas vs", etc.
- **Geographic queries** (25): "web development hays", "automation consultant topeka", "business software salina", etc.
- **Persona-specific** (20): "how to automate business", "HVAC business software", "oil gas data analytics", "should i hire a consultant", etc.
- **Long-tail** (15): "affordable custom website kansas", "HVAC scheduling software free", "best dashboard for small business", etc.

#### Personas Identified (17)
1. **C-Suite Automation Buyer** — CFO, CEO (5 pain points, 3 objections)
2. **Founder-Operator** — Small biz owner (operator-to-operator narrative)
3. **HVAC Business Owner** — Cassidy-like (vertical-specific)
4. **Oil & Gas Manager** — HG Oil-like (vertical-specific)
5. **Healthcare Director** — Compliance-focused
6. **Integrator / MSP** — Reseller potential
7. **System Engineer** — Technical buyer
8. **Agency Partner** — Collaboration potential
9. **Agency Competitor** — Brand-defense personas
10. Plus 7 more...

#### Content Gaps (Prioritized)
- **Missing pages** (25):
  - Vertical landing pages (5 completed, 20 more planned)
  - Comparison pages (4 completed, 8 more planned: Akeratos, Webflow, Zapier, etc.)
  - Educational content (ROI calculators DONE, 15+ how-to guides missing)
  - Local/geo pages (9 completed, 25+ more planned: all Kansas towns)
  - Industry-specific case studies (4 named, 8+ more needed)

- **Content refresh**:
  - Homepage: needs vertical-specific variants
  - Services: needs industry-specific deep dives
  - About: needs client success metrics
  - Pricing: needs vertical-specific tiers

#### Competitor Analysis
- **Adams Brown Tech**: Premium positioning, case-study focus, Hays-based (direct competitor)
- **Lost Highway Media**: Web agency angle, portfolio-focused, generalist
- **Pluto Sites**: WP-based, cheap positioning, commodity
- **Opportunity**: Preisser Solutions positions as "founder-led + custom automation" (gap no competitor owns)

#### Distribution Strategy (Tactical)
- **LinkedIn**: 3 posts/week (case-study + thought-leadership + founder-story)
- **Reddit**: 1 post/week (r/Kansas, r/HVAC, r/smallbusiness, r/PowerBI)
- **Press**: 1 release/month (5-10 journalist pitches per release)
- **Podcast**: 5 pitches/month (Sweaty Startup, Home Service Expert priority)
- **Community**: Quora (3/week), Hacker News (1/month), Dev.to (2/week), Medium (2/week)
- **Earned**: Backlink outreach, citation building, press coverage tracking

### Integration with Website & Monitoring
- **Output type**: Markdown documents (not code). Manual implementation required.
- **Implementation owners**: Tyler or delegated subagents
- **Success measurement**: Use monitoring system (Loop A) to track citation lift after content deployment
- **Feedback loop**: Run #2 after 90 days to measure what worked, refine personas + queries

### Next Steps
1. Review Run #1 outputs (`/runs/2026-05-02_run01/`)
2. Prioritize: which 10 queries to rank for first?
3. Assign content creation: hire writer, use Claude Code, or team effort?
4. Deploy content: landing pages, blog posts, social content
5. Track in monitoring system
6. Run #2 after 90 days (May 31 or June 2, 2026)

---

## Cross-System Integration Points

### Data Flow
```
Query Dominance (Run #1)
    ↓ (Identifies 115 queries, 17 personas, content gaps)
    ↓
Website (105 pages + content strategy)
    ↓ (Publishes new pages, updates metadata)
    ↓
Monitoring System (Tracks mentions, rankings, citations)
    ↓ (Reports daily deltas, citation lift)
    ↓
Outreach Kit (Press/social amplification)
    ↓ (Sends press, LinkedIn, Reddit, podcasts)
    ↓
Monitoring System (Tracks press reach, backlink growth)
    ↓
Query Dominance (Run #2, May 31 → June 2)
    ↓ (Refine personas, queries, content strategy based on results)
```

### Success Metrics (Per Playbook)
| Milestone | Timeline | Success Criteria |
|-----------|----------|-----------------|
| **Day 30** | May 30 | Indexed on long-tail + ranking on local (Hays parity with competitors) |
| **Day 90** | July 2 | Top 3 Google + Bing for "custom website Hays", "automation consultant Kansas", first Perplexity/Claude citations |
| **Day 180** | August 31 | Dominant for 20+ vertical queries, brand defense secured, AI engines name Tyler when asked about Kansas software |

### Failure Mode Recovery
- If monitoring shows NO new mentions after 30 days: content strategy likely wrong (too narrow/broad), personas misaligned
- If press campaign yields 0 pickups: pitch angle weak, relationships need building, try different outlets
- If rankings don't improve after 90 days: content quality issue, backlink deficit, or query competitiveness underestimated

---
