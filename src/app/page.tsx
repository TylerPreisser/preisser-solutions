import { Hero } from "@/components/home/hero";
import { PersonalCommitment } from "@/components/home/personal-commitment";
import { ValueProps } from "@/components/home/value-props";
import { HowItWorks } from "@/components/home/how-it-works";
import { ServicesOverview } from "@/components/home/services-overview";
import { SocialProof } from "@/components/home/social-proof";
import { CtaSection } from "@/components/home/cta-section";

// Home page section order:
// 1. Hero (dark, full-viewport, animated gradient)
// 2. Logo Bar + Stats Bar (PersonalCommitment component handles both)
// 3. Service Cards Grid (ValueProps — light section)
// 4. Feature Showcase #1 (HowItWorks — dark, text left / visual right)
// 5. Feature Showcase #2 (ServicesOverview — light, visual left / text right)
// 6. Testimonials (SocialProof — dark)
// 7. CTA Section (CtaSection — dark gradient)

export default function HomePage() {
  return (
    <>
      <Hero />
      <PersonalCommitment />
      <ValueProps />
      <HowItWorks />
      <ServicesOverview />
      <SocialProof />
      <CtaSection />
    </>
  );
}
