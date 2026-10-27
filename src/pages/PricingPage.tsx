import React, { useState } from 'react';
import { PageRoute } from '../types';
import { PageHero } from '../components/PageHero';
import { PRICING_PLANS, ADDONS } from '../data/mockData';
import { 
  Check, 
  X, 
  Sparkles, 
  Info, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  RotateCcw,
  CheckCheck
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: PageRoute) => void;
  onBookWithPrefill: (prefill: any) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigate,
  onBookWithPrefill,
}) => {
  const [frequencyDiscount, setFrequencyDiscount] = useState<'one-time' | 'bi-weekly' | 'weekly' | 'monthly'>('bi-weekly');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['oven']);

  const getDiscountMultiplier = () => {
    switch (frequencyDiscount) {
      case 'weekly': return 0.80; // 20% off
      case 'bi-weekly': return 0.85; // 15% off
      case 'monthly': return 0.90; // 10% off
      default: return 1.0;
    }
  };

  const toggleAddon = (id: string) => {
    if (selectedAddonIds.includes(id)) {
      setSelectedAddonIds(selectedAddonIds.filter((item) => item !== id));
    } else {
      setSelectedAddonIds([...selectedAddonIds, id]);
    }
  };

  const addonTotal = selectedAddonIds.reduce((sum, id) => {
    const found = ADDONS.find((a) => a.id === id);
    return sum + (found ? found.price : 0);
  }, 0);

  return (
    <div className="space-y-20 lg:space-y-24 pb-16">
      
      {/* 1. Page Header */}
      <PageHero
        currentRouteName="Pricing"
        badge="Zero Hidden Fees"
        title="Simple, Transparent Cleaning Rates"
        subtitle="No mysterious surcharges or confusing estimates. Explore standardized pricing with automatic recurring savings, flexible add-ons, and free cancellation."
        onNavigate={onNavigate}
        ctaText="Book a Clean Now"
        onCtaClick={() => onNavigate('booking')}
      />

      {/* Demo Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900">
          <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold block">Demo Pricing Notice</span>
            <p className="text-amber-800 mt-0.5">
              All prices shown on this website are sample demo rates for design and layout presentation. Real commercial agreements and residential bookings are calculated based on verified property specifications.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Frequency Selector & Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Frequency selector buttons */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
            Schedule Frequency Savings
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Choose Your Cleaning Frequency
          </h2>

          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            {[
              { id: 'bi-weekly', label: 'Bi-Weekly', badge: 'Save 15%' },
              { id: 'weekly', label: 'Weekly', badge: 'Save 20%' },
              { id: 'monthly', label: 'Monthly', badge: 'Save 10%' },
              { id: 'one-time', label: 'One-Time Clean', badge: 'Standard' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFrequencyDiscount(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  frequencyDiscount === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  frequencyDiscount === tab.id ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan) => {
            const isRecurringEligible = plan.id === 'standard-recurring';
            const priceToDisplay = isRecurringEligible
              ? Math.round(plan.basePrice * getDiscountMultiplier())
              : plan.basePrice;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-white border-2 border-teal-600 shadow-xl shadow-teal-600/10'
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{plan.tagline}</p>
                  </div>

                  <div className="py-4 border-y border-slate-100 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                        ${priceToDisplay}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        / sample rate
                      </span>
                    </div>
                    {isRecurringEligible && frequencyDiscount !== 'one-time' && (
                      <p className="text-[11px] text-teal-700 font-semibold mt-1">
                        Regular price ${plan.basePrice} (discount applied)
                      </p>
                    )}
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Best for: {plan.bestFor}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {plan.notIncluded && plan.notIncluded.map((nf, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-400 line-through">
                        <X className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                        <span>{nf}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onBookWithPrefill({ serviceId: plan.id, frequency: frequencyDiscount })}
                  className={`w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    plan.popular
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Select & Customize Plan
                </button>
              </div>
            );
          })}
        </div>

      </section>

      {/* 3. Interactive Add-On Calculator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Custom Add-On Detailing
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                Calculate Optional Cleaning Add-Ons
              </h3>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-right">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Add-On Total</span>
              <span className="text-xl font-black text-teal-700 tabular-nums">${addonTotal}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
            {ADDONS.map((addon) => {
              const isSelected = selectedAddonIds.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-teal-600 shadow-sm ring-1 ring-teal-600'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                      isSelected ? 'bg-teal-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-900 block">{addon.name}</span>
                      <span className="text-[10px] text-slate-500">Includes materials & scrub</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 tabular-nums shrink-0">
                    +${addon.price}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Selected add-ons can be bundled into your main reservation in the booking portal.
            </p>
            <button
              onClick={() => onBookWithPrefill({ addons: selectedAddonIds })}
              className="px-6 py-2.5 bg-slate-900 hover:bg-teal-600 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Continue to Booking with Selected Add-Ons →
            </button>
          </div>

        </div>
      </section>

      {/* 4. Pricing Guarantees Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">No Hidden Fees</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                The price you see is the price you pay. All eco-friendly supplies, HEPA equipment, and taxes are bundled transparently.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Cancel or Reschedule Free</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Life happens. Reschedule or pause recurring cleanings up to 24 hours prior with zero fees or penalties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">24-Hour Re-Clean</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                If anything doesn't meet our spotless standard, we dispatch a specialist within 24 hours to re-clean for free.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
