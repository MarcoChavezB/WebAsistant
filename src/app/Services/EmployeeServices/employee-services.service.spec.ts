import { TestBed } from '@angular/core/testing';

import { EmployeeServicesService } from './employee-services.service';

describe('EmployeeServicesService', () => {
  let service: EmployeeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
