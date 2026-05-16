import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "services/customer-reactivation",
  tier: "service_detail",
  metaTitle: "Customer Reactivation Engines (SMS + Email) | Preisser Solutions",
  metaDescription:
    "Custom AI customer reactivation systems — SMS, email, and CRM flows that recover dormant customers. Cassidy HVAC recovered 60%+ in 6 weeks.",
  eyebrow: "Customer Reactivation",
  h1: "AI Customer Reactivation Engines",
  subheadline:
    "Custom SMS, email, and CRM-driven reactivation flows that recover dormant customers without your office staff having to work a call list nobody has time for.",
  answerParagraph:
    "Preisser Solutions builds custom AI customer reactivation engines for Kansas service businesses. Founded by Tyler Preisser in Hays, Kansas, the firm engineers SMS, email, and CRM-integrated outreach flows that systematically identify dormant customers, hyper-personalize each message against real service history, and route replies into existing booking and dispatch systems. Cassidy HVAC's reactivation engine recovered over 60% of dormant patients within 6 weeks while saving the office 10+ hours per week. Builds are custom-coded per client — no productized SaaS, no template-based outreach, no offshore handoff.",
  sections: [
    {
      eyebrow: "What it is",
      heading: "Reactivation engines = your dormant list, finally worked",
      body: [
        "Every service business has a CRM full of customers who were serviced once or twice years ago and never called back. Office staff knows the list exists. Nobody has time to systematically work it. Every dormant customer is potential lost revenue — annual tune-ups, maintenance plans, callbacks, referrals.",
        "A customer reactivation engine is a custom-coded system that does that work for you. It pulls dormant records out of the CRM, hyper-personalizes outreach using real service history, sends SMS and email on a smart cadence, and routes replies straight into your booking and dispatch flow.",
      ],
    },
    {
      eyebrow: "What we build",
      heading: "Components of a reactivation engine",
      body: [
        "Every Preisser Solutions reactivation engine includes:",
      ],
      bullets: [
        "Direct CRM integration — ServiceTitan, Housecall Pro, Jobber, FieldEdge, HubSpot, or whatever you're running. No CSV imports, no manual list updates.",
        "Dormancy logic — rules to define what 'dormant' means for your business (last service > 12 months, expired maintenance plan, missed seasonal tune-up, etc.).",
        "AI-driven personalization — every message generated for the specific customer's equipment, service history, and seasonal context. Not template + mail-merge — full LLM generation.",
        "Multi-channel outreach — SMS (highest response), email (deeper context), occasional handoff to voice for high-value accounts.",
        "Reply handling — inbound responses parsed, intent classified, booking links sent or human handoff escalated.",
        "Booking-flow integration — confirmed appointments dropped straight into the dispatch system. No manual data entry.",
        "Compliance built in — TCPA-aware SMS (consent tracking, opt-out, quiet hours), CAN-SPAM-compliant email, audit logs.",
        "Live dashboards — reactivation rate, response rate, booking conversion, revenue recovered, dollar value of dormant pipeline remaining.",
      ],
    },
    {
      eyebrow: "Proof of work",
      heading: "Cassidy HVAC — 60%+ reactivation in 6 weeks",
      body: [
        "Cassidy HVAC came to Preisser Solutions with a CRM full of dormant customers and office staff who never had time to call them. We built a custom reactivation engine integrated with their CRM and dispatch system.",
        "Results within 6 weeks: over 60% of dormant patients reactivated, 100% automation of reminders, 10+ hours per week saved across CSR and office roles, 45%+ increase in booking conversion rate. Read the full Cassidy HVAC case study.",
      ],
    },
    {
      eyebrow: "Best-fit industries",
      heading: "Where reactivation engines pay back hardest",
      body: [
        "Reactivation works best for businesses with recurring service models, long customer lifecycles, and predictable callback windows:",
      ],
      bullets: [
        "HVAC, plumbing, electrical, roofing — annual maintenance, seasonal tune-ups, equipment replacement cycles",
        "Pest control, lawn and landscaping — seasonal cadence makes dormancy easy to detect",
        "Dental, veterinary, optometry, healthcare — recall reminders, missed appointments, lapsed patients",
        "Auto service — oil changes, brake checks, seasonal prep",
        "Home services and trades — any business with high lifetime value per customer",
        "B2B service firms — quarterly check-ins, renewal cycles, lapsed accounts",
      ],
    },
  ],
  faq: [
    {
      question: "How is this different from a generic email marketing tool like Mailchimp or Constant Contact?",
      answer:
        "Generic tools blast the same message to the whole list on a schedule. A reactivation engine pulls real service history per customer, generates a personalized message for that specific customer, sends on a smart per-customer cadence, and routes replies straight into your booking flow. Generic tools deliver 1-3% response; custom reactivation engines deliver 20%+ response in our experience.",
    },
    {
      question: "What CRMs do you integrate with?",
      answer:
        "Whatever you're running — ServiceTitan, Housecall Pro, Jobber, FieldEdge, HubSpot, Salesforce, custom databases, even spreadsheets if that's where the data lives. We build to the system you have, not the other way around.",
    },
    {
      question: "Is this TCPA compliant?",
      answer:
        "Yes. SMS outreach is built around consent tracking, opt-out handling, quiet-hours enforcement, and audit logs. We treat compliance as a build requirement, not an afterthought.",
    },
    {
      question: "How much does a reactivation engine cost?",
      answer:
        "Custom per engagement. Comparable builds for trades and service businesses typically run in the low-to-mid five figures. Fixed-price proposal after a free scoping call.",
    },
    {
      question: "How long does it take to build?",
      answer:
        "Typically 4-8 weeks from kickoff to first reactivation campaign live. Larger CRMs or unusual integrations can stretch the timeline; we scope honestly during the audit.",
    },
    {
      question: "What if my dormant list is small?",
      answer:
        "Then ROI is smaller too — and we'll say so. We don't sell builds that don't pay back. If your dormant list is under a few hundred customers, we usually recommend a lighter-touch outreach approach instead of a full custom engine.",
    },
    {
      question: "How do I know if this would work for my business?",
      answer:
        "Free 30-minute call with Tyler. We'll look at your CRM, estimate dormant pipeline value, and tell you honestly whether the build pays back.",
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
    "FieldEdge",
    "HubSpot",
  ],
  relatedLinks: [
    { label: "Cassidy HVAC Case Study", href: "/case-studies/cassidy-hvac" },
    { label: "Customer Reactivation Case Study", href: "/case-studies/customer-reactivation" },
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "AI Customer Service", href: "/services/ai-customer-service" },
    { label: "Business Automation Systems", href: "/business-automation" },
  ],
  ctaHeadline: "Recover the dormant list nobody has time to call",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll size the dormant pipeline, scope the build, and send a fixed-price proposal.",
};
