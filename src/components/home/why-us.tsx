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

              KNOWN AND ACCEPTED: with "the" restored, at 375x667 and 360x640
              this runs 8 lines and the last line is short. The engines
              disagree there (Chromium 27% / Firefox 18% / WebKit 75% of
              measure). text-wrap: pretty is applied in
              why-us-relationship.css and does NOT fix it; balance made an
              earlier draft measurably worse. That is a cosmetic cost the
              owner accepted by supplying this exact sentence. IF IT NEEDS TO
              CHANGE, HE CHANGES IT — measure, report, and leave the words
              alone.

              REAL SAFARI HAS NEVER BEEN RUN ON THIS SECTION. The WebKit
              figures are Playwright WebKit, which is not Safari. */}
          <p className="ps-why-relationship__copy">
            Our top goal is to develop long-term working relationships with all
            our clients, helping them grow and solving their business problems
            by crafting and maintaining custom software built around their
            specific business. It keeps making them more efficient after the
            launch.
          </p>
        </div>
      </div>
    </section>
  );
}
