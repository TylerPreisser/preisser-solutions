/**
 * Breadcrumb utilities for structured data (BreadcrumbList JSON-LD).
 *
 * Usage — call in any server component page.tsx that wants per-page breadcrumbs:
 *
 *   import { buildBreadcrumbs } from "@/lib/breadcrumbs";
 *
 *   // In JSX:
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbs([
 *       { name: "Services", url: "https://preissertech.com/services" },
 *     ])) }}
 *   />
 *
 * Home (position 1) is always prepended automatically.
 *
 * AEO pages already emit BreadcrumbList via AeoPage.tsx — do not double-emit.
 */

const BASE_URL = "https://preissertech.com";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbs(items: BreadcrumbItem[]) {
  const allItems = [
    { name: "Home", url: BASE_URL },
    ...items,
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Convenience: build breadcrumbs from a route path string.
 *
 * buildBreadcrumbsFromPath("/services/custom-crm")
 * → Home > Services > Custom CRM
 *
 * Uses title-case conversion on slugs. For fine-grained control, use
 * buildBreadcrumbs() directly with explicit names.
 */
export function buildBreadcrumbsFromPath(path: string): ReturnType<typeof buildBreadcrumbs> {
  const segments = path.replace(/^\//, "").split("/").filter(Boolean);

  const items: BreadcrumbItem[] = segments.map((segment, index) => {
    const url = `${BASE_URL}/${segments.slice(0, index + 1).join("/")}`;
    const name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { name, url };
  });

  return buildBreadcrumbs(items);
}
