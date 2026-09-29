// src/data/demos/invented/nwks-encounter.ts
// Invented names for /case-studies/nwks-encounter ONLY (ADR-0017 §3-5). Pure
// data: tests/demo-privacy.probe.mjs imports this file directly. No runtime
// imports.
//
// The 48-man roster is REUSED from the approved concept strip (revision 3,
// ~/.claude/agent-reports/ps-showcase-initiative/strip-nwks/fixture.js and
// NOTES.md), which was checked 0/155 matches against
// NWKS-Org-Engine-Handoff.md by whole-word grep. The lead re-checked the six
// launch towns by web search 2026-09-28 (spec-NW.md §3) and CLEARED all six.
// The 12 attendees and their surnames are NEW this lane. Web-checked by the
// team lead 2026-09-28 ("<full name> Kansas"): eleven cleared as invented;
// One originally invented attendee surname turned out to belong to a real
// Wichita, Kansas person; it is not reproduced here, and was replaced with
// "Nolan Ferrick" (checked, no match). None reuses a server's surname, a
// real Kansas town, or a name on the private deny list.
import type { InventedSet } from "../_invented";

const STRIP_CHECKED =
  "reused verbatim from the approved concept strip (strip-nwks/fixture.js revision 3), " +
  "itself grepped 0/155 whole-word matches against NWKS-Org-Engine-Handoff.md; independently " +
  're-verified by the team lead 2026-09-28 via WebSearch ("<full name> Kansas"), CLEAR or ' +
  "MATCH-ELSEWHERE (a private individual with no Kansas link, acceptable per the check's own " +
  "rule); see names-check-NW.md";
const ROSTER_REPLACED =
  "the originally invented name matched a real Kansas resident or public figure by the team " +
  "lead's web check 2026-09-28 (names-check-NW.md) and was replaced with this name, itself " +
  "checked with no Kansas match";
const ATTENDEE_CHECKED =
  '2026-09-28 web (team lead): "<full name> Kansas", no match; CLEARED';
const TOWN_CHECKED_CLEAR = "2026-09-28 web (team lead): no Kansas place of this name; CLEARED (spec-NW.md §3)";
const TOWN_CHECKED_REPLACED =
  "2026-09-28 web (team lead): replaces a real Kansas place name found in the first pass; this " +
  "name itself checked with no Kansas match; CLEARED (spec-NW.md §3)";

