import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources for Hays Local Marketing",
  description:
    "Educational resources from Preisser Solutions about Hays marketing, local SEO, Google Business Profile, Google Ads, web design, and AI automation.",
  alternates: { canonical: "https://preissersolutions.com/resources" },
};

const resources = [
  { href: "/marketing-agency-hays-ks", label: "Marketing Agency in Hays, KS: What to Look For" },
  { href: "/services/local-seo-hays-ks", label: "Local SEO Services in Hays, KS" },
  { href: "/services/google-business-profile-optimization-hays-ks", label: "Google Business Profile Optimization Checklist" },
  { href: "/services/google-ads-hays-ks", label: "Google Ads vs SEO for Hays Businesses" },
  { href: "/services/web-design-hays-ks", label: "Website Design for Hays Small Businesses" },
  { href: "/services/ai-automation-hays-ks", label: "AI Follow-Up Automation for Local Businesses" },
];

export default function ResourcesPage() {
  return (
    <div className="ps-page-wrapper">
      <section className="ps-page-hero">
        <div className="ps-container">
          <div className="ps-page-hero-content">
            <span className="ps-eyebrow">Resources</span>
            <h1>Local Marketing Resources for Hays Businesses</h1>
            <p>
              Start with the practical pages below. New articles should answer a
              real question, cite outside sources when using outside facts, and avoid
              thin AI filler.
            </p>
          </div>
        </div>
      </section>

      <section className="ps-section-light">
        <div className="ps-container">
          <div className="ps-services-grid">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href} className="ps-card ps-hub-card">
                <h2>{resource.label}</h2>
                <p>Read the guide.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
