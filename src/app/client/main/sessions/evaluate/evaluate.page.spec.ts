import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatePage } from './evaluate.page';

describe('EvaluatePage', () => {
  let component: EvaluatePage;
  let fixture: ComponentFixture<EvaluatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
