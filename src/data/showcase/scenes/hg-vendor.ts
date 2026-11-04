// src/data/showcase/scenes/hg-vendor.ts — HG Oil "Vendor Insurance" (ADR-0025 §2, design-spec-r2 §2).
// Pure data: no React. The scene is src/components/showcase/scenes/HgVendorScene.tsx.
//
// A certificate arrives, four checks tick green, "Good to go", and it files
// itself to the vendor's folder. No email chase and no gap step (ADR-0025 §2).
//
// The certificate is drawn ONCE by scripts/render-acord.mjs from the real
// Acord25 component and this module's VENDOR_CERT, into a raster under
// public/images/demos/hg-oil/ (the regions it measures land in
// hg-vendor-regions.ts). Re-run the script whenever VENDOR_CERT changes.
//
// Every person, business, town and domain comes from the invented-name
// registry (src/data/demos/invented/hg-oil.ts) through the helpers below, so a
// name that is not registered fails the build. All of it is demonstration data.
// This module is self-contained on purpose: it does not import the retired
// COI scene's data (hg-coi.ts), so that file can be deleted without touching it.
import type { ComponentProps } from "react";
import type { Acord25 } from "@/components/showcase/scenes/Acord25";
import { business, domain, person, town } from "@/data/demos/_invented";

/** The shape Acord25 draws (its own prop type, so the two never drift). */
export type VendorCert = ComponentProps<typeof Acord25>["c"];

const vendor = business("prairie-dog-pumping");
const agency = business("smoky-valley-insurance").name;
const agent = person("hg-coi-marcy");

/** The vendor whose certificate arrives. */
export const VENDOR = vendor.name; // "Prairie Dog Pumping, LLC"
const VENDOR_SHORT = vendor.aliases?.[0] ?? vendor.name;

/**
 * The certificate: the renewal term, in force on the day the site is read
 * (10/12/2026 to 10/12/2027), issued two days into the term. Limits match the
 * checklist below; the holder block is a placeholder address on purpose.
 */
export const VENDOR_CERT: VendorCert = {
  date: "10/14/2026",
  producer: {
    lines: [agency, "118 W Main St", `${town("hg-aldervale").name}, KS 67200`],
    contact: `${agent.first} ${agent.last}`,
    phone: "(785) 555-0147",
    fax: "(785) 555-0148",
    email: `${agent.first.toLowerCase()}@${domain("hg-coi-agency")}`,
  },
  insured: [VENDOR, "2210 County Road 9", `${town("hg-emberton").name}, KS 67100`],
  insurers: [
    { letter: "A", name: business("larkspur-ridge-casualty").name, naic: "24571" },
    { letter: "B", name: business("ninebark-mutual").name, naic: "31806" },
  ],
  certificateNumber: "CL2610142",
  gl: {
    ltr: "A",
    addl: "Y",
    subr: "Y",
    number: "CPP 5520931",
    eff: "10/12/2026",
    exp: "10/12/2027",
    eachOcc: "1,000,000",
    rented: "100,000",
    med: "5,000",
    pai: "1,000,000",
    genAgg: "2,000,000",
    prodAgg: "2,000,000",
  },
  auto: { ltr: "A", addl: "Y", subr: "Y", number: "BA 5520932", eff: "10/12/2026", exp: "10/12/2027", csl: "1,000,000" },
  umbrella: { ltr: "A", addl: "", subr: "", number: "CU 5520933", eff: "10/12/2026", exp: "10/12/2027", eachOcc: "2,000,000", agg: "2,000,000", retention: "10,000" },
  wc: {
    ltr: "B",
    addl: "",
    subr: "Y",
    number: "WC 9914276",
    eff: "10/12/2026",
    exp: "10/12/2027",
    excluded: "N",
    each: "1,000,000",
    disEmp: "1,000,000",
    disPol: "1,000,000",
  },
  description:
    "Oil and gas well pumping and lease service. Certificate holder is additional insured on general liability and auto, " +
    "and waiver of subrogation applies to general liability, auto and workers compensation, where required by written contract.",
  holder: ["HG Oil Holdings, LLC", "PO Box 000", `${town("hg-anytown").name}, KS 00000`],
};

