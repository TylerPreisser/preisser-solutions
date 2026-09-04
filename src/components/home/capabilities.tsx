import Link from "next/link";
import { siteConfig } from "@/data/site-config";

/**
 * Capabilities — what we build, and what it produced.
 *
 * This replaces TWO infinite horizontal marquees that sat back to back under
 * the hero: <ValueStrip> (10 capability pills) and <ProofBar> (10 proof
 * claims). The owner's note, 2026-09-03: "remove this section ... need better
 * way to display capabilities and/or agents or what has been done ... tacky
 * super tacky".
 *
 * Three things were mashed into those two strips, so this section separates
 * the two it owns and hands the third off rather than duplicating it:
 *
 *   1. CAPABILITIES — the `valueStrip` inventory, now a static grid you can
 *      actually read, 1 / 2 / 5 columns.
 *   2. WHAT HAS BEEN DONE (proof) — the `proofBar` claims, now typeset with the
 *      claim and its client attribution on separate lines. A marquee could only
 *      ever render them as one flat string, which is why they were written as
 *      one; see the note in site-config.ts.
 *   3. AGENTS — deliberately NOT rebuilt here. <MarCommandLive> already owns the
 *      live agent surface further down the page, and <CaseStudies> carries the
 *      individual agent projects. A third agent showcase 200px under the hero
 *      would compete with both.
 *
 * The closing link routes to the existing #case-studies carousel instead of
 * restating any of its cards.
 *
 * ZERO CLIENT JS AND ZERO MOTION, both on purpose:
 *   - Server component, no "use client", statically imported by page.tsx (not
 *     next/dynamic — there is no bundle to defer). Precedent: why-us.tsx.
 *   - The complaint was decorative perpetual motion. The honest fix is
 *     stillness, not a nicer animation, so there is no GSAP import, no
 *     entrance, and consequently nothing for prefers-reduced-motion to undo.
 *     The only transitions in capabilities.css are the 300ms color/background
 *     theme swap every other section already runs.
 *
 * MOBILE: both marquees were `display: none` under 640px (globals.css:1541),
 * so every phone visitor saw none of this content. This section renders at
 * every width.
 */

// `proofBar` is `as const`, so its inferred type is a readonly tuple of two
// different object shapes (with and without `source`). Widening it here once
// keeps `item.source` legal at the call site without a cast per item.
const proofPoints: readonly { claim: string; source?: string }[] =
  siteConfig.proofBar;

const capabilities = siteConfig.valueStrip;

/**
 * The three pillar hubs. These moved here on 2026-09-03 from the deleted
 * "Everything we do, one tap away" link cluster in page.tsx, which was the
 * ONLY homepage link each of them had — measured on the built page before the
 * deletion, `grep -o 'href="/web-applications"' out/index.html | wc -l` = 1,
 * and the same for the other two. Losing that link would have dropped three
 * real service hubs off the homepage entirely, so they land in the section
 * that is already about what we build.
 *
 * Labels and descriptions are the EXACT strings the cluster used
 * (page.tsx `serviceLinks`, entries 1-3) — no rewriting, nothing new claimed.
 * The other three links that cluster carried (/services/custom-websites,
 * /services/local-seo, /services/ai-search-optimization) are not repeated here:
 * the websites/marketing bento cards in <ServicePillars> carry all three
 * (ADR-0006). They used to sit in a standalone <WebsitesAndMarketing> band,
 * which was removed 2026-09-04 when its content became bento cards.
 *
 * These are NOT the same links as the pillar cards below, which point at
 * /contact. Before this, the homepage had no path to the hubs themselves.
 */
const pillarRoutes = [
  {
    href: "/web-applications",
    label: "Business software",
    description:
      "Admin dashboards, customer and member databases, client portals, internal tools.",
  },
  {
    href: "/business-automation",
    label: "Business automation",
    description:
      "Registration to confirmation. Bill to categorized ledger. Form to CRM to follow-up.",
  },
  {
    href: "/services/ai-automation",
    label: "AI integration",
    description:
      "AI that reads documents, classifies, and drafts — with a human gate on anything that matters.",
  },
];

export function Capabilities() {
  return (
    <section
      className="ps-caps"
      id="capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="ps-container">
        <div className="ps-caps__header">
          <p className="ps-eyebrow ps-caps__eyebrow">What we build</p>
          <h2 id="capabilities-heading" className="ps-caps__heading">
            Capabilities, and what they produced.
          </h2>
          <p className="ps-caps__lede">
            Every capability listed here is something we have actually built —
            not a menu of things we would be willing to try.
          </p>
        </div>

        <ul className="ps-caps__grid">
          {capabilities.map((item) => (
            <li key={item} className="ps-caps__item">
              {/* Decorative accent mark. A square rather than an icon: ten
                  invented icons would be a new visual language, and the brief
                  was to stay in the existing bento/card family. */}
              <span className="ps-caps__dot" aria-hidden="true" />
              <span className="ps-caps__label">{item}</span>
            </li>
          ))}
        </ul>

        <ul className="ps-caps__routes">
          {pillarRoutes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                prefetch={false}
                className="ps-caps__route"
              >
                <span className="ps-caps__route-text">
                  <span className="ps-caps__route-label">{route.label}</span>
                  <span className="ps-caps__route-desc">
                    {route.description}
                  </span>
                </span>
                <svg
                  className="ps-caps__route-arrow"
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

        <div className="ps-caps__proof">
          <h3 className="ps-eyebrow ps-caps__proof-heading">Proof</h3>
          <ul className="ps-caps__proof-list">
            {proofPoints.map((point) => (
              <li key={point.claim} className="ps-caps__proof-item">
                <p className="ps-caps__proof-claim">{point.claim}</p>
                {/* Entries without a source are standing facts about the
                    practice, not one client's outcome. They render without an
                    attribution line rather than getting an invented one. */}
                {point.source ? (
                  <p className="ps-caps__proof-source">{point.source}</p>
                ) : null}
              </li>
            ))}
          </ul>
          {/* prefetch={false} mirrors the hero CTAs (hero.tsx:296-302), which
              use the same #case-studies target. */}
          <Link
            href="#case-studies"
            prefetch={false}
            className="ps-caps__link"
          >
            See the projects these came from
            <svg
              className="ps-caps__link-arrow"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 8h14M9 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
