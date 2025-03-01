/**
 * Centralized storage for all image paths used across the application
 * This helps avoid duplication and ensures consistency
 */

// Gift image paths
export const GIFT_IMAGES = {
  luxuryWellnessPackage: 'assets/gifts/gift-1-luxury-wellness-package.jpg',
  corporateWelcomeKit: 'assets/gifts/gift-2-corporate-welcome-kit.jpg',
  anniversaryCelebrationBox: 'assets/gifts/gift-3-anniversary-celebration-box.jpg',
  executiveGiftSuite: 'assets/gifts/gift-4-executive-gift-suite.jpg',
  teamBuildingKit: 'assets/gifts/gift-6-team-building-kit.jpg',
  weddingPartyGiftSet: 'assets/gifts/gift-7-wedding-party-gift-set.jpg',
  birthdayCelebrationBox1: 'assets/gifts/gift-8-birthday-celebration-box.jpg',
  birthdayCelebrationBox2: 'assets/gifts/gift-9-birthday-celebration-box.jpg',
  birthdayCelebrationBox3: 'assets/gifts/gift-10-birthday-celebration-box.jpg',
  snowmanHolidayBoxes: 'assets/gifts/gift-11-snowman-holiday-boxes.jpg',
  babyEssentialsBasket: 'assets/gifts/gift-12-baby-essentials-basket.jpg',
  ultimateBabyHamper: 'assets/gifts/gift-13-ultimate-baby-hamper.jpg',
  luxuryBabyGiftBasket: 'assets/gifts/gift-14-holiday-indulgence-basket.jpg',
  deluxeBabyEssentialsBasket: 'assets/gifts/gift-15-gourmet-tasting-board.jpg',
  santaSnowmanGiftBoxes: 'assets/gifts/gift-16-festive-pine-hamper.jpg',
};

// Export an array of all gift image URLs for components that need the full list
export const ALL_GIFT_IMAGE_URLS = Object.values(GIFT_IMAGES);

// Export functions to get images by category
export const getGiftImagesByCategory = (category: string): string[] => {
  const imagesByCategory: Record<string, string[]> = {
    luxury: [GIFT_IMAGES.luxuryWellnessPackage, GIFT_IMAGES.executiveGiftSuite],
    personal: [GIFT_IMAGES.corporateWelcomeKit],
    corporate: [GIFT_IMAGES.teamBuildingKit],
    wedding: [GIFT_IMAGES.weddingPartyGiftSet],
    birthday: [
      GIFT_IMAGES.birthdayCelebrationBox1,
      GIFT_IMAGES.birthdayCelebrationBox2,
      GIFT_IMAGES.birthdayCelebrationBox3,
    ],
    holiday: [
      GIFT_IMAGES.snowmanHolidayBoxes,
      GIFT_IMAGES.santaSnowmanGiftBoxes,
      GIFT_IMAGES.anniversaryCelebrationBox,
      GIFT_IMAGES.executiveGiftSuite,
    ],
    baby: [
      GIFT_IMAGES.babyEssentialsBasket, 
      GIFT_IMAGES.ultimateBabyHamper,
      GIFT_IMAGES.luxuryBabyGiftBasket,
      GIFT_IMAGES.deluxeBabyEssentialsBasket
    ],
    gourmet: [
      GIFT_IMAGES.luxuryWellnessPackage, 
      GIFT_IMAGES.anniversaryCelebrationBox
    ],
    wellness: [GIFT_IMAGES.corporateWelcomeKit],
    kids: [GIFT_IMAGES.santaSnowmanGiftBoxes],
  };

  return imagesByCategory[category] || [];
}; 