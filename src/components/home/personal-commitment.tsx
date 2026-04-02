import { Section } from "@/components/layout/section";

export function PersonalCommitment() {
  // TODO: Tyler portrait + personal commitment statement, scroll-reveal
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          {/* TODO: Tyler portrait image */}
        </div>
        <div>
          <h2>A Personal Commitment</h2>
          <p className="mt-4 text-text-secondary">
            {/* Content from src/data — placeholder for now */}
          </p>
        </div>
      </div>
    </Section>
  );
}
