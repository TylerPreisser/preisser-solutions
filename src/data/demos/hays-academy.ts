// src/data/demos/hays-academy.ts — the hair school's MarCommand portal, on invented data.
// ADR-0016 §5 / ADR-0020: every count below is invented; stage totals are DERIVED
// from the channel rows, never typed. No figure here was read from the school's
// portal, its engine, or any captured payload.

export interface HaysChannel {
  key: string;
  label: string;
  /** "Paid" draws the pink ribbon the real portal uses for paid channels. */
  paid: boolean;
  visited: number;
  leads: number;
  icon: "ads" | "social-ads" | "search" | "direct" | "social" | "sites" | "email";
}

export const haysChannels: readonly HaysChannel[] = [
  { key: "google-ads", label: "Google Ads", paid: true, visited: 640, leads: 11, icon: "ads" },
  { key: "social-ads", label: "Social ads", paid: true, visited: 820, leads: 14, icon: "social-ads" },
  { key: "google-search", label: "Google search", paid: false, visited: 360, leads: 7, icon: "search" },
  { key: "direct", label: "Direct", paid: false, visited: 210, leads: 4, icon: "direct" },
  { key: "social", label: "Social media", paid: false, visited: 120, leads: 2, icon: "social" },
  { key: "sites", label: "Other sites", paid: false, visited: 26, leads: 0, icon: "sites" },
  { key: "email", label: "Email", paid: false, visited: 4, leads: 0, icon: "email" },
];

const total = (pick: (c: HaysChannel) => number) => haysChannels.reduce((a, c) => a + pick(c), 0);

/** Reached is ad and search impressions; invented as a multiple of visits. */
const REACH_PER_VISIT = 5.7;
/** Of every ten leads, how many a person at the school confirmed. Invented. */
const VALIDATED_SHARE = 0.82;
/** Visitors who opened a program page, the price or the start dates. Invented share. */
const INTERESTED_SHARE = 0.098;

const visited = total((c) => c.visited);
const leads = total((c) => c.leads);

export const haysStages = [
  { key: "reached", label: "Reached", value: Math.round(visited * REACH_PER_VISIT / 10) * 10 },
  { key: "visited", label: "Visited", value: visited },
  { key: "interested", label: "Interested", value: Math.round(visited * INTERESTED_SHARE) },
  { key: "leads", label: "Leads", value: leads },
  { key: "validated", label: "Validated", value: Math.round(leads * VALIDATED_SHARE) },
] as const;

export const haysWindow = "Last 30 days";
