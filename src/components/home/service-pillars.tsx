"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface ServicePillar {
  title: string;
  description: string;
  colors: [string, string, string];
  href: string;
  animationType: "nodes" | "gears" | "wires" | "bars" | "pulses";
}

const services: ServicePillar[] = [
  {
    title: "Websites & Applications",
    description:
      "Professional sites, custom apps, client portals, e-commerce — built from scratch, built to perform.",
    colors: ["#0D95E8", "#635BFF", "#80E9FF"],
    animationType: "nodes",
    href: "/services",
  },
  {
    title: "Automation Systems",
    description:
      "AI-powered engines that handle your repetitive work — invoicing, outreach, document processing, you name it.",
    colors: ["#635BFF", "#a855f7", "#c084fc"],
    animationType: "gears",
    href: "/services",
  },
  {
    title: "System Fixes & Efficiency",
    description:
      "Something's slow, broken, or redundant? We find it and fix it with better tech.",
    colors: ["#00D4AA", "#0D95E8", "#34d399"],
    animationType: "wires",
    href: "/services",
  },
  {
    title: "Dashboards & Business Intelligence",
    description:
      "See your business clearly. Real-time data, live reporting, actionable insight.",
    colors: ["#F59E0B", "#EF4444", "#fbbf24"],
    animationType: "bars",
    href: "/services",
  },
  {
    title: "Marketing & Growth Engines",
    description:
      "Automated content, email, SMS, SEO — lead generation systems that run without you.",
    colors: ["#EF4444", "#635BFF", "#f87171"],
    animationType: "pulses",
    href: "/services",
  },
];

