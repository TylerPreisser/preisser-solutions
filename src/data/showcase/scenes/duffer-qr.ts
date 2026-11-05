// Duffer's QR story, at the head of its Impact tab (design-spec-r2 §3.5): a golfer scans a course's
// countertop display, the scan lands in the Command Center's live feed, a sale made later with the
// course's referral code is credited to it, and the course's commission is paid by check.
//
// DEMONSTRATION DATA, all of it: the course, town, display, order and the counts are the showcase's
// invented ones (src/data/demos/invented/duffer-golf.ts; clients/duffer-golf.ts pairs Sumac Hollow
// with Display 4 in Tull Prairie). The commission is the Command Center's flat seed rate per sale,
// recorded when the check goes out: never shown as instant or automatic.
import type { DufferQrData } from "../types";

export const DUFFER_QR: DufferQrData = {
  course: "Sumac Hollow",
  display: "Display 4",
  town: "Tull Prairie, KS",
  device: "iPhone",
  feedRow: "Display 4 · Sumac Hollow · Tull Prairie, KS · iPhone · just now",
  order: { id: "DG-0007", item: "Simulator Enclosure", code: "SUMAC" },
  commission: { amount: "$400", to: "Sumac Hollow" },
  scansBefore: 14,
  scansAfter: 15,
};

/** The rows already in the feed when the new scan lands (invented, the same courses as the Command Center stills). */
export const QR_FEED_EARLIER = [
  { what: "Page view", where: "Display 9 · Lone Cottonwood", detail: "Brannick, KS · Android", when: "4 min ago" },
  { what: "Scan", where: "Display 11 · Wheatgrass Pines", detail: "Osgood Bend, KS · iPhone", when: "9 min ago" },
] as const;

/** The site the scan opens: a crop of the duffergolf.net capture already on this site, with its words manifest. */
export const QR_SITE = { src: "/images/showcase/duffer/qr-site.webp", width: 390, height: 628 } as const;

/** Story beats, ms from the start (spec §3.5 table). */
export const QR_T = {
  phoneUp: 0,
  locked: 1100,
  site: 1800,
  wire: 3200,
  feed: 4000,
  later: 6200,
  order: 6800,
  check: 8800,
  /** The story has come to rest: everything it showed stays on screen together. */
  rest: 9800,
} as const;
