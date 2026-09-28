"use client";

import { fixture } from "@/data/demos/preisser-back-office";
import { usdCents } from "@/data/demos/_money";

function queuedOf(id: string) {
  const o = fixture.outcomes.find((x) => x.deposit.id === id);
  if (!o || o.kind !== "queued") throw new Error(`[deposit-matcher] "${id}" is not a queued outcome`);
  return o;
}

/**
 * The Caught beat: three cards, three refusal reasons `matchDeposits()`
 * actually returns (spec-BO.md §4 "Caught") — distinct from the collision
 * the Read beat already showed. Each card is one step.
 *
 * `d8` ("A deposit that repeats one already paid") is `reason: "unexplained"`,
 * not a "tie": the real product only ties a deposit to an invoice the OWNER
 * hand-marked paid with no deposit behind it (bills/vm.ts
 * `tiesRatherThanPays`). A repeat deposit against a normally-paid invoice
 * matches nothing still open and is left for a person (review-BO.md HIGH-2).
 */
export function HeldCards() {
  const noCounterparty = queuedOf("d6");
  const noExactAmount = queuedOf("d7");
  const unexplained = queuedOf("d8");
  return (
    <div className="bo-caught">
      <div className="bo-caught__card" data-stage-step="1" data-fx="pop">
        <p className="bo-caught__title">A deposit with no name on it.</p>
        <p className="bo-caught__body">
          {noCounterparty.deposit.descriptor} for {usdCents(noCounterparty.deposit.cents)}. {noCounterparty.basis}
        </p>
      </div>
      <div className="bo-caught__card" data-stage-step="2" data-fx="pop">
        <p className="bo-caught__title">A deposit that matches no open invoice for its client.</p>
        <p className="bo-caught__body">
          {noExactAmount.deposit.descriptor}, {usdCents(noExactAmount.deposit.cents)}. {noExactAmount.basis}
        </p>
      </div>
      <div className="bo-caught__card" data-stage-step="3" data-fx="pop">
        <p className="bo-caught__title">A deposit that repeats one already paid.</p>
        <p className="bo-caught__body">
          {unexplained.deposit.descriptor}, {usdCents(unexplained.deposit.cents)}. {unexplained.basis}
        </p>
      </div>
    </div>
  );
}
