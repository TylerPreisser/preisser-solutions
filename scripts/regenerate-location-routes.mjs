#!/usr/bin/env node
/**
 * Regenerates every src/app/locations/<slug>/page.tsx file to consume the
 * new LocationPage component and the new src/data/locations/<slug> data file.
 *
 * Idempotent. Safe to re-run.
 */

import { readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ROUTES_DIR = join(ROOT, "src/app/locations");

const slugs = readdirSync(ROUTES_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

const tpl = (slug) => `import type { Metadata } from "next";
import { LocationPage } from "@/components/location/LocationPage";
import { locationData } from "@/data/locations/${slug}";
import { ALL_LOCATION_SLUGS } from "@/data/locations";

export const metadata: Metadata = {
  title: locationData.metaTitle,
  description: locationData.metaDescription,
  alternates: {
    canonical: \`https://preissersolutions.com/locations/\${locationData.slug}\`,
  },
  openGraph: {
    title: locationData.metaTitle,
    description: locationData.metaDescription,
    url: \`https://preissersolutions.com/locations/\${locationData.slug}\`,
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: locationData.metaTitle,
    description: locationData.metaDescription,
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function Page() {
  return (
    <LocationPage data={locationData} allLocationSlugs={ALL_LOCATION_SLUGS} />
  );
}
`;

let touched = 0;
for (const slug of slugs) {
  const file = join(ROUTES_DIR, slug, "page.tsx");
  writeFileSync(file, tpl(slug), "utf8");
  touched += 1;
}

console.log(`Regenerated ${touched} location route files.`);
