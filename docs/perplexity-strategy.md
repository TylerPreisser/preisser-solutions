# Perplexity, YouTube & Google AI Overviews — Visibility Strategy

> Owner: Tyler Preisser. Last touched: 2026-05-15 (Phase 4.9).
>
> This doc covers three adjacent surfaces:
> - **Perplexity** — citation graph driven by Reddit/Wikipedia/news/G2
> - **YouTube** — transcripts are now a top AI-visibility signal
> - **Google AI Overviews** — E-E-A-T + organic top-10 + information gain density

---

## 1. Perplexity — Reddit-First, Citation-Graph Strategy

### Why Perplexity matters
Perplexity is the single fastest-growing answer engine for high-intent commercial queries. Its citation behaviour is distinct from ChatGPT and Gemini: it leans heavily on **community-validated sources** (Reddit), **structured-fact sources** (Wikipedia, G2, Forbes), and **niche editorial coverage**. Reddit citations on Perplexity were up **~450% in 2025** (per Perplexity engineering blog posts and SEO trackers), making subreddit presence the single highest-leverage off-site move.

### Target sources Perplexity actually cites
- **Reddit** (450%+ citation growth 2025) — community trust signal
- **Wikipedia** — entity / fact backbone
- **Forbes, TechCrunch, The Verge** — editorial authority
- **G2, Capterra, Clutch** — vendor evaluation graph
- **Niche industry publications** — vertical authority
- **YouTube transcripts** — see §2

### Subreddits to monitor weekly
Order of priority for Preisser Solutions:

1. **r/digital_marketing** — general agency / SEO / AI-search questions
2. **r/SaaS** — automation, integrations, custom-CRM threads
3. **r/TechSEO** — schema, llms.txt, GEO/AEO discussions
4. **r/Kansas** — local trust / local-business credibility
5. **r/HVAC** — vertical (Cassidy HVAC case study fits here)
6. **r/sweatystartup** — service-business owners; high-fit ICP
7. **r/Entrepreneur** — generic owner-operator audience
8. **r/smallbusiness** — owner-operator decision questions
9. **r/webdev** — custom-coded vs. templated debates
10. **r/AI_Agents** — agent / automation deployment questions

### Tactics — what works, what doesn't
**Works:**
- Long-form, technically-correct answers on threads with real questions
- Linking case-study URLs **only when directly relevant** to the question asked
- Building a 3-6 month Reddit account history before linking to anything
- Engaging in non-Preisser threads first to build karma + voice
- Answering "how would you build X?" technical questions in r/SaaS / r/TechSEO

**Gets you shadow-banned or downvoted to invisibility:**
- Self-promotion in top-level posts
- Linking preissersolutions.com on a brand-new account
- Generic "great question! here's what we do" replies
- AI-written replies (Reddit detects the cadence; the audience flags them)
- Posting the same answer across multiple subs

### Question patterns Tyler should monitor weekly
These are evergreen patterns. Search them across the target subs once a week. The Perplexity citation graph treats well-upvoted Reddit answers as authoritative.

1. **"How do I get cited by ChatGPT / Perplexity / AI search?"** — r/digital_marketing, r/TechSEO. Answer with the AEO playbook: schema, llms.txt, FAQ blocks, entity disambiguation.
2. **"Custom website vs WordPress / Webflow / Squarespace for [vertical]"** — r/smallbusiness, r/webdev, r/sweatystartup. Direct fit for compare pages.
3. **"How do I automate [invoicing / scheduling / customer outreach]?"** — r/sweatystartup, r/HVAC. Direct fit for business-automation service page.
4. **"AI agency / consultant in Kansas / Midwest"** — r/Kansas, r/Wichita, r/KansasCity. Direct fit for location pages.
5. **"Is local SEO worth it for [contractor / clinic / service biz]?"** — r/sweatystartup, r/Entrepreneur. Direct fit for local-seo service.
6. **"What is llms.txt and do I need one?"** — r/TechSEO. Direct fit for AI-search-optimization service.
7. **"How do I build a custom CRM that isn't HubSpot?"** — r/SaaS, r/smallbusiness. Direct fit for custom-crm service.
8. **"What does a Kansas-based developer charge for [websites / automation]?"** — r/freelance, r/webdev. Pricing transparency advantage.
9. **"Anyone used [Lithium Marketing / KC AI Pro / Opinosis]?"** — r/Kansas, r/marketing. Direct fit for new compare pages.
10. **"Best AI agent platform for small business in 2026"** — r/AI_Agents, r/SaaS. Direct fit for ai-agents service.

