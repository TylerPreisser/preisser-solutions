/**
 * MarCommand — the homepage product block.
 *
 * This section shows the REAL MarCommand console, captured from the running
 * application's `?fixture` demo tenant, rather than a re-implementation of it.
 *
 * Why a capture and not a component: a faithful re-implementation was attempted
 * (2,883 lines across four files, an ~15s GSAP timeline and a hand-drawn SVG
 * stage) and it still resolved to 306 elements / 4 SVG / 12 type styles against
 * the real console's 537 / 29 / ~20. The gap was not closable in the site's
 * one-accent palette, because the product's core idea is six saturated channel
 * brands. The capture closes it at zero runtime cost and zero drift.
 *
 * Truthfulness: the app stamps its own disclaimers into the pixels (a DEMO
 * pill, the "every figure on this screen is synthetic by construction" strip),
 * and the figcaption restates that in the site's own type so the claim does not
 * depend on 9px pixels inside an image. The `HA` monogram is the seeded
 * synthetic tenant, not a real client's mark.
 *
 * This is a Server Component on purpose: with no timeline there is no state, no
 * refs and no effects, so it renders to static HTML at export time.
 */

/**
 * `<picture>` rather than `next/image` because this is ART DIRECTION — a
 * different CROP per breakpoint, not a different resolution of one image.
 * `next/image` switches resolution via srcSet/sizes and cannot switch sources
 * on a media query; and with `images.unoptimized` (next.config.ts:6-8) it would
 * emit a plain <img> anyway, buying a runtime import and nothing else.
 *
 * The breakpoint is 767/768, NOT 767/769 by accident: 768 is iPad portrait and
 * it must get the CONSOLE. Measured, the phone crop is only 636 physical px
 * wide, so stretched across a 768-wide tablet it lands 2.16x short of the
 * pixels that viewport needs and reads visibly soft. The console asset has
 * resolution to spare there (1.24x short at DPR2, versus 2.16x). The rail
 * stays adequate across every real phone width — 0.97x / 1.04x / 1.09x short
 * at 390 / 414 / 430 — and this project's viewport matrix has no device at all
 * between 430 and 768, so nothing lands in the gap.
 *
 * ACCEPTED LIMITATION, ruled on deliberately — do not "fix" this:
 * 767px is the worst case in the whole range, at 2.15x short, because it is the
 * last width still served the phone crop. That is not an oversight. The device
 * gap runs 431-767 and nothing real sits in it, so closing it would mean adding
 * a third tablet-width asset — and every asset ships in a static export. Bytes
 * spent on a width no device has is the wrong trade. If you are reading this
 * because you measured 767 and it looked alarming: it is known, it is
 * intentional, and the reasoning is here rather than left for you to
 * rediscover.
 *
 * Desktop gets the full console (1416x936). Mobile gets the left rail cropped
 * at a card boundary (332x555) — the only region of the app that is already
 * portrait-shaped, so nothing is shrunk or reflowed into a new approximation.
 * The crop lands in the gutter between TikTok and Google LSA, so no card is cut
 * in half and the partial gutter reads as "the list continues".
 *
 * Explicit width/height on the <img> keeps CLS at zero; the section sits far
 * below the fold, so it is lazy and async-decoded.
 */
export function MarCommandLive() {
  return (
    <section
      className="mc-live ps-section"
      id="marcommand-live"
      aria-labelledby="marcommand-live-heading"
    >
      <div className="ps-container">
        <div className="mc-live__head">
          {/*
            The eyebrow is gone, not restyled. It said "MARCOMMAND" and the
            title now IS "MarCommand", so keeping it would print the product
            name twice in two type treatments. The descriptor takes the slot
            underneath instead — see .mc-live__descriptor in the stylesheet for
            why it is sentence case and not `.ps-eyebrow`.
          */}
          <h2 id="marcommand-live-heading" className="ps-section-heading mc-live__heading">
            MarCommand
          </h2>
          <p className="mc-live__descriptor">
            Our proprietary agentic learning marketing channel optimization platform
          </p>
          <p className="mc-live__body">
            MarCommand gives your business a custom AI agent that learns your audience, your
            channels and your products, then works the controls. Every channel you advertise on,
            every lever those platforms actually offer, in one place. Nothing moves without you.
          </p>
        </div>

        <figure className="mc-live__figure">
          <div className="mc-live__stage-card">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/images/marcommand/rail.webp 1x, /images/marcommand/rail@2x.webp 2x"
                width={332}
                height={555}
              />
              <source
                media="(min-width: 768px)"
                srcSet="/images/marcommand/console.webp 1x, /images/marcommand/console@2x.webp 2x"
                width={1416}
                height={936}
              />
              <img
                className="mc-live__shot"
                src="/images/marcommand/console.webp"
                width={1416}
                height={936}
                loading="lazy"
                decoding="async"
                alt="The MarCommand console: a left column of six advertising channels, an acquisition funnel flowing into the client's mark, and a right column of outcome figures."
              />
            </picture>
          </div>
          <figcaption className="mc-live__caption">
            A live view of the MarCommand console. Demonstration tenant: every figure shown is
            synthetic.
          </figcaption>
        </figure>

        {/*
          The image is the product shot; the meaning lives here. This describes
          the STILL, not an animation — the previous copy narrated a walk to the
          Google Ads panel that no longer exists, which was a factual error to a
          screen-reader user. The last sentence is required: announcing
          fictional demo figures as fact is a truthfulness problem, not just a
          noise problem (§7).
        */}
        <p className="ps-visually-hidden">
          MarCommand is a marketing channel optimization platform. The console shown has three
          parts. On the left, a column of six advertising channels (Facebook, Instagram, TikTok,
          Google Ads, Google Local Services and direct mail), each with its own spend, reach,
          clicks, cost per acquisition and return. In the centre, an acquisition funnel: those six
          channels flow into your business, and the audience is counted through five stages:
          reached, visited, interested, leads, and validated. On the right, the outcomes those
          channels produced, including leads, cost per lead, revenue, spend and net profit. An
          agent panel at the top left holds the controls, including a setting requiring human
          approval before anything changes. The figures shown are a demonstration.
        </p>
      </div>
    </section>
  );
}
