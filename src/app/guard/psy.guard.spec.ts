import { TestBed, async, inject } from '@angular/core/testing';

import { PsyGuard } from './psy.guard';

describe('PsyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PsyGuard]
    });
  });

  it('should ...', inject([PsyGuard], (guard: PsyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
