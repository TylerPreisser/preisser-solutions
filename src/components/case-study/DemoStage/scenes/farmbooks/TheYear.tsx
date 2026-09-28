/**
 * scenes/farmbooks/TheYear.tsx — the "year" screen beat's slot. Adapted from
 * Farm Invoice Processing System/web/components/showcase/workbook-dashboard.tsx @8cbbbb4
 * (497 ln): the tile row, the category/vendor/field cuts, and the closing "matches the ledger
 * total" footer line, per spec-FB §1.
 *
 * THE CUT SWITCHER is a pure-CSS radio-tab pattern (no JS at all) rather than the kit's
 * `TabbedScreen`, so this beat can carry the tabs AND the export pane in one Screen beat — the
 * kit's `TabbedScreen` owns the whole beat body once `tabs` is set, leaving no room for a sibling
 * artifact pane (spec-FB §11 "the scene-internal cut switcher follows the TabbedScreen no-JS
 * rule"). All three cuts are always in the markup; the radio input only toggles which is shown.
 *
 * THE EXPORT PANE is the HTML recreation of `workbook-year.png` that spec-FB §6 requires in place
 * of the screenshot: `public/samples/workbook-year.png` prints nine real vendor names in pixels
 * and is deliberately never transplanted. This table is sourced from the SAME `WORKBOOK` fixture
 * the dashboard above it reads, so the two can never show two different years by construction —
 * the invariant `workbook-dashboard.smoke.test.tsx` guarded for the PNG, preserved here by having
 * only one data source at all.
 */
import { Check, Doc, Ruler, Spreadsheet } from "./icons";
import { categoryIcon } from "./category-icons";
import { money } from "./money";
import { WORKBOOK, YEAR_VIEWS, yearLargest, type WorkbookRow, type YearView } from "@/data/demos/farmbooks";
import { ProductScreen } from "../../ProductScreen";

const USD = (n: number) => money(n, { exact: true });
const TILE_LABEL = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--fb-gray2))]";

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="fb-year__tile">
      <p className={TILE_LABEL}>{label}</p>
      <p className="fb-tnum mt-1.5 font-[family-name:var(--fb-font-display)] text-[1.375rem] font-semibold leading-none tracking-tight text-[rgb(var(--fb-ink))]">
        {children}
      </p>
    </div>
  );
}

function Row({ row, view }: { row: WorkbookRow; view: YearView }) {
  const Icon = view === "categories" ? categoryIcon(row.name) : view === "fields" ? Ruler : Doc;
  const largest = yearLargest(view, false);
  const width = Math.max(0.03, Math.min(1, row.amount / largest));
  const rate = view === "fields" && row.acres ? row.amount / row.acres : null;
  return (
    <div className="fb-year__row">
      <span className="fb-year__row-fill" style={{ width: `${width * 100}%` }} aria-hidden />
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--fb-accent-wash))] text-[rgb(var(--fb-accent-deep))]">
        <Icon size={17} strokeWidth={2} />
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="block text-[14px] font-medium leading-snug text-[rgb(var(--fb-ink))]">{row.name}</span>
        {view === "fields" && (
          <span className="fb-tnum block text-[12px] text-[rgb(var(--fb-gray2))]">
            {row.acres ? `${row.acres.toFixed(1)} acres` : row.note}
            {rate !== null && <> · {USD(rate)}/ac</>}
          </span>
        )}
      </span>
      <span className="fb-tnum relative w-[92px] shrink-0 text-right text-[14px] font-semibold text-[rgb(var(--fb-ink))]">
        {USD(row.amount)}
      </span>
    </div>
  );
}

function CutPanel({ view }: { view: YearView }) {
  const active = YEAR_VIEWS.find((v) => v.id === view)!;
  const rows = WORKBOOK[view];
  return (
    <div className="fb-year__panel" data-fb-cut={view}>
      <p className="px-4 pb-1 pt-3.5 text-[13px] leading-snug text-[rgb(var(--fb-gray1))] sm:px-5">{active.blurb}</p>
      <div className="mt-2">
        {rows.map((row) => (
          <Row key={row.name} row={row} view={view} />
        ))}
      </div>
    </div>
  );
}

