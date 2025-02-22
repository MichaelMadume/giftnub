import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, NgZone } from '@angular/core';

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
    this.images.forEach(img => this.renderer.removeChild(this.container, img));
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
    positions.forEach(pos => {
      const img = this.renderer.createElement('img');
      const imageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];

      this.renderer.setAttribute(img, 'src', imageUrl);
      this.renderer.setStyle(img, 'position', 'absolute');
      this.renderer.setStyle(img, 'width', `${this.imageSize}px`);
      this.renderer.setStyle(img, 'height', `${this.imageSize}px`);
      this.renderer.setStyle(img, 'object-fit', 'cover');
      this.renderer.setStyle(img, 'border-radius', '12px');
      this.renderer.setStyle(img, 'left', `${pos.xPos + pos.xOffset}px`);
      this.renderer.setStyle(img, 'top', `${pos.yPos + pos.yOffset}px`);
      this.renderer.setStyle(img, 'pointer-events', 'none');
      this.renderer.setStyle(img, 'opacity', `${this.minOpacity}`);
      this.renderer.setStyle(img, 'animation', `imageFade ${pos.animationDuration}s infinite ease-in-out`);
      this.renderer.setStyle(img, 'animation-delay', `${pos.animationDelay}s`);
      this.renderer.setStyle(img, 'filter', 'brightness(0.7)');
      this.renderer.setStyle(img, 'will-change', 'transform, opacity, filter');
      this.renderer.setStyle(img, 'transform', 'translateZ(0)');

      this.renderer.appendChild(this.container, img);
      this.images.push(img);
    });
  }
} 