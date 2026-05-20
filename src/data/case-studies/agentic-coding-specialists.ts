import type { CaseStudyData } from "@/types/case-study";

// Canonical project #16 — Agentic AI Coding Specialists.
// Internal Preisser Solutions toolset. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "agentic-coding-specialists",
  metaTitle: "Agentic AI Coding Specialists | Preisser Solutions",
  metaDescription:
    "Specialized agentic coding models that architect, debug, and ship projects autonomously — the internal Preisser Solutions build toolset.",
  datePublished: "2026-02-04",
  dateModified: "2026-05-20",

  category: "Internal Platform • AI Architecture",
  clientName: "Agentic Coding Specialists",
  clientNameDisplay: "Internal — Preisser Solutions Toolset",
  industry: "Agentic AI coding and Claude Code orchestration",

  h1: "Agentic Coding Specialists — The Toolset Behind Every Shipped Build",
  subheadline:
    "Specialized agentic coding models that architect, debug, and ship entire projects autonomously. Each agent is tuned for a specific domain — frontend, backend, data, agents themselves.",
  oneLine: "Specialized agentic coding agents, each tuned to a build domain",

  headlineResults: [
    { value: "Multi-agent", label: "Claude Code delegation pattern" },
    { value: "3 phases", label: "Research, build, verify" },
    { value: "Schema", label: "Validated sub-agent briefs" },
    { value: "Portable", label: "AGENTS.md / .claude configuration" },
  ],

  before: {
    heading: "Generic AI coding tools, generic results.",
    body: [
      "Off-the-shelf AI coding assistants are general-purpose by design. That generality is fine for autocomplete and one-shot snippets, and a serious tax on serious work. A frontend agent should think about design systems and animation choreography. A backend agent should think about schema migrations and idempotency. A research agent should think about citations. They should not all be the same agent.",
      "The Preisser Solutions toolset is built around specialization. Each agentic coding specialist is tuned for a specific domain, runs through a research → build → verify pipeline, and delegates to sub-agents when the work is parallelizable. The result is shipped projects, not snippets.",
    ],
  },

  built: {
    heading: "Claude Code multi-agent delegation, specialized per domain.",
    body: [
      "Each specialist runs Claude Code as the orchestration layer. The main thread coordinates — never executes — and delegates to sub-agents with clear, schema-validated briefs. The pipeline is consistent across specialists: a research phase establishes what is known and what needs to be discovered, a build phase produces the work in isolation, and a verify phase runs the actual checks (tests, type-checks, lint, hand-off review) before anything is claimed complete.",
      "AGENTS.md and .claude configuration files make every specialist portable. The same agent can be pointed at a new repository and pick up the conventions of that codebase without re-tuning. The whole toolset is what makes Preisser Solutions ship work at the volume and quality that named clients expect.",
    ],
  },

  specifications: {
    heading: "How the toolset is wired.",
    bullets: [
      "Claude Code multi-agent delegation pattern",
      "Sub-agent architecture with clear briefs and schema validation",
      "Research → build → verify three-phase pipeline",
      "Domain-specific tuning per specialist",
      "AGENTS.md / .claude configuration for portability across repos",
      "Orchestrator-only main threads — sub-agents do the work",
    ],
    subsections: [
      {
        title: "Specialist roles",
        items: [
          "Frontend specialist — design systems, animation, accessibility",
          "Backend specialist — schema, migrations, idempotency, API design",
          "Data specialist — pipelines, transformations, schema validation",
          "Agent specialist — building further agents and prompts",
          "Verification specialist — tests, lint, type-checks, review pass",
        ],
      },
      {
        title: "Pipeline mechanics",
        items: [
          "Research phase establishes context and unknowns",
          "Build phase happens in isolation per sub-agent",
          "Verify phase runs the actual commands and reports evidence",
          "Schema-validated briefs prevent silent contract drift",
        ],
      },
    ],
  },

  results: [
    {
      value: "Multi-agent",
      label: "Claude Code delegation pattern",
      context:
        "Every specialist runs as a main-thread orchestrator with sub-agents handling parallelizable work.",
    },
    {
      value: "3 phases",
      label: "Research, build, verify",
      context:
        "Each task moves through research, build, and verify phases — verification is not optional.",
    },
    {
      value: "Schema briefs",
      label: "Validated sub-agent contracts",
      context:
        "Sub-agent briefs are schema-validated so the contract between orchestrator and worker does not silently drift.",
    },
    {
      value: "Portable",
      label: "Configuration across repos",
      context:
        "AGENTS.md and .claude configuration make every specialist portable — point at a new repo and the conventions follow.",
    },
  ],

  techStack: [
    "Claude Code",
    "Claude API",
    "Multi-agent orchestration",
    "Schema-validated briefs",
    "AGENTS.md configuration",
    ".claude tooling",
    "Domain-specific prompt tuning",
  ],

  relatedSlugs: [
    "marcommand",
    "query-dominance",
    "alpha-matrix",
  ],

  cta: {
    heading: "Want shipped work, not snippets?",
    subcopy:
      "Preisser Solutions runs an internal toolset of agentic coding specialists. Engagements ship through that toolset. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