// Each animation draws onto its own canvas
function animateNodes(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  colors: string[]
) {
  // Floating connected nodes — represents interconnected systems
  const nodeCount = 12;
  ctx.clearRect(0, 0, w, h);

  const nodes: { x: number; y: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 + t * 0.3;
    const rx = w * 0.3 + Math.sin(t * 0.5 + i * 0.8) * w * 0.12;
    const ry = h * 0.3 + Math.cos(t * 0.4 + i * 1.1) * h * 0.1;
    nodes.push({
      x: w / 2 + Math.cos(angle) * rx,
      y: h / 2 + Math.sin(angle) * ry,
    });
  }

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < w * 0.4) {
        const alpha = (1 - dist / (w * 0.4)) * 0.3;
        ctx.strokeStyle = `${colors[0]}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  for (let i = 0; i < nodes.length; i++) {
    const pulse = 1 + Math.sin(t * 2 + i) * 0.3;
    const r = 4 * pulse;
    const grd = ctx.createRadialGradient(
      nodes[i].x, nodes[i].y, 0,
      nodes[i].x, nodes[i].y, r * 3
    );
    grd.addColorStop(0, colors[i % 3]);
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(nodes[i].x, nodes[i].y, r * 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = colors[i % 3];
    ctx.beginPath();
    ctx.arc(nodes[i].x, nodes[i].y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animateGears(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  colors: string[]
) {
  // Interlocking circles rotating — represents automation
  ctx.clearRect(0, 0, w, h);

  const gears = [
    { x: w * 0.35, y: h * 0.4, r: w * 0.18, speed: 1, teeth: 8 },
    { x: w * 0.65, y: h * 0.45, r: w * 0.14, speed: -1.3, teeth: 6 },
    { x: w * 0.5, y: h * 0.7, r: w * 0.1, speed: 1.8, teeth: 5 },
  ];

  gears.forEach((gear, gi) => {
    const angle = t * gear.speed * 0.5;
    ctx.save();
    ctx.translate(gear.x, gear.y);
    ctx.rotate(angle);

    // Outer ring
    ctx.strokeStyle = `${colors[gi]}60`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, gear.r, 0, Math.PI * 2);
    ctx.stroke();

    // Teeth
    for (let i = 0; i < gear.teeth; i++) {
      const a = (i / gear.teeth) * Math.PI * 2;
      const x1 = Math.cos(a) * gear.r;
      const y1 = Math.sin(a) * gear.r;
      const x2 = Math.cos(a) * (gear.r + 8);
      const y2 = Math.sin(a) * (gear.r + 8);
      ctx.strokeStyle = `${colors[gi]}80`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Inner glow
    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, gear.r);
    grd.addColorStop(0, `${colors[gi]}18`);
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(0, 0, gear.r, 0, Math.PI * 2);
    ctx.fill();

    // Center dot
    ctx.fillStyle = colors[gi];
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
}

function animateWires(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  colors: string[]
) {
  // Flowing data lines — represents system connections
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < 8; i++) {
    const y = (h / 9) * (i + 1);
    const offset = t * 60 + i * 40;

    ctx.strokeStyle = `${colors[i % 3]}30`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y);

    for (let x = 0; x < w; x += 4) {
      const wave = Math.sin((x + offset) * 0.02 + i) * 8;
      ctx.lineTo(x, y + wave);
    }
    ctx.stroke();

    // Traveling pulse dot
    const pulseX = ((t * 80 + i * 120) % (w + 100)) - 50;
    const pulseY = y + Math.sin((pulseX + offset) * 0.02 + i) * 8;

    const grd = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 12);
    grd.addColorStop(0, colors[i % 3]);
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(pulseX, pulseY, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = colors[i % 3];
    ctx.beginPath();
    ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animateBars(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  colors: string[]
) {
  // Animated bar chart — represents data/dashboards
  ctx.clearRect(0, 0, w, h);

  const barCount = 10;
  const barW = (w - 40) / barCount - 4;
  const maxH = h * 0.7;

  for (let i = 0; i < barCount; i++) {
    const x = 20 + i * (barW + 4);
    const barH =
      maxH * (0.3 + 0.7 * Math.abs(Math.sin(t * 0.8 + i * 0.6)));
    const y = h - 20 - barH;

    const grd = ctx.createLinearGradient(x, y, x, h - 20);
    grd.addColorStop(0, colors[i % 3]);
    grd.addColorStop(1, `${colors[i % 3]}40`);
    ctx.fillStyle = grd;

    // Rounded top
    const r = Math.min(barW / 2, 4);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + barW - r, y);
    ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
    ctx.lineTo(x + barW, h - 20);
    ctx.lineTo(x, h - 20);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fill();
  }

  // Baseline
  ctx.strokeStyle = `${colors[0]}30`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(16, h - 20);
  ctx.lineTo(w - 16, h - 20);
  ctx.stroke();
}

function animatePulses(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  colors: string[]
) {
  // Radiating signal pulses — represents marketing/outreach
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;

  // Radiating rings
  for (let i = 0; i < 5; i++) {
    const phase = (t * 0.8 + i * 1.2) % 4;
    const r = phase * w * 0.15;
    const alpha = Math.max(0, 1 - phase / 4) * 0.4;

    ctx.strokeStyle = `${colors[i % 3]}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Orbiting dots — signals being sent
  for (let i = 0; i < 6; i++) {
    const angle = t * (0.5 + i * 0.15) + (i * Math.PI * 2) / 6;
    const dist = 30 + i * 15 + Math.sin(t + i) * 10;
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;

    const grd = ctx.createRadialGradient(x, y, 0, x, y, 8);
    grd.addColorStop(0, colors[i % 3]);
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = colors[i % 3];
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Center dot
  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
  grd.addColorStop(0, colors[0]);
  grd.addColorStop(1, "transparent");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(cx, cy, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();
}

const animationFns = {
  nodes: animateNodes,
  gears: animateGears,
  wires: animateWires,
  bars: animateBars,
  pulses: animatePulses,
};

function CardCanvas({
  colors,
  animationType,
}: {
  colors: [string, string, string];
  animationType: ServicePillar["animationType"];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animId = 0;
    let t = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const drawFn = animationFns[animationType];

    if (prefersReduced) {
      const rect = canvas.getBoundingClientRect();
      drawFn(ctx, rect.width, rect.height, 1, colors);
      return () => ro.disconnect();
    }

    function loop() {
      if (!canvas || !ctx) return;
      t += 0.016;
      const rect = canvas.getBoundingClientRect();
      drawFn(ctx, rect.width, rect.height, t, colors);
      animId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [colors, animationType]);

  useEffect(() => {
    const cleanup = startAnimation();
    return cleanup;
  }, [startAnimation]);

  return (
    <canvas
      ref={canvasRef}
      className="ps-bento-canvas"
      aria-hidden="true"
    />
  );
}

export function ServicePillars() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gridRef.current) return;

    const cards = Array.from(gridRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      cards.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!gridRef.current) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      className="ps-services"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="ps-services-header">
        <div className="ps-eyebrow ps-eyebrow--light">Services</div>
        <h2
          id="services-heading"
          className="ps-section-heading ps-section-heading--light"
        >
          What We Build
        </h2>
      </div>

      <div className="ps-bento-grid" ref={gridRef}>
        {services.map((service, i) => (
          <Link
            key={service.title}
            href={service.href}
            className={`ps-bento-card ${i === 0 ? "ps-bento-card--large" : ""}`}
          >
            <div className="ps-bento-card-visual" aria-hidden="true">
              <CardCanvas
                colors={service.colors}
                animationType={service.animationType}
              />
            </div>
            <div className="ps-bento-card-content">
              <h3 className="ps-bento-card-title">{service.title}</h3>
              <p className="ps-bento-card-desc">{service.description}</p>
              <span className="ps-bento-card-link">
                Learn more
                <svg
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
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
