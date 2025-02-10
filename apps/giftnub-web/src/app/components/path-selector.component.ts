import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-path-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="pathSelector" class="bg-neutral-900 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate__animated animate__fadeIn">
          <h2 class="text-3xl md:text-4xl font-bold text-primary-400 mb-4 font-heading">Choose Your Gift Journey</h2>
          <p class="text-lg text-gray-300">Select the path that best suits your gifting needs</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Individual Path -->
          <div class="relative group animate__animated animate__fadeInLeft">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div class="relative bg-neutral-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer border border-primary-500/10">
              <div class="text-4xl mb-4">🎁</div>
              <h3 class="text-2xl font-bold text-primary-300 mb-4">Individual Gifting</h3>
              <p class="text-gray-300 mb-6">Perfect for personal occasions, birthdays, anniversaries, and special moments with loved ones.</p>
              <ul class="text-gray-300 mb-8 space-y-2">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-secondary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Personalized recommendations
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-secondary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom gift wrapping
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-secondary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Flexible budget options
                </li>
              </ul>
              <a href="#consultationBooking" class="inline-block w-full text-center bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-[1.02]">
                Book Personal Consultation
              </a>
            </div>
          </div>

          <!-- Corporate Path -->
          <div class="relative group animate__animated animate__fadeInRight">
            <div class="absolute -inset-1 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div class="relative bg-neutral-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer border border-primary-500/10">
              <div class="text-4xl mb-4">💼</div>
              <h3 class="text-2xl font-bold text-primary-300 mb-4">Corporate Gifting</h3>
              <p class="text-gray-300 mb-6">Streamlined bulk gifting solutions for businesses, events, and professional relationships.</p>
              <ul class="text-gray-300 mb-8 space-y-2">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-secondary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Bulk ordering discounts
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-secondary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Corporate branding options
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-secondary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Dedicated account manager
                </li>
              </ul>
              <a href="#consultationBooking" class="inline-block w-full text-center bg-gradient-to-r from-secondary-500 to-primary-500 hover:from-secondary-600 hover:to-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-[1.02]">
                Book Corporate Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PathSelectorComponent {}
