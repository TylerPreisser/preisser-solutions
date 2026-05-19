"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
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

// "What happens next" steps — trust-building process block
const nextSteps = [
  {
    number: "01",
    heading: "Reply within 1 business day",
    body: "Tyler reads every message personally and responds with a clear answer — not a canned sales pitch.",
  },
  {
    number: "02",
    heading: "15-minute discovery call",
    body: "A short call to understand your business, your goals, and what a right-fit engagement looks like for both sides.",
  },
  {
    number: "03",
    heading: "Scoped proposal in 48 hours",
    body: "You get a specific plan, timeline, and price — not a vague estimate that changes after you say yes.",
  },
];

// Proof stats shown in the left trust column
const proofStats = [
  { value: "22+", label: "Kansas businesses served" },
  { value: "95%", label: "back-office time reduction" },
  { value: "5x", label: "organic reach lift in 30 days" },
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
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      // Left column children stagger in
      if (leftColRef.current) {
        const children = Array.from(leftColRef.current.children) as HTMLElement[];
        gsap.fromTo(
          children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // Right column (form card) slides in from right
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 85%",
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
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
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

      {/* ── Dark hero band ────────────────────────────────────── */}
      <div className="ps-contact-hero-band">
        {/* Subtle radial glow behind the heading */}
        <div className="ps-contact-hero-glow" aria-hidden="true" />
        <div className="ps-container ps-contact-hero-inner">
          <span className="ps-eyebrow">Start the conversation</span>
          <h1 className="ps-contact-hero-h1">
            Let&rsquo;s solve something together.
          </h1>
          <p className="ps-contact-hero-subhead">
            Tyler Preisser responds to every inquiry personally. Tell him what
            you&rsquo;re working on — you&rsquo;ll hear back within one business day.
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

      {/* ── Main two-column layout ────────────────────────────── */}
      <div className="ps-contact-body">
        <div className="ps-container">
          <div className="ps-contact-grid">

            {/* ── LEFT: Trust + proof + process ──────────────── */}
            <div className="ps-contact-left" ref={leftColRef}>

              {/* Tyler headshot + intro */}
              <div className="ps-contact-founder">
                <div className="ps-contact-founder-avatar">
                  <Image
                    src="/images/cases/tyler-headshot-nobg.webp"
                    alt="Tyler Preisser, Founder of Preisser Solutions"
                    width={72}
                    height={72}
                    className="ps-contact-founder-img"
                    priority
                  />
                </div>
                <div className="ps-contact-founder-text">
                  <strong className="ps-contact-founder-name">Tyler Preisser</strong>
                  <span className="ps-contact-founder-title">Founder — Preisser Solutions</span>
                </div>
              </div>

              {/* Proof stats row */}
              <div className="ps-contact-stats">
                {proofStats.map((stat) => (
                  <div key={stat.label} className="ps-contact-stat">
                    <span className="ps-contact-stat__value">{stat.value}</span>
                    <span className="ps-contact-stat__label">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="ps-contact-divider" aria-hidden="true" />

              {/* What happens next — 3-step process */}
              <div className="ps-contact-process">
                <h2 className="ps-contact-process__heading">What happens next</h2>
                <ol className="ps-contact-steps" aria-label="Process after submitting your inquiry">
                  {nextSteps.map((step) => (
                    <li key={step.number} className="ps-contact-step">
                      <span className="ps-contact-step__number" aria-hidden="true">{step.number}</span>
                      <div className="ps-contact-step__content">
                        <strong className="ps-contact-step__heading">{step.heading}</strong>
                        <p className="ps-contact-step__body">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

            </div>

            {/* ── RIGHT: Contact form card ────────────────────── */}
            <div className="ps-contact-right" ref={rightColRef}>
              <div className="ps-contact-form-card">
                <div className="ps-contact-form-card__header">
                  <h2 className="ps-contact-form-card__title">Tell Tyler about your project</h2>
                  <p className="ps-contact-form-card__subtitle">
                    Include your current site, your goal, and your city. He&rsquo;ll respond with a real answer.
                  </p>
                </div>

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
                      <h3 className="ps-contact-success__heading">Message on its way.</h3>
                      <p className="ps-contact-success__body">
                        Thanks for reaching out. Tyler will be in touch — typically within one business day.
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
                            Tell Tyler what you need
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
                          aria-label={submitting ? "Sending your message" : "Send your message to Tyler Preisser"}
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
                          No spam, no added to a list. Just a real reply from Tyler.
                        </p>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── FAQ section — SEO-critical: matched by FAQPage JSON-LD ── */}
      <div className="ps-contact-faq-wrapper">
        <div className="ps-container">
          <div className="ps-contact-faq-inner" ref={faqRef}>
            <div className="ps-contact-faq-heading-block">
              <h2 className="ps-contact-faq__title">Common questions</h2>
              <p className="ps-contact-faq__intro">
                Quick answers to the four questions we get most.
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
