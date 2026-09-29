# SOURCE — `preisser-back-office` / `deposit-matcher`

Lane BO, 2026-09-28, updated the same day after `review-BO.md` (PR #10,
MERGE AFTER FIXES) found two invented outcomes — see "What this stage
simplifies" below, "The collision" and "The repeat deposit". Read-only
research; nothing in ps-admin or this website was modified in the course of
building or fixing this stage.

## ps-admin sha

`git -C "<ps-admin repo>" fetch origin && git rev-parse origin/main` →
**`389aa891510e7b1b7a1610b0ca321134b6e0b628`**, read the same session this
stage was built.

`~/.claude/agent-reports/ps-showcase-initiative/spec-BO.md` (the content spec
this stage implements) cites an earlier sha, `0bcb4ab`, and says plainly "the
Money tab changed today; pin what you drew." The Money tab changed again
between that sha and `389aa89` (`git log --oneline` on
`panel/src/screens/money/ReviewView.tsx` shows two more commits, `c394b2d` and
`e095fca`, since `0bcb4ab`). Every fact this stage relies on was **re-read at
`389aa89`** before being used, not carried over from the spec unchecked. All
citations below are file:line at `389aa89`, `origin/main`, never the local
working tree (which is 131+ commits behind and has uncommitted edits).

## Files read (git show origin/main:<path>, this session)

- `panel/src/screens/money/ReviewView.tsx` (full file, 650 lines) — the three
  Group headings (`:597,608,619` in the version read: `"Money in without a
  home"`, `"Money out without a bucket"`, `"Waiting for your yes"`), `Group`
  component (`:506-524`), `DepositRow` (`:311-365`), `DepositDetail`
  (`:197-309`), `acceptWords()` (`:165-173`), `TiesNote` (`:175-185`), the
  `FACTS` desk-row class (`:86`), the "TWO GROUPS THAT WRAP" comment
  (`:138-142`).
- `panel/src/screens/money/kit.tsx` — `SEV`, `GO`, `INK`, `QUIET` colour
  tokens (`:19-28`); `CARD`, `PH_FIELD`, `btn()`, `GO_BG` (`:30-55`).
- `panel/src/index.css` — `:root` tokens `:7-40` (`--color-primary` `#0A1628`,
  `--color-secondary` `#0B6FD0`, `--color-bg` `#EEF0F2`, `--color-surface`
  `#FFFFFF`, `--color-ink-blue` `#0A5CAD`, `--color-accent` `#0D95E8`,
  `--color-tier23` `#434B57`).
- `panel/src/screens/money/MoneyDesk.tsx` (full file) — the desk chrome order:
  `h1` "Money" (`:27-29`), year picker + "as of" (`:30-33`), the advisor band
  (`:36`), the four view chips (`:39`), the view body, the assistant pill
  (`:42-58`).
- `panel/src/screens/money/MoneyPhone.tsx` (full file) — the phone chrome:
  `T.title` "Money" (`:20`), pill caption "Money assistant · proposes, you
  confirm" (`:29`).
- `agent/reconcile.py`, FULL FILE re-read at `389aa89` in the review-fix pass
  (the original pass had only used the ps-admin inventory's citations against
  an earlier sha, and got two outcomes wrong; see review-BO.md and "What this
  stage simplifies" below): `match_payments()` docstring and body
  (`:901-1032`), the collision guard and `_decomposes()` (`:648-670`, `:959`),
  `_fifo_by_client()` (`:713-727`), the same-client FIFO application
  (`:982-993`), the "unexplained credit" warn line (`:1020-1031`),
  `propose_candidates()` and its four confidence levels (`:730-841`,
  `"likely"` at `:815-820`).
- `panel/src/screens/money/bills/vm.ts`, `tiesRatherThanPays()` and its doc
  comment, re-read at `389aa89` in the review-fix pass (`:143-169`): a tie is
  ONLY true when a PROPOSED reading names an invoice the OWNER hand-marked
  `paid` with no deposit behind it — the opposite of a repeat deposit against
  a normally-paid invoice, which this stage does not model.

## What this stage simplifies, and says so

- **The matching rule.** The real system (`agent/reconcile.py`) requires the
  bank text to carry counterparty evidence against a per-client hint table
  AND an exact amount match. This fixture's `matchDeposits()`
  (`src/data/demos/preisser-back-office.ts`) collapses that to "same
  registered client ID and same amount," the same shape without a separate
  hint table. The stage's captions say "the bank text has to name the
  client," never implying a database join is doing the work (spec-BO.md
  §2.1).
