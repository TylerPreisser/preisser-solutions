// Duffer Golf's showcase: their storefront, their partner courses running into
// one MarCommand funnel, and the AI answering the question a partner program
// lives on: which courses actually sell.
//
// Every course, town and number below is INVENTED (ADR-0016 §5; names are in
// src/data/demos/invented/duffer-golf.ts). Nothing was read from the partner
// program's database. Stage totals and every figure in the AI answer are
// computed from the course rows, so they always agree.
//
// Website captures: duffergolf.net, 2026-11-01, Playwright Chromium (desk 1280
// at 1.25x, phone 390 at 2x, iPhone UA). Left out on purpose: the Black Friday
// bar and band (dated) and the "Fits where a car was" band between the hero
// and the models; the capture ends after the four models with their prices
// (round 11 trimmed the phone capture's 66 px of trailing white, critique r10 S9).
//
// Impact (ADR-0022): REAL, unlike the funnel and AI beats above.
// Impact (ADR-0022 §3): every number is a fact<oracle>() or figure<oracle>();
// the oracle note is a type argument, checked at build and never shipped. The
// precise citation for each is kept outside this public repo.
// Duffer's partner network has no live results to show yet, so Impact leads
// with what the Command Center does and claims no sales, scans, partner
// counts or dollars: no figures and no `time` row.
import type { ShowcaseClient } from "../types";
import { count, sum } from "../format";
import { fact, impactBeat } from "../impact";

type Course = { label: string; sub: string; scans: number; visits: number; leads: number; orders: number };

/** Last 30 days, invented. Twelve partner courses: three named, nine together. */
const sumac: Course = { label: "Sumac Hollow", sub: "Display 4 · Tull Prairie", scans: 61, visits: 44, leads: 9, orders: 3 };
const cottonwood: Course = { label: "Lone Cottonwood", sub: "Display 9 · Brannick", scans: 38, visits: 27, leads: 5, orders: 1 };
const wheatgrass: Course = { label: "Wheatgrass Pines", sub: "Display 11 · Osgood Bend", scans: 74, visits: 31, leads: 2, orders: 0 };
const others: Course = { label: "9 more courses", sub: "One display each", scans: 46, visits: 30, leads: 4, orders: 1 };
const courses = [sumac, cottonwood, wheatgrass, others];
const COURSES = 12;

const scans = sum(courses.map((c) => c.scans));
const visits = sum(courses.map((c) => c.visits));
const leads = sum(courses.map((c) => c.leads));
const orders = sum(courses.map((c) => c.orders));
const most = courses.reduce((a, b) => (b.scans > a.scans ? b : a));

/** Text lines, price rows and buttons in the 390-wide phone capture (y from, y to, css px), found in its own pixels (round 11: rows with text-like edges on a flat background, 1 px margin). */
const DUFFER_PHONE_BANDS = [
  [27, 55], [87, 94], [435, 466], [473, 504], [511, 542], [573, 589], [691, 721], [741, 759],
  [815, 822], [986, 1006], [1012, 1032], [1047, 1058], [1064, 1078], [1082, 1096], [1101, 1110],
  [1131, 1154], [1167, 1213], [1241, 1270], [1433, 1453], [1459, 1479], [1494, 1507], [1511, 1522],
  [1529, 1540], [1548, 1560], [1578, 1601], [1614, 1680],
] as const;

/** Text lines, price rows and buttons in the 1280-wide desk capture (y from, y to, css px), found in its own pixels (round 11: rows with text-like edges on a flat background, 1 px margin). */
const DUFFER_DESK_BANDS = [
  [46, 81], [455, 506], [517, 568], [579, 629], [658, 667], [697, 708], [891, 933], [953, 974],
  [1029, 1075], [1348, 1377], [1382, 1410], [1427, 1444], [1448, 1465], [1468, 1485], [1509, 1541],
  [1562, 1573], [1578, 1612], [1627, 1647],
] as const;

