/**
 * Per-page Metadata factory.
 *
 * Wrapper around Next.js `Metadata` that fills in canonical URL, OG, Twitter,
 * and robots defaults from `seoSite`. Pages call this in their `generateMetadata`
 * (or export `metadata`) to stay consistent without re-hand-rolling every field.
 *
 * `path` must begin with `/`. Pass `noIndex: true` to mark the page noindex.
 */

import type { Metadata } from "next";
import { seoSite } from "./site";

export interface CreatePageMetadataInput {
  title: string;
  description: string;
  /** Path beginning with `/`. */
  path: string;
  /** Absolute or root-relative path to OG image. Defaults to /og-image.png. */
  image?: string;
  /** Set true to noindex/nofollow this page. */
  noIndex?: boolean;
}

export function createPageMetadata(input: CreatePageMetadataInput): Metadata {
  const canonical = `${seoSite.url}${input.path}`;
  const image = input.image ?? "/og-image.png";
  const absoluteImage = image.startsWith("http")
    ? image
    : `${seoSite.url}${image}`;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: seoSite.name,
      title: input.title,
      description: input.description,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [absoluteImage],
      creator: "@tylerpreisser",
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
