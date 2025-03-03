export interface Gift {
  id: string;
  title: string;
  description: string;
  price: number;
  category: GiftCategory;
  imageUrl?: string;
}

export type GiftCategory = 'personal' | 'corporate' | 'luxury';

// Import GiftSuggestion from shared library instead of redefining
// Use the shared interface from gift-data library, which has:
// id, title, description, giftId
export { GiftSuggestion } from '@giftnub/gift-data';

export interface ConsultationBooking {
  name: string;
  email: string;
  consultationType: 'personal' | 'corporate';
  budget: string;
  date: string;
  time: string;
  notes?: string;
} 