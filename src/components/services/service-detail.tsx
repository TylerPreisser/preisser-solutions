import { Section } from "@/components/layout/section";
import type { Service } from "@/data/services";

interface ServiceDetailProps {
  service: Service;
  reversed?: boolean;
}

export function ServiceDetail({ service, reversed = false }: ServiceDetailProps) {
  // TODO: Alternating layout (text-left/image-right, then flip), scroll-reveal
  return (
    <Section>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${reversed ? "md:[direction:rtl]" : ""}`}>
        <div className={reversed ? "md:[direction:ltr]" : ""}>
          <h3>{service.title}</h3>
          <p className="mt-4 text-text-secondary">{service.description}</p>
        </div>
        <div className={reversed ? "md:[direction:ltr]" : ""}>
          {/* TODO: Service illustration/icon */}
        </div>
      </div>
    </Section>
  );
}
