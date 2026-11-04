// HG Oil Holdings' showcase (ADR-0022): their website, the COI story, and
// Impact (ADR-0025 tab set: Website, Vendor Insurance, Impact). Vendor insurance is AI at work; the saltwater close is automation
// (there is no model in it) and is never called AI, here or anywhere.
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
// 1x). "Visit" goes to the live site. Sample data for the vendor scene:
// src/data/showcase/scenes/hg-vendor.ts (builder B1).
//
// Impact (ADR-0022 §3): every number is a fact<oracle>() or figure<oracle>();
// the oracle note is a type argument, checked at build and never shipped. The
// precise citation for each is kept outside this public repo.
// Rules: no HG dollar amounts, no HG people, vendor or well names, and no live
// vendor counts until the owner says so (HG_PUBLISH_VENDOR_COUNTS below). The
// hours the old way took have no source yet, so the month-end close is a
// now-only number: no before is shown for it.
import type { ImpactStat, SceneBeat, ShowcaseClient } from "../types";
import { fact, figure, impactBeat } from "../impact";

// ADR-0025 §2: a certificate arrives, four checks tick green, it is filed to the vendor's folder.
// The scene (scenes/HgVendorScene, builder B1) is a ComingScene until it lands.
const vendor: SceneBeat = {
  kind: "scene",
  tab: "Vendor Insurance",
  caption: "A vendor's certificate arrives, every check ticks green, and it files itself to the vendor.",
  scene: "hg-vendor",
  narration:
    "Vendor insurance on demonstration data: a certificate of insurance arrives, the engine reads the coverage type, the effective dates, the limits and the certificate holder, marks it good to go, and files it to the vendor's folder.",
};

/**
 * HG's vendor certificate count (80 -> 155). Held back: the owner has not said
 * live vendor counts may be published (spec §3.4). The lead flips this one
 * line to true when the owner says yes; nothing else changes.
 */
const HG_PUBLISH_VENDOR_COUNTS = false;

// A function, so that while the flag is false the numbers are dead code and the minifier drops them from the bundle.
const vendorCertificates = () =>
  ({
    before: figure<"Owner, Oct 23 2026">("80", "vendor certificates on file, checked and current"),
    now: figure<"Measured live, Oct 27 2026">("155", "vendor certificates on file, checked and current"),
  }) as const satisfies ImpactStat;
const closeSeconds = {
  now: figure<"Measured live, Sep 17 2026">("70", "the longest the engine took to run a whole month-end close"),
  unit: "s",
} as const satisfies ImpactStat;
const insuranceEmails = {
  now: figure<"Measured live, Oct 23 2026">("258", "insurance emails in the first 8 days"),
} as const satisfies ImpactStat;

export const impact = impactBeat("hg-oil", {
  tab: "Impact",
  caption: "What the month-end close and vendor insurance engines do now, and what they replaced.",
  kicker: "What changed",
  big: HG_PUBLISH_VENDOR_COUNTS ? [vendorCertificates(), closeSeconds, insuranceEmails] : [closeSeconds, insuranceEmails],
  rows: [
    {
      before: figure<"How it is built">("74", "Hand-typed totals in the close workbook"),
      now: figure<"How it is built">("0", "Hand-typed totals in the close workbook"),
    },
    { now: figure<"How it is built">("17", "Owner statements produced every close") },
  ],
  text: "Vendor insurance and the month-end close now run themselves. A person signs off; nobody types.",
  narration:
    "What changed for HG Oil Holdings. The engine runs a whole month-end close in moments, and the handwritten totals in the close workbook are gone. Vendor insurance emails go out and are handled by the engine, and a person signs off instead of typing.",
});

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
      live: { src: "https://www.hgoilholdings.com/", origins: ["https://www.hgoilholdings.com", "https://hgoilholdings.com"], frame: "handshake" },
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
    vendor,
    impact,
  ],
};

export default client;
