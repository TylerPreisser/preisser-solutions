"use client";

/**
 * scenes/farmbooks/ReadFollow.tsx — keeps a phone reader on the read when it collapses.
 *
 * Below 1024px the read shows ONE card under the pinned photo while its track is armed, and the
 * complete stack at rest (farmbooks.css, verify-FB item 1). A visitor parked anywhere in that
 * full stack who presses Back, Replay or a step re-arms the track, the stack collapses to one
 * card, and the page under them shrinks by over a thousand pixels: measured at 390, Back from
 * rest left the photo and the current card ABOVE the viewport and the reader looking at the next
 * beat. This puts the read's top back at the header line, so the pinned photo and the current
 * card are what they see. It acts only when the read was already on screen before the collapse,
 * so the mount-time arm of a below-the-fold track (useStageTimeline.ts) never moves anyone.
 * Scene-owned; the kit is untouched. Renders a hidden, boxless marker only.
 */
import { useEffect, useRef } from "react";

export function ReadFollow() {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>("[data-track]");
    const read = root?.querySelector<HTMLElement>(".fb-read");
    if (!root || !read || typeof IntersectionObserver === "undefined") return;
    let onScreen = false;
    let armed = root.hasAttribute("data-track-armed");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) onScreen = e.isIntersecting;
    });
    io.observe(read);
    const mo = new MutationObserver(() => {
      const now = root.hasAttribute("data-track-armed");
      const collapsed = now && !armed;
      armed = now;
      if (!collapsed || !onScreen || !window.matchMedia("(max-width: 1023px)").matches) return;
      const nav = parseFloat(getComputedStyle(read).getPropertyValue("--nav-height")) || 80;
      const top = read.getBoundingClientRect().top;
      if (top < nav) window.scrollTo({ top: window.scrollY + top - nav, behavior: "instant" });
    });
    mo.observe(root, { attributes: true, attributeFilter: ["data-track-armed"] });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return <span ref={ref} hidden />;
}
