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

          {/* The mark is the only thing in this block that names the brand —
              the tagline deliberately does not — so it gets a real alt, not
              alt="". Same URL the header already loaded, so it is warm in
              cache. Explicit intrinsic width/height reserve the box (no CLS);
              CSS scales it down. */}
          <Image
            src="/images/ps-logo.webp"
            alt="Preisser Solutions"
            width={1024}
            height={1024}
            className="ps-why-relationship__mark"
          />

          <h2 id="why-heading" className="ps-why-relationship__tagline">
            Your success is{" "}
            <span className="ps-why-relationship__accent">our success.</span>
          </h2>

          <p className="ps-why-relationship__copy">
            Preisser Solutions works in long-term relationships, not one-off
            handoffs. Every system we build is custom — shaped around one
            business, its customers, its services, its tools, and the details
            that make the difference. When your business changes, we are still
            here to change with it.
          </p>
        </div>
      </div>
    </section>
  );
}
