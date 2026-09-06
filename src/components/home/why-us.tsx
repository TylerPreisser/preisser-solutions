/**
 * Why Us — one calm, static statement block.
 *
 * This replaced a three-panel interactive carousel (squeeze carousel on
 * desktop, horizontal scroll carousel on mobile, live-region item
 * announcements, swipe hint). The owner asked for a tagline and a short piece
 * of relationship copy instead, so all of the per-item state is gone and with
 * it the "use client" directive: nothing here runs in the browser. `page.tsx`
 * still loads it through next/dynamic with `ssr: true`, which is valid for a
 * server component and now ships zero JS for this section.
 *
 * 2026-09-05: the decorative ps-logo.webp mark that sat between the eyebrow
 * and the tagline was REMOVED on the owner's instruction — "remove the logo
 * for the your success is our success thing there just make the text itself
 * bigger". The tagline is now the section's sole visual anchor and was scaled
 * up to carry the weight the mark was carrying (see the __tagline rule in
 * why-us-relationship.css). The mark was aria-hidden/alt="", so nothing in the
 * accessibility tree changed. Do not re-add it.
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

          {/* THE OWNER'S TEXT, VERBATIM. NOT ONE WORD HERE IS OURS.
              Authority: ADR-0009 (2026-09-04), amended by the owner's
              2026-09-05 copy pass (#21/#23).

              WHAT THE 2026-09-05 PASS CHANGED, AND ON WHOSE AUTHORITY:

                - REMOVED the closing sentence "It keeps making them more
                  efficient after the launch." Owner, verbatim: "at the
                  bottom, it says, 'It keeps making them more efficient
                  after the launch.' Remove that." This supersedes the
                  earlier note that guarded that sentence's article.
                - The two &nbsp; that bound "after the launch." went with it.
                  They existed only to stop THAT phrase widowing, so they are
                  not a surviving constraint. Nothing else in this paragraph
                  is nbsp-joined; re-measure before adding any.
                - ADDED the opening "We start by listening..." sentence, moved
                  here verbatim from the Get in Touch body copy, which the
                  owner reduced to its heading alone. He asked for it by name:
                  "we could put it up with the Why Us section... That top
                  section where it says, 'We start out by listening and
                  finding out how we can help you achieve your business's
                  biggest goals or even solve your biggest problems.'"

              STILL IN FORCE from the earlier pass:
                - Do NOT "tighten" the second sentence. An earlier pass did,
                  and silently dropped "solving their business problems", his
                  only statement of what the work is FOR. It was reversed.
                  The owner's own #23 paraphrase happens to omit that clause;
                  a paraphrase is not an instruction to cut, so the full
                  sentence stays until he says otherwise.
                - Yes, "solve your business's biggest problems" and "solving
                  their business problems" now both appear. Both are his.
                  Redundancy in his words beats concision in ours.

              The h2 tagline above is separately load-bearing: see its own
              comment. Do not touch it.

              REAL SAFARI HAS NEVER BEEN RUN ON THIS SECTION. Any WebKit
              figures in this repo are Playwright WebKit, which is not
              Safari. */}
          <p className="ps-why-relationship__copy">
            We start by listening, finding out how we can help you achieve your
            business&apos;s biggest goals, or even solve your business&apos;s
            biggest problems. Our top goal is to develop long-term working
            relationships with all our clients, helping them grow and solving
            their business problems by crafting and maintaining custom software
            built around their specific business.
          </p>
        </div>
      </div>
    </section>
  );
}
