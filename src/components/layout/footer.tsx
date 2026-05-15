import Link from "next/link";
import { siteConfig } from "@/data/site-config";

const footerGroups = [
  {
    title: "Services",
    links: [
      { href: "/services/local-seo-hays-ks", label: "Local SEO" },
      { href: "/services/google-business-profile-optimization-hays-ks", label: "Google Business Profile" },
      { href: "/services/google-ads-hays-ks", label: "Google Ads" },
      { href: "/services/web-design-hays-ks", label: "Web design" },
      { href: "/services/social-media-marketing-hays-ks", label: "Social media" },
      { href: "/services/ai-automation-hays-ks", label: "AI automation" },
    ],
  },
  {
    title: "Markets",
    links: [
      { href: "/marketing-agency-hays-ks", label: "Marketing agency in Hays" },
      { href: "/locations/hays-kansas", label: "Hays, Kansas" },
      { href: "/industries/contractors", label: "Contractors" },
      { href: "/industries/restaurants", label: "Restaurants" },
      { href: "/industries/professional-services", label: "Professional services" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Preisser Solutions" },
      { href: "/tyler-preisser", label: "About Tyler" },
      { href: "/case-studies", label: "Proof hub" },
      { href: "/resources", label: "Resources" },
      { href: "/review", label: "Leave honest feedback" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="ps-footer" aria-label="Site footer">
      <div className="ps-container">
        <div className="ps-footer-main ps-footer-grid">
          <div className="ps-footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ps-logo.webp`}
              alt="Preisser Solutions"
              className="ps-footer-logo-img"
            />
            <p className="ps-footer-tagline">{siteConfig.tagline}</p>
            <address className="ps-footer-location">
              <strong>{siteConfig.name}</strong>
              <br />
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              <br />
              <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
              <br />
              {siteConfig.contact.location}
              <br />
              {siteConfig.contact.serviceArea}
            </address>
            <div className="ps-footer-actions">
              <Link href="/contact?offer=hays-visibility-audit" className="ps-btn ps-btn-primary-dark">
                Get a Free Hays Visibility Audit
              </Link>
              <a href={siteConfig.contact.phoneHref} className="ps-btn ps-btn-secondary">
                Call Preisser Solutions
              </a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} className="ps-footer-col" aria-label={group.title}>
              <h3>{group.title}</h3>
              <ul className="ps-footer-links">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="ps-footer-divider" />

        <div className="ps-footer-bottom">
          <p className="ps-footer-copy">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="ps-footer-social" aria-label="Social links">
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tyler Preisser on LinkedIn"
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
