/**
 * Static product constants — no product data imported here.
 *
 * Kept separate from index.ts so client components (e.g. ProductGrid) can
 * import these values without pulling the entire product data module graph
 * into the client JS bundle.
 */

import type { ProductCategory } from "@/types/product";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Marketing & Growth",
  "Operations & Back-Office",
  "Sales & Customer Service",
  "Decision Intelligence",
  "Custom Builds",
];
