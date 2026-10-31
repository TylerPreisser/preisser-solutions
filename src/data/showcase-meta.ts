// src/data/showcase-meta.ts — the little the HOME page needs about each product
// showcase (ADR-0020): which cards have one, what the command center is called,
// and which capture to warm on intent. Kept apart from src/data/showcase.ts so
// the narration only ships with the showcase chunk and the /showcase pages.
export type ShowcaseSlug = "duffer-golf" | "hays-academy";

export const showcaseMeta: Record<ShowcaseSlug, { commandName: string; desk: string; phone: string }> = {
  "duffer-golf": {
    commandName: "Command Center",
    desk: "/images/showcase/duffer-golf-site-desk-add02c14.webp",
    phone: "/images/showcase/duffer-golf-site-phone-36169768.webp",
  },
  "hays-academy": {
    commandName: "MarCommand portal",
    desk: "/images/showcase/hays-academy-site-desk-f9e42c3a.webp",
    phone: "/images/showcase/hays-academy-site-phone-c861a6b1.webp",
  },
};
