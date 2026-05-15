# Domain & Brand Migration Roadmap

**Status**: UNKNOWN (pending Tyler verification)  
**Created**: 2026-05-04  
**Target Completion**: May 31, 2026

This document outlines all technical and strategic work required to fully migrate from "Preisser Solutions" → "Preisser Solutions" brand and `preissersolutions.com` → `preissersolutions.com` domain.

---

## Current State (Needs Verification)

**Unknown variables** (Tyler must answer):
1. Is `preissersolutions.com` still registered and active?
2. Are HTTP 301 redirects from old URLs to new URLs already in place?
3. Is Google Search Console set up for `preissersolutions.com`?
4. Has the "Change of Address" tool been used in GSC to declare migration from preissersolutions.com?
5. Are DNS records pointing correctly? (Cloudflare MX, A, CNAME records)
6. What is the GitHub repository URL?
7. Are there any old backlinks/citations pointing to preissersolutions.com that haven't been redirected?
8. Is analytics (GA4 or similar) tracking preissersolutions.com? (No setup visible in codebase)

---

## Phase 1: Verification & Audit (Week 1, May 6-12)

**Responsible**: Internet-Investigator agent (with Tyler input on unknowns)

### 1.1 Domain Status Audit
- [ ] Verify `preissersolutions.com` registration status (Is domain still owned? Expiration date?)
- [ ] Test `preissersolutions.com` in browser (what does it serve? 404? Redirect? Old site?)
- [ ] Check DNS records for `preissersolutions.com` (Is it pointing anywhere?)
- [ ] Verify `preissersolutions.com` DNS records (Cloudflare A/AAAA/CNAME records correct?)

**Blocker if**: `preissersolutions.com` is still serving content (old site) without redirects. Needs immediate 301 setup.

### 1.2 Search Console Status
- [ ] Check if Google Search Console property exists for `preissersolutions.com` (is it verified?)
- [ ] Check if any GSC property exists for `preissersolutions.com` (old property)
- [ ] Verify "Change of Address" tool status (has it been submitted?)

**Action if missing**: Knowledge-Graph-Setup-Agent to set up both properties and submit Change of Address.

