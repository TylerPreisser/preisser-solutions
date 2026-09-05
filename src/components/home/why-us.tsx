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
            width={336}
            height={336}
            className="ps-why-relationship__mark"
          />

          {/* THE OWNER'S OWN WORDS. Restored 2026-09-04 under ADR-0009 after
              he rejected the agent-authored replacement on sight:
              "It's not 'in it for the long term' it is your success is our
              success thing dude."
              Do NOT substitute a different tagline, however well it renders.
              ADR-0004 chose this string because it is HIS phrasing; ADR-0008
              replaced it with "In it for the long term." and was wrong to.
              A better-reading line is not a reason to change it. */}
          <h2 id="why-heading" className="ps-why-relationship__tagline">
            Your success is{" "}
            <span className="ps-why-relationship__accent">our success.</span>
          </h2>

          {/* THIS IS THE OWNER'S TEXT, VERBATIM. NOT ONE WORD IS OURS.
              Authority: ADR-0009 (2026-09-04). Every deviation below has now
              been tried and reversed, so do not re-derive them:

                - An earlier pass "tightened" it and silently dropped
                  "solving their business problems", his only statement of
                  what the work is FOR.
                - A later pass deleted the article in "after the launch" to
                  cure a measured widow. THE ARTICLE IS BACK AND STAYS BACK.
                  That edit was defensible on the render and still wrong,
                  because it was an edit to words he had already told us to
                  use as written.
                - Do not "fix" the referent of "It" in the last sentence.
                  That objection was raised, argued, and is not ours to act
                  on.

              THE TWO &nbsp; IN THE LAST SENTENCE ARE LOAD-BEARING. They bind
              "after the launch." so it cannot strand. Do not remove them, and
              do not "tidy" them back to plain spaces.
              A non-breaking space is a typographic join, NOT an edit: the
              rendered text is identical character for character, which is the
              whole reason this is permissible where deleting the article was
              not.
              Measured at 360 and 375, last line as a % of measure:
                Chromium 27.1% -> 39.8%   Firefox 17.8% -> 39.8%
                WebKit  75.4% -> 75.4% (never widowed; it hyphenates)
              Firefox's 17.8% sat at the bottom of the 15-17% band this repo
              records as a failure. Line count is unchanged at 8 and nothing
              overflows. text-wrap: pretty is applied in
              why-us-relationship.css and did NOT fix this; balance made an
              earlier draft measurably worse. Copy length and typographic
              joins are the only levers left, and the copy is not ours.

              REAL SAFARI HAS NEVER BEEN RUN ON THIS SECTION. The WebKit
              figures are Playwright WebKit, which is not Safari. */}
          <p className="ps-why-relationship__copy">
            Our top goal is to develop long-term working relationships with all
            our clients, helping them grow and solving their business problems
            by crafting and maintaining custom software built around their
            specific business. It keeps making them more efficient
            after&nbsp;the&nbsp;launch.
          </p>
        </div>
      </div>
    </section>
  );
}
