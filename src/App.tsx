/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageRoute, BookingState } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { HouseCleaningPage } from './pages/HouseCleaningPage';
import { CommercialCleaningPage } from './pages/CommercialCleaningPage';
import { DeepCleaningPage } from './pages/DeepCleaningPage';
import { PricingPage } from './pages/PricingPage';
import { BookingPage } from './pages/BookingPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  // Parse initial page from window hash
  const getInitialRoute = (): PageRoute => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const cleanHash = hash.split('?')[0];

    const validRoutes: Record<string, PageRoute> = {
      '': 'home',
      'home': 'home',
      'about': 'about',
      'services': 'services',
      'services/house-cleaning': 'house-cleaning',
      'house-cleaning': 'house-cleaning',
      'services/commercial-cleaning': 'commercial-cleaning',
      'commercial-cleaning': 'commercial-cleaning',
      'services/deep-cleaning': 'deep-cleaning',
      'deep-cleaning': 'deep-cleaning',
      'pricing': 'pricing',
      'booking': 'booking',
      'blog': 'blog',
      'contact': 'contact',
    };

    return validRoutes[cleanHash] || 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialRoute);
  const [prefillBooking, setPrefillBooking] = useState<Partial<BookingState> | null>(null);

  // Sync route with browser hash and back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = getInitialRoute();
      setCurrentPage(nextRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookWithPrefill = (prefill: Partial<BookingState>) => {
    setPrefillBooking(prefill);
    navigateTo('booking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onBookWithPrefill={handleBookWithPrefill}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onBookWithPrefill={handleBookWithPrefill}
          />
        )}

        {currentPage === 'house-cleaning' && (
          <HouseCleaningPage
            onNavigate={navigateTo}
            onBookWithPrefill={handleBookWithPrefill}
          />
        )}

        {currentPage === 'commercial-cleaning' && (
          <CommercialCleaningPage
            onNavigate={navigateTo}
            onBookWithPrefill={handleBookWithPrefill}
          />
        )}

        {currentPage === 'deep-cleaning' && (
          <DeepCleaningPage
            onNavigate={navigateTo}
            onBookWithPrefill={handleBookWithPrefill}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage
            onNavigate={navigateTo}
            onBookWithPrefill={handleBookWithPrefill}
          />
        )}

        {currentPage === 'booking' && (
          <BookingPage
            onNavigate={navigateTo}
            prefillData={prefillBooking}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage onNavigate={navigateTo} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}

        {/* Fallback if route does not match */}
        {![
          'home',
          'about',
          'services',
          'house-cleaning',
          'commercial-cleaning',
          'deep-cleaning',
          'pricing',
          'booking',
          'blog',
          'contact',
        ].includes(currentPage) && (
          <NotFoundPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
}
