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
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={faqSchema(contactFaqs)} />

      {/* ── Hero band — dark, left-aligned editorial ────────────── */}
      <section className="ps-contact2-hero" aria-label="Contact Preisser Solutions">
        <div className="ps-container">
          <div className="ps-contact2-hero-inner" ref={heroRef}>
            <span className="ps-eyebrow">Get in touch</span>

            <h1 className="ps-contact2-h1">Reach out.</h1>

            <p className="ps-contact2-subhead">
              Tell us about your business and what you&rsquo;re looking for. We
              read every message ourselves.
            </p>

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
                    <h3 className="ps-contact-success__heading">Message sent.</h3>
                    <p className="ps-contact-success__body">
                      Thanks for reaching out. We&rsquo;ll review your message and be in touch.
                    </p>
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
                          Your name
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          required
                          autoComplete="name"
                          className="ps-contact-field__input"
                          aria-required="true"
                        />
                      </div>

                      <div className="ps-contact-field">
                        <label htmlFor="contact-email" className="ps-contact-field__label">
                          Business email
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@yourbusiness.com"
                          required
                          autoComplete="email"
                          className="ps-contact-field__input"
                          aria-required="true"
                        />
                      </div>

                      <div className="ps-contact-field ps-contact-field--full">
                        <label htmlFor="contact-message" className="ps-contact-field__label">
                          What do you need?
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="What does your business do? What problem are you trying to solve? What city are you in? (Your current website URL is helpful too.)"
                          required
                          rows={6}
                          className="ps-contact-field__textarea"
                          aria-required="true"
                        />
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
