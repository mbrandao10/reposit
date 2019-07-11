import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositInfoConditionComponent } from './deposit-info-condition.component';

describe('DepositInfoConditionComponent', () => {
  let component: DepositInfoConditionComponent;
  let fixture: ComponentFixture<DepositInfoConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositInfoConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositInfoConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
