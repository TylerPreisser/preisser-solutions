// FarmBooks' showcase: their website, then a picture of the AI reading a bill.
//
// Website capture: https://farm-books.com, 2026-11-01, Playwright Chromium,
// desk 1440 css at 1x, phone 390 at 2x. Two sections, stitched: the hero, and
// "What goes wrong" with its first scenario left out (on the live page its
// four printed line amounts add to $10,849.75 while it says $10,649.75; the
// two scenarios left are renumbered 01 and 02 in the capture only). The
// tailgate photo ("Watch it read a bill") is not used: its printed subtotal is
// wrong. Sample data for the scene: src/data/demos/scenes/farmbooks.ts.
import type { ShowcaseClient } from "../types";
import type { SceneBeatData } from "@/components/showcase/scenes";
import { fbSummary } from "@/data/demos/scenes/farmbooks";

/** The product beat, for a `kind: "scene"` beat once the framework has one. */
export const sceneBeats: readonly SceneBeatData[] = [
  {
    kind: "scene",
    tab: "AI",
    caption: "FarmBooks reads every bill and holds the ones that don't add up.",
    scene: "farmbooks-bill",
    narration: fbSummary,
  },
];

const client: ShowcaseClient = {
  slug: "farmbooks",
  name: "FarmBooks",
  short: "FarmBooks",
  live: { url: "https://farm-books.com", label: "farm-books.com" },
  theme: {
    ground: "#F2F0EB",
    groundDeep: "#E9E4D8",
    card: "#FFFDF8",
    ink: "#1D1A15",
    inkSoft: "#5A5246",
    accent: "#C9971F",
    accentText: "#7A5810",
    chart1: "#C9971F",
    chart2: "#2F7D3B",
    display: "fraunces",
    body: "figtree",
    mark: { kind: "letters", text: "FB" },
  },
  beats: [
    {
      kind: "website",
      tab: "Website",
      caption: "farm-books.com walks a farmer through the mistakes that hide on a bill.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/farmbooks-site-desk-c886eb38.webp",
        width: 1440,
        height: 2440,
        stops: [
          { y: 0, holdMs: 2200 },
          { y: 881, holdMs: 1800 },
          { y: 1540, holdMs: 2400 },
        ],
      },
      phone: {
        src: "/images/showcase/farmbooks-site-phone-2ea4c1da.webp",
        width: 390,
        height: 2999,
        stops: [
          { y: 0, holdMs: 2200 },
          { y: 776, holdMs: 1800 },
          { y: 1560, holdMs: 1800 },
          { y: 2370, holdMs: 2200 },
        ],
      },
    },
    ...sceneBeats,
  ],
};

export default client;
