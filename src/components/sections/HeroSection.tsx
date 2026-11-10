import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] border-b border-[#102B3F]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#F1F4F3] border border-[#102B3F]/12 rounded-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A76C]" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#102B3F]">
                Excellence in Healthcare
              </span>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.15rem] text-[#102B3F] leading-[1.08] font-medium tracking-[-0.02em]">
                Healthcare <em className="italic font-normal text-[#102B3F]">That Puts</em> You
                First.
              </h1>

              <p className="text-base sm:text-[1.1rem] text-[#52636C] leading-relaxed max-w-xl">
                Personalized medical care, experienced specialists, and a commitment to helping you
                live healthier, happier lives.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link
                to="/book"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium tracking-[0.02em] rounded-sm hover:bg-[#193D57] transition-colors group"
              >
                <Calendar className="w-4 h-4 text-[#C7A76C]" />
                <span>Book an Appointment</span>
                <ArrowUpRight className="w-4 h-4 text-[#C7A76C] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href="#specialties"
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#102B3F]/20 text-[#102B3F] text-sm font-medium rounded-sm hover:border-[#102B3F] hover:bg-[#F1F4F3] transition-colors"
              >
                <span>Explore Our Specialties</span>
              </a>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="pt-6 border-t border-[#102B3F]/10 grid grid-cols-3 gap-4 max-w-lg"
            >
              <div>
                <p className="font-display text-lg text-[#102B3F] tabular-nums">30–45 min</p>
                <p className="text-xs text-[#52636C] mt-0.5">Unhurried consultations</p>
              </div>
              <div>
                <p className="font-display text-lg text-[#102B3F]">Same-Floor</p>
                <p className="text-xs text-[#52636C] mt-0.5">Integrated diagnostics</p>
              </div>
              <div>
                <p className="font-display text-lg text-[#102B3F]">Concierge</p>
                <p className="text-xs text-[#52636C] mt-0.5">Coordinated follow-ups</p>
              </div>
            </motion.div>
          </div>

          {/* Right Architectural Image Column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative lg:pl-6"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Architectural offset border accent */}
              <div
                className="hidden sm:block absolute -top-3 -right-3 inset-y-4 left-6 border border-[#C7A76C]/45 rounded-sm pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden rounded-sm border border-[#102B3F]/12 bg-[#F1F4F3]">
                <img
                  src="/images/hero-doctor.jpg"
                  alt="Senior physician standing in the sunlit limestone atrium of AURELIA Medical Centre"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>

              {/* Floating Experience Indicator */}
              <div className="sm:absolute sm:-left-6 sm:top-10 mt-3 sm:mt-0 bg-[#FAFAF7] border border-[#102B3F]/14 px-5 py-4 rounded-sm max-w-[230px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#856830]">
                  Clinical Heritage
                </p>
                <p className="font-display text-2xl text-[#102B3F] mt-1 tabular-nums">15+ Years</p>
                <p className="text-xs text-[#52636C] mt-0.5">
                  Multidisciplinary excellence across 12 medical specialties
                </p>
              </div>

              {/* Small Appointment Availability Element */}
              <Link
                to="/book"
                className="sm:absolute sm:right-5 sm:bottom-5 mt-3 sm:mt-0 flex items-center justify-between gap-4 bg-[#102B3F] text-[#FAFAF7] px-5 py-3.5 rounded-sm border border-white/15 hover:bg-[#193D57] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#36A89A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#36A89A]" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#C7A76C] font-semibold">
                      Consultations Open
                    </p>
                    <p className="text-xs text-[#FAFAF7] flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-[#36A89A]" />
                      <span>Next Demo Slot: Tomorrow · 9:00 AM</span>
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#C7A76C] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Subtle Animated Scroll Indicator */}
        <div className="hidden md:flex justify-center pt-12">
          <a
            href="#credibility"
            className="inline-flex flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#52636C] hover:text-[#102B3F] transition-colors"
            aria-label="Scroll down to clinic credentials"
          >
            <span>Scroll to explore</span>
            <motion.span
              animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4 text-[#C7A76C]" />
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
}

