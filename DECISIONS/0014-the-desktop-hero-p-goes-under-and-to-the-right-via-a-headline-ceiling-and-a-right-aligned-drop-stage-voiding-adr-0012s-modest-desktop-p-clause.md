# ADR-0014: The DESKTOP hero "P" goes under-and-to-the-right by two changes, a hero-scoped headline ceiling and a right-aligned drop stage. Neither resizes the mark. This voids ADR-0012's "modest desktop P is intentional" clause. The beam is retimed and thickened; its path is unchanged.
Status: Accepted - 2026-09-07 (owner instruction, relayed verbatim mid-run, recorded at `~/.claude/agent-reports/bento-2026-09-07/ORCHESTRATOR-DECISIONS.md:2901-2903` as decision D73) - Owner: Tyler Preisser
Supersedes / Superseded by: **Supersedes ADR-0012 clause `0012:79-84` only** (the "Status note for review agents" sentence marking the modest desktop P intentional), **and ADR-0013's preservation of that clause at `0013:99-104`, `0013:126-128` and `0013:208-209`.** Every other clause of ADR-0012 and ADR-0013 remains in force. Not superseded.

## Context

### Why this file exists at all

`ADR-0012:79-84` reads, in the section that binds review agents:

> **In particular, the absent hero CTAs and the modest desktop P are both intentional.**

**ADR-0013, written the same morning, deliberately kept that clause alive.** Its clause 3
(`0013:99-104`) enumerates the desktop rulings that survive a phone-only change and names
`0012:79-84` among them; `0013:126-128` forbids "completing" the phone change on desktop on the
grounds that doing so "is reverting `0012:79-84`"; and `0013:208-209` instructs review agents not to
flag "the desktop P remaining modest and centred in the right column".

**The owner has now reversed that clause directly.** Without this record, the next agent finds a
same-day ADR endorsing the old desktop behaviour, plus a second same-day ADR that explicitly
re-affirms it, and reverts the change in good faith. **That exact failure has already happened once
on this project**, in the opposite direction: `CROP-ANCHOR.md` decision D3 was accepted by an agent,
shipped, rejected by the owner, and declared void at `0012:22`. Preventing the repeat is what
ADR-0013 was for, and it is what this file is for.

Unlike ADR-0013's request, this one **does** fall inside a stated revisit trigger.
`0013:244-247` lists "The owner comments on the hero P's SIZE at any viewport, in any direction" and
"The owner comments on the hero P's POSITION or CROP at any viewport: up, down, left, right". Both
fire here. The trigger authorises reopening the question; it does not authorise a quiet edit, so the
changes still get their own numbered record.

### What the owner actually said

Verbatim, 2026-09-07, at `ORCHESTRATOR-DECISIONS.md:2901-2903`:

> **"now on desktop if looks like crap its now under the text when it should be under and to teh
> right side of it and bigget on desktop with the blue beam of light tracing around the P"**

Three asks, as parsed at `ORCHESTRATOR-DECISIONS.md:2905-2906`: **move it right**, **make it
bigger**, **make the beam trace visibly**. This ADR settles all three, in two separate changes plus
the beam.

There is no breakpoint ambiguity to resolve this time. The owner said "on desktop" himself, which is
the qualifier whose absence produced void D3 and forced the scope question in ADR-0013.

### >> THE OWNER'S SENTENCE WAS HALF-SATISFIED BY CONSTRUCTION, AND THAT IS THE KEY TO IT

*"its now under the text when it should be under and to teh right side of it"* is not a request to
move the mark out from under the headline. **It says it should be under. What it should also be is to
the right.** At every landscape width below about 1148 the mark **was already under the headline** and
was merely **CENTRED** there, because the fallback stage handed `fitInto` a full-width rect and
`fitInto` centres: `ox: st.x + (st.w - MARK_W * sCss) / 2 - MARK_X0 * sCss` (`:1317`).

**So half the sentence was already true and the missing half was one stage rect.** That reading is
what produced Decision B, and it is why Decision B costs nothing: nothing is resized, the glyph moves.

### >> THE CORE MECHANISM: the binding constraint was never `SCRIM_CLEAR`

Everything before this run assumed the desktop lever was `SCRIM_CLEAR` (`hero-mark-light.ts:979`),
which reaches the composition through `const floor = Math.max(STAGE_PAD, W * SCRIM_CLEAR);`
(`:1338`) and then through the desktop stage
`const contained = { x: floor, y: STAGE_PAD, w: W - STAGE_PAD - floor, h: H - STAGE_PAD * 2 };`
(`:1470`). It is not, and the reason is arithmetic:

- **The hero headline is pinned at its `clamp()` ceiling for every `W >= 1173`.** The longest line,
  "Business Automation.", therefore measures a **constant 910.2px**, and `.ps-hero-content` is capped
  at `--container-max: 1200px` (`globals.css:120`, applied at `:1405`) with 24px inline padding. So
  `headlineRight = (W - 1200)/2 + 24 + 910.2 = W/2 + 334.2`. **It does not scale with the viewport.**
- **`floor = 0.70 * W` does scale.** The two cross at **W ~= 1670**, which is why the mark separates
  cleanly at 1680 and above and interleaves the headline's bounding box below it.
- **And the stage is one degree of freedom.** `contained` is `{x: floor, w: W - STAGE_PAD - floor}`
  contain-fitted by `fitInto`, whose scale is
  `const sCss = Math.min(st.w / MARK_W, st.h / MARK_H) * shrink;` (`:1314`) with
  `MARK_W = 895, MARK_H = 790` (`:178`). The width term binds at every desktop width. The right edge
  is pinned at `W - STAGE_PAD`. **Therefore `floor` sets the mark's LEFT EDGE and its WIDTH
  simultaneously, and they trade 1:1.** There is no live size constant on this path to escape with:
  `WIDE_MARK_W` and `WIDE_MARK_H` are retired at `:766` (`void WIDE_MARK_W; void WIDE_MARK_H;`).

>> **Therefore every value of `SCRIM_CLEAR` that clears the headline SHRINKS the mark. "Bigger" and
"further right" are mutually exclusive through that lever. The resolution is to move the
constant-width headline, not the width-derived mark.**

### >> AND ONE REGIME FURTHER ON, `SCRIM_CLEAR` COULD NOT HAVE FIXED IT AT ANY VALUE

Below about 1150 the same crossing produces a harder failure, and it is worth spelling out because it
closes off the lever completely rather than merely pricing it.

`layout()` tries `contained` through twelve `Math.pow(0.96, k)` shrink steps (`:1578-1579`) and falls
through to the `dropped` stage only if **all twelve still collide** with the headline's ink rects,
which the desktop guard supplies (`const guard: typeof rects = narrow ? [] : rects;`, `:1574`). At
these widths **`floor` sits INSIDE the headline's own column**: at 1120, `floor` is **784** against a
`headlineRight` of **876**. And because `fitInto` centres (`:1317`), shrinking only walks the glyph's
left edge right by `(stageW - MARK_W * sCss) / 2`.

**At 1120, even `k = 11` leaves the left edge at about 841, still short of 876.** All twelve steps
collide, and the loop falls through to `dropped`. >> **The escape is geometrically impossible, so no
value of `SCRIM_CLEAR` was ever going to fix this. Raising it moves `floor` further right, which
narrows the stage, which shrinks the glyph, which walks the left edge right more slowly.**

`SCRIM_CLEAR` is therefore recorded here as **the wrong lever, not the missing one.** It remains
untouched at 0.70.

### >> THE SCOPE CORRECTION, and the general lesson worth more than the fix

