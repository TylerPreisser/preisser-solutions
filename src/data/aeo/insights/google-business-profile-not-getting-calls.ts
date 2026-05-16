import type { AeoPageData } from "../types";

/**
 * INSIGHT ARTICLE — /insights/google-business-profile-not-getting-calls
 *
 * Educational piece for owners with visible GBPs that don't convert
 * profile views into phone calls.
 */
export const pageData: AeoPageData = {
  slug: "insights/google-business-profile-not-getting-calls",
  tier: "blog",
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  metaTitle: "Google Business Profile Not Getting Calls",
  metaDescription:
    "Common reasons a Google Business Profile gets views but not calls, including weak categories, poor reviews, thin services, bad photos, and weak local pages.",
  eyebrow: "Insights · Local",
  h1: "Why Your Google Business Profile Is Not Getting Calls",
  subheadline:
    "If your profile shows up but no one is calling, the views aren't the problem. The conversion path from view to call is broken in one of five places.",
  answerParagraph:
    "When a Google Business Profile gets views but not calls, the issue is rarely visibility — it is everything that happens after a searcher lands on the profile. The five most common causes: wrong primary category (so the right buyers don't even click), incomplete services list (so the profile doesn't match intent), reviews that look weaker than competitors right next to you, photos that look old or generic, and a website that fails to back up the profile when a careful buyer clicks through. Each one can be fixed in under a week. Tyler Preisser at Preisser Solutions in Hays, Kansas walks small business owners through the exact sequence.",
  sections: [
    {
      eyebrow: "Reframe the metric",
      heading: "Views do not always mean buyer intent",
      body: [
        "Google Business Profile insights show three primary metrics: views, searches, and actions (calls, direction requests, website clicks). Owners often look at the views number, see it climbing, and conclude that visibility is fine.",
        "Views include searches by name (someone Googled your business directly), discovery searches (someone searched a service term and you came up), and indirect impressions where the profile appeared but the user never engaged. Calls live in the actions bucket. The gap between high views and low actions is where the work happens.",
        "Before anything else, open your profile insights and look at calls as a percentage of profile views over the last 90 days. Compare that to your direction-request rate. If both are low, the profile itself is the issue. If direction requests are healthy but calls are low, your call-handling or your phone number presentation is suspect.",
      ],
    },
    {
      eyebrow: "Issue 1",
      heading: "Your categories may be wrong",
      body: [
        "The primary category is the single biggest lever in a Google Business Profile. It is how Google decides which searches your profile is eligible to appear for in the first place.",
        "Many small businesses pick a generic primary category at setup — \"Business\" or \"Service Provider\" — and never revisit it. A roofer with \"Construction Company\" as a primary category will lose to a roofer with \"Roofing Contractor\" every time, because Google interprets the more specific category as a stronger match for roofing searches.",
        "Add up to nine secondary categories that genuinely fit. Don't stuff irrelevant ones in — Google can penalize for it — but don't leave secondary categories empty either. A profile with \"Roofing Contractor\" as primary and \"Gutter Cleaning Service,\" \"Siding Contractor,\" \"Storm Damage Restoration Service\" as secondaries appears for a much wider net of relevant searches.",
      ],
    },
    {
      eyebrow: "Issue 2",
      heading: "Your services may be incomplete",
      body: [
        "Inside the Google Business Profile editor, there's a Services section. Most owners add three or four obvious services and move on. The profiles that win the call have fifteen to thirty entries.",
        "Each service line item is a small piece of content Google can index. \"Tankless water heater installation,\" \"Sump pump repair,\" \"Sewer line camera inspection,\" \"Frozen pipe thaw\" — each one is a separate, specific search a homeowner might run at 11 PM. The more your services list mirrors how real customers describe their problem, the more often the profile surfaces for those exact searches.",
        "Add a short description (200-300 characters) under each service. Use the same language a real customer would use. This makes the listing more useful inside the profile and gives Google more content to match against queries.",
      ],
      bullets: [
        "Use customer language, not industry jargon",
        "Add price ranges or starting prices when you can",
        "Include emergency or after-hours services as separate entries",
        "Update seasonally — winter services may need to be visible by October",
      ],
    },
    {
      eyebrow: "Issue 3",
      heading: "Your reviews may not be strong enough",
      body: [
        "Reviews carry more weight than most owners realize. They influence both whether you rank in the map pack and whether someone who sees your profile will actually call.",
        "Three review factors matter: count, recency, and rating distribution. A profile with 80 reviews from the last 12 months tends to beat a profile with 200 reviews from five years ago. A 4.6-star average with 100 reviews tends to convert better than a 5.0-star average with 8 reviews — buyers see the larger sample as more credible.",
        "Set a simple, repeatable process: every closed job ends with a request for a review. Send the customer the direct review link by text, not a generic ask. Reply to every review — good or bad — within 48 hours. The reply itself becomes content Google reads, and prospective customers reading reviews see how you handle feedback.",
      ],
    },
    {
      eyebrow: "Issue 4",
      heading: "Your website may not support your profile",
      body: [
        "Many buyers do not call directly from the profile. They click through to the website to confirm details first. If the site is slow, ugly, or inconsistent with what the profile claims, the call never happens.",
        "Consistency check: does your website footer show the exact same business name, address, and phone as your Google Business Profile? Mismatches confuse Google and erode buyer trust. If your phone number on the site reads 620.555.1234 but the profile shows (620) 555-1234, Google's algorithms see those as potentially different numbers. Standardize.",
        "Trust check: does the website have the same review snippets, the same photos of real jobs, and the same primary services as the profile? A profile that promises \"24/7 emergency service\" linking to a website that doesn't mention emergencies at all will lose the call to a competitor with consistent messaging.",
      ],
    },
    {
      eyebrow: "Plan of action",
      heading: "How to fix it",
      body: [
        "If you can only do five things this month, do these:",
      ],
      bullets: [
        "Change the primary category to the most specific category that fits, and fill all nine secondary slots with relevant categories",
        "Expand the services list to fifteen or more entries using real customer language with short descriptions",
        "Request reviews from your last ten closed jobs by text with the direct link — reply to every existing review the same week",
        "Upload at least ten recent, original photos: three exterior, three of completed work, two of team, two of vehicles or equipment",
        "Update the website footer NAP and the homepage hero to match the profile exactly — same name, same number formatting, same primary services",
      ],
    },
  ],
  faq: [
    {
      question: "How often should I post to my Google Business Profile?",
      answer:
        "Once a week is a reasonable cadence for most small businesses. Posts are visible for seven days by default. Treating posts as a weekly habit — a recent job, a seasonal service reminder, an offer — keeps the profile signaling activity to Google and to buyers checking the profile.",
    },
    {
      question: "Can I have multiple Google Business Profiles for one business?",
      answer:
        "Generally only if you have multiple physical locations or distinct service areas. Creating duplicate profiles to game ranking violates Google's guidelines and risks suspension. If you have multiple locations, each one needs its own verified profile with its own address, phone, and team.",
    },
    {
      question: "Why does my competitor with fewer reviews rank above me?",
      answer:
        "Reviews are one signal among many. Proximity to the searcher, category match, profile completeness, website strength, and citation consistency also matter. A competitor with fewer reviews can outrank you when they have a more specific primary category, a more complete services list, or stronger inbound citations.",
    },
    {
      question: "Should I respond to negative reviews?",
      answer:
        "Yes, always. Reply professionally, acknowledge the concern, and offer to resolve it offline. Prospective buyers read the reply more carefully than the review itself. A measured, helpful response to a negative review can actually build trust with the next reader.",
    },
    {
      question: "Do call tracking numbers hurt my Google Business Profile?",
      answer:
        "They can if you replace your real number with a tracking number in the profile, because it breaks NAP consistency across the web. The safer pattern: keep your true business number as the profile's primary phone, and use a tracking number as a secondary phone only if your tracking platform supports proper SwapNumbers behavior.",
    },
    {
      question: "How long does it take to see results after fixing the profile?",
      answer:
        "Most owners see movement within two to four weeks once categories, services, and photos are updated. Reviews compound more slowly — meaningful gains in review count usually take 60 to 90 days. Ranking shifts in the map pack can lag another month behind that. Steady weekly work outperforms a one-time overhaul.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Google",
    "Google Business Profile",
    "Google Maps",
  ],
  relatedLinks: [
    { label: "Local SEO Hays KS", href: "/services/local-seo-hays-ks" },
    { label: "Local SEO", href: "/services/local-seo" },
    { label: "How to Get More Local Customers from Google", href: "/insights/get-more-local-customers-from-google" },
    { label: "Contact Preisser Solutions", href: "/contact" },
    { label: "SEO Hays KS", href: "/services/seo-hays-ks" },
  ],
  ctaHeadline: "Want a profile + website alignment check?",
  ctaSubcopy:
    "Tyler will pull up your profile insights, compare them to your site, and tell you the three changes that matter — in 30 minutes, no pitch.",
  primaryCta: {
    label: "Request a Profile Review",
    href: "/contact",
  },
};
