import { AppointmentBookingFlow } from '../components/AppointmentBookingFlow';
import { Reveal } from '../components/Reveal';
import { PageTransition } from '../components/Reveal';
import { AboutEditorialSection } from '../components/sections/AboutEditorialSection';
import { ContactLocationSection } from '../components/sections/ContactLocationSection';
import { DoctorsShowcaseSection } from '../components/sections/DoctorsShowcaseSection';
import { FacilitiesGallerySection } from '../components/sections/FacilitiesGallerySection';
import { FaqSection } from '../components/sections/FaqSection';
import { HeroSection } from '../components/sections/HeroSection';
import { SpecialtiesSection } from '../components/sections/SpecialtiesSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { TrustCredibilitySection } from '../components/sections/TrustCredibilitySection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function HomePage() {
  useDocumentTitle(
    'AURELIA Medical Centre — Personalized Multi-Specialty Healthcare',
    'Personalized medical care, experienced specialists, and modern diagnostic facilities across Cardiology, Neurology, Orthopedics, Dermatology, Pediatrics, Gynecology, Dentistry, and General Medicine.'
  );

  return (
    <PageTransition>
      <HeroSection />
      <TrustCredibilitySection />
      <SpecialtiesSection />
      <DoctorsShowcaseSection />

      {/* Interactive Appointment Booking Showcase */}
      <section
        id="booking"
        aria-label="Interactive appointment booking experience"
        className="bg-[#FAFAF7] py-20 lg:py-28 border-b border-[#102B3F]/10"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10">
          <Reveal>
            <div className="max-w-2xl space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
                Seamless Scheduling
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#102B3F] leading-tight">
                Book Your Consultation in Seven Guided Steps
              </h2>
              <p className="text-sm sm:text-base text-[#52636C]">
                Experience our transparent appointment flow—from specialty selection and real-time
                slot availability to instant local confirmation.
              </p>
            </div>
          </Reveal>

          <AppointmentBookingFlow />
        </div>
      </section>

      <AboutEditorialSection />
      <TestimonialsSection />
      <FacilitiesGallerySection />
      <FaqSection />
      <ContactLocationSection />
    </PageTransition>
  );
}

