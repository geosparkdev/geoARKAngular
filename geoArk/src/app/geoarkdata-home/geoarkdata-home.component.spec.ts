import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoarkdataHomeComponent } from './geoarkdata-home.component';

describe('GeoarkdataHomeComponent', () => {
  let component: GeoarkdataHomeComponent;
  let fixture: ComponentFixture<GeoarkdataHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoarkdataHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoarkdataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
