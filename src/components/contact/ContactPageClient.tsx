"use client";

import { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/data/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

// ContactPage JSON-LD referencing the global LocalBusiness graph.
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Preisser Solutions",
  url: "https://preissersolutions.com/contact",
  mainEntity: { "@id": "https://preissersolutions.com/#localbusiness" },
};

// Compact FAQ set — SEO-critical: matched by FAQPage JSON-LD + AI quote extraction.
const contactFaqs = [
  {
    question: "How does pricing work?",
    answer:
      "Every engagement is scoped individually. We share a fixed-price proposal after a short scoping conversation — scope, deliverables, timeline, and total cost all stated up front.",
  },
  {
    question: "Does Preisser Solutions work outside Hays?",
    answer:
      "Yes. We serve all of Kansas with a particular focus on western and central Kansas (Hays, Russell, Great Bend, WaKeeney, Colby, Dodge City, Salina). Remote engagements are available for businesses elsewhere when the project fit is strong.",
  },
  {
    question: "What should I include in my message?",
    answer:
      "Your business, what you want fixed or built, and how to reach you. A few sentences is enough — we ask the detailed questions on the call, not on the form.",
  },
];

// What the visitor needs. Doubles as the service menu: reading the options is
// often how someone works out which one they are, so the wording stays plain
// rather than matching our internal service names exactly.
const NEED_OPTIONS = [
  "Custom business software (dashboard, database, portal)",
  "Business automation",
  "AI integration",
  "New website or redesign",
  "Local SEO / AI search visibility",
  "Something else — or not sure yet",
];

const TIMELINE_OPTIONS = [
  "Just exploring",
  "Next 1–3 months",
  "As soon as possible",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  need: string;
  timeline: string;
  details: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  need: "",
  timeline: "",
  details: "",
};

// The four fields we actually need to reply intelligently. Everything else is
// optional on purpose — each required field costs completions, so a field only
// earns "required" if we cannot write a useful reply without it.
type RequiredField = "name" | "email" | "need" | "details";

type Errors = Partial<Record<RequiredField, string>>;

// Deliberately permissive: something@something.something. Strict RFC-5322
// matching rejects addresses that are actually valid and deliverable, which
// is a worse failure than letting a typo through to a bounced reply.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email so we can reply.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "That doesn't look like a valid email address.";
  }

  if (!form.need) {
    errors.need = "Please pick the closest option.";
  }

  if (!form.details.trim()) {
    errors.details = "Please tell us a little about the project.";
  }

  return errors;
}

