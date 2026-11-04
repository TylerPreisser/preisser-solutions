// FarmBooks' showcase (ADR-0022): their website, then Impact, the story of
// what the bookkeeping engine does, told as text.
//
// Website capture: https://farm-books.com as it stands, 2026-11-01, Playwright
// Chromium, desk 1440 css at 1x, phone 390 at 2x (iPhone 13 UA). Two sections,
// stitched: the hero, and "What it catches" whole, with the site's own three
// scenarios 01, 02 and 03 (round 11, critique r10 MF4). Scenario 01's printed
// lines add to $10,649.75 against an $11,059.75 total, off by $410.00 (re-summed
// from the live HTML). The section was shot in pieces while each was on screen,
// because its rows reveal on scroll.
//
// Impact (ADR-0022 §3): every number is a fact<oracle>() or figure<oracle>();
// the oracle note is a type argument, checked at build and never shipped. The
// precise citation for each is kept outside this public repo.
// Left out on purpose: any hours saved (the bookkeeper has given no figure),
// "one crop year" (the span is unconfirmed), any dollar amount, and the errors
// found in her old books (the owner asked for that block to come off the site).
import type { ShowcaseClient } from "../types";
import { fact, figure, impactBeat } from "../impact";

export const impact = impactBeat("farmbooks", {
  tab: "Impact",
  caption: "What FarmBooks does with every bill, and what the bookkeeper used to do by hand.",
  shape: "path",
  kicker: "What we automated",
  chapters: [
    {
      name: "Every bill that comes in",
      hero: {
        before: fact<"Client's words, Aug 3 2026">("The bookkeeper printed each bill and keyed it into one big workbook."),
        now: "She drops in the PDF or photo and reviews only what is flagged.",
      },
      figures: [
        figure<"Published on this site">("101", "bills read and booked without retyping a line"),
        figure<"Published on this site">("893", "bill lines sorted into tax categories, none left over"),
      ],
      how: "The path every bill takes",
      steps: [
        { verb: "Reads", text: "any bill: an emailed PDF, mailed paper or a phone photo." },
        { verb: "Checks", text: "it against its printed total, to the cent, and holds it if it does not tie." },
        { verb: "Sorts", text: "every line into its Schedule F tax category." },
        { verb: "Splits", text: "a shared bill across fields by acreage." },
        { verb: "Drafts", text: "each landowner's fertilizer bill for a person to send." },
      ],
      pairs: [
        {
          label: "Landowners",
          before: fact<"Client's words, Oct 12 2026">("Not billed for fertilizer in about a year, as far as she knew."),
          now: "Each share worked out from the lease and drafted for review.",
        },
      ],
    },
  ],
  closing: "Line items in. Never a typed total.",
  narration:
    "What we automated for FarmBooks. The bookkeeper used to print each bill and key it into a workbook by hand. Now every bill, emailed, mailed or photographed, is read, checked against its printed total to the cent, sorted into its Schedule F category and split across fields by acreage, and each landowner's fertilizer bill is drafted for a person to send.",
});

/** Text lines, price rows and buttons in the 390-wide phone capture (y from, y to, css px), found in its own pixels (round 11: rows with text-like edges on a flat background, 1 px margin): the two hero buttons measured whole. */
const FB_PHONE_BANDS = [
  [23, 43], [228, 240], [260, 351], [386, 402], [413, 430], [441, 460], [469, 486], [524, 588],
  [549, 569], [596, 651], [620, 632], [674, 691], [844, 855], [874, 905], [907, 938], [965, 979],
  [991, 1009], [1016, 1030], [1042, 1060], [1067, 1085], [1093, 1107], [1194, 1217], [1243, 1253],
  [1273, 1291], [1297, 1315], [1321, 1335], [1345, 1359], [1401, 1416], [1428, 1442], [1454, 1468],
  [1481, 1495], [1524, 1541], [1571, 1585], [1591, 1600], [1669, 1679], [1714, 1727], [1736, 1753],
  [1758, 1771], [1780, 1797], [1834, 1848], [1861, 1875], [1904, 1916], [2019, 2029], [2056, 2081],
  [2105, 2119], [2124, 2138], [2219, 2242], [2244, 2263], [2293, 2303], [2324, 2342], [2348, 2362],
  [2372, 2390], [2396, 2414], [2420, 2438], [2479, 2493], [2560, 2570], [2605, 2618], [2627, 2640],
  [2649, 2662], [2705, 2720], [2723, 2737], [2745, 2759], [2763, 2774], [2858, 2868], [2891, 2902],
  [2928, 2942], [2946, 2957], [3041, 3060], [3090, 3100], [3121, 3135], [3145, 3159], [3169, 3183],
  [3193, 3210], [3243, 3253], [3266, 3280], [3318, 3328], [3342, 3356], [3382, 3393], [3462, 3472],
  [3507, 3524], [3529, 3546], [3581, 3594], [3611, 3622], [3631, 3640], [3739, 3749], [3767, 3783],
  [3788, 3803], [3814, 3827], [3836, 3851], [3859, 3872], [3891, 3909],
] as const;

