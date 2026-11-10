import { useState } from 'react';
import { Expand } from 'lucide-react';
import { FACILITIES } from '../../data/clinicData';
import { Reveal } from '../Reveal';
import { FacilityLightboxModal } from '../FacilityLightboxModal';

export function FacilitiesGallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="facilities" className="bg-[#F1F4F3] py-20 lg:py-28 border-b border-[#102B3F]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#102B3F]/12">
            <div className="max-w-2xl space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#856830]">
                Architecture & Technology
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#102B3F] leading-tight">
                Modern Clinic Facilities Built for Quiet Confidence
              </h2>
            </div>
            <p className="text-sm text-[#52636C] max-w-sm">
              Every space is acoustically buffered and illuminated by natural light—paired with
              calibrated clinical instrumentation. Click any photograph to inspect.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {FACILITIES.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.05} className={item.aspectClass.split(' ').find((c) => c.startsWith('md:col-span')) || 'md:col-span-4'}>
              <article className="h-full bg-[#FAFAF7] border border-[#102B3F]/12 rounded-sm overflow-hidden flex flex-col justify-between group">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-full overflow-hidden bg-[#E6EAE8] cursor-pointer text-left ${
                    idx < 2 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                  aria-label={`Inspect photograph of ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={`${item.title} — ${item.caption}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 right-3 w-9 h-9 rounded-sm bg-[#FAFAF7]/90 border border-[#102B3F]/15 text-[#102B3F] flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:bg-[#102B3F] group-hover:text-[#FAFAF7] transition-all">
                    <Expand className="w-4 h-4" />
                  </span>
                </button>

                <div className="p-5 sm:p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#258075]">
                      {item.category}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl text-[#102B3F] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52636C] mt-1.5 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#856830] font-medium pt-2 border-t border-[#102B3F]/8">
                    {item.architecturalNote}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <FacilityLightboxModal
        facilities={FACILITIES}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </section>
  );
}

