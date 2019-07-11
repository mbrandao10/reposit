import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditInfoConditionsComponent } from './credit-info-conditions.component';

describe('CreditInfoConditionsComponent', () => {
  let component: CreditInfoConditionsComponent;
  let fixture: ComponentFixture<CreditInfoConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditInfoConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditInfoConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
