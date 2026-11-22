# ADR-0026: "How We Work" is told by scrolling: the three lines alone, then each lights up in turn with its explanation
Status: Accepted — 2026-11-21 (conversation, owner quoted directly) — Owner: Tyler Preisser
Supersedes / Superseded by: Supersedes ADR-0025

## Context
- ADR-0025 put a "How We Work" section directly below the hero: the hero's three-line wordmark on the opposite side, the owner's copy verbatim, each line explaining itself on hover or tap, the relationship sentence showing at rest, and no visual change to the lines ("make ti just hover and not change the color and stuff"). That shipped to production on 2026-11-21 (commit c08b69f).
- The owner looked at it live the same evening and changed the interaction:
  > "Make it jusy the three with no description then scroll reactive that shows description for the 1st then the 2nd then the 3rd. Each should glow as u go."
- That reverses two points of ADR-0025: the explanations are no longer reached by hover or tap, and the lines now DO change (the current one glows). The position, the type and every word of the copy are unchanged.

## Decision
1. **The section `#how-we-work` stays the first section after the hero**, before Services, with the hero's type on the opposite side (ADR-0025 points 1, 2 and 6 carry over unchanged).
2. **It arrives as the three lines and nothing else.** No sentence, no explanation and no hint under them, and no line lit.
3. **Scrolling tells it.** The block holds still on screen while the page scrolls. The first line lights up and its explanation appears; then the second; then the third. One explanation shows at a time. Scrolling back up runs it backwards. Nothing takes over the scroll: it is the page's own scrolling.
4. **The current line glows**: the primary blue with a glow, as the hero's accent line has. While a line is current the other two step back to a quieter tone.
5. **The copy ships verbatim**, exactly as in ADR-0025 point 4: the three lines, the three explanations, the relationship sentence and the label "How We Work".
6. **Explicitly NOT allowed, by any agent:** rewording, tightening or reordering any of that copy; putting the hover or tap interaction back; showing text under the lines before the reader scrolls; fixing a fit problem by cutting a word. ADR-0009 is the governing precedent. If the copy does not fit a screen, the type size or the layout gives way, never the words.

## Consequences
- Implementers: `src/components/home/how-we-work.tsx` (reads the scroll position, sets `data-step`), `src/styles/how-we-work.css` (the tall track, the pinned block, every look), `tests/how-we-work.probe.mjs`.
- The home page is about two screens longer to scroll, on purpose: each of the four beats takes half a screen.
- With no JavaScript, and on a screen too short to hold the lines and the longest explanation at once (a phone on its side), there is no track: the explanations are set out one under another. This is the fallback, not a second design.
- Review agents must not flag: the lines changing colour as the page scrolls; the two quieter lines; the extra scroll length; the absence of any hover, tap or keyboard control on the lines (there is nothing to operate; scrolling is the control, and every explanation is in the accessibility tree); the specification claims in explanation 2 (owner-approved, ADR-0025).

## Open / not yet decided
- **Where the relationship sentence goes.** The owner said "just the three with no description" and named three explanations; he did not say what happens to "We believe in building long-term relationships with all of our clients, because we want your success to be our success." It was built as a fourth and last beat, after the third explanation, with the first two lines back at full strength beside the blue third (the hero's own look). He was told on 2026-11-21. If he wants it gone or elsewhere, that is a one-line change and a new ADR is not needed for it.
- How quiet the two non-current lines should be, and how much scrolling each beat takes (half a screen). Both were chosen by the builder; neither was specified.
- The two items ADR-0025 left open still stand: whether the Why Us section stays, and that the claims in explanation 2 were not checked against every client build.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement with
a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner supplies different words, rules on the relationship sentence, or changes the interaction again.

## Sources
- Owner instruction, conversation, 2026-11-21, quoted verbatim in Context.
- `DECISIONS/0025-...md` (the section, its type and its copy), `DECISIONS/0009-...md` (owner copy ships verbatim).
