import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Shared animation presets for consistent scroll-triggered reveals.
 * All animations check prefers-reduced-motion before running.
 */

export function fadeInUp(element: Element, options?: { delay?: number; duration?: number }) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    gsap.set(element, { opacity: 1 });
    return;
  }

  gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        once: true,
      },
    }
  );
}

export function staggerFadeInUp(elements: Element[], staggerAmount = 0.1) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    gsap.set(elements, { opacity: 1 });
    return;
  }

  gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerAmount,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elements[0],
        start: "top 85%",
        once: true,
      },
    }
  );
}
