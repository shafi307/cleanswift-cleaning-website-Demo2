import React from 'react';
import { PageRoute } from '../types';
import { PageHero } from '../components/PageHero';
import { IMAGES, SERVICES, ADDONS } from '../data/mockData';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  RotateCcw, 
  Check, 
  Flame, 
  Refrigerator, 
  Maximize2,
  CalendarCheck
} from 'lucide-react';

interface HouseCleaningPageProps {
  onNavigate: (page: PageRoute) => void;
  onBookWithPrefill: (prefill: any) => void;
}

export const HouseCleaningPage: React.FC<HouseCleaningPageProps> = ({
  onNavigate,
  onBookWithPrefill,
}) => {
  const service = SERVICES.find((s) => s.id === 'house-cleaning')!;

  return (
    <div className="space-y-20 lg:space-y-24 pb-16">
      
      {/* 1. Page Header */}
      <PageHero
        currentRouteName="House Cleaning"
        badge="Residential Maintenance"
        title="Residential House Cleaning for Busy Lifestyles"
        subtitle="Enjoy the serenity of a spotless home every week. Our vetted, background-checked specialists take care of the vacuuming, scrubbing, and sanitizing with pet-safe botanicals."
        onNavigate={onNavigate}
        ctaText="Book House Cleaning"
        onCtaClick={() => onBookWithPrefill({ serviceId: 'house-cleaning' })}
      />

      {/* 2. Overview & Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Signature Maintenance Service
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              A Five-Star Clean In Every Room of Your Home
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We know your home is your personal sanctuary. CleanSwift assigns the same primary cleaning specialist to your recurring appointments so you enjoy consistent, personalized care every time.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Clock className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-xs font-bold text-slate-900 block">2 - 3.5 Hours</span>
                <span className="text-[11px] text-slate-500">Typical appointment duration</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-xs font-bold text-slate-900 block">EPA Safer Choice</span>
                <span className="text-[11px] text-slate-500">Safe for children & pets</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <RotateCcw className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-xs font-bold text-slate-900 block">Same Cleaner</span>
                <span className="text-[11px] text-slate-500">Dedicated recurring specialist</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onBookWithPrefill({ serviceId: 'house-cleaning' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
              >
                <span>Schedule a House Clean From $129</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 shadow-xl">
              <img
                src={IMAGES.houseCleaning}
                alt="House cleaning marble kitchen island"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Room-by-Room Checklist Breakdown */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Room-by-Room Standards
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              What’s Included in Every Residential Visit
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Our 35-point residential checklist guarantees no surface or corner is overlooked.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.includedChecklist.map((group, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
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
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Popular Add-on Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Custom Add-Ons
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Optional Extras for Your Appointment
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Add specialty detailing directly inside our booking form with one click.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADDONS.map((addon) => (
            <div key={addon.id} className="bg-white rounded-xl p-5 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm shrink-0">
                  +
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{addon.name}</h4>
                  <p className="text-[11px] text-slate-500">Can be combined with any clean</p>
                </div>
              </div>
              <span className="text-sm font-bold text-teal-700 tabular-nums shrink-0">
                +${addon.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Recurring Frequency Discounts */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Weekly Visits</span>
              <p className="text-3xl font-black text-white mt-1 tabular-nums">20% Off</p>
              <p className="text-xs text-slate-400 mt-1">Maximum savings. Ideal for homes with children or pets.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-teal-500/50 ring-1 ring-teal-500">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Bi-Weekly (Most Popular)</span>
              <p className="text-3xl font-black text-white mt-1 tabular-nums">15% Off</p>
              <p className="text-xs text-slate-400 mt-1">Keeps your home perpetually spotless with zero effort.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Monthly Reset</span>
              <p className="text-3xl font-black text-white mt-1 tabular-nums">10% Off</p>
              <p className="text-xs text-slate-400 mt-1">Great for regular maintenance and thorough sanitizing.</p>
            </div>

          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onBookWithPrefill({ serviceId: 'house-cleaning' })}
              className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-colors cursor-pointer"
            >
              Book Recurring House Clean
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
