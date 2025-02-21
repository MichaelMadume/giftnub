import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { GiftNubStripeService } from './stripe.service';
import { environment } from '../../environments/environment';

interface CalendlyEvent {
  uri: string;
  name: string;
  start_time: string;
  end_time: string;
}

interface SchedulingResponse {
  resource: {
    uri: string;
    status: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CalendlyService {
  private readonly apiUrl = environment.api.calendly;
  private paymentStatus = new BehaviorSubject<'pending' | 'completed' | 'failed'>('pending');
  private pendingBooking: any = null;

  constructor(
    private http: HttpClient,
    private stripeService: GiftNubStripeService
  ) {}

  // Get user's available time slots
  getAvailability(startTime: string, endTime: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/availability`, {
      params: {
        start_time: startTime,
        end_time: endTime
      }
    }).pipe(
      catchError(error => throwError(() => new Error('Failed to fetch availability')))
    );
  }

  // Get event types (meeting types)
  getEventTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/event-types`).pipe(
      catchError(error => throwError(() => new Error('Failed to fetch event types')))
    );
  }

  // Process payment and schedule meeting
  scheduleWithPayment(eventDetails: any, amount: number): Observable<any> {
    // First create payment intent
    return this.stripeService.createPaymentIntent(amount).pipe(
      switchMap(({ clientSecret, paymentIntentId }) => {
        // Store event details for after payment
        this.pendingBooking = { ...eventDetails, paymentIntentId };
        return this.stripeService.processPayment(eventDetails.paymentMethodId, clientSecret);
      }),
      switchMap(paymentIntent => {
        if (paymentIntent.status === 'succeeded') {
          // Now schedule the meeting
          return this.scheduleEvent(this.pendingBooking);
        } else {
          return throwError(() => new Error('Payment failed'));
        }
      }),
      catchError(error => {
        this.paymentStatus.next('failed');
        return throwError(() => error);
      })
    );
  }

  // Schedule event after successful payment
  private scheduleEvent(eventDetails: any): Observable<SchedulingResponse> {
    return this.http.post<SchedulingResponse>(`${this.apiUrl}/schedule`, {
      event_type_uri: eventDetails.eventTypeUri,
      start_time: eventDetails.startTime,
      end_time: eventDetails.endTime,
      invitee: {
        email: eventDetails.email,
        name: eventDetails.name,
        payment_intent_id: eventDetails.paymentIntentId
      }
    }).pipe(
      map(response => {
        this.paymentStatus.next('completed');
        return response;
      }),
      catchError(error => {
        this.paymentStatus.next('failed');
        return throwError(() => new Error('Failed to schedule meeting'));
      })
    );
  }

  // Get payment status
  getPaymentStatus(): Observable<'pending' | 'completed' | 'failed'> {
    return this.paymentStatus.asObservable();
  }

  // Cancel scheduled event
  cancelEvent(eventUri: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/scheduled-events/${eventUri}`).pipe(
      catchError(error => throwError(() => new Error('Failed to cancel meeting')))
    );
  }

  // Get scheduled events
  getScheduledEvents(): Observable<CalendlyEvent[]> {
    return this.http.get<{ collection: CalendlyEvent[] }>(`${this.apiUrl}/scheduled-events`).pipe(
      map(response => response.collection),
      catchError(error => throwError(() => new Error('Failed to fetch scheduled events')))
    );
  }
}
