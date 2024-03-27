import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioChartComponent } from './radio-chart.component';

describe('RadioChartComponent', () => {
  let component: RadioChartComponent;
  let fixture: ComponentFixture<RadioChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadioChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
