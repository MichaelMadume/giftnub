import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  Stripe,
} from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class GiftNubStripeService {
  private apiUrl = 'your_api_endpoint'; // Replace with your API endpoint
  private publishableKey = 'your_publishable_key'; // Replace with your Stripe publishable key
  private stripePromise = loadStripe(this.publishableKey);

  constructor(
    private http: HttpClient,
    private stripeService: StripeService
  ) {}

  // Get Stripe instance
  getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }

  // Card Element Options
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  // Stripe Elements Options
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  // Create Payment Intent
  createPaymentIntent(amount: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(
      `${this.apiUrl}/create-payment-intent`,
      { amount }
    );
  }

  // Process Payment
  processPayment(paymentIntentId: string, paymentMethodId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-payment`, {
      paymentIntentId,
      paymentMethodId,
    });
  }

  // Create Subscription
  createSubscription(priceId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-subscription`, {
      priceId,
    });
  }

  // Get Payment Method
  createPaymentMethod(element: any): Observable<any> {
    return from(this.stripeService.createPaymentMethod({
      type: 'card',
      card: element,
    }));
  }

  // Confirm Card Payment
  confirmCardPayment(clientSecret: string, paymentMethod: any): Observable<any> {
    return from(this.stripeService.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod,
    }));
  }
}
