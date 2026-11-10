import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';
import { DemoBookingsDrawer } from './components/DemoBookingsDrawer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { SpecialtyDetailPage } from './pages/SpecialtyDetailPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#24323A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#102B3F] focus:text-[#FAFAF7] focus:text-xs focus:font-semibold focus:rounded-sm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/specialties" element={<SpecialtiesPage />} />
            <Route path="/specialties/:slug" element={<SpecialtyDetailPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:slug" element={<DoctorDetailPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<LegalPage mode="privacy" />} />
            <Route path="/terms" element={<LegalPage mode="terms" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <MobileStickyCta />
      <DemoBookingsDrawer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <AppRoutes />
      </BookingProvider>
    </BrowserRouter>
  );
}
