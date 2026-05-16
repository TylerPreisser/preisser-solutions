import Image from "next/image";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/data/site-config";

/**
 * BioSection — long-form founder bio for the About page.
 *
 * Renders the structured bio defined in `siteConfig.founder.bio` (R-057,
 * R-059). Six required sections in order: Origin, Education, Industries,
 * Inventions, AI & consulting, Operating philosophy. Total prose ≥1000 words.
 *
 * Content is owned by the data file — this component only renders. Never
 * hardcode bio paragraphs in JSX (project convention).
 */
export function BioSection() {
  const { founder } = siteConfig;
  const { bio, headshot } = founder;

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 md:gap-16 items-start">
        {/* Headshot — uses next/image with priority for LCP on About hero. */}
        {/* If the headshot file is missing, the build will fail loudly — */}
        {/* preferable to a silent fallback for a founder portrait. */}
        <div>
          <Image
            src={headshot.src}
            alt={headshot.alt}
            width={headshot.width}
            height={headshot.height}
            priority
            sizes="(max-width: 768px) 100vw, 320px"
            style={{
              width: "100%",
              maxWidth: 320,
              height: "auto",
              borderRadius: 16,
              boxShadow: "var(--shadow-lg)",
              display: "block",
            }}
          />
        </div>

        <div>
          <span className="ps-eyebrow-light">{founder.title}</span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--color-text-dark)",
              margin: "0 0 20px",
              lineHeight: 1.15,
            }}
          >
            {founder.name}
          </h2>

          {/* Lead paragraph — consultant identity first. */}
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "var(--color-text-body)",
              margin: "0 0 32px",
            }}
          >
            {bio.lead}
          </p>

          {/* Six required sections, rendered from data. */}
          {(bio.sections as ReadonlyArray<{ heading: string; paragraphs: readonly string[]; bullets?: readonly string[] }>).map((section) => (
            <div key={section.heading} style={{ marginBottom: 36 }}>
              <h3
                style={{
                  fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                  color: "var(--color-text-dark)",
                  margin: "0 0 14px",
                  lineHeight: 1.2,
                }}
              >
                {section.heading}
              </h3>
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 17,
                    lineHeight: 1.7,
                    color: "var(--color-text-body)",
                    margin: "0 0 16px",
                  }}
                >
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul
                  style={{
                    paddingLeft: 22,
                    margin: "8px 0 0",
                    listStyle: "disc",
                  }}
                >
                  {section.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 17,
                        lineHeight: 1.7,
                        color: "var(--color-text-body)",
                        marginBottom: 10,
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
