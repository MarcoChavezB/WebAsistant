import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorydataComponent } from './historydata.component';

describe('HistorydataComponent', () => {
  let component: HistorydataComponent;
  let fixture: ComponentFixture<HistorydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorydataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
