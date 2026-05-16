import { siteConfig } from "@/data/site-config";

// R-035: Proof bar — verifiable numbers sourced from case studies.
// Sits between the hero and the value-strip; reuses ps-value-strip / ps-value-item
// classes so visual design matches the existing trust-bar rhythm without adding
// new CSS. The marquee track is reused for layout but proof numbers are short
// enough that the duplicate set produces a continuous horizontal row.
const proofItems = siteConfig.proofBar;

export function ProofBar() {
  return (
    <section
      className="ps-value-strip ps-proof-bar"
      aria-label="Preisser Solutions proof points"
    >
      <div className="ps-value-strip-track">
        {proofItems.map((item) => (
          <div key={item.label} className="ps-value-item">
            <p className="ps-value-text">
              <strong>{item.number}</strong>
              <span>{item.label}</span>
            </p>
          </div>
        ))}
        {proofItems.map((item) => (
          <div
            key={`${item.label}-duplicate`}
            className="ps-value-item"
            aria-hidden="true"
          >
            <p className="ps-value-text">
              <strong>{item.number}</strong>
              <span>{item.label}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
