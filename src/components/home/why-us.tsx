"use client";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useState } from "react";

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

const ACTIVE_CARD_LABEL = "Preisser Solutions";

const whyFeatures: WhyFeature[] = [
  {
    id: 0,
    shortLabel: "we build in-house",
    title: "We Build Everything In-House.",
    description:
      "No subcontractors. No offshore teams. No white-labeled templates. Tyler Preisser designs it, builds it, and supports it.",
    image: "/images/ps-logo.webp",
    mobileImage: "/images/ps-logo.webp",
    alt: "Preisser Solutions logo — we build everything in-house",
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
    cta: "Get in Touch",
  },
  {
    id: 2,
    shortLabel: "not a template",
    title: "Built for Your Business. Not a Template.",
    description:
      "We study your operation, understand your workflows, and build a solution that fits your business specifically.",
    image: "/images/why-us/not-a-template.webp",
    mobileImage: "/images/why-us/not-a-template.webp",
    alt: "Custom-built technology solutions, not templates",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: 3,
    shortLabel: "we stay with it",
    title: "We Stay With It.",
    description:
      "Every system we build comes with ongoing support. If something breaks, we fix it. If your business changes, we adapt the system.",
    image: "/images/why-us/we-stay-with-it.webp",
    mobileImage: "/images/why-us/we-stay-with-it.webp",
    alt: "Ongoing support and system maintenance",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: 4,
    shortLabel: "you work direct",
    title: "You Work Directly With the Builder.",
    description:
      "No handoffs. No junior developers. No account managers. When you reach out, you talk to the person writing the code.",
    image: "/images/why-us/work-direct.webp",
    mobileImage: "/images/why-us/work-direct.webp",
    alt: "Work directly with the builder",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: 5,
    shortLabel: "Kansas built",
    title: "Built for Kansas Businesses.",
    description:
      "Based in Hays, Kansas and built for local and regional businesses that need real systems, not startup theater.",
    image: "/images/why-us/kansas-built.webp",
    mobileImage: "/images/why-us/kansas-built.webp",
    alt: "Built for Kansas businesses",
    href: "/contact",
    cta: "Get in Touch",
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

export function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = whyFeatures[activeIndex];

  function goPrev() {
    setActiveIndex((current) => (current - 1 + whyFeatures.length) % whyFeatures.length);
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % whyFeatures.length);
  }

  return (
    <section className="ps-why" id="why-us" aria-labelledby="why-heading">
      <div className="ps-container">
        <div className="events-section-container">
          <header className="events-section__header">
            <div className="events-section__header-content">
              <div className="ps-eyebrow ps-eyebrow--light">Why Us</div>
              {/* Intentionally no h2 heading text per user request */}
              <h2 id="why-heading" className="sr-only">
                Why Preisser Solutions
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

          {/* ── Desktop: squeeze carousel ────────────────────────── */}
          <div className="ps-squeeze-carousel" aria-label="Why Preisser Solutions carousel">
            {/* Track: flex row of cards */}
            <div className="ps-squeeze-track">
              {whyFeatures.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={item.id}
                    className={`ps-squeeze-card${isActive ? " ps-squeeze-card--active" : ""}${i === 0 ? " ps-squeeze-card--logo" : ""}`}
                    onClick={() => !isActive && setActiveIndex(i)}
                    role={isActive ? undefined : "button"}
                    tabIndex={isActive ? -1 : 0}
                    aria-label={isActive ? undefined : `Show: ${item.title}`}
                    onKeyDown={(e) => {
                      if (!isActive && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setActiveIndex(i);
                      }
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="ps-squeeze-card-img"
                      draggable={false}
                    />

                    {/* Gradient overlay — always rendered, stronger on inactive */}
                    <div className={`ps-squeeze-card-overlay${isActive ? " ps-squeeze-card-overlay--active" : ""}`} aria-hidden="true" />

                    {/* Brand label: only visible on active card */}
                    {isActive && (
                      <span className="ps-squeeze-label" aria-hidden="true">
                        {ACTIVE_CARD_LABEL}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Detail text panel below the track */}
            <div className="ps-squeeze-details" aria-live="polite" aria-atomic="true">
              {whyFeatures.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <article
                    key={item.id}
                    className="ps-squeeze-detail"
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                      transform: `translateX(-${activeIndex * 100}%)`,
                    }}
                    aria-hidden={!isActive}
                  >
                    <div className="ps-squeeze-detail-copy">
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

          {/* Screen-reader announcement */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Item {activeIndex + 1} of {whyFeatures.length}: {activeItem.title}
          </div>

          {/* ── Mobile: horizontal scroll carousel ──────────────── */}
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
                              <span className="ps-events-mobile-carousel__headline">
                                {item.title}
                              </span>
                              <span className="squeezy-carousel__itemDescription">
                                {item.description}
                              </span>
                            </div>

                            <Link
                              href={item.href}
                              className="ps-btn ps-btn-primary events-mobile-carousel-card__link"
                            >
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
