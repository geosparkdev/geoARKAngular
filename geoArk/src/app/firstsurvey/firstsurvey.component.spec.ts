import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstsurveyComponent } from './firstsurvey.component';

describe('FirstsurveyComponent', () => {
  let component: FirstsurveyComponent;
  let fixture: ComponentFixture<FirstsurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstsurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
