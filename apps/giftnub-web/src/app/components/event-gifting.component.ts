import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-event-gifting',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-primary-400 mb-6 font-heading">Event Gifting Services</h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Make your special occasions unforgettable with our premium event gifting solutions. Perfect for corporate events, weddings, and celebrations.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <!-- Corporate Events -->
          <div class="bg-neutral-800/50 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 border border-primary-500/10">
            <div class="text-secondary-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-primary-300 mb-4">Corporate Events</h3>
            <ul class="text-gray-300 space-y-3">
              <li>• Custom branded gifts</li>
              <li>• Bulk ordering available</li>
              <li>• Professional presentation</li>
              <li>• Delivery coordination</li>
            </ul>
          </div>

          <!-- Weddings -->
          <div class="bg-neutral-800/50 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 border border-primary-500/10">
            <div class="text-secondary-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-primary-300 mb-4">Weddings</h3>
            <ul class="text-gray-300 space-y-3">
              <li>• Wedding party gifts</li>
              <li>• Guest favors</li>
              <li>• Personalized packaging</li>
              <li>• Theme coordination</li>
            </ul>
          </div>

          <!-- Special Celebrations -->
          <div class="bg-neutral-800/50 rounded-xl p-8 transform hover:scale-105 transition-all duration-300 border border-primary-500/10">
            <div class="text-secondary-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-primary-300 mb-4">Special Celebrations</h3>
            <ul class="text-gray-300 space-y-3">
              <li>• Birthday parties</li>
              <li>• Anniversary events</li>
              <li>• Holiday gatherings</li>
              <li>• Custom occasions</li>
            </ul>
          </div>
        </div>

        <div class="text-center">
          <a 
            href="https://buy.stripe.com/bIY3d32GY2yQfIs7ss" 
            target="_blank"
            class="inline-block bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Planning Your Event
          </a>
        </div>

        <div class="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div class="bg-neutral-800/50 rounded-xl p-8 border border-primary-500/10">
            <h3 class="text-2xl font-bold text-primary-300 mb-6">Why Choose Our Event Gifting?</h3>
            <div class="space-y-4 text-gray-300">
              <p class="flex items-start gap-3">
                <svg class="w-6 h-6 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Professional gift curation and presentation</span>
              </p>
              <p class="flex items-start gap-3">
                <svg class="w-6 h-6 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Seamless coordination and delivery</span>
              </p>
              <p class="flex items-start gap-3">
                <svg class="w-6 h-6 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Customization options for every budget</span>
              </p>
              <p class="flex items-start gap-3">
                <svg class="w-6 h-6 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Dedicated event gifting specialist</span>
              </p>
            </div>
          </div>

          <div class="bg-neutral-800/50 rounded-xl p-8 border border-primary-500/10">
            <h3 class="text-2xl font-bold text-primary-300 mb-6">Our Process</h3>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-primary-200 mb-2">Consultation</h4>
                  <p class="text-gray-300">Discuss your event details, theme, and requirements with our specialist</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-primary-200 mb-2">Curation</h4>
                  <p class="text-gray-300">Receive personalized gift recommendations based on your preferences</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-primary-200 mb-2">Coordination</h4>
                  <p class="text-gray-300">We handle all logistics, from ordering to delivery and setup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class EventGiftingComponent {} 