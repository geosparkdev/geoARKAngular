import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Categories2Component } from './categories2.component';

describe('Categories2Component', () => {
  let component: Categories2Component;
  let fixture: ComponentFixture<Categories2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Categories2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Categories2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
