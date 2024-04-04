import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesindexComponent } from './devicesindex.component';

describe('DevicesindexComponent', () => {
  let component: DevicesindexComponent;
  let fixture: ComponentFixture<DevicesindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevicesindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
