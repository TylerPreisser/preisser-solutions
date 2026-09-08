# ADR-0013: The PHONE hero "P" is halved and moved down-and-left, voiding ADR-0012's "byte-identical" phone clause. Desktop is untouched.
Status: Accepted - 2026-09-07 (owner instruction, relayed verbatim mid-run, recorded at `ORCHESTRATOR-DECISIONS.md:1628-1629`) - Owner: Tyler Preisser. EXTENDED, NOT REPLACED, BY ADR-0014: this ADR's phone decision stands in full, but its re-affirmations of ADR-0012's desktop clause at `:99-104`, `:126-128` and `:208-209` are void, because ADR-0014 supersedes `0012:79-84`. Read ADR-0014 for anything desktop.
Supersedes / Superseded by: **Supersedes ADR-0012 clause 5 bullet 3 only** (`DECISIONS/0012-hero-p-crop-is-phones-only-desktop-reverts-and-hero-ctas-are-removed.md:50-51`). Every other clause of ADR-0012 remains in force **except `0012:79-84`, which ADR-0014 supersedes.** **NOT superseded. EXTENDED by ADR-0014**, which voids only this ADR's re-affirmations of that desktop clause at `:99-104`, `:126-128` and `:208-209`. This ADR's phone decision stands in full.

## Context

### Why this file exists at all

ADR-0012 was Accepted **the same day as this record, 2026-09-07** (`0012:2`). Its clause 5
bullet 3 forbids, verbatim (`0012:50-51`):

> Enlarging the phone crop because removing the CTAs freed vertical space. The phone geometry is
> approved as-is and must stay byte-identical.

A reader who finds "must stay byte-identical" and then sees a changed phone constant will conclude
the change is a regression and revert it in good faith. **That is the failure this ADR exists to
prevent, and it has already happened on this project in the opposite direction:** orchestrator
decision D3 in `CROP-ANCHOR.md:55` ("SCOPE: BOTH viewport regimes are in scope. Not phone-only.")
was accepted by an agent, shipped, rejected by the owner, and had to be declared void at
`0012:22`.

The request also falls **outside ADR-0012's own revisit triggers.** `0012:88` reads "The owner asks
for hero CTAs back, or for the desktop P to bleed again." Neither covers *shrink the phone P and
reposition it*. A trigger that narrow cannot authorise a quiet constant edit, so the change needs
its own record.

### What the owner actually said

Verbatim, 2026-09-07, recorded at `ORCHESTRATOR-DECISIONS.md:1628-1629`:

> you never fixed the p up in the hero sectoin is it too big decrease it to be ab half the size it
> is now and then move it down and left accordingly

The phrasing carries no breakpoint qualifier, which is exactly the ambiguity that produced void D3.
So it was put back to the owner directly: desktop, phone, or both.

> **The owner answered PHONE ONLY.**

> **Unverified:** the owner's "phone only" answer is relayed by this run's team lead and is not
> preserved verbatim in any file in the repository or the run directory as of writing. Searched
> `ORCHESTRATOR-DECISIONS.md` (95,876 bytes, last written 09:21) for "phone only" / "PHONE-ONLY":
> zero matches. What would confirm it: the owner's message pasted into
> `ORCHESTRATOR-DECISIONS.md` under a numbered decision, as `D40` did for the instruction itself.
> **This ADR rests on that answer. If the relay is wrong, this ADR is wrong.**

**This is a dated owner instruction, not an agent inference.** `0012:22-23` already recorded the
lesson that makes the distinction load-bearing:

> a specific, dated instruction preserved in the code outranks an inference drawn from an ambiguous
> later phrasing.

D3 was an inference drawn from ambiguous phrasing and it was void. This is the instruction, asked
and answered. It outranks the same-day clause it voids for exactly the reason `0012:22-23` gives.

### Why phone-only is a coherent scope and not a half-measure

