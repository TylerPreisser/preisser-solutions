"use client";

import { useEffect, useRef, useState } from "react";
import { contactInterests, type ContactInterest } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import { trackEvent } from "@/lib/analytics";

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  website: string;
  city: string;
  interest: ContactInterest | "";
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  website: "",
  city: "",
  interest: "Hays Visibility Audit",
  message: "",
};

const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "msclkid",
] as const;

function getAttribution() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {
    landing_page: window.location.href,
    page_path: window.location.pathname,
    referrer: document.referrer,
  };

  attributionKeys.forEach((key) => {
    const value = params.get(key);
    if (value) attribution[key] = value;
  });

  return attribution;
}

export function ContactPageClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const loadTime = useRef(Date.now());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interest") || params.get("offer");
    const message = params.get("message");

    setForm((prev) => ({
      ...prev,
      interest:
        interest === "hays-visibility-audit" || interest === "Hays Visibility Audit"
          ? "Hays Visibility Audit"
          : contactInterests.includes(interest as ContactInterest)
            ? (interest as ContactInterest)
            : prev.interest,
      message: message ? message.slice(0, 1200) : prev.message,
    }));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setFormReady(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (!formReady || Date.now() - loadTime.current < 3000) {
      setError("Give the form one more second, then try again.");
      return;
    }

    setSubmitting(true);

    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          lead_type: "hays_visibility_audit",
          event_id: eventId,
          attribution: getAttribution(),
        }),
      });

      if (!response.ok) {
        throw new Error("Lead delivery failed");
      }

      trackEvent("generate_lead", {
        event_id: eventId,
        lead_type: "hays_visibility_audit",
        interest: form.interest || "Hays Visibility Audit",
      });
      setSubmitted(true);
    } catch {
      setError(
        "The form could not send right now. Please call Preisser Solutions or email sales@preissersolutions.com."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ps-contact-page-wrapper">
      <div className="ps-container">
        <div className="ps-contact-hero">
          <span
            className="ps-eyebrow-dark"
            style={{ display: "block", textAlign: "center", marginBottom: "16px" }}
          >
            Free Hays Visibility Audit
          </span>
          <h1>Get a Free Hays Visibility Audit</h1>
          <p className="ps-contact-subtitle">
            Tell us about your business, website, Google visibility, and follow-up process.
            Tyler will review where leads may be getting lost and send a practical next step.
          </p>
          <div className="ps-contact-direct">
            <a href={siteConfig.contact.phoneHref}>Call Preisser Solutions</a>
            <span aria-hidden="true">/</span>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </div>
        </div>

        <form id="inquiryForm" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="ps-contact-success">
              <div className="ps-contact-success-check">✓</div>
              <h2>Audit request received</h2>
              <p>
                Thanks. Tyler will review your details and reply within one business day.
                You can also call Preisser Solutions at {siteConfig.contact.phone}.
              </p>
            </div>
          ) : (
            <>
              <div
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
                aria-hidden="true"
              >
                <label htmlFor="contact-website-hidden">Website</label>
                <input
                  type="text"
                  id="contact-website-hidden"
                  name="website_hidden"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="ps-form-grid">
                <div className="ps-form-group">
                  <label htmlFor="contact-name">Your name *</label>
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

                <div className="ps-form-group">
                  <label htmlFor="contact-email">Email address *</label>
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

                <div className="ps-form-group">
                  <label htmlFor="contact-company">Business name *</label>
                  <input
                    type="text"
                    id="contact-company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company or organization"
                    required
                    autoComplete="organization"
                  />
                </div>

                <div className="ps-form-group">
                  <label htmlFor="contact-phone">Phone number</label>
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

                <div className="ps-form-group">
                  <label htmlFor="contact-city">City / service area *</label>
                  <input
                    type="text"
                    id="contact-city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Hays, Ellis County, Northwest Kansas"
                    required
                    autoComplete="address-level2"
                  />
                </div>

                <div className="ps-form-group">
                  <label htmlFor="contact-website">Website or Google Business Profile URL</label>
                  <input
                    type="url"
                    id="contact-website"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    inputMode="url"
                  />
                </div>

                <div className="ps-form-group full-width">
                  <label htmlFor="contact-interest">What should we review first?</label>
                  <select
                    id="contact-interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                  >
                    {contactInterests.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ps-form-group full-width">
                  <label htmlFor="contact-message">What should Tyler review first? *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="For example: We need more calls from Google, our website is not converting, leads are not being followed up with fast enough, or ads are wasting budget."
                    required
                    rows={5}
                  />
                </div>
              </div>

              <div className="ps-form-actions">
                {error && (
                  <p className="ps-form-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="ps-btn-primary"
                  disabled={submitting || !formReady}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "16px",
                    fontSize: "16px",
                    opacity: submitting || !formReady ? 0.7 : 1,
                    cursor: submitting || !formReady ? "wait" : "pointer",
                  }}
                >
                  {!formReady ? "One moment..." : submitting ? "Sending..." : "Get a Free Hays Visibility Audit"}
                  {formReady && !submitting && <span className="ps-btn-arrow" aria-hidden="true">→</span>}
                </button>

                <p className="ps-form-note">
                  {siteConfig.name} is based in {siteConfig.contact.location}. {siteConfig.contact.serviceArea}
                  Honest reviews, real business details, and accurate tracking matter here. No fake rankings,
                  fake reviews, or guaranteed Google/AI placement.
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
