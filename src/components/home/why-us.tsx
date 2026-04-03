"use client";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";

interface WhyFeature {
  id: number;
  shortLabel: string;
  title: string;
  description: string;
  image: string;
  mobileImage: string;
  alt: string;
  href: string;
  cta: string;
}

interface CardRect {
  height: number;
  index: number;
  width: number;
  x: number;
  y: number;
}

const CANVAS_ASPECT_RATIO = 1232 / 460;
const SLOT_WIDTHS = [0.62, 0.15, 0.082, 0.05, 0.03, 0.018];
const SLOT_GAP = 0.01;
const ACTIVE_CARD_LABEL = "Preisser Solutions";

const whyFeatures: WhyFeature[] = [
  {
    id: 0,
    shortLabel: "we build in-house",
    title: "We Build Everything In-House.",
    description:
      "No subcontractors. No offshore teams. No white-labeled templates. Tyler Preisser designs it, builds it, and supports it.",
    image: "/images/stripe/browserbase.png",
    mobileImage: "/images/stripe/browserbase.png",
    alt: "Custom software interface placeholder",
    href: "/contact",
    cta: "Tell us what you need",
  },
  {
    id: 1,
    shortLabel: "AI makes us fast",
    title: "AI Makes Us Dangerously Fast.",
    description:
      "We use AI at every stage of the process — research, design, development, and testing — so we deliver in weeks, not months.",
    image: "/images/stripe/DatavizStatic3x.png",
    mobileImage: "/images/stripe/the-happenings-tidemark-mobile.png",
    alt: "Analytics and systems placeholder",
    href: "/#case-studies",
    cta: "See the outcomes",
  },
  {
    id: 2,
    shortLabel: "not a template",
    title: "Built for Your Business. Not a Template.",
    description:
      "We study your operation, understand your workflows, and build a solution that fits your business specifically.",
    image: "/images/Tyler Portait.jpeg",
    mobileImage: "/images/Tyler Portait.jpeg",
    alt: "Portrait placeholder for custom-fit systems",
    href: "/services",
    cta: "Explore our services",
  },
  {
    id: 3,
    shortLabel: "we stay with it",
    title: "We Stay With It.",
    description:
      "Every system we build comes with ongoing support. If something breaks, we fix it. If your business changes, we adapt the system.",
    image: "/images/stripe/the-happenings-agentic-mobile.png",
    mobileImage: "/images/stripe/the-happenings-agentic-mobile.png",
    alt: "Ongoing support placeholder graphic",
    href: "/contact",
    cta: "Talk with Tyler",
  },
  {
    id: 4,
    shortLabel: "you work direct",
    title: "You Work Directly With the Builder.",
    description:
      "No handoffs. No junior developers. No account managers. When you reach out, you talk to the person writing the code.",
    image: "/images/stripe/annual-letter-mobile.png",
    mobileImage: "/images/stripe/annual-letter-mobile.png",
    alt: "Direct access placeholder graphic",
    href: "/about",
    cta: "Meet Tyler",
  },
  {
    id: 5,
    shortLabel: "Kansas built",
    title: "Built for Kansas Businesses.",
    description:
      "Based in Hays, Kansas and built for local and regional businesses that need real systems, not startup theater.",
    image: "/images/stripe/wave_crop.jpg",
    mobileImage: "/images/stripe/the-happenings-cheeky-pint-mobile.png",
    alt: "Kansas-built placeholder image",
    href: "/contact",
    cta: "Start the conversation",
  },
];

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M11.25 4.5L6.75 9l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M6.75 4.5L11.25 9l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function easeOutQuint(value: number) {
  return 1 - Math.pow(1 - value, 5);
}

