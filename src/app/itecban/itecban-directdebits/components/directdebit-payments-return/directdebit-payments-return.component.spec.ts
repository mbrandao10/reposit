import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectdebitPaymentsReturnComponent } from './directdebit-payments-return.component';

describe('DirectdebitPaymentsReturnComponent', () => {
  let component: DirectdebitPaymentsReturnComponent;
  let fixture: ComponentFixture<DirectdebitPaymentsReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectdebitPaymentsReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectdebitPaymentsReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
