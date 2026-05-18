"use client";

import { useState, useRef } from "react";
import { siteConfig } from "@/data/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";
import { InternalLinkBlock } from "@/components/seo/InternalLinkBlock";

// ContactPage JSON-LD referencing the global LocalBusiness graph.
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Preisser Solutions",
  url: "https://preissersolutions.com/contact",
  mainEntity: { "@id": "https://preissersolutions.com/#localbusiness" },
};

// Compact FAQ set — rendered below the form, not above. Engineered for AI quote
// extraction and matched by FAQPage JSON-LD.
const contactFaqs = [
  {
    question: "How much do projects cost?",
    answer:
      "Audits start at $1,500. Implementation sprints start at $5,000. Retainers start at $3,500/month. We share scoped pricing after a short discovery call.",
  },
  {
    question: "How fast does Preisser Solutions respond?",
    answer: "Within 1 business day Monday-Friday, 9am-5pm Central.",
  },
  {
    question: "Does Preisser Solutions work outside Hays?",
    answer:
      "Yes. We serve all of Kansas with a particular focus on western and central Kansas (Hays, Russell, Great Bend, WaKeeney, Colby, Dodge City, Salina). Remote engagements are available for businesses elsewhere when the project fit is strong.",
  },
  {
    question: "What should I include in my message?",
    answer:
      "Your current website, the main problem you want solved, your city, and whether you need a website, local SEO, AI automation, or a custom system.",
  },
];

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
};

export function ContactPageClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Honeypot — bots fill this, humans never see it
  const [honeypot, setHoneypot] = useState("");
  // Track when the form was rendered to catch instant-submit bots
  const loadTime = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam gate 1: honeypot field was filled — silent discard
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    // Spam gate 2: form submitted in under 3 seconds — bot behaviour
    if (Date.now() - loadTime.current < 3000) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);

    try {
      await fetch("https://hooks.zapier.com/hooks/catch/21721728/u7hhmth/", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
    } catch {
      // Zapier webhook is fire-and-forget — still show success
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="ps-contact-page-wrapper">
      <JsonLd data={contactPageSchema} />
      <JsonLd data={faqSchema(contactFaqs)} />
      <div className="ps-container">
        {/* Hero — minimal, lets the form be the focal point */}
        <div className="ps-contact-hero">
          <h1>Reach out</h1>

          {/* Visible NAP — email only, semantic <address>. */}
          <address
            className="ps-contact-nap"
            style={{
              fontStyle: "normal",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              marginTop: "24px",
              fontSize: "15px",
            }}
          >
            <span>
              <strong>{siteConfig.name}</strong>
            </span>
            <span>{siteConfig.contact.location} 67601</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              aria-label={`Email Preisser Solutions at ${siteConfig.contact.email}`}
            >
              {siteConfig.contact.email}
            </a>
          </address>
        </div>

        {/* Form — the main event. Name, email, message. */}
        <form
          id="inquiryForm"
          onSubmit={handleSubmit}
          noValidate
          style={{ maxWidth: 640, margin: "48px auto 0" }}
        >
          {submitted ? (
            <div className="ps-contact-success">
              <div className="ps-contact-success-check">✓</div>
              <h2>Message on its way.</h2>
              <p>Thanks for reaching out. Tyler will be in touch shortly.</p>
            </div>
          ) : (
            <>
              {/* Honeypot — visually hidden, only bots fill this */}
              <div
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
                aria-hidden="true"
              >
                <label htmlFor="contact-website">Website</label>
                <input
                  type="text"
                  id="contact-website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="ps-form-grid">
                <div className="ps-form-group full-width">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="ps-form-group full-width">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="ps-form-group full-width">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your current website, the main problem you want solved, your city, and whether you need a website, local SEO, AI automation, or a custom system."
                    required
                    rows={6}
                  />
                </div>
              </div>

              <div className="ps-form-actions">
                <button
                  type="submit"
                  className="ps-btn-primary"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "16px",
                    fontSize: "16px",
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? "wait" : "pointer",
                  }}
                >
                  {submitting ? "Sending…" : "Reach out"}
                  {!submitting && <span className="ps-btn-arrow" aria-hidden="true">→</span>}
                </button>
              </div>
            </>
          )}
        </form>

        {/* Divider — visually separates the form from the supporting content below */}
        <div
          aria-hidden="true"
          style={{
            maxWidth: 880,
            margin: "80px auto 0",
            height: 1,
            background: "var(--theme-border)",
          }}
        />

        {/* Want more context first — theme-aware card grid matching site vocabulary */}
        <section
          aria-label="Helpful links before you write"
          className="ps-context-section"
        >
          <h2 className="ps-context-section__title">Want more context first?</h2>
          <p className="ps-context-section__intro">
            Browse recent client work, the services we build, and what an engagement looks like before you reach out.
          </p>

          <div className="ps-context-grid">
            <a href="/case-studies" className="ps-context-card">
              <h3 className="ps-context-card__title">Case studies</h3>
              <p className="ps-context-card__desc">
                See projects we&apos;ve shipped for HVAC, oilfield, healthcare, and other Kansas businesses.
              </p>
              <span className="ps-context-card__cta" aria-hidden="true">
                View
                <span className="ps-context-card__arrow">→</span>
              </span>
            </a>

            <a href="/services" className="ps-context-card">
              <h3 className="ps-context-card__title">Services</h3>
              <p className="ps-context-card__desc">
                Every service we offer, grouped by what you&apos;re trying to fix.
              </p>
              <span className="ps-context-card__cta" aria-hidden="true">
                View
                <span className="ps-context-card__arrow">→</span>
              </span>
            </a>

            <a href="/roi-calculator" className="ps-context-card">
              <h3 className="ps-context-card__title">Automation ROI</h3>
              <p className="ps-context-card__desc">
                Estimate what an automation engagement saves your business in dollars and hours.
              </p>
              <span className="ps-context-card__cta" aria-hidden="true">
                View
                <span className="ps-context-card__arrow">→</span>
              </span>
            </a>
          </div>
        </section>

        {/* Common questions — centered column, server-renderable text, matched by FAQPage JSON-LD above */}
        <section
          aria-label="Common questions"
          className="ps-contact-faq-section"
        >
          <h2 className="ps-contact-faq__title">Common questions</h2>
          <p className="ps-contact-faq__intro">
            Quick answers to the four questions we get most.
          </p>
          <div className="ps-contact-faq__list">
            {contactFaqs.map((q, i) => (
              <details key={i} className="ps-contact-faq__item">
                <summary className="ps-contact-faq__summary">
                  {q.question}
                </summary>
                <p className="ps-contact-faq__answer">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div style={{ height: 96 }} aria-hidden="true" />
      </div>
    </div>
  );
}
