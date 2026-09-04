import type { CaseStudyData } from "@/types/case-study";

// Canonical project #10 — After-Hours Call Triage System.
// Capability offering. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "after-hours-call-triage",
  metaTitle: "After-Hours Call Triage System",
  metaDescription:
    "Agentic automation that catches every after-hours call, text, and form submission so service-business leads stop bleeding to competitors overnight.",
  datePublished: "2026-03-12",
  dateModified: "2026-05-20",

  category: "Capability • AI Automation",
  clientName: "After-Hours Call Triage",
  clientNameDisplay: "Capability",
  industry: "After-hours lead capture and intelligent routing",

  h1: "After-Hours Call Triage: Every Lead Caught, Classified, and Routed",
  subheadline:
    "An agentic automation that receives every after-hours call, text, and contact form, classifies urgency, auto-responds via SMS, and routes only the urgent items to on-call staff.",
  oneLine: "Every after-hours lead caught, classified, and routed automatically",

  headlineResults: [
    { value: "24/7", label: "Inbound lead capture coverage" },
    { value: "SMS", label: "Auto-response to every contact" },
    { value: "AI", label: "Urgency classification per call" },
    { value: "1", label: "Morning digest for queued items" },
  ],

  before: {
    heading: "Leads going to voicemail at 7 p.m. were leads going to a competitor.",
    body: [
      "Service businesses lose money every night. A homeowner with a broken furnace, a leaking pipe, or a smoking electrical panel does not wait until business hours; they call the next number on the list. Every missed call, unread text, and unanswered contact form is a lead bleeding to whichever competitor picks up first.",
      "Hiring a 24/7 answering service is expensive, inconsistent, and pulls human attention away from the next business day. What was needed was an agentic system that catches every inbound, decides what is urgent, and only escalates the calls that actually need a human in the middle of the night.",
    ],
  },

  built: {
    heading: "An agent that triages every call, text, and form the moment it arrives.",
    body: [
      "Preisser Solutions builds an AI triage layer that sits in front of every after-hours channel: phone, SMS, and web contact form. The system receives the inbound, runs an AI urgency classification, and immediately auto-responds to the customer via SMS so they know they have been received and what happens next.",
      "Every interaction is logged to the database. Urgent issues (burst pipes, no-heat calls, electrical hazards, anything matching the business's escalation rules): route straight to on-call personnel. Non-urgent items queue for a morning digest so the team starts the day with a clean, prioritized list instead of forty voicemails.",
    ],
  },

  specifications: {
    heading: "How the triage system runs.",
    bullets: [
      "Twilio / VoIP integration for inbound calls and SMS",
      "AI urgency classification engine tuned to the business's escalation rules",
      "Automated SMS auto-response to every inbound contact",
      "CRM and database logging of every interaction",
      "Urgency-based routing rules: urgent to on-call, rest to morning queue",
      "Morning digest delivered to the team for non-urgent items",
    ],
    subsections: [
      {
        title: "Inbound channels covered",
        items: [
          "Phone calls (VoIP or PBX bridge)",
          "Inbound SMS",
          "Web contact form submissions",
          "Email-to-text bridges where applicable",
        ],
      },
      {
        title: "Routing logic",
        items: [
          "AI classifies urgency from transcript, message body, or form fields",
          "Configurable escalation rules per business",
          "On-call routing via SMS or phone bridge",
          "Non-urgent items collected into a single morning digest",
        ],
      },
    ],
  },

  results: [
    {
      value: "24/7",
      label: "Capture of every inbound lead",
      context:
        "Every after-hours call, text, and contact form is captured and acknowledged: nothing goes to silent voicemail.",
    },
    {
      value: "SMS",
      label: "Auto-response within seconds",
      context:
        "Customers receive an immediate SMS auto-response so they know they have been heard, what happens next, and when to expect contact.",
    },
    {
      value: "AI-triaged",
      label: "Urgency classification on every interaction",
      context:
        "The AI urgency classifier evaluates each inbound against the business's escalation rules and routes accordingly.",
    },
    {
      value: "Single digest",
      label: "Morning queue for non-urgent items",
      context:
        "Non-urgent items are batched into one prioritized morning digest instead of scattering across forty inboxes and voicemails.",
    },
  ],

  techStack: [
    "Twilio",
    "VoIP integration",
    "AI urgency classifier",
    "SMS gateway",
    "CRM integration",
    "Database logging",
    "Routing rules engine",
  ],

  relatedSlugs: [
    "ai-document-analysis",
    "contact-form-crm-pipeline",
    "ai-email-digest",
  ],

  cta: {
    heading: "Want an after-hours triage system catching every lead overnight?",
    subcopy:
      "Preisser Solutions can scope an after-hours triage automation for your business. Free 30-minute scoping call to map your operations.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
