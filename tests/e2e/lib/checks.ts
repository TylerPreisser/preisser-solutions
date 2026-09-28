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
  // to the check above. Walk EVERY rendered descendant of a stage.
  // ADR-0016 §3: the end frame ships FULLY VISIBLE, not merely non-zero, so a
  // resting element's computed ancestor-product opacity must be at least 0.9.
  // Exemptions: the resting before-state subtree (matched via closest(), so a
  // plain child of a hidden [data-stage-until] element is covered too, not
  // just the element carrying the attribute itself); and the window-chrome's
  // own purely decorative leaves (the three dots, opacity 0.35 by design) --
  // see the exempt() comment below for why this is scoped to
  // .demo-screen__chrome specifically, not to aria-hidden generally.
  const RESTING_OPACITY_MIN = 0.9;
  const exempt = (el: Element) => {
    if (el.closest(".ps-visually-hidden, .demo-controls__buttons, [data-stage-until]:not([data-live])")) return true;
    // review-F2.md MEDIUM A: this used to be "any effectively aria-hidden
    // element with no text of its own", but ProductScreen.tsx:43 puts
    // aria-hidden="true" on the WHOLE non-scroller screen body, so that
    // let any textless graphic anywhere inside a screen -- a chart, a bar,
    // an icon, an <img> -- rest at opacity 0 and stay green. ADR-0016 §3
    // requires the end frame to ship FULLY VISIBLE; aria-hidden says
    // nothing about whether sighted users can see it. Scope the decorative
    // exemption to the kit's own window-chrome only (the three dots), not
    // to aria-hidden generally: chrome's title text is a sibling of the
    // dots under the same wrapper and must stay checked, which the no-text
    // test below still guarantees.
    if (!el.closest(".demo-screen__chrome")) return false;
    return !(el.textContent && el.textContent.trim()) && !el.matches("img, svg, canvas, video") && !el.querySelector("img, svg, canvas, video");
  };
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
      if (o < RESTING_OPACITY_MIN) V.push({ rule: "opacity", detail: `${name(el)} effective opacity ${o.toFixed(3)}` });
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
 * Same rules as endStateViolations, scoped to ONE [data-track] element and
 * its own subtree only. useStageTimeline arms every below-the-fold track at
 * MOUNT by design (useStageTimeline.ts: `dispatch({type:"arm"})` before the
 * IO even attaches), so a page-wide check after interacting with a single
 * track sees every OTHER not-yet-scrolled-to track still armed and pending,
 * which is correct, not a defect (review-F.md HIGH 1 follow-up; Lane FB's
 * diagnosis on a 4-track stage). Call via `locator.evaluate(trackEndStateViolations)`,
 * which passes the matched element as the first argument.
 */
