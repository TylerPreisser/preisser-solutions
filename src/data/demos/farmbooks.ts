import { defineStages } from "./_define";
import { business, town } from "./_invented";

/**
 * FarmBooks Proof Stage fixture (ADR-0016). A pinned transplant of the FarmBooks showcase
 * (farm-books.com), sha 8cbbbb4 — see scenes/farmbooks/SOURCE.md for the full transform list.
 *
 * Every amount below is a plain dollar float, ported verbatim from the FarmBooks source literals
 * (which are themselves exact to the cent, never computed) rather than rewritten as integer
 * cents — see SOURCE.md "Money representation" for why. Every TOTAL is derived (a getter or a
 * reduce), never typed a second time, so an edited line shows up as a failing invariant instead
 * of a silently wrong page. Names come only from the registry (`business`, `town`,
 * invented/farmbooks.ts) — never a literal string.
 */

/* ------------------------------------------------------------------------ the read: one bill --- */

export interface ReadRegion {
  id: string;
  label: string;
  value: string;
  num?: boolean;
  /** Normalized box over the photograph's own 1110x1440 frame. */
  box: { x: number; y: number; w: number; h: number };
  /** The read/lines/check step this field's box arrives on. */
  step: number;
}

export const TICKET_SRC = "/images/demos/farmbooks/fuel-ticket-photo.jpg";
/** Deliberately never says the payer name printed on the photograph itself — see SOURCE.md. */
export const TICKET_ALT =
  "A paper farm-supply invoice photographed on a truck tailgate: " +
  `${business("prairie-general-farm-supply").name}, invoice 49813, four line items for diesel, seed corn, ` +
  "herbicide and hydraulic fluid, total $700.50.";

export const READ_REGIONS: readonly ReadRegion[] = [
  { id: "vendor", label: "Vendor", value: business("prairie-general-farm-supply").name, box: { x: 0.108, y: 0.09, w: 0.491, h: 0.083 }, step: 2 },
  { id: "date", label: "Date", value: "Sept 15, 2024", box: { x: 0.683, y: 0.101, w: 0.196, h: 0.031 }, step: 2 },
  { id: "invoice", label: "Invoice no.", value: "49813", box: { x: 0.665, y: 0.128, w: 0.218, h: 0.031 }, step: 2 },
  { id: "line1", label: "Tractor diesel", value: "$320.00", num: true, box: { x: 0.101, y: 0.379, w: 0.775, h: 0.035 }, step: 3 },
  { id: "line2", label: "Grange seed corn", value: "$215.00", num: true, box: { x: 0.101, y: 0.412, w: 0.775, h: 0.035 }, step: 3 },
  { id: "line3", label: "Herbicide mix", value: "$98.50", num: true, box: { x: 0.101, y: 0.445, w: 0.775, h: 0.035 }, step: 3 },
  { id: "line4", label: "Hydraulic fluid", value: "$67.00", num: true, box: { x: 0.101, y: 0.478, w: 0.775, h: 0.035 }, step: 3 },
  { id: "total", label: "Printed total", value: "$700.50", num: true, box: { x: 0.606, y: 0.601, w: 0.27, h: 0.035 }, step: 5 },
];

/** The four charged lines, in printed order. */
export const READ_LINES = READ_REGIONS.filter((r) => r.id.startsWith("line"));

export interface SortedLine {
  printed: string;
  category: string;
  amount: number;
}
/** What each printed line is FOR. The vendor's own words stay beside the category, forever. */
export const READ_SORTED: readonly SortedLine[] = [
  { printed: "TRACTOR DIESEL, 100 GAL.", category: "Fuel & Oil", amount: 320 },
  { printed: "GRANGE SEED CORN, 4 BAGS", category: "Seed", amount: 215 },
  { printed: "HERBICIDE MIX, 1 JUG", category: "Chemicals", amount: 98.5 },
  { printed: "HYDRAULIC FLUID, 5 GAL.", category: "Repairs & Maintenance", amount: 67 },
];

