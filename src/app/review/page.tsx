import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leave Honest Feedback",
  description:
    "Leave honest feedback for Preisser Solutions. Real customers are invited to share their experience without rating pressure, incentives, or keyword requests.",
  alternates: { canonical: "https://preissersolutions.com/review" },
};

export default function ReviewPage() {
  return (
    <div className="ps-page-wrapper">
      <section className="ps-page-hero">
        <div className="ps-container">
          <div className="ps-page-hero-content">
            <span className="ps-eyebrow">Honest Feedback</span>
            <h1>Share an Honest Review of Preisser Solutions</h1>
            <p>
              If Preisser Solutions helped you, an honest review helps other local
              business owners understand what it is like to work with us. No
              specific rating, wording, or keyword is requested.
            </p>
          </div>
        </div>
      </section>

      <section className="ps-section-light">
        <div className="ps-container">
          <div className="ps-card ps-content-card">
            <h2>Compliant review request</h2>
            <p>
              Share what problem you needed help with, what was built or fixed,
              and what changed afterward. Please only leave feedback if you have
              real experience with Preisser Solutions.
            </p>
            <p>
              No incentives are offered. No one is asked to leave a specific
              rating, mention specific keywords, or write only positive feedback.
            </p>
            <p>
              The direct Google review link will be added after the Google Business
              Profile is verified. Until then, send feedback to sales@preissersolutions.com.
            </p>
            <Link href="/contact?offer=hays-visibility-audit" className="ps-btn-primary">
              Get a Free Hays Visibility Audit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
