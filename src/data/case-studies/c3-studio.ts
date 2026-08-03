import type { CaseStudyData } from "@/types/case-study";

// C3 Studio — Business Software + Business Automation platform.
// One admin backend that runs a church's website, native iOS app, and
// day-to-day operations from a single login. Next.js 15 / React 19 on
// Cloudflare Workers via OpenNext, D1 for content, Supabase Postgres for
// operational data. Numbers sourced from
// docs/plans/2026-08-02-three-pillar-reposition.md §9. The AI copy assist is
// always described as labeled, opt-in, and mock-by-default — never as "live AI".
export const caseStudy: CaseStudyData = {
  slug: "c3-studio",
  metaTitle: "C3 Studio — One Login, Website, App, and Operations",
  metaDescription:
    "One admin backend runs a church's website, native iOS app, and day-to-day operations from a single login — 18 content block types, one API contract.",
  datePublished: "2026-07-20",
  dateModified: "2026-08-02",

  category: "Business Software • Business Automation",
  clientName: "C3 Studio",
  clientNameDisplay: "C3 Studio",
  industry: "Church operations and content management",

  h1: "C3 Studio — One Admin Login for the Website, the App, and Operations",
  subheadline:
    "A visual page builder over 18 typed content blocks that a Next.js website and a native SwiftUI app render identically from a single API contract, plus the operations built on top of it.",
  oneLine: "One login runs the website, the native app, and day-to-day church operations",

  headlineResults: [
    { value: "18", label: "Typed content block types" },
    { value: "1 API contract", label: "Website and native iOS app render it identically" },
    { value: "1 click", label: "Draft to Publish flips both live at once" },
    { value: "~170", label: "Test files" },
  ],

  before: {
    heading: "Website copy locked in code, and a native app with its own disconnected content path.",
    body: [
      "The website's copy was hardcoded in TypeScript, so every content change — a new sermon series, an updated service time, a staff bio — needed a developer and a redeploy. The native iOS app ran on a completely separate content path with no connection to the website at all, so the same update had to happen twice, in two different ways, by two different people.",
      "There was no single place for non-technical staff to run either surface, let alone the scheduling, communications, and operational work that sits behind a church's public presence.",
    ],
  },

  built: {
    heading: "A visual builder over 18 block types, one API contract, two surfaces rendering it identically.",
    body: [
      "C3 Studio is a visual page and section builder over 18 typed content block types. Staff build a page from those blocks without touching code, and the website and the native SwiftUI app both render the result identically, from the same API contract — there is no second content path to keep in sync. Draft and Publish are separate states; publishing flips both the website and the app live at the same moment.",
      "From that content foundation, C3 Studio has grown into the operations layer underneath it: scheduling, communications, care tracking, giving, kids check-in, life groups, a live-service companion, and a sermon funnel, all reachable from the same login non-technical staff already use for content.",
      "Authentication is real, not a demo shortcut — PBKDF2-SHA256 at 210,000 iterations on the same login route a staff member uses, with no test bypass. An optional AI copy assist is available for drafting content: it is clearly labeled, opt-in, and mock-by-default, and every draft it produces still needs a human to review and approve before it goes anywhere.",
    ],
  },

  specifications: {
    heading: "What runs through the same login.",
    bullets: [
      "Visual page/section builder over 18 typed content block types",
      "Website and native SwiftUI app render the same blocks identically from one API contract",
      "Draft → Publish flips the website and the app live simultaneously",
      "Scheduling, communications, care tracking, and giving",
      "Kids check-in, life groups, a live-service companion, and a sermon funnel",
      "Real PBKDF2-SHA256 authentication at 210,000 iterations, no test bypass",
      "Optional AI copy assist — labeled, opt-in, mock-by-default, always drafts for human approval",
    ],
    subsections: [
      {
        title: "Content platform",
        items: [
          "18 typed content block types shared by web and native rendering",
          "One API contract consumed by both the Next.js site and the SwiftUI app",
          "Draft/Publish state, published simultaneously to both surfaces",
        ],
      },
      {
        title: "Operations built on top",
        items: [
          "Scheduling and communications",
          "Care tracking and giving",
          "Kids check-in and life groups",
          "Live-service companion and sermon funnel",
          "2FA login with no test bypass",
        ],
      },
    ],
  },

  results: [
    {
      value: "18",
      label: "Typed content block types",
      context:
        "A visual builder over 18 block types replaced hardcoded TypeScript copy on the website.",
    },
    {
      value: "1 API contract",
      label: "One source of truth for two surfaces",
      context:
        "The Next.js website and the native SwiftUI iOS app render the same content blocks identically, from the same contract.",
    },
    {
      value: "Simultaneous",
      label: "Draft → Publish flips both live at once",
      context:
        "Publishing a change updates the website and the native app at the same moment — no separate app content path to update.",
    },
    {
      value: "210,000",
      label: "PBKDF2-SHA256 iterations",
      context:
        "Authentication runs the same real login route staff use, with no test bypass.",
    },
  ],

  techStack: [
    "Next.js 15",
    "React 19",
    "App Router",
    "OpenNext",
    "Cloudflare Workers",
    "Cloudflare D1",
    "Supabase Postgres",
    "SwiftUI (native iOS)",
    "PBKDF2-SHA256",
  ],

  relatedSlugs: ["farmbooks", "nwks-encounter", "alpha-matrix"],

  cta: {
    heading: "Running your website copy and your app content on two separate systems?",
    subcopy:
      "Preisser Solutions builds one admin backend that runs the website, the native app, and the operations behind them from a single login. Scoping begins with a conversation about what your team actually needs to manage.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
