import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register all GSAP plugins once here.
// Components should import from this file, not directly from gsap packages.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
