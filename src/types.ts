export type PageRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'house-cleaning'
  | 'commercial-cleaning'
  | 'deep-cleaning'
  | 'pricing'
  | 'booking'
  | 'blog'
  | 'contact';

export interface ServiceItem {
  id: string;
  slug: PageRoute;
  name: string;
  shortDescription: string;
  longDescription: string;
  startingPrice: number;
  priceUnit: string;
  duration: string;
  image: string;
  iconName: string;
  popular?: boolean;
  features: string[];
  includedChecklist: {
    category: string;
    items: string[];
  }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  billingPeriod: string;
  popular?: boolean;
  features: string[];
  notIncluded?: string[];
  bestFor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Home Tips' | 'Eco Living' | 'Commercial';
  publishDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  image: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  location: string;
  rating: number;
  serviceUsed: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'pricing' | 'cleaning';
}

export interface BookingState {
  serviceId: string;
  frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
  bedrooms: number;
  bathrooms: number;
  sqftRange: 'under-1000' | '1000-2000' | '2000-3500' | '3500-plus';
  selectedAddons: string[];
  date: string;
  timeSlot: 'morning' | 'midday' | 'afternoon';
  entryMethod: 'home' | 'doorman' | 'lockbox' | 'hidden-key';
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  notes: string;
}
