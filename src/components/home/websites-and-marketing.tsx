import Link from "next/link";

/**
 * Secondary "websites and marketing" band — ADR-0003.
 *
 * Deliberately subordinate to the three pillars in `service-pillars.tsx`.
 * Its only job is to route visitors into the `/services/*` pages that already
 * exist. It is NOT a fourth pillar: the hero <h1>, `siteConfig.hero.h1`, the
 * JSON-LD slogan and the three-pillar structure are untouched.
 *
 * Subordination is carried by the type scale and the inset surface, not by
 * breaking the section rhythm — see websites-and-marketing.css.
 *
 * No motion, on purpose. A GSAP scroll reveal would give this band the same
 * entrance choreography as the pillars and the MarCommand callout and read as
 * peer weight, which ADR-0003 §1 rules out. Staying static also keeps this a
 * server component: zero client JS shipped for a link list.
 *
 * Copy is grounded in each target page's own positioning (src/data/aeo/**).
 * No metrics, client names, outcomes or pricing — see docs/WRITER-AGENT-PROMPT.md
 * and docs/plans/2026-08-02-three-pillar-reposition.md §9.
 */

// Every href is the page's own canonical slug (`pageData.slug` in
// src/data/aeo/**), so these point at the indexed URL, not an alias.
const offerings = [
  {
    href: "/services/custom-websites",
    label: "Custom websites",
    description: "Built from scratch in Next.js, React, and TypeScript.",
  },
  {
    href: "/services/website-redesign",
    label: "Website redesign",
    description: "Rebuild a slow or dated site without losing the SEO you already have.",
  },
  {
    href: "/services/conversion-optimization",
    label: "Conversion optimization",
    description: "For traffic that arrives and then leaves without converting.",
  },
  {
    href: "/services/local-seo",
    label: "Local SEO",
    description: "Win the Google local pack on searches that drive local revenue.",
  },
  {
    href: "/services/paid-ads",
    label: "Paid ads",
    description: "Google, Meta, and LinkedIn, reported on pipeline instead of impressions.",
  },
  {
    href: "/services/ai-search-optimization",
    label: "AI search optimization",
    description: "Show up when buyers ask an AI engine for a recommendation.",
  },
];

export function WebsitesAndMarketing() {
  return (
    <section
      id="websites-and-marketing"
      className="ps-section ps-websvc"
      aria-labelledby="websites-and-marketing-heading"
    >
      <div className="ps-container ps-websvc__inner">
        <div className="ps-websvc__header">
          <span className="ps-eyebrow ps-websvc__eyebrow">Also from Preisser Solutions</span>
          <h2 id="websites-and-marketing-heading" className="ps-websvc__heading">
            Websites and marketing
          </h2>
          <p className="ps-websvc__lede">
            We build the site out front too, along with the search and ad work that
            brings people to it. Everything here is custom-coded and owned outright —
            no templates, no page builders.
          </p>
        </div>

        <ul className="ps-websvc__grid">
          {offerings.map((offering) => (
            <li key={offering.href} className="ps-websvc__item">
              {/* prefetch={false}: eager prefetch on homepage links was the root
                  cause of a 4.1s -> 0.8s mobile navigation regression.
                  See the same note at hero.tsx:162-163. */}
              <Link href={offering.href} prefetch={false} className="ps-websvc__link">
                <span className="ps-websvc__text">
                  <span className="ps-websvc__label">{offering.label}</span>
                  <span className="ps-websvc__desc">{offering.description}</span>
                </span>
                <svg
                  className="ps-websvc__arrow"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
