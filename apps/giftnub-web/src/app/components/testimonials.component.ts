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
          <div class="overflow-hidden touch-pan-y">
            <div 
              class="flex select-none touch-pan-y"
              [class.transition-transform]="!isDragging"
              [class.duration-300]="!isDragging"
              [class.cursor-grab]="!isDragging"
              [class.cursor-grabbing]="isDragging"
              [style.transform]="transform"
              (mousedown)="onDragStart($event)"
              (mousemove)="onDragMove($event)"
              (mouseup)="onDragEnd($event)"
              (mouseleave)="onDragEnd($event)"
              (touchstart)="onDragStart($event)"
              (touchmove)="onDragMove($event)"
              (touchend)="onDragEnd($event)"
              (touchcancel)="onDragEnd($event)"
            >
              <!-- Individual Testimonial -->
              <div *ngFor="let testimonial of testimonials" [style.width]="(100 / slidesPerView) + '%'" class="flex-shrink-0 px-4">
                <div class="group relative h-full">
                  <div class="absolute -inset-[1px] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500 group-hover:opacity-100"></div>
                  <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-black/30 group-hover:border-white/20 h-[400px] flex flex-col">
                    <div class="flex items-center mb-6">
                      <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                        <span class="text-white/90 text-xl font-bold">{{ testimonial.initials }}</span>
                      </div>
                      <div class="ml-4">
                        <h3 class="text-lg font-semibold text-white/90">{{ testimonial.name }}</h3>
                        <p class="text-white/50">{{ testimonial.type }}</p>
                      </div>
                    </div>
                    <div class="text-white/70 mb-6 flex-grow overflow-y-auto custom-scrollbar">
                      <p class="pr-2">{{ testimonial.content }}</p>
                    </div>
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
              *ngFor="let i of [].constructor(totalSlides); let idx = index; trackBy: trackByFn"
              (click)="goToSlide(idx)"
              class="w-2.5 h-2.5 rounded-full transition-all duration-300"
              [ngClass]="{'bg-primary-500': currentIndex === idx, 'bg-white/20': currentIndex !== idx}"
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

    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 20px;
    }
  `]
})
export class TestimonialsComponent {
  currentIndex = 0;
  testimonials = [
    {
      name: 'Ola Sola-Ilori',
      initials: 'OS',
      type: 'Customer',
      content: 'I had a really great experience with the Gift Nub. The gift boxes were very beautiful, affordable, the items were curated for the individuals I purchased them for. Thank you so much.',
    },
    {
      name: 'Oyetunji Jeremiah',
      initials: 'OJ',
      type: 'Customer',
      content: 'When it comes to ideas and curating gifts, The Gift Nub has got you completely covered. Efficient service delivery and unique gift idea options to choose from that wows the recipients.',
    },
    {
      name: 'Johnny Rene',
      initials: 'JR',
      type: 'Business Client',
      content: 'The hamper gifts was amazing all my clients and employees said it was so generous and well put together.',
    },
    {
      name: 'Oluwapelumi Odebunmi',
      initials: 'OO',
      type: 'Customer',
      content: 'The Gift Nub is truly the definition of professionalism, warmth and customer satisfaction. From consultation to them fully understanding clients needs and also, to them curating boxes filled with love and thoughtfulness, you can definitely trust them to make every moment an unforgettable memory.',
    },
    {
      name: 'Ola Ofuya',
      initials: 'OO',
      type: 'Repeat Customer',
      content: "The Gift Nub's got gift curation down pat!! Can't go wrong with them cos they've knocked it out of the park every time I've ordered personal gifts or business gift hampers. They curate unique and thoughtful gifts, and the customer service is top notch, very responsive and detailed in their communications! Love it!!",
    },
    {
      name: 'Paul Adeyeye',
      initials: 'PA',
      type: 'Customer',
      content: 'I ordered a surprise Christmas Hamper for my friend. I was so blown away by their professionalism and dedication. They went above and beyond to deliver. My friend was so impressed. Thank you so much for the great customer service. I can\'t wait to place another order.',
    },
    {
      name: 'Olumuyiwa Adejuwon',
      initials: 'OA',
      type: 'Customer',
      content: 'It was a Christmas gift to a friend, and your services picked, packaged and delivered an exquisite gift fit for the occasion. My friend loved it and was very pleased with the delivery. I have to add that helping out with gift ideas for our loved ones is so helpful. It makes the process of decision-making a whole lot easier. Thank you, and keep it up!',
    },
    {
      name: 'Jibike',
      initials: 'JB',
      type: 'Customer',
      content: "It was a Val's gift. I really appreciate the fact that you were able to get the air fryer within a short time and your package was really special. She loved her package and called to show her appreciation, which I love so much.",
    },
    {
      name: 'Sola O',
      initials: 'SO',
      type: 'Customer',
      content: "I needed a gift for a dear friend's 40th birthday. It was a last minute ask but Deola of Gift Nub came through! The service was prompt and communication throughout the process was great. The celebrant loved her gift! Thank you!",
    },
    {
      name: 'Bola Adesope',
      initials: 'BA',
      type: 'Professional',
      content: "As a Busy Professional with a hectic schedule, it's often a huge task finding the time to curate a perfect gifting for someone you love and care about. And when I found TheGiftNub, it was a breath of relief. I needed to show my utmost appreciation for my beloved during her birthday and Valentine's. All I needed was to share my vision with the guys at TheGiftNub….and the result, what they delivered was beyond my expectations. The speed of delivery, the quality of the gifts and the excellence in the package wowed me and my wife. I highly recommend TheGiftNub anytime, any day, any occasion.",
    }
  ];

  private viewportSize: 'sm' | 'md' | 'lg' = 'sm';
  isDragging = false;
  dragStartX = 0;
  currentTranslateX = 0;
  dragDelta = 0;
  private readonly DRAG_THRESHOLD = 0.2; // 20% of slide width

  constructor() {
    this.updateViewportSize();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.updateViewportSize());
    }
  }

  private updateViewportSize() {
    if (typeof window === 'undefined') return;
    
    if (window.innerWidth >= 1024) {
      this.viewportSize = 'lg';
    } else if (window.innerWidth >= 768) {
      this.viewportSize = 'md';
    } else {
      this.viewportSize = 'sm';
    }
  }

  get slidesPerView(): number {
    switch (this.viewportSize) {
      case 'lg': return 3;
      case 'md': return 2;
      default: return 1;
    }
  }

  get totalSlides(): number {
    return Math.ceil(this.testimonials.length / this.slidesPerView);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  trackByFn(index: number): number {
    return index;
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent && event.button !== 0) return; // Only handle left mouse button
    
    this.isDragging = true;
    this.dragStartX = this.getEventX(event);
    this.currentTranslateX = -this.currentIndex * (100 / this.slidesPerView);
    this.dragDelta = 0;
  }

  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    event.preventDefault();

    const currentX = this.getEventX(event);
    const containerWidth = (event.target as HTMLElement).clientWidth;
    this.dragDelta = ((currentX - this.dragStartX) / containerWidth) * 100;

    // Limit drag at boundaries with resistance
    const maxDrag = 0;
    const minDrag = -((this.totalSlides - 1) * (100 / this.slidesPerView));
    
    if (this.currentTranslateX + this.dragDelta > maxDrag) {
      this.dragDelta = this.dragDelta * 0.2; // Add resistance at start
    } else if (this.currentTranslateX + this.dragDelta < minDrag) {
      this.dragDelta = this.dragDelta * 0.2; // Add resistance at end
    }
  }

  onDragEnd(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    
    const slideWidth = 100 / this.slidesPerView;
    const dragPercentage = Math.abs(this.dragDelta / slideWidth);
    
    if (dragPercentage > this.DRAG_THRESHOLD) {
      if (this.dragDelta > 0 && this.currentIndex > 0) {
        this.currentIndex--;
      } else if (this.dragDelta < 0 && this.currentIndex < this.totalSlides - 1) {
        this.currentIndex++;
      }
    }

    this.isDragging = false;
    this.dragDelta = 0;
  }

  private getEventX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent 
      ? event.clientX 
      : event.touches[0]?.clientX || 0;
  }

  get transform(): string {
    const baseTranslate = -this.currentIndex * (100 / this.slidesPerView);
    const dragOffset = this.isDragging ? this.dragDelta : 0;
    return `translateX(${baseTranslate + dragOffset}%)`;
  }
}
