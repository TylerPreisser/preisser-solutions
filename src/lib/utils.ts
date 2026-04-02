/**
 * Merge Tailwind class names conditionally.
 * Minimal implementation — swap for clsx/tailwind-merge if needed.
 */
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
