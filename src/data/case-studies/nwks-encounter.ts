import type { CaseStudyData } from "@/types/case-study";

// NWKS Encounter — Business Automation + Business Software platform.
// Ministry operations backend running registration, an admin roster/CRM,
// automated email campaigns, and testimony intake for two annual retreat
// events, on Cloudflare Pages + Workers with D1. Numbers sourced from
// docs/plans/2026-08-02-three-pillar-reposition.md §9. Email provider is
// Resend; production email is explicitly disabled right now; only the
// .pages.dev URL is a confirmed live domain.
export const caseStudy: CaseStudyData = {
  slug: "nwks-encounter",
  metaTitle: "NWKS Encounter — Registration, Roster, and Campaign CRM",
  metaDescription:
    "A registration-to-roster CRM for two annual retreat ministries, with a dedicated cron worker built to drain email campaigns without blowing a request's CPU budget.",
  datePublished: "2026-07-20",
  dateModified: "2026-08-02",

  category: "Business Automation • Business Software",
  clientName: "NWKS Encounter",
  clientNameDisplay: "NWKS Encounter",
  industry: "Ministry event registration and CRM",

  h1: "NWKS Encounter — Registration, Dedup, Roster, and a Campaign Engine Built to Survive Its Own Load",
  subheadline:
    "A public registration form dedups against the existing person record, builds the roster automatically, and hands campaign sends to a dedicated worker instead of a request that could time out.",
  oneLine: "Registration dedups into a roster; a dedicated worker drains campaigns in bounded chunks",

  headlineResults: [
    { value: "Self-running", label: "Registration, confirmation, and roster" },
    { value: "1 record", label: "Repeat sign-ups matched to the person already on file" },
    { value: "2 ministries", label: "Kept separate on one codebase" },
    { value: "Passkey 2FA", label: "On the admin surface, with a recovery ladder" },
  ],

  hub: {
    problem:
      "Two annual retreat ministries ran sign-ups, follow-up and rosters out of forms, spreadsheets and an inbox, with no shared record of who had registered for which event or in which role.",
    built:
      "A public registration form that matches each sign-up against the person already on file, writes the roster entry on the spot, queues the confirmation, and hands scheduled sends to a dedicated worker so a large campaign cannot stall a request.",
    outcome: "Registration, confirmation and roster run themselves",
  },

  before: {
    heading: "Two annual retreats' worth of registration, follow-up, and roster work with no shared system.",
    body: [
      "Two annual retreat ministries needed registration, confirmation, and a working roster of who signed up for what — attendee or server, which event, which year — plus a way to reach people afterward and take in testimonies. That is dedup work, CRM work, and campaign-send work, and none of it holds together as a spreadsheet and an inbox once a form actually gets used.",
      "Because it's two genuinely separate ministries, the system also had to keep their people, registrations, and communications apart from each other on every table, without running two separate codebases.",
    ],
  },

  built: {
    heading: "A registration flow that dedups into one person record, and a campaign engine that respects its own CPU budget.",
    body: [
      "A public, bot-protected registration form matches against existing people — exact email first, then fuzzy last-name plus phone or city — before deciding whether to create a new person or update an existing one. It then writes a registration for that event and role, queues a confirmation, and the person appears on the admin roster immediately.",
      "The admin surface covers the rest of the operational work: a dashboard, attendee and server rosters, a standing-interest list, per-person history with duplicate merging, events, an email center with campaigns, segments, and templates, a testimonies board, a forms editor, and team roles, sitting behind passkey/WebAuthn 2FA with a recovery ladder.",
      "The email center is where the architecture had to change shape. A synchronous send to 2,402 recipients took 67 seconds — long enough to blow the platform's per-request CPU budget. The fix was a dedicated, always-on cron worker that drains scheduled campaigns in bounded chunks instead of trying to send a whole campaign inside one request. That's a load characteristic that drove the design, not a marketing campaign that went out to real subscribers — production email sending is explicitly disabled right now. A separate inbound worker parses raw MIME for replies, and two ministries share the codebase with every table partitioned per program.",
    ],
  },

  specifications: {
    heading: "How a registration becomes a roster entry, and how campaigns actually send.",
    bullets: [
      "Public registration form, bot-protected",
      "Dedup: exact email match first, then fuzzy last-name plus phone/city",
      "Creates or updates the person, then writes a registration for event and role",
      "Confirmation queued; entry appears on the admin roster",
      "Dashboard, attendee/server rosters, standing-interest list, per-person history with merging",
      "Events, email center (campaigns, segments, templates), testimonies board, forms editor, team roles",
      "Dedicated always-on cron worker drains scheduled campaigns in bounded chunks",
      "Separate inbound email worker parses raw MIME",
      "Passkey/WebAuthn 2FA with a recovery ladder",
      "Two ministries, one codebase, partitioned per program on every table",
    ],
    subsections: [
      {
        title: "Registration and CRM",
        items: [
          "Exact-email dedup, then fuzzy last-name + phone/city match",
          "Create-or-update person, then event + role registration",
          "Confirmation queue, admin roster, duplicate merging",
          "Standing-interest list and per-person history",
        ],
      },
      {
        title: "Campaign infrastructure",
        items: [
          "Dedicated cron worker drains scheduled sends in bounded chunks",
          "Built after a synchronous 2,402-recipient send took 67 seconds",
          "Separate inbound worker parses raw MIME for replies",
          "Email provider: Resend",
        ],
      },
    ],
  },

  results: [
    {
      value: "756",
      label: "API tests",
      context:
        "756 API tests cover registration, dedup, roster, and CRM behavior, with a separate admin test suite.",
    },
    {
      value: "2,402 / 67s",
      label: "The load figure that drove the campaign architecture",
      context:
        "A synchronous send to 2,402 recipients took 67 seconds, which is what made a dedicated cron worker necessary instead of sending inside a single request.",
    },
    {
      value: "2 ministries",
      label: "Partitioned per program",
      context:
        "Two separate retreat ministries run on one codebase, with people, registrations, and communications kept apart on every table.",
    },
    {
      value: "Passkey + recovery ladder",
      label: "2FA on the admin surface",
      context:
        "WebAuthn/passkey authentication protects the admin CRM, with a recovery ladder for lost devices.",
    },
  ],

  techStack: [
    "Cloudflare Pages",
    "Cloudflare Workers",
    "Cloudflare D1",
    "Dedicated cron worker",
    "Inbound email worker (raw MIME)",
    "Resend",
    "WebAuthn / passkeys",
  ],

  relatedSlugs: ["farmbooks", "c3-studio", "contact-form-crm-pipeline"],

  cta: {
    heading: "Running event registration through a form and a spreadsheet?",
    subcopy:
      "Preisser Solutions builds registration, dedup, and CRM systems that hold up past the first big send. Scoping begins with a conversation about your events and your list.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },

  statusNote:
    "Production email sending is currently disabled (EMAIL_ENABLED is off); the platform is live at its .pages.dev URL, and a custom domain is not yet confirmed live. Email is sent through Resend.",
};
