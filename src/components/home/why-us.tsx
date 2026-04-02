"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

interface WhyFeature {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  cta: string;
}

const whyFeatures: WhyFeature[] = [
  {
    id: 0,
    title: "We Build Everything In-House.",
    description:
      "No subcontractors. No offshore handoffs. The same person you talk to is the person designing, building, and refining the system.",
    image: "/images/stripe/wave_crop.jpg",
    alt: "Ocean placeholder image for in-house delivery",
    href: "/contact",
    cta: "Start the conversation",
  },
  {
    id: 1,
    title: "AI Makes Us Dangerously Fast.",
    description:
      "We use AI across research, design, engineering, and testing so you get serious speed without the usual agency drag.",
    image: "/images/stripe/the-happenings-agentic-mobile.png",
    alt: "Placeholder image for AI-accelerated delivery",
    href: "/contact",
    cta: "See what we can build",
  },
  {
    id: 2,
    title: "Built for Your Business. Not a Template.",
    description:
      "We shape the product around your workflow, your customers, and your edge cases instead of forcing you into recycled software.",
    image: "/images/stripe/browserbase.png",
    alt: "Placeholder image for custom-built systems",
    href: "/services",
    cta: "Explore our services",
  },
  {
    id: 3,
    title: "We Think in Systems, Not One-Off Deliverables.",
    description:
      "Every website, app, dashboard, and automation is designed to fit together so your business actually runs better after launch.",
    image: "/images/stripe/DatavizStatic3x.png",
    alt: "Placeholder image for connected systems thinking",
    href: "/#results",
    cta: "See the outcomes",
  },
  {
    id: 4,
    title: "We Stay With It.",
    description:
      "Launch is the start, not the finish line. When your business changes, we can keep refining the system with you.",
    image: "/images/Tyler Portait.jpeg",
    alt: "Placeholder portrait for ongoing partnership",
    href: "/contact",
    cta: "Talk with Tyler",
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

  const orderedItems = useMemo(
    () =>
      whyFeatures.map((_, offset) => whyFeatures[(activeIndex + offset) % whyFeatures.length]),
    [activeIndex]
  );

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
              <h2 id="why-heading" className="ps-section-heading ps-section-heading--light events-section__header-title">
                See what makes Preisser Solutions different.
              </h2>
              <p className="events-section__header-subtitle">
                A closer look at the things clients actually notice when they work
                with us: speed, ownership, custom systems, and long-term follow-through.
              </p>
            </div>

            <div className="events-section__controls" role="group" aria-label="Why us carousel controls">
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

          <div className="ps-events-carousel" aria-label="Why Preisser Solutions carousel">
            <div className="ps-events-carousel__track">
              {orderedItems.map((item, position) => {
                const isActive = position === 0;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`ps-events-carousel__item${isActive ? " ps-events-carousel__item--active" : ""}`}
                    data-position={position}
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(item.id)}
                  >
                    <span className="ps-events-carousel__media">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes={
                          isActive
                            ? "(max-width: 939px) 100vw, 760px"
                            : "(max-width: 939px) 100vw, 220px"
                        }
                        className="ps-events-carousel__image"
                      />
                      <span className="ps-events-carousel__overlay" aria-hidden="true" />
                    </span>

                    {isActive ? (
                      <span className="ps-events-carousel__active-label">
                        Preisser Solutions
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ps-events-detail" key={activeItem.id}>
            <div className="ps-events-detail__copy">
              <h3 className="ps-events-detail__title">{activeItem.title}</h3>
              <p className="ps-events-detail__description">{activeItem.description}</p>
            </div>

            <Link href={activeItem.href} className="ps-btn ps-btn-primary ps-events-detail__cta">
              {activeItem.cta}
              <span className="ps-btn-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="events-mobile-carousel">
            <div className="ps-events-mobile-carousel__scroller">
              {whyFeatures.map((item) => (
                <article key={item.id} className="events-mobile-carousel-card">
                  <div className="events-mobile-carousel-card__media">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 32px), 336px"
                      className="events-mobile-carousel-card__image"
                    />
                  </div>
                  <h3 className="events-mobile-carousel-card__title">{item.title}</h3>
                  <p className="ps-events-mobile-carousel__description">{item.description}</p>
                  <Link href={item.href} className="events-mobile-carousel-card__link">
                    {item.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
