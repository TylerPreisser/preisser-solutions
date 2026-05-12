import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI-powered marketing for Kansas businesses that need sharper websites, stronger local visibility, accountable ads, and practical automation.",
  alternates: {
    canonical: "https://preissertech.com/services",
  },
  openGraph: {
    title: "Services | Preisser Tech",
    description:
      "AI-powered marketing for Kansas businesses that need sharper websites, stronger local visibility, accountable ads, and practical automation.",
    url: "https://preissertech.com/services",
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

const icons = ["🔍", "⚙️", "📋", "🤖", "🌐", "✏️"];

const breadcrumbSchema = buildBreadcrumbs([
  { name: "Services", url: "https://preissertech.com/services" },
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
            <h1>What We Build</h1>
            <p>
              AI-powered marketing for Kansas businesses that need sharper
              websites, stronger local visibility, accountable ads, and
              practical automation.
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
                <Link href="/contact" className="ps-btn-link">
                  Tell us what you need
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
          <span className="ps-eyebrow">Get in Touch</span>
          <h2>Ready to improve how customers find and choose your business?</h2>
          <p>
            Hire Preisser Tech for a better website, stronger local visibility,
            accountable ad campaigns, and practical AI automation.
          </p>
          <div className="ps-cta-buttons">
            <Link href="/contact" className="ps-btn-primary">
              Get in Touch
              <span className="ps-btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
