"use client";

import { fixture } from "@/data/demos/preisser-back-office";
import { usdCents } from "@/data/demos/_money";

function depositOf(id: string) {
  const d = fixture.deposits.find((x) => x.id === id);
  if (!d) throw new Error(`[deposit-matcher] no deposit "${id}"`);
  return d;
}

/**
 * The Read beat: five steps, the matcher deciding on each bank row as it
 * arrives (spec-BO.md §4 "Read"). `d1`/`d2` land clean, `d4` is the
 * collision, `d5` is still pending. Every row's name is the bank's own text
 * (ReviewView.tsx `nameOf`: `merchant_name || name`), never a resolved
 * client name — the point of this beat is that the system reads the SAME
 * bank text a person would see. `data-stage-step` elements stay put once
 * revealed (the step engine only hides ones AHEAD of the current step), so
 * the beat reads as rows accumulating, not replacing each other.
 */
export function MatchingRead() {
  const d1 = depositOf("d1");
  const d2 = depositOf("d2");
  const d4 = depositOf("d4");
  const d5 = depositOf("d5");
  return (
    <div className="bo-read">
      <div className="bo-read__row" data-stage-step="1" data-fx="rise">
        <span className="bo-read__name">Today&apos;s bank feed</span>
      </div>
      <div className="bo-read__row" data-stage-step="2" data-fx="rise">
        <span className="bo-read__name">{d1.descriptor}</span>
        <span className="bo-read__amount">{usdCents(d1.cents)}</span>
        <span className="bo-read__tag bo-read__tag--paid">Paid</span>
      </div>
      <div className="bo-read__row" data-stage-step="3" data-fx="rise">
        <span className="bo-read__name">{d2.descriptor}</span>
        <span className="bo-read__amount">{usdCents(d2.cents)}</span>
        <span className="bo-read__tag bo-read__tag--paid">Paid</span>
      </div>
      <div className="bo-read__row" data-stage-step="4" data-fx="rise">
        <span className="bo-read__name">{d4.descriptor}</span>
        <span className="bo-read__amount">{usdCents(d4.cents)}</span>
        <span className="bo-read__tag bo-read__tag--held">Held for a person</span>
        <p className="bo-read__note">Two open invoices for this client are exactly this amount. Nothing is chosen for you.</p>
      </div>
      <div className="bo-read__row" data-stage-step="5" data-fx="rise">
        <span className="bo-read__name">{d5.descriptor}</span>
        <span className="bo-read__amount">{usdCents(d5.cents)}</span>
        <span className="bo-read__tag bo-read__tag--held">Not posted yet</span>
      </div>
    </div>
  );
}
