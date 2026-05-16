/**
 * JSON-LD <script> renderer.
 *
 * Accepts either a single schema object or an array of schema objects. Escapes
 * any literal `<` in the serialized output so embedded URLs containing `<`
 * cannot terminate the script tag prematurely.
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
