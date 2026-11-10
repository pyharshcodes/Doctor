import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Search } from 'lucide-react';
import { SPECIALTIES } from '../data/clinicData';
import { PageTransition, Reveal } from '../components/Reveal';
import { SpecialtyIcon } from '../components/SpecialtyIcon';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function SpecialtiesPage() {
  useDocumentTitle(
    'Medical Specialties — AURELIA Medical Centre',
    'Explore all eight clinical specialties at AURELIA Medical Centre including Cardiology, Neurology, Orthopedics, Dermatology, Pediatrics, Gynecology, Dentistry, and General Medicine.'
  );

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SPECIALTIES;
    return SPECIALTIES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.conditions.some((c) => c.toLowerCase().includes(q)) ||
        s.diagnostics.some((d) => d.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] pt-14 pb-12 border-b border-[#102B3F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
                Clinical Departments
              </p>
              <h1 className="font-display text-4xl sm:text-5xl text-[#102B3F] leading-tight">
                Eight Core Medical Specialties
              </h1>
              <p className="text-sm sm:text-base text-[#52636C]">
                Filter by specialty, condition, or diagnostic test to inspect dedicated clinical
                pathways and reserve a consultation.
              </p>
            </div>

            <div className="relative w-full lg:w-80">
              <Search
                className="w-4 h-4 text-[#52636C] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search specialty or symptom..."
                aria-label="Search medical specialties"
                className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-[#102B3F]/20 rounded-sm focus:border-[#36A89A]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F1F4F3] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {filtered.length === 0 ? (
            <div className="p-12 bg-white border border-[#102B3F]/12 rounded-sm text-center space-y-3">
              <p className="font-display text-2xl text-[#102B3F]">No matching departments found</p>
              <p className="text-sm text-[#52636C]">
                Try searching for Cardiology, Migraine, Knee, Skin, or clear your search filter.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="px-5 py-2.5 bg-[#102B3F] text-[#FAFAF7] text-xs font-medium rounded-sm cursor-pointer"
              >
                Show All 8 Specialties
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((spec, idx) => (
                <Reveal key={spec.slug} delay={idx * 0.04}>
                  <article className="h-full bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm p-7 sm:p-8 flex flex-col justify-between gap-6 hover:border-[#36A89A] transition-colors group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-sm bg-white border border-[#102B3F]/12 flex items-center justify-center text-[#36A89A]">
                            <SpecialtyIcon name={spec.iconName} className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#856830] tabular-nums">
                              Department {spec.number}
                            </span>
                            <h2 className="font-display text-2xl text-[#102B3F]">{spec.name}</h2>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#52636C] bg-white px-3 py-1 rounded-sm border border-[#102B3F]/10 tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-[#36A89A]" />
                          {spec.consultationDuration}
                        </span>
                      </div>

                      <p className="text-sm text-[#52636C] leading-relaxed">
                        {spec.fullDescription}
                      </p>

                      <div className="pt-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#102B3F] mb-2">
                          Key Focus Areas
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {spec.conditions.slice(0, 3).map((cond) => (
                            <span
                              key={cond}
                              className="text-xs px-2.5 py-1 bg-white border border-[#102B3F]/10 text-[#24323A] rounded-sm"
                            >
                              {cond}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-[#102B3F]/10 flex items-center justify-between gap-4">
                      <Link
                        to={`/specialties/${spec.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B3F] hover:text-[#36A89A] transition-colors"
                      >
                        <span>Explore Department</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        to={`/book?specialty=${spec.slug}`}
                        className="px-4 py-2 bg-[#102B3F] text-[#FAFAF7] text-xs font-medium rounded-sm hover:bg-[#193D57] transition-colors"
                      >
                        Book Consultation
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

