# FarmBooks Proof Stage — source and transforms

Pinned snapshot of the FarmBooks showcase (farm-books.com), read from
`~/Desktop/Preisser Solutions/FarmBooks/Farm Invoice Processing System/web` at
**sha `8cbbbb4`** (working tree clean at that commit; confirmed with
`git rev-parse --short HEAD` in that repo). This is a **pinned copy, not a live
mirror** — it does not follow farm-books.com automatically. If the real product's
showcase changes, this scene does not change with it; a future pass re-pins a new sha
and redoes the transforms below by hand.

Full read-only transplant analysis: `~/.claude/agent-reports/ps-showcase-initiative/spec-FB.md`.
Binding kit contract: `~/.claude/agent-reports/ps-showcase-initiative/BLUEPRINT.md` §3–§7, §11
"Lane FB". Governing decision: `DECISIONS/0016-*.md`.

## Files, and what each came from

| This file | Source (all `@8cbbbb4`) | Kept | Dropped |
|---|---|---|---|
| `FarmBooksStages.tsx` | new | the `MotionConfig reducedMotion="user"` wrapper (`app/layout.tsx:59`) | — |
| `TheRead.tsx` | `components/showcase/the-read.tsx` (857 ln) | `REGIONS`, `SORTED`, `LINE_CENTS`/`PRINTED_TOTAL`, `FieldTable`/`CategoryCard`/`ArithmeticTape`/`BooksCard`/`CameraCheckCard` as plain markup | `ScrubbedRead` (the 560vh pinned scrub), `CameraFrame`/`GateChip` (no replacement) |
| `TheBooks.tsx` | `components/showcase/dashboard-3d.tsx` (420 ln) | `MONTH`, `LedgerRow` markup, the `MonthRollup` card face | `Stage`/`Panel`/`useDeck`/`useStage3D` (pointer-parallax CSS-3D) |
| `WhatGoesWrong.tsx` | `components/showcase/pain-points.tsx` (617 ln) + `results.tsx:51-59` (`Finding`, inlined) | the three scenarios' paper/fix/resolution content, as pure CSS (no motion) | `Beat`/`Turn`/`Rule`'s `motion.div` reveals; per-scenario stagger (one reveal per card, not per sub-beat) |
| `TheYear.tsx` | `components/showcase/workbook-dashboard.tsx` (497 ln) | `WORKBOOK`, `VIEWS`, the tile row, `Row` markup, the footer line | the `motion.div`/`motion.figure` reveal wrappers; `public/samples/workbook-year.png` (replaced with an HTML table, see below) |
| `WheatAgent.tsx` | `components/showcase/wheat-agent.tsx` (397 ln) | everything — only the import line changed (`./tokens` → `./fb-motion`) | nothing |
| `fb-motion.ts` | `components/showcase/tokens.ts` (210 ln) | `GOLD_MARK`, `AMBER_EYES`, `EASE_OUT`, `EASE_IN_OUT`, `SPRING_SOFT` (the only 5 constants `WheatAgent.tsx` needs) | every page-chrome / scroll-reveal / scrub-plumbing export |
| `category-icons.tsx` | `components/field/category-icons.tsx` (172 ln) | verbatim, whole file | — |
| `icons.tsx` | `components/icons.tsx` | `Check`, `Doc`, `Ruler`, `Spreadsheet`, `base()`, `IconProps` only | every other icon |
| `money.ts` | `lib/format.ts:76-86` (`money` only) | verbatim | `displayAmount`, `isMoneyLabel`, `stampLine`, etc. — unused here |
| `hero-total.tsx` | `components/field-ui.tsx:105-123` (`HeroTotal` only) | verbatim logic, codemodded classes | — |
| `farmbooks.css` | `app/globals.css:22-61` (LIGHT block only) | the full `--fb-*` triplet set | every `[data-theme="dark"]`/`[data-tod]` block |

## The step engine, and why the reveal differs from the source

ADR-0016 §3 replaces every scroll-scrubbed and pointer-driven transform with the kit's
`useStageTimeline` step engine (`data-stage-step`, arm/go/disarm). Two consequences worth
recording, because a future editor comparing this file to the live site will otherwise wonder why
the motion doesn't match:

