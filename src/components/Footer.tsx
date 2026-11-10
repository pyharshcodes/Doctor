import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  Clock,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CLINIC_INFO, SPECIALTIES } from '../data/clinicData';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  const handleSocialPreview = (network: string) => {
    setSocialNotice(
      `${network} channel preview: In a live deployment for your clinic, this links directly to your verified ${network} presence.`
    );
  };

  return (
    <footer className="bg-[#102B3F] text-[#FAFAF7] border-t border-[#C7A76C]/30 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        {/* Top Editorial Band */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/12">
          <div className="max-w-xl space-y-4">
            <BrandLogo variant="light" />
            <p className="text-[#CBD5DC] text-sm sm:text-base leading-relaxed">
              AURELIA Medical Centre is a boutique multi-specialty showcase designed to
              demonstrate how architectural clarity, medical authority, and effortless
              appointment journeys elevate trust for leading private clinics.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAFAF7] text-[#102B3F] text-sm font-semibold rounded-sm hover:bg-[#F1F4F3] transition-colors group"
            >
              <span>Schedule a Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-[#36A89A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/25 text-[#FAFAF7] text-sm font-medium rounded-sm hover:border-[#C7A76C] transition-colors"
            >
              <span>Clinic Concierge</span>
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-white/12">
          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A76C]">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-[#CBD5DC]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About AURELIA
                </Link>
              </li>
              <li>
                <Link to="/specialties" className="hover:text-white transition-colors">
                  Medical Specialties
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">
                  Meet Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Patient Resources & FAQ
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-white transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Medical Specialties */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A76C]">
              Medical Specialties
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-[#CBD5DC]">
              {SPECIALTIES.map((spec) => (
                <li key={spec.slug}>
                  <Link
                    to={`/specialties/${spec.slug}`}
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-[11px] text-[#C7A76C]/80 tabular-nums">
                      {spec.number}
                    </span>
                    <span>{spec.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A76C]">
              Contact & Visiting Hours
            </h3>
            <div className="space-y-3 text-sm text-[#CBD5DC]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#36A89A] shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">{CLINIC_INFO.addressLine1}</p>
                  <p className="text-xs text-[#CBD5DC]/80">{CLINIC_INFO.addressLine2}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#36A89A] shrink-0" />
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="hover:text-white transition-colors tabular-nums"
                >
                  {CLINIC_INFO.phoneDisplay} (Demo Line)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#36A89A] shrink-0" />
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#36A89A] shrink-0 mt-1" />
                <div className="text-xs space-y-0.5 text-[#CBD5DC]/90">
                  <p>{CLINIC_INFO.hoursWeekday}</p>
                  <p>{CLINIC_INFO.hoursSunday}</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSocialPreview('Instagram')}
                  className="w-9 h-9 rounded-sm border border-white/15 flex items-center justify-center text-[#CBD5DC] hover:text-white hover:border-[#C7A76C] transition-colors cursor-pointer"
                  aria-label="Instagram channel preview"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialPreview('LinkedIn')}
                  className="w-9 h-9 rounded-sm border border-white/15 flex items-center justify-center text-[#CBD5DC] hover:text-white hover:border-[#C7A76C] transition-colors cursor-pointer"
                  aria-label="LinkedIn clinic profile preview"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialPreview('Clinical Journal')}
                  className="w-9 h-9 rounded-sm border border-white/15 flex items-center justify-center text-[#CBD5DC] hover:text-white hover:border-[#C7A76C] transition-colors cursor-pointer"
                  aria-label="Clinical Journal preview"
                >
                  <Globe className="w-4 h-4" />
                </button>
              </div>
              {socialNotice && (
                <p className="mt-2.5 text-xs text-[#E3C892] bg-white/5 border border-white/10 px-3 py-2 rounded-sm">
                  {socialNotice}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Demo Statement */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#CBD5DC]/80">
          <div className="space-y-1">
            <p>© {CURRENT_YEAR} AURELIA Medical Centre. Concept Design Demonstration.</p>
            <p className="text-[#CBD5DC]/65">
              All clinician profiles, clinical statistics, patient testimonials, and appointment slots
              are illustrative placeholders for showcase purposes only.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

