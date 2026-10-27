import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface QuickEstimateWidgetProps {
  onBookWithEstimate: (estimateDetails: {
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
    estimatedPrice: number;
  }) => void;
  onNavigate?: (page: PageRoute) => void;
}

export const QuickEstimateWidget: React.FC<QuickEstimateWidgetProps> = ({
  onBookWithEstimate,
}) => {
  const [serviceType, setServiceType] = useState<'house-cleaning' | 'deep-cleaning' | 'commercial-cleaning'>('house-cleaning');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [frequency, setFrequency] = useState<'one-time' | 'weekly' | 'bi-weekly' | 'monthly'>('bi-weekly');

  // Pricing calculation
  const calculateEstimate = () => {
    let base = 99;
    if (serviceType === 'deep-cleaning') base = 189;
    if (serviceType === 'commercial-cleaning') base = 219;

    const roomCost = bedrooms * 25 + bathrooms * 30;
    let subtotal = base + roomCost;

    // Discount
    let discountPct = 0;
    if (frequency === 'weekly') discountPct = 0.20;
    if (frequency === 'bi-weekly') discountPct = 0.15;
    if (frequency === 'monthly') discountPct = 0.10;

    const finalPrice = Math.round(subtotal * (1 - discountPct));
    return {
      subtotal,
      finalPrice,
      discountPct,
    };
  };

  const { subtotal, finalPrice, discountPct } = calculateEstimate();

  const handleBookNow = () => {
    onBookWithEstimate({
      serviceId: serviceType,
      bedrooms,
      bathrooms,
      frequency,
      estimatedPrice: finalPrice,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 p-6 sm:p-8">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Instant Cost Calculator
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Estimate Your Cleaning in Seconds
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Save up to 20% recurring</span>
        </div>
      </div>

      <div className="space-y-6 pt-5">
        
        {/* Service Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            1. Select Cleaning Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'house-cleaning', label: 'House Clean' },
              { id: 'deep-cleaning', label: 'Deep Clean' },
              { id: 'commercial-cleaning', label: 'Commercial' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setServiceType(s.id as any)}
                className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border text-center transition-all ${
                  serviceType === s.id
                    ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Bedrooms / Offices
              </label>
              <span className="text-sm font-bold text-teal-700">{bedrooms} {bedrooms === 1 ? 'Room' : 'Rooms'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBedrooms(num)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                    bedrooms === num
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {num}{num === 5 ? '+' : ''}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Bathrooms
              </label>
              <span className="text-sm font-bold text-teal-700">{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBathrooms(num)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                    bathrooms === num
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {num}{num === 4 ? '+' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cleaning Frequency */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Cleaning Frequency
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'bi-weekly', label: 'Bi-Weekly', badge: '15% Off' },
              { id: 'weekly', label: 'Weekly', badge: '20% Off' },
              { id: 'monthly', label: 'Monthly', badge: '10% Off' },
              { id: 'one-time', label: 'One-Time', badge: 'Standard' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFrequency(f.id as any)}
                className={`py-2 px-2 rounded-lg border text-left transition-all ${
                  frequency === f.id
                    ? 'border-teal-600 bg-teal-50/60 ring-1 ring-teal-600'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">{f.label}</div>
                <div className="text-[10px] text-teal-700 font-medium">{f.badge}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculation Summary Box */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Estimated Total:</span>
              {discountPct > 0 && (
                <span className="text-sm text-slate-400 line-through">${subtotal}</span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                ${finalPrice}
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {frequency === 'one-time' ? '/ single visit' : '/ visit'}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              *Demo price example. Includes standard supplies & HEPA equipment.
            </span>
          </div>

          <button
            type="button"
            onClick={handleBookNow}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
          >
            <span>Lock In This Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reassurance markers */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>No hidden fees or contracts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>100% Bonded & Insured Crew</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Free cancellation up to 24h</span>
          </div>
        </div>

      </div>
    </div>
  );
};