### 1.3 Backlink & Citation Audit
- [ ] Run Internet-Investigator queries to find all known backlinks to `preissersolutions.com`
- [ ] Categorize: press coverage, directory listings, social links, mentions
- [ ] Compare to `preissersolutions.com` backlinks (which ones migrated, which didn't)
- [ ] Identify outdated LinkedIn/Facebook social links in `site-config.ts`

**Output**: Spreadsheet of [URL pointing to old domain, category, domain authority, action (redirect verify, outreach, update, or leave)]

### 1.4 Archived Content Check
- [ ] Does `/archive/` directory contain the old Preisser Solutions site? (Yes, confirmed)
- [ ] Are old HTML files still indexed in Google? (Search: `site:preissersolutions.com`)
- [ ] Are old pages linked from anywhere (external or internal)?

**Action if indexed**: Verify that Google crawled the redirects. If not, manually request reindex via GSC.

---

## Phase 2: Redirect & DNS Setup (Week 1-2, May 6-20)

**Responsible**: Web-Code-Executor (code changes) + DNS admin (Tyler for Cloudflare)

### 2.1 301 Redirects (OLD → NEW)

**If `preissersolutions.com` is still registered and active**:

**Option A: Cloudflare Page Rule (if DNS already on Cloudflare)**
```
URL: preissersolutions.com/*
Redirect: 301 Permanent → preissersolutions.com/$1
```

**Option B: Next.js Middleware (if old site was Next.js)**
In `src/middleware.ts` (create if missing):
```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.hostname === 'preissersolutions.com') {
    return NextResponse.redirect(
      new URL(request.nextUrl.pathname, 'https://preissersolutions.com'),
      { status: 301 }
    );
  }
}

export const config = {
  matcher: ['/:path*'],
};
```

**Option C: Nginx/Server Config (if old site on separate server)**
```nginx
server {
  server_name preissersolutions.com www.preissersolutions.com;
  return 301 https://preissersolutions.com$request_uri;
}
```

**Verification**:
```bash
curl -I https://preissersolutions.com/
# Should return: HTTP 301 Moved Permanently
# Location: https://preissersolutions.com/

curl -I https://preissersolutions.com/services
# Should redirect to: https://preissersolutions.com/services
```

### 2.2 DNS Verification
- [ ] Confirm Cloudflare A/AAAA records for `preissersolutions.com` point to correct IP
- [ ] Verify CNAME records for any subdomains (if `api.preissersolutions.com`, etc.)
- [ ] Check MX records (email routing, if any)
- [ ] Verify TLS certificate covers both domains (if needed for backwards compat during transition)

---

## Phase 3: Code Cleanup & Updates (Week 1-2, May 6-20)

**Responsible**: Web-Code-Executor

### 3.1 Brand References in Code
**MUST CHANGE** (production impact):
- [ ] `src/app/layout.tsx` → Line 24: Change `alternateName: ["Preisser Solutionsnology", "Preisser Solutions"]` → `["Preisser Solutionsnology"]`
- [ ] `src/data/site-config.ts` → Update social links:
  - OLD: `linkedin: "https://www.linkedin.com/company/preissersolutions"`
  - NEW: `linkedin: "https://www.linkedin.com/company/preissersolutions"` (after company page renamed)
  - OLD: `facebook: "https://www.facebook.com/preissersolutions"`
  - NEW: `facebook: "https://www.facebook.com/preissersolutions"` (after page renamed)

**OPTIONAL** (cosmetic, no production impact):
- [ ] `package.json` → `"name": "preisser-solutions"` → `"name": "preisser-solutions"` (no effect on deployed site, but cleaner)
- [ ] `wrangler.toml` → `name = "preisser-solutions"` → `name = "preisser-solutions"` (Wrangler project name, cosmetic)

### 3.2 Social Link Verification
- [ ] Verify LinkedIn `/company/preissersolutions` exists and is live (may need rename from old company page)
- [ ] Verify Facebook `/preissersolutions` exists and is live
- [ ] Update site-config.ts social links to match actual live accounts
- [ ] Test all social link CTAs work (footer links, contact page, etc.)

### 3.3 Build & Test
- [ ] `npm run build` passes clean (105 pages, 0 errors)
- [ ] Run `npm run lint` — no new errors
- [ ] Test homepage in browser (`npm run preview`)
- [ ] Verify footer social links point to correct URLs
- [ ] Verify metadata canonical URLs all point to `preissersolutions.com`

---

## Phase 4: Search Engine Submission & Indexing (Week 2, May 13-20)

**Responsible**: Knowledge-Graph-Setup-Agent + Web-Code-Executor

### 4.1 Google Search Console
- [ ] Verify property for `preissersolutions.com` (if not already done)
- [ ] Use "Change of Address" tool → declare migration from `preissersolutions.com`
- [ ] Submit 10 priority pages for indexing via "Request Indexing":
  1. `preissersolutions.com/` (homepage)
  2. `preissersolutions.com/preisser-solutionsnology` (brand defense)
  3. `preissersolutions.com/tyler-preisser` (founder brand)
  4. `preissersolutions.com/locations/hays-kansas` (anchor location)
  5. `preissersolutions.com/custom-websites` (top service)
  6. `preissersolutions.com/business-automation` (top service)
  7. `preissersolutions.com/ai-agents` (emerging service)
  8. `preissersolutions.com/industries/hvac` (case-study anchor)
  9. `preissersolutions.com/compare/adams-brown` (competitive)
  10. `preissersolutions.com/pricing` (conversion page)

- [ ] Wait 3-5 days for Google to crawl and index redirects from `preissersolutions.com`
- [ ] Monitor "Coverage" report for crawl errors
- [ ] Monitor "Performance" report for ranking changes

### 4.2 Bing Webmaster Tools
- [ ] Verify Bing property for `preissersolutions.com`
- [ ] Use "Site Move" feature to declare migration
- [ ] Submit 35-URL list (all core pages) via Bing URL Submission tool
- [ ] Verify robots.txt allows all crawlers (already done ✓)

### 4.3 IndexNow Submission
- [ ] Confirm `scripts/indexnow-ping.mjs` is running and pinging Bing daily
- [ ] Manually run once to verify: `node scripts/indexnow-ping.mjs`
- [ ] Check Bing dashboard for "LastIndexTime" update

---

## Phase 5: Backlink & Citation Migration (Week 2-3, May 13-27)

**Responsible**: Backlink-Scout-Agent + Social-Amplification-Agent + Internet-Investigator

### 5.1 Identify Outdated Backlinks
From Phase 1 audit, create list of all backlinks to `preissersolutions.com`:
- [ ] Press mentions (from monitoring system baseline)
- [ ] Directory listings (BBB, Yelp, etc.)
- [ ] Local citations (chamber of commerce, etc.)
- [ ] Industry directories
- [ ] Social mentions (Reddit, Quora, etc.)

### 5.2 Backlink Outreach for Updates
For each backlink not caught by 301 redirect, reach out:
- [ ] Press articles: Contact journalists asking to update link (usually takes 1-2 weeks)
- [ ] Directory listings: Update links in admin panels
- [ ] Local citations: Update links in admin panels

**Template email**:
```
Subject: Updated URL — Preisser Solutions Domain Migration

Hi [Editor/Contact],

We recently migrated from preissersolutions.com to preissersolutions.com. 
Would you mind updating the link in your [press article/directory listing] to the new URL?

Old: https://preissersolutions.com/[path]
New: https://preissersolutions.com/[path]

Thanks for helping us maintain accurate information.

Best,
Tyler
```

### 5.3 Social & Owned Link Updates
- [ ] Update LinkedIn company page URL (if linked from external profiles)
- [ ] Update Facebook page URL (if linked)
- [ ] Update GitHub profile (if linked)
- [ ] Update Twitter bio (if linked)
- [ ] Update email signature (if used)

---

## Phase 6: Monitoring & Verification (Week 3-4, May 20-June 2)

**Responsible**: Internet-Investigator + Backlink-Scout-Agent

### 6.1 Redirect Verification
- [ ] Verify 100% of `preissersolutions.com` traffic redirects to `preissersolutions.com`
- [ ] Check redirects for all old URLs (sample 10, verify all return 301)
- [ ] Monitor for broken redirects (5xx errors in GSC)

### 6.2 Indexing Progress
| Timeline | Target | Success Criteria |
|----------|--------|------------------|
| Day 5 | Google crawls redirects | "Coverage" report in GSC shows redirected URLs |
| Day 10 | Google processes 301s | Old URLs deindexed, ranking equity transferred |
| Day 14 | Top 10 pages indexed | Core 10 URLs appear in Google organic search |
| Day 21 | Full crawl complete | All 105 pages indexed, Google deduplicates old domain |

### 6.3 Ranking Position Tracking
- [ ] Monitor `daily_citation_tracker.csv` (from Loop A monitoring system)
- [ ] Baseline: comparison of `preissersolutions.com` rankings vs `preissersolutions.com` rankings
- [ ] Expected: No ranking loss (301 = equity transfer). May see temporary dip (normal, 2-3 weeks recovery).
- [ ] By Day 90: Rankings should match or exceed old preissersolutions.com positions

### 6.4 Backlink Health
- [ ] Run competitor backlink analysis (how are Adams Brown, Lost Highway doing?)
- [ ] Track inbound links to `preissersolutions.com` (are press mentions happening?)
- [ ] Monitor "Links" section in GSC for new backlinks

---

## Phase 7: Communication & Announcements (Week 2-3, May 13-27)

**Responsible**: Social-Amplification-Agent + Content-Strategy-Agent

### 7.1 Internal Communication
- [ ] Email any team members / contractors with new domain
- [ ] Update Slack workspace (if any) with new domain
- [ ] Update internal documentation and wikis

### 7.2 External Communication
- [ ] LinkedIn announcement: "We've migrated to preissersolutions.com. Same team, same mission, sharper brand." (1 post)
- [ ] Email announcement (to any subscriber list, if exists): "New domain: preissersolutions.com. Old links redirect."
- [ ] Update social bios where visible (YouTube channel, if any, etc.)
- [ ] Press release (optional, but high-value): "Preisser Solutions rebrands as Preisser Solutions" to local outlets

### 7.3 Customer Communication
- [ ] Update any client-facing documents referencing old domain
- [ ] Send email to known clients: "Our new domain is preissersolutions.com. Bookmarks/links auto-redirect."
- [ ] Update contract templates for future clients

---

## Rollback Plan (If Needed)

If migration causes unexpected issues (Google penalties, traffic loss > 50%, severe ranking drops):

1. **Immediate** (Day 1): Verify 301 redirects are still active and working
2. **Day 2**: Monitor GSC Coverage + Performance for errors/drops
3. **If critical**: Temporarily revert to preissersolutions.com and contact Google Support
4. **Resolution**: Likely just patience (Google takes 2-4 weeks to fully process 301s); do NOT reverse domain in haste

**Never do**:
- Delete 301 redirects while GSC still processes them
- Change back to preissersolutions.com mid-migration (confuses Google)
- Set up 302 "temporary" redirects (tells Google not to transfer equity)

---

## Success Criteria (Day 90, August 2, 2026)

✓ `preissersolutions.com` fully redirects to `preissersolutions.com` with 301 status  
✓ Google Search Console shows no coverage errors for preissersolutions.com  
✓ All 105 pages indexed under preissersolutions.com (deindexed from old domain)  
✓ Ranking equity transferred: preissersolutions.com positions ≥ old preissersolutions.com positions  
✓ Backlinks migrated: 90%+ of old backlinks either 301'd or manually updated  
✓ Monitoring system (Loop E) shows positive mention/backlink growth trend  
✓ No lingering brand confusion in social/press mentions  

---

## Open Questions (Waiting on Tyler)

1. **Domain Ownership**: Does Tyler still own `preissersolutions.com`? (registration active?)
2. **Current Setup**: Are 301 redirects already in place?
3. **DNS Admin**: Who has access to Cloudflare / DNS to set up redirects if needed?
4. **GSC Status**: Is Google Search Console already set up for both domains?
5. **Email Migration**: Any email addresses on preissersolutions.com that need migrating?
6. **Client Communication**: Have existing clients been notified of the domain change?
7. **Timeline Flexibility**: Is August 2 (Day 90) the hard deadline, or can migration extend past that?
8. **Archived Content**: Should the `/archive/` directory remain for historical reference, or be removed?

---

**Next Step**: Tyler answers the 8 open questions. Then Internet-Investigator runs Phase 1 audit and reports findings.

---
