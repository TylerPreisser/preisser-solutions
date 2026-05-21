import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "agentic-coding-specialists",
  metaTitle: "Agentic Coding Specialists | Preisser Solutions",
  metaDescription:
    "Domain-tuned Claude Code sub-agents that architect, debug, and ship entire projects autonomously. Tyler's actual development toolset — not a pitch, a practice.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Agentic Coding Specialists",
  tagline:
    "Domain-tuned Claude Code sub-agents that architect, debug, and ship entire projects autonomously.",
  category: "Custom & Infrastructure",
  status: "production",
  industries: ["Software development", "Technology", "B2B services", "Any business with a software build"],

  h1: "AI coding agents that architect, debug, and ship — not just autocomplete.",
  subheadline:
    "Domain-tuned sub-agents built on Claude Code that take a specification and produce a working, production-grade codebase — following a structured research, build, and verify pipeline across the full development lifecycle.",
  oneLine:
    "Specialized agentic coding systems that architect, implement, and ship entire projects with minimal human handholding.",

  whatItDoes: [
    "There is a significant difference between AI coding tools that autocomplete lines and agentic coding systems that can be handed a specification and produce a working codebase. The latter requires domain tuning, structured orchestration, and a defined verification protocol — not just a general-purpose model in a code editor.",
    "Preisser Solutions operates a set of domain-tuned agentic coding specialists built on Claude Code. Each specialist is configured for a specific domain — frontend architecture, backend systems, data pipelines, API integration — with a CLAUDE.md or AGENTS.md file that encodes the architectural decisions, coding conventions, verification steps, and constraints for that domain. The agent follows a research phase before building and a verification phase before declaring anything complete.",
    "This is the actual development toolset used to build preissersolutions.com, the Iron and Oak Podcast site, the Alpha Matrix system, and every other build in this catalog. The specialists are not a service concept — they are running production work today. Preisser Solutions deploys the same agentic coding architecture for client builds where the task is well-defined and the domain expertise is encoded.",
  ],
  capabilities: [
    {
      title: "Domain-specific agent configuration",
      description:
        "Each specialist is tuned for a specific development domain — frontend, backend, data pipeline, integrations — with domain knowledge, conventions, and constraints encoded in the agent configuration.",
    },
    {
      title: "Sub-agent delegation architecture",
      description:
        "Complex builds are decomposed into parallel workstreams executed by specialized sub-agents — an orchestrator coordinates, individual agents build specific components independently.",
    },
    {
      title: "Structured research-build-verify pipeline",
      description:
        "Every agent follows a three-phase workflow: read and understand the full context first, build against the specification, verify against defined criteria before marking anything complete.",
    },
    {
      title: "AGENTS.md / CLAUDE.md portable configuration",
      description:
        "Architectural decisions, coding patterns, file maps, and constraints are encoded in portable configuration files that travel with the codebase — any agent instance reads the same instructions.",
    },
    {
      title: "Cross-agent schema validation",
      description:
        "Agents that produce outputs consumed by other agents validate their output schema before handoff — preventing integration failures caused by type or format mismatches.",
    },
    {
      title: "Full-project lifecycle coverage",
      description:
        "Agents handle the complete software lifecycle: initial architecture, feature implementation, debugging, refactoring, documentation, and deployment configuration.",
    },
  ],
  inputs: [
    { label: "Project specification or feature requirements", format: "Document / prompt" },
    { label: "AGENTS.md or CLAUDE.md agent configuration", format: "Markdown configuration" },
    { label: "Existing codebase (for continuation or refactor engagements)", format: "Git repository" },
    { label: "Tech stack and architectural constraints", format: "Configuration / specification" },
  ],
  outputs: [
    { label: "Production-grade codebase or feature implementation", format: "Code files / Git repository" },
    { label: "Updated CLAUDE.md or AGENTS.md with session decisions", format: "Markdown configuration files" },
    { label: "Build and type-check verification results", format: "Console output / CI report" },
    { label: "Architecture documentation and file maps", format: "Markdown documents" },
  ],
  howItWorks: [
    {
      step: "Configuration and context loading",
      description:
        "The agent reads the domain configuration file, existing codebase, and specification before writing any code — building a complete picture of architecture, conventions, and constraints.",
    },
    {
      step: "Task decomposition and delegation",
      description:
        "For multi-component builds, the orchestrator decomposes the work into parallel sub-tasks and delegates each to the appropriate specialist agent, defining the interface contracts between them.",
    },
    {
      step: "Domain-tuned implementation",
      description:
        "Each specialist builds its component following the encoded conventions — no pattern drift, no deviation from the established architecture, no generic code where domain-specific patterns are defined.",
    },
    {
      step: "Integration and verification",
      description:
        "Components integrate and the full build runs through the configured verification protocol — type checking, build compilation, test execution, and any domain-specific checks.",
    },
    {
      step: "Documentation and handoff",
      description:
        "Session decisions, new file paths, and architectural changes are written back to the configuration files so the next agent session starts with an accurate state of the codebase.",
    },
  ],
  useCases: [
    "Use this when you have a well-defined specification for a software build and want to compress the development timeline by running multiple implementation streams in parallel.",
    "Use this when you need a software build that follows consistent architectural decisions and coding conventions throughout rather than drifting as different parts of the project are developed.",
    "Use this when debugging an existing codebase requires systematic analysis before proposing a fix — not ad-hoc patching, but structured root-cause investigation.",
    "Use this when you need a build that can be picked up by any future agent instance without knowledge transfer — because the architectural context lives in the configuration files, not in someone's memory.",
    "Use this when the development work is in a domain where Preisser Solutions has a tuned specialist: Next.js frontends, Claude API integrations, data pipeline architecture, or multi-agent system design.",
  ],
  techStack: [
    "Claude Code",
    "Claude Sonnet 4.5",
    "Next.js / React",
    "TypeScript",
    "AGENTS.md / CLAUDE.md configuration",
    "Multi-agent orchestration architecture",
  ],
  relatedSlugs: [
    "local-ai-deployment-agent",
    "custom-agent-development",
    "marcommand-engine",
  ],
  cta: {
    heading: "Want agentic coding specialists working on your build?",
    subcopy:
      "Preisser Solutions deploys domain-tuned coding agents for well-specified software builds. The first conversation covers your specification, your stack, and where human-in-the-loop makes sense.",
    buttonLabel: "Scope this for my project",
    buttonHref: "/contact?product=agentic-coding-specialists",
  },
};
