# ADR-0027: When a reader stops between two lines of "How We Work", the picture settles onward in the direction they were scrolling, never back
Status: Accepted — 2026-11-22 (conversation; follows from the owner's bar quoted below and a design review finding) — Owner: Tyler Preisser
Supersedes / Superseded by: Replaces the last clause of point 5 of ADR-0026 ("settles on the nearest one"). The rest of ADR-0026 stands.

## Context
- ADR-0026 point 5 said that when the reader stops between two lines the picture "settles on the nearest one".
- The owner's bar for this section, 2026-11-21:
  > "it has to stay flawless but it also needs to bet the smoothest possible scroll reactive"
- A design review of commit 3e110b6 found that "nearest" breaks that bar for a reader turning a mouse wheel slowly. Each notch is followed by a pause long enough to count as a stop, so at every pause the picture went back to the line the reader was leaving, a half-faded explanation came back, and the next notch took it away again. Replayed in `tests/how-we-work-motion.probe.mjs`, the old rule brought an explanation back by up to 99% of its strength.
- The same review found Space and PageDown skipping the first explanation from the lower half of the hero, and skipping a beat when a header link had focus.

## Decision
1. A reader who stops between two resting stretches while scrolling down is shown the next line; scrolling up, the previous one. The picture never moves against the direction the reader was travelling (`rest(u, direction)` in `src/components/home/how-we-work-motion.ts`).
2. If the picture has settled ahead of the reader and they carry on the same way, it waits there for them. It does not come back to meet them.
3. A wobble of a few pixels the other way as the reader lets go (less than `TURN`) is not a change of direction.
4. "Nearest" is used only when no direction is known: a fresh load, a reload part way down, a resize.
5. Space, PageDown, Shift+Space and PageUp move one beat, counted from the beat that is showing. From above or below the section they never skip its first or last beat, and they never scroll further than the browser's own page would. They are left alone while the reader is typing, and Space is left alone on a control that Space operates.
6. Not allowed: a rule that can move the picture against the reader's scroll, and loosening the slow-wheel check to make one pass.

## Consequences
- The reader-watching logic (`watch`) lives in the pure motion module, so the test replays the same code the page runs.
- Review agents must not flag "settles onward rather than to the nearest line" as a defect, and must not recommend going back to nearest.
- Cost accepted: a reader who stops just after starting to leave a line is carried on to the next one, up to six tenths of a beat ahead of where they stopped.

## Open / not yet decided
- Whether a resize part way through should keep the beat rather than the scroll offset. Today it keeps the offset.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. While `Proposed`,
it is not yet binding. Disagreement with a settled decision is resolved by a NEW superseding ADR,
never by editing this one.

## Revisit criteria
- The owner asks for different behaviour when the reader stops, or a device is found on which settling onward reads as the page moving by itself.

## Sources
- ADR-0026
- `tests/how-we-work-motion.probe.mjs` (the slow-wheel replay and the check that it fails on the old rule)
- `tests/how-we-work.probe.mjs` (keys from the hero, keys with a link focused, a real slow wheel)
