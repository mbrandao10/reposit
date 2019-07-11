import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingContractConditionsComponent } from './confirming-contract-conditions.component';

describe('ConfirmingContractConditionsComponent', () => {
  let component: ConfirmingContractConditionsComponent;
  let fixture: ComponentFixture<ConfirmingContractConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingContractConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingContractConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
