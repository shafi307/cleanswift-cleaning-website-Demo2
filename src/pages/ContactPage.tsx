import React, { useState } from 'react';
import { PageRoute } from '../types';
import { PageHero } from '../components/PageHero';
import { SERVICE_AREAS } from '../data/mockData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Send, 
  Sparkles,
  Building,
  Navigation
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // ZIP verification
  const [zipQuery, setZipQuery] = useState('');
  const [zipResult, setZipResult] = useState<string | null>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = zipQuery.trim();
    if (!clean) return;

    const matched = SERVICE_AREAS.find((a) => a.zip === clean);
    if (matched) {
      setZipResult(`Yes! Postal area ${clean} (${matched.name}) is fully covered with standard and next-day availability.`);
    } else if (/^\d{5}$/.test(clean)) {
      setZipResult(`Yes! Postal area ${clean} is within our expanded metropolitan route coverage.`);
    } else {
      setZipResult(`Please enter a valid 5-digit postal code (e.g., 90210, 90212).`);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Please provide your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Please provide a valid email';
    if (!formData.message.trim()) newErrors.message = 'Please type your message';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 lg:space-y-20 pb-16">
      
      {/* 1. Header Banner */}
      <PageHero
        currentRouteName="Contact Us"
        badge="Customer Support & Inquiries"
        title="We’re Here to Help Keep Your Space Spotless"
        subtitle="Have questions about service options, recurring plans, commercial bids, or access arrangements? Our friendly support team is available 7 days a week."
        onNavigate={onNavigate}
        ctaText="Book a Cleaning Specialist"
        onCtaClick={() => onNavigate('booking')}
      />

      {/* Demo Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900">
          <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold block">Demo Contact Information</span>
            <p className="text-amber-800 mt-0.5">
              Phone numbers, email addresses, and headquarters listed below are sample demo placeholders for website evaluation. Form submissions trigger simulated confirmation states.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Business Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                  Get in Touch
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Our service coordinators respond within 2 hours during normal business operations.
                </p>
              </div>

              <div className="space-y-4 pt-2 text-xs sm:text-sm">
                
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Phone Support (Demo)</span>
                    <span className="text-slate-600 block">(800) 555-SWIFT · (800) 555-7943</span>
                    <span className="text-[11px] text-teal-700 font-medium">Toll-free customer care</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Inquiries</span>
                    <span className="text-slate-600 block">hello@cleanswift-demo.com</span>
                    <span className="text-[11px] text-teal-700 font-medium">Quotes & booking inquiries</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Operating Hours</span>
                    <span className="text-slate-600 block">Monday – Sunday: 7:00 AM – 8:00 PM</span>
                    <span className="text-[11px] text-teal-700 font-medium">Cleaning crews dispatch 7 days/week</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Regional Headquarters (Demo)</span>
                    <span className="text-slate-600 block">450 Cleanway Blvd, Suite 300</span>
                    <span className="text-slate-600 block">Metro City, CA 90210</span>
                  </div>
                </div>

              </div>

              {/* Service Areas Quick Check */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Verify Your Postal Code
                </h4>
                <form onSubmit={handleZipCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={5}
                    value={zipQuery}
                    onChange={(e) => setZipQuery(e.target.value)}
                    placeholder="ZIP Code (e.g. 90210)"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Verify
                  </button>
                </form>

                {zipResult && (
                  <p className="text-xs text-teal-800 bg-teal-50 p-2.5 rounded-lg mt-2 border border-teal-100">
                    {zipResult}
                  </p>
                )}
              </div>

            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              
              <div className="pb-6 mb-6 border-b border-slate-100">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                  Online Inquiry
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                  Send Us a Message
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the details below and an operations specialist will contact you.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Message Received!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. We've received your inquiry regarding "{formData.subject}". A representative will reach out to {formData.email} shortly. (Demo feedback acknowledged).
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Question',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Johnathan Davis"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                          errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="johnathan@example.com"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                          errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 234-5678"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Residential Clean Quote">Residential Clean Quote</option>
                        <option value="Commercial Janitorial Proposal">Commercial Janitorial Proposal</option>
                        <option value="Existing Booking Modification">Existing Booking Modification</option>
                        <option value="Specialty Post-Construction">Specialty Post-Construction</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Message Details *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Tell us about your home size, current cleaning frequency, or specific questions..."
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        errors.message ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Send Message to Support</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    We respect your privacy. No marketing lists or unsolicited messages.
                  </p>
                </form>
              )}

            </div>

          </div>

        </div>
      </div>

      {/* 3. Styled Interactive Map Placeholder Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Service Radius Map
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Metropolitan Dispatch & Coverage Map
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>All 6 Metro Hubs Active (Next-Day Dispatches)</span>
            </div>
          </div>

          {/* Interactive SVG/Styled Map Simulation */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-tr from-slate-100 via-slate-50 to-teal-50/30 border border-slate-200 overflow-hidden flex items-center justify-center">
            
            {/* Map grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Coverage radius circles */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-teal-500/30 bg-teal-500/5 animate-pulse" />
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-teal-500/40 bg-teal-500/10" />

            {/* Central Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                <Building className="w-5 h-5" />
              </div>
              <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md mt-2 flex items-center gap-1.5 whitespace-nowrap">
                <span>CleanSwift Central HQ</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <span className="text-[10px] text-slate-500 bg-white/80 px-2 py-0.5 rounded-full mt-1 border border-slate-200">
                450 Cleanway Blvd, Suite 300
              </span>
            </div>

            {/* Surrounding Cluster Pins */}
            <div className="absolute top-1/4 left-1/4 z-10 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <span className="bg-white/90 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow mt-1 border border-slate-200">
                Westside Enclave (90211)
              </span>
            </div>

            <div className="absolute top-1/5 right-1/4 z-10 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <span className="bg-white/90 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow mt-1 border border-slate-200">
                North Hills (90212)
              </span>
            </div>

            <div className="absolute bottom-1/4 right-1/3 z-10 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <span className="bg-white/90 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow mt-1 border border-slate-200">
                Metro Valley Tech Park (90215)
              </span>
            </div>

            {/* Bottom floating badge */}
            <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-[11px] text-slate-600 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>Standard 25-Mile Metro Service Radius</span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
