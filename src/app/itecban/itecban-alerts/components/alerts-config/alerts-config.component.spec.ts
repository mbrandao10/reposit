import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsConfigComponent } from './alerts-config.component';

describe('AlertsConfigComponent', () => {
  let component: AlertsConfigComponent;
  let fixture: ComponentFixture<AlertsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
