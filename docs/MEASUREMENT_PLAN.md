# Measurement Plan

## Current Implementation

- Direct GA4 is supported through `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Contact submissions post to `/api/lead`, a Cloudflare Pages Function that forwards to `ZAPIER_LEAD_WEBHOOK_URL`.
- The contact form captures UTM/ad click parameters, landing page, page path, referrer, and an `event_id`.
- Phone and CTA event helpers use the existing direct GA4 path when GA is configured.

Do not add GTM on top of direct GA4 unless the direct snippet is intentionally removed.

## Weekly Tracking

- Google Search Console impressions, clicks, queries, pages, and indexing issues
- Bing Webmaster Tools impressions, clicks, submitted URLs, and sitemap status
- GBP calls, website clicks, direction requests where applicable, profile views, reviews, and photos
- Review count and review velocity
- Local rank checks for target Hays queries
- Form fills and `/api/lead` delivery status
- Call clicks
- Booked audits
- Conversion rate by page
- Indexed pages
- Broken internal links
- Core Web Vitals
- Manual AI visibility checks in ChatGPT, Perplexity, Gemini, and Google AI experiences where available

## Conversion Events

- `generate_lead`: fire only after `/api/lead` returns success
- `phone_call_click`: phone CTA clicks
- `cta_click`: major audit CTA clicks
- Future: `booking_click` when a real booking URL exists

## Lead Source Fields

Capture and pass:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid`
- `gbraid`
- `wbraid`
- `msclkid`
- `landing_page`
- `page_path`
- `referrer`
- `event_id`

## Manual Setup

- Verify Google Search Console.
- Verify Bing Webmaster Tools.
- Submit `https://preissersolutions.com/sitemap.xml`.
- Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Cloudflare Pages at build time.
- Set `ZAPIER_LEAD_WEBHOOK_URL` as a Cloudflare Pages production secret or environment variable.
- Mark `generate_lead` as a GA4 key event after data is flowing.

## 2026-05-14 Secret Check

`wrangler pages secret list --project-name=preisser-solutions` showed no production secrets. Until `ZAPIER_LEAD_WEBHOOK_URL` is added, `/api/lead` will validate requests but return `503` instead of forwarding leads.
