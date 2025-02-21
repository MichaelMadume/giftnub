import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CalendlyService } from '../services/calendly.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GiftNubStripeService } from '../services/stripe.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StripeElementsOptions, StripeCardElementOptions } from '@stripe/stripe-js';
import { NgxStripeModule, StripeCardComponent } from 'ngx-stripe';

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

@Component({
  selector: 'giftnub-consultation-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxStripeModule, StripeCardComponent],
  template: `
    <section class="relative bg-white py-20">
      <!-- Background decorations -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute w-96 h-96 bg-primary-100 rounded-full blur-3xl -top-48 -left-48 opacity-30"></div>
        <div class="absolute w-96 h-96 bg-secondary-100 rounded-full blur-3xl -bottom-48 -right-48 opacity-30"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Consultation</h2>
          <p class="text-lg text-gray-600">Schedule a personalized session with our gift experts</p>
        </div>

        <div class="max-w-3xl mx-auto">
          <!-- Step 1: Consultation Type -->
          <div *ngIf="currentStep === 1" class="space-y-8">
            <form [formGroup]="consultationForm" class="bg-white rounded-lg shadow-md p-6">
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
                  <option value="personal">Personal Gifting ($50)</option>
                  <option value="corporate">Corporate Gifting ($150)</option>
                  <option value="event">Event Gifting ($100)</option>
                </select>
                <p *ngIf="consultationForm.get('type')?.touched && consultationForm.get('type')?.invalid" 
                   class="mt-1 text-sm text-red-600">
                  Please select a consultation type
                </p>
              </div>
              <button 
                (click)="nextStep()"
                [disabled]="!consultationForm.valid"
                class="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </form>
          </div>

          <!-- Step 2: Payment -->
          <div *ngIf="currentStep === 2" class="space-y-8">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold mb-4">Payment Details</h3>
              <div class="mb-6">
                <p class="text-gray-600 mb-4">Amount to pay: {{ getConsultationFee() }}</p>
                <ngx-stripe-card
                  [options]="cardOptions"
                  (change)="onChange($event)"
                ></ngx-stripe-card>
              </div>
              <div class="flex space-x-4">
                <button 
                  (click)="currentStep = 1"
                  class="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  (click)="processPayment()"
                  [disabled]="!complete || loading"
                  class="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
                >
                  <span *ngIf="!loading">Pay & Continue</span>
                  <span *ngIf="loading">Processing...</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Step 3: Calendar -->
          <div *ngIf="currentStep === 3" class="space-y-8">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold mb-4">Select Appointment Time</h3>
              
              <!-- Date Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input 
                  type="date" 
                  [min]="minDate"
                  [formControl]="dateControl"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
              </div>

              <!-- Time Slots -->
              <div class="grid grid-cols-3 gap-4 mb-6">
                <button 
                  *ngFor="let slot of availableTimeSlots"
                  (click)="selectTimeSlot(slot)"
                  [class.bg-primary-600]="selectedSlot === slot"
                  [class.text-white]="selectedSlot === slot"
                  [disabled]="!slot.available"
                  class="p-2 text-sm border rounded-md hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ formatTime(slot.startTime) }}
                </button>
              </div>

              <div class="flex space-x-4">
                <button 
                  (click)="currentStep = 2"
                  class="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  (click)="scheduleAppointment()"
                  [disabled]="!selectedSlot || loading"
                  class="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
                >
                  <span *ngIf="!loading">Schedule Appointment</span>
                  <span *ngIf="loading">Scheduling...</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div *ngIf="currentStep === 4" class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 class="text-xl font-semibold text-green-900 mb-2">Appointment Scheduled!</h3>
            <p class="text-green-700">Your consultation has been successfully scheduled. You'll receive a confirmation email shortly.</p>
          </div>

          <!-- Error Message -->
          <div *ngIf="error" class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ConsultationBookingComponent implements OnInit, OnDestroy {
  currentStep = 1;
  consultationForm: FormGroup;
  dateControl = this.fb.control('');
  loading = false;
  error: string | null = null;
  minDate = new Date().toISOString().split('T')[0];
  availableTimeSlots: TimeSlot[] = [];
  selectedSlot: TimeSlot | null = null;
  complete = false;
  private destroy$ = new Subject<void>();

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(
    private calendlyService: CalendlyService,
    private stripeService: GiftNubStripeService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.consultationForm = this.fb.group({
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params['type']) {
        this.consultationForm.patchValue({ type: params['type'] });
      }
    });

    this.dateControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(date => {
      if (date) {
        this.fetchAvailableTimeSlots(date);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.consultationForm.valid) {
      this.currentStep = 2;
    }
  }

  onChange(event: any): void {
    this.complete = event.complete;
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

  async processPayment(): Promise<void> {
    if (!this.complete) return;

    this.loading = true;
    this.error = null;

    try {
      const { paymentMethod } = await this.stripeService.createPaymentMethod(
        this.cardOptions
      ).toPromise();

      if (paymentMethod) {
        // Store payment method for later use
        sessionStorage.setItem('paymentMethodId', paymentMethod.id);
        this.currentStep = 3;
      }
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  private fetchAvailableTimeSlots(date: string): void {
    const startTime = new Date(date);
    const endTime = new Date(date);
    endTime.setDate(endTime.getDate() + 1);

    this.loading = true;
    this.error = null;

    this.calendlyService.getAvailability(
      startTime.toISOString(),
      endTime.toISOString()
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.availableTimeSlots = this.processAvailabilityResponse(response);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to fetch available time slots';
        this.loading = false;
      }
    });
  }

  private processAvailabilityResponse(response: any): TimeSlot[] {
    // Process the response from Calendly API to create time slots
    // This will depend on the exact format of the Calendly API response
    return [];
  }

  selectTimeSlot(slot: TimeSlot): void {
    this.selectedSlot = slot;
  }

  formatTime(isoString: string): string {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  async scheduleAppointment(): Promise<void> {
    if (!this.selectedSlot) return;

    this.loading = true;
    this.error = null;

    const paymentMethodId = sessionStorage.getItem('paymentMethodId');
    if (!paymentMethodId) {
      this.error = 'Payment information not found';
      this.loading = false;
      return;
    }

    const eventDetails = {
      ...this.consultationForm.value,
      startTime: this.selectedSlot.startTime,
      endTime: this.selectedSlot.endTime,
      paymentMethodId
    };

    const amount = this.getAmountFromType(this.consultationForm.get('type')?.value);

    this.calendlyService.scheduleWithPayment(eventDetails, amount).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.currentStep = 4;
        this.loading = false;
        // Clear stored payment method
        sessionStorage.removeItem('paymentMethodId');
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  private getAmountFromType(type: string): number {
    switch (type) {
      case 'corporate':
        return 15000; // $150.00
      case 'event':
        return 10000; // $100.00
      case 'personal':
      default:
        return 5000; // $50.00
    }
  }
}
