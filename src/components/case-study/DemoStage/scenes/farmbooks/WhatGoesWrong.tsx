/**
 * scenes/farmbooks/WhatGoesWrong.tsx — the "caught" beat's slot. Adapted from
 * Farm Invoice Processing System/web/components/showcase/pain-points.tsx @8cbbbb4 (617 ln) and
 * `Finding` from results.tsx:51-59 (inlined here, its only remaining call site), per spec-FB §1.
 *
 * Each of the three scenarios becomes ONE `data-stage-step` card (one per `DemoCaughtCard`),
 * arriving whole rather than staggering its three internal beats — a scenario was never three
 * distinct content states, only a stagger timing, so the reveal happens once, at the card.
 */
import {
  COOP_BILL,
  COOP_LINE_SUM,
  COOP_OVERCHARGE,
  COOP_PRINTED_TOTAL,
  RELIST_AMOUNT,
  RELIST_DOC,
  SHARE_APPLICATION,
  SHARE_FARM,
  SHARE_LANDOWNER,
} from "@/data/demos/farmbooks";
import { money } from "./money";
import { WheatAgent } from "./WheatAgent";

const USD = (n: number) => money(n, { exact: true });
const CAPTION = "text-[12.5px] leading-[1.45] text-[rgb(var(--fb-gray2))]";

function Money({ amount, className = "" }: { amount: number; className?: string }) {
  return <span className={`fb-tnum font-[family-name:var(--fb-font-display)] font-semibold ${className}`}>{USD(amount)}</span>;
}

