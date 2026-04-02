"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLinkClick = () => setNavOpen(false);

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
    return () => document.body.classList.remove("nav-open");
  }, [navOpen]);

  return (
    <>
      <header
        className={cn("ps-header", isScrolled && "scrolled")}
        aria-label="Site header"
      >
        <div className="ps-header-inner">
          {/* Logo */}
          <Link
            href="/"
            className="ps-logo-text"
            onClick={handleLinkClick}
            aria-label="Preisser Solutions — Home"
          >
            Preisser Solutions
          </Link>

          {/* Desktop nav */}
          <nav
            className="ps-primary-nav"
            id="primary-navigation"
            aria-label="Primary navigation"
          >
            <div className="ps-header-links">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ps-header-link"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ps-header-cta"
                onClick={handleLinkClick}
                aria-label="Tell Us What You Need — start a conversation"
              >
                Tell Us What You Need
                <svg
                  className="ps-header-cta-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </nav>

          {/* Hamburger — mobile */}
          <button
            className="ps-hamburger"
            aria-controls="mobile-navigation"
            aria-expanded={navOpen}
            aria-label={navOpen ? "Close menu" : "Open menu"}
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <span className="ps-sr-only">Menu</span>
            <span className="ps-hamburger-bar" />
            <span className="ps-hamburger-bar" />
            <span className="ps-hamburger-bar" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <nav
        className={cn("ps-mobile-nav", navOpen && "open")}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!navOpen}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="ps-mobile-nav-link"
            onClick={handleLinkClick}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="ps-mobile-nav-cta"
          onClick={handleLinkClick}
        >
          Tell Us What You Need →
        </Link>
      </nav>
    </>
  );
}
