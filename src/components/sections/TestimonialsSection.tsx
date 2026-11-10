import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/clinicData';
import { Reveal } from '../Reveal';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const current = TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      aria-label="Illustrative patient testimonials"
      className="bg-[#102B3F] text-[#FAFAF7] py-20 lg:py-28 border-b border-[#C7A76C]/25"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-10">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C7A76C]">
                Patient Perspectives (Illustrative)
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#FAFAF7] mt-2">
                Experiences Designed Around Calm & Clarity
              </h2>
            </div>
            <p className="text-xs text-[#CBD5DC]/80 max-w-xs">
              Fictional demonstration testimonials showcasing patient experience storytelling.
            </p>
          </div>
        </Reveal>

        <div
          className="relative bg-white/5 border border-white/15 rounded-sm p-7 sm:p-10 lg:p-12"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
          }}
        >
          <Quote className="w-8 h-8 text-[#C7A76C]/60 mb-6" aria-hidden="true" />

          <div className="min-h-[160px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="space-y-8 w-full"
              >
                <blockquote className="font-display text-xl sm:text-2xl lg:text-[1.7rem] text-[#FAFAF7] leading-relaxed font-normal">
                  “{current.quote}”
                </blockquote>

                <div className="pt-6 border-t border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-sm bg-[#FAFAF7] text-[#102B3F] font-display text-base font-semibold flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      {current.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#FAFAF7]">
                        {current.illustrativeName}
                      </p>
                      <p className="text-xs text-[#C7A76C] mt-0.5">
                        {current.department} · {current.visitContext}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#CBD5DC]/75 border border-white/15 px-3 py-1 rounded-sm self-start sm:self-center">
                    Illustrative Example
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
              {TESTIMONIALS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`View illustrative testimonial ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'w-8 bg-[#C7A76C]'
                      : 'w-2 bg-white/30 hover:bg-white/55'
                  }`}
                />
              ))}
              <span className="ml-3 text-xs text-[#CBD5DC] tabular-nums">
                {activeIndex + 1} / {TESTIMONIALS.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-sm border border-white/20 text-[#FAFAF7] flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-sm border border-white/20 text-[#FAFAF7] flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

