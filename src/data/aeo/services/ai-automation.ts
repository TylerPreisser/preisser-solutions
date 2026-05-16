import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "services/ai-automation",
  tier: "service_detail",
  metaTitle: "AI Automation for Small Businesses | Preisser Solutions",
  metaDescription:
    "Custom AI automation for Kansas businesses — AI agents, invoice processing, customer reactivation, lead qualification, after-hours triage, dashboards, CRM workflows.",
  eyebrow: "AI Automation",
  h1: "AI Automation for Small Businesses",
  subheadline:
    "Custom-coded AI agents and automation systems that take repetitive work off your team without rip-and-replacing the software you already run.",
  answerParagraph:
    "Preisser Solutions delivers AI automation for small and mid-sized businesses in Kansas and select clients nationwide. Founded by Tyler Preisser in Hays, Kansas, the firm builds custom-coded AI agents, business automation workflows, AI invoicing, customer reactivation engines, and after-hours triage systems. Builds are custom — not Zapier-glued no-code, not productized SaaS — and integrate directly with the CRMs, dispatch systems, and accounting tools clients already run. Tyler personally codes every engagement. Cassidy HVAC's reactivation engine recovered 60%+ of dormant customers in 6 weeks; HG Oil Holdings cut back-office logistics time 95% with the same approach.",
  sections: [
    {
      eyebrow: "Hays and Kansas",
      heading: "AI automation for Hays and Kansas small businesses",
      body: [
        "Searching AI automation Hays KS, AI consulting Hays KS, or custom AI agent Hays KS? Preisser Solutions is headquartered in Hays, Kansas and builds AI automation systems for small and mid-sized businesses across the state. Tyler Preisser personally scopes, designs, and codes every engagement — no offshore handoff, no productized SaaS, no Zapier wrapper relabeled as AI.",
        "Most Hays and western Kansas operators get the fastest ROI from AI agents that handle invoicing, customer reactivation, after-hours triage, lead qualification, and dashboarding — not from chatbots bolted onto a marketing site. The build pattern is narrow, opinionated, and shipped in weeks rather than quarters.",
      ],
    },
    {
      eyebrow: "What AI automation actually means here",
      heading: "AI automation = AI agents + custom workflows + your existing systems",
      body: [
        "AI automation, as Preisser Solutions delivers it, has three layers. First, AI agents — LLM-powered workers (Claude, GPT-4, custom RAG) that read invoices, draft replies, triage calls, summarize meetings, and run multi-step reasoning the way a junior employee would.",
        "Second, the workflow plumbing that connects those agents to the rest of the business — your CRM, your accounting system, your dispatch tool, your inbox. Third, the integration code that makes it durable: idempotent retries, error logging, human-in-the-loop checkpoints, audit trails.",
        "What we don't sell: chatbot widgets, off-the-shelf 'AI consulting,' or no-code Zapier stacks dressed up as AI. Every Preisser Solutions AI automation is custom code, custom-fit, custom-owned.",
      ],
    },
    {
      eyebrow: "What we build",
      heading: "AI automation services we ship",
      body: [
        "Common AI automation engagements:",
      ],
      bullets: [
        "AI invoicing — extract line items from PDFs, reconcile to POs, post to accounting with human approval. HG Oil Holdings cut manual invoice handling time 75%.",
        "Customer reactivation engines — pull dormant records from CRM, hyper-personalize SMS + email outreach, route replies into booking flows. Cassidy HVAC recovered 60%+ of dormant patients in 6 weeks.",
        "After-hours call triage — 24/7 AI receptionist that captures intent, books appointments, escalates emergencies, drops everything into your CRM with structured notes.",
        "Lead qualification agents — score inbound forms and calls against your ICP, route hot leads to humans, nurture the rest automatically.",
        "Marketing content engines — generate, schedule, and publish social content using persuasive-psychology frameworks. Cassidy HVAC's engine ran fully hands-off for 5x organic reach in 30 days.",
        "Internal AI copilots — RAG over your SOPs, contracts, customer history; staff query in natural language instead of digging through SharePoint.",
        "Multi-agent workflows — orchestration of multiple specialized agents (e.g., MarCommand) for complex tasks no single agent handles well.",
      ],
    },
    {
      eyebrow: "How we build it",
      heading: "The Preisser Solutions AI automation process",
      body: [
        "We start with a free 30-minute scoping call with Tyler. We map the workflow as it actually runs (not as the org chart says it runs), identify the highest-ROI candidates for AI, and send a fixed-price proposal. Build cycles typically run 4-12 weeks per system.",
        "Everything ships with monitoring, human checkpoints where stakes are high, and full source code in your repo. You own the build. You can fork it, extend it, or run it without us forever.",
      ],
    },
    {
      eyebrow: "Why this works for SMBs",
      heading: "Why AI automation pays back fastest at small-business scale",
      body: [
        "Big companies hire McKinsey and pay $4M for an AI strategy deck. Small businesses don't get that option — and they don't need to. The highest-ROI AI automations at SMB scale are narrow, opinionated, and built in weeks, not quarters.",
        "A Kansas HVAC shop running 4-12 trucks has the same back-office friction as a 200-truck operation, but no IT department to fix it. That's exactly the scope where custom AI automation pays back hardest: one engineer, four weeks, one system that takes 10+ hours of weekly office work off the table.",
      ],
    },
  ],
  faq: [
    {
      question: "What's the difference between AI automation and regular automation?",
      answer:
        "Regular automation (Zapier, Make.com) moves data between systems on fixed rules. AI automation adds reasoning — an LLM reads, decides, drafts, summarizes, or routes based on context. Most Preisser Solutions builds combine both: AI for judgment-heavy steps, deterministic code for everything else.",
    },
    {
      question: "Should I use ChatGPT or Claude for my AI automation?",
      answer:
        "Both, depending on the task. We use Claude (Anthropic) for long-context reasoning, document analysis, and agentic workflows. We use GPT-4 (OpenAI) for fast classification, structured extraction, and some generation tasks. We pick per use case, not per brand allegiance.",
    },
    {
      question: "How much does an AI automation build cost?",
      answer:
        "Focused single-system builds typically run low-to-mid five figures. Multi-system or platform-level builds scope higher. We deliver a fixed-price proposal after a free 30-minute scoping call with Tyler.",
    },
    {
      question: "Do you sell AI automation as a productized SaaS?",
      answer:
        "No. Every Preisser Solutions AI automation is custom-coded for the specific client's CRM, accounting system, brand voice, and workflow. The playbook is portable across clients but each implementation is built from scratch.",
    },
    {
      question: "Can AI replace my employees?",
      answer:
        "No, and you don't want it to. The right framing is task replacement, not job replacement. AI handles the repetitive, low-judgment tasks that drain skilled employees' time — invoice entry, dormant-list outreach, content scheduling, after-hours triage. Your people then spend that time on work that actually requires a human.",
    },
    {
      question: "What if my data is sensitive?",
      answer:
        "We architect every build with data sensitivity in mind. Options include self-hosted models, regional API endpoints, redaction layers before LLM calls, and audit logging. HIPAA-capable patterns are available; we discuss compliance constraints during scoping.",
    },
    {
      question: "How do I know if AI automation is worth it for my business?",
      answer:
        "Free 30-minute call with Tyler. We map your highest-friction workflows, identify which ones have AI-automation ROI, and tell you honestly when something isn't worth automating yet.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Claude",
    "GPT-4",
    "Anthropic",
    "OpenAI",
    "Cassidy HVAC",
    "HG Oil Holdings",
  ],
  relatedLinks: [
    { label: "AI Automation in Hays, KS", href: "/services/ai-automation-hays-ks" },
    { label: "AI Consulting in Hays, KS", href: "/services/ai-consulting-hays-ks" },
    { label: "Custom AI Agents in Hays, KS", href: "/services/custom-ai-agents-hays-ks" },
    { label: "AI Invoice Processing (Use Case)", href: "/use-cases/ai-invoice-processing-small-business" },
    { label: "After-Hours AI Receptionist (Use Case)", href: "/use-cases/after-hours-ai-receptionist-small-business" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "AI Agents", href: "/ai-agents" },
    { label: "AI Invoicing", href: "/services/ai-invoicing" },
    { label: "AI Customer Service", href: "/services/ai-customer-service" },
    { label: "Customer Reactivation", href: "/services/customer-reactivation" },
  ],
  ctaHeadline: "Find the AI automation that pays back fastest",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll map your workflows, identify the highest-ROI automations, and send a fixed-price proposal.",
};
