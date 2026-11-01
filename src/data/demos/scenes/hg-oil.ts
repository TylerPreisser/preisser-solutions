// src/data/demos/scenes/hg-oil.ts — sample data for the two HG Oil showcase
// scenes (vendor insurance and the saltwater close). Pure data: no React.
//
// Every vendor, agency and disposal name is INVENTED and registered in
// src/data/demos/invented/hg-oil.ts (web-checked). No real vendor, well,
// lease, certificate number or person. Field shapes follow the real engines
// (~/.claude/agent-reports/hg-wow-brief-2026-11-01.md sections 2, 3, 5):
//   COI  ps-admin worker coi.js: vendor marks Covered / Expiring / Not covered,
//        certificate fields of an ACORD 25, one bundled email per agent (R6),
//        reply classes, the admin-inbox hunt, "Needs me" exceptions.
//   SWD  hg-swd: the WATER FIGURES sheet, barrels = (days in month - days down)
//        x BPD, rate FIXED / per barrel with a minimum, invoice WP+MMYY+seq,
//        the six [n/6] phases, the tie-out VENDOR TOLD PAID DELTA STATUS.
// The saltwater close has NO model in it: it is captioned as automation only.
import { business } from "../_invented";

const v = (id: string) => business(id).name;

/* ── Vendor insurance (COI): the AI story ───────────────────────────────── */

export interface WallCounts {
  covered: number;
  expiring: number;
  missing: number;
  needs: number;
}

const TOTAL = 192;

/** The vendor wall at each beat. Every row sums to TOTAL (checked below). */
export const coiCounts: readonly WallCounts[] = [
  { covered: 142, expiring: 36, missing: 14, needs: 0 }, // beat 0-1: today
  { covered: 143, expiring: 36, missing: 13, needs: 0 }, // beat 2: the certificate read is filed
  { covered: 143, expiring: 36, missing: 13, needs: 0 }, // beat 3: one email to the agent
  { covered: 145, expiring: 35, missing: 12, needs: 0 }, // beat 4: two replies filed (one expiring, one missing)
  { covered: 190, expiring: 0, missing: 0, needs: 2 }, // beat 5: the replies are all in
];
for (const c of coiCounts) {
  if (c.covered + c.expiring + c.missing + c.needs !== TOTAL) throw new Error("[hg-oil scene] vendor wall counts must sum to 192");
}
if (coiCounts[0].expiring + coiCounts[0].missing !== 50) throw new Error("[hg-oil scene] the one email must cover the 50 vendors due");

export const coiWallTotal = TOTAL;

/** The certificate the AI reads, field by field (ACORD 25 shape). */
export const coiCertificate = {
  producer: v("plainsview-insurance-group"),
  insured: `${v("chalk-bluff-hot-oil")}, LLC`,
  holder: "HG Oil Holdings, LLC",
  lines: [
    { kind: "General liability", limit: "$1,000,000 each / $2,000,000 total" },
    { kind: "Auto", limit: "$1,000,000 combined" },
    { kind: "Workers comp", limit: "Statutory, $1,000,000 each accident" },
  ],
  period: "03/01/2026 to 03/01/2027",
  additionalInsured: "Yes",
  verdict: "Covered through Mar 1, 2027",
} as const;

export const coiEmail = {
  from: "audit@",
  to: v("plainsview-insurance-group"),
  subject: "Certificates for 50 of your clients",
  body: "Hi there. We're updating vendor insurance records at HG Oil Holdings. Could you send current certificates for the 50 clients listed below, with HG Oil Holdings, LLC as the certificate holder? Thank you.",
  chips: [v("ironweed-water-hauling"), v("red-cedar-roustabout"), v("buckbrush-pipe-supply")],
  more: 47,
} as const;

export interface CoiReply {
  said: string;
  heard: string;
  did: string;
  hunt?: boolean;
}

export const coiReplies: readonly CoiReply[] = [
  {
    said: `Attached is the new certificate for ${v("ironweed-water-hauling")}.`,
    heard: "Certificate attached",
    did: "Read it and filed it. Covered.",
  },
  {
    said: `We sent ${v("red-cedar-roustabout")}'s certificate to your admin inbox last week.`,
    heard: "Says it was sent",
    did: "Found it in the admin inbox and filed it.",
    hunt: true,
  },
  {
    said: `${v("buckbrush-pipe-supply")} moved to another agency.`,
    heard: "Not their agent",
    did: "Contact updated. Asking the vendor directly.",
  },
];

export const coiExceptions = [
  { vendor: v("quarry-hill-welding"), why: "Certificate lists the wrong holder.", act: "Ask them again" },
  { vendor: v("buckbrush-pipe-supply"), why: "Says a paper copy is in the mail.", act: "Mark received" },
] as const;

export const coiCaptions = [
  "50 of 192 vendors need a current certificate today.",
  "50 of 192 vendors need a current certificate today.",
  "The AI reads each certificate field by field and checks it.",
  "One email to their insurance agent covers all 50 vendors.",
  "The AI reads every reply. Told it was sent, it searches the inbox.",
  "The wall turns green. Only the exceptions reach a person.",
] as const;

/** Beat cues, ms from the start of a run. */
export const coiCues = [250, 2300, 4700, 7300, 10600] as const;

export const coiSummary =
  "Demonstration: HG Oil's vendor insurance, kept by AI. A wall of 192 vendors starts with 50 needing a certificate. " +
  "The AI reads an incoming certificate field by field and files it, sends one email to an insurance agent covering 50 vendors, " +
  "reads the replies and searches the admin inbox when told a certificate was already sent. The wall turns green and only two exceptions are left for a person.";

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
  "The files land with accounting. A person releases every one.",
] as const;

export const swdCues = [250, 1900, 3300, 6100, 10500] as const;

export const swdSummary =
  "Demonstration: HG Oil's saltwater disposal close, run by automation. The field confirms a well's barrels per day in the water sheet, " +
  "one Run press works through six phases in under a minute, each invoice line comes from one formula, and the tie-out holds a vendor told $660.48 " +
  "but paid $330.24 until it matches. The import files and a pack of 17 statements land with accounting and no vendor is emailed.";
