import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, HeartHandshake, Microscope, ShieldCheck } from 'lucide-react';
import { PageTransition, Reveal } from '../components/Reveal';
import { AboutEditorialSection } from '../components/sections/AboutEditorialSection';
import { TrustCredibilitySection } from '../components/sections/TrustCredibilitySection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const CLINICAL_PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: 'Evidence-First Protocols',
    description:
      'Every clinical pathway aligns with peer-reviewed guidelines—eliminating unnecessary testing while safeguarding diagnostic rigor.',
  },
  {
    icon: HeartHandshake,
    title: 'Collaborative Case Reviews',
    description:
      'Cardiologists, neurologists, internists, and orthopedists share unified records so multi-system care remains coherent.',
  },
  {
    icon: Microscope,
    title: 'Same-Floor Diagnostics',
    description:
      'High-resolution imaging, cardiac echocardiography, and clinical lab work occur steps away from your physician suite.',
  },
  {
    icon: Award,
    title: 'Quiet Hospitality',
    description:
      'Acoustic privacy, warm natural stone, and punctual scheduling reduce patient cortisol before the consultation even begins.',
  },
];

export function AboutPage() {
  useDocumentTitle(
    'About AURELIA Medical Centre — Clinical Philosophy & Heritage',
    'Discover AURELIA Medical Centre’s patient-first healthcare philosophy, modern architecture, and multidisciplinary leadership.'
  );

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] pt-14 pb-16 border-b border-[#102B3F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
            About The Clinic
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] text-[#102B3F] leading-[1.1] max-w-4xl">
            Clinical Depth Framed by Quiet Human Dignity.
          </h1>
          <p className="text-base sm:text-lg text-[#52636C] max-w-2xl leading-relaxed">
            AURELIA Medical Centre is crafted as an architectural benchmark for modern private
            clinics—demonstrating how thoughtful design earns patient trust within the very first
            five seconds.
          </p>
        </div>
      </section>

      <AboutEditorialSection />

      <section className="bg-[#F1F4F3] py-20 lg:py-24 border-b border-[#102B3F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
          <Reveal>
            <div className="max-w-2xl space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
                Governance & Quality
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#102B3F]">
                Standards That Anchor Every Consultation
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINICAL_PRINCIPLES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 0.06}>
                  <div className="h-full p-7 bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm space-y-4">
                    <div className="w-11 h-11 rounded-sm bg-white border border-[#102B3F]/12 flex items-center justify-center text-[#36A89A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl text-[#102B3F]">{item.title}</h3>
                    <p className="text-sm text-[#52636C] leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <TrustCredibilitySection />

      <section className="bg-[#FAFAF7] py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl text-[#102B3F]">
            Experience Our Consultation Journey
          </h2>
          <p className="text-sm sm:text-base text-[#52636C]">
            Meet our medical leadership or step straight into our interactive 7-step appointment
            booking concierge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm hover:bg-[#193D57]"
            >
              <span>Book an Appointment</span>
              <ArrowUpRight className="w-4 h-4 text-[#C7A76C]" />
            </Link>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#102B3F]/20 text-[#102B3F] text-sm font-medium rounded-sm hover:bg-[#F1F4F3]"
            >
              <span>Meet Our Doctors</span>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

