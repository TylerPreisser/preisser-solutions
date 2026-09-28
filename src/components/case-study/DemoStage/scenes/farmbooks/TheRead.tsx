/**
 * scenes/farmbooks/TheRead.tsx — the "read" beat's slot. Adapted from
 * Farm Invoice Processing System/web/components/showcase/the-read.tsx @8cbbbb4 (857 ln): the
 * photograph, the eight region boxes, and the four artifact cards (`FieldTable`, `CategoryCard`,
 * `ArithmeticTape`, `BooksCard`), all kept as plain non-motion markup per spec-FB §1.
 *
 * WHAT DID NOT COME OVER (ADR-0016 §3, spec-FB §1): the 560vh pinned `ScrubbedRead`, the
 * `CameraFrame`/`GateChip` scroll-gated viewfinder chrome (no replacement — `CameraCheckCard`'s
 * plain list already carries the same content), and every `useScroll`/`useTransform` value. The
 * kit's own step engine (`useStageTimeline`, wired by `Beat.tsx` from the fixture's `steps`) now
 * drives the eight boxes and the six cards via `data-stage-step`, per the mapping in
 * src/data/demos/farmbooks.ts (`READ_REGIONS[].step`) and SOURCE.md §3.
 *
 * The engine's reveal model is ADDITIVE (an element arrives at its step and stays), unlike the
 * source's crossfading `Layer` panels. Rather than fake a vanished replacement, all six reading
 * cards stack and accumulate as the beat plays — "everything the app read, as it read it" — which
 * is both simpler under the new engine and, on a phone read step by step, arguably the more
 * honest rendering of what "the read" means.
 *
 * critic-FB M2: each card now also carries the source's own step body sentence, restored from
 * READ_STEP_BODIES (present in the fixture from the first pass but never rendered).
 * critic-FB M3: each card's OUTER shell (`.fb-read__card`, border + background) always renders;
 * only an INNER wrapper carries `data-stage-step`, so a not-yet-arrived card reads as a visible
 * outline placeholder while autoplay is mid-flight, never a blank hole in the mat.
 * critic-FB M1/(c): at phone widths the photo is `position: sticky` so it, its region box and
 * the current card share the screen while stepping.
 * critic-FB M9 (arithmetic honesty): the tape's own strip now says precisely what the engine
 * checks — the LINE amounts against the printed total — never "the bill adds up" (the photo's
 * own subtotal/tax do not reconcile; see SOURCE.md "inherited risks").
 * critic-FB m1: the read's numerals now carry `--fb-font-display` (Fraunces), like every other
 * beat's amounts.
 */
import {
  READ_LINES,
  READ_LINE_SUM,
  READ_LINE_SUM_CENTS,
  READ_PRINTED_TOTAL,
  READ_REGIONS,
  READ_SORTED,
  READ_STEP_BODIES,
  TICKET_ALT,
  TICKET_SRC,
  type ReadRegion,
} from "@/data/demos/farmbooks";
import { money } from "./money";
import { ProductScreen } from "../../ProductScreen";
import { ReadFollow } from "./ReadFollow";

const USD = (n: number) => money(n, { exact: true });
const NUM = "font-[family-name:var(--fb-font-display)]";

const boxStyle = (b: ReadRegion["box"]) => ({
  left: `${b.x * 100}%`,
  top: `${b.y * 100}%`,
  width: `${b.w * 100}%`,
  height: `${b.h * 100}%`,
});

function PanelHead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--fb-gray2))]">{children}</p>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-[12.5px] leading-relaxed text-[rgb(var(--fb-gray1))]">{children}</p>;
}

/** The outer shell always renders (border + background = the outline placeholder, M3);
 *  only this inner wrapper is gated by the step engine. */
function Card({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div className="fb-read__card" data-fb-card={step}>
      <div data-stage-step={step} data-fx="rise">
        {children}
      </div>
    </div>
  );
}

