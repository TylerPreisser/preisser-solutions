# Open Questions for Tyler — Preisser Solutions Rebuild

> Generated: 2026-05-15 (Phase 4.15, §2.20 of master rebuild prompt).
>
> These eight questions are open operational / brand decisions that the
> rebuild can't make autonomously. Each one blocks (or shapes) downstream
> work. Answer in this file, in CHANGELOG.md, or in person on the next
> kickoff — whichever is easiest.

---

## 1. preissertech.com — permanent 301 or migration assist?

**Question:** Is the preissertech.com domain a permanent legacy redirect (301 → preissersolutions.com forever), or do you want to actively help anyone still landing on preissertech.com migrate to the new brand?

**Context:** The Cloudflare-edge redirect from preissertech.com → preissersolutions.com is currently live and aligned with the May 15 brand reversal. `functions/_middleware.ts` correctly canonicalizes to preissersolutions.com and 301s the legacy host. The `workers/legacy-preissersolutions-redirect.ts` file has inverted `CANONICAL_HOST` and is flagged for deletion in the master rebuild plan. The question for you is whether the preissertech.com domain should be retained indefinitely (renewal cost, link equity preservation), retired after a defined sunset window (e.g. 12-18 months), or kept permanently as a defensive registration that always 301s. The choice affects domain renewal budget and whether we add anything beyond the redirect (e.g. a small bridge page) on preissertech.com.

---

## 2. Consumer / political YouTube and TikTok identity — keep separate?

**Question:** What's the long-term plan for your consumer media presence (Preisser Media on YouTube / TikTok — the 300K+ follower, 30M+ view audience)? Keep entirely separate from preissersolutions.com, cross-link selectively, or merge brand narratives?

**Context:** The current sitewide direction is to keep the consumer audience separate from the commercial consultancy. Tyler's bio on `/about` and `/tyler-preisser` does mention Preisser Media as one paragraph in the "AI, software, and consulting" section, but no cross-link, no follower count callout, and no political / consumer content surfaces on the commercial site. This question is flagged in earlier CHANGELOG entries — if your view has shifted, the bio paragraph, the JSON-LD `sameAs` arrays, and possibly a press/about cross-link block all need updating.

---

## 3. Authoritative business directory submissions — go/no-go?

**Question:** Do you want Preisser Solutions submitted to Wikidata, Crunchbase, Clutch, G2, GoodFirms, DesignRush, BBB, Apple Business Connect, and UpCity? Each one has trade-offs.

**Context:** These directories are the substrate that AI engines and search engines use to build the entity graph for a business. Wikidata in particular is a citation graph backbone — being on Wikidata roughly doubles the odds of Perplexity / ChatGPT / Gemini citing you on entity queries. Crunchbase, Clutch, and G2 carry weight for B2B / SaaS-adjacent queries. BBB carries weight for consumer trust queries. The trade-off is that each submission is a NAP commitment — if any data is later corrected, every directory needs updating to maintain NAP consistency. The current state: none of these have been submitted yet. Decision needed per-directory or as a batch.

---

## 4. State of AI Adoption in Western Kansas SMBs 2026 — survey approved?

**Question:** Do you want to run an original survey on AI adoption among western Kansas small / mid-sized businesses, branded as "State of AI Adoption in Western Kansas SMBs 2026"? The survey would generate citable data for blog posts, press, and AI search optimization.

**Context:** Original research is one of the highest-leverage AI search optimization plays — surveys generate proprietary statistics that AI engines cite as authoritative sources. The cost is real: survey design, distribution (Hays Post / regional chambers / outreach lists), response collection, statistical analysis, and a polished write-up. Realistic timeline: 8-12 weeks. Realistic cost: $0 in cash (run internally) but ~40 hours of Tyler-time. The payoff: a defensible piece of citation bait that would put Preisser Solutions in the data-source position for any AI search query about Kansas SMB AI adoption.

---

## 5. Live AI demo phone line — build it?

**Question:** Approve building a live AI demo phone line (Lithium-style) — a public-facing AI receptionist that prospects can call to experience the technology, loaded with publishable factoids about Preisser Solutions?

**Context:** Lithium Marketing uses this as a lead-generation tactic. Operational cost is roughly $179/month (Twilio + a custom voice agent + LLM API costs at moderate volume). The build is a 2-3 week sprint. The upside is a memorable sales touchpoint and a clear "we use our own AI" signal. The downside is operational ownership (the line goes down → looks bad; misbehaves → looks worse) and the line is more a marketing tactic than a product. Flagged as an operational decision, not a code task. Note: this is also referenced on `/compare/vs-lithium-marketing`, which currently says Preisser Solutions does not offer this — that page would need updating if the answer is yes.

---

## 6. Productized SKUs — approve "AI Receptionist Starter" and "AI-Native Website Launch"?

**Question:** Sign off on the two productized SKUs as packaged offers — "AI Receptionist Starter" and "AI-Native Website Launch" — with published outcome descriptions but no fixed price card?

**Context:** Productizing two SKUs gives prospects something concrete to anchor to without committing to fixed pricing (which can backfire on scope-driven work). The `/products` route is now scaffolded with placeholder copy ("Currently configurable; contact for pricing"). If you want fixed prices published, those need to come from you — the master plan explicitly directs not to fabricate pricing. If you want to keep these SKUs deliberately custom-scoped, the placeholder copy stays and the page is fine as-is.

---

## 7. Email-capture provider — preference?

**Question:** Which email-capture / newsletter provider do you want to use for the footer subscribe form, the blog-post subscribe CTAs, and any lead magnets? Mailchimp, ConvertKit, Buttondown, Beehiiv, or other?

**Context:** Currently the footer subscribe form uses a mailto fallback (sends a notification email to sales@preissersolutions.com with the subscriber's address). That works but it's not a real ESP integration — there's no list, no double-opt-in, no transactional sending, no analytics. Before any list-based content marketing or lead-magnet workflow ships, this needs a real provider. Each provider has trade-offs (Mailchimp is bloated but ubiquitous; ConvertKit is creator-focused; Buttondown is minimalist; Beehiiv is content-creator-focused with strong analytics).

---

## 8. Case-study client names — publish or anonymize?

**Question:** Approve `truss-craft`, `sunrise-transportation`, and `astrus-insurance` as named case studies on preissersolutions.com, or anonymize them ("a Kansas truss manufacturer," "a Kansas transportation operator," "a Kansas insurance firm")?

**Context:** Named case studies are dramatically more credible than anonymized ones — both for human readers and for AI engines building the entity citation graph. Cassidy HVAC and HG Oil Holdings are already named on the site (with permission). The question is whether the three pending case studies have been cleared for naming by the clients. If yes, the data files can use the real names and the routes can publish under the real slugs. If no (or not yet), the case studies need to be reframed with industry-only labels and the slugs renamed. This decision blocks final publish of the §4.5 case-study additions.

---

## How to answer these

- **Quickest**: paste your answers directly under each question in this file, commit, and the rebuild will pick them up on the next pass.
- **In-CHANGELOG**: add a `2026-MM-DD — TYLER DECISIONS` entry to `.context/CHANGELOG.md` answering them inline.
- **Verbal**: tell me on the next pass and I'll record the decisions here for posterity.
