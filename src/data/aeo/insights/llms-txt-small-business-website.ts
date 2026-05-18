import type { AeoPageData } from "../types";

/**
 * INSIGHT ARTICLE — /insights/llms-txt-small-business-website
 *
 * Plain-language explainer on llms.txt, llms-full.txt, and AI-readable
 * site structure for small businesses.
 */
export const pageData: AeoPageData = {
  slug: "insights/llms-txt-small-business-website",
  tier: "blog",
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  metaTitle: "llms.txt for Small Business Websites",
  metaDescription:
    "A practical explanation of llms.txt, llms-full.txt, AI-readable site structure, and how small businesses can make their websites easier for AI assistants to understand.",
  eyebrow: "Insights · AI Search",
  h1: "What Is llms.txt for a Small Business Website?",
  subheadline:
    "A plain-language explanation of the file, what it actually does, and whether a small business should bother adding one.",
  answerParagraph:
    "An llms.txt file is a markdown file placed at the root of a website (for example, preissersolutions.com/llms.txt) that gives AI assistants like ChatGPT, Claude, Perplexity, and Gemini a guided map of the most important pages on the site. It's a proposed convention introduced in 2024 by Jeremy Howard and is structurally similar to robots.txt or sitemap.xml — a small, text-based signal aimed at machines, not humans. For a small business, an llms.txt does not guarantee citation, but it makes the site easier to parse and can improve how AI assistants summarize and refer to the business. Tyler Preisser at Preisser Solutions implements it as part of every AI search optimization build.",
  sections: [
    {
      eyebrow: "The file itself",
      heading: "What llms.txt is",
      body: [
        "An llms.txt file is plain text in markdown format, sitting at /llms.txt on the root domain. It contains the business name, a short summary, and a curated list of important URLs with brief descriptions of what each page covers.",
        "There is a companion file called llms-full.txt that contains the full body content of the most important pages, concatenated into a single markdown document. The split mirrors the difference between a table of contents and the full book — the short file gives an AI assistant a quick overview, the long file gives it the actual content if it wants to read in detail.",
        "Both files are published publicly. AI crawlers can request them like any other URL. There is no special authentication, no submission process, and no \"Google Search Console\" equivalent — the file just exists, and assistants that look for it find it.",
      ],
    },
    {
      eyebrow: "Reality check",
      heading: "What llms.txt is not",
      body: [
        "It's worth being clear about what the file does and doesn't do, because the marketing around llms.txt has gotten ahead of the substance.",
      ],
      bullets: [
        "Not a ranking system — there is no algorithm that ranks llms.txt files against each other",
        "Not a guarantee of AI citation — citation depends on many factors and llms.txt is only one signal",
        "Not required — ChatGPT, Claude, and Perplexity can read and cite sites that don't have one, and many do",
        "Not a standard yet — it's a proposed convention with growing but not universal adoption",
        "Not a replacement for clean HTML, schema markup, or a well-structured site — it complements those, doesn't replace them",
      ],
    },
    {
      eyebrow: "The case for it",
      heading: "Why local businesses should care",
      body: [
        "Even with the caveats above, there's a reasonable case for adding an llms.txt to a small business site. AI assistants are increasingly used by buyers to find local services. \"Find me a roofer in Hays that handles storm damage and has good reviews\" is now a real query running through ChatGPT and Perplexity, not just Google.",
        "When an AI assistant decides which business to mention in its answer, it consults the sites it can read. A site that hands the assistant a clean, structured summary of who it is, what it does, and where it operates is easier for the assistant to summarize correctly. A site that requires the assistant to infer all of that from a JavaScript-heavy page is more likely to be skipped or misrepresented.",
        "The upside is asymmetric. Adding an llms.txt takes an hour of work and costs nothing to maintain. If even one buyer per quarter ends up calling because an AI assistant cited the business correctly, the file paid for itself. The downside risk is essentially zero.",
      ],
    },
    {
      eyebrow: "Composition",
      heading: "What to include",
      body: [
        "A useful llms.txt for a small business has a consistent shape:",
      ],
      bullets: [
        "Business name as an H1, followed by a one-line tagline",
        "A short summary paragraph: what the business does, who it serves, where it operates, and the principal's name",
        "An organized list of the most important pages: home, about, services (each major service), case studies, contact",
        "For each link: a clean URL and a one-sentence description of what the page covers",
        "Sections grouped logically — services together, case studies together, trust pages together",
        "Optional: hours, phone, address, and primary categories at the bottom for a quick fact lookup",
      ],
      subsections: [
        {
          heading: "Real example",
          body: [
            "Preisser Solutions publishes both files publicly. You can see them at:",
            "preissersolutions.com/llms.txt — the short guided map",
            "preissersolutions.com/llms-full.txt — the long-form bundle of the most important page content",
            "Looking at a working pair tends to make the structure clearer than reading specifications. Both files are kept in sync with the site automatically as part of the build, so there's no drift between what the public pages say and what the AI-readable files claim.",
          ],
        },
      ],
    },
    {
      eyebrow: "The bigger picture",
      heading: "How it works with schema and clean HTML",
      body: [
        "An llms.txt file is one signal in a larger pattern of AI-readable site design. It does its job best when the rest of the site is also clean and structured.",
        "Schema.org markup — particularly LocalBusiness, Person, FAQPage, and Article types — gives AI assistants typed, machine-readable facts about the business. JSON-LD schema blocks are read by both Google and AI assistants and significantly improve how well a site can be understood.",
        "Clean HTML — content that renders in the initial server response without requiring JavaScript to execute — is increasingly important. Some AI crawlers run JavaScript; many do not. A site that hides its content behind a client-side render is invisible to a meaningful share of AI traffic.",
        "FAQ blocks, named entities (the business name, the principal's name, the city, suppliers, partners), and direct answer paragraphs near the top of each page all increase the odds of accurate AI citation. The llms.txt is the index that points the assistant to all of this — but the underlying content has to be worth indexing.",
      ],
    },
    {
      eyebrow: "Implementation",
      heading: "How Preisser Solutions implements it",
      body: [
        "On every site Preisser Solutions builds, llms.txt and llms-full.txt are generated from the same source data that drives the live pages. There is no separate file to maintain — the AI-readable layer updates automatically when the site updates.",
        "The default structure: a short summary block, a sectioned list of the most important pages (home, about, services, case studies, blog, contact), and a clean fact block with hours, phone, address, and core categories. The long file bundles the body content of the most important pages in markdown, formatted for easy parsing by an LLM.",
        "The implementation is part of the broader AI Search Optimization service — schema markup, named entities, FAQ blocks, llms files, and clean static HTML rendered server-side. The work pays off only when the pieces compose together. Adding an llms.txt to an otherwise unreadable site produces little. Adding one to a well-structured site closes a loop that's otherwise left open.",
      ],
    },
  ],
  faq: [
    {
      question: "Do I need an llms.txt file for my small business website?",
      answer:
        "You don't need one in the sense that nothing breaks without it. But the file takes about an hour to add, costs nothing to maintain when generated from the site's own data, and provides a small but real signal to AI assistants. For most small businesses with an active AI search presence as a goal, the answer is yes.",
    },
    {
      question: "Is llms.txt the same as robots.txt?",
      answer:
        "No. robots.txt tells search engines which pages they may and may not crawl. llms.txt is the opposite intent — it actively offers AI assistants a guided summary of the most important pages. Different purpose, different audience, different content format. Both files live at the root of the domain but they don't replace each other.",
    },
    {
      question: "Will ChatGPT or Perplexity actually read my llms.txt file?",
      answer:
        "Adoption is growing but not universal. Some assistants and crawlers consult llms.txt explicitly; others don't yet. The file is read on demand when the assistant chooses to look. Even when it isn't directly consulted, the structure of having the file forces the site owner to organize the most important pages clearly, which has secondary benefits.",
    },
    {
      question: "Can an llms.txt file hurt my SEO?",
      answer:
        "No. The file is intended for AI assistants and is ignored by Google's main ranking systems. There's no documented case of an llms.txt file harming search rankings. The file is parallel to the SEO layer, not in conflict with it.",
    },
    {
      question: "How do I create an llms.txt for my website?",
      answer:
        "Manually: create a plain text file in markdown format with your business name, a short summary, and a curated list of important pages with one-line descriptions. Save it as llms.txt at the root of your domain. Programmatically: generate it from your site's content data at build time, which avoids the file drifting out of sync with the rest of the site as pages change.",
    },
    {
      question: "What's the difference between llms.txt and llms-full.txt?",
      answer:
        "llms.txt is a short, curated index — business summary plus a list of links. llms-full.txt is the long form, bundling the full body content of the most important pages into one markdown document. The short file is for quick assistant lookups; the long file is for assistants that want to ingest the actual content without crawling each page individually.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Jeremy Howard",
    "ChatGPT",
    "Claude",
    "Perplexity",
    "Gemini",
    "llms.txt",
    "Schema.org",
  ],
  relatedLinks: [
    { label: "AI search optimization service", href: "/services/ai-search-optimization" },
    { label: "Custom websites", href: "/services/custom-websites" },
    { label: "What is llms.txt?", href: "/blog/what-is-llms-txt" },
    { label: "Building a website for AI search", href: "/blog/website-for-ai-search" },
    { label: "What is an AI-native website?", href: "/blog/what-is-an-ai-native-website" },
    { label: "AEO vs GEO vs SEO", href: "/blog/aeo-vs-geo-vs-seo" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want an AI-readable site?",
  ctaSubcopy:
    "We'll review your current site for AI readability — schema, llms.txt, clean HTML, named entities — and tell you what's missing. Free, 30 minutes.",
  primaryCta: {
    label: "Request an AI Readability Audit",
    href: "/contact",
  },
};