/** Text lines, price rows and buttons in the 1440-wide desk capture (y from, y to, css px), found in its own pixels (round 11: rows with text-like edges on a flat background, 1 px margin): the two hero buttons measured whole. */
const FB_DESK_BANDS = [
  [31, 53], [308, 319], [342, 490], [530, 551], [561, 582], [592, 608], [653, 711], [674, 693],
  [737, 752], [1012, 1023], [1045, 1089], [1092, 1127], [1173, 1192], [1201, 1220], [1229, 1248],
  [1257, 1272], [1382, 1408], [1439, 1449], [1470, 1590], [1629, 1644], [1652, 1668], [1675, 1721],
  [1739, 1751], [1753, 1768], [1798, 1809], [1816, 1827], [1935, 1961], [1992, 2002], [2024, 2098],
  [2100, 2120], [2126, 2140], [2151, 2177], [2181, 2192], [2200, 2233], [2238, 2249], [2258, 2267],
  [2394, 2414], [2451, 2461], [2480, 2496], [2501, 2587], [2595, 2621], [2625, 2663], [2703, 2713],
  [2726, 2739], [2745, 2756], [2784, 2795],
] as const;

const client: ShowcaseClient = {
  slug: "farmbooks",
  name: "FarmBooks",
  short: "FarmBooks",
  live: { url: "https://farm-books.com", label: "farm-books.com" },
  theme: {
    ground: "#F2F0EB",
    groundDeep: "#E9E4D8",
    card: "#FFFDF8",
    ink: "#1D1A15",
    inkSoft: "#5A5246",
    accent: "#C9971F",
    accentText: "#7A5810",
    chart1: "#C9971F",
    chart2: "#2F7D3B",
    display: "fraunces",
    body: "figtree",
    mark: { kind: "letters", text: "FB" },
  },
  beats: [
    {
      kind: "website",
      live: { src: "https://farm-books.com/", origins: ["https://farm-books.com", "https://www.farm-books.com"], frame: "handshake" },
      tab: "Website",
      caption: "farm-books.com walks a farmer through the mistakes that hide on a bill.",
      captured: "Captured Nov 1, 2026",
      desk: {
        src: "/images/showcase/farmbooks-site-desk-d447a5af.webp",
        width: 1440,
        height: 2992,
        stops: [
          { y: 0, holdMs: 2000, avoid: FB_DESK_BANDS },
          // "Three ways", then 01 whole: the bill, the sum and "Off by $410.00".
          { y: 1000, holdMs: 2800, keep: [1005, 1830], avoid: FB_DESK_BANDS },
          // 02 and 03 whole.
          { y: 1925, holdMs: 3000, keep: [1930, 2800], avoid: FB_DESK_BANDS },
        ],
      },
      phone: {
        src: "/images/showcase/farmbooks-site-phone-ba88fca9.webp",
        width: 390,
        height: 4024,
        // Each stop shows its band whole, and no edge cuts a line, a price or a button.
        stops: [
          { y: 0, holdMs: 1400, keep: [200, 590], avoid: FB_PHONE_BANDS },
          // "Three ways a bill costs you more than it should." and the three it names.
          { y: 836, holdMs: 1600, keep: [840, 1110], avoid: FB_PHONE_BANDS },
          // 01: what FarmBooks did, down to "Off by $410.00".
          { y: 1500, holdMs: 2400, keep: [1660, 1920], avoid: FB_PHONE_BANDS },
          // 02: billed for ground farmed on shares, to the $12,000.00 invoice.
          { y: 2210, holdMs: 1600, keep: [2215, 2496], avoid: FB_PHONE_BANDS },
          // 03: the same load on the ticket and on the statement.
          { y: 3035, holdMs: 2200, toEnd: true, keep: [3040, 3396], avoid: FB_PHONE_BANDS },
        ],
      },
    },
    {
      kind: "scene",
      tab: "Bills",
      caption: "A farm bill is snapped, read, sorted by category, split by field and booked, then summed up.",
      scene: "farmbooks-bills",
      narration:
        "FarmBooks on demonstration data: a farm supply bill is photographed, read line by line, sorted into tax categories, split across the farm's fields by acres, checked against the printed total, and summed up at year end.",
    },
    impact,
  ],
};

export default client;
