import React from 'react';
import { PageRoute } from '../types';
import { PageHero } from '../components/PageHero';
import { IMAGES, SERVICES } from '../data/mockData';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Flame, 
  RotateCcw,
  Check
} from 'lucide-react';

interface DeepCleaningPageProps {
  onNavigate: (page: PageRoute) => void;
  onBookWithPrefill: (prefill: any) => void;
}

export const DeepCleaningPage: React.FC<DeepCleaningPageProps> = ({
  onNavigate,
  onBookWithPrefill,
}) => {
  const service = SERVICES.find((s) => s.id === 'deep-cleaning')!;

  return (
    <div className="space-y-20 lg:space-y-24 pb-16">
      
      {/* 1. Page Header */}
      <PageHero
        currentRouteName="Deep Cleaning"
        badge="Restorative 50-Point Sanitization"
        title="Intensive Deep Cleaning & Grout Restoration"
        subtitle="A comprehensive restorative clean that reaches deep into grout lines, baseboard crevices, grease-laden hoods, and neglected corners to reset your property."
        onNavigate={onNavigate}
        ctaText="Book a Deep Clean from $219"
        onCtaClick={() => onBookWithPrefill({ serviceId: 'deep-cleaning' })}
      />

      {/* 2. Overview & Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              The 50-Point Deep Clean Guarantee
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Beneath the Surface: Eradicating Months of Built-Up Grime
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Standard recurring cleaning is designed to maintain an already clean home. Our Intensive Deep Clean is a labor-intensive restorative treatment designed to tackle accumulated mineral scale, soap residue, baked-on grease, and fine particulate dust settled into architectural trim.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Clock className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-xs font-bold text-slate-900 block">4 - 6 Hours</span>
                <span className="text-[11px] text-slate-500">Meticulous deep detailing</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Layers className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-xs font-bold text-slate-900 block">50-Point List</span>
                <span className="text-[11px] text-slate-500">Strict quality assurance</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-xs font-bold text-slate-900 block">Restores Surfaces</span>
                <span className="text-[11px] text-slate-500">Tile, glass & baseboards</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onBookWithPrefill({ serviceId: 'deep-cleaning' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
              >
                <span>Schedule Deep Clean Starting at $219</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 shadow-xl">
              <img
                src={IMAGES.deepCleaning}
                alt="Detailed deep cleaning of bathroom tile and fixtures"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. When to Schedule a Deep Clean */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Ideal Occasions
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              When Should You Book a Deep Clean?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Four common scenarios where a standard clean isn't quite enough.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">First-Time Client Reset</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We strongly recommend a deep clean for first-time clients to establish a pristine baseline before switching to recurring maintenance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">Seasonal Spring / Fall Clean</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Purge winter furnace dust, wash pollen off window tracks, and scrub baseboards as seasons transition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">Holiday & Event Prep</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensure guest bathrooms, kitchen appliances, and dining gathering zones are gleaming before hosting family and friends.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900">Post-Illness Disinfection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hospital-grade botanical sanitization of door knobs, handles, plumbing fixtures, and shared touchpoints to halt germ recurrence.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Detailed Checklist Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Exhaustive Standards
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Deep Clean Priority Checklist
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every room receives our signature deep detailing treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {service.includedChecklist.map((group, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="inline-block px-3 py-1 bg-teal-50 text-teal-800 rounded-lg text-xs font-bold mb-4">
                {group.category}
              </div>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Booking call to action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
            Ready for a Complete Reset?
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto">
            Book an Intensive Deep Clean Today
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Select your square footage, customize add-ons like oven or refrigerator detailing, and choose your arrival window in our 60-second booking form.
          </p>
          <div>
            <button
              onClick={() => onBookWithPrefill({ serviceId: 'deep-cleaning' })}
              className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-colors cursor-pointer"
            >
              Configure Deep Clean Appointment
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
