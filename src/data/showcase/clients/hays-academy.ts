// The hair school's showcase: their site, their MarCommand dashboard, and the
// AI tab answering the ad question every school owner has.
//
// Every number below is INVENTED (ADR-0016 §5): no figure was read from the
// school's portal, its engine or a captured payload. Totals and every figure in
// the AI answer are computed from the channel rows, so they always agree.
// The school's name is on the private deny list for back-office stages: the
// funnel and AI beats never print it; the school's HA mark stands in.
//
// Website captures: haysacademy.edu, 2026-11-01, Playwright Chromium (desk
// 1280 at 1.25x, phone 390 at 2x, iPhone UA). The welcome collage between the
// hero and the outcomes is left out (it is scroll-driven and captures blank);
// the capture ends after the two program cards, before the testimonials.
import type { ShowcaseClient } from "../types";
import { count, money, oneIn, sum } from "../format";

const ch = (label: string, icon: "ads" | "social-ads" | "search" | "direct" | "maps" | "social" | "sites", spend: number, visited: number, leads: number) => ({
  label,
  icon,
  spend,
  visited,
  leads,
});

/** Last 30 days, invented. Spend only on the two paid channels. */
const google = ch("Google Ads", "ads", 640, 410, 11);
const social = ch("Social ads", "social-ads", 520, 690, 2);
const unpaid = [
  ch("Direct", "direct", 0, 240, 6),
  ch("Maps", "maps", 0, 150, 5),
  ch("Google search", "search", 0, 360, 9),
  ch("Social media", "social", 0, 90, 1),
  ch("Other sites", "sites", 0, 30, 0),
];
const all = [google, social, ...unpaid];

const visited = sum(all.map((c) => c.visited));
const leads = sum(all.map((c) => c.leads));
const spend = google.spend + social.spend;
const adClicks = google.visited + social.visited;
const paidLeads = google.leads + social.leads;
const forms = 14;
const calls = leads - forms;
/** Ads were shown about 19.5 times for every ad click. Invented. */
const reached = Math.round((adClicks * 19.5) / 100) * 100;
const interested = Math.round(visited * 0.325);
const validated = Math.round(leads * 0.8);

const cplGoogle = google.spend / google.leads;
const cplSocial = social.spend / social.leads;

