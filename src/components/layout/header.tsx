"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Why Automation?", href: "/why-automation" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/roi-calculator" },
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
            className="logo-link"
            onClick={handleLinkClick}
            aria-label="Preisser Solutions — Home"
          >
            <Image
              src="/images/LOGO.png"
              alt="Preisser Solutions"
              width={180}
              height={36}
              className="ps-logo"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="ps-primary-nav"
            id="primary-navigation"
            aria-label="Primary navigation"
          >
            <div className="ps-header-buttons">
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
                className="ps-header-link"
                onClick={handleLinkClick}
              >
                Contact sales
              </Link>
              <Link
                href="/contact"
                className="ps-header-cta"
                onClick={handleLinkClick}
              >
                Start now
              </Link>
            </div>
          </nav>

          {/* Hamburger — mobile */}
          <button
            className="ps-hamburger"
            aria-controls="primary-navigation"
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
        id="primary-navigation"
        aria-label="Mobile navigation"
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
          className="ps-mobile-nav-link"
          onClick={handleLinkClick}
        >
          Contact sales
        </Link>
        <Link
          href="/contact"
          className="ps-mobile-nav-cta"
          onClick={handleLinkClick}
        >
          Start now
        </Link>
      </nav>
    </>
  );
}
