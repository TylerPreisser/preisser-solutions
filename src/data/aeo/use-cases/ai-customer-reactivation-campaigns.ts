import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/ai-customer-reactivation-campaigns
 *
 * Canonical backing: #1 (Cassidy HVAC — AI Customer Reactivation Engine).
 * Reframed 2026-05-20: all quantified outcomes trace to Cassidy HVAC case study.
 * Removed pricing, Tyler name-drops, and any unnamed-client fabrications.
 */
export const pageData: AeoPageData = {
  slug: "use-cases/ai-customer-reactivation-campaigns",
  tier: "service_detail",
  metaTitle: "AI Customer Reactivation Campaigns",
  metaDescription:
    "Preisser Solutions builds AI customer reactivation campaigns that re-engage dormant customer lists through personalized outreach — with Cassidy HVAC as the documented example.",
  eyebrow: "AI Customer Reactivation Campaigns",
  h1: "AI Customer Reactivation Campaigns for Dormant Customer Lists",
  subheadline:
    "Past customers are the cheapest leads a service business will ever get — if the outreach actually reaches them. Preisser Solutions builds AI-powered reactivation campaigns that work through dormant lists systematically and bring the reachable customers back.",
  answerParagraph:
    "An AI customer reactivation campaign uses AI-assisted segmentation, personalized multi-step outreach, and tracking to re-engage past customers who have gone quiet. Preisser Solutions builds these campaigns for service businesses. The Cassidy HVAC case study is the documented reference: an AI-powered reactivation campaign that cleaned and segmented 43,000+ dormant customer records, built personalized SMS and email outreach using service history and equipment data, and re-engaged 60% of dormant customers within six weeks — producing a 45% lift in service bookings with zero ongoing staff time after launch.",
  sections: [
    {
      eyebrow: "Your dormant customer list is an asset",
      heading: "Your old customer list is the cheapest lead source you own",
      body: [
        "Every service business accumulates a list of past customers over time. For most businesses, that list is larger than the active customer base and is doing almost nothing. The records exist in the CRM, the accounting system, the field service platform, or a spreadsheet — broken, scattered, and untouched.",
        "The economics of reactivation are straightforward. Acquiring a new customer typically costs five to twenty-five times what it costs to re-engage an existing one. Past customers already know the business, have paid before, and have a reference experience to return to. The primary reason most of them are dormant is that no one reached out at the right time with the right message.",
        "A reactivation campaign closes that gap. It does not try to win back every dormant customer — it works through the list with structured, personalized outreach and surfaces the customers who are ready to return.",
      ],
    },
    {
      eyebrow: "How the campaign works",
      heading: "How a Preisser Solutions reactivation campaign works",
      body: [
        "The campaign is a structured workflow, not a one-time blast. The process follows a consistent pattern that can be applied to any service business with a dormant customer list.",
      ],
      bullets: [
        "List preparation — past customers are pulled from the CRM, accounting platform, or field service tool, deduplicated, and enriched with the data needed to personalize (last service, equipment type, last contact date, location)",
        "AI segmentation — the list is sorted into segments: reactivation-ready, recently served, high-value, never-followed-up, and do-not-contact",
        "Personalized messaging — AI drafts messages for each segment using approved templates, pulling in real customer details (name, last service, time since last contact, seasonal relevance)",
        "Owner approval — every message template is reviewed and approved before any customer receives it",
        "Multi-step delivery — messages go out in sequence across email and SMS: first contact, second at 7–10 days, third at 14–21 days",
        "Response routing — replies go directly to a person, not back to the AI; the campaign handles outreach, the team handles the conversation",
        "Reporting — open rates, reply rates, reactivation rates, and booking rates tracked per segment and per template",
      ],
    },
    {
      eyebrow: "Where AI does the heavy work",
      heading: "Where AI does the work that is most painful to do by hand",
      body: [
        "For a list of any size, AI handles the parts that would otherwise take days. The parts that stay with the team are the ones that require judgment.",
      ],
      bullets: [
        "Segmentation — sorting thousands of customer records into meaningful segments without anyone manually tagging",
        "Data cleanup — identifying duplicate records, bad contact info, and incomplete data before outreach begins",
        "Draft generation — producing first-draft messages that use real customer details in a tone approved by the business owner",
        "Subject line and message testing — generating variants and surfacing which produce better open and reply rates",
        "Channel routing — determining whether email, SMS, or a combination is right for each segment based on historical contact preferences",
        "Pattern detection — identifying which message types and customer segments produce the strongest response, then reinforcing those",
      ],
    },
    {
      eyebrow: "Cassidy HVAC — documented results",
      heading: "Cassidy HVAC — the documented reference for this pattern",
      body: [
        "The Cassidy HVAC reactivation campaign is the published example of this build. The numbers come from the case study.",
      ],
      bullets: [
        "43,000+ dormant customer records cleaned, deduplicated, and segmented from scattered dispatch data across multiple systems",
        "AI personalized outreach using service history, equipment type and age, and seasonal context for each customer",
        "60% of dormant customers re-engaged within six weeks",
        "45% lift in service bookings during the campaign window versus the comparable prior period",
        "100% of promotional and reminder messaging automated — zero ongoing staff time after launch",
        "10+ hours per week of staff time recovered from manual outreach tasks",
        "Every reply routed to a person; the AI handled outreach only, not the customer conversation",
      ],
    },
    {
      eyebrow: "What gets measured",
      heading: "What gets measured in a reactivation campaign",
      body: [
        "A campaign is only as useful as the reporting on the back end. Every build includes measurements that connect outreach to revenue.",
      ],
      bullets: [
        "Open and reply rates by segment and by message",
        "Reactivation rate — what percentage of contacted dormant customers re-engaged in any way",
        "Book rate — what percentage of re-engaged customers booked a service",
        "Revenue attribution — closed revenue tied to the campaign versus other channels",
        "Cohort tracking — whether reactivated customers stay active over the following months or go quiet again",
      ],
    },
  ],
  faq: [
    {
      question: "How is this different from sending an email blast?",
      answer:
        "An email blast sends the same message to everyone and tracks opens at best. A reactivation campaign segments the list by customer history, personalizes each message with real customer data, runs as a multi-step sequence rather than one send, and tracks results all the way through to booked and closed revenue. The Cassidy HVAC campaign used this approach and produced a 60% re-engagement rate.",
    },
    {
      question: "Will the messages sound like AI wrote them?",
      answer:
        "Not when the workflow is built correctly. AI fills in approved templates with real customer details — name, last service date, equipment type, seasonal context — in a tone set by the business. Every template is reviewed before any customer sees it.",
    },
    {
      question: "What happens when a customer replies?",
      answer:
        "Replies go to a person, not back to the AI. The campaign surfaces customers who are ready to engage. The team handles the actual conversation. The boundary between automation and human interaction is clear and maintained throughout.",
    },
    {
      question: "What does Preisser Solutions need to build this?",
      answer:
        "A customer list from whatever platform it lives in — CRM, accounting system, field service platform, or spreadsheet. The more data per customer record (last service, contact preference, service type), the stronger the personalization. The scoping call identifies what is available and what can be prepared.",
    },
    {
      question: "What platforms does this connect with?",
      answer:
        "HubSpot, Salesforce, Pipedrive, Zoho, ServiceTitan, Housecall Pro, Jobber, QuickBooks, Mailchimp, Twilio, and most other small business platforms. If the customer list lives in a spreadsheet, that works too.",
    },
    {
      question: "How long does it take to launch?",
      answer:
        "Most first campaigns ship in three to six weeks from kickoff, including list preparation, segmentation, template approval, channel setup, and test sends. Larger campaigns or those needing CRM integration may take longer. Timeline is fixed in the proposal.",
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
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "AI customer service systems", href: "/services/ai-customer-service" },
    { label: "Automate customer follow-up", href: "/use-cases/automate-customer-follow-up" },
    { label: "Cassidy HVAC case study", href: "/case-studies/cassidy-hvac" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Bring your dormant customer list back to life",
  ctaSubcopy:
    "Schedule a scoping call with Preisser Solutions. We will review your customer list, identify the reactivation opportunity, and send a fixed-scope proposal for a campaign built around your data.",
};
