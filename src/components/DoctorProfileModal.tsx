import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Calendar, Clock, Languages, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Doctor } from '../data/clinicData';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

export function DoctorProfileModal({ doctor, onClose }: DoctorProfileModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!doctor) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [doctor, onClose]);

  return (
    <AnimatePresence>
      {doctor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="doctor-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#102B3F]/65 backdrop-blur-xs"
          />

          {/* Dialog */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAFAF7] border border-[#102B3F]/15 rounded-sm"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close specialist profile"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-sm bg-[#FAFAF7]/90 border border-[#102B3F]/15 text-[#102B3F] flex items-center justify-center hover:bg-[#F1F4F3] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Portrait Column */}
              <div className="md:col-span-5 bg-[#F1F4F3] border-b md:border-b-0 md:border-r border-[#102B3F]/10 flex flex-col">
                {doctor.image ? (
                  <div className="aspect-[4/5] md:flex-1 w-full overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={`${doctor.name} — ${doctor.role}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/5] md:flex-1 w-full flex items-center justify-center bg-[#102B3F] text-[#FAFAF7]">
                    <span className="font-display text-5xl tracking-wider">{doctor.initials}</span>
                  </div>
                )}
                <div className="p-5 space-y-2.5 text-xs text-[#52636C] border-t border-[#102B3F]/10 bg-[#F1F4F3]">
                  <div className="flex items-center gap-2 text-[#102B3F] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#36A89A]" />
                    <span>{doctor.availability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-3.5 h-3.5 text-[#36A89A]" />
                    <span>Languages: {doctor.languages.join(', ')}</span>
                  </div>
                  <div className="pt-1 border-t border-[#102B3F]/10 flex items-center justify-between">
                    <span>Consultation</span>
                    <span className="font-medium text-[#102B3F]">{doctor.consultationFeeDemo}</span>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#856830]">
                      {doctor.specialtyName} · {doctor.experience}
                    </p>
                    <h2
                      id="doctor-modal-title"
                      className="font-display text-2xl sm:text-3xl text-[#102B3F] mt-1.5"
                    >
                      {doctor.name}
                    </h2>
                    <p className="text-sm font-medium text-[#36A89A] mt-0.5">{doctor.role}</p>
                    <p className="text-xs text-[#52636C] mt-2 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#C7A76C] shrink-0" />
                      <span>{doctor.qualifications}</span>
                    </p>
                  </div>

                  <blockquote className="pl-4 border-l-2 border-[#C7A76C] text-sm italic text-[#24323A] leading-relaxed">
                    “{doctor.philosophy}”
                  </blockquote>

                  <p className="text-sm text-[#52636C] leading-relaxed">{doctor.bio}</p>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#102B3F] mb-2.5">
                      Primary Clinical Focus
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {doctor.clinicalFocus.map((focus) => (
                        <li
                          key={focus}
                          className="text-xs text-[#24323A] bg-[#F1F4F3] px-3 py-2 rounded-sm border border-[#102B3F]/8"
                        >
                          {focus}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#102B3F]/10 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/book?specialty=${doctor.specialtySlug}&doctor=${doctor.slug}`}
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm hover:bg-[#193D57] transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#C7A76C]" />
                    <span>Book with {doctor.name.split(' ').slice(0, 2).join(' ')}</span>
                  </Link>
                  <Link
                    to={`/doctors/${doctor.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-3 border border-[#102B3F]/20 text-[#102B3F] text-sm font-medium rounded-sm hover:bg-[#F1F4F3] transition-colors"
                  >
                    <span>Full Dossier</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

