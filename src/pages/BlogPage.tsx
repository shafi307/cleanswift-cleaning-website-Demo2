import React, { useState } from 'react';
import { PageRoute, BlogPost } from '../types';
import { PageHero } from '../components/PageHero';
import { BLOG_POSTS } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  BookOpen, 
  User,
  Check
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const filteredPosts = selectedCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-16 lg:space-y-20 pb-16">
      
      {/* 1. Header Banner */}
      <PageHero
        currentRouteName="Blog & Tips"
        badge="Field Guides & Hygiene Science"
        title="Pro Cleaning Tips & Green Home Living"
        subtitle="Practical sanitization advice, non-toxic chemistry deep-dives, and workplace hygiene protocols from our certified cleaning specialists."
        onNavigate={onNavigate}
        ctaText="Book a Clean"
        onCtaClick={() => onNavigate('booking')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2. Category Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Guides</h2>
            <p className="text-xs text-slate-500 mt-0.5">Written by CleanSwift operations and green chemistry leads</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {[
              { id: 'all', label: 'All Articles' },
              { id: 'Home Tips', label: 'Home Tips' },
              { id: 'Eco Living', label: 'Eco Living' },
              { id: 'Commercial', label: 'Commercial' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-teal-800 shadow-sm">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span>{post.publishDate}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center">
                      {post.author.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{post.author.name}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveArticle(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* 4. Reading Modal for Full Article */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                CleanSwift Field Guide · {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span>{activeArticle.publishDate}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                  <span>·</span>
                  <span>By {activeArticle.author.name} ({activeArticle.author.role})</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {activeArticle.title}
                </h2>
              </div>

              {/* Key Takeaways Box */}
              <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Key Field Takeaways</span>
                </h4>
                <ul className="space-y-2">
                  {activeArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-teal-950">
                      <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content */}
              <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Call to action inside modal */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Enjoyed this guide? Let CleanSwift handle the deep cleaning for you.
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate('booking');
                  }}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Book Professional Clean
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 5. Newsletter & Call to Action banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
            Never Miss a Seasonal Checklist
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto">
            Get Practical Cleaning Guides Sent to Your Inbox
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Zero spam. Just monthly printable checklists, stain-removal recipes, and seasonal promotions.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-colors cursor-pointer"
            >
              Book an Appointment Today
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
