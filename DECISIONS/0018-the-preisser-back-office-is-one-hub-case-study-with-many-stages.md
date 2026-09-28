# ADR-0018: The Preisser back office is one case study on the hub, with many Proof Stages
Status: Accepted — 2026-09-28 (conversation, by the owner's delegation "use your discernment") — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- The hub grid (`src/data/case-studies/index.ts`, `hubSlugs`) excludes internal tooling, proofs
  of concept and our own website builds by rule (`index.ts:114-128`), and the owner has
  objected to two adjacent same-client cards reading as duplicates (`index.ts:141-143`).
- The owner's own administration panel solves a list of business problems he wants shown as
  examples: "In so much of the work that I've done through my own administration panel, that
  should be a showcase item on there. What are some of the business case things that I've
  solved with my own admin panel that should be going up in the examples section?"
  (2026-09-28).
- Eight separate pages would each need a data file, a registry entry, a hand-written route, a
  related-card index entry, and sitemap and llms parity, and all eight would be off-grid by the
  hub's own rule.

## Decision
1. One case study, client display name "the Preisser Solutions back office", with `demo` as an
   array of Proof Stages (ADR-0016), added as each clears. First stage: deposit-to-invoice
   matching that refuses to guess. Later stages in order: the monthly invoice run with approve
   then send; meetings filing themselves onto the work board; every client tool listed live;
   the advisor over a year of books; the phase-plan journey; the four-lane work board.
2. This case study is added to `hubSlugs` explicitly, as the owner's own business. The
   "internal tooling stays off the grid" rule is otherwise unchanged.
3. A stage is split out to its own page only if it earns a hub slot on its own, by a new ADR.
4. NOT allowed: real client names, real amounts, real bank descriptors, routing or account
   digits, real meeting content, or the panel's real fixture files (which name real clients).

## Consequences
- One data file, one route, one related-card entry. The hub shows one back-office card.
- Review agents must NOT flag the internal-tool exception on the hub for this slug.

## Open / not yet decided
- Whether the saltwater-disposal close is told here or on the HG Oil case studies (leaning HG Oil).

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner asks for a separate page for one back-office problem.

## Sources
- Owner conversation 2026-09-28.
- `src/data/case-studies/index.ts:114-153`.
- `~/.claude/agent-reports/ps-showcase-initiative/critique-brief.md` objection 9 (outside this repository).
