import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { Doctor } from '../../data/clinicData';
import { DOCTORS } from '../../data/clinicData';
import { Reveal } from '../Reveal';
import { DoctorProfileModal } from '../DoctorProfileModal';

export function DoctorsShowcaseSection() {
  const showcaseDoctors = DOCTORS.filter((doc) => doc.showcase);
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);

  return (
    <section id="doctors" className="bg-[#F1F4F3] py-20 lg:py-28 border-b border-[#102B3F]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#102B3F]/12">
            <div className="max-w-2xl space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
                Medical Leadership
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#102B3F] leading-tight">
                Meet Our Expert Doctors
              </h2>
              <p className="text-sm sm:text-base text-[#52636C]">
                Senior specialists united by unhurried listening, diagnostic precision, and decades
                of dedicated patient outcomes. Click any physician to inspect their full dossier.
              </p>
            </div>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#102B3F] hover:text-[#36A89A] transition-colors self-start md:self-auto group"
            >
              <span>All Clinical Consultants</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseDoctors.map((doc, idx) => (
            <Reveal key={doc.slug} delay={idx * 0.06}>
              <article className="h-full bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm overflow-hidden flex flex-col justify-between group">
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveDoctor(doc)}
                    className="w-full text-left block overflow-hidden bg-[#E9ECEB] aspect-[3/4] relative cursor-pointer focus-visible:outline-2 focus-visible:outline-[#36A89A]"
                    aria-label={`Open detailed profile for ${doc.name}`}
                  >
                    {doc.image && (
                      <img
                        src={doc.image}
                        alt={`${doc.name}, ${doc.role}`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#FAFAF7]/92 border border-[#102B3F]/12 text-[11px] font-medium text-[#102B3F] rounded-sm opacity-95 group-hover:bg-[#102B3F] group-hover:text-[#FAFAF7] transition-colors">
                      View Profile
                    </span>
                  </button>

                  <div className="p-6 space-y-2.5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#258075]">
                        {doc.role}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveDoctor(doc)}
                        className="text-left cursor-pointer hover:text-[#36A89A] transition-colors"
                      >
                        <h3 className="font-display text-2xl text-[#102B3F] mt-1">{doc.name}</h3>
                      </button>
                    </div>

                    <p className="text-xs text-[#52636C] leading-relaxed">{doc.qualifications}</p>
                    <p className="text-xs font-semibold text-[#102B3F]">{doc.experience}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#102B3F]/10 space-y-4">
                  <p className="text-xs text-[#52636C] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C7A76C] shrink-0" />
                    <span>{doc.availability}</span>
                  </p>

                  <Link
                    to={`/book?specialty=${doc.specialtySlug}&doctor=${doc.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#102B3F] text-[#FAFAF7] text-xs font-semibold tracking-wide rounded-sm hover:bg-[#193D57] transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C7A76C]" />
                    <span>Book Appointment</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <DoctorProfileModal doctor={activeDoctor} onClose={() => setActiveDoctor(null)} />
    </section>
  );
}

