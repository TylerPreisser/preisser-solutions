# ADR-0015: The hero "P" placement is the owner's own MEASURED ANCHOR TABLE, interpolated on width, at every viewport. One stage replaces the narrow/wide split, the ink guard is off everywhere, and the keep-out and all four alphas are untouched. This voids ADR-0013's phone geometry and ADR-0014's "neither change resizes the mark" clause.
Status: Accepted - 2026-09-07 (owner instruction, relayed verbatim by the run's team lead as a seven-row measured table) - Owner: Tyler Preisser
Supersedes / Superseded by: **Supersedes ADR-0013's phone geometry decision in full**, and **ADR-0014's clause that neither desktop change resizes the mark** (title line and Decision B). Every other clause of ADR-0012, ADR-0013 and ADR-0014 remains in force, including the removal of the hero CTAs (ADR-0012) and the retention of the beam trace (ADR-0014). Not superseded.

## Context

### What was true before

`src/components/home/hero-mark-light.ts` shipped two unrelated placements:

- **Below 768** the `bleeding` stage: a mark-derived crop anchored on the bowl/stem
  junction, driven by `MARK_HF_PORTRAIT` / `MARK_JF_PORTRAIT` / `terminalX()`
  (ADR-0013, section 39 in-file).
- **At and above 768** the `contained` stage: a contain-fit inside
  `[max(STAGE_PAD, W*SCRIM_CLEAR), W - STAGE_PAD]` with the ink guard armed and a
  right-aligned `dropped` fallback (ADR-0012 as amended by ADR-0014).

Measured on the running dev build, 2026-09-07, glyph tight ink box in CSS px:
393x852 `396x349`, 430x932 `433x382`, 768x1024 `422x372`, 1024x768 `254x224`,
1280x800 `360x318`, 1440x900 `408x360`, 1920x1080 `552x487`.

### What the owner actually did

He opened the real glyph in a drag-and-drop tool and positioned it against the real
headline metrics at **seven viewports**, then handed back the resulting tight ink box
for each. Origin is the top-left of the viewport, `w`/`h` are the tight box, and the
right gap is negative where the glyph bleeds off the right edge:

| viewport | x | y | w | h | right gap |
|---|---|---|---|---|---|
| 393x852 | 54 | 100 | 743 | 656 | -404 |
| 430x932 | 53 | 172 | 739 | 653 | -362 |
| 768x1024 | 218 | 142 | 878 | 775 | -328 |
| 1024x768 | 606 | 130 | 580 | 512 | -161 |
| 1280x800 | 834 | 170 | 535 | 472 | -90 |
| 1440x900 | 858 | 148 | 688 | 608 | -106 |
| 1920x1080 | 996 | 205 | 755 | 667 | +169 |

On treatment, verbatim:

> "Should be behind the text and lighter opacity on all just like it used to be"

### Why the existing constants could not carry this

- `contained` cannot reach it at all. At 1440 its stage begins at `0.70*W = 1008`,
  which is already 150px **right** of the target left edge of 858, and contain-fitting
  is by definition the operation that prevents the overflow six of the seven rows
  require. No value of `SCRIM_CLEAR` or `STAGE_PAD` fixes that.
- `bleeding` can hit any one row and no two. Its horizontal term is a fraction of `W`
  ramped on width while its size term is `hF*H`, so one triple resolves to a different
  ink box at every aspect ratio. This is the same failure section 39 recorded when it
  retired `NARROW_OVERHANG` for being a fraction of the mark's width.

The owner measured the **output**, so the honest parameterisation is the output.

## Decision

1. **Placement comes from `MARK_ANCHORS`**, one row per viewport the owner measured,
   storing the ink box as `hF` (height / H), `xF` (left / W), `yF` (top / H).
   `markAnchor(W)` interpolates piecewise-linearly on hero width and **clamps** at both
   ends. `hF` is derived from his `w` through the native 895:790, not from his `h`,
   because his `w` and `h` disagree by up to 0.2px and `w` is the axis the bleed is on.
2. **One stage at every width.** The narrow/wide split in `primary` is gone. The stage's
   `w`/`h` are the mark box's own dimensions at `s0`, so `fitInto()` returns exactly `s0`
   with both centring terms zero and `x`/`y` land the ink box corner directly.
3. **The ink guard is empty at every width.** Armed, it would test for the opposite of
   what was asked and the shrink/drop loop would ship neither his size nor his position.
4. **NOT allowed, and these are the things that keep getting re-added:**
   - Re-arming the ink guard on wide "to stop the mark sitting on the headline".
     ADR-0014's `dropped` stage and the twelve-step 0.96 shrink are now unreachable by
     design; they are not broken.
   - Lowering `MARK_FILL_A_*` / `MARK_EDGE_A_*` to buy contrast back. Section 32's
     compositing proof stands: `R = 246 - 142a` is still 2.98:1 at `a = 0.03`.
   - Narrowing the keep-out, scoping it to the accent line, or changing
     `KEEPOUT_MARGIN` / `KEEPOUT_FEATHER`.
   - Smoothing the table. `hF` is non-monotonic (it dips at 1280 and recovers at 1440)
     because he eyeballed seven independent placements. Smoothing substitutes a rule for
     a measurement at his own data points.
   - Restoring `contained`, `bleeding`, `terminalX()`, `JUNCTION_Y` or the `MARK_HF_*` /
     `MARK_JF_*` constants. They are voided, not deleted, because their comment blocks
     are the section 30 to 39 decision record.
5. **Treatment is unchanged and that is part of the decision, not an omission.** All four
   alphas, the layer order (overlay, plate, beam, type) and the keep-out are exactly what
   they were. If the mark reads heavier behind the type at this size, the alphas are the
   lever and moving them is a separate, stated decision.

## Consequences

- Growth, measured ink width before to after: 396 to 743 at 393 (1.88x linear), 433 to
  739 at 430 (1.71x), 422 to 878 at 768 (2.08x), 254 to 580 at 1024 (2.29x), 360 to 535
  at 1280 (1.49x), 408 to 688 at 1440 (1.69x), 552 to 755 at 1920 (1.37x). That is 1.9x
  to 5.2x by **area**. The brief estimated "roughly 8x"; the table is the target and the
  table is what shipped, and the two disagree.
- Legibility does not depend on the mark's size. `platePush` / `beamPush` are built from
  the measured ink boxes of every `.ps-hero-line`, so `punch()` drives plate alpha to
  exactly 0 inside every headline line however much mark is behind it.
- **Review agents must NOT flag:** the glyph bleeding off the right edge at every width
  except 1920; the glyph overlapping the headline in z-order; `dropped` and the shrink
  loop being unreachable; the voided constants; the non-monotonic `hF`; or the desktop
  mark no longer being contained in the right column.
- **Revisit triggers:** the owner comments on the hero P's size, position or crop at any
  viewport in any direction; or he asks for the opacity to change, which this ADR
  deliberately did not touch.
