import React from 'react';
import { PageRoute } from '../types';
import { PageHero } from '../components/PageHero';
import { IMAGES } from '../data/mockData';
import { 
  ShieldCheck, 
  Users, 
  Leaf, 
  Award, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 lg:space-y-24 pb-16">
      
      {/* 1. Header Banner */}
      <PageHero
        currentRouteName="About Us"
        badge="Our Heritage & Philosophy"
        title="Elevating Cleaning into a Professional Craft"
        subtitle="CleanSwift was founded with a clear mission: to replace unreliable domestic cleaning with transparent, hospital-grade hygiene, certified eco-friendly science, and five-star hospitality."
        onNavigate={onNavigate}
        ctaText="Book a Cleaning Specialist"
        onCtaClick={() => onNavigate('booking')}
      />

      {/* 2. Story & Origin Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              We Believed Cleaning Deserved Better Standards.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              In 2018, CleanSwift was born out of frustration with inconsistent gig-economy cleaning apps, caustic chemical odors, and untrustworthy contractor networks. We asked a simple question: what if professional cleaning was treated as a rigorous, respected discipline?
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We built our company from the ground up on three non-negotiables: investing in career specialists with living wages and full benefits, eliminating caustic chlorine chemicals in favor of EPA Safer Choice botanicals, and guaranteeing our work with zero excuses.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
                <span className="text-2xl font-extrabold text-teal-800 tabular-nums">98.4%</span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Client Retention Rate</p>
                <p className="text-[11px] text-slate-500">Recurring clients stay year-over-year</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">Top 3%</span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Hiring Acceptance</p>
                <p className="text-[11px] text-slate-500">Rigorously screened & vetted</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/10] bg-slate-100">
              <img
                src={IMAGES.aboutTeam}
                alt="CleanSwift professional cleaning specialists"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-bold">The CleanSwift Field Crew</p>
                  <p className="text-xs text-slate-200">Trained, bonded, insured, and committed to perfection</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. The 4 CleanSwift Pillars */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              How We Deliver Unmatched Consistency
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Every appointment is guided by institutional standards, not guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Career Specialists</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We do not hire temporary sub-contractors. Our team members are career W-2 employees with comprehensive healthcare, continuous training, and career progression.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Green Chemistry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% plant-derived surfactants, citrus terpenes, and lactic acid antimicrobials. No caustic sodium hypochlorite bleach or lung-irritating chemical scents.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Cross-Contamination</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We strictly enforce color-coded microfiber towels: red for toilets, yellow for bathroom counters, blue for kitchens, and green for common living spaces.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Ironclad Protection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Backed by a $2,000,000 comprehensive commercial liability policy, full worker compensation, and a 24-hour no-questions-asked re-clean guarantee.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Equipment & Scientific Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Industrial Rigor
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Hospital-Grade Equipment in Every Household
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ordinary household brooms and consumer vacuums merely circulate fine particulate dust into the air. CleanSwift equips every team with commercial four-stage filtration and ergonomic tools designed for precision.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">True HEPA Sealed Vacuums</h4>
                    <p className="text-xs text-slate-500">Traps 99.97% of airborne pollen, pet dander, and microscopic dust down to 0.3 microns.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Microfiber Density &gt; 300 GSM</h4>
                    <p className="text-xs text-slate-500">Micro-grooved fibers physically lift grease and trap 99% of surface pathogens with water and natural enzymes alone.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Biodegradable Enzymatic Digestants</h4>
                    <p className="text-xs text-slate-500">Organic enzymes safely dissolve grease, starches, and protein deposits without damaging delicate stone or marble.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 shadow-md">
              <img
                src={IMAGES.deepCleaning}
                alt="Detailed sanitary cleaning technique"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Call to action banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold">Experience the CleanSwift Difference Firsthand</h3>
            <p className="text-sm text-slate-400 mt-1">Book a residential or commercial trial clean with full satisfaction guarantee.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('booking')}
              className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm border border-slate-700 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
