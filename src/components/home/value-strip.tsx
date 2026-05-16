import { siteConfig } from "@/data/site-config";

// R-034: trust / value-strip content sourced from siteConfig.valueStrip.
// Pipe-separated items render as pill items in the existing horizontal marquee.
const valueItems = siteConfig.valueStrip;

export function ValueStrip() {
  return (
    <section className="ps-value-strip" aria-label="Preisser Solutions trust bar">
      <div className="ps-value-strip-track">
        {valueItems.map((item) => (
          <div key={item} className="ps-value-item">
            <p className="ps-value-text">
              <strong>{item}</strong>
            </p>
          </div>
        ))}
        {valueItems.map((item) => (
          <div key={`${item}-duplicate`} className="ps-value-item" aria-hidden="true">
            <p className="ps-value-text">
              <strong>{item}</strong>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