The two regimes are sized by two unrelated mechanisms. Read at
`src/components/home/hero-mark-light.ts`, current at time of writing:

- **The regime boundary is the 768px breakpoint.** `narrow = W < NARROW_MAX;` (`:1509`), with
  `const NARROW_MAX = 768;` (`:66`). Confirms `0012:39` and `0012:30`.
- **Phone scale is one constant.** `const MARK_HF_PORTRAIT = 2.05;` (`:463`) feeds
  `const hF = portrait ? MARK_HF_PORTRAIT : MARK_HF_LANDSCAPE;` (`:1389`) and then
  `const s0 = hF * H / MARK_H;` (`:1391`), which sizes the `bleeding` stage (`:1392`).
- **`hF` cannot reach desktop.** `const primary = narrow ? bleeding : contained;` (`:1418`). The
  `bleeding` stage, and therefore `hF`, is selected only when `narrow`. Halving `hF` is a
  no-op above 768.
- **Desktop has no scale constant at all.** It derives scale structurally inside `fitInto`:
  `const sCss = Math.min(st.w / MARK_W, st.h / MARK_H) * shrink;` (`:1260`), with
  `MARK_W = 895, MARK_H = 790` (`:124`), applied to
  `const contained = { x: floor, y: STAGE_PAD, w: W - STAGE_PAD - floor, h: H - STAGE_PAD * 2 };`
  (`:1416`). There is no number to halve on desktop, only a rect, which is why a desktop change
  would be structural rather than a constant edit.
- **The ink guard is armed on WIDE only.** `const guard: typeof rects = narrow ? [] : rects;`
  (`:1488`). Phone placement is therefore exact, taken straight from `fitInto(primary, 1)`
  (`:1489`). On desktop the same code runs `for (let k = 0; k < 12; k++)` shrinking by
  `Math.pow(0.96, k)` (`:1492-1493`) across `[primary, dropped]` (`:1490`) and falls through to
  `return last;` (`:1499`) if nothing clears the headline. A desktop "move it left" pushes the
  glyph into the headline's column, fires the guard, and returns a size nobody typed in.

So: on phones the instruction is a constant edit with an exact, predictable result. On desktop the
same instruction is a structural rewrite with an automatic corrective loop in the middle of it.
Scoping to phones is what the owner asked for and it is also the only regime where the operation
is well-defined.

## Decision

1. **On phones only (`W < NARROW_MAX`, 768), the hero "P" is reduced to approximately half its
   current size and moved down and left.** The size lever is `MARK_HF_PORTRAIT` (`:463`). The
   horizontal lever is `TERM_X_PHONE` (`:472`, currently `0.150`) through `terminalX()`
   (`:488-495`). The vertical lever is `MARK_JF_PORTRAIT` (`:467`, currently `0.0`), which
   `:1394` applies as `y: jF * H - (JUNCTION_Y - MARK_Y0) * s0`.
   **`SCRIM_CLEAR` (`:925`) is NOT the phone lever.** It reaches the composition only through
   `const floor = Math.max(STAGE_PAD, W * SCRIM_CLEAR);` (`:1284`), and `floor` is read at exactly
   one place, `contained` (`:1416`), which is the DESKTOP stage. Editing `SCRIM_CLEAR` to move the
   phone P moves the desktop P instead and changes nothing on a phone.
2. **`0012:50-51` is VOID.** The phone geometry is no longer byte-identical and its being changed
   is not a defect. Cite this ADR.
