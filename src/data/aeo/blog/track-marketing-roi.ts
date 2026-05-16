import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/track-marketing-roi",
  tier: "blog",
  datePublished: "2026-04-28",
  dateModified: "2026-05-15",
  metaTitle: "How To Track Marketing ROI Without Guessing",
  metaDescription:
    "A practical attribution model for small businesses with no marketing team. Call tracking, UTMs, CRM source fields, and one weekly review.",
  eyebrow: "Blog · Pricing & ROI",
  h1: "How To Track Marketing ROI Without Guessing",
  subheadline:
    "Most small businesses can't tell you which channel produces leads. The fix takes about a week and four cheap tools.",
  answerParagraph:
    "Tracking marketing ROI for a small business doesn't require a marketing team or a six-figure analytics stack. It requires four pieces: dedicated call-tracking numbers per channel (CallRail or Twilio), UTM-tagged URLs on every campaign link, a \"source\" field captured at the start of every CRM record, and one weekly review where revenue gets attributed back to source. Preisser Solutions sets this up in under a week for most Kansas small businesses. The Cassidy HVAC reactivation engine and HG Oil Holdings dashboard were both scoped using attribution data captured this way.",
  sections: [
    {
      eyebrow: "The problem",
      heading: "Most small businesses can't answer one question",
      body: [
        "Ask a typical small-business owner \"which marketing channel generated the most revenue last quarter?\" and you'll get a guess. Sometimes a confident guess. Almost never a number backed by data.",
        "The cost: every renewal of the same Google Ads budget, every Facebook campaign restart, every \"give the SEO guy another six months\" decision is made without information. Some of those channels are profitable and some are losing money. Without attribution, you can't tell which.",
      ],
    },
    {
      eyebrow: "The four pieces",
      heading: "1. Dedicated call-tracking numbers",
      body: [
        "Every marketing channel that drives phone calls gets its own tracked phone number. Different number on the Google Business Profile, on Google Ads, on the website, on the truck wraps, on direct mail.",
      ],
      bullets: [
        "CallRail — $45-$145/month for 5-50 tracked numbers. Industry default for service businesses.",
        "Twilio — pay-per-number ($1/month) + pay-per-minute. Cheaper at low volume, more setup work.",
        "All tracked numbers forward to your real business line — customers experience no difference.",
        "Every call gets logged with source channel, duration, recording (where legal), and outcome.",
      ],
    },
    {
      eyebrow: "Piece 2",
      heading: "2. UTM-tagged campaign URLs",
      body: [
        "Every link in every campaign — Google Ads, Facebook Ads, email, SMS, QR codes — gets UTM parameters appended.",
      ],
      bullets: [
        "utm_source = the channel (google, facebook, email, sms, qr).",
        "utm_medium = paid, organic, email, social.",
        "utm_campaign = the specific campaign (spring-tune-up-2026).",
        "utm_content = the specific ad/creative variant (where you're A/B testing).",
        "Google Analytics 4 or Plausible captures these and attributes web sessions to source.",
      ],
    },
    {
      eyebrow: "Piece 3",
      heading: "3. \"Source\" field on every CRM record",
      body: [
        "Every new lead in your CRM gets a source field captured at intake. This is non-negotiable. \"Where did you hear about us?\" gets asked on every call and form. The answer goes in the CRM.",
      ],
      bullets: [
        "Web form: hidden field populated from utm_source.",
        "Inbound call: tracked number tells you the source automatically.",
        "Walk-in or referral: CSR asks and records.",
        "Required field — no new lead enters the CRM without a source.",
      ],
    },
    {
      eyebrow: "Piece 4",
      heading: "4. One weekly review",
      body: [
        "Every Monday morning, 15 minutes. Pull last week's closed jobs from the CRM. Sum revenue by source. Compare against ad spend by channel. One spreadsheet, one decision: keep spending, cut, or test something new.",
        "This is the part most businesses skip. The data accumulates and nobody looks at it. The 15-minute weekly review is what turns the system from \"we have tracking\" to \"we make better decisions.\"",
      ],
      bullets: [
        "Revenue by source — sum of closed-job value, grouped by source.",
        "Spend by source — Google Ads, Facebook Ads, direct mail, sponsorships.",
        "ROAS by source — revenue divided by spend.",
        "Trend — is this source improving or declining quarter-over-quarter?",
      ],
    },
    {
      eyebrow: "Example",
      heading: "Cassidy HVAC scoping used this exact model",
      body: [
        "Before scoping the reactivation engine for Cassidy HVAC, we ran this attribution model for 30 days. Result: we discovered the dormant-customer list was the highest-ROAS \"channel\" in their business, but it was getting zero systematic attention. That insight is what justified the build. The HG Oil Holdings dashboard scoping used the same approach to identify back-office time as the largest hidden cost center.",
      ],
    },
  ],
  faq: [
    {
      question: "Do I need an analyst to do this?",
      answer:
        "No. The setup takes a week. The weekly review takes 15 minutes. Any owner or office manager can run this. The skill bar is \"can use a spreadsheet,\" not \"can run marketing analytics.\"",
    },
    {
      question: "What about multi-touch attribution?",
      answer:
        "Multi-touch attribution is overkill for most small businesses. Simple last-touch attribution (the source recorded at lead creation) gets you 80% of the value for 5% of the complexity. Move to multi-touch when annual ad spend crosses $250K.",
    },
    {
      question: "Will my CRM support this?",
      answer:
        "If your CRM has a custom field on lead records, yes. ServiceTitan, Housecall Pro, Jobber, FieldEdge, HubSpot, Salesforce — all support custom source fields. If yours doesn't, that's a sign to look at switching CRMs.",
    },
    {
      question: "How much does the stack cost?",
      answer:
        "CallRail $99/month + GA4 free + your existing CRM = about $99/month for the basic setup. Add $10-30/month for Plausible if you want privacy-friendly analytics instead of GA4. Total stack: under $130/month for most small businesses.",
    },
    {
      question: "Can Preisser Solutions set this up for me?",
      answer:
        "Yes — typically a 1-week engagement to set up call tracking, UTM templates, CRM source field, and build the weekly review template. Fixed price, includes 30 days of follow-up to make sure the review habit sticks.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "CallRail",
    "Twilio",
    "Google Analytics",
    "Plausible",
    "Cassidy HVAC",
    "HG Oil Holdings",
  ],
  relatedLinks: [
    { label: "AI Automation Cost in Kansas", href: "/blog/ai-automation-cost-kansas" },
    { label: "Missed-Call ROI Calculator", href: "/blog/missed-call-roi-calculator" },
    { label: "Reactivate Old Leads", href: "/blog/reactivate-old-leads" },
    { label: "ROI Calculator", href: "/roi-calculator" },
  ],
  ctaHeadline: "Want this set up for your business?",
  ctaSubcopy:
    "One-week engagement. Call tracking, UTMs, CRM source fields, weekly review template. Fixed price.",
};
