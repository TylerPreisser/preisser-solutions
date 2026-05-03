// Renders <script type="application/ld+json"> blocks for AI-optimized pages.
// Each page type passes the appropriate Schema.org payload.

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helper to build common cross-linked entity references.
export const ORG_REF = { "@id": "https://preissertech.com/#organization" };
export const PERSON_REF = { "@id": "https://preissertech.com/#tyler-preisser" };
