import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/ai-chatbot-small-business
 *
 * Target query: "AI chatbot for small business". Covers lead qualification,
 * FAQs, appointment routing, internal knowledge, CRM connections.
 */
export const pageData: AeoPageData = {
  slug: "use-cases/ai-chatbot-small-business",
  tier: "service_detail",
  metaTitle: "AI Chatbot for Small Business",
  metaDescription:
    "Custom AI chatbots for small businesses that need lead qualification, FAQs, appointment routing, internal knowledge search, and CRM-connected workflows.",
  eyebrow: "AI Chatbot for Small Business",
  h1: "AI Chatbots for Small Businesses That Need Real Lead Handling",
  subheadline:
    "A chatbot that only answers FAQs is a missed opportunity. The chatbot a small business actually needs qualifies leads, routes appointments, and gets the conversation into the CRM.",
  answerParagraph:
    "An AI chatbot for small business should do more than answer the same five FAQs. Preisser Solutions builds custom AI chatbots for small businesses across Kansas — chatbots that qualify leads with a short script, answer business-specific questions from your own knowledge base, route appointment requests to the calendar, hand off complex conversations to a human, and write every lead into your CRM. Every chatbot ships with disclosure, guardrails, and a defined escalation path so the experience reflects your business rather than embarrassing it.",
  sections: [
    {
      eyebrow: "FAQs are not enough",
      heading: "A chatbot should do more than answer FAQs",
      body: [
        "Most small business chatbots fall into one of two buckets. The cheap ones answer a small fixed set of FAQs and dead-end every other question. The expensive ones plug a public language model into the website with no business-specific knowledge, no guardrails, and no path to a human, so they either hallucinate or refuse to help.",
        "Neither is what most small businesses actually need. The chatbot that pays for itself does three things: it qualifies leads with a short, useful script; it answers questions from your own knowledge (services, pricing ranges, hours, locations, policies); and it gets the conversation into the CRM so your team can follow up.",
        "Done correctly, an AI chatbot is one of the cheapest ways to capture leads that would otherwise bounce. Done poorly, it is worse than not having one — because it leaves a bad impression of your business that the customer will not forget.",
      ],
    },
    {
      eyebrow: "Useful chatbot workflows",
      heading: "Useful AI chatbot workflows for small businesses",
      body: [
        "The chatbot workflows Preisser Solutions builds most often. Each is structured, scoped, and tested before going live.",
      ],
      bullets: [
        "Lead qualification — a short script that captures name, contact, service requested, urgency, and timeline, then writes the lead to the CRM",
        "FAQ answers — pricing ranges, services, hours, locations, policies, and other business-specific questions answered from your approved content",
        "Appointment routing — the chatbot collects appointment requests, checks against a calendar (where possible), and books or routes to a human",
        "Internal knowledge search — staff-facing chatbot that lets your team find policies, SOPs, product details, or warranty information instantly",
        "Quote requests — the chatbot collects enough information to scope a quote, then hands the conversation to a salesperson",
        "Onboarding help — new customers can ask common questions in plain language without picking up the phone",
      ],
    },
    {
      eyebrow: "When not to use a chatbot",
      heading: "When a chatbot is the wrong tool",
      body: [
        "Not every business problem is a chatbot problem. Preisser Solutions will tell you when a chatbot is not the right answer.",
      ],
      bullets: [
        "Emergency or safety-critical situations — a real after-hours phone path is the right tool, not chat",
        "High-context sales conversations — when every deal needs a person, a chatbot at most qualifies and hands off",
        "Complaint or refund handling — a person should own these conversations from the start; chat triage is fine but resolution should not be automated",
        "Tiny inquiry volume — if you get three website inquiries a week, a chatbot is not the lever; better forms and call follow-up are",
        "Anywhere disclosure would be uncomfortable — every chatbot we build discloses it is AI, and if that is not appropriate for your audience, we recommend not building one",
      ],
    },
    {
      eyebrow: "Connecting chatbot leads to CRM",
      heading: "How to connect chatbot leads to your CRM",
      body: [
        "A chatbot that does not write leads into your CRM is just a transcript. The point is to get the lead into the same place every other lead lives so the team treats it the same way.",
      ],
      bullets: [
        "Every conversation produces a structured lead record — name, contact, service, urgency, transcript link",
        "Records are written directly into HubSpot, Salesforce, Pipedrive, Zoho, ServiceTitan, Housecall Pro, Jobber, or a custom CRM",
        "Lead source is tagged so reporting can credit the chatbot accurately versus other channels",
        "Urgent leads trigger notifications to the right person — Slack, Teams, email, or text",
        "Transcripts are reviewable so the team can see exactly what the customer said and what the chatbot answered",
      ],
    },
    {
      eyebrow: "Safety and guardrails",
      heading: "Safety, guardrails, and what we test before launch",
      body: [
        "Preisser Solutions does not ship a chatbot before it has been tested against the kinds of questions that would actually break it.",
      ],
      bullets: [
        "Disclosure — every chatbot identifies itself as an AI assistant at the start of the conversation",
        "Approved knowledge only — answers come from your approved content (services, pricing ranges, hours, policies), not from a general model's open knowledge",
        "Refusal patterns — for questions outside its scope, the chatbot says so and offers a path to a human, rather than guessing",
        "Pricing and quote safety — the chatbot quotes ranges, never firm prices, unless you have explicitly approved firm pricing for specific items",
        "Sensitive topic routing — anything that looks like a complaint, safety issue, or emergency gets escalated to a person immediately",
        "Adversarial testing — before launch, we run prompt-injection and jailbreak attempts to confirm the chatbot stays on script",
      ],
    },
  ],
  faq: [
    {
      question: "How much does a custom AI chatbot cost?",
      answer:
        "Pricing is fixed up front and scoped per project. A first custom chatbot typically lands in the low-to-mid five figures, plus modest monthly hosting and AI usage costs. Pricing depends on knowledge base size, CRM integrations, and the number of workflows.",
    },
    {
      question: "How is this different from off-the-shelf chatbot tools?",
      answer:
        "Off-the-shelf chatbots typically run a generic script or hook into a public language model with no business-specific knowledge or guardrails. Preisser Solutions builds chatbots on your approved content, connected to your CRM, with workflows tailored to how your business actually handles leads.",
    },
    {
      question: "Will the chatbot make up answers?",
      answer:
        "Not if it is built correctly. Our chatbots are scoped to answer from approved content. For questions outside that scope, the chatbot says so and offers a path to a human. We run adversarial testing before launch to confirm guardrails hold.",
    },
    {
      question: "Can the chatbot book appointments?",
      answer:
        "Yes, where it makes sense. The chatbot can collect appointment requests and either book directly against a calendar or route to a human for confirmation. Whether we automate booking depends on how time-sensitive your scheduling is.",
    },
    {
      question: "How long does it take to build a custom AI chatbot?",
      answer:
        "Most first chatbots ship in four to eight weeks from kickoff, including knowledge base preparation, CRM integration, testing, and a defined approval window where you and your team try it out before launch.",
    },
    {
      question: "Will my customers know they are talking to AI?",
      answer:
        "Yes. Every chatbot discloses that it is an AI assistant at the start of the conversation. We never build chatbots that pretend to be human — disclosure protects your reputation and is the right thing to do.",
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
    "AI chatbot",
  ],
  relatedLinks: [
    { label: "Custom AI Agents in Hays, KS", href: "/services/custom-ai-agents-hays-ks" },
    { label: "AI Automation Services", href: "/services/ai-automation" },
    { label: "Integrations", href: "/integrations" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Get a chatbot that actually works for your business",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll review your inbound flow, identify whether a chatbot is the right lever, and send a fixed-price proposal if it is.",
};
