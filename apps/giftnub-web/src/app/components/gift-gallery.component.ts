import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-gift-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="giftGallery" class="py-20 bg-neutral-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-primary-400 mb-4 font-heading">Past Gift Experiences</h2>
          <p class="text-xl text-gray-300">Browse our curated collection of successful gift stories</p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex justify-center mb-12 space-x-4">
          <button class="px-6 py-2 rounded-full bg-primary-500/10 text-primary-300 hover:bg-primary-500/20 transition-all">All Gifts</button>
          <button class="px-6 py-2 rounded-full bg-primary-500/10 text-primary-300 hover:bg-primary-500/20 transition-all">Personal</button>
          <button class="px-6 py-2 rounded-full bg-primary-500/10 text-primary-300 hover:bg-primary-500/20 transition-all">Corporate</button>
          <button class="px-6 py-2 rounded-full bg-primary-500/10 text-primary-300 hover:bg-primary-500/20 transition-all">Luxury</button>
        </div>

        <!-- Gift Grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Gift Card 1 -->
          <div class="bg-neutral-800 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-primary-500/10">
            <div class="aspect-w-16 aspect-h-9 bg-neutral-700">
              <div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-primary-300 mb-2">Personalized Gift Box</h3>
              <p class="text-gray-300 mb-4">Curated collection of artisanal items</p>
              <div class="flex justify-between items-center">
                <span class="text-secondary-400 font-bold">$150</span>
                <span class="text-sm px-3 py-1 rounded-full bg-primary-500/10 text-primary-300">Personal</span>
              </div>
              <a href="#consultationBooking" class="mt-4 block text-center py-2 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
                Book to Replicate
              </a>
            </div>
          </div>

          <!-- Gift Card 2 -->
          <div class="bg-neutral-800 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-primary-500/10">
            <div class="aspect-w-16 aspect-h-9 bg-neutral-700">
              <div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-primary-300 mb-2">Corporate Welcome Kit</h3>
              <p class="text-gray-300 mb-4">Premium branded merchandise set</p>
              <div class="flex justify-between items-center">
                <span class="text-secondary-400 font-bold">$200</span>
                <span class="text-sm px-3 py-1 rounded-full bg-primary-500/10 text-primary-300">Corporate</span>
              </div>
              <a href="#consultationBooking" class="mt-4 block text-center py-2 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
                Book to Replicate
              </a>
            </div>
          </div>

          <!-- Gift Card 3 -->
          <div class="bg-neutral-800 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-primary-500/10">
            <div class="aspect-w-16 aspect-h-9 bg-neutral-700">
              <div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-primary-300 mb-2">Luxury Experience Package</h3>
              <p class="text-gray-300 mb-4">VIP treatment and exclusive items</p>
              <div class="flex justify-between items-center">
                <span class="text-secondary-400 font-bold">$500</span>
                <span class="text-sm px-3 py-1 rounded-full bg-primary-500/10 text-primary-300">Luxury</span>
              </div>
              <a href="#consultationBooking" class="mt-4 block text-center py-2 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
                Book to Replicate
              </a>
            </div>
          </div>
        </div>

        <!-- Consultation CTA -->
        <div class="mt-16 text-center">
          <h3 class="text-2xl font-bold text-primary-400 mb-4">Book Your Consultation</h3>
          <p class="text-gray-300 mb-2">Schedule a personalized session with our gift experts</p>
          <p class="text-secondary-400 font-bold mb-8">Consultation fee: $50.00</p>
          <a href="#consultationBooking" class="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
            Schedule Now
          </a>
        </div>
      </div>
    </section>
  `
})
export class GiftGalleryComponent {}
