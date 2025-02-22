import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { GiftNubStripeService } from '../services/stripe.service';
import {
  ConsultationService,
  ConsultationBooking,
} from '../services/consultation.service';
import { CalendlyService } from '../services/calendly.service';
import { Subject, Subscription, interval, timer, throwError } from 'rxjs';
import { takeUntil, switchMap, take, catchError, mergeMap, takeWhile, finalize } from 'rxjs/operators';
import {
  StripeElementsOptions,
  StripeCardElementOptions,
} from '@stripe/stripe-js';
import { NgxStripeModule, StripeCardComponent } from 'ngx-stripe';
import {
  format,
  isToday,
  isSameDay,
  isBefore,
  startOfDay,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface TimeSlot {
  startTime: string;
  available: boolean;
}

interface AvailableSlot {
  start_time: string;
}

interface AvailabilityResponse {
  availableSlots: AvailableSlot[];
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
      <!-- Success Message -->
      <div
        *ngIf="showSuccess"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <div class="bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-xl max-w-md w-full mx-4">
          <div class="text-center">
            <div class="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
            <p class="text-white/70 mb-6">Your consultation has been successfully booked. Check your email for confirmation details.</p>
            <button
              (click)="closeSuccessMessage()"
              class="relative group overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 p-[1px] transition-all duration-300 hover:scale-[1.02]"
            >
              <div class="relative bg-black/60 backdrop-blur-xl rounded-lg px-6 py-2 transition-all duration-300 group-hover:bg-black/40">
                <span class="text-white font-medium">Close</span>
              </div>
            </button>
          </div>
        </div>
      </div>

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

      <div class="relative max-w-5xl !w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-secondary-200"
            >
              Book Your Consultation
            </span>
          </h2>
          <p class="text-white/70 max-w-2xl mx-auto text-lg">
            Schedule a personalized session with our gift experts for a tailored
            gifting experience
          </p>
        </div>

        <div class="w-full">
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
                  <h3 class="text-2xl font-semibold text-white mb-6">
                    Consultation Details
                  </h3>
                  <form [formGroup]="consultationForm" class="space-y-4">
                    <div>
                      <label
                        class="block text-base font-medium text-white/90 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        formControlName="name"
                        class="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label
                        class="block text-base font-medium text-white/90 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        formControlName="email"
                        class="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label
                        class="block text-base font-medium text-white/90 mb-2"
                      >
                        Consultation Type *
                      </label>
                      <select
                        formControlName="type"
                        class="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-primary-500 focus:border-primary-500"
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
                      <label
                        class="block text-base font-medium text-white/90 mb-2"
                      >
                        Special Requirements
                      </label>
                      <textarea
                        rows="3"
                        formControlName="notes"
                        class="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-primary-500 focus:border-primary-500"
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
                  <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-semibold text-white">
                      {{
                        selectedSlot
                          ? 'Payment Details'
                          : selectedDate
                          ? 'Select Time'
                          : 'Select Date'
                      }}
                    </h3>
                    <button
                      *ngIf="selectedDate && !selectedSlot"
                      (click)="clearDateSelection()"
                      class="text-white/70 hover:text-white transition-colors text-base"
                    >
                      Change Date
                    </button>
                    <button
                      *ngIf="selectedSlot"
                      (click)="clearTimeSelection()"
                      class="text-white/70 hover:text-white transition-colors text-base"
                    >
                      Change Time
                    </button>
                  </div>

                  <!-- Calendar View -->
                  <div
                    class="transition-all duration-300"
                    [class.opacity-0]="selectedDate"
                    [class.invisible]="selectedDate"
                    [class.absolute]="selectedDate"
                    [class.h-0]="selectedDate"
                  >
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

                  <!-- Time Slots View -->
                  <div
                    class="transition-all duration-300 time-slots-view"
                    [class.opacity-0]="!selectedDate || selectedSlot"
                    [class.invisible]="!selectedDate || selectedSlot"
                    [class.absolute]="!selectedDate || selectedSlot"
                    [class.h-0]="!selectedDate || selectedSlot"
                  >
                    <div class="relative">
                      <!-- Loading Overlay -->
                      <div
                        *ngIf="loading"
                        class="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10"
                      >
                        <div
                          class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"
                        ></div>
                      </div>

                      <div
                        class="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2"
                      >
                        <button
                          *ngFor="let slot of availableTimeSlots"
                          [class]="getTimeSlotClasses(slot)"
                          (click)="selectTimeSlot(slot)"
                        >
                          {{ formatTime(slot.startTime) }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Payment Section -->
                  <div
                    class="transition-all duration-300"
                    [class.opacity-0]="!selectedSlot"
                    [class.invisible]="!selectedSlot"
                    [class.absolute]="!selectedSlot"
                    [class.h-0]="!selectedSlot"
                  >
                    <div class="space-y-8">
                      <!-- Booking Summary -->
                      <div class="bg-white/5 rounded-lg p-5 space-y-3">
                        <div class="flex justify-between text-white/70 text-lg">
                          <span>Consultation Type</span>
                          <span>{{ consultationForm.get('type')?.value }}</span>
                        </div>
                        <div class="flex justify-between text-white/70 text-lg">
                          <span>Date & Time</span>
                          <span>{{
                            formatDateTime(selectedSlot?.startTime || '')
                          }}</span>
                        </div>
                        <div
                          class="flex justify-between text-white font-medium text-lg"
                        >
                          <span>Total</span>
                          <span>{{ getConsultationFee() }}</span>
                        </div>
                      </div>

                      <!-- Card Details Section -->
                      <div class="space-y-3 mt-6">
                        <label
                          class="block text-base font-medium text-white/90 pb-1"
                        >
                          Card Details
                        </label>
                        <ngx-stripe-card
                          [options]="cardOptions"
                          (change)="onChange($event)"
                        ></ngx-stripe-card>
                      </div>
                    </div>
                  </div>

                  <!-- Error Message -->
                  <div
                    *ngIf="error"
                    class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
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
              [disabled]="
                !complete || !selectedSlot || !consultationForm.valid || loading
              "
              class="relative group overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 p-[1px] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div
                class="relative bg-black/60 backdrop-blur-xl rounded-lg px-8 py-3 transition-all duration-300 group-hover:bg-black/40"
              >
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
  styles: [
    `
      :host ::ng-deep .stripe-element {
        padding: 1rem 1.25rem;
        border-radius: 0.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.2s;
        min-height: 3.5rem;
      }
      :host ::ng-deep .stripe-element:focus {
        border-color: rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.08);
      }
    `,
  ],
})
export class ConsultationBookingComponent implements OnInit, OnDestroy {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  
  showSuccess = false;
  currentStep = 1;
  consultationForm: FormGroup;
  loading = false;
  error: string | null = null;
  availableTimeSlots: TimeSlot[] = [];
  selectedSlot: TimeSlot | null = null;
  complete = false;
  private destroy$ = new Subject<void>();
  private currentBooking: ConsultationBooking | null = null;
  private pollingSubscription: Subscription | null = null;

  cardOptions: StripeCardElementOptions;
  elementsOptions: StripeElementsOptions;
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: (Date | null)[] = [];
  currentDate = new Date();
  selectedDate: Date | null = null;
  currentMonthYear = '';
  availableDates: Date[] = [];
  userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  private lastAvailabilityResponse: any = null;

  constructor(
    private calendlyService: CalendlyService,
    private consultationService: ConsultationService,
    private stripeService: GiftNubStripeService,
    private fb: FormBuilder
  ) {
    this.consultationForm = this.fb.group({
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      notes: [''],
    });

    this.cardOptions = this.stripeService.cardOptions;
    this.elementsOptions = this.stripeService.elementsOptions;
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
      console.log('Suggestion ID:', suggestionId);
    }

    // Initial fetch of availability
    this.fetchMonthAvailability();
    this.generateCalendar();

    // Subscribe to booking status updates
    this.consultationService
      .getCurrentBookingStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe((booking) => {
        if (booking) {
          this.currentBooking = booking;
          this.handleBookingStatusChange(booking);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleBookingStatusChange(booking: ConsultationBooking): void {
    switch (booking.status) {
      case 'confirmed':
        this.loading = false;
        this.showSuccess = true;
        this.resetForm();
        break;
      case 'failed':
        this.loading = false;
        this.error = 'Payment failed. Please try again.';
        break;
      case 'payment_processing':
        // Start polling for status updates
        this.startStatusPolling(booking.id);
        break;
    }
  }

  private startStatusPolling(bookingId: string): void {
    const maxRetries = 36; // 3 minutes max polling time (5s * 36)
    let retryCount = 0;
    let retryDelay = 5000; // Start with 5 second delay

    // Unsubscribe any existing polling
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }

    this.pollingSubscription = interval(5000) // Poll every 5 seconds
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          if (retryCount >= maxRetries) {
            throw new Error('Polling timeout exceeded');
          }
          retryCount++;
          return this.consultationService.getBookingStatus(bookingId).pipe(
            catchError(error => {
              retryDelay = Math.min(retryDelay * 1.5, 15000);
              return timer(retryDelay).pipe(
                mergeMap(() => throwError(() => error))
              );
            })
          );
        }),
        takeWhile(booking => booking.status === 'payment_processing', true),
        finalize(() => {
          retryCount = 0;
          retryDelay = 5000;
          this.pollingSubscription = null;
        })
      )
      .subscribe({
        error: (error) => {
          this.error = 'Failed to check payment status. Please contact support.';
          this.loading = false;
        }
      });
  }

  async processPayment(): Promise<void> {
    if (!this.complete || !this.selectedSlot || !this.consultationForm.valid)
      return;

    this.loading = true;
    this.error = null;

    try {
      // Create booking and get payment intent
      const bookingResponse = await this.consultationService
        .createBooking({
          ...this.consultationForm.value,
          startTime: this.selectedSlot.startTime,
        })
        .toPromise();

      if (!bookingResponse) {
        throw new Error('Failed to create booking');
      }

      // Create payment method
      const { paymentMethod } = await this.stripeService
        .createPaymentMethod(this.card.element)
        .toPromise();

      if (paymentMethod) {
        // Process payment
        await this.stripeService
          .processPayment(
            paymentMethod.id,
            bookingResponse.paymentIntent.clientSecret
          )
          .toPromise();
      }
    } catch (error: any) {
      this.error =
        error.message || 'Payment processing failed. Please try again.';
      this.loading = false;
    }
  }

  private fetchMonthAvailability(silent = false): void {
    if (!silent) {
      this.loading = true;
    }
    this.error = null;

    this.calendlyService
      .getAvailability()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.processAvailabilityResponse(response);
          if (!silent) {
            this.loading = false;
          }
        },
        error: (error) => {
          this.error = 'Failed to fetch availability. Please try again.';
          if (!silent) {
            this.loading = false;
          }
        },
      });
  }

  private processAvailabilityResponse(response: any): void {
    this.lastAvailabilityResponse = response;

    // Convert UTC times to user's timezone and get unique dates
    this.availableDates = Array.from(
      new Set(
        response.availableSlots.map((slot: any) => {
          const localDate = toZonedTime(
            new Date(slot.start_time),
            this.userTimezone
          );
          return startOfDay(localDate);
        })
      )
    );

    // If a date is selected, update its time slots
    if (this.selectedDate) {
      // Store the currently selected slot time for comparison
      const currentSelectedTime = this.selectedSlot?.startTime;

      this.updateTimeSlots(response);

      // If we had a selected slot, check if it's still valid in the new data
      if (currentSelectedTime) {
        const isStillAvailable = this.availableTimeSlots.some(
          (slot) => slot.startTime === currentSelectedTime
        );

        if (isStillAvailable) {
          // Restore the selection
          this.selectedSlot =
            this.availableTimeSlots.find(
              (slot) => slot.startTime === currentSelectedTime
            ) || null;
        } else {
          // Only clear selection if the slot is no longer available
          this.selectedSlot = null;
        }
      }
    }
  }

  private updateTimeSlots(response: any): void {
    if (!this.selectedDate) return;

    // Convert all available slots to user's timezone and filter for selected date
    this.availableTimeSlots = response.availableSlots
      .map((slot: any) => {
        const startTime = toZonedTime(
          new Date(slot.start_time),
          this.userTimezone
        );
        return {
          startTime: startTime.toISOString(),
          available: true,
        };
      })
      .filter(
        (slot: TimeSlot) =>
          this.selectedDate &&
          isSameDay(new Date(slot.startTime), this.selectedDate)
      )
      .sort(
        (a: TimeSlot, b: TimeSlot) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
  }

  selectTimeSlot(slot: TimeSlot): void {
    this.selectedSlot = slot;
  }

  formatTime(isoString: string): string {
    const date = new Date(isoString);
    return format(date, 'h:mma').toLowerCase();
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

    const isCurrentDay = isToday(day);
    const isSelected = this.selectedDate && isSameDay(day, this.selectedDate);
    const isDisabled =
      isBefore(day, startOfDay(new Date())) || !this.isDateAvailable(day);

    return `p-2 text-center rounded-lg cursor-pointer transition-colors ${
      isDisabled
        ? 'text-neutral-600 cursor-not-allowed'
        : isSelected
        ? 'bg-primary-600 text-white'
        : isCurrentDay
        ? 'bg-neutral-600 text-white'
        : 'text-white hover:bg-primary-600/20'
    }`;
  }

  getTimeSlotClasses(slot: TimeSlot): string {
    const isSelected = this.selectedSlot === slot;
    return `p-3 text-center rounded-lg transition-colors ${
      !slot.available
        ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
        : isSelected
        ? 'bg-primary-600 text-white'
        : 'bg-neutral-800 text-white hover:bg-primary-600/20'
    }`;
  }

  isDateAvailable(date: Date): boolean {
    return this.availableDates.some((availableDate) =>
      isSameDay(availableDate, date)
    );
  }

  selectDate(date: Date | null): void {
    if (!date || !this.isDateAvailable(date)) return;

    this.selectedDate = date;
    this.selectedSlot = null;

    // Immediately update time slots with cached data
    if (this.lastAvailabilityResponse) {
      this.updateTimeSlots(this.lastAvailabilityResponse);
    }

    // Fetch fresh data in the background
    this.fetchMonthAvailability(true);
  }

  clearDateSelection(): void {
    // First hide time slots
    const timeSlotView = document.querySelector('.time-slots-view');
    if (timeSlotView) {
      timeSlotView.classList.add('opacity-0');
    }

    // Wait for fade out before clearing selection
    setTimeout(() => {
      this.selectedDate = null;
      this.selectedSlot = null;
    }, 150); // Half of the transition duration
  }

  clearTimeSelection(): void {
    this.selectedSlot = null;
  }

  formatDateTime(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    return format(date, 'MMM d, h:mma').toLowerCase();
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

  onChange(event: any): void {
    this.complete = event.complete;
  }

  private resetForm(): void {
    this.consultationForm.reset();
    this.selectedDate = null;
    this.selectedSlot = null;
    this.complete = false;
    if (this.card) {
      this.card.element.clear();
    }
  }

  closeSuccessMessage(): void {
    this.showSuccess = false;
  }
}
