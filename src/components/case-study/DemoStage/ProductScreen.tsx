import type { ReactNode } from "react";

/**
 * The product's own screen, recreated in its skin (ADR-0016 §6).
 * - Decorative to assistive tech: the stage narration and each tab's
 *   description carry the meaning. EXCEPTION: a sideways scroller must be
 *   reachable by keyboard, so it is a labeled, focusable region instead.
 * - No h1 or h2 inside (ADR-0016 §6). Prefer no headings at all.
 * - No id attributes: desk and phone variants both render, ids would repeat.
 * - Give either `phone` (a phone variant, shown below 768px) or `scroll`
 *   (an internal horizontal scroller). Never neither for a screen wider than
 *   282px (the 320x568 content width, §6).
 */
export function ProductScreen({
  chrome,
  tag,
  desk,
  phone,
  scroll,
}: {
  chrome: string;
  tag?: string;
  desk: ReactNode;
  phone?: ReactNode;
  scroll?: { label: string };
}) {
  return (
    <div className="demo-screen" data-demo-screen>
      <div className="demo-screen__chrome" aria-hidden="true">
        <span className="demo-screen__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="demo-screen__title">{chrome}</span>
        {tag ? <span className="demo-screen__tag">{tag}</span> : null}
      </div>
      {scroll ? (
        <div className="demo-screen__body demo-screen__scroller" data-stage-scroller role="region" aria-label={scroll.label} tabIndex={0}>
          {desk}
        </div>
      ) : (
        <div className="demo-screen__body" aria-hidden="true">
          <div className={phone ? "demo-screen__desk" : undefined}>{desk}</div>
          {phone ? <div className="demo-screen__phone">{phone}</div> : null}
        </div>
      )}
    </div>
  );
}
