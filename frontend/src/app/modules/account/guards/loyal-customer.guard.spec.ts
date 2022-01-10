import { TestBed } from '@angular/core/testing';

import { LoyalCustomerGuard } from './loyal-customer.guard';

describe('LoyalCustomerGuard', () => {
  let guard: LoyalCustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoyalCustomerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
