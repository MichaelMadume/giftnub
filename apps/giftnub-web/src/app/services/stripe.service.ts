import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  Stripe,
  PaymentIntent,
  PaymentIntentResult,
} from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GiftNubStripeService {
  private publishableKey = environment.stripe.publishableKey;
  private stripePromise = loadStripe(this.publishableKey);

  constructor(private http: HttpClient, private stripeService: StripeService) {}

  // Get Stripe instance
  getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }

  // Card Element Options
 cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#ffffff',
        fontWeight: '400',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: '16px',
        lineHeight: '24px',
        '::placeholder': {
          color: 'rgba(255, 255, 255, 0.5)',
        },
        backgroundColor: 'transparent',
        padding: '16px 20px',
      },
      invalid: {
        color: '#ff5b5b',
        iconColor: '#ff5b5b',
      },
    },
    hidePostalCode: true,
  };

  // Stripe Elements Options
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  // Process Payment with card element
  processPayment(
    paymentMethodId: string,
    clientSecret: string
  ): Observable<PaymentIntent> {
    return from(
      this.stripeService.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId,
      })
    ).pipe(
      map((result: PaymentIntentResult) => {
        if (result.error) {
          throw result.error;
        }
        if (result.paymentIntent) {
          return result.paymentIntent;
        }
        throw new Error('Payment failed');
      })
    );
  }

  // Create Payment Method
  createPaymentMethod(element: any): Observable<any> {
    return from(
      this.stripeService.createPaymentMethod({
        type: 'card',
        card: element,
      })
    );
  }

  // Confirm Card Payment
  confirmCardPayment(
    clientSecret: string,
    paymentMethod: any
  ): Observable<any> {
    return from(
      this.stripeService.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod,
      })
    );
  }
}
