import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingOrdersRemittancesComponent } from './confirming-orders-remittances.component';

describe('ConfirmingOrdersRemittancesComponent', () => {
  let component: ConfirmingOrdersRemittancesComponent;
  let fixture: ComponentFixture<ConfirmingOrdersRemittancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingOrdersRemittancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingOrdersRemittancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