3. **Desktop is untouched, and every desktop ruling in ADR-0012 SURVIVES.** `0012:33` (the wide
   branch stays at its `5aa93bc` contain-fit behaviour, ink guard armed), `0012:36-38` (the
   post-revert per-viewport ink measurements), `0012:47` (no re-pointing the wide branch at a
   mark-derived stage, no emptying the wide ink guard) and `0012:79-84` (**"the modest desktop P
   is intentional"**) all remain binding. A desktop ink box that still matches `0012:36-38` after
   this change is CORRECT, not a missed edit.
4. **Everything else in ADR-0012 survives too.** The 768 regime boundary (`0012:39-42`). The
   removed hero CTAs and the prohibition on restoring them (`0012:43-45`, `0012:48-49`). The
   `platePush` keep-out (`0012:55-59`, and see `hero-mark-light.ts:446`, `:1350`, `:1598-1600`).
   The void status of `CROP-ANCHOR.md` D3 (`0012:22`). The open phone-landscape defect
   (`0012:70-75`).
5. **Inherited phone rulings.** `0012:65-66` states: "ADR-0011's numeric target table, gate
   definitions and the B2/B3/B4 spec conflicts it recorded remain accurate **for phones**. Its
   desktop claims are superseded by this file." Those inherited phone rulings survive **except
   where this ADR's halved size and new anchors override them**. In particular ADR-0011's
   `hF` **2.05 portrait** (`0011:48`) and `fTx` **0.150 on phones** (`0011:50`) are the values
   this ADR changes, and any gate that asserts them numerically is superseded on phones by the
   values recorded below.
   > **Unverified:** which specific gates in `A2-target-spec.md` and `A4-adjudication.md` assert
   > `hF 2.05` or `fTx 0.150` as a pass condition. Those files are agent-authored and live outside
   > the repository at
   > `~/.claude/work-orders/artifacts/preisser-hero-bento-20260906/`; they were not read line by
   > line for this record. What would confirm it: a gate-by-gate re-adjudication against the new
   > constants.
6. **NOT allowed, because each reverts an owner decision:**
   - Restoring `MARK_HF_PORTRAIT` to `2.05`, or reverting `TERM_X_PHONE` / `MARK_JF_PORTRAIT`, on
     the authority of `0012:50-51`. That clause is void, see Decision 2.
   - Applying the halving to desktop. `hF` does not reach desktop (`:1418`), so an implementer who
     "completes" the change by shrinking the `contained` rect or introducing a desktop scale factor
     is reverting `0012:79-84`.
   - Moving the desktop P left via `SCRIM_CLEAR` (`:925`). It is a desktop lever and this change
     does not touch desktop.
   - Enlarging the phone crop back toward one hero-height on the reasoning that the halved glyph
     "no longer bleeds". The bleed is not the target; the owner's stated target is half the size,
     down and left.
   - Editing the `void`ed `NARROW_*` (`:500`) or `WIDE_*` (`:712`) constants expecting a visual
     change. Nothing reads them.
7. **Exception:** none. A further change of phone size or anchor needs a new superseding ADR naming
   who asked.

## Measured before and after

> **PENDING, NOT YET MEASURED.** The implementer's report (`H3-hero-p-phone-change.md` in the run
> directory `~/.claude/agent-reports/bento-2026-09-07/`) did not exist when this record was
> written, and `src/components/home/hero-mark-light.ts` was unmodified in `git status` with
> `MARK_HF_PORTRAIT` still at `2.05` (`:463`). **No after-values are asserted here. Do not read
> the blanks as passing.** Whoever lands the change fills this table in a follow-up ADR or an
> amendment note, since an Accepted ADR is immutable (`DECISIONS/README.md:18-23`).

**BEFORE, measured** by H1 (chromium, `deviceScaleFactor: 2`, against the built `out/`, painted
ink via `ctx.getImageData`, not `getBoundingClientRect`), recorded at
`~/.claude/agent-reports/bento-2026-09-07/H1-hero-p-BOTH-READINGS.md:205-218`:

| viewport | `sCss` | painted ink, CSS px | ink position, CSS px | coverage |
|---|---|---|---|---|
| **390x844** (phone, in scope) | **2.1901** | **334 x 740** | x 57–390, y 0–739 | 21.3% |
| 768x1024 (tablet, wide path) | 0.4711 | 424 x 375 | x 172–595, y 627–1001 | not recorded |
| **1440x900** (desktop, must NOT move) | **0.4559** | **410 x 362** | x 1007–1417, y 269–630 | 4.59% |

