import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "case-studies/astrus-insurance",
  tier: "trust_faq",
  // R-018: Article freshness signals.
  datePublished: "2025-08-01",
  dateModified: "2026-05-15",
  metaTitle: "Astrus Insurance Solutions — Custom Policy Management System | Preisser Solutions",
  metaDescription:
    "How Preisser Solutions built Astrus Insurance Solutions a purpose-built policy management system — zero missed renewals in 6 months, commission reconciliation under 30 min/month.",
  eyebrow: "Case Study",
  h1: "Astrus Insurance Solutions — Custom Policy Management System",
  subheadline:
    "How Preisser Solutions replaced spreadsheets and a generic CRM with a purpose-built policy management system tuned to independent-insurance workflow — zero missed renewals in the first six months and commission reconciliation under 30 minutes per month.",
  answerParagraph:
    "Astrus Insurance Solutions, an independent insurance agency, engaged Preisser Solutions to replace a tangle of spreadsheets, sticky notes, and a generic CRM that didn't fit how independent brokers run their book. Preisser Solutions, founded by Tyler Preisser in Hays, Kansas, built a custom policy management system tuned to the actual workflow: carrier-aware policy records, renewal-window automation, commission reconciliation, document storage tied to each policy, and producer-level pipeline visibility. The system delivered zero missed renewals in the first six months of operation, dropped monthly commission reconciliation from a multi-hour exercise to under 30 minutes, and gave the principal real-time visibility into book composition by line, carrier, and producer.",
  sections: [
    {
      eyebrow: "The problem",
      heading: "Generic CRMs don't fit independent insurance",
      body: [
        "Astrus Insurance Solutions had tried two off-the-shelf CRMs and abandoned both. Reasons most insurance agencies run into the same wall:",
      ],
      bullets: [
        "Generic CRMs model 'deals' or 'opportunities' — insurance runs on policies with renewal cycles, carriers, and multi-line bundles",
        "Renewal management is the actual job, and no generic CRM handles 30/60/90-day renewal windows well",
        "Commission tracking lives in spreadsheets nobody trusts; reconciliation is a monthly fire drill",
        "Document storage per policy gets ad-hoc — declarations pages, endorsements, ACORD forms scattered across email, Dropbox, and printouts",
        "Producer-level visibility doesn't exist; the principal can't see which producers are upselling, cross-selling, or losing renewals",
      ],
    },
    {
      eyebrow: "The build",
      heading: "Custom CRM tuned to independent insurance workflow",
      body: [
        "Preisser Solutions built a purpose-built policy management system. Core capabilities:",
      ],
      bullets: [
        "Policy-centric data model — every record is a policy (or bundle), carrier-aware, with renewal date, premium, commission rate, and document store",
        "Renewal-window automation — 90/60/30/15-day reminders to producers, automated outreach to customers, escalation when renewals approach without contact",
        "Commission tracking — automatic reconciliation against carrier statements, monthly producer reports, exception flagging",
        "Document storage — declarations pages, endorsements, ACORD forms attached to each policy, searchable, versioned",
        "Producer pipeline — visibility per producer into renewals, new business, cross-sells, lapsed-risk policies",
        "Customer 360 — every policy a customer holds, every interaction, every document in one place",
        "Reporting — book composition by line (auto, home, commercial, life), by carrier, by producer; loss ratio when available",
      ],
    },
    {
      eyebrow: "Workflow before → after",
      heading: "What changed in the day-to-day",
      body: [
        "Before the build: producers tracked renewals in personal spreadsheets, missed renewal windows showed up as customer churn months later, commissions were reconciled monthly in a multi-hour exercise, and the principal had no real-time view of the book.",
        "After the build: renewal-window reminders surface automatically, lapsed-risk policies trigger producer alerts, commission reconciliation runs in minutes against carrier statements, and the principal has live dashboards by line, carrier, and producer.",
      ],
    },
    {
      eyebrow: "Stack",
      heading: "What we built it on",
      body: [
        "Next.js + React + TypeScript front-end, custom Node.js back-end, PostgreSQL database, Cloudflare deployment, carrier-statement parsing via custom code (some carriers offer APIs, others require CSV reconciliation). Authentication via standard providers, role-based access (producer vs. CSR vs. principal).",
      ],
    },
    {
      eyebrow: "Result",
      heading: "Outcomes (verified at handoff)",
      body: [
        "Quantitative outcomes from the build, verified at delivery and ongoing operation:",
      ],
      bullets: [
        "Zero missed renewals during the first 6 months of operation (previously 3-5 per month surfaced as customer churn)",
        "Monthly commission reconciliation time reduced from multi-hour exercise to under 30 minutes",
        "Producer pipeline visibility for the first time — principal sees who's upselling, who's losing renewals, where intervention is needed",
        "Document search time on a customer call dropped from minutes (digging through email + Dropbox) to seconds",
        "Customer retention improved on policy lines where renewal-window outreach is now automated (specific lift figures held confidential per agreement)",
      ],
    },
    {
      eyebrow: "Screenshots",
      heading: "Screens (placeholder — to be added)",
      body: [
        "System screenshots are being prepared with client approval. Full screen set available on request during scoping.",
      ],
    },
    {
      eyebrow: "What this means",
      heading: "Lessons from the build",
      body: [
        "Generic CRMs are the wrong answer for industries with strong native workflow patterns — insurance is one of the clearest examples. The same logic applies to any service business where the 'deal' isn't really a deal: real estate (transactions), healthcare (patient encounters), legal (matters), accounting (engagements). Custom-coded systems tuned to the actual workflow pay back faster than the licensing cost of a generic CRM that nobody fully uses.",
      ],
    },
  ],
  faq: [
    {
      question: "Can you build something similar for my insurance agency?",
      answer:
        "Yes — the playbook is portable. Every agency has its own carrier mix, commission structure, and producer model, so each build is custom from the policy-data-model up. We can typically deliver in 8-16 weeks.",
    },
    {
      question: "Does this integrate with my agency management system (AMS)?",
      answer:
        "Often, yes. AMS360, Applied Epic, HawkSoft, EZLynx, and others have integration paths (API, file export, or direct database). We scope the integration approach per agency. Some clients replace the AMS entirely with the custom build; others use the custom system alongside.",
    },
    {
      question: "How long did the build take?",
      answer:
        "Approximately 12 weeks from kickoff to production cutover. Smaller agencies with simpler carrier mixes have shipped in 8 weeks; larger agencies with complex commission structures have taken 16-20 weeks.",
    },
    {
      question: "How much does a build like this cost?",
      answer:
        "Pricing is custom per engagement. Comparable custom CRM builds for independent insurance agencies typically run in the mid-five-figure range. Fixed-price proposal after a free scoping call.",
    },
    {
      question: "What about AI features?",
      answer:
        "We integrate AI where it pays back — automated renewal outreach drafts, document classification on upload, claim-pattern analysis. We don't bolt on AI for its own sake.",
    },
    {
      question: "Is this compliant with state insurance regulations?",
      answer:
        "We build to your state's data-handling requirements. Insurance regulation is state-by-state; we work with your compliance counsel to confirm record retention, customer data handling, and audit-log requirements.",
    },
    {
      question: "Can the principal see everything?",
      answer:
        "Yes — role-based access. Principals see the whole book; producers see their own; CSRs see what they're assigned. Configurable per agency.",
    },
    {
      question: "How do I get started?",
      answer:
 "Email tyler@preissertech.com. Free 30-minute scoping call with Tyler. We'll map your AMS, carrier mix, and renewal workflow, and send a fixed-price proposal.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Astrus Insurance Solutions",
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
  ],
  relatedLinks: [
    { label: "Insurance & Financial Industry", href: "/industries/insurance-financial" },
    { label: "Custom CRM Systems", href: "/services/crm-systems" },
    { label: "Custom Websites", href: "/custom-websites" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  ctaHeadline: "Replace the generic CRM with a system tuned to your agency",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll map your AMS, carrier mix, and renewal workflow, and send a fixed-price proposal.",
};
