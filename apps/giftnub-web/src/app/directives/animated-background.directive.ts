import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, NgZone, HostListener } from '@angular/core';
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
  @Input() staggerDelay = 50; // Delay in ms between each image appearing

  private images: HTMLElement[] = [];
  private container: HTMLElement;
  private worker: Worker | null = null;
  private loadedImages = 0;
  private totalImages = 0;
  private destroy$ = new Subject<void>();
  private observer: IntersectionObserver | null = null;
  private isVisible = false;
  private userActivityTimeout: any;
  private readonly INACTIVITY_TIMEOUT = 10000; // 10 seconds
  private readonly PERMANENT_PAUSE_TIMEOUT = 600000; // 1 minute
  private isPermanentlyPaused = false;
  private isInitialized = false;
  private resizeTimeout: any;
  private resizeObserver: ResizeObserver | null = null;

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

    // Add animation styles
    const style = this.renderer.createElement('style');
    style.textContent = `
      @keyframes imageEntrance {
        0% { 
          opacity: 0;
          transform: translateZ(0) scale(0.85);
        }
        100% { 
          opacity: ${this.minOpacity};
          transform: translateZ(0) scale(0.98);
        }
      }
      
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

    // Initialize web worker
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../workers/image-grid.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.ngZone.run(() => {
          if (!this.isInitialized) {
            this.createImageWall(data);
            this.isInitialized = true;
            // Terminate worker after initial load
            this.worker?.terminate();
            this.worker = null;
          }
        });
      };
      this.calculateGrid();
    }

    // Use ResizeObserver for smoother updates
    this.resizeObserver = new ResizeObserver(entries => {
      if (!this.isInitialized) return;
      this.updateImagePositions();
    });
    this.resizeObserver.observe(this.container);
  }

  @HostListener('window:resize')
  onResize() {
    // Debounce resize events
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    this.resizeTimeout = setTimeout(() => {
      if (this.isInitialized) {
        this.updateImagePositions();
      }
    }, 200);
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
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.destroy$.next();
    this.destroy$.complete();
    this.images.forEach(img => this.renderer.removeChild(this.container, img));
    this.resizeObserver?.disconnect();
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

  private updateImagePositions() {
    // Calculate positions directly without worker
    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;
    
    // Maintain animation states during updates
    this.images.forEach((img, i) => {
      const columns = Math.ceil(containerWidth / (this.imageSize * 1.2));
      const rows = Math.ceil(containerHeight / (this.imageSize * 1.2));
      const row = Math.floor(i / columns);
      const col = i % columns;
      
      const xPos = col * this.imageSize * 1.2;
      const yPos = row * this.imageSize * 1.2;
      const randomOffset = this.imageSize * 0.25;
      
      // Smooth transition with opacity maintenance
      this.renderer.setStyle(img, 'transition', 'left 0.5s ease, top 0.5s ease');
      this.renderer.setStyle(img, 'left', `${xPos + (Math.random() - 0.5) * randomOffset}px`);
      this.renderer.setStyle(img, 'top', `${yPos + (Math.random() - 0.5) * randomOffset}px`);
      
      // Cleanup transition after animation
      setTimeout(() => {
        this.renderer.removeStyle(img, 'transition');
      }, 500);
    });
  }

  private createImageWall(positions: any[]) {
    // Add stability check
    if (this.isInitialized || this.images.length > 0) return;
    
    this.totalImages = positions.length;
    this.loadedImages = 0;

    positions.forEach(pos => {
      const img = this.renderer.createElement('img');
      const imageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];

      // Set initial styles BEFORE loading the image
      this.renderer.setStyle(img, 'position', 'absolute');
      this.renderer.setStyle(img, 'width', `${this.imageSize}px`);
      this.renderer.setStyle(img, 'height', `${this.imageSize}px`);
      this.renderer.setStyle(img, 'object-fit', 'cover');
      this.renderer.setStyle(img, 'border-radius', '12px');
      this.renderer.setStyle(img, 'left', `${pos.xPos + pos.xOffset}px`);
      this.renderer.setStyle(img, 'top', `${pos.yPos + pos.yOffset}px`);
      this.renderer.setStyle(img, 'pointer-events', 'none');
      this.renderer.setStyle(img, 'filter', 'brightness(0.7)');
      this.renderer.setStyle(img, 'will-change', 'transform, opacity, filter');
      
      // Ensure completely hidden initially
      this.renderer.setStyle(img, 'opacity', '0');
      this.renderer.setStyle(img, 'visibility', 'hidden');
      this.renderer.setStyle(img, 'transform', 'translateZ(0) scale(0.85)');

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

      // Append to container
      this.renderer.appendChild(this.container, img);
      this.images.push(img);
      
      // Set the source last to trigger loading
      this.renderer.setAttribute(img, 'src', imageUrl);
    });

    // Initial animation state
    this.updateAnimationState();
  }

  private showAllImages() {
    // Force hardware acceleration for all images
    this.images.forEach(img => {
      this.renderer.setStyle(img, 'will-change', 'transform, opacity');
      this.renderer.setStyle(img, 'backface-visibility', 'hidden');
      // Keep images hidden initially 
      this.renderer.setStyle(img, 'visibility', 'hidden');
      this.renderer.setStyle(img, 'opacity', '0');
      // Set initial scale to 80%
      this.renderer.setStyle(img, 'transform', 'translateZ(0) scale(0.85)');
    });

    // Create sequential fade-in effect
    this.ngZone.runOutsideAngular(() => {
      // Randomize the display order for more natural effect
      const shuffledIndices = [...Array(this.images.length).keys()]
        .sort(() => Math.random() - 0.5);
      
      // Fade in each image one at a time
      shuffledIndices.forEach((imgIndex, displayOrder) => {
        const img = this.images[imgIndex];
        const delayTime = displayOrder * 25;
        
        setTimeout(() => {
          // Make image visible
          this.renderer.setStyle(img, 'visibility', 'visible');
          
          // Add transition for smooth fade-in
          this.renderer.setStyle(img, 'transition', 'opacity 0.5s ease-out, transform 0.5s ease-out');
          this.renderer.setStyle(img, 'transform', 'translateZ(0) scale(1)');
          this.renderer.setStyle(img, 'opacity', `${this.minOpacity}`);
          
          // Setup continuous animation after fade-in is complete
          setTimeout(() => {
            const randomDuration = 5 + Math.random() * 3;
            const randomDelay = Math.random() * 2;
            
            // Ensure the transition to continuous animation is smooth
            this.renderer.setStyle(img, 'animation', 
              `imageFade ${randomDuration}s infinite ease-in-out ${randomDelay}s`);
            
            // Remove the transition property to prevent conflicts with animation
            this.renderer.removeStyle(img, 'transition');
          }, 500);
        }, delayTime);
      });
    });
  }
} 