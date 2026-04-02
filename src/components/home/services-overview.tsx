import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { services } from "@/data/services";

export function ServicesOverview() {
  // TODO: Card grid with arrow links to /services, scroll-reveal entrance
  return (
    <Section>
      <div className="text-center mb-16">
        <h2>What We Build</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.title}>
            <h3>{service.title}</h3>
            <p className="mt-2 text-text-secondary">{service.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
