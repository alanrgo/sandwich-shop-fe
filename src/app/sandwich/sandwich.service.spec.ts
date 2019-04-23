import { TestBed } from '@angular/core/testing';

import { SandwichService } from './sandwich.service';

describe('SandwichService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SandwichService = TestBed.get(SandwichService);
    expect(service).toBeTruthy();
  });
});
