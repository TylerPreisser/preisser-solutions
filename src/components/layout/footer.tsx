"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";

/** Minimum plausible human fill time, measured from FIRST INTERACTION. */
const MIN_FILL_MS = 3000;

// Deliberately permissive on the client: this exists to catch a typo before a
// round trip, not to be the trust boundary. functions/api/subscribe.ts applies
// the strict grammar, and it is the one that decides.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // A blocking problem, field-level or otherwise. Never silent: if a submit does
  // not proceed, this says why.
  const [error, setError] = useState<string | null>(null);
  // Honeypot — bots fill this, humans never see it
  const [honeypot, setHoneypot] = useState("");
  // Set once the too-fast gate has warned the visitor, so a second deliberate
  // press goes through. A bot that fires and leaves never gets here.
  const [confirmed, setConfirmed] = useState(false);
  // When the visitor FIRST touched the field — not when the footer rendered.
  // The old version measured from mount, which silently discarded anyone who
  // jumped straight to the footer and typed quickly.
  const firstInteraction = useRef<number | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  /* THE PAINT-TO-HYDRATION DEAD ZONE.

     The field is painted from the static export long before React attaches its
     handlers — measured on this build, input visible at 103ms and handlers
     attached at 345ms, a 242ms window (2577ms when the JS is held back to
     simulate a slow connection, which is how it was reproduced). Everything
     the visitor does inside that window happens to the DOM and is invisible to
     React, and BOTH of this component's records of the interaction were lost:

       * `email` state stayed "", while the typed address sat in the DOM in
         plain sight. Measured: typed "deadzone@example.com" pre-hydration, and
         pressing Subscribe returned "Please enter your email address." and
         WIPED the field, because the controlled input re-rendered from empty
         state. A valid signup, lost, with the visitor told they had left it
         blank.
       * `firstInteraction` stayed null, because it is only ever set from the
         React onFocus/onChange that never ran. The next keystroke after
         hydration then started the clock late and tripped the too-fast gate at
         :64-73 — "That was quick." with their address on screen.

     Fixed by reading the evidence that is already in the DOM at hydration
     rather than by waiting for an event that has already been missed. This is
     the "capture it outside React's lifecycle" option: the effect runs in the
     same commit that attaches the handlers, so there is no window it can miss.

     The clock is anchored to first-contentful-paint, NOT to `Date.now()`.
     Anchoring to now would restart the 3s at hydration and re-create the same
     false rejection one tick later. FCP is the earliest instant the visitor
     could physically have seen the field, so it can never be later than the
     real interaction and therefore can never reject someone falsely — while
     still requiring a full MIN_FILL_MS to elapse from the moment the page was
     first painted. The anti-spam property is kept, not weakened: a script that
     loads, fills and submits still has to wait out 3 real seconds, and the
     confirm-once-more path is untouched. */
  useEffect(() => {
    const input = emailRef.current;
    if (!input) return;

    const typedBeforeHydration = input.value !== "";
    const focusedBeforeHydration = document.activeElement === input;
    if (!typedBeforeHydration && !focusedBeforeHydration) return;

    // Adopt what they already typed so the controlled input stops discarding it.
    if (typedBeforeHydration) setEmail(input.value);

    if (firstInteraction.current === null) {
      const paint = performance
        .getEntriesByType("paint")
        .find((entry) => entry.name === "first-contentful-paint");
      firstInteraction.current = performance.timeOrigin + (paint ? paint.startTime : 0);
    }
    // Mount only, and deliberately so: this is about the one window that
    // closes the instant React attaches. Nothing here reads reactive state —
    // only the DOM, two refs and the stable setEmail — so the empty dep array
    // is complete rather than suppressed.
  }, []);

  /* SC 4.1.3 — the success message is a status, and it must be spoken.

     It used to render as a plain <p>: the form it replaced was removed from
     the DOM, focus fell to <body>, and a screen-reader user got no
     notification at all that anything had happened. The error path next to it
     already does this correctly with role="alert"; this is the polite
     counterpart of that same idiom, not a second mechanism.

     Focus is moved deliberately as well as announced. The success message
     REPLACES the form, so the element the visitor was standing on is gone —
     leaving focus to fall to <body> restarts a keyboard user at the top of the
     document. tabIndex={-1} makes the confirmation programmatically focusable
     without adding it to the tab order. */
  useEffect(() => {
    if (subscribed) successRef.current?.focus();
  }, [subscribed]);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();

    // Gate 0: double-click / double-submit. The button is also disabled while
    // in flight; this covers the Enter key and any race that beats the re-render.
    if (submitting) return;

    const address = email.trim();

    // Empty submit. The input carries `required`, but the client is not the
    // trust boundary and a missing value must never look like a success.
    if (!address) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(address)) {
      setError("That doesn't look like a valid email address.");
      return;
    }

    // Spam gate 1: honeypot filled. The field is off-screen, aria-hidden and
    // tabIndex={-1}, so a human effectively cannot trip this — but if one
    // somehow does, they get a real route to us instead of a lie. The address
    // is still not transmitted, so the gate keeps its teeth.
    if (honeypot) {
      setError(
        `We couldn't sign you up. Please email ${siteConfig.contact.email} directly and we'll add you.`
      );
      return;
    }

    // Spam gate 2: submitted implausibly fast, measured from first interaction.
    // This CONFIRMS rather than discards. A scripted submit fires once and
    // leaves, so it never gets past this; a human reads one line and presses
    // again. Either way nobody is told they subscribed when they did not.
    const startedAt = firstInteraction.current;
    if ((startedAt === null || Date.now() - startedAt < MIN_FILL_MS) && !confirmed) {
      setConfirmed(true);
      setError("That was quick — press Subscribe once more to confirm you're human.");
      return;
    }

    setError(null);
    setSubmitting(true);

    // POST to our own Cloudflare Pages Function, which emails the address to
    // the owner via Resend. This replaces a `mailto:` hand-off that asked the
    // VISITOR's mail client to draft the message and then rendered "Thanks for
    // subscribing." unconditionally on the next line — so on any machine with
    // no registered mail handler the address was lost and the visitor was told
    // it had worked.
    //
    // There is deliberately no mailto fallback here. On the contact form the
    // fallback is worth it because a long, hand-written enquiry is expensive to
    // lose. One address is not, and a `mailto:` hand-off is precisely the
    // unverifiable path this fix exists to remove. On failure we say so and
    // keep the address in the box so it is not lost.
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: address, website: honeypot }),
      });

      // Read the server's own message where it has one, so a 400 explains
      // itself instead of surfacing as a generic failure.
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      // The ONLY path that sets subscribed. A non-ok status, a body that does
      // not confirm `ok`, or a thrown request all fall through to the error
      // branch — success is never assumed.
      if (!response.ok || !result?.ok) {
        setError(
          result?.error ||
            `We couldn't sign you up just now. Please email ${siteConfig.contact.email} and we'll add you.`
        );
        return;
      }

      setSubscribed(true);
    } catch {
      setError(
        `We couldn't reach the server. Please email ${siteConfig.contact.email} and we'll add you.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer id="footer" className="ps-footer" aria-label="Site footer">
      <div className="ps-container">
        <div className="ps-footer-main">
          {/* Left: logo + tagline + visible NAP (Name, Address, Phone) */}
          <div className="ps-footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ps-logo.webp`}
              alt="Preisser Solutions"
              className="ps-footer-logo-img"
              width={336}
              height={336}
              loading="lazy"
            />
            {/* The brand line under the mark. Split on the sentence boundary so
                "AI Integration." can carry the accent — the same colour device
                the hero uses. The full string stays intact for screen readers. */}
            <p className="ps-footer-tagline">
              {siteConfig.tagline
                .split(".")
                .map((part) => part.trim())
                .filter(Boolean)
                .map((part, i, all) => (
                  <span
                    key={part}
                    className={
                      "ps-footer-tagline-line" +
                      (i === all.length - 1 ? " ps-footer-tagline-line--accent" : "")
                    }
                  >
                    {part}.{i < all.length - 1 ? " " : ""}
                  </span>
                ))}
            </p>
            {/* Visible NAP — required for local SEO consistency and citation matching. */}
            <address className="ps-footer-nap" style={{ fontStyle: "normal" }}>
              <span className="ps-footer-location">
                {siteConfig.contact.location}
              </span>
              <br />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="ps-footer-contact-link"
                aria-label={`Email Preisser Solutions at ${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
            </address>
          </div>

          {/* Right: email signup */}
          <div className="ps-footer-signup">
            <h3 className="ps-footer-signup-heading">Stay up to date</h3>
            {subscribed ? (
              <p
                ref={successRef}
                className="ps-footer-signup-success"
                /* Polite sibling of the error path's role="alert" — see the
                   effect above. tabIndex={-1} is for the focus move only and
                   keeps this out of the tab order. */
                role="status"
                tabIndex={-1}
              >
                Thanks for subscribing.
              </p>
            ) : (
              <form
                className="ps-footer-signup-form"
                onSubmit={handleSubscribe}
                noValidate
              >
                {/* Honeypot — visually hidden, only bots fill this */}
                <div
                  style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
                  aria-hidden="true"
                >
                  <label htmlFor="footer-website">Website</label>
                  <input
                    type="text"
                    id="footer-website"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                {/* SC 3.3.2 / 1.4.3 / 2.5.3 — a REAL, VISIBLE label.

                    The placeholder was the only thing naming this field, and a
                    placeholder is not a label: it disappears the moment the
                    visitor starts typing, taking the field's only description
                    with it, and it sampled 3.12:1 dark / 2.54:1 light against
                    real pixels while it was there. (`aria-label` named it for
                    screen readers, so this was never a "no accessible name"
                    bug — it was a bug for everyone LOOKING at it, which is why
                    a visually-hidden label would have fixed the audit line
                    without fixing the page.)

                    Visible rather than sr-only on purpose. The h3 above says
                    "Stay up to date", which is the offer, not the field — with
                    the placeholder gone mid-type nothing on screen said what
                    to put in the box. `flex-basis:100%` puts it on its own row
                    above the input+button pair; the form is
                    `display:flex; flex-wrap:wrap`.

                    Unlike the error <p> below, this is a CLASS rather than an
                    inline style: the colour has to differ per theme and an
                    inline style cannot express that. See
                    .ps-footer-signup-label in globals.css.

                    The input's `aria-label` is deliberately GONE: the <label>
                    now supplies the accessible name, so the visible text and
                    the spoken name are the same string — which is what 2.5.3
                    asks for and what an aria-label silently overriding a
                    visible label would have broken. */}
                <label htmlFor="footer-email" className="ps-footer-signup-label">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  id="footer-email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    if (firstInteraction.current === null) {
                      firstInteraction.current = Date.now();
                    }
                    setEmail(e.target.value);
                    // Clear a stale complaint as soon as they start fixing it —
                    // it re-appears on the next submit if still invalid.
                    if (error) setError(null);
                  }}
                  onFocus={() => {
                    if (firstInteraction.current === null) {
                      firstInteraction.current = Date.now();
                    }
                  }}
                  className="ps-footer-signup-input"
                  required
                  maxLength={320}
                  autoComplete="email"
                  disabled={submitting}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "footer-signup-error" : undefined}
                />
                <button
                  type="submit"
                  className="ps-footer-signup-btn"
                  aria-label="Subscribe to newsletter"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? "Subscribing…" : "Subscribe"}
                </button>
                {/* The failure path. `role="alert"` so it is announced, and it
                    carries a real route to us so the address is never lost
                    just because the endpoint had a bad moment.
                    Styled inline rather than in globals.css: this component
                    already sets flexWrap inline for the same reason (another
                    agent owns that stylesheet), and .ps-footer-signup-form is
                    `display:flex; flex-wrap:wrap`, so `flexBasis: "100%"` puts
                    this on its own row under the input and button. */}
                {error && (
                  <p
                    id="footer-signup-error"
                    role="alert"
                    style={{
                      flexBasis: "100%",
                      margin: 0,
                      // Matches .ps-contact-field__error (globals.css:5107) so the
                      // two forms report failure identically.
                      //
                      // BOTH THEMES NOW CLEAR AA (0.875rem/400 is normal text, so
                      // the bar is 4.5:1):
                      //   light 4.59:1 — #DF1B41 on the light footer's #F8FAFC
                      //   dark  6.62:1 — #FF6B81 on --color-dark #0A1628
                      // Ratios computed from the RESOLVED token values against the
                      // footer background each one actually paints on
                      // (globals.css:81, :68, .ps-footer:4233, light footer:4483);
                      // every colour in that pair is opaque, so the computed value
                      // is the composited value. Do not re-state these from a
                      // declared colour alone — where a half-transparent colour is
                      // involved the declared value computes to a meaningless
                      // 1.00:1 and has to be read off rendered pixels instead (see
                      // the placeholder note at globals.css:4336).
                      //
                      // The earlier note here recorded ~3.6:1 on dark and said the
                      // themed override was still owed. That override has SHIPPED:
                      // `[data-theme="dark"] #footer-signup-error` scopes
                      // `--color-danger: #FF6B81` at globals.css:7613. It overrides
                      // the CUSTOM PROPERTY, not `color`, which is why the inline
                      // `color` below still wins the cascade and no `!important` is
                      // needed — so changing this to a literal colour would
                      // silently break the dark theme back to 3.77:1.
                      fontSize: "0.875rem",
                      lineHeight: 1.45,
                      color: "var(--color-danger)",
                    }}
                  >
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <hr className="ps-footer-divider" />

        <div className="ps-footer-bottom">
          <p className="ps-footer-copy">
            &copy; {year} {siteConfig.name}. All Rights Reserved.
          </p>
          {/* Footer link row.
              - aria-label was "Legal links", which was already wrong (Products
                is not a legal page) and is more wrong now that Locations is
                here.
              - /locations added 2026-09-03. The homepage used to spray 77
                /locations/* links from its "Everything we do, one tap away"
                cluster; that cluster is gone. This one global link puts the
                /locations hub — which itself links all 77 city pages — at
                depth 2 from EVERY page instead of depth 1 from one page.
                Whether that trades well is answerable only by Search Console
                impressions for /locations/* over the next 4-8 weeks; it is not
                knowable today, and nothing here should be read as claiming it.
              - flexWrap is inline rather than in globals.css because another
                agent owns that file today. .ps-footer-legal is `display:flex`
                with NO wrap (globals.css:5037): a row wider than the measure
                does not move an item to a second line, it shrinks the items and
                breaks their text. With Locations the row is 339px, which
                overflowed a 320px viewport and clipped "Site Map" off the right
                edge. `gap: 6px` already supplies the row gap.
              - Each separator is bound to the link that FOLLOWS it inside a
                nowrap span, so a wrap can never strand a lone "·" at the end of
                a line. Measured: 1 row at 390/414, 2 clean rows at 320/360/375,
                every link 44px tall at all five. */}
          <div
            className="ps-footer-legal"
            aria-label="Footer links"
            style={{ flexWrap: "wrap" }}
          >
            <a href="/products">Products</a>
            {[
              { href: "/locations", label: "Locations" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/site-map", label: "Site Map" },
            ].map((link) => (
              <span
                key={link.href}
                style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span aria-hidden="true">&middot;</span>
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </div>
          <div className="ps-footer-social" aria-label="Social links">
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Preisser Solutions on LinkedIn"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
