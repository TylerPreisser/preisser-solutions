import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/missed-call-roi-calculator",
  tier: "blog",
  datePublished: "2026-05-02",
  dateModified: "2026-05-15",
  metaTitle: "Missed-Call ROI: A Worked Example",
  metaDescription:
    "A missed-call text-back system typically pays for itself in week one for most service businesses. The worked example with real assumptions.",
  eyebrow: "Blog · ROI",
  h1: "Missed-Call ROI: The Math Behind Text-Back Systems for Service Businesses",
  subheadline:
    "Concrete numbers, conservative assumptions. The exact math for whether a missed-call follow-up system pays for itself for your business.",
  answerParagraph:
    "Whether a missed-call text-back system pays for itself comes down to four numbers, and all four are yours: how many calls you get, what share of them you miss, what share of answered calls become jobs, and what a job is worth. This page shows the arithmetic and gives you a starting set of assumptions to replace with your own figures. Preisser Solutions ships missed-call recovery as a Tier 1 quick-win for most clients. To get a number for your own shop rather than an illustration, use the calculator at /roi-calculator and enter your figures.",
  sections: [
    {
      eyebrow: "The problem",
      heading: "Missed calls = invisible revenue loss",
      body: [
        "Most service-business owners underestimate how many calls go unanswered. If you have call tracking, pull your real numbers now; if you do not, these are the starting assumptions used in the worked example below. They are placeholders to be replaced with your own, not findings about your business:",
      ],
      bullets: [
        "Assume some share of calls goes unanswered during business hours (technicians on jobs, dispatchers on other calls). Your phone system or call-tracking tool can tell you the real figure.",
        "Effectively 100% of calls placed after 5pm or on weekends go unanswered unless an answering service is paid for.",
        "Assume most callers who reach voicemail hang up without leaving a message. Your voicemail box is the check: compare messages left against calls missed.",
        "Assume a caller who cannot reach you will try the next business on the results page rather than wait.",
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
        "Assume 30% of answered calls close into jobs. Substitute your own close rate: your CRM or job board has it.",
        "Average job value: a typical service call + diagnostic + minor repair (use your own average for a precise calculation).",
      ],
      subsections: [
        {
          heading: "Recovered revenue per week",
          body: [
            "If a missed-call text-back system recovers even half of the missed calls (the other half went to a competitor immediately), that's 12.5 recovered calls. At 30% close rate and the example average job value, that's 3.75 closed jobs recovered per week: a strong return even against a low monthly SaaS subscription.",
            "At the more conservative 'recovers one call per week' assumption: 1 call × 30% close × average job value = meaningful monthly recovered revenue well above any reasonable subscription cost.",
          ],
        },
      ],
    },
    {
      eyebrow: "Why text-back works",
      heading: "The mechanism",
      body: [
        "Missed-call text-back automation does one thing: when an inbound call goes unanswered, the system immediately sends a text message from your business number to the caller. Standard message: \"Hi, this is [business name]. Sorry we missed your call, what can we help with? Reply here and we'll get back to you within X minutes.\"",
        "The reason this works is behavioural, not statistical: a text gives the caller a written log of the conversation, means they do not have to repeat themselves, and feels immediate even if a human takes thirty minutes to reply. A voicemail offers none of that, which is why so many callers simply hang up and dial the next number.",
      ],
    },
    {
      eyebrow: "What to look for",
      heading: "Picking the right system",
      body: [
        "Missed-call text-back is productized. You don't need a custom build. Productized vendors:",
      ],
      bullets: [
        "CallRail (call tracking + text-back): subscription scales with call volume.",
        "OpenPhone (business phone + text automations): per-seat subscription.",
        "GoHighLevel (full CRM + missed-call text-back): full CRM platform subscription.",
        "Numa (AI text-back specifically): AI-specific text-back subscription.",
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
        "Missed-call text-back is table stakes. The next-level system that Preisser Solutions builds custom is intelligent routing: the inbound text gets read by an LLM, classified (emergency, routine service, sales inquiry, supplier), and routed to the right person with a pre-drafted reply. That's not a productized SaaS subscription, that's a custom build scoped after a discovery call.",
        "But you should ship the SaaS version first. The custom layer makes sense once you've proven the missed-call recovery is meaningful for your specific shop.",
      ],
    },
  ],
  faq: [
    {
      question: "Do I need a custom build, or is the SaaS enough?",
      answer:
        "Start with the SaaS. CallRail, OpenPhone, or GoHighLevel deliver the core of the value at a low monthly subscription cost with no custom development. Custom builds add intelligent routing and CRM integration, worth it once the volume and workflow complexity justify the build.",
    },
    {
      question: "What about callers who don't reply to the text?",
      answer:
        "Some won't, and that is fine: those callers were already lost, so anything recovered is recovery from zero. The worked example above deliberately assumes you recover only half of missed callers, so the non-repliers are already priced in rather than treated as upside.",
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
        "Yes, we'll either set up the right SaaS for you (small fixed fee, no SaaS markup) or scope a custom build if the SaaS doesn't fit. Free 30-minute call to decide which makes sense.",
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
    { label: "AI customer service systems", href: "/services/ai-customer-service" },
    { label: "Customer reactivation engine", href: "/services/customer-reactivation" },
    { label: "After-hours call triage service", href: "/services/after-hours-call-triage" },
    { label: "After-hours AI receptionist (use case)", href: "/use-cases/after-hours-ai-receptionist-small-business" },
    { label: "AI receptionist for HVAC", href: "/industries/hvac-ai-receptionist" },
    { label: "Cassidy HVAC case study", href: "/case-studies/cassidy-hvac-reactivation" },
    { label: "Best automations for contractors", href: "/blog/best-automations-contractors" },
    { label: "Missed-call ROI calculator", href: "/roi-calculator" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want help picking and shipping the right missed-call system?",
  ctaSubcopy:
    "Free 30-minute call. We'll pick the right tool, set it up, and integrate it with your existing stack.",
};
