# ADR-0024: HG Oil Holdings is described as a client
Status: Accepted — 2026-11-04 (owner, in the session that shipped the showcase revamp) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- `docs/CANONICAL-PROJECTS.md:20-21` (last updated 2026-05-22) said the HG Oil Holdings builds were "internal builds, not
  external client engagements", because Tyler was VP of Operations there. Two public answers followed it
  (`src/data/locations/western-kansas-web-design.ts:76,81`, "internal builds at HG Oil Holdings").
- The showcase revamp (ADR-0022) left the relationship wording open because ps-admin bills HG Oil as a client while the
  writer rule said internal; the question was put to the owner.
- Owner, 2026-11-04: "hg is a client".

## Decision
1. Site copy describes HG Oil Holdings as a client and its work as client builds.
2. Not allowed: "internal build", "internal project" or employer framing for the HG work.
3. Tyler's past role there (VP of Operations) may still be stated as biography (`src/data/aeo/industries/oil-gas.ts:131`).

## Consequences
- Writers and review agents follow `docs/CANONICAL-PROJECTS.md`, now updated to match.
- Code comments that record the history of a build ("built while Tyler was VP of Operations") are not copy and stay.

## Open / not yet decided
- Whether HG vendor or well counts may be published (still open; ADR-0022 ships without them).

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner describes the HG relationship differently.

## Sources
- Owner message 2026-11-04 ("hg is a client"), session 27aef2f4.
- `~/.claude/agent-reports/ps-showcase-revamp-2026-11-03/impact-facts.md` §6 item 7 (the open question).
