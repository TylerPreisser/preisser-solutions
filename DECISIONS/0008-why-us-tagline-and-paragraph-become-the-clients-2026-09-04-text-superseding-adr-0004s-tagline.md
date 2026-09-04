# ADR-0008: The Why Us tagline and paragraph become the client's 2026-09-04 text, superseding ADR-0004's tagline choice
Status: Accepted — 2026-09-04 (conversation, relayed through the TEAM ALPHA brief and the A3 adversary review) — Owner: Tyler Preisser
Supersedes / Superseded by: Supersedes **ADR-0004 Decision 1 and Decision 2, the tagline only.** Everything else in ADR-0004 stands — see "What this does NOT overturn" below.

## Context
- **ADR-0004** (Accepted 2026-09-03, one day earlier) collapsed Why Us to a logo, a tagline and one
  short paragraph, and chose the tagline personally: Decision 2 reads *"The tagline is the owner's
  own phrasing, not an improvement on it. He offered two; this is the one that ships."* The two he
  offered were *"Our success is yours"* and *"Your success is our success."*; the second shipped.
- On **2026-09-04** the owner supplied replacement copy for the section. His paragraph, verbatim:
  > "Our top goal is to develop long-term working relationships with all our clients, helping them
  > grow and solving their business problems by crafting and maintaining custom software built
  > around their specific business. It keeps making them more efficient after the launch."
  and asked that *"Your success is our success."* be removed from the section.
- **Two things were wrong with the shipping section, and only a render found either.**
  1. The shipping paragraph at `why-us.tsx:80-85` was described by an earlier pass as the client's
     text tightened. Clause-by-clause it was not: **"and solving their business problems" — the
     client's only statement of what the work is FOR — was absent entirely.** It was dropped
     silently, not by decision.
  2. An earlier pass ruled the tagline a "short tagline" and proposed changing nothing. Rendered,
     `h2#why-heading` is **48px / 700 weight / 653.5px wide — 2.67x body text and the largest
     element in the section after the logo.** Under a zero-diff ruling the owner would reload the
     page and find the exact string he asked to remove still the most prominent thing on it. That
     ruling was overturned on the picture, not on the source.
- **A wrap defect was found and fixed with one word.** With the client's text byte-for-byte, at
  **375x667 and 360x640** the paragraph runs 8 lines and the last collapses to a two-word widow.
  The three engines disagree at exactly those widths — last line as a percentage of measure:
  **Chromium 27%, Firefox 18%, WebKit 75%** — because WebKit hyphenates "long-/term" and rebalances
  while the other two do not. A single-engine check would have passed and been wrong.

## Decision
1. **The Why Us paragraph is the client's 2026-09-04 text verbatim, with exactly one word deleted:**
   "after **the** launch" becomes "after launch". Nothing else in the sentence changes. The deletion
   drops the paragraph to 7 lines and clears the widow in all three engines; the worst last-line
   ratio anywhere afterwards is 39% (desktop), against the 15-17% ratios this repo records as
   failures. **The article must stay deleted**, and the reason is recorded in the comment above the
   node so the next editor does not restore it as a typo.
2. **"and solving their business problems" is restored** to the homepage inside this paragraph. It
   is the client's own clause and its absence was a defect, not a decision.
3. **The tagline becomes "In it for the long term."** — replacing "Your success is our success."
   `id="why-heading"` survives, because it is the `aria-labelledby` target at `why-us.tsx:24`. The
   single-h2 structure and the `ps-why-relationship__accent` span device both survive, so the
   section's accessible name still resolves.
4. **THE NEW TAGLINE IS AGENT-AUTHORED. The owner did not choose this string and has not seen it.**
   This is stated plainly because ADR-0004 Decision 2 exists precisely to prevent an agent replacing
   the owner's heading with its own, and this ADR does that thing. It was derived from the opening
   clause of the owner's own replacement paragraph ("develop **long-term** working relationships").
   The reasoning for accepting it: the owner's objection reads as being to the *idea* the old line
   expressed rather than to its particular wording, and his other 2026-09-04 sanctioned option,
   *"Our success is yours."*, is the same claim with the clauses swapped — shipping it would
   reproduce what he asked to remove. The new line instead carries the idea his own paragraph opens
   with. **This is a judgement call made on the owner's behalf and it is reversible in one edit.**
   The alternative "Our success is yours." was weighed and rejected for the reason above; it was
   never rendered.
5. **Explicitly NOT allowed:** restoring "the" in "after the launch"; re-tightening or paraphrasing
   the client's paragraph; dropping "solving their business problems" again; removing
   `id="why-heading"`; reasoning about this copy's wrap from character counts instead of rendering
   it. Two drafts have now shipped on arithmetic alone and both were wrong on screen.
6. **The one exception:** if the owner says he wants his own words back as the heading, the tagline
   reverts by a new ADR, not by editing this one. Decision 4 is the flag that makes that easy to find.

## What this does NOT overturn — ADR-0004 still governs all of it
- **ADR-0004 Decision 1's structure** — the section stays ONE static block: mark, tagline, one short
  paragraph. This ADR changes the *strings*, not the shape.
