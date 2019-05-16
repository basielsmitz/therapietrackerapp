import { TestBed } from '@angular/core/testing';

import { MoodService } from './mood.service';

describe('MoodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoodService = TestBed.get(MoodService);
    expect(service).toBeTruthy();
  });
});