export const invented: InventedSet = {
  scope: "nwks-encounter",

  people: [
    // ── The 48-man volunteer-team roster (strip revision 3) ──────────────
    { id: "srv-hal-wendorf", first: "Hal", last: "Wendorf", checked: STRIP_CHECKED },
    { id: "srv-marty-ostrand", first: "Marty", last: "Ostrand", checked: STRIP_CHECKED },
    { id: "srv-len-kessinger", first: "Len", last: "Kessinger", checked: STRIP_CHECKED },
    { id: "srv-duane-ruhlman", first: "Duane", last: "Ruhlman", checked: STRIP_CHECKED },
    { id: "srv-carl-bettenhaus", first: "Carl", last: "Bettenhaus", checked: STRIP_CHECKED },
    { id: "srv-owen-stricklin", first: "Owen", last: "Stricklin", checked: STRIP_CHECKED },
    { id: "srv-pete-harwell", first: "Pete", last: "Harwell", checked: STRIP_CHECKED },
    { id: "srv-curt-abernethy", first: "Curt", last: "Abernethy", checked: STRIP_CHECKED },
    { id: "srv-glen-tolliver", first: "Glen", last: "Tolliver", checked: STRIP_CHECKED },
    { id: "srv-roy-kasselman", first: "Roy", last: "Kasselman", checked: STRIP_CHECKED },
    { id: "srv-wes-dunmore", first: "Wes", last: "Dunmore", checked: STRIP_CHECKED },
    { id: "srv-ray-pollart", first: "Ray", last: "Pollart", checked: STRIP_CHECKED },
    { id: "srv-rory-vantine", first: "Rory", last: "Vantine", checked: STRIP_CHECKED },
    { id: "srv-theo-marchetti", first: "Theo", last: "Marchetti", checked: STRIP_CHECKED },
    { id: "srv-dale-fenwright", first: "Dale", last: "Fenwright", checked: STRIP_CHECKED },
    { id: "srv-ned-carrow", first: "Ned", last: "Carrow", checked: STRIP_CHECKED },
    { id: "srv-stan-ebberts", first: "Stan", last: "Ebberts", checked: STRIP_CHECKED },
    { id: "srv-lyle-brandvold", first: "Lyle", last: "Brandvold", checked: STRIP_CHECKED },
    { id: "srv-mitch-kolander", first: "Mitch", last: "Kolander", checked: STRIP_CHECKED },
    { id: "srv-bert-sandquist", first: "Bert", last: "Sandquist", checked: STRIP_CHECKED },
    { id: "srv-vic-hallum", first: "Vic", last: "Hallum", checked: STRIP_CHECKED },
    { id: "srv-jed-morrow", first: "Jed", last: "Morrow", checked: STRIP_CHECKED },
    { id: "srv-earl-tunstall", first: "Earl", last: "Tunstall", checked: STRIP_CHECKED },
    { id: "srv-frank-ostberg", first: "Frank", last: "Ostberg", checked: ROSTER_REPLACED },
    { id: "srv-neil-castellan", first: "Neil", last: "Castellan", checked: STRIP_CHECKED },
    { id: "srv-arlo-penner", first: "Arlo", last: "Penner", checked: STRIP_CHECKED },
    { id: "srv-sam-whitcomb", first: "Sam", last: "Whitcomb", checked: STRIP_CHECKED },
    { id: "srv-gary-lindqvist", first: "Gary", last: "Lindqvist", checked: STRIP_CHECKED },
    { id: "srv-ken-ridgeley", first: "Ken", last: "Ridgeley", checked: ROSTER_REPLACED },
    { id: "srv-tyson-graber", first: "Tyson", last: "Graber", checked: STRIP_CHECKED },
    { id: "srv-blake-heinen", first: "Blake", last: "Heinen", checked: STRIP_CHECKED },
    { id: "srv-cody-ambrust", first: "Cody", last: "Ambrust", checked: ROSTER_REPLACED },
    { id: "srv-luke-spangler", first: "Luke", last: "Spangler", checked: STRIP_CHECKED },
    { id: "srv-drew-ostermann", first: "Drew", last: "Ostermann", checked: STRIP_CHECKED },
    { id: "srv-kyle-barrington", first: "Kyle", last: "Barrington", checked: STRIP_CHECKED },
    { id: "srv-ross-deegan", first: "Ross", last: "Deegan", checked: STRIP_CHECKED },
    // The duplicate-name story (spec-NW.md §2.3): the registered record is the
    // correct spelling, with the transposed sheet spelling as an alias.
    {
      id: "srv-gus-pemberdahl",
      first: "Gus",
      last: "Pemberdahl",
      aliases: ["Gus Pemberdhal"],
      checked: STRIP_CHECKED,
    },
    { id: "srv-jace-wolfram", first: "Jace", last: "Wolfram", checked: STRIP_CHECKED },
    { id: "srv-brent-oakes", first: "Brent", last: "Oakes", checked: STRIP_CHECKED },
    { id: "srv-evan-tully", first: "Evan", last: "Tully", checked: STRIP_CHECKED },
    { id: "srv-nate-corbell", first: "Nate", last: "Corbell", checked: STRIP_CHECKED },
    { id: "srv-colt-ravenscroft", first: "Colt", last: "Ravenscroft", checked: STRIP_CHECKED },
    { id: "srv-walt-hensler", first: "Walt", last: "Hensler", checked: STRIP_CHECKED },
    { id: "srv-trent-vossler", first: "Trent", last: "Vossler", checked: ROSTER_REPLACED },
    { id: "srv-jonah-pruett", first: "Jonah", last: "Pruett", checked: STRIP_CHECKED },
    { id: "srv-reid-castner", first: "Reid", last: "Castner", checked: STRIP_CHECKED },
    { id: "srv-micah-olander", first: "Micah", last: "Olander", checked: STRIP_CHECKED },
    { id: "srv-dean-farquhar", first: "Dean", last: "Farquhar", checked: STRIP_CHECKED },

    // ── The 12 invented attendees (new this lane, disjoint from the roster) ──
    // Web-checked by the team lead 2026-09-28 ("<full name> Kansas"); eleven
    // cleared as invented, one originally invented surname turned out to be a
    // real Wichita, Kansas person (not reproduced here) and was replaced with
    // "Nolan Ferrick" (cleared, no match).
    // Registered (7)
    { id: "att-grant-ashwell", first: "Grant", last: "Ashwell", checked: ATTENDEE_CHECKED },
    { id: "att-miles-cordero", first: "Miles", last: "Cordero", checked: ATTENDEE_CHECKED },
    // Shares a first name with att-grant-ashwell on purpose: the Lookout AI
    // ambiguous-turn candidate pair (spec-NW.md §2.6, §3).
    { id: "att-grant-petracek", first: "Grant", last: "Petracek", checked: ATTENDEE_CHECKED },
    { id: "att-owen-bratcher", first: "Owen", last: "Bratcher", checked: ATTENDEE_CHECKED },
    { id: "att-silas-kanaly", first: "Silas", last: "Kanaly", checked: ATTENDEE_CHECKED },
    { id: "att-perry-wooldridge", first: "Perry", last: "Wooldridge", checked: ATTENDEE_CHECKED },
    { id: "att-nolan-ferrick", first: "Nolan", last: "Ferrick", checked: ATTENDEE_CHECKED },
    // Waitlisted (3): one pending review (returning), one true wait-list
    // position, one mid-offer "given the seat".
    { id: "att-denny-aldous", first: "Denny", last: "Aldous", checked: ATTENDEE_CHECKED },
    { id: "att-hollis-vantrease", first: "Hollis", last: "Vantrease", checked: ATTENDEE_CHECKED },
    { id: "att-emmett-sorenson", first: "Emmett", last: "Sorenson", checked: ATTENDEE_CHECKED },
    // Dropped (2): one carrying a "was already paid" warning.
    { id: "att-barrett-lindeman", first: "Barrett", last: "Lindeman", checked: ATTENDEE_CHECKED },
    { id: "att-corwin-haskell", first: "Corwin", last: "Haskell", checked: ATTENDEE_CHECKED },
  ],

  businesses: [],

  towns: [
    { id: "aldervale", name: "Aldervale", checked: TOWN_CHECKED_CLEAR },
    { id: "kestrel-bend", name: "Kestrel Bend", checked: TOWN_CHECKED_REPLACED },
    { id: "tollerton", name: "Tollerton", checked: TOWN_CHECKED_REPLACED },
    { id: "emberton", name: "Emberton", checked: TOWN_CHECKED_CLEAR },
    { id: "fallowfield", name: "Fallowfield", checked: TOWN_CHECKED_CLEAR },
    { id: "birchwood-corners", name: "Birchwood Corners", checked: TOWN_CHECKED_CLEAR },
  ],

  domains: [{ id: "campmail", domain: "campmail.example" }],

  // Capitalized UI words this stage's own screens use, none of them a person,
  // town or approved entity (tests/demo-privacy/common-words.txt is generic
  // and shared by every lane; these are NWKS-specific).
  vocabulary: [
    "Sheet",
    "Sheets",
    "Org",
    "Prayer",
    "Team",
    "Teams",
    "Food",
    "Supplies",
    "Logistics",
    "Registration",
    "Tech",
    "Venue",
    "Teaching",
    "Special",
    "Ops",
    "Nourishment",
    "Lookout",
    "Rooms",
    "Cabin",
    "Cabins",
    "Bed",
    "Beds",
    "Side",
    "Sides",
    "Left",
    "Right",
    "Still",
    "Placed",
    "Placing",
    "Placement",
    "Town",
    "Towns",
    "Launch",
    "Point",
    "Points",
    "Workbench",
    "Template",
    "Templates",
    "Audience",
    "Everyone",
    "Servers",
    "Attendees",
    "Subject",
    "Letter",
    "Letters",
    // The phone before strip (BeforeStrip.tsx): its toggle and the Email title.
    "Show",
    "Hide",
    "Emailed",
    "History",
    "Rule",
    "Rules",
    "Size",
    "Trade",
    "Trades",
    "Meal",
    "Meals",
    "Shift",
    "Shifts",
    "Candidate",
    "Candidates",
    "Thread",
    "Question",
    "Ask",
    "Record",
    "Records",
    "Star",
    "Captain",
    "Recognized",
    "Recognised",
    "Sheet",
    "Confirm",
    "Drop",
    "Dropped",
    "Give",
    "Seat",
    "Seats",
    "Waitlist",
    "Wait",
    "List",
    "Offer",
    "Offered",
    "Insert",
    "Field",
    "Fields",
    "Merge",
    "Merged",
    "Reader",
    "Readers",
    "Writing",
    "Picture",
    "Toolbar",
    "Legend",
    "Key",
    "Locked",
    "Lock",
    "Empty",
    "Floor",
    "Plan",
    "Why",
    "Landed",
    "Here",
    "Depth",
    "Shirt",
    "Sizes",
    "Recent",
    "Registrations",
    "Sign",
    "Ups",
    "Full",
    "Payment",
    "Cash",
    "Check",
    "Card",
    "Encounter",
    "Men's",
    "Mens",
    "Camp",
    "Spring",
    "Needs",
    "Dietary",
    "Once",
    "Location",
    "Locations",
    "Counts",
    "Registered",
    "Export",
    "Mark",
    "Switch",
    "Ready",
    "Opened",
    "Days",
    "Print",
    "Room",
    "Rerun",
    "Faded",
    "Recurring",
    "As",
    "Dear",
    "Save",
    "Narrowed",
    "Where",
    "Tap",
    "Everything",
    "Answered",
    // Newly always-rendered Wait List / Dropped copy (review finding 3: the
    // groups used to be hidden behind a client-only view toggle, so their
    // text never reached the built HTML for this probe to see).
    "Cancel",
    "Came",
    "Times",
    "Keep",
    "Waitlisted",
    "Missed",
    "Was",
    "Changed",
    "Reason",
    // The redesigned Attendees phone row (critic-NW B2).
    "Awaiting",
    "He",
    // The Org Sheet read (critic-NW B4): the rules' own F-codes, and the
    // product's own Teams-board labels (PoolLane search, Master schedule
    // toggle, empty-lane hint).
    "F1",
    "F8",
    "F9",
    "F10",
    "Master",
    "Find",
    "Nobody",
    "Drag",
    "Listed",
    // The drawn "before" materials (critic-NW M2): form, notepad, workbooks.
    "Call",
    "Invited",
    "Name",
    "SPARE",
    "Submit",
    // Shirt sizes and single-letter UI codes (side letters, 5A/5B/5C suffixes).
    "S",
    "M",
    "L",
    "XL",
    "B",
    "C",
    "R",
  ],

  approved: [
    { name: "NWKS", source: "docs/CANONICAL-PROJECTS.md: the ministry is nameable (nwks-encounter.ts:13-18)" },
    { name: "NWKS Encounter", source: "docs/CANONICAL-PROJECTS.md: the ministry is nameable" },
    { name: "NWKS Admin", source: "the recreated panel's own window chrome label, ADR-0017 §2" },
    { name: "Men's Encounter 2027", source: "invented encounter title, ADR-0017; mirrors the strip's own title composition" },
    // Real tools quoted VERBATIM from the host page's own already-published
    // "before" copy (nwks-encounter.ts:100-103), never invented or implied to
    // be a demo entity: the ministry's actual pre-Preisser tooling.
    { name: "WordPress", source: "nwks-encounter.ts:101, before.body[0], quoted verbatim" },
    { name: "Google Forms", source: "nwks-encounter.ts:101, before.body[0], quoted verbatim" },
    { name: "Google Form", source: "nwks-encounter.ts:101, before.body[0]; singular form used in this lane's own before-card paraphrase" },
    { name: "Google", source: "nwks-encounter.ts:101, before.body[0], quoted verbatim" },
    { name: "Word", source: "nwks-encounter.ts:103, before.body[1] (\"Word documents\"), quoted verbatim" },
  ],

  assets: [],
};