The below-the-headline defect was first scoped as "the 1099-1152 band". **It was five times wider
than that.** From H3b's own self-correction:

> "it is not a 1099-1152 band. The mark sits BELOW the headline at every landscape width from 768 up
> to ~1148 - I already had the evidence and misread it."

Measured, all `dropped`, all centred beneath the type: `1024x768` ink `x0` **384.7**, `820x1180`
`x0` **151.3**, `768x1024` `x0` **172.4**.

The misread had a specific cause. `HD-measure-desktop-P.md:49` reads, verbatim: "It never reaches
the `dropped` stage (`:1422`) at any desktop width, which is why the P is never actually below the
headline." `:129` repeats it as "The `dropped` stage (`:1422`) is never reached on desktop."
**Both are true of the widths that report swept, which started at 1280**, and the claim was carried
forward as a general property of the desktop path. >> **A negative result is
bounded by the range that produced it. "Never reached" from a sweep starting at 1280 says nothing
about 1099, and nothing about 768.** That is the cautionary tale in this file, and it cost most of a
day's misdirected effort on `SCRIM_CLEAR`.

## Decision

### Decision A. The separation at `W >= 1152` is bought by shortening the headline, not by moving the mark.

1. **A hero-scoped one-token change to the headline's `clamp()` ceiling**, in the existing declaration
   at `src/styles/globals.css:1459`. No new rule, no new selector, no specificity games:

   ```
   -  font-size: clamp(1.375rem, 7.5vw, 5.5rem);
   +  font-size: clamp(1.375rem, 7.5vw, 5.15rem);
   ```

2. **`--container-max` is UNTOUCHED at 1200px** (`globals.css:120`). **`SCRIM_CLEAR` is UNTOUCHED at
   0.70** (`hero-mark-light.ts:979`). **The `contained` stage rect is unchanged** (`:1470`).

### Decision B. `dropped` right-aligns on LANDSCAPE, so the mark is under-AND-to-the-right instead of under-and-centred.

3. **The fallback stage is made exactly as wide as the glyph's fitted width and pinned to the right
   edge**, which zeroes `fitInto`'s centring term so the glyph lands flush right with `STAGE_PAD` of
   air. Live at `hero-mark-light.ts:1505-1508`, commented `§T4` at `:1476-1496`:

   ```
   const dropS = dropH > 0 ? Math.min(dropWFull / MARK_W, dropH / MARK_H) : 0;
   const dropW = portrait ? dropWFull : Math.min(dropWFull, MARK_W * dropS);
   const dropped = { x: portrait ? STAGE_PAD : Math.max(STAGE_PAD, W - STAGE_PAD - dropW),
                     y: headBottom + 8, w: dropW, h: dropH };
   ```

   **The mark lands at `W - STAGE_PAD - inkW` exactly, at every width. NOTHING IS RESIZED.** The fit
   is height-bound in this band, so `MARK_W * dropS` **is** the glyph's natural width there.

   **The `Math.max(STAGE_PAD, ...)` is a floor, not decoration: it stops a narrow landscape viewport
   pushing `x` negative** when `dropW` would exceed `W - STAGE_PAD`. Do not simplify it away.
   `Math.min(dropWFull, MARK_W * dropS)` on the line above is the same discipline in the other
   direction, keeping the stage honest if the width term ever binds instead of the height term.

4. **It is scoped to landscape by the file's OWN EXISTING REGIME FLAG, `const portrait = H > W;`
   (`:1442`), not by an invented width breakpoint.** **Portrait tablets keep the centred
   under-the-headline composition**, because that is the correct composition for a portrait hero and
   it is what the visual baseline captured. Proven untouched, not assumed: `768x1024` `0565f5bd` and
   `820x1180` `cba90a89`, **4/4 byte-identical** full alpha-channel hashes, ink `424x374.7 @172` and
   `518x457.3 @151.3` unchanged.

   >> **THE FLAG PREDATES THIS RUN, VERIFIED AGAINST HEAD RATHER THAN ASSERTED.**
   `git show HEAD:src/components/home/hero-mark-light.ts` contains **15 occurrences of `portrait`**,
   including `const portrait = H > W;` at **HEAD `:1388`** and the already-existing signature
   `function terminalX(w: number, portrait: boolean): number {` at **HEAD `:488`**. The live file has
   19; Decision B added the four. **So no new threshold, breakpoint or constant was introduced by
   this decision at all** - it reuses a boundary the code already trusted in another place.

   **Checked the stronger way too: across the ENTIRE working diff of this file there is exactly ONE
   new module-scope constant name, `BEAM_HEAD_FRAC`, and it belongs to Decision C's hoist**
   (Decision 7). Every other changed `const` is a value change to a declaration that already existed
   at HEAD: `BEAM_PERIOD_MS` 11000, `BEAM_PERIOD_MS_NARROW` 9000, `BEAM_STEPS` 72,
   `BEAM_STEPS_NARROW` 44, `ALPHA_GAIN_LIGHT` 1.15, `ALPHA_GAIN_DARK` 0.75, `WIDTH_GAIN_NARROW` 1.9,
   `WIDTH_GAIN_WIDE` 1.5, `MARK_HF_PORTRAIT` 2.05, `MARK_JF_PORTRAIT` 0.0, `TERM_X_PHONE` 0.150.
   **Decision B contributed no constant whatsoever, only two local bindings and a reworked rect.**
   That is the difference between a scoped fix and a breakpoint nobody will remember, and it is why
   it is recorded here instead of left implicit.

5. **Decision B also cleared an unreported defect.** Before it, a 319px mark sat dead-centre directly
   beneath the three headline lines and **overlapped the scroll cue**. After it the mark is below the
   headline and flush right, clear of the cue, whole and closed. **That collision was never reported
   as a bug by anyone; it was found by looking at the pixels.**

### Decision C. The beam is retimed, lengthened and weighted. Its PATH is unchanged.

6. Current values, all read in `hero-mark-light.ts`: `BEAM_PERIOD_MS = 6500` (`:98`, was 11000),
   `BEAM_PERIOD_MS_NARROW = 5500` (`:99`, was 9000), `BEAM_HEAD_FRAC = 0.18` (`:167`, was an inline
   0.085), `BEAM_STEPS = 150` (`:173`, was 72), `BEAM_STEPS_NARROW = 92` (`:174`, was 44),
   `ALPHA_GAIN_LIGHT = 1.30` (`:124`, was 1.15), `ALPHA_GAIN_DARK = 1.10` (`:138`, was 0.75),
   `WIDTH_GAIN_NARROW = 2.5` (`:156`, was 1.9), `WIDTH_GAIN_WIDE = 2.2` (`:157`, was 1.5).

7. **`BEAM_HEAD_FRAC` must NEVER be re-inlined.** It is read at two live sites: the drawing path,
   `const len = total * BEAM_HEAD_FRAC;` (`:1815`), and the reduced-motion park scorer,
   `const spanLen = total * BEAM_HEAD_FRAC;   // §41: must equal drawBeam's head` (`:1733`).
   **Before the hoist the length was an inline literal in both places. Raising one without the other
   parks the reduced-motion still frame on a run of the outline that is mostly off-canvas or inside
   the keep-out hole**, which is the documented failure the park scorer exists to prevent. Anyone
   changing the head length changes one constant and both sites follow.

