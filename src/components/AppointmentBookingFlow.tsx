import { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarPlus,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit3,
  Info,
  Loader2,
  Printer,
  ShieldCheck,
  User,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  CLINIC_INFO,
  DOCTORS,
  SPECIALTIES,
  getDoctorBySlug,
  getDoctorsForSpecialty,
  getSpecialtyBySlug,
} from '../data/clinicData';
import type { DemoBooking } from '../context/bookingState';
import { useBookings } from '../context/bookingState';
import { SpecialtyIcon } from './SpecialtyIcon';

const TODAY_MIDNIGHT_TS = (() => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
})();

interface AppointmentBookingFlowProps {
  initialSpecialtySlug?: string;
  initialDoctorSlug?: string;
  compactHeader?: boolean;
}

const STEPS = [
  { number: 1, label: 'Specialty' },
  { number: 2, label: 'Specialist' },
  { number: 3, label: 'Date' },
  { number: 4, label: 'Time' },
  { number: 5, label: 'Details' },
  { number: 6, label: 'Review' },
  { number: 7, label: 'Confirmed' },
];

const QUICK_REASONS = [
  'Initial Specialist Consultation',
  'Follow-up Evaluation',
  'Second Opinion Review',
  'Preventive Annual Screening',
];

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatReadableDate(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getNextAvailableDates(availableDays: number[], count = 4): string[] {
  const results: string[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);
  let guard = 0;
  while (results.length < count && guard < 45) {
    if (availableDays.includes(cursor.getDay())) {
      results.push(toISODate(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
    guard += 1;
  }
  return results;
}

function buildIcsContent(booking: DemoBooking): string {
  const [y, m, d] = booking.dateISO.split('-').map(Number);
  const match = booking.timeSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let hours = 10;
  let minutes = 0;
  if (match) {
    hours = Number(match[1]);
    minutes = Number(match[2]);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
  }
  const start = new Date(y, m - 1, d, hours, minutes);
  const end = new Date(start.getTime() + 40 * 60 * 1000);
  const fmt = (dt: Date) =>
    `${dt.getFullYear()}${String(dt.getMonth() + 1).padStart(2, '0')}${String(
      dt.getDate()
    ).padStart(2, '0')}T${String(dt.getHours()).padStart(2, '0')}${String(
      dt.getMinutes()
    ).padStart(2, '0')}00`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AURELIA Medical Centre//Demo Booking//EN',
    'BEGIN:VEVENT',
    `UID:${booking.referenceCode}@aurelia-clinic.example`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:AURELIA Consultation (Demo) — ${booking.doctorName}`,
    `LOCATION:${CLINIC_INFO.addressLine1}`,
    `DESCRIPTION:Reference ${booking.referenceCode}. Specialty: ${booking.specialtyName}. Demonstration booking only.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

interface FormFields {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  reason: string;
  isFirstVisit: boolean;
}

type FieldErrors = Partial<Record<'patientName' | 'patientPhone' | 'patientEmail' | 'reason', string>>;

export function AppointmentBookingFlow({
  initialSpecialtySlug = '',
  initialDoctorSlug = '',
  compactHeader = false,
}: AppointmentBookingFlowProps) {
  const { addBooking, isSlotBooked, setDrawerOpen, bookings } = useBookings();
  const prefersReducedMotion = useReducedMotion();

  const resolvedDoctor = initialDoctorSlug ? getDoctorBySlug(initialDoctorSlug) : undefined;
  const resolvedSpecialty =
    (initialSpecialtySlug && getSpecialtyBySlug(initialSpecialtySlug)?.slug) ||
    resolvedDoctor?.specialtySlug ||
    '';

  const [step, setStep] = useState<number>(() => {
    if (resolvedDoctor) return 3;
    if (resolvedSpecialty) return 2;
    return 1;
  });

  const [selectedSpecialtySlug, setSelectedSpecialtySlug] = useState<string>(resolvedSpecialty);
  const [selectedDoctorSlug, setSelectedDoctorSlug] = useState<string>(
    resolvedDoctor?.slug || ''
  );
  const [selectedDateISO, setSelectedDateISO] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [form, setForm] = useState<FormFields>({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    reason: '',
    isFirstVisit: true,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [stepError, setStepError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<DemoBooking | null>(null);

  const activeSpecialty = getSpecialtyBySlug(selectedSpecialtySlug);
  const matchingDoctors = useMemo(() => {
    if (!selectedSpecialtySlug) return DOCTORS;
    const filtered = getDoctorsForSpecialty(selectedSpecialtySlug);
    return filtered.length > 0 ? filtered : DOCTORS;
  }, [selectedSpecialtySlug]);

  const activeDoctor = getDoctorBySlug(selectedDoctorSlug);
  const quickDates = useMemo(
    () => (activeDoctor ? getNextAvailableDates(activeDoctor.availableDays, 4) : []),
    [activeDoctor]
  );

  const validateFields = (values: FormFields): FieldErrors => {
    const errs: FieldErrors = {};
    if (!values.patientName.trim() || values.patientName.trim().length < 2) {
      errs.patientName = 'Please enter the patient’s full name.';
    }
    const digits = values.patientPhone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      errs.patientPhone = 'Enter a valid 10-digit phone number (or international format).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.patientEmail.trim())) {
      errs.patientEmail = 'Please enter a valid email address for confirmation.';
    }
    if (!values.reason.trim() || values.reason.trim().length < 8) {
      errs.reason = 'Please briefly describe your consultation goal (at least 8 characters).';
    }
    return errs;
  };

  const fieldErrors = useMemo(() => validateFields(form), [form]);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<{
      date: Date | null;
      iso: string;
      dayNum: number;
      disabled: boolean;
    }> = [];

    for (let i = 0; i < firstWeekday; i++) {
      cells.push({ date: null, iso: `empty-${i}`, dayNum: 0, disabled: true });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dt = new Date(year, month, day);
      const iso = toISODate(dt);
      const isPast = dt.getTime() <= TODAY_MIDNIGHT_TS; // Next-day earliest booking for clean demo
      const dayOfWeek = dt.getDay();
      const doctorWorks = activeDoctor ? activeDoctor.availableDays.includes(dayOfWeek) : dayOfWeek !== 0;
      cells.push({
        date: dt,
        iso,
        dayNum: day,
        disabled: isPast || !doctorWorks,
      });
    }
    return cells;
  }, [calendarMonth, activeDoctor]);

  const handleSelectSpecialty = (slug: string) => {
    setSelectedSpecialtySlug(slug);
    const docs = getDoctorsForSpecialty(slug);
    setSelectedDoctorSlug(docs.length === 1 ? docs[0].slug : '');
    setSelectedDateISO('');
    setSelectedTimeSlot('');
    setStepError('');
    setStep(2);
  };

  const handleSelectDoctor = (slug: string) => {
    setSelectedDoctorSlug(slug);
    setSelectedDateISO('');
    setSelectedTimeSlot('');
    setStepError('');
    setStep(3);
  };

  const handleNextFromStep = (currentStep: number) => {
    setStepError('');
    if (currentStep === 1 && !selectedSpecialtySlug) {
      setStepError('Please choose a medical specialty to continue.');
      return;
    }
    if (currentStep === 2 && !selectedDoctorSlug) {
      setStepError('Please select a consulting specialist.');
      return;
    }
    if (currentStep === 3 && !selectedDateISO) {
      setStepError('Please select an available consultation date.');
      return;
    }
    if (currentStep === 4 && !selectedTimeSlot) {
      setStepError('Please choose a preferred appointment time slot.');
      return;
    }
    if (currentStep === 5) {
      setTouched({
        patientName: true,
        patientPhone: true,
        patientEmail: true,
        reason: true,
      });
      if (Object.keys(fieldErrors).length > 0) {
        setStepError('Please correct the highlighted patient details before reviewing.');
        return;
      }
    }
    setStep(currentStep + 1);
  };

  const handleConfirmBooking = (simulateError = false) => {
    if (!activeSpecialty || !activeDoctor || !selectedDateISO || !selectedTimeSlot) {
      setSubmitError('Appointment selection is incomplete. Please review previous steps.');
      return;
    }
    setSubmitError('');
    setIsSubmitting(true);

    window.setTimeout(() => {
      if (simulateError) {
        setIsSubmitting(false);
        setSubmitError(
          'Simulated booking verification error: Unable to lock slot momentarily. Please retry confirming or pick another slot.'
        );
        return;
      }
      if (isSlotBooked(activeDoctor.slug, selectedDateISO, selectedTimeSlot)) {
        setIsSubmitting(false);
        setSubmitError(
          'This demonstration slot was just reserved. Please select an alternate time in Step 4.'
        );
        return;
      }
      const created = addBooking({
        specialtySlug: activeSpecialty.slug,
        specialtyName: activeSpecialty.name,
        doctorSlug: activeDoctor.slug,
        doctorName: activeDoctor.name,
        doctorRole: activeDoctor.role,
        dateISO: selectedDateISO,
        timeSlot: selectedTimeSlot,
        patientName: form.patientName.trim(),
        patientPhone: form.patientPhone.trim(),
        patientEmail: form.patientEmail.trim(),
        reason: form.reason.trim(),
        isFirstVisit: form.isFirstVisit,
      });
      setConfirmedBooking(created);
      setIsSubmitting(false);
      setStep(7);
    }, 650);
  };

  const handleDownloadIcs = () => {
    if (!confirmedBooking) return;
    const blob = new Blob([buildIcsContent(confirmedBooking)], {
      type: 'text/calendar;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${confirmedBooking.referenceCode}-AURELIA-Demo.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSelectedSpecialtySlug('');
    setSelectedDoctorSlug('');
    setSelectedDateISO('');
    setSelectedTimeSlot('');
    setForm({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      reason: '',
      isFirstVisit: true,
    });
    setTouched({});
    setStepError('');
    setSubmitError('');
    setConfirmedBooking(null);
    setStep(1);
  };

  const canJumpToStep = (targetStep: number) => {
    if (step === 7) return false;
    if (targetStep < step) return true;
    if (targetStep === 2 && selectedSpecialtySlug) return true;
    if (targetStep === 3 && selectedDoctorSlug) return true;
    if (targetStep === 4 && selectedDateISO) return true;
    if (targetStep === 5 && selectedTimeSlot) return true;
    if (targetStep === 6 && selectedTimeSlot && Object.keys(fieldErrors).length === 0) return true;
    return false;
  };

  return (
    <div className="bg-white border border-[#102B3F]/12 rounded-sm overflow-hidden">
      {/* Top Demo & Progress Header */}
      <div className="bg-[#102B3F] text-[#FAFAF7] px-5 sm:px-8 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          {!compactHeader && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C7A76C]">
              Concierge Scheduling · Step {step} of 7
            </p>
          )}
          <h3 className="font-display text-xl sm:text-2xl text-[#FAFAF7] mt-0.5">
            {step === 7 ? 'Consultation Confirmed (Demo)' : 'Reserve Your Specialist Consultation'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {bookings.length > 0 && (
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-medium text-[#FAFAF7] rounded-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#36A89A]" />
              <span>Saved Demo Bookings ({bookings.length})</span>
            </button>
          )}
          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#CBD5DC] bg-white/8 px-3 py-1.5 rounded-sm border border-white/12">
            <Info className="w-3.5 h-3.5 text-[#C7A76C] shrink-0" />
            <span>Demo only — saved locally, not sent to a clinic</span>
          </span>
        </div>
      </div>

      {/* 7-Step Architectural Progress Bar */}
      <div
        className="border-b border-[#102B3F]/10 bg-[#F1F4F3]/70 px-4 sm:px-8 py-3.5 overflow-x-auto"
        aria-label="Booking progress"
      >
        <ol className="flex items-center justify-between min-w-[600px] gap-2">
          {STEPS.map((s) => {
            const isActive = step === s.number;
            const isCompleted = step > s.number;
            const clickable = canJumpToStep(s.number);
            return (
              <li key={s.number} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  disabled={!clickable}
                  onClick={() => {
                    if (clickable) {
                      setStepError('');
                      setStep(s.number);
                    }
                  }}
                  className={`inline-flex items-center gap-2 text-left transition-colors ${
                    clickable ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-sm text-xs font-semibold tabular-nums flex items-center justify-center border transition-colors ${
                      isActive
                        ? 'bg-[#102B3F] text-[#FAFAF7] border-[#102B3F]'
                        : isCompleted
                        ? 'bg-[#36A89A] text-white border-[#36A89A]'
                        : 'bg-white text-[#52636C] border-[#102B3F]/15'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.number}
                  </span>
                  <span
                    className={`text-xs font-medium tracking-wide ${
                      isActive
                        ? 'text-[#102B3F] font-semibold'
                        : isCompleted
                        ? 'text-[#102B3F]'
                        : 'text-[#52636C]'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
                {s.number < 7 && (
                  <div
                    className={`flex-1 h-px mx-3 ${
                      step > s.number ? 'bg-[#36A89A]' : 'bg-[#102B3F]/12'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Main Step Viewport */}
      <div className="p-5 sm:p-8 lg:p-10">
        {stepError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-900/20 text-red-900 text-sm rounded-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-700" />
            <span>{stepError}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: SELECT SPECIALTY */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.14 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#856830]">
                    Step 01 · Department Selection
                  </p>
                  <h4 className="font-display text-2xl text-[#102B3F] mt-1">
                    Select a Medical Specialty
                  </h4>
                </div>
                <p className="text-xs text-[#52636C]">Choose the clinical department matching your concern</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {SPECIALTIES.map((spec) => {
                  const isSelected = selectedSpecialtySlug === spec.slug;
                  return (
                    <button
                      key={spec.slug}
                      type="button"
                      onClick={() => handleSelectSpecialty(spec.slug)}
                      className={`group text-left p-5 rounded-sm border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#102B3F] text-[#FAFAF7] border-[#102B3F]'
                          : 'bg-[#FAFAF7] hover:bg-[#F1F4F3] text-[#102B3F] border-[#102B3F]/14 hover:border-[#36A89A]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className={`w-10 h-10 rounded-sm flex items-center justify-center border ${
                            isSelected
                              ? 'bg-white/10 border-white/20 text-[#C7A76C]'
                              : 'bg-white border-[#102B3F]/12 text-[#36A89A]'
                          }`}
                        >
                          <SpecialtyIcon name={spec.iconName} className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-[11px] font-semibold tabular-nums ${
                            isSelected ? 'text-[#C7A76C]' : 'text-[#52636C]'
                          }`}
                        >
                          {spec.number}
                        </span>
                      </div>

                      <div>
                        <p className="font-display text-lg font-medium">{spec.name}</p>
                        <p
                          className={`text-xs mt-1 line-clamp-2 ${
                            isSelected ? 'text-[#CBD5DC]' : 'text-[#52636C]'
                          }`}
                        >
                          {spec.shortTagline}
                        </p>
                      </div>

                      <div
                        className={`pt-2.5 border-t flex items-center justify-between text-[11px] font-medium ${
                          isSelected
                            ? 'border-white/15 text-[#E3C892]'
                            : 'border-[#102B3F]/8 text-[#52636C] group-hover:text-[#102B3F]'
                        }`}
                      >
                        <span>{spec.consultationDuration}</span>
                        <span className="inline-flex items-center gap-1">
                          Select <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SELECT DOCTOR */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.14 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#856830]">
                    Step 02 · {activeSpecialty?.name || 'All Departments'}
                  </p>
                  <h4 className="font-display text-2xl text-[#102B3F] mt-1">
                    Choose Your Consulting Specialist
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-medium text-[#36A89A] hover:text-[#102B3F] inline-flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change Specialty
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchingDoctors.map((doc) => {
                  const isSelected = selectedDoctorSlug === doc.slug;
                  return (
                    <button
                      key={doc.slug}
                      type="button"
                      onClick={() => handleSelectDoctor(doc.slug)}
                      className={`text-left p-5 rounded-sm border transition-all cursor-pointer flex items-start gap-4 ${
                        isSelected
                          ? 'bg-[#F1F4F3] border-[#102B3F] ring-1 ring-[#102B3F]'
                          : 'bg-[#FAFAF7] border-[#102B3F]/14 hover:border-[#36A89A] hover:bg-white'
                      }`}
                    >
                      {doc.image ? (
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-20 h-24 object-cover object-top rounded-sm border border-[#102B3F]/10 shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-24 rounded-sm bg-[#102B3F] text-[#FAFAF7] flex flex-col items-center justify-center shrink-0">
                          <span className="font-display text-xl tracking-wider">{doc.initials}</span>
                          <span className="text-[9px] uppercase tracking-widest text-[#C7A76C] mt-1">
                            Dept Lead
                          </span>
                        </div>
                      )}

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-display text-lg text-[#102B3F] font-medium">
                              {doc.name}
                            </h5>
                            <p className="text-xs font-medium text-[#36A89A]">{doc.role}</p>
                          </div>
                          {isSelected && (
                            <span className="w-6 h-6 rounded-sm bg-[#102B3F] text-[#FAFAF7] flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#52636C]">{doc.qualifications}</p>
                        <p className="text-xs text-[#24323A] font-medium pt-1">
                          {doc.experience} · {doc.consultationDuration}
                        </p>
                        <p className="text-[11px] text-[#52636C] flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#C7A76C]" />
                          <span>{doc.availability}</span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#102B3F]/10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#52636C] hover:text-[#102B3F] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => handleNextFromStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm hover:bg-[#193D57] cursor-pointer"
                >
                  <span>Select Date</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A76C]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SELECT DATE */}
          {step === 3 && activeDoctor && (
            <motion.div
              key="step-3"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.14 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#856830]">
                    Step 03 · Date Selection
                  </p>
                  <h4 className="font-display text-2xl text-[#102B3F] mt-1">
                    Select an Available Date
                  </h4>
                  <p className="text-xs text-[#52636C] mt-1">
                    Showing consulting schedule for{' '}
                    <span className="font-semibold text-[#102B3F]">{activeDoctor.name}</span> (
                    {activeDoctor.availability})
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickDates.slice(0, 3).map((iso, idx) => (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => {
                        setSelectedDateISO(iso);
                        setSelectedTimeSlot('');
                        setStepError('');
                      }}
                      className={`px-3 py-1.5 text-xs rounded-sm border transition-colors cursor-pointer ${
                        selectedDateISO === iso
                          ? 'bg-[#102B3F] text-[#FAFAF7] border-[#102B3F]'
                          : 'bg-[#F1F4F3] text-[#102B3F] border-[#102B3F]/15 hover:border-[#36A89A]'
                      }`}
                    >
                      {idx === 0 ? 'Earliest: ' : ''}
                      {new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Custom Architectural Calendar */}
                <div className="lg:col-span-8 p-5 bg-[#FAFAF7] border border-[#102B3F]/14 rounded-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-display text-lg text-[#102B3F]">
                      {calendarMonth.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h5>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarMonth(
                            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                          )
                        }
                        aria-label="Previous month"
                        className="w-9 h-9 rounded-sm border border-[#102B3F]/15 bg-white flex items-center justify-center text-[#102B3F] hover:bg-[#F1F4F3] cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarMonth(
                            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                          )
                        }
                        aria-label="Next month"
                        className="w-9 h-9 rounded-sm border border-[#102B3F]/15 bg-white flex items-center justify-center text-[#102B3F] hover:bg-[#F1F4F3] cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-semibold uppercase tracking-wider text-[#52636C] mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <div key={d} className="py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {calendarDays.map((cell) => {
                      if (!cell.date) {
                        return <div key={cell.iso} className="h-11" />;
                      }
                      const isSelected = selectedDateISO === cell.iso;
                      return (
                        <button
                          key={cell.iso}
                          type="button"
                          disabled={cell.disabled}
                          onClick={() => {
                            setSelectedDateISO(cell.iso);
                            setSelectedTimeSlot('');
                            setStepError('');
                          }}
                          aria-label={formatReadableDate(cell.iso)}
                          aria-pressed={isSelected}
                          className={`relative h-11 rounded-sm text-sm tabular-nums font-medium transition-colors flex flex-col items-center justify-center ${
                            cell.disabled
                              ? 'text-[#52636C]/35 bg-transparent cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#102B3F] text-[#FAFAF7] cursor-pointer'
                              : 'bg-white border border-[#102B3F]/10 text-[#102B3F] hover:border-[#36A89A] hover:bg-[#F1F4F3] cursor-pointer'
                          }`}
                        >
                          <span>{cell.dayNum}</span>
                          {!cell.disabled && (
                            <span
                              className={`w-1 h-1 rounded-full mt-0.5 ${
                                isSelected ? 'bg-[#C7A76C]' : 'bg-[#36A89A]'
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Doctor Summary Card */}
                <div className="lg:col-span-4 p-5 bg-[#F1F4F3] border border-[#102B3F]/12 rounded-sm space-y-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#856830]">
                    Selected Specialist
                  </p>
                  <div className="flex items-center gap-3">
                    {activeDoctor.image ? (
                      <img
                        src={activeDoctor.image}
                        alt={activeDoctor.name}
                        className="w-14 h-16 object-cover object-top rounded-sm border border-[#102B3F]/10"
                      />
                    ) : (
                      <div className="w-14 h-16 rounded-sm bg-[#102B3F] text-[#FAFAF7] flex items-center justify-center font-display text-lg">
                        {activeDoctor.initials}
                      </div>
                    )}
                    <div>
                      <p className="font-display text-base text-[#102B3F] font-medium">
                        {activeDoctor.name}
                      </p>
                      <p className="text-xs text-[#36A89A] font-medium">{activeDoctor.role}</p>
                      <p className="text-[11px] text-[#52636C] mt-0.5">
                        {activeDoctor.consultationDuration} · {activeDoctor.consultationFeeDemo}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#102B3F]/10 text-xs text-[#52636C] space-y-1.5">
                    <p>
                      <span className="font-medium text-[#102B3F]">Selected Date: </span>
                      {selectedDateISO ? formatReadableDate(selectedDateISO) : 'None chosen yet'}
                    </p>
                    <p className="text-[11px]">
                      Dates marked with a teal dot reflect active consulting days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#102B3F]/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#52636C] hover:text-[#102B3F] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => handleNextFromStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm hover:bg-[#193D57] cursor-pointer"
                >
                  <span>Choose Time Slot</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A76C]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SELECT TIME SLOT */}
          {step === 4 && activeDoctor && (
            <motion.div
              key="step-4"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.14 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#856830]">
                    Step 04 · Time Availability
                  </p>
                  <h4 className="font-display text-2xl text-[#102B3F] mt-1">
                    Select an Available Time Slot
                  </h4>
                  <p className="text-xs text-[#52636C] mt-1">
                    {formatReadableDate(selectedDateISO)} · {activeDoctor.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs font-medium text-[#36A89A] hover:text-[#102B3F] inline-flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change Date
                </button>
              </div>

              <div className="space-y-5">
                {(
                  [
                    { label: 'Morning Sessions', slots: activeDoctor.timeSlots.morning },
                    { label: 'Afternoon Sessions', slots: activeDoctor.timeSlots.afternoon },
                    { label: 'Evening Sessions', slots: activeDoctor.timeSlots.evening },
                  ] as const
                ).map((group) => {
                  if (group.slots.length === 0) return null;
                  return (
                    <div
                      key={group.label}
                      className="p-5 bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm space-y-3"
                    >
                      <h5 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#102B3F]">
                        {group.label}
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {group.slots.map((slot) => {
                          const booked = isSlotBooked(
                            activeDoctor.slug,
                            selectedDateISO,
                            slot
                          );
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={booked}
                              onClick={() => {
                                setSelectedTimeSlot(slot);
                                setStepError('');
                              }}
                              className={`py-3 px-3 rounded-sm text-sm tabular-nums font-medium border transition-all flex flex-col items-center justify-center ${
                                booked
                                  ? 'bg-[#F1F4F3] text-[#52636C]/50 border-[#102B3F]/10 cursor-not-allowed line-through'
                                  : isSelected
                                  ? 'bg-[#102B3F] text-[#FAFAF7] border-[#102B3F] cursor-pointer'
                                  : 'bg-white text-[#102B3F] border-[#102B3F]/15 hover:border-[#36A89A] cursor-pointer'
                              }`}
                            >
                              <span>{slot}</span>
                              {booked && (
                                <span className="text-[10px] no-underline text-[#856830] mt-0.5">
                                  Reserved (Demo)
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#102B3F]/10">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#52636C] hover:text-[#102B3F] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => handleNextFromStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm hover:bg-[#193D57] cursor-pointer"
                >
                  <span>Patient Details</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A76C]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: PATIENT INFORMATION */}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.14 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#856830]">
                  Step 05 · Patient Information
                </p>
                <h4 className="font-display text-2xl text-[#102B3F] mt-1">
                  Enter Your Details
                </h4>
                <p className="text-xs text-[#52636C] mt-1">
                  Required for generating your demonstration consultation dossier.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="booking-patient-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F] mb-1.5"
                  >
                    Patient Full Name <span className="text-[#36A89A]">*</span>
                  </label>
                  <input
                    id="booking-patient-name"
                    type="text"
                    value={form.patientName}
                    onChange={(e) => setForm((f) => ({ ...f, patientName: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, patientName: true }))}
                    placeholder="e.g., Arjun Deshmukh"
                    aria-invalid={Boolean(touched.patientName && fieldErrors.patientName)}
                    aria-describedby={
                      touched.patientName && fieldErrors.patientName ? 'err-patient-name' : undefined
                    }
                    className={`w-full px-4 py-3 text-sm bg-[#FAFAF7] border rounded-sm transition-colors ${
                      touched.patientName && fieldErrors.patientName
                        ? 'border-red-700'
                        : 'border-[#102B3F]/20 focus:border-[#36A89A]'
                    }`}
                  />
                  {touched.patientName && fieldErrors.patientName && (
                    <p id="err-patient-name" className="text-xs text-red-700 mt-1.5">
                      {fieldErrors.patientName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-patient-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F] mb-1.5"
                  >
                    Phone Number <span className="text-[#36A89A]">*</span>
                  </label>
                  <input
                    id="booking-patient-phone"
                    type="tel"
                    value={form.patientPhone}
                    onChange={(e) => setForm((f) => ({ ...f, patientPhone: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, patientPhone: true }))}
                    placeholder="+91 98000 00000"
                    aria-invalid={Boolean(touched.patientPhone && fieldErrors.patientPhone)}
                    aria-describedby={
                      touched.patientPhone && fieldErrors.patientPhone
                        ? 'err-patient-phone'
                        : undefined
                    }
                    className={`w-full px-4 py-3 text-sm bg-[#FAFAF7] border rounded-sm transition-colors ${
                      touched.patientPhone && fieldErrors.patientPhone
                        ? 'border-red-700'
                        : 'border-[#102B3F]/20 focus:border-[#36A89A]'
                    }`}
                  />
                  {touched.patientPhone && fieldErrors.patientPhone && (
                    <p id="err-patient-phone" className="text-xs text-red-700 mt-1.5">
                      {fieldErrors.patientPhone}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="booking-patient-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F] mb-1.5"
                  >
                    Email Address <span className="text-[#36A89A]">*</span>
                  </label>
                  <input
                    id="booking-patient-email"
                    type="email"
                    value={form.patientEmail}
                    onChange={(e) => setForm((f) => ({ ...f, patientEmail: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, patientEmail: true }))}
                    placeholder="name@example.com"
                    aria-invalid={Boolean(touched.patientEmail && fieldErrors.patientEmail)}
                    aria-describedby={
                      touched.patientEmail && fieldErrors.patientEmail
                        ? 'err-patient-email'
                        : undefined
                    }
                    className={`w-full px-4 py-3 text-sm bg-[#FAFAF7] border rounded-sm transition-colors ${
                      touched.patientEmail && fieldErrors.patientEmail
                        ? 'border-red-700'
                        : 'border-[#102B3F]/20 focus:border-[#36A89A]'
                    }`}
                  />
                  {touched.patientEmail && fieldErrors.patientEmail && (
                    <p id="err-patient-email" className="text-xs text-red-700 mt-1.5">
                      {fieldErrors.patientEmail}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label
                      htmlFor="booking-reason"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F]"
                    >
                      Reason for Consultation <span className="text-[#36A89A]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_REASONS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setForm((f) => ({
                              ...f,
                              reason: f.reason.trim() ? `${f.reason.trim()} — ${preset}` : preset,
                            }));
                            setTouched((t) => ({ ...t, reason: true }));
                          }}
                          className="text-[11px] px-2.5 py-1 bg-[#F1F4F3] hover:bg-[#E4EAE8] text-[#102B3F] border border-[#102B3F]/12 rounded-sm cursor-pointer"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    id="booking-reason"
                    rows={3}
                    value={form.reason}
                    onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, reason: true }))}
                    placeholder="Briefly describe primary symptoms, preventive checkup goals, or questions for the specialist..."
                    aria-invalid={Boolean(touched.reason && fieldErrors.reason)}
                    aria-describedby={
                      touched.reason && fieldErrors.reason ? 'err-patient-reason' : undefined
                    }
                    className={`w-full px-4 py-3 text-sm bg-[#FAFAF7] border rounded-sm transition-colors resize-none ${
                      touched.reason && fieldErrors.reason
                        ? 'border-red-700'
                        : 'border-[#102B3F]/20 focus:border-[#36A89A]'
                    }`}
                  />
                  {touched.reason && fieldErrors.reason && (
                    <p id="err-patient-reason" className="text-xs text-red-700 mt-1">
                      {fieldErrors.reason}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="inline-flex items-center gap-2.5 text-sm text-[#24323A] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isFirstVisit}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, isFirstVisit: e.target.checked }))
                      }
                      className="w-4 h-4 accent-[#102B3F]"
                    />
                    <span>This is my first consultation at AURELIA Medical Centre</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#102B3F]/10">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#52636C] hover:text-[#102B3F] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => handleNextFromStep(5)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm hover:bg-[#193D57] cursor-pointer"
                >
                  <span>Review Appointment</span>
                  <ArrowRight className="w-4 h-4 text-[#C7A76C]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: REVIEW DETAILS */}
          {step === 6 && activeSpecialty && activeDoctor && (
            <motion.div
              key="step-6"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.14 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#856830]">
                  Step 06 · Final Review
                </p>
                <h4 className="font-display text-2xl text-[#102B3F] mt-1">
                  Review Your Appointment Dossier
                </h4>
              </div>

              {/* Explicit Demonstration Notice */}
              <div className="p-4 bg-[#F1F4F3] border-l-4 border-[#36A89A] rounded-sm flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#36A89A] shrink-0 mt-0.5" />
                <div className="text-xs text-[#24323A] space-y-1">
                  <p className="font-semibold text-[#102B3F]">
                    Demonstration Booking Notice
                  </p>
                  <p className="text-[#52636C]">
                    This booking flow demonstrates end-to-end UX, validation, and slot persistence
                    using browser local storage only. No personal information is sent to a real medical
                    clinic or external server.
                  </p>
                </div>
              </div>

              {submitError && (
                <div
                  role="alert"
                  className="p-4 bg-red-50 border border-red-900/20 text-red-900 text-sm rounded-sm flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="text-xs font-semibold underline shrink-0 cursor-pointer"
                  >
                    Change Slot
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-[#FAFAF7] border border-[#102B3F]/14 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#856830]">
                      Specialty & Doctor
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1 text-xs text-[#36A89A] hover:text-[#102B3F] cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-[#52636C]">{activeSpecialty.name}</p>
                    <p className="font-display text-lg text-[#102B3F] mt-0.5">
                      {activeDoctor.name}
                    </p>
                    <p className="text-xs text-[#36A89A]">{activeDoctor.role}</p>
                  </div>
                </div>

                <div className="p-5 bg-[#FAFAF7] border border-[#102B3F]/14 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#856830]">
                      Schedule & Suite
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-1 text-xs text-[#36A89A] hover:text-[#102B3F] cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#102B3F]">
                      {formatReadableDate(selectedDateISO)}
                    </p>
                    <p className="text-sm text-[#24323A] tabular-nums">
                      {selectedTimeSlot} ({activeDoctor.consultationDuration})
                    </p>
                    <p className="text-xs text-[#52636C]">{CLINIC_INFO.addressLine1}</p>
                  </div>
                </div>

                <div className="p-5 bg-[#FAFAF7] border border-[#102B3F]/14 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#856830]">
                      Patient Details
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="inline-flex items-center gap-1 text-xs text-[#36A89A] hover:text-[#102B3F] cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                  </div>
                  <div className="space-y-1 text-xs text-[#52636C]">
                    <p className="text-sm font-semibold text-[#102B3F]">{form.patientName}</p>
                    <p className="tabular-nums">{form.patientPhone}</p>
                    <p className="truncate">{form.patientEmail}</p>
                    <p className="pt-1 text-[#24323A] line-clamp-2">“{form.reason}”</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#102B3F]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setStep(5)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#52636C] hover:text-[#102B3F] cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Edit Details
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleConfirmBooking(true)}
                    className="text-xs text-[#52636C] underline hover:text-[#102B3F] cursor-pointer"
                  >
                    Test Error State
                  </button>
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleConfirmBooking(false)}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#102B3F] text-[#FAFAF7] text-sm font-semibold rounded-sm hover:bg-[#193D57] disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C7A76C]" />
                      <span>Securing Demo Slot...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Demo Appointment</span>
                      <CheckCircle2 className="w-4 h-4 text-[#C7A76C]" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 7: CONFIRMATION SCREEN */}
          {step === 7 && confirmedBooking && (
            <motion.div
              key="step-7"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="py-4 space-y-8"
            >
              <div className="text-center max-w-xl mx-auto space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#36A89A]/15 border border-[#36A89A] text-[#258075] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#856830]">
                  Reference · <span className="tabular-nums">{confirmedBooking.referenceCode}</span>
                </p>
                <h4 className="font-display text-3xl sm:text-4xl text-[#102B3F]">
                  Your Consultation Is Reserved
                </h4>
                <p className="text-sm text-[#52636C]">
                  Saved locally in your demonstration profile. No real clinic appointment has been
                  created or transmitted.
                </p>
              </div>

              <div className="max-w-2xl mx-auto bg-[#FAFAF7] border border-[#102B3F]/15 rounded-sm p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#102B3F]/10">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#36A89A]">
                      {confirmedBooking.specialtyName}
                    </span>
                    <h5 className="font-display text-2xl text-[#102B3F]">
                      {confirmedBooking.doctorName}
                    </h5>
                    <p className="text-xs text-[#52636C]">{confirmedBooking.doctorRole}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F1F4F3] border border-[#36A89A]/30 text-[#258075] text-xs font-semibold rounded-sm self-start sm:self-center">
                    <Check className="w-3.5 h-3.5" /> {confirmedBooking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#52636C]">
                      Date & Time
                    </p>
                    <p className="font-medium text-[#102B3F]">
                      {formatReadableDate(confirmedBooking.dateISO)}
                    </p>
                    <p className="text-[#24323A] tabular-nums">{confirmedBooking.timeSlot}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#52636C]">
                      Patient
                    </p>
                    <p className="font-medium text-[#102B3F] inline-flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#36A89A]" />
                      <span>{confirmedBooking.patientName}</span>
                    </p>
                    <p className="text-xs text-[#52636C]">{confirmedBooking.patientEmail}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#102B3F]/10 text-xs text-[#52636C]">
                  <span className="font-semibold text-[#102B3F]">Consultation Reason: </span>
                  {confirmedBooking.reason}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 no-print">
                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#102B3F] text-[#FAFAF7] text-xs font-medium rounded-sm hover:bg-[#193D57] cursor-pointer"
                >
                  <CalendarPlus className="w-4 h-4 text-[#C7A76C]" />
                  <span>Download Calendar (.ics)</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#102B3F]/20 text-[#102B3F] text-xs font-medium rounded-sm hover:bg-[#F1F4F3] cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#36A89A]" />
                  <span>Print Summary</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#102B3F]/20 text-[#102B3F] text-xs font-medium rounded-sm hover:bg-[#F1F4F3] cursor-pointer"
                >
                  <span>Manage / Reschedule Demo Bookings</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#52636C] hover:text-[#102B3F] underline cursor-pointer"
                >
                  <span>Book Another Consultation</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

