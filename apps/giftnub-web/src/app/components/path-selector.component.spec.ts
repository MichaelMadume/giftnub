import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathSelectorComponent } from './path-selector.component';

describe('PathSelectorComponent', () => {
  let component: PathSelectorComponent;
  let fixture: ComponentFixture<PathSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PathSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
