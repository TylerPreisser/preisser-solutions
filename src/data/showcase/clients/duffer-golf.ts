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
// and the models; the capture ends after the four models with their prices.
import type { ShowcaseClient } from "../types";
import { count, sum } from "../format";

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
      tab: "Website",
      caption: "The bay folds away so the car still fits, and every model shows its price.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/duffer-golf-site-desk-e28191de.webp",
        width: 1280,
        height: 1788,
        stops: [
          { y: 0, holdMs: 2400 },
          { y: 930, holdMs: 3200 },
        ],
      },
      phone: {
        src: "/images/showcase/duffer-golf-site-phone-61f794ca.webp",
        width: 390,
        height: 1766,
        stops: [
          { y: 0, holdMs: 2400 },
          { y: 738, holdMs: 1900 },
          { y: 1290, holdMs: 2400 },
        ],
      },
    },
    {
      kind: "funnel",
      tab: "Funnel",
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
  ],
};

export default client;
