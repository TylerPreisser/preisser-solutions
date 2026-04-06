"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  // Animated flowing wave mesh — inline canvas, theme-aware
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
    window.addEventListener("resize", resize, { passive: true });

    // Wave definitions — each wave has two sine components for natural, non-repeating motion
    const darkWaves = [
      { baseY: 0.3,  freq: 2.5, amp: 0.08, freq2: 1.2, amp2: 0.03, speed: 0.4,  speed2: -0.2,  color: "rgba(13,149,232,0.15)",  lineColor: "rgba(13,149,232,0.4)",  lineWidth: 1.5 },
      { baseY: 0.45, freq: 1.8, amp: 0.06, freq2: 3.0, amp2: 0.02, speed: -0.3, speed2:  0.5,  color: "rgba(99,91,255,0.12)",   lineColor: "rgba(99,91,255,0.35)",  lineWidth: 1.2 },
      { baseY: 0.6,  freq: 3.2, amp: 0.05, freq2: 1.5, amp2: 0.04, speed: 0.5,  speed2: -0.3,  color: "rgba(128,233,255,0.10)", lineColor: "rgba(128,233,255,0.3)", lineWidth: 1.0 },
      { baseY: 0.72, freq: 2.0, amp: 0.07, freq2: 2.8, amp2: 0.02, speed: -0.4, speed2:  0.35, color: "rgba(0,212,170,0.08)",   lineColor: "rgba(0,212,170,0.25)",  lineWidth: 0.8 },
    ];

    const lightWaves = [
      { baseY: 0.3,  freq: 2.5, amp: 0.08, freq2: 1.2, amp2: 0.03, speed: 0.4,  speed2: -0.2,  color: "rgba(13,149,232,0.06)",  lineColor: "rgba(13,149,232,0.15)",  lineWidth: 1.0 },
      { baseY: 0.45, freq: 1.8, amp: 0.06, freq2: 3.0, amp2: 0.02, speed: -0.3, speed2:  0.5,  color: "rgba(99,91,255,0.05)",   lineColor: "rgba(99,91,255,0.14)",   lineWidth: 0.9 },
      { baseY: 0.6,  freq: 3.2, amp: 0.05, freq2: 1.5, amp2: 0.04, speed: 0.5,  speed2: -0.3,  color: "rgba(128,233,255,0.04)", lineColor: "rgba(128,233,255,0.12)", lineWidth: 0.7 },
      { baseY: 0.72, freq: 2.0, amp: 0.07, freq2: 2.8, amp2: 0.02, speed: -0.4, speed2:  0.35, color: "rgba(0,212,170,0.03)",   lineColor: "rgba(0,212,170,0.10)",   lineWidth: 0.6 },
    ];

    let t = 0;

    // Compute y position of a wave at a given x pixel for the current t
    function waveY(wave: typeof darkWaves[0], x: number): number {
      return (
        h * wave.baseY +
        Math.sin((x / w) * Math.PI * wave.freq + t * wave.speed) * h * wave.amp +
        Math.sin((x / w) * Math.PI * wave.freq2 + t * wave.speed2) * h * wave.amp2
      );
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const waves = isLight ? lightWaves : darkWaves;
      const baseFill = isLight ? "#F6F9FC" : "#0A1628";

      // Base fill
      ctx.fillStyle = baseFill;
      ctx.fillRect(0, 0, w, h);

      // Draw each wave: gradient fill area + luminous stroke line
      for (const wave of waves) {
        // Build the wave path
        ctx.beginPath();
        ctx.moveTo(0, waveY(wave, 0));
        for (let x = 2; x <= w; x += 2) {
          ctx.lineTo(x, waveY(wave, x));
        }

        // Close path to bottom for gradient fill
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        // Vertical gradient — color pools near the wave peak, fades above and below
        const peakPixel = h * wave.baseY;
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        const topStop = Math.max(0, (peakPixel / h) - 0.15);
        const midStop  = Math.min(1, peakPixel / h);
        const botStop  = Math.min(1, (peakPixel / h) + 0.2);
        grad.addColorStop(0,        "transparent");
        grad.addColorStop(topStop,  "transparent");
        grad.addColorStop(midStop,  wave.color);
        grad.addColorStop(botStop,  "transparent");
        ctx.fillStyle = grad;
        ctx.fill();

        // Redraw just the wave line as a glowing stroke
        ctx.beginPath();
        ctx.moveTo(0, waveY(wave, 0));
        for (let x = 2; x <= w; x += 2) {
          ctx.lineTo(x, waveY(wave, x));
        }
        ctx.strokeStyle = wave.lineColor;
        ctx.lineWidth = wave.lineWidth;
        ctx.stroke();
      }

      // Vignette — pulls edges darker to frame the content
      const vignetteColor = isLight
        ? "rgba(230,238,248,0.35)"
        : "rgba(10,22,40,0.45)";
      const vign = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.85);
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
      t += 0.008;
      draw();
      animId = requestAnimationFrame(loop);
    }

    // Watch for theme changes on <html> and update canvas live
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

    const targets = [eyebrowRef, headlineRef, subtitleRef, ctasRef];

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
          World-Class Technology.
          <br />
          Built in Kansas.
        </h1>

        <p ref={subtitleRef} className="ps-hero-subtitle">
          Custom software, automation, and business intelligence that runs
          while you sleep &mdash; built from scratch for businesses that are
          tired of throwing people at problems people can&apos;t solve.
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
        </div>
      </div>
    </section>
  );
}
