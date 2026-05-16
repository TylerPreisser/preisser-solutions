import type { AeoPageData } from "../types";

/**
 * INSIGHT ARTICLE — /insights/small-business-website-not-generating-leads
 *
 * Diagnostic for the "I have traffic but no calls" problem.
 */
export const pageData: AeoPageData = {
  slug: "insights/small-business-website-not-generating-leads",
  tier: "blog",
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  metaTitle: "Why Your Small Business Website Is Not Generating Leads",
  metaDescription:
    "A practical guide to fixing a small business website that gets visits but does not generate calls, forms, quote requests, or booked jobs.",
  eyebrow: "Insights · Conversion",
  h1: "Why Your Small Business Website Is Not Generating Leads",
  subheadline:
    "Traffic is necessary. It is not enough. If visitors aren't calling, filling out forms, or booking, the problem lives somewhere between your offer and your tracking.",
  answerParagraph:
    "A small business website that is not generating leads usually has one of five issues: the offer on the page is unclear, the calls to action are weak, the forms create too much friction, the page builds no trust, or the lead events aren't actually being tracked so phantom leads look like zeros. Fixing each one is fast and cheap compared to driving more traffic. Tyler Preisser at Preisser Solutions in Hays, Kansas helps small businesses across the Great Plains diagnose this layer of the funnel before they invest another dollar in ads or SEO.",
  sections: [
    {
      eyebrow: "The diagnosis",
      heading: "Traffic without conversion is not enough",
      body: [
        "Owners often assume that more visitors automatically means more leads. It doesn't. A site with 2,000 monthly visits converting at 0.3% produces six leads. A site with 800 visits converting at 3% produces twenty-four. The conversion rate matters far more than raw traffic.",
        "Before adding more sources of traffic, prove that the visitors you already have can become buyers. Otherwise every dollar you spend driving traffic is leaking out of a hole at the bottom of the funnel.",
        "There is one exception: if your traffic is junk (wrong intent, wrong geography, wrong audience) no conversion fix will help. That is rare for local service businesses with on-topic pages. Most small business sites have decent intent traffic and a broken conversion path.",
      ],
    },
    {
      eyebrow: "Issue 1",
      heading: "Your offer may be unclear",
      body: [
        "A visitor lands on your page. Within five seconds, can they answer three questions: What do you do? Who is it for? What happens if I click the button?",
        "If the page hero leads with a tagline like \"Innovative solutions for tomorrow\" or a stock photo of a handshake, the visitor doesn't know which of your services applies to them. They leave without acting because they would need to read three more pages to figure out whether to call.",
        "Fix this by rewriting the hero with concrete language. Replace abstract phrases with specific outcomes. \"Same-day furnace repair in Hays. Most calls answered within ten minutes.\" That kind of language converts because the visitor immediately knows whether the page fits their situation.",
      ],
      bullets: [
        "Name the service and the geography in the hero — no abstract taglines",
        "State what's included so the visitor doesn't have to guess",
        "Show pricing or a price range if you can — vague pricing kills calls",
        "Anchor with one piece of real proof: a customer name, a result, a photo",
      ],
    },
    {
      eyebrow: "Issue 2",
      heading: "Your CTAs may be weak",
      body: [
        "Calls to action are the bridge between interest and action. They get less attention than they deserve.",
        "Look at every button on your page. \"Submit\" tells the visitor what the button does to them. \"Get a quote in 24 hours\" tells the visitor what they get. The second one converts noticeably better.",
        "The page also needs the right number of CTAs in the right places. A long service page with one button at the bottom asks the visitor to read three thousand words before acting. A page with the same primary CTA at the top, repeated halfway down, and once more at the end captures the visitors ready to act at each point.",
        "On phones, the phone number itself is the highest-converting CTA for most local service businesses. Make sure the number is a tap-to-call link (an <a href=\"tel:...\"> tag), large enough to thumb, and visible in the header without scrolling.",
      ],
    },
    {
      eyebrow: "Issue 3",
      heading: "Your forms may create friction",
      body: [
        "Every field on a form costs you leads. Industry research is consistent: longer forms convert worse, even when the fields seem reasonable.",
        "Audit your current form. Count the required fields. If you ask for company name, role, employee count, project budget, and project timeline on the first form a stranger ever sees, you are asking for a small business RFP from someone who just wanted to see if you serve their zip code.",
        "Reduce the first form to name, contact method (phone or email — let them pick), and the one detail you genuinely need to scope a response. Push everything else to a follow-up call or a longer intake form after the lead is captured.",
      ],
      bullets: [
        "Three required fields is usually the sweet spot for cold leads",
        "Don't ask for both phone and email unless one is optional",
        "Skip captchas with image puzzles — they cost more leads than they block spam",
        "Send the form submission to an email you actually check the same day — slow response is the same as no response",
      ],
    },
    {
      eyebrow: "Issue 4",
      heading: "You may not be tracking calls and forms",
      body: [
        "Many small businesses discover, when they finally look, that they don't actually know how many leads the site generates. Forms email a generic inbox. Phone calls go to a cell that doesn't get logged. Texts from the site go to nobody specific.",
        "If you can't measure it, you can't fix it. And worse, you can't tell whether changes are working.",
        "Minimum tracking: forms route to a CRM or a tagged email folder, call tracking numbers route phone calls through a system that logs the call source, and Google Analytics 4 or a server-side equivalent records form submissions and phone-tap events. Without this layer, every conversation about \"is the website working\" is a guess.",
      ],
    },
    {
      eyebrow: "Action list",
      heading: "What to change first",
      body: [
        "If you can only spend one weekend on this, do it in this order:",
      ],
      bullets: [
        "Rewrite the hero of your top page in concrete language — service, geography, outcome",
        "Make the phone number a tap-to-call link in the header, visible without scrolling",
        "Cut every non-essential field from your primary form",
        "Add the primary CTA in three places on long pages: hero, midway, end",
        "Set up call tracking on your business line and form-submission events in Google Analytics",
        "Reply to every inbound lead within thirty minutes during business hours for two weeks. Track the close rate.",
      ],
      subsections: [
        {
          heading: "When traffic actually is the problem",
          body: [
            "Sometimes conversion is fine and the real issue is volume. If your site converts at 2-4% on real intent traffic but only sees 100 visits a month, the page is doing its job — you need to feed it more qualified visitors. That's where local SEO, Google Business Profile work, and intent-matched ads make sense. But check conversion first. Pouring traffic into a leaky page wastes money.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "What is a good conversion rate for a small business website?",
      answer:
        "For local service businesses with intent-matched traffic, 2-5% is typical and 5-10% is achievable with a focused hero, clear pricing range, short forms, and tap-to-call enabled. E-commerce and lower-intent industries trend lower. The point is to measure and improve, not chase an industry average — your own baseline is the meaningful benchmark.",
    },
    {
      question: "Should I add a chat widget to my website?",
      answer:
        "Sometimes. Chat helps when you can staff it during business hours and respond within minutes. An unattended chat widget that lets messages sit overnight does worse than no chat at all. If you can't commit to fast response, a clear phone number and a short form usually outperform chat.",
    },
    {
      question: "Will pop-ups increase my lead generation?",
      answer:
        "Sometimes a single, well-timed exit-intent pop-up with a relevant offer can lift conversion modestly. Multiple pop-ups, immediate pop-ups, or interstitials that block content tend to lower trust and hurt SEO. If you add one, keep it minimal, easy to close, and on desktop only — Google penalizes intrusive mobile pop-ups.",
    },
    {
      question: "Do testimonials really increase conversion?",
      answer:
        "Real testimonials with full names, real photos, and specific outcomes increase trust meaningfully. Vague quotes from \"John D.\" with no detail do not. The more specific and verifiable the testimonial, the more lift it provides. A short video testimonial usually outperforms a written one.",
    },
    {
      question: "Should I A/B test my website?",
      answer:
        "For small business sites with under 500 visits a month, A/B testing rarely produces statistically meaningful results — the sample size is too small. Until you reach significant volume, use direct fixes based on conversion fundamentals rather than experiments. Once you're past about 2,000 monthly visits, structured testing starts to pay off.",
    },
    {
      question: "How long should I wait before deciding the website is broken?",
      answer:
        "If you have at least 300 visits a month and zero leads over 60 days, the page is broken. If you have under 100 visits a month, you may have a traffic problem rather than a conversion problem — fix the offer and tracking first, then drive more traffic and re-evaluate at 300+ visits.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Google Analytics",
    "Google Ads",
    "CRM",
  ],
  relatedLinks: [
    { label: "Custom Websites", href: "/services/custom-websites" },
    { label: "Lead Tracking & Google Ads", href: "/use-cases/lead-tracking-website-google-ads" },
    { label: "Local SEO", href: "/services/local-seo" },
    { label: "Contact Preisser Solutions", href: "/contact" },
    { label: "Google Business Profile Not Getting Calls", href: "/insights/google-business-profile-not-getting-calls" },
  ],
  ctaHeadline: "Want a conversion review of your site?",
  ctaSubcopy:
    "Send Tyler the URL and he'll mark up the page with the five highest-impact changes — no proposal pitch, no upsell.",
  primaryCta: {
    label: "Request a Conversion Review",
    href: "/contact",
  },
};
