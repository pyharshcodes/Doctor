import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageTransition } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface LegalPageProps {
  mode: 'privacy' | 'terms';
}

export function LegalPage({ mode }: LegalPageProps) {
  const isPrivacy = mode === 'privacy';
  useDocumentTitle(
    isPrivacy
      ? 'Privacy Policy (Demo) — AURELIA Medical Centre'
      : 'Terms & Conditions (Demo) — AURELIA Medical Centre'
  );

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#52636C] hover:text-[#102B3F]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
          </Link>

          <div className="space-y-3 border-b border-[#102B3F]/12 pb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#856830]">
              Showcase Legal Notice
            </p>
            <h1 className="font-display text-4xl text-[#102B3F]">
              {isPrivacy ? 'Privacy Policy (Demonstration)' : 'Terms & Conditions (Demonstration)'}
            </h1>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-[#52636C] leading-relaxed">
            {isPrivacy ? (
              <>
                <p>
                  AURELIA Medical Centre is an interactive concept website created to demonstrate
                  modern medical clinic digital experience, visual hierarchy, and patient-first
                  appointment scheduling.
                </p>
                <h2 className="font-display text-2xl text-[#102B3F] pt-2">
                  Local Browser Storage Only
                </h2>
                <p>
                  Any appointment details you enter into the 7-step booking demonstration are saved
                  solely within your own browser’s <code className="text-[#102B3F]">localStorage</code>{' '}
                  under <code className="text-[#102B3F]">aurelia_demo_bookings_v1</code> so you can
                  preview reservation persistence, rescheduling, and cancellation. No health data is
                  transmitted to external servers or real medical practices.
                </p>
                <h2 className="font-display text-2xl text-[#102B3F] pt-2">
                  Clearing Demonstration Data
                </h2>
                <p>
                  You may delete any saved demo booking inside the “Demo Bookings” drawer at any
                  time, or clear site data via your browser settings.
                </p>
              </>
            ) : (
              <>
                <p>
                  By exploring the AURELIA Medical Centre showcase website, you acknowledge that all
                  clinic addresses, statistics, physician names, schedules, and testimonials are
                  illustrative demonstration content only.
                </p>
                <h2 className="font-display text-2xl text-[#102B3F] pt-2">
                  Not Medical Advice or Live Care
                </h2>
                <p>
                  This demonstration site does not provide medical advice, diagnosis, emergency
                  triage, or live appointment scheduling. If you require urgent medical attention,
                  please dial your regional emergency number immediately.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

