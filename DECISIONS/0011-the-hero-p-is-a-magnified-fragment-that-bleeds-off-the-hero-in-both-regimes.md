# ADR-0011: The hero "P" is a magnified fragment of the letterform — bleeding off the top and right, leg and bottom-left terminal in frame — in BOTH viewport regimes
Status: Accepted — 2026-09-06 (owner instruction, mid-run, recorded verbatim in `CROP-ANCHOR.md`) — Owner: Tyler Preisser
Supersedes / Superseded by: supersedes the desktop half of `60c08fb` and the phone constants of `f2f5cc7`/`60c08fb` (§35/§37/§38 in `src/components/home/hero-mark-light.ts`). Not superseded.

## Context

- Before this decision the hero mark was two unrelated compositions. Phones ran a mark-derived
  stage (`hero-mark-light.ts` §33-P) at `NARROW_MARK_H = 0.95`, i.e. ink height 0.95x the hero.
  Desktop ran a **contain-fit** against a frame-inset rect (`contained`, §37), so the glyph
  mathematically could not exceed the hero at any constant value.
- Measured on `5aa93bc` by pixel analysis (`ctx.getImageData`, alpha > 8 — **not**
  `getBoundingClientRect`, which returns the canvas box and lies):
  - **390x844**: the visible mark-x window was 435..819, which is the BOWL. The leg occupies
    mark-x 85..451, so **the leg was not cropped, it was absent**. The bottom-left terminal sat
    355px off-frame to the LEFT. The bottom quarter of the hero contained **zero** mark pixels.
  - **1440x900**: a whole, complete, legible, uncropped 410x362 P at 4.5% canvas coverage,
    vertically centred in the right 28% of the hero — "a letter shrunk to fit" in its purest form.
  - **768x1024, 820x1180, 1024x768**: the guard/shrink/`dropped` loop fired and relocated a whole
    small P to a band BELOW the headline. **1280x800**: shrunk seven times (`0.96^7`) to 2.2%
    coverage, the smallest mark in the matrix.
