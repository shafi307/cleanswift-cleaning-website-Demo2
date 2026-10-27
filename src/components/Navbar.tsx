import React, { useState, useEffect, useRef } from 'react';
import { PageRoute } from '../types';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const isServicesActive = [
    'services',
    'house-cleaning',
    'commercial-cleaning',
    'deep-cleaning',
  ].includes(currentPage);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single Element) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-95 transition-opacity text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-teal-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>
              Clean<span className="text-teal-600">Swift</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (Single-Line, 4-5 core items) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleLinkClick('home')}
              className={`hover:text-teal-600 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentPage === 'home' ? 'text-teal-600 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleLinkClick('about')}
              className={`hover:text-teal-600 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentPage === 'about' ? 'text-teal-600 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              About Us
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1.5 hover:text-teal-600 transition-colors whitespace-nowrap shrink-0 py-2 ${
                  isServicesActive ? 'text-teal-600 font-semibold border-b-2 border-teal-600' : ''
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => handleLinkClick('services')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-teal-700 hover:bg-slate-50 transition-colors border-b border-slate-100"
                  >
                    View All Services Catalog →
                  </button>
                  <button
                    onClick={() => handleLinkClick('house-cleaning')}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                      currentPage === 'house-cleaning' ? 'text-teal-600 font-semibold bg-teal-50/50' : 'text-slate-700'
                    }`}
                  >
                    House Cleaning
                  </button>
                  <button
                    onClick={() => handleLinkClick('commercial-cleaning')}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                      currentPage === 'commercial-cleaning' ? 'text-teal-600 font-semibold bg-teal-50/50' : 'text-slate-700'
                    }`}
                  >
                    Commercial Cleaning
                  </button>
                  <button
                    onClick={() => handleLinkClick('deep-cleaning')}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                      currentPage === 'deep-cleaning' ? 'text-teal-600 font-semibold bg-teal-50/50' : 'text-slate-700'
                    }`}
                  >
                    Deep Cleaning
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('pricing')}
              className={`hover:text-teal-600 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentPage === 'pricing' ? 'text-teal-600 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              Pricing
            </button>

            <button
              onClick={() => handleLinkClick('blog')}
              className={`hover:text-teal-600 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentPage === 'blog' ? 'text-teal-600 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className={`hover:text-teal-600 transition-colors whitespace-nowrap shrink-0 py-2 ${
                currentPage === 'contact' ? 'text-teal-600 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleLinkClick('booking')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap shadow-sm hover:shadow-md cursor-pointer"
            >
              Book a Service
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-teal-600 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'home' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'about' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            <div className="border-y border-slate-100 py-1 my-1">
              <span className="block px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Services
              </span>
              <button
                onClick={() => handleLinkClick('services')}
                className={`text-left w-full px-3 py-2 rounded-lg text-sm ${
                  currentPage === 'services' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                All Services Catalog
              </button>
              <button
                onClick={() => handleLinkClick('house-cleaning')}
                className={`text-left w-full px-3 py-2 rounded-lg text-sm ${
                  currentPage === 'house-cleaning' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                House Cleaning
              </button>
              <button
                onClick={() => handleLinkClick('commercial-cleaning')}
                className={`text-left w-full px-3 py-2 rounded-lg text-sm ${
                  currentPage === 'commercial-cleaning' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Commercial Cleaning
              </button>
              <button
                onClick={() => handleLinkClick('deep-cleaning')}
                className={`text-left w-full px-3 py-2 rounded-lg text-sm ${
                  currentPage === 'deep-cleaning' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Deep Cleaning
              </button>
            </div>

            <button
              onClick={() => handleLinkClick('pricing')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'pricing' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Pricing Plans
            </button>

            <button
              onClick={() => handleLinkClick('blog')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'blog' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Blog & Tips
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'contact' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>

            <div className="pt-3">
              <button
                onClick={() => handleLinkClick('booking')}
                className="w-full py-3 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-center text-sm shadow-sm"
              >
                Book a Service Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
