/**
 * Shared building blocks for /locations/* pages.
 *
 * Keeps every location file lean — the four core service cards and the
 * five-step engagement process are identical across markets. Per-location
 * pages override individual cards only when a market truly needs a tilt.
 */

import type {
  LocationProcessStep,
  LocationServiceCard,
} from "@/types/location";

export const STANDARD_SERVICE_CARDS: LocationServiceCard[] = [
  {
    icon: "dashboard",
    title: "Custom Web Applications",
    bullets: [
      "Internal tools, dashboards, and custom CRMs purpose-built for your operations",
      "Full code ownership; deploy to your infrastructure",
      "Modern stack — Next.js, React, TypeScript",
    ],
    href: "/services",
  },
  {
    icon: "automation",
    title: "AI Automation",
    bullets: [
      "Document processing, workflow automation, AI agents",
      "Eliminate hours of manual back-office work each week",
      "Trained on your data, your workflows, your vendors",
    ],
    href: "/services",
  },
  {
    icon: "website",
    title: "Custom Websites",
    bullets: [
      "Marketing sites engineered for performance and conversion",
      "Built for AI search visibility, not just Google",
      "No templates — bespoke design from scratch",
    ],
    href: "/services",
  },
  {
    icon: "seo",
    title: "Local SEO & AI Search",
    bullets: [
      "Get found on Google and on ChatGPT, Perplexity, and Gemini",
      "Schema, content architecture, and local visibility done right",
      "Track citations across the answer-engine ecosystem",
    ],
    href: "/services",
  },
];

export const STANDARD_PROCESS: LocationProcessStep[] = [
  {
    title: "Scoping call",
    description:
      "A free conversation to map your operations and identify the highest-leverage opportunities.",
  },
  {
    title: "Fixed-price proposal",
    description:
      "A written proposal with scope, timeline, milestones, and a single fixed price. No open-ended retainers.",
  },
  {
    title: "Build sprints",
    description:
      "Weekly working previews. You see real progress every Friday and can redirect at any milestone.",
  },
  {
    title: "Launch",
    description:
      "Full code ownership transferred. Your repo, your infrastructure, no vendor lock-in.",
  },
  {
    title: "Support",
    description:
      "Thirty days of post-launch support included. Ongoing retainers available for teams that want them.",
  },
];

// ── Optional shared case-study card refs ──────────────────────
// Only used by locations with a genuine geographic tie.

export const HG_OIL_INVENTORY_CARD = {
  slug: "hg-oil-inventory-system",
  clientDisplay: "HG Oil Holdings",
  headlineNumber: "95% reduction",
  oneLine:
    "Centralized inventory platform turned a loss-generating operation into a profit center.",
  category: "Custom Application",
};

export const HG_OIL_INVOICE_CARD = {
  slug: "hg-oil-ai-invoice-processing",
  clientDisplay: "HG Oil Holdings",
  headlineNumber: "75% less",
  oneLine:
    "AI invoice processor cut manual handling and prevented additional admin hires.",
  category: "AI Document Processing",
};

export const IRON_AND_OAK_CARD = {
  slug: "iron-and-oak-podcast",
  clientDisplay: "The Iron and Oak Podcast",
  headlineNumber: "134 pages",
  oneLine:
    "Full cinematic media brand built from concept to launch — design system, site, and distribution.",
  category: "Website Build",
};