- Two earlier ceilings in the file argued against exactly this composition, both on the premise
  that the mark must keep reading as a whole letter: `NARROW_OVERHANG` capped at ~0.20
  (`:314-319`, `:338-341`) and the scale ceiling at `:247-262` (§30-B's two "smudge" rejections).
- §37 recorded the then-current instruction at `:554-556`: *"DO NOT re-point the wide branch at
  these to 'restore' desktop size. The client's instruction was the opposite direction. If desktop
  is ever asked to bleed again, write a §38 and say who asked."* **This ADR is that write-up, and
  the answer to "who asked" is below.**

**What the owner actually said**, 2026-09-06 19:42, verbatim, before any file was edited:

> the leg and more bottom left of the P is what should be shoing in hero tbh

and, on the composition not being a whole letter (`CROP-ANCHOR.md`):

> **Not a whole letter.** A complete, legible "P" sitting inside the hero fails this. The viewer
> sees a magnified fragment of a letterform.

This instruction is LATER than, and directly contrary to, the instruction quoted in-file at
`:299-300` ("JUST NEEDED SHIFTED DOWN A BIT") which `60c08fb` implemented as a down-shift.

## Decision

1. **The hero mark is a magnified fragment in both regimes.** The bowl exits the TOP edge, the
   glyph bleeds off the RIGHT, and the leg and its bottom-left terminal are the subject in frame.
   A render in which the top bar and the closed bowl are both fully visible inside the hero FAILS,
   whatever the numbers say.
2. **The composition is defined by three fractions of the hero's live box**, not by stage insets:
   - `hF` — ink height as a multiple of hero height: **2.05 portrait, 2.20 landscape**
   - `jF` — where the bowl/stem junction sits as a fraction of H: **0.00 portrait, -0.05 landscape**
   - `fTx` — where the bottom-left terminal sits as a fraction of W: **0.150** on phones, ramping
     to 0.220 at 768 portrait; **0.340 at 1024 to 0.380 at 1920** landscape.
   `hF > 1` is deliberate: with the junction at the top edge,
   `terminal_y/H = jF + (905-569)*hF/790`, so a terminal near the bottom of the frame *forces*
   `hF ~ 2.05`. There is no `hF <= 1` that satisfies the crop at all.
3. **The split is ORIENTATION (`H > W`), not the 768px code branch.** 768x1024 and 820x1180 are
   portrait heroes running through the wide code path and take the portrait numbers.
4. **The two "must still read as a P" ceilings are REVOKED** — `NARROW_OVERHANG`'s ~0.20 cap and
   the §30-B scale cap. They were taste constraints predicated on a premise the owner has
   inverted.
5. **NOT allowed, because each silently reverts this decision:**
   - Re-pointing `primary` at the `contained` rect, or otherwise handing `fitInto()` a
     frame-inset stage — that reinstates the contain-fit and the whole-letter render.
   - Re-arming the ink guard on wide (`guard = narrow ? [] : rects`). The target REQUIRES the
     mark to overlap the headline; an armed guard shrinks it 12x and relocates it below the type.
   - Narrowing, deleting or accent-scoping the `platePush` keep-out (see Consequences).
   - Editing the `void`ed `WIDE_*` or `NARROW_*` constants expecting a visual change. Nothing
     reads them; they are the decision record only.
6. **Exception:** none. A change of composition needs a new superseding ADR naming who asked.

## Consequences

- **The keep-out is WCAG-load-bearing and STAYS** at `KEEPOUT_MARGIN = 14` and
  `feather = max(0.14*W, 76)`, over EVERY headline line. Light-theme "AI Integration." measures
  **3.07:1 with ZERO plate alpha over its ink** — 0.02 above the 3:1 large-text floor. Any plate
  alpha over that line fails WCAG. Legibility is bought by the keep-out and the crop, **never by
  shrinking the P**. Do not try to buy contrast back by lowering alpha: the compositing proof in
  the file (`R = 246 - 142a`, still 2.98:1 at `a = 0.03`) shows that cannot work.
- Because every target quantity is a fraction of `H`, the resize handler now watches **height as
  well as width**. Under the old width-only guard a height-only change (iOS toolbar, window
  dragged shorter) left the mark at a stale scale — reproduced: 393x852 -> 393x659 kept
  `sCss 2.2109` and a stale hero height of 852 where 1.7101 was correct.
- Canvas coverage *falls* relative to a bowl-filled frame even as the composition gets bolder
  (the bowl is a solid slab, the leg is a taper). **Coverage alone is not the size test.**
- Performance is not a constraint here: the canvas is excluded from LCP candidacy (R9); the LCP
  element is the 40x40 header logo. Do not hedge the crop to protect a metric that cannot move.
- **Review agents must NOT flag as defects:** the glyph exceeding the hero's bounds; the bowl
  being cut off at the top; the mark overlapping the headline's column; the absence of a desktop
  ink guard; the `void`ed constant blocks.

## Open / not yet decided

- **Gate B2 of the target spec ("painted ink present in column x = W-1") is NOT satisfiable on
  landscape at the specified `fTx`, and this ADR does not resolve the conflict.** The leg's
  rightmost ink is mark-x 451 while the frame's right edge falls at mark-x ~453 at 1440x900;
  reaching the last column needs `fTx >= 0.393`, which is outside Gate A3's `0.360 +/- 0.02`.
  A1's own designated-passing reference render fails it identically (`painted.r = 1391.3` in a
  1440 hero). Portrait bleeds right correctly at every width. Which of the two criteria bends is
  the owner's call, not the implementer's.
- Whether the light theme's mark alpha should rise now that the glyph reads as a fragment. Not
  touched here; §35's alphas are unchanged.

## Status note for review agents

While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria

- The owner asks for the whole letterform back, or for a different region of the glyph in frame.
- A measured WCAG regression on any headline line (C1 plate alpha != 0, or the accent line
  below 3.05:1).
- The headline copy or type scale changes enough to move `headlineInk()`, which moves the
  keep-out and could expose part of the mark that is currently erased.

## Sources

- `CROP-ANCHOR.md` — owner instruction 2026-09-06 19:42, verbatim, plus orchestrator decisions D1-D4.
- `A2-target-spec.md` — binding numeric acceptance criterion (Gates A/B/C/D) and the per-viewport table.
- `R3-hero-trace/R3-trace.md` — knob-by-knob control chain; identifies the contain-fit, the guard
  loop, the inverted `NARROW_MARK_TOP` sign and the five dead `WIDE_*` constants.
- `src/components/home/hero-mark-light.ts` §39 — the in-file ADR block this file mirrors.
- Commit `60c08fb` (desktop restored to contain-fit; phone pushed down) — the decision superseded here.
