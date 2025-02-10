declare global {
  interface Window {
    Calendly: any;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { PathSelectorComponent } from './components/path-selector.component';
import { GiftGalleryComponent } from './components/gift-gallery.component';
import { EventGiftingComponent } from './components/event-gifting.component';
import { TestimonialsComponent } from './components/testimonials.component';
import { FaqComponent } from './components/faq.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'giftnub-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    PathSelectorComponent,
    GiftGalleryComponent,
    EventGiftingComponent,
    TestimonialsComponent,
    FaqComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen bg-neutral-900 text-white">
      <giftnub-navbar></giftnub-navbar>
      <giftnub-hero></giftnub-hero>
      <div class="bg-neutral-950">
        <giftnub-path-selector></giftnub-path-selector>
      </div>
      <giftnub-gift-gallery></giftnub-gift-gallery>
      <div class="bg-neutral-950">
        <giftnub-event-gifting></giftnub-event-gifting>
      </div>
      <giftnub-testimonials></giftnub-testimonials>
      <div class="bg-neutral-950">
        <giftnub-faq></giftnub-faq>
      </div>
      <giftnub-footer></giftnub-footer>
    </div>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Add Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Calendly popup
    window.Calendly = {
      initPopupWidget: (options: any) => {
        // This will be replaced by the actual Calendly function when the script loads
      }
    };
  }
}
