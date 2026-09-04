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

          {/* COPY IS LENGTH-TUNED. Do not shorten or lengthen this paragraph
              without re-measuring both widths; the measure is 342px at 390 and
              704px at 1440, and the wrap lands badly at several nearby
              lengths. Two earlier drafts failed on exactly that:
                - "we are still here to change with it" widowed "with it."
                  onto an eighth line at 390 — 53px in a 342px measure.
                - the draft this replaces ran 3 lines at 1440 and ended on
                  "more efficient." — 123px of 704px, two words, visibly
                  orphaned.
              text-wrap: pretty is already applied (why-us-relationship.css)
              and does not fix either; balance measurably made the first worse.
              Copy length is the only lever that works.

              "world-class" was removed 2026-09-03. docs/WRITER-AGENT-PROMPT.md
              line 74 names it as a banned marketing cliché, alongside
              "industry-leading", "best-in-class", "cutting-edge" and
              "next-generation". The owner did say the phrase out loud, but the
              same owner wrote the rule that bans it, and the guide's own
              standard is "show, don't tell — outcomes over adjectives". So the
              adjective is replaced by the concrete thing it was pointing at:
              software built around how the business actually works, and kept
              working long after launch. Both halves are existing approved
              positioning (service-pillars.tsx differentiators: "It's better
              because it isn't generic", "built around how your business
              actually works, not around someone else's assumptions").
              Everything the owner asked for is still here — long-term
              relationship, helping them grow, crafting AND maintaining, and
              the efficiency payoff. */}
          <p className="ps-why-relationship__copy">
            Our goal is a long-term relationship with every client — helping
            them grow, and crafting and maintaining custom software built
            around how their business actually works, so it keeps making them
            more efficient long after launch.
          </p>
        </div>
      </div>
    </section>
  );
}
