import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/automate-customer-follow-up
 *
 * Canonical backing: #1 (Cassidy HVAC — AI Customer Reactivation Engine).
 * Reframed 2026-05-20: all quantified outcomes tied to Cassidy HVAC case study.
 * Removed pricing, Tyler name-drops, fabricated client references.
 * Removed stale internal link to deleted /use-cases/lead-tracking-website-google-ads.
 */
export const pageData: AeoPageData = {
  slug: "use-cases/automate-customer-follow-up",
  tier: "service_detail",
  metaTitle: "Automate Customer Follow-Up for Small Businesses",
  metaDescription:
    "Preisser Solutions builds customer follow-up automation for quotes, missed leads, dormant customers, review requests, and service reminders — backed by the Cassidy HVAC case study.",
  eyebrow: "Automate Customer Follow-Up",
  h1: "Automate Customer Follow-Up Without Sounding Robotic",
  subheadline:
    "Most small businesses lose more revenue in follow-up than in lead generation. The right automation closes the gap without making messages sound like a bot wrote them.",
  answerParagraph:
    "If you want to automate customer follow-up, the practical answer is a workflow that handles timing, segmentation, and message delivery while keeping a human in the loop for anything that needs judgment. Preisser Solutions builds customer follow-up automation for small businesses — covering quote follow-up, missed leads, dormant customers, review requests, service reminders, and sales pipeline nudges. The Cassidy HVAC case study is the documented reference: an automated reactivation workflow that re-engaged 60% of dormant customers and produced a 45% lift in service bookings with zero ongoing staff time after launch.",
  sections: [
    {
      eyebrow: "Where revenue leaks in follow-up",
      heading: "Most small businesses lose leads in follow-up, not lead generation",
      body: [
        "Watch a small service business for a month and the pattern repeats. Leads come in. Quotes go out. A few close. Most go quiet. The follow-up that would have converted a meaningful portion of the quiet ones never happens — because the owner is in the field, the sales rep moved on, and nothing in the system sends the right check-in at the right time.",
        "The problem compounds with volume. A one-person shop misses a few follow-ups per week. A five-person shop misses dozens. None of these losses appear on any report because the revenue never existed in the first place.",
        "Automation does not replace the relationship. It makes sure the right reminder or check-in goes out at the right time so the relationship has a chance to continue.",
      ],
    },
    {
      eyebrow: "Workflows that pay off",
      heading: "Follow-up workflows that pay off for service businesses",
      body: [
        "The workflows Preisser Solutions builds most often for follow-up automation. Each is a discrete project — a business can start with one and add more over time.",
      ],
      bullets: [
        "Quote follow-up — a quote goes out, the workflow sends a check-in at 48 hours, 7 days, and 14 days, then alerts the right person if there is still no response",
        "Missed lead recovery — leads that came in but never received a callback are surfaced and routed to the right person for follow-up",
        "Dormant customer reactivation — past customers who have not been seen in 6, 12, or 24 months receive a personalized outreach with an offer, check-in, or seasonal prompt",
        "Review requests — after a job closes, the workflow sends a personalized review request with a direct link to the Google Business Profile",
        "Service reminders — annual maintenance, tune-ups, or renewals get scheduled reminders with a one-click rebook option",
        "Sales pipeline nudges — internal reminders to the team when a deal has gone quiet, with a suggested next step",
        "Onboarding sequences — new customers receive a short series of messages explaining billing, what to expect, and how to reach the team",
      ],
    },
    {
      eyebrow: "Where AI personalizes",
      heading: "Where AI personalizes and where human review stays",
      body: [
        "AI is useful for follow-up when it personalizes the message based on what is actually known about the customer — not when it generates the entire conversation. The pattern Preisser Solutions builds.",
      ],
      bullets: [
        "AI fills in templates you have approved — pulling in customer name, service history, last contact date, and job details",
        "Tone is set during setup — warm, plain, or professional — and the AI stays in that lane",
        "AI can sort the customer list into reactivation-ready, recently served, never-followed-up, and similar segments without manual tagging",
        "Subject line variants can be tested to surface what generates better open and reply rates",
        "High-value account outreach — drafted by AI, sent by a person",
        "Anything complaint-related or time-sensitive escalates to a human immediately rather than auto-responding",
        "Unsubscribe and opt-out requests are handled automatically and respected across every workflow",
      ],
    },
    {
      eyebrow: "Cassidy HVAC — documented results",
      heading: "Cassidy HVAC — the documented example of this pattern",
      body: [
        "The Cassidy HVAC engagement is the published reference for what automated customer follow-up can produce. The results from the case study.",
      ],
      bullets: [
        "43,000+ dormant customer records cleaned and segmented from multiple disconnected systems",
        "AI-personalized outreach built around each customer's service history, equipment type, and seasonal context",
        "60% of dormant customers re-engaged within six weeks",
        "45% lift in service bookings versus the comparable prior period",
        "100% of promotional and reminder messaging automated — zero ongoing staff time after launch",
        "10+ hours per week of staff time recovered from manual outreach tasks",
        "Every customer reply routed to a person; the automation handled outreach, not the live conversation",
      ],
    },
    {
      eyebrow: "Measuring results",
      heading: "Measuring the results of follow-up automation",
      body: [
        "Every follow-up workflow Preisser Solutions builds includes measurements that connect outreach to revenue rather than just tracking sends.",
      ],
      bullets: [
        "Response rate — what percentage of follow-up messages get a reply, by workflow and by segment",
        "Reactivation rate — what percentage of dormant customers re-engage after the workflow runs",
        "Book rate — what percentage of leads or reactivated customers actually book a service",
        "Revenue attribution — how much closed revenue is tied to automated follow-up versus other channels",
        "Template performance — which messages produce the strongest response so underperforming templates are retired",
      ],
    },
  ],
  faq: [
    {
      question: "Will automated follow-up sound robotic?",
      answer:
        "Only if it is built poorly. The workflows Preisser Solutions builds use templates reviewed and approved by the business owner, with AI filling in real customer details. Tone is set during setup and maintained. The Cassidy HVAC campaign used this exact pattern and the messages were indistinguishable from hand-written outreach.",
    },
    {
      question: "Can the workflow send texts and emails?",
      answer:
        "Yes. Follow-up workflows can include email, SMS, or a combination depending on what the customer base responds to. SMS works well for short time-sensitive reminders; email works well for longer messages with context or attachments.",
    },
    {
      question: "What systems does this integrate with?",
      answer:
        "HubSpot, Salesforce, Pipedrive, Zoho, ServiceTitan, Housecall Pro, Jobber, QuickBooks, Mailchimp, Twilio, and most other small business platforms. Custom CRMs are supported through API integration.",
    },
    {
      question: "How long does it take to build?",
      answer:
        "A single workflow — quote follow-up, for example — typically ships in two to four weeks. A full follow-up system covering multiple workflows usually runs six to ten weeks from kickoff. Timeline is fixed in the proposal.",
    },
    {
      question: "How is this different from Mailchimp or Constant Contact?",
      answer:
        "Marketing email tools handle broadcast email well. They are not built for trigger-based, personalized, multi-step follow-up tied to CRM records and job history. The workflow layer Preisser Solutions builds connects the business's data to the right message at the right time — often using existing delivery tools as the send channel.",
    },
    {
      question: "What is the difference between follow-up automation and the reactivation campaign?",
      answer:
        "This page covers the broader category — quotes, missed leads, reviews, service reminders, and dormant customers. The AI customer reactivation campaign page focuses specifically on re-engaging long-dormant lists in a structured multi-step campaign. Reactivation is one of the workflows described here; it has its own page because the list-cleanup and segmentation work is substantial.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Hays, Kansas",
    "Cassidy HVAC",
    "HubSpot",
    "Salesforce",
    "ServiceTitan",
    "Housecall Pro",
    "Jobber",
  ],
  relatedLinks: [
    { label: "Customer reactivation engine", href: "/services/customer-reactivation" },
    { label: "AI customer service systems", href: "/services/ai-customer-service" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "AI customer reactivation campaigns", href: "/products/customer-reactivation-agent" },
    { label: "Cassidy HVAC case study", href: "/case-studies/cassidy-hvac" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Stop letting quotes and leads go cold",
  ctaSubcopy:
    "Schedule a scoping call with Preisser Solutions. We will map your current follow-up gaps and propose the workflow that closes the worst one first.",
};
