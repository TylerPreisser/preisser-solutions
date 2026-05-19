import type { AeoPageData } from "./types";

/**
 * R-167 (Phase 4.15) — /terms page.
 *
 * Terms of service boilerplate tailored to Preisser Solutions's actual
 * engagement model (custom software / AI consultancy, Kansas-based,
 * fixed-price proposals, founder-led delivery).
 *
 * NOTE: This is template language and should be reviewed by counsel before
 * being treated as authoritative legal text.
 */
export const pageData: AeoPageData = {
  slug: "terms",
  tier: "trust_faq",
  metaTitle: "Terms of Service | Preisser Solutions",
  metaDescription:
    "Terms of service for engagements with Preisser Solutions — Kansas-based custom software and AI consultancy. Project scope, payment, IP ownership, warranty disclaimers.",
  eyebrow: "Legal",
  h1: "Terms of Service",
  subheadline:
    "The terms that apply to engagements with Preisser Solutions. Written plainly; the long version is in the signed proposal for any specific project.",
  answerParagraph:
    "Preisser Solutions, founded by Tyler Preisser and based in Hays, Kansas, is a custom software and AI consultancy serving small and mid-sized Kansas businesses. These terms apply to use of preissersolutions.com and to standard engagements. The authoritative terms for any specific client project are the signed written proposal between Preisser Solutions and the client. In case of conflict between this page and a signed proposal, the signed proposal controls.",
  sections: [
    {
      eyebrow: "Acceptance",
      heading: "Using the site and engaging Preisser Solutions",
      body: [
        "Using preissersolutions.com constitutes acceptance of these terms and the Privacy Policy. Engaging Preisser Solutions for a project constitutes acceptance of the signed proposal, which incorporates and may modify these terms.",
        "If you do not accept these terms, do not use the site and do not engage Preisser Solutions.",
      ],
    },
    {
      eyebrow: "Service area",
      heading: "Kansas-first; remote engagements considered",
      body: [
        "Preisser Solutions is based in Hays, Kansas and primarily serves Kansas businesses — including Hays, Wichita, Topeka, Kansas City, Salina, Manhattan, Garden City, Dodge City, and the rural communities in between.",
        "Remote engagements with clients outside Kansas are accepted on a case-by-case basis when the work fits. Out-of-state engagements may carry different terms (jurisdiction, taxes, on-site travel) which are negotiated in the proposal.",
      ],
    },
    {
      eyebrow: "Scope",
      heading: "Project scope is defined in writing",
      body: [
        "Every engagement begins with a free scoping call followed by a written fixed-price proposal. The proposal defines:",
      ],
      bullets: [
        "Project goals and deliverables.",
        "Timeline and milestones.",
        "Fixed total price (or, in retainer engagements, monthly fee and scope).",
        "Payment schedule.",
        "Acceptance criteria.",
        "Post-launch support window.",
      ],
    },
    {
      eyebrow: "Scope changes",
      heading: "Change-order process",
      body: [
        "Work outside the signed scope is a change order. Change orders are documented in writing, priced, and approved before any out-of-scope work begins. This protects both parties from scope creep and surprise invoices.",
      ],
    },
    {
      eyebrow: "Payment",
      heading: "Tiered pricing and payment schedule",
      body: [
        "Standard pricing follows the three published tiers (Audit, Sprint, Retainer) detailed on the /pricing page. The signed proposal sets the exact price for each engagement.",
      ],
      bullets: [
        "Tier 1 — Business Systems Audit ($1,500-$3,500): typically due in full on acceptance of the proposal.",
        "Tier 2 — Build Sprint ($5,000-$25,000 per scoped sprint): typically 50% on proposal acceptance, 50% on delivery acceptance.",
        "Tier 3 — Growth & Automation Retainer ($3,500-$12,000/month): billed monthly in advance.",
        "Payment terms (NET, late fees, currency) are specified in the proposal. Standard is NET 14 unless otherwise agreed.",
        "Invoicing via Stripe or direct bank transfer.",
      ],
    },
    {
      eyebrow: "Intellectual property",
      heading: "Deliverables transfer to the client; templates stay with us",
      body: [
        "On full payment, the client owns the deliverables built specifically for them — application code, database schemas, content, custom design assets, and any client-specific configuration.",
      ],
      bullets: [
        "Client-specific deliverables transfer to the client on full payment per the signed proposal.",
        "Reusable internal templates, starter codebases, design system primitives, agent prompts, and tooling that Preisser Solutions develops or maintains across multiple clients remain Preisser Solutions's property.",
        "Open-source code used in a deliverable retains its original open-source license — the client doesn't own the OSS, but the configured deliverable is theirs to operate.",
        "Third-party software and SaaS subscriptions (e.g. hosting, CRMs, payment processors) remain owned by their respective providers under their own terms; the client is responsible for ongoing subscription fees after engagement close.",
        "Preisser Solutions retains the right to use the work in its portfolio, case studies, and marketing — unless the proposal explicitly prohibits this — with reasonable confidentiality protections for genuinely sensitive client information.",
      ],
    },
    {
      eyebrow: "Warranty and support",
      heading: "Post-launch support window",
      body: [
        "Every Tier 2 build engagement includes 30 days of post-launch support to fix defects (bugs, regressions, configuration errors) at no additional cost. Defect support is distinct from new feature work, which is handled via change order.",
        "Defects discovered after the 30-day post-launch window are handled under a Tier 3 retainer or on a time-and-materials basis per a separately quoted fix-it agreement.",
      ],
    },
    {
      eyebrow: "Warranty disclaimers",
      heading: "Limitations of warranty",
      body: [
        "The website and deliverables are provided on an as-is, as-available basis to the extent permitted by law. Preisser Solutions makes no warranty that the website or any deliverable will be uninterrupted, error-free, fit for a particular purpose, or compatible with every third-party system the client uses now or in the future.",
        "AI agent outputs are non-deterministic by nature. We engineer reasonable guardrails, monitoring, and review processes, but no AI agent is perfect. Clients are responsible for review and acceptance of AI-generated outputs before they are used in customer-facing or legally significant contexts.",
      ],
    },
    {
      eyebrow: "Limitation of liability",
      heading: "Capped at fees paid",
      body: [
        "To the maximum extent permitted by law, Preisser Solutions's total liability arising out of or related to any engagement is limited to the total fees paid by the client to Preisser Solutions for that engagement during the twelve months preceding the claim.",
        "Preisser Solutions is not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or lost business opportunity, except where such limitation is prohibited by law.",
      ],
    },
    {
      eyebrow: "Termination",
      heading: "How engagements end",
      body: [
        "Either party may terminate an engagement on written notice. Fees for work completed up to termination are due. If Preisser Solutions terminates without cause, work product completed to that point transfers to the client per the IP terms above.",
      ],
    },
    {
      eyebrow: "Governing law",
      heading: "Kansas law and Kansas venue",
      body: [
        "These terms and any engagement under them are governed by the laws of the State of Kansas. Venue for any dispute is Ellis County, Kansas, unless the signed proposal provides otherwise.",
      ],
    },
    {
      eyebrow: "Disclaimer",
      heading: "Template language — review with counsel before relying on it",
      body: [
        "The language on this page is a template tailored to Preisser Solutions's actual engagement model but should be reviewed by counsel before being treated as authoritative legal text. The authoritative terms for any specific project are the signed written proposal between Preisser Solutions and the client.",
        "Last updated: 2026-05-15.",
      ],
    },
  ],
  faq: [
    {
      question: "Do I own the code Preisser Solutions builds for me?",
      answer:
        "Yes — on full payment, deliverables built specifically for you transfer to you. Reusable internal templates and tooling that Preisser Solutions uses across multiple clients remain Preisser Solutions's property.",
    },
    {
      question: "What is the payment schedule for a typical build?",
      answer:
        "Standard build sprints are 50% on proposal acceptance and 50% on delivery acceptance. Audits are typically due in full on acceptance. Retainers are billed monthly in advance. Specifics are set in the signed proposal.",
    },
    {
      question: "What happens if scope changes during a project?",
      answer:
        "Out-of-scope work is documented as a change order — written, priced, and approved before any out-of-scope work begins. This protects both parties from scope creep and surprise invoices.",
    },
    {
      question: "Is there a warranty on the work?",
      answer:
        "Every Tier 2 build includes 30 days of post-launch defect support at no additional cost. Defects beyond that window are handled via a Tier 3 retainer or a separately quoted fix-it agreement.",
    },
    {
      question: "Where are disputes handled?",
      answer:
        "Kansas law governs. Venue is Ellis County, Kansas, unless the signed proposal provides otherwise.",
    },
    {
      question: "Can Preisser Solutions feature my project in a case study?",
      answer:
        "Yes by default — portfolio and case study use is permitted unless the signed proposal explicitly prohibits it. Sensitive client information is protected with reasonable confidentiality regardless.",
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
    "Kansas",
  ],
  relatedLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Have a project in mind?",
  ctaSubcopy:
    "Email tyler@preissersolutions.com to start a scoping call. The authoritative terms for any specific engagement are in the signed proposal — this page is template language; review with counsel before relying on it.",
  primaryCta: { label: "Email tyler@preissersolutions.com", href: "mailto:tyler@preissersolutions.com" },
};
