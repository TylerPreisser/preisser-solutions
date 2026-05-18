import type { Metadata } from "next";
import Link from "next/link";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "All Services",
  description:
    "Every service Preisser Solutions builds for Kansas businesses — websites, AI automation, local SEO, AI search optimization, CRM, dashboards, integrations, and more.",
  alternates: {
    canonical: "https://preissersolutions.com/services",
  },
  openGraph: {
    title: "All Services | Preisser Solutions",
    description:
      "Every service Preisser Solutions builds for Kansas businesses — websites, AI automation, local SEO, AI search optimization, CRM, dashboards, integrations, and more.",
    url: "https://preissersolutions.com/services",
  },
};

// Crawlable services index. Grouped by the same five pillars rendered on the
// homepage (`service-pillars.tsx`). Each entry links to a real service-detail
// page (rendered through AeoPage from `src/data/aeo/services/*`). No emoji
// icons, no per-card CTAs — the rich interactive tile UX lives on the
// homepage; this hub exists for crawlers and direct-link discovery.
interface ServiceLink {
  title: string;
  href: string;
  description: string;
}

interface ServiceGroup {
  category: string;
  intro: string;
  items: ServiceLink[];
}

const groups: ServiceGroup[] = [
  {
    category: "Websites & Applications",
    intro:
      "Custom-coded websites, web applications, and conversion-focused builds. No templates.",
    items: [
      {
        title: "Custom Websites",
        href: "/services/custom-websites",
        description:
          "Custom-coded Next.js sites engineered for speed, SEO, and AI search visibility.",
      },
      {
        title: "Website Redesign",
        href: "/services/website-redesign",
        description:
          "Modern redesigns that keep what works and fix what does not.",
      },
      {
        title: "Website Migration",
        href: "/services/website-migration",
        description:
          "Move off WordPress, Wix, Squarespace, or a custom legacy stack without breaking SEO.",
      },
      {
        title: "Conversion Rate Optimization",
        href: "/services/conversion-optimization",
        description:
          "Audit and rebuild the parts of your site that decide whether visitors become leads.",
      },
      {
        title: "Client Portals",
        href: "/services/client-portal",
        description:
          "Branded customer-facing portals for accounts, documents, scheduling, and self-service.",
      },
      {
        title: "Web Applications",
        href: "/web-applications",
        description:
          "Internal tools, booking systems, calculators, intake flows, and custom web platforms.",
      },
    ],
  },
  {
    category: "AI Automation",
    intro:
      "AI-driven automation for the manual workflows costing your team time every week.",
    items: [
      {
        title: "AI Automation",
        href: "/services/ai-automation",
        description:
          "Custom AI agents and automation systems that remove manual work end-to-end.",
      },
      {
        title: "AI Invoicing",
        href: "/services/ai-invoicing",
        description:
          "AI-powered invoice generation, parsing, and reconciliation tied to your accounting stack.",
      },
      {
        title: "AI Customer Service",
        href: "/services/ai-customer-service",
        description:
          "AI agents that triage support, answer routine questions, and route what needs a human.",
      },
      {
        title: "Customer Reactivation",
        href: "/services/customer-reactivation",
        description:
          "SMS and email reactivation engines that pull revenue out of past customers.",
      },
      {
        title: "Business Automation",
        href: "/business-automation",
        description:
          "Process automation across operations, scheduling, intake, follow-up, and reporting.",
      },
    ],
  },
  {
    category: "Local SEO & AI Search",
    intro:
      "Be cited by Google's local pack AND by ChatGPT, Perplexity, Gemini, and Claude.",
    items: [
      {
        title: "Local SEO",
        href: "/services/local-seo",
        description:
          "Google Business Profile, citations, reviews, local schema, and ranking strategy for Kansas markets.",
      },
      {
        title: "AI Search Optimization (GEO)",
        href: "/services/ai-search-optimization",
        description:
          "Generative engine optimization so AI engines cite your business by name.",
      },
      {
        title: "Paid Ads (Google, Meta, LinkedIn)",
        href: "/services/paid-ads",
        description:
          "Accountable paid acquisition with conversion tracking and weekly optimization.",
      },
      {
        title: "Google Ads + Local SEO (Service Businesses)",
        href: "/services/google-ads-local-seo-service-business",
        description:
          "The combined paid-plus-organic playbook for service-area businesses across Kansas.",
      },
    ],
  },
  {
    category: "CRM, Integrations & Dashboards",
    intro:
      "Connect what you already pay for, see what is actually happening, and stop running the business out of a spreadsheet.",
    items: [
      {
        title: "Custom CRM",
        href: "/services/custom-crm",
        description:
          "Custom CRM systems built for how your team actually works — not how HubSpot says they should.",
      },
      {
        title: "API Integration",
        href: "/services/api-integration",
        description:
          "Wire QuickBooks, ServiceTitan, HubSpot, Salesforce, Square, and Stripe together so data flows once.",
      },
    ],
  },
];

const breadcrumbSchema = buildBreadcrumbs([
  { name: "Services", url: "https://preissersolutions.com/services" },
]);

// ItemList JSON-LD — flat list of every service-detail page for AI engines.
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Preisser Solutions services",
  itemListElement: groups
    .flatMap((g) => g.items)
    .map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://preissersolutions.com${item.href}`,
      name: item.title,
    })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="ps-page-wrapper">
        {/* Page hero */}
        <div className="ps-page-hero">
          <div className="ps-container">
            <div className="ps-page-hero-content">
              <span className="ps-eyebrow">Services</span>
              <h1>Every service Preisser Solutions builds.</h1>
              <p>
                A complete index of the websites, applications, automation systems, SEO programs, integrations, and CRM work we deliver for Kansas businesses. For the rich, interactive overview of each category, see{" "}
                <Link href="/#services">What We Do</Link> on the homepage.
              </p>
            </div>
          </div>
        </div>

        {/* Grouped service index */}
        <div className="ps-section ps-section-light">
          <div className="ps-container">
            <div style={{ maxWidth: 980, margin: "0 auto" }}>
              {groups.map((group) => (
                <section
                  key={group.category}
                  aria-labelledby={`group-${group.category.replace(/\s+/g, "-").toLowerCase()}`}
                  style={{ marginBottom: 64 }}
                >
                  <h2
                    id={`group-${group.category.replace(/\s+/g, "-").toLowerCase()}`}
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      margin: "0 0 8px",
                      lineHeight: 1.2,
                    }}
                  >
                    {group.category}
                  </h2>
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.65,
                      opacity: 0.78,
                      margin: "0 0 24px",
                      maxWidth: 720,
                    }}
                  >
                    {group.intro}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="ps-link-block__item"
                          style={{ height: "100%" }}
                        >
                          <span className="ps-link-block__label">
                            {item.title}
                          </span>
                          <span className="ps-link-block__desc">
                            {item.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <section
          className="ps-cta-section"
          aria-labelledby="services-cta-heading"
        >
          <div className="ps-cta-glow" aria-hidden="true" />
          <div className="ps-cta-content">
            <span className="ps-eyebrow">Get in Touch</span>
            <h2 id="services-cta-heading" className="ps-cta-heading">
              Not sure which service fits?
            </h2>
            <p className="ps-cta-body">
              Start with a conversation. We will help you scope it before quoting it — pricing is fixed once we agree on what we are building.
            </p>
            <div className="ps-cta-buttons">
              <Link href="/contact" className="ps-btn ps-btn-primary-dark">
                Reach out
                <span className="ps-btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/case-studies" className="ps-btn ps-btn-secondary">
                See case studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
