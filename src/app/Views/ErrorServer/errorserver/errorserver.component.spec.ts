import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorserverComponent } from './errorserver.component';

describe('ErrorserverComponent', () => {
  let component: ErrorserverComponent;
  let fixture: ComponentFixture<ErrorserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorserverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
