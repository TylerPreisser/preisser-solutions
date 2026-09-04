import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "compliance-agent",
  metaTitle: "Compliance Agent",
  metaDescription:
    "Reads regulatory documents and internal policy, flags risk on every artifact before it ships, and produces audit-ready summaries: built for regulated industries.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Compliance Agent",
  tagline:
    "Everything runs through compliance before it ships. Reads regulatory documents and internal policy, flags risk on every artifact, produces audit-ready summaries.",
  category: "Operations & Back-Office",
  status: "deployable",
  industries: ["Healthcare", "Financial services", "Insurance", "Legal", "Manufacturing"],

  h1: "Every artifact reviewed against policy before it ships: compliance in the workflow, not after.",
  subheadline:
    "An AI compliance layer that reads regulatory documents and internal policy, flags risk on every outgoing artifact, and produces audit-ready summaries, keeping compliance in the workflow rather than as an after-the-fact review.",
  oneLine:
    "AI compliance review against regulatory documents and internal policy: risk flags before publishing, audit trail always current.",

  whatItDoes: [
    "In regulated industries, compliance review happens in one of two ways: it's in the workflow before anything ships, or it's a post-incident scramble after something slipped through. The Compliance Agent puts it in the workflow. Every artifact that needs to go out (a patient communication, a financial disclosure, an insurance policy document, a regulatory filing): runs through the compliance layer before delivery.",
    "The agent reads the applicable regulatory documents and internal policy for the business's jurisdiction and industry. It builds a policy graph that maps each rule, requirement, and prohibition. When an artifact runs through the review layer, the agent scores it against the policy graph, flags specific risk items with citations to the applicable rule, and produces a review summary that can be attached to the artifact as an audit record.",
    "The audit log is always current: every artifact reviewed, every flag raised, every approval recorded. Pre-publish review covers outgoing content, documents, and communications. Audit preparation packages the review history for any compliance period. The system is configurable for healthcare (HIPAA), financial (SEC, FINRA, CFPB), insurance (state DOI rules), and any other regulatory framework with available documentation.",
  ],
  capabilities: [
    {
      title: "Regulatory document understanding",
      description:
        "Reads and indexes applicable regulatory documents (statutes, rules, guidance documents): for the business's industry and jurisdiction.",
    },
    {
      title: "Policy graph construction",
      description:
        "Builds a structured policy graph mapping each rule, requirement, and prohibition with citations: the knowledge base the review engine draws from.",
    },
    {
      title: "Pre-publish compliance review",
      description:
        "Runs every outgoing artifact through the policy graph before delivery (documents, communications, filings, marketing materials), and flags specific risk items.",
    },
    {
      title: "Risk scoring with citations",
      description:
        "Each flagged item is scored for risk severity and cited against the specific rule or policy provision it may violate, not generic warnings, but traceable flags.",
    },
    {
      title: "Audit-ready summaries",
      description:
        "Produces review summaries for every artifact that can be attached as audit records: reviewable by regulators, auditors, or internal compliance teams.",
    },
    {
      title: "Audit preparation packages",
      description:
        "Compiles compliance history for any review period (all artifacts reviewed, all flags raised, all approvals recorded): into audit-ready packages.",
    },
  ],
  inputs: [
    { label: "Regulatory documents and guidance for applicable jurisdiction", format: "PDF / structured text" },
    { label: "Internal compliance policy documents", format: "PDF / document" },
    { label: "Artifacts for pre-publish review", format: "Document / text / PDF" },
    { label: "Industry and jurisdiction configuration", format: "Configuration" },
  ],
  outputs: [
    { label: "Compliance review summary per artifact", format: "Document / structured data" },
    { label: "Risk flags with regulatory citations", format: "Structured review output" },
    { label: "Audit log of all artifacts reviewed", format: "Database / export" },
    { label: "Audit preparation package for review periods", format: "PDF / structured export" },
  ],
  howItWorks: [
    {
      step: "Regulatory document ingestion",
      description:
        "Applicable regulatory documents and internal policy are ingested and indexed into the policy graph, the knowledge base for all subsequent reviews.",
    },
    {
      step: "Policy graph construction",
      description:
        "The policy graph maps each rule, requirement, and prohibition with its source citation: structured so review can be traced back to a specific provision.",
    },
    {
      step: "Artifact submission for review",
      description:
        "An artifact enters the review pipeline: submitted manually, via API, or triggered by a workflow step before publication.",
    },
    {
      step: "Risk scoring and flag generation",
      description:
        "The artifact is scored against the policy graph. Risk items are flagged with severity scores and citations to the specific provisions they may implicate.",
    },
    {
      step: "Review output and audit logging",
      description:
        "A review summary attaches to the artifact. The review event logs to the audit trail: reviewable at any time, compilable into audit packages on demand.",
    },
  ],
  useCases: [
    "Use this when your industry requires pre-publish compliance review of patient communications, financial disclosures, or regulated documents before delivery.",
    "Use this when compliance review is currently a manual process (a human reading every outgoing artifact against a policy checklist), and volume has grown beyond what that scales to.",
    "Use this when an upcoming audit requires demonstrating that a review process was in place and operating for a specific time period.",
    "Use this when the business operates in multiple jurisdictions with different applicable rules and tracking which rule applies to which artifact is error-prone.",
    "Use this when compliance flags are currently caught after delivery (in customer complaints, regulatory inquiries, or audit findings), rather than before.",
  ],
  techStack: [
    "Regulatory document understanding",
    "Policy graph construction",
    "AI risk scoring engine",
    "Citation-mapped rule indexing",
    "Audit log database",
    "Audit package generation",
  ],
  relatedSlugs: [
    "industry-specific-agent",
    "ai-bookkeeper",
    "intelligent-inventory-monitoring",
  ],
  cta: {
    heading: "Want compliance review in the workflow: not after something ships?",
    subcopy:
      "Preisser Solutions builds compliance agents trained on your regulatory framework and internal policy. The first conversation covers your industry, your jurisdiction, and what currently passes through without a review layer.",
    buttonLabel: "Scope this for my operation",
    buttonHref: "/contact?product=compliance-agent",
  },
};
