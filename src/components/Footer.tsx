import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Sparkles, Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Pledges */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>
                Clean<span className="text-teal-400">Swift</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Premium residential, commercial, and intensive deep cleaning services. Powered by certified eco-friendly solutions, background-checked specialists, and our 100% spotless satisfaction guarantee.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>$2,000,000 Comprehensive Liability & Bonding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>EPA Safer Choice & Green Seal Certified Botanicals</span>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('house-cleaning')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Residential House Clean
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('commercial-cleaning')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Commercial & Office
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('deep-cleaning')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Intensive Deep Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Move-In / Move-Out
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Post-Construction Detail
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-xs text-teal-400 hover:underline pt-1 inline-block"
                >
                  Browse Full Catalog →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  About CleanSwift
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Transparent Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-teal-400 transition-colors text-left font-medium text-teal-400"
                >
                  Book an Appointment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Cleaning Guides & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Contact & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Demo Contact Info & Hours */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Service Hours</p>
                  <p className="text-xs">Mon – Sun: 7:00 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Direct Phone (Demo)</p>
                  <p className="text-xs">(800) 555-SWIFT</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Email Inquiries</p>
                  <p className="text-xs">hello@cleanswift-demo.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Regional Office</p>
                  <p className="text-xs">450 Cleanway Blvd, Suite 300</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Newsletter & Demo Disclaimer Strip */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800">
          <div className="max-w-md">
            <h5 className="text-sm font-semibold text-white">Subscribe to seasonal cleaning checklists</h5>
            <p className="text-xs text-slate-400 mt-1">Get monthly green cleaning tips and exclusive promotional discounts.</p>
          </div>
          
          <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto max-w-sm gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email for cleaning newsletter"
              required
              className="bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1"
            />
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors shrink-0"
            >
              {newsletterSubscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CleanSwift Cleaning Co. All rights reserved. Demo presentation website.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">·</span>
            <span>Demo Portfolio Concept</span>
            <span className="text-slate-600">·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-400">
              Service Areas
            </button>
            <span className="text-slate-600">·</span>
            <button onClick={() => onNavigate('pricing')} className="hover:text-slate-400">
              Pricing Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
