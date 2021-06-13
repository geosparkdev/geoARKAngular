import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoarkComponent } from './geoark.component';

describe('GeoarkComponent', () => {
  let component: GeoarkComponent;
  let fixture: ComponentFixture<GeoarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
