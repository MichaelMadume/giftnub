import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';
import { switchMap, tap, map } from 'rxjs/operators';
import { Observable, from, BehaviorSubject } from 'rxjs';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  Stripe,
  PaymentIntent,
  PaymentIntentResult,
} from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';

interface PaymentStatus {
  status: string;
  metadata: any;
}

@Injectable({
  providedIn: 'root',
})
export class GiftNubStripeService {
  private apiUrl = environment.stripe.api;
  private publishableKey = environment.stripe.publishableKey;
  private stripePromise = loadStripe(this.publishableKey);
  private paymentStatus = new BehaviorSubject<PaymentStatus | null>(null);

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

  // Create Payment Intent with metadata
  createPaymentIntent(amount: number, metadata: any = {}): Observable<{ 
    clientSecret: string;
    paymentIntentId: string;
    customerId: string;
  }> {
    return this.http.post<any>(
      `${this.apiUrl}/create-payment`,
      { 
        amount,
        currency: 'usd',
        metadata: {
          ...metadata,
          userId: localStorage.getItem('userId'), // If you have user tracking
        }
      }
    ).pipe(
      tap(response => {
        // Store payment intent ID for later use
        localStorage.setItem('lastPaymentIntentId', response.paymentIntentId);
      })
    );
  }

  // Process Payment with card element
  processPayment(
    paymentMethodId: string,
    clientSecret: string,
    metadata: any = {}
  ): Observable<PaymentIntent> {
    return from(this.stripeService.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId,
    })).pipe(
      map((result: PaymentIntentResult) => {
        if (result.error) {
          throw result.error;
        }
        if (result.paymentIntent) {
          this.trackPaymentSuccess(result.paymentIntent.id, metadata);
          return result.paymentIntent;
        }
        throw new Error('Payment failed');
      })
    );
  }

  // Track payment success
  private trackPaymentSuccess(paymentIntentId: string, metadata: any): void {
    // Store successful payment data
    const paymentData = {
      paymentIntentId,
      timestamp: new Date().toISOString(),
      metadata
    };
    
    // Store in localStorage for persistence
    const payments = JSON.parse(localStorage.getItem('successful_payments') || '[]');
    payments.push(paymentData);
    localStorage.setItem('successful_payments', JSON.stringify(payments));
  }

  // Get payment status
  getPaymentStatus(paymentIntentId: string): Observable<PaymentStatus> {
    return this.http.get<PaymentStatus>(
      `${this.apiUrl}/payment-status?paymentIntentId=${paymentIntentId}`
    ).pipe(
      tap(status => this.paymentStatus.next(status))
    );
  }

  // Get current payment status as observable
  getCurrentPaymentStatus(): Observable<PaymentStatus | null> {
    return this.paymentStatus.asObservable();
  }

  // Get payment history
  getPaymentHistory(): any[] {
    return JSON.parse(localStorage.getItem('successful_payments') || '[]');
  }

  // Clear payment history (useful for testing/development)
  clearPaymentHistory(): void {
    localStorage.removeItem('successful_payments');
    localStorage.removeItem('lastPaymentIntentId');
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
