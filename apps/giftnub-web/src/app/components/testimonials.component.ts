import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="relative min-h-screen overflow-hidden bg-gradient-to-b from-transparent via-black to-black py-24">
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
              What Our Clients Say
            </span>
          </h2>
          <p class="text-xl text-white/70 max-w-3xl mx-auto">
            Discover how we've helped create unforgettable gifting experiences
          </p>
        </div>

        <div class="relative">
          <!-- Navigation Buttons -->
          <button (click)="prevSlide()" class="absolute top-1/2 -left-4 z-10 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all transform -translate-y-1/2 hover:scale-110">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <button (click)="nextSlide()" class="absolute top-1/2 -right-4 z-10 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all transform -translate-y-1/2 hover:scale-110">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Testimonials Slider -->
          <div class="overflow-hidden">
            <div class="flex transition-transform duration-500" [style.transform]="'translateX(' + (-currentIndex * 100) + '%)'">
              <!-- Individual Testimonial -->
              <div *ngFor="let testimonial of testimonials" class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                <div class="group relative h-full">
                  <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
                  <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-black/30 group-hover:border-white/20 h-full flex flex-col">
                    <div class="flex items-center mb-6">
                      <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                        <span class="text-white/90 text-xl font-bold">{{ testimonial.initials }}</span>
                      </div>
                      <div class="ml-4">
                        <h3 class="text-lg font-semibold text-white/90">{{ testimonial.name }}</h3>
                        <p class="text-white/50">{{ testimonial.type }}</p>
                      </div>
                    </div>
                    <p class="text-white/70 mb-6 flex-grow">{{ testimonial.content }}</p>
                    <div class="flex text-secondary-500">
                      <ng-container *ngFor="let star of [1,2,3,4,5]">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </ng-container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dots Navigation -->
          <div class="flex justify-center mt-8 space-x-2">
            <button
              *ngFor="let _ of testimonials; let i = index"
              (click)="goToSlide(i)"
              class="w-2.5 h-2.5 rounded-full transition-all duration-300"
              [ngClass]="{'bg-primary-500': currentIndex === i, 'bg-white/20': currentIndex !== i}"
            ></button>
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
export class TestimonialsComponent {
  currentIndex = 0;
  testimonials = [
    {
      name: 'Sarah Johnson',
      initials: 'SJ',
      type: 'Personal Gift',
      content: 'The AI suggestions were spot on! Found the perfect anniversary gift for my husband in minutes. The presentation was absolutely stunning.',
    },
    {
      name: 'Tech Corp',
      initials: 'TC',
      type: 'Corporate Event',
      content: 'Handled our company-wide gifting for 500 employees flawlessly. The personalization and attention to detail was impressive.',
    },
    {
      name: 'Michael Chen',
      initials: 'MC',
      type: 'Wedding Gift',
      content: 'Their event gifting service made our wedding favors truly special. Every guest was amazed by the thoughtful presentation.',
    },
    {
      name: 'Emma Davis',
      initials: 'ED',
      type: 'Birthday Gift',
      content: 'The VIP consultation was worth every penny. They created a custom gift experience that exceeded all expectations.',
    }
  ];

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
