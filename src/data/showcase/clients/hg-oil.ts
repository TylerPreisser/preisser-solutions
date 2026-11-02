// HG Oil Holdings' showcase: their website, then two pictures of the work we
// built them. Vendor insurance is AI at work; the saltwater close is
// automation (there is no model in it) and is never captioned as AI.
//
// Website: the DEV site https://hgoil-website-dev.tylerpreisser.workers.dev/
// (the live site's carbon copy plus mobile and nav fixes), its FRONT PAGE only
// (owner, 2026-11-01): the home hero, a pumpjack working at dusk, which is the
// site's own video /assets/video/hero-1920.mp4 (1920x1080, 22.9 s; the live
// site serves the same file). The loop is cut from it, nothing added: 5.458 s
// to 17.708 s, one full stroke (its first and last frames match), after the
// birds that cross the sky at 2 to 4 s; 24 fps, muted, VP9 webm plus h264 mp4.
// Phone: cropped to x 440-1780 of 1920 so the whole pumpjack and the dusk
// show; desk: the whole frame. Above it, the site's own header bar, cut whole
// from the round 9 capture (Playwright Chromium, phone 390 at 2x, desk 1440 at
// 1x). "Visit" goes to the live site. Sample data for the scenes:
// src/data/demos/scenes/hg-oil.ts.
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
      caption: "HG Oil's site opens on a pumpjack working at dusk.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/hg-oil-site-desk-head-2fb3472a.webp",
        width: 1440,
        height: 157,
        stops: [{ y: 0, holdMs: 4000 }],
        video: {
          webm: "/images/showcase/hg-oil-hero-desk-97e5697b.webm",
          mp4: "/images/showcase/hg-oil-hero-desk-fc835b45.mp4",
          poster: "/images/showcase/hg-oil-hero-desk-78a31ece.webp",
          width: 1280,
          height: 720,
          fit: "cover",
          sky: "#788c9a",
          ground: "#050504",
        },
      },
      phone: {
        src: "/images/showcase/hg-oil-site-phone-head-098f7029.webp",
        width: 390,
        height: 91,
        stops: [{ y: 0, holdMs: 4000 }],
        // The whole frame shows: a taller phone gets more of the clip's own sky and ground around it.
        video: {
          webm: "/images/showcase/hg-oil-hero-phone-d493f65c.webm",
          mp4: "/images/showcase/hg-oil-hero-phone-b58f82bb.mp4",
          poster: "/images/showcase/hg-oil-hero-phone-c7c4e216.webp",
          width: 1170,
          height: 942,
          fit: "width",
          sky: "#7b8f9d",
          ground: "#050505",
        },
      },
    },
    ...sceneBeats,
  ],
};

export default client;
