// NWKS Encounter's showcase: their front door, then a picture of the system we
// built around how their camp runs (sign-up to bed to the printed cabin map).
// Custom built: no AI is claimed for the bed board.
//
// Website capture: https://nwksencounter.com, 2026-11-01, Playwright Chromium,
// desk 1440 css at 1x, phone 390 at 2x: the split Men's / Women's front door
// (stacked on a phone). Sample data for the scene, every woman invented:
// src/data/demos/scenes/nwks-encounter.ts.
import type { ShowcaseClient } from "../types";
import type { SceneBeatData } from "@/components/showcase/scenes";
import { bedsSummary } from "@/data/demos/scenes/nwks-encounter";

/** The product beat, for a `kind: "scene"` beat once the framework has one. */
export const sceneBeats: readonly SceneBeatData[] = [
  {
    kind: "scene",
    tab: "Beds",
    caption: "Every sign-up finds a bed, and the cabin map prints itself.",
    scene: "nwks-beds",
    narration: bedsSummary,
  },
];

/** Men's title, logo, date, Enter button; women's title, logo, date, Enter button (y in the 390-wide capture). */
const NWKS_PHONE_BANDS = [
  [52, 69],
  [96, 236],
  [280, 296],
  [316, 372],
  [470, 487],
  [511, 656],
  [705, 725],
  [740, 797],
] as const;

const client: ShowcaseClient = {
  slug: "nwks-encounter",
  name: "NWKS Encounter",
  short: "NWKS Encounter",
  live: { url: "https://nwksencounter.com", label: "nwksencounter.com" },
  theme: {
    ground: "#F6EFE9",
    groundDeep: "#EEE3DA",
    card: "#FFFFFF",
    ink: "#2A0F1A",
    inkSoft: "#6B4A57",
    accent: "#6B1F3A",
    accentText: "#6B1F3A",
    chart1: "#6B1F3A",
    chart2: "#C9971F",
    display: "fraunces",
    body: "figtree",
    mark: { kind: "letters", text: "NW" },
  },
  beats: [
    {
      kind: "website",
      tab: "Website",
      caption: "The men's and women's weekends share one front door.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/nwks-encounter-site-desk-ff921ff6.webp",
        width: 1440,
        height: 900,
        stops: [{ y: 0, holdMs: 3400 }],
      },
      phone: {
        src: "/images/showcase/nwks-encounter-site-phone-8722795d.webp",
        width: 390,
        height: 844,
        // Two rests, and neither edge of either one cuts a logo, a title, a date or a
        // button in half (critique r8 S6: the Women's Encounter logo was cut on every
        // phone): the men's half, then the women's half to the capture's end. Bands
        // measured from the capture's pixels, 2026-11-01.
        stops: [
          { y: 40, holdMs: 2400, avoid: NWKS_PHONE_BANDS },
          { y: 422, holdMs: 2600, toEnd: true, avoid: NWKS_PHONE_BANDS },
        ],
      },
    },
    ...sceneBeats,
  ],
};

export default client;
