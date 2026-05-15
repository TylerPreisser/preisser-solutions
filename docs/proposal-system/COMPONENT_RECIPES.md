# Proposal Component Recipes

These are implementation recipes, not hard-coded components. The coding agent should read the actual site first and map these recipes onto the existing `ps-*` CSS vocabulary, page sections, buttons, cards, tiles, animations, and layout patterns.

## Page Route

Create one proposal page at:

```text
src/app/proposals/[company-slug-with-random-suffix]/page.tsx
```

The suffix should be 4 random lowercase letters/numbers, for example:

```text
cassidy-hvac-7fk2
```

Do not create a browsable proposal index.

## Metadata

Proposal pages must be private-client pages:

- `robots: { index: false, follow: false }`
- `alternates.canonical` should be the exact proposal URL.
- Add a visible or invisible note only if it fits the design: "Private proposal prepared for [CLIENT]."
- The page should still use the normal site header/footer unless explicitly told otherwise.

## Section Order

1. Hero
2. Problem recap
3. Ad spend reframe
4. Industry insert
5. Recommended package
6. What's included
7. Add-ons, only when present
8. Investment summary
9. ROI math
10. Comparison
11. Founder voice
12. Timeline
13. Close

## Hero Recipe

Purpose: Make the client feel like the proposal was written from the call.

Use a full-width hero section with the existing homepage/proposal visual language. Keep the headline short.

Pick one:

### Heavy Ad Spend

Headline:

```text
Stop Paying Google Rent.
```

Subhead:

```text
A custom growth system for [CLIENT], built to replace rented attention with a fast site, organic visibility, AI search readiness, and lead capture that compounds.
```

### Service Business

Headline:

```text
Win Back The Customers You've Already Earned.
```

Subhead:

```text
A custom growth system for [CLIENT]: a fast website, automated lead capture, and AI search optimization for the people searching in [CITY].
```

### Professional Services

Headline:

```text
When They Ask AI, You Show Up.
```

Subhead:

```text
A custom proposal for [CLIENT], designed to make the business easier to find, easier to trust, and easier to choose in [CITY].
```

## Problem Recap Recipe

Use 2-3 paragraphs in second person.

Do:

- Reflect `THE_PROBLEM` in the client's language.
- Mention what it is costing them: missed calls, slow follow-up, weak credibility, rented ad spend, unclear positioning, manual work.
- Anchor the page in `WHAT_HOOKED_THEM`.

Do not:

- Over-dramatize.
- Invent facts that were not in the intake.

## Ad Spend Reframe Recipe

Use this as the core close:

```text
If you're spending [CURRENT_AD_SPEND] per month on ads, the moment you stop paying, the traffic stops. You're renting visibility.

The proposal redirects a fraction of that spend into an asset you own: a fast site, Google search foundation, AI-readable content, lead capture, and ongoing optimization that compounds.
```

Then list 4 bullets:

- Google rankings that keep earning clicks after the page is built
- AI search visibility through structured content and machine-readable context
- A site built to convert the traffic when it arrives
- Lead capture and routing that keeps inquiries from getting lost

## Package Tiles Recipe

Show all three monthly tiers. Highlight `RECOMMENDED_PACKAGE`.

Tile fields:

- Name
- Build + monthly
- Best for
- 3-4 included items
- Year 1 total

Use existing tile/card patterns. If the site has expandable details nearby, use `<details>` or a native expandable pattern that matches the rest of the site.

## What's Included Recipe

Pick 4-6 service tiles from:

- Custom-coded website
- Google SEO foundation
- AI search optimization
- Lead capture and routing
- Hosting, security, uptime
- Content engine
- Google Business Profile support
- Conversion optimization
- Lead pipeline monitoring
- Custom automation and AI agents

Each tile should have:

- Short title
- One-line visible summary
- Expandable details

## Investment Summary Recipe

This should be the clearest card on the page.

Fields:

- One-time build fee
- Monthly plan x 12
- Add-ons
- Year 1 total
- Recurring annual cost after year 1

No vague pricing. No hidden fees.

## ROI Math Recipe

Use the closest industry template from `PRICING_AND_ROI.md`.

Show:

- Break-even customers/leads/orders
- Conservative return framing
- Why the math is not tight if their customer value is meaningful

Keep it clean. This is a confidence section, not a spreadsheet.

## Comparison Recipe

Include up to three comparison tiles:

### vs. Wix / Squarespace / Cheap AI Builders

Builder platforms can get something online, but the tradeoff is speed, ownership, AI visibility, and conversion.

### vs. Regional Agencies

Agencies can do good work, but the client pays for overhead and handoffs. Preisser Solutions works direct with the builder.

### vs. One-Time Web Design

A launch-only site starts aging the day it goes live. The monthly plan keeps the system maintained and improving.

## Founder Voice Recipe

Use this verbatim or very close:

```text
I'm an AI builder.

That's what I do: I leverage AI to bring world-class, enterprise-grade technology to businesses in Kansas at a price they can actually afford. Custom websites. Custom applications. Automations. Custom AI agents. The same caliber of work the Fortune 500 buys from McKinsey or Accenture, built for the company down the street from me, at a fraction of the cost.

The reason this works is leverage. AI doesn't replace the strategic thinking, the design judgment, or the relationship. It replaces the grunt work. Every hour of manual labor we cut from the build is an hour of cost we cut for you.

I'm not the cheapest option. I'm the only option in western Kansas building this caliber of work for businesses your size.
```

## Timeline Recipe

For Standard:

- Week 1: strategy, content, technical setup
- Week 2: design system, page build, conversion path
- Week 3: SEO/AEO setup, forms, integrations, review
- Week 4: QA, launch, Search Console, handoff

For Expanded:

- Week 1: strategy, content, architecture
- Week 2: design system and core pages
- Week 3: extended pages and custom features
- Week 4: integrations and lead routing
- Week 5: SEO/AEO, QA, review
- Week 6: launch, monitoring, handoff

For Custom Application:

Write a realistic phased timeline from the scope. If unclear, ask one question.

## Close Recipe

Default:

```text
Ready when you are.

The next step is a 30-minute kickoff call where we walk through scope, timeline, and onboarding. From there, we go from yes to live in [TIMELINE_WEEKS] weeks.
```

Use one clear CTA to `/contact` or a direct scheduling link if one exists in the repo.
