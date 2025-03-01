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
  holidayIndulgenceBasket: 'assets/gifts/gift-14-holiday-indulgence-basket.jpg',
  gourmetTastingBoard: 'assets/gifts/gift-15-gourmet-tasting-board.jpg',
  festivePineHamper: 'assets/gifts/gift-16-festive-pine-hamper.jpg',
};

// Export an array of all gift image URLs for components that need the full list
export const ALL_GIFT_IMAGE_URLS = Object.values(GIFT_IMAGES);

// Export functions to get images by category
export const getGiftImagesByCategory = (category: string): string[] => {
  const imagesByCategory: Record<string, string[]> = {
    luxury: [GIFT_IMAGES.luxuryWellnessPackage, GIFT_IMAGES.executiveGiftSuite],
    personal: [GIFT_IMAGES.luxuryWellnessPackage, GIFT_IMAGES.anniversaryCelebrationBox],
    corporate: [GIFT_IMAGES.corporateWelcomeKit, GIFT_IMAGES.teamBuildingKit],
    wedding: [GIFT_IMAGES.weddingPartyGiftSet],
    birthday: [
      GIFT_IMAGES.birthdayCelebrationBox1,
      GIFT_IMAGES.birthdayCelebrationBox2,
      GIFT_IMAGES.birthdayCelebrationBox3,
    ],
    holiday: [
      GIFT_IMAGES.snowmanHolidayBoxes,
      GIFT_IMAGES.holidayIndulgenceBasket,
      GIFT_IMAGES.festivePineHamper,
      GIFT_IMAGES.gourmetTastingBoard,
    ],
    baby: [GIFT_IMAGES.babyEssentialsBasket, GIFT_IMAGES.ultimateBabyHamper],
    gourmet: [GIFT_IMAGES.gourmetTastingBoard, GIFT_IMAGES.holidayIndulgenceBasket],
    anniversary: [GIFT_IMAGES.anniversaryCelebrationBox],
  };

  return imagesByCategory[category] || [];
}; 