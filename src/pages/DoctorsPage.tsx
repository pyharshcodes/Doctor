import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import type { Doctor } from '../data/clinicData';
import { DOCTORS } from '../data/clinicData';
import { PageTransition, Reveal } from '../components/Reveal';
import { DoctorProfileModal } from '../components/DoctorProfileModal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function DoctorsPage() {
  useDocumentTitle(
    'Expert Doctors & Consultants — AURELIA Medical Centre',
    'Meet AURELIA Medical Centre’s board-certified specialists in Cardiology, Neurology, Orthopedics, Dermatology, and multidisciplinary departments.'
  );

  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const categories = useMemo(() => {
    const names = Array.from(new Set(DOCTORS.map((d) => d.specialtyName)));
    return ['all', ...names];
  }, []);

  const visibleDoctors = useMemo(() => {
    if (filterSpecialty === 'all') return DOCTORS;
    return DOCTORS.filter((d) => d.specialtyName === filterSpecialty);
  }, [filterSpecialty]);

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] pt-14 pb-12 border-b border-[#102B3F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
              Medical Faculty
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-[#102B3F]">
              Senior Specialists & Department Leads
            </h1>
            <p className="text-sm sm:text-base text-[#52636C]">
              Every physician listed is an illustrative demonstration profile showcasing credentials,
              consultation schedules, and seamless booking links.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => {
              const active = filterSpecialty === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterSpecialty(cat)}
                  className={`px-4 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#102B3F] text-[#FAFAF7] border-[#102B3F]'
                      : 'bg-white text-[#102B3F] border-[#102B3F]/15 hover:border-[#36A89A]'
                  }`}
                >
                  {cat === 'all' ? 'All Departments' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F1F4F3] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDoctors.map((doc, idx) => (
            <Reveal key={doc.slug} delay={idx * 0.04}>
              <article className="h-full bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm overflow-hidden flex flex-col justify-between group">
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedDoctor(doc)}
                    className="w-full aspect-[3/4] overflow-hidden bg-[#102B3F] block cursor-pointer text-left"
                    aria-label={`Open clinical profile for ${doc.name}`}
                  >
                    {doc.image ? (
                      <img
                        src={doc.image}
                        alt={doc.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#FAFAF7] p-6">
                        <span className="font-display text-4xl tracking-wider">{doc.initials}</span>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#C7A76C] mt-2">
                          {doc.specialtyName}
                        </span>
                      </div>
                    )}
                  </button>

                  <div className="p-6 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#258075]">
                      {doc.role}
                    </p>
                    <h2 className="font-display text-2xl text-[#102B3F]">{doc.name}</h2>
                    <p className="text-xs text-[#52636C]">{doc.qualifications}</p>
                    <p className="text-xs font-semibold text-[#102B3F] pt-1">{doc.experience}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#102B3F]/10 space-y-3">
                  <p className="text-xs text-[#52636C] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C7A76C]" />
                    <span>{doc.availability}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/book?specialty=${doc.specialtySlug}&doctor=${doc.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#102B3F] text-[#FAFAF7] text-xs font-medium rounded-sm hover:bg-[#193D57]"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#C7A76C]" />
                      <span>Book</span>
                    </Link>
                    <Link
                      to={`/doctors/${doc.slug}`}
                      className="inline-flex items-center justify-center gap-1 py-2.5 px-3 border border-[#102B3F]/20 text-[#102B3F] text-xs font-medium rounded-sm hover:bg-white"
                    >
                      <span>Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <DoctorProfileModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </PageTransition>
  );
}

