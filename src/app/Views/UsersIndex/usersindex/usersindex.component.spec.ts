import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersindexComponent } from './usersindex.component';

describe('UsersindexComponent', () => {
  let component: UsersindexComponent;
  let fixture: ComponentFixture<UsersindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