export const impact = impactBeat("duffer-golf", {
  tab: "Impact",
  caption: "What the Command Center runs for Duffer's partners, dealers and course displays.",
  shape: "loop",
  kicker: "What we built",
  chapters: [
    {
      name: "The Command Center",
      hero: {
        before: fact<"Our audit of the old site, Sep 13 2026">("The old site tracked nothing, and no order said who sent it."),
        now: "Every scan and visit is credited to the partner who sent it.",
      },
      how: "The partner loop",
      steps: [
        { verb: "Signs up", text: "a new partner and links their course display on its own." },
        { verb: "Prints", text: "a QR display for the course, tied to that partner." },
        { verb: "Credits", text: fact<"How it is built">("every scan to that partner, and a returning golfer to the last display within 90 days.") },
        { verb: "Follows", text: "the golfer to the buy button and checkout, with every visit in MarCommand." },
        { verb: "Keeps", text: "each partner's commission ledger, and each dealer's stock." },
      ],
      pairs: [
        {
          label: "Tracking",
          before: fact<"Our audit of the old site, Sep 13 2026">("No pixel and no analytics across 34 page loads."),
          now: "Every visit, scan and buy-button tap recorded.",
        },
        {
          label: "Referrals",
          before: fact<"Our audit of the old site, Sep 13 2026">("A code field at checkout, and no record of who sent an order."),
          now: "Partner codes, course displays and a commission ledger.",
        },
      ],
    },
  ],
  closing: "A dealer network that keeps its own books.",
  narration:
    "What we built for Duffer Golf. The Command Center signs up partners and links their course displays, prints a QR display for each course, credits every scan and returning golfer to the partner who sent them, follows each golfer to checkout in MarCommand, and keeps the commission and dealer stock ledgers. The old site tracked nothing.",
});

