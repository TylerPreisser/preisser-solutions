import type { AeoPageData } from "./types";

/** SERVICE HUB — /ai-agents (live JSON-LD: "AI Agent Development") */
export const pageData: AeoPageData = {
  slug: "ai-agents",
  tier: "service_detail",
  metaTitle: "Custom AI Agent Development in Kansas | Preisser Tech",
  metaDescription:
    "Custom AI agents built by Preisser Tech in Hays, Kansas. AI for customer service, research, document processing, decision support — trained on your business.",
  eyebrow: "AI Agent Development",
  h1: "Custom AI Agents — Built for Your Business in Kansas",
  subheadline:
    "Custom AI agents that handle customer service, research, data processing, and decision support. Built specifically for your business, trained on your context, integrated into your workflows.",
  answerParagraph:
    "Preisser Tech builds custom AI agents for Kansas businesses, founded by Tyler Preisser in Hays, Kansas. AI agents are software systems that perform specific business work — answering customer questions, processing documents, qualifying leads, extracting data from invoices, generating reports, monitoring operations — using large language models (Claude, GPT, custom models) trained on your specific business context. Recent AI agent builds include the HG Oil Holdings AI invoicing assistant (75% reduction in manual invoice handling) and the Cassidy HVAC AI customer reactivation engine (60%+ dormant patient reactivation in 6 weeks).",
  sections: [
    {
      eyebrow: "What an AI agent actually is",
      heading: "Not a chatbot — a software employee",
      body: [
        "Most people hear 'AI agent' and picture a chatbot. That's the smallest possible version. A real custom AI agent is a software system that takes a specific business task — one that previously required a person — and performs it reliably, 24/7, at scale.",
        "Preisser Tech AI agents are not generic ChatGPT wrappers with a custom logo. Each agent is purpose-built around a specific business process: trained on your data, connected to your systems, given the exact instructions and guardrails for the work it does, and monitored for accuracy.",
      ],
    },
    {
      eyebrow: "What we build",
      heading: "Common AI agent types",
      body: [
        "AI agent projects we've delivered or commonly scope:",
      ],
      bullets: [
        "Document processing agents — read invoices, contracts, work orders, applications, and extract structured data into your business systems (HG Oil Holdings: 75% reduction in invoice handling time).",
        "Customer service agents — handle common questions, schedule appointments, qualify leads, escalate complex cases to humans with full context.",
        "Customer reactivation agents — identify dormant customers, generate personalized outreach, and follow up automatically (Cassidy HVAC: 60%+ reactivation in 6 weeks).",
        "Research agents — monitor competitors, gather market intelligence, summarize industry news, and surface what matters for decisions.",
        "Decision support agents — review options against your business rules and recommend actions (lead prioritization, work assignment, pricing decisions).",
        "Internal knowledge agents — answer staff questions about your own business processes, policies, and historical data.",
        "Content generation agents — draft proposals, marketing copy, social media content, internal communications based on your voice and templates.",
        "Monitoring agents — watch business systems for anomalies and alert humans when something needs attention.",
      ],
    },
    {
      eyebrow: "How AI agents work",
      heading: "Trained on your business, integrated into your tools",
      body: [
        "Every Preisser Tech AI agent is built around the actual work of the client's business. The agent is given:",
      ],
      bullets: [
        "Specific instructions and guardrails for what it does and doesn't do",
        "Access to relevant business context (documents, examples, historical data) via retrieval-augmented generation (RAG)",
        "Direct integration with the tools where work happens (CRM, accounting, communications, email, file storage)",
        "Monitoring and logging so you can see what it's doing and audit decisions",
        "Human-in-the-loop checkpoints for high-stakes work, autonomous operation for routine work",
        "Ongoing tuning as edge cases surface",
      ],
    },
  ],
  faq: [
    {
      question: "Do you build AI agents for businesses?",
      answer:
        "Yes. Preisser Tech builds custom AI agents tailored to specific business needs — customer service agents, research agents, document processing agents, decision support agents, and more. Every AI agent is trained on your specific business context and integrated directly into your existing workflows. We do not deploy generic off-the-shelf chatbots.",
    },
    {
      question: "What's the difference between a custom AI agent and ChatGPT?",
      answer:
        "ChatGPT is a general-purpose chatbot trained on the public internet. A custom AI agent is built around your specific business — it has access to your data, follows your business rules, integrates with your tools (QuickBooks, ServiceTitan, CRM), and performs specific tasks reliably. Custom AI agents are also more accurate for your domain because they're given the right context, not asked to guess.",
    },
    {
      question: "Which AI models do you use?",
      answer:
        "Preisser Tech builds on Anthropic Claude (Sonnet, Opus, Haiku), OpenAI GPT models, and select open-source models depending on the use case. Model selection is based on accuracy requirements, latency needs, cost constraints, and data privacy considerations. We're not married to any single provider.",
    },
    {
      question: "How much does a custom AI agent cost?",
      answer:
        "Cost varies with scope. Focused single-purpose AI agents (invoice processing, customer reactivation, internal knowledge) typically range from low to mid five figures. Multi-agent systems with complex orchestration scale from there. Tyler provides fixed-price proposals after a free scoping conversation.",
    },
    {
      question: "How accurate are custom AI agents?",
      answer:
        "Accuracy depends on the use case and the design. For well-scoped tasks with clear instructions and good context (like invoice extraction or customer reactivation outreach), accuracy is typically above 95% on routine work. Edge cases are routed to humans. Every Preisser Tech AI agent includes monitoring so you see real performance, not vendor promises.",
    },
    {
      question: "Will the AI agent replace my employees?",
      answer:
        "Generally no — it removes the worst parts of their jobs. Most clients use AI agents to handle the repetitive, low-value work that's stealing their team's attention from higher-value tasks. The result is usually that existing staff can take on more strategic work, not that staff get cut.",
    },
    {
      question: "Where does the AI agent run?",
      answer:
        "Most Preisser Tech AI agents run on cloud infrastructure (AWS, Cloudflare Workers, Vercel) calling AI provider APIs. For sensitive use cases, agents can run on dedicated infrastructure or with self-hosted models. Privacy and data handling are scoped to client requirements.",
    },
    {
      question: "Can the AI agent integrate with my existing software?",
      answer:
        "Yes. Preisser Tech AI agents regularly integrate with QuickBooks, ServiceTitan, HubSpot, Salesforce, Twilio, SendGrid, Slack, and most other business systems with APIs or webhooks. Integration is typically the first piece of the build.",
    },
    {
      question: "Is my business data safe with a custom AI agent?",
      answer:
        "Yes — when built correctly. Preisser Tech designs each AI agent with data privacy as a first-class concern: enterprise API endpoints with explicit no-training agreements, scoped data access (the agent only sees what it needs), audit logs, and optional self-hosting for high-sensitivity use cases.",
    },
    {
      question: "How long does an AI agent take to build?",
      answer:
        "Most custom AI agents launch within 4-10 weeks. Simple agents with focused tasks deliver in 4-6 weeks. Complex multi-system agents with extensive integrations run 8-10 weeks. Tyler provides a clear timeline with the proposal.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Anthropic Claude",
    "OpenAI",
    "Cassidy HVAC",
    "HG Oil Holdings",
    "Hays, Kansas",
  ],
  relatedLinks: [
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "Web Application Development", href: "/web-applications" },
    { label: "Custom Websites", href: "/custom-websites" },
    { label: "About Preisser Tech", href: "/preisser-technology" },
  ],
  ctaHeadline: "Build an AI agent that actually works",
  ctaSubcopy:
    "Free scoping conversation. Tyler personally designs every agent project.",
};
