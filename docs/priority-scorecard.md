# Priority Scorecard — Preisser Solutions Rebuild

Directional priority matrix for the rebuild and post-rebuild work. Not a full audit — a working sample (~20 items) that helps Tyler decide what to push on next when time is constrained.

**Scoring:**
- **Effort:** 1 (trivial — under 1 hour) ... 5 (multi-day deep work)
- **Impact:** 1 (marginal — minor polish) ... 5 (transformational — moves the business)
- **Priority:** HIGH if `Impact / Effort >= 1.5`. MEDIUM if `0.8 - 1.49`. LOW if `< 0.8`.
- **Status:** DONE / IN-PROGRESS / NOT STARTED.

> Re-score quarterly as the rebuild ages. Items that were transformational at launch (e.g., NAP visibility) become merely-maintenance over time.

---

## Scorecard

| Item | Effort | Impact | Priority | Status |
|---|---|---|---|---|
| Brand reversal (Preisser Tech → Preisser Solutions) | 4 | 5 | HIGH | DONE |
| `src/app/layout.tsx` rich schema (Organization, Person, LocalBusiness, sameAs) | 3 | 5 | HIGH | DONE |
| Footer NAP visible with semantic `<address>` (R-062) | 1 | 4 | HIGH | DONE |
| `public/llms.txt` + `llms-full.txt` cleanup (botched-replace artifact removal) | 2 | 4 | HIGH | DONE |
| Homepage hero overhaul (H1 + subhead + CTAs + value strip + proof bar) | 3 | 5 | HIGH | DONE |
| New services pages (custom websites, AI agents, automation, web apps, dashboards) | 4 | 5 | HIGH | DONE |
| New compare pages (8 comparison pages: vs CSG Media, Imagemakers, etc.) | 5 | 4 | MEDIUM | DONE |
| New case studies (Cassidy HVAC, HG Oil, Sunrise Transport, Astrus, Marcommand, Iron+Oak, Wife Supply) | 5 | 5 | HIGH | DONE |
| `/integrations` page (Stripe, HubSpot, Anthropic, OpenAI, Cloudflare, etc.) | 3 | 4 | HIGH | DONE |
| Tyler bio expansion to 1500+ words (founder entity strength) | 3 | 4 | HIGH | DONE |
| `docs/local-citations.md` directory portfolio | 1 | 3 | HIGH | DONE |
| `docs/review-request-template.md` (organic review pipeline) | 1 | 4 | HIGH | DONE |
| 30 / 60 / 90 execution plan (`.context/plans/30-60-90.md`) | 2 | 4 | HIGH | DONE |
| Blog content scaffold + first 4 posts (R-067..R-087, Phase 4.8) | 5 | 5 | HIGH | NOT STARTED |
| Hardcoded NAP audit + fix (R-064 — single hardcoded email in footer.tsx newsletter) | 1 | 3 | HIGH | DONE |
| Conversion / CTA optimization on top-5 pages (R-095..R-097, Phase 4.10) | 3 | 4 | HIGH | NOT STARTED |
| Buzzword rewrites + removals (R-098..R-102, Phase 4.11) | 2 | 3 | HIGH | NOT STARTED |
| Competitive positioning copy refresh (R-103..R-106, Phase 4.12) | 2 | 3 | HIGH | NOT STARTED |
| Facts embedding + open question handling (R-111..R-146, Phase 4.15) | 4 | 4 | HIGH | NOT STARTED |
| Platform-specific optimization (Google, Bing, Perplexity, Claude, ChatGPT — R-088..R-094) | 4 | 4 | HIGH | NOT STARTED |
| GBP claim + 3-category selection (R-063) | 1 | 5 | HIGH | NOT STARTED |
| Citation building (Tier 1+2 — Hays Chamber, Kansas Dept of Commerce, FHSU, etc.) | 3 | 5 | HIGH | NOT STARTED |
| Wikidata entity creation (Preisser Solutions + Tyler Preisser) | 2 | 4 | HIGH | NOT STARTED |
| Crunchbase profile creation | 1 | 3 | HIGH | NOT STARTED |
| Clutch / UpCity / GoodFirms / DesignRush profiles | 3 | 4 | HIGH | NOT STARTED |
| BBB Kansas listing | 1 | 2 | MEDIUM | NOT STARTED |
| Sitemap submission to GSC + Bing Webmaster Tools (R-028) | 1 | 5 | HIGH | NOT STARTED |
| Email-capture sequence (5-email mini-course via Resend) | 3 | 3 | MEDIUM | NOT STARTED |
| Paid ads pilot (one client, 60 days) | 4 | 4 | HIGH | NOT STARTED |
| FHSU alumni feature pitch (Tiger Media + FHSU Alumni News) | 1 | 3 | HIGH | NOT STARTED |
| Cleanup phase — dead-file deletion (Phase 5) | 2 | 2 | MEDIUM | NOT STARTED |
| Verification phase — build / type / lint / brand-grep (Phase 6) | 2 | 5 | HIGH | NOT STARTED |
| Deploy-prep documentation (Phase 7) | 1 | 3 | HIGH | NOT STARTED |

---

## How to read this

- **DONE rows ranked HIGH or MEDIUM** are the foundation. They should not regress; treat as audit checkpoints (quarterly).
- **NOT STARTED rows ranked HIGH** are the queue. Work them in roughly the order they appear — the table is ordered to roughly follow phase sequence, but the priority column is the actual decision rule when time-constrained.
- **MEDIUM / LOW NOT STARTED** items are fine to defer indefinitely; revisit if the high-priority queue is clear.

---

## Re-scoring triggers

Re-score the scorecard when:
1. A new piece of evidence changes the impact estimate (e.g., GBP turns out to drive 60% of leads → GBP-related items move to impact=5).
2. A new dependency lands (e.g., Crunchbase profile is created → unblocks Wikidata entity which was waiting).
3. A quarter passes — defaults drift, re-baseline.

---

_Last updated: 2026-05-15. Original baseline: Phase 4 in progress, Phases 1-3 + 4.1-4.6 done._
