import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SPECIALTIES } from '../../data/clinicData';
import { Reveal } from '../Reveal';
import { SpecialtyIcon } from '../SpecialtyIcon';

export function SpecialtiesSection() {
  const cardiology = SPECIALTIES[0];
  const neurology = SPECIALTIES[1];
  const middleRow = SPECIALTIES.slice(2, 5); // Orthopedics, Dermatology, Pediatrics
  const bottomRow = SPECIALTIES.slice(5, 8); // Gynecology, Dentistry, General Medicine

  return (
    <section id="specialties" className="bg-[#FAFAF7] py-20 lg:py-28 border-b border-[#102B3F]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#102B3F]/12">
            <div className="max-w-2xl space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
                Medical Specialties
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#102B3F] leading-tight">
                Multidisciplinary Precision Across Eight Core Clinics
              </h2>
            </div>
            <Link
              to="/specialties"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#102B3F] hover:text-[#36A89A] transition-colors self-start md:self-auto group"
            >
              <span>View All Departments</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* Tier 1: Asymmetric Featured Duo (Cardiology Photo Split + Neurology Dark Editorial) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 01 Cardiology */}
          <Reveal className="lg:col-span-7">
            <article className="h-full bg-white border border-[#102B3F]/12 rounded-sm overflow-hidden grid grid-cols-1 sm:grid-cols-12 group">
              <div className="sm:col-span-5 overflow-hidden bg-[#F1F4F3] min-h-[220px]">
                {cardiology.image && (
                  <img
                    src={cardiology.image}
                    alt="Precision cardiology stethoscope on honed oak and travertine desk"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="sm:col-span-7 p-7 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tabular-nums text-[#856830] tracking-widest">
                      {cardiology.number} · FEATURED CENTRE
                    </span>
                    <div className="w-9 h-9 rounded-sm bg-[#F1F4F3] flex items-center justify-center text-[#36A89A]">
                      <SpecialtyIcon name={cardiology.iconName} className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#102B3F]">
                    {cardiology.name}
                  </h3>
                  <p className="text-sm text-[#52636C] leading-relaxed">
                    {cardiology.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cardiology.diagnostics.slice(0, 2).map((d) => (
                      <span
                        key={d}
                        className="text-[11px] px-2.5 py-1 bg-[#F1F4F3] text-[#102B3F] rounded-sm"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/specialties/${cardiology.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B3F] group-hover:text-[#36A89A] transition-colors"
                >
                  <span>Explore More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          </Reveal>

          {/* 02 Neurology — Deep Navy Editorial Feature */}
          <Reveal delay={0.08} className="lg:col-span-5">
            <article className="h-full bg-[#102B3F] text-[#FAFAF7] border border-[#102B3F] rounded-sm p-7 sm:p-8 flex flex-col justify-between gap-6 relative overflow-hidden group">
              {/* Subtle geometric architectural SVG line */}
              <svg
                aria-hidden="true"
                viewBox="0 0 260 120"
                fill="none"
                className="absolute right-0 bottom-0 w-56 opacity-20 pointer-events-none"
              >
                <path
                  d="M10 95C50 95 60 35 100 35C140 35 150 80 190 80C220 80 235 45 255 25"
                  stroke="#36A89A"
                  strokeWidth="1.5"
                />
                <circle cx="100" cy="35" r="3.5" fill="#C7A76C" />
                <circle cx="190" cy="80" r="3.5" fill="#C7A76C" />
              </svg>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tabular-nums text-[#C7A76C] tracking-widest">
                    {neurology.number} · SPECIALIST SUITE
                  </span>
                  <div className="w-9 h-9 rounded-sm bg-white/10 border border-white/15 flex items-center justify-center text-[#36A89A]">
                    <SpecialtyIcon name={neurology.iconName} className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#FAFAF7]">
                  {neurology.name}
                </h3>
                <p className="text-sm text-[#CBD5DC] leading-relaxed">
                  {neurology.shortDescription}
                </p>

                <ul className="pt-1 space-y-1.5 text-xs text-[#CBD5DC]/90">
                  {neurology.conditions.slice(0, 3).map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#C7A76C]" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/specialties/${neurology.slug}`}
                className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-[#E3C892] hover:text-white transition-colors"
              >
                <span>Explore More</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </article>
          </Reveal>
        </div>

        {/* Tier 2: Three Distinct Editorial Cards (Orthopedics, Dermatology, Pediatrics) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {middleRow.map((spec, idx) => {
            const surfaceVariants = [
              'bg-[#F1F4F3] border-[#102B3F]/12',
              'bg-white border-[#102B3F]/12',
              'bg-[#FAFAF7] border-[#C7A76C]/45',
            ];
            return (
              <Reveal key={spec.slug} delay={idx * 0.06}>
                <article
                  className={`h-full p-7 rounded-sm border flex flex-col justify-between gap-6 transition-colors duration-200 hover:border-[#36A89A] group ${surfaceVariants[idx]}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-sm bg-white border border-[#102B3F]/12 flex items-center justify-center text-[#102B3F] group-hover:text-[#36A89A] transition-colors">
                        <SpecialtyIcon name={spec.iconName} className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-[#856830]">
                        {spec.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-2xl text-[#102B3F]">{spec.name}</h3>
                      <p className="text-xs font-medium text-[#258075] mt-1">
                        {spec.shortTagline}
                      </p>
                    </div>

                    <p className="text-sm text-[#52636C] leading-relaxed">
                      {spec.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#102B3F]/10 flex items-center justify-between">
                    <span className="text-xs text-[#52636C] tabular-nums">
                      {spec.consultationDuration}
                    </span>
                    <Link
                      to={`/specialties/${spec.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#102B3F] group-hover:text-[#36A89A] transition-colors"
                    >
                      <span>Explore More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Tier 3: Structured Horizontal Editorial Columns (Gynecology, Dentistry, General Medicine) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#102B3F]/12 border border-[#102B3F]/12 rounded-sm overflow-hidden">
          {bottomRow.map((spec, idx) => (
            <Reveal key={spec.slug} delay={idx * 0.05} className="bg-white">
              <article className="h-full p-7 flex flex-col justify-between gap-5 hover:bg-[#FAFAF7] transition-colors group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold tabular-nums text-[#856830]">
                      {spec.number}
                    </span>
                    <div className="h-px flex-1 bg-[#102B3F]/10" />
                    <SpecialtyIcon name={spec.iconName} className="w-4 h-4 text-[#36A89A]" />
                  </div>

                  <h3 className="font-display text-2xl text-[#102B3F]">{spec.name}</h3>
                  <p className="text-sm text-[#52636C] leading-relaxed">{spec.shortDescription}</p>
                </div>

                <Link
                  to={`/specialties/${spec.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B3F] group-hover:text-[#36A89A] transition-colors"
                >
                  <span>Explore More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

