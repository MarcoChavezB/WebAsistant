import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnguloCardComponent } from './angulo-card.component';

describe('AnguloCardComponent', () => {
  let component: AnguloCardComponent;
  let fixture: ComponentFixture<AnguloCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnguloCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnguloCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
