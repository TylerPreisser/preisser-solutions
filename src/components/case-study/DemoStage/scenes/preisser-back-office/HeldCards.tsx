"use client";

import { fixture } from "@/data/demos/preisser-back-office";
import { usdCents } from "@/data/demos/_money";

function queuedOf(id: string) {
  const o = fixture.outcomes.find((x) => x.deposit.id === id);
  if (!o || o.kind !== "queued") throw new Error(`[deposit-matcher] "${id}" is not a queued outcome`);
  return o;
}

function tiedOf(id: string) {
  const o = fixture.outcomes.find((x) => x.deposit.id === id);
  if (!o || o.kind !== "tied") throw new Error(`[deposit-matcher] "${id}" is not a tied outcome`);
  return o;
}

/**
 * The Caught beat: three cards, three refusal reasons `matchDeposits()`
 * actually returns (spec-BO.md §4 "Caught") — distinct from the collision
 * the Read beat already showed. Each card is one step.
 */
export function HeldCards() {
  const noCounterparty = queuedOf("d6");
  const noExactAmount = queuedOf("d7");
  const tied = tiedOf("d8");
  return (
    <div className="bo-caught">
      <div className="bo-caught__card" data-stage-step="1" data-fx="pop">
        <p className="bo-caught__title">A deposit with no name on it.</p>
        <p className="bo-caught__body">
          {noCounterparty.deposit.descriptor} for {usdCents(noCounterparty.deposit.cents)}. {noCounterparty.basis}
        </p>
      </div>
      <div className="bo-caught__card" data-stage-step="2" data-fx="pop">
        <p className="bo-caught__title">A deposit for less than any open invoice.</p>
        <p className="bo-caught__body">
          {noExactAmount.deposit.descriptor}, {usdCents(noExactAmount.deposit.cents)}. {noExactAmount.basis}
        </p>
      </div>
      <div className="bo-caught__card" data-stage-step="3" data-fx="pop">
        <p className="bo-caught__title">A deposit that repeats one already paid.</p>
        <p className="bo-caught__body">
          {tied.deposit.descriptor}, {usdCents(tied.deposit.cents)}. {tied.basis}
        </p>
      </div>
    </div>
  );
}
