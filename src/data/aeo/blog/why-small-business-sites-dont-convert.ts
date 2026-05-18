import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/why-small-business-sites-dont-convert",
  tier: "blog",
  datePublished: "2026-02-04",
  dateModified: "2026-05-15",
  metaTitle: "Why Most Small Business Websites Don't Convert",
  metaDescription:
    "Vague CTAs, slow load, no NAP, no proof, unclear offer. The five fixes that move conversion before spending a dollar on ads.",
  eyebrow: "Blog · Web Strategy",
  h1: "Why Most Small Business Websites Don't Convert",
  subheadline:
    "Before you spend money on ads or SEO, fix the conversion leaks. Most small-business sites fail on five specific things — all fixable.",
  answerParagraph:
    "Most small-business websites convert visitors to leads at under 1%. The fix isn't more traffic — it's fixing the five conversion leaks that every audit reveals. Specifically: vague CTAs that don't tell the visitor what happens next, slow page load (over 3 seconds), missing or inconsistent NAP (Name, Address, Phone) data, no social proof (real reviews, named case studies, photos of work), and unclear primary offer. Preisser Solutions in Hays, Kansas fixes these on every redesign engagement before any new design work begins. The five fixes are cheap to implement and typically double or triple conversion rate.",
  sections: [
    {
      eyebrow: "Leak 1",
      heading: "Vague CTAs",
      body: [
        "The CTA on most small-business sites says \"Contact Us\" or \"Get a Quote\" or \"Learn More.\" None of these tell the visitor what actually happens when they click.",
      ],
      bullets: [
        "Bad: \"Contact Us.\" (What happens? A form? An email? A phone call?)",
        "Better: \"Book a Free 30-Minute Consultation.\" (Visitor knows the format and duration.)",
        "Best: \"Book a Free Business Systems Audit.\" (Visitor knows the format, value, and outcome.)",
        "The same CTA should appear consistently across pages — not 3 different CTAs competing for attention.",
      ],
    },
    {
      eyebrow: "Leak 2",
      heading: "Slow page load",
      body: [
        "Google's data shows that as page load time goes from 1s to 3s, the probability of bounce increases 32%. From 1s to 5s, 90%. Most small-business sites are at 4-7 seconds on mobile.",
      ],
      bullets: [
        "Run Google PageSpeed Insights against your homepage today.",
        "Largest Contentful Paint (LCP) should be under 2.5 seconds on mobile.",
        "Common culprits: uncompressed hero images, render-blocking JavaScript, slow hosting, heavy WordPress themes.",
        "Most small-business sites can shave 2-4 seconds with image optimization and host upgrades — no redesign required.",
      ],
    },
    {
      eyebrow: "Leak 3",
      heading: "Missing or inconsistent NAP",
      body: [
        "Name, Address, Phone. Should appear in the footer of every page and on the contact page. Should match exactly across the site, Google Business Profile, Yelp, BBB, and all major citations. Most small-business sites have NAP that:",
      ],
      bullets: [
        "Doesn't appear in the footer at all.",
        "Appears as an image of text (unsearchable).",
        "Has slight formatting differences across pages (\"123 Main St\" vs \"123 Main Street\").",
        "Doesn't match the GBP listing.",
      ],
    },
    {
      eyebrow: "Leak 4",
      heading: "No social proof",
      body: [
        "Small-business sites routinely have either no testimonials, or anonymous testimonials (\"John D, Hays KS\") that don't help buyers. What works:",
      ],
      bullets: [
        "Real, named, reviews — pulled from Google or written by clients you can name.",
        "Real photos of completed work, with location/context.",
        "Named case studies with measurable outcomes — \"Cassidy HVAC: 60%+ reactivation in 6 weeks.\"",
        "Real photos of the team — not stock images.",
        "Verifiable credentials (license numbers, industry associations, years in business).",
      ],
    },
    {
      eyebrow: "Leak 5",
      heading: "Unclear primary offer",
      body: [
        "Within 5 seconds of landing on the homepage, can a stranger answer: who is this business, what do they do, who do they do it for? Most small-business sites fail this test. Common failures:",
      ],
      bullets: [
        "Generic agency-speak (\"We help businesses transform their digital strategy\").",
        "Service lists with no context (\"We do HVAC, plumbing, electrical, refrigeration, sheet metal\").",
        "Hero images of generic stock photos with no actual signal about the business.",
        "Industry jargon nobody outside the industry recognizes.",
      ],
      subsections: [
        {
          heading: "The fix",
          body: [
            "Above-the-fold headline names what you do, who you do it for, and where. \"AI Automation & Custom Web Development for Kansas Small Businesses\" beats \"We deliver innovative digital solutions.\" The first is specific and answerable. The second could be any business doing any thing.",
          ],
        },
      ],
    },
    {
      eyebrow: "Order of operations",
      heading: "Fix in this order",
      body: [
        "If you can only fix one thing at a time:",
      ],
      bullets: [
        "Week 1: Standardize CTAs and clarify the primary offer (Leaks 1 and 5).",
        "Week 2: Add NAP to footer and contact page; fix consistency (Leak 3).",
        "Week 3: Add social proof — pull real Google reviews, write 1-2 named case studies (Leak 4).",
        "Week 4: Run performance audit and fix the worst offenders (Leak 2).",
        "All five fixes typically lift conversion rate 2-4x within 60 days.",
      ],
    },
  ],
  faq: [
    {
      question: "Will fixing these increase traffic too?",
      answer:
        "Not directly. These are conversion fixes, not traffic fixes. Traffic comes from SEO, AEO, GBP, ads, and content. But conversion improvements multiply the value of all your traffic channels — so the ROI compounds.",
    },
    {
      question: "Do I need a full redesign to fix these?",
      answer:
        "No. Most of these fixes (CTAs, NAP, social proof, offer clarity) are content edits that can ship in an afternoon on a properly built site. Performance fixes may need engineering time. Full redesign is overkill unless you're hitting other limitations too.",
    },
    {
      question: "What's the typical conversion lift?",
      answer:
        "2-4x within 60 days for sites that were doing under 1% conversion (most small-business sites). Diminishing returns above 5% conversion — that's high-performance territory and the next gains come from deeper UX work.",
    },
    {
      question: "What about chat widgets, popups, exit-intent?",
      answer:
        "Useful at the margins but secondary. Fix the five leaks first. Chat and popup optimization layered on top of an unclear offer or vague CTA produces less lift than fixing the underlying problems.",
    },
    {
      question: "Can Preisser Solutions audit and fix these?",
      answer:
        "Yes — typically as a 2-4 week engagement covering audit + content fixes + performance fixes. Fixed price, includes 30 days of follow-up measurement.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Google PageSpeed Insights",
    "Cassidy HVAC",
    "Google Business Profile",
  ],
  relatedLinks: [
    { label: "Custom websites", href: "/services/custom-websites" },
    { label: "Website redesign service", href: "/services/website-redesign" },
    { label: "Conversion optimization", href: "/services/conversion-optimization" },
    { label: "My website isn't generating leads", href: "/insights/small-business-website-not-generating-leads" },
    { label: "Website redesign checklist", href: "/blog/website-redesign-checklist" },
    { label: "Iron & Oak Podcast case study", href: "/case-studies/iron-and-oak-podcast" },
    { label: "Wix vs custom", href: "/compare/wix-vs-custom" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want a conversion audit?",
  ctaSubcopy:
    "Free 30-minute call. We'll audit your site live and tell you the top 5 conversion leaks — for free.",
};
