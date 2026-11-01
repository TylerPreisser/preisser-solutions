// src/data/showcase/index.ts — what the HOME page needs to open a showcase.
// The client files are fetched on intent, one chunk each: webpack turns the
// template import below into a lazy chunk per file in ./clients, so adding a
// client is adding a file there (and `showcase: "<slug>"` on its home card).
import type { ShowcaseClient } from "./types";

export type ShowcaseSlug = string;

const cache = new Map<string, Promise<ShowcaseClient>>();

export function loadShowcase(slug: ShowcaseSlug): Promise<ShowcaseClient> {
  let p = cache.get(slug);
  if (!p) {
    p = import(`./clients/${slug}`).then((m: { default: ShowcaseClient }) => m.default);
    p.catch(() => cache.delete(slug));
    cache.set(slug, p);
  }
  return p;
}

/** Fetch the client's data and its first website capture, so the window opens on a painted site. */
export function warmShowcase(slug: ShowcaseSlug, wide: boolean) {
  loadShowcase(slug)
    .then((c) => {
      const web = c.beats.find((b) => b.kind === "website");
      if (!web || web.kind !== "website") return;
      const img = new Image();
      img.decoding = "async";
      img.src = wide ? web.desk.src : web.phone.src;
    })
    .catch(() => {});
}