8. **A wider beam than this needs a rewrite, not a bigger constant.** `drawBeam` (`:1806`) strokes
   `BEAM_STEPS` **separate** segments, each at its own `globalAlpha`, and with BUTT caps consecutive
   segments overlap by `lineWidth - segmentLength`. Where they overlap the composited alpha exceeds
   either segment's, so **every join becomes a brighter ridge, visible as a ladder of ticks at 3x
   zoom.** It scales with **both** width and alpha, and **raising `BEAM_STEPS` makes it WORSE**, not
   better, because it adds overlaps. `2.2 / 1.10` is the measured ceiling of this lever, which is why
   the values in Decision 6 stop there. **A genuinely wider beam needs one gradient-stroked path
   instead of N alpha-stroked segments.**

### What the decisions void, and what they do not

9. **`0012:79-84` is VOID.** The desktop P is no longer required to stay modest, and its change is
   not a defect. `0013:99-104`, `0013:126-128` and `0013:208-209` are void **only insofar as they
   re-affirm `0012:79-84`**; every other survival they assert still holds.

10. **`0012:33-38` (the post-revert per-viewport desktop ink table) is NO LONGER a sufficient
    regression anchor**, and `0013`'s use of `410 x 362` at 1440x900 as a leak detector is
    superseded. The 1440x900 **bounding box** is still `410 x 362`, so that number is not wrong, but
    the ink inside it changed. See the verification invariants below.

11. **`0012:33` itself survives.** The wide branch is still the `contained` contain-fit stage with the
    ink guard armed. `const guard: typeof rects = narrow ? [] : rects;` (`:1574`) is unchanged, and
    the 12-step loop (`:1578-1579`) is unchanged. **The desktop P got bigger at 1280 by DISARMING
    that guard, not by removing it**, and the `dropped` stage was **re-aimed, not removed**. Nothing
    was re-pointed at a mark-derived stage and nothing was emptied, so `0012:47` is intact.

12. **NOT allowed, because each reverts an owner decision or a measured finding:**
    - **Restoring `5.5rem` on the authority of `0012:79-84`, `0013:99-104`, `0013:126-128` or
      `0013:208-209`.** Those clauses are void as to the desktop P. See Decision 9.
    - **Re-centring the `dropped` stage on landscape**, or replacing the `portrait` gate with a width
      breakpoint. The centred landscape drop **is** the state the owner complained about.
    - **Right-aligning the `dropped` stage on PORTRAIT.** Portrait tablets are deliberately excluded,
      and their 4/4 byte-identical hashes are the proof that they were excluded on purpose.
    - **Raising `SCRIM_CLEAR` to move the mark right.** At 1440 and 1512 the guard depth is already
      `k = 0`, so it is **pure shrink bought with position**; below ~1150 the escape is geometrically
      impossible at any value. It is the wrong lever in both regimes. `0013`'s clause 6 already
      forbade it for a different reason and its prohibition stands for these.
    - **Dropping the wide stage's right pad** (changing `contained.w` from `W - STAGE_PAD - floor` to
      `W - floor`). **A comment in the `/* §31 */` block appears to describe this as
      intended-but-unimplemented behaviour. It does not.** It describes the BLEEDING wide mark that
      §37 reverted. The live stage's own comment at `:1461-1465` says the opposite: the column runs
      "from `floor` ... to `W - STAGE_PAD`" and "fitInto() CONTAIN-fits the mark inside it, so the
      glyph is whole and no edge of it leaves the frame." **Dropping the pad is a design change that
      partially re-introduces what the owner reversed twice, NOT a bug fix, and it must not be
      presented as restoring documented intent.**
    - **Widening `.ps-hero-content` to `max-width: 1294px`.** It breaks the 144px page axis and
      collapses the left gutter to zero at 1280. See rejected path 3.
    - **Letting the desktop glyph overhang the right viewport edge.** That reverses §37 and ADR-0011,
      which rest on two verbatim owner reversals recorded at `0012:82-83` and quoted again in the live
      source at `:1468-1469`: "The P is too big now." / "IT IS ONLY SUPPOSED TO BE THAT BIG ON MOBILE
      BTW". **This ADR delivers "bigger" without overhang, and an overhang needs his word explicitly,
      not an inference from "bigget".**
    - **Cutting the headline further than `5.15rem` on an agent's own judgement.** See the rejected
      residual below. It is held for the owner.
    - **Re-inlining `BEAM_HEAD_FRAC`** (Decision 7), or **raising `BEAM_STEPS` to smooth the beam**
      (Decision 8, it does the opposite).
    - **Editing the `void`ed `WIDE_MARK_*` constants** (`:766`) expecting a visual change. Nothing
      reads them. Their declarations at `:690` and `:715` are dead.

13. **Exception:** none. A further change of desktop size, position, drop-stage alignment or beam
    character needs a new superseding ADR naming who asked.

## Measured outcomes

Chromium, dev server on port 3610, built state, 0 pageErrors, painted ink via `getImageData` with the
alpha threshold stated. Landscape, H=900 unless noted. "PRE-T3" is the old `5.5rem` ceiling injected
on the same build.

### At `W >= 1152`, Decision A does the work

| W | `gapX` PRE-T3 | `gapX` after A | mark bbox width |
|---|---|---|---|
| 1280 | −23.3 (`k` = 9) | −20.8 (`k` = 0) | **250.6 -> 361.7 (+44.1%)** |
| 1366 | −46.5 | **−3.7** | 387.7 |
| **1440** | **−46.9** | **+11.1** | **410.0 (unchanged)**, ink **+35.3%** |
| **1512** | **−32.5** | **+25.5** | **431.7 (unchanged)** |
| 1600 | −15.0 | **+43.0** | 458.2 |
| 1680 | +1.0 | **+59.0** | 482.3 |
| 1920 | +48.9 | **+106.9** | 554.7, ink 209,956 -> 244,165 |

`gapX` = mark ink `x0` minus headline text-ink `x1`. Positive means the mark's bounding box starts to
the right of where the headline's text ends.

### Below 1152, Decision B does the work, and Decision A did more than anyone predicted

| W | `gapX` PRE-T3 | `gapX` after A | `gapX` after A+B | stage after A |
|---|---|---|---|---|
| 1099 | −539 | −486 | **−119** | `dropped` |
| 1110 | −533 | −480 | **−108** | `dropped` |
| 1120 | −528 | −475 | **−98** | `dropped` |
| 1130 | −523 | −470 | **−88** | `dropped` |
| 1136 | −520 | −467 | **−82** | `dropped` |
| 1140 | −518 | −465 | **−78** | `dropped` |
| **1145** | −516 | −463 | **−73** | >> **`dropped`, LAST width that drops** |
| **1152** | −512 | >> **−21** | −21 | >> **`contained`, first width that does not** |
| 1160 | −508 | −24 | −24 | `contained` |
| 1173 | −502 | −31 | −31 | `contained` |
| 1200 | −488 | −37 | −37 | `contained` |
| 1230 | −488 | −31 | −31 | `contained` |
| 1251 | −488 | −27 | −27 | `contained` |
| 1260 | −19 (`k` = 11) | −25 (`k` = 0) | −25 | `contained` |
| 1280 | −23 (`k` = 9) | −21 (`k` = 0) | −21 | `contained` |

- >> **The drop edge is bisected to a 7px window: `dropped` fires at 1145 and not at 1152.**
- >> **PRE-T3 that edge was at about 1256** (`dropped` fires at 1251 and not at 1260). **So Decision A
  alone moved the edge 1256 -> 1148, lifting 1152-1251 out of the defect: a 100px swathe of exactly
  what the owner described, purely from shortening the headline, and unpredicted by anyone.**
- **`bleeding` is never reached at any of these widths.** It is the phone-only stage, selected only
  when `narrow` (`const primary = narrow ? bleeding : contained;`, `:1472`; `narrow = W < NARROW_MAX`,
  `:1595`, with `NARROW_MAX = 768`, `:66`).
