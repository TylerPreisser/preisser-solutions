import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "About Preisser Solutions | Hays Marketing & AI Automation",
  description:
    "About Preisser Solutions, a Hays, Kansas marketing, website, local SEO, Google Ads, review, lead tracking, and AI automation company owned by Tyler Preisser.",
  alternates: {
    canonical: "https://preissersolutions.com/about",
  },
  openGraph: {
    title: "About Preisser Solutions | Hays Marketing & AI Automation",
    description:
      "Preisser Solutions helps Hays and Northwest Kansas businesses improve websites, local SEO, Google visibility, ads, reviews, lead tracking, and AI-powered follow-up.",
    url: "https://preissersolutions.com/about",
  },
};

const breadcrumbSchema = buildBreadcrumbs([
  { name: "About", url: "https://preissersolutions.com/about" },
]);

export default function AboutPage() {
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
            <span className="ps-eyebrow">About Preisser Solutions</span>
            <h1>Hays marketing, websites, SEO, ads, and AI automation.</h1>
            <p>
              Preisser Solutions helps local businesses get found, trusted,
              contacted, tracked, and followed up with.
            </p>
          </div>
        </div>
      </div>

      {/* About content — two column */}
      <div className="ps-section ps-section-white">
        <div className="ps-container">
          <div className="ps-about-bio-grid">
            {/* Photo */}
            <div>
              <Image
                src="/images/Tyler Portait.jpeg"
                alt="Tyler Preisser — Founder, Preisser Solutions"
                width={320}
                height={320}
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "auto",
                  borderRadius: "16px",
                  boxShadow: "var(--shadow-lg)",
                  display: "block",
                }}
                loading="lazy"
              />
            </div>

            {/* Bio */}
            <div>
              <span className="ps-eyebrow-light">Founder &amp; Owner</span>
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
                {siteConfig.founder.name}
              </h2>
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: "1.75",
                  color: "var(--color-text-body)",
                  marginBottom: "20px",
                }}
              >
                Preisser Solutions is a Hays, Kansas company owned by Tyler
                Preisser. The work is built for local business owners who need
                more calls, booked appointments, Google visibility, honest
                reviews, clearer tracking, and faster lead follow-up.
              </p>
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: "1.75",
                  color: "var(--color-text-body)",
                  marginBottom: "32px",
                }}
              >
                I&apos;m Tyler Preisser. When you work with Preisser Solutions, you
                work directly with me from the first audit through the actual
                build. That matters because local growth problems are usually
                connected: the website, Google Business Profile, ads, reviews,
                tracking, and follow-up all affect whether a customer chooses you.
              </p>
              <Link href="/contact?offer=hays-visibility-audit" className="ps-btn-primary">
                Get a Free Hays Visibility Audit
                <span className="ps-btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Values placeholder */}
      <div className="ps-section ps-section-light">
        <div className="ps-container">
          <div className="ps-section-header">
            <span className="ps-eyebrow-light">How We Work</span>
            <h2>Practical local growth, without fake proof.</h2>
            <p>Every recommendation should tie back to visibility, trust, calls, booked work, or follow-up.</p>
          </div>
          <div className="ps-placeholder-grid">
            {[
              {
                title: "Start with the audit.",
                body: "Before selling a large project, we look for the highest-leverage gaps in your website, Google visibility, reviews, tracking, and follow-up.",
              },
              {
                title: "Make the next step obvious.",
                body: "Pages, ads, listings, and automation should make it easier for a real customer to call, request help, book, or get a timely response.",
              },
              {
                title: "Use real proof only.",
                body: "No invented testimonials, fake reviews, unsupported rankings, or inflated claims. Case studies wait until metrics and permission are verified.",
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
    </div>
    </>
  );
}
