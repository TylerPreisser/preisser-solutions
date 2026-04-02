import { Hero } from "@/components/home/hero";
import { ValueStrip } from "@/components/home/value-strip";
import { ProblemSection } from "@/components/home/problem-section";
import { ServicePillars } from "@/components/home/service-pillars";
import { WhyUs } from "@/components/home/why-us";
import { Results } from "@/components/home/results";
import { CaseStudies } from "@/components/home/case-studies";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <ProblemSection />
      <ServicePillars />
      <WhyUs />
      <Results />
      <CaseStudies />
      <CtaSection />
    </>
  );
}
