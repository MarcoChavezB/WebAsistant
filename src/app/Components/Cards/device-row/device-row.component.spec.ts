import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRowComponent } from './device-row.component';

describe('DeviceRowComponent', () => {
  let component: DeviceRowComponent;
  let fixture: ComponentFixture<DeviceRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
