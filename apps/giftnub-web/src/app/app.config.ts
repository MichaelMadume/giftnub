import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { NgxStripeModule } from 'ngx-stripe';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      NgxStripeModule.forRoot('your_publishable_key_here') // Replace with your Stripe publishable key
    ),
  ],
};
