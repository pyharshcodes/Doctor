import { useSearchParams } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { AppointmentBookingFlow } from '../components/AppointmentBookingFlow';
import { PageTransition } from '../components/Reveal';
import { useBookings } from '../context/bookingState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function BookingPage() {
  useDocumentTitle(
    'Book an Appointment — AURELIA Medical Centre',
    'Reserve an unhurried specialist consultation at AURELIA Medical Centre through our guided 7-step interactive booking demonstration.'
  );

  const [searchParams] = useSearchParams();
  const specialtyParam = searchParams.get('specialty') || '';
  const doctorParam = searchParams.get('doctor') || '';
  const { bookings, setDrawerOpen } = useBookings();

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
                Online Appointment Concierge
              </p>
              <h1 className="font-display text-3xl sm:text-5xl text-[#102B3F]">
                Book Your Consultation
              </h1>
              <p className="text-sm sm:text-base text-[#52636C] max-w-2xl">
                Select your department, preferred specialist, date, and time in seven clear steps.
                Demonstrations persist locally in your browser.
              </p>
            </div>

            {bookings.length > 0 && (
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F1F4F3] hover:bg-[#E4EAE8] border border-[#102B3F]/15 text-xs font-semibold text-[#102B3F] rounded-sm cursor-pointer self-start sm:self-auto"
              >
                <CalendarCheck className="w-4 h-4 text-[#36A89A]" />
                <span>View Saved Demo Bookings ({bookings.length})</span>
              </button>
            )}
          </div>

          <AppointmentBookingFlow
            key={`${specialtyParam}-${doctorParam}`}
            initialSpecialtySlug={specialtyParam}
            initialDoctorSlug={doctorParam}
            compactHeader
          />
        </div>
      </section>
    </PageTransition>
  );
}
