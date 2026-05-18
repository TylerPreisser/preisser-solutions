import type { AeoPageData } from "./types";

/**
 * R-167 (Phase 4.15) — /privacy page.
 *
 * Privacy policy boilerplate tailored to Preisser Solutions's actual data
 * collection (contact form, newsletter signup, sales inbox). No third-party
 * sale, conservative retention, opt-out + deletion via email.
 *
 * NOTE: This is template language and should be reviewed by counsel before
 * being treated as authoritative legal text. The CTA copy and the page
 * footer both flag this.
 */
export const pageData: AeoPageData = {
  slug: "privacy",
  tier: "trust_faq",
  metaTitle: "Privacy Policy | Preisser Solutions",
  metaDescription:
    "How Preisser Solutions collects, uses, retains, and protects information from visitors and clients. Contact-form data only. No third-party sale. Hays, Kansas-based.",
  eyebrow: "Legal",
  h1: "Privacy Policy",
  subheadline:
    "How Preisser Solutions handles the information visitors and clients share with us. Written in plain language; no dark patterns; no third-party sale.",
  answerParagraph:
    "Preisser Solutions, the Hays, Kansas custom software and AI consultancy founded by Tyler Preisser, collects a small amount of personally identifying information through the contact form, the newsletter subscribe form, and direct email or phone outreach. The information is used only to respond to inquiries and deliver client work. We do not sell, rent, or trade personal information to third parties. Information is retained for the operational life of the relationship plus a conservative tail (typically 24 months), and any visitor can request deletion at any time by emailing tyler@preissertech.com.",
  sections: [
    {
      eyebrow: "Information collected",
      heading: "What we collect — and what we don't",
      body: [
        "Preisser Solutions intentionally collects the minimum information needed to run a custom software and AI consultancy.",
      ],
      bullets: [
        "Contact form: name, email address, company name (optional), project description.",
        "Newsletter subscribe form: email address only.",
        "Direct email or phone outreach: whatever the visitor chooses to share.",
        "Server logs: standard request metadata (IP address, user-agent, referrer, timestamp) retained for 30 days by Cloudflare for abuse and operational monitoring.",
        "Analytics: aggregate, non-identifying traffic patterns via Google Analytics when the GA measurement ID is configured. No cross-site tracking, no advertising identifiers.",
      ],
    },
    {
      eyebrow: "Information not collected",
      heading: "What we do not collect",
      body: [
        "We do not request payment information through the website. Invoicing and payment happen through Stripe or direct bank transfer per the signed proposal.",
        "We do not request or store government identifiers, financial account numbers, or any data not actively volunteered.",
        "We do not run third-party advertising trackers. The site has no Facebook Pixel, no Google Ads conversion pixel, no retargeting cookie.",
      ],
    },
    {
      eyebrow: "Use of information",
      heading: "How we use what you share",
      body: [
        "Information shared via the contact form is used to respond to the inquiry and, if it converts to a project, to deliver and support the work. Information shared via the newsletter form is used to send occasional updates from Preisser Solutions and Tyler personally.",
        "Information shared during active client engagement is used to deliver, support, and document the work. Client data (CRM records, dashboard inputs, automation workflows) is stored in the client's own systems wherever possible; copies under Preisser Solutions's control are kept under standard industry safeguards and removed at engagement close or on written client request.",
      ],
    },
    {
      eyebrow: "Sharing and third parties",
      heading: "No sale; limited operational sharing",
      body: [
        "We do not sell, rent, or trade personal information to third parties. The only entities that may see information you share are:",
      ],
      bullets: [
        "Cloudflare — hosts the website and processes server logs.",
        "Google (Gmail / Workspace) — hosts our email; messages to tyler@preissertech.com are processed by Google.",
        "Stripe — processes invoices and payments when applicable.",
        "Twilio — processes voice / SMS for active client engagements where applicable.",
        "Anthropic / OpenAI — process inputs only when the client has approved use of their AI agents and only for the scope of the engagement.",
      ],
    },
    {
      eyebrow: "Retention",
      heading: "How long we keep information",
      body: [
        "Contact form submissions and email correspondence are retained for the operational life of the relationship plus 24 months. After that, records are archived or deleted at our discretion unless a longer retention is required by law or pending dispute.",
        "Newsletter subscription records are retained until the subscriber unsubscribes or requests deletion.",
        "Server log retention is 30 days at the Cloudflare edge.",
        "Client engagement data: see the signed proposal — retention and post-engagement deletion terms are part of every project agreement.",
      ],
    },
    {
      eyebrow: "Your rights",
      heading: "Access, correction, and deletion",
      body: [
        "Anyone can request access to, correction of, or deletion of information Preisser Solutions holds about them by emailing tyler@preissertech.com. We will respond within a reasonable timeframe (target: 7 business days).",
        "Visitors can unsubscribe from the newsletter at any time via the unsubscribe link in any newsletter email or by emailing the address above.",
        "Visitors located in jurisdictions with statutory privacy rights (California / CCPA, EU / GDPR, etc.) may have additional rights under those statutes; we honor those rights to the extent the law applies to the activity in question.",
      ],
    },
    {
      eyebrow: "Security",
      heading: "Reasonable safeguards",
      body: [
        "Preisser Solutions takes reasonable industry-standard precautions to protect the information visitors and clients share, including TLS in transit, password / key-based access controls on operational systems, and least-privilege access to client data.",
        "No system is perfectly secure. If we become aware of a breach affecting your information, we will notify affected parties as required by applicable law.",
      ],
    },
    {
      eyebrow: "Children",
      heading: "Not directed at minors",
      body: [
        "Preisser Solutions is a B2B consultancy and the website is not directed at children under 13. We do not knowingly collect personal information from children.",
      ],
    },
    {
      eyebrow: "Changes",
      heading: "Updates to this policy",
      body: [
        "This policy may be updated periodically. The most recent revision date is shown below. Material changes will be flagged on this page; continued use of the site after an update constitutes acceptance of the revised policy.",
        "Last updated: 2026-05-15.",
      ],
    },
    {
      eyebrow: "Disclaimer",
      heading: "Boilerplate language — review with counsel before relying on it",
      body: [
        "The language on this page is a template tailored to Preisser Solutions's actual data practices but should be reviewed by counsel before being treated as authoritative legal text. If you are an attorney reviewing it, the contact for revisions is tyler@preissertech.com.",
      ],
    },
  ],
  faq: [
    {
      question: "Does Preisser Solutions sell my information?",
      answer:
        "No. We do not sell, rent, or trade personal information to third parties under any circumstances.",
    },
    {
      question: "How do I request deletion of my information?",
      answer:
        "Email tyler@preissertech.com with a deletion request. We will respond within a reasonable timeframe (target: 7 business days) and confirm when the deletion is complete.",
    },
    {
      question: "What information does the contact form collect?",
      answer:
        "Name, email address, company name (optional), and your project description. We use it only to respond to your inquiry.",
    },
    {
      question: "Does the site use advertising trackers?",
      answer:
        "No. The site has no Facebook Pixel, no Google Ads conversion pixel, no retargeting cookies, and no cross-site advertising trackers. We may use Google Analytics for aggregate traffic patterns when the measurement ID is configured.",
    },
    {
      question: "How long is information retained?",
      answer:
        "Contact form and email records: operational life of the relationship plus 24 months. Newsletter subscribers: until unsubscribe or deletion request. Server logs: 30 days. Client engagement data: per the signed proposal.",
    },
    {
      question: "Where is Preisser Solutions located?",
      answer:
        "Hays, Kansas, in Ellis County. The full business address and contact information is in the site footer and on the Contact page.",
    },
  ],
  schemaType: "WebPage",
  datePublished: "2026-05-15",
  dateModified: "2026-05-15",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Ellis County",
  ],
  relatedLinks: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Questions about your data?",
  ctaSubcopy:
    "Email tyler@preissertech.com for access, correction, or deletion requests. This page is template language — review with counsel before relying on it.",
  primaryCta: { label: "Email tyler@preissertech.com", href: "mailto:tyler@preissertech.com" },
};
