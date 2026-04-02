import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";

const footerCols = [
  {
    heading: "Services",
    links: [
      { label: "Workflow Automation", href: "/services" },
      { label: "Back Office Automation", href: "/services" },
      { label: "Custom AI Assistants", href: "/services" },
      { label: "AI-Powered Outreach", href: "/services" },
      { label: "Digital Presence", href: "/services" },
      { label: "Website Development", href: "/services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Why Automation?", href: "/why-automation" },
      { label: "ROI Calculator", href: "/roi-calculator" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Client Results", href: "/#testimonials" },
      { label: "Free Consultation", href: "/contact" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="ps-footer">
      <div className="ps-container">
        {/* Main grid */}
        <div className="ps-footer-grid">
          {/* Brand column */}
          <div className="ps-footer-brand">
            <Image
              src="/images/LOGO.png"
              alt="Preisser Solutions"
              width={180}
              height={36}
              className="ps-footer-logo"
            />
            <p>
              Custom automation systems that eliminate manual work, reduce overhead,
              and let your best people focus on what grows the business.
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="ps-footer-contact-link"
            >
              <span aria-hidden="true">✉</span>
              {siteConfig.contact.email}
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="ps-footer-contact-link"
            >
              <span aria-hidden="true">☎</span>
              {siteConfig.contact.phone}
            </a>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.heading} className="ps-footer-col">
              <h4>{col.heading}</h4>
              <ul className="ps-footer-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
          <p className="ps-footer-tagline">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
