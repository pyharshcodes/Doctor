import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FAQS } from '../../data/clinicData';
import { Reveal } from '../Reveal';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="faq" className="bg-[#FAFAF7] py-20 lg:py-28 border-b border-[#102B3F]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
              Patient Guidance
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#102B3F] leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#52636C] leading-relaxed">
              Clear answers about appointments, specialist choice, diagnostic preparation, and
              demonstration booking behavior.
            </p>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#102B3F] hover:text-[#36A89A] transition-colors pt-2 group"
            >
              <span>Visit Patient Resources</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="lg:col-span-8 divide-y divide-[#102B3F]/12 border-t border-b border-[#102B3F]/12">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              const panelId = `faq-panel-${faq.id}`;
              return (
                <div key={faq.id} className="py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full text-left flex items-center justify-between gap-4 py-1 cursor-pointer group"
                  >
                    <span className="font-display text-xl sm:text-[1.35rem] text-[#102B3F] group-hover:text-[#36A89A] transition-colors">
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-sm border border-[#102B3F]/15 flex items-center justify-center text-[#102B3F] shrink-0 group-hover:border-[#36A89A]">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 pr-10 text-sm sm:text-[0.95rem] text-[#52636C] leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

