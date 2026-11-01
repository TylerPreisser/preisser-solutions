// src/data/demos/invented/duffer-golf.ts
// Invented names for the Duffer Golf showcase ONLY (ADR-0016 §5, ADR-0020). Pure data:
// tests/demo-privacy.probe.mjs imports this file directly. No runtime imports.
//
// Duffer Golf is a real, named client (approved below). Every partner course and
// town on the command-center recreation is invented. None is taken from the
// partner program's database, fixtures or print files.
import type { InventedSet } from "../_invented";

const CHECK =
  "2026-10-31 web: Bing exact-phrase search (scripted, scratchpad namecheck.py); the top five results were " +
  "unrelated (dictionary, food or retail pages). No golf course, club or Kansas town of this name surfaced.";

export const invented: InventedSet = {
  scope: "duffer-golf",
  people: [],
  businesses: [
    { id: "sumac-hollow-gc", name: "Sumac Hollow Golf Club", aliases: ["Sumac Hollow"], checked: CHECK },
    { id: "lone-cottonwood-gc", name: "Lone Cottonwood Golf Course", aliases: ["Lone Cottonwood"], checked: CHECK },
    { id: "wheatgrass-pines-gc", name: "Wheatgrass Pines Golf Club", aliases: ["Wheatgrass Pines"], checked: CHECK },
  ],
  towns: [
    { id: "tull-prairie", name: "Tull Prairie", checked: CHECK },
    { id: "brannick", name: "Brannick", checked: CHECK },
    { id: "osgood-bend", name: "Osgood Bend", checked: CHECK },
  ],
  domains: [],
  // Words the real Command Center's own navigation and stat labels use
  // (duffer-partner-program panel/src, rendered on its own test fixtures 2026-10-31).
  vocabulary: [
    "Dashboard", "Prospects", "Inbox", "Partners", "Dealers", "Installers", "Customers", "Orders",
    "Commissions", "QR", "Codes", "Account", "Figures", "Refresh", "Review", "Scans", "Scan",
    "Lead", "Leads", "Visitors", "Buy", "Clicks", "Displays", "Live", "Feed", "Command", "Center",
    "Page", "View", "Still", "Reading", "KS", "iOS", "Android", "Oct", "More", "Network",
    "Days", "Central", "Needing", "Unique", "Last", "Refreshes", "Sign", "Owner",
    // The MarCommand funnel and AI beats (round 5): the portal's tabs, stage
    // labels and AI tab words (portal-ui overview, ai/copy.ts, chat/copy.ts).
    "Overview", "Activity", "AI", "Partner", "Display", "Scanned", "Visited", "Orders", "Ask", "Answer",
    "Pulled", "Compared", "Concluded", "Sources",
  ],
  approved: [
    { name: "Duffer Golf", source: "src/components/home/case-studies.tsx Duffer Golf card (owner, 2026-10-13); DECISIONS/0002" },
    { name: "MarCommand", source: "Preisser Solutions' own product (src/app/products/marcommand-engine)" },
  ],
  assets: [
    {
      path: "/images/demos/duffer-golf-logo-light.webp",
      provenance: "copy of public/images/cases/duffer-golf-12083041.webp (duffer-logo-light.png from duffergolf-site, trimmed)",
    },
  ],
};
