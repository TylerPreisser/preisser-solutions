import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/reactivate-old-leads",
  tier: "blog",
  datePublished: "2026-04-04",
  dateModified: "2026-05-15",
  metaTitle: "How To Reactivate Old Leads (SMS + Email + CRM Playbook)",
  metaDescription:
    "The exact reactivation sequence Preisser Solutions ships for HVAC, dental, veterinary, and trades — including the Cassidy HVAC 60% case.",
  eyebrow: "Blog · AI Automation",
  h1: "How To Reactivate Old Leads (SMS + Email + CRM Playbook)",
  subheadline:
    "The exact reactivation playbook we ship for HVAC, dental, veterinary, and trades operators — pulled directly from the Cassidy HVAC engagement.",
  answerParagraph:
    "Reactivating dormant leads is the single highest-ROI marketing activity for most service businesses, yet almost nobody does it systematically. The Cassidy HVAC reactivation engine Preisser Solutions built recovered over 60% of dormant patients within 6 weeks. The playbook: pull dormant records from the CRM (last service > 12 months, expired maintenance, missed annual tune-up), use an LLM to hyper-personalize each outreach message against the customer's actual service history, send via SMS first (60-70% reply rate) followed by email, route replies to a human for booking. Total build cost typically $6,000-$12,000 one-time plus $150-$400/month.",
  sections: [
    {
      eyebrow: "Why this works",
      heading: "Existing customers are 5x cheaper to win back",
      body: [
        "Industry-wide stat: it costs roughly 5-7x more to acquire a new customer than to reactivate an existing one. Most service businesses have hundreds or thousands of dormant records sitting in the CRM. Every one of those records represents customers who: already trust your brand, already know how you work, already exist in your service area, and are statistically much more likely to convert than cold inbound.",
        "The reason nobody does this systematically: it's tedious work without automation. Manually calling 500 dormant customers and remembering each one's service history isn't realistic. Which is exactly why a well-built reactivation engine has 60%+ response rates — you're doing what nobody else does.",
      ],
    },
    {
      eyebrow: "Step 1",
      heading: "Pull the dormant segment from your CRM",
      body: [
        "Define \"dormant\" for your business. Typical definitions:",
      ],
      bullets: [
        "HVAC / plumbing / electrical: last service > 12 months ago, no upcoming tune-up scheduled.",
        "Dental / veterinary: missed last 6-month checkup, no future appointment.",
        "Auto service: > 8 months since last service, no scheduled appointment.",
        "Landscaping: lapsed maintenance plan, last service > 9 months ago.",
        "Pest control: missed last quarterly treatment.",
      ],
    },
    {
      eyebrow: "Step 2",
      heading: "Personalize per record with an LLM",
      body: [
        "Generic blast = 5% reply rate. Hyper-personalized = 60%+. The difference is whether the message references the customer's actual history. An LLM reads each customer's record (last service date, equipment age, prior issues, location, service area weather) and drafts a message that sounds like a human who knows them.",
        "Example output for an HVAC dormant: \"Hi Susan — looking at our records, your AC tune-up was back in May 2024 and we haven't been out since. With summer coming and your unit at 11 years old, we'd hate for you to be the next AC-down call when we're already booked out two weeks. Want to grab a slot in the next two weeks? Reply YES and we'll send options.\"",
      ],
    },
    {
      eyebrow: "Step 3",
      heading: "SMS first, email second, voice third",
      body: [
        "Channel order matters. Don't blast all three at once — sequence them:",
      ],
      bullets: [
        "Day 1: SMS. Highest open rate (~95%), highest reply rate (~60-70%).",
        "Day 3: Email (only to non-responders). Lower open rate, but free.",
        "Day 7: Second SMS, different angle (offer, urgency, season change).",
        "Day 14: Voice call (only to non-responders with high lifetime value). Personal touch for the most valuable accounts.",
      ],
    },
    {
      eyebrow: "Step 4",
      heading: "Reply handling: AI drafts, human approves",
      body: [
        "When the customer replies, an AI classifies the response (yes/no/maybe/question/spam) and drafts a follow-up. A human reviews the draft and either approves it or modifies it before sending. This pattern works because: the AI handles the volume (every reply gets a thoughtful response), the human catches edge cases the AI would mishandle.",
      ],
    },
    {
      eyebrow: "Step 5",
      heading: "Hand off to dispatch / scheduling",
      body: [
        "When the customer says yes, the system creates a job/appointment in the dispatch or scheduling system automatically. No double-entry, no staff member retyping the info. The Cassidy HVAC engine integrated directly with their dispatch system — booking conversions flowed straight into operations with zero manual handoff.",
      ],
    },
    {
      eyebrow: "Results",
      heading: "What to expect",
      body: [
        "From the Cassidy HVAC engagement (HVAC dormant patient list, ~6 weeks of campaign runtime):",
      ],
      bullets: [
        "60%+ reactivation of dormant patients within 6 weeks.",
        "100% automation of reactivation outreach (no manual list working).",
        "10+ hours per week saved across office staff (previously sporadic manual work).",
        "45%+ increase in booking conversion rate (warm dormant leads convert better than cold inbound).",
        "Build cost paid back well within first 90 days.",
      ],
    },
  ],
  faq: [
    {
      question: "What CRM does this work with?",
      answer:
        "Any CRM with API access or CSV export. We've integrated with ServiceTitan, Housecall Pro, Jobber, FieldEdge, HubSpot, Salesforce, and several proprietary systems. If your CRM has data in it, we can read it.",
    },
    {
      question: "Won't customers feel spammed?",
      answer:
        "Not if the messages are genuinely personalized and the offer is real. The Cassidy HVAC campaign generated more thank-you replies than complaints. The reason: customers want to maintain their equipment / pets / cars — they just lose track of it. A timely, personalized nudge is genuinely useful.",
    },
    {
      question: "What about SMS regulations?",
      answer:
        "SMS to existing customers (with prior business relationship) is generally compliant under TCPA and CAN-SPAM, but every campaign should have clear opt-out (\"Reply STOP\") and respect opt-outs immediately. We build this in by default and handle compliance documentation in the build.",
    },
    {
      question: "How long does the build take?",
      answer:
        "Typically 4-6 weeks from kickoff to first campaign send. Faster if your CRM is well-organized and slower if data cleanup is required.",
    },
    {
      question: "What's the cost?",
      answer:
        "Build typically $6,000-$12,000 one-time depending on CRM integration complexity. Ongoing: $150-$400/month for SMS/email costs and maintenance. Payback period for most service businesses is under 90 days.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Cassidy HVAC",
    "Hays, Kansas",
    "ServiceTitan",
    "Housecall Pro",
    "Jobber",
    "Twilio",
  ],
  relatedLinks: [
    { label: "Customer reactivation engine", href: "/services/customer-reactivation" },
    { label: "AI customer service systems", href: "/services/ai-customer-service" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "AI customer reactivation campaigns", href: "/use-cases/ai-customer-reactivation-campaigns" },
    { label: "Automate customer follow-up", href: "/use-cases/automate-customer-follow-up" },
    { label: "Customer reactivation case study", href: "/case-studies/customer-reactivation" },
    { label: "Cassidy HVAC case study", href: "/case-studies/cassidy-hvac" },
    { label: "HVAC industry", href: "/industries/hvac" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want this built for your dormant list?",
  ctaSubcopy:
    "Free 30-minute call. We'll size your dormant segment, estimate the recoverable revenue, and quote a fixed price.",
};
