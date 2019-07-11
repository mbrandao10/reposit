import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettlementComponent } from './account-settlement.component';

describe('AccountSettlementComponent', () => {
  let component: AccountSettlementComponent;
  let fixture: ComponentFixture<AccountSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
