import type { AeoPageData } from "../types";

/**
 * INSIGHT ARTICLE — /insights/business-website-not-getting-traffic
 *
 * Educational diagnostic for small business owners whose website is not
 * pulling traffic. Plain-language checklist. No fabricated stats.
 */
export const pageData: AeoPageData = {
  slug: "insights/business-website-not-getting-traffic",
  tier: "blog",
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  metaTitle: "Why Your Business Website Is Not Getting Traffic",
  metaDescription:
    "A practical checklist for small businesses whose website is not getting traffic from Google, maps, referrals, or AI search.",
  eyebrow: "Insights · Diagnostics",
  h1: "Why Your Business Website Is Not Getting Traffic",
  subheadline:
    "Most small business sites with no traffic fail one of six checks. Walk through each one, in order, and fix what you find.",
  answerParagraph:
    "If your business website isn't getting traffic, the cause is almost always one of six things: the site isn't indexed by Google, your pages don't match the way real people search, your Google Business Profile is weak or missing, the site is too slow or too thin, the content doesn't prove local relevance, or you have no inbound links or citations. Most owners try to fix \"SEO\" in general. The faster path is to work through these six checks one at a time and only address the layer that's actually broken. Tyler Preisser at Preisser Solutions in Hays, Kansas walks small business owners through this exact sequence.",
  sections: [
    {
      eyebrow: "Step 1",
      heading: "Your site may not be indexed",
      body: [
        "Before you change anything else, confirm Google has actually added your pages to its index. A page that isn't indexed will get zero organic traffic no matter how good the copy is.",
        "Open Google Search Console, connect your domain if you haven't, and look at the Indexing → Pages report. It splits your URLs into Indexed and Not Indexed buckets. If Not Indexed is larger than Indexed, that is your first problem.",
        "Common reasons pages stay out of the index: the page is blocked by robots.txt, it has a noindex tag in the head, it is duplicate content with another URL, it returns a soft 404, or the server was slow when Googlebot tried to crawl. Search Console's \"Why pages aren't indexed\" report names the specific reason for each URL.",
        "A quick manual check: open Google and search site:yourdomain.com. If only the homepage shows up, your service pages and content pages are not being seen.",
      ],
    },
    {
      eyebrow: "Step 2",
      heading: "Your pages may not match real searches",
      body: [
        "If pages are indexed but still get no traffic, the next question is whether the page targets a phrase anyone actually types into Google.",
        "Owners often write pages around how the business talks about itself — internal product names, taglines, broad marketing language — instead of around how a customer describes the problem. A page titled \"Our Solutions\" almost never ranks. A page titled \"Same-Day Furnace Repair in Hays, KS\" can.",
        "Use Search Console's Performance report to see what queries already trigger an impression for your domain. Sort by impressions, look at queries with 50+ impressions and a position worse than ten, and rewrite the matching page title and H1 to use the exact phrasing the searcher used. This is the lowest-effort, highest-impact move for a small site.",
      ],
      bullets: [
        "Lead with a problem the customer would name, not a product the business sells",
        "Put the city or service area in the title tag when you serve a local market",
        "Match the H1 to the title — Google reads both",
        "Add one FAQ per page that uses a real long-tail question",
      ],
    },
    {
      eyebrow: "Step 3",
      heading: "Your Google Business Profile may be weak",
      body: [
        "Most local searches resolve in the map pack — the three businesses Google shows above the blue links. If your business is not winning a spot there, you are watching competitors take phone calls that should be yours.",
        "Check your Google Business Profile (search for your business name on Google and click Edit profile, or open business.google.com). The profile needs the right primary category, a complete services list, current hours, recent photos, a clean business name (no keyword stuffing), and a phone number that matches your website footer exactly.",
        "Reviews drive map ranking more than most owners think. A profile with fewer than twenty reviews and no recent activity tends to lose to a competitor with eighty reviews from the last twelve months, even when the website is weaker.",
      ],
    },
    {
      eyebrow: "Step 4",
      heading: "Your site may be too slow or too thin",
      body: [
        "Pages that take more than three seconds to load on a phone lose a meaningful share of visitors before the content even paints. Google also factors page experience into ranking — slow, layout-shifting mobile pages get suppressed.",
        "Run your homepage and your top service page through PageSpeed Insights. If your Largest Contentful Paint on mobile is worse than 2.5 seconds, or your Cumulative Layout Shift is above 0.1, that is a real ranking and conversion drag.",
        "Thin content is the other half of this issue. Pages with under 300 words, no images, no headings, and no internal links rarely earn traffic. If your service pages are one paragraph and a contact form, expand them with a clear scope of work, an FAQ block, and a soft proof point (a photo, a testimonial, or a short case description).",
      ],
    },
    {
      eyebrow: "Step 5",
      heading: "Your content may not prove local relevance",
      body: [
        "Google needs evidence that your business operates where it says it operates. \"Trust me, I'm in Hays\" is not evidence. Specific local signals are.",
        "On a local service page, that usually means: the city and state in the title, the H1, the first paragraph, and the footer; an embedded Google map; the same NAP (name, address, phone) the Google Business Profile uses; a short list of neighborhoods or nearby towns the business actually serves; and at least one piece of local content (a photo from a job, a customer name from the area, a reference to a local event or landmark).",
        "Inbound mentions matter too. A link or citation from the regional chamber of commerce, a local news write-up, or a nearby trade association gives Google something external to confirm what your site is claiming.",
      ],
    },
    {
      eyebrow: "Where to start",
      heading: "What to fix first",
      body: [
        "If you only have a few hours, do these in order and stop at the first one that surfaces real damage:",
      ],
      bullets: [
        "Open Search Console → Indexing → Pages. Fix anything in the \"Why pages aren't indexed\" list before doing anything else.",
        "Open your Google Business Profile. Confirm the primary category, services list, hours, photos, and recent reviews.",
        "Pick the one page that should be your highest-traffic page. Rewrite the title, H1, and first paragraph to match how a customer searches.",
        "Run PageSpeed Insights on that page. If mobile LCP is worse than 2.5 seconds, fix the heaviest image and remove any unused script.",
        "Ask three recent customers for a Google review the same week. Reply to every existing review, good or bad.",
      ],
      subsections: [
        {
          heading: "When patching is no longer enough",
          body: [
            "If your site was built years ago on a template platform, layered with plugins, and has had three different people touch the SEO over time, you may spend more time fighting the existing structure than you would rebuilding cleanly. At that point, a focused rebuild on a fast, modern stack typically outperforms another round of patches. That's the work Preisser Solutions does for small businesses across Kansas — a clean rebuild with the search, schema, and local signals correct from day one.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "How long does it take to get traffic to a new business website?",
      answer:
        "A new domain usually takes 30 to 90 days to start ranking for low-competition local terms once the site is indexed, has a complete Google Business Profile, and has a few inbound mentions. Competitive commercial keywords take longer. Rebuilt sites with strong content can move faster because the domain and existing citations carry forward.",
    },
    {
      question: "Why does my website show up when I search for my business name but nothing else?",
      answer:
        "Your homepage is indexed, but your inner pages either aren't being found or aren't matching real search queries. Open Google Search Console and look at the Indexing → Pages report and the Performance report. Most often the page titles and H1 tags don't include the phrases people actually type when looking for your service.",
    },
    {
      question: "Do I need to pay for Google Ads to get traffic?",
      answer:
        "No, paid ads are not required. Ads can buy short-term visibility while organic and local SEO catch up, but most local service businesses can earn the majority of their leads from a well-built Google Business Profile, a fast website, and pages that match real search queries.",
    },
    {
      question: "Will adding a blog fix my traffic problem?",
      answer:
        "Only if the blog answers questions your customers actually ask. A blog full of generic industry posts rarely helps. A handful of pages that answer specific buyer questions (pricing, comparisons, location-specific concerns) tend to do more than dozens of generic posts.",
    },
    {
      question: "How do I know if my Google Business Profile is hurting me?",
      answer:
        "Search for your business by name on Google. If your profile shows missing categories, no recent posts, fewer than twenty reviews, no service list, or photos older than a year, those are all signals you can improve. Also compare your review count and recency against your top three local competitors — that gap usually predicts the map pack outcome.",
    },
    {
      question: "Can AI search tools like ChatGPT and Perplexity send me traffic?",
      answer:
        "Yes, increasingly. AI assistants pull from sites with clean structure, named entities, FAQ content, and schema markup. Building a site for AI readability tends to also help with Google, because the underlying signals overlap. There's no guaranteed citation — but a well-structured site is far more likely to be referenced than a thin, plugin-heavy one.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Google",
    "Google Search Console",
    "Google Business Profile",
    "PageSpeed Insights",
    "Core Web Vitals",
  ],
  relatedLinks: [
    { label: "Local SEO", href: "/services/local-seo" },
    { label: "Custom Websites", href: "/services/custom-websites" },
    { label: "Why Your Website Is Not Showing Up on Google", href: "/insights/website-not-showing-up-on-google" },
    { label: "Contact Preisser Solutions", href: "/contact" },
    { label: "SEO Hays KS", href: "/services/seo-hays-ks" },
  ],
  ctaHeadline: "Want a second pair of eyes on your site?",
  ctaSubcopy:
    "Tyler will walk through your site, your Search Console, and your Google Business Profile and tell you the one thing to fix first. No upsell on the call.",
  primaryCta: {
    label: "Request a Site Diagnostic",
    href: "/contact",
  },
};
