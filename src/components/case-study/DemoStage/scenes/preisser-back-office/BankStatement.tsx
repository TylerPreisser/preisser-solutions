"use client";

import { fixture } from "@/data/demos/preisser-back-office";
import { usdCents } from "@/data/demos/_money";

/**
 * The Before beat: "their materials" — a bank statement beside a spreadsheet
 * of open invoices, not the product (spec-BO.md §4 "Before"). Deliberately
 * plain, not skinned like `psadmin` (back-office.css `--bo-paper-*`), so the
 * Screen beat later in the stage reads as a different thing entirely. No
 * `data-stage-step`: the Before beat has no steps (src/types/demo-stage.ts
 * `DemoBeforeBeat`), so this is simply the end frame.
 */
export function BankStatement() {
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
      </div>
    </div>
  );
}
