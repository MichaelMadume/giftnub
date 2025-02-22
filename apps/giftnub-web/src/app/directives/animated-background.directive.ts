import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, NgZone } from '@angular/core';
import { fromEvent, merge, Subject, timer } from 'rxjs';
import { debounceTime, takeUntil, take } from 'rxjs/operators';

@Directive({
  selector: '[giftnubAnimatedBackground]',
  standalone: true
})
export class AnimatedBackgroundDirective implements OnInit, OnDestroy {
  @Input() imageUrls: string[] = [];
  @Input() numberOfImages = 40;
  @Input() imageSize = 120;
  @Input() minOpacity = 0.3;
  @Input() maxOpacity = 0.7;

  private images: HTMLElement[] = [];
  private container: HTMLElement;
  private worker: Worker | null = null;
  private loadedImages = 0;
  private totalImages = 0;
  private destroy$ = new Subject<void>();
  private observer: IntersectionObserver | null = null;
  private isVisible = false;
  private userActivityTimeout: any;
  private readonly INACTIVITY_TIMEOUT = 5000; // 10 seconds
  private readonly PERMANENT_PAUSE_TIMEOUT = 60000; // 1 minute
  private isPermanentlyPaused = false;

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {
    this.container = this.el.nativeElement;
  }

  ngOnInit() {
    // Set container style
    this.renderer.setStyle(this.container, 'position', 'relative');
    this.renderer.setStyle(this.container, 'overflow', 'hidden');

    // Initialize intersection observer
    this.setupIntersectionObserver();

    // Initialize user activity tracking
    this.setupUserActivityTracking();

    // Setup permanent pause after 1 minute
    this.setupPermanentPause();

    // Initialize web worker
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../workers/image-grid.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.ngZone.run(() => this.createImageWall(data));
      };
    }

    // Add fade animation style
    const style = this.renderer.createElement('style');
    style.textContent = `
      @keyframes imageFade {
        0% { 
          opacity: ${this.minOpacity};
          transform: scale(0.98);
          filter: brightness(0.8) contrast(1.1) blur(1px);
        }
        50% { 
          opacity: ${this.maxOpacity};
          transform: scale(1);
          filter: brightness(1) contrast(1.2) blur(0px);
        }
        100% { 
          opacity: ${this.minOpacity};
          transform: scale(0.98);
          filter: brightness(0.8) contrast(1.1) blur(1px);
        }
      }
    `;
    this.renderer.appendChild(document.head, style);

    // Start calculation in web worker
    this.calculateGrid();
  }

  ngOnDestroy() {
    if (this.worker) {
      this.worker.terminate();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.userActivityTimeout) {
      clearTimeout(this.userActivityTimeout);
    }
    this.destroy$.next();
    this.destroy$.complete();
    this.images.forEach(img => this.renderer.removeChild(this.container, img));
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        if (this.isVisible !== isVisible) {
          this.isVisible = isVisible;
          this.updateAnimationState();
        }
      },
      { threshold: 0.1 }
    );
    this.observer.observe(this.container);
  }

  private setupUserActivityTracking() {
    this.ngZone.runOutsideAngular(() => {
      const events$ = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'click'),
        fromEvent(document, 'scroll'),
        fromEvent(document, 'touchstart'),
        fromEvent(document, 'touchmove')
      );

      events$.pipe(
        debounceTime(100),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.onUserActivity();
      });
    });
  }

  private onUserActivity() {
    // Clear existing timeout
    if (this.userActivityTimeout) {
      clearTimeout(this.userActivityTimeout);
    }

    // Resume animations
    this.updateAnimationState(true);

    // Set new timeout
    this.userActivityTimeout = setTimeout(() => {
      this.updateAnimationState();
    }, this.INACTIVITY_TIMEOUT);
  }

  private setupPermanentPause() {
    timer(this.PERMANENT_PAUSE_TIMEOUT)
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isPermanentlyPaused = true;
        this.updateAnimationState();
      });
  }

  private updateAnimationState(forceActive = false) {
    // If permanently paused, always keep animations paused
    if (this.isPermanentlyPaused) {
      this.images.forEach(img => {
        this.renderer.setStyle(img, 'animation-play-state', 'paused');
      });
      return;
    }

    const shouldAnimate = forceActive || (this.isVisible && !this.userActivityTimeout);
    this.images.forEach(img => {
      this.renderer.setStyle(img, 'animation-play-state', shouldAnimate ? 'running' : 'paused');
    });
  }

  private calculateGrid() {
    if (!this.worker) {
      return;
    }

    this.worker.postMessage({
      containerWidth: this.container.offsetWidth,
      containerHeight: this.container.offsetHeight,
      imageSize: this.imageSize,
      totalImages: this.numberOfImages
    });
  }

  private createImageWall(positions: any[]) {
    this.totalImages = positions.length;
    this.loadedImages = 0;

    positions.forEach(pos => {
      const img = this.renderer.createElement('img');
      const imageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];

      // Set initial visibility to hidden
      this.renderer.setStyle(img, 'opacity', '0');
      this.renderer.setStyle(img, 'visibility', 'hidden');

      // Add load event listener
      img.addEventListener('load', () => {
        this.loadedImages++;
        if (this.loadedImages === this.totalImages) {
          this.showAllImages();
        }
      });

      // Add error event listener to handle failed loads
      img.addEventListener('error', () => {
        this.loadedImages++;
        if (this.loadedImages === this.totalImages) {
          this.showAllImages();
        }
      });

      this.renderer.setAttribute(img, 'src', imageUrl);
      this.renderer.setStyle(img, 'position', 'absolute');
      this.renderer.setStyle(img, 'width', `${this.imageSize}px`);
      this.renderer.setStyle(img, 'height', `${this.imageSize}px`);
      this.renderer.setStyle(img, 'object-fit', 'cover');
      this.renderer.setStyle(img, 'border-radius', '12px');
      this.renderer.setStyle(img, 'left', `${pos.xPos + pos.xOffset}px`);
      this.renderer.setStyle(img, 'top', `${pos.yPos + pos.yOffset}px`);
      this.renderer.setStyle(img, 'pointer-events', 'none');
      this.renderer.setStyle(img, 'animation', `imageFade ${pos.animationDuration}s infinite ease-in-out`);
      this.renderer.setStyle(img, 'animation-delay', `${pos.animationDelay}s`);
      this.renderer.setStyle(img, 'filter', 'brightness(0.7)');
      this.renderer.setStyle(img, 'will-change', 'transform, opacity, filter');
      this.renderer.setStyle(img, 'transform', 'translateZ(0)');

      this.renderer.appendChild(this.container, img);
      this.images.push(img);
    });

    // Initial animation state
    this.updateAnimationState();
  }

  private showAllImages() {
    // Add transition style before making images visible
    this.images.forEach(img => {
      this.renderer.setStyle(img, 'transition', 'opacity 2s ease-in');
      this.renderer.setStyle(img, 'visibility', 'visible');
    });

    // Small delay to ensure transition is applied before changing opacity
    setTimeout(() => {
      this.images.forEach(img => {
        this.renderer.setStyle(img, 'opacity', `${this.minOpacity}`);
      });
    }, 100);
  }
} 