export interface Violation {
  rule: string;
  detail: string;
}

/**
 * The end frame is VISIBLE, by computed style, not by presence (critique obj. 7).
 * Effective opacity multiplies up the ancestor chain: an element whose own
 * opacity is 1 inside an opacity-0 wrapper is invisible, and CaseStudyPage's
 * Framer sections ship exactly that without JS (CaseStudyPage.tsx:464-469).
 */
export function endStateViolations(): Violation[] {
  const V: Violation[] = [];
  const name = (el: Element) => {
    const beat = el.closest("[data-beat]")?.getAttribute("data-beat");
    const own = el.getAttribute("data-beat");
    return `${el.tagName.toLowerCase()}${own ? `[data-beat=${own}]` : ""}${beat && !own ? ` in ${beat}` : ""}`;
  };
  const effective = (el: Element) => {
    let o = 1;
    for (let e: Element | null = el; e; e = e.parentElement) o *= Number(getComputedStyle(e).opacity);
    return o;
  };
  if (!document.querySelector("[data-demo-stage]")) V.push({ rule: "no-stage", detail: "no [data-demo-stage] on this page" });

  // Named-slot check: a beat, a stepped element or the label must be RENDERED
  // at all, and a stepped element's clip-path must be fully open at rest.
  const targets = document.querySelectorAll("[data-demo-stage] [data-beat], [data-demo-stage] [data-stage-step], [data-demo-label]");
  for (const el of Array.from(targets)) {
    if (el.getClientRects().length === 0) {
      // A step in the hidden desk/phone variant or an inactive tab panel is fine; a beat or label is not.
      if (el.hasAttribute("data-beat") || el.hasAttribute("data-demo-label")) V.push({ rule: "not-rendered", detail: name(el) });
      continue;
    }
    if (el.hasAttribute("data-stage-step")) {
      const cs = getComputedStyle(el);
      if (cs.clipPath && cs.clipPath !== "none") V.push({ rule: "clip-path", detail: `${name(el)} ${cs.clipPath}` });
    }
  }

  // Whole-stage walk (review-F.md MEDIUM 3): a scene's own elements that carry
  // no data-stage-* attribute at all -- e.g. a Framer motion.div in the
  // FarmBooks scene, server-rendered with style="opacity:0" -- were invisible
  // to the check above. Walk EVERY rendered descendant of a stage. An
  // "invisible" threshold, not <0.999: the window-chrome dots are decorative
  // at opacity 0.35 (demo-stage.css) and must not be flagged.
  const INVISIBLE_OPACITY = 0.05;
  const exempt = (el: Element) =>
    Boolean(el.closest(".ps-visually-hidden, .demo-controls__buttons")) ||
    (el.hasAttribute("data-stage-until") && !el.hasAttribute("data-live"));
  for (const stage of Array.from(document.querySelectorAll("[data-demo-stage]"))) {
    for (const el of Array.from(stage.querySelectorAll("*"))) {
      if (exempt(el)) continue;
      if (el.getClientRects().length === 0) continue; // display:none, a hidden tab panel, etc.: fine
      const r = el.getBoundingClientRect();
      const hasBox = r.width > 0 && r.height > 0;
      const hasText = Boolean(el.textContent && el.textContent.trim());
      if (!hasBox && !hasText) continue; // an empty structural wrapper; its children are checked on their own
      const cs = getComputedStyle(el);
      if (cs.visibility !== "visible") {
        V.push({ rule: "visibility", detail: `${name(el)} is ${cs.visibility}` });
        continue;
      }
      const o = effective(el);
      if (o < INVISIBLE_OPACITY) V.push({ rule: "opacity", detail: `${name(el)} effective opacity ${o.toFixed(3)}` });
    }
  }

  for (const el of Array.from(document.querySelectorAll("[data-track-armed], [data-pending]"))) {
    V.push({ rule: "armed-at-rest", detail: name(el) });
  }
  for (const el of Array.from(document.querySelectorAll("[data-demo-stage] h1, [data-demo-stage] h2"))) {
    V.push({ rule: "heading", detail: name(el) });
  }
  return V;
}

/**
 * No page-level horizontal overflow, measured by boxes: body{overflow-x:hidden}
 * (globals.css:272) would clip an over-wide child silently, so scrollWidth
 * alone can read clean while content is cut off. Children of an internal
 * scroller ([data-stage-scroller]) are exempt; the scroller itself is not.
 * Also: nothing is clipped by a .demo-screen's overflow:hidden.
 */
