export interface Gift {
  id: string;
  title: string;
  description: string;
  price: number;
  category: GiftCategory;
  imageUrl?: string;
}

export type GiftCategory = 'personal' | 'corporate' | 'luxury';

export interface GiftSuggestion {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  confidence: number;
  imageUrl?: string;
}

export interface ConsultationBooking {
  name: string;
  email: string;
  consultationType: 'personal' | 'corporate';
  budget: string;
  date: string;
  time: string;
  notes?: string;
} 