// src/data/showcase/index.ts — what the HOME page needs to open a showcase.
// The client files are fetched on intent, one chunk each: webpack turns the
// template import below into a lazy chunk per file in ./clients, so adding a
// client is adding a file there (and `showcase: "<slug>"` on its home card).
import type { LoadingStill, ShowcaseClient, SiteCapture } from "./types";

export type ShowcaseSlug = string;

const cache = new Map<string, Promise<ShowcaseClient>>();
const loaded = new Map<string, ShowcaseClient>();

export function loadShowcase(slug: ShowcaseSlug): Promise<ShowcaseClient> {
  let p = cache.get(slug);
  if (!p) {
    p = import(`./clients/${slug}`).then((m: { default: ShowcaseClient }) => {
      loaded.set(slug, m.default);
      return m.default;
    });
    p.catch(() => cache.delete(slug));
    cache.set(slug, p);
  }
  return p;
}

/** The client's data if it has already arrived, else null: lets the window draw it in its first frame. */
export function peekShowcase(slug: ShowcaseSlug): ShowcaseClient | null {
  return loaded.get(slug) ?? null;
}

/** The narrowest width a desktop frame renders at; a narrower view scales it down to fit (design spec §3.4). */
const DESK_RENDER_W = 1024;
/** Below this scale the client's own narrower layout reads better than a shrunken desktop. */
const MIN_SCALE = 0.8;

/** Render width and scale of a desktop-variant frame in a view this wide (§3.4). */
export function frameScale(vw: number) {
  if (vw >= DESK_RENDER_W) return { w: vw, s: 1 };
  const s = vw / DESK_RENDER_W;
  if (s >= MIN_SCALE) return { w: DESK_RENDER_W, s };
  return { w: vw, s: 1 };
}

/**
 * The Website tab's view width before it is measured, from the window's own CSS (showcase.css: the sheet's 12 px
 * sides, the window's min(100% - 96px, 1248px) with 12 px sides, the panel's 1 px border).
 */
export function estimateViewWidth(innerWidth: number, sheet: boolean) {
  return (sheet ? innerWidth : Math.min(innerWidth - 96, 1248)) - 26;
}

/** The loading still for a frame rendering this wide: the capture whose width is closest. */
export function loadingStill(cap: SiteCapture, renderW: number): LoadingStill | undefined {
  const all = [...(cap.first ? [cap.first] : []), ...(cap.firstAt ?? [])];
  if (!all.length) return undefined;
  if (!(renderW > 0)) return cap.first ?? all[0];
  return all.reduce((best, c) => (Math.abs(c.width - renderW) < Math.abs(best.width - renderW) ? c : best), all[0]);
}

/** Fetch the client's data and its first website capture, so the window opens on a painted site. */
export function warmShowcase(slug: ShowcaseSlug, wide: boolean) {
  loadShowcase(slug)
    .then((c) => {
      const web = c.beats.find((b) => b.kind === "website");
      if (!web || web.kind !== "website") return;
      const cap = wide ? web.desk : web.phone;
      // The loading still for this window's frame width shows first and the dated full page is the fallback, so
      // both are warmed; a video hero's poster too.
      const sheet = !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.innerWidth < 900;
      const view = estimateViewWidth(window.innerWidth, sheet);
      const first = loadingStill(cap, wide ? frameScale(view).w : view);
      for (const src of [...(first ? [first.src] : []), cap.src, ...(cap.video ? [cap.video.poster] : [])]) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
      }
    })
    .catch(() => {});
}
