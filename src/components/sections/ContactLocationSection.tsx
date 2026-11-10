import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';
import { Reveal } from '../Reveal';

const MAP_LANDMARKS = [
  { id: 'clinic', label: 'AURELIA Pavilion', detail: 'Valet Entrance & Main Reception' },
  { id: 'metro', label: 'Cubbon Park Metro', detail: '4 min walk · 380 m north-east' },
  { id: 'parking', label: 'Private Patient Valet', detail: 'Complimentary underground bay' },
];

export function ContactLocationSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const [selectedLandmark, setSelectedLandmark] = useState(MAP_LANDMARKS[0]);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Consultation Inquiry',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formState.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formState.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!formState.message.trim() || formState.message.trim().length < 10) {
      next.message = 'Please include a brief message (at least 10 characters).';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="bg-[#F1F4F3] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        {!hideHeader && (
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#102B3F]/12">
              <div className="max-w-2xl space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
                  Contact & Arrival
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#102B3F] leading-tight">
                  Visit AURELIA Medical Centre
                </h2>
              </div>
              <p className="text-xs text-[#52636C]">
                Placeholder address & contact details configured for client showcase review.
              </p>
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Hours, Emergency Notice & Interactive Map Preview */}
          <Reveal className="lg:col-span-6 space-y-6">
            {/* Emergency Contact Distinction Notice */}
            <div
              role="note"
              className="p-5 bg-[#102B3F] text-[#FAFAF7] border-l-4 border-[#C7A76C] rounded-sm space-y-2"
            >
              <div className="flex items-center gap-2.5 text-[#E3C892] font-semibold text-xs uppercase tracking-[0.16em]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Emergency Medical Notice</span>
              </div>
              <p className="text-sm text-[#FAFAF7] leading-relaxed">
                This website is for scheduled non-urgent consultations and demonstration inquiries
                only. For chest pain, acute trauma, or medical emergencies, please dial{' '}
                <strong className="text-[#E3C892]">{CLINIC_INFO.emergencyNumber}</strong> or visit
                the nearest hospital emergency department immediately.
              </p>
            </div>

            {/* Contact Info Grid */}
            <div className="bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#856830] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#36A89A]" />
                  <span>Clinic Address</span>
                </p>
                <p className="text-sm font-semibold text-[#102B3F]">{CLINIC_INFO.addressLine1}</p>
                <p className="text-xs text-[#52636C]">{CLINIC_INFO.addressLine2}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#856830] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#36A89A]" />
                  <span>Operating Hours</span>
                </p>
                <p className="text-xs font-medium text-[#102B3F]">{CLINIC_INFO.hoursWeekday}</p>
                <p className="text-xs text-[#52636C]">{CLINIC_INFO.hoursSunday}</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#856830] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#36A89A]" />
                  <span>Concierge Desk</span>
                </p>
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="text-sm font-semibold text-[#102B3F] hover:text-[#36A89A] transition-colors tabular-nums block"
                >
                  {CLINIC_INFO.phoneDisplay}
                </a>
                <p className="text-[11px] text-[#52636C]">Placeholder demo line</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#856830] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#36A89A]" />
                  <span>Email Desk</span>
                </p>
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="text-sm font-semibold text-[#102B3F] hover:text-[#36A89A] transition-colors break-all block"
                >
                  {CLINIC_INFO.email}
                </a>
                <p className="text-[11px] text-[#52636C]">Non-urgent responses within 2 hrs</p>
              </div>
            </div>

            {/* Interactive Google Maps Integration Placeholder (Architectural Styled) */}
            <div className="bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm overflow-hidden">
              <div className="px-5 py-3 bg-white border-b border-[#102B3F]/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#102B3F]">
                  <Navigation className="w-3.5 h-3.5 text-[#36A89A]" />
                  <span>Location Map Preview (Google Maps Placeholder)</span>
                </div>
                <span className="text-[11px] text-[#856830] font-medium">Lavelle District</span>
              </div>

              <div className="relative h-64 bg-[#E6ECEA] overflow-hidden p-5 flex flex-col justify-between">
                {/* Architectural grid lines resembling curated map cartography */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 260"
                  className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none"
                >
                  <path d="M0 70 H600 M0 160 H600 M120 0 V260 M320 0 V260 M480 0 V260" stroke="#102B3F" strokeOpacity="0.16" strokeWidth="1.5" />
                  <path d="M60 220 Q230 140 520 55" stroke="#36A89A" strokeOpacity="0.35" strokeWidth="4" fill="none" />
                  <rect x="335" y="95" width="110" height="55" fill="#102B3F" fillOpacity="0.08" stroke="#102B3F" strokeOpacity="0.2" />
                </svg>

                <div className="relative z-10 flex flex-wrap gap-2">
                  {MAP_LANDMARKS.map((lm) => {
                    const active = selectedLandmark.id === lm.id;
                    return (
                      <button
                        key={lm.id}
                        type="button"
                        onClick={() => setSelectedLandmark(lm)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#102B3F] text-[#FAFAF7] border-[#102B3F]'
                            : 'bg-white/95 text-[#102B3F] border-[#102B3F]/15 hover:border-[#36A89A]'
                        }`}
                      >
                        {lm.label}
                      </button>
                    );
                  })}
                </div>

                {/* Highlighted Pin */}
                <div className="relative z-10 bg-white/95 border border-[#102B3F]/15 p-3.5 rounded-sm max-w-sm flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#102B3F]">{selectedLandmark.label}</p>
                    <p className="text-[11px] text-[#52636C] mt-0.5">{selectedLandmark.detail}</p>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-[#36A89A] ring-4 ring-[#36A89A]/25 shrink-0" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: General Inquiry Contact Form */}
          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm p-6 sm:p-8 lg:p-10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#36A89A]/15 border border-[#36A89A] text-[#258075] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#856830]">
                    Inquiry Logged (Demo)
                  </p>
                  <h3 className="font-display text-2xl text-[#102B3F]">
                    Thank You, {formState.name}
                  </h3>
                  <p className="text-sm text-[#52636C] max-w-md mx-auto">
                    Your general inquiry has been recorded in this interactive demonstration view.
                    For appointment scheduling, use our 7-step booking flow.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        phone: '',
                        topic: 'General Consultation Inquiry',
                        message: '',
                      });
                    }}
                    className="inline-flex items-center px-5 py-2.5 border border-[#102B3F]/20 text-xs font-semibold text-[#102B3F] rounded-sm hover:bg-[#F1F4F3] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#856830]">
                      General Inquiries
                    </p>
                    <h3 className="font-display text-2xl text-[#102B3F] mt-1">
                      Message Our Patient Concierge
                    </h3>
                    <p className="text-xs text-[#52636C] mt-1">
                      Non-emergency administrative and appointment questions only (demonstration form).
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F] mb-1.5"
                    >
                      Full Name <span className="text-[#36A89A]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.name)}
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-sm ${
                        errors.name ? 'border-red-700' : 'border-[#102B3F]/20 focus:border-[#36A89A]'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-700 mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F] mb-1.5"
                      >
                        Email Address <span className="text-[#36A89A]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                        placeholder="name@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className={`w-full px-4 py-3 text-sm bg-white border rounded-sm ${
                          errors.email
                            ? 'border-red-700'
                            : 'border-[#102B3F]/20 focus:border-[#36A89A]'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-700 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F] mb-1.5"
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                        placeholder="+91 98000 00000"
                        className="w-full px-4 py-3 text-sm bg-white border border-[#102B3F]/20 focus:border-[#36A89A] rounded-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F] mb-1.5"
                    >
                      Inquiry Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={formState.topic}
                      onChange={(e) => setFormState((s) => ({ ...s, topic: e.target.value }))}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#102B3F]/20 focus:border-[#36A89A] rounded-sm"
                    >
                      <option>General Consultation Inquiry</option>
                      <option>Diagnostic Preparation Question</option>
                      <option>Executive Health Check Coordination</option>
                      <option>International / Concierge Visit</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F] mb-1.5"
                    >
                      Message <span className="text-[#36A89A]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      placeholder="How may our concierge team assist you?"
                      aria-invalid={Boolean(errors.message)}
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-sm resize-none ${
                        errors.message
                          ? 'border-red-700'
                          : 'border-[#102B3F]/20 focus:border-[#36A89A]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-700 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#102B3F] text-[#FAFAF7] text-sm font-semibold rounded-sm hover:bg-[#193D57] disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#C7A76C]" />
                        <span>Submitting Demo Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Concierge Inquiry</span>
                        <Send className="w-4 h-4 text-[#C7A76C]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

