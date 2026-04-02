import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <Section dark>
      <div className="text-center">
        <h2>Ready to Automate?</h2>
        <p className="mt-4 text-text-muted max-w-xl mx-auto">
          Let&apos;s talk about how custom automation can transform your business.
        </p>
        <div className="mt-8">
          <Button href="/contact">Get in Touch</Button>
        </div>
      </div>
    </Section>
  );
}