function roundRectPath(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const adjustedRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + adjustedRadius, y);
  context.arcTo(x + width, y, x + width, y + height, adjustedRadius);
  context.arcTo(x + width, y + height, x, y + height, adjustedRadius);
  context.arcTo(x, y + height, x, y, adjustedRadius);
  context.arcTo(x, y, x + width, y, adjustedRadius);
  context.closePath();
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const [wordIndex, word] of words.entries()) {
    const trial = currentLine ? `${currentLine} ${word}` : word;

    if (context.measureText(trial).width <= maxWidth || !currentLine) {
      currentLine = trial;
      continue;
    }

    lines.push(currentLine);

    if (lines.length === maxLines - 1) {
      const remaining = words.slice(wordIndex).join(" ");
      let truncated = remaining;

      while (truncated.length > 0 && context.measureText(`${truncated}…`).width > maxWidth) {
        truncated = truncated.slice(0, -1);
      }

      lines.push(`${truncated}…`);
      return lines;
    }

    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.slice(0, maxLines);
}

function createImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const positionsRef = useRef<CardRect[]>([]);
  const previousIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const activeItem = whyFeatures[activeIndex];

  function goPrev() {
    setActiveIndex((current) => (current - 1 + whyFeatures.length) % whyFeatures.length);
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % whyFeatures.length);
  }

  function getSlotRects(width: number, height: number) {
    const gap = width * SLOT_GAP;
    let cursor = 0;

    return SLOT_WIDTHS.map((fraction, slotIndex) => {
      const cardWidth = width * fraction;
      const topInset = slotIndex === 0 ? 0 : Math.min(14, height * 0.03);
      const bottomInset = slotIndex === 0 ? 0 : Math.min(14, height * 0.03);
      const rect = {
        height: height - topInset - bottomInset,
        index: slotIndex,
        width: cardWidth,
        x: cursor,
        y: topInset,
      };

      cursor += cardWidth + (slotIndex === SLOT_WIDTHS.length - 1 ? 0 : gap);

      return rect;
    });
  }

  function drawCard(
    context: CanvasRenderingContext2D,
    rect: CardRect,
    item: WhyFeature,
    image: HTMLImageElement | undefined,
    isActive: boolean
  ) {
    const radius = isActive ? 30 : 22;

    context.save();
    context.shadowColor = isActive ? "rgba(15, 23, 42, 0.12)" : "rgba(15, 23, 42, 0.08)";
    context.shadowBlur = isActive ? 32 : 18;
    context.shadowOffsetY = isActive ? 18 : 10;
    context.fillStyle = "#E7EDF5";
    roundRectPath(context, rect.x, rect.y, rect.width, rect.height, radius);
    context.fill();
    context.restore();

    context.save();
    roundRectPath(context, rect.x, rect.y, rect.width, rect.height, radius);
    context.clip();

    if (image) {
      const imageRatio = image.width / image.height;
      const rectRatio = rect.width / rect.height;
      let drawWidth = rect.width;
      let drawHeight = rect.height;
      let drawX = rect.x;
      let drawY = rect.y;

      if (imageRatio > rectRatio) {
        drawWidth = rect.height * imageRatio;
        drawX = rect.x + (rect.width - drawWidth) / 2;
      } else {
        drawHeight = rect.width / imageRatio;
        drawY = rect.y + (rect.height - drawHeight) / 2;
      }

      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    } else {
      context.fillStyle = "#DCE5F0";
      context.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    const overlay = context.createLinearGradient(rect.x, rect.y, rect.x, rect.y + rect.height);
    overlay.addColorStop(0, isActive ? "rgba(9, 22, 40, 0.04)" : "rgba(9, 22, 40, 0.06)");
    overlay.addColorStop(0.55, isActive ? "rgba(9, 22, 40, 0.08)" : "rgba(9, 22, 40, 0.16)");
    overlay.addColorStop(1, isActive ? "rgba(9, 22, 40, 0.36)" : "rgba(9, 22, 40, 0.18)");
    context.fillStyle = overlay;
    context.fillRect(rect.x, rect.y, rect.width, rect.height);

    if (isActive) {
      context.fillStyle = "#FFFFFF";
      context.font = "600 18px var(--font-sans, Inter, system-ui, sans-serif)";
      context.textBaseline = "alphabetic";
      context.fillText(ACTIVE_CARD_LABEL, rect.x + 28, rect.y + rect.height - 28);
    } else if (rect.width > 52) {
      context.fillStyle = "#031323";
      context.font = rect.width > 96
        ? "500 12px var(--font-sans, Inter, system-ui, sans-serif)"
        : "500 11px var(--font-sans, Inter, system-ui, sans-serif)";
      context.textBaseline = "top";

      const lines = wrapText(context, item.shortLabel, rect.width - 22, rect.width > 90 ? 3 : 4);
      lines.forEach((line, lineIndex) => {
        context.fillText(line, rect.x + 12, rect.y + 14 + lineIndex * 14);
      });
    }

    context.restore();

    context.save();
    context.strokeStyle = "rgba(10, 22, 40, 0.08)";
    context.lineWidth = 1;
    roundRectPath(context, rect.x + 0.5, rect.y + 0.5, rect.width - 1, rect.height - 1, radius);
    context.stroke();
    context.restore();
  }

  function drawScene(fromIndex: number, toIndex: number, progress: number) {
    const canvas = canvasRef.current;
    const stage = stageRef.current;

    if (!canvas || !stage) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const stageWidth = stage.clientWidth;
    const stageHeight = Math.round(stageWidth / CANVAS_ASPECT_RATIO);

    if (stageWidth === 0 || stageHeight === 0) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(stageWidth * dpr);
    canvas.height = Math.round(stageHeight * dpr);
    canvas.style.height = `${stageHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, stageWidth, stageHeight);

    const slotRects = getSlotRects(stageWidth, stageHeight);
    const interpolatedRects: CardRect[] = [];

    whyFeatures.forEach((item, itemIndex) => {
      const fromSlot = (itemIndex - fromIndex + whyFeatures.length) % whyFeatures.length;
      const toSlot = (itemIndex - toIndex + whyFeatures.length) % whyFeatures.length;
      const startRect = slotRects[fromSlot];
      const endRect = slotRects[toSlot];
      const rect = {
        height: startRect.height + (endRect.height - startRect.height) * progress,
        index: itemIndex,
        width: startRect.width + (endRect.width - startRect.width) * progress,
        x: startRect.x + (endRect.x - startRect.x) * progress,
        y: startRect.y + (endRect.y - startRect.y) * progress,
      };

      interpolatedRects.push(rect);
    });

    positionsRef.current = interpolatedRects
      .map((rect) => ({ ...rect }))
      .sort((a, b) => a.width - b.width);

    interpolatedRects
      .slice()
      .sort((a, b) => a.width - b.width)
      .forEach((rect) => {
        const item = whyFeatures[rect.index];
        drawCard(
          context,
          rect,
          item,
          imagesRef.current.get(item.id),
          rect.index === toIndex && progress > 0.5
        );
      });
  }

  useEffect(() => {
    let mounted = true;

    Promise.all(whyFeatures.map((item) => createImage(item.image)))
      .then((images) => {
        if (!mounted) {
          return;
        }

        const nextMap = new Map<number, HTMLImageElement>();
        images.forEach((image, imageIndex) => {
          nextMap.set(whyFeatures[imageIndex].id, image);
        });

        imagesRef.current = nextMap;
        setImagesReady(true);
      })
      .catch(() => {
        if (mounted) {
          setImagesReady(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!imagesReady) {
      return;
    }

    drawScene(previousIndexRef.current, activeIndex, 1);
  }, [imagesReady]);

  useEffect(() => {
    if (!imagesReady) {
      return;
    }

    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const observer = new ResizeObserver(() => {
      drawScene(previousIndexRef.current, activeIndex, 1);
    });

    observer.observe(stage);

    return () => observer.disconnect();
  }, [activeIndex, imagesReady]);

  useEffect(() => {
    if (!imagesReady) {
      return;
    }

    const fromIndex = previousIndexRef.current;
    const toIndex = activeIndex;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (fromIndex === toIndex || reduceMotion) {
      drawScene(toIndex, toIndex, 1);
      previousIndexRef.current = toIndex;
      return;
    }

    const start = performance.now();
    const duration = 680;

    const tick = (now: number) => {
      const rawProgress = Math.min(1, (now - start) / duration);
      drawScene(fromIndex, toIndex, easeOutQuint(rawProgress));

      if (rawProgress < 1) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }

      previousIndexRef.current = toIndex;
      rafRef.current = null;
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeIndex, imagesReady]);

  function handleCanvasClick(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - bounds.left;
    const clickY = event.clientY - bounds.top;
    const hit = positionsRef.current.find(
      (rect) =>
        clickX >= rect.x &&
        clickX <= rect.x + rect.width &&
        clickY >= rect.y &&
        clickY <= rect.y + rect.height
    );

    if (typeof hit?.index === "number") {
      setActiveIndex(hit.index);
    }
  }

  return (
    <section className="ps-why" id="why-us" aria-labelledby="why-heading">
      <div className="ps-container">
        <div className="events-section-container">
          <header className="events-section__header">
            <div className="events-section__header-content">
              <div className="ps-eyebrow ps-eyebrow--light">Why Us</div>
              <h2
                id="why-heading"
                className="ps-section-heading ps-section-heading--light events-section__header-title"
              >
                Why Us
              </h2>
            </div>

            <div
              className="events-section__controls"
              role="group"
              aria-label="Why us carousel controls"
            >
              <button
                type="button"
                className="ps-events-control"
                onClick={goPrev}
                aria-label="Show previous feature"
              >
                <ArrowLeftIcon />
              </button>
              <button
                type="button"
                className="ps-events-control"
                onClick={goNext}
                aria-label="Show next feature"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </header>

          <div className="squeezy-carousel" aria-label="Why Preisser Solutions carousel">
            <div className="squeezy-carousel__body">
              <div
                ref={stageRef}
                className="squeezy-carousel__stage"
                onClick={handleCanvasClick}
              >
                <canvas ref={canvasRef} className="squeezy-carousel__canvas" aria-hidden="true" />
              </div>

              <div className="squeezy-carousel__items-details-container">
                {whyFeatures.map((item, itemIndex) => {
                  const isActive = itemIndex === activeIndex;

                  return (
                    <article
                      key={item.id}
                      className="squeezy-carousel__item-details"
                      style={{
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? "auto" : "none",
                        transform: `translateX(-${activeIndex * 100}%)`,
                      }}
                      aria-hidden={!isActive}
                    >
                      <div className="squeezy-carousel__item-copy">
                        <h3 className="ps-events-detail__title">{item.title}</h3>
                        <p className="ps-events-detail__description">{item.description}</p>
                      </div>

                      <Link href={item.href} className="ps-btn ps-btn-primary ps-events-detail__cta">
                        {item.cta}
                        <span className="ps-btn-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Item {activeIndex + 1} of {whyFeatures.length}: {activeItem.title}
          </div>

          <div className="events-mobile-carousel">
            <div className="mobile-carousel_container">
              <div className="mobile-carousel">
                <div className="mobile-carousel__scroller">
                  <ul role="list" className="mobile-carousel__items-container">
                    {whyFeatures.map((item, itemIndex) => (
                      <li
                        key={item.id}
                        className="mobile-carousel__item"
                        style={{ "--carousel-item-index": itemIndex } as CSSProperties}
                      >
                        <div className="mobile-carousel__inner">
                          <article className="events-mobile-carousel-card">
                            <div className="events-mobile-carousel-card__media">
                              <Image
                                src={item.mobileImage}
                                alt={item.alt}
                                fill
                                sizes="(max-width: 639px) calc(100vw - 32px), 336px"
                                className="events-mobile-carousel-card__image"
                              />
                            </div>

                            <div className="events-mobile-carousel-card__title">
                              <span className="ps-events-mobile-carousel__headline">{item.title}</span>
                              <span className="squeezy-carousel__itemDescription">
                                {item.description}
                              </span>
                            </div>

                            <Link href={item.href} className="ps-btn ps-btn-primary events-mobile-carousel-card__link">
                              {item.cta}
                              <span className="ps-btn-arrow" aria-hidden="true">
                                →
                              </span>
                            </Link>
                          </article>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
