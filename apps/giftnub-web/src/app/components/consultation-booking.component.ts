import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { GiftNubStripeService } from '../services/stripe.service';
import { CalendlyService } from '../services/calendly.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  StripeElementsOptions,
  StripeCardElementOptions,
} from '@stripe/stripe-js';
import { NgxStripeModule, StripeCardComponent } from 'ngx-stripe';

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

@Component({
  selector: 'giftnub-consultation-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxStripeModule,
    StripeCardComponent,
  ],
  template: `
    <section
      id="consultationBooking"
      class="relative flex items-center min-h-screen overflow-hidden bg-black"
    >
      <!-- Background Effects -->
      <div class="absolute inset-0">
        <!-- Dark gradient overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-primary-950 via-black to-black opacity-80"
        ></div>

        <!-- Gradient orbs -->
        <div
          class="absolute w-[500px] h-[500px] -top-32 -left-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute w-[500px] h-[500px] -bottom-32 -right-32 bg-secondary-500/20 rounded-full blur-3xl animate-pulse delay-1000"
        ></div>

        <!-- Animated grid -->
        <div
          class="absolute inset-0 opacity-[0.02]"
          style="background-image: linear-gradient(to right, white 1px, transparent 1px),
                                    linear-gradient(to bottom, white 1px, transparent 1px);
                    background-size: 50px 50px;"
        ></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-secondary-200"
            >
              Book Your Consultation
            </span>
          </h2>
          <p class="text-white/70 max-w-2xl mx-auto">
            Schedule a personalized session with our gift experts for a tailored
            gifting experience
          </p>
        </div>

        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Consultation Form -->
            <div class="h-full">
              <div class="relative h-full">
                <div
                  class="absolute -inset-1 bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-xl blur-sm opacity-75"
                ></div>
                <div
                  class="relative h-full p-8 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10"
                >
                  <h3 class="text-xl font-semibold text-white mb-6">
                    Consultation Details
                  </h3>
                  <form [formGroup]="consultationForm" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-white/90 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        formControlName="name"
                        class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-white/90 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        formControlName="email"
                        class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-white/90 mb-2">
                        Consultation Type *
                      </label>
                      <select
                        formControlName="type"
                        class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="" class="bg-neutral-900">
                          Select type
                        </option>
                        <option value="personal" class="bg-neutral-900">
                          Personal Gifting ($50)
                        </option>
                        <option value="corporate" class="bg-neutral-900">
                          Corporate Gifting ($150)
                        </option>
                        <option value="event" class="bg-neutral-900">
                          Event Gifting ($100)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-white/90 mb-2">
                        Special Requirements
                      </label>
                      <textarea
                        rows="3"
                        formControlName="notes"
                        class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-primary-500 focus:border-primary-500"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Calendar Section -->
            <div class="h-full">
              <div class="relative h-full">
                <div
                  class="absolute -inset-1 bg-gradient-to-r from-primary-500/50 to-secondary-500/50 rounded-xl blur-sm opacity-75"
                ></div>
                <div
                  class="relative h-full p-8 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10"
                >
                  <h3 class="text-xl font-semibold text-white mb-6">
                    Select Date & Time
                  </h3>
                  
                  <!-- Calendar Grid -->
                  <div class="mb-8">
                    <div class="flex items-center justify-between mb-6">
                      <button
                        (click)="previousMonth()"
                        class="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <svg
                          class="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <h4 class="text-lg font-medium text-white">
                        {{ currentMonthYear }}
                      </h4>
                      <button
                        (click)="nextMonth()"
                        class="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <svg
                          class="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>

                    <!-- Day headers -->
                    <div class="grid grid-cols-7 mb-2">
                      <div
                        *ngFor="let day of weekDays"
                        class="text-center text-sm font-medium text-white/50 py-2"
                      >
                        {{ day }}
                      </div>
                    </div>

                    <!-- Calendar days -->
                    <div class="grid grid-cols-7 gap-1">
                      <div
                        *ngFor="let day of calendarDays"
                        [class]="getDayClasses(day)"
                        (click)="selectDate(day)"
                      >
                        {{ day?.getDate() }}
                      </div>
                    </div>
                  </div>

                  <!-- Time Slots -->
                  <div *ngIf="selectedDate" class="space-y-4">
                    <h4 class="text-lg font-medium text-white mb-4">
                      Available Time Slots
                    </h4>
                    <div class="grid grid-cols-3 gap-2">
                      <button
                        *ngFor="let slot of availableTimeSlots"
                        [class]="getTimeSlotClasses(slot)"
                        (click)="selectTimeSlot(slot)"
                      >
                        {{ formatTime(slot.startTime) }}
                      </button>
                    </div>
                  </div>

                  <!-- Error Message -->
                  <div *ngIf="error" class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p class="text-red-400">{{ error }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Book Button -->
          <div class="mt-8 flex justify-center">
            <button
              (click)="processPayment()"
              [disabled]="!complete || !selectedSlot || !consultationForm.valid || loading"
              class="relative group overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 p-[1px] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div class="relative bg-black/60 backdrop-blur-xl rounded-lg px-8 py-3 transition-all duration-300 group-hover:bg-black/40">
                <span *ngIf="!loading" class="text-white font-medium">
                  Complete Booking
                </span>
                <span *ngIf="loading" class="text-white font-medium">
                  Processing...
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ConsultationBookingComponent implements OnInit, OnDestroy {
  currentStep = 1; // 1: Details, 2: Calendar, 3: Payment, 4: Success
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
        color: '#ffffff',
        fontWeight: '400',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: 'rgba(255, 255, 255, 0.5)',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#ff5b5b',
        iconColor: '#ff5b5b',
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: (Date | null)[] = [];
  currentDate = new Date();
  selectedDate: Date | null = null;
  currentMonthYear = '';

  constructor(
    private calendlyService: CalendlyService,
    private stripeService: GiftNubStripeService,
    private fb: FormBuilder
  ) {
    this.consultationForm = this.fb.group({
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Read query parameters directly from URL
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const suggestionId = urlParams.get('suggestion');

    if (type) {
      this.consultationForm.patchValue({ type });
    }

    if (suggestionId) {
      // Handle suggestion context if needed
      console.log('Suggestion ID:', suggestionId);
    }

    this.dateControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((date) => {
        if (date) {
          this.fetchAvailableTimeSlots(date);
        }
      });

    this.generateCalendar();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.consultationForm.valid) {
      this.currentStep = 2;
      // Pre-fetch next available dates when moving to calendar
      const today = new Date().toISOString().split('T')[0];
      this.fetchAvailableTimeSlots(today);
    } else if (this.currentStep === 2 && this.selectedSlot) {
      this.currentStep = 3;
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
    if (!this.complete || !this.selectedSlot) return;

    this.loading = true;
    this.error = null;

    try {
      const { paymentMethod } = await this.stripeService
        .createPaymentMethod(this.cardOptions)
        .toPromise();

      if (paymentMethod) {
        const amount = this.getAmountFromType(
          this.consultationForm.get('type')?.value
        );
        const eventDetails = {
          ...this.consultationForm.value,
          startTime: this.selectedSlot.startTime,
          endTime: this.selectedSlot.endTime,
          paymentMethodId: paymentMethod.id,
          amount,
        };

        // Schedule appointment and process payment in one go
        await this.calendlyService
          .scheduleWithPayment(eventDetails, amount)
          .pipe(takeUntil(this.destroy$))
          .toPromise();

        this.currentStep = 4;
      }
    } catch (error: any) {
      this.error =
        error.message || 'Payment processing failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private fetchAvailableTimeSlots(date: string): void {
    const startTime = new Date(date);
    startTime.setHours(0, 0, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(23, 59, 59, 999);

    this.loading = true;
    this.error = null;
    this.selectedSlot = null; // Reset selection when date changes

    this.calendlyService
      .getAvailability(startTime.toISOString(), endTime.toISOString())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.availableTimeSlots = this.processAvailabilityResponse(response);
          this.loading = false;
        },
        error: (error) => {
          this.error =
            'Failed to fetch available time slots. Please try again.';
          this.loading = false;
        },
      });
  }

  private processAvailabilityResponse(response: any): TimeSlot[] {
    if (!this.selectedDate) return [];
    
    // Generate time slots from 9 AM to 5 PM
    const slots: TimeSlot[] = [];
    const date = this.selectedDate.toISOString().split('T')[0];
    
    // Business hours: 9 AM to 5 PM
    const hours = [9, 10, 11, 12, 13, 14, 15, 16];
    
    for (const hour of hours) {
      const startTime = `${date}T${hour.toString().padStart(2, '0')}:00:00`;
      const endTime = `${date}T${(hour + 1).toString().padStart(2, '0')}:00:00`;
      
      // Check if the slot exists in the response and is available
      const isAvailable = !response?.bookedSlots?.some(
        (bookedSlot: any) => bookedSlot.startTime === startTime
      );
      
      slots.push({
        startTime,
        endTime,
        available: isAvailable
      });
    }
    
    return slots;
  }

  selectTimeSlot(slot: TimeSlot): void {
    this.selectedSlot = slot;
  }

  formatTime(isoString: string): string {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
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
      paymentMethodId,
    };

    const amount = this.getAmountFromType(
      this.consultationForm.get('type')?.value
    );

    this.calendlyService
      .scheduleWithPayment(eventDetails, amount)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.currentStep = 4;
          this.loading = false;
          // Clear stored payment method
          sessionStorage.removeItem('paymentMethodId');
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        },
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

  generateCalendar(): void {
    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    this.calendarDays = [];

    // Add empty days for padding
    for (let i = 0; i < firstDay.getDay(); i++) {
      this.calendarDays.push(null);
    }

    // Add actual days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      this.calendarDays.push(
        new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          day
        )
      );
    }

    this.currentMonthYear = this.currentDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
    this.selectedDate = null;
    this.selectedSlot = null;
    this.availableTimeSlots = [];
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
    this.selectedDate = null;
    this.selectedSlot = null;
    this.availableTimeSlots = [];
  }

  getDayClasses(day: Date | null): string {
    if (!day) return 'p-2 text-center text-neutral-600';
    
    const isToday = this.isToday(day);
    const isSelected = this.isSelectedDate(day);
    const isDisabled = this.isDisabledDate(day);
    
    return `p-2 text-center rounded-lg cursor-pointer transition-colors ${
      isDisabled ? 'text-neutral-600 cursor-not-allowed' :
      isSelected ? 'bg-primary-600 text-white' :
      isToday ? 'bg-neutral-600 text-white' : 'text-white hover:bg-primary-600/20'
    }`;
  }

  getTimeSlotClasses(slot: TimeSlot): string {
    const isSelected = this.selectedSlot === slot;
    return `p-3 text-center rounded-lg transition-colors ${
      !slot.available ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed' :
      isSelected ? 'bg-primary-600 text-white' : 'bg-neutral-800 text-white hover:bg-primary-600/20'
    }`;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  isSelectedDate(date: Date): boolean {
    return (
      this.selectedDate?.getDate() === date.getDate() &&
      this.selectedDate?.getMonth() === date.getMonth() &&
      this.selectedDate?.getFullYear() === date.getFullYear()
    );
  }

  isDisabledDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  selectDate(date: Date | null): void {
    if (!date || this.isDisabledDate(date)) return;
    this.selectedDate = date;
    this.fetchAvailableTimeSlots(date.toISOString().split('T')[0]);
  }
}
