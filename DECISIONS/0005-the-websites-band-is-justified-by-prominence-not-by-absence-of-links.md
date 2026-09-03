# ADR-0005: The websites band is justified by prominence, not by an absence of links
Status: Accepted — 2026-09-03 (implementation review) — Owner: Tyler Preisser
Supersedes / Superseded by: Supersedes ADR-0003's Context claim that the homepage "links to no service page at all" and the "creates the homepage's first `/services/*` links" line in its Consequences. ADR-0003's actual decision — a secondary band, no fourth pillar, no H1 change — stands unchanged.

## Context
- ADR-0003 justified the websites/marketing band partly on this measurement:
  *"`grep -n '\"/services/' src/components/home/*.tsx` returns **zero hits**. The homepage links to
  no service page at all."*
- That grep was **scoped too narrowly**. It covered `src/components/home/*.tsx` and excluded
  `src/app/page.tsx`, which is itself part of the homepage. Verified 2026-09-03:
  `grep -c '"/services/' src/app/page.tsx` returns **4**, at `page.tsx:104-107` —
  `/services/ai-automation`, `/services/custom-websites`, `/services/local-seo`,
  `/services/ai-search-optimization`.
- So the homepage already links four service pages, and **`/services/custom-websites` is already
  among them** — the exact page the new band's premise said had no path in from the front door.
- Those four links live inside the collapsed `<details>` link cluster near the foot of the page
  (`page.tsx:161-255`), which is built for crawlers and AI engines rather than for a reader
  scanning the page.
- The implementing agent found and reported this rather than quietly building against a false
  premise.

## Decision
1. The band ships as designed. Its justification is corrected to: the capability is reachable but
   **not prominent** — four text links inside a collapsed `<details>` at the foot of the page is not
   a path a scanning visitor takes, and the owner reports customers actively asking for websites and
   marketing.
2. Nobody may cite ADR-0003's "zero hits" or "first `/services/*` links" wording as fact. This ADR
   is the accurate record.
3. Explicitly NOT allowed: removing the four existing `<details>` links to avoid the apparent
   duplication. They serve crawlers and AI-citation extraction, which is a different job from the
   band's. Duplication between a reader-facing band and a crawler-facing cluster is intended.
4. A grep that claims a homepage fact must include `src/app/page.tsx`, not only
   `src/components/home/`. That narrow scope is what produced the error.

## Consequences
- Implementers: the band now overlaps two of the four existing links (`custom-websites`,
  `local-seo`) and adds four more. That is fine and is not a defect.
- Review agents must NOT flag the overlap as redundancy, must NOT remove the `<details>` links, and
  must NOT treat ADR-0003's Context paragraph as authoritative.
- Cost accepted: a weaker justification than ADR-0003 claimed. The band is a prominence improvement,
  not the closing of an absolute gap. It remains reversible — one mount line in `page.tsx`.

## Open / not yet decided
- Whether the collapsed `<details>` link cluster is the right home for crawler-facing links at all,
  now that a reader-facing band exists. Not evaluated here.
- Whether the two overlapping links should be deduplicated in a later pass.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding.

## Revisit criteria
- The band is removed or promoted, or the `<details>` cluster is restructured.

## Sources
- `grep -c '"/services/' src/app/page.tsx` → 4, run 2026-09-03; hits at `page.tsx:104-107`.
- ADR-0003, Context and Consequences sections.
- Implementing agent's report, `~/.claude/agent-reports/websites-service-band.md`.
