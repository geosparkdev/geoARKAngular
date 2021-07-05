import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyfinishedComponent } from './surveyfinished.component';

describe('SurveyfinishedComponent', () => {
  let component: SurveyfinishedComponent;
  let fixture: ComponentFixture<SurveyfinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyfinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyfinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
