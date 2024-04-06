import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicestoreComponent } from './devicestore.component';

describe('DevicestoreComponent', () => {
  let component: DevicestoreComponent;
  let fixture: ComponentFixture<DevicestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicestoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevicestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
