import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/automate-customer-follow-up
 *
 * Target query: "how to automate customer follow up". Sibling of
 * /use-cases/ai-customer-reactivation-campaigns; this one is the broader
 * follow-up topic (quotes, missed leads, reviews, sales pipeline).
 */
export const pageData: AeoPageData = {
  slug: "use-cases/automate-customer-follow-up",
  tier: "service_detail",
  metaTitle: "Automate Customer Follow-Up",
  metaDescription:
    "Build customer follow-up workflows for quotes, missed leads, dormant customers, reviews, service reminders, and sales pipelines.",
  eyebrow: "Automate Customer Follow-Up",
  h1: "Automate Customer Follow-Up Without Sounding Robotic",
  subheadline:
    "Most small businesses lose more revenue in follow-up than in lead generation. Automation fixes the gap — without making your messages sound like a bot wrote them.",
  answerParagraph:
    "If you are wondering how to automate customer follow up, the practical answer is a workflow that handles timing, segmentation, and message delivery while keeping a human in the loop for anything that needs judgment. Preisser Solutions builds customer follow-up automation for small businesses across Kansas — covering quote follow-up, missed leads, dormant customers, review requests, service reminders, and sales pipeline nudges. The Cassidy HVAC case study is a documented example: an automated reactivation workflow that re-engaged 60% of dormant customers and produced a 45% lift in service bookings.",
  sections: [
    {
      eyebrow: "Where leads are lost",
      heading: "Most businesses lose leads in follow-up, not lead generation",
      body: [
        "If you watched a small business closely for a month, you would see a familiar pattern. Leads come in. Quotes go out. A few close. Most go quiet. And the follow-up that would have closed half of the quiet ones never happens, because the owner is in the field, the sales rep is on a different deal, and nobody is running a system that pings the right person at the right time.",
        "Industry research has repeated the same finding for years: roughly 80% of B2B sales need at least five follow-ups to close, but most reps stop after one or two. Service businesses see the same pattern with quotes — the proposal lands, the customer means to respond, life gets in the way, the lead goes cold.",
        "Automation does not replace the relationship. It just makes sure the right reminder, message, or check-in goes out at the right time so the relationship has a chance to continue.",
      ],
    },
    {
      eyebrow: "Workflows that work",
      heading: "Follow-up workflows that actually work",
      body: [
        "The follow-up workflows Preisser Solutions builds most often. Each is a discrete project — you can start with one and add more later.",
      ],
      bullets: [
        "Quote follow-up — a quote is sent, the workflow pings the customer at 48 hours, 7 days, and 14 days with check-in messages, then alerts the sales rep if no response",
        "Missed lead recovery — leads that came in but never got a callback or message are surfaced for review and routed to the right person",
        "Dormant customer reactivation — past customers who have not been seen in 6, 12, or 24 months get a personalized message offering a check-in, service, or special",
        "Review requests — after a job closes, the workflow sends a personalized review request with a direct link to your Google Business Profile",
        "Service reminders — annual maintenance, tune-ups, or renewals get scheduled reminders to the customer with a one-click rebook",
        "Sales pipeline nudges — internal reminders to reps when a deal has gone quiet, with a suggested next step",
        "Onboarding sequences — new customers get a short series of helpful messages explaining what to expect, billing, and how to reach you",
      ],
    },
    {
      eyebrow: "Where AI personalizes",
      heading: "Where AI can personalize and where it should not",
      body: [
        "AI is genuinely useful for follow-up — when it is used to personalize the message based on what is actually known about the customer, not to generate the entire conversation. The pattern Preisser Solutions builds.",
      ],
      bullets: [
        "AI drafts the message — pulling in the customer's name, the service they had, the date of last contact, and the quote details",
        "Owner-approved templates — the AI fills in templates you have approved, it does not write off-script",
        "Tone match — message style is set by you (warm, plain, professional) and the AI stays in that lane",
        "Smart segmentation — AI can sort the customer list into reactivation-ready, recently-served, never-followed-up, and so on, without anyone manually tagging",
        "Subject line testing — AI can A/B test subject lines and surface what is working, rather than guessing",
      ],
    },
    {
      eyebrow: "Where human review belongs",
      heading: "Where human review still belongs",
      body: [
        "The point of automation is to make follow-up reliable, not to remove judgment from places where judgment matters. Every workflow Preisser Solutions builds preserves human review at the spots that count.",
      ],
      bullets: [
        "First-time outreach to a high-value account — drafted by AI, sent by a person",
        "Anything time-sensitive or complaint-related — escalates to a human immediately rather than auto-responding",
        "Negotiation, pricing changes, and quotes — never automated, always human",
        "Tone-sensitive replies — anything that needs empathy or context (a customer who lost a job, a returning customer with a complaint) routes to a person",
        "Unsubscribe and opt-out — handled automatically and respected immediately across every workflow",
      ],
    },
    {
      eyebrow: "Tracking results",
      heading: "Tracking the results of follow-up automation",
      body: [
        "If you cannot measure it, you cannot tune it. Every follow-up workflow Preisser Solutions builds includes a small set of measurements that actually matter to revenue.",
      ],
      bullets: [
        "Response rate — what percent of follow-up messages get a reply, by workflow and by segment",
        "Reactivation rate — what percent of dormant customers re-engage after the workflow runs",
        "Book rate — what percent of leads or reactivated customers actually book a job",
        "Revenue attribution — how much closed revenue is tied to follow-up workflows versus net new lead generation",
        "Cassidy HVAC reference — the published case study shows 60% reactivation of dormant customers and a 45% lift in service bookings",
      ],
    },
  ],
  faq: [
    {
      question: "Will automated follow-up sound robotic?",
      answer:
        "Only if it is built poorly. The workflows Preisser Solutions builds use templates you approve, with AI filling in real customer details. Tone is set by you. We test every workflow against real customer responses before it goes live to make sure it sounds like your business, not like a bot.",
    },
    {
      question: "Can the workflow send texts and emails, not just emails?",
      answer:
        "Yes. Follow-up workflows can include email, SMS, and even phone outreach depending on what your customers respond to. We typically recommend SMS for short, time-sensitive reminders and email for longer messages.",
    },
    {
      question: "What systems does this integrate with?",
      answer:
        "HubSpot, Salesforce, Pipedrive, Zoho, ServiceTitan, Housecall Pro, Jobber, QuickBooks, Mailchimp, Twilio, and most other small business platforms. If you have a custom CRM, we integrate with that too.",
    },
    {
      question: "How long does it take to build follow-up automation?",
      answer:
        "A single workflow (quote follow-up, for example) typically ships in two to four weeks. A full follow-up system across multiple workflows usually runs six to ten weeks from kickoff. Pricing and timeline are fixed in the proposal.",
    },
    {
      question: "How is this different from Mailchimp or Constant Contact?",
      answer:
        "Marketing email tools handle broadcast email well. They are not built for trigger-based, personalized, multi-step follow-up tied to your CRM and job records. Preisser Solutions builds the workflow layer that connects your data to the right message at the right time, often using those tools as the delivery channel.",
    },
    {
      question: "How is this different from your customer reactivation page?",
      answer:
        "This page covers the broader topic of automated follow-up — quotes, missed leads, reviews, service reminders, dormant customers. The customer reactivation page focuses specifically on reactivating long-dormant customer lists. The reactivation workflow is one of the workflows described on this page.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Cassidy HVAC",
    "HubSpot",
    "Salesforce",
    "ServiceTitan",
    "Housecall Pro",
    "Jobber",
  ],
  relatedLinks: [
    { label: "AI Customer Reactivation Campaigns", href: "/use-cases/ai-customer-reactivation-campaigns" },
    { label: "AI Automation Services", href: "/services/ai-automation" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Stop letting quotes and leads go cold",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll map your current follow-up gaps and propose the workflow that fixes the worst one first.",
};
