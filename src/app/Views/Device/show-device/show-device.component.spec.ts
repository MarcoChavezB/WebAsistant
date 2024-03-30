import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeviceComponent } from './show-device.component';

describe('ShowDeviceComponent', () => {
  let component: ShowDeviceComponent;
  let fixture: ComponentFixture<ShowDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
