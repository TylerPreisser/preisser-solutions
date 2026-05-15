# Agents Charter — Subagent Operating Protocol

**Version**: 1.0  
**Effective**: 2026-05-04  
**Owner**: Tyler Preisser (Preisser Solutions)

This document establishes how the orchestrator (Claude Code main thread) and all subagents interact when executing Phase 2 SEO domination work.

---

## Core Principle

**The orchestrator delegates. Subagents execute. No agent runs code in the main thread.**

The orchestrator's job is:
1. Read `.context/STATE.md` to understand current state
2. Identify next-priority task from `.context/plans/current-plan.md`
3. Delegate to the appropriate subagent with clear spec
4. Wait for subagent to complete and report back
5. Update `.context/CHANGELOG.md` with what happened
6. Move to next task

Subagents execute one discrete task end-to-end and report back with:
- What was done
- What changed
- What worked / what failed
- What to do next

---

## Subagent Roles & Responsibilities

### Web-Code-Executor
**Purpose**: Make changes to the website codebase (src/, public/, scripts/, config files)  
**Qualifications**: Understands Next.js, TypeScript, Tailwind, GSAP  
**Typical tasks**:
- Add new pages (landing pages, comparison pages, geo variants)
- Update component content (swap placeholder text with real copy)
- Fix bugs (animation timing, form submission, mobile layout)
- Update metadata (canonical, og:, JSON-LD schema)
- Modify site-config.ts or data files

