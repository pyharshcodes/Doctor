import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ABOUT_PILLARS } from '../../data/clinicData';
import { Reveal } from '../Reveal';

export function AboutEditorialSection() {
  return (
    <section id="about" className="bg-[#FAFAF7] py-20 lg:py-28 border-b border-[#102B3F]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Architectural Visual */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
                About AURELIA
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] text-[#102B3F] leading-[1.15]">
                More Than Medicine. A Commitment to Better Living.
              </h2>
            </div>

            <div className="overflow-hidden rounded-sm border border-[#102B3F]/12 bg-[#F1F4F3] aspect-[16/11]">
              <img
                src="/images/about-clinic.jpg"
                alt="Sunlit architectural consultation suite corridor at AURELIA Medical Centre"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-[#52636C]">
              <span>Designed for acoustic calm & dignity</span>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 font-semibold text-[#102B3F] hover:text-[#36A89A] transition-colors group"
              >
                <span>Our Clinical Story</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          {/* Right Editorial Philosophy & 5 Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <p className="text-base sm:text-lg text-[#24323A] leading-relaxed">
                Traditional clinics often force a choice between clinical thoroughness and personal
                warmth. AURELIA Medical Centre was envisioned around a calmer truth: when space,
                time, and multidisciplinary diagnostics work together intentionally, patients heal
                with greater clarity and confidence.
              </p>
            </Reveal>

            <div className="divide-y divide-[#102B3F]/12 border-t border-b border-[#102B3F]/12">
              {ABOUT_PILLARS.map((pillar, idx) => (
                <Reveal key={pillar.number} delay={idx * 0.05}>
                  <div className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-start">
                    <div className="sm:col-span-4 flex items-baseline gap-3">
                      <span className="text-xs font-semibold tabular-nums text-[#856830]">
                        {pillar.number}
                      </span>
                      <h3 className="font-display text-xl text-[#102B3F]">{pillar.title}</h3>
                    </div>
                    <p className="sm:col-span-8 text-sm text-[#52636C] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