- **The collision (corrected 2026-09-28, review-BO.md HIGH-1).** The
  original fixture modeled a collision as two open invoices for the same
  client at the identical amount. That is exactly the case
  `_fifo_by_client` exists to AUTO-PAY (`reconcile.py :982-989`, "same client,
  identical amounts ... apply FIFO to the oldest open invoice — standard AR
  practice"), not refuse — the opposite of what the stage said. The real
  refusal (`_decomposes`, `:648-670`) is a genuine subset-sum check: a
  deposit equals one open invoice's face value AND a DIFFERENT combination of
  at least two OTHER open invoices for that client also sums to it
  (`:959-976`). The fixture now models exactly that shape: `d4` (Millbrook,
  $4,200.00) equals `INV-2102` exactly, and `INV-2107` ($1,500.00) plus
  `INV-2108` ($2,700.00) also sum to $4,200.00. Neither reading is applied
  (`match_payments` never touches `remaining` for a collision); the panel's
  own proposal rail (`propose_candidates`) still describes the single exact
  invoice at `"likely"` confidence with the basis quoted in the fixture
  (`:815-820`), so the Screen shows ONE reading, not two.
- **The repeat deposit (corrected 2026-09-28, review-BO.md HIGH-2).** The
  original fixture invented a `"tied"` `MatchOutcome` kind: a later deposit
  matching an invoice an earlier deposit in the same run already paid was
  said to "tie" to it automatically. The real product has no such path.
  `match_payments` removes a paid invoice from `remaining` the moment it pays
  (`:993`), so a later deposit for that amount has nothing open to match; it
  falls through to the "unexplained credit ... needs Tyler" warn line
  (`:1020-1031`) and is a person's problem, exactly like any other amount
  nothing explains. A real tie (`bills/vm.ts` `tiesRatherThanPays`) only
  happens when a PROPOSED reading names an invoice the OWNER hand-marked
  `paid` with no matching deposit — accepting that proposal writes
  `payment_matches` without re-touching the invoice. That is the opposite
  situation from a repeat deposit against a normally-paid invoice, and this
  fixture does not model it. `d8` is now `reason: "unexplained"`, and
  `INV-2109` (Larkspur, never paid) stays open the whole fixture so `d7`'s
  "no open invoice for this client is this amount" is checked against a real
  invoice rather than an empty, already-fully-paid pool (review-BO.md
  MEDIUM-3).
- **Pending.** The real Review queue never shows a pending row at all
  (`money-tab-v2.md` §1's membership predicate excludes anything pending);
  this stage's Read beat shows `d5` arriving and staying unresolved as a fair
  paraphrase for a demo audience, and the Screen recreation (which mirrors
  the real queue) correctly leaves it out.
- **The Screen beat's chrome title**, `"Money · Review"`, is NOT a verbatim
  product string — the real title bar just says "Money," and "Review" is a
  chip. The compound title is this stage's convention (`DemoScreenBeat.chrome`
  contract), flagged so no later reviewer cites it as a literal string.
- **Scope.** The advisor findings band, the other three Money-tab views
  (Books, Taxes, Log — shown only as grayed, inactive chip labels for
  authenticity), the AI assistant pill, and the bucket-fallback picker are
  all out of scope for this stage. They belong to later back-office Proof
  Stages per ADR-0018 §1's stage order.

## Registry checks (WebSearch, exact phrase, 2026-09-28)

Recorded in `src/data/demos/invented/preisser-back-office.ts` per entry:

- "Larkspur Fence & Supply" — only fence contractors in Larkspur, CA/CO. Cleared.
- "Millbrook Grain Services" — Millbrook Farms / Healthcare / Proving Ground, none a
  grain services firm. Cleared.
- "Cedar Bend Veterinary Clinic" — Cedar Veterinary Clinic (Cedar City, UT) and Bend
  Veterinary Clinic, no clinic of this exact name. Cleared.

"Mobile Check Deposit" (`d6`'s descriptor) is not an invented name: it is the
bank's own generic phrase for an unidentified depositor, quoted directly from
`agent/reconcile.py` and `bills/vm.ts` doc comments (per spec-BO.md §3.3),
registered as plain `vocabulary` rather than a business.

## Accessibility fix (2026-09-28, review-BO.md MEDIUM-5)

Every control inside `ReviewScreen.tsx`'s recreation ("Less", "Pick the
invoice", "It's invoice ...") is a decorative `<span>` with `tabIndex={-1}`
and `aria-hidden="true"`, not a `<button>`. `ProductScreen`'s body is already
`aria-hidden="true"` (`ProductScreen.tsx:5-7`, "Decorative to assistive
tech"), so a real `<button>` inside it was a live keyboard tab stop hidden
from screen readers that did nothing when pressed. The 44px `.bo-action`
sizing is unchanged; only the element type changed.

## Privacy

Never opened `panel/src/screens/work/board/fixture.ts`, `agent/config.py`
`COUNTERPARTY_HINTS` values, or `panel/src/assets/invoice-ps-2026-08.png`. No
ps-admin asset was copied. Every business, alias and domain in this stage
traces to `src/data/demos/invented/preisser-back-office.ts`.
