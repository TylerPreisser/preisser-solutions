import { Hero } from "@/components/home/hero";
import { PersonalCommitment } from "@/components/home/personal-commitment";
import { ValueProps } from "@/components/home/value-props";
import { EnterpriseSection } from "@/components/home/enterprise-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { ServicesOverview } from "@/components/home/services-overview";
import { Happenings } from "@/components/home/happenings";
import { SocialProof } from "@/components/home/social-proof";
import { CtaSection } from "@/components/home/cta-section";

// Stripe-clone section order:
// 1.  Hero           — dark, animated gradient mesh, big H1, two CTAs
// 2.  Logo Bar       — gray customer logos, "trusted by" label
// 3.  Stats Bar      — 4 big numbers proving scale
// 4.  Services Grid  — "Fully integrated suite" 3x2 card grid (light)
// 5.  Enterprise     — dark, "most ambitious businesses" + 2x2 image grid
// 6.  Feature #1     — dark, text left / screenshot right (How It Works)
// 7.  Feature #2     — light, visual left / text right (Real Results)
// 8.  Happenings     — light, horizontal scrollable news cards
// 9.  Testimonials   — dark, 3-column cards with headshots
// 10. Final CTA      — dark gradient + two CTAs
// 11. Footer         — dark, 4-column link grid

export default function HomePage() {
  return (
    <>
      <Hero />
      <PersonalCommitment />
      <ValueProps />
      <EnterpriseSection />
      <HowItWorks />
      <ServicesOverview />
      <Happenings />
      <SocialProof />
      <CtaSection />
    </>
  );
}
