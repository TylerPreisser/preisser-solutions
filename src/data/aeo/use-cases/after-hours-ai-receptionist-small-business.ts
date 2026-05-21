import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/after-hours-ai-receptionist-small-business
 *
 * Canonical backing: #10 (After-Hours Call Triage System — built, service offering).
 * Reframed 2026-05-20: removed fake client outcomes, pricing, and Tyler name-drops.
 * Pure capability language — "Preisser Solutions can build this."
 */
export const pageData: AeoPageData = {
  slug: "use-cases/after-hours-ai-receptionist-small-business",
  tier: "service_detail",
  metaTitle: "After-Hours AI Call Triage for Small Businesses",
  metaDescription:
    "Preisser Solutions builds after-hours call triage systems that catch every inquiry, assess urgency, route critical calls, and log everything to your CRM by morning.",
  eyebrow: "After-Hours AI Call Triage",
  h1: "After-Hours AI Call Triage for Small Businesses",
  subheadline:
    "Leads that call after hours and reach voicemail often call a competitor next. An AI call triage system catches those leads, assesses urgency, routes what matters, and logs everything so no opportunity goes to waste.",
  answerParagraph:
    "Preisser Solutions builds custom after-hours AI call triage systems for small businesses. The system receives every after-hours call, text, or contact form submission; assesses urgency using rules you define; auto-responds to the caller via SMS; logs the interaction to your CRM or job management platform; and routes urgent issues to an on-call person immediately while queuing non-urgent items for first thing the next morning. Every workflow is built with full disclosure — callers are told they are speaking with an AI — and every call is logged for your team to review.",
  sections: [
    {
      eyebrow: "What happens to after-hours calls today",
      heading: "Most after-hours calls go to voicemail and are never returned",
      body: [
        "Service businesses receive a meaningful portion of their inbound calls outside business hours — evenings, weekends, and early mornings. The majority of those callers do not leave a voicemail. When the call does not connect, the next action is usually to call the next business on the list.",
        "The problem is not just missed revenue. It is the invisibility of the problem. There is no record of a caller who hung up. There is no dashboard showing how many leads were lost between 5pm and 8am. The loss is silent, and because it is silent, it rarely gets fixed.",
        "An AI call triage system makes the invisible visible. Every call that comes in after hours connects to a system that responds, qualifies, and logs — so the morning starts with a clear picture of what came in overnight and what needs follow-up.",
      ],
    },
    {
      eyebrow: "What the system does",
      heading: "What a Preisser Solutions after-hours call triage system does",
      body: [
        "The system is built around a small set of high-value functions. Each is configurable to match how the business actually works.",
      ],
      bullets: [
        "Receives inbound calls, texts, and contact form submissions after hours",
        "Discloses that the caller is speaking with an AI assistant — clearly, at the start of every interaction",
        "Collects caller name, callback number, reason for contact, and urgency level",
        "Answers common questions about hours, location, services, and what to expect",
        "Applies the urgency rules defined in setup — distinguishing true emergencies from routine next-day items",
        "Routes urgent contacts to the on-call person immediately via text, call, or both",
        "Queues non-urgent contacts for review at the start of the next business day",
        "Logs every interaction — caller info, transcript, urgency disposition, action taken — to the CRM or job management platform",
      ],
    },
    {
      eyebrow: "Urgency routing",
      heading: "How urgency routing works",
      body: [
        "The urgency classification rules are defined during scoping and are specific to the business. Common patterns.",
      ],
      bullets: [
        "Urgent categories — examples: no heat in winter, water leak, lockout, emergency repair, safety issue",
        "Urgent routing action — immediate text to on-call line, or warm transfer to the on-call person, depending on preference",
        "Non-urgent categories — service requests, quote inquiries, billing questions, scheduling",
        "Non-urgent routing action — full log delivered to the team by a set time each morning",
        "Unknown or ambiguous — anything the system is not confident about escalates rather than mishandling",
        "Rules are editable — the urgency categories and routing actions can be updated without a new build",
      ],
    },
    {
      eyebrow: "CRM and job platform integration",
      heading: "Integration with CRM and job management platforms",
      body: [
        "Every interaction the system handles produces a structured record that goes into the business's existing tools. No separate inbox to monitor.",
      ],
      bullets: [
        "Caller name, phone number, and best callback window",
        "Service requested, urgency level, and any details captured during the interaction",
        "Address or service location, when provided",
        "Disposition — urgent (already routed), qualified lead, FAQ answered, non-urgent queued",
        "Full call transcript or conversation log, with audio link where applicable",
        "Direct creation of a lead, ticket, or task in HubSpot, Salesforce, ServiceTitan, Housecall Pro, Jobber, or a custom CRM",
      ],
    },
    {
      eyebrow: "What we build and how",
      heading: "What gets built and how the process works",
      body: [
        "Preisser Solutions builds after-hours call triage as a fixed-scope project. The process is structured so nothing surprises the business or the customers.",
      ],
      bullets: [
        "Scoping — review of call volume, current after-hours handling, urgency rules, and CRM destination",
        "Script and logic build — call flow, disclosure language, qualification questions, urgency classification, and routing rules written and reviewed",
        "Integration — CRM or job platform connected, test records verified before go-live",
        "Test calls — the team runs test calls against the system and approves before anything goes live",
        "Limited rollout — turned on for a defined window with full transcripts reviewed each morning during the first phase",
        "Handoff — source code, documentation, and admin access delivered to the business",
      ],
    },
  ],
  faq: [
    {
      question: "Will callers know they are talking to AI?",
      answer:
        "Yes. The system discloses that it is an AI assistant at the start of every call or conversation. Preisser Solutions does not build systems that impersonate a person — disclosure is both the ethical standard and the practical one.",
    },
    {
      question: "Can the system transfer an urgent call to a real person?",
      answer:
        "Yes. For calls classified as urgent, the system can warm-transfer to an on-call line, send an immediate text, or both. The rules for what counts as urgent are defined during scoping and can be changed at any time.",
    },
    {
      question: "What happens if the system cannot understand a caller?",
      answer:
        "The system has fallback paths. If it cannot understand or is not confident about a classification, it asks the caller to repeat, offers a callback option, or routes to the on-call person depending on setup. It does not make a judgment call when it should not.",
    },
    {
      question: "Does it work with the existing business phone number?",
      answer:
        "Yes. The system operates on call routing, so the existing business number stays the same. After-hours calls are forwarded to the triage workflow, and urgent ones are passed through to the on-call line.",
    },
    {
      question: "Can it answer business-specific questions?",
      answer:
        "Yes, within the approved scope. The system can answer questions about hours, location, services offered, and pricing ranges. For anything outside those boundaries — specific quotes, complex job estimates, edge cases — it tells the caller a team member will follow up and captures the question.",
    },
    {
      question: "What platforms does this integrate with?",
      answer:
        "HubSpot, Salesforce, ServiceTitan, Housecall Pro, Jobber, and most field service and CRM platforms. Custom integrations are available for businesses using proprietary or less-common tools.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Hays, Kansas",
    "HubSpot",
    "Salesforce",
    "ServiceTitan",
    "Housecall Pro",
    "Jobber",
  ],
  relatedLinks: [
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "AI customer service systems", href: "/services/ai-customer-service" },
    { label: "Automate customer follow-up", href: "/use-cases/automate-customer-follow-up" },
    { label: "AI customer reactivation campaigns", href: "/products/customer-reactivation-agent" },
    { label: "Cassidy HVAC case study", href: "/case-studies/cassidy-hvac" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Stop losing leads after 5pm",
  ctaSubcopy:
    "Schedule a scoping call with Preisser Solutions. We will review your current after-hours call flow and send a fixed-scope proposal for a triage system built around how your business actually runs.",
};
