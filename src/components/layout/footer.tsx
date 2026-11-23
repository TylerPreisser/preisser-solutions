import { siteConfig } from "@/data/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="ps-footer" aria-label="Site footer">
      <div className="ps-container">
        <div className="ps-footer-main">
          {/* Left: logo + tagline + visible NAP (Name, Address, Phone) */}
          <div className="ps-footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ps-logo.webp`}
              alt="Preisser Solutions"
              className="ps-footer-logo-img"
              width={336}
              height={336}
              loading="lazy"
            />
            {/* The brand line under the mark. Split on the sentence boundary so
                "AI Integration." can carry the accent — the same colour device
                the hero uses. The full string stays intact for screen readers. */}
            <p className="ps-footer-tagline">
              {siteConfig.tagline
                .split(".")
                .map((part) => part.trim())
                .filter(Boolean)
                .map((part, i, all) => (
                  <span
                    key={part}
                    className={
                      "ps-footer-tagline-line" +
                      (i === all.length - 1 ? " ps-footer-tagline-line--accent" : "")
                    }
                  >
                    {part}.{i < all.length - 1 ? " " : ""}
                  </span>
                ))}
            </p>
            {/* Visible NAP — required for local SEO consistency and citation matching. */}
            <address className="ps-footer-nap" style={{ fontStyle: "normal" }}>
              <span className="ps-footer-location">
                {siteConfig.contact.location}
              </span>
              <br />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="ps-footer-contact-link"
                aria-label={`Email Preisser Solutions at ${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
            </address>
          </div>
        </div>

        <hr className="ps-footer-divider" />

        <div className="ps-footer-bottom">
          <p className="ps-footer-copy">
            &copy; {year} {siteConfig.name}. All Rights Reserved.
          </p>
          {/* Footer link row.
              - aria-label was "Legal links", which was already wrong (Products
                is not a legal page) and is more wrong now that Locations is
                here.
              - /locations added 2026-09-03. The homepage used to spray 77
                /locations/* links from its "Everything we do, one tap away"
                cluster; that cluster is gone. This one global link puts the
                /locations hub — which itself links all 77 city pages — at
                depth 2 from EVERY page instead of depth 1 from one page.
                Whether that trades well is answerable only by Search Console
                impressions for /locations/* over the next 4-8 weeks; it is not
                knowable today, and nothing here should be read as claiming it.
              - flexWrap is inline rather than in globals.css because another
                agent owns that file today. .ps-footer-legal is `display:flex`
                with NO wrap (globals.css:5037): a row wider than the measure
                does not move an item to a second line, it shrinks the items and
                breaks their text. With Locations the row is 339px, which
                overflowed a 320px viewport and clipped "Site Map" off the right
                edge. `gap: 6px` already supplies the row gap.
              - Each separator is bound to the link that FOLLOWS it inside a
                nowrap span, so a wrap can never strand a lone "·" at the end of
                a line. Measured: 1 row at 390/414, 2 clean rows at 320/360/375,
                every link 44px tall at all five. */}
          <div
            className="ps-footer-legal"
            aria-label="Footer links"
            style={{ flexWrap: "wrap" }}
          >
            <a href="/products">Products</a>
            {[
              { href: "/locations", label: "Locations" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/site-map", label: "Site Map" },
            ].map((link) => (
              <span
                key={link.href}
                style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span aria-hidden="true">&middot;</span>
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </div>
          <div className="ps-footer-social" aria-label="Social links">
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Preisser Solutions on LinkedIn"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
