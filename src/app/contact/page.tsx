"use client";

import { useState, useRef } from "react";
import { contactInterests, type ContactInterest } from "@/data/services";

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

    const subject = encodeURIComponent(
      `New Inquiry: ${form.name}${form.company ? ` — ${form.company}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nPhone: ${form.phone}\nInterest: ${form.interest}\n\nMessage:\n${form.message}`
    );

    // Brief delay so the "Sending…" state is visible, then open mailto
    await new Promise((res) => setTimeout(res, 500));
    window.location.href = `mailto:sales@preissersolutions.com?subject=${subject}&body=${body}`;
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
          <h1>Show Us the Problem.</h1>
          <p className="ps-contact-subtitle">
            Tell us what&apos;s not working — or what you wish existed. We&apos;ll tell you
            exactly how we&apos;d build it. No commitment. No sales pitch. Just a
            straight conversation.
          </p>
        </div>

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
                  <label htmlFor="contact-message">Tell Us About Your Situation *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What do you need built, fixed, or improved?"
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
