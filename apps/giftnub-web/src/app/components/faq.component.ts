import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="faq" class="py-20 bg-neutral-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-primary-400 mb-4 font-heading">Frequently Asked Questions</h2>
          <p class="text-xl text-gray-300">Everything you need to know about our gifting services</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- FAQ Item 1 -->
          <div class="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm border border-primary-500/10">
            <h3 class="text-xl font-semibold text-primary-300 mb-4">How does your intelligent gifting system work?</h3>
            <p class="text-gray-300">Our advanced AI analyzes recipient preferences, interests, and occasions to suggest thoughtfully curated gifts. We combine data-driven insights with human expertise to ensure each gift is meaningful and personalized.</p>
          </div>

          <!-- FAQ Item 2 -->
          <div class="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm border border-primary-500/10">
            <h3 class="text-xl font-semibold text-primary-300 mb-4">What are your pricing tiers?</h3>
            <p class="text-gray-300">We offer three tiers: Personal ($100-500), Premium ($500-2000), and Luxury ($2000+). Each tier includes personalized consultation, gift curation, and premium packaging. Corporate packages are customized based on volume and requirements.</p>
          </div>

          <!-- FAQ Item 3 -->
          <div class="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm border border-primary-500/10">
            <h3 class="text-xl font-semibold text-primary-300 mb-4">How do you handle corporate bulk orders?</h3>
            <p class="text-gray-300">Our dedicated corporate team manages bulk orders with a streamlined process. We offer volume discounts, branded packaging options, and can handle individual recipient preferences for personalized corporate gifting at scale.</p>
          </div>

          <!-- FAQ Item 4 -->
          <div class="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm border border-primary-500/10">
            <h3 class="text-xl font-semibold text-primary-300 mb-4">What's included in the VIP consultation?</h3>
            <p class="text-gray-300">Our VIP consultation includes a dedicated gift curator, in-depth preference analysis, access to exclusive luxury items, custom packaging design, and white-glove delivery service. The consultation fee is $299, which is credited toward your final purchase.</p>
          </div>

          <!-- FAQ Item 5 -->
          <div class="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm border border-primary-500/10">
            <h3 class="text-xl font-semibold text-primary-300 mb-4">What is your delivery timeline?</h3>
            <p class="text-gray-300">Standard delivery takes 3-5 business days. Express delivery is available for 1-2 business days. For corporate bulk orders, we create a custom delivery schedule based on your requirements and event dates.</p>
          </div>

          <!-- FAQ Item 6 -->
          <div class="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm border border-primary-500/10">
            <h3 class="text-xl font-semibold text-primary-300 mb-4">Do you offer international shipping?</h3>
            <p class="text-gray-300">Yes, we ship worldwide! International shipping rates and delivery times vary by location. Our team will provide detailed shipping information during the consultation process.</p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-gray-300 mb-4">Still have questions?</p>
          <a href="#contact" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  `
})
export class FaqComponent {}
