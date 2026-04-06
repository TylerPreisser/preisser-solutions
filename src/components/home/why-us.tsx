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

const whyFeatures: WhyFeature[] = [
  {
    id: 0,
    shortLabel: "built from scratch",
    title: "We Build Everything From Scratch.",
    description:
      "We don\u2019t rebrand cheap templates that have been around for 30 years and plug them in as our own. Everything we deliver is designed, engineered, and built specifically for your operation. Real code. Real systems. Built to work the way your business works.",
    image: "/images/ps-logo.webp",
    mobileImage: "/images/ps-logo.webp",
    alt: "Preisser Solutions logo \u2014 everything built from scratch",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: 1,
    shortLabel: "AI with guardrails",
    title: "AI Makes Us Dangerously Fast.",
    description:
      "We harness AI at every stage \u2014 research, design, development, testing, and deployment. But speed without control is just chaos. We\u2019ve built the guardrails, procedures, and safety protocols that make AI extremely productive while keeping every output precise and reliable. That\u2019s how we deliver in weeks what others take months to finish.",
    image: "/images/stripe/DatavizStatic3x.png",
    mobileImage: "/images/stripe/the-happenings-tidemark-mobile.png",
    alt: "AI-accelerated development with proper guardrails",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: 2,
    shortLabel: "we stay with it",
    title: "We Stay With It.",
    description:
      "If your business chooses ongoing support, we\u2019re there. New systems, acquisitions, integrations, staff changes \u2014 whatever shifts in your operation, we adapt what we\u2019ve built to match. You\u2019re not left with a finished product and a \u201Cgood luck\u201D email. We stay in it as long as you need us.",
    image: "/images/why-us/we-stay-with-it.webp",
    mobileImage: "/images/why-us/we-stay-with-it.webp",
    alt: "Ongoing support and system adaptation",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: 3,
    shortLabel: "you work direct",
    title: "You Work Directly With the Builder.",
    description:
      "No handoffs. No junior developers. No account managers. When you call, you talk to the person who designed it, wrote the code, and knows your system inside and out. That\u2019s how things get done right and get done fast.",
    image: "/images/why-us/work-direct.webp",
    mobileImage: "/images/why-us/work-direct.webp",
    alt: "Work directly with the builder",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: 4,
    shortLabel: "born and raised here",
    title: "Built for Kansas Businesses.",
    description:
      "Born and raised in Kansas. Based in Hays. We understand the businesses here because we grew up around them. Local and regional companies that need real technology \u2014 not startup theater, not Silicon Valley pricing, not consultants who\u2019ve never set foot on a job site.",
    image: "/images/why-us/kansas-built.webp",
    mobileImage: "/images/why-us/kansas-built.webp",
    alt: "Built for Kansas businesses",
    href: "/contact",
    cta: "Get in Touch",
  },
];

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.75"
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

                            {/* CTA hidden on mobile via CSS — header always has Get in Touch */}
                            <Link
                              href={item.href}
                              className="ps-btn ps-btn-primary events-mobile-carousel-card__link ps-why-mobile-cta"
                            >
                              {item.cta}
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
                          </article>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Swipe hint — only visible on mobile */}
            <p className="ps-why-swipe-hint" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }}
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Swipe to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
