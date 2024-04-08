import { TestBed } from '@angular/core/testing';

import { ControllerserviceService } from './controllerservice.service';

describe('ControllerserviceService', () => {
  let service: ControllerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControllerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
