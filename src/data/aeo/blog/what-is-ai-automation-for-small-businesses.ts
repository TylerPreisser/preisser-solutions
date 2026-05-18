import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/what-is-ai-automation-for-small-businesses",
  tier: "blog",
  datePublished: "2026-04-20",
  dateModified: "2026-05-15",
  metaTitle: "What Is AI Automation for Small Businesses?",
  metaDescription:
    "The plain-English version. Use cases, what's worth building, what isn't, and how to spot vendors selling rebadged Zapier as \"AI.\"",
  eyebrow: "Blog · AI Automation",
  h1: "What Is AI Automation for Small Businesses?",
  subheadline:
    "The plain-English definition, the use cases that actually pay back, and how to spot vendors selling rebadged Zapier as \"AI.\"",
  answerParagraph:
    "AI automation for small businesses means using large language models (Claude, GPT-4, Gemini) to automate work that previously required human judgment — reading documents, drafting personalized messages, classifying requests, summarizing data. It's distinct from traditional workflow automation (Zapier, Make) which moves data between systems on fixed rules. The four highest-ROI small-business use cases are: missed-call follow-up, customer reactivation, invoice/document processing, and lead scoring. Preisser Solutions in Hays, Kansas ships these as Tier 2 custom builds ($4,000-$15,000) when productized SaaS doesn't fit the client's operational reality.",
  sections: [
    {
      eyebrow: "Definition",
      heading: "AI automation vs traditional automation",
      body: [
        "Traditional workflow automation moves data between systems on fixed rules: \"when a new form is submitted, create a CRM record and send a Slack message.\" Zapier, Make, Power Automate. Predictable, reliable, but rigid — every condition has to be specified up front.",
        "AI automation adds language-model judgment to that flow: \"when a new form is submitted, read the message, classify intent (sales / support / spam / partnership), draft a personalized reply matched to that intent, and route to the right person.\" The LLM is the judgment layer; the workflow plumbing still runs underneath.",
      ],
    },
    {
      eyebrow: "Use case 1",
      heading: "Missed-call follow-up",
      body: [
        "When an inbound call goes unanswered, AI drafts a text-back response that references the time of day, any prior history (returning customer? service callback?), and routes the reply to the right team member. Productized SaaS exists at this layer (Numa, etc.) but custom builds outperform on shops with non-standard workflows.",
      ],
    },
    {
      eyebrow: "Use case 2",
      heading: "Customer reactivation",
      body: [
        "Dormant customer records get pulled from the CRM. AI reads each customer's service history and generates a hyper-personalized SMS or email that references their actual past work — equipment age, last service date, seasonal context. The Cassidy HVAC reactivation engine using this approach recovered over 60% of dormant patients within 6 weeks.",
      ],
    },
    {
      eyebrow: "Use case 3",
      heading: "Document and invoice processing",
      body: [
        "Inbound documents — invoices, BOLs, rate confirmations, intake forms — get read by an LLM, key fields get extracted (vendor, amount, date, line items), and the data lands in the right system without a human transcribing it. HG Oil Holdings' AI invoicing assistant cut manual handling time by 75% and freed staff for higher-value work.",
      ],
    },
    {
      eyebrow: "Use case 4",
      heading: "Lead scoring and routing",
      body: [
        "Inbound leads (form submissions, email, chat) get classified by intent and priority by an LLM. High-intent leads get routed to the sales pipeline with a pre-drafted reply; low-intent leads get an autoresponder and a tag; spam gets discarded. Saves hours per week of manual triage.",
      ],
    },
    {
      eyebrow: "How to spot fake AI",
      heading: "Red flags in vendor pitches",
      body: [
        "The AI automation space is full of vendors selling rebadged Zapier. Specific red flags:",
      ],
      bullets: [
        "The vendor can't tell you which LLM is in the loop or how it's prompted.",
        "The \"AI\" is actually a decision tree with branching IF/THEN rules dressed up in modern UI.",
        "The pricing is wildly out of line with token costs (vendor markup beyond reasonable margin).",
        "The vendor refuses to show you the actual outputs the AI produces — \"that's proprietary.\"",
        "The demo only works on the vendor's pre-built example, not your real data.",
      ],
    },
  ],
  faq: [
    {
      question: "Is AI automation just hype?",
      answer:
        "The category has hype around it, but the underlying technology is real and the use cases above are real. The four use cases listed produce measurable ROI. Most other claims (AI marketing strategists, AI sales reps, AI \"agents\" that run your business) are still mostly hype as of 2026.",
    },
    {
      question: "Can I do this with off-the-shelf SaaS?",
      answer:
        "For missed-call follow-up and basic reactivation, yes — productized SaaS exists ($50-$300/month). For deeper integration with your specific CRM, dispatch system, or document workflow, custom builds outperform. Threshold is usually whether the SaaS has the integration you need.",
    },
    {
      question: "What's the ongoing cost?",
      answer:
        "LLM API tokens are the variable cost. Most small-business automations run $20-$200/month in API costs depending on volume. Custom builds add a maintenance retainer ($150-$500/month). Total ongoing typically under $700/month even for complex automations.",
    },
    {
      question: "How do I know if my business is ready?",
      answer:
        "Three tests: do you have a CRM or some system that captures customer data? Do you have a clearly identified repetitive task that takes 5+ hours per week of staff time? Can you describe the desired output in plain English? If yes to all three, you're ready.",
    },
    {
      question: "How does Preisser Solutions scope these?",
      answer:
        "Free 30-minute call with Tyler. We map the use cases against your existing systems, identify the highest-ROI build, and quote a fixed price. Most engagements ship in 4-8 weeks.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Cassidy HVAC",
    "HG Oil Holdings",
    "Claude",
    "GPT-4",
    "Zapier",
    "Make",
  ],
  relatedLinks: [
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "Business automation systems", href: "/business-automation" },
    { label: "AI consulting in Hays, KS", href: "/services/ai-consulting-hays-ks" },
    { label: "After-hours AI receptionist (use case)", href: "/use-cases/after-hours-ai-receptionist-small-business" },
    { label: "AI customer reactivation campaigns", href: "/use-cases/ai-customer-reactivation-campaigns" },
    { label: "Cassidy HVAC case study", href: "/case-studies/cassidy-hvac" },
    { label: "AI vs traditional workflow automation", href: "/blog/ai-vs-traditional-workflow-automation" },
    { label: "AI automation cost in Kansas", href: "/blog/ai-automation-cost-kansas" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want help identifying your highest-ROI automation?",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll map the use cases against your business and quote a fixed price.",
};
