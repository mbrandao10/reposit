import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmortizationsTableDetailComponent } from './loan-amortizations-table-detail.component';

describe('LoanAmortizationsTableDetailComponent', () => {
  let component: LoanAmortizationsTableDetailComponent;
  let fixture: ComponentFixture<LoanAmortizationsTableDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAmortizationsTableDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAmortizationsTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
