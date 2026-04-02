import { Section } from "@/components/layout/section";
import { siteConfig } from "@/data/site-config";

export function BioSection() {
  // TODO: Tyler portrait, bio text, scroll-reveal
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          {/* TODO: Tyler portrait image */}
        </div>
        <div>
          <h2>Meet {siteConfig.founder.name}</h2>
          <p className="mt-4 text-text-secondary">
            {/* Content from Tyler's prompt */}
          </p>
        </div>
      </div>
    </Section>
  );
}
