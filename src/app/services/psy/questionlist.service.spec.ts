import { TestBed } from '@angular/core/testing';

import { QuestionlistService } from './questionlist.service';

describe('QuestionlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionlistService = TestBed.get(QuestionlistService);
    expect(service).toBeTruthy();
  });
});
