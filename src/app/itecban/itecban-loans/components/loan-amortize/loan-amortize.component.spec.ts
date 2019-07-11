import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmortizeComponent } from './loan-amortize.component';

describe('LoanAmortizeComponent', () => {
  let component: LoanAmortizeComponent;
  let fixture: ComponentFixture<LoanAmortizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAmortizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAmortizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
