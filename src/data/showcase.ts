// src/data/showcase.ts — the product showcase (ADR-0020): the client's own public
// website, captured, and the command center we built them, recreated on invented
// data. Copy here is Tyler's, first person. Pure data: no React.
//
// Captures: duffergolf.net and haysacademy.edu, rendered 2026-10-31 by
// Playwright Chromium (desk 1280 css px at DPR 1.25, phone 390 at DPR 2). Left
// out of the capture on purpose: every testimonial (real customer and student
// names), Duffer's Black Friday banner and band (dated), Duffer's owner-garage
// carousel, the Hays welcome collage (scroll-driven, it captures as a blank)
// and partner logos, and both footers. Rect values are css px in the capture.

import { showcaseMeta, type ShowcaseSlug } from "./showcase-meta";

export type { ShowcaseSlug };

/** [x, y, width, height] in the capture's css pixels. */
export type Rect = readonly [number, number, number, number];

export interface Capture {
  src: string;
  width: number;
  height: number;
}

export interface WebsiteChapter {
  kind: "website";
  /** A short name for the psychology at work. Shown above the line. */
  tag: string;
  title: string;
  body: string;
  /** Where the frame scrolls to, and what it rings, in each capture. */
  desk: { y: number; focus: Rect };
  phone: { y: number; focus: Rect };
}

export interface CommandChapter {
  kind: "command";
  tag: string;
  title: string;
  body: string;
  /** Which part of the recreated screen to ring: a [data-focus] value. */
  focus: string;
}

export type Chapter = WebsiteChapter | CommandChapter;

export interface Showcase {
  slug: ShowcaseSlug;
  name: string;
  liveUrl: string;
  liveLabel: string;
  /** The page h1 and the one paragraph under it. metaTitle is <= 39 chars: the site template adds " | Preisser Solutions". */
  h1: string;
  lede: string;
  metaTitle: string;
  metaDescription: string;
  site: { desk: Capture; phone: Capture; captured: string };
  /** What the command center is called, in the client's own words. */
  commandName: string;
  /** One line under each slide of the home popover. */
  captions: { website: string; command: string };
  /** The popover's website slide pans from the top to this y (desk / phone capture). */
  pan: { desk: number; phone: number };
  /** Screen-reader narration for the stage (data-demo-narration, 80+ chars). */
  narration: string;
  chapters: readonly Chapter[];
}

