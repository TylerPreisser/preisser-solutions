import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { HowItWorks } from "@/components/home/how-it-works";
import { ServicesOverview } from "@/components/home/services-overview";
import { SocialProof } from "@/components/home/social-proof";
import { PersonalCommitment } from "@/components/home/personal-commitment";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <HowItWorks />
      <ServicesOverview />
      <SocialProof />
      <PersonalCommitment />
      <CtaSection />
    </>
  );
}
