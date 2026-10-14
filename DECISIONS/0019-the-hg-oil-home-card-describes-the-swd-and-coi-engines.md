# ADR-0019: The HG Oil home card describes the SWD engine and the COI engine
Status: Accepted — 2026-10-13 (conversation, owner quoted directly) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- PR #19 (`fcc9ef0`, live as Pages `808103a4` on 2026-10-13) added an "HG Oil Holdings" card to the home
  Real Projects carousel. Its copy was limited to the two HG Oil projects then cleared in
  `docs/CANONICAL-PROJECTS.md` (inventory system, AI invoice processing), and its code comment said the
  saltwater disposal (SWD) and certificate-of-insurance (COI) engines were "not cleared for public copy".
- The owner reviewed it the same day and said:
  > "The hg oil one should be the coo engine and SWD engine"
  ("coo" is the COI engine; the owner's dictation.)

## Decision
1. The HG Oil Holdings card on the home carousel describes the **SWD engine** (monthly disposal volumes into
   the A/P import, GL journal and owner statements from one calculation) and the **COI engine** (AI reads each
   vendor's insurance certificate, watches expirations, chases renewals).
2. Both engines are cleared for public copy and are listed in `docs/CANONICAL-PROJECTS.md`.
3. Not allowed: an outcome number on this card that no source measures, or naming HG Oil's people, vendors,
   wells or amounts.

## Consequences
- The card's earlier inventory/invoice copy (and its 95% line) is gone from the home page. The
  `/case-studies/hg-oil-*` pages are unchanged.
- Review agents must not flag the SWD/COI copy as "not cleared".

## Open / not yet decided
- Whether the inventory and invoice case-study pages stay in the public set.
- An outcome figure for either engine, once one is measured.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement with
a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner names different HG Oil work for the card.

## Sources
- Owner, conversation, 2026-10-13 (quoted above).
- `~/Desktop/Preisser Solutions/HG Oil/hg-swd/README.md` (74 disposal agreements; one calculation feeds A/P,
  GL and statements).
- Memory `ps-admin-hg-oil-coi-engine-build-2026-10-05`, `coi-name-match-live-2026-10-10`.
