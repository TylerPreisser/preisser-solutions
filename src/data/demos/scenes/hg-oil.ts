// src/data/demos/scenes/hg-oil.ts — sample data for the HG Oil saltwater close
// scene. Pure data: no React. (The vendor insurance scene's data lives in
// src/data/showcase/scenes/hg-coi.ts since ADR-0022.)
//
// Every vendor, agency and disposal name is INVENTED and registered in
// src/data/demos/invented/hg-oil.ts (web-checked). No real vendor, well,
// lease, certificate number or person. Field shapes follow the real engines
// (~/.claude/agent-reports/hg-wow-brief-2026-11-01.md sections 2, 3, 5):
//   SWD  hg-swd: the WATER FIGURES sheet, barrels = (days in month - days down)
//        x BPD, rate FIXED / per barrel with a minimum, invoice WP+MMYY+seq,
//        the six [n/6] phases, the tie-out VENDOR TOLD PAID DELTA STATUS.
// The saltwater close has NO model in it: it is captioned as automation only.
import { business } from "../_invented";

const v = (id: string) => business(id).name;

/* ── Saltwater close (SWD): automation, not AI ──────────────────────────── */

export const swdMonth = { label: "October 2026", days: 31, mmyy: "1026" } as const;

export interface SwdRow {
  vendor: string;
  swd: string;
  lease: string;
  bpd: number;
  down: number;
  rate: { kind: "per-bbl"; price: number; min?: number } | { kind: "fixed"; price: number };
}

export const swdRows: readonly SwdRow[] = [
  { vendor: v("cedar-draw-disposal"), swd: "SWD #14", lease: "Lease 1-12", bpd: 103, down: 0, rate: { kind: "per-bbl", price: 0.2 } },
  { vendor: v("kettle-creek-water"), swd: "SWD #3", lease: "Lease 4-7", bpd: 45, down: 3, rate: { kind: "per-bbl", price: 0.25 } },
  { vendor: v("sandhill-injection"), swd: "SWD #9", lease: "Lease 2-30", bpd: 70, down: 0, rate: { kind: "fixed", price: 400 } },
  { vendor: v("low-ridge-disposal"), swd: "SWD #21", lease: "Lease 6-2", bpd: 60, down: 0, rate: { kind: "per-bbl", price: 0.18, min: 350 } },
  { vendor: v("thornbush-water"), swd: "SWD #6", lease: "Lease 3-15", bpd: 80, down: 2, rate: { kind: "per-bbl", price: 0.22 } },
  { vendor: v("copper-flats-disposal"), swd: "SWD #11", lease: "Lease 5-9", bpd: 172, down: 7, rate: { kind: "per-bbl", price: 0.16 } },
];

/** The field's correction the scene opens on: row 0's BPD, 98 confirmed up to 103. */
export const swdEdit = { row: 0, was: 98 } as const;

const cents = (n: number) => Math.round(n * 100) / 100;

/** hg-swd swd.py compute(): days = month - down; barrels = days x BPD; fixed, or per barrel with a minimum. */
export function swdAmount(r: SwdRow, days = swdMonth.days) {
  const d = Math.max(0, days - r.down);
  if (d === 0) return 0;
  if (r.rate.kind === "fixed") return r.rate.price;
  const amt = cents(d * r.bpd * r.rate.price);
  return r.rate.min ? Math.max(r.rate.min, amt) : amt;
}

export const swdInvoices = swdRows.map((r, i) => ({
  no: `WP${swdMonth.mmyy}-${String(i + 1).padStart(2, "0")}`,
  vendor: r.vendor,
  amount: swdAmount(r),
}));
export const swdInvoiceCount = 17;
export const swdAgreements = 74;

// Will's worked example, with the vendor's name replaced: 103 x $0.20 x 31 days = $638.60.
if (swdAmount(swdRows[0]) !== 638.6) throw new Error("[hg-oil scene] the shown formula must come to $638.60");
if (swdAmount(swdRows[5]) !== 660.48) throw new Error("[hg-oil scene] the tie-out row must be told $660.48");

/** The tie-out: what each vendor is told (statement) against what they are paid (A/P import). */
export const swdTie = swdInvoices.map((inv, i) => ({
  vendor: inv.vendor,
  told: inv.amount,
  // The one the gate catches: a shared charge paid at half.
  paid: i === 5 ? cents(inv.amount / 2) : inv.amount,
  caught: i === 5,
}));
if (swdTie[5].paid !== 330.24) throw new Error("[hg-oil scene] the caught row must be paid $330.24");

export const swdPhases = [
  "Read the live sheet",
  "Accounting imports",
  "Backup PDF",
  "Statement pack",
  "Month frozen",
  "Tie-out",
] as const;

/** Real closes take 42 to 70 seconds of engine work (ps-admin progress.js:3-5). */
export const swdElapsedSec = 52;

export const swdFiles = {
  controller: ["A/P import", "GL import", "Backup PDF", "October master"],
  ap: "Statement pack, 17 PDFs",
} as const;

export const swdCaptions = [
  "The field confirms each well's water in the sheet.",
  "The field confirms each well's water in the sheet.",
  "One press of Run starts the close.",
  "Every invoice line comes from one formula.",
  "The tie-out holds a payment that doesn't match its statement.",
  "The files land with accounting in under a minute, and a person still releases every one.",
] as const;

export const swdCues = [250, 1900, 3300, 6100, 11300] as const;

/**
 * Desk camera (1280 x 800): the sheet while the field confirms the barrels,
 * then the right-hand card each step is about, at about 1:1, so the tie-out's
 * held row (told $660.48, paid $330.24) reads at 14 css px or more in every
 * popover width (critique r6 C2). The last shot is the reduced-motion frame.
 */
const STAGE = { x: 662, w: 620, h: 388 } as const;
const WIDE = { x: 514, w: 746, h: 466 } as const;
export const swdDeskCam = [
  { at: 0, x: 30, y: 88, w: 640, h: 400 },
  { at: swdCues[1], ...STAGE, y: 92 },
  { at: swdCues[3], ...WIDE, y: 96 },
  { at: swdCues[4], ...WIDE, y: 112 },
] as const;

/**
 * Phone camera (300 x 520): the sheet and the Run bar, ending above the Run log's
 * lines (they belong to the next step, critique r10 MF2); then the card each step
 * is about; last, the files with the outcome card whole (r10 MF3).
 */
export const swdCam = [
  { at: 0, y: 40, h: 280, top: true, until: ".swd-log__lines" },
  { at: swdCues[1], y: 236, h: 254, top: true },
  { at: swdCues[4], y: 236, h: 254, top: true, keep: ".swd-outcome" },
] as const;

export const swdSummary =
  "Demonstration: HG Oil's saltwater disposal close, run by automation. The field confirms a well's barrels per day in the water sheet, " +
  "one Run press works through six phases in under a minute, each invoice line comes from one formula, and the tie-out holds a vendor told $660.48 " +
  "but paid $330.24 until it matches. The import files and a pack of 17 statements land with accounting, and nothing goes to a vendor until a person releases it.";

