import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanInfoConditionsComponent } from './loan-info-conditions.component';

describe('LoanInfoConditionsComponent', () => {
  let component: LoanInfoConditionsComponent;
  let fixture: ComponentFixture<LoanInfoConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanInfoConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanInfoConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
