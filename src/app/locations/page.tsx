import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Areas in Northwest Kansas",
  description:
    "Preisser Solutions serves Hays, Ellis County, and Northwest Kansas businesses with marketing, websites, local SEO, Google Ads, and AI automation.",
  alternates: { canonical: "https://preissersolutions.com/locations" },
};

const locations = [
  { href: "/locations/hays-kansas", label: "Hays, Kansas" },
];

export default function LocationsPage() {
  return (
    <div className="ps-page-wrapper">
      <section className="ps-page-hero">
        <div className="ps-container">
          <div className="ps-page-hero-content">
            <span className="ps-eyebrow">Service Area</span>
            <h1>Marketing and AI Automation for Hays and Northwest Kansas</h1>
            <p>
              Preisser Solutions is based in Hays and works with local businesses across
              Ellis County and Northwest Kansas. Location pages should support real
              service-area clarity, not fake offices or doorway pages.
            </p>
          </div>
        </div>
      </section>

      <section className="ps-section-light">
        <div className="ps-container">
          <div className="ps-services-grid">
            {locations.map((location) => (
              <Link key={location.href} href={location.href} className="ps-card ps-hub-card">
                <h2>{location.label}</h2>
                <p>View the canonical local service-area page for Hays and Ellis County.</p>
              </Link>
            ))}
            <div className="ps-card ps-hub-card">
              <h2>Northwest Kansas</h2>
              <p>
                Preisser Solutions also works with service-area businesses across Northwest Kansas
                without creating fake office or doorway city pages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
