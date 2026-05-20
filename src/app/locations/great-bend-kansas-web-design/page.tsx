import type { Metadata } from "next";
import { LocationPage } from "@/components/location/LocationPage";
import { locationData } from "@/data/locations/great-bend-kansas-web-design";
import { ALL_LOCATION_SLUGS } from "@/data/locations";

export const metadata: Metadata = {
  title: locationData.metaTitle,
  description: locationData.metaDescription,
  alternates: {
    canonical: `https://preissersolutions.com/locations/${locationData.slug}`,
  },
  openGraph: {
    title: locationData.metaTitle,
    description: locationData.metaDescription,
    url: `https://preissersolutions.com/locations/${locationData.slug}`,
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
