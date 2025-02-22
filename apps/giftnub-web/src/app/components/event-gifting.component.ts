import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-event-gifting',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="eventGifting" class="relative min-h-screen overflow-hidden bg-gradient-to-b from-transparent via-black to-black py-24">
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
              Event Gifting Services
            </span>
          </h2>
          <p class="text-xl text-white/70 max-w-3xl mx-auto">
            Make your special occasions unforgettable with our premium event gifting solutions. Perfect for corporate events, weddings, and celebrations.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <!-- Corporate Events -->
          <div class="group relative">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-black/30 group-hover:border-white/20">
              <div class="text-secondary-500 mb-6 transform transition-transform group-hover:scale-110 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white/90 mb-4">Corporate Events</h3>
              <ul class="text-white/70 space-y-3">
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Custom branded gifts
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Bulk ordering available
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Professional presentation
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Delivery coordination
                </li>
              </ul>
            </div>
          </div>

          <!-- Weddings -->
          <div class="group relative">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-black/30 group-hover:border-white/20">
              <div class="text-secondary-500 mb-6 transform transition-transform group-hover:scale-110 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white/90 mb-4">Weddings</h3>
              <ul class="text-white/70 space-y-3">
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Wedding party gifts
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Guest favors
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Personalized packaging
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Theme coordination
                </li>
              </ul>
            </div>
          </div>

          <!-- Special Celebrations -->
          <div class="group relative">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-black/30 group-hover:border-white/20">
              <div class="text-secondary-500 mb-6 transform transition-transform group-hover:scale-110 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white/90 mb-4">Special Celebrations</h3>
              <ul class="text-white/70 space-y-3">
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Birthday parties
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Anniversary events
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Holiday gatherings
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  Custom occasions
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="text-center mb-20">
          <a 
            href="#consultationBooking" 
            class="inline-block relative group/btn overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 p-[1px] transition-all duration-300 hover:scale-[1.02]"
          >
            <div class="relative bg-black/60 backdrop-blur-xl rounded-lg px-8 py-4 transition-all duration-300 group-hover/btn:bg-black/40">
              <span class="text-white font-medium">Start Planning Your Event</span>
            </div>
          </a>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Why Choose Us -->
          <div class="group relative h-full">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-black/30 group-hover:border-white/20 h-full flex flex-col">
              <h3 class="text-2xl font-bold text-white/90 mb-4">Why Choose Our Event Gifting?</h3>
              <div class="grid grid-cols-1 gap-3 flex-grow">
                <div class="flex items-center gap-3 group/item">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-secondary-500 flex-shrink-0 transform transition-transform group-hover/item:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-white/70 text-lg">Professional gift curation and presentation</span>
                </div>
                <div class="flex items-center gap-3 group/item">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-secondary-500 flex-shrink-0 transform transition-transform group-hover/item:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-white/70 text-lg">Seamless coordination and delivery</span>
                </div>
                <div class="flex items-center gap-3 group/item">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-secondary-500 flex-shrink-0 transform transition-transform group-hover/item:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-white/70 text-lg">Customization options for every budget</span>
                </div>
                <div class="flex items-center gap-3 group/item">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-secondary-500 flex-shrink-0 transform transition-transform group-hover/item:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-white/70 text-lg">Dedicated event gifting specialist</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Our Process -->
          <div class="group relative h-full">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-black/30 group-hover:border-white/20 h-full flex flex-col">
              <h3 class="text-2xl font-bold text-white/90 mb-4">Our Process</h3>
              <div class="grid grid-cols-1 gap-4 flex-grow">
                <div class="flex items-center gap-4 group/step">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 transform transition-transform group-hover/step:scale-110">
                    <span class="text-white font-bold text-lg">1</span>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-white/90">Consultation</h4>
                    <p class="text-white/70">Discuss your event details, theme, and requirements</p>
                  </div>
                </div>
                <div class="flex items-center gap-4 group/step">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 transform transition-transform group-hover/step:scale-110">
                    <span class="text-white font-bold text-lg">2</span>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-white/90">Curation</h4>
                    <p class="text-white/70">Receive personalized gift recommendations</p>
                  </div>
                </div>
                <div class="flex items-center gap-4 group/step">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 transform transition-transform group-hover/step:scale-110">
                    <span class="text-white font-bold text-lg">3</span>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-white/90">Coordination</h4>
                    <p class="text-white/70">We handle all logistics and delivery setup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
export class EventGiftingComponent {} 