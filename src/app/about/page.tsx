import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";
import { InternalLinkBlock } from "@/components/seo/InternalLinkBlock";

// R-section-6 additions — 4 About-page FAQs, also emitted as FAQPage JSON-LD.
const aboutFaqs = [
  {
    question: "Who owns Preisser Solutions?",
    answer:
      "Tyler Preisser founded and operates Preisser Solutions. He is also Chief Product Officer of R Squared AI.",
  },
  {
    question: "Where is Preisser Solutions based?",
    answer:
      "Hays, Kansas. The service area covers western and central Kansas including Russell, Great Bend, WaKeeney, Colby, Dodge City, and Salina.",
  },
  {
    question: "What kinds of businesses does Preisser Solutions work with?",
    answer:
      "Kansas small and mid-sized businesses across HVAC, oil and gas, healthcare, professional services, retail, restaurants, and similar verticals.",
  },
  {
    question: "Does Preisser Solutions use subcontractors?",
    answer:
      "No. All design, code, and AI work is delivered directly by Tyler Preisser. No agency handoff, no subcontractor maze.",
  },
];

export const metadata: Metadata = {
  title: "About Tyler Preisser",
  description:
    "Tyler Preisser is founder of Preisser Solutions and CPO of R Squared AI. Hays, Kansas native, FHSU Engineering 2025, builder of AI systems for Kansas businesses.",
  alternates: {
    canonical: "https://preissersolutions.com/about",
  },
  openGraph: {
    title: "About Tyler Preisser | Preisser Solutions",
    description:
      "Tyler Preisser is founder of Preisser Solutions and CPO of R Squared AI. Hays, Kansas native, FHSU Engineering 2025, builder of AI systems for Kansas businesses.",
    url: "https://preissersolutions.com/about",
  },
};

const breadcrumbSchema = buildBreadcrumbs([
  { name: "About", url: "https://preissersolutions.com/about" },
]);

