import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeirfyCodeComponent } from './veirfy-code.component';

describe('VeirfyCodeComponent', () => {
  let component: VeirfyCodeComponent;
  let fixture: ComponentFixture<VeirfyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeirfyCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeirfyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