1. **The engine's reveal is additive** (an element arrives at its step and *stays*), where the
   source's `ScrubbedRead`/`Layer` panels *crossfaded* — each beat's artifact replaced the one
   before it as the reader scrolled. Rather than fake a vanished crossfade, `TheRead.tsx` renders
   all six reading cards stacked, each landing at its own step and remaining visible — "everything
   the app read, as it read it." This is a deliberate design call within this lane's scope, not an
   oversight.
2. **`TheYear.tsx`'s cut switcher is NOT the kit's `TabbedScreen`.** `TabbedScreen` owns the whole
   beat body once a beat declares `tabs`, which leaves no room for the export pane the beat also
   needs (spec-FB §6). Instead the switcher is a pure-CSS radio-tab pattern — three `<input
   type="radio">` plus `:checked ~ …` selectors in `farmbooks.css` — so every cut is always in the
   markup and no JavaScript is required for it to work at all, honoring the same "all cuts in the
   markup" rule `TabbedScreen` itself follows, without literally being it.

## The excel export: an HTML recreation, not the screenshot

`public/samples/workbook-year.png` (the source's 3000×1933 screenshot of a real `.xlsx` export)
prints all nine real vendor names in pixels and is **not transplanted**, per spec-FB §6 and
critique-brief.md objection 3e. `TheYear.tsx`'s `ExportTable` is a literal `<table>` built from the
*same* `WORKBOOK` fixture the on-screen dashboard reads, inside a `ProductScreen scroll` region
(`min-width: 960px` on the table only, never the outer frame) — so the dashboard and the "exported
file" view can never show two different years, by construction.

## Money representation

Fixture amounts in `src/data/demos/farmbooks.ts` are plain dollar floats, ported verbatim from the
source's own literals (which are exact to the cent, never computed by float arithmetic beyond a
simple sum) — **not** rewritten as the kit's integer cents. The one place integer cents are
required by the contract is the `data-count-to` counter on the read beat's arithmetic tape
(`READ_LINE_SUM_CENTS`, `data-count-format="usd-cents"`), which is derived from the same dollar
figure. Every total in the fixture is a `reduce`/getter, never typed a second time, and three
module-level invariant checks throw at import time if an edit ever breaks the arithmetic the
captions promise (the four read lines vs. the printed total; the vendor cut vs. the category
total; the field cut vs. the category total).

## Privacy

- The nine real vendor names at `workbook-dashboard.tsx:76-86`, the source's own placeholder farm
  name, and its legal land description with a highway reference are all renamed to
  registered inventions in `src/data/demos/invented/farmbooks.ts`, using the FINAL names cleared by
  the lead 2026-09-28 (WebSearch, exact-phrase queries) — see spec-FB.md §5a for the full candidate
  history, including four rejected names.
- The photographed vendor, "Prairie General Farm Supply", and its invoice/amounts were already
  invented in the source and are kept, re-cleared under the same process.
- **Known, inherited risk — not fixed by this transplant.** The photograph itself
  (`public/samples/fuel-ticket-photo.jpg`, copied byte-for-byte to
  `public/images/demos/farmbooks/fuel-ticket-photo.jpg`) prints, in its pixels, three things this
  scene's markup and alt text deliberately never repeat: a placeholder payer name printed twice on
  the bill ("FROM"/"BILLED TO"), a small invented "CUSTOMER ID" number, and a short line of garbled,
  evidently AI-generation-artifact text near the bottom. The source file (`the-read.tsx:201-204`)
  made the same judgment call already shipped on farm-books.com: never read the payer name off the
  page, box nothing that names it, and word the alt text around it. This scene's alt text follows
  the same pattern. Re-shooting or editing the photograph is out of this lane's scope; flagging it
  here is the mitigation this pass can make.
- The two real-name smoke-test deny lists (`pain-points.smoke.test.tsx:180-182`,
  `workbook-dashboard.smoke.test.tsx:127-132`) were read for their real-name *inventory* only and
  are not transplanted as files; none of those strings appear anywhere in this directory.

## Risks carried over from the read-only spec pass, still open here

- `.tnum`'s exact CSS body (beyond `font-variant-numeric: tabular-nums`) was never read past
  `app/globals.css:140` in the source repo. `.fb-tnum` in `farmbooks.css` reproduces the standard
  behavior; if the real rule does more, this recreation silently diverges.
- `icons.tsx`'s `base()` helper was read in full this pass (unlike the original spec's gap) and is
  ported verbatim above.
