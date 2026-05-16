import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/website-for-ai-search",
  tier: "blog",
  datePublished: "2026-05-08",
  dateModified: "2026-05-15",
  metaTitle: "How To Build a Website AI Search Engines Understand",
  metaDescription:
    "Twelve concrete on-page changes that move pages from \"crawled\" to \"cited\" in ChatGPT, Perplexity, and Google AI Overviews.",
  eyebrow: "Blog · AI Search",
  h1: "How To Build a Website That AI Search Engines Understand",
  subheadline:
    "Twelve concrete on-page changes that move a page from \"crawled\" to \"cited.\" Everything below is shipped on preissersolutions.com itself.",
  answerParagraph:
    "Building a website for AI search means writing and structuring pages so that large language models can retrieve, extract, and cite them confidently. The core moves are: render content in HTML rather than client-side JavaScript, lead each page with a 50-100 word answer paragraph, use H2 headings phrased as questions, cite verifiable statistics inline, emit Schema.org JSON-LD, maintain a llms.txt, and add an FAQ block. Preisser Solutions ships this baseline on every Next.js build — including preissersolutions.com itself, which uses static export to guarantee crawler compatibility.",
  sections: [
    {
      eyebrow: "Foundation",
      heading: "1. Render content in HTML, not JavaScript",
      body: [
        "Vercel and MERJ's 2024 research showed that pages requiring client-side JavaScript to render their main content are systematically excluded from many AI crawlers. OpenAI's GPTBot and Anthropic's ClaudeBot don't execute JavaScript the way Googlebot does.",
        "Fix: use static site generation (Next.js output: 'export'), server-side rendering, or traditional HTML. The content must be in the initial HTML response, not assembled in the browser.",
      ],
    },
    {
      eyebrow: "On-page structure",
      heading: "2-5. Four content patterns that move citations",
      body: [
        "These four moves compound — none of them is a magic bullet, but together they shift a page from \"crawled\" to \"cited.\"",
      ],
      bullets: [
        "Lead each page with a 50 to 100 word answer paragraph. Plain prose, no marketing fluff, names the entity and answers the implied question.",
        "Use H2 headings phrased as questions or direct claims (\"What does AI automation cost?\" beats \"Our Pricing\").",
        "Cite verifiable statistics inline with the source name (\"Princeton 2024 GEO paper\", \"Local Falcon May 2025\") — never \"studies show.\"",
        "Add an FAQ block of 5+ Q&A pairs that match real user query language. Use FAQPage JSON-LD to mark it explicitly.",
      ],
    },
    {
      eyebrow: "Machine-readable structure",
      heading: "6-8. Schema, sitemap, and llms.txt",
      body: [
        "AI engines reward machine-readability. Three structural elements every site needs:",
      ],
      bullets: [
        "Schema.org JSON-LD on every meaningful page. Article or BlogPosting for blog posts; Service for service pages; Organization once at the site level; FAQPage for FAQ blocks.",
        "An XML sitemap at /sitemap.xml listing every important URL. Updated automatically on every build.",
        "A llms.txt at the root curating the 20-60 highest-value URLs with one-sentence annotations. Hint, not enforcement, but signals technical competence.",
      ],
    },
    {
      eyebrow: "Entity density",
      heading: "9-10. Name real things",
      body: [
        "AI engines build citation graphs around real-world entities. Pages that name disambiguated entities (people, places, organizations, products) get cited more often than pages that talk in abstractions.",
      ],
      bullets: [
        "Name the founder, the town, the products, the clients (with permission). \"Tyler Preisser in Hays, Kansas, built a custom CRM for Astrus Insurance\" carries more entity weight than \"our team helped a Kansas insurance agency.\"",
        "Link out to authoritative external entities where relevant (Princeton, Local Falcon, Gartner research). Outbound citations to recognized entities improve your own citation worthiness.",
      ],
    },
    {
      eyebrow: "Freshness and authority",
      heading: "11-12. Dates and identity",
      body: [
        "AI engines prefer fresh, identity-anchored content over anonymous evergreen copy.",
      ],
      bullets: [
        "Add datePublished and dateModified to every Article/BlogPosting page. Update dateModified when content meaningfully changes.",
        "Establish a canonical author identity. Person schema for the author, sameAs links to verified profiles (LinkedIn, GitHub, professional associations). E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals carry weight.",
      ],
    },
    {
      eyebrow: "Anti-patterns",
      heading: "Things that look right but hurt you",
      body: [
        "A few moves that look like AEO optimization but actually downweight your citations:",
      ],
      bullets: [
        "Stuffing FAQ blocks with questions nobody asks. AI engines detect generic LLM-generated Q&A and penalize it.",
        "Schema markup that contradicts the visible content. Google penalizes structured-data mismatches.",
        "Hidden text or links intended to influence crawlers but not visible to users.",
        "Adding 50+ outbound links to appear well-researched. Citation graphs notice link-quality patterns.",
        "Publishing AI-generated content with no editorial pass. The phrasing patterns are detectable and discounted.",
      ],
    },
  ],
  faq: [
    {
      question: "Does this work for sites already built in WordPress?",
      answer:
        "Yes. WordPress sites render content in HTML by default and can emit Schema.org JSON-LD via plugins (Yoast, Rank Math) or custom code. The content patterns (answer paragraphs, inline citations, FAQ blocks) apply identically.",
    },
    {
      question: "What about Squarespace, Wix, and Shopify?",
      answer:
        "All three render content server-side and are compatible with AI crawlers. The constraint with these platforms is granular control over JSON-LD schema and llms.txt — some platforms make these harder to customize. Workable but not ideal.",
    },
    {
      question: "How long until I see results?",
      answer:
        "Most AI engines re-crawl active sites weekly or faster. Page-level edits typically show up in ChatGPT and Perplexity citations within 7 to 30 days. Google AI Overviews are slower (4 to 12 weeks).",
    },
    {
      question: "Can I just hire a copywriter to do this?",
      answer:
        "Copy is half the work. The other half is structural — HTML rendering strategy, JSON-LD schema, sitemap, llms.txt, internal linking, route architecture. That half needs an engineer. Preisser Solutions builds it as a unified system because the two halves aren't separable.",
    },
    {
      question: "Does Preisser Solutions audit existing sites?",
      answer:
        "Yes. Our AI Search Visibility Audit covers all twelve points above plus a query-by-query citation test against ChatGPT, Perplexity, Claude, and Google AI Overviews. Fixed-price, typically returned within five business days.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Vercel",
    "MERJ",
    "OpenAI",
    "Anthropic",
    "Princeton University",
    "Local Falcon",
    "Gartner",
    "Next.js",
  ],
  relatedLinks: [
    { label: "What Is AI Search Optimization?", href: "/blog/what-is-ai-search-optimization" },
    { label: "What Is llms.txt?", href: "/blog/what-is-llms-txt" },
    { label: "AEO vs GEO vs SEO", href: "/blog/aeo-vs-geo-vs-seo" },
    { label: "AI Search Optimization Service", href: "/services/ai-search-optimization" },
  ],
  ctaHeadline: "Want a full AI Search Visibility Audit?",
  ctaSubcopy:
    "We test your site against the twelve points above plus query-by-query citation tests across ChatGPT, Perplexity, Claude, and Google AI Overviews.",
  primaryCta: {
    label: "Request an AI Search Visibility Audit",
    href: "/contact?intent=audit",
  },
};
