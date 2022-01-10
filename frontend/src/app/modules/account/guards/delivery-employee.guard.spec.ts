import { TestBed } from '@angular/core/testing';

import { DeliveryEmployeeGuard } from './delivery-employee.guard';

describe('DeliveryEmployeeGuard', () => {
  let guard: DeliveryEmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeliveryEmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
