// NWKS Encounter's showcase (ADR-0022): their front door, then Impact, the
// story of what the system took off the volunteers' hands, told as text.
// Custom built: no AI is claimed for any of it.
//
// Website capture: https://nwksencounter.com, 2026-11-01, Playwright Chromium,
// desk 1440 css at 1x, phone 390 at 2x: the split Men's / Women's front door
// (stacked on a phone).
//
// Impact (ADR-0022 §3): every number is a fact<oracle>() or figure<oracle>();
// the oracle note is a type argument, checked at build and never shipped. The
// precise citation for each is kept outside this public repo.
// Left out on purpose: piece totals and people counts that were never counted,
// the "90 percent" (no measurement behind it), and any live-database count.
// Hours per weekend have no source yet: the before side is words, not hours.
import type { ShowcaseClient } from "../types";
import { fact, figure, impactBeat } from "../impact";

export const impact = impactBeat("nwks-encounter", {
  tab: "Impact",
  caption: "What the system does every weekend, and what the volunteers used to do by hand.",
  kicker: "What changed",
  big: [
    {
      oldWay: fact<"Client's words, Aug 19 2026">("Emailed by hand, every day or two"),
      now: figure<"How it is built">("4", "launch letters per person, sent on their own dates"),
    },
    {
      oldWay: fact<"Client's words, Aug 19 2026">("Typed one at a time"),
      now: figure<"Owner, Aug 20 2026">("5", "name tags and luggage stickers per person, made from registration"),
    },
  ],
  rows: [
    {
      now: figure<"Measured live, Oct 8 2026">("Milliseconds", "Cabin plan, drafted for volunteers to adjust"),
    },
  ],
  text: "The system drafts the cabin plan for volunteers to adjust and makes name tags and luggage stickers from registration.",
  narration:
    "What changed for NWKS Encounter. The cabin plan, which the ministry built entirely by hand, is now drafted in moments for volunteers to adjust. Launch letters go out on their own dates, name tags and luggage stickers print from registration, and a freed seat is offered to the next person on the waitlist by email.",
});

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
      live: { src: "https://nwksencounter.com/", origins: ["https://nwksencounter.com", "https://www.nwksencounter.com"], frame: "handshake", revealMs: 400 },
      tab: "Website",
      caption: "The men's and women's weekends share one front door.",
      desk: {
        // The loading still, the live page framed at the frame's size just after it goes Live (2026-11-22).
        // Recapture: npm run build && node scripts/capture-showcase-site-stills.mjs --only nwks-encounter
        first: { src: "/images/showcase/nwks-encounter-site-desk-live-003dc735.webp", width: 1220, height: 715, edge: "#f3f3ec", captured: "Captured Nov 22, 2026" },
        // ... and at an 820 tablet sheet's frame width, where the site reflows (same script, --sizes tablet).
        firstAt: [{ src: "/images/showcase/nwks-encounter-site-tablet-live-164f03ed.webp", width: 794, height: 981, edge: "#f7f6ee", captured: "Captured Nov 22, 2026" }],
        stops: [{ y: 0, holdMs: 3400 }],
      },
      phone: {
        // The loading still, the live page framed at the frame's size just after it goes Live (2026-11-22).
        // Recapture: npm run build && node scripts/capture-showcase-site-stills.mjs --only nwks-encounter
        first: { src: "/images/showcase/nwks-encounter-site-phone-live-a316a5ca.webp", width: 376, height: 675, edge: "#fbf8f2", captured: "Captured Nov 22, 2026" },
        // ... and at a 320 phone's frame width, where the site reflows (same script, --sizes phone320).
        firstAt: [{ src: "/images/showcase/nwks-encounter-site-phone320-live-b85361f2.webp", width: 294, height: 369, edge: "#ffffff", captured: "Captured Nov 22, 2026" }],
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
    {
      kind: "scene",
      tab: "Admin",
      caption: "The administration panel, clicked through: the dashboard, the cabins, the attendees and the badges.",
      scene: "nwks-admin",
      narration:
        "The Encounter weekend's administration panel on demonstration data: the dashboard, cabins filling with attendees, the attendee list filtered to those who have not paid, and the badges and luggage tags ready to print.",
    },
    impact,
  ],
};

export default client;
