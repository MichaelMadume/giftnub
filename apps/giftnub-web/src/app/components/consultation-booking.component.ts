import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CalendlyService } from '../services/calendly.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'giftnub-consultation-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <section id="consultationBooking" class="relative bg-white py-20">
      <!-- Background decorations -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute w-96 h-96 bg-primary-100 rounded-full blur-3xl -top-48 -left-48 opacity-30"></div>
        <div class="absolute w-96 h-96 bg-secondary-100 rounded-full blur-3xl -bottom-48 -right-48 opacity-30"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate__animated animate__fadeIn">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Consultation</h2>
          <p class="text-lg text-gray-600">Schedule a personalized session with our gift experts</p>
        </div>

        <div class="max-w-3xl mx-auto">
          <!-- Consultation Type Selection -->
          <form [formGroup]="consultationForm" class="mb-8 bg-white rounded-lg shadow-md p-6">
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Consultation Type *
              </label>
              <select 
                formControlName="type"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                [class.border-red-500]="consultationForm.get('type')?.touched && consultationForm.get('type')?.invalid"
              >
                <option value="">Select a consultation type</option>
                <option value="personal">Personal Gifting</option>
                <option value="corporate">Corporate Gifting</option>
                <option value="event">Event Gifting</option>
              </select>
              <p *ngIf="consultationForm.get('type')?.touched && consultationForm.get('type')?.invalid" 
                 class="mt-1 text-sm text-red-600">
                Please select a consultation type
              </p>
            </div>

            <div class="mb-4">
              <p class="text-sm text-gray-500">
                Consultation fee: 
                <span class="font-semibold">
                  {{ getConsultationFee() }}
                </span>
              </p>
            </div>
          </form>

          <!-- Loading State -->
          <div *ngIf="isLoading" class="text-center py-12">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Loading calendar...</p>
          </div>

          <!-- Error State -->
          <div *ngIf="error" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div class="flex items-center mb-4">
              <svg class="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-red-800 font-semibold">Unable to load calendar</h3>
            </div>
            <p class="text-red-600 mb-4">{{ error }}</p>
            <button 
              (click)="retryLoading()"
              class="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>

          <!-- Calendly inline widget -->
          <div 
            *ngIf="consultationForm.get('type')?.valid"
            id="calendly-embed" 
            class="rounded-xl shadow-2xl overflow-hidden animate__animated animate__fadeInUp"
            [ngClass]="{'opacity-50': isLoading}"
          ></div>
        </div>
      </div>
    </section>
  `,
})
export class ConsultationBookingComponent implements OnInit {
  isLoading = true;
  error: string | null = null;
  consultationForm: FormGroup;

  constructor(
    private calendlyService: CalendlyService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.consultationForm = this.fb.group({
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get consultation type from route params
    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.consultationForm.patchValue({ type: params['type'] });
      }
    });

    // Watch for form changes
    this.consultationForm.get('type')?.valueChanges.subscribe(value => {
      if (value) {
        this.initializeCalendly();
      }
    });
  }

  getConsultationFee(): string {
    const type = this.consultationForm.get('type')?.value;
    switch (type) {
      case 'corporate':
        return '$150.00';
      case 'event':
        return '$100.00';
      case 'personal':
        return '$50.00';
      default:
        return '--';
    }
  }

  private initializeCalendly(): void {
    this.isLoading = true;
    this.error = null;
    
    try {
      const elementId = 'calendly-embed';
      const type = this.consultationForm.get('type')?.value;
      this.calendlyService.initializeCalendlyWidget(elementId, type);
      
      // Set loading to false after a short delay to ensure widget is loaded
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'An unexpected error occurred';
      this.isLoading = false;
    }
  }

  retryLoading(): void {
    this.initializeCalendly();
  }
}
