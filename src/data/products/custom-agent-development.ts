import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "custom-agent-development",
  metaTitle: "Custom Agent Development",
  metaDescription:
    "Have a problem we haven't packaged? We design, build, and ship custom agents from scratch: same engineering bar as the catalog, scoped to your business.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Custom Agent Development",
  tagline:
    "Have a unique problem we haven't packaged? We design, build, and ship custom agents from scratch: same engineering bar as the catalog, scoped to your business.",
  category: "Custom Builds",
  status: "service",
  industries: ["All industries", "Any business with a process that can be automated"],

  h1: "Your process, your problem, your agent: built from scratch.",
  subheadline:
    "When none of the catalog products fit your specific problem, Preisser Solutions designs, builds, and deploys a custom agent engineered for your business: same technical bar as every other product in this catalog.",
  oneLine:
    "Custom agent design and build from scratch: scoped to your specific problem and engineered to the same bar as every catalog product.",

  whatItDoes: [
    "Every product in the Preisser Solutions catalog was built for a real problem at a specific business. But not every business's most painful automation problem fits a packaged solution. Custom Agent Development is the engagement where we scope, design, and build from scratch, starting from your problem definition, not from a template.",
    "The process begins with scoping: understanding the problem, the data available, the downstream systems, and what done looks like. Research follows: what patterns exist that are applicable, what the technical architecture should look like, and where the risks are. A prototype validates the core approach before full build investment. Deployment covers integration, testing, and production go-live. Maintenance defines what ongoing support and iteration looks like after the build.",
    "Custom engagements are delivered on the same engineering standard as the catalog products: TypeScript, Claude API, structured orchestration, CLAUDE.md configuration, build-verified before handoff. The range includes single-purpose agents (one task, one system), multi-agent orchestration (parallel agents coordinated by an orchestrator), and embedded AI workflows (AI capability injected into an existing business process or system).",
  ],
  capabilities: [
    {
      title: "Problem scoping and definition",
      description:
        "Structured discovery process to define the exact problem, success criteria, available data, and downstream system requirements before any build begins.",
    },
    {
      title: "Architecture research and design",
      description:
        "Technical architecture designed for the specific problem (single-agent, multi-agent orchestration, or embedded AI workflow): with a clear implementation path.",
    },
    {
      title: "Prototype validation",
      description:
        "Core approach validated in a working prototype before full build investment, surfaces architecture risks and confirms the pattern will work on real data.",
    },
    {
      title: "Production build and deployment",
      description:
        "Full build executed against the validated architecture, integrated with downstream systems, and deployed to production with verification before handoff.",
    },
    {
      title: "CLAUDE.md configuration and documentation",
      description:
        "Every custom build ships with a CLAUDE.md or AGENTS.md configuration so the system can be maintained, iterated, and handed off without knowledge loss.",
    },
    {
      title: "Ongoing maintenance and iteration",
      description:
        "Post-launch support covers bug fixes, performance tuning, and feature additions as the business's needs evolve.",
    },
  ],
  inputs: [
    { label: "Problem definition and success criteria", format: "Discovery conversation / document" },
    { label: "Available data sources and system inventory", format: "Technical assessment" },
    { label: "Downstream system requirements and integrations", format: "Technical specification" },
    { label: "Existing codebase (for embedded AI engagements)", format: "Git repository" },
  ],
  outputs: [
    { label: "Scoping document with problem definition and approach", format: "Document" },
    { label: "Prototype demonstrating core approach", format: "Working code" },
    { label: "Production-deployed custom agent", format: "Deployed system" },
    { label: "CLAUDE.md configuration and technical documentation", format: "Markdown / document" },
    { label: "Handoff package with deployment runbook", format: "Document" },
  ],
  howItWorks: [
    {
      step: "Scoping",
      description:
        "Discovery conversation to define the exact problem, the data available, the downstream systems, and what a successful build looks like.",
    },
    {
      step: "Research and architecture",
      description:
        "Technical architecture is designed for the specific problem: applicable patterns identified, risks surfaced, implementation path documented.",
    },
    {
      step: "Prototype",
      description:
        "A working prototype validates the core approach against real data before full build investment: confirms the pattern works, surfaces integration issues early.",
    },
    {
      step: "Deploy",
      description:
        "Full build executes against the validated architecture, integrates with downstream systems, and deploys to production with verification before handoff.",
    },
    {
      step: "Maintain",
      description:
        "Post-launch support covers bugs, performance, and iteration as the business's needs evolve: the system stays current with your operation.",
    },
  ],
  useCases: [
    "Use this when your most painful automation problem doesn't fit any packaged product in the catalog.",
    "Use this when you have a process that's clearly automatable but the specific document types, systems, and workflow steps are unique to your business.",
    "Use this when an existing software tool or platform needs an AI capability embedded in it rather than replaced.",
    "Use this when you have a multi-step workflow involving several systems that no single product addresses end-to-end.",
    "Use this when you want the same engineering bar as the catalog products but applied to a problem Preisser Solutions hasn't packaged yet.",
  ],
  techStack: [
    "Claude API",
    "Anthropic SDK",
    "Custom orchestration architecture",
    "TypeScript / Next.js (frontend, if applicable)",
    "Target system APIs (engagement-specific)",
    "Deployment pipeline (Cloudflare Pages / Vercel / custom)",
  ],
  relatedSlugs: [
    "marcommand-engine",
    "local-ai-deployment-agent",
    "agentic-coding-specialists",
  ],
  cta: {
    heading: "Have a problem that doesn't fit the catalog?",
    subcopy:
      "Preisser Solutions scopes and builds custom agents from scratch. The first conversation is about your problem, what it costs you today and what solved looks like.",
    buttonLabel: "Start a custom engagement",
    buttonHref: "/contact?inquiry=custom-product",
  },
};
