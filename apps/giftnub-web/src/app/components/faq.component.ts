import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="faq" class="relative min-h-screen overflow-hidden bg-gradient-to-b from-transparent via-black to-black py-24">
      <!-- Enhanced Background Effects -->
      <div class="absolute inset-0">
        <!-- Improved gradient overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-black opacity-90"
        ></div>

        <!-- Animated floating orbs -->
        <div
          class="absolute w-[600px] h-[600px] -top-48 -left-48 bg-primary-500/10 rounded-full blur-3xl animate-float-slow"
        ></div>
        <div
          class="absolute w-[500px] h-[500px] top-1/4 right-1/4 bg-secondary-500/10 rounded-full blur-3xl animate-float-medium"
        ></div>
        <div
          class="absolute w-[700px] h-[700px] -bottom-48 -right-48 bg-primary-500/5 rounded-full blur-3xl animate-float-fast"
        ></div>

        <!-- Animated grid with glow -->
        <div
          class="absolute inset-0 opacity-[0.03]"
          style="
            background-image: linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridGlow 8s infinite;
          "
        ></div>

        <!-- Particle effect overlay -->
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] opacity-50"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-secondary-200">
              Frequently Asked Questions
            </span>
          </h2>
          <p class="text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to know about our gifting services
          </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-4">
          <!-- FAQ Item 1 -->
          <div class="group relative">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20">
              <button (click)="toggleFaq(0)" class="w-full flex justify-between items-center p-6 focus:outline-none">
                <span class="text-lg font-semibold text-white/90">How does your intelligent gifting system work?</span>
                <svg 
                  class="w-6 h-6 text-white/70 transform transition-transform duration-200"
                  [class.rotate-180]="expandedIndex === 0"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="overflow-hidden transition-all duration-300" [style.maxHeight]="expandedIndex === 0 ? '500px' : '0'">
                <div class="p-6 pt-0 text-white/70">
                  Our advanced AI analyzes recipient preferences, interests, and occasions to suggest thoughtfully curated gifts. We combine data-driven insights with human expertise to ensure each gift is meaningful and personalized.
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Item 2 -->
          <div class="group relative">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20">
              <button (click)="toggleFaq(1)" class="w-full flex justify-between items-center p-6 focus:outline-none">
                <span class="text-lg font-semibold text-white/90">What are your pricing tiers?</span>
                <svg 
                  class="w-6 h-6 text-white/70 transform transition-transform duration-200"
                  [class.rotate-180]="expandedIndex === 1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="overflow-hidden transition-all duration-300" [style.maxHeight]="expandedIndex === 1 ? '500px' : '0'">
                <div class="p-6 pt-0 text-white/70">
                  We offer three tiers: Personal ($100-500), Premium ($500-2000), and Luxury ($2000+). Each tier includes personalized consultation, gift curation, and premium packaging. Corporate packages are customized based on volume and requirements.
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Item 3 -->
          <div class="group relative">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20">
              <button (click)="toggleFaq(2)" class="w-full flex justify-between items-center p-6 focus:outline-none">
                <span class="text-lg font-semibold text-white/90">How do you handle corporate bulk orders?</span>
                <svg 
                  class="w-6 h-6 text-white/70 transform transition-transform duration-200"
                  [class.rotate-180]="expandedIndex === 2"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="overflow-hidden transition-all duration-300" [style.maxHeight]="expandedIndex === 2 ? '500px' : '0'">
                <div class="p-6 pt-0 text-white/70">
                  Our dedicated corporate team manages bulk orders with a streamlined process. We offer volume discounts, branded packaging options, and can handle individual recipient preferences for personalized corporate gifting at scale.
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Item 4 -->
          <div class="group relative">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20">
              <button (click)="toggleFaq(3)" class="w-full flex justify-between items-center p-6 focus:outline-none">
                <span class="text-lg font-semibold text-white/90">What's included in the VIP consultation?</span>
                <svg 
                  class="w-6 h-6 text-white/70 transform transition-transform duration-200"
                  [class.rotate-180]="expandedIndex === 3"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="overflow-hidden transition-all duration-300" [style.maxHeight]="expandedIndex === 3 ? '500px' : '0'">
                <div class="p-6 pt-0 text-white/70">
                  Our VIP consultation includes a dedicated gift curator, in-depth preference analysis, access to exclusive luxury items, custom packaging design, and white-glove delivery service. The consultation fee is $299, which is credited toward your final purchase.
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Item 5 -->
          <div class="group relative">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20">
              <button (click)="toggleFaq(4)" class="w-full flex justify-between items-center p-6 focus:outline-none">
                <span class="text-lg font-semibold text-white/90">What is your delivery timeline?</span>
                <svg 
                  class="w-6 h-6 text-white/70 transform transition-transform duration-200"
                  [class.rotate-180]="expandedIndex === 4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="overflow-hidden transition-all duration-300" [style.maxHeight]="expandedIndex === 4 ? '500px' : '0'">
                <div class="p-6 pt-0 text-white/70">
                  Standard delivery takes 3-5 business days. Express delivery is available for 1-2 business days. For corporate bulk orders, we create a custom delivery schedule based on your requirements and event dates.
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Item 6 -->
          <div class="group relative">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20">
              <button (click)="toggleFaq(5)" class="w-full flex justify-between items-center p-6 focus:outline-none">
                <span class="text-lg font-semibold text-white/90">Do you offer international shipping?</span>
                <svg 
                  class="w-6 h-6 text-white/70 transform transition-transform duration-200"
                  [class.rotate-180]="expandedIndex === 5"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="overflow-hidden transition-all duration-300" [style.maxHeight]="expandedIndex === 5 ? '500px' : '0'">
                <div class="p-6 pt-0 text-white/70">
                  Yes, we ship worldwide! International shipping rates and delivery times vary by location. Our team will provide detailed shipping information during the consultation process.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-white/70 mb-4">Still have questions?</p>
          <a 
            href="#consultationBooking" 
            class="inline-block relative group/btn overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 p-[1px] transition-all duration-300 hover:scale-[1.02]"
          >
            <div class="relative bg-black/60 backdrop-blur-xl rounded-lg px-8 py-4 transition-all duration-300 group-hover/btn:bg-black/40">
              <span class="text-white font-medium">Book a Consultation</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  `,
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
  `]
})
export class FaqComponent {
  expandedIndex = -1;

  toggleFaq(index: number) {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }
}
