import React from 'react';
import { PageRoute } from '../types';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>

        <div>
          <span className="text-4xl font-extrabold text-slate-900 block font-mono">404</span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Page Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            The page you are looking for does not exist or has been relocated. Let us help you get back on track.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            Browse Services Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
