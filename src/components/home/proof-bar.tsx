import { siteConfig } from "@/data/site-config";

// R-035: Proof bar — verifiable, contextualized stats sourced from case studies.
// Each item is a self-contained single line ("<stat> — <client/context>").
// Rendered into the existing `ps-value-strip` marquee for layout consistency
// with the trust row, but uses a dedicated `ps-proof-item` pill so the long
// single-line strings don't get split into number/label like the old shape.
// The marquee animation (ps-service-marquee, 42s) is shared and pauses on
// hover + collapses to a horizontal scroll under prefers-reduced-motion.
//
// 2026-05-18: The standalone "Overview" paragraph that previously sat between
// the hero and the marquee is now nested ABOVE the marquee inside this
// component. The descriptive paragraph + marquee read as one cohesive
// "At a glance" beat (who we are + what we've shipped) instead of three
// disconnected company-description surfaces in a row. The paragraph content
// is unchanged — preserves the AI-extraction hook for HTML-only crawlers.
const proofItems = siteConfig.proofBar;

export function ProofBar() {
  return (
    <section
      className="ps-at-a-glance"
      aria-labelledby="at-a-glance-heading"
    >
      <div className="ps-at-a-glance__inner">
        <span className="ps-at-a-glance__eyebrow">At a glance</span>
        <h2 id="at-a-glance-heading" className="ps-visually-hidden">
          Preisser Solutions at a glance
        </h2>
        <p className="ps-at-a-glance__lead">
          Preisser Solutions is a Hays, Kansas-based AI-native web development, local SEO, and business automation company. We build custom-coded websites, AI agents, dashboards, CRM workflows, and AI search optimization systems for Kansas small and mid-sized businesses.
        </p>
      </div>
      <div
        className="ps-value-strip ps-proof-bar"
        aria-label="Preisser Solutions proof points"
      >
        <div className="ps-value-strip-track ps-proof-bar-track">
          {proofItems.map((item) => (
            <div key={item} className="ps-proof-item">
              <p className="ps-proof-text">{item}</p>
            </div>
          ))}
          {proofItems.map((item) => (
            <div
              key={`${item}-duplicate`}
              className="ps-proof-item"
              aria-hidden="true"
            >
              <p className="ps-proof-text">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
