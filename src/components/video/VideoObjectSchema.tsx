/**
 * VideoObjectSchema — schema.org VideoObject JSON-LD emitter.
 *
 * R-094 / R-168 (Phase 4.9). Placeholder component used to wire YouTube
 * case-study videos into the page's structured-data graph. Until Tyler
 * actually ships a case-study video, this component should NOT be rendered
 * on a page — Google penalizes VideoObject schema that points at videos
 * that don't load (or don't exist).
 *
 * When wiring a real video:
 *   1. Upload to YouTube (public, transcript edited for accuracy)
 *   2. Add this component to the corresponding case-study page
 *   3. Populate every prop with real values
 *   4. Verify with Rich Results Test before merging
 *
 * Minimal valid VideoObject shape per schema.org spec:
 *   name, description, thumbnailUrl, uploadDate are REQUIRED
 *   contentUrl, embedUrl, duration (ISO 8601), and videoUrl are RECOMMENDED
 *
 * See: https://schema.org/VideoObject
 *      https://developers.google.com/search/docs/appearance/structured-data/video
 */

interface VideoObjectSchemaProps {
  /** Public-facing watch URL (e.g. https://www.youtube.com/watch?v=…) */
  videoUrl: string;
  /** Thumbnail image URL — must be publicly resolvable */
  thumbnailUrl: string;
  /** Video title (used as schema.org `name`) */
  name: string;
  /** 1-2 sentence description of the video content */
  description: string;
  /** ISO 8601 date string, e.g. "2026-06-01" */
  uploadDate: string;
  /** ISO 8601 duration string, e.g. "PT5M12S" for 5 min 12 sec */
  duration: string;
  /** Direct content URL (e.g. CDN mp4); optional but recommended */
  contentUrl?: string;
  /** Embed URL (e.g. https://www.youtube.com/embed/…); optional but recommended */
  embedUrl?: string;
  /** Optional publisher org @id reference (defaults to Preisser Solutions) */
  publisherId?: string;
}

const ORG_ID = "https://preissersolutions.com/#organization";

export function VideoObjectSchema({
  videoUrl,
  thumbnailUrl,
  name,
  description,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  publisherId = ORG_ID,
}: VideoObjectSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate,
    duration,
    url: videoUrl,
    publisher: { "@id": publisherId },
  };

  if (contentUrl) schema.contentUrl = contentUrl;
  if (embedUrl) schema.embedUrl = embedUrl;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
