import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GiftSuggestion } from '../interfaces/gift.interface';
import { GiftSuggestionResponse } from '@giftnub/gift-data';

export interface GiftSuggestionRequest {
  giftPrompt: string;
  recipientType: string;
  occasion: string;
  budget: string;
}

@Injectable({
  providedIn: 'root',
})
export class GiftSuggestionsService {
  private apiBaseUrl = environment.api.consultations.split('/consultations')[0];
  
  constructor(private http: HttpClient) {}

  /**
   * Get AI-powered gift suggestions based on user input
   * @param request The gift suggestion request parameters
   * @returns An observable with gift suggestions
   */
  getSuggestions(request: GiftSuggestionRequest): Observable<GiftSuggestionResponse> {
    return this.http.post<GiftSuggestionResponse>(
      `${this.apiBaseUrl}/gifts/suggestions`,
      request
    );
  }
} 