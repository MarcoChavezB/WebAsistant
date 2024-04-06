import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { deviceguardselectGuard } from './deviceguardselect.guard';

describe('deviceguardselectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => deviceguardselectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
