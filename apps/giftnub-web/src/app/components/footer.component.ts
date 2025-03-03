import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="relative bg-black/30 backdrop-blur-xl border-t border-white/5 pt-20 pb-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          <!-- Company Info -->
          <div>
            <div class="flex items-center mb-6">
              <img src="assets/images/logo.png" alt="GiftNub Logo" class="h-10 w-auto mr-3" />
              <h3
                class="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text"
              >
                The Gift Nub
              </h3>
            </div>
            <p class="text-white/70 mb-6">
              AI-powered gifting solutions for personal and corporate occasions.
            </p>
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18.6h-2.472v-3.9c0-.923-.018-2.11-1.287-2.11-1.29 0-1.487 1.005-1.487 2.043v3.967H9.297V9.6h2.376v1.09h.033c.33-.627 1.14-1.29 2.347-1.29 2.51 0 2.97 1.653 2.97 3.803v4.397zM7.332 8.51a1.437 1.437 0 110-2.874 1.437 1.437 0 010 2.874zM5.88 18.6h2.907V9.6H5.88v9z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold mb-6 text-white/90">Quick Links</h4>
            <ul class="space-y-4">
              <li>
                <a
                  href="#pathSelector"
                  class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >Get Started</a
                >
              </li>
              <li>
                <a
                  href="#intelligentSuggestions"
                  class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >AI Suggestions</a
                >
              </li>
              <li>
                <a
                  href="#consultationBooking"
                  class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >Book Consultation</a
                >
              </li>
              <li>
                <a
                  href="#giftGallery"
                  class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >Gift Gallery</a
                >
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h4 class="text-lg font-semibold mb-6 text-white/90">Services</h4>
            <ul class="space-y-4">
              <li>
                <a
                  href="#"
                  class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >Personal Gifting</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >Corporate Gifting</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >Luxury Experiences</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >Gift Customization</a
                >
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-lg font-semibold mb-6 text-white/90">Contact</h4>
            <ul class="space-y-4">
              <li class="flex items-center text-white/70 hover:text-white transition-all group">
                <svg
                  class="w-5 h-5 mr-3 group-hover:scale-110 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:adeola.adejuwon@gmail.com">adeola.adejuwon&#64;gmail.com</a>
              </li>
              <li class="flex items-center text-white/70 hover:text-white transition-all group">
                <svg
                  class="w-5 h-5 mr-3 group-hover:scale-110 transition-all duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18.6h-2.472v-3.9c0-.923-.018-2.11-1.287-2.11-1.29 0-1.487 1.005-1.487 2.043v3.967H9.297V9.6h2.376v1.09h.033c.33-.627 1.14-1.29 2.347-1.29 2.51 0 2.97 1.653 2.97 3.803v4.397zM7.332 8.51a1.437 1.437 0 110-2.874 1.437 1.437 0 010 2.874zM5.88 18.6h2.907V9.6H5.88v9z"
                  />
                </svg>
                <a href="https://www.linkedin.com/in/adejeremiah" target="_blank" rel="noopener noreferrer">linkedin.com/in/adejeremiah</a>
              </li>
              <li class="flex items-center text-white/70 hover:text-white transition-all group">
                <svg
                  class="w-5 h-5 mr-3 group-hover:scale-110 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>Toronto, Ontario, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/5 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="flex items-center mb-4 md:mb-0">
              <img src="assets/images/logo.png" alt="GiftNub Logo" class="h-6 w-auto mr-2" />
              <p class="text-white/70 text-sm">
                © {{ currentYear }} GiftNub. All rights reserved.
              </p>
            </div>
            <div class="flex space-x-6">
              <a
                href="#"
                class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >Privacy Policy</a
              >
              <a
                href="#"
                class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >Terms of Service</a
              >
              <a
                href="#"
                class="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >Cookie Policy</a
              >
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
