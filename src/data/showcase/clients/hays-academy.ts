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

const cplGoogle = google.spend / google.leads;
const cplSocial = social.spend / social.leads;
/** What the AI's plan moves from Social ads to Google Ads each month; the MarCommand tab turns that dial. */
const MOVED = 300;

/** Text lines, price rows and buttons in the 390-wide phone capture (y from, y to, css px), found in its own pixels (round 11: rows with text-like edges on a flat background, 1 px margin). */
const HAYS_PHONE_BANDS = [
  [26, 55], [626, 653], [657, 684], [699, 713], [753, 770], [904, 933], [945, 963], [994, 1028],
  [1035, 1053], [1060, 1076], [1101, 1113], [1123, 1138], [1146, 1161], [1251, 1258], [1514, 1542],
  [1550, 1560], [1574, 1585], [1632, 1642], [1952, 1980], [1988, 1998], [2012, 2023], [2070, 2080],
] as const;

/** Text lines, price rows and buttons in the 1280-wide desk capture (y from, y to, css px), found in its own pixels (round 11: rows with text-like edges on a flat background, 1 px margin). */
const HAYS_DESK_BANDS = [
  [31, 85], [195, 253], [272, 345], [351, 427], [442, 461], [471, 490], [531, 546], [567, 590],
  [623, 629], [631, 683], [935, 990], [1002, 1021], [1031, 1046], [1084, 1101], [1118, 1133],
  [1685, 1730], [1742, 1755], [1801, 1812], [1826, 1848], [1890, 1901],
] as const;

/** The hero card above the class date: a resting top edge never lands in it (critique r10 S4). */
const HAYS_HERO_CARD = [560, 743] as const;

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
      live: { src: "https://haysacademy.edu/", origins: ["https://haysacademy.edu"], frame: "handshake" },
      tab: "Website",
      caption: "Hays's next class date sits right up top, and every program shows its price.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/hays-academy-site-desk-7e175ee0.webp",
        width: 1280,
        height: 2099,
        first: { src: "/images/showcase/hays-academy-site-desk-first-ece0f3e6.webp", width: 1220, height: 819 },
        stops: [
          { y: 0, holdMs: 2200, avoid: HAYS_DESK_BANDS },
          { y: 860, holdMs: 1500, avoid: HAYS_DESK_BANDS },
          { y: 1190, holdMs: 2600, avoid: HAYS_DESK_BANDS },
        ],
      },
      phone: {
        src: "/images/showcase/hays-academy-site-phone-55d5fb2a.webp",
        width: 390,
        height: 2180,
        first: { src: "/images/showcase/hays-academy-site-phone-first-c2cccf96.webp", width: 390, height: 844 },
        stops: [
          { y: 0, holdMs: 2200, avoid: HAYS_PHONE_BANDS },
          // "Next class starts November 10" rests at the top with the four stats under it (critique r8 N2),
          // below the hero card's last row (r10 S4).
          { y: 742, holdMs: 2400, keep: [750, 1062], avoid: [...HAYS_PHONE_BANDS, HAYS_HERO_CARD] },
          // The Cosmetology Program card down to "See the program".
          { y: 1236, holdMs: 2600, keep: [1240, 1650], avoid: HAYS_PHONE_BANDS },
        ],
      },
    },
    {
      kind: "engine",
      tab: "MarCommand",
      caption: "MarCommand weighs every channel, turns its own knobs and keeps what it learns.",
      narration:
        "The MarCommand engine on demonstration data: it weighs the school's ad channels, favours the one that brings enrollment leads at the best cost, turns the budget and schedule dials, and keeps what it learned.",
      // The same invented rows as the AI tab below, so the two tabs agree: Google Ads at
      // $640 a month (about $21 a day) gets the $300 the AI moves off Social ads (Meta),
      // whose leads cost the most; the month's leads are the AI's total.
      channels: [
        { icon: "ads", label: "Google Ads", delta: { text: "best", tone: "up" } },
        { icon: "social-ads", label: "Meta ads", delta: { text: `${money(cplSocial)}/lead`, tone: "down" } },
        { icon: "search", label: "Search" },
        { icon: "maps", label: "Maps" },
      ],
      dials: [
        { label: "Daily budget", from: money(google.spend / 30), to: money((google.spend + MOVED) / 30), r0: 0.3, r1: 0.46 },
        { label: "Radius", from: "25 mi", r0: 0.4 },
        { label: "Ad schedule", from: "All day", to: "4-10pm", r0: 0.15, r1: 0.7 },
      ],
      pick: 0,
      turns: [0, 2],
      learned: [
        { text: "Tuesday to Thursday evenings bring 2x the enrollment leads for the same spend.", when: "Just now", isNew: true },
        { text: `Meta ad leads cost ${Math.round(cplSocial / cplGoogle)}x what Google's do: ${money(MOVED)} a month moved to Google Ads.`, when: "2 days ago" },
        { text: "Open house weekends bring the most calls.", when: "3 weeks ago" },
      ],
      result: { label: "Enrollment leads a month", from: String(leads), to: String(leads + 7) },
    },
    {
      kind: "ai-ask",
      tab: "AI",
      caption: "Hays asks if any ad is wasting money, and gets a yes with the numbers behind it.",
      narration:
        "The MarCommand AI tab on demonstration data: asked whether any ads are wasting money, it reads spend and leads by channel, checks every figure, and answers.",
      question: "Are we wasting money on any of our ads?",
      steps: [
        { label: "Reading your question", phase: 0, ms: 700 },
        { label: "Reading Google Ads spend, last 30 days", phase: 1, ms: 800, chip: "30 rows" },
        { label: "Reading Social ads spend, last 30 days", phase: 1, ms: 700, chip: "30 rows" },
        { label: "Reading site visits, last 30 days", phase: 1, ms: 700, chip: `${count(visited)} rows` },
        { label: "Reading enrollment leads, last 30 days", phase: 1, ms: 700, chip: `${leads} rows` },
        { label: "Working out what each lead cost", phase: 2, ms: 1100 },
        { label: "Writing the answer", phase: 3, ms: 900 },
        { label: "Checking every figure", phase: 4, ms: 800, chip: "9 figures matched" },
      ],
      sources: [
        { icon: "ads", label: "Google Ads", short: "Google", chip: "30 rows", step: 1 },
        { icon: "social-ads", label: "Social ads", short: "Social", chip: "30 rows", step: 2 },
        { icon: "visit", label: "Site visits", short: "Visits", chip: `${count(visited)} rows`, step: 3 },
        { icon: "enroll", label: "Enrollment leads", short: "Leads", chip: `${leads} rows`, step: 4 },
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
          `We move ${money(MOVED)} a month from Social ads to Google Ads, starting this week.`,
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
