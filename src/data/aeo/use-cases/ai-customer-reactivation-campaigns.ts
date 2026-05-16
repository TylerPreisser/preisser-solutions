import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/ai-customer-reactivation-campaigns
 *
 * Target query: "AI customer reactivation campaign". Companion to
 * /use-cases/automate-customer-follow-up; this one is the dormant-list
 * reactivation play (Cassidy HVAC reference).
 */
export const pageData: AeoPageData = {
  slug: "use-cases/ai-customer-reactivation-campaigns",
  tier: "service_detail",
  metaTitle: "AI Customer Reactivation Campaigns",
  metaDescription:
    "Use AI-assisted segmentation, messaging, follow-up, and reporting to reactivate past customers without manually writing every message.",
  eyebrow: "AI Customer Reactivation Campaigns",
  h1: "AI Customer Reactivation Campaigns for Dormant Customer Lists",
  subheadline:
    "Past customers are the cheapest leads you will ever buy — if you actually reach out to them. AI reactivation campaigns make that reach-out repeatable.",
  answerParagraph:
    "An AI customer reactivation campaign uses AI-assisted segmentation, personalized messaging, multi-step follow-up, and reporting to re-engage past customers who have gone quiet. Preisser Solutions builds AI customer reactivation campaigns for small businesses in Hays, Kansas and beyond. The Cassidy HVAC case study is a documented example — an AI-assisted reactivation campaign that re-engaged 60% of dormant customers and produced a 45% lift in service bookings. Every campaign keeps a human in the loop for tone approval, list segmentation review, and high-value customer outreach.",
  sections: [
    {
      eyebrow: "Your old customer list is an asset",
      heading: "Your old customer list is the cheapest lead source you own",
      body: [
        "Every small business has a list of past customers somewhere — in the CRM, the accounting system, the field service platform, or a spreadsheet. For most businesses, that list is two to ten times the size of the active customer base and is doing almost nothing.",
        "The math is uncomfortable. Acquiring a new customer typically costs 5 to 25 times what reactivating an existing customer costs. Past customers already trust the business, know how to find it, and remember the experience. The only reason most of them are dormant is that nobody reached out at the right time with the right message.",
        "A reactivation campaign closes that gap. It does not try to win every dormant customer back; it works through the list systematically, with personalized messaging, and brings the ones who are reachable back into the active customer base.",
      ],
    },
    {
      eyebrow: "How reactivation campaigns work",
      heading: "How AI customer reactivation campaigns actually work",
      body: [
        "A Preisser Solutions reactivation campaign is a structured workflow, not a one-time email blast. The pattern.",
      ],
      bullets: [
        "1. List preparation — past customers are pulled from the CRM, accounting, or service platform, deduplicated, and prepared with the data needed to personalize (last service, last contact, location, services received)",
        "2. Segmentation — AI sorts the list into reactivation-ready, recently-served, high-value, low-value, never-followed-up, and do-not-contact segments",
        "3. Messaging — AI drafts personalized messages for each segment using approved templates, pulling in real customer details (name, last service, time since contact)",
        "4. Owner approval — every message template is reviewed and approved before any customer receives it",
        "5. Multi-step send — messages go out in a sequence — first touch, second touch at 7-10 days, third touch at 14-21 days — across email and SMS as appropriate",
        "6. Response handling — replies route directly to a human, not back to the AI; the AI does not handle the actual customer conversation",
        "7. Reporting — open rates, reply rates, reactivation rates, and book rates tracked per segment and per template",
      ],
    },
    {
      eyebrow: "AI-assisted segmentation and messaging",
      heading: "Where AI assistance pays off",
      body: [
        "AI does the parts of a reactivation campaign that are most painful to do by hand. The rest stays with the team.",
      ],
      bullets: [
        "Segmentation — sorting thousands of customer records into segments that make sense, without anyone manually tagging",
        "Drafting — generating first-draft messages that use real customer details (last service, last contact, location)",
        "Tone matching — adjusting message style to match the business's voice (warm, plain, professional)",
        "Subject line testing — generating and testing subject line variants to find what gets opens",
        "Pattern detection — finding which messages and which segments produce the best response, then doubling down on the winners",
        "Channel routing — recommending whether email, SMS, or phone outreach is right for each segment based on past behavior",
      ],
    },
    {
      eyebrow: "Tracking results",
      heading: "Tracking results from a reactivation campaign",
      body: [
        "A reactivation campaign is only as good as the reporting on the back end. Every campaign Preisser Solutions builds includes a small set of measurements that matter.",
      ],
      bullets: [
        "Open and reply rates — by segment and by message",
        "Reactivation rate — what percent of contacted dormant customers re-engaged in any way",
        "Book rate — what percent of re-engaged customers actually booked a service",
        "Revenue attribution — closed revenue tied to the campaign versus other channels",
        "Cohort tracking — does a reactivated customer stay active, or do they go quiet again in 6 months",
      ],
    },
    {
      eyebrow: "Cassidy HVAC reference",
      heading: "Cassidy HVAC reactivation campaign — documented results",
      body: [
        "The Cassidy HVAC reactivation campaign is the published reference for this pattern. The results from the public case study.",
      ],
      bullets: [
        "60% of dormant customers re-engaged with the campaign in some way (open, reply, or visit)",
        "45% lift in service bookings during the campaign window versus the prior comparable period",
        "Messaging built on approved templates, with AI personalizing based on last service and time since contact",
        "Every reply routed to a human for the actual customer conversation; AI did not handle the live exchange",
        "Campaign ran across email and SMS, with channel choice per customer based on prior contact preference",
      ],
    },
  ],
  faq: [
    {
      question: "How is this different from sending a marketing email blast?",
      answer:
        "An email blast sends the same message to everyone and ignores who they are. A reactivation campaign segments the list, personalizes the message to each customer's history, runs as a multi-step sequence rather than one send, and tracks results all the way through to booked revenue. The results difference is usually severalfold.",
    },
    {
      question: "Will the messages sound like AI wrote them?",
      answer:
        "Only if the workflow is built poorly. We use AI to fill in templates you have approved, with real customer details, in a tone we have set with you. Every template is reviewed before customers see anything. The Cassidy HVAC campaign used this exact pattern and the responses were indistinguishable from hand-written outreach.",
    },
    {
      question: "What if a customer replies?",
      answer:
        "Replies go to a human, not back to the AI. The AI handles outreach. Your team handles the conversation. The point is to surface the customers who are ready to talk, not to automate the actual relationship.",
    },
    {
      question: "How long does it take to launch a reactivation campaign?",
      answer:
        "Most first campaigns ship in three to six weeks from kickoff, including list preparation, segmentation, messaging approval, channel setup, and test sends. Larger campaigns or those needing CRM integration may take longer. Pricing and timeline are fixed in the proposal.",
    },
    {
      question: "What systems do you need to run this?",
      answer:
        "Whatever you already use. HubSpot, Salesforce, Pipedrive, Zoho, ServiceTitan, Housecall Pro, Jobber, QuickBooks, Mailchimp, Twilio — most small business platforms. The customer list can come from a CRM, accounting platform, or even a spreadsheet.",
    },
    {
      question: "How much does an AI reactivation campaign cost?",
      answer:
        "Pricing is fixed up front and scoped per project. A first campaign typically lands in the low five figures, depending on list size, integrations, and channels. Most campaigns pay for themselves on the first run, with the workflow reusable for future runs at a lower cost.",
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
    { label: "Case Studies", href: "/case-studies" },
    { label: "AI Automation Services", href: "/services/ai-automation" },
    { label: "Automate Customer Follow-Up", href: "/use-cases/automate-customer-follow-up" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Bring your dormant customer list back to life",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll review your customer list, identify the reactivation opportunity, and send a fixed-price proposal for a campaign tailored to your business.",
};