const client: ShowcaseClient = {
  slug: "duffer-golf",
  name: "Duffer Golf",
  short: "Duffer Golf",
  live: { url: "https://duffergolf.net", label: "duffergolf.net" },
  theme: {
    ground: "#ECEAE4",
    groundDeep: "#E2E0D9",
    card: "#FFFFFF",
    ink: "#111211",
    inkSoft: "#4A4B48",
    accent: "#27753A",
    accentText: "#27753A",
    chart1: "#27753A",
    chart2: "#B57E30",
    display: "bricolage",
    body: "bricolage",
    mark: { kind: "golf-ball" },
  },
  beats: [
    {
      kind: "website",
      live: { src: "https://duffergolf.net/", origins: ["https://duffergolf.net"], frame: "handshake" },
      tab: "Website",
      caption: "The bay folds away so the car still fits, and every model shows its price.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/duffer-golf-site-desk-e28191de.webp",
        width: 1280,
        height: 1788,
        stops: [
          { y: 0, holdMs: 2400, avoid: DUFFER_DESK_BANDS },
          // "Choose your model." and all four models with their prices and buttons.
          { y: 880, holdMs: 3200, keep: [890, 1650], avoid: DUFFER_DESK_BANDS },
        ],
      },
      phone: {
        src: "/images/showcase/duffer-golf-site-phone-7ed25c02.webp",
        width: 390,
        height: 1700,
        // The caption promises the prices: every stop rests with its band whole, at every phone height.
        stops: [
          // "A full golf bay. Then it's a garage again." and its button, whole.
          { y: 0, holdMs: 2400, keep: [430, 627], avoid: DUFFER_PHONE_BANDS },
          // The two systems, name to price.
          { y: 738, holdMs: 1900, keep: [985, 1156], avoid: DUFFER_PHONE_BANDS },
          // The two Complete models, name to button; the capture ends under them.
          { y: 1290, holdMs: 2400, toEnd: true, keep: [1430, 1684], avoid: DUFFER_PHONE_BANDS },
        ],
      },
    },
    {
      kind: "funnel",
      tab: "MarCommand",
      caption: "A scan at a golf course counter and an order online land in the same funnel.",
      narration:
        "The MarCommand dashboard on demonstration data: partner golf courses, the scans at each course's display, and how many became visits, leads and orders. None of these courses are real.",
      funnel: {
        window: "30 days",
        lead: {
          kicker: "Partner courses · last 30 days",
          value: `${COURSES} courses`,
          sub: [
            { label: "Displays", value: count(COURSES) },
            { label: "Orders", value: count(orders) },
          ],
        },
        stages: [
          { label: "Scanned", value: scans },
          { label: "Visited", value: visits },
          { label: "Leads", value: leads },
          { label: "Orders", value: orders },
        ],
        railFigures: ["Scans", "Orders"],
        rail: courses.map((c) => ({
          label: c.label,
          sub: c.sub,
          icon: c === others ? ("flags" as const) : ("flag" as const),
          hue: c.orders >= 2 ? 1 : 2,
          figures: [c.scans, c.orders] as const,
          weight: c.scans,
          reach: c.orders > 0 ? 3 : c.leads > 0 ? 2 : 1,
        })),
      },
    },
    {
      kind: "ai-ask",
      tab: "AI",
      caption: "Duffer asks which courses are selling, and gets names and numbers back.",
      narration:
        "The MarCommand AI tab on demonstration data: asked which golf courses send buyers, it reads scans and orders by course, checks every figure, and answers.",
      question: "Which golf courses are sending us buyers?",
      steps: [
        { label: "Reading your question", phase: 0, ms: 700 },
        { label: "Reading scans by course, last 30 days", phase: 1, ms: 900, chip: `${COURSES} rows` },
        { label: "Reading orders, last 30 days", phase: 1, ms: 700, chip: `${orders} rows` },
        { label: "Matching each order to the display it started at", phase: 2, ms: 1200 },
        { label: "Writing the answer", phase: 3, ms: 900 },
        { label: "Checking every figure", phase: 4, ms: 800, chip: "8 figures matched" },
      ],
      worked: [
        {
          kind: "Pulled",
          lines: [
            { text: `Scans: ${count(scans)} across ${COURSES} courses`, chip: `rows ×${COURSES}` },
            { text: `Orders: ${orders} that started with a scan`, chip: `rows ×${orders}` },
          ],
        },
        { kind: "Compared", lines: [{ text: `${wheatgrass.label}: ${wheatgrass.scans} scans, ${wheatgrass.orders} orders` }] },
        { kind: "Concluded", lines: [{ text: `Answer: ${sumac.label} sends the buyers` }] },
      ],
      answer: {
        headline: `${sumac.label} sent ${sumac.orders} of the ${orders} orders that started with a course display.`,
        figures: [
          { value: count(orders), label: "Orders from displays" },
          { value: count(sumac.orders), label: sumac.label },
          { value: count(cottonwood.orders), label: cottonwood.label },
          { value: count(wheatgrass.orders), label: wheatgrass.label },
        ],
        chart: {
          title: "Orders by course · last 30 days",
          money: false,
          bars: courses.map((c) => ({ label: c.label, value: c.orders })),
          ticks: [0, 1, 2, 3, 4],
        },
        means: [
          `${most.label} had the most scans, ${most.scans}, and ${most.orders === 0 ? "no orders" : `${most.orders} orders`}. Only ${most.visits} of those people stayed to read the page.`,
          `${sumac.label} turned ${sumac.scans} scans into ${sumac.leads} leads and ${sumac.orders} orders.`,
        ],
        next: [
          `We ask ${wheatgrass.label} to move its display from the cart barn to the pro shop counter.`,
          `We send ${sumac.label} a second display for the clubhouse.`,
        ],
        sources: [
          { label: "Scans", detail: count(scans) },
          { label: "Leads", detail: count(leads) },
          { label: "Orders", detail: count(orders) },
        ],
      },
    },
    impact,
  ],
};

export default client;
