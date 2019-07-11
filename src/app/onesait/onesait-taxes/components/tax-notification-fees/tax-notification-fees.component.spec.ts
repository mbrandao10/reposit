import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxNotificationFeesComponent } from './tax-notification-fees.component';

describe('TaxNotificationFeesComponent', () => {
  let component: TaxNotificationFeesComponent;
  let fixture: ComponentFixture<TaxNotificationFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxNotificationFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxNotificationFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