export const showcases: Record<ShowcaseSlug, Showcase> = {
  "duffer-golf": {
    slug: "duffer-golf",
    name: "Duffer Golf",
    liveUrl: "https://duffergolf.net",
    liveLabel: "duffergolf.net",
    h1: "Duffer Golf",
    lede:
      "Duffer Golf builds folding golf simulator enclosures in Hoxie, Kansas. We built the storefront that sells them and the command center that runs their golf course partner network. Scroll, and I'll walk you through both.",
    metaTitle: "Duffer Golf: store and command center",
    metaDescription:
      "Walk through the Duffer Golf storefront we built, section by section, then the command center that tracks every partner course display, scan and lead.",
    site: {
      desk: { src: showcaseMeta["duffer-golf"].desk, width: 1280, height: 4036 },
      phone: { src: showcaseMeta["duffer-golf"].phone, width: 390, height: 4104 },
      captured: "Captured Oct 31, 2026",
    },
    commandName: showcaseMeta["duffer-golf"].commandName,
    captions: {
      website: "The storefront. It answers “will it fit?” before it asks for anything.",
      command: "Tate's Command Center. Every course display, scan and lead, live.",
    },
    pan: { desk: 1240, phone: 1120 },
    narration:
      "The Duffer Golf Command Center, recreated on invented data: partner courses, display scans, leads and a live feed. None of these courses or numbers are real.",
    chapters: [
      {
        kind: "website",
        tag: "Objection first",
        title: "The first line answers why people don't buy.",
        body:
          "Most people who want a simulator assume they don't have the room. So the first thing you read is the answer: a full golf bay, then a garage again. The video shows one folding up.",
        desk: { y: 0, focus: [60, 488, 452, 300] },
        phone: { y: 0, focus: [24, 478, 342, 220] },
      },
      {
        kind: "website",
        tag: "Proof of fit",
        title: "You can see it in your own garage.",
        body:
          "The drawing puts the bay beside a truck in a two-car garage. People buy what they can picture at home, and this gets them there before they measure anything.",
        desk: { y: 760, focus: [740, 880, 470, 510] },
        phone: { y: 640, focus: [26, 860, 338, 360] },
      },
      {
        kind: "website",
        tag: "Price in the open",
        title: "Four models. Four prices. No “call for a quote.”",
        body:
          "Every price is on the page. The complete Duffer 10 is outlined and marked Featured, so that's where the eye lands. Hiding the price is the fastest way to lose a buyer who's already sold.",
        desk: { y: 1420, focus: [954, 1680, 304, 622] },
        phone: { y: 1230, focus: [10, 1370, 370, 520] },
      },
      {
        kind: "website",
        tag: "A person, not a brand",
        title: "Tate tells the story himself.",
        body:
          "He built the first one so he could practice all winter. Then his buddies wanted one. A family business in Hoxie should sound like one, and that's a reason to trust it.",
        desk: { y: 2380, focus: [24, 2422, 620, 781] },
        phone: { y: 2300, focus: [16, 2355, 358, 781] },
      },
      {
        kind: "website",
        tag: "The second customer",
        title: "Two doors most sites don't have.",
        body:
          "At the bottom: one door for golf courses, one for dealers. A course that hosts a counter display earns a commission on every sale it sends. That program is what the command center runs.",
        desk: { y: 3236, focus: [24, 3647, 1232, 325] },
        phone: { y: 3500, focus: [16, 3537, 358, 527] },
      },
      {
        kind: "command",
        tag: "Every scan, credited",
        title: "Each display has its own QR code.",
        body:
          "A golfer scans the display on the counter at their course. The scan lands here, credited to the course that holds that display. Tate sees which courses are actually selling.",
        focus: "stats",
      },
      {
        kind: "command",
        tag: "Live",
        title: "He sees it while it happens.",
        body:
          "The feed refreshes every 15 seconds. A scan, a page view, a golfer still reading, then a lead. All of it on sample data here, all of it real in his.",
        focus: "feed",
      },
      {
        kind: "command",
        tag: "Only what needs him",
        title: "One bar, and only when it matters.",
        body:
          "The bar at the top shows up when something needs a decision. Today that's two displays to review. The scans, leads and commissions are counted for him.",
        focus: "attention",
      },
    ],
  },
  "hays-academy": {
    slug: "hays-academy",
    name: "Hays Academy of Hair Design",
    liveUrl: "https://haysacademy.edu",
    liveLabel: "haysacademy.edu",
    h1: "Hays Academy of Hair Design",
    lede:
      "Hays Academy has trained stylists in Kansas since 1981, today on campuses in Hays and Salina. We rebuilt their website around the questions a future student actually asks, then built the portal that shows leadership where their leads come from. Here's how both work.",
    metaTitle: "Hays Academy: website and lead portal",
    metaDescription:
      "Walk through the Hays Academy website we rebuilt and why each part works on a future student, then the MarCommand portal that shows where their leads come from.",
    site: {
      desk: { src: showcaseMeta["hays-academy"].desk, width: 1280, height: 3653 },
      phone: { src: showcaseMeta["hays-academy"].phone, width: 390, height: 3907 },
      captured: "Captured Oct 31, 2026",
    },
    commandName: showcaseMeta["hays-academy"].commandName,
    captions: {
      website: "The website. It answers “is this real, and what does it cost?” up front.",
      command: "Their MarCommand portal. Which marketing brings in leads.",
    },
    pan: { desk: 760, phone: 800 },
    narration:
      "The school's MarCommand portal, recreated on invented data: each marketing channel, the people it sent, and the leads it produced. None of these numbers are the school's.",
    chapters: [
      {
        kind: "website",
        tag: "A date on the first screen",
        title: "“Someday” becomes a plan.",
        body:
          "The next class date sits on the first screen. A real date makes beauty school feel like something you can start, and the button asks for info, the smallest step there is.",
        desk: { y: 0, focus: [812, 280, 442, 186] },
        phone: { y: 120, focus: [16, 486, 358, 138] },
      },
      {
        kind: "website",
        tag: "Is this real?",
        title: "Results and price, on the home page.",
        body:
          "Most beauty schools hide their results or their price. Hays puts both up front: pass rate, job placement and the all-in cost, with the source linked. That answers the two questions a student and her parents ask first.",
        desk: { y: 690, focus: [24, 860, 1232, 228] },
        phone: { y: 760, focus: [12, 860, 366, 300] },
      },
      {
        kind: "website",
        tag: "Picture yourself here",
        title: "Each program is a photo of the work.",
        body:
          "Real students on the real floor, with hours, cost and the next start right on the card. She can compare the two programs without opening anything.",
        desk: { y: 1080, focus: [24, 1160, 1232, 740] },
        phone: { y: 1180, focus: [12, 1225, 366, 600] },
      },
      {
        kind: "website",
        tag: "A finite path",
        title: "Six steps from a tour to a license.",
        body:
          "When the whole distance is written down, it feels doable. The last step is filled in, so the end is the thing she sees.",
        desk: { y: 2000, focus: [620, 2560, 640, 120] },
        phone: { y: 2440, focus: [12, 3190, 366, 120] },
      },
      {
        kind: "website",
        tag: "More than one way in",
        title: "Apply, call, email, or book a haircut.",
        body:
          "Some people are ready to apply. Some want to talk first. Some want to see the place as a salon guest. The close gives every one of them a door.",
        desk: { y: 2880, focus: [200, 3123, 880, 402] },
        phone: { y: 3300, focus: [12, 3397, 366, 510] },
      },
      {
        kind: "command",
        tag: "Where leads come from",
        title: "Every channel, and what it produced.",
        body:
          "Leadership opens this and sees each channel on the left with the visits and leads it sent. The ribbons are those people moving toward the school. Thick ones are working.",
        focus: "channels",
      },
      {
        kind: "command",
        tag: "Clicks aren't the goal",
        title: "The last column is the one that counts.",
        body:
          "Reached, visited, interested, leads, validated. Validated means a person at the school looked at the lead and it's real. That's the number the marketing is judged on.",
        focus: "stages",
      },
      {
        kind: "command",
        tag: "Nobody retypes a form",
        title: "Every inquiry lands in their CRM.",
        body:
          "When a student fills out the form, it goes straight into the school's CRM with the channel it came from. Nobody copies anything by hand.",
        focus: "social-ads",
      },
    ],
  },
};

export const showcaseList: readonly Showcase[] = [showcases["duffer-golf"], showcases["hays-academy"]];
