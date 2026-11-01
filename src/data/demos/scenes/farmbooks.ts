// src/data/demos/scenes/farmbooks.ts — sample data for the FarmBooks showcase
// scene (a paper bill read, checked and filed). Pure data: no React.
//
// Vendors and fields come from the FarmBooks invented registry
// (src/data/demos/invented/farmbooks.ts, already web-checked). Shapes follow the
// real pipeline (~/.claude/agent-reports/farmbooks-wow-brief-2026-11-01.md
// section 2): the vendor's printed words stay beside the plain-English line,
// the translation never touches the money, the line sum is checked against the
// printed total within 2 cents (validate.py AMOUNT_TOL), a mismatch holds the
// bill, and a crop-share bill splits in whole parts (farm 1, landowner 2).
//
// Deliberately NOT the site's own scenario A lines: on farm-books.com the four
// printed lines add to $10,849.75 while the page says $10,649.75. Here the
// diesel line is $787.25, so the lines really do sum to $10,649.75.
import { business, town } from "../_invented";

export const fbBill = {
  vendor: business("prairie-general-farm-supply").name,
  date: "Sep 15, 2026",
  invoice: "#49813",
  lines: [
    { printed: "ANHYD 82-0-0 SPRD", plain: "Anhydrous ammonia, spread", category: "Fertilizer & Lime", amount: 6518.0 },
    { printed: "DRY BLND 2 FLDS", plain: "Dry fertilizer blend, two fields", category: "Fertilizer & Lime", amount: 2204.5 },
    { printed: "SEED TRT", plain: "Seed treatment", category: "Seed & Plants", amount: 1140.0 },
    { printed: "DSL FARM DLVY", plain: "Diesel, delivered to the farm", category: "Fuel & Oil", amount: 787.25 },
  ],
  printedTotal: 11059.75,
} as const;

const sum = (xs: readonly number[]) => Math.round(xs.reduce((a, b) => a + b, 0) * 100) / 100;
export const fbLineSum = sum(fbBill.lines.map((l) => l.amount));
export const fbOffBy = Math.round((fbBill.printedTotal - fbLineSum) * 100) / 100;
if (fbLineSum !== 10649.75) throw new Error("[farmbooks scene] the four lines must sum to $10,649.75");
if (fbOffBy !== 410) throw new Error("[farmbooks scene] the bill must be off by $410.00");

export const fbShare = {
  vendor: business("sagebrook-coop").name,
  field: town("north-80").name,
  what: "Fertilizer",
  total: 12000,
  parts: { farm: 1, landowner: 2 },
} as const;
export const fbFarmPart = (fbShare.total * fbShare.parts.farm) / (fbShare.parts.farm + fbShare.parts.landowner);
export const fbLandownerPart = fbShare.total - fbFarmPart;
if (fbFarmPart !== 4000 || fbLandownerPart !== 8000) throw new Error("[farmbooks scene] the 1:2 split must be $4,000.00 / $8,000.00");

/** The farm's books for the crop year: only the farm's share of the clean bill lands; the held bill waits. */
export const fbYear = { label: "Crop year 2026", before: 186412.37 } as const;
export const fbYearAfter = Math.round((fbYear.before + fbFarmPart) * 100) / 100;

export const fbCaptions = [
  "Snap a photo of the bill. Nobody types it in.",
  "Snap a photo of the bill. Nobody types it in.",
  "Every line comes back in plain words, filed under your categories.",
  "The lines come to $410.00 less than the total, so the bill waits.",
  "A clean bill files itself, and the landowner's share is split out.",
] as const;

export const fbCues = [250, 3000, 6400, 9900] as const;

export const fbSummary =
  "Demonstration: FarmBooks reading a farm supply bill. A photographed bill is read with no typing, each line in co-op shorthand comes back in plain words " +
  "under a category, the four lines add to $10,649.75 against a printed total of $11,059.75 so the bill is held for review, " +
  "and a clean $12,000.00 bill splits into the farm's $4,000.00 and the landowner's $8,000.00.";
