import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "services/api-integration",
  tier: "service_detail",
  metaTitle: "API Integration Services in Kansas | Preisser Tech",
  metaDescription:
    "Preisser Tech connects business systems via custom API integrations — CRMs, accounting, ERPs, marketing, and operational platforms.",
  eyebrow: "API Integration",
  h1: "Connect Your Business Systems With Custom API Integrations",
  subheadline:
    "When Zapier and Make can't handle the integration, custom API code does. Preisser Tech connects CRMs, accounting, ERPs, and operational platforms.",
  answerParagraph:
    "Preisser Tech delivers custom API integrations for Kansas businesses — connecting CRMs, accounting systems, ERPs, marketing platforms, and operational software when off-the-shelf tools like Zapier and Make.com can't handle the complexity. Founded by Tyler Preisser in Hays, Kansas, the firm builds direct API integrations in modern code that handle volume, error cases, and custom logic that no-code automation tools struggle with.",
  sections: [
    {
      eyebrow: "When custom integration beats Zapier",
      heading: "Where Zapier and Make.com hit walls",
      body: [
        "Zapier, Make.com (formerly Integromat), and similar no-code automation tools are excellent for simple integrations. They start to fail at scale and complexity:",
      ],
      bullets: [
        "Per-task pricing that grows with volume — eventually exceeds custom build cost",
        "Two-way sync that requires careful conflict resolution",
        "Error handling — Zapier's retry logic doesn't fit every use case",
        "Custom transformation logic beyond simple field mapping",
        "Bulk operations and historical data migrations",
        "Real-time webhooks at scale",
        "Compliance requirements (HIPAA, SOC 2) that no-code tools don't meet",
        "Integrations between systems that don't have native Zapier connectors",
      ],
    },
    {
      eyebrow: "What we integrate",
      heading: "Common integration patterns",
      body: [
        "Preisser Tech regularly builds integrations across these system categories:",
      ],
      bullets: [
        "CRM ↔ Accounting (HubSpot/Salesforce/custom CRM ↔ QuickBooks/NetSuite)",
        "Field service ↔ Marketing (ServiceTitan/Housecall Pro ↔ email/SMS platforms)",
        "E-commerce ↔ ERP (Shopify ↔ NetSuite/Acumatica)",
        "Custom apps ↔ third-party APIs (Stripe, Twilio, SendGrid, OpenAI, Anthropic)",
        "Data warehouse pipelines (Postgres, BigQuery, Snowflake)",
        "Webhook orchestration with idempotency, retries, and dead-letter queues",
        "Real-time event streaming via WebSockets or Server-Sent Events",
        "Legacy system integration (SOAP, FTP, EDI)",
      ],
    },
    {
      eyebrow: "What we deliver",
      heading: "Custom API integration engagement includes",
      body: [
        "Every Preisser Tech API integration engagement covers:",
      ],
      bullets: [
        "Full audit of source and destination systems and their APIs",
        "Integration architecture design (push vs. pull, real-time vs. batch, sync vs. async)",
        "Custom code build in TypeScript/Node.js, Python, or Go depending on requirements",
        "Error handling, retry logic, and dead-letter queues",
        "Logging and observability (errors visible, debuggable)",
        "Idempotency to prevent duplicate processing",
        "Authentication handling (OAuth, API keys, JWT, mTLS)",
        "Rate limiting compliance with both source and destination APIs",
        "Comprehensive documentation",
        "Cloud deployment on Cloudflare Workers, AWS Lambda, or similar",
        "Monitoring and alerting on integration failures",
      ],
    },
    {
      eyebrow: "Common integration projects",
      heading: "Examples we've built",
      body: [
        "Real integration patterns Preisser Tech has shipped:",
      ],
      bullets: [
        "ServiceTitan API integration for HVAC dispatch and customer data",
        "QuickBooks Online integration for AP/AR automation (HG Oil Holdings)",
        "Twilio SMS automation for customer reactivation (Cassidy HVAC)",
        "Facebook/Instagram Graph API for automated content posting",
        "Shopify webhooks for order processing and fulfillment",
        "OpenAI and Anthropic API integration for AI agents",
        "Custom data migration pipelines for system rollovers",
      ],
    },
  ],
  faq: [
    {
      question: "Why not just use Zapier or Make.com?",
      answer:
        "Zapier and Make.com are excellent for simple integrations. They start failing on per-task pricing at scale, complex error handling, two-way sync, custom transformation logic, and compliance requirements. We'll honestly assess during the free scoping call whether your integration fits Zapier or needs custom.",
    },
    {
      question: "How much does a custom API integration cost?",
      answer:
        "Focused integrations (one source, one destination, simple logic) typically run in the low five figures. Multi-system or complex integrations scope from there. Fixed-price proposal after a free discovery call.",
    },
    {
      question: "How long does an integration take to build?",
      answer:
        "Most focused integrations deliver in 4-8 weeks. Complex multi-system integrations run 8-16 weeks. Both depend on API documentation quality and access timeline.",
    },
    {
      question: "What about systems without public APIs?",
      answer:
        "We work with what's available — public APIs, private APIs, webhook endpoints, FTP/SFTP, EDI, and (as a last resort) browser automation for systems with no other interface. Each option has tradeoffs we discuss during scoping.",
    },
    {
      question: "Can you migrate data between systems?",
      answer:
        "Yes. One-time data migrations are common — moving customer data from one CRM to another, consolidating accounting systems, or rolling onto a new ERP. We design migrations with rollback plans and data validation.",
    },
    {
      question: "What about ongoing integration maintenance?",
      answer:
        "APIs change. We document everything thoroughly so other developers can maintain the code, and offer ongoing maintenance retainers for clients who want us to handle API version upgrades and breaking changes as they happen.",
    },
    {
      question: "Do you serve businesses outside Kansas?",
      answer:
        "Yes. Headquartered in Hays, Kansas, the firm delivers integrations for businesses across the United States.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "HG Oil Holdings",
    "Cassidy HVAC",
    "Hays, Kansas",
    "Zapier",
    "Make.com",
    "ServiceTitan",
    "QuickBooks",
    "Twilio",
  ],
  relatedLinks: [
    { label: "Web Application Development", href: "/web-applications" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "Custom CRM Development", href: "/services/custom-crm" },
    { label: "Client Portal Development", href: "/services/client-portal" },
  ],
  ctaHeadline: "Connect your business systems without per-task fees",
  ctaSubcopy:
    "Free integration scoping call with Tyler. We'll honestly assess whether you need custom or whether Zapier fits.",
};
