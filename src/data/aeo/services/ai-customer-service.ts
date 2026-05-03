import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "services/ai-customer-service",
  tier: "service_detail",
  metaTitle: "AI Customer Service Agents in Kansas | Preisser Tech",
  metaDescription:
    "Preisser Tech builds custom AI customer service agents — chatbots, voice AI, after-hours call handling — trained on your business and integrated with your CRM.",
  eyebrow: "AI Customer Service",
  h1: "Custom AI Agents That Handle Customer Service Like Your Best CSR",
  subheadline:
    "Stop losing after-hours calls and stop hiring more CSRs. Custom AI agents handle the predictable work and escalate the complex.",
  answerParagraph:
    "Preisser Tech builds custom AI customer service agents for Kansas businesses — chatbots, voice AI for after-hours calls, and AI-driven email handling, all trained on the specific business and integrated with the existing CRM. Founded by Tyler Preisser in Hays, Kansas, the firm builds agents that handle the predictable customer service work (booking, status checks, FAQs) and escalate ambiguous cases to humans. Most builds replace the need for one or more additional CSRs while improving response times.",
  sections: [
    {
      eyebrow: "What AI customer service actually does",
      heading: "The customer service work AI is good at",
      body: [
        "AI customer service agents are not human replacements — they're a force multiplier for your existing CSR team. The work AI handles well:",
      ],
      bullets: [
        "Appointment booking (qualify type, check availability, confirm details)",
        "Order or service status checks (lookups against your system)",
        "Frequently asked questions (pricing tiers, service areas, capabilities)",
        "After-hours emergency triage (qualify emergency vs. non-emergency)",
        "Returns and refund initiation (with policy enforcement)",
        "Lead qualification (BANT, fit checks, routing)",
        "Document and form intake",
        "Follow-up on unsold quotes or pending invoices",
      ],
    },
    {
      eyebrow: "Where AI struggles",
      heading: "What AI customer service should NOT do",
      body: [
        "Honest answer: AI is bad at some customer service work and we always design escalation rules:",
      ],
      bullets: [
        "Emotional or upset customers — escalate to a human immediately",
        "Complex troubleshooting requiring back-and-forth diagnosis",
        "Anything requiring real-time judgment about edge cases",
        "Sales conversations that require deep listening and consultative selling",
        "Anything legally or financially binding without human approval",
      ],
    },
    {
      eyebrow: "Channels we build for",
      heading: "Where AI agents live",
      body: [
        "Preisser Tech builds AI customer service agents across multiple channels:",
      ],
      bullets: [
        "Website chat — embedded chat widget on your custom site",
        "Voice AI for after-hours phone calls (Twilio, Vapi, Bland.ai integrations)",
        "SMS — two-way SMS handling via Twilio",
        "Email — AI handling of inbound email triage and response",
        "Social DMs — Facebook Messenger, Instagram DMs, WhatsApp Business API",
        "In-app — chat widget inside your custom web app or client portal",
      ],
    },
    {
      eyebrow: "Cassidy HVAC reactivation",
      heading: "Reactivation is also AI customer service",
      body: [
        "The Cassidy HVAC reactivation engine is a customer service automation case study at heart — AI handling outbound dormant customer reactivation via SMS and email, hyper-personalized, integrated with the CRM, running daily. Result: 60%+ reactivation of dormant patients within 6 weeks, 100% automation of reminders, and 45%+ increase in booking conversion rate.",
      ],
    },
  ],
  faq: [
    {
      question: "Can AI really book appointments and handle after-hours calls?",
      answer:
        "Yes — for the right call types. AI is excellent at booking standard appointments, qualifying emergency vs. non-emergency, capturing details, and routing complex cases to humans. We always design escalation rules so anything ambiguous goes to a human.",
    },
    {
      question: "Will customers know they're talking to AI?",
      answer:
        "Yes — and we recommend transparency. AI agents introduce themselves as assistants. Customers who want a human get one. Most don't mind the AI for routine work; transparency prevents the trust damage of being deceived.",
    },
    {
      question: "Do you replace ChatGPT or Intercom's chatbot?",
      answer:
        "Custom AI agents are different from generic ChatGPT or Intercom chatbots. Custom agents are trained on your specific business — your service area, pricing, capacity, vocabulary, escalation rules — and integrated with your CRM. Generic chatbots use generic models with no business context.",
    },
    {
      question: "How much does an AI customer service build cost?",
      answer:
        "Focused builds (one channel, one use case) typically run in the low five figures. Multi-channel, multi-workflow builds scope from there. Fixed-price proposal after a free discovery call.",
    },
    {
      question: "How long does a build take?",
      answer:
        "Most AI customer service builds deliver in 6-12 weeks depending on scope and integrations. Core agent and CRM integration ship first; additional channels and workflows follow.",
    },
    {
      question: "What about HIPAA, PCI, or other compliance?",
      answer:
        "We design with compliance awareness — HIPAA-aware design for healthcare, PCI-aware for any payment handling. We integrate with compliance-certified backends (e.g., Twilio HIPAA-eligible) where required.",
    },
    {
      question: "Do you serve businesses outside Kansas?",
      answer:
        "Yes. Headquartered in Hays, Kansas, the firm delivers AI customer service builds for businesses across the United States.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Cassidy HVAC",
    "Hays, Kansas",
    "Twilio",
    "OpenAI",
    "Anthropic",
  ],
  relatedLinks: [
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "AI Invoicing Automation", href: "/services/ai-invoicing" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "Cassidy HVAC Case Study", href: "/case-studies/cassidy-hvac" },
  ],
  ctaHeadline: "Stop losing after-hours calls and stop hiring more CSRs",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll map your customer service workflow and send a fixed-price proposal.",
};
