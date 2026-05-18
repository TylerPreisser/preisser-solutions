import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/what-is-llms-txt",
  tier: "blog",
  datePublished: "2026-05-10",
  dateModified: "2026-05-15",
  metaTitle: "What Is llms.txt? A Plain-English Guide",
  metaDescription:
    "The proposed standard for telling LLMs how to read your site, why it matters less than people think, and how to ship one that actually helps.",
  eyebrow: "Blog · AI Search",
  h1: "What Is llms.txt? A Plain-English Guide",
  subheadline:
    "Everything you need to know about the proposed standard for AI crawlers — and the case for shipping one anyway.",
  answerParagraph:
    "llms.txt is a proposed web standard, introduced in 2024 by Jeremy Howard, that lets a website tell large language models which URLs are highest-priority for citation and how to interpret the site's content. It lives at the root of a domain (e.g., https://preissersolutions.com/llms.txt) and uses a structured Markdown format. No major AI crawler currently requires llms.txt, but several read it, and shipping one is cheap insurance that signals technical competence. Preisser Solutions in Hays, Kansas ships a llms.txt on every site we build.",
  sections: [
    {
      eyebrow: "The proposal",
      heading: "What llms.txt actually is",
      body: [
        "llms.txt is to AI crawlers what robots.txt is to classical search crawlers: a root-level file that gives the visiting bot a structured hint about how to interpret the site. The format is a Markdown document with:",
      ],
      bullets: [
        "An H1 with the site name.",
        "A blockquote with a short site description.",
        "Optional H2 sections grouping URLs by category (Docs, Products, Blog, etc.).",
        "Each URL listed as a Markdown link with a brief annotation.",
        "Optional \"Optional\" section for URLs the crawler can skip.",
      ],
      subsections: [
        {
          heading: "Why Markdown?",
          body: [
            "Because LLMs already read Markdown natively. The format is human-readable and machine-parseable without a separate schema. It's the same logic as why Schema.org JSON-LD is the dominant structured-data format — pick a notation the consumer already understands.",
          ],
        },
      ],
    },
    {
      eyebrow: "The reality",
      heading: "Adoption is partial — but growing",
      body: [
        "Let's be honest about the state of adoption. As of mid-2026:",
      ],
      bullets: [
        "No major AI crawler (OpenAI's GPTBot, Anthropic's ClaudeBot, Perplexity's PerplexityBot, Google-Extended) requires llms.txt.",
        "Several read it opportunistically when present and use it as a prioritization signal.",
        "The standard is on its way to wider adoption but hasn't reached the universality of robots.txt.",
        "The cost of shipping one is approximately zero — a static text file at the root.",
        "The downside risk is also zero — crawlers that don't understand it simply ignore it.",
      ],
    },
    {
      eyebrow: "How to ship one",
      heading: "A minimal llms.txt",
      body: [
        "A working llms.txt for a small business site looks like this. Keep it short — crawlers don't want a sitemap dump, they want a curated index.",
      ],
      bullets: [
        "Start with the H1 (site name) and a single-sentence blockquote describing what the business does.",
        "Group URLs by category (About, Services, Blog, Case Studies, Contact).",
        "Annotate each URL with one sentence describing what's on the page.",
        "Skip thin pages — privacy policy, terms, generic landing pages.",
        "Update when you add cornerstone content. No more than monthly maintenance.",
      ],
    },
    {
      eyebrow: "What it doesn't do",
      heading: "Mistakes to avoid",
      body: [
        "A few things llms.txt is not:",
      ],
      bullets: [
        "It is not a substitute for clean, citation-worthy HTML on the pages themselves. A llms.txt pointing at a JS-only SPA still won't get cited.",
        "It is not a replacement for Schema.org JSON-LD. The two work together: llms.txt directs the crawler; JSON-LD tells it what each page is.",
        "It is not enforced — no crawler treats it as gospel. It's a hint, not a directive.",
        "It is not a place to hide. Anything you list in llms.txt should also be linked from your normal nav and sitemap.",
      ],
    },
    {
      eyebrow: "Why we ship it anyway",
      heading: "The case for doing it now",
      body: [
        "The marginal cost of shipping llms.txt is one to three hours of work. The marginal upside is meaningful if even one major crawler upgrades it from \"opportunistic read\" to \"required input\" in the next 12 months — which several signals suggest is plausible.",
        "We also use llms.txt as a discipline forcing function. The act of curating the 20-40 most citation-worthy URLs on a site surfaces gaps. If you can't write a single useful sentence about a URL, that URL probably needs work.",
      ],
    },
  ],
  faq: [
    {
      question: "Does Google read llms.txt?",
      answer:
        "Google has not officially confirmed using llms.txt as an input to AI Overviews or Search. Google-Extended (Google's AI training opt-out signal) is separate and uses robots.txt syntax. Treat llms.txt as primarily relevant for non-Google AI engines for now.",
    },
    {
      question: "Where does llms.txt go on my site?",
      answer:
        "At the root: https://yoursite.com/llms.txt. Same location pattern as robots.txt and sitemap.xml. Must be accessible without authentication and return Content-Type: text/markdown or text/plain.",
    },
    {
      question: "Should I list every URL on my site?",
      answer:
        "No. llms.txt is a curated index, not a full sitemap. Aim for 20 to 60 URLs covering your highest-value pages — homepage, core services, cornerstone blog posts, named case studies, FAQ, contact. Skip thin or duplicate pages.",
    },
    {
      question: "How often should I update it?",
      answer:
        "When you add cornerstone content. Monthly review is usually enough. The file isn't dynamic — there's no need to regenerate it for every new page.",
    },
    {
      question: "Does Preisser Solutions ship llms.txt on every build?",
      answer:
        "Yes. Every site we ship — including preissersolutions.com itself — has a curated llms.txt at the root. It's a one-hour add during build and it's part of the AEO baseline we treat as table stakes.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Jeremy Howard",
    "OpenAI",
    "Anthropic",
    "Perplexity",
    "Google",
    "GPTBot",
    "ClaudeBot",
  ],
  relatedLinks: [
    { label: "AI search optimization service", href: "/services/ai-search-optimization" },
    { label: "Custom websites", href: "/services/custom-websites" },
    { label: "Local SEO service", href: "/services/local-seo" },
    { label: "What is AI search optimization?", href: "/blog/what-is-ai-search-optimization" },
    { label: "AEO vs GEO vs SEO", href: "/blog/aeo-vs-geo-vs-seo" },
    { label: "What is an AI-native website?", href: "/blog/what-is-an-ai-native-website" },
    { label: "Why your site needs an llms.txt", href: "/insights/llms-txt-small-business-website" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want us to ship a llms.txt for your site?",
  ctaSubcopy:
    "Part of every Preisser Solutions AEO engagement. Or done as a standalone in under a week.",
  primaryCta: {
    label: "Reach out",
    href: "/contact",
  },
};
