import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmortizeDetailComponent } from './loan-amortize-detail.component';

describe('LoanAmortizeDetailComponent', () => {
  let component: LoanAmortizeDetailComponent;
  let fixture: ComponentFixture<LoanAmortizeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAmortizeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAmortizeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
