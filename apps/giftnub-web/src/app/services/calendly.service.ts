import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GiftNubStripeService } from './stripe.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendlyService {
  private calendlyConfig = environment.calendly;
  private paymentStatus = new BehaviorSubject<'pending' | 'completed' | 'failed'>('pending');

  constructor(
    private http: HttpClient,
    private stripeService: GiftNubStripeService
  ) {}

  // Initialize Calendly Widget
  initializeCalendlyWidget(elementId: string, eventType: 'personal' | 'corporate'): void {
    // Add Calendly script if not already added
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        this.loadCalendlyWidget(elementId, this.getEventUrl(eventType));
      };
    } else {
      this.loadCalendlyWidget(elementId, this.getEventUrl(eventType));
    }
  }

  // Load Calendly Widget
  private loadCalendlyWidget(elementId: string, url: string): void {
    // @ts-expect-error: Calendly is loaded from external script
    if (window.Calendly) {
      // @ts-expect-error: Calendly is loaded from external script
      window.Calendly.initInlineWidget({
        url,
        parentElement: document.getElementById(elementId),
        prefill: {},
        utm: {},
        styles: {
          height: '700px'
        }
      });
    }
  }

  // Get the full event URL based on type
  private getEventUrl(eventType: 'personal' | 'corporate'): string {
    const type = eventType === 'corporate' 
      ? this.calendlyConfig.corporateEventType 
      : this.calendlyConfig.personalEventType;
    return `${this.calendlyConfig.url}/${type}`;
  }

  // Handle successful booking with payment
  private async handleEventScheduled(event: any): Promise<void> {
    try {
      // Create a payment intent for the consultation fee
      const amount = this.getConsultationFee(event.data.type as 'personal' | 'corporate'); // You'll need to implement this based on your pricing
      const paymentIntent = await this.stripeService.createPaymentIntent(amount).toPromise();

      if (paymentIntent?.clientSecret) {
        // Store the event details temporarily
        sessionStorage.setItem('pendingBooking', JSON.stringify(event.data));
        
        // Redirect to payment page or open payment modal
        this.paymentStatus.next('pending');
        // You'll need to implement the payment UI/flow here
      }
    } catch (error) {
      console.error('Payment setup failed:', error);
      this.paymentStatus.next('failed');
    }
  }

  // Get consultation fee based on type
  getConsultationFee(type: 'personal' | 'corporate'): number {
    const fees = {
      personal: 5000, // $50.00
      corporate: 15000, // $150.00
    };
    return fees[type];
  }

  // Get Available Time Slots
  getAvailableTimeSlots(
    startTime: string,
    endTime: string
  ): Observable<any> {
    return this.http.get(
      `${this.calendlyConfig.url}/scheduling_availability`,
      {
        headers: {
          'X-TOKEN': this.calendlyConfig.apiKey,
        },
        params: {
          start_time: startTime,
          end_time: endTime,
        },
      }
    );
  }

  // Schedule Event after payment
  confirmBooking(eventDetails: any, paymentMethodId: string): Observable<any> {
    return this.http.post(
      `${this.calendlyConfig.url}/scheduled_events`,
      {
        ...eventDetails,
        payment_method_id: paymentMethodId
      },
      {
        headers: {
          'X-TOKEN': this.calendlyConfig.apiKey,
        },
      }
    );
  }

  // Get payment status
  getPaymentStatus(): Observable<'pending' | 'completed' | 'failed'> {
    return this.paymentStatus.asObservable();
  }

  // Update payment status
  updatePaymentStatus(status: 'pending' | 'completed' | 'failed'): void {
    this.paymentStatus.next(status);
  }

  // Get Event Types
  getEventTypes(): Observable<any> {
    return this.http.get(
      `${this.calendlyConfig.url}/event_types`,
      {
        headers: {
          'X-TOKEN': this.calendlyConfig.apiKey,
        },
      }
    );
  }

  // Cancel Event
  cancelEvent(eventId: string): Observable<any> {
    return this.http.post(
      `${this.calendlyConfig.url}/scheduled_events/${eventId}/cancellation`,
      {},
      {
        headers: {
          'X-TOKEN': this.calendlyConfig.apiKey,
        },
      }
    );
  }
}
