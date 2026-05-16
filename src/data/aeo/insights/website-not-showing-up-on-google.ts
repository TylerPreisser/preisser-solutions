import type { AeoPageData } from "../types";

/**
 * INSIGHT ARTICLE — /insights/website-not-showing-up-on-google
 *
 * Educational diagnostic for owners whose site is absent from Google
 * results. Sister piece to business-website-not-getting-traffic, focused
 * on the indexing and crawlability layer specifically.
 */
export const pageData: AeoPageData = {
  slug: "insights/website-not-showing-up-on-google",
  tier: "blog",
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  metaTitle: "Why Your Website Is Not Showing Up on Google",
  metaDescription:
    "If your business website is not showing up on Google, check indexing, technical SEO, page structure, local relevance, content quality, and backlinks.",
  eyebrow: "Insights · Diagnostics",
  h1: "Why Your Website Is Not Showing Up on Google",
  subheadline:
    "There's a difference between being invisible and being unranked. Diagnose which one you have before you spend a dollar fixing it.",
  answerParagraph:
    "If your website isn't showing up on Google, there are two possibilities: the page is not in Google's index at all, or it is indexed but ranking too far down to be seen. The fix depends entirely on which one is happening, and the diagnosis takes about ten minutes in Google Search Console. Pages stay out of the index because of robots.txt, noindex tags, duplicate canonicals, soft 404s, or crawl errors. Pages rank poorly because of weak titles, thin content, missing local signals, or no inbound links. Tyler Preisser at Preisser Solutions in Hays, Kansas walks small business owners through both paths.",
  sections: [
    {
      eyebrow: "Step 1",
      heading: "Check whether Google has indexed the page",
      body: [
        "Start with the simplest test. Open Google and type site:yourdomain.com. The results show every URL Google currently has in its index for your domain. If the URL you care about isn't in that list, ranking is irrelevant — the page literally doesn't exist as far as Google search is concerned.",
        "For the authoritative answer, open Google Search Console. Use the URL Inspection tool at the top: paste the exact URL and press Enter. Search Console will report \"URL is on Google\" or \"URL is not on Google\" along with a reason.",
        "If the page is not on Google, click \"Request Indexing.\" That submits the URL to Google's crawl queue. Indexing is not guaranteed and can take days to weeks, but the request is the right first step.",
      ],
    },
    {
      eyebrow: "Step 2",
      heading: "Check titles, headings, and page intent",
      body: [
        "If the page is indexed but invisible in search results, the issue is usually that the page is not aligned with how a real person searches.",
        "Open the page source (right-click → View Page Source in a browser) and find the title tag. Then look at the H1 on the page. If they don't include the phrase a customer would actually type, the page has no realistic shot at ranking for that phrase. Google reads both signals carefully.",
        "Match intent as well as phrasing. A page about \"plumbing services\" that lists pricing tiers will compete poorly against pages targeting \"emergency plumber near me\" if the underlying intent is different. Decide which intent the page targets, then write to that intent exclusively.",
      ],
      bullets: [
        "One primary topic per page — split if you're trying to cover three",
        "Title tag ≤ 60 characters, with the keyword toward the front",
        "H1 in plain customer language, not in marketing-speak",
        "First paragraph answers the search query directly within 100 words",
      ],
    },
    {
      eyebrow: "Step 3",
      heading: "Check technical blockers (robots.txt, noindex, redirects)",
      body: [
        "Many sites accidentally tell Google not to index pages they actually want indexed. Three common culprits cause most of the damage.",
        "Open yourdomain.com/robots.txt in a browser. If you see lines like Disallow: /services/ or Disallow: /, you have blocked Googlebot from those paths. Remove the wrong rules.",
        "Inspect the page source for a <meta name=\"robots\" content=\"noindex\"> tag in the head. Pages staging environments and certain WordPress \"discourage search engines\" settings add this tag automatically and people forget to remove it when the site goes live.",
        "Check redirects. If your top page used to live at /service-name and now redirects to /services/service-name, but the canonical tag on the new page points back to the old one, Google never settles on a stable URL to rank. Pick one canonical URL and link to it consistently from the rest of the site.",
      ],
    },
    {
      eyebrow: "Step 4",
      heading: "Check local business signals",
      body: [
        "Many businesses worry about Google search results when they should be worried about Google Maps results. For local intent queries, the map pack appears above the blue links, and ranking there depends on different signals.",
        "Local signals to check: your Google Business Profile is verified and complete; the business name, address, and phone on your website footer match the profile character-for-character; your service area is set correctly; your services list inside the profile is complete; and your reviews are recent and replied to.",
        "Beyond the profile, a service page should name the city and state in the title, H1, first paragraph, and footer. A page that says \"we serve the entire Midwest\" without naming a single town tends to rank for none of them.",
      ],
    },
    {
      eyebrow: "Step 5",
      heading: "Check whether the page deserves to rank",
      body: [
        "Even when the page is indexed and technically clean, Google may decide the page is not as helpful as the competitors it is being weighed against.",
        "Open the search results yourself in an incognito window and look at the pages currently ranking on page one. They tend to share traits: clear answers to the query high on the page, supporting detail, a relevant image, related questions answered as headings or FAQ, and a credible source (named author, real business, reviews).",
        "If your page is half the length of every page ranking above it, or skips the obvious questions a buyer would ask, Google has a reasonable basis for ranking those pages above yours regardless of how old your domain is.",
      ],
      bullets: [
        "Cover the obvious questions a buyer would ask before calling — pricing, timing, what's included, what's not",
        "Show your work: photos of finished jobs, real names, real testimonials",
        "Add an FAQ block of five to seven real questions, with concise answers",
        "Internally link to two or three closely related pages on your site",
      ],
    },
    {
      eyebrow: "Bigger pattern",
      heading: "When to rebuild instead of patching",
      body: [
        "Most owners try to fix what they have. That is the right move 80% of the time. The other 20% is sites built years ago on cluttered templates, with old plugins, conflicting SEO settings, two or three duplicate URL versions, and structural issues that any new edit fights against.",
        "Signs the site is past patching: pages take longer than four seconds to load on mobile, the platform makes simple edits painful, you have multiple URLs for the same content (with and without www, with and without trailing slash), and the schema has been hand-edited into a mess by plugins.",
        "A clean rebuild on a modern stack with the search, schema, and local signals correct from day one usually outperforms another six months of patches. That's the work Preisser Solutions does for small businesses across Kansas and the Great Plains.",
      ],
    },
  ],
  faq: [
    {
      question: "How do I check if Google has indexed my website?",
      answer:
        "Search Google for site:yourdomain.com. The results show every URL currently in Google's index for that domain. For more detail, open Google Search Console, use the URL Inspection tool, and paste the specific page you want to check. It reports whether the URL is on Google and, if not, why.",
    },
    {
      question: "How long does it take for a new page to show up on Google?",
      answer:
        "Anywhere from a few hours to a few weeks. Sites with established authority and a working sitemap usually see new pages indexed within 1 to 7 days. Brand-new domains can take longer. Submitting the URL through Search Console's URL Inspection tool tends to speed things up.",
    },
    {
      question: "Why does Google index my homepage but not my service pages?",
      answer:
        "Usually one of three things: the service pages aren't linked from anywhere indexable, your sitemap doesn't list them, or each service page is so thin Google treats it as duplicate or low-value. Make sure every service page is linked from the main navigation or the footer, listed in your sitemap, and has at least 400 words of unique content.",
    },
    {
      question: "Does my domain age affect whether I rank on Google?",
      answer:
        "Yes, but not as much as people think. New domains can rank well for low-competition local terms within 30 to 90 days. Older domains have a head start mostly because of inbound links accumulated over time, not the domain age itself. A well-built six-month-old site can outrank a five-year-old neglected one.",
    },
    {
      question: "Will buying backlinks help me show up on Google?",
      answer:
        "No, and it can actively hurt. Paid links violate Google's guidelines and can trigger a manual penalty that suppresses the site for months. Earn citations from real local sources — chamber of commerce, trade associations, local press, supplier sites — and links will follow naturally.",
    },
    {
      question: "Can I appear on Google without having a website?",
      answer:
        "Yes, through a Google Business Profile. A profile alone can drive calls and direction requests if you serve a local market. But a profile without a backing website tends to convert less well — buyers click through to read more, and finding nothing weakens trust. A simple, fast site paired with the profile outperforms either one alone.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Google",
    "Google Search Console",
    "Google Maps",
    "Google Business Profile",
    "robots.txt",
  ],
  relatedLinks: [
    { label: "SEO Hays KS", href: "/services/seo-hays-ks" },
    { label: "Local SEO", href: "/services/local-seo" },
    { label: "Custom Websites", href: "/services/custom-websites" },
    { label: "Contact Preisser Solutions", href: "/contact" },
    { label: "Why Your Business Website Is Not Getting Traffic", href: "/insights/business-website-not-getting-traffic" },
  ],
  ctaHeadline: "Let's find out why you're invisible",
  ctaSubcopy:
    "A free 30-minute screen share. We'll open Search Console with you, find the actual reason, and tell you whether it's a patch or a rebuild.",
  primaryCta: {
    label: "Request a Visibility Audit",
    href: "/contact",
  },
};
