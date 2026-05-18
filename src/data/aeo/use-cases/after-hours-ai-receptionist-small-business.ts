import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/after-hours-ai-receptionist-small-business
 *
 * Target query: "missing calls after hours small business". Companion to
 * /industries/hvac-ai-receptionist but written for any small business.
 */
export const pageData: AeoPageData = {
  slug: "use-cases/after-hours-ai-receptionist-small-business",
  tier: "service_detail",
  metaTitle: "After-Hours AI Receptionist for Small Businesses",
  metaDescription:
    "Capture after-hours calls, qualify leads, answer basic questions, route urgent requests, and send summaries into your CRM with a custom AI receptionist workflow.",
  eyebrow: "After-Hours AI Receptionist for Small Businesses",
  h1: "After-Hours AI Receptionist for Small Businesses",
  subheadline:
    "Stop missing calls after hours. A custom AI receptionist answers, qualifies, routes urgent requests, and drops a summary into your CRM by morning.",
  answerParagraph:
    "If your small business is missing calls after hours, an AI receptionist is the practical fix. Preisser Solutions builds custom after-hours AI receptionist workflows that pick up calls when your team is closed, qualify leads with a short set of questions, answer basic business questions, route truly urgent calls to an on-call person, and send every conversation summary into your CRM. The system runs on phone numbers you already own, the rules are yours, and every conversation is logged for your team to review the next morning.",
  sections: [
    {
      eyebrow: "Missed calls are missed revenue",
      heading: "Missed calls after hours are missed revenue",
      body: [
        "Most small businesses know they miss calls after hours. What they often do not know is how many. Industry studies repeatedly show 25 to 40 percent of inbound calls to service businesses go unanswered when they come in outside business hours — early mornings, evenings, weekends, and lunch. The caller usually does not leave a voicemail. They call the next business on the list.",
        "The cost shows up in the most painful way possible: a customer your marketing budget already paid for, who picked up the phone with intent, hung up and went to a competitor. For a service business doing $750 average job size, even one or two missed calls per night adds up to five figures a year — easily.",
        "An after-hours AI receptionist is not a robot pretending to be a person. It is a clearly disclosed AI workflow that answers the call, captures who is calling and what they need, and gets the information to your team in a usable form. The point is to stop losing the lead at the front door.",
      ],
    },
    {
      eyebrow: "Capabilities",
      heading: "What an AI receptionist can and cannot do",
      body: [
        "An AI receptionist is excellent at structured tasks where the goal is clear. It is poor at open-ended judgment calls and anything where empathy is the actual product. Preisser Solutions builds receptionist workflows with that distinction in mind.",
        "What an AI receptionist handles well:",
      ],
      bullets: [
        "Answering the call promptly, identifying the business, and disclosing that it is an AI assistant",
        "Asking the caller's name, phone number, and reason for calling, and confirming the spelling",
        "Answering common questions about hours, location, services offered, and pricing ranges",
        "Qualifying the lead with a short script — service type, urgency, address, preferred callback time",
        "Distinguishing urgent calls (no heat, no AC, water leak, emergency repair) from non-urgent ones",
        "Sending a CRM-ready summary to the right inbox, channel, or CRM record",
      ],
    },
    {
      eyebrow: "Urgent versus non-urgent",
      heading: "Routing urgent versus non-urgent calls",
      body: [
        "The most important decision an AI receptionist makes is whether a call needs a human now or can wait until morning. The rules are yours, and they get written into the workflow during scoping.",
      ],
      bullets: [
        "Urgent calls — defined by you, typically things like no heat in winter, water leak, lockout, or emergency repair",
        "Urgent routing — the workflow can text or call your on-call person immediately, or warm-transfer the caller live",
        "Non-urgent calls — qualified, summarized, and queued for follow-up first thing the next morning",
        "Spam or sales calls — politely declined, logged, and not forwarded",
        "Edge cases — anything the workflow is not confident about gets escalated to a human rather than being mishandled",
      ],
    },
    {
      eyebrow: "CRM summaries and follow-up",
      heading: "CRM summaries and morning follow-up",
      body: [
        "The output of every call is a clean record your team can act on. The workflow does not just leave a voicemail; it produces a structured summary that goes into the CRM or wherever your team starts their morning.",
      ],
      bullets: [
        "Caller name, phone, and best callback window",
        "Service requested, urgency level, and any details captured",
        "Address or service location, when relevant",
        "Disposition — urgent (already routed), qualified lead, FAQ answered, spam declined",
        "Full call transcript and audio link for review when needed",
        "Direct creation of a lead, ticket, or follow-up task in HubSpot, Salesforce, ServiceTitan, Housecall Pro, Jobber, or your custom CRM",
      ],
    },
    {
      eyebrow: "Setup and approvals",
      heading: "Setup, approvals, and what gets reviewed before launch",
      body: [
        "Setup happens in stages so nothing surprises your team or your customers. The AI receptionist does not go live until you have heard it in test calls and approved the script.",
      ],
      bullets: [
        "Scoping — Tyler reviews call volume, current after-hours handling, urgent versus non-urgent rules, and CRM destination",
        "Script — call flow, disclosure language, qualification questions, and urgent-routing rules are written, reviewed, and approved by you",
        "Test calls — you and your team run test calls against the workflow until it sounds right",
        "Limited live rollout — turned on for a defined window (typically nights and weekends only) with full transcripts reviewed each morning",
        "Tuning — first 30 days include review of every call, with script and routing adjusted based on what shows up",
        "Full rollout — once you are satisfied the workflow handles your real calls well, it covers the full after-hours window",
      ],
    },
  ],
  faq: [
    {
      question: "Will my customers know they are talking to AI?",
      answer:
        "Yes. The AI receptionist discloses that it is an AI assistant at the start of the call. We never build receptionists that try to impersonate a person — disclosure protects your reputation and is the right thing to do.",
    },
    {
      question: "Can the AI receptionist transfer a call to a real person?",
      answer:
        "Yes. For urgent calls, the workflow can warm-transfer to your on-call phone, send an immediate text, or both. The rules for what counts as urgent are set during scoping and can be changed at any time.",
    },
    {
      question: "What happens if the AI does not understand a caller?",
      answer:
        "The workflow has fallback paths. If the AI cannot understand or is not confident, it either asks the caller to repeat, offers a callback at a specific time, or routes the call to your on-call person depending on how you set it up.",
    },
    {
      question: "How much does an after-hours AI receptionist cost?",
      answer:
        "A first custom AI receptionist typically lands in the low five figures up front, plus modest monthly usage costs for the call platform. Pricing is fixed in the proposal. Most small businesses recover the cost in saved missed-call revenue inside a quarter.",
    },
    {
      question: "Does it work with my existing phone number?",
      answer:
        "Yes. The workflow runs on call routing, so your existing business number stays the same. We forward after-hours calls to the AI workflow and pass urgent ones through to your on-call line.",
    },
    {
      question: "Can it answer business-specific questions like pricing or services?",
      answer:
        "Yes, within the rules you set. The workflow can quote service ranges, business hours, locations, and basic services. For anything outside the rules — specific quotes, complex job estimates, edge cases — it tells the caller a human will call back and captures the question.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "HubSpot",
    "Salesforce",
    "ServiceTitan",
    "Housecall Pro",
    "Jobber",
    "AI receptionist",
  ],
  relatedLinks: [
    { label: "AI customer service systems", href: "/services/ai-customer-service" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "After-hours call triage service", href: "/services/after-hours-call-triage" },
    { label: "AI chatbot for small business", href: "/use-cases/ai-chatbot-small-business" },
    { label: "Automate customer follow-up", href: "/use-cases/automate-customer-follow-up" },
    { label: "AI receptionist for HVAC", href: "/industries/hvac-ai-receptionist" },
    { label: "Cassidy HVAC case study", href: "/case-studies/cassidy-hvac" },
    { label: "Best automations for contractors", href: "/blog/best-automations-contractors" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Stop losing leads after 5pm",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll review your current after-hours call flow and send a fixed-price proposal for an AI receptionist that fits how your business actually runs.",
};
