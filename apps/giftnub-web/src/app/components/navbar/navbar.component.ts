import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="navbar" class="fixed w-full z-50">
      <nav class="bg-black/30 backdrop-blur-xl border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">GiftNub</span>
              </div>
            </div>
            
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a href="#hero" class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">Home</a>
                <a href="#pathSelector" class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">Get Started</a>
                <a href="#intelligentSuggestions" class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">Gift Recommendations</a>
                <a href="#giftGallery" class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">Gallery</a>
                <a href="#eventGifting" class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">Event Gifting</a>
                <a href="#consultationBooking" class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">Book Consultation</a>
                <a href="#testimonials" class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">Testimonials</a>
                <a href="#faq" class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all">FAQ</a>
              </div>
            </div>
            
            <div class="md:hidden">
              <button (click)="toggleMobileMenu()" class="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white hover:bg-white/5 focus:outline-none transition-all">
                <svg class="h-6 w-6" [class.hidden]="isMobileMenuOpen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                <svg class="h-6 w-6" [class.hidden]="!isMobileMenuOpen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="md:hidden" [class.hidden]="!isMobileMenuOpen">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/60 backdrop-blur-xl border-t border-white/5">
            <a href="#hero" class="text-white/70 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-all">Home</a>
            <a href="#pathSelector" class="text-white/70 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-all">Get Started</a>
            <a href="#intelligentSuggestions" class="text-white/70 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-all">Gift Recommendations</a>
            <a href="#giftGallery" class="text-white/70 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-all">Gallery</a>
            <a href="#eventGifting" class="text-white/70 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-all">Event Gifting</a>
            <a href="#consultationBooking" class="text-white/70 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-all">Book Consultation</a>
            <a href="#testimonials" class="text-white/70 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-all">Testimonials</a>
            <a href="#faq" class="text-white/70 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-all">FAQ</a>
          </div>
        </div>
      </nav>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  constructor() {
    // Add shadow to navbar on scroll
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
          if (window.scrollY > 0) {
            navbar.classList.add('shadow-lg', 'shadow-black/20');
          } else {
            navbar.classList.remove('shadow-lg', 'shadow-black/20');
          }
        }
      });
    }
  }
} 