import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { NgxStripeModule } from 'ngx-stripe';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      NgxStripeModule.forRoot('your_publishable_key_here') // Replace with your Stripe publishable key
    ),
  ]
}).catch((err) => console.error(err));
