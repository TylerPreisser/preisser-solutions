// src/data/demos/duffer-golf.ts — the Duffer Golf Command Center, on invented data.
// ADR-0016 §5 / ADR-0020: every course and town comes from the registry; every
// total is DERIVED from the rows below, never typed. Nothing here was read from
// the partner program's database.
import { business, town } from "./_invented";

/** Scans per day across the network, oldest first, 30 days. Invented. */
const SCANS_PER_DAY = [
  3, 9, 4, 0, 7, 11, 6, 2, 8, 12, 5, 3, 10, 7, 9, 4, 13, 6, 2, 11, 8, 5, 12, 9, 3, 10, 14, 7, 6, 14,
] as const;

/** Leads per day, same window. Invented. */
const LEADS_PER_DAY = [
  0, 1, 0, 0, 1, 2, 0, 0, 1, 1, 0, 0, 2, 0, 1, 0, 2, 1, 0, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 2,
] as const;

const sum = (xs: readonly number[]) => xs.reduce((a, b) => a + b, 0);
const last = (xs: readonly number[], n: number) => xs.slice(xs.length - n);

export interface DufferPartner {
  name: string;
  short: string;
  town: string;
  display: number;
  scans30: number;
}

const partner = (id: string, townId: string, display: number, scans30: number): DufferPartner => {
  const b = business(id);
  return { name: b.name, short: b.aliases?.[0] ?? b.name, town: town(townId).name, display, scans30 };
};

export const dufferPartners: readonly DufferPartner[] = [
  partner("sumac-ridge-gc", "tull-prairie", 14, 61),
  partner("lone-cottonwood-gc", "brannick", 9, 38),
  partner("wheatgrass-pines-gc", "osgood-bend", 21, 27),
];

export type FeedKind = "Scan" | "Page view" | "Still reading" | "Lead submitted" | "Buy click";

export interface FeedRow {
  time: string;
  kind: FeedKind;
  display: number;
  partner: string;
  where: string;
}

const row = (time: string, kind: FeedKind, p: DufferPartner): FeedRow => ({
  time,
  kind,
  display: p.display,
  partner: p.name,
  where: `${p.town}, KS · mobile · iOS`,
});

const [sumac, cottonwood, wheatgrass] = dufferPartners;

/** Newest first. The first row is the one that arrives live on the stage. */
export const dufferFeed: readonly FeedRow[] = [
  row("16:41:12", "Scan", sumac),
  row("16:38:55", "Lead submitted", cottonwood),
  row("16:37:55", "Still reading", cottonwood),
  row("16:36:55", "Page view", cottonwood),
  row("16:36:41", "Scan", cottonwood),
  row("16:29:03", "Buy click", wheatgrass),
];

const PARTNERS_ACTIVE = 12;
const DISPLAYS_ASSIGNED = 9;
const NEEDING_REVIEW = 2;
const VISITORS_30 = 391;
const BUY_CLICKS = [0, 1, 0, 2, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0] as const;

export const dufferDashboard = {
  asOf: "Oct 31, 16:41",
  needingReview: NEEDING_REVIEW,
  scansPerDay: SCANS_PER_DAY,
  leadsPerDay: LEADS_PER_DAY,
  stats: {
    partnersActive: PARTNERS_ACTIVE,
    withDisplay: DISPLAYS_ASSIGNED,
    displaysAssigned: DISPLAYS_ASSIGNED,
    /** Today is the last day of the series; the live scan on the stage makes it one more. */
    scansToday: SCANS_PER_DAY[SCANS_PER_DAY.length - 1],
    scans7: sum(last(SCANS_PER_DAY, 7)),
    scans30: sum(SCANS_PER_DAY),
    visitors30: VISITORS_30,
    leads7: sum(last(LEADS_PER_DAY, 7)),
    leads30: sum(LEADS_PER_DAY),
    buyClicks7: sum(last(BUY_CLICKS, 7)),
    buyClicks30: sum(BUY_CLICKS),
  },
} as const;
