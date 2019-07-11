import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmortizationsTableComponent } from './loan-amortizations-table.component';

describe('LoanAmortizationsTableComponent', () => {
  let component: LoanAmortizationsTableComponent;
  let fixture: ComponentFixture<LoanAmortizationsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAmortizationsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAmortizationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
