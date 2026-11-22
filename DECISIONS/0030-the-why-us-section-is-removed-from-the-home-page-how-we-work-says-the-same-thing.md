# ADR-0030: The Why Us section is removed from the home page; How We Work says the same thing
Status: Accepted — 2026-11-22 (owner, conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: Supersedes the PLACEMENT of the Why Us section decided in ADR-0004, ADR-0008 and ADR-0009 (only where the section sits; their rule that the owner's own copy ships verbatim stays in force everywhere else)

## Context
- The home page carried a "Why Us" section (`#why-us`, `src/components/home/why-us.tsx`) with the owner's tagline "Your success is our success." and his relationship paragraph (ADR-0004, ADR-0008, ADR-0009).
- ADR-0025 and ADR-0026 put "How We Work" directly under the hero: get to know your business, build a custom solution, stand behind it, with the line that closes on "we want your success to be our success".
- Owner, 2026-11-22, verbatim: "Also the why is us redundant now". The lead's reading: he means the Why Us section is redundant now that How We Work says the same thing.
- ADR-0029 had just moved MarCommand out of the section between Services and Why Us, so Services ran straight into Why Us.

## Decision
1. The home page has no Why Us section: no `#why-us`, no `#why-heading`, no "Your success is our success." tagline there.
2. `why-us.tsx`, `why-us-relationship.css` and the `.ps-why` rules in `globals.css` are deleted; the section's code stays in git history.
3. Services now runs straight into the client work (`#case-studies`).
4. Not changed: ADR-0009's rule that the owner's supplied copy ships verbatim wherever it is used, and the company description text elsewhere that uses his phrases.

## Consequences
- Review agents must NOT flag the missing Why Us section, or re-add it.
- Cost accepted: the tagline and the "We start by listening..." paragraph no longer appear on the home page.
- The page after the change: last services card, then the client work heading, with the same white-space rhythm as the page's other section joins (probe A14).

## Open / not yet decided
- Whether the owner wants the tagline or the listening paragraph kept anywhere else.
- Whether "the why is us" meant anything other than this section (the lead's reading is this section).

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement with a
settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner asks for the tagline or paragraph back.

## Sources
- Owner message 2026-11-22 (quoted above); ADR-0004, ADR-0008, ADR-0009, ADR-0025, ADR-0026, ADR-0029
- `tests/marcommand-card.probe.mjs` (checks "no Why Us section" and A14)
