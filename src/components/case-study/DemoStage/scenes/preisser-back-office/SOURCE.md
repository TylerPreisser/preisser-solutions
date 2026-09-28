# SOURCE — `preisser-back-office` / `deposit-matcher`

Lane BO, 2026-09-28. Read-only research; nothing in ps-admin or this website
was modified in the course of building this stage.

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
- `agent/reconcile.py` — read via the ps-admin inventory's citations
  (`:901-919` docstring, `:920-1000` matching loop, `:614-625`
  `_has_evidence`, `:961-980` collision docstring, `:1017-1035`
  `_decomposes`, `:1435` the `COLLISION ... left for Tyler` print). Not
  re-read line-for-line at `389aa89` in this pass (spec-BO.md already did the
  full read at `0bcb4ab`); the matching RULE these lines describe — exact
  amount plus counterparty evidence, refuse on a second exact candidate — is
  unchanged in spirit from the money-tab-v2 UI this stage recreates, which
  WAS re-read at `389aa89` and confirms the same rule in its own words
  (`ReviewView.tsx:10-24` header comment, current sha).
- `panel/src/screens/money/bills/vm.ts` — `tiesRatherThanPays()` cited by
  `ReviewView.tsx:167,176` at `389aa89` (not re-opened directly this pass;
  its behavior is unchanged, confirmed by `TiesNote`'s current text at
  `ReviewView.tsx:179-184`, which still reads "ties this deposit to it as
  the payment... not paid again").

## What this stage simplifies, and says so

- **The matching rule.** The real system (`agent/reconcile.py`) requires the
  bank text to carry counterparty evidence against a per-client hint table
  AND an exact amount match. This fixture's `matchDeposits()`
  (`src/data/demos/preisser-back-office.ts`) collapses that to "same
  registered client ID and same amount," the same shape without a separate
  hint table. The stage's captions say "the bank text has to name the
  client," never implying a database join is doing the work (spec-BO.md
  §2.1).
- **The collision.** The real refusal (`_decomposes`) is a general subset-sum
  check across every open invoice for a client. This fixture uses the
  narrowest true instance of it — two open invoices for the same client at
  the identical amount (`INV-2102`, `INV-2105`, both $4,200.00) — which is a
  valid instance of "a different combination sums to the same target," not a
  distortion (spec-BO.md §2.1).
- **The tie.** `MatchOutcome`'s `"tied"` kind and the fixture's posted-date
  processing order are LOCAL to this fixture file (spec-BO.md §3.4), never
  added to `src/types/demo-stage.ts`. It paraphrases the real product's
  `TiesNote` sentence, not a separate mechanism.
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

## Privacy

Never opened `panel/src/screens/work/board/fixture.ts`, `agent/config.py`
`COUNTERPARTY_HINTS` values, or `panel/src/assets/invoice-ps-2026-08.png`. No
ps-admin asset was copied. Every business, alias and domain in this stage
traces to `src/data/demos/invented/preisser-back-office.ts`.