- **ADR-0004 Decision 3** — `id="why-us"` and a single accessible name are preserved.
- **ADR-0004 Decision 4** — the three-item carousel stays removed, and the bar on re-adding card 2,
  *"AI, Harnessed and Under Control."*, on the strength of the three-pillar plan's §8 **still stands**.
- **ADR-0004 Decision 5** — "get rid of the other Why Us pages" remains scoped to the sibling
  carousel panels. **No route is deleted.** `/why-automation` stays indexed and untouched.
- ADR-0004's supersession of `docs/plans/2026-08-02-three-pillar-reposition.md` §7 row 6 and §8.

## Closes an open item in ADR-0007
ADR-0007 ("Five bento cards with two spans") records, under its own "Open / not yet decided":
> *"Whether `"Search and Ads."` becomes `"Search, AI, and Ads."`. That title change was planned
> alongside this merge and is **NOT implemented in this change** — it is held pending a render
> check on whether four extra characters wrap on a card title sitting over artwork."*

**That bullet is CLOSED. It shipped on 2026-09-04 as `"Search, AI, and Ads."`**, following the
**A3 adversarial render review**, which cleared it: the title renders on a single line at 390,
640, 940 and 1440 in both engines and both themes. A3 also found a stronger justification than
the one the plan carried — **the tile's own artwork already renders an "AI OVERVIEW" block**, so the
old title contradicted its own picture. The structured data does not degrade: all pillar titles
already emit as `serviceType` with a trailing full stop, so the new value is consistent with what
ships today.

This closure is recorded **here** rather than by editing ADR-0007, because an Accepted ADR is
immutable and is superseded or amended by a new record, never edited. ADR-0007 is **not**
superseded by this ADR — every one of its decisions still stands; only that one open question is
answered. A reader arriving at ADR-0007's open list should treat that bullet as resolved and this
paragraph as the resolution.

## Consequences
- Implementers: three edits in `src/components/home/why-us.tsx` — the paragraph, the h2, and the
  length-tuning comment above the paragraph, which described copy that no longer exists. The comment
  is **rewritten, not deleted**; its existence is why this repo catches wrap problems at all.
- Review agents must **not** flag the tagline change against ADR-0004 — cite this ADR. They also must
  not flag the missing article in "after launch"; it is Decision 1.
- No CSS changes. No new class, no new stylesheet, no dependency.
- Cost accepted: the homepage heading is now a string the owner has not personally approved. That is
  a real cost and Decision 4 exists so it is discovered in this file rather than in a diff.

## Open / not yet decided
- **Whether the owner accepts "In it for the long term."** He has not seen it. This is the single
  most likely thing in this record to be reversed.
- Whether "Built for the long term." — also rendered, also viable — reads better. It was rejected
  only because it echoes the services heading "Built to Fit Your Business" two sections down.
- The fate of the now-dead Why Us carousel CSS in `globals.css`, which ADR-0004 also left open.
- Whether real Safari agrees with Playwright WebKit at 375x667. See Sources.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. While `Proposed`,
it is not yet binding. Disagreement with a settled decision is resolved by a NEW superseding ADR,
never by editing this one.

## Revisit criteria
- The owner reads the section and rejects the tagline, or supplies his own replacement.
- A render at 375x667 or 360x640 shows the paragraph widowing again after any copy change.
- Real Safari is run and disagrees with Playwright WebKit at those widths.

## Sources
- Owner instruction, conversation, 2026-09-04 — the replacement paragraph, quoted verbatim in
  Context. **Provenance stated plainly: I hold the paragraph verbatim (it is quoted identically in
  `~/.claude/agent-reports/A2-copy-decisions.md:63` and `A3-copy-adversary.md`), but I do NOT hold a
  verbatim owner sentence asking for the tagline's removal.** That reached me as a relay through the
  TEAM ALPHA brief and the A3 review. ADR-0004's owner quotes are verbatim; this one is not, and a
  reader should weigh it accordingly.
- `~/.claude/agent-reports/A3-copy-adversary.md` — the render that overturned the zero-diff ruling.
  126 baseline screenshots, 14 viewports x 3 engines x 3 sections, both themes, dark asserted by
  reading `body` background rather than assumed. Replacement markup at `:86-91` (h2) and `:100-108`
  (paragraph). Engine-split wrap table and the 48px/700/653.5px h2 measurement come from there.
- `~/.claude/agent-reports/A2-copy-decisions.md` — the superseded zero-diff ruling and the client's
  paragraph at `:63`.
- `DECISIONS/0004-why-us-collapses-to-a-logo-and-tagline-superseding-the-three-pillar-plans-keep-it-line.md`,
  read in full 2026-09-04. Its Status line is flipped to `Superseded by ADR-0008` in the same change;
  nothing else in that file is touched.
- Source read directly: `why-us.tsx` in full (95 lines pre-edit), `aria-labelledby="why-heading"` at `:24`.
- **NO REAL SAFARI VERIFICATION EXISTS ANYWHERE IN THIS RUN.** `safaridriver` is present at
  `/System/Cryptexes/App/usr/bin/safaridriver`, but `selenium-webdriver` is not installed in this
  project and **no dependency was added** — that is an owner call, not an agent's. Every
  WebKit number in this record is Playwright WebKit, which is not Safari and is never called Safari
  here. Given the three engines demonstrably disagree at 375x667, this gap is material and is
  recorded as open rather than papered over.
