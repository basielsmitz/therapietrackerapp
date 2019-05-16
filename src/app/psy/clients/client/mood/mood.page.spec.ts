import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodPage } from './mood.page';

describe('MoodPage', () => {
  let component: MoodPage;
  let fixture: ComponentFixture<MoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