/** Sum of the four lines, and the total the bill prints — derived so they cannot drift apart. */
export const READ_LINE_SUM = READ_SORTED.reduce((t, r) => t + r.amount, 0);
export const READ_PRINTED_TOTAL = 700.5;
if (Math.round(READ_LINE_SUM * 100) !== Math.round(READ_PRINTED_TOTAL * 100)) {
  throw new Error("[farmbooks fixture] the read: the four lines no longer sum to the printed total");
}
/** Cents, for the step engine's data-count-to counter (usd-cents format). */
export const READ_LINE_SUM_CENTS = Math.round(READ_LINE_SUM * 100);

export const READ_STEP_TITLES = [
  "You take one picture",
  "It knows who the bill is from",
  "Every line, and what you were charged for it",
  "It files them under your categories",
  "It checks the bill against itself",
  "In the books",
] as const;

export const READ_STEP_BODIES = [
  "On the tailgate, in the sun. The camera will not let you take a blurry one: it waits until the light, the framing and the focus are good, then the shutter arms.",
  "Vendor, date, invoice number: read off the paper and kept exactly as they were printed. You do not type any of it.",
  "Diesel, seed corn, herbicide, hydraulic fluid. Four lines, four amounts, straight off a folded piece of paper.",
  "Each line lands in the category it belongs to, and the words the vendor printed stay beside it. Co-op shorthand gets translated; the original never gets thrown away.",
  "The four lines have to add up to the total printed at the bottom, within two cents, or the bill stops and waits for you.",
  "One photograph in, one bill filed, four categories updated. Nothing typed, nothing to remember at year end.",
] as const;

/* ------------------------------------------------------------------------- the books: one month - */

export interface MonthCategory {
  label: string;
  amount: number;
  bills: number;
}
/**
 * One June for the invented farm. `fraction` is derived below (each row's amount over the
 * largest), the shipped app's own rule, never typed — so an edited amount cannot leave a fill bar
 * pointing at the wrong proportion.
 */
export const MONTH: readonly MonthCategory[] = [
  { label: "Fuel & Oil", amount: 18240.16, bills: 14 },
  { label: "Fertilizer & Lime", amount: 14904.8, bills: 6 },
  { label: "Chemicals", amount: 9318.45, bills: 5 },
  { label: "Repairs & Maintenance", amount: 6742.19, bills: 9 },
  { label: "Utilities – Irrigation", amount: 3411.07, bills: 3 },
  { label: "Seed & Plants", amount: 2702.33, bills: 1 },
];
export const MONTH_LARGEST = Math.max(...MONTH.map((r) => r.amount));
export const monthFraction = (amount: number): number => Math.max(0.03, Math.min(1, amount / MONTH_LARGEST));
export const MONTH_TOTAL = MONTH.reduce((sum, row) => sum + row.amount, 0);
export const MONTH_BILLS = MONTH.reduce((sum, row) => sum + row.bills, 0);

export const MONTH_STEP_CAPTIONS = [
  "Fuel & Oil, the month's biggest bill.",
  "Fertilizer & Lime, six bills in one line.",
  "Chemicals, five bills sprayed and booked.",
  "Repairs & Maintenance, nine tickets tallied.",
  "Utilities – Irrigation, three meters read.",
  "Seed & Plants, closed out for June.",
] as const;

/* --------------------------------------------------------------- what goes wrong: three scenarios */

/** A — the co-op's own bill does not reach its own printed total. */
export const COOP_BILL: readonly { label: string; amount: number }[] = [
  { label: "Anhydrous, spread", amount: 6318.0 },
  { label: "Dry blend, two fields", amount: 2204.5 },
  { label: "Seed treatment", amount: 1140.0 },
  { label: "Diesel, farm delivery", amount: 987.25 },
];
export const COOP_LINE_SUM = COOP_BILL.reduce((t, r) => t + r.amount, 0);
export const COOP_OVERCHARGE = 410.0;
export const COOP_PRINTED_TOTAL = COOP_LINE_SUM + COOP_OVERCHARGE;

