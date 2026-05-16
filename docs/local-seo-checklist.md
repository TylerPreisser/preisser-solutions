# Local SEO Checklist — GBP + Citation Optimization

Manual-action checklist for Tyler. The work in this file is **not done by build automation** — it lives in
Google Business Profile, Bing Places, and third-party directories. Run through this when launching the
rebuilt site, then re-audit every quarter (see `docs/seo-maintenance.md`).

> **Companion docs (do NOT duplicate — cross-reference):**
> - `docs/local-citations.md` — full directory portfolio (Tier 1-6) with claim status per platform
> - `docs/review-request-template.md` — the email/SMS templates for review requests
> - `docs/review-strategy.md` — when and how to ask, escalation paths
> - `docs/perplexity-strategy.md` — AI-platform-specific local positioning

Where this file overlaps with `local-citations.md` (e.g., directory list), the citations doc is the
**source of truth** for which platforms exist. This file is the source of truth for **what to fill in**
on each platform.

---

## Canonical NAP (must match exactly everywhere)

Pulled from `src/data/site-config.ts`. Any drift between this and a directory listing costs ranking.

- **Name:** Preisser Solutions
- **Address:** Hays, Kansas 67601
- **Email:** tyler@preissertech.com
- **URL:** https://preissersolutions.com
- **Hours:** By appointment (consulting model)

---

## 1. Google Business Profile (GBP)

GBP is the single highest-ROI item on this checklist. Claim it first. Re-audit categories, services,
photos, and posts every month.

### Business basics

- [ ] **Business name:** `Preisser Solutions` — exact. No descriptors ("Preisser Solutions LLC" only
      if that's the legal entity name; do NOT add "AI Consulting" or "Web Design" suffixes — that's
      keyword-stuffing and risks suspension).
- [ ] **Primary category:** `Software Company` (best fit; covers custom websites + AI agents + automation).
- [ ] **Secondary categories** (pick 2-3, no more):
  - `Internet Marketing Service`
  - `Website Designer`
  - `Business Management Consultant`
  > Don't pick `Computer Repair Service` or similar — wrong intent, drags rankings toward consumer queries.
- [ ] **Service area:** Hays, Great Bend, Salina, Russell, WaKeeney, Colby, Dodge City, Garden City,
      Wichita, Kansas City, and "Western Kansas" as a region. Add up to 20 cities.
- [ ] **Phone:** `+1 ` (GBP displays this; must match every directory).
- [ ] **Website:** `https://preissersolutions.com` (NO UTM parameters; UTMs break canonical signals).
- [ ] **Appointment URL:** `https://preissersolutions.com/contact`
- [ ] **Description (750 chars max):** Lead with the entity statement from `src/app/layout.tsx`:
      "Preisser Solutions is a Hays, Kansas custom software, AI, and automation consultancy founded by
      Tyler Preisser. We build custom websites, AI agents, business automation, and web applications
      for Kansas businesses and clients nationwide." Pad to ~700 chars with service-specific copy
      mirroring `src/data/services.ts`.

### Services list (GBP "Services" tab)

Map each to a page on the site. Pricing optional but adds CTR.

- [ ] Custom Websites → `/services/custom-websites`
- [ ] Local SEO → `/services/local-seo`
- [ ] AI Search Optimization (AEO) → `/services/ai-search-optimization`
- [ ] AI Automation → `/services/ai-automation`
- [ ] Custom AI Agents → `/services/custom-ai-agents-hays-ks`
- [ ] AI Consulting → `/services/ai-consulting-hays-ks`
- [ ] Web Applications → `/web-applications`
- [ ] Business Automation → `/business-automation`
- [ ] Hays SEO → `/services/seo-hays-ks`

### Attributes

- [ ] **Online appointments:** Yes
- [ ] **Online estimates:** Yes
- [ ] **Identifies as:** (skip unless Tyler wants to claim Veteran-owned, etc.)
- [ ] **Languages spoken:** English

### Photos

Quality > quantity. 8-12 photos is the sweet spot.

- [ ] **Logo** (1:1 square, transparent background or white bg, 720x720 min)
- [ ] **Cover** (16:9, hero shot — Tyler at desk, or branded gradient)
- [ ] **Tyler headshot** (the same one used on `/about` and LinkedIn)
- [ ] **Workspace** (2-3 shots — desk, monitor, Hays office context)
- [ ] **Whiteboard / strategy session** (signals "consulting" intent)
- [ ] **Site screenshots** (2-3 of the rebuilt site itself, plus 1-2 client deliverable screenshots
      — with permission)

### Posts (cadence)

- [ ] **Weekly cadence:** 1 post/week. Mix of:
  - "What's new" — new service, new case study, new blog post
  - "Offer" — free audit, free roadmap call
  - "Event" — meetup, webinar, FHSU appearance
