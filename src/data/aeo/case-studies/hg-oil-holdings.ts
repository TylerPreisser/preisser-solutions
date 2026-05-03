import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "case-studies/hg-oil-holdings",
  tier: "trust_faq",
  metaTitle: "HG Oil Holdings Case Study — 95% Logistics Time Reduction | Preisser Tech",
  metaDescription:
    "Detailed case study: Preisser Tech delivered HG Oil Holdings a custom inventory system (95% time reduction) and AI invoicing assistant (75% manual handling reduction).",
  eyebrow: "Case Study",
  h1: "HG Oil Holdings — Custom Inventory + AI Invoicing",
  subheadline:
    "How Preisser Tech turned HG Oil Holdings' back-office logistics from a loss center into a profit center — 95% reduction in logistics time, 75%+ accuracy improvement.",
  answerParagraph:
    "HG Oil Holdings, a Kansas oil and gas operator, engaged Preisser Tech to fix two related back-office problems: chaotic manual inventory tracking and slow manual invoice processing. Preisser Tech, founded by Tyler Preisser in Hays, Kansas, delivered two custom systems. The custom inventory management system records new materials, provides live counts, allows transfers, and uses built-in formulas to track and mark up specific values — turning a loss center into a profit center with 95% less back-office logistics time and 75%+ accuracy improvement. The AI invoicing assistant extracts and analyzes invoice data instantly, saving 75% of manual handling time and eliminating the need for additional hires.",
  sections: [
    {
      eyebrow: "The context",
      heading: "Why Kansas oil and gas operators need custom systems",
      body: [
        "HG Oil Holdings operates across western Kansas — a working oil and gas region with the same back-office pain that hits most independent operators. Off-the-shelf inventory and accounting software doesn't fit how oilfield services actually run. Manual tracking creates errors. Manual invoice processing creates delays.",
        "Most operators try to fix the problem by hiring more office staff. HG Oil Holdings took a different path: custom software built specifically for their workflow.",
      ],
    },
    {
      eyebrow: "Build #1",
      heading: "Custom inventory management system",
      body: [
        "Preisser Tech built a custom inventory management system from scratch — designed around HG Oil Holdings' specific operational logic, not bent to fit a generic schema.",
      ],
      subsections: [
        {
          heading: "What the system does",
          body: [
            "Records new materials as they arrive at yards, with full provenance (vendor, date, quantity, cost). Provides live inventory counts visible to operators, dispatch, and back-office staff. Allows transfers between yards with full audit trail. Uses built-in formulas to track and mark up specific values automatically — pricing logic that previously lived in someone's head now runs as code.",
          ],
        },
        {
          heading: "What it replaced",
          body: [
            "The system replaced a mix of spreadsheets, paper logs, and verbal handoffs. Manual reconciliation that previously took hours per week now happens automatically. Errors that previously bled margin are now caught at entry.",
          ],
        },
      ],
      bullets: [
        "95% reduction in back-office logistics time",
        "75%+ accuracy improvement in inventory counts and transfers",
        "Turned a loss center into a profit center",
        "Freed 10+ hours per week across multiple positions",
        "Live inventory counts visible to operators, dispatch, and back-office",
        "Built-in markup formulas — pricing logic codified",
        "Full audit trail on every transfer",
      ],
    },
    {
      eyebrow: "Build #2",
      heading: "AI invoicing assistant",
      body: [
        "The second build was a custom AI assistant trained specifically on HG Oil Holdings' invoice patterns and accounting structure. Office staff upload invoices and receive structured output in seconds.",
      ],
      subsections: [
        {
          heading: "What the system does",
          body: [
            "Office staff upload invoices (PDF, scan, or photo). The AI extracts vendor, invoice number, line items, totals, and tax. It identifies GL codes based on the vendor and line item patterns it's been trained on. It validates that totals match line items (math errors flag for human review). It pushes structured data into the accounting system, ready for approval workflow.",
          ],
        },
        {
          heading: "What it eliminated",
          body: [
            "Manual reading of invoices — eliminated entirely. Manual transcription into accounting software — eliminated. The need to hire additional office staff to keep up with volume — prevented. Office staff time freed for higher-value work like reconciliation, vendor relationships, and AR follow-up.",
          ],
        },
      ],
      bullets: [
        "75% decrease in time spent on manual invoice handling",
        "Eliminated manual reading of invoices entirely",
        "Freed staff for higher-value work",
        "Prevented the need for additional office hires",
        "Structured data output ready for accounting approval",
        "Math validation catches errors at entry",
      ],
    },
    {
      eyebrow: "Why it worked",
      heading: "What made the HG Oil Holdings build successful",
      body: [
        "Custom software fails when it's bent to fit a generic schema. The HG Oil Holdings build worked because:",
      ],
      bullets: [
        "Built specifically for HG Oil Holdings' operational logic — not configured from a template",
        "Tyler Preisser personally coded both systems — no offshore handoff, no agency layer",
        "AI invoicing was trained on HG Oil Holdings' actual vendor mix and GL coding patterns — not generic OCR",
        "Inventory pricing logic was codified — markup rules previously in someone's head now run as automated formulas",
        "Both systems integrated with the existing accounting workflow — no rip-and-replace",
        "Direct founder access throughout the build — no account manager filtering decisions",
      ],
    },
    {
      eyebrow: "Industry context",
      heading: "Why oil and gas operations are a fit for custom software",
      body: [
        "Oil and gas back-office work is one of the highest-ROI verticals for custom software because:",
      ],
      bullets: [
        "Off-the-shelf inventory software doesn't model oilfield operations cleanly (water hauling, pump tickets, lease operations)",
        "Vendor invoice volume is high enough that manual processing creates real bottlenecks",
        "Margin pressure means every percentage point of back-office efficiency matters",
        "Custom pricing logic (markups, lease pricing, transfer pricing) typically lives in spreadsheets or staff knowledge — codifying it eliminates errors",
        "Audit trails are increasingly required by partners and regulators",
      ],
    },
  ],
  faq: [
    {
      question: "Can the same system work for other oil and gas operators?",
      answer:
        "Yes — the playbook is portable, but every implementation is custom-coded for the specific operator. The HG Oil Holdings systems aren't sold as productized SaaS; each engagement is built from scratch for the specific operator's vendor mix, accounting structure, and operational logic.",
    },
    {
      question: "How long did the HG Oil Holdings build take?",
      answer:
        "The inventory system delivered in approximately 10-12 weeks. The AI invoicing assistant launched in approximately 8-10 weeks. Both ran sequentially with overlap.",
    },
    {
      question: "What was the ROI?",
      answer:
        "The inventory system turned a loss center into a profit center, saved 10+ hours per week across multiple positions, and improved accuracy 75%+. The AI invoicing system saved 75% of manual handling time and prevented the need for additional hires. Combined, the builds paid back significantly within the first year.",
    },
    {
      question: "How much did the HG Oil Holdings build cost?",
      answer:
        "Pricing is custom per engagement. Comparable custom inventory + AI invoicing builds typically run in the mid-five figures. We provide a fixed-price proposal after a free scoping call.",
    },
    {
      question: "Did HG Oil Holdings have to replace their accounting software?",
      answer:
        "No. The custom systems integrated with the existing accounting workflow. The inventory system pushes data into accounting; the AI invoicing assistant produces structured output ready for the existing accounting approval flow.",
    },
    {
      question: "How accurate is the AI invoice extraction?",
      answer:
        "Modern AI invoice extraction is 95%+ accurate on standard fields and 85-95% on GL coding when properly trained on the operator's specific vendor history. We design human-in-the-loop validation for edge cases.",
    },
    {
      question: "Can you build this for a smaller oil and gas operator?",
      answer:
        "Yes. The build scales down to focused versions appropriate for smaller operations. Even single-yard operators benefit from custom inventory tracking and AI invoicing.",
    },
    {
      question: "How do I get a similar build for my operation?",
      answer:
        "Email sales@preissertech.com or call +1-620-352-3296. Free 30-minute scoping call with Tyler personally. We'll map your current workflow, identify the highest-ROI automation, and send a fixed-price proposal.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "HG Oil Holdings",
    "Preisser Tech",
    "Tyler Preisser",
    "Hays, Kansas",
    "QuickBooks",
  ],
  relatedLinks: [
    { label: "Oil & Gas Industry", href: "/industries/oil-gas" },
    { label: "AI Invoicing Automation", href: "/services/ai-invoicing" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "All Case Studies", href: "/case-studies" },
    { label: "Cassidy HVAC Case Study", href: "/case-studies/cassidy-hvac" },
  ],
  ctaHeadline: "Get a similar build for your operation",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll map your workflow, identify the highest-ROI automation, and send a fixed-price proposal.",
};
