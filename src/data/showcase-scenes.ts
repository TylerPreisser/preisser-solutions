// src/data/showcase-scenes.ts — the three clients whose product beat is a scene
// (an animated picture of the work) instead of a command-center recreation:
// HG Oil, FarmBooks and NWKS Encounter. Pure data: no React.
//
// This is the input the showcase framework registers each client from. Copy is
// Tyler's, first person plural, plain. No "$" outside a stage (the privacy
// probe's dollar-outside rule): the dollar figures live inside the scenes.
//
// Captures: rendered 2026-11-01 by Playwright Chromium, desk 1440 css px at
// DPR 1, phone 390 css px at DPR 2, only each site's best sections, stitched
// top to bottom (the `seam` is where the second section starts, in css px):
//   HG Oil   the dev site's home hero (the pumpjack at dusk), then the glass
//            contact form over the same video (/contact-us, below its header).
//   FarmBooks  the hero, then "What goes wrong" with its first scenario left
//            out: on farm-books.com its four printed line amounts add to
//            $10,849.75 while the page says $10,649.75. The two scenarios left
//            are renumbered 01 and 02 in the capture only. The tailgate photo
//            ("Watch it read a bill") is not used: its printed subtotal is wrong.
//   NWKS     the split Men's / Women's front door (stacked on a phone).
import type { SceneId } from "@/components/showcase/scenes";

export type SceneClientSlug = "hg-oil" | "farmbooks" | "nwks-encounter";

export interface SceneCapture {
  src: string;
  width: number;
  height: number;
  /** css px where the second best section starts (the popover pans here); 0 when there is one. */
  seam: number;
}

export interface SceneClient {
  slug: SceneClientSlug;
  name: string;
  /** Where "Visit" goes: the client's real, live site. */
  liveUrl: string;
  liveLabel: string;
  /** The site the capture shows, when it is not the live one (HG Oil's dev site). */
  capturedFrom: string;
  site: { desk: SceneCapture; phone: SceneCapture; captured: string };
  /** One line under each beat. */
  captions: { website: string; scenes: Partial<Record<SceneId, string>> };
  /** The product beat(s), in order. */
  scenes: readonly SceneId[];
}

export const sceneClients: Record<SceneClientSlug, SceneClient> = {
  "hg-oil": {
    slug: "hg-oil",
    name: "HG Oil Holdings",
    liveUrl: "https://hgoilholdings.com",
    liveLabel: "hgoilholdings.com",
    capturedFrom: "https://hgoil-website-dev.tylerpreisser.workers.dev/",
    site: {
      desk: { src: "/images/showcase/hg-oil-site-desk-6ef88481.webp", width: 1440, height: 1643, seam: 900 },
      phone: { src: "/images/showcase/hg-oil-site-phone-2f27ceb5.webp", width: 390, height: 1597, seam: 844 },
      captured: "Captured Nov 1, 2026",
    },
    captions: {
      website: "We built HG Oil a site with the pumpjack at dusk front and center.",
      scenes: {
        "hg-coi": "AI keeps every vendor's insurance current and hands a person only the exceptions.",
        "hg-swd": "The month-end close, done in a minute.",
      },
    },
    scenes: ["hg-coi", "hg-swd"],
  },
  farmbooks: {
    slug: "farmbooks",
    name: "FarmBooks",
    liveUrl: "https://farm-books.com",
    liveLabel: "farm-books.com",
    capturedFrom: "https://farm-books.com/",
    site: {
      desk: { src: "/images/showcase/farmbooks-site-desk-c886eb38.webp", width: 1440, height: 2440, seam: 881 },
      phone: { src: "/images/showcase/farmbooks-site-phone-2ea4c1da.webp", width: 390, height: 2999, seam: 776 },
      captured: "Captured Nov 1, 2026",
    },
    captions: {
      website: "We built farm-books.com to show a farmer what goes wrong on a bill.",
      scenes: {
        "farmbooks-bill": "FarmBooks reads every bill and holds the ones that don't add up.",
      },
    },
    scenes: ["farmbooks-bill"],
  },
  "nwks-encounter": {
    slug: "nwks-encounter",
    name: "NWKS Encounter",
    liveUrl: "https://nwksencounter.com",
    liveLabel: "nwksencounter.com",
    capturedFrom: "https://nwksencounter.com/",
    site: {
      desk: { src: "/images/showcase/nwks-encounter-site-desk-ff921ff6.webp", width: 1440, height: 900, seam: 0 },
      phone: { src: "/images/showcase/nwks-encounter-site-phone-8722795d.webp", width: 390, height: 844, seam: 0 },
      captured: "Captured Nov 1, 2026",
    },
    captions: {
      website: "We built one front door for the men's and the women's weekends.",
      scenes: {
        "nwks-beds": "Built around how their camp actually runs, from sign-up to the cabin map.",
      },
    },
    scenes: ["nwks-beds"],
  },
};