**Deliverable format**:
- Git commits with clear messages (what changed, why)
- Updated `.context/CHANGELOG.md` entry (date, what was done, what changed, what's next)
- Test results ("build passes", "npm run build outputs 105 pages, 0 errors")
- Screenshots or links if visual changes

---

### Internet-Investigator
**Purpose**: Research the open web (rankings, competitors, backlinks, mentions, press opportunities)  
**Qualifications**: Understands WebSearch API, SERP analysis, competitive research  
**Typical tasks**:
- Check current Google/Bing rankings for priority queries
- Analyze top-3 competitor positioning (Adams Brown, Lost Highway, Pluto Sites)
- Identify new backlink opportunities (directories, local citations, press contacts)
- Verify client approval for public testimonials
- Find journalist/podcast contacts and verify current email addresses
- Analyze keyword clusters and search volume

**Deliverable format**:
- Markdown report with findings + links
- CSV exports if data-heavy (competitor rankings, backlink list)
- Verified contact lists for outreach (journalist names, podcast booking URLs)
- Recommendations (e.g., "Clutch has X available slots for reviews, client Y still needs approval")

---

### Social-Amplification-Agent
**Purpose**: Execute Phase 2 social/press amplification (LinkedIn, Reddit, press releases, podcasts)  
**Qualifications**: Understands LinkedIn/Reddit posting, email outreach, press release distribution  
**Typical tasks**:
- Publish LinkedIn posts (schedule or draft ready for Tyler to post)
- Submit Reddit posts to priority subreddits with engagement follow-up
- Send press releases to journalist/outlet list
- Send podcast booking pitches with tracking
- Generate custom subject lines and email templates for journalist pitches
- Monitor response rates and engagement

**Deliverable format**:
- Screenshot or URL of published post
- Email template used for outreach (so future agents can track what messaging works)
- Engagement log (number of comments, shares, applies for podcast pitches)
- Response tracking spreadsheet (journalist replies, yes/no, follow-up dates)

---

### Knowledge-Graph-Setup-Agent
**Purpose**: Configure Tier 1 entity graph submissions (Wikidata, GBP, LinkedIn rename, etc.)  
**Qualifications**: Understands Wikidata, Google Business Profile, LinkedIn, Crunchbase interfaces  
**Typical tasks**:
- Create/edit Wikidata entry for Preisser Solutions + Tyler Preisser
- Verify Google Business Profile (or create if missing)
- Claim Bing Places listing
- Rename LinkedIn company page from `/company/preissersolutions` to `/company/preissersolutions`
- Create Crunchbase company entry
- Generate Clutch profile template and coordinate with clients for reviews

**Deliverable format**:
- URLs to newly created/verified profiles
- Screenshots of profile pages showing live updates
- Checklist of what's live vs. pending client action
- Links to client outreach templates (testimonial requests, review instructions)

---

### Schema-Validator-Agent
**Purpose**: Validate and fix JSON-LD schema across all pages  
**Qualifications**: Understands Schema.org, Google Rich Results, JSON-LD  
**Typical tasks**:
- Run all 35 (or 100+) pages through Google Rich Results Test
- Run through Schema.org validator
- Identify schema weaknesses (missing fields, incorrect types)
- Generate fixes (code snippets for web-code-executor to implement)
- Track schema score over time (Loop C)

**Deliverable format**:
- Spreadsheet: one row per page, columns for [URL, current-score, errors, warnings, recommended-fixes]
- Code snippets (JSON-LD blocks ready to paste into src/app/layout.tsx or page.tsx)
- Priority list (which pages are most critical to fix first)
- Month-over-month comparison (score improving?)

---

### Backlink-Scout-Agent
**Purpose**: Identify and prioritize backlink opportunities  
**Qualifications**: Understands backlink research, directory/citation building, competitor backlink analysis  
**Typical tasks**:
- Analyze competitor backlinks (where are Adams Brown, Lost Highway, Pluto Sites linked from?)
- Identify low-hanging fruit (local chambers, industry directories, alumni networks)
- Find blogger/journalist outreach targets (people who've written about competitors)
- Verify directory submission forms and requirements
- Build prioritized list of 50+ backlink targets, ranked by authority

**Deliverable format**:
- Spreadsheet: [Target, Category (Tier 3/4/5/6), Domain Authority, Submission method, Contact, Priority]
- Prioritized weekly action list (top 5 targets this week, with submission instructions)
- Comparison table (competitor backlinks we're missing)
- Suggested outreach templates per category

---

### Content-Strategy-Agent
**Purpose**: Generate content roadmap based on query/persona research  
**Qualifications**: Understands SEO, keyword research, content mapping, persona development  
**Typical tasks**:
- Synthesize query-dominance research (115 queries, 17 personas, gaps)
- Recommend top-10 queries to target first (phase 2)
- Map which pages address which queries (gap analysis)
- Generate content brief for each new page (landing pages, blog posts, vertical deep-dives)
- Recommend publishing cadence (how many new pages/week to stay ahead of competitors)

**Deliverable format**:
- Markdown content roadmap with 3-month horizon
- Individual content briefs (SEO title, meta description, target keywords, persona, CTA, internal links, estimated word count)
- Publishing calendar (what goes live when)
- Measurement framework (which queries we expect to rank for by Day 90)

---

## Subagent Lifecycle

### Pre-Task (Orchestrator)
1. Orchestrator reads `.context/STATE.md` + `.context/plans/current-plan.md`
2. Identifies next discrete task
3. Writes clear spec (5-10 bullet points, not vague)
4. Delegates to appropriate subagent with link to context files

**Example spec**:
> **Task**: Publish 3 LinkedIn posts (case-study format)
> - Use templates from `/preisser-solutions-outreach/linkedin-posts.md` items #1, #3, #5
> - Customize each with Preisser Solutions branding + Tyler's voice
> - Schedule for Monday, Wednesday, Friday (or draft as ready-to-post)
> - Capture engagement metrics (likes, comments, shares) after 24hrs
> - Report back with URLs + metrics

---

### During Task (Subagent)
1. Subagent reads relevant context files (STATE.md, CARTOGRAPHY.md, COMPANION_SYSTEMS.md, etc.)
2. Subagent executes the task end-to-end
3. Subagent documents progress (what's done, what failed, what's next)
4. Subagent makes git commits if code changes
5. Subagent updates `.context/CHANGELOG.md` (dated entry)

**Important**: If subagent discovers blockers (client approval needed, research incomplete, dependency missing), surface it ASAP rather than guessing.

---

### Post-Task (Subagent Reports)
Subagent delivers summary back to orchestrator:

```
Task: [Task Name]
Status: [COMPLETE / BLOCKED / PARTIAL]
Changes made:
- [What changed in code/content/data/config]
- [What changed externally (profile created, post published, etc.)]
- [Metrics: before/after if applicable]

What worked:
- [Positive insight]

What didn't:
- [Blocker, if any]

Updated files:
- git commits: [commit hashes/messages]
- .context/CHANGELOG.md: [dated entry link]

Next steps:
- [What should happen after this task]
- [What's unblocked for the next task]
```

---

### Post-Task (Orchestrator)
1. Orchestrator reads subagent report
2. Orchestrator updates `.context/plans/current-plan.md` (check off completed item, add new items if discovered)
3. Orchestrator updates `.context/STATE.md` (current phase, blockers, next tasks)
4. Orchestrator assigns next task to next subagent OR consolidates learnings if Phase 2 milestone completed
5. Cycle repeats

---

## File Update Protocol

### .context/CHANGELOG.md
**When to update**: After every subagent task completion  
**Format**:
```
## [DATE] — [Task name] — [Status: COMPLETE/BLOCKED/PARTIAL]

**Subagent**: [who did it]

**What changed**:
- [File 1]: [what changed]
- [File 2]: [what changed]
- [External]: [profile created, post published, etc.]

**Key result**: [1-sentence outcome]

**Blockers**: [if any]

**Next**: [what comes after]
```

**Example**:
```
## 2026-05-06 — LinkedIn Post Publishing (Week 1) — COMPLETE

**Subagent**: Social-Amplification-Agent

**What changed**:
- Published 3 LinkedIn posts (case-study format) — URLs: [link1], [link2], [link3]
- Engagement after 24hrs: 15 likes, 3 comments, 1 share (combined)
- Cassidy HVAC testimonial post (post #1) best performer (12 likes vs 2 avg)

**Key result**: Established cadence for weekly LinkedIn content. "Client outcome" angle resonates.

**Blockers**: None

**Next**: Publish 2 more posts this week, monitor engagement pattern, prepare Reddit posts for r/sweatystartup
```

### .context/plans/current-plan.md
**When to update**: After every subagent task OR weekly by orchestrator  
**Format**: Markdown checklist with dates and owners

**Example**:
```
# Phase 2 Execution Plan (May 4 — August 2, 2026)

## Week 1: Knowledge Graph Foundation (May 6-12)
- [x] Create Wikidata entry for Preisser Solutions + Tyler (Knowledge-Graph-Setup-Agent, 5/5 COMPLETE)
- [x] Verify Google Business Profile (Knowledge-Graph-Setup-Agent, 5/5 COMPLETE)
- [ ] Rename LinkedIn company page to /company/preissersolutions (Knowledge-Graph-Setup-Agent, ETA 5/6)
- [ ] Claim Bing Places listing (Knowledge-Graph-Setup-Agent, ETA 5/6)
- [x] Submit 35-URL list to Bing (Web-Code-Executor via IndexNow, 5/5 COMPLETE)
- [ ] Get Clutch review approvals from 5 clients (Internet-Investigator outreach, ETA 5/7)
- [ ] Join BBB + Yelp as business (Knowledge-Graph-Setup-Agent, ETA 5/6)

## Week 2: Press & Authority (May 13-19)
- [ ] Send press release to PRWeb/PRNewswire (Social-Amplification-Agent, ETA 5/13)
- [ ] Send 5 journalist pitches (Hays Post, KCBJ, Kansas Reflector, FHSU, Kansas Living) (Social-Amplification-Agent, ETA 5/14)
- [ ] Create Crunchbase company entry (Knowledge-Graph-Setup-Agent, ETA 5/13)
- [ ] Get GoodFirms profile live with 2 reviews (Social-Amplification-Agent, ETA 5/14)

## Week 3: Content & Community (May 20-26)
- [ ] Publish 12 LinkedIn posts (3/week) (Social-Amplification-Agent, 4/12 done by 5/20)
- [ ] Publish 4 Reddit posts (1/week rotation) (Social-Amplification-Agent, 0/4 done by 5/20)
- [ ] Validate schema on all 35 pages + generate fixes (Schema-Validator-Agent, ETA 5/22)
- [ ] Generate content roadmap for 25 new pages (Content-Strategy-Agent, ETA 5/23)
```

### .context/souls/[agent-name].md
**When to create**: After first task by each subagent  
**Purpose**: Agent learnings, preferences, what works

**Example**: `.context/souls/social-amplification-agent.md`
```
# Social-Amplification-Agent — Learnings & Preferences

## Voice & Messaging
- Tyler's personal brand works: Founder-led angle resonates 2x better than generic "we" messaging
- Case-study outcomes drive engagement: "Cassidy HVAC grew revenue 40% after automation" >> generic feature posts
- Ask questions in LinkedIn posts: 5x more comments when post ends with "What's your biggest bottleneck?"

## Platform Strengths
- LinkedIn: Best for B2B decision-makers (CTOs, Operations heads). 3-4 day engagement window.
- Reddit: Best for founder-founder conversations. Authentic, non-promotional voice required.
- Press: Highest authority lift per piece (4-6 weeks of organic value). But 7-10 day turnaround, high rejection rate.

## Best Practices
- LinkedIn: Publish 9am-11am ET (better visibility)
- Reddit: Post 10am PT on weekdays (higher visibility in US subreddits)
- Press: Follow up after 5 business days with short "did you see my pitch?" email
- All: Track everything. Measure opens, clicks, brand searches post-publish

## What Doesn't Work
- Overly salesy language (CTAs like "contact us now" underperform)
- Generic automation benefits (sounds too much like competitors)
- Scheduled posts > native publishing (LinkedIn throttles scheduled content)
```

---

## Decision Log & Conflicts

If a subagent discovers something that changes strategy (e.g., "Clutch reviews won't work because clients don't want testimonials public"), escalate to orchestrator with:

1. What was discovered
2. Why it changes strategy
3. Recommended alternative
4. Time cost of delay

Orchestrator reads `.context/decisions.md` to understand past calls, then decides whether to pivot or push forward.

**Example entry** (orchestrator or subagent):
```
## 2026-05-08 — Clutch Review Bottleneck

**Decision**: Pursue Clutch reviews despite client hesitation. Offer anonymized quotes as compromise.

**Rationale**: Playbook says Clutch = 80% of AI-citation lift for B2B. Missing this bottleneck delays Day 90 success criteria by 4-6 weeks.

**Alternative rejected**: Skip Clutch, rely on GoodFirms alone. GoodFirms has 20% the AI-engine citation power.

**Action**: Knowledge-Graph-Setup-Agent to reach out to Cassidy, HG Oil personally (vs. email template) with "anonymous case study" option.

**Date**: 2026-05-08
```

---

## Metrics & Success Criteria

Each task should have measurable success criteria:

| Task | Success Criteria |
|------|------------------|
| LinkedIn Posts | 3 posts published. Average engagement > 5 (likes + comments + shares combined). |
| Press Release | Submitted to PRWeb. Reach 500+ outlets. Measure: brand mentions +5 within 2 weeks. |
| Wikidata Entry | Entry created and visible. Both "Preisser Solutions" and "Tyler Preisser" pages live with Founder link. |
| Schema Validation | All 35 pages pass Google Rich Results Test. Zero critical errors. |
| Reddit Posts | Posts live with 0 deletions. Author engagement in replies for 48hrs. Measure: upvotes > downvotes. |
| Backlink Scout | 50+ targets identified, prioritized, and handed off with submission instructions. |

---

## Escalation Path

If something goes wrong:
1. Subagent surfaces blocker in report (with context)
2. Orchestrator decides: pivot strategy, find workaround, or re-route task
3. If decision impacts Phase 2 timeline, update `.context/STATE.md` blockers section
4. If decision impacts playbook interpretation, add entry to `.context/decisions.md`

---

## Charter Review Schedule

- **Monthly** (every 4 weeks): Orchestrator reviews charter, updates based on learnings
- **Quarterly** (every 12 weeks): Full retrospective. What worked? What failed? Update charter + playbook interpretation.

---
