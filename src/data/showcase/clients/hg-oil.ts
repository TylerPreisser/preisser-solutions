// HG Oil Holdings' showcase: their website, then two pictures of the work we
// built them. Vendor insurance is AI at work; the saltwater close is
// automation (there is no model in it) and is never captioned as AI.
//
// Website capture: the DEV site https://hgoil-website-dev.tylerpreisser.workers.dev/
// (the live site's carbon copy plus mobile and nav fixes), 2026-11-01,
// Playwright Chromium, desk 1440 css at 1x, phone 390 at 2x. Two sections,
// stitched: the home hero (the pumpjack at dusk) and the glass contact form
// over the same video (/contact-us, below its header). "Visit" goes to the
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
    caption: "The month-end close, done in a minute.",
    scene: "hg-swd",
    narration: swdSummary,
  },
];

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
      caption: "We built HG Oil a site with the pumpjack at dusk front and center.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/hg-oil-site-desk-6ef88481.webp",
        width: 1440,
        height: 1643,
        stops: [
          { y: 0, holdMs: 2400 },
          { y: 743, holdMs: 2600 },
        ],
      },
      phone: {
        src: "/images/showcase/hg-oil-site-phone-2f27ceb5.webp",
        width: 390,
        height: 1597,
        stops: [
          { y: 0, holdMs: 2400 },
          { y: 844, holdMs: 2600 },
        ],
      },
    },
    ...sceneBeats,
  ],
};

export default client;
