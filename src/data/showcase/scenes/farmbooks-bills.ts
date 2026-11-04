// src/data/showcase/scenes/farmbooks-bills.ts: data for the FarmBooks "Bills" walkthrough
// (design-spec-r2 §6.1, ADR-0025). Pure data; no React.
//
// A coded recreation of what the real app does with one supplier bill (traced in the FarmBooks code,
// every rule cited there to the FarmBooks repo):
//   Snaps   the phone camera's quality gate (lighting, framing, focus), auto-capture, the tray, "Upload".
//           Email intake is OFF in production, so a bill never arrives by email here.
//   Reads   vendor, invoice number, date, printed total, and each line with the printed words kept beside
//           the plain English.
//   Sorts   each line into its Schedule F category (names VERBATIM from FarmBooks data/categories.json).
//   Splits  a line whose printed field ("FLD: EAST HALF") matches the farm's roster is assigned to it; the
//           line with no field goes to Needs review, where the Split panel divides it across the fields she
//           picks BY ACREAGE ONLY, cent-exact by largest remainder (split_allocation.py). No percentages.
//   Books   the lines must add to the printed total within 2 cents (validate.py AMOUNT_TOL) before it books.
//   Sums up the Exports "At a Glance": Total spent, Line items, where the money went, by vendor, and
//           cost per acre by field, highest first. No per-crop rollup (the export has none).
//
// Everything is invented demonstration data: the bill is the one farm-books.com publishes (Prairie General
// Farm Supply, invoice 49813, Sept 15, 2024, $700.50), the farm, every vendor and every field come from the
// web-checked set in src/data/demos/invented/farmbooks.ts. Every total below is DERIVED from the ledger and
// re-asserted, so the three cuts (category, vendor, field) always reconcile.
import { business, town } from "@/data/demos/_invented";
import { BILL_IMG, BILL_PRINTED, BILL_REGIONS, type BillRegion } from "./farmbooks-bill-regions";

export { BILL_IMG, BILL_REGIONS, type BillRegion };

/* ── Steps and timing ──────────────────────────────────────────────────── */

export type BillsStepId = "snaps" | "reads" | "sorts" | "splits" | "books" | "sums";

export interface BillsStep {
  id: BillsStepId;
  /** The dot label (spec §6.1). */
  title: string;
  /** Length of the step, ms. */
  ms: number;
  /** The window's caption line while this step plays. */
  caption: string;
  /** What the right-hand column is, in the app's own words (the real screen it recreates). */
  screen: string;
}

export const BILLS_STEPS: readonly BillsStep[] = [
  { id: "snaps", title: "Snaps", ms: 3500, screen: "Add a bill", caption: "A bill comes in: snapped on a phone, or dropped in as a PDF." },
  { id: "reads", title: "Reads", ms: 6500, screen: "The bill", caption: "FarmBooks reads it: who, which invoice, when, how much, and every line." },
  { id: "sorts", title: "Sorts", ms: 5000, screen: "The bill", caption: "Every line lands in its Schedule F tax category." },
  { id: "splits", title: "Splits", ms: 7000, screen: "Needs review", caption: "Each line goes to its field. A shared one splits by acres, to the cent." },
  { id: "books", title: "Books", ms: 3000, screen: "Bills", caption: "It ties to the printed total, so it goes in the books." },
  { id: "sums", title: "Sums up", ms: 7000, screen: "Exports", caption: "And the year sums itself up: where the money went, and cost per acre." },
] as const;

export const BILLS_TOTAL_MS = BILLS_STEPS.reduce((t, s) => t + s.ms, 0);
if (BILLS_TOTAL_MS !== 32000) throw new Error(`[farmbooks-bills] the story must run 32 s (spec §6.1), got ${BILLS_TOTAL_MS}`);

/** The reduced-motion and first (no-JS) frame: the Splits end state (spec §6.1). */
export const BILLS_STILL_STEP = BILLS_STEPS.findIndex((s) => s.id === "splits");

/**
 * Cue times inside each step (ms from the step's start). Each cue switches one small element on; CSS
 * does the motion. Kept here so the timeline reads in one place.
 */
export const CUES = {
  snaps: { phone: 0, light: 450, frame: 800, focus: 1150, flash: 1500, tray: 1700, ask: 2250, press: 2850 },
  reads: { scan: 150, vendor: 1650, invoice: 1900, date: 2150, total: 2400, line0: 2900, lineEvery: 420 },
  sorts: { first: 350, every: 650 },
  splits: { field0: 250, fieldEvery: 380, flag: 1500, open: 2300, row0: 2800, row1: 3300, shares: 3900, tie: 4500 },
  books: { check: 200, file: 1300, booked: 2050 },
  sums: { kpi: 250, cats: 800, catEvery: 70, acres: 1500, acreEvery: 90, vendors: 2000 },
} as const;

