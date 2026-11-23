// Captured stills fetched and decoded once per page, shared by the window's warm-up (index.ts) and the walkthrough
// scenes (StillsWalkthrough), so a still the window warmed is in the browser's cache when its tab is chosen.

const decodes = new Map<string, Promise<void>>();

/** Fetch and decode a still (once per page). A failed decode resolves too, so a broken still cannot stop a film. */
export function decodeStill(src: string): Promise<void> {
  let p = decodes.get(src);
  if (!p) {
    const im = new Image();
    im.decoding = "async";
    im.src = src;
    p = im.decode().catch(() => undefined);
    decodes.set(src, p);
  }
  return p;
}