function CameraCheckCard() {
  return (
    <Card step={1}>
      <PanelHead>Before the shutter will fire</PanelHead>
      <Body>{READ_STEP_BODIES[0]}</Body>
      <ul className="mt-3 grid gap-2">
        {[
          ["Light", "Enough of it, and no glare across the paper."],
          ["Frame", "All four corners of the bill inside the shot."],
          ["Focus", "Sharp enough to read the smallest printed line."],
        ].map(([name, why]) => (
          <li key={name} className="rounded-lg border border-[color:var(--fb-hairline)] bg-[rgb(var(--fb-cardsoft))] px-3 py-2">
            <p className="text-[13px] font-semibold leading-snug text-[rgb(var(--fb-ink))]">{name}</p>
            <p className="mt-0.5 text-[12px] leading-snug text-[rgb(var(--fb-gray1))]">{why}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function FieldTable({ rows, title, body }: { rows: readonly ReadRegion[]; title: string; body: string }) {
  const step = rows[0]?.step ?? 1;
  return (
    <Card step={step}>
      <PanelHead>{title}</PanelHead>
      <Body>{body}</Body>
      <dl className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-x-4">
        {rows.map((r) => (
          <div key={r.id} className="col-span-2 grid grid-cols-subgrid items-baseline border-b border-[color:var(--fb-hairline)] py-[5px] last:border-b-0">
            <dt className="text-[12px] leading-snug text-[rgb(var(--fb-gray1))]">{r.label}</dt>
            <dd className={`text-[13px] leading-snug text-[rgb(var(--fb-ink))] ${r.num ? `fb-tnum ${NUM}` : ""}`}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function CategoryCard() {
  return (
    <Card step={4}>
      <PanelHead>Where each line went</PanelHead>
      <Body>{READ_STEP_BODIES[3]}</Body>
      <ul className="mt-3 grid gap-2">
        {READ_SORTED.map((row, i) => (
          <li
            key={row.printed}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 rounded-lg border border-[color:var(--fb-hairline)] bg-[rgb(var(--fb-cardsoft))] px-3 py-2"
          >
            <div className="min-w-0">
              <p className="font-mono italic text-[11px] text-[rgb(var(--fb-gray2))] [overflow-wrap:anywhere]">{row.printed}</p>
              <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[rgb(var(--fb-ink))]">{row.category}</p>
            </div>
            <p className={`fb-tnum ${NUM} border-l border-[color:var(--fb-hairline)] pl-4 text-[14px] font-semibold text-[rgb(var(--fb-ink))]`}>
              {USD(row.amount)}
            </p>
            <span className="sr-only">{`Line ${i + 1}`}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] leading-snug text-[rgb(var(--fb-gray1))]">
        Co-op shorthand gets translated. The words the vendor printed are kept beside the reading.
      </p>
    </Card>
  );
}

interface TapeRow {
  label: string;
  value: string | null;
  quiet: boolean;
  rule?: boolean;
  count?: boolean;
}

function ArithmeticTape() {
  const rows: TapeRow[] = [
    ...READ_SORTED.map((row) => ({ label: row.category, value: USD(row.amount), quiet: true })),
    { label: "Four lines, added up", value: null, quiet: false, count: true },
    { label: "Total printed on the bill", value: USD(READ_PRINTED_TOTAL), quiet: false, rule: true },
  ];
  return (
    <Card step={5}>
      <PanelHead>The arithmetic</PanelHead>
      <Body>{READ_STEP_BODIES[4]}</Body>
      <dl className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-x-4">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`col-span-2 grid grid-cols-subgrid items-baseline py-[6px] ${
              r.rule ? "border-b border-[rgb(var(--fb-ink))]/25" : ""
            } ${r.quiet ? "" : "mt-1 border-t border-[color:var(--fb-hairline)] pt-[9px]"}`}
          >
            <dt className={`text-[12px] leading-snug ${r.quiet ? "text-[rgb(var(--fb-gray2))]" : "text-[rgb(var(--fb-gray1))]"}`}>
              {r.label}
            </dt>
            {r.count ? (
              <dd
                className={`fb-tnum ${NUM} text-[14px] font-semibold text-[rgb(var(--fb-ink))]`}
                data-stage-step={5}
                data-count-to={READ_LINE_SUM_CENTS}
                data-count-format="usd-cents"
              >
                {USD(READ_LINE_SUM)}
              </dd>
            ) : (
              <dd className={`fb-tnum ${NUM} text-[14px] ${r.quiet ? "text-[rgb(var(--fb-gray1))]" : "font-semibold text-[rgb(var(--fb-ink))]"}`}>
                {r.value}
              </dd>
            )}
          </div>
        ))}
      </dl>
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded-xl border border-[rgb(var(--fb-ok))]/30 bg-[rgb(var(--fb-ok))]/[0.07] px-3 py-2.5">
        {/* critic-FB M4/M9: the photo's own SUBTOTAL + TAX do not reconcile to its TOTAL (an
            inherited, un-editable defect in the source photograph's pixels — SOURCE.md). The
            claim here is scoped precisely to what the engine actually checks: the four LINE
            amounts against the printed TOTAL, never a blanket "the bill adds up". */}
        <span className={`fb-tnum ${NUM} text-[12px] font-semibold text-[rgb(var(--fb-ok))]`}>Difference {USD(0)}</span>
        <span className="text-[12px] text-[rgb(var(--fb-gray1))]">the lines match the printed total</span>
      </div>
      <p className="mt-3 text-[12px] leading-snug text-[rgb(var(--fb-gray1))]">
        If these two disagree by more than two cents, the bill stops and waits for you.
      </p>
    </Card>
  );
}

function BooksCard() {
  return (
    <Card step={6}>
      <PanelHead>In the books</PanelHead>
      <Body>{READ_STEP_BODIES[5]}</Body>
      <p className={`fb-tnum ${NUM} mt-3 text-[28px] font-semibold leading-none text-[rgb(var(--fb-ink))]`}>{USD(READ_PRINTED_TOTAL)}</p>
      <p className="mt-2 text-[12.5px] leading-snug text-[rgb(var(--fb-gray1))]">filed under four categories, from one photograph</p>
      <ul className="mt-4 grid gap-1.5 border-t border-[color:var(--fb-hairline)] pt-3">
        {READ_SORTED.map((row) => (
          <li key={row.category} className="flex items-baseline justify-between gap-3">
            <span className="text-[12.5px] text-[rgb(var(--fb-gray1))]">{row.category}</span>
            <span className={`fb-tnum ${NUM} text-[13px] font-semibold text-[rgb(var(--fb-ink))]`}>{USD(row.amount)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-[color:var(--fb-hairline)] pt-3 text-[12px] leading-snug text-[rgb(var(--fb-gray1))]">
        You typed none of it, and the bill it came from is one tap away for as long as you keep the farm.
      </p>
    </Card>
  );
}

const VENDOR_ROWS = READ_REGIONS.filter((r) => ["vendor", "date", "invoice"].includes(r.id));

export function TheRead() {
  return (
    <ProductScreen chrome="FarmBooks · Read" tag="Demonstration data" desk={<ReadDesk />} />
  );
}

function ReadDesk() {
  return (
    <div className="fb-read p-3 sm:p-4">
      <ReadFollow />
      <div className="fb-read__cover" aria-hidden />
      <div className="fb-read__photo-sticky">
        <div className="fb-read__photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={TICKET_SRC} alt={TICKET_ALT} />
          {READ_REGIONS.map((r) => (
            <span key={r.id} className="fb-read__box" data-stage-step={r.step} data-fx="pop" style={boxStyle(r.box)} aria-hidden />
          ))}
        </div>
      </div>
      <div className="fb-read__cards">
        <CameraCheckCard />
        <FieldTable rows={VENDOR_ROWS} title="On the ticket" body={READ_STEP_BODIES[1]} />
        <FieldTable rows={READ_LINES} title="Every line" body={READ_STEP_BODIES[2]} />
        <CategoryCard />
        <ArithmeticTape />
        <BooksCard />
      </div>
    </div>
  );
}
