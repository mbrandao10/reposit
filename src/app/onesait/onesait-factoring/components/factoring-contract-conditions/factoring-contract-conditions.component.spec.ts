import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoringContractConditionsComponent } from './factoring-contract-conditions.component';

describe('FactoringContractConditionsComponent', () => {
  let component: FactoringContractConditionsComponent;
  let fixture: ComponentFixture<FactoringContractConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoringContractConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoringContractConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
