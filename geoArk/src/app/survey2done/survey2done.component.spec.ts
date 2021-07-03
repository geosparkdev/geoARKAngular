import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey2doneComponent } from './survey2done.component';

describe('Survey2doneComponent', () => {
  let component: Survey2doneComponent;
  let fixture: ComponentFixture<Survey2doneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Survey2doneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey2doneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