/** B — one application billed whole to the farm, on 1/3-2/3 crop-share ground. */
export const SHARE_APPLICATION = 12000.0;
export const SHARE_FARM_PARTS = 1;
export const SHARE_LANDOWNER_PARTS = 2;
export const SHARE_FARM = (SHARE_APPLICATION * SHARE_FARM_PARTS) / (SHARE_FARM_PARTS + SHARE_LANDOWNER_PARTS);
export const SHARE_LANDOWNER = SHARE_APPLICATION - SHARE_FARM;

/** C — one load, billed once on the ticket and again on the monthly statement. */
export const RELIST_AMOUNT = 8412.0;
export const RELIST_DOC = "TICKET 20441";

export const CAUGHT_CARDS: readonly { id: string; title: string; caption: string }[] = [
  {
    id: "coop-bill",
    title: "The co-op billed you wrong.",
    caption: "The co-op's four lines do not reach their own printed total. The bill waits for you.",
  },
  {
    id: "crop-share",
    title: "You were billed for ground you farm on shares.",
    caption: "An application billed to you whole becomes your share, and the rest a debt owed back.",
  },
  {
    id: "relisted-load",
    title: "The same load, billed twice.",
    caption: "A month-end statement relists a load already posted; the second copy never posts.",
  },
];

/* ---------------------------------------------------------------------------- your year: the file */

export interface WorkbookRow {
  name: string;
  amount: number;
  acres?: number;
  note?: string;
}

/**
 * One invented crop year, three cuts of the same total. Sums are derived below, never typed, so a
 * mistyped row shows up as a failing total rather than a silently wrong page.
 */
export const WORKBOOK = {
  farm: business("coyote-draw-farms").name,
  period: "Jan–Dec 2026",
  lineItems: 61,
  // critic-FB M4: "documents read" for the whole year must never read lower than a single
  // month's own bill count (MONTH_BILLS, "the books" beat, below) — derived from it, with a
  // margin for the rest of the year, so the two figures can no longer disagree by construction.
  get documents(): number {
    return MONTH_BILLS + 4;
  },
  categories: [
    { name: "Fertilizer & Lime", amount: 104174.93 },
    { name: "Seed & Plants", amount: 53345.63 },
    { name: "Chemicals", amount: 47614.25 },
    { name: "Utilities – Irrigation", amount: 39928.0 },
    { name: "Fuel & Oil", amount: 29614.36 },
    { name: "Custom Hire", amount: 26202.0 },
    { name: "Insurance", amount: 20800.6 },
    { name: "Repairs & Maintenance", amount: 12210.61 },
    { name: "Interest", amount: 9852.08 },
    { name: "Freight & Trucking", amount: 4538.0 },
    { name: "Supplies", amount: 2284.36 },
  ] as readonly WorkbookRow[],
  vendors: [
    { name: business("cutbank-ag-supply").name, amount: 55816.36 },
    { name: business("sagebrook-coop").name, amount: 55629.99 },
    { name: business("loess-ridge-ag-solutions").name, amount: 55090.54 },
    { name: business("dry-fork-coop").name, amount: 53622.39 },
    { name: business("switchgrass-agri-enterprises").name, amount: 47614.25 },
    { name: business("homestead-rural-energy").name, amount: 39928.0 },
    { name: business("shortgrass-mutual-insurance").name, amount: 20800.6 },
    { name: business("ironrow-equipment").name, amount: 11591.84 },
    { name: business("furrowline-equipment-finance").name, amount: 10470.85 },
  ] as readonly WorkbookRow[],
  fields: [
    { name: town("home-quarter").name, amount: 98004.65, acres: 160 },
    { name: town("creek-bottom").name, amount: 73037.83, acres: 120 },
    { name: town("east-half").name, amount: 65840.24, acres: 320 },
    { name: town("sundown-quarter").name, amount: 28188.47, acres: 155 },
    { name: town("north-80").name, amount: 16462.12, acres: 80 },
    { name: town("shop-and-yard").name, amount: 6480.11, note: "Acres needed" },
    { name: town("general-expenses").name, amount: 62551.4, note: "Not tied to a field" },
  ] as readonly WorkbookRow[],
  get totalSpent(): number {
    return this.categories.reduce((sum, r) => sum + r.amount, 0);
  },
  get acres(): number {
    return this.fields.reduce((sum, r) => sum + (r.acres ?? 0), 0);
  },
};

