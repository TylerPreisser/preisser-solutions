import type { AeoPageData } from "../types";

/**
 * INDUSTRY PAGE — /industries/hvac-ai-receptionist
 *
 * Target query: "AI receptionist for HVAC business" and variants.
 * Sibling to /industries/hvac (broader HVAC service page).
 */
export const pageData: AeoPageData = {
  slug: "industries/hvac-ai-receptionist",
  tier: "industry",
  metaTitle: "AI Receptionist for HVAC Companies",
  metaDescription:
    "Capture after-hours HVAC calls, qualify service requests, route urgent issues, summarize calls, and push leads into your CRM with a custom AI receptionist.",
  eyebrow: "AI Receptionist for HVAC Companies",
  h1: "AI Receptionist for HVAC Companies in Kansas",
  subheadline:
    "Custom AI receptionist that answers after-hours and overflow HVAC calls, qualifies the work, routes emergencies, and pushes the lead straight into ServiceTitan, Housecall Pro, or Jobber.",
  answerParagraph:
    "An AI receptionist for an HVAC business is a custom AI system that answers inbound HVAC calls and texts when the office is closed or staff is on another line — qualifying the service request, routing emergencies (no heat, no AC, no water) to the on-call tech, scheduling everything else, and pushing the lead into the CRM with a clean call summary. Preisser Solutions builds custom AI receptionists for HVAC contractors that integrate with ServiceTitan, Housecall Pro, Jobber, and other field service platforms. The Cassidy HVAC case study is a documented Kansas example of HVAC marketing and reactivation automation delivered by the firm.",
  sections: [
    {
      eyebrow: "Why this matters",
      heading: "HVAC companies lose money when calls go unanswered",
      body: [
        "For an HVAC contractor, every unanswered call is a revenue line walking to a competitor. After-hours emergencies — no heat in February, no AC in July, water leaking out of a coil pan in May — are the calls with the highest dollar value and the lowest tolerance for going to voicemail.",
        "The math gets steep fast. A busy Kansas HVAC company that misses three after-hours calls a week at an average emergency ticket of $400 to $1,200 is leaving $60,000 to $180,000 of annual revenue on the table — before factoring in the maintenance plan signups and follow-on work an emergency call typically produces.",
        "The traditional answer has been a third-party answering service. Most HVAC owners know how those go: a script-reader who does not know the difference between a heat pump and a furnace, who quotes prices wrong, who books emergencies as next-week jobs, and who annoys the customer enough that they hang up and call the next listing in Google.",
        "A custom AI receptionist is the better answer. It works at 2 a.m., it knows the business's actual services and pricing, it routes correctly, and it pushes a clean lead into the CRM with a written summary the on-call tech can read in 15 seconds.",
      ],
    },
    {
      eyebrow: "What it does",
      heading: "What an AI receptionist handles for an HVAC company",
      body: [
        "A Preisser Solutions custom AI receptionist for an HVAC business is scoped per shop, but the core capabilities are consistent. The system handles:",
      ],
      bullets: [
        "Inbound call answering — picks up after hours, on weekends, on holidays, or during business hours when the front desk is overloaded",
        "Inbound text answering — handles SMS leads the same way, with the same qualification logic",
        "Service request qualification — captures customer name, address, equipment type, problem description, and urgency",
        "Emergency triage — identifies no-heat, no-AC, leaking-water, gas-smell, and other true emergencies and escalates to the on-call tech immediately",
        "Scheduling for non-emergencies — books service calls, tune-ups, and estimates into the dispatch calendar based on availability rules the shop defines",
        "Maintenance plan handling — answers basic questions, captures interest, and books the follow-up call with a human",
        "Financing routing — captures financing interest and routes to the right human or financing partner",
        "Spanish-language handling — most Kansas HVAC service areas have a meaningful Spanish-speaking population; the AI can operate bilingually where it makes sense",
        "Call summary and lead push — every call generates a written summary pushed into the CRM with the customer record",
      ],
    },
    {
      eyebrow: "Emergencies still get a human",
      heading: "Emergency routing and human approval",
      body: [
        "The non-negotiable rule for an HVAC AI receptionist is that emergencies always get a human fast. Preisser Solutions builds emergency routing as the first-class concern of every HVAC AI receptionist:",
      ],
      bullets: [
        "Emergency detection — the AI identifies emergency situations by keyword, equipment type, and customer description. False negatives are tracked and the model is tuned weekly during onboarding",
        "On-call routing — emergencies are routed to the on-call tech immediately by phone call, SMS, or page based on the shop's preferences",
        "Escalation — if the on-call tech does not respond within a defined window, the call is escalated to the next person in the rotation",
        "Customer commitment — the customer is told what is happening and given a realistic ETA, not a vague promise",
        "Logging — every emergency call is logged with the full transcript, the AI's reasoning, the routing actions taken, and the response times. The shop can audit any call",
        "Human override — the shop can review or take over any active call in real time",
      ],
    },
    {
      eyebrow: "Integrations",
      heading: "ServiceTitan, Housecall Pro, Jobber, and CRM workflows",
      body: [
        "An AI receptionist is only as useful as the systems it can act on. Preisser Solutions integrates the AI receptionist with whatever field service platform the HVAC shop is already using. There is no requirement to switch platforms:",
      ],
      bullets: [
        "ServiceTitan — pushes leads, books service calls, attaches call summaries to the customer record, and respects ServiceTitan's pricing and dispatch rules",
        "Housecall Pro — same integration pattern; leads land in the right pipeline with the right job type",
        "Jobber — service requests and estimates are created with the AI's structured data already filled in",
        "Custom CRMs — Preisser Solutions can integrate with whatever CRM the shop is using, including custom CRMs built by Preisser Solutions itself",
        "Phone systems — RingCentral, OpenPhone, Twilio, and other VOIP platforms",
        "SMS — answers SMS leads with the same logic as voice; many emergency leads come in by text now",
        "Calendar — books into the dispatch calendar in real time, with conflict detection and availability rules",
        "Reporting — every call, lead, and emergency is logged for monthly reporting; the shop sees exactly what the AI captured and what was missed",
      ],
    },
  ],
  faq: [
    {
      question: "How much does a custom AI receptionist cost for an HVAC company?",
      answer:
        "Pricing is fixed up front and scoped per shop. A first custom HVAC AI receptionist typically lands in the low-to-mid five figures for build, with ongoing monthly costs for the AI usage and platform that vary based on call volume. Most shops recover the build cost in three to six months in captured after-hours revenue.",
    },
    {
      question: "Does the AI sound like a robot?",
      answer:
        "Modern voice AI sounds significantly better than the IVR systems most HVAC owners are familiar with. It can handle interruptions, accents, and natural conversation. It is not indistinguishable from a human and Preisser Solutions does not pretend it is — the AI identifies itself as an automated assistant up front, which is also an FCC and ethics best practice.",
    },
    {
      question: "Will it route a real emergency correctly?",
      answer:
        "Yes — emergency routing is the first-class concern of every HVAC AI receptionist build. Emergencies are detected, the on-call tech is paged immediately, escalation kicks in if there is no response, and every emergency call is logged for audit. The first 30 days of live operation include weekly tuning sessions to catch any miss patterns.",
    },
    {
      question: "Does it work with ServiceTitan?",
      answer:
        "Yes. ServiceTitan is the most common integration target for HVAC AI receptionists Preisser Solutions has built. Leads, service calls, and call summaries flow into ServiceTitan automatically. Housecall Pro and Jobber are also supported, as are custom CRMs.",
    },
    {
      question: "Can it answer in Spanish?",
      answer:
        "Yes, where it makes sense for the shop's service area. Most Kansas HVAC service areas have a meaningful Spanish-speaking customer base; the AI can operate bilingually with the same routing logic.",
    },
    {
      question: "Will it replace my office staff?",
      answer:
        "No. The AI receptionist handles after-hours, overflow, and the calls the office staff cannot pick up. During business hours, the office staff still handles the calls they always have. Most shops use the recovered capacity to take on more revenue without hiring.",
    },
    {
      question: "How long does it take to launch?",
      answer:
        "Most HVAC AI receptionists ship in six to ten weeks from kickoff, including integration with ServiceTitan or another field service platform. The first 30 days of live operation include a tuning period where the AI is reviewed against real calls and adjusted based on what the team sees.",
    },
    {
      question: "Do you serve HVAC companies outside Kansas?",
      answer:
        "Yes. Preisser Solutions is headquartered in Hays, Kansas and works with HVAC contractors across the United States. Kansas HVAC clients get priority scheduling and in-person scoping; remote clients work the same way over video calls.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Cassidy HVAC",
    "ServiceTitan",
    "Housecall Pro",
    "Jobber",
    "RingCentral",
    "Twilio",
    "OpenPhone",
  ],
  relatedLinks: [
    { label: "AI Automation Services", href: "/services/ai-automation" },
    { label: "After-Hours AI Receptionist", href: "/use-cases/after-hours-ai-receptionist-small-business" },
    { label: "HVAC Local SEO in Kansas", href: "/industries/hvac-local-seo-kansas" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Stop letting after-hours HVAC calls go to a competitor",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll review the current call workflow, scope a custom AI receptionist, and send a fixed-price proposal.",
};
