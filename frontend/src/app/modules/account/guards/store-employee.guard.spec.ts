import { TestBed } from '@angular/core/testing';

import { StoreEmployeeGuard } from './store-employee.guard';

describe('StoreEmployeeGuard', () => {
  let guard: StoreEmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StoreEmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
