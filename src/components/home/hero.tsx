"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Animated gradient blobs — inline canvas, theme-aware
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;z-index:0;";
    canvas.setAttribute("aria-hidden", "true");
    container.prepend(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let animId = 0;
    let paused = false;

    // Track the current theme so draw() always uses live value
    let isLight = document.documentElement.getAttribute("data-theme") === "light";

    function resize() {
      const rect = container!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Blob definitions — two sets: dark (vivid) and light (soft, reduced opacity)
    const darkBlobs = [
      { x: 0.15, y: 0.25, r: 0.55, color: "rgba(13,149,232,0.30)", sx: 0.6, sy: 0.4, px: 0, py: 0 },
      { x: 0.8, y: 0.15, r: 0.5, color: "rgba(99,91,255,0.25)", sx: 0.5, sy: 0.7, px: 1.5, py: 0.8 },
      { x: 0.5, y: 0.65, r: 0.6, color: "rgba(128,233,255,0.20)", sx: 0.4, sy: 0.5, px: 3, py: 2 },
      { x: 0.85, y: 0.7, r: 0.45, color: "rgba(0,212,170,0.18)", sx: 0.7, sy: 0.6, px: 4.5, py: 1.2 },
      { x: 0.1, y: 0.75, r: 0.4, color: "rgba(13,149,232,0.15)", sx: 0.55, sy: 0.45, px: 2.5, py: 3.5 },
      { x: 0.5, y: 0.3, r: 0.35, color: "rgba(99,91,255,0.12)", sx: 0.8, sy: 0.3, px: 5, py: 4 },
    ];

    const lightBlobs = [
      { x: 0.15, y: 0.25, r: 0.55, color: "rgba(13,149,232,0.12)", sx: 0.6, sy: 0.4, px: 0, py: 0 },
      { x: 0.8, y: 0.15, r: 0.5, color: "rgba(99,91,255,0.08)", sx: 0.5, sy: 0.7, px: 1.5, py: 0.8 },
      { x: 0.5, y: 0.65, r: 0.6, color: "rgba(128,233,255,0.10)", sx: 0.4, sy: 0.5, px: 3, py: 2 },
      { x: 0.85, y: 0.7, r: 0.45, color: "rgba(0,212,170,0.07)", sx: 0.7, sy: 0.6, px: 4.5, py: 1.2 },
      { x: 0.1, y: 0.75, r: 0.4, color: "rgba(13,149,232,0.06)", sx: 0.55, sy: 0.45, px: 2.5, py: 3.5 },
      { x: 0.5, y: 0.3, r: 0.35, color: "rgba(99,91,255,0.05)", sx: 0.8, sy: 0.3, px: 5, py: 4 },
    ];

    let t = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const blobs = isLight ? lightBlobs : darkBlobs;
      const baseFill = isLight ? "#F6F9FC" : "#0A1628";
      const vignetteColor = isLight
        ? "rgba(230,238,248,0.4)"
        : "rgba(10,22,40,0.5)";

      // Base fill
      ctx.fillStyle = baseFill;
      ctx.fillRect(0, 0, w, h);

      // Draw each blob
      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.sx + b.px) * 0.2) * w;
        const cy = (b.y + Math.cos(t * b.sy + b.py) * 0.15) * h;
        const radius = b.r * Math.max(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(0.6, b.color.replace(/[\d.]+\)$/, "0.02)"));
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Soft secondary pass
      ctx.globalCompositeOperation = isLight ? "multiply" : "screen";
      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.sx * 0.7 + b.px + 1) * 0.12) * w;
        const cy = (b.y + Math.cos(t * b.sy * 0.7 + b.py + 1) * 0.09) * h;
        const radius = b.r * 1.2 * Math.max(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, b.color.replace(/[\d.]+\)$/, isLight ? "0.03)" : "0.06)"));
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";

      // Vignette
      const vign = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
      vign.addColorStop(0, "transparent");
      vign.addColorStop(1, vignetteColor);
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, w, h);
    }

    function loop() {
      if (paused) {
        animId = requestAnimationFrame(loop);
        return;
      }
      t += 0.012;
      draw();
      animId = requestAnimationFrame(loop);
    }

    // Watch for theme changes on <html> and update canvas base color live
    const themeObserver = new MutationObserver(() => {
      isLight = document.documentElement.getAttribute("data-theme") === "light";
      if (prefersReduced) {
        draw();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    if (prefersReduced) {
      t = 1;
      draw();
    } else {
      // Intersection observer — pause when off screen
      const io = new IntersectionObserver(
        ([entry]) => {
          paused = !entry.isIntersecting;
        },
        { threshold: 0 }
      );
      io.observe(container);

      loop();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
        io.disconnect();
        themeObserver.disconnect();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  // GSAP entrance timeline
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = [eyebrowRef, headlineRef, subtitleRef, ctasRef, scrollRef];

    if (prefersReduced) {
      targets.forEach((r) => {
        if (r.current) {
          r.current.style.opacity = "1";
          r.current.style.transform = "none";
        }
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          headlineRef.current,
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          ctasRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.35"
        )
        .to(
          scrollRef.current,
          { opacity: 1, duration: 0.5, ease: "power1.out" },
          "-=0.1"
        );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="ps-hero"
      aria-label="Hero"
    >
      {/* Overlay for text readability */}
      <div className="ps-hero-overlay" aria-hidden="true" />

      {/* Hero content */}
      <div className="ps-hero-content">
        <div ref={eyebrowRef} className="ps-hero-eyebrow">
          <span className="ps-hero-dot" aria-hidden="true" />
          AI-First Builders
        </div>

        <h1 ref={headlineRef} className="ps-hero-headline">
          We Build What Your Business Needs.
        </h1>

        <p ref={subtitleRef} className="ps-hero-subtitle">
          Websites. Applications. Automations. Dashboards. Integrations.
          Whatever technology problem you&apos;ve got &mdash; Preisser Solutions builds
          the solution. From scratch. For you.
        </p>

        <div ref={ctasRef} className="ps-hero-ctas">
          <Link href="/contact" className="ps-btn ps-btn-primary-dark">
            Get in Touch
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
          </Link>
          <Link href="/#services" className="ps-btn ps-btn-secondary">
            See What We Build
          </Link>
        </div>
      </div>

      {/* Scroll indicator removed */}
      <div ref={scrollRef} style={{ display: "none" }}>
      </div>
    </section>
  );
}
