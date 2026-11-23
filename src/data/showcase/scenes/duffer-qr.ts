// Duffer's QR story, at the head of its Impact tab (ADR-0028 §3; critic r2 M5): a golfer at a partner shop's counter
// scans the Duffer display with a phone, and the scan lands at the top of the Command Center's live feed, credited to
// the shop and its code; the visitor count moves to the figure the Impact tab shows under the story.
//
// DEMONSTRATION DATA: the shop, its code, the display and the earlier feed rows are the showcase's invented ones
// (src/data/demos/invented/duffer-golf.ts; clients/duffer-golf.ts pairs Sumac Hollow with Display 4). The count is not
// set here: the scene is handed the Impact tab's own figure, so the two can never disagree.
import type { DufferQrData } from "../types";

export const DUFFER_QR: DufferQrData = {
  course: "Sumac Hollow",
  code: "SUMAC",
  display: "Display 4",
};

/** The rows already in the feed when the new scan lands (invented, the same partners as the Command Center stills). */
export const QR_FEED_EARLIER = [
  { what: "Page view", where: "Lone Cottonwood", detail: "Display 9 · Brannick, KS", when: "4 min ago" },
  { what: "Scan", where: "Wheatgrass Pines", detail: "Display 11 · Osgood Bend, KS", when: "9 min ago" },
  { what: "Scan", where: "Lone Cottonwood", detail: "Display 9 · Brannick, KS", when: "16 min ago" },
] as const;

/** Story beats, ms from the tab showing: the hand rises, the code is read, the scan travels and lands. */
export const QR_T = {
  up: 150,
  locked: 1150,
  scanned: 1450,
  wire: 2000,
  feed: 2750,
  credited: 3350,
  /** The story has come to rest: everything it showed stays on screen together. */
  rest: 4200,
} as const;
