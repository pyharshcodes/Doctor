import { TRUST_STATS } from '../../data/clinicData';
import { AnimatedCounter } from '../AnimatedCounter';
import { Reveal } from '../Reveal';

export function TrustCredibilitySection() {
  return (
    <section id="credibility" aria-label="Clinic credentials and care philosophy">
      {/* Authoritative Deep Navy Statistics Band */}
      <div className="bg-[#102B3F] text-[#FAFAF7] py-16 sm:py-20 border-b border-[#C7A76C]/25">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/12">
            {TRUST_STATS.map((stat, idx) => (
              <Reveal key={stat.id} delay={idx * 0.06} className="lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <div className="space-y-2">
                  <p className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] text-[#FAFAF7] font-medium tracking-tight">
                    <AnimatedCounter target={stat.numericValue} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm font-semibold text-[#E3C892] tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-xs text-[#CBD5DC]/80">{stat.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 pt-6 border-t border-white/10 text-[11px] text-[#CBD5DC]/70 tracking-wide">
            Note: Figures above are illustrative clinic demonstration statistics for design showcase purposes, not verified medical claims.
          </p>
        </div>
      </div>

      {/* Patient-First Healthcare Statement */}
      <div className="bg-[#F1F4F3] border-b border-[#102B3F]/10 py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830] mb-4">
              The AURELIA Commitment
            </p>
            <blockquote className="font-display text-2xl sm:text-3xl text-[#102B3F] leading-snug font-normal">
              “Modern medicine deserves an unhurried environment—where every diagnosis is explained
              with honesty, every specialty communicates seamlessly, and every patient feels deeply
              heard.”
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