function ScenarioA() {
  return (
    <div className="fb-wrong__card" data-stage-step={1} data-fx="rise">
      <p className="text-[15px] font-semibold leading-snug text-[rgb(var(--fb-ink))]">The co-op billed you wrong.</p>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[rgb(var(--fb-gray1))]">
        Add up the co-op&rsquo;s own line items and you do not get the total printed at the bottom of their bill.
      </p>
      <div className="mt-3.5 grid gap-3 sm:grid-cols-3">
        <div className="fb-wrong__paper">
          {COOP_BILL.map((row) => (
            <div key={row.label} className="fb-wrong__line">
              <span className="truncate">{row.label}</span>
              <Money amount={row.amount} className="text-[rgb(var(--fb-ink))]" />
            </div>
          ))}
          <div className="mt-2 flex items-baseline justify-between border-t border-[color:var(--fb-hairline)] pt-2 text-[12.5px] font-medium text-[rgb(var(--fb-gray1))]">
            <span>Total due</span>
            <Money amount={COOP_PRINTED_TOTAL} className="text-[15px] text-[rgb(var(--fb-ink))]" />
          </div>
        </div>
        <div className="fb-wrong__inset">
          <div className="flex items-baseline justify-between text-[13px] text-[rgb(var(--fb-gray1))]">
            <span>Sum of the line amounts</span>
            <Money amount={COOP_LINE_SUM} className="text-[rgb(var(--fb-ink))]" />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between text-[13px] text-[rgb(var(--fb-gray1))]">
            <span>Total printed on the bill</span>
            <Money amount={COOP_PRINTED_TOTAL} className="text-[rgb(var(--fb-ink))]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between border-t border-[color:var(--fb-hairline)] pt-2 text-[13px] font-medium text-[rgb(var(--fb-amber))]">
            <span>Off by</span>
            <Money amount={COOP_OVERCHARGE} className="text-[rgb(var(--fb-amber))]" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <WheatAgent state="flag" size={40} className="shrink-0" />
            <span className="fb-wrong__badge fb-wrong__badge--amber">1 bill needs your eyes</span>
          </div>
          <p className={`mt-3 ${CAPTION}`}>
            The bill stops here and waits for you, so you find <Money amount={COOP_OVERCHARGE} className="text-[rgb(var(--fb-ink))]" /> before you pay it.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScenarioB() {
  const farmGrow = SHARE_FARM;
  const landownerGrow = SHARE_LANDOWNER;
  return (
    <div className="fb-wrong__card" data-stage-step={2} data-fx="rise">
      <p className="text-[15px] font-semibold leading-snug text-[rgb(var(--fb-ink))]">You were billed for ground you farm on shares.</p>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[rgb(var(--fb-gray1))]">
        The application is billed to you whole, because you are the one who ordered it.
      </p>
      <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
        <div className="fb-wrong__paper">
          <div aria-hidden className="h-2.5 w-full rounded-full bg-[rgb(var(--fb-chevron))]" />
          <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[12.5px] text-[rgb(var(--fb-gray2))]">
            <span>Billed to you, in one invoice</span>
            <Money amount={SHARE_APPLICATION} className="text-[13.5px] text-[rgb(var(--fb-ink))]" />
          </div>
        </div>
        <div className="fb-wrong__inset">
          <div aria-hidden className="flex h-2.5 w-full gap-1">
            <span className="rounded-full bg-[rgb(var(--fb-accent))]" style={{ flexGrow: 1, flexBasis: 0 }} />
            <span className="rounded-full bg-[rgb(var(--fb-accent-soft))]" style={{ flexGrow: 2, flexBasis: 0 }} />
          </div>
          <dl className="mt-2.5 space-y-1.5 text-[12.5px] leading-snug">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[rgb(var(--fb-ink))]">Your third, the only part that is your expense</dt>
              <dd><Money amount={farmGrow} className="text-[13px] text-[rgb(var(--fb-ink))]" /></dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[rgb(var(--fb-gray1))]">The landowner&rsquo;s two-thirds, owed back to you</dt>
              <dd><Money amount={landownerGrow} className="text-[13px] text-[rgb(var(--fb-gray1))]" /></dd>
            </div>
          </dl>
          <div className="mt-3.5 border-t border-[color:var(--fb-hairline)] pt-3">
            <span className="fb-wrong__badge fb-wrong__badge--ok">In the books</span>
            <p className={`mt-2 ${CAPTION}`}>
              <Money amount={landownerGrow} className="text-[rgb(var(--fb-ink))]" /> comes off your expenses and onto what the landowner owes you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioC() {
  return (
    <div className="fb-wrong__card" data-stage-step={3} data-fx="rise">
      <p className="text-[15px] font-semibold leading-snug text-[rgb(var(--fb-ink))]">The same load, billed twice.</p>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[rgb(var(--fb-gray1))]">
        You send the ticket the day the load comes. At month end the co-op&rsquo;s statement bills you for it again.
      </p>
      <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          {["Delivery ticket", "Co-op monthly statement"].map((sheet) => (
            <div key={sheet} className="fb-wrong__paper">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgb(var(--fb-gray2))]">{sheet}</p>
              <div className="mt-1.5 flex items-baseline justify-between gap-3">
                <span className="font-mono text-[12px] text-[rgb(var(--fb-gray1))]">{RELIST_DOC} · Fertilizer</span>
                <Money amount={RELIST_AMOUNT} className="text-[13.5px] text-[rgb(var(--fb-ink))]" />
              </div>
            </div>
          ))}
        </div>
        <div className="fb-wrong__inset">
          <div className="flex items-baseline justify-between gap-3">
            <span className="whitespace-nowrap font-mono text-[12px] text-[rgb(var(--fb-gray2))] line-through">{RELIST_DOC}</span>
            <Money amount={RELIST_AMOUNT} className="shrink-0 text-[13.5px] text-[rgb(var(--fb-gray2))] line-through" />
          </div>
          <p className={`mt-2.5 ${CAPTION}`}>Already in the books: the statement line never posts.</p>
          <ul className="mt-3.5 border-t border-[rgb(var(--fb-gold-soft))] pt-3">
            <li className="min-w-0 border-l-2 border-[rgb(var(--fb-gold-soft))] pl-4">
              <p className="text-[14px] font-semibold leading-snug text-[rgb(var(--fb-ink))]">
                That load costs you {USD(RELIST_AMOUNT)}, not {USD(RELIST_AMOUNT * 2)}.
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[rgb(var(--fb-gray1))]">
                Matched on the vendor, the amount and the date: same vendor, same amount, inside forty-five days.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function WhatGoesWrong() {
  return (
    <div className="fb-wrong">
      <ScenarioA />
      <ScenarioB />
      <ScenarioC />
    </div>
  );
}
