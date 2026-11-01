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
      caption: "We built one front door for the men's and the women's weekends.",
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
        stops: [{ y: 0, holdMs: 3400 }],
      },
    },
    ...sceneBeats,
  ],
};

export default client;
