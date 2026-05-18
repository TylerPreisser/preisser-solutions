import type { AeoPageData } from "../types";

/**
 * INSIGHT ARTICLE — /insights/website-loads-slow-on-mobile
 *
 * Plain-language guide to mobile performance: causes, Core Web Vitals,
 * and when to fix versus rebuild.
 */
export const pageData: AeoPageData = {
  slug: "insights/website-loads-slow-on-mobile",
  tier: "blog",
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  metaTitle: "Why Your Website Loads Slow on Mobile",
  metaDescription:
    "A practical guide to fixing slow mobile websites, improving Core Web Vitals, and turning mobile visitors into calls and leads.",
  eyebrow: "Insights · Performance",
  h1: "Why Your Website Loads Slow on Mobile",
  subheadline:
    "Most slow mobile sites lose more leads to load time than to bad copy. The fix is usually a few specific decisions, not a rebuild — until it's a rebuild.",
  answerParagraph:
    "A website loads slowly on mobile for predictable reasons: oversized images that aren't compressed for phones, too many third-party scripts (chat widgets, analytics, social embeds, ad pixels), fonts that load late and shift the layout, and bloated themes or page builders that ship far more code than the page actually needs. Each one shows up clearly in Google's PageSpeed Insights report. Fixing them improves Core Web Vitals, search rankings, and — most importantly for a small business — the share of mobile visitors who stay long enough to call. Tyler Preisser at Preisser Solutions in Hays, Kansas builds custom websites engineered for mobile speed from the first line of code.",
  sections: [
    {
      eyebrow: "Why it matters",
      heading: "Slow mobile pages cost leads",
      body: [
        "Over 60% of visits to a typical local business website come from a phone. Phones run on slower connections than desktops, have less memory, and less CPU. The same page that loads in two seconds on your laptop can take six on a customer's phone in the parking lot.",
        "Visitors don't wait. Industry studies consistently show meaningful drop-off when pages take longer than three seconds to load on mobile. By six seconds, you've lost more than half the cold visitors. The lost leads don't show up in any analytics report — the visitor was never recorded long enough to count.",
        "Google factors page experience into ranking, so slow mobile pages also rank lower than they otherwise would. The same buyer who would have called sees a competitor's faster site higher in the results, never gets to yours, and never knows you exist.",
      ],
    },
    {
      eyebrow: "Diagnosis",
      heading: "Common causes",
      body: [
        "Most slow mobile sites share the same handful of issues. They are well-known, well-measured, and almost always fixable.",
      ],
      bullets: [
        "Images shipped at desktop dimensions and full resolution to phones — the single most common cause of slow Largest Contentful Paint",
        "Carousels and hero videos that autoplay before the visitor needs them, blocking the rest of the page from rendering",
        "Third-party scripts: live chat widgets, social pixels, analytics tags, ad networks — each one adds blocking JavaScript",
        "Web fonts that load late and trigger a flash of unstyled text, shifting the layout (high Cumulative Layout Shift)",
        "Bloated WordPress or website-builder themes that ship 1-3 MB of JavaScript and CSS for every page, regardless of what the page actually displays",
        "Render-blocking CSS and JavaScript in the head that delay First Contentful Paint",
        "Unused plugins or page-builder bundles that ship code for features the page doesn't use",
      ],
    },
    {
      eyebrow: "The metrics",
      heading: "How Core Web Vitals affect user experience",
      body: [
        "Google's Core Web Vitals are three concrete measurements that map closely to how slow a page feels in practice. They are the right place to focus.",
        "Largest Contentful Paint (LCP) measures when the biggest visible element on the page — usually the hero image or main heading — finishes loading. Google's threshold for \"good\" is under 2.5 seconds on mobile. For most local business sites, the hero image is the culprit: too large, not in a modern format, not lazy-loaded correctly.",
        "Interaction to Next Paint (INP) measures how quickly the page responds when you tap. Under 200ms is good. Slow INP usually traces to heavy JavaScript blocking the main thread — third-party scripts, chat widgets, or framework code that wasn't meant for a small business site.",
        "Cumulative Layout Shift (CLS) measures how much the page jumps around as elements load. Under 0.1 is good. Most CLS comes from images without explicit width and height, web fonts that swap in late, or ads that inject themselves into the layout after the page has already rendered.",
      ],
    },
    {
      eyebrow: "Fixing in place",
      heading: "When optimization is enough",
      body: [
        "If the site is built on a reasonable platform and the structure is sound, targeted optimization can typically pull a 4-6 second mobile load down to 1.5-2.5 seconds without rebuilding. The high-impact moves:",
      ],
      bullets: [
        "Compress and resize every hero/banner image — serve a phone-sized version to phones using <picture> or responsive image sources",
        "Convert images to WebP or AVIF — modern formats reduce file size 30-60% with no visible quality loss",
        "Lazy-load all images below the fold and any embedded videos",
        "Audit third-party scripts — remove anything that isn't actively earning the lost performance (most sites can drop two or three)",
        "Move analytics tags into a single tag manager loaded async so they don't block render",
        "Preload the primary web font and set font-display: swap so the page doesn't blank waiting for the font",
        "Add explicit width and height attributes to every image and embed to prevent layout shift",
      ],
    },
    {
      eyebrow: "The rebuild signal",
      heading: "When rebuilding is cleaner",
      body: [
        "Optimization has a ceiling. If the site was built on a heavy template platform with five page builders stacked on top of each other, you can spend ten hours optimizing and still end up at a 3.5-second LCP because the platform itself is the bottleneck.",
        "Signs a rebuild outperforms more optimization: PageSpeed Insights scores stuck under 50 on mobile despite cleaning up the obvious culprits, JavaScript bundle size over 1 MB even after removing unused plugins, layout-shift problems that come from the platform's own theme, and admin time that makes simple edits feel painful.",
        "A modern stack — Next.js with static export, modern image formats, no plugin layer, schema and SEO baked into the structure — typically lands at 90+ PageSpeed scores and 1-2 second LCP out of the box. That's the work Preisser Solutions does for small businesses across Kansas. Built once, fast forever, easy to maintain.",
      ],
    },
  ],
  faq: [
    {
      question: "How fast should a small business website load on mobile?",
      answer:
        "A reasonable target is Largest Contentful Paint under 2.5 seconds and total page load under 3 seconds on a typical 4G mobile connection. Modern static sites can hit 1-2 seconds. Most WordPress sites without performance work land in the 4-7 second range, which is where conversion starts to suffer noticeably.",
    },
    {
      question: "Will switching to a faster hosting provider fix my slow website?",
      answer:
        "Sometimes, but not as much as people hope. Hosting matters most for Time to First Byte — the moment between the request and the first response. If TTFB is slow, better hosting can help. If the bottleneck is image weight, JavaScript bloat, or layout shift (which it usually is), hosting changes nothing.",
    },
    {
      question: "Do I need a separate mobile site?",
      answer:
        "No. Responsive design — one website that adapts to screen size — is the standard. Separate mobile sites (m.yourdomain.com) cause SEO and maintenance problems and have been deprecated by Google. The right answer is one site that loads fast on every device.",
    },
    {
      question: "Are page builders like Elementor or Divi making my site slow?",
      answer:
        "Often, yes. Heavy page builders ship a large amount of JavaScript and CSS for every page, regardless of what the page actually shows. A simple service page rendered by a heavy builder can ship 800 KB of code to do the work of 50 KB. Lightweight blocks, custom code, or a modern static framework usually outperform builder-based pages.",
    },
    {
      question: "Will compressing images alone fix my Core Web Vitals?",
      answer:
        "It's the single biggest move on most sites and can drop LCP by 1-2 seconds on its own. But it rarely fixes everything. INP and CLS still depend on JavaScript and layout decisions. Image compression should be the first fix, not the only one.",
    },
    {
      question: "Does AMP still matter for mobile speed?",
      answer:
        "No, AMP is no longer required for top search visibility. Google removed AMP as a Top Stories requirement and has since deprioritized it. A well-built standard site with good Core Web Vitals performs as well as AMP and avoids the maintenance burden.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Google",
    "PageSpeed Insights",
    "Core Web Vitals",
    "Next.js",
    "WordPress",
  ],
  relatedLinks: [
    { label: "Custom websites", href: "/services/custom-websites" },
    { label: "Website redesign service", href: "/services/website-redesign" },
    { label: "Website migration service", href: "/services/website-migration" },
    { label: "Website redesign checklist", href: "/blog/website-redesign-checklist" },
    { label: "Why small-business sites don't convert", href: "/blog/why-small-business-sites-dont-convert" },
    { label: "My website isn't generating leads", href: "/insights/small-business-website-not-generating-leads" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Run your site past Tyler",
  ctaSubcopy:
    "We'll pull your page through PageSpeed Insights together and tell you, in plain language, whether it's optimization or a rebuild — and which moves matter first.",
  primaryCta: {
    label: "Request a Performance Review",
    href: "/contact",
  },
};
