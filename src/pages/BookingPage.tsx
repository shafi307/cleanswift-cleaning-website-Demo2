import React, { useState, useEffect } from 'react';
import { PageRoute, BookingState } from '../types';
import { PageHero } from '../components/PageHero';
import { SERVICES, ADDONS } from '../data/mockData';
import { 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Info, 
  ArrowRight, 
  ChevronRight,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface BookingPageProps {
  onNavigate: (page: PageRoute) => void;
  prefillData?: Partial<BookingState> | null;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  onNavigate,
  prefillData,
}) => {
  // Booking Form State
  const [formData, setFormData] = useState<BookingState>({
    serviceId: prefillData?.serviceId || 'house-cleaning',
    frequency: (prefillData?.frequency as any) || 'bi-weekly',
    bedrooms: prefillData?.bedrooms || 2,
    bathrooms: prefillData?.bathrooms || 2,
    sqftRange: prefillData?.sqftRange || '1000-2000',
    selectedAddons: prefillData?.selectedAddons || [],
    date: prefillData?.date || '',
    timeSlot: prefillData?.timeSlot || 'morning',
    entryMethod: prefillData?.entryMethod || 'home',
    fullName: prefillData?.fullName || '',
    email: prefillData?.email || '',
    phone: prefillData?.phone || '',
    address: prefillData?.address || '',
    city: prefillData?.city || 'Metro City',
    zipCode: prefillData?.zipCode || '',
    notes: prefillData?.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync prefill changes if user navigated from quick estimator
  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        ...prefillData,
      }));
    }
  }, [prefillData]);

  // Pricing calculation
  const calculateTotal = () => {
    let base = 99;
    if (formData.serviceId === 'deep-cleaning') base = 189;
    if (formData.serviceId === 'commercial-cleaning') base = 219;
    if (formData.serviceId === 'move-in-out') base = 249;

    const roomCost = formData.bedrooms * 25 + formData.bathrooms * 30;

    let addonsCost = 0;
    formData.selectedAddons.forEach((addonId) => {
      const match = ADDONS.find((a) => a.id === addonId);
      if (match) addonsCost += match.price;
    });

    const subtotal = base + roomCost + addonsCost;

    let discountPct = 0;
    if (formData.frequency === 'weekly') discountPct = 0.20;
    if (formData.frequency === 'bi-weekly') discountPct = 0.15;
    if (formData.frequency === 'monthly') discountPct = 0.10;

    const discountAmount = Math.round(subtotal * discountPct);
    const finalTotal = subtotal - discountAmount;

    return {
      base,
      roomCost,
      addonsCost,
      subtotal,
      discountAmount,
      discountPct,
      finalTotal,
    };
  };

  const pricing = calculateTotal();

  const toggleAddon = (id: string) => {
    if (formData.selectedAddons.includes(id)) {
      setFormData({
        ...formData,
        selectedAddons: formData.selectedAddons.filter((a) => a !== id),
      });
    } else {
      setFormData({
        ...formData,
        selectedAddons: [...formData.selectedAddons, id],
      });
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Please enter your street address';
    }
    if (!formData.zipCode.trim() || formData.zipCode.length < 5) {
      newErrors.zipCode = 'Please enter a 5-digit ZIP code';
    }
    if (!formData.date) {
      newErrors.date = 'Please pick a preferred service date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const generatedCode = `CS-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmationCode(generatedCode);
      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(confirmationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-16 lg:space-y-20 pb-16">
      
      {/* 1. Page Header */}
      <PageHero
        currentRouteName="Book a Service"
        badge="Instant Online Scheduling"
        title="Reserve Your CleanSwift Specialist"
        subtitle="Configure your property specifications, choose a convenient arrival window, and review transparent real-time pricing before confirming."
        onNavigate={onNavigate}
      />

      {/* Demo Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-sky-950">
          <Info className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold block">Interactive Demo Reservation System</span>
            <p className="text-sky-800 mt-0.5">
              This is a demonstration booking application for CleanSwift Cleaning Co. No real payment methods are required, and no physical service appointment is generated.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Booking Flow or Success Confirmation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isSubmitted ? (
          /* Confirmation State */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Booking Request Confirmed (Demo)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                You're All Set, {formData.fullName}!
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                We've prepared your appointment itinerary. A confirmation email with specialist arrival details has been simulated.
              </p>
            </div>

            {/* Reference Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 max-w-sm mx-auto flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Demo Booking ID</span>
                <span className="text-lg font-mono font-bold text-slate-900">{confirmationCode}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="p-2 text-slate-600 hover:text-teal-600 transition-colors"
                title="Copy Code"
              >
                {copiedCode ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Summary Itinerary */}
            <div className="bg-slate-50/60 rounded-2xl p-6 text-left border border-slate-100 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-slate-900 capitalize">{formData.serviceId.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Frequency:</span>
                <span className="font-semibold text-slate-900 capitalize">{formData.frequency}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Scheduled Date:</span>
                <span className="font-semibold text-slate-900">{formData.date} ({formData.timeSlot} window)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Property Layout:</span>
                <span className="font-semibold text-slate-900">{formData.bedrooms} Beds, {formData.bathrooms} Baths</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Address:</span>
                <span className="font-semibold text-slate-900">{formData.address}, {formData.city} {formData.zipCode}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-bold text-slate-900">
                <span>Estimated Price:</span>
                <span className="text-teal-700">${pricing.finalTotal}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    ...formData,
                    fullName: '',
                    email: '',
                    phone: '',
                    address: '',
                    zipCode: '',
                    notes: '',
                    date: '',
                  });
                }}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors"
              >
                Book Another Service
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Section Form */
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-8 space-y-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                
                {/* 1. Service Type & Frequency */}
                <div>
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h3 className="text-base font-bold text-slate-900">Choose Service & Frequency</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Cleaning Category
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'house-cleaning', label: 'House Clean' },
                          { id: 'deep-cleaning', label: 'Deep Clean' },
                          { id: 'commercial-cleaning', label: 'Commercial' },
                          { id: 'move-in-out', label: 'Move In/Out' },
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, serviceId: s.id })}
                            className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              formData.serviceId === s.id
                                ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Frequency Option
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'bi-weekly', label: 'Bi-Weekly', save: '15% Off' },
                          { id: 'weekly', label: 'Weekly', save: '20% Off' },
                          { id: 'monthly', label: 'Monthly', save: '10% Off' },
                          { id: 'one-time', label: 'One-Time', save: 'Standard' },
                        ].map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, frequency: f.id as any })}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              formData.frequency === f.id
                                ? 'border-teal-600 bg-teal-50/60 ring-1 ring-teal-600'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <span className="block text-xs font-bold text-slate-900">{f.label}</span>
                            <span className="block text-[10px] text-teal-700 font-medium">{f.save}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Property Specifications */}
                <div>
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h3 className="text-base font-bold text-slate-900">Property Configuration & Add-Ons</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                          <span>Bedrooms / Workspaces</span>
                          <span className="text-teal-700 font-bold">{formData.bedrooms} Rooms</span>
                        </div>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setFormData({ ...formData, bedrooms: num })}
                              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                                formData.bedrooms === num
                                  ? 'bg-slate-900 border-slate-900 text-white'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {num}{num === 6 ? '+' : ''}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                          <span>Bathrooms</span>
                          <span className="text-teal-700 font-bold">{formData.bathrooms} Baths</span>
                        </div>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setFormData({ ...formData, bathrooms: num })}
                              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                                formData.bathrooms === num
                                  ? 'bg-slate-900 border-slate-900 text-white'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {num}{num === 5 ? '+' : ''}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Add-ons checkboxes */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Select Custom Add-Ons
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ADDONS.map((addon) => {
                          const isChecked = formData.selectedAddons.includes(addon.id);
                          return (
                            <button
                              key={addon.id}
                              type="button"
                              onClick={() => toggleAddon(addon.id)}
                              className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                                isChecked
                                  ? 'bg-teal-50/50 border-teal-600 text-teal-900'
                                  : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                                  isChecked ? 'bg-teal-600 text-white' : 'border border-slate-300 bg-white'
                                }`}>
                                  {isChecked && <Check className="w-3 h-3" />}
                                </div>
                                <span className="font-medium">{addon.name}</span>
                              </div>
                              <span className="font-bold tabular-nums">+${addon.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Date, Time & Entry Method */}
                <div>
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                    <h3 className="text-base font-bold text-slate-900">Schedule & Access Details</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors({ ...errors, date: '' });
                        }}
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                          errors.date ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'
                        }`}
                      />
                      {errors.date && <p className="text-[11px] text-red-600 mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Arrival Window
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value as any })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="morning">Morning (8:00 AM – 11:00 AM)</option>
                        <option value="midday">Mid-Day (11:00 AM – 2:00 PM)</option>
                        <option value="afternoon">Afternoon (2:00 PM – 5:00 PM)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        How Will Our Crew Access the Property?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'home', label: 'Someone will be home' },
                          { id: 'doorman', label: 'Front desk / concierge' },
                          { id: 'lockbox', label: 'Key lockbox' },
                          { id: 'hidden-key', label: 'Hidden key' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, entryMethod: m.id as any })}
                            className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-colors cursor-pointer ${
                              formData.entryMethod === m.id
                                ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Customer Information */}
                <div>
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                    <h3 className="text-base font-bold text-slate-900">Your Contact & Location</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (errors.fullName) setErrors({ ...errors, fullName: '' });
                          }}
                          placeholder="Eleanor Vance"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                            errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'
                          }`}
                        />
                        {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          placeholder="eleanor@example.com"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                            errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                          }}
                          placeholder="(555) 019-2834"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                            errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'
                          }`}
                        />
                        {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Street Address *</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value });
                            if (errors.address) setErrors({ ...errors, address: '' });
                          }}
                          placeholder="742 Evergreen Terrace"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                            errors.address ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'
                          }`}
                        />
                        {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Postal ZIP Code *</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={formData.zipCode}
                          onChange={(e) => {
                            setFormData({ ...formData, zipCode: e.target.value });
                            if (errors.zipCode) setErrors({ ...errors, zipCode: '' });
                          }}
                          placeholder="90210"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                            errors.zipCode ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'
                          }`}
                        />
                        {errors.zipCode && <p className="text-[11px] text-red-600 mt-1">{errors.zipCode}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Special Instructions, Gate Codes, or Pet Notes
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. Please do not let the cat out. Lockbox code is #4829 on front porch rail."
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Sticky Summary & Price Card */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
                
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5">
                  <div className="pb-4 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">
                      Live Estimate Breakdown
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      Booking Summary
                    </h3>
                  </div>

                  {/* Line items */}
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="capitalize">{formData.serviceId.replace('-', ' ')} Base</span>
                      <span className="font-semibold text-slate-900 tabular-nums">${pricing.base}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Room Detailing ({formData.bedrooms} Bed, {formData.bathrooms} Bath)</span>
                      <span className="font-semibold text-slate-900 tabular-nums">${pricing.roomCost}</span>
                    </div>

                    {pricing.addonsCost > 0 && (
                      <div className="flex justify-between">
                        <span>Selected Add-Ons ({formData.selectedAddons.length})</span>
                        <span className="font-semibold text-slate-900 tabular-nums">+${pricing.addonsCost}</span>
                      </div>
                    )}

                    <div className="flex justify-between pt-2 border-t border-slate-100">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900 tabular-nums">${pricing.subtotal}</span>
                    </div>

                    {pricing.discountAmount > 0 && (
                      <div className="flex justify-between text-teal-700 font-semibold">
                        <span>{formData.frequency} Discount ({Math.round(pricing.discountPct * 100)}%)</span>
                        <span className="tabular-nums">-${pricing.discountAmount}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-slate-500 block">Total Due:</span>
                        <span className="text-[10px] text-slate-400">Paid after inspection</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                          ${pricing.finalTotal}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {formData.frequency === 'one-time' ? 'One-time visit' : 'Per recurring visit'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Confirm Demo Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 text-[11px] text-slate-400 text-center space-y-1">
                    <p className="flex items-center justify-center gap-1.5 text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      <span>100% Satisfaction Guarantee</span>
                    </p>
                    <p>Free cancellation up to 24 hours prior.</p>
                  </div>
                </div>

              </div>

            </div>
          </form>
        )}

      </div>

    </div>
  );
};
