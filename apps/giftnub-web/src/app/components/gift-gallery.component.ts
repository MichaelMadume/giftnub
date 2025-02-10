import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

interface Gift {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string[];  // Allow multiple categories per gift
  imageUrl?: string;
}

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

@Component({
  selector: 'giftnub-gift-gallery',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './gift-gallery.component.html',
  styles: [`
    @keyframes float-slow {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(20px, -20px); }
    }

    @keyframes float-medium {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-15px, 15px); }
    }

    @keyframes float-fast {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(10px, -10px); }
    }

    @keyframes gridGlow {
      0%, 100% { opacity: 0.03; }
      50% { opacity: 0.05; }
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
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class GiftGalleryComponent implements OnInit {
  private activeCategorySubject = new BehaviorSubject<string>('all');
  activeCategory$ = this.activeCategorySubject.asObservable();

  private paginationSubject = new BehaviorSubject<PaginationState>({
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0
  });
  pagination$ = this.paginationSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

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
    { id: 'anniversary', label: 'Anniversary' }
  ];

  // In a real app, this would be fetched from a service
  private readonly gifts: Gift[] = [
    {
      id: '1',
      title: 'Luxury Wellness Package',
      description: 'A curated collection of premium self-care items including artisanal bath products, aromatherapy essentials, and wellness accessories.',
      price: 299.99,
      category: ['luxury', 'personal'],
      imageUrl: 'https://example.com/wellness-package.jpg'
    },
    {
      id: '2',
      title: 'Corporate Welcome Kit',
      description:
        'Thoughtfully designed onboarding package featuring premium branded merchandise, tech accessories, and personalized stationery.',
      price: 149.99,
      category: ['corporate'],
    },
    {
      id: '3',
      title: 'Anniversary Celebration Box',
      description:
        'Romantic gift set including handcrafted chocolates, premium champagne, and personalized keepsakes.',
      price: 199.99,
      category: ['personal'],
    },
    {
      id: '4',
      title: 'Executive Gift Suite',
      description:
        'Premium collection of business accessories including leather goods, writing instruments, and desk organizers.',
      price: 399.99,
      category: ['luxury'],
    },
    {
      id: '5',
      title: 'Family Time Package',
      description:
        'Curated set of games, activities, and treats designed for creating memorable family moments.',
      price: 129.99,
      category: ['personal'],
    },
    {
      id: '6',
      title: 'Team Building Kit',
      description:
        'Interactive group activities and collaborative games perfect for corporate team events.',
      price: 249.99,
      category: ['corporate'],
    },
    {
      id: '7',
      title: 'Wedding Party Gift Set',
      description:
        'Deluxe gift set including personalized stationery, luxury skincare, and romantic decor items.',
      price: 189.99,
      category: ['wedding'],
    },
    {
      id: '8',
      title: 'Birthday Celebration Box',
      description:
        'Deluxe gift set including personalized stationery, luxury skincare, and romantic decor items.',
      price: 189.99,
      category: ['birthday'],
    },  
    {
      id: '9',
      title: 'Birthday Celebration Box',
      description:
        'Deluxe gift set including personalized stationery, luxury skincare, and romantic decor items.',
      price: 189.99,
      category: ['birthday'],
    },
    {
      id: '10',
      title: 'Birthday Celebration Box',
      description:
        'Deluxe gift set including personalized stationery, luxury skincare, and romantic decor items.',
      price: 189.99,
      category: ['birthday'],
    },
  ];

  filteredGifts$: Observable<Gift[]> = combineLatest([
    this.activeCategory$,
    this.pagination$
  ]).pipe(
    map(([category, pagination]) => {
      const filtered = category === 'all' 
        ? this.gifts 
        : this.gifts.filter(gift => gift.category.includes(category));
      
      const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
      const end = start + pagination.itemsPerPage;
      
      return filtered.slice(start, end);
    })
  );

  get totalPages(): number {
    const total = this.paginationSubject.value.totalItems;
    const perPage = this.paginationSubject.value.itemsPerPage;
    return Math.ceil(total / perPage);
  }

  // New getter for full page array for dot navigation
  get pageArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  get currentPage(): number {
    return this.paginationSubject.value.currentPage;
  }

  get activeCategory(): string {
    return this.activeCategorySubject.value;
  }

  get totalGifts(): number {
    return this.gifts.length;
  }

  get itemsPerPage(): number {
    return this.paginationSubject.value.itemsPerPage;
  }

  get totalItems(): number {
    return this.paginationSubject.value.totalItems;
  }

  // Method to get visible page numbers
  getVisiblePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];
    
    if (total <= 7) {
      // If total pages is 7 or less, show all pages
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always include current page and 1 page before and after
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  ngOnInit() {
    // Initialize pagination with total items
    this.updatePaginationTotal();
  }

  private updatePaginationTotal(): void {
    const category = this.activeCategorySubject.value;
    const filteredTotal = category === 'all'
      ? this.gifts.length
      : this.gifts.filter(gift => gift.category.includes(category)).length;

    this.paginationSubject.next({
      ...this.paginationSubject.value,
      totalItems: filteredTotal
    });
  }

  setCategory(category: string): void {
    this.loadingSubject.next(true);
    this.activeCategorySubject.next(category);
    
    // Reset to first page when changing category
    this.paginationSubject.next({
      ...this.paginationSubject.value,
      currentPage: 1
    });
    
    this.updatePaginationTotal();
    setTimeout(() => this.loadingSubject.next(false), 300); // Simulate loading
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.paginationSubject.next({
        ...this.paginationSubject.value,
        currentPage: this.currentPage + 1
      });
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.paginationSubject.next({
        ...this.paginationSubject.value,
        currentPage: this.currentPage - 1
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.paginationSubject.next({
        ...this.paginationSubject.value,
        currentPage: page
      });
    }
  }

  bookToReplicate(gift: Gift): void {
    console.log('Booking gift:', gift);
    window.location.href = `https://buy.stripe.com/bIY3d32GY2yQfIs7ss?gift=${gift.id}`;
  }

  trackByFn(index: number, gift: Gift): string {
    return gift.id;
  }
}
