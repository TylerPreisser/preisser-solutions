import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy information for Preisser Solutions website inquiries, lead forms, analytics, and follow-up.",
  alternates: { canonical: "https://preissersolutions.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="ps-page-wrapper">
      <section className="ps-page-hero">
        <div className="ps-container">
          <div className="ps-page-hero-content">
            <span className="ps-eyebrow">Privacy</span>
            <h1>Privacy and Lead Handling</h1>
            <p>
              Preisser Solutions collects only the details needed to respond to website
              inquiries, run visibility audits, and understand which pages or campaigns
              generated a lead.
            </p>
          </div>
        </div>
      </section>

      <section className="ps-section-light">
        <div className="ps-container">
          <article className="ps-card ps-content-card">
            <h2>Information collected</h2>
            <p>
              Contact forms may collect name, email, business name, phone, website,
              city or service area, message, page path, referrer, and campaign
              parameters such as UTM values or ad click IDs when present.
            </p>
            <h2>How it is used</h2>
            <p>
              The information is used to respond to the inquiry, prepare a visibility
              audit, understand lead sources, and improve website conversion tracking.
            </p>
            <h2>Third-party tools</h2>
            <p>
              The site can use Google Analytics 4 when the measurement ID is configured
              at build time. Lead submissions are forwarded through a server-side
              Cloudflare Pages Function to the configured CRM or automation webhook.
            </p>
            <h2>Messaging and follow-up</h2>
            <p>
              If you provide a phone number, Preisser Solutions may use it to respond to
              your inquiry. Any future SMS automation should include appropriate consent
              and opt-out handling before launch.
            </p>
            <h2>Contact</h2>
            <p>
              Privacy questions can be sent to sales@preissersolutions.com.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
