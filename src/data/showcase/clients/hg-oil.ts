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

/** The About section's title, the last strip of its photo, its text lines and its button (y in the 390-wide capture, measured from its pixels). */
const HG_PHONE_BANDS = [
  [860, 889],
  [1130, 1172],
  [1191, 1208],
  [1215, 1232],
  [1239, 1253],
  [1263, 1277],
  [1287, 1304],
  [1311, 1328],
  [1335, 1352],
  [1359, 1376],
  [1383, 1400],
  [1407, 1424],
  [1431, 1448],
  [1455, 1472],
  [1479, 1493],
  [1511, 1562],
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
          { y: 0, holdMs: 2400 },
          // The About section from its top; the page's own white runs on below it.
          { y: 900, holdMs: 3000 },
        ],
      },
      phone: {
        src: "/images/showcase/hg-oil-site-phone-9b887afc.webp",
        width: 390,
        height: 1597,
        // Neither edge of a rest cuts the title, a sliver of the photo, a line of the About text or its button.
        stops: [
          { y: 0, holdMs: 2400 },
          { y: 852, holdMs: 2200, avoid: HG_PHONE_BANDS },
          { y: 1180, holdMs: 2800, toEnd: true, avoid: HG_PHONE_BANDS },
        ],
      },
    },
    ...sceneBeats,
  ],
};

export default client;
