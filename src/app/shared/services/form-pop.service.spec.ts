import { TestBed } from '@angular/core/testing';

import { FormPopService } from './form-pop.service';

describe('FormPopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormPopService = TestBed.get(FormPopService);
    expect(service).toBeTruthy();
  });
});
