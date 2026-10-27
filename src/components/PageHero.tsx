import React from 'react';
import { PageRoute } from '../types';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  currentRouteName: string;
  onNavigate: (page: PageRoute) => void;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  badge = 'CleanSwift Guarantee',
  currentRouteName,
  onNavigate,
  ctaText,
  onCtaClick,
}) => {
  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white py-16 sm:py-20 overflow-hidden">
      {/* Subtle grid pattern background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-teal-400 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-teal-400 font-medium">{currentRouteName}</span>
        </div>

        {/* Content */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-400 uppercase mb-3">
            <span>{badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            {subtitle}
          </p>

          {ctaText && onCtaClick && (
            <div className="mt-8">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors shadow-sm"
              >
                {ctaText}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
