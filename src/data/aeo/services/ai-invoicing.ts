import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "services/ai-invoicing",
  tier: "service_detail",
  metaTitle: "AI Invoicing Automation in Kansas | Preisser Tech",
  metaDescription:
    "Preisser Tech builds AI-powered invoice extraction and structuring systems. The HG Oil Holdings build delivered 75% reduction in manual invoice handling.",
  eyebrow: "AI Invoicing Automation",
  h1: "AI That Extracts and Structures Invoices Instantly",
  subheadline:
    "Stop having office staff manually read and enter invoices. Custom AI invoice automation processes them in seconds.",
  answerParagraph:
    "Preisser Tech builds AI-powered invoice extraction and structuring systems for Kansas businesses — the productized version of the HG Oil Holdings AI invoicing case study, which delivered a 75% decrease in manual invoice handling time. Office staff upload invoices, and the AI returns structured data (vendor, line items, amounts, GL coding) in seconds. The system integrates with QuickBooks, accounting platforms, and ERP systems to eliminate manual data entry entirely. Founded by Tyler Preisser in Hays, Kansas.",
  sections: [
    {
      eyebrow: "The HG Oil Holdings case study",
      heading: "What the AI invoicing build actually looks like",
      body: [
        "HG Oil Holdings came to Preisser Tech with a back-office bottleneck — office staff manually reading invoices, transcribing amounts, coding GL accounts, and entering line items into accounting software. The volume meant invoices were sitting unprocessed for days, AR was aging, and adding more office staff was the only obvious answer.",
        "Preisser Tech trained a custom AI assistant to extract and analyze invoice data instantly. Office staff upload invoices and receive structured output in seconds. Result: 75% decrease in time spent on manual invoice handling, eliminated manual reading entirely, freed staff for higher-value work, and prevented the need for additional hires.",
      ],
    },
    {
      eyebrow: "What AI invoicing actually does",
      heading: "How the system works",
      body: [
        "The AI invoicing system handles the predictable but tedious parts of AP processing:",
      ],
      bullets: [
        "Accepts uploaded invoices (PDF, JPG, scan)",
        "Extracts vendor name, address, invoice number, date, due date, line items, totals, tax",
        "Identifies GL codes based on vendor and line item patterns",
        "Flags duplicates against historical invoice database",
        "Validates totals match line items (math errors flagged for human review)",
        "Pushes structured data to QuickBooks Online, QuickBooks Desktop, or your accounting system",
        "Routes to the right approver based on amount thresholds and vendor categories",
        "Tracks approval and payment status",
        "Generates monthly reports on AP aging, vendor spend, and processing time",
      ],
    },
    {
      eyebrow: "When AI invoicing makes sense",
      heading: "Who benefits most",
      body: [
        "AI invoicing has the highest ROI in businesses that:",
      ],
      bullets: [
        "Process 50+ invoices per month",
        "Have 2+ office staff spending significant time on AP",
        "Receive invoices in inconsistent formats from many vendors",
        "Need accurate GL coding (not just data entry)",
        "Work with vendors that send paper or PDF invoices, not EDI",
        "Have AR aging issues that trace back to AP processing time",
        "Are considering hiring additional office staff",
      ],
    },
    {
      eyebrow: "Why custom beats off-the-shelf",
      heading: "AI invoicing tools vs. custom AI invoicing",
      body: [
        "Off-the-shelf AI invoicing tools exist (Bill.com, Stampli, Tipalti, AvidXchange). They work for businesses that fit standard AP patterns. Custom AI invoicing makes sense when:",
      ],
      bullets: [
        "Your vendor mix is unusual or industry-specific",
        "Per-invoice or per-user fees exceed custom build costs over 2-3 years",
        "GL coding logic is more complex than off-the-shelf tools handle",
        "You need integration with non-standard accounting or ERP systems",
        "You want the data and logic to live in your own system, not a vendor's SaaS",
      ],
    },
  ],
  faq: [
    {
      question: "How accurate is AI invoice extraction?",
      answer:
        "Modern AI extraction is 95%+ accurate on standard fields (vendor, amounts, dates) and 85-95% on GL coding when properly trained on your vendor history. We always design human-in-the-loop validation for edge cases — humans review flagged invoices, AI handles the standard ones.",
    },
    {
      question: "Why not use Bill.com or Stampli?",
      answer:
        "If your AP fits Bill.com or Stampli, use them — they work fine. Custom AI invoicing makes sense when your vendor mix is unusual, per-invoice fees exceed custom build costs, or your GL coding logic is more complex than off-the-shelf handles. We'll tell you honestly which side you're on.",
    },
    {
      question: "How much does AI invoicing automation cost?",
      answer:
        "Custom AI invoicing builds typically run in the mid-five figures depending on integration complexity. The HG Oil Holdings build delivered 75% reduction in manual processing time — payback periods are usually under 12 months. Fixed-price proposal after a free discovery call.",
    },
    {
      question: "How long does the build take?",
      answer:
        "Most AI invoicing builds deliver in 8-12 weeks. Core extraction and accounting integration ship first; advanced features (vendor-specific coding rules, approval workflows, custom reporting) follow.",
    },
    {
      question: "Does the system integrate with QuickBooks?",
      answer:
        "Yes. QuickBooks Online and QuickBooks Desktop integration is standard. Sage, Microsoft Dynamics, NetSuite, and other ERPs are also supported.",
    },
    {
      question: "What about invoices from non-standard vendors?",
      answer:
        "The AI handles non-standard invoices via human-in-the-loop validation. Edge cases get flagged for human review and the AI learns from each correction, improving accuracy over time.",
    },
    {
      question: "Do you serve businesses outside Kansas?",
      answer:
        "Yes. Headquartered in Hays, Kansas, the firm delivers AI invoicing builds for businesses across the United States.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "HG Oil Holdings",
    "Hays, Kansas",
    "QuickBooks",
    "Bill.com",
    "Stampli",
  ],
  relatedLinks: [
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "AI Customer Service", href: "/services/ai-customer-service" },
    { label: "HG Oil Holdings Case Study", href: "/case-studies/hg-oil-holdings" },
  ],
  ctaHeadline: "Stop having office staff manually read invoices",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll map your AP workflow and send a fixed-price proposal.",
};
