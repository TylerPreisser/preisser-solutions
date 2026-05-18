import { siteConfig } from "@/data/site-config";

// R-035: Proof bar — verifiable, contextualized stats sourced from case studies.
// Each item is a self-contained single line ("<stat> — <client/context>").
// Rendered into the existing `ps-value-strip` marquee for layout consistency
// with the trust row, but uses a dedicated `ps-proof-item` pill so the long
// single-line strings don't get split into number/label like the old shape.
// The marquee animation (ps-service-marquee, 42s) is shared and pauses on
// hover + collapses to a horizontal scroll under prefers-reduced-motion.
//
// 2026-05-18: Reverted the "At a glance" wrapper (eyebrow + descriptive
// paragraph) — Tyler flagged it as visually weak. The marquee now stands
// on its own as a clean band between Hero and ServicePillars. The
// descriptive paragraph survives as a visually-hidden <p> on the home
// page (for HTML-only AI crawlers); same content is also in the hero
// subhead, meta description, JSON-LD, llms.txt, and /about.
const proofItems = siteConfig.proofBar;

export function ProofBar() {
  return (
    <section
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
    </section>
  );
}
