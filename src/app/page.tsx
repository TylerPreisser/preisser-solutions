import { Hero } from "@/components/home/hero";
import { TechPartners } from "@/components/home/tech-partners";
import { ValueStrip } from "@/components/home/value-strip";
import { ProblemSection } from "@/components/home/problem-section";
import { ServicePillars } from "@/components/home/service-pillars";
import { WhyUs } from "@/components/home/why-us";
import { CaseStudies } from "@/components/home/case-studies";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <ProblemSection />
      <TechPartners />
      <ServicePillars />
      <WhyUs />
      <CaseStudies />
      <CtaSection />
    </>
  );
}
