import Image from "next/image";

/**
 * Why Us — one calm, static statement block.
 *
 * This replaced a three-panel interactive carousel (squeeze carousel on
 * desktop, horizontal scroll carousel on mobile, live-region item
 * announcements, swipe hint). The owner asked for the logo, a tagline, and a
 * short piece of relationship copy instead, so all of the per-item state is
 * gone and with it the "use client" directive: nothing here runs in the
 * browser. `page.tsx` still loads it through next/dynamic with `ssr: true`,
 * which is valid for a server component and now ships zero JS for this
 * section.
 *
 * The section id `why-us` and the heading id `why-heading` are preserved.
 *
 * Accessibility note: the h2 used to be `sr-only` because the section had no
 * headline worth showing. It now has one — the tagline IS the heading, so it
 * is visible and still carries `id="why-heading"`. Exactly one h2, one
 * accessible name, nothing hidden and duplicated.
 */
export function WhyUs() {
  return (
    <section className="ps-why ps-why--relationship" id="why-us" aria-labelledby="why-heading">
      <div className="ps-container">
        <div className="ps-why-relationship">
          <p className="ps-eyebrow ps-why-relationship__eyebrow">Why Us</p>

          {/* alt="" on purpose. The first draft gave this a real alt on the
              reasoning that the tagline never names the brand — true, but the
              very next paragraph OPENS with "Preisser Solutions", so a screen
              reader would announce the name twice one node apart. The mark is
              decorative here; the paragraph carries the name. (Accessibility
              audit, 2026-09-03.)
              Same URL the header already loaded, so it is warm in cache.
              Explicit intrinsic width/height reserve the box (no CLS); CSS
              scales it down. */}
          <Image
            src="/images/ps-logo.webp"
            alt=""
            aria-hidden="true"
            width={1024}
            height={1024}
            className="ps-why-relationship__mark"
          />

          <h2 id="why-heading" className="ps-why-relationship__tagline">
            Your success is{" "}
            <span className="ps-why-relationship__accent">our success.</span>
          </h2>

          {/* The last sentence is deliberately short. The longer draft ("we
              are still here to change with it") widowed "with it." onto an
              eighth line at 390px — 53px of text in a 342px measure.
              text-wrap: pretty is already applied and does not fix it, and
              balance measurably made it worse. Copy was the only lever.
              (Design critique, 2026-09-03.) */}
          <p className="ps-why-relationship__copy">
            Preisser Solutions works in long-term relationships, not one-off
            handoffs. Every system we build is custom — shaped around one
            business, its customers, its services, its tools, and the details
            that make the difference. When your business changes, we change
            with it.
          </p>
        </div>
      </div>
    </section>
  );
}
