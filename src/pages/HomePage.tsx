import React, { useState } from 'react';
import { PageRoute, ServiceItem } from '../types';
import { IMAGES, SERVICES, TESTIMONIALS, FAQS, SERVICE_AREAS } from '../data/mockData';
import { QuickEstimateWidget } from '../components/QuickEstimateWidget';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Calendar, 
  Users, 
  Leaf, 
  Award, 
  ChevronDown, 
  MapPin, 
  Search, 
  Check,
  Building2,
  Home,
  CheckCheck
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onBookWithPrefill: (prefill: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onBookWithPrefill }) => {
  const [openFaq, setOpenFaq] = useState<string | null>('q1');
  const [zipInput, setZipInput] = useState('');
  const [zipResult, setZipResult] = useState<{ checked: boolean; available?: boolean; message?: string } | null>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    const matchedArea = SERVICE_AREAS.find((area) => area.zip === cleanZip);
    if (matchedArea) {
      setZipResult({
        checked: true,
        available: true,
        message: `Great news! We service ${cleanZip} (${matchedArea.name}) with standard next-day availability.`,
      });
    } else {
      // For demo, general 5-digit zip
      const isFiveDigits = /^\d{5}$/.test(cleanZip);
      if (isFiveDigits) {
        setZipResult({
          checked: true,
          available: true,
          message: `Yes! Postal area ${cleanZip} is within our expanded metropolitan delivery zone.`,
        });
      } else {
        setZipResult({
          checked: true,
          available: false,
          message: `Please enter a valid 5-digit postal code (e.g. 90210, 90211).`,
        });
      }
    }
  };

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100/70 text-teal-800 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Premier Residential & Commercial Cleaning</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
                Spotless Homes & Offices, <br />
                <span className="text-teal-600">Zero Hassle.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Experience hospital-grade cleanliness with five-star hospitality. Certified eco-friendly botanicals, background-checked specialists, and our 100% spotless satisfaction guarantee.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('booking')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Book Online in 60 Seconds</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('pricing')}
                  className="inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm"
                >
                  View Sample Rates
                </button>
              </div>

              {/* Trust Indicators Strip */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-1">4.9 / 5 Rating</p>
                  <p className="text-[11px] text-slate-500">Over 1,200+ local reviews</p>
                </div>

                <div>
                  <p className="text-lg font-bold text-slate-900 tabular-nums">12,400+</p>
                  <p className="text-xs font-bold text-slate-900">Cleans Completed</p>
                  <p className="text-[11px] text-slate-500">Across metro areas</p>
                </div>

                <div>
                  <p className="text-lg font-bold text-teal-700">100%</p>
                  <p className="text-xs font-bold text-slate-900">Bonded & Insured</p>
                  <p className="text-[11px] text-slate-500">$2M liability policy</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] lg:aspect-[5/4] bg-slate-100">
                <img
                  src={IMAGES.hero}
                  alt="Spotless luxury modern living room cleaned by CleanSwift"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Floating highlight badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Green Clean Certified</p>
                      <p className="text-[11px] text-slate-500">Non-toxic, safe for kids & pets</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('about')}
                    className="text-xs font-semibold text-teal-600 hover:underline shrink-0"
                  >
                    Learn More
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Interactive Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Transparent & Upfront Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Calculate Your Exact Estimate in Real Time
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              No hidden surprise fees or bait-and-switch quotes. Choose your home configuration, select your preferred frequency, and see your customized rate before booking.
            </p>
            <ul className="space-y-3 pt-2 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCheck className="w-5 h-5 text-teal-600 shrink-0" />
                <span>All professional equipment & botanical supplies included</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCheck className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Save up to 20% by scheduling weekly or bi-weekly visits</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCheck className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Re-clean guarantee: not 100% happy? We return free of charge</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <QuickEstimateWidget onBookWithEstimate={onBookWithPrefill} />
          </div>
        </div>
      </section>

      {/* 3. Featured Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Tailored Cleaning Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Precision Care for Every Environment
            </h2>
            <p className="text-base text-slate-600 mt-2">
              From routine house cleaning to heavy commercial office maintenance, our trained crews deliver dependable results.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 shrink-0"
          >
            <span>View All 6 Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                  From ${service.startingPrice} {service.priceUnit}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate(service.slug)}
                    className="text-xs font-semibold text-slate-700 hover:text-teal-600 transition-colors"
                  >
                    View Service Details →
                  </button>

                  <button
                    onClick={() => {
                      onBookWithPrefill({ serviceId: service.id });
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-teal-600 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose CleanSwift (4 Pillars with concrete proof) */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              The CleanSwift Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Why Discerning Property Owners Trust Us
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              We engineered our service to remove the stress and inconsistency of traditional domestic and commercial cleaners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Vetted Specialists</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Only the top 3% of applicants pass our strict background verification, reference audits, and 40-hour hands-on certification.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Eco-Friendly & Pet Safe</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                100% plant-based, EPA Safer Choice certified botanicals. Zero toxic bleaches, caustic fumes, or harsh allergens left behind.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">24h Re-Clean Guarantee</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                If any corner does not meet your high standards, let us know within 24 hours and we return to make it right for free.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">$2M Insurance & Bonding</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your luxury fixtures, fine furnishings, and commercial electronics are safeguarded with full policy indemnification.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. How It Works (3 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Effortless Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            How CleanSwift Works in 3 Simple Steps
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Booking and enjoying a sparkling clean property has never been this straightforward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center relative flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 font-bold text-xl flex items-center justify-center mb-6 shadow-sm">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Customize & Book</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Select your property size, pick your preferred date and arrival window, and view transparent pricing in under 60 seconds.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center relative flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 font-bold text-xl flex items-center justify-center mb-6 shadow-sm">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">We Clean with Precision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your vetted specialist arrives on time with all commercial equipment and eco-safe supplies to execute our multi-point checklist.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center relative flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 font-bold text-xl flex items-center justify-center mb-6 shadow-sm">
              03
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Relax in Fresh Comfort</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Step into an immaculately polished, fresh-smelling space. Enjoy automated receipts and hassle-free recurring scheduling.
            </p>
          </div>

        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="bg-slate-50 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Real Client Experiences
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
                Loved by Homeowners and Commercial Teams
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-bold text-slate-900">4.9/5</span> on verified platform reviews
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.authorName}</h4>
                    <p className="text-xs text-slate-500">{t.authorRole} · {t.location}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                    Verified Clean
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Service Area Checker */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Coverage Check
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Is CleanSwift in Your Neighborhood?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We currently service greater metropolitan districts, residential enclaves, and business corridors. Enter your postal code to verify immediate crew availability.
              </p>
            </div>

            <div className="md:col-span-5">
              <form onSubmit={handleZipCheck} className="space-y-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      maxLength={5}
                      value={zipInput}
                      onChange={(e) => setZipInput(e.target.value)}
                      placeholder="e.g. 90210"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
                  >
                    Check
                  </button>
                </div>

                {zipResult && (
                  <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    zipResult.available ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                  }`}>
                    {zipResult.available ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />}
                    <span>{zipResult.message}</span>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Everything you need to know about our scheduling, vetting, and supplies.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-teal-600 transition-colors"
                >
                  <span className="text-base">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. High-Conversion Booking Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden">
          <div className="relative max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Experience the CleanSwift Difference
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready for a Pristine, Spotless Space?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Book your appointment today in 60 seconds. Transparent pricing, eco-friendly supplies, and a 100% satisfaction guarantee on every visit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-base transition-colors shadow-lg cursor-pointer"
              >
                Schedule Your Cleaning Now
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-base border border-slate-700 transition-colors"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
