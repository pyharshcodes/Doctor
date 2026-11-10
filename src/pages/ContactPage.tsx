import { PageTransition } from '../components/Reveal';
import { ContactLocationSection } from '../components/sections/ContactLocationSection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ContactPage() {
  useDocumentTitle(
    'Contact & Clinic Location — AURELIA Medical Centre',
    'Reach AURELIA Medical Centre concierge desk, view operating hours, location map preview, and emergency care guidance.'
  );

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] pt-14 pb-12 border-b border-[#102B3F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
            Clinic Concierge & Directions
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#102B3F]">
            We’re Here to Assist Your Visit
          </h1>
          <p className="text-base text-[#52636C] max-w-2xl">
            Contact our administrative concierge for scheduled appointments, diagnostic queries, or
            international visitor assistance.
          </p>
        </div>
      </section>

      <ContactLocationSection hideHeader />
    </PageTransition>
  );
}

