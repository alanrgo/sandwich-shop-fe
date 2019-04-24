import { TestBed } from '@angular/core/testing';

import { SandwichService } from './sandwich.service';
import { HttpClientModule } from '@angular/common/http';

describe('SandwichService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: SandwichService = TestBed.get(SandwichService);
    expect(service).toBeTruthy();
  });

});
