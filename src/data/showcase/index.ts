// src/data/showcase/index.ts — what the HOME page needs to open a showcase.
// The client files are fetched on intent, one chunk each: webpack turns the
// template import below into a lazy chunk per file in ./clients, so adding a
// client is adding a file there (and `showcase: "<slug>"` on its home card).
import type { ShowcaseClient } from "./types";
import { decodeStill } from "./still-decode";

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

/** Fetch the client's data and its first website capture, so the window opens on a painted site; and each
 *  walkthrough tab's first still, decoded, so that tab opens on its picture rather than waiting for the download. */
export function warmShowcase(slug: ShowcaseSlug, wide: boolean) {
  loadShowcase(slug)
    .then((c) => {
      const scenes = c.beats.flatMap((b) => (b.kind === "scene" ? [b.scene] : []));
      if (scenes.length)
        import("./scenes/walk-first")
          .then(({ WALK_FIRST }) => {
            for (const id of scenes) {
              const f = WALK_FIRST[id];
              if (!f) continue;
              void decodeStill(wide ? f.desk : f.phone);
              // Its inline preview too, so the tab's first frame already has it.
              if (f.poster) void decodeStill(f.poster);
            }
          })
          .catch(() => {});
      const web = c.beats.find((b) => b.kind === "website");
      if (!web || web.kind !== "website") return;
      const cap = wide ? web.desk : web.phone;
      // The entrance still shows first and the finished one is the fallback, so both are warmed; a video hero's poster too.
      for (const src of [...(cap.first ? [cap.first.src] : []), cap.src, ...(cap.video ? [cap.video.poster] : [])]) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
      }
    })
    .catch(() => {});
}
