import Link from "next/link";
import { siteConfig } from "@/data/site-config";

const serviceLinks = [
  { label: "Websites & Apps", href: "/services" },
  { label: "Automation Systems", href: "/services" },
  { label: "System Fixes & Efficiency", href: "/services" },
  { label: "Dashboards & Intelligence", href: "/services" },
  { label: "Revenue Growth Engines", href: "/services" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#case-studies" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="ps-footer" aria-label="Site footer">
      <div className="ps-container">
        {/* Main grid */}
        <div className="ps-footer-grid">
          {/* Brand column */}
          <div className="ps-footer-brand">
            <Link href="/" className="ps-footer-logo-text" aria-label="Preisser Solutions — Home">
              Preisser Solutions
            </Link>
            <p className="ps-footer-tagline">
              We Build What Your Business Needs.
            </p>
            <div className="ps-footer-contact">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="ps-footer-contact-link"
                aria-label={`Email us at ${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
              <span className="ps-footer-contact-link" style={{ cursor: "default" }}>
                {siteConfig.contact.location}
              </span>
            </div>
          </div>

          {/* Services column */}
          <div className="ps-footer-col">
            <h3>Services</h3>
            <ul className="ps-footer-links">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="ps-footer-col">
            <h3>Company</h3>
            <ul className="ps-footer-links">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="ps-footer-divider" />

        {/* Bottom bar */}
        <div className="ps-footer-bottom">
          <p className="ps-footer-copy">
            &copy; {year}{" "}
            <Link href="/">{siteConfig.name}</Link>
            . All Rights Reserved.
          </p>
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
            {siteConfig.social.facebook && (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Preisser Solutions on Facebook"
              >
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
