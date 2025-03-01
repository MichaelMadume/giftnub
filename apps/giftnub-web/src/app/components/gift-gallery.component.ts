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
  styles: [
    `
      @keyframes float-slow {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(20px, -20px);
        }
      }

      @keyframes float-medium {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(-15px, 15px);
        }
      }

      @keyframes float-fast {
        0%,
        100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(10px, -10px);
        }
      }

      @keyframes gridGlow {
        0%,
        100% {
          opacity: 0.03;
        }
        50% {
          opacity: 0.05;
        }
      }

      @keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateY(15px) scale(0.95);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes cardPulse {
        0%,
        100% {
          box-shadow: 0 0 0 0 rgba(var(--primary-500-rgb), 0);
        }
        50% {
          box-shadow: 0 0 20px 3px rgba(var(--primary-500-rgb), 0.2);
        }
      }

      .animate-float-slow {
        animation: float-slow 8s ease-in-out infinite;
      }

      .animate-float-medium {
        animation: float-medium 6s ease-in-out infinite;
      }

      .animate-float-fast {
        animation: float-fast 4s ease-in-out infinite;
      }

      .fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Swiper Styles */
      swiper-container {
        width: 100%;
        height: auto;
        min-height: 600px;
        padding-bottom: 50px;
        perspective: 1200px;
      }

      swiper-slide {
        padding: 1rem;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: stretch;
        transform: scale(0.85);
        transition: transform 0.3s;
        transform-style: preserve-3d;
        will-change: transform;
      }

      swiper-slide.swiper-slide-active {
        transform: scale(1);
        z-index: 10;
      }

      swiper-slide:not(.swiper-slide-active) {
        opacity: 0.7;
      }

      /* Glassmorphic card styling */
      .carousel-card {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        animation: slideIn 0.5s ease-out forwards;
        backface-visibility: hidden;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
      }

      /* Mobile-specific card styling */
      @media (max-width: 640px) {
        .carousel-card {
          background: rgba(0, 0, 0, 0.75);
        }
      }

      /* Mirror reflection effect */
      .mirror-reflection {
        position: absolute;
        bottom: -20px;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.08),
          transparent
        );
        transform: rotateX(180deg);
        transform-origin: top;
        opacity: 0.5;
        pointer-events: none;
        z-index: 1;
      }

      /* Fixed image container size */
      .image-container {
        position: relative;
        width: 100%;
        padding-top: 60%; /* Fixed aspect ratio */
        overflow: hidden;
        min-height: 180px; /* Minimum height to prevent tiny images */
      }

      .image-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Fixed card content dimensions */
      .card-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        min-height: 160px; /* Set minimum height to prevent varying sizes */
        justify-content: space-between; /* Ensure consistent spacing */
        padding: 1.25rem;
      }

      /* Button container with fixed height */
      .button-container {
        margin-top: auto;
        height: 48px;
        display: flex;
        align-items: center;
        position: relative;
      }

      /* Swiper navigation buttons custom styling */
      :host ::ng-deep .swiper-button-next,
      :host ::ng-deep .swiper-button-prev {
        color: var(--primary-500);
        background: rgba(0, 0, 0, 0.3);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      :host ::ng-deep .swiper-button-next:after,
      :host ::ng-deep .swiper-button-prev:after {
        font-size: 18px;
      }

      /* Swiper pagination bullets */
      :host ::ng-deep .swiper-pagination-bullet {
        background: rgba(255, 255, 255, 0.5);
        width: 8px;
        height: 8px;
        opacity: 0.7;
      }

      :host ::ng-deep .swiper-pagination-bullet-active {
        background: var(--primary-500);
        width: 24px;
        border-radius: 4px;
        opacity: 1;
      }
    `,
  ],
})
export class GiftGalleryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('desktopSwiperContainer') desktopSwiperContainer!: ElementRef;
  @ViewChild('mobileSwiperContainer') mobileSwiperContainer!: ElementRef;

  // Track mobile vs desktop view
  isMobile$: Observable<boolean>;

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

  // Example categories - in production, this would come from a service
  readonly categories = [
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

  // Use the centralized gift data instead of defining it here
  private readonly gifts: Gift[] = GIFT_DATA;

  filteredGifts$: Observable<Gift[]> = combineLatest([
    this.activeCategory$,
    this.pagination$,
  ]).pipe(
    map(([category, pagination]) => {
      // Using the helper function from constants
      const filtered = getGiftsByCategory(category);

      // Don't update the pagination here - this creates an infinite loop
      // When we update paginationSubject, it triggers this observable again
      // Instead, we'll just return the filtered gifts
      return filtered;
    })
  );

  private resizeTimeout: any = null;
  private subscription: Subscription = new Subscription();

  constructor(private breakpointObserver: BreakpointObserver) {
    // Check if the screen size is mobile or desktop
    this.isMobile$ = this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(map((result) => result.matches));
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
}
