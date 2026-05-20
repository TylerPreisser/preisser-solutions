import type { Metadata } from "next";
import { LocationsHub } from "@/components/location/LocationsHub";
import { LOCATIONS_BY_SLUG, LOCATION_REGIONS } from "@/data/locations";

export const metadata: Metadata = {
  title: "Locations We Serve | Preisser Solutions",
  description:
    "Preisser Solutions is based in Hays, Kansas. Custom software, AI automation, and websites delivered across western, central, and eastern Kansas.",
  alternates: { canonical: "https://preissersolutions.com/locations" },
  openGraph: {
    title: "Locations We Serve | Preisser Solutions",
    description:
      "Preisser Solutions is based in Hays, Kansas. Custom software, AI automation, and websites delivered across Kansas.",
    url: "https://preissersolutions.com/locations",
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
    title: "Locations We Serve | Preisser Solutions",
    description:
      "Preisser Solutions is based in Hays, Kansas. Custom software, AI automation, and websites delivered across Kansas.",
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function LocationsHubPage() {
  return (
    <LocationsHub
      locationsBySlug={LOCATIONS_BY_SLUG}
      regions={LOCATION_REGIONS}
    />
  );
}
