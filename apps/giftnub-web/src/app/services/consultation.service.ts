import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ConsultationBooking {
  id: string;
  type: 'personal' | 'corporate' | 'event';
  email: string;
  name: string;
  notes?: string;
  startTime: string;
  status: 'pending' | 'payment_processing' | 'confirmed' | 'failed';
  paymentIntentId?: string;
  createdAt: string;
}

export interface BookingResponse {
  booking: ConsultationBooking;
  paymentIntent: {
    clientSecret: string;
    id: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private bookingStatus = new BehaviorSubject<ConsultationBooking | null>(null);

  constructor(private http: HttpClient) {}

  // Create new consultation booking
  createBooking(bookingData: Omit<ConsultationBooking, 'id' | 'status' | 'paymentIntentId' | 'createdAt'>): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(
      `${environment.api.consultations}`,
      bookingData
    ).pipe(
      tap(response => {
        this.bookingStatus.next(response.booking);
      })
    );
  }

  // Get booking status
  getBookingStatus(bookingId: string): Observable<ConsultationBooking> {
    return this.http.get<ConsultationBooking>(
      `${environment.api.consultations}/${bookingId}`
    ).pipe(
      tap(booking => this.bookingStatus.next(booking))
    );
  }

  // Get current booking status as observable
  getCurrentBookingStatus(): Observable<ConsultationBooking | null> {
    return this.bookingStatus.asObservable();
  }
} 