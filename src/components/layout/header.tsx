"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// Sun icon — shown in dark mode (click to switch to light)
function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

// Moon icon — shown in light mode (click to switch to dark)
function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // null = not yet read from DOM (avoids hydration mismatch)
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Read the theme that the anti-flash script already set on <html>
  // Also listen for system preference changes (if user hasn't manually toggled)
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");

    // If no saved preference, follow system changes live
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    function onSystemChange(e: MediaQueryListEvent) {
      const saved = localStorage.getItem("ps-theme");
      if (saved) return; // User manually chose — don't override
      const next = e.matches ? "light" : "dark";
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
    }
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ps-theme", next);
    } catch (_) {}
  }, [theme]);

  return (
    <>
      <header
        className={`ps-header${isScrolled ? " scrolled" : ""}`}
        aria-label="Site header"
      >
        <div className="ps-header-inner">
          {/* Logo */}
          <Link
            href="/"
            className="ps-logo-link"
            onClick={() => {}}
            aria-label="Preisser Solutions — Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ps-logo.webp`}
              alt="Preisser Solutions"
              className="ps-logo-img"
            />
          </Link>

          {/* Desktop nav — minimal Stripe-style: theme toggle + CTA */}
          <nav
            className="ps-primary-nav"
            id="primary-navigation"
            aria-label="Primary navigation"
          >
            <div className="ps-header-links">
              {/* Theme toggle — only render after mount to avoid hydration mismatch */}
              {theme !== null && (
                <button
                  className="ps-theme-toggle"
                  onClick={toggleTheme}
                  aria-label={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  title={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                >
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                </button>
              )}

              <Link
                href="/contact"
                className="ps-header-cta"
                onClick={() => {}}
                aria-label="Get in Touch — start a conversation"
              >
                Get in Touch
                <svg
                  className="ps-header-cta-arrow"
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
              </Link>
            </div>
          </nav>

        </div>
      </header>
    </>
  );
}
