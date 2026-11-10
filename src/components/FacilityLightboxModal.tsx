import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { FacilityItem } from '../data/clinicData';

interface FacilityLightboxModalProps {
  facilities: FacilityItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function FacilityLightboxModal({
  facilities,
  activeIndex,
  onClose,
  onChangeIndex,
}: FacilityLightboxModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const activeItem = activeIndex !== null ? facilities[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % facilities.length);
      }
      if (e.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + facilities.length) % facilities.length);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, facilities.length, onChangeIndex, onClose]);

  return (
    <AnimatePresence>
      {activeItem && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Clinic facility image: ${activeItem.title}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1F2E]/88 backdrop-blur-xs"
          />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-4xl bg-[#FAFAF7] border border-[#102B3F]/20 rounded-sm overflow-hidden"
          >
            <div className="relative aspect-[16/10] bg-[#102B3F]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close gallery preview"
                className="absolute top-4 right-4 w-10 h-10 rounded-sm bg-[#102B3F]/80 text-[#FAFAF7] flex items-center justify-center hover:bg-[#102B3F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  onChangeIndex((activeIndex - 1 + facilities.length) % facilities.length)
                }
                aria-label="Previous clinic space"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-[#FAFAF7]/90 text-[#102B3F] flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onChangeIndex((activeIndex + 1) % facilities.length)}
                aria-label="Next clinic space"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-[#FAFAF7]/90 text-[#102B3F] flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#856830]">
                  {activeItem.category} · {activeIndex + 1} / {facilities.length}
                </p>
                <h3 className="font-display text-2xl text-[#102B3F] mt-1">{activeItem.title}</h3>
                <p className="text-sm text-[#52636C] mt-1">{activeItem.caption}</p>
              </div>
              <span className="text-xs font-medium text-[#102B3F] bg-[#F1F4F3] px-3 py-1.5 rounded-sm border border-[#102B3F]/10 shrink-0">
                {activeItem.architecturalNote}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

