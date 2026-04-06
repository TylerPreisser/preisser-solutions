"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Mailto fallback: sends a notification email to sales with the subscriber address
    window.location.href = `mailto:sales@preissersolutions.com?subject=New%20Newsletter%20Subscriber&body=New%20subscriber%3A%20${encodeURIComponent(email)}`;
    setSubscribed(true);
  }

  return (
    <footer id="footer" className="ps-footer" aria-label="Site footer">
      <div className="ps-container">
        <div className="ps-footer-main">
          {/* Left: logo + tagline + location */}
          <div className="ps-footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ps-logo.webp`}
              alt="Preisser Solutions"
              className="ps-footer-logo-img"
            />
            <p className="ps-footer-tagline">
              We Build What Your Business Needs.
            </p>
            <p className="ps-footer-location">
              {siteConfig.contact.location}
            </p>
          </div>

          {/* Right: email signup */}
          <div className="ps-footer-signup">
            <h3 className="ps-footer-signup-heading">Stay up to date</h3>
            {subscribed ? (
              <p className="ps-footer-signup-success">
                Thanks for subscribing.
              </p>
            ) : (
              <form
                className="ps-footer-signup-form"
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ps-footer-signup-input"
                  required
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="ps-footer-signup-btn"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <hr className="ps-footer-divider" />

        <div className="ps-footer-bottom">
          <p className="ps-footer-copy">
            &copy; {year} {siteConfig.name}. All Rights Reserved.
          </p>
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
