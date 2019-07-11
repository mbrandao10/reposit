import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingConditionsComponent } from './leasing-conditions.component';

describe('ContractConditionsComponent', () => {
  let component: LeasingConditionsComponent;
  let fixture: ComponentFixture<LeasingConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasingConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
