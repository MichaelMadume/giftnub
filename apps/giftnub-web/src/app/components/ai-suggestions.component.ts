import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiftSuggestion } from '../interfaces/gift.interface';
import { GiftSuggestionsService, GiftSuggestionRequest } from '../services/gift-suggestions.service';
import { finalize } from 'rxjs/operators';
import { GiftSuggestionResponse } from '@giftnub/gift-data';

@Component({
  selector: 'giftnub-ai-suggestions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-suggestions.component.html',
  styleUrls: ['./ai-suggestions.component.scss']
})
export class AiSuggestionsComponent {
  @Output() suggestionsGenerated = new EventEmitter<GiftSuggestionResponse>();

  giftPrompt = '';
  recipientType = '';
  occasion = '';
  budget = '';
  isLoading = false;
  suggestions: GiftSuggestion[] = [];
  errorMessage = '';
  marketingTheme = '';
  marketingMessageSummary = '';

  constructor(private giftSuggestionsService: GiftSuggestionsService) {}

  onSubmit(): void {
    if (!this.giftPrompt || !this.recipientType || !this.occasion || !this.budget) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const request: GiftSuggestionRequest = {
      giftPrompt: this.giftPrompt,
      recipientType: this.recipientType,
      occasion: this.occasion,
      budget: `${this.budget} USD`
    };
    
    this.giftSuggestionsService.getSuggestions(request)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response: GiftSuggestionResponse) => {
          this.suggestions = response.suggestions;
          this.marketingTheme = response.marketingTheme;
          this.marketingMessageSummary = response.marketingMessageSummary;
          
          this.suggestionsGenerated.emit(response);
          
          setTimeout(() => {
            const giftGalleryElement = document.getElementById('giftGallery');
            if (giftGalleryElement) {
              giftGalleryElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 500);
        },
        error: (err) => {
          console.error('Error fetching suggestions:', err);
          this.errorMessage = 'Unable to get gift suggestions at this time. Please try again later.';
          this.loadFallbackSuggestions();
        }
      });
  }

  private loadFallbackSuggestions(): void {
    const fallbackResponse: GiftSuggestionResponse = {
      marketingTheme: "Premium Gifting Solutions",
      marketingMessageSummary: "We've curated these special gifts just for you",
      suggestions: [
        {
          id: "fallback-1",
          title: "Luxury Wellness Package",
          description: "A premium selection of wellness products to help them relax and rejuvenate.",
          giftId: "1"
        },
        {
          id: "fallback-2",
          title: "Gourmet Experience Box",
          description: "An exquisite selection of fine foods and treats for a memorable culinary experience.",
          giftId: "7"
        }
      ]
    };
    
    this.suggestions = fallbackResponse.suggestions;
    this.marketingTheme = fallbackResponse.marketingTheme;
    this.marketingMessageSummary = fallbackResponse.marketingMessageSummary;
    
    this.suggestionsGenerated.emit(fallbackResponse);
    
    setTimeout(() => {
      const giftGalleryElement = document.getElementById('giftGallery');
      if (giftGalleryElement) {
        giftGalleryElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }

  bookConsultation(suggestion: GiftSuggestion): void {
    const giftGalleryElement = document.getElementById('giftGallery');
    if (giftGalleryElement) {
      giftGalleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
