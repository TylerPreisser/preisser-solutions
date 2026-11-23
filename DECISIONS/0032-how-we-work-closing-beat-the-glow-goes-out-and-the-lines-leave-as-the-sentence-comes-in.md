# ADR-0032: On the last beat of "How We Work", the glow has gone out before the closing sentence comes in, and the three lines leave as it does, so the sentence has the stage to itself
Status: Accepted — 2026-11-23 (conversation; the owner, from his iPhone) — Owner: Tyler Preisser
Supersedes / Superseded by: —. Refines the last beat of ADR-0026 (the closing sentence), which is not edited. ADR-0027 and ADR-0031 are unchanged and still apply.

## Context
- ADR-0026 built the relationship sentence as a fourth and last beat, and left its place open ("If he wants it gone or elsewhere, that is a one-line change"). On that beat the light behind the third line only dimmed by 45% (`light: on * (1 - 0.45 * closing)` in `src/components/home/how-we-work-motion.ts`, `frame`, on main at e9278c8), the third line stayed lit blue, the first two lines came back to full strength, and the sentence faded into the explanation slot under all three.
- The owner looked at it on his iPhone on 2026-11-23, after the entrance of ADR-0031 went live, and said:
  > "By the time it animates to the 4th thing that comes in the glow should have animated out and the 3 right aligned phrases maybe have animated out as the last sentence or whatever calling it comes in"
- His standing bar for the section, 2026-11-21, still binding:
  > "it has to stay flawless but it also needs to bet the smoothest possible scroll reactive"
- He said "maybe" about the lines leaving. The lead on the work decided yes, and asked that the sentence then take the place the lines leave rather than sit low under an empty block.
- Measured on the build before this decision (page chunk `page-0ff8081b40172ee1.js`): at 393 by 659, 402 by 874, 820 by 1180 and 1440 by 900 the light was still at about 0.68 on the first frame the sentence showed, and a reader who stopped anywhere in the hand-over came to rest with the light at 0.55 and the three lines in place (`tests/how-we-work.probe.mjs`, the two "closing" checks per size, red on that build).

## Decision
1. **The glow is out before the sentence shows.** As the third explanation leaves, the band of light carries on down through the third line and off it, the way it has left the first two, and the light behind it fades to nothing. It is scrubbed by the scroll over 0.27 of a beat (`EXIT_FROM` to `EXIT_FROM + GLOW_LEN`). It reaches exactly 0 before `EXIT_TO`, the position at which the sentence first shows. From there to the end of the track no line is lit, no blue band is over a line and the light is at 0.
2. **The three lines leave as the sentence comes in.** This is the entrance of ADR-0031 run the other way. Each line lifts away upward by the same distance it rose (eight tenths of its type size, 18 to 34px) while it fades to nothing. The first line leads and each of the others follows 0.04 of a beat behind. Each takes 0.27 of a beat (`leave()`, `EXIT_STAGGER`, `EXIT_LEN`). Only transform and opacity change, on the line element. They are all gone at `EXIT_TO`, and the sentence comes in from there.
3. **The sentence takes the stage.** It is set flush right, like the lines it replaces. Once they have gone it rests at the optical centre of the held block: centred 4% of the block's height above the block's middle, never higher than where the first line started (the label keeps the gap it had above the lines), and never lower than its own place in the slot. It is moved there by a transform, measured from the layout (`closingLift` in `how-we-work.tsx`). No layout shifts. It never shares the screen with a line or with any glow. Its words, and the no-break span in them, are unchanged.
4. **Everything already settled still holds.** The picture is one pure function of scroll position. No two texts are on screen together. The whole hand-over lies between the end of the third beat's rest and the start of the last beat's, so a reader who stops part way has it finished onward (ADR-0027), and no line, light or sentence is ever left part way. Going back up runs it exactly backwards: the sentence leaves, the lines come back (the third first), and the third line lights again with its explanation. Space and PageDown step to the new last-beat picture. Positions are still measured against the held block's height (ADR-0031 point 8). The block lets go after the last beat as before, and the label "How We Work" stays.
5. **Reduced motion, no JavaScript and the stacked layouts:** no exit is applied. With reduced motion the three lines stay on the last beat, unlit and at full strength, and the sentence stays in its own place under them. Laid out flat, the sentence is where it always was, on the left under the explanations.
6. **Not allowed:** a glow, a lit line or the blue band anywhere on screen while the sentence shows; a line showing once the sentence is in; the sentence overlapping a line that is still visible; an exit that runs on its own rather than with the scroll, or past the start of the last beat's rest; any layout property in the exit or in the sentence's move; loosening a bound in `tests/how-we-work-motion.probe.mjs` (ADR-0026 point 8) to make any of this pass.

## Consequences
- `frame(u)` returns `leave` (one entry per line). The light's run (`lamp`) now ends one line below the last line, where before it ended on the last line. Its `ink` comes back to full only once the lines have gone, which only a reduced-motion reader sees.
- Checks that described the old last beat (the third line lit, the first two lines back at full, the band always one line's worth) now describe this one. That is a change of picture the owner asked for, not a loosening.
- Review agents must not flag: the three lines being absent on the last beat; the sentence being right-aligned or sitting higher than the explanation slot on the track; the light sliding down off the third line as it fades; the lines staying put on the last beat under reduced motion.
- Cost accepted: on the last beat the hero's own look (two plain lines beside a blue third) is no longer shown. The sentence is the only thing on the block under the label.

## Open / not yet decided
- The sentence's wording, and whether it stays at all. Not touched here (ADR-0026, ADR-0025 point 4).
- Anything about beats 1 to 3: the light, the explanations, the quiet tone of the lines that are not current. Not touched here.
- The sentence's type size on the track. It is unchanged (18px on a phone, 30px on a desktop). A larger size would enlarge the slot, which sets the height of the whole block, and could push a laptop window (1366 by 625) into the stacked layout.
- How this looks in real Safari on an iPhone. It was not run: the Mac was offline on 2026-11-23. Every "WebKit" result is Playwright WebKit, which is not Safari.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. While `Proposed`,
it is not yet binding. Disagreement with a settled decision is resolved by a NEW superseding ADR,
never by editing this one.

## Revisit criteria
- The owner asks for something different on the last beat (the lines back, a different place for the sentence, different words), or a real-Safari run shows the hand-over stepping, overlapping, or resting part way.

## Sources
- The owner's message, 2026-11-23 (quoted above).
- ADR-0026, ADR-0027, ADR-0031.
- `tests/how-we-work-motion.probe.mjs`: the four "the closing beat" checks and "those four rules can fail".
- `tests/how-we-work.probe.mjs`: the two "closing" checks at 393 by 659, 402 by 874, 820 by 1180 and 1440 by 900, "reduced motion: on the last beat", and the stacked and no-JavaScript checks.
- Red and green runs, filmstrips and per-frame recordings in `~/.claude/agent-reports/ps-site-1122/hww-closing/`.
