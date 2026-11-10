import { Link } from 'react-router-dom';
import { Calendar, ClipboardList, FileText, ShieldCheck } from 'lucide-react';
import { PageTransition, Reveal } from '../components/Reveal';
import { FaqSection } from '../components/sections/FaqSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const PREP_GUIDES = [
  {
    icon: ClipboardList,
    title: 'First-Visit Checklist',
    points: [
      'Government-issued photo identification',
      'Diagnostic imaging or lab reports from the past 6 months',
      'Current list of prescriptions and dosage schedules',
      'Arrive 10 minutes before your slot for calm valet & concierge check-in',
    ],
  },
  {
    icon: FileText,
    title: 'Diagnostic Preparation',
    points: [
      'Fasting lipid/glucose panels require 10–12 hours overnight fasting (water permitted)',
      'Wear two-piece comfortable attire for ECG, Echocardiography, or Joint Ultrasound',
      'Avoid caffeine 4 hours prior to stress treadmill or autonomic testing',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Fee Transparency & Demo Mode',
    points: [
      'Consultation fees are communicated clearly prior to scheduling',
      'Same-floor diagnostics are optional and explicitly consented before testing',
      'All schedules and forms in this site run locally in demonstration mode',
    ],
  },
];

export function ResourcesPage() {
  useDocumentTitle(
    'Patient Resources & FAQs — AURELIA Medical Centre',
    'Prepare for your visit at AURELIA Medical Centre with consultation checklists, diagnostic guides, and frequently asked questions.'
  );

  return (
    <PageTransition>
      <section className="bg-[#FAFAF7] pt-14 pb-16 border-b border-[#102B3F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
            Patient Resources
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#102B3F] max-w-3xl leading-tight">
            Preparing for an Unhurried Clinical Visit
          </h1>
          <p className="text-base text-[#52636C] max-w-2xl">
            Everything you need before arriving at AURELIA—from diagnostic fasting guidance to our
            patient-friendly booking policies.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#102B3F] text-[#FAFAF7] text-sm font-medium rounded-sm hover:bg-[#193D57]"
          >
            <Calendar className="w-4 h-4 text-[#C7A76C]" />
            <span>Schedule Your Visit</span>
          </Link>
        </div>
      </section>

      <section className="bg-[#F1F4F3] py-16 lg:py-24 border-b border-[#102B3F]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREP_GUIDES.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <Reveal key={guide.title} delay={idx * 0.06}>
                <div className="h-full p-7 bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm space-y-5">
                  <div className="w-11 h-11 rounded-sm bg-white border border-[#102B3F]/12 flex items-center justify-center text-[#36A89A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-display text-2xl text-[#102B3F]">{guide.title}</h2>
                  <ul className="space-y-2.5 text-sm text-[#52636C]">
                    {guide.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C7A76C] shrink-0 mt-2" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <FaqSection />
      <TestimonialsSection />
    </PageTransition>
  );
}