export function trackEndStateViolations(track: Element): Violation[] {
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
  const RESTING_OPACITY_MIN = 0.9;
  const exempt = (el: Element) => {
    if (el.closest(".ps-visually-hidden, .demo-controls__buttons, [data-stage-until]:not([data-live])")) return true;
    // review-F2.md MEDIUM A: this used to be "any effectively aria-hidden
    // element with no text of its own", but ProductScreen.tsx:43 puts
    // aria-hidden="true" on the WHOLE non-scroller screen body, so that
    // let any textless graphic anywhere inside a screen -- a chart, a bar,
    // an icon, an <img> -- rest at opacity 0 and stay green. ADR-0016 §3
    // requires the end frame to ship FULLY VISIBLE; aria-hidden says
    // nothing about whether sighted users can see it. Scope the decorative
    // exemption to the kit's own window-chrome only (the three dots), not
    // to aria-hidden generally: chrome's title text is a sibling of the
    // dots under the same wrapper and must stay checked, which the no-text
    // test below still guarantees.
    if (!el.closest(".demo-screen__chrome")) return false;
    return !(el.textContent && el.textContent.trim()) && !el.matches("img, svg, canvas, video") && !el.querySelector("img, svg, canvas, video");
  };
  for (const el of [track, ...Array.from(track.querySelectorAll("*"))]) {
    if (exempt(el)) continue;
    if (el.getClientRects().length === 0) continue;
    const r = el.getBoundingClientRect();
    const hasBox = r.width > 0 && r.height > 0;
    const hasText = Boolean(el.textContent && el.textContent.trim());
    if (!hasBox && !hasText) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility !== "visible") {
      V.push({ rule: "visibility", detail: `${name(el)} is ${cs.visibility}` });
      continue;
    }
    const o = effective(el);
    if (o < RESTING_OPACITY_MIN) V.push({ rule: "opacity", detail: `${name(el)} effective opacity ${o.toFixed(3)}` });
  }
  for (const el of Array.from(track.querySelectorAll("[data-stage-step]"))) {
    const cs = getComputedStyle(el);
    if (cs.clipPath && cs.clipPath !== "none") V.push({ rule: "clip-path", detail: `${name(el)} ${cs.clipPath}` });
  }
  if (track.hasAttribute("data-track-armed") || track.hasAttribute("data-pending")) {
    V.push({ rule: "armed-at-rest", detail: name(track) });
  }
  for (const el of Array.from(track.querySelectorAll("[data-track-armed], [data-pending]"))) {
    V.push({ rule: "armed-at-rest", detail: name(el) });
  }
  for (const el of Array.from(track.querySelectorAll("h1, h2"))) {
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

/**
 * Geometry for the "Take the tour" scroll fix (review-NW.md B3): is the
 * active panel's top just under the tab bar, and is the active tab visible
 * inside the bar's own horizontal scroller (`.demo-tabs__list`, not the
 * whole bar -- a tab can sit inside the bar's rect while scrolled out of the
 * list's own clip region, which is the exact bug B3 measured: "Cabins at
 * 356-436... against a list right edge of 365"). Returns null when the page
 * has no tabbed screen to check (most stages).
 *
 * `floor` is the lower of the bar's own bottom and the tour-caption row's
 * bottom (`.demo-tabs__tourcap`, which always reserves height via
 * `min-height: 1.55em` whether or not it holds text): on phone/tablet the
 * bar is `position: sticky` and paints BELOW the caption's own flow position
 * (sticky repositions only the bar's own paint, not its siblings' layout, so
 * the caption's rect can sit entirely inside the bar's, hidden underneath
 * it -- a pre-existing overlap, not introduced by this fix); on desktop the
 * bar is static and the caption sits below it, a real `.demo-beat { gap:
 * 14px }` row away from the panel. Either way, `floor` is whichever one the
 * panel must clear.
 */
export function tourPanelGeometry(): {
  viewportH: number;
  bar: { top: number; bottom: number };
  list: { left: number; right: number };
  tab: { top: number; bottom: number; left: number; right: number };
  panelTop: number;
  floor: number;
} | null {
  const bar = document.querySelector(".demo-tabs__bar");
  const list = document.querySelector(".demo-tabs__list");
  const tourcap = document.querySelector(".demo-tabs__tourcap");
  const tab = document.querySelector('.demo-tabs__tab[aria-selected="true"]');
  const panel = document.querySelector('[role="tabpanel"]:not([hidden])');
  if (!bar || !list || !tourcap || !tab || !panel) return null;
  const b = bar.getBoundingClientRect();
  const l = list.getBoundingClientRect();
  const c = tourcap.getBoundingClientRect();
  const t = tab.getBoundingClientRect();
  const p = panel.getBoundingClientRect();
  return {
    viewportH: window.innerHeight,
    bar: { top: b.top, bottom: b.bottom },
    list: { left: l.left, right: l.right },
    tab: { top: t.top, bottom: t.bottom, left: t.left, right: t.right },
    panelTop: p.top,
    floor: Math.max(b.bottom, c.bottom),
  };
}

/**
 * Geometry for the phone control-bar occlusion fix (critic-BO.md B1: "a step
 * that reveals an element below the fold lands UNDER the sticky phone control
 * bar"). Call via `track.evaluate(stepBarOcclusion)`, so `track` is the
 * matched `[data-track]` element and the scoping matches
 * `useStageTimeline.ts`'s own `own()` helper (elements whose closest
 * `[data-track]` is this one, not a nested tabbed panel).
 *
 * Returns null when this track has no `.demo-controls` bar (should not
 * happen; every track renders one) or the bar is not `position: sticky`
 * (desktop, or a phone width the CSS treats as desktop) -- there is nothing
 * to occlude with in that case.
 */
export function stepBarOcclusion(track: Element): { elBottom: number; barTop: number; occludedPx: number } | null {
  const bar = track.querySelector<HTMLElement>(".demo-controls");
  if (!bar || getComputedStyle(bar).position !== "sticky") return null;
  const step = Number(track.getAttribute("data-track-step") ?? "0");
  let el: Element | null = null;
  let elStep = -1;
  for (const e of Array.from(track.querySelectorAll("[data-stage-step]"))) {
    if (e.closest("[data-track]") !== track) continue; // a nested tabbed panel's own step; tracks never nest, but be explicit
    const k = Number((e as HTMLElement).dataset.stageStep);
    if (k <= step && k > elStep) {
      el = e;
      elStep = k;
    }
  }
  if (!el) return null;
  const elBottom = el.getBoundingClientRect().bottom;
  const barTop = bar.getBoundingClientRect().top;
  return { elBottom, barTop, occludedPx: elBottom - barTop };
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
