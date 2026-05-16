import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/lead-tracking-website-google-ads
 *
 * Target query: "how to track leads from website and ads". Covers website,
 * Google Ads, calls, forms, CRM lead tracking for small businesses.
 */
export const pageData: AeoPageData = {
  slug: "use-cases/lead-tracking-website-google-ads",
  tier: "service_detail",
  metaTitle: "Track Leads from Website and Google Ads",
  metaDescription:
    "Preisser Solutions builds lead tracking systems that connect your website, Google Ads, calls, forms, CRM, and reports so you can see what is actually working.",
  eyebrow: "Track Leads from Website and Google Ads",
  h1: "Lead Tracking for Websites, Google Ads, Calls, and Forms",
  subheadline:
    "Most small businesses cannot answer which ad, page, or campaign produced last week's customers. A real lead tracking system fixes that.",
  answerParagraph:
    "If you have asked how to track leads from website and ads, the answer is a connected lead tracking system — not a single tool. Preisser Solutions builds lead tracking systems for small businesses that tie together your website, Google Ads, Google Analytics, call tracking, form submissions, CRM, and reporting dashboard. The result is one place where you can see which ad, page, or campaign produced each lead and how many of those leads became customers. No more guessing which marketing dollars actually worked.",
  sections: [
    {
      eyebrow: "You cannot improve what you cannot track",
      heading: "You cannot improve what you cannot track",
      body: [
        "Ask most small business owners which of their marketing channels produced last month's revenue, and the answer is usually a guess. The owner knows leads came in. They know they ran Google Ads. They might know the form on the website got submissions. But the line from any specific ad or page to any specific paying customer is missing.",
        "The cost of that gap is real. Without lead tracking, marketing dollars get spread across whatever the agency or the platform recommends, with no way to verify return. Owners stop trusting the numbers and start running marketing on gut feel. Underperforming campaigns keep running for months because nothing kills them. High-performing campaigns get under-funded because nothing flags them.",
        "Lead tracking, done correctly, gives you an honest accounting of where revenue actually comes from. It is rarely flattering at first — most owners discover that one or two channels are doing most of the work, and a few they were proud of are doing very little. That is exactly the information you need to make better decisions.",
      ],
    },
    {
      eyebrow: "Sources that need tracking",
      heading: "Calls, forms, ads, and CRM events worth tracking",
      body: [
        "A complete lead tracking system covers every way a lead can enter your business and ties each lead back to its source. The standard list of what gets wired in:",
      ],
      bullets: [
        "Google Ads — every click, conversion, and assisted conversion tied to ad and keyword",
        "Organic search — landing page, search query (where available), and entry behavior",
        "Direct and referral traffic — separated cleanly so direct is not getting credit for paid",
        "Website forms — every submission tagged with source, campaign, page, and timestamp",
        "Phone calls — call tracking numbers per channel so paid calls do not blend into organic calls",
        "Chat or chatbot — every conversation tied to source and outcome",
        "CRM events — lead stage changes, won/lost outcomes, and revenue values written back so reports show closed revenue, not just leads",
        "Offline conversions — phone bookings and in-person walk-ins pushed back into Google Ads for better ad optimization",
      ],
    },
    {
      eyebrow: "What should show up in the dashboard",
      heading: "What should actually show up in your lead tracking dashboard",
      body: [
        "A lead tracking dashboard should answer a small number of practical questions. If it cannot answer these, it is not earning its keep.",
      ],
      bullets: [
        "How many leads came in last week, last month, and year-to-date, by source",
        "What did each lead cost — by channel, by campaign, by keyword where possible",
        "How many of those leads became paying customers and how much revenue they produced",
        "Which channels are net positive after media spend, and which are not",
        "Which landing pages and forms are converting and which are leaking",
        "Which Google Ads campaigns are producing real customers and which are producing tire-kickers",
        "Trend over time — is your lead flow growing or shrinking, and where is the movement coming from",
      ],
    },
    {
      eyebrow: "Common mistakes",
      heading: "Common lead tracking mistakes we see",
      body: [
        "The most common patterns that produce bad lead tracking — and the way Preisser Solutions avoids them on every build.",
      ],
      bullets: [
        "Counting clicks instead of leads — clicks are not customers; the dashboard reports leads and closed revenue",
        "Tracking only forms, not calls — service businesses get most leads by phone; a forms-only system misses the majority",
        "No CRM writeback — leads get counted at intake but never updated when they win or lose, so reports show top-of-funnel only",
        "Untagged campaigns — UTM parameters missing on ads, social posts, or email so the source is unknown",
        "GA4 only — Google Analytics is one input, not the whole picture; revenue, calls, and CRM events have to be there too",
        "Set-and-forget — a dashboard nobody opens is worth nothing; the team needs a weekly cadence and someone responsible for reviewing it",
      ],
    },
    {
      eyebrow: "How we ship lead tracking",
      heading: "How Preisser Solutions ships lead tracking systems",
      body: [
        "Lead tracking projects follow the same structure as every other Preisser Solutions build.",
      ],
      bullets: [
        "Scoping — Tyler reviews your current channels, ad spend, CRM, and what you actually need to be able to answer",
        "Audit — what tracking is in place today, what is broken, and what is missing",
        "Build — call tracking, form tracking, GA4 events, CRM writeback, dashboard — all connected so the same lead is one row, not five",
        "Validation — test leads run through every channel to confirm the system records them correctly",
        "Handoff — dashboard access, documentation, and training for the team that will use it",
        "Ongoing — optional support to keep the system tuned as you add channels or change campaigns",
      ],
    },
  ],
  faq: [
    {
      question: "How is this different from just using GA4 or Google Ads reporting?",
      answer:
        "GA4 and Google Ads each give you one slice of the picture. They do not connect to your CRM, they do not record phone calls reliably, and they do not show closed revenue. A lead tracking system ties all of those together so one lead appears as one row, with source, cost, status, and revenue in one place.",
    },
    {
      question: "Do I need to switch CRMs to get lead tracking?",
      answer:
        "No. We connect lead tracking to whatever CRM you use — HubSpot, Salesforce, Pipedrive, Zoho, ServiceTitan, Housecall Pro, Jobber, or custom. Switching CRMs is rarely the right call.",
    },
    {
      question: "Can you track phone calls from Google Ads?",
      answer:
        "Yes. We install call tracking numbers per channel and per campaign so you can see which ad produced which call, including whether it converted. Calls are pushed back into Google Ads as conversions so ad optimization improves over time.",
    },
    {
      question: "How long does it take to set up lead tracking?",
      answer:
        "Most lead tracking systems ship in four to eight weeks from kickoff, depending on how many channels and tools need to be wired in. The first 30 days of live operation include a validation period where we run test leads through every channel to confirm the data is accurate.",
    },
    {
      question: "How much does lead tracking cost?",
      answer:
        "Pricing is fixed up front and scoped per project. A small first build typically lands in the low five figures. Call tracking and analytics platforms add modest monthly costs. Most owners find the system pays for itself in the first quarter just from killing underperforming ad spend.",
    },
    {
      question: "What if my Google Ads are run by an agency?",
      answer:
        "That is fine. We build the tracking layer that connects what the agency runs to what your business actually closes. Most agencies appreciate having better closed-loop data because it makes their work easier to defend.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Google Ads",
    "Google Analytics",
    "GA4",
    "HubSpot",
    "Salesforce",
    "ServiceTitan",
  ],
  relatedLinks: [
    { label: "Digital Marketing in Hays, KS", href: "/services/digital-marketing-hays-ks" },
    { label: "Google Ads + Local SEO for Service Businesses", href: "/services/google-ads-local-seo-service-business" },
    { label: "Integrations", href: "/integrations" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Find out which of your marketing dollars actually work",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll audit your current tracking, identify the biggest gaps, and send a fixed-price proposal for a lead tracking system you can actually trust.",
};
