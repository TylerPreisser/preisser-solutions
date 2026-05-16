import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/what-is-an-ai-native-website",
  tier: "blog",
  datePublished: "2026-04-24",
  dateModified: "2026-05-15",
  metaTitle: "What Is an AI-Native Website?",
  metaDescription:
    "Beyond a chatbot in the corner. The architectural choices that let a website think — and the ones that just look like they do.",
  eyebrow: "Blog · AI Automation",
  h1: "What Is an AI-Native Website?",
  subheadline:
    "A working definition, the architectural patterns, and the difference between a real AI-native site and a marketing site with a chatbot stapled on.",
  answerParagraph:
    "An AI-native website is one where artificial intelligence is part of the architecture, not a bolted-on widget. The defining traits: content is structured for retrieval by large language models (AEO-ready), key user flows can be completed through natural-language interaction (not just form-fill), the site can answer questions about itself by reading its own knowledge base, and the underlying systems (CRM, scheduling, content) are connected to the AI layer through real APIs rather than scripted handoffs. Preisser Solutions in Hays, Kansas builds AI-native sites in Next.js with static export, structured data, and selective LLM integration where it adds real value.",
  sections: [
    {
      eyebrow: "Definition",
      heading: "The four-part working definition",
      body: [
        "\"AI-native\" gets thrown around as a marketing buzzword. Working definition with concrete tests:",
      ],
      bullets: [
        "Content is structured for AI retrieval — every page has an answer paragraph, FAQ block, Schema.org JSON-LD. Crawled by GPTBot, ClaudeBot, PerplexityBot. (AEO baseline.)",
        "Natural-language interaction available — a user can ask \"can you do X for my situation?\" and get a genuine answer that reflects the site's actual knowledge, not a canned chatbot response.",
        "Self-aware — the site can answer questions about itself, its pricing, its case studies, its founder, with current information. Not stale FAQ copy.",
        "Connected to real systems — when AI does take an action (schedule a call, send a quote request), it hits real APIs, not scripted form submission.",
      ],
    },
    {
      eyebrow: "What it's not",
      heading: "Things that look AI-native but aren't",
      body: [
        "A website is not AI-native just because it has:",
      ],
      bullets: [
        "A generic chatbot widget from Intercom, Drift, or a SaaS clone. Those are pattern-matched FAQ responders.",
        "AI-generated copy on a few landing pages. Static content, however generated, doesn't make the site \"AI.\"",
        "A \"powered by GPT\" badge in the footer. That's a marketing claim, not an architecture.",
        "A Calendly embed with an AI-sounding name. Still just calendar booking.",
      ],
    },
    {
      eyebrow: "The architecture",
      heading: "What's under the hood",
      body: [
        "An AI-native site has three architectural layers most marketing sites don't:",
      ],
      bullets: [
        "A retrieval layer — vector-indexed content (your blog, case studies, services pages) that an LLM can query to ground its answers in real site content.",
        "An action layer — a small set of tools the LLM can call (book a meeting, submit a quote request, look up case study details) with proper authentication and idempotency.",
        "A guardrail layer — system prompts and validation that keep the AI in scope. \"I can answer questions about Preisser Solutions and book a call. For anything else, here's the contact form.\"",
      ],
      subsections: [
        {
          heading: "The stack we use",
          body: [
            "Next.js for the static site (AEO baseline guaranteed), a small Workers AI or Anthropic API integration for the conversational layer, vector storage for site content retrieval, and webhook endpoints to whatever CRM or scheduling system the client uses. Total runtime cost: typically under $100/month for a small-business volume.",
          ],
        },
      ],
    },
    {
      eyebrow: "When it's worth it",
      heading: "The honest answer: not for every site",
      body: [
        "Most small-business sites don't need an AI-native architecture. They need a fast, structured, AEO-optimized marketing site that converts visitors into scoping calls. That's not an AI-native problem; that's a content and structure problem.",
        "An AI-native architecture pays off when one of the following is true:",
      ],
      bullets: [
        "The product is technical enough that prospects routinely need help understanding fit — and your sales team's time is the bottleneck.",
        "You have a large content base (50+ pages) where retrieval beats navigation.",
        "Your scheduling, quoting, or intake process has enough variation that a form can't capture it but a conversation can.",
        "Your buyer profile expects AI-native interaction as a signal that you understand modern tooling.",
      ],
    },
    {
      eyebrow: "Cost",
      heading: "What an AI-native build runs",
      body: [
        "For most small-business engagements, layering AI-native capability onto a marketing site is a $15,000-$35,000 add. Below that range, the architecture is overkill. Above it, you're building a full product, not a website.",
        "Preisser Solutions' own site (preissersolutions.com) is AI-native to the standards above — every page is AEO-ready, the architecture supports LLM retrieval, and we use the site as the working reference for client builds.",
      ],
    },
  ],
  faq: [
    {
      question: "Do I need an AI-native website to compete in 2026?",
      answer:
        "No. You need an AEO-ready website — content structured for AI retrieval — to remain visible in ChatGPT, Perplexity, and Google AI Overviews. That's table stakes. Full AI-native architecture is a step beyond and only worth it for the specific cases above.",
    },
    {
      question: "Can I add AI-native capability later?",
      answer:
        "Yes, if the underlying site is built correctly. The AEO foundation (static HTML, schema, structured content) is the same. AI-native adds layers on top — retrieval, action, guardrails — without rewriting the marketing site.",
    },
    {
      question: "What ongoing cost should I expect?",
      answer:
        "API costs scale with usage. Small business volume (a few hundred interactions per month) typically runs $30-$100/month in OpenAI or Anthropic API tokens. Plus your hosting and content management. Total ongoing under $200/month is realistic.",
    },
    {
      question: "Does the AI ever say wrong things?",
      answer:
        "If you don't build guardrails, yes. A properly scoped AI-native site has system prompts that keep the model in scope and explicit fallback paths (\"I'm not sure — let me connect you with Tyler\"). Hallucination risk is engineerable down to acceptable levels but not to zero.",
    },
    {
      question: "Does Preisser Solutions build AI-native sites?",
      answer:
        "Yes — we ship them when the business case justifies the spend. We're equally willing to tell clients an AI-native architecture is overkill for their situation. The Cassidy HVAC engagement, for example, didn't need AI on the website itself; the AI was in the marketing engine and reactivation system, not the public site.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Next.js",
    "OpenAI",
    "Anthropic",
    "Cassidy HVAC",
  ],
  relatedLinks: [
    { label: "What Is AI Automation for Small Businesses?", href: "/blog/what-is-ai-automation-for-small-businesses" },
    { label: "AI vs Traditional Workflow Automation", href: "/blog/ai-vs-traditional-workflow-automation" },
    { label: "Custom Websites", href: "/custom-websites" },
    { label: "Web Applications", href: "/web-applications" },
  ],
  ctaHeadline: "Want to know if AI-native is right for your site?",
  ctaSubcopy:
    "Honest 30-minute call with Tyler. We'll tell you if it's worth it — and if it isn't.",
};
