import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-path-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="pathSelector" class="relative h-screen overflow-hidden bg-gradient-to-b from-black via-primary-950/5 to-black">
      <!-- Background Effects -->
      <div class="absolute inset-0">
        <!-- Gradient background with more contrast -->
        <div class="absolute inset-0 bg-gradient-to-b from-black via-primary-950/10 to-transparent"></div>
        
        <!-- Subtle radial gradient for depth -->
        <div class="absolute inset-0 bg-radial-at-center from-primary-500/5 via-transparent to-transparent"></div>
        
        <!-- Grid pattern -->
        <div class="absolute inset-0 opacity-[0.03]"
             style="background-image: linear-gradient(to right, white 1px, transparent 1px),
                                    linear-gradient(to bottom, white 1px, transparent 1px);
                    background-size: 50px 50px;">
        </div>
      </div>

      <div class="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-secondary-200">
              Choose Your Gift Journey
            </span>
          </h2>
          <p class="text-white/70 max-w-2xl mx-auto">
            Select the path that best suits your gifting needs. Each option is tailored to provide 
            you with the perfect gifting experience.
          </p>
        </div>

        <!-- Path Cards -->
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Quick Gift Card -->
          <a href="#intelligentSuggestions" 
             class="group relative block">
            <!-- Gradient border effect -->
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-2xl blur-sm opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            
            <!-- Card Content -->
            <div class="relative h-full p-8 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
              <!-- Hover Gradient -->
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Icon -->
              <div class="relative">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-4 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                
                <h3 class="text-2xl font-semibold text-white mb-3">Quick Gift Finder</h3>
                <p class="text-white/70 mb-6">Get instant gift suggestions based on your preferences. Perfect for those who need quick, thoughtful recommendations.</p>
                
                <!-- Features List -->
                <ul class="space-y-3">
                  <li class="flex items-center text-white/60">
                    <svg class="w-5 h-5 mr-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Instant AI-powered suggestions
                  </li>
                  <li class="flex items-center text-white/60">
                    <svg class="w-5 h-5 mr-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    5-minute process
                  </li>
                  <li class="flex items-center text-white/60">
                    <svg class="w-5 h-5 mr-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    Personalized gift list
                  </li>
                </ul>

                <!-- Action Button -->
                <div class="mt-8 inline-flex items-center text-white group-hover:text-primary-400 transition-colors">
                  <span class="font-semibold">Get Started</span>
                  <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </div>
          </a>

          <!-- Consultation Card -->
          <a href="#consultationBooking" 
             class="group relative block">
            <!-- Gradient border effect -->
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-2xl blur-sm opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            
            <!-- Card Content -->
            <div class="relative h-full p-8 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
              <!-- Hover Gradient -->
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Icon -->
              <div class="relative">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-4 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4v-4z"/>
                  </svg>
                </div>
                
                <h3 class="text-2xl font-semibold text-white mb-3">Personal Consultation</h3>
                <p class="text-white/70 mb-6">Schedule a one-on-one session with our gift experts for a more personalized experience.</p>
                
                <!-- Features List -->
                <ul class="space-y-3">
                  <li class="flex items-center text-white/60">
                    <svg class="w-5 h-5 mr-3 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Expert guidance
                  </li>
                  <li class="flex items-center text-white/60">
                    <svg class="w-5 h-5 mr-3 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                    </svg>
                    Curated selections
                  </li>
                  <li class="flex items-center text-white/60">
                    <svg class="w-5 h-5 mr-3 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    100% satisfaction guarantee
                  </li>
                </ul>

                <!-- Action Button -->
                <div class="mt-8 inline-flex items-center text-white group-hover:text-secondary-400 transition-colors">
                  <span class="font-semibold">Book Now</span>
                  <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PathSelectorComponent {}