/* ── The bill, as FarmBooks reads it ───────────────────────────────────── */

const cents = (s: string) => Math.round(Number(s) * 100);
export const money = (c: number) =>
  `$${(c / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export interface BillLine {
  /** The printed words, as on the paper (co-op shorthand). */
  printed: string;
  /** Plain English beside it (FarmBooks keeps both; the translation never touches the money). */
  plain: string;
  /** Schedule F category, verbatim from FarmBooks data/categories.json. */
  category: "Fuel & Oil" | "Seed & Plants" | "Chemicals" | "Repairs & Maintenance";
  cents: number;
  /** The field printed on the bill's FLD line, matched to the roster; null = none printed (goes to review). */
  field: FieldId | null;
  /** Region on the raster. */
  region: "line1" | "line2" | "line3" | "line4";
}

export type FieldId = "home-quarter" | "creek-bottom" | "east-half" | "north-80";

/** The farm's field roster (invented; acreage is what every split is weighted by). */
export const FIELDS: readonly { id: FieldId; name: string; acres: number }[] = [
  { id: "home-quarter", name: town("home-quarter").name, acres: 160 },
  { id: "creek-bottom", name: town("creek-bottom").name, acres: 120 },
  { id: "east-half", name: town("east-half").name, acres: 320 },
  { id: "north-80", name: town("north-80").name, acres: 80 },
];
const fieldName = (id: FieldId) => FIELDS.find((f) => f.id === id)!.name;
const acresOf = (id: FieldId) => FIELDS.find((f) => f.id === id)!.acres;

export const FARM = business("coyote-draw-farms").name;

export const BILL = {
  vendor: business("prairie-general-farm-supply").name,
  invoice: "49813",
  date: "Sep 15, 2024",
  totalCents: 70050,
  lines: [
    { printed: "DSL #2 DYED 100.0 GAL", plain: "Tractor diesel, dyed off-road", category: "Fuel & Oil", cents: 32000, field: "east-half", region: "line1" },
    { printed: "GRNG SD CORN 4 BAG", plain: "Grange seed corn, 4 bags", category: "Seed & Plants", cents: 21500, field: "north-80", region: "line2" },
    { printed: "HERB MIX 2.5 GL 1 JUG", plain: "Herbicide mix, 1 jug", category: "Chemicals", cents: 9850, field: null, region: "line3" },
    { printed: "HYD FLUID UTF 5.0 GAL", plain: "Hydraulic fluid, 5 gal", category: "Repairs & Maintenance", cents: 6700, field: "east-half", region: "line4" },
  ] satisfies readonly BillLine[],
} as const;

// The scene must say exactly what the raster prints (the raster is generated by scripts/farmbooks-bill/render.mjs).
{
  const fail = (what: string) => {
    throw new Error(`[farmbooks-bills] ${what} disagrees with the rendered bill; re-run scripts/farmbooks-bill/render.mjs`);
  };
  if (BILL_PRINTED.vendor !== BILL.vendor) fail("vendor");
  if (BILL_PRINTED.invoice !== BILL.invoice) fail("invoice number");
  if (BILL_PRINTED.date !== "09/15/2024" || BILL.date !== "Sep 15, 2024") fail("date");
  if (cents(BILL_PRINTED.total) !== BILL.totalCents) fail("printed total");
  BILL.lines.forEach((l, i) => {
    if (cents(BILL_PRINTED.amounts[i]) !== l.cents) fail(`line ${i + 1} amount`);
    const printedField = BILL_PRINTED.fields[i];
    if ((l.field ? fieldName(l.field).toUpperCase() : "") !== printedField) fail(`line ${i + 1} field`);
  });
}

/** The 2-cent check (FarmBooks pipeline/validate.py AMOUNT_TOL = 0.02): the lines must tie to the printed total. */
export const LINE_SUM_CENTS = BILL.lines.reduce((t, l) => t + l.cents, 0);
export const TIES = Math.abs(LINE_SUM_CENTS - BILL.totalCents) <= 2;
if (!TIES) throw new Error("[farmbooks-bills] the bill's lines must tie to its printed total");

/**
 * Largest-remainder (Hamilton) split of `amount` cents over integer acre weights, as FarmBooks'
 * split_allocation.allocate_cents: floor shares, then one cent each to the largest exact remainders,
 * ties to the larger field, then the order she picked them. Sum equals the amount exactly.
 */
export function splitByAcres(amount: number, acres: readonly number[]): number[] {
  const W = acres.reduce((a, b) => a + b, 0);
  const base = acres.map((w) => Math.floor((amount * w) / W));
  const rem = acres.map((w, i) => amount * w - base[i] * W);
  let left = amount - base.reduce((a, b) => a + b, 0);
  const order = acres.map((_, i) => i).sort((a, b) => rem[b] - rem[a] || acres[b] - acres[a] || a - b);
  for (const i of order) {
    if (left <= 0) break;
    base[i] += 1;
    left -= 1;
  }
  if (base.reduce((a, b) => a + b, 0) !== amount) throw new Error("[farmbooks-bills] split does not balance");
  return base;
}

/** The herbicide line has no field printed: in Needs review she picks two fields and it splits by acres. */
const SPLIT_LINE = BILL.lines.findIndex((l) => l.field === null);
const SPLIT_FIELDS: readonly FieldId[] = ["home-quarter", "creek-bottom"];
const shares = splitByAcres(BILL.lines[SPLIT_LINE].cents, SPLIT_FIELDS.map(acresOf));
export const SPLIT = {
  line: SPLIT_LINE,
  rows: SPLIT_FIELDS.map((id, i) => ({ id, name: fieldName(id), acres: acresOf(id), cents: shares[i] })),
  totalCents: BILL.lines[SPLIT_LINE].cents,
} as const;
// Spec §6.1, recomputed: $98.50 over 160 + 120 acres is $56.29 + $42.21.
if (shares[0] !== 5629 || shares[1] !== 4221) throw new Error(`[farmbooks-bills] expected 5629/4221, got ${shares.join("/")}`);

/** The scene's rows, with the field each line ends up on (one field, or the split). */
export const LINES = BILL.lines.map((l, i) => ({
  ...l,
  amount: money(l.cents),
  fieldName: l.field ? fieldName(l.field) : null,
  split: i === SPLIT_LINE,
}));

/** What the reader lifts off the paper, in order, with where it sits on the raster. */
export const READ_FIELDS = [
  { k: "vendor", label: "Vendor", value: BILL.vendor, region: "vendor" },
  { k: "invoice", label: "Invoice no.", value: BILL.invoice, region: "invoice" },
  { k: "date", label: "Date", value: BILL.date, region: "date" },
  { k: "total", label: "Printed total", value: money(BILL.totalCents), region: "total" },
] as const;

/* ── The farm's books, Jan 1 to Sep 15, 2024 (invented) ────────────────── */

interface Entry {
  vendor: string;
  category: string;
  field: FieldId;
  cents: number;
  /** Bill lines this entry stands for (the "Line items" KPI counts them). */
  lines: number;
}

const V = {
  sagebrook: business("sagebrook-coop").name,
  cutbank: business("cutbank-ag-supply").name,
  loess: business("loess-ridge-ag-solutions").name,
  dryFork: business("dry-fork-coop").name,
  switchgrass: business("switchgrass-agri-enterprises").name,
  homestead: business("homestead-rural-energy").name,
  ironrow: business("ironrow-equipment").name,
} as const;

/** The three bills booked just before this one (the Bills list), each a ledger entry too. */
export const RECENT_BILLS = [
  { vendor: V.homestead, date: "Sep 10", category: "Utilities – Irrigation", field: "home-quarter" as FieldId, cents: 81202, lines: 1 },
  { vendor: V.sagebrook, date: "Sep 6", category: "Fuel & Oil", field: "east-half" as FieldId, cents: 92700, lines: 1 },
  { vendor: V.ironrow, date: "Aug 29", category: "Repairs & Maintenance", field: "east-half" as FieldId, cents: 48619, lines: 3 },
] as const;

/** Everything else booked so far this year, rolled up by vendor, category and field. */
const EARLIER: readonly Entry[] = [
  { vendor: V.dryFork, category: "Fertilizer & Lime", field: "home-quarter", cents: 1428640, lines: 6 },
  { vendor: V.cutbank, category: "Seed & Plants", field: "home-quarter", cents: 1741200, lines: 4 },
  { vendor: V.loess, category: "Chemicals", field: "home-quarter", cents: 690475, lines: 5 },
  { vendor: V.homestead, category: "Utilities – Irrigation", field: "home-quarter", cents: 480631, lines: 5 },
  { vendor: V.sagebrook, category: "Fuel & Oil", field: "home-quarter", cents: 294018, lines: 7 },
  { vendor: V.dryFork, category: "Fertilizer & Lime", field: "creek-bottom", cents: 1051260, lines: 5 },
  { vendor: V.cutbank, category: "Seed & Plants", field: "creek-bottom", cents: 1305900, lines: 3 },
  { vendor: V.loess, category: "Chemicals", field: "creek-bottom", cents: 517710, lines: 4 },
  { vendor: V.sagebrook, category: "Fuel & Oil", field: "creek-bottom", cents: 220492, lines: 5 },
  { vendor: V.sagebrook, category: "Fertilizer & Lime", field: "east-half", cents: 1684480, lines: 6 },
  { vendor: V.cutbank, category: "Seed & Plants", field: "east-half", cents: 748800, lines: 2 },
  { vendor: V.loess, category: "Chemicals", field: "east-half", cents: 615040, lines: 4 },
  { vendor: V.switchgrass, category: "Custom Hire", field: "east-half", cents: 992000, lines: 2 },
  { vendor: V.sagebrook, category: "Fuel & Oil", field: "east-half", cents: 368437, lines: 8 },
  { vendor: V.ironrow, category: "Repairs & Maintenance", field: "east-half", cents: 279935, lines: 4 },
  { vendor: V.dryFork, category: "Fertilizer & Lime", field: "north-80", cents: 298025, lines: 3 },
  { vendor: V.cutbank, category: "Seed & Plants", field: "north-80", cents: 468800, lines: 2 },
  { vendor: V.loess, category: "Chemicals", field: "north-80", cents: 221460, lines: 2 },
  { vendor: V.sagebrook, category: "Fuel & Oil", field: "north-80", cents: 78844, lines: 3 },
];

/** This bill, as booked: one entry per field it landed on; its 4 printed lines count once each. */
const THIS_BILL: readonly Entry[] = BILL.lines.flatMap((l, i) =>
  i === SPLIT_LINE
    ? SPLIT.rows.map((r, k) => ({ vendor: BILL.vendor, category: l.category, field: r.id, cents: r.cents, lines: k === 0 ? 1 : 0 }))
    : [{ vendor: BILL.vendor, category: l.category, field: l.field as FieldId, cents: l.cents, lines: 1 }],
);

const LEDGER: readonly Entry[] = [...EARLIER, ...RECENT_BILLS, ...THIS_BILL];

function rollup(key: (e: Entry) => string) {
  const m = new Map<string, number>();
  for (const e of LEDGER) m.set(key(e), (m.get(key(e)) ?? 0) + e.cents);
  return [...m].map(([name, c]) => ({ name, cents: c })).sort((a, b) => b.cents - a.cents);
}

const total = LEDGER.reduce((t, e) => t + e.cents, 0);
const byCategory = rollup((e) => e.category);
const byVendor = rollup((e) => e.vendor);
const byField = FIELDS.map((f) => {
  const c = LEDGER.filter((e) => e.field === f.id).reduce((t, e) => t + e.cents, 0);
  return { name: f.name, acres: f.acres, cents: c, perAcreCents: Math.round(c / f.acres) };
}).sort((a, b) => b.perAcreCents - a.perAcreCents);

// The three cuts reconcile to the cent.
for (const [what, cut] of [["category", byCategory], ["vendor", byVendor], ["field", byField]] as const) {
  const s = cut.reduce((t, r) => t + r.cents, 0);
  if (s !== total) throw new Error(`[farmbooks-bills] the ${what} cut sums to ${s}, total is ${total}`);
}
// Every category is a real FarmBooks category name.
const CATEGORY_NAMES = [
  "Chemicals", "Custom Hire", "Fertilizer & Lime", "Fuel & Oil", "Repairs & Maintenance", "Seed & Plants", "Utilities – Irrigation",
];
for (const c of byCategory) if (!CATEGORY_NAMES.includes(c.name)) throw new Error(`[farmbooks-bills] "${c.name}" is not a FarmBooks category`);

export const GLANCE = {
  farm: FARM,
  period: "Jan 1 to Sep 15, 2024",
  totalCents: total,
  lineItems: LEDGER.reduce((t, e) => t + e.lines, 0),
  categories: byCategory,
  vendors: byVendor.slice(0, 5),
  fields: byField,
} as const;

/** The scene's text for the reader that never sees it move (80+ characters, read by the privacy probe). */
export const BILLS_NARRATION =
  `FarmBooks on demonstration data: a ${BILL.vendor} bill for ${money(BILL.totalCents)} is photographed, read line by line, ` +
  `sorted into Schedule F categories and assigned to fields; the herbicide line is split across two fields by acres, ` +
  `the lines are checked against the printed total, the bill is booked, and the year's export shows ${money(total)} spent ` +
  `by category, by vendor and as cost per acre.`;
