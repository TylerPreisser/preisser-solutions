"use client";

import { fixture } from "@/data/demos/preisser-back-office";
import { usdCents } from "@/data/demos/_money";

/** Rows shown before the phone-only fold (back-office.css `nth-of-type(n+5)`);
 * keep the two numbers in step. */
const VISIBLE_ROWS = 4;

/**
 * The Before beat: "their materials" — a bank statement beside a spreadsheet
 * of open invoices, not the product (spec-BO.md §4 "Before"). Deliberately
 * plain, not skinned like `psadmin` (back-office.css `--bo-paper-*`), so the
 * Screen beat later in the stage reads as a different thing entirely. No
 * `data-stage-step`: the Before beat has no steps (src/types/demo-stage.ts
 * `DemoBeforeBeat`), so this is simply the end frame.
 *
 * Every row is always in the DOM (no-JS and privacy-probe safe); on phone,
 * back-office.css hides rows past the fourth and reveals the "+N more"
 * count, derived here from the fixture's own length so it can never drift
 * (critic-BO.md M4).
 */
export function BankStatement() {
  const moreDeposits = fixture.deposits.length - VISIBLE_ROWS;
  const moreInvoices = fixture.invoices.length - VISIBLE_ROWS;
  return (
    <div className="bo-paper">
      <div className="bo-paper__panel">
        <p className="bo-paper__head">Bank statement: deposits</p>
        {fixture.deposits.map((d) => (
          <div className="bo-paper__row" key={d.id}>
            <span>{d.descriptor}</span>
            <span className="bo-paper__amount">{usdCents(d.cents)}</span>
          </div>
        ))}
        {moreDeposits > 0 ? <p className="bo-paper__more">+{moreDeposits} more</p> : null}
      </div>
      <div className="bo-paper__panel">
        <p className="bo-paper__head">Ledger: open invoices</p>
        {fixture.invoices.map((i) => (
          <div className="bo-paper__row" key={i.number}>
            <span>
              {i.number}, {i.client}
            </span>
            <span className="bo-paper__amount">{usdCents(i.totalCents)}</span>
          </div>
        ))}
        {moreInvoices > 0 ? <p className="bo-paper__more">+{moreInvoices} more</p> : null}
      </div>
    </div>
  );
}
