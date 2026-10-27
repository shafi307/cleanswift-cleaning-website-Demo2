import React, { useState } from 'react';
import { PageRoute } from '../types';
import { PageHero } from '../components/PageHero';
import { ALL_SERVICES_CATALOG } from '../data/mockData';
import { Check, ArrowRight, Sparkles, Building2, Home, Truck, Wrench, Leaf, ShieldCheck, CheckCheck } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
  onBookWithPrefill: (prefill: any) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onBookWithPrefill }) => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'specialty'>('all');

  const filteredServices = ALL_SERVICES_CATALOG.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'residential') return ['house-cleaning', 'deep-cleaning', 'green-sanitization'].includes(s.id);
    if (filter === 'commercial') return ['commercial-cleaning', 'post-construction'].includes(s.id);
    if (filter === 'specialty') return ['deep-cleaning', 'move-in-out', 'post-construction', 'green-sanitization'].includes(s.id);
    return true;
  });

  const comparisonRows = [
    { task: 'Dust all accessible flat surfaces & furniture', standard: true, deep: true, move: true },
    { task: 'Clean exterior of kitchen appliances', standard: true, deep: true, move: true },
    { task: 'Wash & disinfect bathroom sink, tub & toilet', standard: true, deep: true, move: true },
    { task: 'HEPA multi-stage vacuuming & microfiber mopping', standard: true, deep: true, move: true },
    { task: 'Empty trash cans and replace fresh liners', standard: true, deep: true, move: true },
    { task: 'Hand-wash baseboards, door trims & moldings', standard: false, deep: true, move: true },
    { task: 'Scrub tile grout lines and shower glass descaling', standard: false, deep: true, move: true },
    { task: 'Heavy degreasing of range hood & backsplash', standard: false, deep: true, move: true },
    { task: 'Inside empty kitchen cabinets & pantry drawers', standard: false, deep: false, move: true },
    { task: 'Interior oven deep scrub & interior refrigerator wash', standard: false, deep: false, move: true },
    { task: 'Closet shelving, rods & threshold detailing', standard: false, deep: false, move: true },
  ];

  return (
    <div className="space-y-20 lg:space-y-24 pb-16">
      
      {/* 1. Page Header */}
      <PageHero
        currentRouteName="Services"
        badge="Complete Service Catalog"
        title="Meticulous Cleaning Tailored to Every Space"
        subtitle="Explore our comprehensive range of residential, commercial, deep restoration, and turnover cleaning services. Transparent pricing and certified green botanicals."
        onNavigate={onNavigate}
        ctaText="Book a Cleaning Today"
        onCtaClick={() => onNavigate('booking')}
      />

      {/* 2. Interactive Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explore Our Services</h2>
            <p className="text-xs text-slate-500 mt-0.5">Filter by space type or specific requirement</p>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'specialty', label: 'Specialty / Move' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                  From ${service.startingPrice} {service.priceUnit}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  {['house-cleaning', 'commercial-cleaning', 'deep-cleaning'].includes(service.id) ? (
                    <button
                      onClick={() => onNavigate(service.id as PageRoute)}
                      className="text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
                    >
                      Detailed Checklist →
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500">Duration: {service.duration}</span>
                  )}

                  <button
                    onClick={() => onBookWithPrefill({ serviceId: service.id })}
                    className="px-4 py-2 bg-slate-900 hover:bg-teal-600 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. Detailed Comparison Checklist Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Package Comparison
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Compare What’s Included in Each Clean
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Clear delineation of regular maintenance versus intensive deep and turnover restoration.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="py-4 px-6 font-bold text-slate-900 w-2/5">Cleaning Checklist Task</th>
                <th className="py-4 px-4 font-bold text-center text-slate-900 w-1/5">
                  Standard Recurring
                </th>
                <th className="py-4 px-4 font-bold text-center text-teal-700 bg-teal-50/50 w-1/5">
                  Intensive Deep
                </th>
                <th className="py-4 px-4 font-bold text-center text-slate-900 w-1/5">
                  Move-In / Move-Out
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-6 text-slate-700 font-medium">{row.task}</td>
                  <td className="py-3 px-4 text-center">
                    {row.standard ? (
                      <CheckCheck className="w-4 h-4 text-teal-600 inline-block" />
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center bg-teal-50/20">
                    {row.deep ? (
                      <CheckCheck className="w-4 h-4 text-teal-600 inline-block" />
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.move ? (
                      <CheckCheck className="w-4 h-4 text-teal-600 inline-block" />
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Service Pledge Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold">Need a Custom Commercial or Event Scope?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              We specialize in custom facility schedules, medical office sanitization, and large post-construction cleanups. Speak with an operations coordinator today.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Contact Commercial Team
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
