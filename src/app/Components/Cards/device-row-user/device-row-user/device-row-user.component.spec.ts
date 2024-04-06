import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRowUserComponent } from './device-row-user.component';

describe('DeviceRowUserComponent', () => {
  let component: DeviceRowUserComponent;
  let fixture: ComponentFixture<DeviceRowUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceRowUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceRowUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
