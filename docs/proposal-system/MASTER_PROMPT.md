# Preisser Solutions Proposal Page Master Prompt

You are Codex or Claude Code working inside the `preissersolutions.com` repository.

Your job is to create one private, beautiful, custom proposal page for a prospect using the existing Preisser Solutions site. This is not a separate project. This is not a new app. This is a controlled page-generation workflow inside the current repo.

The proposal must feel native to the current website: same layout rhythm, same typography, same `ps-*` styling vocabulary, same component patterns, same level of polish.

## Reference Files

Before writing code, read these files:

- `docs/proposal-system/INTAKE.md`
- `docs/proposal-system/COMPONENT_RECIPES.md`
- `docs/proposal-system/PRICING_AND_ROI.md`
- `docs/proposal-system/QUALITY_BAR.md`

Then inspect the real site:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/styles/globals.css`
- `src/components/home/*`
- `src/components/aeo/AeoPage.tsx`
- `public/robots.txt`

Read enough to understand how pages are assembled, how sections are spaced, how cards/tiles/buttons behave, and how the App Router is structured.

## Intake Source Of Truth

Use the filled intake at the bottom of this prompt. It is the only client-specific source of truth.

If a field says `skip`, use the defaults in `PRICING_AND_ROI.md`.

## Route To Create

Create exactly one page at:

```text
src/app/proposals/[COMPANY_SLUG]-[4-character-random-suffix]/page.tsx
```

Examples:

```text
src/app/proposals/cassidy-hvac-7fk2/page.tsx
src/app/proposals/hardin-insurance-q9m2/page.tsx
```

Do not create a proposal index.

Do not add the proposal to the sitemap.

Ensure `public/robots.txt` includes:

```text
Disallow: /proposals/
```

If it already exists, do not duplicate it.

## Metadata

The proposal page must include metadata that prevents search indexing:

```ts
export const metadata = {
  title: {
    absolute: "[CLIENT] Proposal | Preisser Solutions",
  },
  description: "Private proposal prepared for [CLIENT] by Preisser Solutions.",
  robots: {
    index: false,
    follow: false,
  },
};
```

Use the existing layout. Do not remove the site header/footer unless the current repo has an established landing-page exception.

## Page Structure

Build the page in this order:

1. Hero
2. Problem recap
3. Ad spend reframe
4. Industry insert
5. Recommended package
6. What's included
7. Add-ons, only if present
8. Investment summary
9. ROI math
10. Comparison
11. Founder voice
12. Timeline
13. Close

Use `COMPONENT_RECIPES.md` for the section recipes.

## Pricing Rules

Pricing is locked. Use `PRICING_AND_ROI.md`.

One-time build fee:

- Standard: $1,997
- Expanded: $3,497
- Custom Application: starts at $8,500 unless a specific quote is in the intake

Monthly plan:

- Foundation: $297/mo
- Growth: $497/mo
- Performance: $897/mo

All monthly plans are 12-month minimum.

Year 1 total:

```text
build fee + monthly plan x 12 + add-ons
```

Recurring annual:

```text
monthly plan x 12
```

Do not invent custom pricing tiers.

Do not change a quoted add-on price.

## Writing Rules

Tone:

- Direct
- Builder-confident
- Specific
- Second person where appropriate
- No agency fluff

Avoid:

- synergy
- unlock
- transform
- leverage as a verb, except in Tyler's founder statement where it is already written
- vague benefits
- invented facts

Use:

- concrete numbers
- clear package math
- call-specific problem language
- short paragraphs
- tiles/cards only where they help scanning

## Question Rules

Ask at most 3 follow-up questions only if truly blocked.

Allowed questions:

- Which package should be highlighted as recommended?
- Is this Standard, Expanded, or Custom Application?
- Should the comparison focus on Wix/builders, regional agencies, or one-time web designers?
- Is the timeline 4 or 6 weeks?

Do not ask for:

- industry stats
- LCV
- ad spend defaults
- conversion assumptions
- SEO research
- component architecture
- pricing

Use the reference files for those.

## Implementation Rules

- Prefer existing CSS classes and local component patterns.
- Add page-specific CSS to `src/styles/globals.css` only when necessary.
- Keep any new classes prefixed with `ps-proposal-`.
- Keep the page static-export friendly.
- Do not add dependencies.
- Do not change unrelated pages.
- Do not deploy unless explicitly asked.

## Output Required

After creating the proposal page, report:

1. Files created/changed with full paths.
2. Full proposal URL:

```text
https://preissersolutions.com/proposals/[slug-with-suffix]
```

3. Pricing summary:

```text
Build fee:
Monthly:
Add-ons:
Year 1 total:
Recurring annual:
```

4. Anything Tyler should review before sending.
5. Verification run, usually `npm run build`.
6. Whether deploy is needed.

## Filled Intake

Paste and fill this block before running:

```text
1. COMPANY_NAME:

2. COMPANY_SLUG:

3. INDUSTRY:

4. LOCATION:

5. CONTACT:

6. THE_PROBLEM:

7. RECOMMENDED_PACKAGE:
   Foundation / Growth / Performance

8. BUILD_TYPE:
   Standard / Expanded / Custom Application

9. ADD_ONS:
   List each add-on with the price already quoted, or "none"

10. THEIR_AD_SPEND:
    Example: "$5,000/mo", "minimal", or "skip"

11. TIMELINE_WEEKS:
    Default 4 for Standard, 6 for Expanded

12. WHAT_HOOKED_THEM:
```
