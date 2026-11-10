import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, RefreshCw, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useBookings } from '../context/bookingState';
import { getDoctorBySlug } from '../data/clinicData';

function formatReadableDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getNextValidDates(availableDays: number[], count = 5): string[] {
  const result: string[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  let guard = 0;
  while (result.length < count && guard < 30) {
    if (availableDays.includes(cursor.getDay())) {
      const y = cursor.getFullYear();
      const m = String(cursor.getMonth() + 1).padStart(2, '0');
      const d = String(cursor.getDate()).padStart(2, '0');
      result.push(`${y}-${m}-${d}`);
    }
    cursor.setDate(cursor.getDate() + 1);
    guard += 1;
  }
  return result;
}

export function DemoBookingsDrawer() {
  const {
    bookings,
    isDrawerOpen,
    setDrawerOpen,
    rescheduleBooking,
    cancelBooking,
    isSlotBooked,
  } = useBookings();
  const prefersReducedMotion = useReducedMotion();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, setDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Saved Demonstration Appointments"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-[#102B3F]/50 backdrop-blur-xs"
          />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { x: '100%' }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md bg-[#FAFAF7] border-l border-[#102B3F]/15 h-full flex flex-col"
          >
            <div className="p-6 border-b border-[#102B3F]/10 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#36A89A]">
                  Local Storage Preview
                </p>
                <h2 className="font-display text-2xl text-[#102B3F] mt-0.5">
                  Demo Appointments
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close appointments drawer"
                className="w-10 h-10 rounded-sm border border-[#102B3F]/15 flex items-center justify-center text-[#102B3F] hover:bg-[#F1F4F3] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-3 bg-[#F1F4F3] border-b border-[#102B3F]/10 text-xs text-[#52636C]">
              Saved locally in your browser for showcase testing only — not connected to a real clinic.
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-sm text-[#52636C]">
                    You have no saved demonstration bookings yet.
                  </p>
                  <Link
                    to="/book"
                    onClick={() => setDrawerOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm"
                  >
                    Start Booking Experience
                  </Link>
                </div>
              ) : (
                bookings.map((b) => {
                  const doc = getDoctorBySlug(b.doctorSlug);
                  const allSlots = doc
                    ? [...doc.timeSlots.morning, ...doc.timeSlots.afternoon, ...doc.timeSlots.evening]
                    : ['09:30 AM', '11:00 AM', '02:30 PM'];
                  const dateOptions = doc ? getNextValidDates(doc.availableDays, 5) : [b.dateISO];
                  const isEditing = editingId === b.id;

                  return (
                    <div
                      key={b.id}
                      className="p-4 bg-white border border-[#102B3F]/12 rounded-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#856830] tabular-nums">
                            {b.referenceCode}
                          </span>
                          <h3 className="font-display text-lg text-[#102B3F]">{b.doctorName}</h3>
                          <p className="text-xs text-[#52636C]">{b.specialtyName}</p>
                        </div>
                        <span className="text-[11px] font-medium px-2.5 py-1 bg-[#F1F4F3] text-[#258075] border border-[#36A89A]/25 rounded-sm">
                          {b.status}
                        </span>
                      </div>

                      <div className="text-xs text-[#24323A] space-y-1 pt-2 border-t border-[#102B3F]/8">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#36A89A]" />
                          <span className="tabular-nums">{formatReadableDate(b.dateISO)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#36A89A]" />
                          <span className="tabular-nums">{b.timeSlot}</span>
                        </div>
                        <p className="text-[#52636C] pt-1">
                          Patient: <span className="text-[#102B3F] font-medium">{b.patientName}</span>
                        </p>
                      </div>

                      {isEditing ? (
                        <div className="pt-3 border-t border-[#102B3F]/10 space-y-3">
                          <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52636C] mb-1">
                              Select New Date
                            </label>
                            <select
                              value={newDate}
                              onChange={(e) => setNewDate(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-[#102B3F]/20 rounded-sm"
                            >
                              {dateOptions.map((d) => (
                                <option key={d} value={d}>
                                  {formatReadableDate(d)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#52636C] mb-1">
                              Select New Time
                            </label>
                            <select
                              value={newTime}
                              onChange={(e) => setNewTime(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-[#102B3F]/20 rounded-sm"
                            >
                              {allSlots.map((slot) => {
                                const taken =
                                  isSlotBooked(b.doctorSlug, newDate, slot) &&
                                  !(newDate === b.dateISO && slot === b.timeSlot);
                                return (
                                  <option key={slot} value={slot} disabled={taken}>
                                    {slot} {taken ? '(Reserved)' : ''}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (newDate && newTime) {
                                  rescheduleBooking(b.id, newDate, newTime);
                                  setEditingId(null);
                                }
                              }}
                              className="flex-1 py-2 px-3 bg-[#102B3F] text-[#FAFAF7] text-xs font-medium rounded-sm cursor-pointer"
                            >
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="py-2 px-3 border border-[#102B3F]/20 text-xs text-[#52636C] rounded-sm cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingId(b.id);
                              setNewDate(dateOptions[0] ?? b.dateISO);
                              setNewTime(b.timeSlot);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-[#102B3F]/20 text-xs font-medium text-[#102B3F] rounded-sm hover:bg-[#F1F4F3] cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-[#36A89A]" />
                            <span>Reschedule</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => cancelBooking(b.id)}
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-red-900/15 text-xs font-medium text-red-800 rounded-sm hover:bg-red-50 cursor-pointer"
                            aria-label={`Cancel demo booking ${b.referenceCode}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

