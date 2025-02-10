import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-our-why',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gradient-to-b from-primary-50 to-secondary-50">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-12 animate-fade-in">
          <h2 class="text-4xl md:text-5xl font-bold text-primary-600 mb-4 font-heading">Why Choose The Gift Nub?</h2>
          <div class="w-24 h-1 bg-secondary-500 mx-auto mb-8"></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Personalization -->
          <div class="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-primary-100 hover:border-primary-200">
            <div class="text-secondary-500 text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary-600 mb-4">Intelligent Personalization</h3>
            <p class="text-gray-600">Our advanced recommendation system understands the nuances of gifting, ensuring each suggestion is thoughtfully curated for your recipient.</p>
          </div>

          <!-- Expertise -->
          <div class="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-primary-100 hover:border-primary-200">
            <div class="text-secondary-500 text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary-600 mb-4">Gifting Expertise</h3>
            <p class="text-gray-600">With years of experience in curating memorable gifts, we understand the art of creating moments that matter, especially for special events.</p>
          </div>

          <!-- Service -->
          <div class="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-primary-100 hover:border-primary-200">
            <div class="text-secondary-500 text-4xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary-600 mb-4">Exceptional Service</h3>
            <p class="text-gray-600">From personalized consultations to seamless delivery, we ensure every step of your gifting journey is handled with care and attention to detail.</p>
          </div>
        </div>

        <div class="mt-16 text-center">
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At The Gift Nub, we believe that every gift tells a story. Our mission is to help you create meaningful connections through thoughtfully curated gifts that leave lasting impressions.
          </p>
        </div>
      </div>
    </section>
  `
})
export class OurWhyComponent {} 