const centsOf = (n: number) => Math.round(n * 100);
const sumIsEqual = (a: number, b: number) => centsOf(a) === centsOf(b);
if (!sumIsEqual(WORKBOOK.vendors.reduce((s, r) => s + r.amount, 0), WORKBOOK.totalSpent)) {
  throw new Error("[farmbooks fixture] your year: the vendor cut no longer matches the category total");
}
if (!sumIsEqual(WORKBOOK.fields.reduce((s, r) => s + r.amount, 0), WORKBOOK.totalSpent)) {
  throw new Error("[farmbooks fixture] your year: the field cut no longer matches the category total");
}

export type YearView = "categories" | "vendors" | "fields";
export const YEAR_VIEWS: readonly { id: YearView; tab: string; blurb: string }[] = [
  { id: "categories", tab: "By category", blurb: "Every line resolved into a Schedule F category." },
  { id: "vendors", tab: "By vendor", blurb: "Who you actually paid, across the whole year." },
  { id: "fields", tab: "By field", blurb: "What each piece of ground cost you to farm." },
];
export const yearLargest = (view: YearView, byRate: boolean): number => {
  const rows = WORKBOOK[view];
  const metric = (r: WorkbookRow) => (byRate && view === "fields" && r.acres ? r.amount / r.acres : r.amount);
  return Math.max(...rows.map(metric));
};

/* --------------------------------------------------------------------------------- the stage --- */

export const stages = defineStages([
  {
    shape: "beats",
    id: "farmbooks-showcase",
    title: "Watch it read a bill, then close the books.",
    kicker: "One photograph in the field, one crop year out.",
    skin: "farmbooks",
    narration: {
      label: "Demonstration data",
      description:
        "This stage shows FarmBooks reading a photographed farm bill, filing its lines into " +
        "categories, checking its own arithmetic, catching three common billing mistakes, and " +
        "closing a crop year into a workbook you can export. The farm, the vendors, the fields " +
        "and every amount shown are a demonstration, invented for this page.",
    },
    beats: [
      {
        kind: "read",
        id: "read",
        caption: "One bill, straight off the tailgate.",
        steps: READ_STEP_TITLES.map((title, i) => ({ caption: title, holdMs: i === 5 ? 2600 : 1900 })),
      },
      {
        kind: "screen",
        // critic-FB M2: "books" and "year" both defaulted to the kind-based eyebrow "The
        // screen"; each Screen beat now carries its own distinct label, and the caption is
        // restored to the source's own section headline.
        eyebrow: "The books",
        id: "books",
        caption: "Your whole June, added up.",
        chrome: "FarmBooks · Month",
        steps: MONTH_STEP_CAPTIONS.map((caption) => ({ caption, holdMs: 1500 })),
      },
      {
        kind: "caught",
        id: "caught",
        caption: "Three ways a bill costs you more than it should.",
        cards: CAUGHT_CARDS,
      },
      {
        kind: "screen",
        eyebrow: "Your year",
        id: "year",
        caption: "The whole year, three ways, on one screen.",
        chrome: "FarmBooks · Your year",
        steps: [{ caption: "Every cut of the year adds to the same total.", holdMs: 2200 }],
        artifact: { label: "farm-books-2026.xlsx" },
      },
    ],
  },
]);
