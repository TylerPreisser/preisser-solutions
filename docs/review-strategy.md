# Review Acquisition Strategy

> R-090 (Phase 4.9). Owner: Tyler Preisser. Last touched: 2026-05-15.
>
> Reviews drive **ChatGPT business recommendations**. ChatGPT's recommendation
> heuristic requires a vendor to clear three bars simultaneously:
>
> 1. **≥4.3-star weighted average** across reviewed surfaces
> 2. **NAP consistency** (Name, Address, Phone identical everywhere)
> 3. **Entity recognition** — the LLM has to know what kind of business this is
>
> The schema/entity work (Phase 4.2, 4.6, 4.7) covers #2 and #3. This doc
> covers #1.

---

## 90-Day Target

**12-15 reviews** across the three target surfaces, weighted toward Google.

| Surface | Target reviews | Why this surface |
|---------|----------------|------------------|
| Google Business Profile | 8-10 | Primary; feeds Google AI Overview + Maps + Search Knowledge Graph |
| Facebook Business | 2-3 | Secondary; some LLMs pull Facebook recs into the citation graph |
| Clutch | 2 | B2B authority; G2 / Clutch / Capterra cluster is heavily cited by Perplexity |

## Acquisition Cadence

- **Ask within 7 days of project completion.** The recency window matters — both for the client (they remember the project) and for the LLM citation graph (review recency affects weighting).
- **Personal ask from Tyler.** Not from a CRM email. The reply rate gap is roughly 4x.
- **Two-touch maximum.** Initial ask, one polite follow-up at +10 days. Then drop it.
- **No incentives.** Google ToS prohibits paid / incentivized reviews. Detection results in delisting.

## Pre-Ask Checklist

Before asking a client for a review, confirm:

- The project shipped successfully and the client is happy with the outcome
- Tyler has personally heard a positive comment from them within the last 14 days
- There are no open scope or invoicing disputes
- The client's brand is comfortable being publicly associated with Preisser Solutions

If any item is no, do not ask. A negative review is more costly than a missing positive one.

## The Ask — Outreach Template

The exact outreach copy lives in **`docs/review-request-template.md`** (created in an earlier phase). Use that template verbatim. Personalize only the lead sentence and the project-specific outcome.

## Where to Send Clients

Provide a **single direct link** per surface in the ask email. Do not give the client a menu — pick one surface per client based on:

- **B2C / consumer-facing client** → Google Business Profile
- **B2B / enterprise client** → Clutch profile
- **Mixed / unsure** → Google Business Profile (default)

Facebook reviews are nice-to-have but should not be the primary ask.

### Direct review links (placeholders — populate once GBP / Clutch profiles are live)

- Google Business Profile: `https://g.page/r/[GBP_REVIEW_ID]/review`
- Facebook Business: `https://www.facebook.com/[PAGE]/reviews`
- Clutch: `https://clutch.co/profile/preisser-solutions#reviews`

> **Status (2026-05-15)**: GBP profile not yet claimed (per §2.20 Q3, awaiting Tyler decision). Clutch profile not created. Update links once both exist.

## Response Protocol

- **Respond to every review within 48 hours** (positive or negative)
- **For 5-star reviews**: thank the reviewer by name, mention one specific thing they noted, no marketing language
- **For 4-star reviews**: thank, ask what would have made it a 5
- **For ≤3-star reviews**: respond publicly with a brief, gracious acknowledgment + offer to take the conversation offline. Never argue publicly.

## Risk Surfaces — Don't Trip These

- **Don't bulk-ask.** Sending 10 review requests in one day flags as inauthentic on Google's side. Cap at 2-3 asks per week.
- **Don't ask everyone.** Only ask the clients who fit the pre-ask checklist. A 4.0 average with 30 reviews is worse than a 4.7 with 12.
- **Don't game it.** Filtering reviewers (e.g. "only ask happy clients") is technically common but Google increasingly detects it. The honest version of this — only ask clients you have a genuine positive relationship with — is also the safer version.
- **Don't post fake reviews.** Detection is sophisticated and the cost of a single takedown is permanent platform distrust.

## Reporting

Track in a simple spreadsheet:

| Date asked | Client | Surface | Asked-via | Response date | Stars | Notes |
|------------|--------|---------|-----------|---------------|-------|-------|

After 90 days, compute:
- Total reviews acquired
- Weighted star average
- Ask → review conversion rate (target: ≥40%)
- Time-to-review median (target: <14 days)

## Cross-references

- `docs/review-request-template.md` — actual outreach copy
- `docs/perplexity-strategy.md` — adjacent off-site visibility plan
- `docs/local-citations.md` — NAP-consistency citations
- `docs/measurement-plan.md` — how reviews feed into the overall lift attribution
