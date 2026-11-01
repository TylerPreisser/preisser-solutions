// src/data/demos/invented/hays-academy.ts
// Invented names for the hair school's showcase ONLY (ADR-0016 §5, ADR-0020). Pure data:
// tests/demo-privacy.probe.mjs imports this file directly. No runtime imports.
//
// The school is a real, named client, but its name is on the private deny list
// (it is a ps-admin client, and the back-office stage must never show it). So
// the recreation never prints the name: the school's own HA mark carries it,
// and the page around the stage names the school. The portal shows channel
// names and counts only: no student, lead or staff name, and no figure read
// from the school's MarCommand portal. Every number is invented.
import type { InventedSet } from "../_invented";

export const invented: InventedSet = {
  scope: "hays-academy",
  people: [],
  businesses: [],
  towns: [],
  domains: [],
  // The MarCommand client portal's own labels (marcommand-marketing-engine
  // packages/portal-ui, rendered on its harness sample 2026-10-31).
  vocabulary: [
    "Overview", "Activity", "AI", "Reached", "Visited", "Interested", "Leads", "Validated",
    "Ads", "Social", "Search", "Direct", "Media", "Other", "Sites", "Email", "Days",
    "Spend", "Agency", "View", "Client", "Lead", "Desk", "Paid", "Organic", "Preisser", "Runs",
    "Listing", "Care", "Upkeep", "Follow-up", "Last", "Portal",
    // The funnel and AI beats (round 5): the portal's AI tab and answer labels
    // (portal-ui ai/copy.ts, chat/copy.ts KIND_WORDS) and the sample question.
    "Ad", "Maps", "Ask", "Are", "Answer", "Pulled", "Compared", "Concluded", "Sources", "Cost", "Per",
  ],
  approved: [
    { name: "Google", source: "a channel named in the Hays card copy, src/components/home/case-studies.tsx" },
    { name: "Meta", source: "a channel named in the Hays card copy, src/components/home/case-studies.tsx" },
    { name: "MarCommand", source: "Preisser Solutions' own product (src/app/products/marcommand-engine)" },
  ],
  assets: [
    {
      path: "/images/demos/hays-academy-monogram.svg",
      provenance: "marcommand-marketing-engine portal/clients/hays-academy/assets/ha-monogram.svg (the school's own HA mark)",
    },
  ],
};
