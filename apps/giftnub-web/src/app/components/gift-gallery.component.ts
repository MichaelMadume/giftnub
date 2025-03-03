import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  AfterViewInit,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  Subscription,
} from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Gift, GIFT_DATA, getGiftsByCategory } from '../constants/gift-data.constants';
import { GiftSuggestion, GiftSuggestionResponse } from '@giftnub/gift-data';

// Import Swiper core and required modules
import { register } from 'swiper/element/bundle';
// Register Swiper custom elements
register();

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

@Component({
  selector: 'giftnub-gift-gallery',
  standalone: true,
  imports: [CommonModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './gift-gallery.component.html',
  styleUrls: ['./gift-gallery.component.scss'],
})
export class GiftGalleryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('desktopSwiperContainer') desktopSwiperContainer!: ElementRef;
  @ViewChild('mobileSwiperContainer') mobileSwiperContainer!: ElementRef;

  // Track mobile vs desktop view
  isMobile$: Observable<boolean>;

  // Add new properties for header text
  headerTitle$ = new BehaviorSubject<string>('Past Gift Experiences');
  headerSubtext$ = new BehaviorSubject<string>('Browse our curated collection of successful gift stories');
  showFilters$ = new BehaviorSubject<boolean>(true);

  private activeCategorySubject = new BehaviorSubject<string>('all');
  activeCategory$ = this.activeCategorySubject.asObservable();

  private paginationSubject = new BehaviorSubject<PaginationState>({
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0,
  });
  pagination$ = this.paginationSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  // Swiper properties
  swiperParams = {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    navigation: true,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    breakpoints: {
      // Mobile optimizations
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        effect: 'cards',
        cardsEffect: {
          slideShadows: true,
          perSlideOffset: 8,
          perSlideRotate: 2,
        },
      },
      480: {
        slidesPerView: 1.2,
        spaceBetween: 15,
        effect: 'cards',
        cardsEffect: {
          slideShadows: true,
          perSlideOffset: 8,
          perSlideRotate: 2,
        },
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
        effect: 'coverflow',
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
        effect: 'coverflow',
      },
    },
  };

  // Add Math property for template usage
  protected readonly Math = Math;

  // Define base categories
  private readonly baseCategories = [
    { id: 'all', label: 'All Gifts' },
    { id: 'personal', label: 'Personal' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'holiday', label: 'Holiday' },
    { id: 'baby', label: 'Baby' },
    { id: 'gourmet', label: 'Gourmet' },
    { id: 'anniversary', label: 'Anniversary' },
  ];

  // BehaviorSubject for filtered categories
  private categoriesSubject = new BehaviorSubject<{ id: string; label: string }[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  // Use the centralized gift data instead of defining it here
  private readonly gifts: Gift[] = GIFT_DATA;

  private customSuggestionsSubject = new BehaviorSubject<GiftSuggestionResponse | null>(null);
  customSuggestions$ = this.customSuggestionsSubject.asObservable();

  filteredGifts$: Observable<Gift[]> = combineLatest([
    this.activeCategory$,
    this.pagination$,
    this.customSuggestions$
  ]).pipe(
    map(([category, pagination, customSuggestions]) => {
      // If we have custom suggestions, map them to Gift objects and return those
      console.log('customSuggestions', customSuggestions);
      if (customSuggestions) {
        return customSuggestions.suggestions
          .map(suggestion => {
            // Find the matching gift from GIFT_DATA using the giftId
            const matchingGift = GIFT_DATA.find(gift => gift.id === suggestion.giftId);
            
            if (matchingGift) {
              // Create a modified gift with suggestion data and gift image
              return {
                ...matchingGift,
                title: suggestion.title,
                description: suggestion.description,
                isRecommended: true
              };
            }
            return null;
          })
          .filter(gift => gift !== null) as Gift[];
      }
      console.log('category', category);
      // Using the helper function from constants for normal filtering
      return getGiftsByCategory(category);
    })
  );

  private resizeTimeout: any = null;
  private subscription: Subscription = new Subscription();

  constructor(private breakpointObserver: BreakpointObserver) {
    // Check if the screen size is mobile or desktop
    this.isMobile$ = this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(map((result) => result.matches));

    // Initialize filtered categories
    this.updateFilteredCategories();
  }

  // Filter categories to only show those with gifts
  private updateFilteredCategories(): void {
    const filteredCategories = this.baseCategories.filter(category => {
      // Always keep the "all" category
      if (category.id === 'all') return true;
      
      // Check if there are any gifts for this category
      return this.gifts.some(gift => gift.category.includes(category.id));
    });
    
    this.categoriesSubject.next(filteredCategories);
  }

  // Add window resize listener
  @HostListener('window:resize')
  onResize(): void {
    // Debounce resize events
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      // Update Swiper on resize if needed
      this.updateSwiperOnResize();
    }, 200);
  }

  ngOnInit() {
    // Set up subscription to update totalItems when category changes
    this.subscription.add(
      this.activeCategory$.subscribe((category) => {
        const filtered =
          category === 'all'
            ? this.gifts
            : this.gifts.filter((gift) => gift.category.includes(category));

        this.paginationSubject.next({
          ...this.paginationSubject.value,
          totalItems: filtered.length,
          currentPage: 1,
        });
      })
    );
  }

  ngAfterViewInit() {
    // Initialize Swiper with parameters
    this.initSwiper();
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscription.unsubscribe();

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  // Initialize Swiper
  private initSwiper(): void {
    setTimeout(() => {
      // Initialize desktop swiper
      if (
        this.desktopSwiperContainer &&
        this.desktopSwiperContainer.nativeElement
      ) {
        const desktopSwiperEl = this.desktopSwiperContainer.nativeElement;

        // Set Swiper parameters for desktop
        Object.assign(desktopSwiperEl, {
          slidesPerView: 3,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            clickable: true,
            dynamicBullets: true,
          },
          navigation: true,
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          },
        });

        // Initialize Swiper
        desktopSwiperEl.initialize();

        // Add direct event listeners for pause/resume on hover
        desktopSwiperEl.addEventListener('mouseenter', () => {
          if (desktopSwiperEl.swiper && desktopSwiperEl.swiper.autoplay) {
            desktopSwiperEl.swiper.autoplay.stop();
          }
        });

        desktopSwiperEl.addEventListener('mouseleave', () => {
          if (desktopSwiperEl.swiper && desktopSwiperEl.swiper.autoplay) {
            desktopSwiperEl.swiper.autoplay.start();
          }
        });
      }

      // Initialize mobile swiper
      if (
        this.mobileSwiperContainer &&
        this.mobileSwiperContainer.nativeElement
      ) {
        const mobileSwiperEl = this.mobileSwiperContainer.nativeElement;

        // Set Swiper parameters for mobile
        Object.assign(mobileSwiperEl, {
          slidesPerView: 1.2,
          spaceBetween: 10,
          centeredSlides: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            clickable: true,
            dynamicBullets: true,
          },
          navigation: false,
          effect: 'cards',
          cardsEffect: {
            slideShadows: true,
            perSlideOffset: 8,
            perSlideRotate: 2,
          },
        });

        // Initialize Swiper
        mobileSwiperEl.initialize();
      }
    }, 0);
  }

  // Update Swiper on window resize
  private updateSwiperOnResize(): void {
    // Update desktop swiper if it exists
    if (
      this.desktopSwiperContainer &&
      this.desktopSwiperContainer.nativeElement
    ) {
      const desktopSwiperEl = this.desktopSwiperContainer.nativeElement;

      if (desktopSwiperEl.swiper) {
        desktopSwiperEl.swiper.update();
      }
    }

    // Update mobile swiper if it exists
    if (
      this.mobileSwiperContainer &&
      this.mobileSwiperContainer.nativeElement
    ) {
      const mobileSwiperEl = this.mobileSwiperContainer.nativeElement;

      if (mobileSwiperEl.swiper) {
        mobileSwiperEl.swiper.update();
      }
    }
  }

  setCategory(category: string): void {
    this.loadingSubject.next(true);
    this.activeCategorySubject.next(category);

    // Allow time for DOM to update before updating Swiper
    setTimeout(() => {
      // Update desktop swiper
      if (
        this.desktopSwiperContainer &&
        this.desktopSwiperContainer.nativeElement &&
        this.desktopSwiperContainer.nativeElement.swiper
      ) {
        this.desktopSwiperContainer.nativeElement.swiper.update();
        this.desktopSwiperContainer.nativeElement.swiper.slideTo(0, 0);
      }

      // Update mobile swiper
      if (
        this.mobileSwiperContainer &&
        this.mobileSwiperContainer.nativeElement &&
        this.mobileSwiperContainer.nativeElement.swiper
      ) {
        this.mobileSwiperContainer.nativeElement.swiper.update();
        this.mobileSwiperContainer.nativeElement.swiper.slideTo(0, 0);
      }

      this.loadingSubject.next(false);
    }, 300);
  }

  bookToReplicate(gift: Gift): void {
    console.log('Booking gift:', gift);
    // Navigate to consultation booking section with gift ID
    const consultationSection = document.getElementById('consultationBooking');
    if (consultationSection) {
      // Save gift ID in sessionStorage for better state preservation
      sessionStorage.setItem('giftnub-gift-id', gift.id);
      // Scroll to consultation section
      consultationSection.scrollIntoView({ behavior: 'smooth' });
      // Update URL without triggering page reload
      window.history.pushState({}, '', `#consultationBooking?gift=${gift.id}`);
      // Dispatch event to notify the consultation component
      window.dispatchEvent(
        new CustomEvent('gift-selected', { detail: { giftId: gift.id } })
      );
    }
  }

  trackByFn(index: number, gift: Gift): string {
    return gift.id;
  }

  // Handle keyboard navigation (left/right arrows)
  onKeyDown(event: KeyboardEvent): void {
    // Handle keyboard navigation for desktop swiper
    if (
      this.desktopSwiperContainer &&
      this.desktopSwiperContainer.nativeElement &&
      this.desktopSwiperContainer.nativeElement.swiper
    ) {
      const swiper = this.desktopSwiperContainer.nativeElement.swiper;

      if (event.key === 'ArrowLeft') {
        swiper.slidePrev();
      } else if (event.key === 'ArrowRight') {
        swiper.slideNext();
      }
    }

    // Handle keyboard navigation for mobile swiper
    if (
      this.mobileSwiperContainer &&
      this.mobileSwiperContainer.nativeElement &&
      this.mobileSwiperContainer.nativeElement.swiper
    ) {
      const swiper = this.mobileSwiperContainer.nativeElement.swiper;

      if (event.key === 'ArrowLeft') {
        swiper.slidePrev();
      } else if (event.key === 'ArrowRight') {
        swiper.slideNext();
      }
    }
  }

  /**
   * Sets custom suggestions from AI to display in the gallery
   * @param suggestions The suggestions response from the AI
   */
  setSuggestions(suggestions: GiftSuggestionResponse): void {
    this.customSuggestionsSubject.next(suggestions);
    
    // Update header text with marketing theme and message
    this.headerTitle$.next(suggestions.marketingTheme);
    this.headerSubtext$.next(suggestions.marketingMessageSummary);
    
    // Hide filters when showing suggestions
    this.showFilters$.next(false);
    
    // Reset category to 'all' to ensure all suggested items display
    this.setCategory('all');
    
    // Force update the swiper to reflect the new content
    setTimeout(() => {
      this.updateSwiperOnResize();
    }, 100);
  }
  
  /**
   * Clears custom suggestions and returns to normal gallery view
   */
  clearSuggestions(): void {
    this.customSuggestionsSubject.next(null);
    this.headerTitle$.next('Past Gift Experiences');
    this.headerSubtext$.next('Browse our curated collection of successful gift stories');
    this.showFilters$.next(true);
    this.updateFilteredCategories();
    
    // Force update the swiper to reflect the new content
    setTimeout(() => {
      this.updateSwiperOnResize();
    }, 100);
  }
}
