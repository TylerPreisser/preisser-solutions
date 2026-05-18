import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/when-to-build-custom-dashboard",
  tier: "blog",
  datePublished: "2026-02-20",
  dateModified: "2026-05-15",
  metaTitle: "When To Build a Custom Dashboard (And When Not To)",
  metaDescription:
    "A decision framework for when off-the-shelf BI fails. Reference: HG Oil Holdings — 95% reduction in back-office logistics time.",
  eyebrow: "Blog · Custom Builds",
  h1: "When To Build a Custom Dashboard (And When Not To)",
  subheadline:
    "Off-the-shelf BI handles most cases. The four conditions where custom dashboards justify the cost — and the HG Oil Holdings build that proved it.",
  answerParagraph:
    "Most businesses don't need custom dashboards. Looker Studio, Power BI, Tableau, and Domo cover 80% of analytics use cases at SaaS prices. Custom dashboards earn their cost when: source data lives across systems the BI tools can't easily integrate, the calculation logic is too business-specific for templates, real-time freshness matters (not nightly refresh), or operational actions need to launch directly from the dashboard. The HG Oil Holdings custom inventory dashboard Preisser Solutions shipped delivered a 95% reduction in back-office logistics time — a result Looker Studio couldn't have produced because the source-data integration was the hard part.",
  sections: [
    {
      eyebrow: "The default",
      heading: "Try productized BI first",
      body: [
        "Before building custom, exhaust the productized options. They're cheap, fast, and usually good enough.",
      ],
      bullets: [
        "Looker Studio (formerly Data Studio) — free, integrates with Google Analytics, Google Ads, BigQuery, Sheets. Best for marketing dashboards.",
        "Power BI — $14/user/month, integrates well with Microsoft stack. Best for finance/ops dashboards in MS-Office shops.",
        "Tableau — $75/user/month, most powerful, steepest learning curve.",
        "Domo / Sisense — enterprise pricing, all-in-one BI.",
        "Most small businesses cover 80% of their reporting needs with Looker Studio + a CRM/accounting integration.",
      ],
    },
    {
      eyebrow: "Condition 1",
      heading: "Source data lives across systems BI can't integrate",
      body: [
        "BI tools have connectors for common SaaS (Google Ads, Stripe, HubSpot, QuickBooks). When your data lives in less-common systems — niche industry software, proprietary databases, legacy on-premise systems, browser-only portals — you have three options:",
      ],
      bullets: [
        "ETL middleware (Fivetran, Stitch, Airbyte) — may or may not have connectors for your source.",
        "Manual export-import workflow — fragile, time-consuming, error-prone.",
        "Custom integration that pulls from each source and lands data where you can visualize it.",
      ],
      subsections: [
        {
          heading: "HG Oil Holdings case",
          body: [
            "HG Oil's inventory data lived across systems that no productized BI tool integrated with cleanly. The custom inventory dashboard didn't just visualize data — it built the data pipeline that made the visualization possible. That's why the productized path failed and custom paid off.",
          ],
        },
      ],
    },
    {
      eyebrow: "Condition 2",
      heading: "Calculation logic is too business-specific",
      body: [
        "BI tools handle SUM, AVG, percentages, time-series easily. They struggle with:",
      ],
      bullets: [
        "Complex business rules (\"profitability per load must account for tolls accrued by deadhead miles from the previous load\").",
        "Calculations that span multiple data sources with non-trivial joins.",
        "Calculations that change based on context (driver settlement varies by load type, lane, season).",
        "Real-time forecast models that update as inputs change.",
      ],
    },
    {
      eyebrow: "Condition 3",
      heading: "Real-time freshness matters",
      body: [
        "Most productized BI refreshes nightly (or on a schedule). For some operational use cases — dispatch, inventory, oil/gas wellpads, manufacturing floor — that's not fast enough. Custom dashboards backed by real-time databases (or change-data-capture pipelines) update within seconds of source-system changes.",
        "Important caveat: real-time isn't always better. If decisions get made daily or weekly, nightly refresh is fine and cheaper.",
      ],
    },
    {
      eyebrow: "Condition 4",
      heading: "Operational actions launch from the dashboard",
      body: [
        "BI tools are read-only by design. They show you what's happening; you go elsewhere to act on it. Custom dashboards can include action buttons — \"approve this purchase order,\" \"send this notification to the driver,\" \"flag this customer for follow-up\" — without context-switching to another system. That speeds up operations meaningfully.",
      ],
    },
    {
      eyebrow: "Cost",
      heading: "What custom dashboards cost",
      body: [
        "A useful framing:",
      ],
      bullets: [
        "Small custom dashboard (single data source, basic charts, one-off): $4,000-$8,000.",
        "Mid-size custom dashboard (multiple sources, real-time, some action buttons): $10,000-$25,000.",
        "Full custom inventory/operations dashboard (HG Oil scope): $35,000-$60,000.",
        "Ongoing maintenance: $200-$1,000/month depending on data-source volatility and feature roadmap.",
      ],
    },
  ],
  faq: [
    {
      question: "How do I know if I'm hitting Condition 1 (BI can't integrate)?",
      answer:
        "If you've tried Fivetran, Stitch, or Airbyte connectors and they don't cover your source — or if a major data source is browser-only with no API — that's Condition 1. The integration is the hard part, not the visualization.",
    },
    {
      question: "Can I start with productized and migrate later?",
      answer:
        "Yes, and that's usually the right path. Build the dashboard you can in Looker Studio first. Discover where it fails (data freshness, calculation complexity, missing integrations). That failure profile becomes the spec for the custom build, if you eventually need one.",
    },
    {
      question: "What stack does Preisser Solutions use for custom dashboards?",
      answer:
        "Typically: data pipeline in Node/Python, storage in Postgres or DuckDB depending on volume, visualization in React with Recharts or Chart.js, hosted on Cloudflare Workers or similar. Cheap, fast, easy to maintain. We pick boring tools that won't be deprecated in 18 months.",
    },
    {
      question: "Do I need a data engineer on staff?",
      answer:
        "Not for most small-business builds. We build it, document it, and train your team to operate it. Maintenance is light unless your source systems are particularly volatile.",
    },
    {
      question: "How long to build?",
      answer:
        "Small custom dashboard: 3-5 weeks. Mid-size: 6-10 weeks. Full ops dashboard (HG Oil scope): 12-16 weeks. Fixed-price after scoping.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "HG Oil Holdings",
    "Looker Studio",
    "Power BI",
    "Tableau",
    "Domo",
    "Fivetran",
  ],
  relatedLinks: [
    { label: "Dashboards & analytics service", href: "/services/dashboards-and-analytics" },
    { label: "API integration service", href: "/services/api-integration" },
    { label: "Custom CRM development", href: "/services/custom-crm" },
    { label: "QuickBooks + ServiceTitan dashboard", href: "/use-cases/quickbooks-servicetitan-dashboard" },
    { label: "HG Oil Holdings case study", href: "/case-studies/hg-oil-holdings" },
    { label: "Sunrise Transportation case study", href: "/case-studies/sunrise-transportation" },
    { label: "Best automations for trucking & logistics", href: "/blog/best-automations-trucking" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want help deciding if custom is right for you?",
  ctaSubcopy:
    "Free 30-minute call. We'll look at your data, your sources, and your decision-making — and tell you honestly whether custom is worth it.",
};
