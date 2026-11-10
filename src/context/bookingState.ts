import { createContext, useContext } from 'react';

export interface DemoBooking {
  id: string;
  referenceCode: string;
  specialtySlug: string;
  specialtyName: string;
  doctorSlug: string;
  doctorName: string;
  doctorRole: string;
  dateISO: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  reason: string;
  isFirstVisit: boolean;
  createdAt: string;
  status: 'Confirmed (Demo)' | 'Rescheduled (Demo)';
}

export interface BookingContextValue {
  bookings: DemoBooking[];
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addBooking: (
    payload: Omit<DemoBooking, 'id' | 'referenceCode' | 'createdAt' | 'status'>
  ) => DemoBooking;
  rescheduleBooking: (id: string, newDateISO: string, newTimeSlot: string) => void;
  cancelBooking: (id: string) => void;
  isSlotBooked: (doctorSlug: string, dateISO: string, timeSlot: string) => boolean;
}

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return ctx;
}

