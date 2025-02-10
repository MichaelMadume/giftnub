import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiftSuggestion } from '../interfaces/gift.interface';

@Component({
  selector: 'giftnub-ai-suggestions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-suggestions.component.html',
  styleUrls: ['./ai-suggestions.component.scss']
})
export class AiSuggestionsComponent {
  giftPrompt = '';
  recipientType = '';
  occasion = '';
  budget = '';
  isLoading = false;
  suggestions: GiftSuggestion[] = [];

  onSubmit(): void {
    if (!this.giftPrompt || !this.recipientType || !this.occasion || !this.budget) return;
    
    this.isLoading = true;
    // Simulate API call with curated suggestions
    setTimeout(() => {
      this.suggestions = [
        {
          id: '1',
          title: 'Curated Luxury Gift Experience',
          description: 'A thoughtfully curated collection of premium items tailored to your recipient\'s interests, including artisanal treats, personalized keepsakes, and exclusive experiences.',
          price: 299.99,
          category: 'Premium Collection',
          confidence: 98,
          imageUrl: 'path/to/image'
        },
        {
          id: '2',
          title: 'Bespoke Event Gift Package',
          description: 'A specially designed gift package perfect for your event, featuring customized items that reflect your theme and create lasting memories for your guests.',
          price: 149.99,
          category: 'Event Gifting',
          confidence: 95,
          imageUrl: 'path/to/image'
        },
        {
          id: '3',
          title: 'Personalized Celebration Box',
          description: 'A beautifully crafted celebration box filled with hand-picked items that tell a story and create a memorable unboxing experience.',
          price: 199.99,
          category: 'Personalized Gifts',
          confidence: 92,
          imageUrl: 'path/to/image'
        }
      ];
      this.isLoading = false;
    }, 2000);
  }

  bookConsultation(suggestion: GiftSuggestion): void {
    // Navigate to consultation booking with suggestion context
    window.location.href = `https://buy.stripe.com/bIY3d32GY2yQfIs7ss?suggestion=${suggestion.id}`;
  }
}
