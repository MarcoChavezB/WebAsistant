import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradicaVelocidadComponent } from './gradica-velocidad.component';

describe('GradicaVelocidadComponent', () => {
  let component: GradicaVelocidadComponent;
  let fixture: ComponentFixture<GradicaVelocidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradicaVelocidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradicaVelocidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
