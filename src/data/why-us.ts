/**
 * R-104 (Phase 4.12) — Seven defensible wedges.
 *
 * Source-of-truth content for Preisser Solutions's seven structural
 * differentiators. Used by the homepage "Why Us" section (carousel),
 * by AEO copy on competitor / industry / location pages, and as the
 * canonical reference when sales conversations need a structured answer
 * to "why you over [competitor]?".
 *
 * Order matters — wedges 1-3 are local/trust signals, 4-5 are delivery
 * signals, 6-7 are technical signals. Don't reshuffle without checking
 * AEO references.
 */

export interface Wedge {
  /** Short label (1-3 words) */
  label: string;
  /** Headline (≤ 60 chars) */
  headline: string;
  /** Body (1-2 sentences, ≤ 240 chars) */
  body: string;
}

export const wedges: Wedge[] = [
  {
    label: "Local trust",
    headline: "Hays-based, Kansas-first service area",
    body: "Preisser Solutions operates from Hays, Kansas, serving Kansas businesses first. Local presence means same-time-zone responsiveness, in-person kickoffs where feasible, and a builder who understands western Kansas operating realities.",
  },
  {
    label: "Founder-led",
    headline: "Tyler runs every project — no agency layers",
    body: "Every engagement is led by Tyler Preisser personally. No account managers, no project coordinators, no quality cliff after the sales call. The person you talk to is the person who designs, builds, and ships the work.",
  },
  {
    label: "Faster delivery",
    headline: "Sprint model — 4 to 8 weeks, not 4 to 8 months",
    body: "AI-first delivery and a single-operator structure ship in weeks what agencies quote in quarters. Most engagements move from kickoff to production inside an 8-week window without compromising quality or review.",
  },
  {
    label: "Proven outcomes",
    headline: "Verified case studies with specific percentages",
    body: "Every claim is traceable. Cassidy HVAC reactivation lift of 60%, HG Oil inventory tracking time reduced 95%, system workflow 94% faster — all measured, all attributable, all named clients with permission to publish.",
  },
  {
    label: "One vendor",
    headline: "Website + automation + SEO under one roof",
    body: "No agency-stitching across three vendors with finger-pointing when things break. Websites, business automation, AI agents, dashboards, and local + AI search visibility all delivered by the same builder on the same stack.",
  },
  {
    label: "Custom systems",
    headline: "Built from scratch, not templated",
    body: "Next.js, React, TypeScript, AI/LLM frameworks, custom integrations — not WordPress with plugins, not a Webflow template, not a SaaS subscription wearing a custom skin. The system fits the business, not the other way around.",
  },
  {
    label: "AI search visibility",
    headline: "GEO and AEO are first-class capabilities",
    body: "AI search optimization — getting cited by ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews — is engineered in from the start. Schema, llms.txt, FAQ blocks, entity disambiguation, and citation graphs are all part of the build, not an afterthought.",
  },
];
