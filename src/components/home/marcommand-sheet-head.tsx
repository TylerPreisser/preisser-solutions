import type { ReactElement } from "react";

/**
 * The words of the MarCommand block in card 5's sheet (ADR-0029): the heading
 * and the proprietary line. Plain markup in its own tiny file so they are in the
 * sheet at once, while the stage, its timeline and GSAP load as a separate
 * chunk (marcommand-live.tsx). Do not import marcommand-live from here.
 */
export function MarCommandSheetHead(): ReactElement {
  return (
    <div className="mc-live__head">
      {/*
        TITLE, THEN THE PROPRIETARY LINE UNDER IT. EXACTLY TWO THINGS.

        Owner: "the marcommand was supposed to have MarCommand as the title
        and then the our proprietary section under it as the text."

        This reverses an over-application, not a decision. His earlier
        instruction — a one-line headline naming the platform, and "get rid
        of the thing below it" — was read as "merge everything into one
        line", so the descriptor's sentence was folded INTO the <h4> and
        nothing was left beneath. The element he actually wanted gone was a
        different one: the long `.mc-live__body` prose paragraph that sat
        further down (measured 184px, three-and-a-bit lines between the claim
        and the animation that demonstrates the claim), plus the duplicate
        `.mc-live__descriptor` deck. Those two stay deleted. The sentence
        itself was never the thing to remove — it was in the wrong element.

        So: <h4> is the product name, <p> beneath it is the proprietary line,
        verbatim as he gave it. Nothing else goes in this block.

        THE ID STAYS ON THE <h4>. `mc-sheet-heading` is referenced by
        this section's own `aria-labelledby` and nowhere else — checked
        across src/, scripts/ and public/ before moving anything, and the
        only two hits are both in this file. The <h4> remains the labelling
        element, so the reference keeps pointing at a real heading.

        THE WORDMARK IS ONE WORD AND MUST STAY ONE WORD.

        The two spans are written adjacent on a single line with no
        whitespace, no newline and no separator between them, so the DOM
        holds "Mar" + "Command" as touching inline text and `textContent` is
        the single token "MarCommand". Put them on separate lines and a
        formatter is one reflow away from turning this into "Mar Command" in
        the accessible name. Nothing here may introduce a break opportunity
        mid-word either: there is no space and no hyphen, and the only
        `overflow-wrap: break-word` on the site is scoped to
        `.ps-hero-headline`, so the word cannot be split across lines.
      */}
      <h4 id="mc-sheet-heading" className="mc-live__heading mc-sheet__heading">
        <span className="mc-live__wm mc-live__wm--a">Mar</span><span className="mc-live__wm mc-live__wm--b">Command</span>
      </h4>
      <p className="mc-live__lede mc-sheet__lede">
        Our proprietary AI-powered marketing optimization platform
      </p>
    </div>
  );
}
