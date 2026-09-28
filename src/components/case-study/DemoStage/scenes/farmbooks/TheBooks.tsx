/**
 * scenes/farmbooks/TheBooks.tsx — the "books" screen beat's slot. Adapted from
 * Farm Invoice Processing System/web/components/showcase/dashboard-3d.tsx @8cbbbb4 (420 ln): the
 * month rollup card face (eyebrow, farm name, `HeroTotal`, bill count, category ledger, footer
 * line) — the shipped month screen's own parts, per spec-FB §1.
 *
 * WHAT DID NOT COME OVER: `Stage`/`Panel`/`useDeck`/`useStage3D` (the pointer-parallax CSS-3D
 * stage) in full — ADR-0016 §3 drops every scroll- or pointer-position-driven transform, not only
 * scroll scrubbing. `LedgerRow`'s own `onViewportEnter` fill becomes six `data-stage-step`
 * elements (one per category row's fill bar), gated by the kit's own generic `data-fx="sweep"`
 * mechanism (demo-stage.css) instead of a `seen` boolean and a spring.
 *
 * critic-FB M3: `data-stage-step` lives on the FILL BAR only, never the row — the row's icon,
 * label, bill count and amount render immediately and unconditionally, so a reader who scrolls
 * faster than the autoplay timer never meets a blank hole where a category should be.
 */
import { categoryIcon } from "./category-icons";
import { Doc } from "./icons";
import { HeroTotal } from "./hero-total";
import { money } from "./money";
import { MONTH, MONTH_BILLS, MONTH_TOTAL, monthFraction } from "@/data/demos/farmbooks";
import { business } from "@/data/demos/_invented";
import { ProductScreen } from "../../ProductScreen";

const EYEBROW = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--fb-gray2))]";

function LedgerRow({ label, amount, bills, step }: { label: string; amount: number; bills: number; step: number }) {
  const Icon = categoryIcon(label);
  const pct = monthFraction(amount) * 100;
  return (
    <div className="fb-books__row">
      {/* critic-FB M3: the row's own text is always visible; only this fill bar sweeps in,
          so a fast scroll never meets a blank hole where a category row should be. */}
      <span
        className="fb-books__fill"
        data-stage-step={step}
        data-fx="sweep"
        style={{ width: `${pct}%` }}
        aria-hidden
      />
      <span className="fb-books__icon relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--fb-accent-wash))] text-[rgb(var(--fb-accent-deep))]">
        <Icon size={17} strokeWidth={2} />
      </span>
      <span className="relative min-w-0 flex-1">
        {/* critic-FB m3 / verify-FB item 4: "Repairs & Maintenance" must wrap between WHOLE words
            at 320. Letting any word break anywhere split it mid-letter ("Maintena/nce",
            "Chemical/s"); instead, below 360px farmbooks.css tightens this row (smaller icon, one
            type step down on label and amount), which widens the label column enough for its
            longest word. */}
        <span className="fb-books__label block text-[15px] font-medium leading-snug text-[rgb(var(--fb-ink))]">{label}</span>
        <span className="block text-[12px] text-[rgb(var(--fb-gray2))]">{bills === 1 ? "1 bill" : `${bills} bills`}</span>
      </span>
      <span className="fb-books__amount fb-tnum relative shrink-0 text-right text-[15px] font-semibold text-[rgb(var(--fb-ink))]">
        {money(amount, { show: true, exact: true })}
      </span>
    </div>
  );
}

function MonthRollup() {
  return (
    <div className="fb-books mx-auto w-full max-w-[420px]">
      <p className={EYEBROW}>June</p>
      <p className="mt-2 font-[family-name:var(--fb-font-display)] text-[26px] font-semibold leading-tight tracking-tight text-[rgb(var(--fb-ink))]">
        {business("coyote-draw-farms").name}
      </p>
      <div className="mt-2">
        <HeroTotal value={MONTH_TOTAL} show exact className="text-[36px]" />
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[15px] text-[rgb(var(--fb-gray1))]">
        <Doc size={16} className="text-[rgb(var(--fb-gray2))]" aria-hidden />
        {`${MONTH_BILLS} bills`}
      </p>

      <p className={`${EYEBROW} mt-7`}>Where it went</p>
      <div className="fb-books__ledger">
        {MONTH.map((row, i) => (
          <LedgerRow key={row.label} label={row.label} amount={row.amount} bills={row.bills} step={i + 1} />
        ))}
      </div>

      <p className="mt-6 border-t border-[color:var(--fb-hairline)] pt-4 text-[13.5px] leading-snug text-[rgb(var(--fb-gray1))]">
        At year end your CPA gets one file, built from the bills themselves.
      </p>
    </div>
  );
}

export function TheBooks() {
  return <ProductScreen chrome="FarmBooks · Month" tag="Demonstration data" desk={<MonthRollup />} />;
}
