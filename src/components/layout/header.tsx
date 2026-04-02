"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
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

  // Last nav link is the CTA pill
  const navLinks = navigation.links.slice(0, -1);
  const ctaLink = navigation.links[navigation.links.length - 1];

  return (
    <header
      className={cn("ps-header", isScrolled && "scrolled", navOpen && "nav-open")}
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
            width={200}
            height={40}
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
                id={link.id}
                className="ps-header-link"
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctaLink.href}
              id={ctaLink.id}
              className="ps-header-cta"
              onClick={handleLinkClick}
            >
              {ctaLink.label}
            </Link>
          </div>
        </nav>

        {/* Hamburger (mobile only) */}
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
  );
}
