import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalLoaderComponent } from './global-loader.component';

describe('GlobalLoadingComponent', () => {
  let component: GlobalLoaderComponent;
  let fixture: ComponentFixture<GlobalLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
