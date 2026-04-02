"use client";

import { useState } from "react";
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

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Formspree or mailto fallback — just open mailto for now
    const subject = encodeURIComponent(
      `Inquiry from ${form.name}${form.company ? ` — ${form.company}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nPhone: ${form.phone}\nInterest: ${form.interest}\n\nMessage:\n${form.message}`
    );

    // Simulate a brief delay then open mailto
    await new Promise((res) => setTimeout(res, 400));
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
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
            Let&apos;s Talk
          </span>
          <h1>Let&apos;s Discuss Your Goals</h1>
          <p className="ps-contact-subtitle">
            Tell us a little about your business and what you&apos;re looking to solve.
            No hard pitches — just a real conversation about where we can help.
          </p>
        </div>

        {/* Form */}
        <form id="inquiryForm" onSubmit={handleSubmit} noValidate>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "20px",
                  color: "#00D4AA",
                  fontWeight: "700",
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  color: "#0A1628",
                  fontSize: "24px",
                  marginBottom: "12px",
                }}
              >
                Message on Its Way!
              </h2>
              <p style={{ color: "#425466", fontSize: "16px", marginBottom: "0" }}>
                Thanks for reaching out. Tyler will be in touch with you shortly.
              </p>
            </div>
          ) : (
            <>
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
                  <label htmlFor="contact-message">Tell Us About Your Situation *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What processes are eating up your team's time? What would you love to automate? Any context you can share helps us prepare a more relevant response."
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
                  By submitting, you agree to be contacted by Preisser Solutions regarding your inquiry.
                  We never share your information. You can opt out at any time.
                  <br />
                  Or reach us directly:{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    style={{ color: "#0D95E8" }}
                  >
                    {siteConfig.contact.email}
                  </a>{" "}
                  &middot;{" "}
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    style={{ color: "#0D95E8" }}
                  >
                    {siteConfig.contact.phone}
                  </a>
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