export default function AboutPage() {
  const { founder } = siteConfig;
  const { bio, headshot } = founder;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <JsonLd data={faqSchema(aboutFaqs)} />
      <div className="ps-page-wrapper">
        {/* Page hero */}
        <div className="ps-page-hero">
          <div className="ps-container">
            <div className="ps-page-hero-content">
              <span className="ps-eyebrow">About</span>
              <h1>We Build Things. That&apos;s What We Do.</h1>
              <p>
                Direct access to the person designing, building, and standing behind the work.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: H2 + Quick Answer for AI quote extraction */}
        <div className="ps-section ps-section-white">
          <div className="ps-container">
            <div style={{ maxWidth: 820, margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-dark)",
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                Tyler Preisser — Hays, Kansas AI Builder and Web Developer
              </h2>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "var(--color-text-body)",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Tyler Preisser is the founder and owner of Preisser Solutions, a Hays, Kansas company that builds custom websites, AI automation, web applications, dashboards, CRM workflows, and local SEO systems for Kansas small and mid-sized businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Founder intro — photo + lead paragraph */}
        <div className="ps-section ps-section-white">
          <div className="ps-container">
            <div className="ps-about-bio-grid">
              {/* Photo */}
              <div>
                <Image
                  src={headshot.src}
                  alt={headshot.alt}
                  width={headshot.width}
                  height={headshot.height}
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{
                    width: "100%",
                    maxWidth: "320px",
                    height: "auto",
                    borderRadius: "16px",
                    boxShadow: "var(--shadow-lg)",
                    display: "block",
                  }}
                />
              </div>

              {/* Lead bio */}
              <div>
                <span className="ps-eyebrow-light">{founder.title}</span>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    fontWeight: "700",
                    letterSpacing: "-0.025em",
                    color: "var(--color-text-dark)",
                    marginBottom: "20px",
                    lineHeight: "1.15",
                  }}
                >
                  {founder.name}
                </h2>
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: "1.75",
                    color: "var(--color-text-body)",
                    marginBottom: "32px",
                  }}
                >
                  {bio.lead}
                </p>
                <Link href="/contact?intent=audit" className="ps-btn-primary">
                  Book a Business Systems Audit
                  <span className="ps-btn-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Long-form bio — six required sections (R-059) */}
        {/* Content lives in src/data/site-config.ts under founder.bio. */}
        <div className="ps-section ps-section-white">
          <div className="ps-container">
            <div style={{ maxWidth: 820, margin: "0 auto" }}>
              {(bio.sections as ReadonlyArray<{ heading: string; paragraphs: readonly string[]; bullets?: readonly string[] }>).map((section) => (
                <section key={section.heading} style={{ marginBottom: 48 }}>
                  <h2
                    style={{
                      fontSize: "clamp(1.4rem, 2.4vw, 1.875rem)",
                      fontWeight: "700",
                      letterSpacing: "-0.02em",
                      color: "var(--color-text-dark)",
                      marginBottom: 16,
                      lineHeight: 1.2,
                    }}
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: 17,
                        lineHeight: 1.75,
                        color: "var(--color-text-body)",
                        marginBottom: 16,
                      }}
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul
                      style={{
                        paddingLeft: 22,
                        margin: "8px 0 0",
                        listStyle: "disc",
                      }}
                    >
                      {section.bullets.map((b, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: 17,
                            lineHeight: 1.75,
                            color: "var(--color-text-body)",
                            marginBottom: 10,
                          }}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="ps-section ps-section-light">
          <div className="ps-container">
            <div className="ps-section-header">
              <span className="ps-eyebrow-light">Values</span>
              <h2>How We Work</h2>
              <p>How the work gets done, and what that means for the businesses we build for.</p>
            </div>
            <div className="ps-placeholder-grid">
              {[
                {
                  title: "Build it right.",
                  body: "No shortcuts. No duct tape. Systems that work today and scale tomorrow.",
                },
                {
                  title: "Speed is a feature.",
                  body: "AI-first methodology means we deliver in weeks, not months. Your business can&apos;t wait, and it shouldn&apos;t have to.",
                },
                {
                  title: "Honesty over agreement.",
                  body: "If your idea won&apos;t work, I&apos;ll tell you. If there&apos;s a better way, I&apos;ll show you.",
                },
              ].map((v, i) => (
                <div key={i} className="ps-placeholder-box">
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About FAQs — server-rendered, matches FAQPage JSON-LD above */}
        <div className="ps-section ps-section-white">
          <div className="ps-container">
            <div style={{ maxWidth: 820, margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-dark)",
                  marginBottom: 24,
                  lineHeight: 1.2,
                }}
              >
                Frequently asked questions
              </h2>
              {aboutFaqs.map((q, i) => (
                <details
                  key={i}
                  style={{
                    borderBottom: "1px solid rgba(10, 22, 40, 0.08)",
                    padding: "18px 0",
                  }}
                >
                  <summary
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--color-text-dark)",
                      cursor: "pointer",
                      listStyle: "none",
                    }}
                  >
                    {q.question}
                  </summary>
                  <p
                    style={{
                      fontSize: 17,
                      lineHeight: 1.65,
                      color: "var(--color-text-body)",
                      margin: "12px 0 0",
                    }}
                  >
                    {q.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Internal links — discoverable crawl paths */}
        <div className="ps-section ps-section-light">
          <div className="ps-container">
            <div style={{ maxWidth: 1120, margin: "0 auto" }}>
              <InternalLinkBlock
                title="Explore Preisser Solutions"
                columns={3}
                links={[
                  { href: "/locations/hays-kansas", label: "Hays, Kansas", description: "Headquarters and primary service area." },
                  { href: "/services/custom-websites", label: "Custom websites", description: "Custom-coded sites, no templates." },
                  { href: "/services/ai-automation", label: "AI automation", description: "Custom AI agents, automation, and workflows." },
                  { href: "/case-studies", label: "Case studies", description: "Named clients, measurable outcomes." },
                  { href: "/contact", label: "Contact", description: "Book a scoping call with Tyler." },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
