"use client";

import { useState, useRef } from "react";
import { contactInterests, type ContactInterest } from "@/data/services";
import { siteConfig } from "@/data/site-config";

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: ContactInterest | "";
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  interest: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
          company: form.company,
          phone: form.phone,
          interest: form.interest,
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
      <div className="ps-container">
        {/* Hero */}
        <div className="ps-contact-hero">
          <span
            className="ps-eyebrow-dark"
            style={{ display: "block", textAlign: "center", marginBottom: "16px" }}
          >
            Contact
          </span>
          <h1>Let&apos;s Build Something.</h1>
          <p className="ps-contact-subtitle">
            Whether you know exactly what you need or you&apos;re still figuring it out
            — start here. Tell us what you can and we&apos;ll go from there.
          </p>

          {/* Visible NAP (Name, Address, Phone) — required for local SEO citation matching. */}
          <address
            className="ps-contact-nap"
            style={{
              fontStyle: "normal",
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              justifyContent: "center",
              marginTop: "32px",
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
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}
              aria-label={`Call Preisser Solutions at ${siteConfig.contact.phone}`}
            >
              {siteConfig.contact.phone}
            </a>
          </address>
        </div>

        {/* Engagement details — service area, response time, project fit, minimums, booking */}
        <section
          className="ps-contact-details"
          aria-label="Engagement details"
          style={{
            maxWidth: 880,
            margin: "48px auto 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          <div className="ps-contact-detail-card" style={{ padding: "20px", borderRadius: "12px", background: "rgba(13, 149, 232, 0.04)", border: "1px solid rgba(13, 149, 232, 0.12)" }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 8px", color: "var(--color-primary, #0D95E8)" }}>
              Service area
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0 }}>
              Kansas — primarily Hays, Wichita, Topeka, Kansas City, Salina, Manhattan. A small number of remote engagements outside Kansas are accepted when the work is a fit.
            </p>
          </div>
          <div className="ps-contact-detail-card" style={{ padding: "20px", borderRadius: "12px", background: "rgba(13, 149, 232, 0.04)", border: "1px solid rgba(13, 149, 232, 0.12)" }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 8px", color: "var(--color-primary, #0D95E8)" }}>
              Response time
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0 }}>
              Within 1 business day (M-F, 9am-5pm Central). Tyler reads every inquiry personally before he replies.
            </p>
          </div>
          <div className="ps-contact-detail-card" style={{ padding: "20px", borderRadius: "12px", background: "rgba(13, 149, 232, 0.04)", border: "1px solid rgba(13, 149, 232, 0.12)" }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 8px", color: "var(--color-primary, #0D95E8)" }}>
              Best fit
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0 }}>
              Kansas SMBs ready to invest in custom systems (websites, automation, CRM, dashboards, local SEO, AI search). We build, don&apos;t subcontract. Founder-led.
            </p>
          </div>
          <div className="ps-contact-detail-card" style={{ padding: "20px", borderRadius: "12px", background: "rgba(13, 149, 232, 0.04)", border: "1px solid rgba(13, 149, 232, 0.12)" }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 8px", color: "var(--color-primary, #0D95E8)" }}>
              Project ranges
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0 }}>
              Audits from $1,500. Sprints from $5,000. Retainers from $3,500/month. Fixed-price proposal after the scoping call.
            </p>
          </div>
          <div className="ps-contact-detail-card" style={{ padding: "20px", borderRadius: "12px", background: "rgba(13, 149, 232, 0.04)", border: "1px solid rgba(13, 149, 232, 0.12)" }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 8px", color: "var(--color-primary, #0D95E8)" }}>
              Booking
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0 }}>
              No public scheduling link yet. Send the form below or email{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>{" "}
              to arrange a scoping call.
            </p>
          </div>
          <div className="ps-contact-detail-card" style={{ padding: "20px", borderRadius: "12px", background: "rgba(13, 149, 232, 0.04)", border: "1px solid rgba(13, 149, 232, 0.12)" }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 8px", color: "var(--color-primary, #0D95E8)" }}>
              Privacy
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0 }}>
              We never share your contact info. See our{" "}
              <a href="/privacy">privacy policy</a>.
            </p>
          </div>
        </section>

        {/* Cross-links — recent case studies + service entry points */}
        <section
          className="ps-contact-crosslinks"
          aria-label="Related case studies and services"
          style={{
            maxWidth: 880,
            margin: "32px auto 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 12px" }}>
              Recent case studies
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: 15 }}>
              <li><a href="/case-studies/cassidy-hvac">Cassidy HVAC — AI marketing engine</a></li>
              <li><a href="/case-studies/hg-oil-holdings">HG Oil Holdings — inventory + AI invoicing</a></li>
              <li><a href="/case-studies/iron-and-oak-podcast">Iron &amp; Oak Podcast — cinematic media brand</a></li>
            </ul>
          </div>
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 12px" }}>
              Common service entry points
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: 15 }}>
              <li><a href="/services/ai-automation">AI automation</a></li>
              <li><a href="/services/local-seo">Local SEO</a></li>
              <li><a href="/services/ai-search-optimization">AI search optimization</a></li>
            </ul>
          </div>
        </section>

        {/* Form */}
        <form id="inquiryForm" onSubmit={handleSubmit} noValidate>
          {submitted ? (
            <div className="ps-contact-success">
              <div className="ps-contact-success-check">✓</div>
              <h2>Message on Its Way!</h2>
              <p>Thanks for reaching out. Tyler will be in touch with you shortly.</p>
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
                {/* Name */}
                <div className="ps-form-group">
                  <label htmlFor="contact-name">Your Name *</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="ps-form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Company */}
                <div className="ps-form-group">
                  <label htmlFor="contact-company">Company Name</label>
                  <input
                    type="text"
                    id="contact-company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    autoComplete="organization"
                  />
                </div>

                {/* Phone */}
                <div className="ps-form-group">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(620) 555-0100"
                    autoComplete="tel"
                  />
                </div>

                {/* Interest */}
                <div className="ps-form-group full-width">
                  <label htmlFor="contact-interest">What are you interested in?</label>
                  <select
                    id="contact-interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                  >
                    <option value="">Select an area of interest…</option>
                    {contactInterests.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="ps-form-group full-width">
                  <label htmlFor="contact-message">Tell Us What You Have in Mind *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What can we build for you?"
                    required
                    rows={5}
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
                  {submitting ? "Sending…" : "Send Inquiry"}
                  {!submitting && <span className="ps-btn-arrow" aria-hidden="true">→</span>}
                </button>

                <p className="ps-form-note">
                  Based in Hays, Kansas. Serving businesses locally and across the country.
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
