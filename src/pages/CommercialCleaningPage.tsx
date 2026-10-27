import React, { useState } from 'react';
import { PageRoute } from '../types';
import { PageHero } from '../components/PageHero';
import { IMAGES, SERVICES } from '../data/mockData';
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  ArrowRight,
  Lock,
  CalendarCheck,
  Check
} from 'lucide-react';

interface CommercialCleaningPageProps {
  onNavigate: (page: PageRoute) => void;
  onBookWithPrefill: (prefill: any) => void;
}

export const CommercialCleaningPage: React.FC<CommercialCleaningPageProps> = ({
  onNavigate,
  onBookWithPrefill,
}) => {
  const service = SERVICES.find((s) => s.id === 'commercial-cleaning')!;
  const [submittedQuote, setSubmittedQuote] = useState(false);
  const [facilitySize, setFacilitySize] = useState('2,500 - 5,000 sq ft');
  const [frequency, setFrequency] = useState('3x per week');
  const [businessName, setBusinessName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName && contactEmail) {
      setSubmittedQuote(true);
    }
  };

  return (
    <div className="space-y-20 lg:space-y-24 pb-16">
      
      {/* 1. Page Header */}
      <PageHero
        currentRouteName="Commercial Cleaning"
        badge="Corporate & Facility Janitorial"
        title="Commercial Cleaning for Modern Workplaces"
        subtitle="Cultivate an immaculate, hygienic environment that boosts team focus, impresses corporate clients, and maintains strict confidentiality."
        onNavigate={onNavigate}
        ctaText="Request Commercial Proposal"
        onCtaClick={() => onBookWithPrefill({ serviceId: 'commercial-cleaning' })}
      />

      {/* 2. Overview & Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Facility Care Engineered for Enterprise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              A Healthier Workplace, Seamlessly Maintained After Hours
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Messy conference rooms, dusty monitors, and neglected breakrooms silently diminish employee productivity and tarnish your company reputation. CleanSwift provides vetted, security-trained crews who arrive after your workday concludes and leave your offices sparkling before 7:00 AM.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Lock className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-xs font-bold text-slate-900 block">Security Trained</span>
                <span className="text-[11px] text-slate-500">NDAs & alarm access audited</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Clock className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-xs font-bold text-slate-900 block">After-Hours Care</span>
                <span className="text-[11px] text-slate-500">Evenings & weekend schedules</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-teal-600 mb-2" />
                <span className="text-xs font-bold text-slate-900 block">$2M Insured</span>
                <span className="text-[11px] text-slate-500">Comprehensive liability policy</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 shadow-xl">
              <img
                src={IMAGES.commercialCleaning}
                alt="Sanitized corporate office with glass conference room"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Sectors We Specialize In */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Industry Experience
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Facilities We Clean Every Week
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From open-plan tech startups to sterile medical practices and retail flagships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Tech & Creative Studios</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sanitizing dual-monitor workstation desks, keyboards, glass whiteboards, acoustic phone booths, and kitchen barista bars.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Medical, Dental & Wellness</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clinical disinfection of patient reception lounges, examination surfaces, restrooms, and specialized touchpoint sterilization.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Retail Flagships & Boutiques</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Streak-free storefront glass, dustless merchandise shelving, polished concrete floors, and spotless fitting room maintenance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Commercial Janitorial Scope */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Scope of Service
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Standard Commercial Janitorial Protocol
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every shift follows our structured facility compliance log.
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

      {/* 5. Custom Commercial Proposal Request Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-xl mx-auto text-center mb-8">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Bespoke Corporate Quotes
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              Get a Customized Facility Proposal
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Our operations supervisor will conduct a virtual or on-site walk-through and deliver a fixed-rate monthly janitorial agreement within 24 hours.
            </p>
          </div>

          {submittedQuote ? (
            <div className="bg-teal-900/60 border border-teal-500/40 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Commercial Proposal Request Received!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you! Our operations director will reach out to {contactEmail} to coordinate a walk-through. (Demo submission acknowledged).
              </p>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Acme Studios Inc."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="facilities@acme.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Facility Size</label>
                  <select
                    value={facilitySize}
                    onChange={(e) => setFacilitySize(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option>Under 2,500 sq ft</option>
                    <option>2,500 - 5,000 sq ft</option>
                    <option>5,000 - 10,000 sq ft</option>
                    <option>10,000+ sq ft campus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Desired Schedule</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option>Daily (5 nights / week)</option>
                    <option>3x per week (Mon / Wed / Fri)</option>
                    <option>2x per week</option>
                    <option>Weekend only deep sweep</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs sm:text-sm transition-colors cursor-pointer mt-2"
              >
                Send Commercial Proposal Request
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
};
