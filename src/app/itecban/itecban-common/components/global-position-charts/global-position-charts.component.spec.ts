import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPositionChartsComponent } from './global-position-charts.component';

describe('GlobalPositionChartsComponent', () => {
  let component: GlobalPositionChartsComponent;
  let fixture: ComponentFixture<GlobalPositionChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalPositionChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPositionChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
