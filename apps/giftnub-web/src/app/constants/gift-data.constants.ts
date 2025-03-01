/**
 * Centralized gift data for use across the application
 * This prevents duplication and ensures consistency between components
 */

import { shuffle } from 'lodash';

export interface Gift {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string[]; // Allow multiple categories per gift
  imageUrl?: string;
  blurPrice: boolean;
}

// The full gift data used throughout the application
export const GIFT_DATA: Gift[] = [
  {
    id: '1',
    title: 'Luxury Wellness Package',
    description:
      'A curated collection of premium self-care items including artisanal bath products, aromatherapy essentials, and wellness accessories.',
    price: 299.99,
    category: ['luxury', 'personal'],
    imageUrl: 'assets/gifts/gift-1-luxury-wellness-package.jpg',
    blurPrice: true,
  },
  {
    id: '2',
    title: 'Corporate Welcome Kit',
    description:
      'Thoughtfully designed onboarding package featuring premium branded merchandise, tech accessories, and personalized stationery.',
    price: 149.99,
    category: ['corporate'],
    imageUrl: 'assets/gifts/gift-2-corporate-welcome-kit.jpg',
    blurPrice: true,
  },
  {
    id: '3',
    title: 'Anniversary Celebration Box',
    description:
      'Romantic gift set including handcrafted chocolates, premium champagne, and personalized keepsakes.',
    price: 199.99,
    category: ['personal'],
    imageUrl: 'assets/gifts/gift-3-anniversary-celebration-box.jpg',
    blurPrice: true,
  },
  {
    id: '4',
    title: 'Executive Gift Suite',
    description:
      'Premium collection of business accessories including leather goods, writing instruments, and desk organizers.',
    price: 399.99,
    category: ['luxury'],
    imageUrl: 'assets/gifts/gift-4-executive-gift-suite.jpg',
    blurPrice: true,
  },
  {
    id: '6',
    title: 'Team Building Kit',
    description:
      'Interactive group activities and collaborative games perfect for corporate team events.',
    price: 249.99,
    category: ['corporate'],
    imageUrl: 'assets/gifts/gift-6-team-building-kit.jpg',
    blurPrice: true,
  },
  {
    id: '7',
    title: 'Wedding Party Gift Set',
    description:
      'Deluxe gift set including personalized stationery, luxury skincare, and romantic decor items.',
    price: 189.99,
    category: ['wedding'],
    imageUrl: 'assets/gifts/gift-7-wedding-party-gift-set.jpg',
    blurPrice: true,
  },
  {
    id: '8',
    title: 'Birthday Celebration Box',
    description:
      'Deluxe gift set including personalized stationery, luxury skincare, and romantic decor items.',
    price: 189.99,
    category: ['birthday'],
    imageUrl: 'assets/gifts/gift-8-birthday-celebration-box.jpg',
    blurPrice: true,
  },
  {
    id: '9',
    title: 'Birthday Celebration Box',
    description:
      'Deluxe gift set including personalized stationery, luxury skincare, and romantic decor items.',
    price: 189.99,
    category: ['birthday'],
    imageUrl: 'assets/gifts/gift-9-birthday-celebration-box.jpg',
    blurPrice: true,
  },
  {
    id: '10',
    title: 'Birthday Celebration Box',
    description:
      'Deluxe gift set including personalized stationery, luxury skincare, and romantic decor items.',
    price: 189.99,
    category: ['birthday'],
    imageUrl: 'assets/gifts/gift-10-birthday-celebration-box.jpg',
    blurPrice: true,
  },
  {
    id: '11',
    title: 'Snowman Holiday Gift Boxes',
    description:
      'Adorable holiday-themed boxes filled with sweet treats, perfect for festive celebrations.',
    price: 49.99,
    category: ['holiday'],
    imageUrl: 'assets/gifts/gift-11-snowman-holiday-boxes.jpg',
    blurPrice: true,
  },
  {
    id: '12',
    title: 'Baby Essentials Basket',
    description:
      'A thoughtful selection of newborn essentials, from cozy clothing to soft plushies and first footwear.',
    price: 129.99,
    category: ['baby'],
    imageUrl: 'assets/gifts/gift-12-baby-essentials-basket.jpg',
    blurPrice: true,
  },
  {
    id: '13',
    title: 'Ultimate Baby Hamper',
    description:
      'Comprehensive hamper with baby items including plush blankets, shoes, and adorable keepsakes.',
    price: 199.99,
    category: ['baby'],
    imageUrl: 'assets/gifts/gift-13-ultimate-baby-hamper.jpg',
    blurPrice: true,
  },
  {
    id: '14',
    title: 'Holiday Indulgence Basket',
    description:
      'Luxurious hamper filled with gourmet chocolates, premium teas, and festive holiday treats.',
    price: 159.99,
    category: ['holiday', 'gourmet'],
    imageUrl: 'assets/gifts/gift-14-holiday-indulgence-basket.jpg',
    blurPrice: true,
  },
  {
    id: '15',
    title: 'Gourmet Tasting Board',
    description:
      'A curated selection of fine foods and condiments, complete with a stylish cutting board for serving.',
    price: 179.99,
    category: ['gourmet', 'holiday'],
    imageUrl: 'assets/gifts/gift-15-gourmet-tasting-board.jpg',
    blurPrice: true,
  },
  {
    id: '16',
    title: 'Festive Pine Hamper',
    description:
      'Seasonal hamper featuring savory dips, sweet confections, and other holiday delights in a pine-themed box.',
    price: 139.99,
    category: ['holiday'],
    imageUrl: 'assets/gifts/gift-16-festive-pine-hamper.jpg',
    blurPrice: true,
  },
];

// Helper functions to extract specific data for different components

// Get all gift image URLs (for components like Hero that only need the images)
export const ALL_GIFT_IMAGE_URLS = GIFT_DATA.map(gift => gift.imageUrl).filter(Boolean) as string[];

// Get gifts by category
export const getGiftsByCategory = (category: string): Gift[] => {
  return category === 'all'
    ? GIFT_DATA
    : GIFT_DATA.filter(gift => gift.category.includes(category));
};

// Get gift image URLs by category
export const getGiftImagesByCategory = (category: string): string[] => {
  return getGiftsByCategory(category)
    .map(gift => gift.imageUrl)
    .filter(Boolean) as string[];
};

/**
 * Get a random subset of gift images
 * @param count Number of images to return
 * @param category Optional category to filter by
 * @returns Array of shuffled image URLs
 */
export const getRandomGiftImages = (count: number, category?: string): string[] => {
  const imagePool = category 
    ? getGiftImagesByCategory(category)
    : ALL_GIFT_IMAGE_URLS;
    
  // Create a copy of the array, shuffle it, and return the requested number of items
  return shuffle([...imagePool]).slice(0, Math.min(count, imagePool.length));
}; 