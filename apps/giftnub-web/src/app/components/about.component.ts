import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'giftnub-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="relative overflow-hidden bg-gradient-to-b from-transparent via-black to-black py-12 md:py-16">
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
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-secondary-200">
              Meet Adeola Jeremiah
            </span>
          </h2>
          <p class="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            The Visionary Behind The Gift Nub
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <!-- Profile Image -->
          <div class="relative group max-w-lg mx-auto md:mx-0">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500"></div>
            <div class="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
              <img
                src="assets/founder.jpeg"
                alt="Adeola Jeremiah"
                class="w-full h-full object-cover"
                onError="this.src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80'"
              />
            </div>
          </div>

          <!-- Bio Content -->
          <div class="space-y-4 md:space-y-6">
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500"></div>
              <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 md:p-6 transition-all duration-300 hover:bg-black/30">
                <p class="text-sm md:text-base text-white/80 leading-relaxed">
                  Adeola Jeremiah is more than just a gifting expert - she's a curator of connections, a master of meaningful moments, and a passionate advocate for the art of thoughtful giving. With a keen eye for detail and an innate understanding of what makes relationships special, Adeola has redefined the way we express love, appreciation, and celebration through gifts.
                </p>
              </div>
            </div>

            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500"></div>
              <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 md:p-6 transition-all duration-300 hover:bg-black/30">
                <p class="text-sm md:text-base text-white/80 leading-relaxed">
                  What began as a heartfelt hobby three years ago has blossomed into The Gift Nub, a high-quality gifting service that reflects Adeola's dedication to creating unforgettable experiences. Her journey is a testament to her belief that every gift should tell a story - one that resonates deeply with the recipient and strengthens the bond between giver and receiver.
                </p>
              </div>
            </div>

            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500"></div>
              <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 md:p-6 transition-all duration-300 hover:bg-black/30">
                <p class="text-sm md:text-base text-white/80 leading-relaxed">
                  With a degree in Electrical Engineering and a successful career in Program Management, Adeola brings a rare blend of precision, creativity, and strategic thinking to her work. Her ability to balance logic with artistry has earned her multiple honors and awards, but it's her passion for helping others that truly sets her apart.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Bio Sections -->
        <div class="mt-8 md:mt-12 grid md:grid-cols-2 gap-4 md:gap-8">
          <div class="group relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 md:p-6 transition-all duration-300 hover:bg-black/30">
              <p class="text-sm md:text-base text-white/80 leading-relaxed">
                At The Gift Nub, Adeola channels her love for excellence into every detail. Whether she's crafting a personalized gift package or guiding clients through a gifting consultation, her goal is always the same: to create moments that matter. Her philosophy is simple yet profound: a great gift isn't just an item - it's an experience, a memory, and a reflection of the giver's thoughtfulness.
              </p>
            </div>
          </div>

          <div class="group relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-2xl blur group-hover:blur-md opacity-75 transition-all duration-500"></div>
            <div class="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 md:p-6 transition-all duration-300 hover:bg-black/30">
              <p class="text-sm md:text-base text-white/80 leading-relaxed">
                When you consult with Adeola, you're not just getting a gifting expert - you're gaining a trusted partner who truly cares about making your moments special. Her warmth, creativity, and dedication shine through in every interaction, making her the perfect guide for anyone looking to master the art of thoughtful gifting.
              </p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-8 md:mt-12 text-center">
          <a 
            href="#consultationBooking"
            class="inline-block relative group/btn overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 p-[1px] transition-all duration-300 hover:scale-[1.02]"
          >
            <div class="relative bg-black/60 backdrop-blur-xl rounded-lg px-6 md:px-8 py-3 md:py-4 transition-all duration-300 group-hover/btn:bg-black/40">
              <span class="text-white font-medium">Book a Consultation with Adeola</span>
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
export class AboutComponent {} 