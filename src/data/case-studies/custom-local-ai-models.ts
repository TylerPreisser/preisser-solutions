import type { CaseStudyData } from "@/types/case-study";

// Canonical project #18 — Custom Local AI Models.
// Capability demonstration. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "custom-local-ai-models",
  metaTitle: "Custom Local AI Models | Preisser Solutions",
  metaDescription:
    "Custom AI models that run locally — no cloud dependency, no data leaving the network — tuned for specific business operations with proprietary logic.",
  datePublished: "2026-04-10",
  dateModified: "2026-05-20",

  category: "Capability • AI Engineering",
  clientName: "Custom Local AI Models",
  clientNameDisplay: "Capability",
  industry: "Local AI model deployment and custom training",

  h1: "Custom Local AI Models — No Cloud, No Data Leaving the Network",
  subheadline:
    "Local AI models tuned for specific business operations. No cloud dependency, no third-party data egress, and full control over the proprietary logic that runs on top.",
  oneLine: "Custom AI models that run locally with no data leaving your network",

  headlineResults: [
    { value: "Local", label: "Deployment, no cloud dependency" },
    { value: "0", label: "Data leaving the network" },
    { value: "Custom", label: "Fine-tuning on business-specific data" },
    { value: "Edge", label: "On-premises or edge deployment options" },
  ],

  before: {
    heading: "Cloud AI is fast — and not always the right answer.",
    body: [
      "Sending business data through a third-party AI provider is the default path. It is also the wrong path in plenty of cases. Regulated industries restrict where data can travel. Trade-secret-heavy operations have proprietary logic they cannot expose. Air-gapped facilities cannot route through anyone's API. The general-purpose model is also rarely tuned for the operation being modeled.",
      "Local AI changes that. The model lives on hardware you control, trained on your data, and the proprietary logic that sits on top stays in-house. The trade-off is engineering complexity — local deployment is not a check-the-box workflow.",
    ],
  },

  built: {
    heading: "Locally deployed models, custom-tuned, proprietary logic on top.",
    body: [
      "Preisser Solutions builds custom AI models that run on the client's own infrastructure — on-premises servers, dedicated machines, or edge devices. The model is fine-tuned on the client's business-specific data so the output reflects the actual operation rather than a generic baseline.",
      "Proprietary logic — business rules, scoring frameworks, escalation criteria — integrates directly on top of the local model. Nothing leaves the network. Updates and re-training cycles happen on the client's schedule, in the client's environment. The pattern fits regulated industries, secrecy-heavy operations, and air-gapped facilities where cloud AI is structurally off the table.",
    ],
  },

  specifications: {
    heading: "Capability surface.",
    bullets: [
      "Local model deployment with no cloud dependency",
      "Custom fine-tuning on business-specific data",
      "Proprietary business logic integrated on top of the model",
      "On-premises or edge deployment options",
      "Air-gapped network compatibility",
      "Re-training cycles run on the client's schedule",
    ],
    subsections: [
      {
        title: "Deployment options",
        items: [
          "On-premises server hosting",
          "Edge device deployment for distributed operations",
          "Air-gapped network configurations",
          "Hybrid options where appropriate",
        ],
      },
      {
        title: "What clients control",
        items: [
          "Training data — never leaves the network",
          "Proprietary logic on top of the base model",
          "Update and re-training cadence",
          "Access policies and audit logs",
        ],
      },
    ],
  },

  results: [
    {
      value: "Local",
      label: "Deployment with no cloud dependency",
      context:
        "The model runs on the client's hardware — server, dedicated machine, or edge device. Cloud services are not in the loop.",
    },
    {
      value: "0",
      label: "Data leaving the network",
      context:
        "Training data, inference inputs, and outputs all stay inside the client's network boundary.",
    },
    {
      value: "Custom-tuned",
      label: "Fine-tuning on business data",
      context:
        "The model is fine-tuned on the client's business-specific data so output reflects the actual operation, not a generic baseline.",
    },
    {
      value: "Edge-ready",
      label: "On-premises or edge deployment",
      context:
        "Architecture supports on-premises hosting, edge devices for distributed operations, or air-gapped network configurations.",
    },
  ],

  techStack: [
    "Local model fine-tuning",
    "On-premises deployment",
    "Edge inference",
    "Air-gapped deployment patterns",
    "Custom business logic integration",
    "Proprietary scoring frameworks",
  ],

  relatedSlugs: [
    "ai-document-analysis",
    "ai-trend-behavioral-analysis",
    "ai-fitness-wellness-agent",
  ],

  cta: {
    heading: "Need AI that runs on your hardware with your data?",
    subcopy:
      "Preisser Solutions builds custom local AI deployments for regulated, secrecy-heavy, or air-gapped operations. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
