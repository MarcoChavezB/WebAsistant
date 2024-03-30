import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotpermissionComponent } from './notpermission.component';

describe('NotpermissionComponent', () => {
  let component: NotpermissionComponent;
  let fixture: ComponentFixture<NotpermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotpermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
