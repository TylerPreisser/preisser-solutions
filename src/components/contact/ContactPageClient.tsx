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
          <span
            className="ps-eyebrow-dark"
            style={{ display: "block", textAlign: "center", marginBottom: "16px" }}
          >
            Contact
          </span>
          <h1>Let&apos;s Build Something.</h1>
          <p className="ps-contact-subtitle">
            Tell us what you have in mind. Tyler will reply within one business day.
          </p>

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
                  {submitting ? "Sending…" : "Send message"}
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

        {/* Want more context first — supporting content lives BELOW the form */}
        <section
          aria-label="Helpful links before you write"
          style={{ maxWidth: 1120, margin: "48px auto 0" }}
        >
          <h2
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              margin: "0 0 8px",
            }}
          >
            Want more context first?
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              opacity: 0.78,
              margin: "0 0 24px",
              maxWidth: 720,
            }}
          >
            Browse recent client work and the services we build before you reach out.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  margin: "0 0 12px",
                  opacity: 0.65,
                }}
              >
                Recent case studies
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 15,
                }}
              >
                <li><a href="/case-studies/cassidy-hvac">Cassidy HVAC — AI marketing engine</a></li>
                <li><a href="/case-studies/hg-oil-holdings">HG Oil Holdings — inventory + AI invoicing</a></li>
                <li><a href="/case-studies/iron-and-oak-podcast">Iron &amp; Oak Podcast — cinematic media brand</a></li>
              </ul>
            </div>
            <div>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  margin: "0 0 12px",
                  opacity: 0.65,
                }}
              >
                Services
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 15,
                }}
              >
                <li><a href="/services/ai-automation">AI automation</a></li>
                <li><a href="/services/local-seo">Local SEO</a></li>
                <li><a href="/services/ai-search-optimization">AI search optimization</a></li>
                <li><a href="/services">All services</a></li>
              </ul>
            </div>
            <div>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  margin: "0 0 12px",
                  opacity: 0.65,
                }}
              >
                Tools
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 15,
                }}
              >
                <li><a href="/roi-calculator">Automation ROI calculator</a></li>
                <li><a href="/case-studies">All case studies</a></li>
                <li><a href="/about">About Tyler</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common questions — server-renderable text, matched by FAQPage JSON-LD above */}
        <section
          aria-label="Common questions"
          style={{ maxWidth: 880, margin: "64px auto 0" }}
        >
          <h2
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              margin: "0 0 8px",
            }}
          >
            Common questions
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              opacity: 0.78,
              margin: "0 0 24px",
              maxWidth: 720,
            }}
          >
            Quick answers to the four questions we get most.
          </p>
          {contactFaqs.map((q, i) => (
            <details
              key={i}
              style={{
                borderBottom: "1px solid var(--theme-border)",
                padding: "16px 0",
              }}
            >
              <summary
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  listStyle: "none",
                }}
              >
                {q.question}
              </summary>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  opacity: 0.82,
                  margin: "10px 0 0",
                }}
              >
                {q.answer}
              </p>
            </details>
          ))}
        </section>

        <div style={{ height: 96 }} aria-hidden="true" />
      </div>
    </div>
  );
}
