import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'giftnub-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="hero" class="min-h-screen pt-16 relative overflow-hidden bg-black">
      <!-- Animated background effects -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Dark gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-primary-950 via-black to-black opacity-80"></div>
        
        <!-- Gradient orbs -->
        <div class="absolute w-[500px] h-[500px] -top-32 -left-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute w-[500px] h-[500px] -bottom-32 -right-32 bg-secondary-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <!-- Animated grid -->
        <div class="absolute inset-0 opacity-[0.02]"
             style="background-image: linear-gradient(to right, white 1px, transparent 1px),
                                    linear-gradient(to bottom, white 1px, transparent 1px);
                    background-size: 50px 50px;">
        </div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <!-- Main content -->
        <div class="text-center space-y-8 relative z-10">
          <!-- Floating badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl mb-8 animate-float">
            <span class="flex h-2 w-2 mr-2">
              <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-secondary-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
            </span>
            <span class="text-sm text-white/90">Revolutionizing Gift-Giving</span>
          </div>

          <!-- Main heading -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-secondary-200 leading-normal block py-2">
              The Gift Nub
            </span>
            <span class="text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text mt-4 block py-1 mb-10">
              Where Thoughtful Gifting Begins
            </span>
          </h1>

          <!-- Description -->
          <p class="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mt-2">
            Experience personalized gift recommendations powered by intelligent insights, 
            making every occasion memorable with the perfect present.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="#pathSelector" 
               class="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20">
              <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span class="relative flex items-center gap-2">
                Start Your Journey
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
            </a>
            <a href="#intelligentSuggestions" 
               class="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm text-white font-semibold transition-all hover:bg-white/10 border border-white/10 hover:border-white/20">
              <span class="relative flex items-center gap-2">
                Try Gift Recommendations
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </span>
            </a>
          </div>

          <!-- Feature cards -->
          <div class="grid md:grid-cols-3 gap-6 mt-20">
            <!-- Personal Gifting Card -->
            <div class="group relative">
              <!-- Gradient border effect -->
              <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-2xl blur-sm opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
              <div class="relative h-full p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/5 transition-all duration-300 hover:scale-[1.02]">
                <div class="rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2 leading-relaxed">Personal Gifting</h3>
                <p class="text-white/80 leading-relaxed">Curated selections for your loved ones with a personal touch</p>
              </div>
            </div>

            <!-- Corporate Events Card -->
            <div class="group relative">
              <!-- Gradient border effect -->
              <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-2xl blur-sm opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
              <div class="relative h-full p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/5 transition-all duration-300 hover:scale-[1.02]">
                <div class="rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2 leading-relaxed">Corporate Events</h3>
                <p class="text-white/80 leading-relaxed">Bulk gifting solutions for your business needs</p>
              </div>
            </div>

            <!-- Smart Suggestions Card -->
            <div class="group relative">
              <!-- Gradient border effect -->
              <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-2xl blur-sm opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
              <div class="relative h-full p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/5 transition-all duration-300 hover:scale-[1.02]">
                <div class="rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-3 w-14 h-14 mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2 leading-relaxed">Smart Suggestions</h3>
                <p class="text-white/80 leading-relaxed">Intelligent recommendations for perfect gifts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom gradient -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `]
})
export class HeroComponent {} 