- >> **1136 and 1140 are AMBIGUOUS BY SCALE and must not be classified by `sCss`.** There
  `contained` at `k = 0` and `dropped` at `k = 0` agree to within 0.0015, so a scale-matching stage
  test returns whichever it checks first. **Position disambiguates and says `dropped`**: ink `x0`
  409 and 411, i.e. centred, nowhere near `floor` at 795.2 and 798.0. **A scale-based stage test is
  not decisive in that window. Use `x0` against `floor`, or `y0` against the headline's bottom.**

### Decision B's effect: same size, moved right

| W | ink `x0` before B | ink `x0` after B | ink size |
|---|---|---|---|
| 1024x768 | 384.0 | >> **745.3** | 255.3 x 225.3 (unchanged) |
| 1099 | 390.4 | >> **757** | 319 x 281 (unchanged) |
| 1110 | 396 | **768** | unchanged |
| 1120 | 400.9 | >> **778** | unchanged |
| 1130 | 406 | **788** | unchanged |
| 1145 | 413.4 | **803** | unchanged |

**`W - STAGE_PAD - inkW` exactly, at every width. Nothing resized; it moved.**

### >> TWO SENSES OF "BIGGER", and both are on the record

**At 1280 the bounding box grows 44.1% and the ink inside it grows 220%.** The shorter headline stops
the polygon overlapping the headline rects, which **disarms the 12-step 0.96 shrink guard**:
`sCss` **0.2786 -> 0.4022**, and `0.2786 / 0.4022 = 0.6927 = 0.96^9` exactly, so `k` went 9 -> 0.
`a48` ink pixels 19,179 -> 61,394.

**At 1440 the bounding box is unchanged and the mark paints 35.3% more ink.** `a48` ink pixels
**71,588 -> 96,842** inside the same `410 x 362` box. **The glyph did not move by 0.01px**: placement
`sCss / ox / oy` reads `0.4559 / 969.25 / 217.05` before and after, byte-identical, and the `a8` ink
bbox is `410x362 @(1007.3, 268.7)` before and after. **The extra ink is the keep-out hole shrinking
with the headline**, so less of the same plate is punched out. Same mechanism at 1920x1080, where
placement is byte-identical at `0.6168 / 1291.58 / 224.84` and ink pixels go 209,956 -> 244,165.

**The bounding box could not grow without the glyph shrinking, but the VISIBLE glyph grew, because
the type stopped covering it.** That is the sense in which the owner's "bigger" was delivered at his
likely widths, and it is stated here rather than glossed because a reader checking bbox alone will
conclude nothing happened.

`keepoutMaxAlpha` is **0** on every row, so the punch still covers every headline line completely and
the WCAG invariant that `0012:55-59` protects is intact.

## Cost, stated plainly

- **The hero headline is 6.4% smaller at `W >= 1099`: 88px -> 82.4px.** Measured as imperceptible
  without the number in front of you.
- **Decision B costs nothing.** No constant, no size, no other regime. One stage rect, gated on a flag
  the file already had.
- **Three lines at every width, no re-wrap**, and `scrollWidth === innerWidth` at all 15 widths
  measured.
- **The shared left axis is unchanged.** Hero text left stays 144 at 1440 and 180 at 1512, dead on
  the nav logo and every section `h2`. In the 1099-1173 band the `h2` left is 24 and the logo left is
  48, byte-identical before and after. This is structural, not lucky: **font-size cannot move a
  left-aligned block's left edge.** `globals.css:788-792` records that 144px axis as deliberate.
- The exact threshold, so the value is not a guess: the text must go from 910.2px to `<= 863.3px`,
  a scale factor of 0.9485, so **font-size `<= 83.5px = 5.216rem`**. `5.2rem` is the minimum that
  clears at 1440; **`5.15rem` buys an 8px margin for the extra 0.8px of type.**

## Scope, and Decision A's scope is structural rather than conventional

>> **Decision A's `clamp()` ceiling binds only where the `7.5vw` term exceeds it, i.e. `W >= 1098.67`
at 5.15rem (it was `W >= 1173.33` at 5.5rem). Below 1099 the `7.5vw` term governs under both the old
and the new value, so PHONE AND TABLET HEADLINES ARE UNTOUCHED BY CONSTRUCTION, not by media
query.** There is no breakpoint to get wrong and nothing to keep in sync.

Proven three ways rather than asserted:

- **Computed font-size is exactly `7.5vw` at every width below the ceiling**: 24 / 29.25 / 32.25 /
  57.6 / 61.5 / 76.8 / 81.75px at 320 / 390 / 430 / 768 / 820 / 1024 / 1090.
- **6/6 byte-identical full-canvas alpha hashes below 1099**, pre-change versus post-change built
  state, with the measured `.ps-hero-line` rects byte-identical too: 768x1024 `0565f5bd` / `5ae0faf0`,
  820x1180 `cba90a89` / `80da2625`, 1024x768 `2cfff928` / `9280d608` (dark / light).
- **16/16 byte-identical phone plate hashes**, all 8 phone viewports x both themes, with `a48` ink
  counts and `sCss` / `ox` / `oy` identical and `keepoutMaxAlpha = 0` on every row.

**Decision B's scope is proven the same way:** **portrait tablets 4/4 byte-identical**
(`768x1024` `0565f5bd`, `820x1180` `cba90a89`, both themes, ink `424x374.7 @172` and
`518x457.3 @151.3` unchanged), and **`W >= 1280` 6/6 byte-identical** because those widths never
reach `dropped` at all. **0 pageErrors on every run.**

The phone levers are confirmed untouched by grep against the live file:
`MARK_HF_PORTRAIT = 0.41` (`:517`), `MARK_JF_PORTRAIT = 0.8` (`:521`), `TERM_X_PHONE = 0` (`:526`),
`SCRIM_CLEAR = 0.70` (`:979`).

### The 1099-1173 headline band, measured

The old ceiling was not yet binding there, so the headline itself changes in this band. It is a
**monotone ramp, not a cliff**:

| W | computed font | `7.5vw` would be | delta | lines |
|---|---|---|---|---|
| 1090 | 81.75px | 81.75 | **0.00, ceiling not reached** | 3 |
| 1099 | 82.4px | 82.425 | −0.025 | 3 |
| 1120 | 82.4px | 84.00 | −1.60 | 3 |
| 1150 | 82.4px | 86.25 | −3.85 | 3 |
| 1173 | 82.4px | 87.975 | **−5.575 (maximum)** | 3 |
| 1200 | 82.4px | 90.0 (was capped at 88) | −5.60 | 3 |

**The delta ramps from 0.00 to a −5.575px maximum and is then constant. Three lines throughout, no
re-wrap. The left axis is unaffected across the whole band. Nothing in the band regresses.**

## >> THE REJECTED PATHS. Recording these is half this ADR's value.

Each was measured and refused. An agent who re-proposes one is re-litigating a settled question, and
the numbers here are the answer.

### 1. Raising `SCRIM_CLEAR`. Rejected twice over, for two different reasons.

`gapX > 0` requires `SCRIM_CLEAR >= 0.5 + 334.2/W`, i.e. 0.7611 at 1280, 0.7447 at 1366, 0.7321 at
1440, 0.7210 at 1512, 0.7089 at 1600, 0.6989 at 1680.

**At 1440 and 1512 the measured guard depth is already `k = 0`, so there is nothing to disarm.**
`SCRIM_CLEAR = 0.735` delivers `gapX` +3.6 at 1440 and +20.5 at 1512, and costs **−12.4%** of mark
width (410 -> 359 at 1440). That contradicts "bigger" directly.

