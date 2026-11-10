import { Link, useLocation } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export function MobileStickyCta() {
  const location = useLocation();
  const isBookingPage = location.pathname === '/book';

  if (isBookingPage) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FAFAF7]/95 backdrop-blur-md border-t border-[#102B3F]/12 px-4 py-3 flex items-center gap-2.5 no-print"
      role="region"
      aria-label="Quick mobile actions"
    >
      <a
        href={CLINIC_INFO.phoneHref}
        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 border border-[#102B3F]/20 text-[#102B3F] text-xs font-medium rounded-sm bg-white/80 min-h-[44px]"
        aria-label="Call AURELIA clinic reception"
      >
        <Phone className="w-3.5 h-3.5 text-[#36A89A]" />
        <span>Call</span>
      </a>
      <Link
        to="/book"
        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm min-h-[44px]"
      >
        <Calendar className="w-4 h-4 text-[#C7A76C]" />
        <span>Book Appointment</span>
      </Link>
    </div>
  );
}

