import { TestBed } from '@angular/core/testing';

import { PageNotFoundService } from './error.service';

describe('PageNotFoundService', () => {
  let service: PageNotFoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageNotFoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
