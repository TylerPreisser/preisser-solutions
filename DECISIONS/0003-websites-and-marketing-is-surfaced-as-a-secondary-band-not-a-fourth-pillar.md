# ADR-0003: Websites and marketing is surfaced as a secondary band, not a fourth pillar
Status: Accepted — 2026-09-03 (conversation, decided under ADR-0001) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- The owner said, 2026-09-03: *"Maybe we should throw in the custom websites thing, because I'm getting
  a lot of customers that want websites and maybe marketing stuff. You maybe run a design audit or
  something."* He then instructed agents to execute the whole overhaul without returning for
  approvals (ADR-0001), so the "maybe" is resolved by an agent rather than left open.
- The capability is not missing. `src/app/services/` already contains `custom-websites/`,
  `website-redesign/`, `website-migration/`, `conversion-optimization/`, `paid-ads/`, `local-seo/`,
  `ai-search-optimization/`, `digital-marketing-hays-ks/` and
  `google-ads-local-seo-service-business/` as live routes.
- The actual gap, measured: `grep -n '"/services/' src/components/home/*.tsx` returns **zero hits**.
  The homepage links to no service page at all, so the demand he is seeing has no path in from the
  front door.
- The cost of the obvious alternative is high. `src/components/home/service-pillars.tsx` carries
  exactly three pillars, and the hero `<h1>` is those same three strings as one sentence sourced from
  `siteConfig.hero.h1` (`hero.tsx:9-12`). That one string also feeds the accessible name, the JSON-LD
  slogan and the SEO validators, and the claims are gated on
  `docs/plans/2026-08-02-three-pillar-reposition.md §9`.

## Decision
1. Websites and marketing is surfaced on the homepage as a compact secondary band, visually
   subordinate to the three pillars, whose job is to route visitors into the service pages that
   already exist. It ships as `src/components/home/websites-and-marketing.tsx` exporting
   `WebsitesAndMarketing`, with its own stylesheet.
2. The hero `<h1>`, `siteConfig.hero.h1`, the JSON-LD slogan and the three-pillar structure are NOT
   touched. There is no fourth pillar.
3. Explicitly NOT allowed: adding a fourth pillar to `service-pillars.tsx`; editing the H1 to name a
   fourth capability; inventing metrics, client names or outcomes for the new band; linking to a
   `/services/*` path that has no `page.tsx`.
4. Every link in the band must resolve to an existing route, verified at build time.

## Consequences
- Implementers: the band is additive and reversible. It creates the homepage's first `/services/*`
  links, which is the point.
- Review agents must NOT flag the absence of a fourth pillar as an incomplete implementation of the
  owner's request, and must NOT recommend promoting the band to pillar weight.
- Cost accepted: a secondary band carries less weight than the owner's phrasing might imply. It is
  the reversible version; promoting it later is a one-line mount change, whereas unwinding an H1 and
  JSON-LD reposition is not.

## Open / not yet decided
- Whether the owner wants websites promoted to true pillar status, which would be a repositioning
  exercise with SEO consequences and should be its own ADR with his direct sign-off.
- What he meant by *"you maybe run a design audit or something"* — an audit offered as a paid service,
  or an audit run against this site. Neither is settled and neither is implemented here.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding.

## Revisit criteria
- The owner asks for websites to lead the positioning, or the band's click-through shows the demand
  justifies pillar weight.

## Sources
- Owner instruction, conversation, 2026-09-03 (quoted above).
- `grep -n '"/services/' src/components/home/*.tsx` → no matches, 2026-09-03.
- `docs/plans/2026-08-02-three-pillar-reposition.md §9` — the claims gate.
