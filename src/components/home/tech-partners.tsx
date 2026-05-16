"use client";

import Link from "next/link";

/*
 * R-037: Homepage display is intentionally limited to the eight most important
 * integration partners. The full list of tools/platforms moves to /integrations
 * (created in §4.5 of the master rebuild). The "See all integrations" link
 * below will 404 until that route is built — that's expected.
 *
 * TODO(§4.5): once /integrations route exists, this comment can be removed.
 *
 * Notes on partnership framing (kept for the reviewer):
 * - "Salesforce" — Tyler worked WITH Salesforce on client engagements, not as
 *   a formal Salesforce partner or reseller.
 * - "Anthropic" / "OpenAI" / "Google" — paying API customers, not partners.
 * Presentation here is "tools we work with," not "partners."
 */

// Eight strongest integration partners for homepage display.
const homepageTechPartners = [
  "Stripe",
  "HubSpot",
  "Salesforce",
  "Zapier",
  "OpenAI",
  "Anthropic",
  "Cloudflare",
  "Google",
];

export function TechPartners() {
  return (
    <section
      className="ps-tech-partners"
      aria-label="Technologies and platforms we work with"
    >
      <div className="ps-tech-partners-header">
        <p className="ps-tech-partners-label" aria-hidden="true">// stack</p>
      </div>

      {/* Scrolling track — items duplicated for seamless loop */}
      <div className="ps-tech-partners-viewport" aria-hidden="true">
        <div className="ps-tech-partners-track">
          {homepageTechPartners.map((name) => (
            <span key={`a-${name}`} className="ps-tech-pill">
              {name}
            </span>
          ))}
          {/* Duplicate set for seamless looping */}
          {homepageTechPartners.map((name) => (
            <span key={`b-${name}`} className="ps-tech-pill" aria-hidden="true">
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Accessible static list (visually hidden) */}
      <ul className="ps-visually-hidden">
        {homepageTechPartners.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      {/* R-037: link out to the full integrations index. Route lives in §4.5. */}
      <div
        className="ps-tech-partners-cta"
        style={{
          textAlign: "center",
          marginTop: 18,
          fontSize: "0.875rem",
        }}
      >
        <Link
          href="/integrations"
          style={{
            color: "var(--color-primary)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          See all integrations &rarr;
        </Link>
      </div>
    </section>
  );
}
