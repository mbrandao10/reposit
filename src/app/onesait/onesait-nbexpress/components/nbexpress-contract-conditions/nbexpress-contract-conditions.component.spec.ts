import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressContractConditionsComponent } from './nbexpress-contract-conditions.component';

describe('NbExpressContractConditionsComponent', () => {
  let component: NbExpressContractConditionsComponent;
  let fixture: ComponentFixture<NbExpressContractConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressContractConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressContractConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