export function overflowViolations(): Violation[] {
  const V: Violation[] = [];
  const vw = document.documentElement.clientWidth;
  const name = (el: Element) => `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").split(" ")[0]}`;
  const inScroller = (el: Element) => {
    const s = el.closest("[data-stage-scroller]");
    return Boolean(s) && s !== el;
  };
  if (document.documentElement.scrollWidth > vw + 1) {
    V.push({ rule: "page-scroll-x", detail: `scrollWidth ${document.documentElement.scrollWidth} > ${vw}` });
  }
  for (const el of Array.from(document.querySelectorAll("[data-demo-section], [data-demo-section] *"))) {
    if (inScroller(el) || el.closest(".ps-visually-hidden")) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (r.left < -1 || r.right > vw + 1) {
      V.push({ rule: "outside-viewport", detail: `${name(el)} spans ${r.left.toFixed(1)}..${r.right.toFixed(1)}, viewport 0..${vw}` });
    }
  }
  for (const screen of Array.from(document.querySelectorAll(".demo-screen"))) {
    const b = screen.getBoundingClientRect();
    if (b.width === 0) continue;
    for (const el of Array.from(screen.querySelectorAll("*"))) {
      if (inScroller(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.left < b.left - 1 || r.right > b.right + 1) {
        V.push({ rule: "clipped-in-screen", detail: `${name(el)} spans ${r.left.toFixed(1)}..${r.right.toFixed(1)}, screen ${b.left.toFixed(1)}..${b.right.toFixed(1)}` });
      }
    }
  }
  return V;
}

/** 44x44 for every visible button, link and tab in the section. */
export function tapViolations(): Violation[] {
  const V: Violation[] = [];
  const els = document.querySelectorAll<HTMLElement>("[data-demo-section] button, [data-demo-section] a[href], [data-demo-section] [role='tab']");
  for (const el of Array.from(els)) {
    if (el.getClientRects().length === 0 || getComputedStyle(el).visibility !== "visible") continue;
    const r = el.getBoundingClientRect();
    if (r.width < 43.5 || r.height < 43.5) {
      V.push({ rule: "tap-target", detail: `"${(el.textContent || "").trim().slice(0, 30)}" ${r.width.toFixed(1)}x${r.height.toFixed(1)}` });
    }
  }
  return V;
}

export function renderedStageIds(): { expected: string[]; rendered: string[] } {
  const sec = document.querySelector("[data-demo-section]");
  return {
    expected: (sec?.getAttribute("data-demo-expected") ?? "").split(" ").filter(Boolean),
    rendered: Array.from(document.querySelectorAll("[data-demo-stage]")).map((e) => e.getAttribute("data-demo-stage") ?? ""),
  };
}

export function themeReadout(): { section: string; mat: string; matEdge: string; screenEdge: string | null } {
  const cs = (sel: string) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el) : null;
  };
  const sec = cs("[data-demo-section]");
  const mat = cs(".demo-stage");
  const scr = cs(".demo-screen");
  return {
    section: sec?.backgroundColor ?? "",
    mat: mat?.backgroundColor ?? "",
    matEdge: mat?.borderTopColor ?? "",
    screenEdge: scr ? scr.borderTopColor : null,
  };
}

/** Negative control: force the real armed CSS onto a no-JS page. */
export function armEverything(): number {
  for (const t of Array.from(document.querySelectorAll("[data-track]"))) {
    t.setAttribute("data-track-armed", "");
    t.setAttribute("data-track-instant", "");
  }
  const steps = Array.from(document.querySelectorAll("[data-stage-step]"));
  for (const el of steps) el.setAttribute("data-pending", "");
  return steps.length;
}

/* Node side ------------------------------------------------------------- */

export function parseRgb(css: string): [number, number, number] {
  const n = (css.match(/[\d.]+/g) ?? []).map(Number);
  if (n.length < 3) throw new Error(`not a colour: "${css}"`);
  return [n[0], n[1], n[2]];
}

export function contrast(a: string, b: string): number {
  const lum = (c: string) => {
    const [r, g, bl] = parseRgb(c).map((v) => {
      const s = v / 255;
      return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
