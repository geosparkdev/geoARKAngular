import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbDesignComponent } from './db-design.component';

describe('DbDesignComponent', () => {
  let component: DbDesignComponent;
  let fixture: ComponentFixture<DbDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
