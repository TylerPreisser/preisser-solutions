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
// Rules: no HG dollar amounts, no HG people, vendor or well names, no vendor
// counts, and no description of HG's own past bookkeeping errors. The hours and
// people the old way took have no source yet, so there is no `time` row.
import type { SceneBeat, ShowcaseClient } from "../types";
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

export const impact = impactBeat("hg-oil", {
  tab: "Impact",
  caption: "What the month-end close and vendor insurance engines do now, and what they replaced.",
  shape: "chapters",
  kicker: "What we automated",
  chapters: [
    {
      name: "The month-end close",
      cadence: "Every month",
      hero: {
        before: fact<"Client's words, Sep 10 2026">("An accountant built each month by hand, typing every total."),
        now: fact<"How it is built">("A field person edits five cells. The owner presses Run."),
      },
      figures: [
        figure<"How it is built">("74", "disposal agreements, worked out in one calculation"),
        figure<"Measured live, Sep 17 2026">("70 s", "the longest the engine took to run a whole close, in five measured runs"),
        figure<"How it is built">("17", "owner statements produced from every close"),
      ],
      how: "How the close runs",
      steps: [
        { verb: "Reads", text: fact<"How it is built">("the live sheet of disposal agreements, where the field edits only five columns.") },
        { verb: "Calculates", text: fact<"How it is built">("every well's barrels and dollars from one rule, with shared charges split to the cent.") },
        { verb: "Produces", text: "the A/P import, the GL journal and every owner statement from that same calculation." },
        { verb: "Checks", text: "that every vendor is told exactly what it is paid, and holds the month if not." },
        { verb: "Hands off", text: "the finished month to a person, who reviews it and releases it." },
      ],
      pairs: [
        {
          label: "Every total",
          before: "Typed by hand into the workbook.",
          now: fact<"How it is built">("Worked out from one rule and tied out before anything is released."),
        },
        {
          label: "The controller",
          before: "Built the payables entries by hand.",
          now: "Imports the finished file.",
        },
      ],
    },
    {
      name: "Vendor insurance",
      cadence: "Every business day",
      hero: {
        before: fact<"Client's words">("A spreadsheet of X marks, and emails written one vendor at a time."),
        now: "AI reads every certificate and chases only the vendors who need it.",
      },
      how: "How it keeps after it",
      steps: [
        { verb: "Reads", text: "every certificate that arrives, with AI, field by field." },
        { verb: "Judges", text: "each vendor's coverage and dates: covered, expiring or not covered." },
        { verb: "Chases", text: "only the vendors who need it, insurance agent first, and answers their replies." },
        { verb: "Searches", text: fact<"How it is built">("HG's own mailboxes when a vendor says it already sent one.") },
        { verb: "Hands off", text: "only the real decisions to the owner." },
      ],
      pairs: [
        {
          label: "The record",
          before: fact<"Owner, Oct 23 2026">("The marks said a certificate was on file. Checked against the files, most were not."),
          now: "Each vendor's status comes from the certificate itself, and its dates are watched.",
        },
        {
          label: "The people",
          before: fact<"Client's words">("Staff kept the files and wrote every request by hand."),
          now: "A person handles only a certificate that comes on paper.",
        },
      ],
    },
  ],
  closing: "Same numbers every month. Nobody retypes them.",
  narration:
    "What we automated for HG Oil Holdings. The month-end close used to be built by hand with every total typed; now a field person edits a few cells, the owner presses Run, and the engine produces the payables import, the journal and the owner statements from a single calculation. Vendor insurance used to be a spreadsheet of marks and emails written by hand; now AI reads every certificate, judges coverage and chases only the vendors who need it.",
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
