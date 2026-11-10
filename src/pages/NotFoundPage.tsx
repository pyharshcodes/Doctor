import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { PageTransition } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('Page Not Found (404) — AURELIA Medical Centre');

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] py-24 lg:py-32">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <p className="font-display text-7xl sm:text-8xl text-[#102B3F]/20 tabular-nums">404</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
            Directory Notice
          </p>
          <h1 className="font-display text-3xl sm:text-5xl text-[#102B3F]">
            We Couldn’t Locate That Page
          </h1>
          <p className="text-sm sm:text-base text-[#52636C]">
            The requested department or consultation dossier may have moved. Return to our clinic
            overview or schedule a visit directly.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#102B3F]/20 text-[#102B3F] text-sm font-medium rounded-sm hover:bg-[#F1F4F3]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm hover:bg-[#193D57]"
            >
              <Calendar className="w-4 h-4 text-[#C7A76C]" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

