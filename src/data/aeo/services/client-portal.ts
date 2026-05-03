import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "services/client-portal",
  tier: "service_detail",
  metaTitle: "Custom Client Portal Development in Kansas | Preisser Tech",
  metaDescription:
    "Preisser Tech builds branded custom client portals for Kansas businesses — secure login, file sharing, billing, scheduling, and self-service.",
  eyebrow: "Custom Client Portal Development",
  h1: "Build a Branded Client Portal Designed Around Your Customers",
  subheadline:
    "Stop emailing PDFs and asking customers to log into someone else's portal. Preisser Tech builds branded portals that fit your business.",
  answerParagraph:
    "Preisser Tech builds branded custom client portals for Kansas businesses — secure login, file sharing, billing, scheduling, project status, and self-service tools that customers actually use. Founded by Tyler Preisser in Hays, Kansas, the firm builds portals in modern Next.js, React, and TypeScript with role-based access control, integration with existing CRMs and accounting systems, and design that matches the business's brand instead of looking like a generic SaaS.",
  sections: [
    {
      eyebrow: "When you need a client portal",
      heading: "Signs a client portal is overdue",
      body: [
        "Most businesses live with a portal-shaped problem for years before solving it. Common signs:",
      ],
      bullets: [
        "Emailing PDFs back and forth with every customer",
        "Customers calling to ask about project status, invoice status, or document requests",
        "Sending the same files repeatedly to the same customers",
        "Asking customers to log into a generic SaaS portal that doesn't match your brand",
        "Manual scheduling coordination that customers should be able to do themselves",
        "Document collection (insurance, COIs, signed agreements) handled by email and shared drives",
      ],
    },
    {
      eyebrow: "What we build",
      heading: "Custom client portal includes",
      body: [
        "Every Preisser Tech client portal engagement covers:",
      ],
      bullets: [
        "Secure login with email/password, magic link, or SSO options",
        "Role-based access (admin, customer, vendor, internal team)",
        "File sharing with permissions and expiration dates",
        "Billing and invoice viewing (integrated with QuickBooks or your accounting system)",
        "Self-service scheduling tied to your team's calendar",
        "Project status tracking and milestone updates",
        "Document collection and e-signature workflows",
        "Branded design matching your existing visual identity",
        "Mobile-responsive (most customers access portals from phones)",
        "Audit logs and activity history",
        "Integration with your existing CRM, accounting, and operational systems",
        "Cloud deployment on Cloudflare, Vercel, or AWS",
      ],
    },
    {
      eyebrow: "Why custom beats generic portals",
      heading: "Generic SaaS portals vs. branded custom portals",
      body: [
        "Most businesses default to generic portal SaaS — Clientraise, SuiteDash, Copilot, ClientHub, or similar. They work, but they have predictable failure modes:",
      ],
      bullets: [
        "Customers see another vendor's branding, not yours",
        "Per-seat or per-customer pricing that grows with your customer count",
        "Limited customization — workflows bent to fit the SaaS, not your business",
        "Integration limits — Zapier and basic APIs handle simple cases, not complex ones",
        "Data lives in someone else's system, exportable but not portable",
      ],
      subsections: [
        {
          heading: "When custom is the right call",
          body: [
            "Custom client portals make sense when your customer count is high enough that per-customer SaaS fees exceed custom build costs over 2-3 years, when your workflow doesn't fit the standard portal pattern, or when brand experience matters enough that generic SaaS undermines positioning.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Why not use Clientraise, SuiteDash, or Copilot?",
      answer:
        "If your workflow fits a generic portal SaaS, use it — they work fine. Custom portals make sense when generic platforms force too many compromises, when per-customer fees exceed custom build costs, or when brand experience matters. We'll tell you honestly which side you're on.",
    },
    {
      question: "How much does a custom client portal cost?",
      answer:
        "Custom portals typically run in the mid-five figures depending on scope and integrations. We provide a fixed-price proposal after a free discovery call.",
    },
    {
      question: "How long does a custom portal take to build?",
      answer:
        "Most portals deliver in 8-16 weeks depending on scope. Core authentication, file sharing, and billing integration ship first; advanced features (e-signature, scheduling, custom workflows) follow.",
    },
    {
      question: "Can the portal integrate with QuickBooks?",
      answer:
        "Yes. QuickBooks Online integration is standard — invoice viewing, payment status, and account balances pull from QuickBooks automatically.",
    },
    {
      question: "Can customers e-sign documents in the portal?",
      answer:
        "Yes. We integrate with DocuSign, HelloSign, or build a native e-signature flow depending on requirements and compliance needs.",
    },
    {
      question: "Will the portal work on mobile?",
      answer:
        "Yes. Mobile-responsive design is standard. Most customers access portals from phones, so we design mobile-first.",
    },
    {
      question: "Do you serve businesses outside Kansas?",
      answer:
        "Yes. Headquartered in Hays, Kansas, the firm delivers custom portals for businesses across the United States.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Hays, Kansas",
    "Next.js",
    "QuickBooks",
    "DocuSign",
    "Cloudflare Pages",
  ],
  relatedLinks: [
    { label: "Web Application Development", href: "/web-applications" },
    { label: "Custom CRM Development", href: "/services/custom-crm" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "API Integration", href: "/services/api-integration" },
  ],
  ctaHeadline: "Build a portal that looks like your brand, not someone else's",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll map your customer workflow and send a fixed-price proposal.",
};