- [ ] **Format:** 200-300 word body + 1 image + 1 CTA link (always to a page on the site, not the
      home page — drive to the page that matches the post's intent).
- [ ] **Repurpose:** every blog post (R-067..R-087) → 1 GBP post when it publishes.

### Reviews

The fastest local-SEO lever. 10+ reviews moves the local pack; 25+ is competitive in Hays.

- [ ] **Ask cadence:** every completed project. Use `docs/review-request-template.md`.
- [ ] **Respond to 100%** of reviews within 48 hours. Mention service + city in the response (e.g.,
      "Thanks for the kind words about the custom website project, Sarah — glad it's working for the
      Hays team!"). Mentions help local rankings.
- [ ] **Negative review protocol:** acknowledge, take it offline, fix, follow up. Never argue publicly.

---

## 2. Bing Places + Apple Business Connect

These mirror GBP. Copy the GBP fields verbatim. See `docs/local-citations.md` for claim status.

- [ ] **Bing Places:** same name, NAP, categories, description, photos. Import from GBP if possible
      (Bing has a one-click import).
- [ ] **Apple Business Connect:** same data. Particularly important because Apple Maps powers Siri
      results — and AI voice assistants are increasingly cited in our target queries.

---

## 3. Tier 1 social profiles (must claim)

- [ ] **Facebook Business Page** — `facebook.com/preissersolutions` — NAP + cover image + about
      paragraph (same as GBP description).
- [ ] **LinkedIn Company Page** — `linkedin.com/company/preissersolutions` — same NAP, "Headquartered
      in Hays, Kansas". Tag Tyler as founder. Post 1×/month.
- [ ] **X / Twitter** — `x.com/preissersolutions` — claim handle even if not posting.
- [ ] **Yelp for Business** — claim listing; respond to any existing reviews; complete the profile
      even though Yelp drives little tech-services traffic (it still feeds Apple Maps + voice).
- [ ] **BBB Kansas** — accreditation optional ($$$); free listing is fine.

---

## 4. Kansas regional / local directories

These are the highest-value local citations. Each one is a local entity reference that GBP weighs.
See `docs/local-citations.md` Tier 2 for the full list.

- [ ] **Hays Area Chamber of Commerce** — member listing; lead-generation page.
- [ ] **Great Bend Chamber of Commerce** — adjacent-market exposure.
- [ ] **Salina Area Chamber of Commerce** — eastern-edge of the service area.
- [ ] **Hays CVB (Visit Hays)** — local business directory.
- [ ] **Ellis County business directory** — county-level mention.
- [ ] **Kansas Department of Commerce** business listing.
- [ ] **NetWork Kansas** — small business resource directory.
- [ ] **Kansas Small Business Development Center (KSBDC)** — alumni / partners listing.
- [ ] **Fort Hays State University alumni / partners** directory — Tyler is FHSU alumni; lean into
      this signal.
- [ ] **Hays Post business directory.**
- [ ] **Hays Daily News business directory.**
- [ ] **Kansas City Business Journal** company profile.
- [ ] **Wichita Business Journal** company profile.

---

## 5. B2B agency directories

These drive direct leads (Clutch in particular) AND act as entity signals for AI platforms.

- [ ] **Clutch.co** — full profile + 3-5 verified reviews (Clutch will email past clients for
      verification; Tyler arranges this).
- [ ] **The Manifest** (Clutch's sister property; same profile).
- [ ] **UpCity** — fewer reviews matter; profile completeness matters.
- [ ] **GoodFirms.**
- [ ] **DesignRush** — strong for "best web design agency in Kansas" type queries.
- [ ] **Sortlist.**
- [ ] **Agency Spotter.**
- [ ] **TopDigital.Agency.**

---

## 6. Founder + entity disambiguation

Helps AI platforms tell "Tyler Preisser, Preisser Solutions, Hays KS" apart from any other "Preisser"
on the web. See `docs/local-citations.md` Tier 4.

- [ ] **Crunchbase company profile** — Preisser Solutions org.
- [ ] **Wikidata entity** — file for Preisser Solutions and for Tyler Preisser. Cite the site and the
      LinkedIn profiles as sources.
- [ ] **GitHub organization** — `github.com/preissersolutions` (claim handle).
- [ ] **LinkedIn personal** — `linkedin.com/in/tyler-preisser` — keep current, link to site in
      featured section.
- [ ] **AngelList / Wellfound founder profile.**

---

## 7. Reviews + reputation (Tier 5)

- [ ] **Trustpilot** business profile.
- [ ] **G2** + **Capterra** — defer until internal products are listed; not needed for consulting work.

---

## Citation hygiene rules (apply to every entry above)

1. Every listing uses the canonical NAP **exactly** as defined in this file and in
   `src/data/site-config.ts`.
2. Categories selected on each platform should match GBP categories (set GBP first; mirror everywhere).
3. Photos: same headshot, same logo, same workspace shots across every profile. Visual consistency
   reinforces entity.
4. Hours: **By appointment** (consulting model, not retail). Never list "9-5 M-F" — it implies a
   walk-in business and triggers wrong-intent queries.
5. Website link: always `https://preissersolutions.com` — no trailing slash, no UTM on directory
   listings. (UTMs break canonical signals AND get flagged as referral spam by some platforms.)
6. Description, every time: lead with the entity statement from `src/app/layout.tsx`:
   "Preisser Solutions is a Hays, Kansas custom software, AI, and automation consultancy founded by
   Tyler Preisser."

---

## Re-audit cadence

- **Monthly:** GBP posts (1/week minimum), respond to reviews, refresh 1 photo.
- **Quarterly:** Audit categories + services list against the live site. Verify NAP consistency
  across Tier 1-3 directories.
- **Annually:** Full citation sweep — every directory in `docs/local-citations.md`, verify still
  live + still consistent. Re-claim anything that's drifted or been auto-edited by aggregators.

---

_Last updated: 2026-05-16. Tracks against `docs/priority-scorecard.md` items #21-26 (GBP, Citations,
Wikidata, Crunchbase, Clutch/UpCity, BBB)._