function YearDashboard() {
  return (
    <div className="fb-year">
      <div className="fb-year__head">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[rgb(var(--fb-accent-deep))]">{WORKBOOK.farm}</p>
          <p className="mt-1.5 font-[family-name:var(--fb-font-display)] text-[1.5rem] font-semibold leading-none tracking-tight text-[rgb(var(--fb-ink))]">
            {WORKBOOK.period}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--fb-accent-wash))] px-3 py-1.5 text-[12px] font-semibold text-[rgb(var(--fb-accent-deep))]">
          <Spreadsheet size={15} strokeWidth={2} aria-hidden />
          Exports to .xlsx
        </span>
      </div>

      <div className="fb-year__tiles">
        <Tile label="Total spent">{USD(WORKBOOK.totalSpent)}</Tile>
        <Tile label="Line items">{WORKBOOK.lineItems}</Tile>
        <Tile label="Documents read">{WORKBOOK.documents}</Tile>
        <Tile label="Acres tracked">{WORKBOOK.acres.toFixed(0)}</Tile>
      </div>

      {/* Pure-CSS radio tabs: every cut is always in the markup, so no-JS readers get all three.
          ps-visually-hidden (not opacity:0): the kit's end-state walk requires resting opacity
          >= 0.9 on every rendered descendant and exempts only that class (review-FB HIGH 2). */}
      <input type="radio" name="fb-year-cut" id="fb-cut-categories" className="ps-visually-hidden" defaultChecked />
      <input type="radio" name="fb-year-cut" id="fb-cut-vendors" className="ps-visually-hidden" />
      <input type="radio" name="fb-year-cut" id="fb-cut-fields" className="ps-visually-hidden" />
      <div className="fb-year__cut-bar" role="group" aria-label="How to slice the year">
        <label htmlFor="fb-cut-categories" className="fb-year__cut-label">
          By category
        </label>
        <label htmlFor="fb-cut-vendors" className="fb-year__cut-label">
          By vendor
        </label>
        <label htmlFor="fb-cut-fields" className="fb-year__cut-label">
          By field
        </label>
      </div>

      <div className="fb-year__panels">
        <CutPanel view="categories" />
        <CutPanel view="vendors" />
        <CutPanel view="fields" />
      </div>

      <div className="fb-year__footer">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-[rgb(var(--fb-ok))]">
          <Check size={15} strokeWidth={2.6} aria-hidden />
          Every cut of the year adds to the same total
        </span>
        <span className="fb-tnum text-[15px] font-semibold text-[rgb(var(--fb-ink))]">{USD(WORKBOOK.totalSpent)}</span>
      </div>
    </div>
  );
}

const EXPORT_COLUMNS: Record<YearView, string> = {
  categories: "Category",
  vendors: "Vendor",
  fields: "Field",
};

function ExportTable({ view }: { view: YearView }) {
  const rows = WORKBOOK[view];
  return (
    <table className="fb-year__export-table">
      <caption className="sr-only">{`Farm-books-2026.xlsx, ${EXPORT_COLUMNS[view]} tab`}</caption>
      <thead>
        <tr>
          <th>{EXPORT_COLUMNS[view]}</th>
          {view === "fields" && <th>Acres</th>}
          <th>Amount</th>
          {view === "fields" && <th>$/acre</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>{row.name}</td>
            {view === "fields" && <td className="fb-tnum">{row.acres ? row.acres.toFixed(1) : (row.note ?? "–")}</td>}
            <td className="fb-tnum">{USD(row.amount)}</td>
            {view === "fields" && <td className="fb-tnum">{row.acres ? USD(row.amount / row.acres) : "–"}</td>}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Matches the ledger total</th>
          {view === "fields" && <td />}
          <td className="fb-tnum">{USD(WORKBOOK.totalSpent)}</td>
          {view === "fields" && <td />}
        </tr>
      </tfoot>
    </table>
  );
}

function ExportPane() {
  return (
    <div className="fb-year__export">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[rgb(var(--fb-gray2))]">
          What the year looks like as a file
        </p>
        <p className="fb-tnum text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgb(var(--fb-gray2))]">
          farm-books-2026.xlsx
        </p>
      </div>
      <p className="mt-3 max-w-[64ch] text-[13px] leading-relaxed text-[rgb(var(--fb-gray1))]">
        One workbook, a tab for each of the three questions above: category, vendor, field, rebuilt here as
        plain tables rather than a picture, so every figure stays reachable at any width.
      </p>
      <div className="mt-4 grid gap-6">
        <ExportTable view="categories" />
        <ExportTable view="vendors" />
        <ExportTable view="fields" />
      </div>
      <p className="mt-4 max-w-[72ch] text-[13px] leading-relaxed text-[rgb(var(--fb-gray2))]">
        <span className="font-semibold text-[rgb(var(--fb-ink))]">A sample export</span>: this is what the file
        looks like, filled in with an invented farm and invented bills. No real client&apos;s books are pictured here.
      </p>
    </div>
  );
}

export function TheYear() {
  return (
    <div className="grid gap-6">
      <ProductScreen chrome="FarmBooks · Your year" tag="Demonstration data" desk={<YearDashboard />} />
      <ProductScreen
        chrome="farm-books-2026.xlsx"
        desk={<ExportPane />}
        scroll={{ label: "farm-books-2026.xlsx, at-a-glance export" }}
      />
    </div>
  );
}
