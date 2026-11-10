import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, CalendarCheck, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BrandLogo } from './BrandLogo';
import { CLINIC_INFO } from '../data/clinicData';
import { useBookings } from '../context/bookingState';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Specialties', to: '/specialties' },
  { label: 'Doctors', to: '/doctors' },
  { label: 'Patient Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openForRoute, setOpenForRoute] = useState<string | null>(null);
  const location = useLocation();
  const routeKey = `${location.pathname}${location.search}`;
  const mobileOpen = openForRoute === routeKey;
  const { bookings, setDrawerOpen } = useBookings();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenForRoute(null);
    };
    if (mobileOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#102B3F]/10 py-3'
            : 'bg-[#FAFAF7]/90 backdrop-blur-sm border-b border-transparent py-4'
        }`}
      >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
        <BrandLogo />

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative py-1.5 text-[0.875rem] font-medium tracking-[0.01em] transition-colors duration-200 ${
                  isActive
                    ? 'text-[#102B3F]'
                    : 'text-[#52636C] hover:text-[#102B3F]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#36A89A] transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {bookings.length > 0 && (
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium tracking-wide text-[#102B3F] bg-[#F1F4F3] hover:bg-[#E4EAE8] border border-[#102B3F]/12 rounded-sm transition-colors cursor-pointer"
              aria-label={`View ${bookings.length} saved demo appointments`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#36A89A]" />
              <CalendarCheck className="w-3.5 h-3.5 text-[#36A89A]" />
              <span>Demo Bookings ({bookings.length})</span>
            </button>
          )}

          <Link
            to="/book"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#102B3F] text-[#FAFAF7] text-[0.85rem] font-medium tracking-[0.02em] rounded-sm hover:bg-[#193D57] transition-colors duration-200 group"
          >
            <span>Book Appointment</span>
            <ArrowUpRight className="w-4 h-4 text-[#C7A76C] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpenForRoute((prev) => (prev === routeKey ? null : routeKey))}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm border border-[#102B3F]/15 text-[#102B3F] hover:bg-[#F1F4F3] transition-colors cursor-pointer"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      </header>

      {/* Mobile Navigation Drawer rendered outside header to avoid backdrop-filter fixed containing block */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-[70px] bottom-0 z-50 bg-[#FAFAF7] border-t border-[#102B3F]/10 overflow-y-auto pb-24"
          >
            <div className="px-6 py-8 flex flex-col justify-between min-h-full gap-8">
              <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#102B3F]/10">
                {NAV_LINKS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `py-4 font-display text-2xl flex items-center justify-between transition-colors ${
                        isActive ? 'text-[#102B3F] font-medium' : 'text-[#52636C]'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C7A76C]" />
                  </NavLink>
                ))}
              </nav>

              <div className="space-y-4 pt-4 border-t border-[#102B3F]/12">
                {bookings.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpenForRoute(null);
                      setDrawerOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-[#102B3F]/20 bg-[#F1F4F3] text-[#102B3F] text-sm font-medium rounded-sm cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#36A89A]" />
                    <span>View Saved Demo Bookings ({bookings.length})</span>
                  </button>
                )}

                <Link
                  to="/book"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium tracking-wide rounded-sm"
                >
                  <span>Book an Appointment</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C7A76C]" />
                </Link>

                <div className="pt-2 text-xs text-[#52636C] space-y-1">
                  <p className="font-medium text-[#102B3F]">{CLINIC_INFO.hoursWeekday}</p>
                  <p>{CLINIC_INFO.phoneDisplay}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

