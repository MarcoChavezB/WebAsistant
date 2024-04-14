import { TestBed } from '@angular/core/testing';

import { SensordataserviceService } from './sensordataservice.service';

describe('SensordataserviceService', () => {
  let service: SensordataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensordataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
