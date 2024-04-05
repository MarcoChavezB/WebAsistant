import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalModalComponent } from './global-modal.component';

describe('GlobalModalComponent', () => {
  let component: GlobalModalComponent;
  let fixture: ComponentFixture<GlobalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
