import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface AvailabilityResponse {
  availableSlots: Array<{
    start_time: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class CalendlyService {
  private readonly apiUrl = environment.api.calendly;
  private lastAvailabilityResponse: AvailabilityResponse | null = null;

  constructor(private http: HttpClient) {}

  // Get user's available time slots
  getAvailability(): Observable<AvailabilityResponse> {
    return this.http
      .get<AvailabilityResponse>(`${this.apiUrl}/availability`)
      .pipe(
        map(response => {
          this.lastAvailabilityResponse = response;
          return response;
        }),
        catchError((error) =>
          throwError(() => new Error('Failed to fetch availability'))
        )
      );
  }

  // Get cached availability response
  getLastAvailabilityResponse(): AvailabilityResponse | null {
    return this.lastAvailabilityResponse;
  }
}
