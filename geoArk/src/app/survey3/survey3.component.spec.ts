import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey3Component } from './survey3.component';

describe('Survey3Component', () => {
  let component: Survey3Component;
  let fixture: ComponentFixture<Survey3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
