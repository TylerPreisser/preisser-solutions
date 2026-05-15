import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Marketing Services in Hays, KS",
  description:
    "Preisser Solutions services for Hays businesses: local SEO, Google Business Profile optimization, Google Ads, web design, social media, and AI automation.",
  alternates: {
    canonical: "https://preissersolutions.com/services",
  },
  openGraph: {
    title: "Marketing Services in Hays, KS | Preisser Solutions",
    description:
      "Preisser Solutions services for Hays businesses: local SEO, Google Business Profile optimization, Google Ads, web design, social media, and AI automation.",
    url: "https://preissersolutions.com/services",
  },
};

const iconColors = [
  { bg: "rgba(13, 149, 232, 0.12)", color: "#0D95E8" },
  { bg: "rgba(0, 212, 170, 0.12)", color: "#00D4AA" },
  { bg: "rgba(99, 91, 255, 0.12)", color: "#635BFF" },
  { bg: "rgba(255, 107, 53, 0.12)", color: "#FF6B35" },
  { bg: "rgba(245, 158, 11, 0.12)", color: "#F59E0B" },
  { bg: "rgba(239, 68, 68, 0.12)", color: "#EF4444" },
];

const icons = ["🔍", "📍", "📣", "🌐", "💬", "🤖"];

const serviceHrefs = [
  "/services/local-seo-hays-ks",
  "/services/google-business-profile-optimization-hays-ks",
  "/services/google-ads-hays-ks",
  "/services/web-design-hays-ks",
  "/services/social-media-marketing-hays-ks",
  "/services/ai-automation-hays-ks",
];

const breadcrumbSchema = buildBreadcrumbs([
  { name: "Services", url: "https://preissersolutions.com/services" },
]);

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="ps-page-wrapper">
      {/* Page hero */}
      <div className="ps-page-hero">
        <div className="ps-container">
          <div className="ps-page-hero-content">
            <span className="ps-eyebrow">Services</span>
            <h1>Marketing Services for Hays Businesses</h1>
            <p>
              Websites, local SEO, Google Business Profile optimization,
              Google Ads, social media, review systems, lead tracking, and AI
              automation built around calls, booked work, and measurable follow-up.
            </p>
          </div>
        </div>
      </div>

      {/* Services detail */}
      <div className="ps-section ps-section-light">
        <div className="ps-container">
          <div className="ps-services-grid">
            {services.map((service, i) => (
              <div key={service.title} className="ps-service-card ps-card" style={{ opacity: 1, transform: "none" }}>
                <div
                  className="ps-service-icon"
                  style={{ background: iconColors[i % iconColors.length].bg }}
                  aria-hidden="true"
                >
                  <span style={{ fontSize: "22px" }}>{icons[i % icons.length]}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={serviceHrefs[i] || "/contact?offer=hays-visibility-audit"} className="ps-btn-link">
                  View service
                  <span className="ps-btn-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ps-cta-section">
        <div className="ps-cta-glow" aria-hidden="true" />
        <div className="ps-cta-content">
          <span className="ps-eyebrow">Free Audit</span>
          <h2>Ready to improve how customers find and choose your business?</h2>
          <div className="ps-cta-buttons">
            <Link href="/contact?offer=hays-visibility-audit" className="ps-btn-primary">
              Get a Free Hays Visibility Audit
              <span className="ps-btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
