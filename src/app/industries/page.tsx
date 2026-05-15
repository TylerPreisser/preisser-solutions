import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries Served in Hays and Northwest Kansas",
  description:
    "Marketing, websites, local SEO, Google Ads, and AI automation for Hays-area contractors, restaurants, professional services, and local operators.",
  alternates: { canonical: "https://preissersolutions.com/industries" },
};

const industries = [
  { href: "/industries/contractors", label: "Contractors and construction" },
  { href: "/industries/restaurants", label: "Restaurants and hospitality" },
  { href: "/industries/professional-services", label: "Professional services" },
];

export default function IndustriesPage() {
  return (
    <div className="ps-page-wrapper">
      <section className="ps-page-hero">
        <div className="ps-container">
          <div className="ps-page-hero-content">
            <span className="ps-eyebrow">Industries</span>
            <h1>Local Marketing Systems for Hays-Area Businesses</h1>
            <p>
              Preisser Solutions helps service businesses, restaurants, professional firms,
              and regional operators improve visibility, trust, tracking, and follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="ps-section-light">
        <div className="ps-container">
          <div className="ps-services-grid">
            {industries.map((industry) => (
              <Link key={industry.href} href={industry.href} className="ps-card ps-hub-card">
                <h2>{industry.label}</h2>
                <p>View the industry page.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
