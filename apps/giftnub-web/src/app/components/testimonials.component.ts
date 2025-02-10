import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="py-20 bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-primary-400 mb-4 font-heading">What Our Clients Say</h2>
          <p class="text-xl text-gray-300">Real stories from satisfied gift recipients</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm border border-primary-500/10 hover:shadow-xl transition-all duration-300">
            <div class="mb-6">
              <svg class="w-8 h-8 text-secondary-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p class="text-gray-300 mb-6">The AI suggestions were spot on! I received a personalized gift box that perfectly matched my interests in sustainable living and artisanal crafts.</p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">E</div>
              <div class="ml-4">
                <div class="font-semibold text-primary-300">Emily Thompson</div>
                <div class="text-sm text-gray-400">Personal Gift Recipient</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm border border-primary-500/10 hover:shadow-xl transition-all duration-300">
            <div class="mb-6">
              <svg class="w-8 h-8 text-secondary-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p class="text-gray-300 mb-6">GiftNub transformed our corporate gifting strategy. The team handled everything from selection to delivery for 100+ employees, and everyone loved their gifts.</p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold text-lg">M</div>
              <div class="ml-4">
                <div class="font-semibold text-primary-300">Michael Chen</div>
                <div class="text-sm text-gray-400">Corporate Client</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm border border-primary-500/10 hover:shadow-xl transition-all duration-300">
            <div class="mb-6">
              <svg class="w-8 h-8 text-secondary-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p class="text-gray-300 mb-6">The VIP experience was exceptional. From the consultation to the final presentation, every detail was carefully considered. Truly a premium service.</p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">S</div>
              <div class="ml-4">
                <div class="font-semibold text-primary-300">Sarah Williams</div>
                <div class="text-sm text-gray-400">Luxury Gift Recipient</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {}