**Below about 1150 it cannot work at any value at all**, for the geometric reason given in Context:
`floor` is inside the headline's column and shrinking walks the left edge right too slowly to escape
in twelve steps. **Raising `SCRIM_CLEAR` there makes the escape strictly harder, not easier.**

> **Unverified, and ACCEPTED as immaterial rather than closed.** The 1280 and 1366 rows of that
> trade table are model predictions assuming `k = 0`, which is measured false at exactly those
> widths (`k` = 9 and 2), so they over-predict size there. Not confirmed against a render. What
> would confirm it: a built-state render at 1280 and 1366 with `SCRIM_CLEAR` raised.
> **Nothing in this ADR's decisions rests on those two cells**, and the rejection of that path is
> argued from the `k = 0` widths and from the below-1150 impossibility proof, both measured.
> **Deliberately KEPT rather than deleted: a model cell that is knowably wrong and labelled as such
> is more useful to a future reader than a missing row**, which would invite someone to recompute it
> and believe the answer.

### 2. Dropping the wide stage's right pad. Rejected: it is a design change wearing a bug fix's clothes.

It halves the cost of path 1 (−6.5% instead of −12.4% at 1440) and the `/* §31 */` comment block
reads as though the drop was intended and never implemented. **It was implemented, for a different
design, and that design was reverted.** The `§31` block opens by describing a stage whose right edge
is pushed past the viewport in both regimes, which is the **bleeding** wide mark that §37 reverted.
The live stage's own comment at `:1461-1465` states the opposite. **An agent on this run nearly
presented this as restoring documented intent. It re-introduces the off-edge wide mark the owner
reversed twice.**

### 3. `max-width: 1294px` on `.ps-hero-content` (variant T1). Rejected on pixels.

Its `gapX` clears (+0.1 at 1440, +14.5 at 1512) and it leaves the mark at full size, but:

- **The headline lands 47px left of the nav logo and of every section heading: 97 versus 144.** The
  misalignment is visible in the render, and `globals.css:788-792` records the 144px axis as
  deliberate.
- **At 1280 the left gutter collapses to 0** and the text runs to the viewport edge, because a
  1294px max-width exceeds the available content width.
- It is **unsafe below about 1350** and visibly breaks the page axis above it.

### 4. >> A FURTHER HEADLINE CUT to put the mark BESIDE the headline below ~1150. REJECTED PENDING THE OWNER.

This is the one rejected path that is **not** closed on the merits. It is a real option, correctly
priced, and deliberately not taken by an agent.

Below about 1150 the mark is now under-**and-to-the-right**, which is the owner's sentence literally,
**but it is still UNDER rather than BESIDE the headline.** `contained` escapes only when the headline
is short enough, and the thresholds are:

| to make `contained` escape at | needs headline | vs today's 82.4px | total cut from the original 88px |
|---|---|---|---|
| 1099 | **~78.8px (`4.93rem`)** | −4.4% | **−10.5%** |
| 1024 | **~73.8px (`4.61rem`)** | −10.4% | **−16.1%** |

The reasoning for holding it, recorded verbatim because it is the justification and not a summary:

> "6.4% was invisible; 10.5% starts to show, and it trades a headline nobody has complained about
> against a mark he has complained about twice."

**Not done. Held for the owner.** Decision B may well be enough, since it satisfies his stated
requirement. **Put `4.93rem` to him only if he objects again at laptop widths.** The alternative
levers are strictly worse and are recorded as such above: `SCRIM_CLEAR` shrinks the mark and cannot
escape below ~1150 at any value, and an overhang reverses two of his own reversals.

## The beam

**`#ps-hero-beam` already traced the full outline before this change. The owner could not see it.**
That distinction matters, because "make the beam trace around the P" reads as missing functionality
and it was not.

Measured at 1440x900 dark, sampling the beam canvas across more than one lap: the **swept union of
the beam over a lap is 411.3 x 363.3 @(1006.7, 268)** against a plate ink box of
**410 x 362 @(1007.3, 268.7)**. The union equals the glyph's ink bbox to about a pixel on every side.
The "short arc sliver on the bowl's right" that an earlier read reported is the **parked
reduced-motion frame**, reproduced exactly at 22.7 x 114.7 @(1395.3, 292). **Measuring the beam under
`reducedMotion: 'reduce'` reports a false sliver, and a verifier that does so will report a defect
that does not exist.**

After the change, the swept union is **412.7 x 364.7 @(1006, 267.3)**, about 2px larger on each side,
which is exactly the wider stroke. **The path is unchanged. Only speed, length and weight moved.**

- **Visibility came from length and weight, not speed.** `BEAM_HEAD_FRAC` 0.085 -> 0.18 is a 2.1x
  longer comet head; the width and alpha gains did the rest. Mean ink per frame 831 -> ~2,283, peak
  alpha ~132/255 -> ~201/255.
- **4000ms was measured too insistent and was rejected.** Over 60 seconds of continuous observation
  at 1440 dark, 4000ms gave **15.0 passes per minute and 31 crossings per minute of the air
  immediately beside the headline**. `BEAM_PERIOD_MS = 6500` gives **9.3 passes and 19 crossings**
  and remains unmistakable, while still being 1.7x faster than the 11000ms the owner called
  invisible.
- **The reduced-motion park is better than before, as a side effect of the hoist in Decision 7**:
  1 distinct position across 20 samples at 111.3 x 190.0 @(1307.3, 273.3) with 2,543 ink pixels,
  where it was 22.7 x 114.7 with 831.
- **Verified in real Safari 26.6.2**, over raw W3C WebDriver: the beam animates and traces the full
  outline, swept union **412.7 x 364.0 @(1006, 241.3)** against Safari's plate `410 x 362`,
  24 distinct positions in 26 samples, peak alpha 200/255. **No engine divergence in the beam.**
- **The WCAG invariant holds on the beam canvas specifically**: max beam-canvas alpha inside every
  `.ps-hero-line` ink rect is **0**, measured on every frame of every run (100 dark, 100 light,
  100 phone, 20 reduced). The keep-out covers the beam and still does.
- **No second animation loop was added.** `drawBeam` (`:1806`) is still called from the one existing
  frame loop. Only constants changed.

> **Unverified, and ACCEPTED KNOWINGLY. FOR WHOEVER NEXT HAS A DEVICE IN HAND.** Three sub-items,
> all un-run:
>
> 1. Whether the beam steps visibly on a real iOS device at `FRAME_GAP_MS_NARROW = 30` (~30fps),
>    where the shorter narrow lap advances the head about 2.9% of the outline per painted frame
>    instead of about 1.1%. It looked smooth in Playwright at 3x zoom. **Not confirmed on hardware.**
> 2. **Per-frame cost was never profiled.** Ink per frame rose from 831 to about 2,283 and strokes
>    from 72 to 150, so this ADR does not claim the change is free.
> 3. **WebKit and Firefox beam runs were not done.** The beam is verified in chromium and in real
>    Safari 26.6.2 only.
>
> **What would confirm it:** a real iPhone at a phone width watched for a full lap, a frame-time
> profile, and beam runs on the other two engines.
>
> **Why this is accepted rather than assigned: it is phone-only, and NO OWNER-VISIBLE CLAIM RESTS ON
> IT.** The beam's position and sweep are verified in real Safari (24 distinct positions in 26
> samples, swept union 412.7 x 364.0 against a plate of 410 x 362), so what the owner asked for is
> demonstrated on his own engine. Only smoothness and cost are open.

## >> VERIFICATION INVARIANTS. THREE CASES, and two of them are the SAME WIDTHS with OPPOSITE verdicts. Record all three or a future check reports success as failure.

