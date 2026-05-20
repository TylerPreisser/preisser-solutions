import type { CaseStudyData } from "@/types/case-study";

// Canonical project #2 — Cassidy HVAC AI Marketing Engine.
// Named client with consent. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "cassidy-hvac-marketing-engine",
  metaTitle: "Cassidy HVAC — 5x Organic Reach in 30 Days",
  metaDescription:
    "Cassidy HVAC replaced an underperforming agency with an autonomous AI content engine — 5x organic reach in 30 days, fully hands-off operation.",
  datePublished: "2024-11-04",
  dateModified: "2026-05-20",

  category: "Marketing Automation • Content Production",
  clientName: "Cassidy HVAC",
  clientNameDisplay: "Cassidy HVAC",
  industry: "HVAC services",

  h1: "Cassidy HVAC — 5x Organic Reach in 30 Days",
  subheadline:
    "Replaced an underperforming outsourced agency with a proprietary AI content engine that scrapes trends, generates marketing visuals, and publishes daily without staff input.",
  oneLine: "5x organic reach in 30 days, outside agency replaced",

  headlineResults: [
    { value: "5x", label: "Organic reach in 30 days" },
    { value: "0 hrs", label: "Staff time per week" },
    { value: "33%", label: "Email open rate" },
    { value: "1", label: "Marketing agency retired" },
  ],

  before: {
    heading: "Paying an agency, getting generic content, watching the numbers stay flat.",
    body: [
      "Cassidy HVAC was paying an outside marketing agency to handle their social presence. Content was being produced and posted, but it was generic, untargeted, and showed no measurable lift in reach or inbound activity.",
      "The agency invoice kept arriving every month. Reach, engagement, and lead flow stayed flat. The relationship was expensive and unproductive — but pulling content back in-house meant adding marketing headcount nobody had time to manage.",
    ],
  },

  built: {
    heading: "A proprietary AI engine that runs the entire content pipeline.",
    body: [
      "Preisser Solutions built a proprietary AI-powered social media engine for Cassidy HVAC. The system scrapes trending content from across the HVAC market, generates custom marketing visuals using persuasion-psychology principles (scarcity, social proof, authority, urgency framing), and publishes to Facebook and Instagram daily.",
      "It runs fully hands-off. Office staff can opt into an email approval workflow if they want a gate before content goes live — or let the engine post autonomously. Either way, the agency retainer was retired and content quality went up.",
    ],
  },

  specifications: {
    heading: "What the engine does end-to-end.",
    bullets: [
      "AI trend-scraping module pulls relevant HVAC and seasonal content patterns daily",
      "AI visual and copy generation tuned on persuasion-psychology principles",
      "Automated daily publishing to Facebook and Instagram on optimal schedules",
      "Optional owner email approval gate (one-click approve, or full autonomy)",
      "Zero staff time post-deployment — no captions, no image sourcing, no scheduling",
      "Engagement tracking feeds back into next-day content selection",
    ],
    subsections: [
      {
        title: "Persuasion-psychology variables",
        items: [
          "Scarcity framing on seasonal service windows",
          "Social proof patterns drawn from local engagement signals",
          "Authority cues from technical and certification context",
          "Urgency framing keyed to weather, equipment age, and timing",
        ],
      },
      {
        title: "What it replaced",
        items: [
          "External marketing agency retainer — eliminated",
          "Manual content briefing and approval cycles — eliminated",
          "In-house marketing hire that would otherwise have been required",
          "Inconsistent posting cadence — replaced with daily autonomous output",
        ],
      },
    ],
  },

  results: [
    {
      value: "5x",
      label: "Organic reach increase in 30 days",
      context:
        "Organic social reach across Facebook and Instagram grew 5x within the first month of the engine going live.",
    },
    {
      value: "0",
      label: "Staff time required per week",
      context:
        "Office staff time on social content dropped to zero. The engine handles everything from trend selection to publishing.",
    },
    {
      value: "1",
      label: "Outside marketing agency retired",
      context:
        "The external marketing agency relationship was retired entirely — the engine replaced their function at higher quality.",
    },
    {
      value: "33%",
      label: "Email open rate on adjacent campaigns",
      context:
        "Companion email campaigns produced by the engine achieved a 33% open rate — well above HVAC industry averages.",
    },
  ],

  techStack: [
    "AI trend scraper",
    "AI visual generation",
    "AI copywriting (persuasion-psychology tuned)",
    "Facebook Graph API",
    "Instagram Graph API",
    "Email approval workflow",
  ],

  relatedSlugs: [
    "cassidy-hvac-reactivation",
    "iron-and-oak-podcast",
    "wife-supply-co",
  ],

  cta: {
    heading: "Replace your marketing agency with a system that actually moves the needle.",
    subcopy:
      "Preisser Solutions builds proprietary AI content engines that run daily without staff input. Scoping starts with a conversation about your channels and your audience.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