export function ContactPageClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Which path actually delivered the enquiry. The success screen has to tell
  // the truth about this: "we've got it" and "your mail app should have opened"
  // are different instructions, and showing the wrong one either strands a
  // visitor waiting on a reply or makes them send a duplicate.
  const [delivery, setDelivery] = useState<"sent" | "mailto">("sent");
  // Honeypot — bots fill this, humans never see it
  const [honeypot, setHoneypot] = useState("");
  // Track when the form was rendered to catch instant-submit bots
  const loadTime = useRef(Date.now());

  // Refs for GSAP scroll reveals
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      // Hero — stagger children in on mount
      if (heroRef.current) {
        const children = Array.from(heroRef.current.children) as HTMLElement[];
        gsap.fromTo(
          children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.15,
          }
        );
      }

      // Form area
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      // FAQ items
      if (faqRef.current) {
        const items = Array.from(faqRef.current.querySelectorAll(".ps-contact-faq__item")) as HTMLElement[];
        gsap.fromTo(
          items,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faqRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear a field's error as soon as the visitor starts fixing it. Errors
    // re-appear on the next submit if the field is still invalid — nobody
    // should be scolded mid-keystroke.
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name as RequiredField];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation runs BEFORE the spam gates on purpose. The gates fake a
    // success screen rather than reporting anything, so a real visitor who trips
    // one would otherwise be shown "sent" while their incomplete form was
    // silently dropped. Checking first means a human always gets real feedback;
    // a bot that fills every field correctly still hits the gates below.
    //
    // The form previously carried `noValidate` with no JS validation behind it,
    // so an empty form submitted happily and produced an empty enquiry. Move
    // focus to the first problem so keyboard and screen-reader users are taken
    // to it rather than left to hunt.
    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const order: RequiredField[] = ["name", "email", "need", "details"];
      const first = order.find((field) => field in found);
      if (first) {
        document.getElementById(`contact-${first}`)?.focus();
      }
      return;
    }

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

    // POST to our own Cloudflare Pages Function, which emails the enquiry via
    // Resend. `mailto:` used to be the whole submission path, and it silently
    // fails for anyone reading webmail in a browser with no registered mail
    // handler — they see nothing happen and we never learn they tried.
    //
    // It survives as the fallback: if the endpoint is unreachable or misbehaves
    // we hand off to the mail client rather than lose the enquiry, and the
    // success screen tells the visitor which of the two just happened.
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });

      if (!response.ok) throw new Error(`contact endpoint returned ${response.status}`);

      setDelivery("sent");
      setSubmitted(true);
    } catch (error) {
      console.error("[contact] falling back to mailto", error);
      setDelivery("mailto");
      setSubmitted(true);
      window.location.href = buildMailto();
    } finally {
      setSubmitting(false);
    }
  };

  /** The enquiry, addressed and pre-written, ready for the visitor to send. */
  const buildMailto = () => {
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : "",
      form.company ? `Company: ${form.company}` : "",
      `Needs: ${form.need}`,
      form.timeline ? `Timeline: ${form.timeline}` : "",
    ].filter(Boolean);

    const body = [
      lines.join("\n"),
      `Project details:\n${form.details}`,
      "— sent from preissersolutions.com/contact",
    ].join("\n\n");

    return (
      `mailto:${siteConfig.contact.email}` +
      `?subject=${encodeURIComponent(
        `New project enquiry — ${form.company || form.name || "a visitor"}`
      )}` +
      `&body=${encodeURIComponent(body)}`
    );
  };

  /** Wires a required field to its error message for assistive tech. */
  const errorProps = (field: RequiredField) =>
    errors[field]
      ? {
          "aria-invalid": true as const,
          "aria-describedby": `contact-${field}-error`,
        }
      : {};

  const fieldClass = (base: string, field: RequiredField) =>
    errors[field] ? `${base} ps-contact-field__control--error` : base;

  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={faqSchema(contactFaqs)} />

      {/* ── Hero band — dark, left-aligned editorial ────────────── */}
      <section className="ps-contact2-hero" aria-label="Contact Preisser Solutions">
        <div className="ps-container">
          <div className="ps-contact2-hero-inner" ref={heroRef}>
            <h1 className="ps-contact2-h1">Reach out.</h1>

            {/* Visible NAP — semantic <address> for local SEO */}
            <address className="ps-contact-nap" aria-label="Contact information">
              <span className="ps-contact-nap__item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 7 3a1.5 1.5 0 0 1 0 3z" fill="currentColor"/>
                </svg>
                {siteConfig.contact.location} 67601
              </span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="ps-contact-nap__item ps-contact-nap__link"
                aria-label={`Email Preisser Solutions at ${siteConfig.contact.email}`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 3h12v8H1V3zm0 0l6 5 6-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                {siteConfig.contact.email}
              </a>
            </address>
          </div>
        </div>

        {/* Hairline accent rule at the bottom of the hero band */}
        <div className="ps-contact2-hero-rule" aria-hidden="true" />
      </section>

      {/* ── Main content — centered form ─────────────────────────── */}
      <section className="ps-contact2-body" aria-label="Contact form">
        <div className="ps-container">
          <div className="ps-contact2-layout">

            {/* ── Centered form ────────────────────────────────── */}
            <div className="ps-contact2-form-area" ref={formRef}>
              <form
                id="inquiryForm"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                {submitted ? (
                  <div className="ps-contact-success" role="alert" aria-live="polite">
                    <div className="ps-contact-success-check" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M10 16.5l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {delivery === "sent" ? (
                      <>
                        <h3 className="ps-contact-success__heading">Message sent.</h3>
                        <p className="ps-contact-success__body">
                          It&rsquo;s in our inbox &mdash; we read every one ourselves,
                          and you&rsquo;ll hear back from the person who&rsquo;d
                          actually build it.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="ps-contact-success__heading">Ready to send.</h3>
                        <p className="ps-contact-success__body">
                          Your email app should have opened with the message already
                          written. Hit send and it comes straight to us.
                        </p>
                        <p className="ps-contact-success__body" style={{ marginTop: 12 }}>
                          Nothing opened? Email{" "}
                          <a href={buildMailto()}>{siteConfig.contact.email}</a> directly.
                        </p>
                      </>
                    )}
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

                    <div className="ps-contact-form-fields">

                      <div className="ps-contact-field">
                        <label htmlFor="contact-name" className="ps-contact-field__label">
                          Name
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          autoComplete="name"
                          className={fieldClass("ps-contact-field__input", "name")}
                          {...errorProps("name")}
                        />
                        {errors.name && (
                          <p id="contact-name-error" className="ps-contact-field__error">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="ps-contact-field">
                        <label htmlFor="contact-email" className="ps-contact-field__label">
                          Email
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                          className={fieldClass("ps-contact-field__input", "email")}
                          {...errorProps("email")}
                        />
                        {errors.email && (
                          <p id="contact-email-error" className="ps-contact-field__error">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="ps-contact-field">
                        <label htmlFor="contact-phone" className="ps-contact-field__label">
                          Phone <span className="ps-contact-field__optional">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                          className="ps-contact-field__input"
                        />
                      </div>

                      <div className="ps-contact-field">
                        <label htmlFor="contact-company" className="ps-contact-field__label">
                          Company <span className="ps-contact-field__optional">(optional)</span>
                        </label>
                        <input
                          type="text"
                          id="contact-company"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          autoComplete="organization"
                          className="ps-contact-field__input"
                        />
                      </div>

                      <div className="ps-contact-field ps-contact-field--full">
                        <label htmlFor="contact-need" className="ps-contact-field__label">
                          Area of interest
                        </label>
                        <select
                          id="contact-need"
                          name="need"
                          value={form.need}
                          onChange={handleChange}
                          className={fieldClass(
                            "ps-contact-field__input ps-contact-field__select",
                            "need"
                          )}
                          {...errorProps("need")}
                        >
                          <option value="">Select an area</option>
                          {NEED_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.need && (
                          <p id="contact-need-error" className="ps-contact-field__error">
                            {errors.need}
                          </p>
                        )}
                      </div>

                      <div className="ps-contact-field ps-contact-field--full">
                        <label htmlFor="contact-timeline" className="ps-contact-field__label">
                          Timeline <span className="ps-contact-field__optional">(optional)</span>
                        </label>
                        <select
                          id="contact-timeline"
                          name="timeline"
                          value={form.timeline}
                          onChange={handleChange}
                          className="ps-contact-field__input ps-contact-field__select"
                        >
                          <option value="">No particular timeline</option>
                          {TIMELINE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="ps-contact-field ps-contact-field--full">
                        <label htmlFor="contact-details" className="ps-contact-field__label">
                          What are you trying to solve?
                        </label>
                        <textarea
                          id="contact-details"
                          name="details"
                          value={form.details}
                          onChange={handleChange}
                          placeholder="The problem, in your own words — what's slow, breaking, manual, or costing you. A few sentences is plenty."
                          rows={5}
                          className={fieldClass("ps-contact-field__textarea", "details")}
                          {...errorProps("details")}
                        />
                        {errors.details && (
                          <p id="contact-details-error" className="ps-contact-field__error">
                            {errors.details}
                          </p>
                        )}
                      </div>

                    </div>

                    <div className="ps-contact-form-footer">
                      <button
                        type="submit"
                        className="ps-btn ps-btn-primary ps-contact-submit"
                        disabled={submitting}
                        aria-label={submitting ? "Sending your message" : "Send your message"}
                      >
                        {submitting ? (
                          <>
                            <span className="ps-contact-spinner" aria-hidden="true" />
                            Sending&hellip;
                          </>
                        ) : (
                          <>
                            Send message
                            <svg
                              className="ps-btn-arrow"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M1 8h14M9 2l6 6-6 6"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="ps-contact-form-privacy">
                        No spam. No list.
                      </p>
                    </div>
                  </>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ section — SEO-critical: matched by FAQPage JSON-LD ── */}
      <div className="ps-contact-faq-wrapper">
        <div className="ps-container">
          <div className="ps-contact-faq-inner" ref={faqRef}>
            <div className="ps-contact-faq-heading-block">
              <h2 className="ps-contact-faq__title">Common questions</h2>
              <p className="ps-contact-faq__intro">
                Quick answers to the questions we get most.
              </p>
            </div>
            <div className="ps-contact-faq__list" role="list">
              {contactFaqs.map((q, i) => (
                <details key={i} className="ps-contact-faq__item" role="listitem">
                  <summary className="ps-contact-faq__summary">
                    {q.question}
                  </summary>
                  <p className="ps-contact-faq__answer">
                    {q.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div style={{ height: 80 }} aria-hidden="true" />
    </>
  );
}