>> **READ THIS BEFORE THE THREE CASES. The trap has INVERTED, and a verifier that gets it wrong
fails a correct build.** For most of this project's history the rule was "the hero canvas hash must
not change". After these decisions there are widths where an **UNCHANGED hash is the FAILURE**, and
they sit next to widths where a **CHANGED hash is the failure**, and the two are not separated by
size.

>> **ORIENTATION IS THE ONLY DISCRIMINATOR BETWEEN CASES 2 AND 3. A check that treats `768x1024`
and `1024x768` as "the ~768 case" gets it EXACTLY BACKWARDS**: they are the same two numbers, they
differ only in which is the width, and they have opposite required verdicts. `1024x768` is landscape
and **must move**; `768x1024` is portrait and **must be byte-identical**. Any harness that keys on a
single dimension, sorts viewports by area, or writes them as an unordered pair will report the
inverse of the truth on both rows and look internally consistent doing it.

### 1. At `W >= 1099`, the full-canvas hash CHANGES and the glyph has NOT moved.

The keep-out hole shrank with the headline, so more of the **same** glyph paints inside an
**identical** bounding box. An agent comparing a bare hash to a pre-change baseline will see
"changed" and call it a regression or a scope leak. It is neither.

- **Valid invariants there: the placement triple `sCss` / `ox` / `oy`, plus the `a8` ink bounding
  box.** At 1440x900 those are byte-identical across the change
  (`0.4559 / 969.25 / 217.05`, `410x362 @(1007.3, 268.7)`); at 1920x1080 likewise
  (`0.6168 / 1291.58 / 224.84`). At 1280 the placement **should** move, and does, because that is the
  guard releasing.
- **Below 1099 the full-canvas hash IS the valid invariant and must be byte-identical.** That is
  where it was used, and it held 6/6 plus 16/16 on phones.

### 2. In LANDSCAPE from 768 to ~1148, the glyph DELIBERATELY MOVED. The hash MUST change. >> AN UNCHANGED HASH HERE IS A FAILURE.

This is the inverted case. Decision B moved the glyph on purpose, so a byte-identical canvas at
`1024x768` means **the fix is not in the build being measured** - a stale server, a stale `out/`, or
a reverted file. **Do not report an unchanged hash here as a clean pass. It is the strongest
available signal that you are measuring the wrong artifact.**

- **Expect `ox` to change and the ink `x0` to land at `W - STAGE_PAD - inkW`.** Measured: `1024x768`
  384.0 -> **745.3**, `1099` 390.4 -> **757**, `1120` 400.9 -> **778**, `1145` 413.4 -> **803**.
- **The invariant that must hold instead is the ink SIZE, which is unchanged at every width**:
  319 x 281 at 1099, 255.3 x 225.3 at 1024x768. **Size unchanged plus `x0` at `W - 24 - inkW` is the
  pass condition.** Size changing means something resized, which Decision B does not do.

### 3. PORTRAIT at those SAME widths must stay BYTE-IDENTICAL.

`768x1024` `0565f5bd`, `820x1180` `cba90a89`, both themes, **4/4**, with ink `424x374.7 @172` and
`518x457.3 @151.3` unchanged. **This is the check that proves the landscape gate works**, and it is
the one that catches a well-meaning agent "finishing" Decision B by right-aligning portrait too.

### In all three cases

`keepoutMaxAlpha` must be **0** on every row, at every width, on the plate canvas and on the beam
canvas. It is.

**And do not classify the stage by `sCss` at 1136 or 1140.** See the note under the second measured
table: the two candidate stages agree to within 0.0015 there, and only position disambiguates.

## Consequences

### For implementers

- **The headline and the mark are now coupled through the keep-out and through the guard.**
  `headlineInk()` feeds the `rects` that arm the guard (`:1574`) and punch the keep-out hole, and
  `headBottom` (`:1337`) feeds the `dropped` stage's `y`. **Any future change to the hero headline's
  copy, type scale, weight, tracking or line-height moves the mark**, changes how much of it paints,
  and can arm or disarm the shrink guard or move the 1148 drop edge. It is not an independent knob any
  more, and it never really was. Decision A moving the drop edge by 108px is the proof.
- **`dropped` is not a rare fallback.** It is reached at every landscape width from 768 to about
  1148, and at portrait tablet widths. Anyone treating it as dead code is repeating the misread that
  cost this run a day.
- **`0012:33-38`'s ink table still describes the bounding boxes, not the ink.** Use it as a bbox
  reference only. See Decision 10.
- The mark's desktop scale is still derived structurally, not from a constant. There is no desktop
  size number to edit, only the stage rects and the headline that constrains them.
- `src/styles/globals.css` was, at the time of the edit, carrying 21 insertions of another agent's
  uncommitted card work in the same file. Ownership was re-checked immediately before writing
  (identical mtime and md5 across three samples spanning seven minutes), and nothing in that work
  touches `.ps-hero-headline` or `.ps-hero-content`. A backup was left at
  `scratchpad/globals-preT3.bak.css`.

### What review agents must NOT flag

- **A desktop hero P larger than `0012:33-38`'s table**, at 1280 in particular, where the bbox is
  now 361.7px wide rather than 250.6px. That is `0012:79-84` being void plus the guard legitimately
  releasing.
- **A desktop hero P painting more ink inside an unchanged bounding box.** That is the keep-out hole
  shrinking, and it is the mechanism that delivered "bigger" at 1440 and 1512.
- **A changed full-canvas hash at `W >= 1099`.** See invariant 1.
- **A moved glyph in landscape between 768 and ~1148.** See invariant 2. That is Decision B.
- **A mark sitting BELOW the headline in landscape below ~1148.** It is under-and-right by design and
  the owner's sentence says "under". Putting it beside the type down there is the rejected residual,
  path 4, and it is the owner's call.
- **A mark sitting below AND CENTRED on a portrait tablet.** Deliberate, Decision 4.
- **A hero headline computing to 82.4px rather than 88px at `W >= 1099`**, or up to 5.575px smaller
  than `7.5vw` in the 1099-1173 band.
- **A beam that loops continuously rather than sweeping once and stopping.** The owner's phrasing is
  continuous and his complaint was that he could not see it. A sweep-once beam is invisible to anyone
  arriving late, scrolling back, or returning to the tab, which is the same failure through another
  door. `prefers-reduced-motion` parks it, and that park is verified sane.
- **The absent hero CTAs.** Still `0012:43-45` and `0012:48-49`, untouched by this ADR.
- **The phone hero P at `hF 0.41 / jF 0.8 / TERM_X_PHONE 0`.** Still ADR-0013, untouched by this ADR.

### Known costs accepted with this decision

- 6.4% of hero headline type size at `W >= 1099`, and up to 5.575px in the 1099-1173 band.
- Below ~1148 landscape, a mark that is under-and-right rather than beside the type. Accepted for now;
  the price of fixing it is rejected path 4 and it is the owner's to pay.
- A beam that is the most insistent this element has been: 9.3 passes per minute where it was 5.5.
- A per-frame beam cost that rose roughly 2.7x in ink pixels and was not profiled.

## Final state, fingerprinted

