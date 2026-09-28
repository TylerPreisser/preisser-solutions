export interface Vp {
  w: number;
  h: number;
  phone: boolean;
}

/** CLAUDE.md "Browser + viewport matrix": all fourteen, in this order. */
export const VIEWPORTS: readonly Vp[] = [
  { w: 320, h: 568, phone: true },
  { w: 360, h: 640, phone: true },
  { w: 375, h: 667, phone: true },
  { w: 390, h: 844, phone: true },
  { w: 393, h: 659, phone: true },
  { w: 393, h: 852, phone: true },
  { w: 414, h: 896, phone: true },
  { w: 430, h: 932, phone: true },
  { w: 768, h: 1024, phone: false },
  { w: 820, h: 1180, phone: false },
  { w: 1024, h: 768, phone: false },
  { w: 1280, h: 800, phone: false },
  { w: 1440, h: 900, phone: false },
  { w: 1920, h: 1080, phone: false },
];

export const vpName = (v: Vp): string => `${v.w}x${v.h}`;
