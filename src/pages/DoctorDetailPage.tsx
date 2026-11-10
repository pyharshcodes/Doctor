import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Award, Calendar, Check, Clock, Languages } from 'lucide-react';
import { getDoctorBySlug } from '../data/clinicData';
import { PageTransition } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

export function DoctorDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const doctor = slug ? getDoctorBySlug(slug) : undefined;

  useDocumentTitle(
    doctor
      ? `${doctor.name} (${doctor.role}) — AURELIA Medical Centre`
      : 'Doctor Not Found — AURELIA Medical Centre',
    doctor?.bio
  );

  if (!doctor) {
    return <NotFoundPage />;
  }

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-8">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#52636C] hover:text-[#102B3F]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Doctors
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Portrait & Availability Card */}
            <div className="lg:col-span-5 bg-[#F1F4F3] border border-[#102B3F]/12 rounded-sm overflow-hidden">
              {doctor.image ? (
                <div className="aspect-[3/4]">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name} — ${doctor.role}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] bg-[#102B3F] text-[#FAFAF7] flex flex-col items-center justify-center">
                  <span className="font-display text-6xl tracking-wider">{doctor.initials}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#C7A76C] mt-2">
                    {doctor.specialtyName}
                  </span>
                </div>
              )}

              <div className="p-6 space-y-3 text-sm border-t border-[#102B3F]/10">
                <div className="flex items-center gap-2.5 text-[#102B3F] font-medium">
                  <Clock className="w-4 h-4 text-[#36A89A]" />
                  <span>{doctor.availability}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#52636C]">
                  <Languages className="w-4 h-4 text-[#36A89A]" />
                  <span>Languages: {doctor.languages.join(', ')}</span>
                </div>
                <div className="pt-3 border-t border-[#102B3F]/10 flex items-center justify-between text-xs">
                  <span className="text-[#52636C]">Consultation Fee</span>
                  <span className="font-semibold text-[#102B3F]">{doctor.consultationFeeDemo}</span>
                </div>
              </div>
            </div>

            {/* Detailed Dossier */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#856830]">
                  {doctor.specialtyName} · {doctor.experience}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl text-[#102B3F]">{doctor.name}</h1>
                <p className="text-lg font-medium text-[#258075]">{doctor.role}</p>
                <p className="text-sm text-[#52636C] flex items-center gap-2 pt-1">
                  <Award className="w-4 h-4 text-[#C7A76C] shrink-0" />
                  <span>{doctor.qualifications}</span>
                </p>
              </div>

              <blockquote className="pl-5 border-l-2 border-[#C7A76C] font-display text-xl italic text-[#102B3F] leading-relaxed">
                “{doctor.philosophy}”
              </blockquote>

              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#102B3F]">
                  Clinical Biography (Illustrative Profile)
                </h2>
                <p className="text-base text-[#52636C] leading-relaxed">{doctor.bio}</p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#102B3F]">
                  Areas of Clinical Focus
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.clinicalFocus.map((item) => (
                    <li
                      key={item}
                      className="p-3.5 bg-[#F1F4F3] border border-[#102B3F]/10 rounded-sm flex items-start gap-2.5 text-sm text-[#24323A]"
                    >
                      <Check className="w-4 h-4 text-[#36A89A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to={`/book?specialty=${doctor.specialtySlug}&doctor=${doctor.slug}`}
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#102B3F] text-[#FAFAF7] text-sm font-semibold rounded-sm hover:bg-[#193D57]"
                >
                  <Calendar className="w-4 h-4 text-[#C7A76C]" />
                  <span>Book Appointment with {doctor.name}</span>
                </Link>
                <Link
                  to={`/specialties/${doctor.specialtySlug}`}
                  className="inline-flex items-center gap-2 px-6 py-4 border border-[#102B3F]/20 text-[#102B3F] text-sm font-medium rounded-sm hover:bg-[#F1F4F3]"
                >
                  <span>View {doctor.specialtyName} Department</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

