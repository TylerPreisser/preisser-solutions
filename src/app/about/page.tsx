import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Tyler Preisser and learn about the mission behind Preisser Solutions.",
};

export default function AboutPage() {
  return (
    <div className="ps-page-wrapper">
      {/* Page hero */}
      <div className="ps-page-hero">
        <div className="ps-container">
          <div className="ps-page-hero-content">
            <span className="ps-eyebrow">About</span>
            <h1>Meet {siteConfig.founder.name}</h1>
            <p>
              The founder and driving force behind Preisser Solutions.
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
                [Bio paragraph one — Tyler's background, why he started Preisser Solutions,
                what problem he saw in the market that he wanted to solve.]
              </p>
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: "1.75",
                  color: "var(--color-text-body)",
                  marginBottom: "32px",
                }}
              >
                [Bio paragraph two — his approach, personal philosophy, what makes
                working with Preisser Solutions different from hiring a firm or buying software.]
              </p>
              <Link href="/contact" className="ps-btn-primary">
                Work with Tyler
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
            <span className="ps-eyebrow-light">Values</span>
            <h2>How We Work</h2>
            <p>[Section subtitle — brief description of operating principles.]</p>
          </div>
          <div className="ps-placeholder-grid">
            {[
              { title: "[Value One]", body: "[Description of this operating principle and what it means for clients.]" },
              { title: "[Value Two]", body: "[Description of this operating principle and what it means for clients.]" },
              { title: "[Value Three]", body: "[Description of this operating principle and what it means for clients.]" },
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
  );
}