const client: ShowcaseClient = {
  slug: "hays-academy",
  name: "Hays Academy of Hair Design",
  short: "Hays Academy",
  live: { url: "https://haysacademy.edu", label: "haysacademy.edu" },
  theme: {
    ground: "#FAF6F0",
    groundDeep: "#F3ECE2",
    card: "#FFFFFF",
    ink: "#23213D",
    inkSoft: "#55527A",
    accent: "#E84C88",
    accentText: "#A82659",
    chart1: "#E84C88",
    chart2: "#5B57A8",
    display: "fraunces",
    body: "figtree",
    mark: { kind: "img", src: "/images/demos/hays-academy-monogram.svg" },
  },
  beats: [
    {
      kind: "website",
      tab: "Website",
      caption: "We put the next class date at the top of their site, and every program shows its price.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/hays-academy-site-desk-7e175ee0.webp",
        width: 1280,
        height: 2099,
        stops: [
          { y: 0, holdMs: 2200 },
          { y: 860, holdMs: 1500 },
          { y: 1190, holdMs: 2600 },
        ],
      },
      phone: {
        src: "/images/showcase/hays-academy-site-phone-55d5fb2a.webp",
        width: 390,
        height: 2180,
        stops: [
          { y: 0, holdMs: 2200 },
          { y: 870, holdMs: 1500 },
          { y: 1236, holdMs: 2600 },
        ],
      },
    },
    {
      kind: "funnel",
      tab: "Funnel",
      caption: "Every ad and every search runs into one MarCommand funnel, so Hays can see what actually brings in leads.",
      narration:
        "The MarCommand dashboard on demonstration data: seven channels, the people each one sent to the website, and how many became leads. None of these numbers are real.",
      funnel: {
        window: "30 days",
        lead: { kicker: "Ad spend · last 30 days", value: money(spend), sub: [{ label: "Leads from ads", value: count(paidLeads) }] },
        stages: [
          { label: "Reached", value: reached, note: `${count(adClicks)} ad clicks` },
          { label: "Visited", value: visited },
          { label: "Interested", value: interested },
          { label: "Leads", value: leads, note: `${forms} forms · ${calls} calls` },
          { label: "Validated", value: validated },
        ],
        railFigures: ["Visited", "Leads"],
        rail: all.map((c) => ({
          label: c.label,
          sub: c.spend ? `${money(c.spend)} spent` : "No ad spend",
          icon: c.icon,
          hue: c.spend ? 1 : 2,
          figures: [c.visited, c.leads] as const,
          weight: c.visited,
          reach: c.leads > 0 ? 4 : 2,
        })),
      },
    },
    {
      kind: "ai-ask",
      tab: "AI",
      caption: "Hays can ask it anything about their numbers, starting with the question every school has about its ads.",
      narration:
        "The MarCommand AI tab on demonstration data: asked whether any ads are wasting money, it reads spend and leads by channel, checks every figure, and answers.",
      question: "Are we wasting money on any of our ads?",
      steps: [
        { label: "Reading your question", phase: 0, ms: 700 },
        { label: "Reading ad spend by channel, last 30 days", phase: 1, ms: 900, chip: "2 rows" },
        { label: "Reading leads by channel, last 30 days", phase: 1, ms: 800, chip: `${all.length} rows` },
        { label: "Working out what each lead cost", phase: 2, ms: 1100 },
        { label: "Writing the answer", phase: 3, ms: 900 },
        { label: "Checking every figure", phase: 4, ms: 800, chip: "9 figures matched" },
      ],
      worked: [
        {
          kind: "Pulled",
          lines: [
            { text: `Ad spend: Google Ads ${money(google.spend)}, Social ads ${money(social.spend)}`, chip: "rows ×2" },
            { text: `Leads: Google Ads ${google.leads}, Social ads ${social.leads}`, chip: "rows ×2" },
          ],
        },
        { kind: "Compared", lines: [{ text: `Per lead: ${money(cplGoogle)} against ${money(cplSocial)}` }] },
        { kind: "Concluded", lines: [{ text: "Answer: the social ads cost the most per lead" }] },
      ],
      answer: {
        headline: `Yes, on Social ads: each lead there cost ${money(cplSocial)}, against ${money(cplGoogle)} on Google Ads.`,
        figures: [
          { value: money(social.spend), label: "Social ads spend" },
          { value: count(social.leads), label: "Social ads leads" },
          { value: money(cplSocial), label: "Per social lead" },
          { value: money(cplGoogle), label: "Per Google lead" },
        ],
        chart: {
          title: "Cost per lead · last 30 days",
          money: true,
          bars: [
            { label: "Google Ads", value: Math.round(cplGoogle) },
            { label: "Social ads", value: Math.round(cplSocial) },
          ],
          ticks: [0, 100, 200, 300],
        },
        means: [
          `Social ads sent ${count(social.visited)} visits and got ${social.leads} leads. Google Ads turned ${count(google.visited)} visits into ${google.leads}.`,
          `${oneIn(social.visited, social.leads)} social ad visitors reached out. On Google Ads it was about ${oneIn(google.visited, google.leads)}.`,
        ],
        next: [
          "We move $300 a month from Social ads to Google Ads, starting this week.",
          "We point the social ad at the start dates page and look at its leads again in two weeks.",
        ],
        sources: [
          { label: "Google Ads", detail: `${money(google.spend)} · ${google.leads} leads` },
          { label: "Meta", detail: `${money(social.spend)} · ${social.leads} leads` },
          { label: "Leads", detail: `${leads} leads` },
        ],
      },
    },
  ],
};

export default client;
