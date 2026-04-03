import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About Tyler Preisser",
  description:
    "Tyler Preisser builds custom AI and automation solutions for Kansas businesses. Direct access, real expertise, measurable results.",
};

export default function AboutPage() {
  return (
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
                Preisser Solutions exists because I got tired of watching businesses
                struggle with technology they shouldn&apos;t have to struggle with.
                Outdated websites. Systems that don&apos;t connect. Manual work that
                should have been automated five years ago. Tools that were supposed
                to make life easier but somehow made it harder.
              </p>
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: "1.75",
                  color: "var(--color-text-body)",
                  marginBottom: "32px",
                }}
              >
                I&apos;m Tyler Preisser. I&apos;m a builder. I&apos;ve been building things
                my entire life — from physical machines and patented inventions to AI
                systems that process millions in transaction volume. I&apos;ve managed
                field operations, led large-scale technology projects, and built
                automation systems that replaced entire manual workflows. When you work
                with Preisser Solutions, you work with me — the person who designs it,
                builds it, and stands behind it.
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
    </div>
  );
}
