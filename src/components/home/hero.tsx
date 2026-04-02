"use client";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function Hero() {
  // TODO: GSAP SplitText headline reveal, gradient mesh background, animated entrance
  return (
    <Section dark className="min-h-screen flex items-center">
      <div className="text-center">
        <h1>Your Partner in Custom Business Automation</h1>
        <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto">
          {/* Content from src/data — placeholder for now */}
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Button href="/contact">Get Started</Button>
          <Button href="/services" variant="secondary">Our Services</Button>
        </div>
      </div>
    </Section>
  );
}
