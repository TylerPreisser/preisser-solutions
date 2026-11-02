// HG Oil Holdings' showcase: their website, then two pictures of the work we
// built them. Vendor insurance is AI at work; the saltwater close is
// automation (there is no model in it) and is never captioned as AI.
//
// Website capture: the DEV site https://hgoil-website-dev.tylerpreisser.workers.dev/
// (the live site's carbon copy plus mobile and nav fixes), 2026-11-01,
// Playwright Chromium, desk 1440 css at 1x, phone 390 at 2x. Two sections,
// stitched: the home hero (the pumpjack at dusk; it carries no headline) and
// the About section below its header (/about: the drilling rig in a Kansas
// field and "operates 329 producing wells in 35 counties"). Round 9 swapped
// the empty contact form out for it (critique r8 N3). "Visit" goes to the
// live site. Sample data for the scenes: src/data/demos/scenes/hg-oil.ts.
import type { ShowcaseClient } from "../types";
import type { SceneBeatData } from "@/components/showcase/scenes";
import { coiSummary, swdSummary } from "@/data/demos/scenes/hg-oil";

/** The product beats, for a `kind: "scene"` beat once the framework has one. */
export const sceneBeats: readonly SceneBeatData[] = [
  {
    kind: "scene",
    tab: "COI",
    caption: "AI keeps every vendor's insurance current and hands a person only the exceptions.",
    scene: "hg-coi",
    narration: coiSummary,
  },
  {
    kind: "scene",
    tab: "Close",
    caption: "Their month-end close now runs in about a minute.",
    scene: "hg-swd",
    narration: swdSummary,
  },
];

/** Text lines and buttons in the 390-wide phone capture (y from, y to, css px), found in its own pixels (round 11: rows with text-like edges on a flat background, 1 px margin), plus round 9's last strip of the rig photo and the Contact button. */
const HG_PHONE_BANDS = [
  [33, 58], [327, 334], [367, 379], [401, 577], [585, 593], [616, 625], [862, 889], [1130, 1172],
  [1192, 1205], [1216, 1229], [1240, 1253], [1264, 1277], [1288, 1301], [1312, 1325], [1336, 1349],
  [1360, 1373], [1384, 1400], [1408, 1424], [1432, 1448], [1456, 1472], [1480, 1493], [1511, 1562],
  [1531, 1544],
] as const;

/** Text lines, price rows and buttons in the 1440-wide desk capture (y from, y to, css px), found in its own pixels (round 11: rows with text-like edges on a flat background, 1 px margin). */
const HG_DESK_BANDS = [
  [20, 78], [121, 134], [339, 363], [374, 393], [418, 423], [428, 433], [495, 501], [579, 584],
  [938, 968], [1132, 1148], [1163, 1183], [1193, 1209], [1223, 1239], [1253, 1273], [1284, 1300],
  [1314, 1334], [1344, 1364], [1374, 1394], [1429, 1435], [1448, 1461], [1468, 1473], [1476, 1501],
] as const;

const client: ShowcaseClient = {
  slug: "hg-oil",
  name: "HG Oil Holdings",
  short: "HG Oil",
  live: { url: "https://hgoilholdings.com", label: "hgoilholdings.com" },
  theme: {
    ground: "#F4F6F9",
    groundDeep: "#E6EBF2",
    card: "#FFFFFF",
    ink: "#0A1628",
    inkSoft: "#475569",
    accent: "#003A89",
    accentText: "#003A89",
    chart1: "#003A89",
    chart2: "#C2652E",
    display: "inter",
    body: "inter",
    mark: { kind: "letters", text: "HG" },
  },
  beats: [
    {
      kind: "website",
      tab: "Website",
      caption: "HG Oil's site, from the pumpjack at dusk to the work they do in the field.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/hg-oil-site-desk-9bdaa234.webp",
        width: 1440,
        height: 1643,
        stops: [
          { y: 0, holdMs: 2400, avoid: HG_DESK_BANDS },
          // Ends on "About Us" and the rig photo; the view ends on the capture's last row, no white below (critique r10 MF5).
          { y: 900, holdMs: 3000, toEnd: true, avoid: HG_DESK_BANDS },
        ],
      },
      phone: {
        src: "/images/showcase/hg-oil-site-phone-9b887afc.webp",
        width: 390,
        height: 1597,
        stops: [
          // The whole pumpjack and the orange dusk under it, below the header bar (critique r10 MF5).
          { y: 230, holdMs: 2400, keep: [240, 700], avoid: HG_PHONE_BANDS },
          // Ends on "About Us" and the drilling rig in the field; the paragraph stop is gone.
          { y: 852, holdMs: 3000, keep: [858, 1175], avoid: HG_PHONE_BANDS },
        ],
      },
    },
    ...sceneBeats,
  ],
};

export default client;
