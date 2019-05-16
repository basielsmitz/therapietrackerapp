import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsyPage } from './psy.page';

describe('PsyPage', () => {
  let component: PsyPage;
  let fixture: ComponentFixture<PsyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
