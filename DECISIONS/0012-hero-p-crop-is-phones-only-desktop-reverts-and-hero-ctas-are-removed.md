# ADR-0012: The magnified hero "P" crop is PHONES ONLY, desktop returns to the contained fit, and the hero CTA buttons are removed
Status: Accepted — 2026-09-07 (owner instruction, relayed verbatim mid-run) — Owner: Tyler Preisser
Supersedes / Superseded by: **Supersedes ADR-0011.** Not superseded.

## Context

ADR-0011 (2026-09-06) applied the magnified-fragment crop to BOTH viewport regimes and
re-pointed `layout()`'s wide branch at a mark-derived stage. That was shipped to a worktree and
shown to the owner. **He rejected the desktop half**, verbatim:

> "The P is too big now."
> "IT IS ONLY SUPPOSED TO BE THAT BIG ON MOBILE BTW"

Separately, asked directly whether the hero call-to-action buttons should be kept or removed:

> "remove ctas"

**ADR-0011's scope was wrong and the file was right.** `hero-mark-light.ts:299-300` and commit
`60c08fb`'s message both already recorded "these P changes were only supposed to be for mobile".
That in-file instruction was overridden by orchestrator decision D3 in `CROP-ANCHOR.md` on the
reasoning that the owner's original dump said "the hero section" with no breakpoint qualifier.
**D3 is void.** The lesson is cheap and worth keeping: a specific, dated instruction preserved in
the code outranks an inference drawn from an ambiguous later phrasing.

The hero CTAs were added by `21b1346` ("fix(home): restore the hero CTAs at phone widths") from a
different session at 18:14, not by this run.

## Decision

1. **The magnified crop is NARROW ONLY — `W < NARROW_MAX` (768).** Bowl exits the top, leg and
   bottom-left terminal are the subject. `MARK_HF_PORTRAIT 2.05`, junction anchoring, and
   `terminalX()` are unchanged from ADR-0011 for phones. This is the half the owner approves of.
2. **The wide branch (>= 768) is restored to its `5aa93bc` behaviour**: the `contained` contain-fit
   stage, with the ink `guard` armed (`narrow ? [] : rects`) so the shrink/`dropped` loop works
   again. A whole, modest, centred glyph. Measured after the revert, painted ink box, chromium dark:
   768x1024 **450.7x398.7** · 820x1180 **545.3x481.3** · 1024x768 **282.7x249.3** ·
   1280x800 **272x240** · 1440x900 **410x362** · 1920x1080 **554.7x489.3** — matching the
   pre-change baseline to within one pixel at every width.
3. **THE REGIME BOUNDARY IS THE 768px BREAKPOINT, NOT AN ORIENTATION TEST.** ADR-0011 briefly split
   on `H > W`, which sent portrait TABLETS (768x1024, 820x1180) down the phone path. Tablets are
   not "mobile". Below 768, `portrait` still selects the crop's proportions for a ROTATED phone —
   that is a parameter choice inside the phone regime, not a regime boundary.
4. **The hero CTA buttons are removed** from `src/components/home/hero.tsx`, with their CSS. Removed,
   not hidden: no `display:none`, no `opacity:0`, no commented-out markup. The conversion path is
   the header "Reach out" button and the scroll cue.
5. **NOT allowed, because each reverts an owner decision:**
   - Re-pointing the wide branch at a mark-derived stage, or emptying the wide ink guard.
   - Restoring the hero CTAs. **Another session may still be running and may try.** Anyone who
     "fixes" the missing hero buttons is undoing an explicit instruction — cite this ADR.
   - Enlarging the phone crop because removing the CTAs freed vertical space. The phone geometry is
     approved as-is and must stay byte-identical.

## Consequences

- **The keep-out / `platePush` STAYS and is unchanged.** It is WCAG-load-bearing for the HEADLINE,
  which is not going anywhere. Verified after both changes: max plate alpha inside every
  `.ps-hero-line` ink rect is **0** across 84 runs (14 viewports x 2 themes x 3 engines);
  worst accent contrast **3.07:1** light, worst non-accent **17.16:1**. No part of the keep-out was
  CTA-specific, so nothing was removed from it.
- Removing the CTAs removed one entrance anchor. `ENTRANCE_ANCHORS` drops `ps-hero-ctas`;
  `ps-hero-line` is the load-bearing one because `layout()` measures the headline's ink.
  `@keyframes ps-hero-rise-sm` (16px) existed only for the CTAs and is deleted with them.
- The CTA click test is void — there are no CTAs. Replaced by checks that nothing else in the hero
  became unreachable, overlapped, or shifted into the glyph.
- ADR-0011's numeric target table, gate definitions and the B2/B3/B4 spec conflicts it recorded
  remain accurate **for phones**. Its desktop claims are superseded by this file.

## Open / not yet decided

- **Phone-in-landscape.** A4 measured, at a VISIBLE-ink threshold (alpha > 48, not the permissive
  alpha > 8 which passes this blind), that a rotated phone loses the leg and terminal entirely:
  at 659x393 the two middle quarter-bands hold ZERO visible pixels, confirmed on real Safari.
  `s0 = hF * H / MARK_H` is height-only, so rotating shrinks the glyph ~53% while the frame
  doubles in width. **This ADR does not settle the landscape composition**; it is being fixed
  separately and a phone in landscape must still show the leg and the bottom-left terminal.
- Whether the hero needs any in-page conversion affordance now that the CTAs are gone. The owner
  said remove; he did not say what, if anything, replaces them.

## Status note for review agents

While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. **In particular, the
absent hero CTAs and the modest desktop P are both intentional.** Objections go under "Decision
Concerns" citing this ADR number — never as a bug or a blocking finding.

## Revisit criteria

- The owner asks for hero CTAs back, or for the desktop P to bleed again.
- A measured WCAG regression on any headline line (C1 plate alpha != 0, or accent below 3.05:1).
- Conversion data showing the hero needed an in-page CTA.

## Sources

- Owner, 2026-09-06/07, relayed verbatim: "The P is too big now." / "IT IS ONLY SUPPOSED TO BE THAT
  BIG ON MOBILE BTW" / "remove ctas" / "why you put the buttons back?"
- ADR-0011 — the superseded decision, and the phone geometry that survives it.
- `hero-mark-light.ts:299-300` and commit `60c08fb` — the in-file instruction that was right.
- Commit `21b1346` — added the hero CTAs; this ADR removes them.
- A4's responsive audit — the phone-landscape defect recorded under Open.