/** The file the certificate arrived as. */
export const VENDOR_FILE = `${VENDOR_SHORT} COI 2026-27.pdf`;
export const ACORD_ALT = `ACORD 25 certificate of liability insurance for ${VENDOR}, demonstration data`;

export type CheckKey = "type" | "dates" | "limits" | "holder";

/** The four checks, in order. `value` is the desk line; `short` the phone line (one line at 390). */
export const CHECKS: readonly { key: CheckKey; label: string; value: string; short: string }[] = [
  { key: "type", label: "Coverage type", value: "General liability · Auto · Umbrella · Workers' comp", short: "Liability · Auto · Umbrella · Comp" },
  { key: "dates", label: "Effective dates", value: "10/12/2026 to 10/12/2027 · in force today", short: "10/12/2026 to 10/12/2027" },
  { key: "limits", label: "Limits", value: "$1M each occurrence · $2M aggregate", short: "$1M each · $2M total" },
  { key: "holder", label: "Certificate holder", value: "HG Oil Holdings, LLC", short: "HG Oil Holdings, LLC" },
];

/** The vendor files the certificate lands in (invented vendors; the open one is the certificate's). */
export const FILES: readonly { name: string; count: number; open?: boolean }[] = [
  { name: business("chalk-bluff-hot-oil").name, count: 2 },
  { name: business("ironweed-water-hauling").name, count: 2 },
  { name: VENDOR, count: 3, open: true },
  { name: business("quarry-hill-welding").name, count: 2 },
  { name: business("red-cedar-roustabout").name, count: 2 },
];
export const FILED = {
  heading: `Filed to ${VENDOR_SHORT}`,
  headingPhone: "Vendor files",
  title: "Certificate 2026-27",
  sub: "Expires 10/12/2027 · checked just now",
  status: "Covered",
} as const;

/* ── The clock (ms from the beat's start; design-spec-r2 §2.3) ─────────────── */

export type StepId = "arrives" | "checks" | "good" | "filed";
/** The four steps and where each starts; a step ends where the next starts. */
export const STEPS: readonly { id: StepId; title: string; at: number; caption: string }[] = [
  { id: "arrives", title: "Arrives", at: 0, caption: "A vendor's certificate of insurance arrives." },
  { id: "checks", title: "Checks", at: 1200, caption: "It checks the coverage, the dates, the limits and the holder." },
  { id: "good", title: "Good to go", at: 5600, caption: "Every check passes: good to go." },
  { id: "filed", title: "Filed", at: 7400, caption: "Filed to the vendor's folder, with its expiry date on record." },
];
export const VENDOR_TOTAL_MS = 13000;

export const T = {
  /** The vendor column fades in (40 ms stagger per row). */
  sideIn: 200,
  scanFrom: 1200,
  scanTo: 2600,
  /** Check i starts at checkAt[i]: its box draws and its icon spins. */
  checkAt: [2700, 3450, 4200, 4950] as const,
  /** After its start: the row ticks and the box turns green... */
  tickAfter: 420,
  /** ...and the box fades out (only the current box is ever on the page). */
  boxOffAfter: 920,
  verdict: 5600,
  filed: 7400,
  fly: 7600,
  flyMs: 700,
  open: 8300,
} as const;

/** Every moment the picture changes, in order: the scene re-renders only at these. */
export const CUES: readonly number[] = [
  ...new Set([
    0,
    T.sideIn,
    T.scanFrom,
    T.scanTo,
    ...T.checkAt.flatMap((a) => [a, a + T.tickAfter, a + T.boxOffAfter]),
    T.verdict,
    T.filed,
    T.fly,
    T.open,
    VENDOR_TOTAL_MS,
  ]),
].sort((a, b) => a - b);
