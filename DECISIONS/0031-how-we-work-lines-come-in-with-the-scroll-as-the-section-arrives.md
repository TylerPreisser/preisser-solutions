# ADR-0031: As "How We Work" arrives from the hero, its three lines come in with the scroll, one after another, before anything lights
Status: Accepted — 2026-11-22 (conversation; the owner, from his iPhone) — Owner: Tyler Preisser
Supersedes / Superseded by: —. Adds to ADR-0026 and ADR-0027 and changes neither.

## Context
- The owner, 2026-11-22, from his iPhone:
  > "When I initially scroll down from hero the text there kinda jerks in at least initially let it animate in and etc scroll animation all that stuff"
- His standing bar for this section, 2026-11-21, still binding:
  > "it has to stay flawless but it also needs to bet the smoothest possible scroll reactive"
- What a frame-by-frame recording of the first scroll from the top of the page showed on the build before this decision (main at b96a0a2, page chunk `page-22b91e1ae8345738.js`): at every size and in Chromium, Firefox and WebKit, each of the three lines was at full strength the first frame it was on screen. The lines had no entrance; they arrived as plain text and, about a third of a screen later, two of them stepped back to half strength while the light and the first explanation came in, in about 6 frames on a flick and with the block still rising.
- The same recordings found a second, phone-only fault. The beat position was worked out from `window.innerHeight`, which a phone's browser changes by about 190px when its toolbar slides. One pixel of scroll with the toolbar sliding moved the picture about a tenth of a beat: a reader resting near the end of the first line was carried to the second, and one resting near its start was sent back above the section (`tests/how-we-work.probe.mjs`, the two "inner height" checks, both red on that build).

## Decision
1. **The three lines come in as the section arrives.** Each rises into place by a few tens of px (eight tenths of its type size, 18 to 34px) and comes up from transparent, the first line leading and each of the other two 0.07 of a beat behind, the way the hero's own lines rise on load. Each line takes 0.27 of a beat (about an eighth of a screen) of scrolling (`ENTER_FROM`, `ENTER_STAGGER`, `ENTER_LEN`, `rise()` in `src/components/home/how-we-work-motion.ts`).
2. **It starts only once all three lines are on screen** (`ENTER_FROM` = -0.56: the deepest third line of the sixteen layouts from 320 by 568 to 1920 by 1080, 0.501 of a screen down the held block at 1366 by 625, is then at most 0.96 of the way down the window). The first version started at -0.83. A reader who rested there had the entrance finished for them while a line was still below the window, and that line then scrolled in at full strength, the same cut-in this decision replaces (caught at 393 by 659, 820 by 1180 and 1280 by 800).
3. **It is scrubbed by the scroll, like the rest of the section.** It is part of `frame(u)`, the one pure function of scroll position, so it follows the reader's finger in and runs back out when they scroll back up. It is not a timed animation that plays by itself.
4. **It is finished, every line in place and fully visible, before the light starts down into the first line** (`ENTER_TO` = -0.15, 0.1 of a beat before `OFF_TO`). Between the two (0.1 of a beat) the three lines rest alone, unlit: ADR-0026 point 2. Nothing after `OFF_TO` changes.
5. **No line ever rests part way in.** A reader who stops part way through the entrance is treated exactly as one who stops between two lines (ADR-0027): the picture goes on in the direction they were scrolling (all in going down, all out going up), or to the nearer end when no direction is known.
6. **Transform and opacity only, on the line element.** No layout changes; the line's position in the layout is the same at every point of the entrance.
7. **Reduced motion, no JavaScript, and the stacked layout:** the lines are simply there, at full strength and in place.
8. **Every scroll position is measured against the held block's own height** (one small-viewport screen, `100svh`), never `window.innerHeight`. A phone's toolbar sliding does not move the picture.
9. **Not allowed:** a timed or one-shot entrance that plays on its own; an entrance that is still running when the light starts; any layout property in the entrance; loosening a bound in `tests/how-we-work-motion.probe.mjs` (ADR-0026 point 8) to make an entrance pass.

## Consequences
- `frame(u)` returns `rise` (one entry per line). `rest()` has two new resting stretches: "not yet in" (up to `ENTER_FROM`) and "in, nothing lit" (`ENTER_TO` to `OFF_TO`).
- Review agents must not flag the line entrance as "showing something before the reader scrolls" (ADR-0026 point 8): before the reader scrolls the lines are below the window, and nothing but the lines themselves moves.
- Review agents must not flag the picture finishing the entrance after a stop part way through it. That is ADR-0027's settle, applied to the entrance on purpose.
- Cost accepted: a reader who stops a little way into the entrance sees the rest of it finish without scrolling further, at the follower's usual pace (at most 0.41 of a beat, about a quarter of a second).

## Open / not yet decided
- How the entrance looks in real Safari on an iPhone. It was not run (the Mac was offline and the hosted-Mac runner was blocked on 2026-11-22). The toolbar was emulated in Playwright by changing only `window.innerHeight` and dispatching `resize`, which is what Safari changes.
- Whether the light coming down into the first line should take longer than about a quarter of a beat. It still finishes in about 6 frames on a flick. This decision leaves it as ADR-0026 set it.
- Whether the "How We Work" label should come in with the lines. It does not; it is simply there, so for about a fifth of a screen of scrolling it shows above the space where the lines are about to come in.
- Whether the first explanation should stay hidden until the block is held. Today it starts to show as the light comes in, while the block is still rising (ADR-0026); this decision does not change that.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. While `Proposed`,
it is not yet binding. Disagreement with a settled decision is resolved by a NEW superseding ADR,
never by editing this one.

## Revisit criteria
- The owner asks for a different entrance or for none, or a real-Safari run shows the entrance stepping, cutting in, or resting part way.

## Sources
- The owner's message, 2026-11-22 (quoted above).
- ADR-0026, ADR-0027.
- `tests/how-we-work-motion.probe.mjs`: "the lines come in with the scroll as the section arrives" and "the first scroll from the top of the page".
- `tests/how-we-work.probe.mjs`: the two "from the hero" checks, "a reader who stops part way through the lines' entrance", "reduced motion", and the two "inner height" checks.
- Per-frame recordings, old build and new, in `~/.claude/agent-reports/ps-site-1122/hww-entrance/` (rec-old/, rec-new/, REPORT.md).
