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
    title: "Tea Lover's Delight Box",
    description:
      'Premium tea collection featuring herbal teas, raw honey, gold measuring spoon, and tea accessories in an elegant black box.',
    price: 299.99,
    category: ['luxury', 'gourmet'],
    imageUrl: 'assets/gifts/gift-1-luxury-wellness-package.jpg',
    blurPrice: true,
  },
  {
    id: '2',
    title: 'Stress Relief Spa Box',
    description:
      'Self-care gift set with stress-relief essential oils, cucumber face mask, bath accessories, and scented candles in a premium white box.',
    price: 149.99,
    category: ['personal', 'wellness'],
    imageUrl: 'assets/gifts/gift-2-corporate-welcome-kit.jpg',
    blurPrice: true,
  },
  {
    id: '3',
    title: 'Holiday Treat Baskets',
    description:
      'Festive gift baskets wrapped in cellophane with red bows, filled with gourmet snacks, sweets, and treats for the holiday season.',
    price: 199.99,
    category: ['holiday', 'gourmet'],
    imageUrl: 'assets/gifts/gift-3-anniversary-celebration-box.jpg',
    blurPrice: true,
  },
  {
    id: '4',
    title: 'Cozy Plaid Gift Box',
    description:
      'Charming red plaid gift box filled with premium teas, gourmet cookies, holiday mug, and comfort items for a warm winter experience.',
    price: 399.99,
    category: ['luxury', 'holiday'],
    imageUrl: 'assets/gifts/gift-4-executive-gift-suite.jpg',
    blurPrice: true,
  },
  {
    id: '6',
    title: 'Candy Stripe Holiday Box',
    description:
      'Festive red and white striped gift box featuring chocolates, a winter scene mug, hot chocolate mix, and premium bath products.',
    price: 249.99,
    category: ['holiday', 'gourmet', 'personal'],
    imageUrl: 'assets/gifts/gift-6-team-building-kit.jpg',
    blurPrice: true,
  },
  {
    id: '7',
    title: 'Elegant Gourmet Basket',
    description:
      'Sophisticated cream and gold patterned gift basket with premium treats including peach tea, chocolate chips, coconut cookies, and gourmet preserves.',
    price: 189.99,
    category: ['gourmet', 'luxury'],
    imageUrl: 'assets/gifts/gift-7-wedding-party-gift-set.jpg',
    blurPrice: true,
  },

  {
    id: '9',
    title: 'Winter Special Snack Basket',
    description:
      "Festive gift basket wrapped in cellophane with a red bow, filled with Stevia sweetener, sundried tomato dip, Werther's candies, and gourmet treats.",
    price: 189.99,
    category: ['holiday', 'gourmet'],
    imageUrl: 'assets/gifts/gift-9-birthday-celebration-box.jpg',
    blurPrice: true,
  },
  {
    id: '10',
    title: 'Santa & Snowman Gift Boxes',
    description:
      'Adorable light blue holiday gift boxes decorated with Santa, snowman, and Christmas tree designs, topped with festive red ribbons.',
    price: 189.99,
    category: ['holiday', 'kids'],
    imageUrl: 'assets/gifts/gift-10-birthday-celebration-box.jpg',
    blurPrice: true,
  },
  {
    id: '11',
    title: 'Winter Pine Gift Basket',
    description:
      "Rustic pine-themed gift basket filled with gourmet goodies including peach tea, Stevia sweetener, Werther's Original candies, and sundried tomato dip.",
    price: 49.99,
    category: ['holiday', 'gourmet'],
    imageUrl: 'assets/gifts/gift-11-snowman-holiday-boxes.jpg',
    blurPrice: true,
  },
  {
    id: '12',
    title: 'Premium Gourmet Gift Basket',
    description:
      'Elegant red gift basket featuring premium items including Ferrero Rocher chocolates, Winter Spiced Tea, gourmet cookies, olive oil, and a bamboo cutting board.',
    price: 129.99,
    category: ['gourmet', 'luxury', 'holiday'],
    imageUrl: 'assets/gifts/gift-12-baby-essentials-basket.jpg',
    blurPrice: true,
  },
  {
    id: '13',
    title: 'Deluxe Holiday Gift Set',
    description:
      'Premium red gift basket wrapped in cellophane with a gold bow, featuring Ferrero Rocher chocolates, gourmet cookies, Winter Spiced Tea, and truffle olive oil.',
    price: 199.99,
    category: ['luxury', 'holiday', 'gourmet'],
    imageUrl: 'assets/gifts/gift-13-ultimate-baby-hamper.jpg',
    blurPrice: true,
  },
  {
    id: '14',
    title: 'Luxury Baby Gift Basket',
    description:
      'Premium baby gift basket featuring a soft bunny plush toy, baby blankets, Robeez first kicks shoes, "Dear Baby" book, and Reebok booties in an elegant woven basket with blue lining.',
    price: 159.99,
    category: ['baby', 'luxury'],
    imageUrl: 'assets/gifts/gift-14-holiday-indulgence-basket.jpg',
    blurPrice: true,
  },
  {
    id: '15',
    title: 'Deluxe Baby Essentials Basket',
    description:
      'Comprehensive baby gift basket with plush bunny security blanket, Robeez First Kicks shoes (9-12 months), baby blankets, and Reebok baby socks in a stylish woven basket.',
    price: 179.99,
    category: ['baby', 'luxury'],
    imageUrl: 'assets/gifts/gift-15-gourmet-tasting-board.jpg',
    blurPrice: true,
  },
  {
    id: '16',
    title: 'Santa & Snowman Holiday Gift Boxes',
    description:
      'Set of two adorable light blue Christmas gift boxes decorated with Santa Claus, snowman, and winter scene designs, tied with festive red "Merry Christmas" ribbons.',
    price: 139.99,
    category: ['holiday', 'kids'],
    imageUrl: 'assets/gifts/gift-16-festive-pine-hamper.jpg',
    blurPrice: true,
  },
];

// Helper functions to extract specific data for different components

// Get all gift image URLs (for components like Hero that only need the images)
export const ALL_GIFT_IMAGE_URLS = GIFT_DATA.map(
  (gift) => gift.imageUrl
).filter(Boolean) as string[];

// Get gifts by category
export const getGiftsByCategory = (category: string): Gift[] => {
  return category === 'all'
    ? GIFT_DATA
    : GIFT_DATA.filter((gift) => gift.category.includes(category));
};

// Get gift image URLs by category
export const getGiftImagesByCategory = (category: string): string[] => {
  return getGiftsByCategory(category)
    .map((gift) => gift.imageUrl)
    .filter(Boolean) as string[];
};

/**
 * Get a random subset of gift images
 * @param count Number of images to return
 * @param category Optional category to filter by
 * @returns Array of shuffled image URLs
 */
export const getRandomGiftImages = (
  count: number,
  category?: string
): string[] => {
  const imagePool = category
    ? getGiftImagesByCategory(category)
    : ALL_GIFT_IMAGE_URLS;

  // Create a copy of the array, shuffle it, and return the requested number of items
  return shuffle([...imagePool]).slice(0, Math.min(count, imagePool.length));
};