| file | `git diff --numstat` | md5 |
|---|---|---|
| `src/components/home/hero-mark-light.ts` | **`104 17`** | **`5789e2f814e8a2d97c5a43f7e966eb6c`** |
| `src/styles/globals.css` | **`36 1`** (21 insertions are another agent's, pre-existing) | **`94227701759dd545fa4ef90d58998c17`** |

Constants of record: `MARK_HF_PORTRAIT 0.41` (`:517`) · `MARK_JF_PORTRAIT 0.8` (`:521`) ·
`TERM_X_PHONE 0` (`:526`) · **`SCRIM_CLEAR 0.70` (`:979`), untouched, and recorded as the WRONG lever
rather than the missing one** · `BEAM_PERIOD_MS 6500` / `_NARROW 5500` (`:98-99`) ·
`BEAM_HEAD_FRAC 0.18` (`:167`) · `BEAM_STEPS 150` / `_NARROW 92` (`:173-174`) ·
`ALPHA_GAIN_LIGHT 1.30` (`:124`) / `ALPHA_GAIN_DARK 1.10` (`:138`) ·
`WIDTH_GAIN_WIDE 2.2` (`:157`) / `_NARROW 2.5` (`:156`) ·
`.ps-hero-headline` ceiling `5.15rem` (`globals.css:1459`).

Verified against the live files at 12:14 on 2026-09-07. **No commit, no push, no deploy.**

## Open / not yet decided

- **Rejected path 4 is open, not closed.** A further headline cut to `4.93rem` (1099) or `4.61rem`
  (1024) would put the mark beside the type at laptop widths. Priced, held for the owner.
- **`0012:70-75`'s phone-landscape defect is still open** and shares no lever with these changes.
- **Whether the owner's own window is one of the measured widths is still unknown.** It is the single
  fact that would settle which frame produced the complaint. `1440` and `1512` were treated as the
  likely widths on the strength of the hardware, not on evidence, and `HD-measure-desktop-P.md:139`
  says as much.
- **`gapX` at 1280 is still negative (−20.8).** Clearing it as well needs the headline about 85px
  shorter, roughly `4.85rem`, which starts to be a visible type change. 1280 is improved on size and
  still interleaved on position, and this ADR accepts that.
- **Light-theme contrast was re-measured at the final beam weight and is unchanged**
  (light 3.221:1, dark 5.318 / 5.268:1 on the core-glyph-mask harness, all above the 3:1 floor; the
  figure of record for dark headline contrast is **5.582:1** per H2b). **It was not re-measured after
  the desktop ink rose 35.3% at 1440, nor after Decision B moved the landscape glyph.** Because
  `keepoutMaxAlpha` is 0 on every row the headline glyphs still have zero plate over them, so the
  headline figure should be unaffected, but that is an inference from the keep-out, not a fresh
  measurement.

  > **Unverified, and ASSIGNED rather than accepted.** Post-change light-theme accent contrast at
  > 1440, 1512 and at landscape widths below 1148. **`P2-a11y` owns it and runs BEFORE the deploy**;
  > it is not left to a future reader to notice.
  >
  > >> **ITS CLOSURE CONDITION IS A MEASURED NUMBER, NOT AN INFERENCE.** This paragraph is not
  > satisfied by reasoning from `keepoutMaxAlpha`, by a token-value check, or by anyone concluding it
  > "should be fine". It is satisfied by a contrast figure measured against the RENDERED backdrop at
  > the named widths. **If it comes back below 3:1 that is a BLOCKING finding and the change does not
  > ship** - the same rule the phone work was held to. **This ADR does not pre-authorise shipping
  > it.**
  >
  > **Scope the question correctly before measuring it.** `keepoutMaxAlpha = 0` on every row already
  > establishes that **the mark never paints on the headline's ink**, at any width, in either theme,
  > on the plate canvas and on the beam canvas. So **the open question is NOT the mark against the
  > type.** It is **the mark against its own ground**: Decision B moved the glyph on landscape, so
  > its relationship to whatever sits beneath it there changed. What would confirm it: the
  > core-glyph-mask contrast harness re-run at 1440, 1512 and at landscape widths below 1148 in the
  > post-change built state, sampling the backdrop under the glyph mask rather than under the
  > headline rects.
  >
  > **The margin being defended is thin**, which is why this is routed and not accepted:
  > `0012:57-58` records the worst light accent case at **3.07:1** against a 3:1 large-text floor,
  > i.e. **0.07 of headroom.**

- **The `SCRIM_CLEAR = 0.70` correspondence is untouched but fragile.** `globals.css:1572-1584`
  records the light scrim releasing at `70%` and states that "Releasing at 70% is what makes a
  330px-wide un-veiled stage". The TS constant at `:979` and that gradient stop are the same number
  in two files with nothing enforcing it. **This ADR changes neither. Anyone who changes one must
  change both or record why not.**
- **The exact lower edge of the landscape drop regime below 768 is not established**, because 768 is
  the `narrow` boundary (`NARROW_MAX`, `:66`) and below it the phone path takes over. Landscape
  phones are `narrow`, so Decision B does not reach them; `0012:70-75`'s open defect is the relevant
  record there.
- **The ADR-0012 and ADR-0013 status lines were NOT edited.** `DECISIONS/README.md:19-23` says a
  superseding ADR changes exactly one line in the old file, `Status: Superseded by ADR-000N`, and
  that the `protect-adr-and-secrets.sh` hook blocks such writes without `ADR_SUPERSEDE=1`, "the
  owner's say-so". This run was instructed not to edit either file, so `0012` still reads "Not
  superseded" and `0013` still reads "Not superseded". **That is a known gap in the record, not an
  assertion that this ADR failed to supersede them.** ADR-0013 left the same gap on ADR-0012.

## Status note for review agents

While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective.
Do not flag it, do not "fix" it, and **do not revert `5.15rem` to `5.5rem`, and do not re-centre the
landscape `dropped` stage, to satisfy `0012:79-84`, `0013:99-104`, `0013:126-128` or
`0013:208-209`.** Those clauses are void as to the desktop P. Objections go under "Decision
Concerns" citing this ADR number, never as a bug or a blocking finding. Disagreement with a settled
decision is resolved by a NEW superseding ADR, never by editing this one.

**Three exceptions to "do not flag", because each is a real gap rather than an objection.** Each has
a recorded disposition, so report it against that rather than as a fresh discovery:

1. **The residual below ~1148** (under-and-right, not beside) is real and unresolved. Reporting it is
   reporting rejected path 4, which is **open and priced, held for the owner.**
2. **The post-change light-theme contrast at 1440, 1512 and landscape below 1148 was never
   measured.** >> **ASSIGNED to `P2-a11y`, which runs before the deploy, and its closure condition is
   a measured number. A value below 3:1 is a BLOCKING finding and the change does not ship.** Do not
   close this by inference from `keepoutMaxAlpha`.
3. **The beam's real-device behaviour and frame cost were never measured.** **Accepted knowingly,
   phone-only, for whoever next has a device in hand.** No owner-visible claim rests on it.

**And one thing that is NOT an exception:** the `SCRIM_CLEAR` trade table's 1280 and 1366 cells are
marked unverified on purpose and are **accepted as immaterial.** Reporting them as an error is
reporting something the file already says about itself.

## A note on this file's own citations

**Line numbers in this repository moved repeatedly on 2026-09-07, and this project's comments assert
states the code no longer holds.** Every `file:line` above was re-verified against the live file
immediately before this record was written, by matching on declaration text rather than on a bare
name, and re-checked after the `§T4` change landed. Five stale-comment or stale-citation instances
are known and are recorded so nobody trusts them:

- `hero-mark-light.ts:1341` states the 1440 headline ink as `[144,279,1296,573]`, a right edge of
  **1296**, where the measured value before Decision A was **1054.2** and after it is **996.2**. The
  reasoning in that block still holds; its numbers do not.
- The `/* §31 */` right-pad sentence describes a design that §37 reverted. See rejected path 2.
- Three beam comments quoted the literal `0.085` and `72` after those values had been replaced; they
  were updated to name the constants when `BEAM_HEAD_FRAC` was hoisted.
- **`globals.css:1458`, inside Decision A's own comment block, ends "See hero-mark-light.ts :1284."
  That line reference is already stale: `const floor` is at `:1338`.**
- `HD-measure-desktop-P.md:49` and `:129` state that the `dropped` stage is "never reached on
  desktop". **True only of the `>= 1280` that report swept.** See the scope correction in Context.

**Never trust a comment or an inherited line number in this file tree over the live code. And never
generalise a negative result past the range that produced it.**

## Revisit criteria

- **The owner comments on the desktop hero P's SIZE or POSITION in any direction**, or on the hero
  headline's size. Either reopens the trade this ADR settles, because they are now one trade.
- **The owner objects again at laptop widths (roughly 1024 to 1148).** That is the trigger for
  rejected path 4, and the values are already priced: `4.93rem` for 1099, `4.61rem` for 1024.
- **The owner comments on the beam's speed, brightness or thickness**, or asks for arrive-then-rest
  rather than a continuous lap. The speed lever is one constant (`:98`); arrive-then-rest is a change
  to the time remap, not a constant.
- **The hero headline's copy, type scale, weight, tracking or line-height changing.** Any of these
  moves `headlineInk()`, which moves the keep-out and the guard, which changes how much of the mark
  paints AND where the ~1148 drop edge sits. This is the coupling these decisions introduce and it is
  the most likely way the composition breaks by accident.
- **`--container-max` changing from 1200px** (`globals.css:120`). `headlineRight = W/2 + 334.2`
  depends on it, and the whole mechanism above is derived from that identity.
- **`SCRIM_CLEAR` changing from 0.70** (`:979`), or the `70%` scrim release in
  `globals.css:1572-1584` changing without it.
- **A measured WCAG regression on any headline line**: `keepoutMaxAlpha` not 0 inside a
  `.ps-hero-line` ink rect, on the plate canvas or the beam canvas, or light accent contrast below
  3.05:1.
- **The portrait-tablet composition being questioned.** Decision 4 excluded it on the grounds that a
  centred mark under a portrait headline is correct; if anyone disagrees, that is a new decision.
- **`0012:70-75`'s phone-landscape composition being settled**, since landscape phones are `narrow`
  and sit just below Decision B's regime.
- **Anyone proposing to let the desktop glyph overhang the right viewport edge.** That needs the
  owner's explicit word, because it reverses two verbatim reversals of his.

## Sources

- Owner, 2026-09-07, verbatim: "now on desktop if looks like crap its now under the text when it
  should be under and to teh right side of it and bigget on desktop with the blue beam of light
  tracing around the P" - `ORCHESTRATOR-DECISIONS.md:2901-2903` in the run directory
  `~/.claude/agent-reports/bento-2026-09-07/`, recorded there as decision D73, with the
  three-part parse at `:2905-2906` and the ADR-0014 requirement at `:2908-2914`.
- Owner, 2026-09-06/07, the two reversals that any overhang proposal contradicts: "The P is too big
  now." / "IT IS ONLY SUPPOSED TO BE THAT BIG ON MOBILE BTW" - `0012:82-83`, quoted again in the live
  source at `hero-mark-light.ts:1467-1469`.
- `DECISIONS/0012-hero-p-crop-is-phones-only-desktop-reverts-and-hero-ctas-are-removed.md` - the
  clause `:79-84` this file voids, and the rulings at `:33-38`, `:43-45`, `:47`, `:48-49`, `:55-59`,
  `:70-75` that survive.
- `DECISIONS/0013-the-phone-hero-p-halves-and-moves-down-and-left-voiding-adr-0012s-byte-identical-phone-clause.md`
  - the preservations at `:99-104`, `:126-128` and `:208-209` that this file voids, and the revisit
  triggers at `:244-247` that authorised reopening them.
- `src/styles/globals.css` - read at `:120` (`--container-max: 1200px`), `:327`, `:788-792` (the
  144px axis), `:1405`, `:1444` (`.ps-hero-headline {`), `:1445-1458` (Decision A's comment block),
  **`:1459`** (the changed declaration), `:1572-1584` (the `70%` scrim release), `:1691`, `:3897`,
  `:3951-3952`.
- `src/components/home/hero-mark-light.ts` - read at `:66`, `:98-99`, `:124`, `:138`, `:156-157`,
  `:167`, `:173-174`, `:178`, `:182`, `:517`, `:521`, `:526`, `:690`, `:715`, `:766`, `:979`,
  `:1313-1320` (`fitInto`, including the centring term at `:1317`), `:1337-1338`, `:1341`, `:1442`,
  `:1455-1472`, `:1476-1508` (`§T4` and the right-aligned drop stage), `:1574`, `:1578-1585`,
  `:1595`, `:1733`, `:1806`, `:1815`, `:1885`, `:1912`. Every mechanism claim above cites a line in
  one of these two files, re-verified against the live file at md5
  `5789e2f814e8a2d97c5a43f7e966eb6c`.
- `~/.claude/agent-reports/bento-2026-09-07/H3b-hero-report.md` - the measured record.
  `:399-484` (the one-degree-of-freedom mechanism and the `SCRIM_CLEAR` trade), `:486-521` (the beam
  already traced the outline), `:563-680` (the beam constants, the duplicated head length, the
  join-ridging artifact), `:683-767` (the headline-shift experiment and the `§31` correction),
  `:815-857` (the 60-second observation that rejected 4000ms), `:913-989` (Decision A applied and the
  15-width built-state table), `:991-1073` (the headline band, the sub-1099 hashes, the hash nuance),
  **`:1078-1193` (Addendum 11: the scope correction, the impossibility proof, Decision B, its
  measured effect, its scope proofs and the rejected residual)**, `:1196-1253` (the stage and `gapX`
  table across 1099-1280, the bisected 1145/1152 edge, the 1136/1140 ambiguity).
- `~/.claude/agent-reports/bento-2026-09-07/H3b-hero-tail.md:1-95` - the three findings restated for
  this record (F1 root cause and fix, F2 landscape-only scope, F3 the rejected residual), and the
  four answers block. `:97-763` duplicates the report's addenda.
- `~/.claude/agent-reports/bento-2026-09-07/H3b-band.json` and `H3b-band.mjs` - the 30-row band
  measurement, superseded in scope by Addendum 11 but the source of the pre/post `gapX` figures. Note
  its `stage` field is derived by scale-matching at `H3b-band.mjs:37-39` and is therefore **not
  decisive at 1136 and 1140**; `belowHead` at `:40` is geometric and is.
- `~/.claude/agent-reports/bento-2026-09-07/HD-measure-desktop-P.md` - the independent per-width
  desktop table (`:53-73`), the crossover derivation (`:42-51`), the correction of two prior wrong
  numbers (`:24-40`), the rest-state beam reading (`:112-124`) that H3b's animated measurement
  corrects, and at `:49` and `:129` the "`dropped` is never reached" claim whose range bound this ADR records.
- `git show HEAD:src/components/home/hero-mark-light.ts` - read to confirm that Decision B's
  `portrait` gate predates this run and introduced no new threshold: **15 `portrait` occurrences**,
  `const portrait = H > W;` at HEAD `:1388`, `function terminalX(w: number, portrait: boolean)` at
  HEAD `:488`. Also used to confirm that **`BEAM_HEAD_FRAC` is the only new constant NAME in the
  whole working diff** and that every other changed `const` already existed at HEAD.
- `DECISIONS/README.md:19-23` - the immutability rule, and the reason ADR-0012's and ADR-0013's
  status lines were left unedited.