The 1440x900 row is the regression anchor for this change: `410 x 362` also appears in `0012:37`
and was independently re-measured by H1 (`H1:212-213`). **If desktop ink is not still 410 x 362 at
1440x900 after the phone edit, the change leaked out of its scope.**

**AFTER, required:** measured phone ink at 390x844 showing the glyph roughly halved from
`334 x 740`, and measured desktop ink at 1440x900 showing `410 x 362` unchanged.

## Consequences

### Light-theme contrast

`0012:57-58` records the pre-change worst case:

> max plate alpha inside every `.ps-hero-line` ink rect is **0** across 84 runs (14 viewports x 2
> themes x 3 engines); worst accent contrast **3.07:1** light, worst non-accent **17.16:1**.

Against the 3:1 large-text floor that is **0.07 of margin** on the light accent line. (`0011:74`
states the same 3.07:1 measurement but calls it "0.02 above the 3:1 large-text floor". 3.07 minus
3.00 is 0.07; the ADR-0011 figure appears to be an arithmetic slip. Both files are Accepted and
immutable, so this is recorded, not corrected.)

This margin is bought by the `platePush` keep-out, which erases mark ink over headline ink
(`:1350`, `:1598-1600`), and `0012:55-59` keeps it unchanged. Moving the phone glyph down and left
moves mark ink relative to the headline's ink rects, and because the phone guard is empty
(`:1488`) nothing auto-corrects a bad landing. So the contrast must be re-measured on phones after
the change.

> **PENDING, NOT YET MEASURED.** The post-change light-theme worst accent contrast is not recorded
> here because the change had not landed. **If the measured value is below 3:1 that is a BLOCKING
> finding and the change does not ship**, and this ADR does not pre-authorise shipping it. This
> paragraph is the instruction to measure, not a claim that it passed.

### For implementers

- Phone and desktop are two separate edits with no shared lever. `hF` halves phones only
  (`:1389`, `:1418`); the `contained` rect sizes desktop only (`:1416`).
- Phone placement is exact, so what is typed is what renders (`:1488-1489`).
- The resize handler already watches height as well as width (`0011:78-81`), so a shorter phone
  hero from a collapsing iOS toolbar re-derives `s0` from the live `H` (`:1391`) rather than
  keeping a stale scale.
- `terminalX()` clamps: `Math.min(0.40, Math.max(TERM_X_PHONE, t))` (`:491`). Lowering
  `TERM_X_PHONE` lowers both the clamp floor and the ramp, so the terminal does move left. Raising
  the clamp is not needed for a leftward move.

### What review agents must NOT flag

- `MARK_HF_PORTRAIT` differing from `2.05`, or `TERM_X_PHONE` / `MARK_JF_PORTRAIT` differing from
  `0.150` / `0.0`. `0012:50-51` no longer applies.
- A phone hero "P" that is smaller than the magnified fragment ADR-0011 specified, or that sits
  lower and further left than `0011:48-51`.
- The desktop P remaining modest and centred in the right column. That is `0012:79-84` and it is
  intentional.
- Absent hero CTAs. Still `0012:43-45`.

## Open / not yet decided

- **What "about half" resolves to numerically.** The owner said "ab half the size it is now". Half
  of `hF 2.05` is `1.025`, but ink height is not linear in `hF` once the junction anchor at
  `:1394` moves the glyph relative to the frame, and the owner's own criterion is visual. This ADR
  fixes the direction and the levers, not the digits.
- **How far down and how far left.** "accordingly" is not a number. `0012:70-75`'s open
  phone-landscape defect (a rotated phone at 659x393 holding zero visible pixels in the two middle
  quarter-bands) is still open and interacts with any vertical move.
