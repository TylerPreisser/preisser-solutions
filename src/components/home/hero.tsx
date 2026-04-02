"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { heroPainPoints } from "@/data/case-studies";

interface QuoteState {
  el: HTMLParagraphElement;
  text: string;
  timeout: ReturnType<typeof setTimeout> | null;
}

function getRandomPosition(
  containerW: number,
  containerH: number,
  elW: number,
  elH: number,
  headerH: number,
  occupiedZones: Array<{ left: number; top: number; right: number; bottom: number }>,
  centralRect: { top: number; bottom: number; left: number; right: number; valid: boolean }
): { x: number; y: number } | null {
  const edgePadding = 20;
  const effectiveTop = headerH + 20;

  for (let attempt = 0; attempt < 50; attempt++) {
    const maxX = containerW - elW - edgePadding;
    const maxY = containerH - elH - edgePadding;
    const availH = maxY - effectiveTop - edgePadding;
    if (availH <= 0) return null;

    const x = Math.max(edgePadding, Math.min(Math.random() * (maxX - edgePadding) + edgePadding, maxX));
    const y = Math.max(
      effectiveTop + edgePadding,
      Math.min(Math.random() * availH + effectiveTop + edgePadding, maxY)
    );

    const zone = {
      left: x - edgePadding,
      top: y - edgePadding,
      right: x + elW + edgePadding,
      bottom: y + elH + edgePadding,
    };

    // Skip if overlaps central content
    if (centralRect.valid) {
      const overlapsCentral =
        zone.right > centralRect.left &&
        zone.left < centralRect.right &&
        zone.bottom > centralRect.top &&
        zone.top < centralRect.bottom;
      if (overlapsCentral) continue;
    }

    // Skip if overlaps existing quote
    const overlapsExisting = occupiedZones.some(
      (z) => zone.right > z.left && zone.left < z.right && zone.bottom > z.top && zone.top < z.bottom
    );
    if (!overlapsExisting) return { x, y };
  }
  return null;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const activeQuotes = useRef<QuoteState[]>([]);
  const occupiedZones = useRef<Array<{ left: number; top: number; right: number; bottom: number }>>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shuffledRef = useRef<string[]>([]);
  const indexRef = useRef(0);

  // GSAP entrance animation
  useEffect(() => {
    // Only animate if reduced motion is not preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("@/lib/gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        ".ps-hero-eyebrow",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
        .fromTo(
          ".ps-hero h1",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".ps-hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".ps-hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );
    });
  }, []);

  // Floating pain-point quotes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    shuffledRef.current = [...heroPainPoints].sort(() => Math.random() - 0.5);

    const isMobile = window.innerWidth <= 768;
    const maxOnScreen = isMobile ? 1 : 3;
    const minDisplay = 5000;
    const maxDisplay = 8000;
    const fadeTime = 1200;
    const interval = isMobile ? 4000 : 2800;

    function getCentralRect() {
      const content = contentRef.current;
      if (!content || !container) return { top: 0, bottom: 0, left: 0, right: 0, valid: false };
      const heroBgRect = container.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const pad = 40;
      return {
        top: contentRect.top - heroBgRect.top - pad,
        bottom: contentRect.bottom - heroBgRect.top + pad,
        left: contentRect.left - heroBgRect.left - pad,
        right: contentRect.right - heroBgRect.left + pad,
        valid: true,
      };
    }

    function removeQuote(state: QuoteState) {
      state.el.classList.remove("visible");
      setTimeout(() => {
        if (state.el.parentNode) state.el.parentNode.removeChild(state.el);
      }, fadeTime);
      activeQuotes.current = activeQuotes.current.filter((q) => q !== state);
      const x = parseFloat(state.el.style.left);
      const y = parseFloat(state.el.style.top);
      occupiedZones.current = occupiedZones.current.filter(
        (z) => !(Math.abs(z.left - (x - 20)) < 1 && Math.abs(z.top - (y - 20)) < 1)
      );
    }

    function showNextQuote() {
      if (!container) return;
      if (activeQuotes.current.length >= maxOnScreen) return;

      const headerH = 80;
      const containerW = container.offsetWidth;
      const containerH = container.offsetHeight;
      const centralRect = getCentralRect();

      const text = shuffledRef.current[indexRef.current % shuffledRef.current.length];
      indexRef.current++;

      const el = document.createElement("p");
      el.className = "ps-hero-quote";
      el.textContent = `"${text}"`;
      container.appendChild(el);

      const elW = Math.min(el.offsetWidth || 320, 420);
      const elH = el.offsetHeight || 48;

      const pos = getRandomPosition(
        containerW,
        containerH,
        elW,
        elH,
        headerH,
        occupiedZones.current,
        centralRect
      );

      if (!pos) {
        container.removeChild(el);
        return;
      }

      el.style.left = `${pos.x}px`;
      el.style.top = `${pos.y}px`;

      const zone = {
        left: pos.x - 20,
        top: pos.y - 20,
        right: pos.x + elW + 20,
        bottom: pos.y + elH + 20,
      };
      occupiedZones.current.push(zone);

      const state: QuoteState = { el, text, timeout: null };
      activeQuotes.current.push(state);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add("visible");
        });
      });

      const displayTime = minDisplay + Math.random() * (maxDisplay - minDisplay);
      state.timeout = setTimeout(() => removeQuote(state), displayTime);
    }

    intervalRef.current = setInterval(showNextQuote, interval);
    setTimeout(showNextQuote, 600);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      activeQuotes.current.forEach((q) => {
        if (q.timeout) clearTimeout(q.timeout);
        if (q.el.parentNode) q.el.parentNode.removeChild(q.el);
      });
      activeQuotes.current = [];
      occupiedZones.current = [];
    };
  }, []);

  return (
    <section id="hero" className="ps-hero">
      {/* Floating pain-point quotes layer */}
      <div
        className="ps-hero-quotes-container"
        ref={containerRef}
        aria-hidden="true"
      />

      {/* Central content */}
      <div className="ps-hero-content" ref={contentRef}>
        <span className="ps-hero-eyebrow">
          Custom Business Automation
        </span>

        <h1>Your AI Business Experts</h1>

        <p className="ps-hero-subtitle">
          We build custom automation systems that eliminate the headaches, cut the overhead,
          and let your best people focus on what actually grows your business.
        </p>

        <div className="ps-hero-ctas">
          <Link href="/contact" className="ps-btn-primary">
            Start Your Automation Journey
            <span className="ps-btn-arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/why-automation" className="ps-btn-secondary">
            Why Automation?
          </Link>
        </div>
      </div>
    </section>
  );
}
