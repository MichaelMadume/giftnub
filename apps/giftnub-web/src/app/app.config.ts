import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { NgxStripeModule } from 'ngx-stripe';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      NgxStripeModule.forRoot(environment.stripe.publishableKey)
    ),
  ],
};
