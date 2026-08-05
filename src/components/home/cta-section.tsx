"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site-config";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormState = { name: "", email: "", message: "" };

export function CtaSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  // Inline enquiry form — the same mailto-based flow the /contact page uses.
  // This is a static export, so there is no server of ours to post to: the
  // message goes straight from the visitor's mail client to the inbox, with
  // nothing in between to queue, expire, or misconfigure.
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Honeypot — bots fill this, humans never see it.
  const [honeypot, setHoneypot] = useState("");
  const loadTime = useRef(Date.now());

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!contentRef.current) return;

    const children = Array.from(contentRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      children.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!contentRef.current) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** The enquiry, addressed and pre-written, ready for the visitor to send. */
  const buildMailto = () =>
    `mailto:${siteConfig.contact.email}` +
    `?subject=${encodeURIComponent(
      `Website enquiry from ${form.name || "a visitor"}`
    )}` +
    `&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}\n\n` +
        `— sent from preissersolutions.com`
    )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam gate 1: honeypot filled — silent discard.
    if (honeypot) {
      setSubmitted(true);
      return;
    }
    // Spam gate 2: submitted in under 3s — bot behaviour.
    if (Date.now() - loadTime.current < 3000) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    window.location.href = buildMailto();
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section
      className="ps-cta-section"
      id="cta"
      aria-labelledby="cta-heading"
    >
      {/* Radial glow */}
      <div className="ps-cta-glow" aria-hidden="true" />

      <div className="ps-cta-content" ref={contentRef}>
        <div className="ps-eyebrow">Get in touch</div>
        <h2 id="cta-heading" className="ps-cta-heading">
          Tell us what&apos;s slowing your business down.
        </h2>
        <p className="ps-cta-body">
          Bring the one workflow that costs your team the most time. You&apos;ll get a
          straight answer on what it takes to fix it &mdash; scope, cost, and timeline
          &mdash; from the person who would actually build it.
        </p>

        {/* Inline enquiry form */}
        <div className="ps-cta-form">
          {submitted ? (
            <div className="ps-cta-form-success" role="alert" aria-live="polite">
              <div className="ps-cta-form-success__check" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 16.5l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="ps-cta-form-success__heading">Ready to send.</h3>
              <p className="ps-cta-form-success__body">
                Your email app should have opened with the message already written.
                Hit send and it comes straight to us &mdash; we read every one ourselves.
              </p>
              <p className="ps-cta-form-success__body" style={{ marginTop: 10 }}>
                Nothing opened? Email{" "}
                <a href={buildMailto()}>{siteConfig.contact.email}</a> directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Get in touch">
              {/* Honeypot — visually hidden, only bots fill this */}
              <div
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
                aria-hidden="true"
              >
                <label htmlFor="cta-website">Website</label>
                <input
                  type="text"
                  id="cta-website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="ps-contact-form-fields">
                <div className="ps-contact-field">
                  <label htmlFor="cta-name" className="ps-contact-field__label">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="cta-name"
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
                  <label htmlFor="cta-email" className="ps-contact-field__label">
                    Business email
                  </label>
                  <input
                    type="email"
                    id="cta-email"
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
                  <label htmlFor="cta-message" className="ps-contact-field__label">
                    What&apos;s slowing you down?
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="The one workflow that costs your team the most time — plus your city and current website, if you have one."
                    required
                    rows={5}
                    className="ps-contact-field__textarea"
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="ps-cta-form-footer">
                <button
                  type="submit"
                  className="ps-btn ps-btn-primary-dark ps-cta-form-submit"
                  disabled={submitting}
                  aria-label={submitting ? "Sending your message" : "Send your message"}
                >
                  {submitting ? "Sending…" : "Send message"}
                  {!submitting && (
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
                  )}
                </button>
                <p className="ps-cta-form-note">
                  No spam. No list. Goes straight to Tyler.
                </p>
              </div>
            </form>
          )}
        </div>

        <a
          href="https://tylerpreisser.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ps-cta-portfolio-link"
        >
          More of our founder&apos;s projects &rarr;
        </a>
      </div>
    </section>
  );
}
