"use client";

import { ProductScreen } from "../../ProductScreen";
import { fixture, type MatchOutcome } from "@/data/demos/preisser-back-office";
import { usdCents } from "@/data/demos/_money";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "15 Mar 2026" (ReviewView.tsx `dayWords`), hand-rolled so the server and
 * every browser print identical bytes — the same reason `_money.ts` hand-rolls
 * `usdCents` instead of `Intl`. */
function dayWords(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function outcomeOf(id: string): Extract<MatchOutcome, { kind: "queued" }> {
  const o = fixture.outcomes.find((x) => x.deposit.id === id);
  if (!o || o.kind !== "queued") throw new Error(`[deposit-matcher] "${id}" is not a queued outcome`);
  return o;
}

/**
 * The collision row: ONE reading, not two (review-BO.md HIGH-1). The real
 * matcher refuses to auto-pay a decomposing amount (agent/reconcile.py
 * `_decomposes`), but the panel's proposal rail still describes the single
 * exact-match invoice at "likely" confidence, because the amount is ALSO a
 * combination of smaller open invoices (`propose_candidates` :805-825,
 * `CandidateGroup.confidence` "repeated on screen as a WORD; nothing acts on
 * it", bills/vm.ts :143-145). Every control here is DECORATIVE and
 * non-focusable (review MEDIUM-5): `ProductScreen`'s body is
 * `aria-hidden="true"`, and a real `<button>` inside it would still be a
 * live keyboard tab stop that does nothing when pressed.
 */
function CollisionRow({ ph }: { ph: boolean }) {
  const o = outcomeOf("d4");
  const exactInvoice = o.candidates.find((inv) => inv.totalCents === o.deposit.cents);
  if (!exactInvoice) throw new Error("[deposit-matcher] the collision row has no exact-match invoice");
  const rowCls = ph ? "bo-row bo-row--ph" : "bo-row bo-row--desk";
  const dateCls = ph ? "bo-row__date bo-row__date--ph" : "bo-row__date";
  return (
    <li className={rowCls} data-deposit={o.deposit.id}>
      <div className="bo-row__head">
        <span className="bo-row__name">{o.deposit.descriptor}</span>
        <span className={dateCls}>{dayWords(o.deposit.posted)}</span>
        <span className="bo-row__amount">{usdCents(o.deposit.cents)}</span>
        <div className="bo-row__controls">
          <span className="bo-action" tabIndex={-1} aria-hidden="true">
            Less
          </span>
        </div>
      </div>
      <div className="bo-detail">
        <div className="bo-reading">
          <p className="bo-reading__line">
            {exactInvoice.number} ({usdCents(exactInvoice.totalCents)}) &middot; likely
          </p>
          <p className="bo-reading__quote">&ldquo;{o.basis}&rdquo;</p>
          <span className="bo-action bo-action--go" tabIndex={-1} aria-hidden="true">
            It&apos;s invoice {exactInvoice.number}
          </span>
        </div>
      </div>
    </li>
  );
}

function CollapsedRow({ id, ph }: { id: string; ph: boolean }) {
  const o = outcomeOf(id);
  const rowCls = ph ? "bo-row bo-row--ph" : "bo-row bo-row--desk";
  const dateCls = ph ? "bo-row__date bo-row__date--ph" : "bo-row__date";
  return (
    <li className={rowCls} data-deposit={o.deposit.id}>
      <div className="bo-row__head">
        <span className="bo-row__name">{o.deposit.descriptor}</span>
        <span className={dateCls}>{dayWords(o.deposit.posted)}</span>
        <span className="bo-row__amount">{usdCents(o.deposit.cents)}</span>
        <div className="bo-row__controls">
          <span className="bo-action" tabIndex={-1} aria-hidden="true">
            Pick the invoice
          </span>
        </div>
      </div>
    </li>
  );
}

function ReviewGroup({ ph }: { ph: boolean }) {
  return (
    <>
      <div className="bo-chips">
        <span className="bo-chip" data-active>
          Review
        </span>
        <span className="bo-chip">Books</span>
        <span className="bo-chip">Taxes</span>
        <span className="bo-chip">Log</span>
      </div>
      <div className="bo-group">
        <p className="bo-group__head">
          Money in without a home <span>&middot; 3</span>
        </p>
        <ul className="bo-list">
          <CollisionRow ph={ph} />
          <CollapsedRow id="d6" ph={ph} />
          <CollapsedRow id="d7" ph={ph} />
        </ul>
      </div>
    </>
  );
}

/**
 * The Screen beat: "Money · Review" recreated (spec-BO.md §4 "Screen").
 * Only the "Money in without a home" group (ReviewView.tsx `:597`), with the
 * three still-open rows: the collision (`d4`, expanded to its single "likely"
 * reading) and the unknown-sender / partial-amount rows (`d6`, `d7`,
 * collapsed with their "Pick the invoice" action). The three resolved
 * deposits and the pending one never reach this group (spec-BO.md §4,
 * ReviewView.tsx's own queue-membership rule). Not a stepped beat: this is
 * one recreated view, not a sequence, so it carries no `data-stage-step`.
 */
export function ReviewScreen() {
  return (
    <ProductScreen chrome="Money · Review" desk={<ReviewGroup ph={false} />} phone={<ReviewGroup ph={true} />} />
  );
}
