import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Calendar, Check, Clock, Stethoscope } from 'lucide-react';
import { getDoctorBySlug, getSpecialtyBySlug, SPECIALTIES } from '../data/clinicData';
import { PageTransition, Reveal } from '../components/Reveal';
import { SpecialtyIcon } from '../components/SpecialtyIcon';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

export function SpecialtyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const specialty = slug ? getSpecialtyBySlug(slug) : undefined;
  const leadDoctor = specialty ? getDoctorBySlug(specialty.leadDoctorSlug) : undefined;

  useDocumentTitle(
    specialty
      ? `${specialty.name} — AURELIA Medical Centre`
      : 'Specialty Not Found — AURELIA Medical Centre',
    specialty?.shortDescription
  );

  if (!specialty) {
    return <NotFoundPage />;
  }

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] pt-12 pb-16 border-b border-[#102B3F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
          <Link
            to="/specialties"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#52636C] hover:text-[#102B3F]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Medical Specialties
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#F1F4F3] border border-[#102B3F]/12 rounded-sm">
                <SpecialtyIcon name={specialty.iconName} className="w-4 h-4 text-[#36A89A]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#102B3F]">
                  Department {specialty.number} · {specialty.shortTagline}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl text-[#102B3F]">
                {specialty.name}
              </h1>

              <p className="text-base sm:text-lg text-[#52636C] leading-relaxed">
                {specialty.fullDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={`/book?specialty=${specialty.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm hover:bg-[#193D57]"
                >
                  <Calendar className="w-4 h-4 text-[#C7A76C]" />
                  <span>Book {specialty.name} Consultation</span>
                </Link>
                <span className="inline-flex items-center gap-2 text-xs text-[#52636C] bg-[#F1F4F3] px-4 py-3 rounded-sm border border-[#102B3F]/10">
                  <Clock className="w-4 h-4 text-[#36A89A]" />
                  Typical Visit: {specialty.consultationDuration}
                </span>
              </div>
            </div>

            {leadDoctor && (
              <div className="lg:col-span-5 bg-[#F1F4F3] border border-[#102B3F]/12 rounded-sm p-6 sm:p-7 space-y-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#856830]">
                  Lead Department Specialist
                </p>
                <div className="flex items-start gap-4">
                  {leadDoctor.image ? (
                    <img
                      src={leadDoctor.image}
                      alt={leadDoctor.name}
                      className="w-20 h-24 object-cover object-top rounded-sm border border-[#102B3F]/12 shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-24 rounded-sm bg-[#102B3F] text-[#FAFAF7] flex items-center justify-center font-display text-xl shrink-0">
                      {leadDoctor.initials}
                    </div>
                  )}
                  <div className="space-y-1">
                    <h2 className="font-display text-2xl text-[#102B3F]">{leadDoctor.name}</h2>
                    <p className="text-xs font-semibold text-[#258075]">{leadDoctor.role}</p>
                    <p className="text-xs text-[#52636C]">{leadDoctor.qualifications}</p>
                    <p className="text-xs text-[#102B3F] font-medium pt-1">
                      {leadDoctor.availability}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#102B3F]/10 flex items-center gap-3">
                  <Link
                    to={`/book?specialty=${specialty.slug}&doctor=${leadDoctor.slug}`}
                    className="flex-1 text-center py-2.5 px-4 bg-[#102B3F] text-[#FAFAF7] text-xs font-medium rounded-sm hover:bg-[#193D57]"
                  >
                    Reserve with {leadDoctor.name.split(' ').slice(0, 2).join(' ')}
                  </Link>
                  <Link
                    to={`/doctors/${leadDoctor.slug}`}
                    className="py-2.5 px-4 border border-[#102B3F]/20 text-[#102B3F] text-xs font-medium rounded-sm hover:bg-white"
                  >
                    Full Bio
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#F1F4F3] py-16 lg:py-20 border-b border-[#102B3F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal>
            <div className="h-full bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm p-7 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 text-[#102B3F]">
                <Stethoscope className="w-5 h-5 text-[#36A89A]" />
                <h2 className="font-display text-2xl">Conditions & Focus Areas</h2>
              </div>
              <ul className="space-y-3">
                {specialty.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-[#24323A]">
                    <Check className="w-4 h-4 text-[#36A89A] shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm p-7 sm:p-8 space-y-5">
              <h2 className="font-display text-2xl text-[#102B3F]">
                On-Site Diagnostic Protocols
              </h2>
              <ul className="space-y-3">
                {specialty.diagnostics.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-[#24323A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7A76C] shrink-0 mt-2" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Explore Other Departments */}
      <section className="bg-[#FAFAF7] py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
          <h3 className="font-display text-2xl text-[#102B3F]">Explore Related Specialties</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SPECIALTIES.filter((s) => s.slug !== specialty.slug)
              .slice(0, 4)
              .map((s) => (
                <Link
                  key={s.slug}
                  to={`/specialties/${s.slug}`}
                  className="p-4 bg-[#F1F4F3] hover:bg-white border border-[#102B3F]/12 rounded-sm flex items-center justify-between gap-2 transition-colors"
                >
                  <span className="font-display text-base text-[#102B3F]">{s.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#36A89A] shrink-0" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

