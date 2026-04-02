import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { valueProps } from "@/data/services";

export function ValueProps() {
  // TODO: Scroll-reveal staggered entrance (GSAP ScrollTrigger)
  return (
    <Section>
      <div className="text-center mb-16">
        <h2>Why Automation?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {valueProps.map((prop) => (
          <Card key={prop.title}>
            <h3>{prop.title}</h3>
            <p className="mt-2 text-text-secondary">{prop.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
