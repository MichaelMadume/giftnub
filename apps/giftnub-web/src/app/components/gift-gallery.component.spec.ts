import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiftGalleryComponent } from './gift-gallery.component';

describe('GiftGalleryComponent', () => {
  let component: GiftGalleryComponent;
  let fixture: ComponentFixture<GiftGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GiftGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
