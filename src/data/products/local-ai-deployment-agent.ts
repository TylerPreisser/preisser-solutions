import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "local-ai-deployment-agent",
  metaTitle: "Custom Local AI Deployment",
  metaDescription:
    "Fine-tuned models that run on-premises or at the edge — zero data leaving the network. Custom AI for businesses where cloud dependency is not an option.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Custom Local AI Deployment",
  tagline:
    "Fine-tuned models that run on-premises or at the edge — zero data leaving the network.",
  category: "Custom Builds",
  status: "deployable",
  industries: ["Healthcare", "Financial services", "Manufacturing", "Insurance", "Government and defense"],

  h1: "AI that runs on your hardware — no cloud, no data exposure.",
  subheadline:
    "Custom AI models fine-tuned on your proprietary data and deployed on-premises or at the edge — no API calls to external providers, no sensitive data leaving the network, full operational control.",
  oneLine:
    "On-premises AI deployment with custom fine-tuning — zero cloud dependency and zero data leaving the network.",

  whatItDoes: [
    "Cloud-dependent AI has a ceiling for businesses where data sovereignty, compliance requirements, or network constraints make external API calls a non-starter. Healthcare systems processing patient records, financial institutions with regulatory constraints, manufacturers with proprietary process data, and any organization operating in air-gapped or restricted environments cannot route sensitive data through external model providers.",
    "Custom Local AI Deployment builds and fine-tunes models that run entirely on the client's hardware. The base model is selected for the hardware profile and task requirements, fine-tuned on the client's proprietary data and business logic, and deployed in an on-premises or edge configuration. After deployment, the system operates with no cloud dependency — inference runs locally, data stays on the network, and there are no external API calls in the data path.",
    "The proprietary logic encoded in the model during fine-tuning — domain terminology, decision frameworks, document formats, classification rules — is the model's knowledge, not a prompt that could be intercepted or a configuration that requires cloud services to apply. The intelligence moves with the deployment.",
  ],
  capabilities: [
    {
      title: "On-premises model deployment",
      description:
        "Models deploy to the client's hardware and run entirely locally — no inference traffic routed through external providers, no internet dependency in the processing path.",
    },
    {
      title: "Custom fine-tuning on proprietary data",
      description:
        "Base models are fine-tuned on the client's specific data — documents, terminology, decision rules, and output formats — so the deployed model reflects the business's actual knowledge.",
    },
    {
      title: "Edge deployment support",
      description:
        "Models can deploy at the edge for latency-sensitive or network-restricted environments, running on embedded hardware or local inference servers.",
    },
    {
      title: "Zero data-leaving-network architecture",
      description:
        "The full inference path — data in, model processing, output out — runs within the client's network boundary. No external API calls are made during production use.",
    },
    {
      title: "Proprietary logic integration",
      description:
        "Business-specific decision frameworks, classification rules, and domain knowledge are encoded into the model during fine-tuning rather than applied as prompt engineering at inference time.",
    },
    {
      title: "Hardware-profile-matched model selection",
      description:
        "Model selection accounts for the target hardware profile — GPU memory, inference latency requirements, and throughput targets — to match the deployment capability to the operational need.",
    },
  ],
  inputs: [
    { label: "Proprietary training data (documents, records, labeled examples)", format: "PDF / CSV / JSON / structured database export" },
    { label: "Hardware specification for target deployment environment", format: "Technical specification" },
    { label: "Task requirements (classification, extraction, generation, etc.)", format: "Requirements document" },
    { label: "Compliance and data handling constraints", format: "Compliance documentation" },
    { label: "Inference latency and throughput requirements", format: "Requirements document" },
  ],
  outputs: [
    { label: "Fine-tuned model weights deployed to target hardware", format: "Model files / container" },
    { label: "Local inference API endpoint for downstream integration", format: "REST API / local socket" },
    { label: "Deployment documentation and operational runbook", format: "Document" },
    { label: "Fine-tuning evaluation report with accuracy benchmarks", format: "Report" },
  ],
  howItWorks: [
    {
      step: "Requirements and hardware assessment",
      description:
        "Task requirements, compliance constraints, and the target hardware profile are assessed to determine the appropriate base model and fine-tuning approach.",
    },
    {
      step: "Training data preparation",
      description:
        "Proprietary data is structured into a fine-tuning dataset — examples, labels, and format specifications that encode the target task and domain knowledge.",
    },
    {
      step: "Model fine-tuning",
      description:
        "The selected base model is fine-tuned on the prepared dataset, with evaluation checkpoints to verify task performance before deployment.",
    },
    {
      step: "On-premises deployment",
      description:
        "The fine-tuned model deploys to the client's hardware with an inference API layer — fully self-contained, no external dependencies in the serving path.",
    },
    {
      step: "Integration and validation",
      description:
        "The deployed model integrates with downstream business systems via the local API, and production accuracy is validated against the client's operational data before go-live.",
    },
  ],
  useCases: [
    "Use this when regulatory requirements prohibit patient, financial, or operational data from being sent to external AI providers — but you need AI-powered automation in those workflows.",
    "Use this when latency requirements make cloud inference impractical — edge deployments require sub-100ms inference that cloud round-trips cannot reliably deliver.",
    "Use this when the domain knowledge required for the task is sufficiently proprietary that fine-tuning on internal data produces materially better results than general-purpose cloud models.",
    "Use this when network constraints (air-gapped environments, limited bandwidth, unreliable connectivity) make cloud-dependent AI architectures operationally unreliable.",
    "Use this when intellectual property concerns mean that prompts and model inputs should never leave the organization's network boundary.",
  ],
  techStack: [
    "Local model inference runtime (Ollama / vLLM / llama.cpp)",
    "Custom fine-tuning pipeline",
    "On-premises hardware deployment",
    "Local REST API inference layer",
    "Hardware-optimized model quantization",
    "Deployment containerization",
  ],
  relatedSlugs: [
    "agentic-coding-specialists",
    "custom-agent-development",
    "compliance-agent",
  ],
  cta: {
    heading: "Need AI that runs inside your network — not through someone else's cloud?",
    subcopy:
      "Preisser Solutions scopes on-premises AI deployments from hardware assessment through fine-tuning and integration. The first conversation covers your task requirements, hardware environment, and compliance constraints.",
    buttonLabel: "Scope this deployment",
    buttonHref: "/contact?product=local-ai-deployment-agent",
  },
};
