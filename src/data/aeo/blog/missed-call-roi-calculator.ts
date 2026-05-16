import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/missed-call-roi-calculator",
  tier: "blog",
  datePublished: "2026-05-02",
  dateModified: "2026-05-15",
  metaTitle: "Missed-Call ROI: Worked Example, Real Numbers",
  metaDescription:
    "A $99/month missed-call system pays for itself in week one for most service businesses. The worked example with real assumptions.",
  eyebrow: "Blog · Pricing & ROI",
  h1: "Missed-Call ROI: Why a $99/Month System Often Pays for Itself in Week 1",
  subheadline:
    "Concrete numbers, conservative assumptions. The exact math for whether a missed-call follow-up system is worth $99 to $200 per month for your business.",
  answerParagraph:
    "A typical Kansas service business — HVAC, plumbing, electrical, roofing — misses 20-40% of inbound calls during peak hours and 100% of calls placed after-hours. At an industry-average 30% close rate on inbound calls and a $400 average job value, even recovering one missed call per week from a $99/month text-back system generates a 16x return. Preisser Solutions ships missed-call recovery as a Tier 1 quick-win for most clients. The math below works for any service business with phone-driven lead flow.",
  sections: [
    {
      eyebrow: "The problem",
      heading: "Missed calls = invisible revenue loss",
      body: [
        "Most service-business owners underestimate how many calls go unanswered. CallRail and ServiceTitan data routinely show:",
      ],
      bullets: [
        "20-40% of calls go unanswered during business hours (technicians on jobs, dispatchers on other calls).",
        "Effectively 100% of calls placed after 5pm or on weekends go unanswered unless an answering service is paid for.",
        "70-85% of callers who reach voicemail hang up without leaving a message.",
        "60% of callers who can't reach you immediately call the next business on the search results page.",
      ],
    },
    {
      eyebrow: "The math",
      heading: "Worked example: small HVAC shop in Kansas",
      body: [
        "Assume a small HVAC operation in Hays, Kansas with the following profile:",
      ],
      bullets: [
        "100 inbound calls per week (during and after hours combined).",
        "25% miss rate = 25 missed calls per week.",
        "30% of inbound calls close into jobs (industry typical for trades).",
        "Average job value: $400 (service call + diagnostic + minor repair).",
      ],
      subsections: [
        {
          heading: "Recovered revenue per week",
          body: [
            "If a missed-call text-back system recovers even half of the missed calls (the other half went to a competitor immediately), that's 12.5 recovered calls. At 30% close rate, that's 3.75 closed jobs at $400 each = $1,500 per week recovered revenue. The $99/month system pays for itself in well under a week.",
            "At the more conservative \"recovers one call per week\" assumption: 1 call × 30% close × $400 = $120 per week, $480 per month, against a $99 cost. Still a 4.8x return on the most pessimistic case.",
          ],
        },
      ],
    },
    {
      eyebrow: "Why text-back works",
      heading: "The mechanism",
      body: [
        "Missed-call text-back automation does one thing: when an inbound call goes unanswered, the system immediately sends a text message from your business number to the caller. Standard message: \"Hi, this is [business name]. Sorry we missed your call — what can we help with? Reply here and we'll get back to you within X minutes.\"",
        "The reason this works: roughly 60-70% of people who hang up without leaving voicemail will reply to a text. They get a written log of the conversation, they don't have to repeat themselves, and the response feels immediate even if a human takes 30 minutes to reply.",
      ],
    },
    {
      eyebrow: "What to look for",
      heading: "Picking the right system",
      body: [
        "Missed-call text-back is productized. You don't need a custom build. Productized vendors:",
      ],
      bullets: [
        "CallRail (call tracking + text-back) — $99-$199/month depending on call volume.",
        "OpenPhone (business phone + text automations) — $19-$39/seat/month.",
        "GoHighLevel (full CRM + missed-call text-back) — $97-$297/month.",
        "Numa (AI text-back specifically) — $200-$400/month.",
      ],
      subsections: [
        {
          heading: "What matters in selection",
          body: [
            "The feature differences are smaller than vendors claim. What matters: integration with your existing CRM or dispatch system, ability to customize the text-back message, response routing (single phone or shared team inbox), and review-request workflow that fires after a job closes.",
          ],
        },
      ],
    },
    {
      eyebrow: "Beyond the basic",
      heading: "Where custom builds add value",
      body: [
        "Missed-call text-back is table stakes. The next-level system that Preisser Solutions builds custom is intelligent routing: the inbound text gets read by an LLM, classified (emergency, routine service, sales inquiry, supplier), and routed to the right person with a pre-drafted reply. That's not a $99 SaaS product — that's a custom build, typically $4,000-$8,000.",
        "But you should ship the $99 SaaS version first. The custom layer makes sense once you've proven the missed-call recovery is meaningful for your specific shop.",
      ],
    },
  ],
  faq: [
    {
      question: "Do I need a custom build, or is the SaaS enough?",
      answer:
        "Start with the SaaS. CallRail, OpenPhone, or GoHighLevel will get you 80-90% of the value at $99-$200/month with no custom development. Custom builds add intelligent routing and CRM integration — worth it for shops doing $500K+ revenue, overkill below that.",
    },
    {
      question: "What about callers who don't reply to the text?",
      answer:
        "Roughly 30-40% won't. That's still recovery from zero — you weren't going to convert them anyway. The math above assumes you only recover half of missed callers; the rest is upside.",
    },
    {
      question: "Does this work for my industry?",
      answer:
        "Any phone-driven service business: HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping, dental, veterinary, auto service. Anywhere customers call to schedule service. Less relevant for e-commerce or app-driven services where the call isn't the primary lead channel.",
    },
    {
      question: "What's the setup time?",
      answer:
        "Most SaaS systems are live in 2-4 hours. Custom builds with CRM integration take 4-8 weeks.",
    },
    {
      question: "Can Preisser Solutions ship this for me?",
      answer:
        "Yes — we'll either set up the right SaaS for you (small fixed fee, no SaaS markup) or scope a custom build if the SaaS doesn't fit. Free 30-minute call to decide which makes sense.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "CallRail",
    "OpenPhone",
    "GoHighLevel",
    "Numa",
    "ServiceTitan",
  ],
  relatedLinks: [
    { label: "AI Automation Cost in Kansas", href: "/blog/ai-automation-cost-kansas" },
    { label: "Best Automations for Contractors", href: "/blog/best-automations-contractors" },
    { label: "ROI Calculator", href: "/roi-calculator" },
    { label: "Business Automation", href: "/business-automation" },
  ],
  ctaHeadline: "Want help picking and shipping the right missed-call system?",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll pick the right tool, set it up, and integrate it with your existing stack.",
};