- **Whether the halved glyph still reads as a magnified fragment at all,** which was ADR-0011's
  stated intent (`0011:43-46`: a render showing the whole bowl and top bar FAILS). A P at half
  scale may stop bleeding off the top. **The owner's instruction is size and position; he did not
  say whether the fragment reading must survive it.** Not resolved here.
- All PENDING items above: the after-measurements and the post-change contrast number.

## Status note for review agents

While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective.
Do not flag it, do not "fix" it, do not revert it to satisfy `0012:50-51`. Objections go under
"Decision Concerns" citing this ADR number, never as a bug or a blocking finding. Disagreement with
a settled decision is resolved by a NEW superseding ADR, never by editing this one.

**One exception to "do not flag":** the PENDING items in this file are genuinely unmeasured. A
review that reports "the after-values were never filled in" or "the post-change contrast was never
measured" is reporting a real gap, not objecting to a decision.

## Revisit criteria

ADR-0012's triggers were too narrow to cover this request, which is the specific failure this
section corrects. These are written to catch a size or position instruction whatever words it
arrives in.

- **The owner comments on the hero P's SIZE at any viewport,** in any direction: bigger, smaller,
  "too big", "too small", "half", "double". Includes desktop, which this ADR does not touch.
- **The owner comments on the hero P's POSITION or CROP at any viewport:** up, down, left, right,
  centred, "off the edge", which part of the letter should be in frame.
- **The owner asks for a scope change on either regime,** including asking that a phone-only change
  be applied to desktop or the reverse. This is the exact trigger `0012:88` was missing.
- A measured WCAG regression on any headline line: plate alpha not equal to 0 inside a
  `.ps-hero-line` ink rect, or light accent contrast below 3.05:1 (`0012:89`).
- The desktop ink box at 1440x900 departing from `410 x 362` (`0012:37`,
  `H1-hero-p-BOTH-READINGS.md:208`), which would mean a phone-scoped change leaked.
- The headline copy or type scale changing enough to move `headlineInk()`, which moves the keep-out
  (`0011:114-115`).
- The phone-landscape composition being settled, since it shares `hF` and `jF` through `:1389-1391`.

## Sources

- Owner, 2026-09-07, verbatim: "you never fixed the p up in the hero sectoin is it too big decrease
  it to be ab half the size it is now and then move it down and left accordingly" -
  `ORCHESTRATOR-DECISIONS.md:1628-1629` (run directory
  `~/.claude/agent-reports/bento-2026-09-07/`), recorded there as decision D40.
- Owner, 2026-09-07, answering the scope question: PHONE ONLY. Relayed by the run's team lead.
  **Not preserved verbatim in any file at time of writing.** See the marked block in Context.
- `DECISIONS/0012-hero-p-crop-is-phones-only-desktop-reverts-and-hero-ctas-are-removed.md` - the
  ADR whose clause 5 bullet 3 (`:50-51`) this file voids, and whose every other clause survives.
- `DECISIONS/0011-the-hero-p-is-a-magnified-fragment-that-bleeds-off-the-hero-in-both-regimes.md` -
  the phone constants (`:48-51`) this change edits.
- `src/components/home/hero-mark-light.ts` - read at `:66`, `:124`, `:463-472`, `:488-495`,
  `:1260`, `:1284`, `:1389-1394`, `:1416-1418`, `:1488-1499`, `:1509`. Every mechanism claim above
  cites a line in this file.
- `~/.claude/agent-reports/bento-2026-09-07/H1-hero-p-BOTH-READINGS.md:205-218`, `:290-318` - the
  before-measurements and the shrink/drop loop trap.
- `~/.claude/work-orders/artifacts/preisser-hero-bento-20260906/CROP-ANCHOR.md:55` - void decision
  D3, the precedent for why an inferred scope gets reverted. Note this file is NOT at the repo
  root; `0012:20` cites it without a path.
