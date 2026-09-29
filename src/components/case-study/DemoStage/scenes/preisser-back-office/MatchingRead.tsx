"use client";

import { fixture, stages } from "@/data/demos/preisser-back-office";
import { usdCents } from "@/data/demos/_money";

function depositOf(id: string) {
  const d = fixture.deposits.find((x) => x.id === id);
  if (!d) throw new Error(`[deposit-matcher] no deposit "${id}"`);
  return d;
}

const readBeat = stages[0].beats.find((b) => b.id === "matching");

/**
 * A step's own caption from the stage script, printed beside the row it
 * describes (final-BO.md item 3): below the desk breakpoint the kit's phone
 * control bar drops its full step list to keep the sticky bar to 44px of
 * controls (demo-stage.css "Phone control bar"), so without this the Read
 * beat's narration disappeared from the phone screen entirely — the rows
 * carry data, never the sentence explaining them. `.bo-read__caption` reads
 * the SAME `caption` string `StepControls` prints on desktop, as an index
 * into `readBeat.steps` (never a hand-typed copy, so the two can't drift),
 * and it lives INSIDE the row's own `data-stage-step` element, so it arrives
 * and stays exactly when the row does — no separate swap cell needed here,
 * because this beat's rows accumulate (Beat.tsx `data-stage-step` elements
 * stay put once revealed) rather than replacing a before-state the way
 * NWKS's tabs do. Hidden at >=1024px (back-office.css): desktop already
 * shows every caption in `StepControls`'s own list beside the beat.
 */
function captionOf(k: number): string {
  if (!readBeat || readBeat.kind !== "read") throw new Error('[deposit-matcher] beat "matching" is not a read beat');
  const step = readBeat.steps[k - 1];
  if (!step) throw new Error(`[deposit-matcher] read beat has no step ${k}`);
  return step.caption;
}

/**
 * The Read beat: five steps, the matcher deciding on each bank row as it
 * arrives (spec-BO.md §4 "Read"). `d1`/`d2`/`d3` land clean (all three of
 * `fixture.paid`, critic-BO.md M3 — this beat previously showed only two and
 * the narration said "two" while the fixture asserted three), `d4` is the
 * collision, `d5` is still pending. Every row's name is the bank's own text
 * (ReviewView.tsx `nameOf`: `merchant_name || name`), never a resolved
 * client name — the point of this beat is that the system reads the SAME
 * bank text a person would see. `data-stage-step` elements stay put once
 * revealed (the step engine only hides ones AHEAD of the current step), so
 * the beat reads as rows accumulating, not replacing each other. `d2` and
 * `d3` share step 3 ("Two more resolve the same clean way"): the step
 * engine tolerates more than one element per step number.
 */
export function MatchingRead() {
  const d1 = depositOf("d1");
  const d2 = depositOf("d2");
  const d3 = depositOf("d3");
  const d4 = depositOf("d4");
  const d5 = depositOf("d5");
  return (
    <div className="bo-read">
      <div className="bo-read__row" data-stage-step="1" data-fx="rise">
        <span className="bo-read__name">Today&apos;s bank feed</span>
        <p className="bo-read__caption">{captionOf(1)}</p>
      </div>
      <div className="bo-read__row" data-stage-step="2" data-fx="rise">
        <span className="bo-read__name">{d1.descriptor}</span>
        <span className="bo-read__amount">{usdCents(d1.cents)}</span>
        <span className="bo-read__tag bo-read__tag--paid">Paid</span>
        <p className="bo-read__caption">{captionOf(2)}</p>
      </div>
      <div className="bo-read__row" data-stage-step="3" data-fx="rise">
        <span className="bo-read__name">{d2.descriptor}</span>
        <span className="bo-read__amount">{usdCents(d2.cents)}</span>
        <span className="bo-read__tag bo-read__tag--paid">Paid</span>
        <p className="bo-read__caption">{captionOf(3)}</p>
      </div>
      <div className="bo-read__row" data-stage-step="3" data-fx="rise">
        <span className="bo-read__name">{d3.descriptor}</span>
        <span className="bo-read__amount">{usdCents(d3.cents)}</span>
        <span className="bo-read__tag bo-read__tag--paid">Paid</span>
        <p className="bo-read__caption">{captionOf(3)}</p>
      </div>
      <div className="bo-read__row" data-stage-step="4" data-fx="rise">
        <span className="bo-read__name">{d4.descriptor}</span>
        <span className="bo-read__amount">{usdCents(d4.cents)}</span>
        <span className="bo-read__tag bo-read__tag--held">Held for a person</span>
        <p className="bo-read__note">This deposit matches an invoice, but the amount is also two smaller invoices combined.</p>
        <p className="bo-read__caption">{captionOf(4)}</p>
      </div>
      <div className="bo-read__row" data-stage-step="5" data-fx="rise">
        <span className="bo-read__name">{d5.descriptor}</span>
        <span className="bo-read__amount">{usdCents(d5.cents)}</span>
        <span className="bo-read__tag bo-read__tag--held">Not posted yet</span>
        <p className="bo-read__caption">{captionOf(5)}</p>
      </div>
    </div>
  );
}
