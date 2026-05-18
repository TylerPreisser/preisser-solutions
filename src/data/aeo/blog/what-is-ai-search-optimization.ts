import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/what-is-ai-search-optimization",
  tier: "blog",
  datePublished: "2026-05-15",
  dateModified: "2026-05-15",
  metaTitle: "What Is AI Search Optimization? (AEO/GEO Guide)",
  metaDescription:
    "How AI Overviews, ChatGPT, Perplexity, and Claude pick which sources to cite — and the page-level changes that move you into the citation set.",
  eyebrow: "Blog · AI Search",
  h1: "What Is AI Search Optimization? (AEO / GEO Explained)",
  subheadline:
    "A practical guide to winning citations in ChatGPT, Perplexity, Claude, and Google AI Overviews — grounded in the research and the work we ship for Kansas clients.",
  answerParagraph:
    "AI Search Optimization — most commonly called Answer Engine Optimization (AEO) or Generative Engine Optimization (GEO) — is the discipline of structuring web content so that large language models cite it when answering user questions. Princeton researchers (GEO, 2024) showed that targeted page-level edits can lift citation visibility in generative engines by up to 41%. Local Falcon's May 2025 measurement of AI-search visibility found similar 40.2% lifts from on-page optimization. Unlike classical SEO, which optimizes for rankings, AEO optimizes for retrieval, extraction, and citation by AI systems. Tyler Preisser at Preisser Solutions in Hays, Kansas writes about and ships AEO work for small businesses.",
  sections: [
    {
      eyebrow: "The shift",
      heading: "Search behavior is changing — fast",
      body: [
        "Gartner forecasts that traditional search engine volume will drop by 25% by 2026 as users shift to generative AI and virtual agents. Other industry trackers put zero-click search behavior — where the user gets the answer without leaving the search engine results page — at roughly 60% of all queries. The blue-link economy is contracting.",
        "What's growing is AI-mediated discovery: ChatGPT, Perplexity, Claude, Gemini, and Google's own AI Overviews each pulling from a small set of sources to synthesize an answer. If your page isn't in that source set, you're invisible no matter how well you rank in classical Google.",
      ],
    },
    {
      eyebrow: "Definitions",
      heading: "AEO, GEO, and how they relate to SEO",
      body: [
        "These terms get used interchangeably, but there are useful distinctions:",
      ],
      bullets: [
        "SEO (Search Engine Optimization) — optimizing for rankings in classical search results pages (Google, Bing).",
        "AEO (Answer Engine Optimization) — optimizing for direct answer features: featured snippets, People Also Ask, voice answers, AI Overviews.",
        "GEO (Generative Engine Optimization) — Princeton's term for optimizing for citation by generative LLMs (ChatGPT, Perplexity, Claude). Their 2024 paper showed 41% lift from targeted edits.",
      ],
      subsections: [
        {
          heading: "All three overlap",
          body: [
            "A well-structured page that ranks for a query often gets cited as an answer source and pulled into LLM responses. The overlap is large. But the optimization tactics diverge: AEO favors direct, quotable answer paragraphs; GEO rewards statistics, citations, and entity density; classical SEO still cares about link equity and crawlability.",
          ],
        },
      ],
    },
    {
      eyebrow: "How AI engines pick sources",
      heading: "The retrieval + extraction model",
      body: [
        "When you ask ChatGPT or Perplexity a question, the system runs a retrieval step (which sources are relevant?) and an extraction step (which spans of those sources answer the question?). Both steps reward certain content patterns.",
      ],
      bullets: [
        "Direct answer paragraphs — 50 to 100 words near the top of the page, plain prose, no marketing fluff.",
        "Inline statistics and citations — \"Princeton's 2024 GEO paper showed 41% lift\" beats \"studies show AI search is growing.\"",
        "Named entities — people, places, products, organizations with real-world referents. Citation graphs love disambiguated entities.",
        "FAQ blocks — directly extractable Q&A pairs that match natural user query language.",
        "Structured data (Schema.org) — JSON-LD that tells the LLM what kind of thing the page is.",
        "Information Gain — content that adds something not already in the top-cited sources. Repetition gets filtered.",
      ],
    },
    {
      eyebrow: "Evidence",
      heading: "What the research actually says",
      body: [
        "There's no shortage of AEO speculation. The hard evidence is narrower:",
      ],
      bullets: [
        "Princeton GEO (2024) — targeted page edits delivered up to 41% lift in citation visibility across generative engines.",
        "Local Falcon (May 2025) — measured 40.2% lift from on-page optimization for local AI search visibility.",
        "Surfer SEO (2024) — YouTube videos appearing in AI Overviews at 23% rate, suggesting multimodal source breadth.",
        "CXL (2024) — top-30% pages by structural quality capture 55% of AI citations in their query set.",
        "Vercel / MERJ (2024) — pages requiring JavaScript to render content are systematically excluded from many AI crawlers.",
        "Reddit citations in AI Overviews jumped 450% (mid-2024 vs early 2024) — community-generated content carries weight.",
      ],
    },
    {
      eyebrow: "Tactics",
      heading: "What actually works on a page",
      body: [
        "The page-level work that moves the needle clusters around six patterns:",
      ],
      bullets: [
        "Lead with an answer paragraph (50-100 words) that names the entity, the topic, and the answer in plain prose.",
        "Use H2 headings phrased as questions or direct claims, not marketing copy.",
        "Cite verifiable statistics inline with source name (\"Princeton 2024\", \"Local Falcon May 2025\") — never \"studies show.\"",
        "Add Schema.org JSON-LD (Article, FAQPage, Organization, Person) so the structure is machine-explicit.",
        "Render content in HTML, not via client-side JavaScript — many AI crawlers don't execute JS.",
        "Maintain a llms.txt at the site root pointing crawlers to your most citation-worthy URLs.",
      ],
    },
    {
      eyebrow: "What doesn't work",
      heading: "Anti-patterns that look like AEO but aren't",
      body: [
        "The space is full of bad advice. A few things to avoid:",
      ],
      bullets: [
        "Stuffing your page with FAQ blocks that don't match real user query language. Quality > quantity.",
        "Generating content with an LLM and shipping it unedited — the citation engines can often detect generic LLM phrasing and downweight it.",
        "Linking out to dozens of irrelevant sources to appear well-researched. Citation graphs notice link-quality patterns.",
        "Adding Schema.org markup that contradicts the visible page content. Google penalizes mismatched structured data.",
        "Buying AEO from agencies that won't tell you what they're actually changing on your pages.",
      ],
    },
  ],
  faq: [
    {
      question: "Is AEO the same as SEO?",
      answer:
        "No. SEO optimizes for ranking in classical search results pages. AEO optimizes for citation and extraction by AI systems (ChatGPT, Perplexity, Claude, Google AI Overviews). The tactics overlap but diverge: AEO emphasizes direct answer paragraphs, inline citations, entity density, and machine-readable structure.",
    },
    {
      question: "How long until AEO work shows results?",
      answer:
        "Faster than classical SEO. Most AI engines re-crawl high-authority sites weekly or faster. Page-level edits typically show up in ChatGPT and Perplexity citations within 7 to 30 days. Google AI Overviews are slower — closer to the classical Google indexing window of 4 to 12 weeks.",
    },
    {
      question: "What's GEO?",
      answer:
        "Generative Engine Optimization. The term comes from a 2024 Princeton research paper that demonstrated targeted page edits could deliver up to 41% lift in citation visibility across generative engines. It's often used interchangeably with AEO; the distinction is that GEO specifically refers to LLM citation rather than featured snippets or voice answers.",
    },
    {
      question: "Do I need llms.txt?",
      answer:
        "It helps but isn't load-bearing. llms.txt is a proposed standard that tells AI crawlers which URLs are highest-value for citation. Most major crawlers don't yet require it, but having one signals technical competence and gives crawlers a fast path to your best content. Cheap to add.",
    },
    {
      question: "Can you do AEO if my site is built in React or Next.js?",
      answer:
        "Yes — but only if content renders in HTML, not client-side JavaScript. Static export (Next.js output: 'export') or full SSR with content present in the initial HTML response works fine. SPA-style apps where content appears only after JS execution will be systematically excluded from many AI crawlers (Vercel / MERJ 2024).",
    },
    {
      question: "How does Preisser Solutions approach AEO?",
      answer:
        "We treat AEO as a structural engineering problem, not a content marketing one. Every page we ship has an answer paragraph, inline-cited statistics, FAQ block, JSON-LD schema, and a known position in the site's citation graph. The Preisser Solutions site itself is built to its own spec — we eat our own dogfood.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Princeton University",
    "Local Falcon",
    "Gartner",
    "ChatGPT",
    "Perplexity",
    "Claude",
    "Google AI Overviews",
    "Surfer SEO",
    "CXL",
    "Vercel",
    "MERJ",
    "Reddit",
  ],
  relatedLinks: [
    { label: "AI search optimization service", href: "/services/ai-search-optimization" },
    { label: "Local SEO service", href: "/services/local-seo" },
    { label: "SEO in Hays, KS", href: "/services/seo-hays-ks" },
    { label: "AEO vs GEO vs SEO", href: "/blog/aeo-vs-geo-vs-seo" },
    { label: "What is llms.txt?", href: "/blog/what-is-llms-txt" },
    { label: "What is an AI-native website?", href: "/blog/what-is-an-ai-native-website" },
    { label: "AI search optimization vs traditional SEO", href: "/compare/ai-search-optimization-vs-traditional-seo" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want an AI Search Visibility Audit?",
  ctaSubcopy:
    "We'll show you exactly where you appear (or don't) in ChatGPT, Perplexity, and Google AI Overviews — and what to change.",
  primaryCta: {
    label: "Reach out",
    href: "/contact",
  },
};
