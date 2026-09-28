"use client";

import { ProductScreen } from "../../ProductScreen";
import { fixture, type MatchOutcome } from "@/data/demos/preisser-back-office";
import { usdCents, type Cents } from "@/data/demos/_money";

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

function readingQuote(number: string, cents: Cents): string {
  return `Same client, same amount: ${usdCents(cents)} for ${number}.`;
}

function CollisionRow({ ph }: { ph: boolean }) {
  const o = outcomeOf("d4");
  const rowCls = ph ? "bo-row bo-row--ph" : "bo-row bo-row--desk";
  const dateCls = ph ? "bo-row__date bo-row__date--ph" : "bo-row__date";
  return (
    <li className={rowCls} data-deposit={o.deposit.id}>
      <div className="bo-row__head">
        <span className="bo-row__name">{o.deposit.descriptor}</span>
        <span className={dateCls}>{dayWords(o.deposit.posted)}</span>
        <span className="bo-row__amount">{usdCents(o.deposit.cents)}</span>
        <div className="bo-row__controls">
          <button type="button" className="bo-action" aria-expanded="true">
            Less
          </button>
        </div>
      </div>
      <div className="bo-detail">
        <p className="bo-law">
          These readings are not ranked. Each is one way this deposit could be read, in the order the matcher wrote them.
        </p>
        <ul className="bo-readings">
          {o.candidates.map((inv) => (
            <li className="bo-reading" key={inv.number}>
              <p className="bo-reading__line">
                {inv.number} ({usdCents(inv.totalCents)})
              </p>
              <p className="bo-reading__quote">&ldquo;{readingQuote(inv.number, inv.totalCents)}&rdquo;</p>
              <button type="button" className="bo-action bo-action--go">
                It&apos;s invoice {inv.number}
              </button>
            </li>
          ))}
        </ul>
        <p className="bo-basis">{o.basis} Nothing is accepted until a person picks one.</p>
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
          <button type="button" className="bo-action" aria-expanded="false">
            Pick the invoice
          </button>
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
 * three still-open rows: the collision (`d4`, expanded — the multi-reading
 * UI is the point) and the unknown-sender / partial-amount rows (`d6`,
 * `d7`, collapsed with their "Pick the invoice" action). The three resolved
 * deposits and the pending one never reach this group (spec-BO.md §4,
 * ReviewView.tsx's own queue-membership rule). Not a stepped beat: this is
 * one recreated view, not a sequence, so it carries no `data-stage-step`.
 */
export function ReviewScreen() {
  return (
    <ProductScreen chrome="Money · Review" desk={<ReviewGroup ph={false} />} phone={<ReviewGroup ph={true} />} />
  );
}