### Operational cadence
- **15 min/day, 5 days/week**, scanning the 10 subs for new threads matching the patterns above
- Reply with a substantive answer; link a case study **only if the question is directly answered by that case study**
- Track which threads convert (Perplexity citation, Reddit upvotes, direct site referral) in a simple spreadsheet
- After 90 days, double down on the 2-3 subs that produced citations and quietly retire the rest

---

## 2. YouTube — Transcripts as an AI-Visibility Signal

### Why YouTube matters
Surfer's May 2025 AI-visibility study found **0.737 correlation between YouTube transcript presence and AI engine citation** — higher than any other off-site signal except Wikipedia. YouTube transcripts are indexed, structured, and machine-readable, which is exactly the substrate AI engines retrieve from.

### Plan: case-study video series
- **5-minute case-study videos** for each existing case study (4 today; 8 after Phase 4.5 additions)
- Format: problem → approach → system built → outcome → numbers
- Each video carries: a real `VideoObject` schema block on the corresponding case-study page (via `VideoObjectSchema.tsx`), a public YouTube URL, an auto-generated transcript that Tyler edits for accuracy, and a chapter list

### Video schema scaffold
The `VideoObjectSchema` React component (see `src/components/video/VideoObjectSchema.tsx`) emits a valid schema.org `VideoObject` JSON-LD block. Wire it into each case-study page once the corresponding video ships. Until then, the component sits unused — there's no benefit to emitting a `VideoObject` block that points at a video that doesn't exist (Google will flag and penalize).

### Content calendar (placeholder)
| Video | Source case study | Status |
|-------|-------------------|--------|
| Cassidy HVAC reactivation system | `case-studies/cassidy-hvac` | Not recorded |
| HG Oil Holdings inventory tracker | `case-studies/hg-oil-holdings` | Not recorded |
| Truss-Craft Buildings web app | `case-studies/truss-craft-buildings` | Not recorded (name TBD per §2.20 Q8) |
| Sunrise Transportation site | `case-studies/sunrise-transportation` | Not recorded (name TBD per §2.20 Q8) |
| Astrus Insurance portal | `case-studies/astrus-insurance` | Not recorded (name TBD per §2.20 Q8) |

### Cross-platform reuse
- 5-minute YouTube long-form → 60-sec vertical cut for LinkedIn / X
- Transcript → blog post on `/blog/<slug>` (Phase 4.8)
- Highest-engagement quotes → social-quote tiles

---

## 3. Google AI Overviews — E-E-A-T + Top-10 + IGD

### The 3 levers
1. **E-E-A-T** — Experience, Expertise, Authoritativeness, Trustworthiness. Tyler's bio page (`/tyler-preisser`), the Tyler `Person` JSON-LD on every page, the FHSU credential, the R Squared AI affiliation, and the verified case-study numbers all feed this. Phase 4.6 covered this.
2. **Top-10 organic ranking** — Google's AI Overview pulls from the top organic results. Without top-10 ranking on a query, AI Overview citation is mostly luck. Local SEO + content depth + technical SEO are the path. Covered by service pages, location pages, and the AEO architecture.
3. **Information Gain Density (IGD)** — the more **unique, non-redundant facts per word** a page contains, the more likely it is to be cited. Phase 4.2 (statistics embeds — Princeton 41%, Local Falcon 40.2%, Cassidy 60%) and Phase 4.7+ (NAP + entity facts) drive this directly.

### Already-shipped infrastructure (cross-reference)
- **R-002 / Phase 4.2** — Organization, Person, LocalBusiness, WebPage, FAQPage schema on every relevant route. Covered.
- **R-020 / Phase 4.2** — Statistics embeds in service pages (Princeton 2024 41% AI-search adoption, Local Falcon 2025 40.2% AI-driven local searches, Cassidy HVAC 60% reactivation lift). Covered.
- **R-022 / Phase 4.2** — Terminology consistency: GEO, AEO, AI search optimization, llms.txt all used canonically. Covered.

### Action items not yet shipped
- Add **first-person experience signals** to blog posts (Phase 4.8) — Tyler saw, Tyler built, Tyler measured
- Add **published / updated dates** to every blog post — freshness is a weighting factor
- Add **author = Tyler Preisser** byline on every blog post with `Person` schema linkage

---

## Cross-references
- `docs/review-strategy.md` — review acquisition for ChatGPT recommendation surface
- `docs/performance-audit.md` — Core Web Vitals 2026 targets (LCP/INP/CLS)
- `docs/local-citations.md` — NAP / citation building
- `docs/measurement-plan.md` — how we'll attribute AI-search visibility lift
- `src/components/video/VideoObjectSchema.tsx` — schema scaffold for case-study videos
