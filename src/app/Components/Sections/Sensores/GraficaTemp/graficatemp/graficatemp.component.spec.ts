import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficatempComponent } from './graficatemp.component';

describe('GraficatempComponent', () => {
  let component: GraficatempComponent;
  let fixture: ComponentFixture<GraficatempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficatempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficatempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
