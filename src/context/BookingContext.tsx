import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { BookingContext } from './bookingState';
import type { DemoBooking } from './bookingState';

const STORAGE_KEY = 'aurelia_demo_bookings_v1';

function generateReferenceCode(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `AUR-${new Date().getFullYear()}-${digits}`;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<DemoBooking[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // Ignore storage quota errors in restricted browsing modes
    }
  }, [bookings]);

  const addBooking = useCallback(
    (payload: Omit<DemoBooking, 'id' | 'referenceCode' | 'createdAt' | 'status'>) => {
      const created: DemoBooking = {
        ...payload,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        referenceCode: generateReferenceCode(),
        createdAt: new Date().toISOString(),
        status: 'Confirmed (Demo)',
      };
      setBookings((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  const rescheduleBooking = useCallback(
    (id: string, newDateISO: string, newTimeSlot: string) => {
      setBookings((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                dateISO: newDateISO,
                timeSlot: newTimeSlot,
                status: 'Rescheduled (Demo)',
              }
            : item
        )
      );
    },
    []
  );

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const isSlotBooked = useCallback(
    (doctorSlug: string, dateISO: string, timeSlot: string) => {
      return bookings.some(
        (b) =>
          b.doctorSlug === doctorSlug &&
          b.dateISO === dateISO &&
          b.timeSlot === timeSlot
      );
    },
    [bookings]
  );

  return (
    <BookingContext.Provider
      value={{
        bookings,
        isDrawerOpen,
        setDrawerOpen,
        addBooking,
        rescheduleBooking,
        cancelBooking,
        isSlotBooked,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
