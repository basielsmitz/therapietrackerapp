import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodDayComponent } from './mood-day.component';

describe('MoodDayComponent', () => {
  let component: MoodDayComponent;
  let fixture: ComponentFixture<MoodDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodDayComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
