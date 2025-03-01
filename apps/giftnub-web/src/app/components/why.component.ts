import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-why',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative min-h-screen overflow-hidden bg-gradient-to-b from-transparent via-black to-black py-24">
      <!-- Background Effects -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-black opacity-90"></div>
        <div class="absolute w-[600px] h-[600px] -top-48 -left-48 bg-primary-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div class="absolute w-[500px] h-[500px] top-1/4 right-1/4 bg-secondary-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div class="absolute w-[700px] h-[700px] -bottom-48 -right-48 bg-primary-500/5 rounded-full blur-3xl animate-float-fast"></div>
        <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 50px 50px; animation: gridGlow 8s infinite;"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] opacity-50"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl mb-8 animate-float">
            <span class="flex h-2 w-2 mr-2">
              <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-secondary-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
            </span>
            <span class="text-sm text-white/90">Our Story</span>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-secondary-200 leading-normal block">
              The Heart Behind
            </span>
            <span class="text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text mt-4 block">
              The Gift Nub
            </span>
          </h2>
        </div>

        <!-- Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 auto-rows-fr gap-8 lg:gap-12">
          <!-- Card 1 -->
          <div class="group relative transform hover:scale-[1.02] transition-all duration-300">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20 flex flex-col h-full">
              <div class="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-2.5 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-white/90 mb-4">The Challenge</h3>
              <p class="text-lg leading-relaxed text-white/80">
                Gift-giving is an art, a language of love, and a way to celebrate the meaningful connections in our lives. Yet, let's be honest - finding the perfect gift can feel overwhelming. How many times have you wandered through a store, staring at shelves, unsure of what to pick?
              </p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="group relative transform hover:scale-[1.02] transition-all duration-300">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20 flex flex-col h-full">
              <div class="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-2.5 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-white/90 mb-4">Our Approach</h3>
              <p class="text-lg leading-relaxed text-white/80">
                Through personalized gifting consultations, we help you uncover the perfect gift. For those moments when time is tight, our "Quick-Gift" collection offers stunning, pre-curated options from our gallery of past successes.
              </p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="group relative transform hover:scale-[1.02] transition-all duration-300">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20 flex flex-col h-full">
              <div class="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-2.5 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-white/90 mb-4">Our Solution</h3>
              <p class="text-lg leading-relaxed text-white/80">
                At The Gift Nub, we believe every gift should tell a story - a story of thoughtfulness, care, and connection. That's why we exist: to transform the stress of gift-giving into a joyful, meaningful experience.
              </p>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="group relative transform hover:scale-[1.02] transition-all duration-300">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:bg-black/30 group-hover:border-white/20 flex flex-col h-full">
              <div class="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 p-2.5 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-white/90 mb-4">Our Promise</h3>
              <p class="text-lg leading-relaxed text-white/80">
                Every gift is a labor of love, meticulously tailored to celebrate the occasion and connection. Because when you give with intention, you don't just give a gift - you give a moment, a memory, and a piece of your heart.
              </p>
              <p class="text-xl font-semibold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text mt-6">
                Let's make every gift count.
              </p>
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

    .animate-float {
      animation: float-medium 3s ease-in-out infinite;
    }
  `]
})
export class WhyComponent {} 