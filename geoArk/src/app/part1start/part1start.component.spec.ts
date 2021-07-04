import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part1startComponent } from './part1start.component';

describe('Part1startComponent', () => {
  let component: Part1startComponent;
  let fixture: ComponentFixture<Part1startComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part1startComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part1startComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
