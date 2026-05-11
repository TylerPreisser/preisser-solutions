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
    shortLabel: "built for your business",
    title: "Custom. Built for Your Business.",
    description:
      "Same approach we used for Alliant Insurance, Salesforce, and Sunrise Transportation \u2014 custom-coded for your business. Not rebranded templates. Real code. Real systems. Enterprise quality, built for a Kansas business.",
    image: "/images/ps-logo.webp",
    mobileImage: "/images/ps-logo.webp",
    alt: "Preisser Tech logo \u2014 custom built for your business",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: 1,
    shortLabel: "AI with guardrails",
    title: "AI, Harnessed and Under Control.",
    description:
      "I leverage AI so much. I really know what I’m doing with AI. We use it to organically maximize your online presence — your AI presence. Nobody else in Kansas is doing this yet. The result: your business shows up where AI is looking, and your competitors don’t.",
    image: "/images/why-us/ai-harnessed.webp",
    mobileImage: "/images/why-us/ai-harnessed.webp",
    alt: "AI-accelerated development with proper guardrails",
    href: "/contact",
    cta: "Get in Touch",
  },
  {
    id: 2,
    shortLabel: "we stay with it",
    title: "We Stay With It.",
    description:
      "Ongoing service relationship. We\u2019re not handing you a finished product and disappearing. AI shifts, search shifts, competitors shift \u2014 we shift with you. Month after month. The kind of relationship where you just tell us what you need and we take care of it.",
    image: "/images/why-us/we-stay-with-it-new.webp",
    mobileImage: "/images/why-us/we-stay-with-it-new.webp",
    alt: "Ongoing support and system adaptation",
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
                Why Preisser Tech
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
          <div className="ps-squeeze-carousel" aria-label="Why Preisser Tech carousel">
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
                            <div className={`events-mobile-carousel-card__media${itemIndex === 0 ? " events-mobile-carousel-card__media--logo" : ""}`}>
                              <Image
                                src={item.mobileImage}
                                alt={item.alt}
                                fill
                                sizes="(max-width: 639px) calc(100vw - 32px), 336px"
                                className={`events-mobile-carousel-card__image${itemIndex === 0 ? " events-mobile-carousel-card__image--logo" : ""}`}
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
